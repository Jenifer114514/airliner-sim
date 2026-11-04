#!/usr/bin/env python3
"""PNG を色分類付き ASCII に変換（画像ビューアに依存しない検証）
 B=空(青) C=雲/白 G=緑 S=砂/茶 D=暗色 W=明色 .=水/その他
"""
import sys
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from png2ascii import decode_png

def classify(r, g, b):
    if b > 120 and b > r + 18 and b > g + 8: return 'B'   # 空
    if r > 170 and g > 170 and b > 170: return 'W'        # 白/明
    if r > 120 and g > 100 and b < 110 and r > b + 25: return 'S'  # 砂
    if g > r + 10 and g > b + 10: return 'G'              # 緑
    if r < 70 and g < 70 and b < 80: return 'D'           # 暗
    return '.'

def render(path, cols=76):
    w, h, ch, px = decode_png(path)
    rows = max(1, int(cols * h / w * 0.5))
    lines = []
    counts = {}
    for r in range(rows):
        line = ''
        for c in range(cols):
            x0 = int(c*w/cols); x1 = max(x0+1, int((c+1)*w/cols))
            y0 = int(r*h/rows); y1 = max(y0+1, int((r+1)*h/rows))
            rs = gs = bs = n = 0
            for y in range(y0, min(y1, h), 2):
                base = y*w*ch
                for x in range(x0, min(x1, w), 2):
                    i = base + x*ch
                    rs += px[i]; gs += px[i+1]; bs += px[i+2]; n += 1
            n = max(n, 1)
            k = classify(rs/n, gs/n, bs/n)
            counts[k] = counts.get(k, 0) + 1
            line += k
        lines.append(line)
    total = sum(counts.values())
    stats = ' '.join(f'{k}:{100*v//total}%' for k, v in sorted(counts.items()))
    return '\n'.join(lines) + '\n[色彩比] ' + stats

if __name__ == '__main__':
    for p in sys.argv[1:]:
        print(f'===== {p} =====')
        print(render(p))
        print()
