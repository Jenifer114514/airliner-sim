#!/usr/bin/env python3
"""
optimize-cockpit.py — Sketchfab 由来のコックピット glTF をスマホ向け単一 GLB に変換する。

依存: numpy, Pillow のみ（ネットワーク不要）。

やること
  1. skin（ボーン）付きメッシュを rest pose で world 空間の静的ジオメトリに焼く
  2. 座標系をシム規約へ変換: 機首 +Z / 上 +Y / 左席側 +X。機長の目の位置が原点 (0,0,0)
  3. 絶対に見えない三角形を除去
       - 目より後方（z < REAR_CULL）にある三角形（コックピットカメラは前方固定）
       - 頭の可動域（EYE_BOX）のどこからも裏面になる三角形（片面マテリアルのみ）
  4. 同一マテリアルのメッシュを結合（draw call 削減）、未使用頂点を削除
  5. KHR_materials_clearcoat / specular を除去（モバイルの MeshPhysicalMaterial 化を避ける）
  6. テクスチャを縮小して JPEG / PNG で埋め込み（GPU メモリを桁違いに削減）
  7. 元ライセンス（CC-BY-NC-SA-4.0）の表記を asset.extras に引き継ぐ

使い方
  python3 scripts/optimize-cockpit.py <scene.gltf のあるフォルダ> <出力.glb> [--eye X Y Z] [--preview 出力.png]

注意: モデルのライセンスは CC-BY-NC-SA-4.0（非営利・要クレジット・同一条件で継承）。
      公開リポジトリ / GitHub Pages に置かないこと（.gitignore 済みの public/cockpit.glb を想定）。
"""
import argparse, io, json, os, struct, sys
import numpy as np
from PIL import Image

# ───────────────────────── 調整パラメータ ─────────────────────────
# 元モデル座標系での機長の目の位置 [m]（元は機首 -Z / 右 +X / 上 +Y）
DEFAULT_EYE = (-0.55, -5.52, -29.20)
REAR_CULL = -0.30        # 目より後方 0.30m より後ろの三角形を捨てる
EYE_BOX = 0.12           # 頭の可動域（±m）— 裏面判定の安全マージン
TEX_CAP_DEFAULT = 1024   # テクスチャ最大辺
TEX_CAP_LARGE = 2048     # 大面積パネル用
TEX_CAP_SMALL = 512      # 低情報量（パレット/単色系）・小物用
JPEG_QUALITY = 86

# ───────────────────────── glTF 読み込み ─────────────────────────
COMP = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT2': 4, 'MAT3': 9, 'MAT4': 16}


class Gltf:
    def __init__(self, path_gltf):
        self.dir = os.path.dirname(os.path.abspath(path_gltf))
        self.j = json.load(open(path_gltf))
        self.bin = open(os.path.join(self.dir, self.j['buffers'][0]['uri']), 'rb').read()

    def accessor(self, idx):
        a = self.j['accessors'][idx]
        bv = self.j['bufferViews'][a['bufferView']]
        dt = COMP[a['componentType']]
        n = NCOMP[a['type']]
        off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
        stride = bv.get('byteStride') or dt().itemsize * n
        cnt = a['count']
        if stride == dt().itemsize * n:
            arr = np.frombuffer(self.bin, dtype=dt, count=cnt * n, offset=off).reshape(cnt, n)
        else:
            raw = np.frombuffer(self.bin, dtype=np.uint8, offset=off, count=(cnt - 1) * stride + dt().itemsize * n)
            arr = np.empty((cnt, n), dtype=dt)
            for i in range(cnt):
                arr[i] = np.frombuffer(raw, dtype=dt, count=n, offset=i * stride)
        return arr.copy()


