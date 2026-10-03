#!/bin/sh
# Installs the local voice (Kokoro-82M, Apache-2.0) used by `render.js --engine kokoro`. No API key.
# The model and voices come from the npm package expo-kokoro, which bundles them; the runtime is
# PyPI's kokoro-onnx. Everything lands in tools/voice/.cache (git-ignored), about 400 MB with Python deps.
set -e
here=$(cd "$(dirname "$0")" && pwd); c="$here/.cache"; mkdir -p "$c"; cd "$c"
[ -x venv/bin/python ] || python3 -m venv venv
venv/bin/pip install -q kokoro-onnx lameenc numpy
if [ ! -f kokoro.onnx ]; then
  t=$(npm pack expo-kokoro@1.1.9 --silent | tail -1); mkdir -p pkg; tar xzf "$t" -C pkg; rm -f "$t"
  mv pkg/package/build/kokoro-quantized.onnx kokoro.onnx
  venv/bin/python - <<'PY'
import numpy as np, glob, os
V = {os.path.basename(f)[:-4]: np.fromfile(f, dtype=np.float32).reshape(-1, 1, 256)
     for f in glob.glob('pkg/package/build/voices/*.bin') if os.path.basename(f)[0] in 'ab'}
np.savez('voices.npz', **V); print(len(V), 'voices')
PY
  rm -rf pkg
fi
echo "Kokoro ready in $c"
