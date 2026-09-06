/* Procedural SVG scene art. Every scene is composed from primitives; deterministic via seeded RNG. */
(function () {
  'use strict';
  const Art = { scenes: {} };
  const W = 1600, H = 900;

  function rng(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------- primitives ---------- */
  const P = {};
  P.sky = (top, bottom, id) => `<defs><linearGradient id="${id || 'sky'}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id || 'sky'})"/>`;
  P.stars = (n, seed, maxY) => { const r = rng(seed || 7); let s = '<g class="stars">'; for (let i = 0; i < n; i++) { const x = r() * W, y = r() * (maxY || H * 0.6), rad = 0.5 + r() * 1.6, o = 0.3 + r() * 0.7; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#e8ecff" opacity="${o.toFixed(2)}"><animate attributeName="opacity" values="${o.toFixed(2)};${(o * 0.3).toFixed(2)};${o.toFixed(2)}" dur="${(2 + r() * 5).toFixed(1)}s" repeatCount="indefinite"/></circle>`; } return s + '</g>'; };
  P.moon = (x, y, r, color) => `<defs><radialGradient id="moonglow"><stop offset="0" stop-color="${color || '#fff3d0'}" stop-opacity=".55"/><stop offset="1" stop-color="${color || '#fff3d0'}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r * 4}" fill="url(#moonglow)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${color || '#fff3d0'}"/><circle cx="${x + r * 0.35}" cy="${y - r * 0.2}" r="${r * 0.9}" fill="${color || '#fff3d0'}" opacity="0"/>`;
  P.mountains = (color, seed, base, amp, n) => { const r = rng(seed || 3); let d = `M0,${H} L0,${base}`; const step = W / (n || 10); for (let i = 0; i <= (n || 10); i++) { const x = i * step, y = base - r() * amp; d += ` L${(x - step * 0.5 + r() * step * 0.4).toFixed(0)},${y.toFixed(0)} L${x.toFixed(0)},${(base - r() * amp * 0.3).toFixed(0)}`; } d += ` L${W},${H} Z`; return `<path d="${d}" fill="${color}"/>`; };
  P.fog = (y, h, color, op) => `<defs><linearGradient id="fog${y}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0"/><stop offset=".5" stop-color="${color}" stop-opacity="${op || 0.5}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><rect x="0" y="${y}" width="${W}" height="${h}" fill="url(#fog${y})"/>`;
  P.ground = (y, color) => `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${color}"/>`;
  P.tower = (x, base, w, h, color, windows) => {
    let s = `<g class="tower">`;
    s += `<path d="M${x - w / 2},${base} L${x - w / 2 + w * 0.08},${base - h} L${x + w / 2 - w * 0.08},${base - h} L${x + w / 2},${base} Z" fill="${color}"/>`;
    // battlements
    const bw = w * 0.84, bx = x - bw / 2, ty = base - h; const teeth = 7;
    for (let i = 0; i < teeth; i++) if (i % 2 === 0) s += `<rect x="${(bx + i * bw / teeth).toFixed(0)}" y="${ty - w * 0.1}" width="${(bw / teeth).toFixed(0)}" height="${w * 0.1}" fill="${color}"/>`;
    // spire
    s += `<path d="M${x - bw * 0.35},${ty - w * 0.1} L${x},${ty - h * 0.45} L${x + bw * 0.35},${ty - w * 0.1} Z" fill="${color}"/>`;
    if (windows) for (let i = 0; i < windows; i++) { const wy = base - h * (0.2 + i * 0.7 / windows); s += `<path d="M${x - w * 0.05},${wy} a${w * 0.05},${w * 0.06} 0 0 1 ${w * 0.1},0 v${w * 0.12} h-${w * 0.1} Z" fill="#ffd27a" opacity=".85"><animate attributeName="opacity" values=".85;.6;.9;.7;.85" dur="${3 + i}s" repeatCount="indefinite"/></path>`; }
    return s + '</g>';
  };
  P.door = (x, y, w, h, frame, glow) => {
    let s = `<g class="door">`;
    if (glow) s += `<defs><radialGradient id="doorglow" cx=".5" cy=".5"><stop offset="0" stop-color="${glow}" stop-opacity=".9"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient></defs><ellipse cx="${x}" cy="${y + h * 0.4}" rx="${w * 1.6}" ry="${h * 0.9}" fill="url(#doorglow)"><animate attributeName="opacity" values="1;.6;1" dur="4s" repeatCount="indefinite"/></ellipse>`;
    s += `<path d="M${x - w / 2 - 22},${y + h} L${x - w / 2 - 22},${y + w / 2} A${w / 2 + 22},${w / 2 + 22} 0 0 1 ${x + w / 2 + 22},${y + w / 2} L${x + w / 2 + 22},${y + h} Z" fill="${frame}"/>`;
    s += `<path d="M${x - w / 2},${y + h} L${x - w / 2},${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w / 2},${y + w / 2} L${x + w / 2},${y + h} Z" fill="${glow ? glow : '#0a0810'}" opacity="${glow ? 0.35 : 1}"/>`;
    s += `<line x1="${x}" y1="${y + w / 2 + 10}" x2="${x}" y2="${y + h}" stroke="${frame}" stroke-width="4"/>`;
    return s + '</g>';
  };
  P.pillars = (n, y, h, color, seed) => { let s = ''; for (let i = 0; i < n; i++) { const t = (i + 0.5) / n, x = t * W, sc = 0.7 + 0.6 * Math.abs(t - 0.5); s += `<rect x="${(x - 22 * sc).toFixed(0)}" y="${(y - h * sc).toFixed(0)}" width="${(44 * sc).toFixed(0)}" height="${(h * sc).toFixed(0)}" fill="${color}"/><rect x="${(x - 34 * sc).toFixed(0)}" y="${(y - h * sc - 18 * sc).toFixed(0)}" width="${(68 * sc).toFixed(0)}" height="${(18 * sc).toFixed(0)}" fill="${color}"/>`; } return s; };
  P.floorTiles = (y, color, line) => { let s = `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${color}"/>`; for (let i = -6; i <= 6; i++) s += `<line x1="${W / 2 + i * 60}" y1="${y}" x2="${W / 2 + i * 260}" y2="${H}" stroke="${line}" stroke-width="1"/>`; for (let j = 0; j < 6; j++) { const yy = y + Math.pow(j / 5, 1.7) * (H - y); s += `<line x1="0" y1="${yy.toFixed(0)}" x2="${W}" y2="${yy.toFixed(0)}" stroke="${line}" stroke-width="1"/>`; } return s; };
  P.torch = (x, y, scale) => { const sc = scale || 1; return `<g transform="translate(${x},${y}) scale(${sc})"><rect x="-4" y="0" width="8" height="60" fill="#3b2a1a"/><ellipse cx="0" cy="-8" rx="10" ry="18" fill="#ff9a3c"><animate attributeName="ry" values="18;22;16;20;18" dur="0.7s" repeatCount="indefinite"/></ellipse><ellipse cx="0" cy="-10" rx="5" ry="10" fill="#fff0a0"/><circle cx="0" cy="-8" r="60" fill="#ff9a3c" opacity=".12"><animate attributeName="opacity" values=".12;.18;.1;.15;.12" dur="0.9s" repeatCount="indefinite"/></circle></g>`; };
  P.trees = (n, base, color, seed, minH, maxH) => { const r = rng(seed || 11); let s = ''; for (let i = 0; i < n; i++) { const x = r() * W, h = (minH || 120) + r() * ((maxH || 300) - (minH || 120)), w = h * 0.35; s += `<path d="M${x},${base - h} L${x + w / 2},${base - h * 0.55} L${x + w * 0.25},${base - h * 0.55} L${x + w * 0.7},${base - h * 0.2} L${x + w * 0.4},${base - h * 0.2} L${x + w},${base} L${x - w},${base} L${x - w * 0.4},${base - h * 0.2} L${x - w * 0.7},${base - h * 0.2} L${x - w * 0.25},${base - h * 0.55} L${x - w / 2},${base - h * 0.55} Z" fill="${color}"/>`; } return s; };
  P.circleRunes = (cx, cy, r, n, color, seed) => { const rr = rng(seed || 5); let s = `<g class="runes"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2" opacity=".6"/><circle cx="${cx}" cy="${cy}" r="${r * 0.86}" fill="none" stroke="${color}" stroke-width="1" opacity=".4"/>`; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, x = cx + Math.cos(a) * r * 0.93, y = cy + Math.sin(a) * r * 0.93; s += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${(a * 180 / Math.PI + 90).toFixed(0)})">${P.rune(Math.floor(rr() * 12), color, 14)}</g>`; } s += `<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="240s" repeatCount="indefinite"/></g>`; return s; };
  P.rune = (i, color, size) => { const s = size || 20; const shapes = ['M-1,-1 L0,1 L1,-1', 'M-1,0 L1,0 M0,-1 L0,1', 'M-1,-1 L1,1 M-1,1 L1,-1', 'M0,-1 L1,0 L0,1 L-1,0 Z', 'M-1,-1 L-1,1 L1,1', 'M-1,1 L0,-1 L1,1 M-.5,0 L.5,0', 'M0,-1 L0,1 M-1,-.3 L1,-.3', 'M-1,-1 L1,-1 L-1,1 L1,1', 'M0,-1 L0,1 M-1,0 L0,-1 L1,0', 'M-1,-1 L1,1 L-1,1', 'M-1,0 L1,0 M-.5,-1 L-.5,1 M.5,-1 L.5,1', 'M0,-1 A1,1 0 1 1 0,1 M0,-1 L0,1']; return `<path d="${shapes[i % shapes.length]}" transform="scale(${s / 2})" fill="none" stroke="${color}" stroke-width="${2.2 / (s / 20)}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  P.figures = (list, base, color) => list.map(f => `<g transform="translate(${f.x},${base}) scale(${f.s || 1})"><ellipse cx="0" cy="-8" rx="16" ry="6" fill="#000" opacity=".3"/><path d="M-14,0 L-10,-70 L10,-70 L14,0 Z" fill="${f.color || color}"/><circle cx="0" cy="-82" r="12" fill="${f.color || color}"/></g>`).join('');
  P.vignetteRect = () => `<defs><radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#vig)"/>`;
  P.lightBeam = (x, y, w, h, color) => `<path d="M${x - 20},${y} L${x + 20},${y} L${x + w},${y + h} L${x - w},${y + h} Z" fill="${color}" opacity=".12"><animate attributeName="opacity" values=".12;.2;.12" dur="5s" repeatCount="indefinite"/></path>`;
  P.water = (y, color, seed) => { const r = rng(seed || 9); let s = `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${color}"/>`; for (let i = 0; i < 24; i++) { const yy = y + r() * (H - y), x = r() * W, len = 60 + r() * 220; s += `<line x1="${x}" y1="${yy}" x2="${x + len}" y2="${yy}" stroke="#fff" stroke-width="1" opacity=".08"><animate attributeName="opacity" values=".08;.16;.08" dur="${(2 + r() * 3).toFixed(1)}s" repeatCount="indefinite"/></line>`; } return s; };
  P.wrap = (inner, cls) => `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="scene ${cls || ''}">${inner}${P.vignetteRect()}</svg>`;
  Art.P = P; Art.W = W; Art.H = H; Art.rng = rng;

  /* ---------- scene registry ---------- */
  Art.define = (name, fn) => { Art.scenes[name] = fn; };
  Art.render = function (name, params) {
    const fn = Art.scenes[name] || Art.scenes.blank;
    try { return fn(params || {}); } catch (e) { console.error('art', name, e); return Art.scenes.blank({}); }
  };
  Art.animate = function () {};

  Art.define('blank', () => P.wrap(P.sky('#15121d', '#0b0a10')));
  Art.define('title', () => P.wrap(
    P.sky('#070812', '#1b1430') + P.stars(220, 21) + P.moon(1330, 128, 40) +
    P.mountains('#0f0d1c', 4, 640, 260, 9) + P.mountains('#0a0913', 5, 720, 200, 12) +
    P.tower(800, 760, 150, 420, '#0d0b16', 5) + P.fog(600, 260, '#2a2140', 0.5) + P.ground(760, '#080711')
  ));

  window.VigilArt = Art;
})();
