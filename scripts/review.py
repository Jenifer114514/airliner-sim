#!/usr/bin/env python3
"""検証用スクリーンショットを半分サイズのユニーク名 PNG に変換（ビューア回避）"""
import sys, zlib, struct, random, string

def decode_png(path):
    data = open(path, 'rb').read()
    pos, idat = 8, b''
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
    channels = {0:1,2:3,3:1,4:2,6:4}[colortype]
    stride = w * channels
    out = bytearray(w * h * channels)
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if f == 1:
            for i in range(channels, stride): line[i] = (line[i] + line[i-channels]) & 0xff
        elif f == 2:
            for i in range(stride): line[i] = (line[i] + prev[i]) & 0xff
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

def encode_png(w, h, rgb):
    def chunk(ctype, data):
        c = struct.pack('>I', len(data)) + ctype + data
        return c + struct.pack('>I', zlib.crc32(ctype + data) & 0xffffffff)
    raw = b''.join(b'\x00' + bytes(rgb[y*w*3:(y+1)*w*3]) for y in range(h))
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(raw, 6))
            + chunk(b'IEND', b''))

def scale(path, out, factor=2):
    w, h, ch, px = decode_png(path)
    ow, oh = w//factor, h//factor
    rgb = bytearray(ow*oh*3)
    for y in range(oh):
        for x in range(ow):
            rs = gs = bs = 0
            for dy in range(factor):
                base = ((y*factor+dy)*w + x*factor)*ch
                for dx in range(factor):
                    i = base + dx*ch
                    rs += px[i]; gs += px[i+1]; bs += px[i+2]
            n = factor*factor
            o = (y*ow+x)*3
            rgb[o] = rs//n; rgb[o+1] = gs//n; rgb[o+2] = bs//n
    open(out, 'wb').write(encode_png(ow, oh, rgb))
    print(out)

if __name__ == '__main__':
    tag = ''.join(random.choices(string.ascii_lowercase, k=4))
    outdir = sys.argv[1]
    for p in sys.argv[2:]:
        name = p.split('/')[-1].replace('.png', '')
        scale(p, f'{outdir}/rv-{tag}-{name}.png', 2)
