#!/usr/bin/env python3
"""Raw 16-bit mono PCM -> MP3 (64 kbps), for tools/voice/render.js.
usage: encode.py IN.pcm OUT.mp3 SAMPLE_RATE      (needs: pip install lameenc)
Trims silence longer than 0.35 s from each end, so the game's own pauses decide the timing."""
import sys, array
import lameenc

src, dst, rate = sys.argv[1], sys.argv[2], int(sys.argv[3])
pcm = array.array('h'); pcm.frombytes(open(src, 'rb').read())
thr, keep = 300, int(rate * 0.35)
first = next((i for i, v in enumerate(pcm) if abs(v) > thr), 0)
last = next((i for i in range(len(pcm) - 1, -1, -1) if abs(pcm[i]) > thr), len(pcm) - 1)
pcm = pcm[max(0, first - keep // 3): min(len(pcm), last + keep)]
enc = lameenc.Encoder()
enc.set_bit_rate(64); enc.set_in_sample_rate(rate); enc.set_channels(1); enc.set_quality(2)
open(dst, 'wb').write(enc.encode(pcm.tobytes()) + enc.flush())
