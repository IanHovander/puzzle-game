/* The Founders' Tongue: four shapes, each read two ways by orientation.
   Flame: ASH (upright) / COLD (inverted) · Spike: THORN / WELL · Hook: KNOT / VEIL · Crown: CROWN / EMBER.
   Shapes are drawn in a -20..20 box, deliberately asymmetric top-to-bottom so inversion (rotate 180°) is visible.
   Shared by Hearth and Companion. */
(function () {
  'use strict';
  const G = {};
  const st = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const SHAPES = {
    Flame: `<path d="M0,-16 C6,-8 10,-2 10,4 C10,11 5,15 0,15 C-5,15 -10,11 -10,4 C-10,-2 -6,-8 0,-16 Z" ${st}/><path d="M0,15 L0,4" ${st}/>`,
    Spike: `<path d="M0,-16 L7,-4 L2,-4 L2,10 L-2,10 L-2,-4 L-7,-4 Z" ${st}/><path d="M-11,15 L11,15" ${st}/>`,
    Hook:  `<path d="M2,15 L2,-8 C2,-14 -5,-15 -8,-10" ${st}/><path d="M-5,15 L9,15" ${st}/>`,
    Crown: `<path d="M-13,12 L-13,-4 L-6,3 L0,-14 L6,3 L13,-4 L13,12 Z" ${st}/>`,
  };
  // glyph name -> {shape, inverted}
  const GLYPHS = {
    ASH:   { shape: 'Flame', inv: false, step: 0, gloss: 'fire; the Hearth; warmth' },
    COLD:  { shape: 'Flame', inv: true,  step: null, gloss: 'the cold; the wound; the space left when warmth goes; a hollow' },
    THORN: { shape: 'Spike', inv: false, step: 1, gloss: 'a gate; to go through' },
    WELL:  { shape: 'Spike', inv: true,  step: 4, gloss: 'down; a going-down; from' },
    KNOT:  { shape: 'Hook',  inv: false, step: 2, gloss: 'bound; together; four-as-one' },
    VEIL:  { shape: 'Hook',  inv: true,  step: 5, gloss: 'hidden; apart; behind' },
    CROWN: { shape: 'Crown', inv: false, step: 6, gloss: 'one; the first; the chosen; the Chair' },
    EMBER: { shape: 'Crown', inv: true,  step: 3, gloss: 'what remains; to keep; to close' },
  };
  const PAIR = { ASH: 'COLD', COLD: 'ASH', THORN: 'WELL', WELL: 'THORN', KNOT: 'VEIL', VEIL: 'KNOT', CROWN: 'EMBER', EMBER: 'CROWN' };
  const ORDER = ['ASH', 'THORN', 'KNOT', 'EMBER', 'WELL', 'VEIL', 'CROWN', 'COLD']; // ladder order (COLD = rest)
  const LADDER = ['ASH', 'THORN', 'KNOT', 'EMBER', 'WELL', 'VEIL', 'CROWN'];
  const MIDI = { ASH: 72, THORN: 74, KNOT: 76, EMBER: 77, WELL: 79, VEIL: 81, CROWN: 83, COLD: null };

  G.SHAPES = SHAPES; G.GLYPHS = GLYPHS; G.PAIR = PAIR; G.ORDER = ORDER; G.LADDER = LADDER; G.MIDI = MIDI;
  G.names = Object.keys(GLYPHS);
  G.invert = (name) => PAIR[name];
  G.shapeOf = (name) => GLYPHS[name].shape;
  /* Read a shape in a given orientation: upright gives the base glyph, inverted gives its pair. */
  G.read = (shape, inverted) => { for (const n in GLYPHS) if (GLYPHS[n].shape === shape && GLYPHS[n].inv === !!inverted) return n; return null; };

  /* Inner SVG fragment for a glyph name (already oriented). Use inside <svg viewBox="-20 -20 40 40">. */
  G.inner = function (name, opts) {
    opts = opts || {};
    const g = GLYPHS[name]; if (!g) return `<text y="6" text-anchor="middle" font-size="12" fill="currentColor">${name}</text>`;
    const rot = (g.inv ? 180 : 0) + (opts.rot || 0);
    return `<g transform="rotate(${rot})">${SHAPES[g.shape]}</g>`;
  };
  /* Inner SVG for a raw shape drawn as carved (physically): upright or physically inverted. */
  G.shapeInner = function (shape, physInverted, opts) { return `<g transform="rotate(${physInverted ? 180 : 0})">${SHAPES[shape]}</g>`; };

  /* Standalone <svg> for a glyph. */
  G.svg = function (name, opts) {
    opts = opts || {};
    const size = opts.size || 40, color = opts.color || 'currentColor';
    return `<svg viewBox="-20 -20 40 40" width="${size}" height="${size}" style="color:${color};display:inline-block;vertical-align:middle;overflow:visible" class="fg-glyph">${G.inner(name, opts)}${opts.worn ? '<rect x="-20" y="-20" width="40" height="40" fill="rgba(11,10,16,0.45)"/>' : ''}</svg>`;
  };
  G.shapeSvg = function (shape, physInverted, opts) {
    opts = opts || {};
    const size = opts.size || 40, color = opts.color || 'currentColor';
    return `<svg viewBox="-20 -20 40 40" width="${size}" height="${size}" style="color:${color};display:inline-block;vertical-align:middle;overflow:visible" class="fg-glyph">${G.shapeInner(shape, physInverted)}</svg>`;
  };

  /* An inscription: a row of carved shapes. Each item {shape, inv:boolean(physically inverted), worn?, hidden?}.
     mark: 'left' | 'right' | null (drawn only if showMark). Returns <svg>. */
  G.inscription = function (items, opts) {
    opts = opts || {};
    const cell = 56, h = 72, w = items.length * cell + 40;
    let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;display:block;margin:0 auto" class="inscription-svg">`;
    s += `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    items.forEach((it, i) => {
      const x = 20 + i * cell + cell / 2, y = h / 2;
      if (it.hidden) { s += `<rect x="${x - 22}" y="${y - 22}" width="44" height="44" fill="#3a3540" rx="3"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="10" fill="#8a8090" font-family="Cinzel,serif">SHIELD</text>`; return; }
      s += `<g transform="translate(${x},${y}) scale(1.1)" style="color:${it.color || (opts.color || '#e9e2d2')}" opacity="${it.worn ? 0.5 : 1}">${G.shapeInner(it.shape, it.inv)}</g>`;
      if (it.label) s += `<text x="${x}" y="${h - 6}" text-anchor="middle" font-size="9" fill="rgba(233,226,210,0.5)" font-family="Cinzel,serif">${it.label}</text>`;
    });
    if (opts.showMark && opts.mark) { const mx = opts.mark === 'left' ? 10 : w - 10; s += `<path d="M${mx},${h / 2 - 8} L${mx + (opts.mark === 'left' ? 6 : -6)},${h / 2} L${mx},${h / 2 + 8} Z" fill="${opts.markColor || '#9b7bd8'}"/>`; }
    return s + `</svg>`;
  };

  /* Reading helpers (deterministic): naive reads each shape as physically shown; turned reads right-to-left and inverts every reading. */
  G.readNaive = (items) => items.map(it => G.read(it.shape, it.inv));
  G.readTurned = (items) => items.slice().reverse().map(it => G.invert(G.read(it.shape, it.inv)));
  G.readLine = (items, mark) => mark === 'right' ? G.readTurned(items) : G.readNaive(items);

  /* Steps between consecutive glyphs on the ladder. Returns an array with one entry per glyph after the first:
     a number (the step from the last glyph that sounded), 'rest' (this glyph is COLD, a pause), or 'start'
     (this glyph sounds first — only when the row opens with a rest). A rest is a pause, not a reset: the glyph
     after it is measured from the last one that sounded. */
  G.steps = function (names) {
    const out = []; let last = null;
    for (let i = 0; i < names.length; i++) {
      const g = GLYPHS[names[i]]; const s = g ? g.step : null;
      if (i === 0) { if (s != null) last = s; continue; }
      if (s == null) out.push('rest');
      else if (last == null) { out.push('start'); last = s; }
      else { out.push(s - last); last = s; }
    }
    return out;
  };
  G.stepsText = (names) => G.steps(names).map(s => s === 'rest' ? 'then a rest' : s === 'start' ? 'then it begins' : s === 0 ? 'the same' : (s > 0 ? 'up ' + s : 'down ' + (-s))).join(', ');
  /* Which orderings of a set match a contour? (used to verify uniqueness) */
  G.orderingsMatching = function (set, contour) {
    const res = []; const perm = (arr, m) => { if (!arr.length) { if (JSON.stringify(G.steps(m)) === JSON.stringify(contour)) res.push(m.slice()); return; } arr.forEach((x, i) => perm(arr.slice(0, i).concat(arr.slice(i + 1)), m.concat([x]))); };
    perm(set, []);
    const seen = new Set(); return res.filter(m => { const k = m.join(','); if (seen.has(k)) return false; seen.add(k); return true; });
  };

  window.VigilGlyphs = G;
})();
