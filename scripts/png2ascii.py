#!/usr/bin/env python3
"""PNG を ASCII アートに変換して表示（画像ビューアに依存しない検証用）"""
import sys, zlib, struct

def decode_png(path):
    data = open(path, 'rb').read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    pos = 8
    idat = b''
    w = h = bitdepth = colortype = None
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+length]
        if ctype == b'IHDR':
            w, h, bitdepth, colortype = struct.unpack('>IIBB', chunk[:10])
        elif ctype == b'IDAT':
            idat += chunk
        elif ctype == b'IEND':
            break
        pos += 12 + length
    raw = zlib.decompress(idat)
    channels = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[colortype]
    assert bitdepth == 8, 'only 8-bit supported'
    stride = w * channels
    out = bytearray(w * h * channels)
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if f == 1:
            for i in range(channels, stride):
                line[i] = (line[i] + line[i-channels]) & 0xff
        elif f == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xff
        elif f == 3:
            for i in range(stride):
                a = line[i-channels] if i >= channels else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xff
        elif f == 4:
            for i in range(stride):
                a = line[i-channels] if i >= channels else 0
                b = prev[i]
                c = prev[i-channels] if i >= channels else 0
                pa, pb, pc = abs(b-c), abs(a-c), abs(a+b-2*c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 0xff
        out[y*stride:(y+1)*stride] = line
        prev = line
    return w, h, channels, out

def ascii_art(path, cols=76):
    w, h, ch, px = decode_png(path)
    rows = max(1, int(cols * h / w * 0.5))
    chars = ' .:-=+*#%@'
    result = []
    for r in range(rows):
        line = ''
        for c in range(cols):
            x0, x1 = int(c*w/cols), max(int(c*w/cols)+1, int((c+1)*w/cols))
            y0, y1 = int(r*h/rows), max(int(r*h/rows)+1, int((r+1)*h/rows))
            rs = gs = bs = n = 0
            for y in range(y0, min(y1, h), 2):
                base = y*w*ch
                for x in range(x0, min(x1, w), 2):
                    i = base + x*ch
                    rs += px[i]; gs += px[i+1] if ch > 1 else px[i]; bs += px[i+2] if ch > 2 else px[i]
                    n += 1
            if n == 0: n = 1
            r_, g_, b_ = rs/n, gs/n, bs/n
            lum = 0.299*r_ + 0.587*g_ + 0.114*b_
            line += chars[min(len(chars)-1, int(lum/256*len(chars)))]
        result.append(line)
    return '\n'.join(result)

if __name__ == '__main__':
    for p in sys.argv[1:]:
        print(f'===== {p} =====')
        print(ascii_art(p))
        print()
