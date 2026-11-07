/**
 * render/lod.ts — チャンク単位の距離 LOD 更新レジストリ（v16）
 * city/nature が「近いバケット=フルメッシュ / 遠いバケット=簡易メッシュ」の
 * 切替関数を登録し、game の更新ループから 0.25s スロットルで呼ぶ。
 * Frustum Culling は InstancedMesh.boundingSphere により three が自動で行う
 *（各メッシュは build 時に computeBoundingSphere() を必ず呼ぶこと）。
 */
import * as THREE from 'three';

export interface LodEntry { update(cam: THREE.Vector3): void }

const gEntries = new Set<LodEntry>();

export const registerLod = (e: LodEntry): void => { gEntries.add(e); };
export const updateLodGroups = (cam: THREE.Vector3): void => {
  for (const e of gEntries) e.update(cam);
};
/** 近/遠のしきい [m]（水平距離・バケット中心基準） */
export const LOD_NEAR = 2600;