def node_local(n):
    if 'matrix' in n:
        return np.array(n['matrix'], dtype=np.float64).reshape(4, 4).T
    T = np.eye(4)
    if 'translation' in n:
        T[:3, 3] = n['translation']
    R = np.eye(4)
    if 'rotation' in n:
        x, y, z, w = n['rotation']
        R[:3, :3] = np.array([
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    S = np.eye(4)
    if 'scale' in n:
        S[0, 0], S[1, 1], S[2, 2] = n['scale']
    return T @ R @ S


def world_matrices(j):
    nodes = j['nodes']
    W = [np.eye(4)] * len(nodes)

    def rec(i, parent):
        W[i] = parent @ node_local(nodes[i])
        for c in nodes[i].get('children', []):
            rec(c, W[i])
    for r in j['scenes'][j.get('scene', 0)]['nodes']:
        rec(r, np.eye(4))
    return W


def bake(g):
    """全メッシュノードを world 空間の静的ジオメトリへ。skin は rest pose で適用。"""
    j = g.j
    W = world_matrices(j)
    out = []
    for ni, n in enumerate(j['nodes']):
        if 'mesh' not in n:
            continue
        for p in j['meshes'][n['mesh']]['primitives']:
            at = p['attributes']
            pos = g.accessor(at['POSITION']).astype(np.float64)
            nrm = g.accessor(at['NORMAL']).astype(np.float64) if 'NORMAL' in at else None
            uv = g.accessor(at['TEXCOORD_0']).astype(np.float32) if 'TEXCOORD_0' in at else None
            idx = g.accessor(p['indices']).reshape(-1).astype(np.uint32) if 'indices' in p else np.arange(len(pos), dtype=np.uint32)
            if 'skin' in n:
                s = j['skins'][n['skin']]
                ib = g.accessor(s['inverseBindMatrices']).reshape(-1, 4, 4).astype(np.float64)
                jm = np.stack([W[jn] @ ib[k].T for k, jn in enumerate(s['joints'])])
                J = g.accessor(at['JOINTS_0']).astype(np.int64)
                wacc = j['accessors'][at['WEIGHTS_0']]
                Wt = g.accessor(at['WEIGHTS_0']).astype(np.float64)
                if wacc['componentType'] == 5121:
                    Wt /= 255.0
                elif wacc['componentType'] == 5123:
                    Wt /= 65535.0
                M = np.zeros((len(pos), 4, 4))
                for k in range(4):
                    M += Wt[:, k, None, None] * jm[J[:, k]]
                ph = np.concatenate([pos, np.ones((len(pos), 1))], 1)
                pos_w = np.einsum('nij,nj->ni', M, ph)[:, :3]
                nrm_w = None
                if nrm is not None:
                    Mi = np.linalg.inv(M[:, :3, :3] + np.eye(3) * 1e-12)
                    nrm_w = np.einsum('nji,nj->ni', Mi, nrm)
            else:
                Mw = W[ni]
                pos_w = (np.concatenate([pos, np.ones((len(pos), 1))], 1) @ Mw.T)[:, :3]
                nrm_w = nrm @ np.linalg.inv(Mw[:3, :3]) if nrm is not None else None
            if nrm_w is not None:
                l = np.linalg.norm(nrm_w, axis=1, keepdims=True)
                l[l == 0] = 1
                nrm_w = nrm_w / l
            out.append(dict(name=n.get('name'), mat=p.get('material'),
                            pos=pos_w, nrm=nrm_w, uv=uv, idx=idx))
    return out


# ───────────────────────── 変換・カリング ─────────────────────────
def to_sim_frame(prims, eye):
    """元: 機首 -Z / 右 +X → シム: 機首 +Z / 左 +X。180° ヨー回転 + 目を原点へ。"""
    eye = np.array(eye, dtype=np.float64)
    for p in prims:
        d = p['pos'] - eye
        p['pos'] = np.stack([-d[:, 0], d[:, 1], -d[:, 2]], 1)
        if p['nrm'] is not None:
            n = p['nrm']
            p['nrm'] = np.stack([-n[:, 0], n[:, 1], -n[:, 2]], 1)


def compact(prims):
    """使用頂点だけに詰め直す（空のプリミティブは除去）。"""
    res = []
    for p in prims:
        if len(p['idx']) == 0:
            continue
        used, inv = np.unique(p['idx'], return_inverse=True)
        q = dict(p)
        q['pos'] = p['pos'][used]
        q['nrm'] = p['nrm'][used] if p['nrm'] is not None else None
        q['uv'] = p['uv'][used] if p['uv'] is not None else None
        q['idx'] = inv.astype(np.uint32)
        res.append(q)
    return res


def rear_cull(prims):
    """目より後方（コックピットカメラは前方固定）にある三角形を除去。"""
    n0 = n1 = 0
    for p in prims:
        idx = p['idx'].reshape(-1, 3)
        z = p['pos'][:, 2]
        rear = (z[idx[:, 0]] < REAR_CULL) & (z[idx[:, 1]] < REAR_CULL) & (z[idx[:, 2]] < REAR_CULL)
        n0 += len(idx)
        p['idx'] = idx[~rear].reshape(-1)
        n1 += int((~rear).sum())
    return compact(prims), n0, n1


# ───────────────────── 可視性カリング（z バッファ） ─────────────────────
def _tri_arrays(prims, is_blend):
    V0, V1, V2, BL, owner, local = [], [], [], [], [], []
    for pi, p in enumerate(prims):
        idx = p['idx'].reshape(-1, 3)
        P = p['pos'].astype(np.float64)
        V0.append(P[idx[:, 0]]); V1.append(P[idx[:, 1]]); V2.append(P[idx[:, 2]])
        BL.append(np.full(len(idx), is_blend[pi], dtype=bool))
        owner.append(np.full(len(idx), pi, dtype=np.int32))
        local.append(np.arange(len(idx), dtype=np.int64))
    return (np.concatenate(V0), np.concatenate(V1), np.concatenate(V2),
            np.concatenate(BL), np.concatenate(owner), np.concatenate(local))


def _project(V, eye, W, H, fovy_deg):
    d = V - np.array(eye)
    z = d[:, 2]
    t = np.tan(np.radians(fovy_deg) / 2)
    asp = W / H
    with np.errstate(divide='ignore', invalid='ignore'):
        sx = (-d[:, 0] / z) / (t * asp)
        sy = (d[:, 1] / z) / t
    return (sx * 0.5 + 0.5) * W, (1.0 - (sy * 0.5 + 0.5)) * H, z


def _raster_samples(px, py, z, valid_idx, W, H, win):
    """valid_idx の三角形を win×win（+重心 1 点）でサンプリングし、(pixel_id, depth, tri) を返す。"""
    x0, x1, x2 = px[0][valid_idx], px[1][valid_idx], px[2][valid_idx]
    y0, y1, y2 = py[0][valid_idx], py[1][valid_idx], py[2][valid_idx]
    z0, z1, z2 = z[0][valid_idx], z[1][valid_idx], z[2][valid_idx]
    den = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2)
    mnx = np.floor(np.minimum(np.minimum(x0, x1), x2)).astype(np.int64)
    mny = np.floor(np.minimum(np.minimum(y0, y1), y2)).astype(np.int64)
    g = np.arange(win)
    gx, gy = np.meshgrid(g, g)
    gx = gx.reshape(1, -1); gy = gy.reshape(1, -1)
    # グリッド + 重心サンプル
    SX = np.concatenate([mnx[:, None] + gx + 0.5, ((x0 + x1 + x2) / 3)[:, None]], 1)
    SY = np.concatenate([mny[:, None] + gy + 0.5, ((y0 + y1 + y2) / 3)[:, None]], 1)
    with np.errstate(divide='ignore', invalid='ignore'):
        l0 = ((y1 - y2)[:, None] * (SX - x2[:, None]) + (x2 - x1)[:, None] * (SY - y2[:, None])) / den[:, None]
        l1 = ((y2 - y0)[:, None] * (SX - x2[:, None]) + (x0 - x2)[:, None] * (SY - y2[:, None])) / den[:, None]
    l2 = 1 - l0 - l1
    e = -1e-6
    inside = (l0 >= e) & (l1 >= e) & (l2 >= e) & (np.abs(den)[:, None] > 1e-12)
    inside &= (SX >= 0) & (SX < W) & (SY >= 0) & (SY < H)
    with np.errstate(divide='ignore', invalid='ignore'):
        zi = 1.0 / (l0 / z0[:, None] + l1 / z1[:, None] + l2 / z2[:, None])
    ti, si = np.nonzero(inside)
    pix = (np.floor(SY[ti, si]).astype(np.int64) * W + np.floor(SX[ti, si]).astype(np.int64))
    return pix, zi[ti, si], valid_idx[ti]


def _raster_tiles(PX, PY, Z, ti, W, H, tile=128):
    """画面を覆う大きな三角形を、画面内にクリップして 128px タイルごとにラスタライズ。"""
    x0, x1, x2 = PX[0][ti], PX[1][ti], PX[2][ti]
    y0, y1, y2 = PY[0][ti], PY[1][ti], PY[2][ti]
    z0, z1, z2 = Z[0][ti], Z[1][ti], Z[2][ti]
    den = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2)
    if abs(den) < 1e-12:
        return
    bx0 = max(int(np.floor(min(x0, x1, x2))), 0); bx1 = min(int(np.ceil(max(x0, x1, x2))) + 1, W)
    by0 = max(int(np.floor(min(y0, y1, y2))), 0); by1 = min(int(np.ceil(max(y0, y1, y2))) + 1, H)
    e = -1e-6
    for ty in range(by0, by1, tile):
        for tx in range(bx0, bx1, tile):
            xs = np.arange(tx, min(tx + tile, bx1)) + 0.5
            ys = np.arange(ty, min(ty + tile, by1)) + 0.5
            SX, SY = np.meshgrid(xs, ys)
            l0 = ((y1 - y2) * (SX - x2) + (x2 - x1) * (SY - y2)) / den
            l1 = ((y2 - y0) * (SX - x2) + (x0 - x2) * (SY - y2)) / den
            l2 = 1 - l0 - l1
            m = (l0 >= e) & (l1 >= e) & (l2 >= e)
            if not m.any():
                continue
            zi = 1.0 / (l0[m] / z0 + l1[m] / z1 + l2[m] / z2)
            pix = np.floor(SY[m]).astype(np.int64) * W + np.floor(SX[m]).astype(np.int64)
            yield pix, zi


