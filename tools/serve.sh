#!/bin/sh
# Serve the game on the local network. Then open http://<this-computer's-IP>:8080/ on the Hearth and .../companion.html on phones.
cd "$(dirname "$0")/.." && python3 -m http.server 8080
