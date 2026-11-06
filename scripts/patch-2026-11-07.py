#!/usr/bin/env python3
# v13-A: 稜線強化（ridged 3oct + 高周波 r3）/ 侵食溝カラー / 岩盤地層ゆらぎ / 谷底暗部 / detail normal 延伸
# 高度関数は CPU/GPU 同一式ミラー必須。断片側は色・法線のみ（高度不変 → 物理/配置無影響は r3 以外）
import io

p = 'src/render/terrain.ts'
with io.open(p, encoding='utf-8') as f:
    s = f.read()

def rep(old, new):
    global s
    assert s.count(old) == 1, f"NOT FOUND/AMBIGUOUS -> {old[:80]!r} (count={s.count(old)})"
    s = s.replace(old, new)

# 1) CPU relief: r1/r2 oct 2→3 + r3 追加 + return
rep("""  // 山脈: リッジノイズ 2 系統 × 存在マスク（base から導出して octave 節約）
  const r1 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00013 + 21.3, wz * 0.00013 + 5.9, 2) - 1), 2.2);
  const r2 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00009 + 40.7, wz * 0.00009 + 17.2, 2) - 1), 2.6);""",
"""  // 山脈: リッジノイズ 3 系統 × 存在マスク（2026-11-07 A-1: 2→3oct 化＋波長 3.8km の尖稜 r3。
  // 硬い尾根・V 谷をリアルタイム予算内で。GLSL reliefV と完全一致必須——物理/配置が追随する）
  const r1 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00013 + 21.3, wz * 0.00013 + 5.9, 3) - 1), 2.2);
  const r2 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00009 + 40.7, wz * 0.00009 + 17.2, 3) - 1), 2.6);
  const r3 = Math.pow(1 - Math.abs(2 * fbm(wx * 0.00026 + 61.3, wz * 0.00026 + 33.7, 3) - 1), 3.1);""")

rep("""  return (base - 0.31) * 900 + (r1 * 1900 + r2 * 1100) * mask + hills + detail + swell;""",
"""  return (base - 0.31) * 900 + (r1 * 1900 + r2 * 1100 + r3 * 300) * mask + hills + detail + swell;""")

# 2) GPU reliefV: 同一式ミラー
rep("""  float r1 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00013 + vec2(21.3, 5.9), 2) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00009 + vec2(40.7, 17.2), 2) - 1.0), 2.6);""",
"""  float r1 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00013 + vec2(21.3, 5.9), 3) - 1.0), 2.2);
  float r2 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00009 + vec2(40.7, 17.2), 3) - 1.0), 2.6);
  float r3 = pow(1.0 - abs(2.0 * fbm2(wp * 0.00026 + vec2(61.3, 33.7), 3) - 1.0), 3.1);""")

rep("""  return (base - 0.31) * 900.0 + (r1 * 1900.0 + r2 * 1100.0) * mask + hills + detail + swell;""",
"""  return (base - 0.31) * 900.0 + (r1 * 1900.0 + r2 * 1100.0 + r3 * 300.0) * mask + hills + detail + swell;""")

# 3) 断片: 岩盤地層ゆらぎ(A-3) + 侵食溝(A-2) + 谷底暗部(A-4)。既存 nA（930m 帯）を再利用し采样増を最小化
rep("""    float rock = clamp((slope - 0.22) / 0.40, 0.0, 1.0) * 0.9 + clamp((h - 620.0) / 520.0, 0.0, 1.0) * 0.8;
    col = mix(col, cRock, clamp(rock, 0.0, 1.0));""",
"""    float rock = clamp((slope - 0.22) / 0.40, 0.0, 1.0) * 0.9 + clamp((h - 620.0) / 520.0, 0.0, 1.0) * 0.8;
    rock = clamp(rock, 0.0, 1.0);
    // A-3: 岩盤は高さ帯の地層ゆらぎで暖/寒の岩色を分ける（ベタ塗り感の排除）
    float band = 0.5 + 0.5 * sin(h * 0.038 + nA * 4.2);
    col = mix(col, mix(cRock, vec3(0.353, 0.302, 0.255), band * 0.75), rock);
    // A-2: 侵食溝（色のみ。高度は不変 → 物理/配置に無影響。7.4km 外は打ち切り）
    float erQ = (1.0 - smoothstep(4200.0, 7400.0, distC)) * nearQ * smoothstep(6.0, 60.0, h) * (1.0 - af);
    if (erQ > 0.02) {
      float er = vnoise(vTXZ * 0.042 + vec2(13.7, 4.2));
      float er2 = vnoise(vTXZ * 0.0106 + vec2(8.8, 2.5));
      float rill = smoothstep(0.56, 0.74, er) * (0.35 + 0.65 * er2) * clamp(slope * 4.0, 0.0, 1.0);
      col *= mix(1.0, 0.865, rill * 0.8 * erQ);
      col *= mix(1.0, 0.955 + 0.09 * er2, erQ * 0.8);
    }
    // A-4: 谷底の収斂影（既存の低周波 nA 帯域を再利用。采样増ゼロの近似 AO）
    col *= 1.0 - 0.09 * (1.0 - smoothstep(45.0, 300.0, h)) * smoothstep(0.30, 0.56, nA);""")

# 4) 法線ディテールの到達距離 1450→2600m（30m 波長テクスチャ。エイリア是まで延伸）
rep("gDetQ = 1.0 - smoothstep(300.0, 1450.0,",
    "gDetQ = 1.0 - smoothstep(320.0, 2600.0,")

with io.open(p, 'w', encoding='utf-8') as f:
    f.write(s)
print('V13-A PATCH DONE')