def visibility_flags(V0, V1, V2, BL, eye, W, H, fovy_deg, eps_abs=0.02, eps_rel=0.01):
    """1 視点から見える三角形のフラグ。不透明のみが遮蔽体。近接面を跨ぐ三角形は安全側で可視扱い。"""
    N = len(V0)
    PX, PY, Z = [], [], []
    for V in (V0, V1, V2):
        a, b, c = _project(V, eye, W, H, fovy_deg)
        PX.append(a); PY.append(b); Z.append(c)
    NEAR = 0.05
    zmin = np.minimum(np.minimum(Z[0], Z[1]), Z[2])
    zmax = np.maximum(np.maximum(Z[0], Z[1]), Z[2])
    vis = np.zeros(N, dtype=bool)
    behind = zmax <= NEAR                       # 完全に視点の後ろ → 不可視
    crossing = (zmin <= NEAR) & ~behind          # 近接面跨ぎ → 安全側で可視
    vis |= crossing
    ok = ~(behind | crossing)
    # 画面外（バウンディングが画面に掛からない）を除外
    allx = np.stack(PX, 1); ally = np.stack(PY, 1)
    ok &= ~((allx.max(1) < 0) | (allx.min(1) >= W) | (ally.max(1) < 0) | (ally.min(1) >= H))
    ok_idx = np.nonzero(ok)[0]
    size = np.maximum(allx[ok_idx].max(1) - allx[ok_idx].min(1), ally[ok_idx].max(1) - ally[ok_idx].min(1)) + 2
    classes = [(4, 0), (8, 4), (16, 8), (32, 16), (64, 32)]
    zbuf = np.full(W * H, np.inf)
    passes = []
    for win, lo in classes:
        hi = win
        sel = ok_idx[(size > lo) & (size <= hi)] if win != 4 else ok_idx[size <= 4]
        passes.append((win, sel))
    big = ok_idx[size > 64]
    CH = 4_000_000

    def run(sel, win, fn):
        per = win * win + 1
        step = max(1, CH // per)
        for i in range(0, len(sel), step):
            pix, zz, ti = _raster_samples(PX, PY, Z, sel[i:i + step], W, H, win)
            fn(pix, zz, ti)

    def run_big(fn):
        for ti in big:
            for pix, zz in _raster_tiles(PX, PY, Z, int(ti), W, H):
                fn(pix, zz, np.full(len(pix), ti, dtype=np.int64))

    # パス 1: 不透明の最小深度
    def p1(pix, zz, ti):
        m = ~BL[ti]
        if m.any():
            np.minimum.at(zbuf, pix[m], zz[m])
    for win, sel in passes:
        run(sel, win, p1)
    run_big(p1)

    # パス 2: 深度が zbuf 以内なら可視
    def p2(pix, zz, ti):
        zb = zbuf[pix]
        win_ = zz <= zb + eps_abs + eps_rel * zb
        if win_.any():
            vis[ti[win_]] = True
    for win, sel in passes:
        run(sel, win, p2)
    run_big(p2)
    return vis


def visibility_cull(prims, materials, views, fovy=66.0):
    """複数視点の和集合で可視な三角形だけ残す。"""
    is_blend = [(materials[p['mat']].get('alphaMode') == 'BLEND') if p['mat'] is not None else False for p in prims]
    V0, V1, V2, BL, owner, local = _tri_arrays(prims, is_blend)
    keep = np.zeros(len(V0), dtype=bool)
    for k, (eye, W, H) in enumerate(views):
        keep |= visibility_flags(V0, V1, V2, BL, eye, W, H, fovy)
        print('  視点 %d/%d: 累計可視 %d / %d' % (k + 1, len(views), int(keep.sum()), len(keep)), flush=True)
    off = 0
    for pi, p in enumerate(prims):
        n = len(p['idx']) // 3
        p['idx'] = p['idx'].reshape(-1, 3)[keep[off:off + n]].reshape(-1)
        off += n
    return compact(prims), keep


def merge_by_material(prims):
    by = {}
    for p in prims:
        by.setdefault(p['mat'], []).append(p)
    out = []
    for mat, lst in by.items():
        base = 0
        pos, nrm, uv, idx = [], [], [], []
        has_uv = all(q['uv'] is not None for q in lst)
        for q in lst:
            pos.append(q['pos'])
            nrm.append(q['nrm'] if q['nrm'] is not None else np.zeros_like(q['pos']))
            if has_uv:
                uv.append(q['uv'])
            idx.append(q['idx'] + base)
            base += len(q['pos'])
        out.append(dict(mat=mat, pos=np.concatenate(pos).astype(np.float32),
                        nrm=np.concatenate(nrm).astype(np.float32),
                        uv=np.concatenate(uv).astype(np.float32) if has_uv else None,
                        idx=np.concatenate(idx).astype(np.uint32)))
    return out


# ───────────────────────── テクスチャ ─────────────────────────
def pick_caps(g, merged):
    """画像ごとの最大辺。大面積に使われる画像ほど大きく、低情報量は小さく。"""
    j = g.j
    tri_by_img = {}
    for p in merged:
        m = j['materials'][p['mat']] if p['mat'] is not None else {}
        for slot in (m.get('pbrMetallicRoughness', {}).get('baseColorTexture'), m.get('emissiveTexture')):
            if slot is None:
                continue
            img = j['textures'][slot['index']].get('source')
            tri_by_img[img] = tri_by_img.get(img, 0) + len(p['idx']) // 3
    caps = {}
    for i, im in enumerate(j['images']):
        path = os.path.join(g.dir, im['uri'])
        size_bytes = os.path.getsize(path)
        w, h = Image.open(path).size
        tris = tri_by_img.get(i, 0)
        cap = TEX_CAP_DEFAULT
        if tris >= 15000:
            cap = TEX_CAP_LARGE
        elif tris < 800:
            cap = TEX_CAP_SMALL
        if size_bytes < 300_000 and max(w, h) >= 1024:   # 単色/パレット系: 情報量が少ない
            cap = min(cap, TEX_CAP_SMALL)
        caps[i] = min(cap, max(w, h))
    return caps


def alpha_stats(path):
    """(最小アルファ, 0/255 に二値化されている割合)。アルファ無しなら (255, 1.0)。"""
    im = Image.open(path)
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    if not has_alpha:
        return 255, 1.0
    im = im.convert('RGBA')
    im.thumbnail((512, 512), Image.NEAREST)
    a = np.asarray(im.getchannel('A'))
    return int(a.min()), float(((a < 8) | (a > 247)).mean())


def encode_image(path, cap, force_alpha):
    im = Image.open(path)
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    keep_alpha = has_alpha and force_alpha
    im = im.convert('RGBA' if keep_alpha else 'RGB')
    w, h = im.size
    s = min(1.0, cap / max(w, h))
    if s < 1.0:
        nw = max(4, int(round(w * s / 4)) * 4) if w * s >= 8 else max(1, int(round(w * s)))
        nh = max(4, int(round(h * s / 4)) * 4) if h * s >= 8 else max(1, int(round(h * s)))
        im = im.resize((nw, nh), Image.LANCZOS)
    buf = io.BytesIO()
    if keep_alpha and np.asarray(im.getchannel('A')).min() < 255:
        im.save(buf, 'PNG', optimize=True)
        return buf.getvalue(), 'image/png', im.size
    im = im.convert('RGB')
    im.save(buf, 'JPEG', quality=JPEG_QUALITY, subsampling=0, optimize=True)
    return buf.getvalue(), 'image/jpeg', im.size


def drop_invisible(prims, materials):
    """baseColorFactor のアルファが 0 の BLEND マテリアル（完全に透明）は描画しない。"""
    out = []
    for p in prims:
        m = materials[p['mat']] if p['mat'] is not None else {}
        fac = m.get('pbrMetallicRoughness', {}).get('baseColorFactor', [1, 1, 1, 1])
        if m.get('alphaMode') == 'BLEND' and fac[3] < 0.01 and 'emissiveTexture' not in m:
            continue
        out.append(p)
    return out


# ───────────────────────── GLB 書き出し ─────────────────────────
def build_glb(g, merged, license_text, eye):
    j = g.j
    bin_parts = []
    views = []
    accessors = []

    def add_view(data, target=None):
        pad = (-sum(len(b) for b in bin_parts)) % 4
        if pad:
            bin_parts.append(b'\0' * pad)
        off = sum(len(b) for b in bin_parts)
        bin_parts.append(data)
        v = {'buffer': 0, 'byteOffset': off, 'byteLength': len(data)}
        if target:
            v['target'] = target
        views.append(v)
        return len(views) - 1

    # 使用マテリアル（再番号付け）
    used_mats = sorted({p['mat'] for p in merged if p['mat'] is not None})
    mat_map = {m: i for i, m in enumerate(used_mats)}
    # 使用テクスチャ
    alpha_imgs = set()
    caps = pick_caps(g, merged)
    img_map, new_images, new_textures, tex_map = {}, [], [], {}
    gpu_bytes = 0
    enc_bytes = 0
    report = []

    def use_texture(tex_index):
        nonlocal gpu_bytes, enc_bytes
        if tex_index in tex_map:
            return tex_map[tex_index]
        t = j['textures'][tex_index]
        src = t['source']
        if src not in img_map:
            im = j['images'][src]
            data, mime, size = encode_image(os.path.join(g.dir, im['uri']), caps[src], src in alpha_imgs)
            view = add_view(data)
            new_images.append({'bufferView': view, 'mimeType': mime, 'name': os.path.basename(im['uri'])})
            img_map[src] = len(new_images) - 1
            gpu_bytes += size[0] * size[1] * 4 * 4 // 3
            enc_bytes += len(data)
            report.append((os.path.basename(im['uri']), size, len(data)))
        nt = {'source': img_map[src]}
        if 'sampler' in t:
            nt['sampler'] = t['sampler']
        new_textures.append(nt)
        tex_map[tex_index] = len(new_textures) - 1
        return tex_map[tex_index]

    # 1) マテリアル確定: 不要な BLEND を OPAQUE / MASK に落とす（半透明ソート・深度書き込みなし問題の回避）
    mat_json = {}
    mode_count = {'OPAQUE': 0, 'MASK': 0, 'BLEND': 0}
    for mi in used_mats:
        m = json.loads(json.dumps(j['materials'][mi]))
        ext = j['materials'][mi].get('extensions', {})
        m.pop('extensions', None)                      # clearcoat / specular を除去
        if 'KHR_materials_emissive_strength' in ext:
            m['extensions'] = {'KHR_materials_emissive_strength': ext['KHR_materials_emissive_strength']}
        m.pop('normalTexture', None)                   # 元データは 4x4 の無効値
        pbr = m.setdefault('pbrMetallicRoughness', {})
        pbr.pop('metallicRoughnessTexture', None)
        mode = m.get('alphaMode', 'OPAQUE')
        if mode == 'BLEND':
            fa = pbr.get('baseColorFactor', [1, 1, 1, 1])[3]
            bt = pbr.get('baseColorTexture')
            tmin, binary = (255, 1.0)
            if bt is not None:
                tmin, binary = alpha_stats(os.path.join(g.dir, j['images'][j['textures'][bt['index']]['source']]['uri']))
            if fa >= 0.99 and tmin == 255:
                m['alphaMode'] = 'OPAQUE'
            elif fa >= 0.99 and binary >= 0.97:
                m['alphaMode'] = 'MASK'
                m['alphaCutoff'] = 0.5
        mode = m.get('alphaMode', 'OPAQUE')
        mode_count[mode] += 1
        if mode != 'OPAQUE' and pbr.get('baseColorTexture') is not None:
            alpha_imgs.add(j['textures'][pbr['baseColorTexture']['index']]['source'])
        mat_json[mi] = m

    # 2) 画像・テクスチャ登録
    new_mats = []
    for mi in used_mats:
        m = mat_json[mi]
        pbr = m['pbrMetallicRoughness']
        if 'baseColorTexture' in pbr:
            pbr['baseColorTexture'] = {**pbr['baseColorTexture'], 'index': use_texture(pbr['baseColorTexture']['index'])}
        if 'emissiveTexture' in m:
            m['emissiveTexture'] = {**m['emissiveTexture'], 'index': use_texture(m['emissiveTexture']['index'])}
        if 'occlusionTexture' in m:
            m['occlusionTexture'] = {**m['occlusionTexture'], 'index': use_texture(m['occlusionTexture']['index'])}
        new_mats.append(m)

    prim_list = []
    total_tris = 0
    for p in merged:
        at = {}
        nv = len(p['pos'])
        v = add_view(p['pos'].astype('<f4').tobytes(), 34962)
        accessors.append({'bufferView': v, 'componentType': 5126, 'count': nv, 'type': 'VEC3',
                          'min': p['pos'].min(0).tolist(), 'max': p['pos'].max(0).tolist()})
        at['POSITION'] = len(accessors) - 1
        v = add_view(p['nrm'].astype('<f4').tobytes(), 34962)
        accessors.append({'bufferView': v, 'componentType': 5126, 'count': nv, 'type': 'VEC3'})
        at['NORMAL'] = len(accessors) - 1
        if p['uv'] is not None:
            v = add_view(p['uv'].astype('<f4').tobytes(), 34962)
            accessors.append({'bufferView': v, 'componentType': 5126, 'count': nv, 'type': 'VEC2'})
            at['TEXCOORD_0'] = len(accessors) - 1
        if nv <= 65535:
            ib = p['idx'].astype('<u2').tobytes(); ct = 5123
        else:
            ib = p['idx'].astype('<u4').tobytes(); ct = 5125
        v = add_view(ib, 34963)
        accessors.append({'bufferView': v, 'componentType': ct, 'count': len(p['idx']), 'type': 'SCALAR'})
        prim = {'attributes': at, 'indices': len(accessors) - 1, 'mode': 4}
        if p['mat'] is not None:
            prim['material'] = mat_map[p['mat']]
        prim_list.append(prim)
        total_tris += len(p['idx']) // 3

    nodes = [{'name': 'cockpit_root', 'children': list(range(1, 1 + len(prim_list)))}]
    meshes = []
    for i, pr in enumerate(prim_list):
        meshes.append({'primitives': [pr]})
        nodes.append({'name': 'part_%02d' % i, 'mesh': i})
    gl = {
        'asset': {'version': '2.0', 'generator': 'optimize-cockpit.py',
                  'extras': {'license': 'CC-BY-NC-SA-4.0', 'credit': license_text,
                             'sim': {'origin': 'captain eye point', 'forward': '+Z', 'up': '+Y', 'left': '+X',
                                     'units': 'm', 'sourceEye': list(eye)}}},
        'scene': 0, 'scenes': [{'nodes': [0]}], 'nodes': nodes, 'meshes': meshes,
        'materials': new_mats, 'accessors': accessors, 'bufferViews': views,
        'buffers': [{'byteLength': sum(len(b) for b in bin_parts)}],
    }
    if new_images:
        gl['images'] = new_images
        gl['textures'] = new_textures
        if 'samplers' in j:
            gl['samplers'] = j['samplers']
    if any('extensions' in m for m in new_mats):
        gl['extensionsUsed'] = ['KHR_materials_emissive_strength']
    # 末尾パディング
    pad = (-sum(len(b) for b in bin_parts)) % 4
    if pad:
        bin_parts.append(b'\0' * pad)
    blob = b''.join(bin_parts)
    gl['buffers'][0]['byteLength'] = len(blob)
    js = json.dumps(gl, separators=(',', ':')).encode()
    js += b' ' * ((-len(js)) % 4)
    glb = b'glTF' + struct.pack('<II', 2, 12 + 8 + len(js) + 8 + len(blob))
    glb += struct.pack('<I4s', len(js), b'JSON') + js
    glb += struct.pack('<I4s', len(blob), b'BIN\0') + blob
    return glb, dict(tris=total_tris, prims=len(prim_list), mats=len(new_mats), images=len(new_images),
                     gpu_mb=gpu_bytes / 1e6, tex_mb=enc_bytes / 1e6, report=report, modes=mode_count)


# ───────────────────────── プレビュー（検証用） ─────────────────────────
def preview(merged, g, out_png, W=900, H=420, fovy=62.0, cull_back=True, skip_blend=True):
    from PIL import ImageDraw
    j = g.j
    small = {}
    for i, im in enumerate(j['images']):
        try:
            I = Image.open(os.path.join(g.dir, im['uri'])).convert('RGBA')
            I.thumbnail((256, 256))
            small[i] = np.asarray(I)
        except Exception:
            pass
    t = np.tan(np.radians(fovy) / 2)
    asp = W / H
    L = np.array([0.3, 0.8, 0.5]); L /= np.linalg.norm(L)
    tris = []
    for p in merged:
        m = j['materials'][p['mat']] if p['mat'] is not None else {}
        pbr = m.get('pbrMetallicRoughness', {})
        fac = np.array(pbr.get('baseColorFactor', [1, 1, 1, 1]), dtype=np.float32)
        img = None
        bt = pbr.get('baseColorTexture')
        if bt is not None:
            img = small.get(j['textures'][bt['index']].get('source'))
        if skip_blend and (m.get('alphaMode') == 'BLEND' and fac[3] < 0.99):
            continue  # 半透明ガラスは描画しない
        P = p['pos'].astype(np.float64)
        idx = p['idx'].reshape(-1, 3)
        A, B, C = idx[:, 0], idx[:, 1], idx[:, 2]
        z = P[:, 2]
        zz = np.stack([z[A], z[B], z[C]], 1)
        ok = (zz > 0.05).all(1)
        fn = np.cross(P[B] - P[A], P[C] - P[A])
        ln = np.linalg.norm(fn, axis=1)
        ln[ln == 0] = 1
        fn /= ln[:, None]
        cen = (P[A] + P[B] + P[C]) / 3
        if cull_back:
            ok &= ((-cen) * fn).sum(1) > 0
        ids = np.nonzero(ok)[0]
        if not len(ids):
            continue
        # シム座標: 前 +Z / 上 +Y / 左 +X。画面の右 = -X
        sx = np.stack([-P[A[ids], 0] / zz[ids, 0], -P[B[ids], 0] / zz[ids, 1], -P[C[ids], 0] / zz[ids, 2]], 1) / (t * asp)
        sy = np.stack([P[A[ids], 1] / zz[ids, 0], P[B[ids], 1] / zz[ids, 1], P[C[ids], 1] / zz[ids, 2]], 1) / t
        vis = ~(((sx < -1.2).all(1)) | ((sx > 1.2).all(1)) | ((sy < -1.2).all(1)) | ((sy > 1.2).all(1)))
        ids, sx, sy = ids[vis], sx[vis], sy[vis]
        if not len(ids):
            continue
        base = np.tile(fac[:3], (len(ids), 1))
        if img is not None and p['uv'] is not None:
            uvc = (p['uv'][A[ids]] + p['uv'][B[ids]] + p['uv'][C[ids]]) / 3
            h, w = img.shape[:2]
            ix = (np.mod(uvc[:, 0], 1.0) * (w - 1)).astype(int)
            iy = (np.mod(uvc[:, 1], 1.0) * (h - 1)).astype(int)
            base = base * (img[iy, ix, :3].astype(np.float32) / 255.0)
        shade = 0.35 + 0.65 * np.clip((fn[ids] * L).sum(1) * 0.5 + 0.5, 0, 1)
        col = np.clip(base * shade[:, None], 0, 1)
        dep = zz[ids].mean(1)
        for k in range(len(ids)):
            tris.append((dep[k], sx[k], sy[k], col[k]))
    tris.sort(key=lambda a: -a[0])
    im = Image.new('RGB', (W, H), (120, 170, 220))
    d = ImageDraw.Draw(im)
    for _, sx, sy, c in tris:
        d.polygon([((sx[i] * .5 + .5) * W, (1 - (sy[i] * .5 + .5)) * H) for i in range(3)],
                  fill=tuple(int(v * 255) for v in c))
    im.save(out_png)


# ───────────────────────── main ─────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src_dir')
    ap.add_argument('out_glb')
    ap.add_argument('--eye', nargs=3, type=float, default=list(DEFAULT_EYE))
    ap.add_argument('--preview')
    a = ap.parse_args()

    g = Gltf(os.path.join(a.src_dir, 'scene.gltf'))
    lic_path = os.path.join(a.src_dir, 'license.txt')
    lic = open(lic_path, encoding='utf-8').read().strip() if os.path.exists(lic_path) else 'CC-BY-NC-SA-4.0'
    credit = lic[lic.find('This work is based on'):] if 'This work is based on' in lic else lic

    prims = bake(g)
    to_sim_frame(prims, a.eye)
    prims = drop_invisible(prims, g.j['materials'])
    prims, n0, n_rear = rear_cull(prims)
    st = dict(before=n0, rear=n0 - n_rear)
    VIEWS = [((0, 0, 0), 2400, 1000), ((0.10, 0, 0), 2400, 1000), ((-0.10, 0, 0), 2400, 1000),
             ((0, 0.08, 0), 2400, 1000), ((0, -0.08, 0), 2400, 1000),
             ((0.05, 0.04, 0.02), 3200, 1350), ((-0.05, -0.04, 0.02), 3200, 1350),
             ((0, 0, 0.04), 1280, 2400)]
    prims, _ = visibility_cull(prims, g.j['materials'], VIEWS)
    st['after'] = sum(len(p['idx']) // 3 for p in prims)
    merged = merge_by_material(prims)
    glb, info = build_glb(g, merged, credit, a.eye)
    os.makedirs(os.path.dirname(os.path.abspath(a.out_glb)), exist_ok=True)
    open(a.out_glb, 'wb').write(glb)

    print('三角形: %d → 後方除去 -%d → 可視性カリング後 %d' % (st['before'], st['rear'], st['after']))
    print('結合後: %d プリミティブ, %d マテリアル, %d テクスチャ' % (info['prims'], info['mats'], info['images']))
    print('alphaMode: %s' % info['modes'])
    print('テクスチャ GPU 推定 %.0f MB / 埋込サイズ %.1f MB' % (info['gpu_mb'], info['tex_mb']))
    print('GLB: %.1f MB → %s' % (len(glb) / 1e6, a.out_glb))
    if a.preview:
        preview(merged, g, a.preview)
        print('preview →', a.preview)


if __name__ == '__main__':
    sys.exit(main())
