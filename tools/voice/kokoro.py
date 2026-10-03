#!/usr/bin/env python3
"""Local voice for tools/voice/render.js --engine kokoro (run tools/voice/setup-kokoro.sh first).
usage: kokoro.py JOBS.json
Kokoro cannot take spoken direction, so the acting here is timing: each line is spoken phrase by
phrase (the game's own phrase breaks), joined with silences, and the turn of a joke (a short last
sentence after a beat) is said slower and quieter. A line's "pace" (stakes, omen, hush, brisk) sets
its speed and how long it lets silences run. Voices may be blends of Kokoro's voices."""
import json, os, sys, numpy as np, lameenc
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__)); C = os.path.join(HERE, '.cache'); SR = 24000
PACE = {  # speed multiplier, silence multiplier
    None: (1.0, 1.0), 'stakes': (0.88, 1.5), 'omen': (0.82, 1.6), 'hush': (0.92, 1.3), 'brisk': (1.07, 0.75)}
job = json.load(open(sys.argv[1]))
k = Kokoro(os.path.join(C, 'kokoro.onnx'), os.path.join(C, 'voices.npz'))
V = dict(np.load(os.path.join(C, 'voices.npz')))

def voice(spec):
    b = spec['blend']; return sum(w * V[n] for n, w in b.items()) / sum(b.values())

def trim(a, thr=0.01, pad=0.03):
    i = np.where(np.abs(a) > thr)[0]
    return a if not len(i) else a[max(0, i[0] - int(pad * SR)): i[-1] + int(pad * SR)]

def rms(a): return float(np.sqrt(np.mean(a ** 2))) or 1.0

for n, line in enumerate(job['lines']):
    spec = job['voices'][line['voice']]; vv = voice(spec)
    sp, gap = PACE.get(line.get('pace'), PACE[None])
    parts, ph = [], line['phrases']
    for i, p in enumerate(ph):
        turn = p.get('turn')
        speed = spec.get('speed', 1.0) * sp * (0.93 if turn else 1.0)
        a, _ = k.create(p['text'], voice=vv, speed=float(min(1.6, max(0.6, speed))), lang='en-gb')
        a = trim(a); a = a / rms(a) * 0.075 * (0.8 if turn else 1.0)
        parts.append(a.astype(np.float32))
        if i < len(ph) - 1: parts.append(np.zeros(int(p['pause'] * 1.6 * gap / 1000 * SR), np.float32))
    a = np.concatenate(parts)
    pcm = (np.clip(a, -1, 1) * 32767).astype('<i2').tobytes()
    e = lameenc.Encoder(); e.set_bit_rate(64); e.set_in_sample_rate(SR); e.set_channels(1); e.set_quality(2)
    os.makedirs(os.path.dirname(line['out']), exist_ok=True)
    open(line['out'], 'wb').write(e.encode(pcm) + e.flush())
    print(f"{n + 1}/{len(job['lines'])} {line['who']:<9} {len(a) / SR:5.1f}s  {ph[0]['text'][:60]}", flush=True)
