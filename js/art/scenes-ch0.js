/* Art — Prologue */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;

  // A great fire in a stone hall, the prophecy stone above it.
  function fire(x, base, scale, blue) {
    const sc = scale || 1; const c1 = blue ? '#4fb3bf' : '#ff9a3c', c2 = blue ? '#a8e6ee' : '#ffe08a';
    let s = `<g transform="translate(${x},${base}) scale(${sc})">`;
    s += `<ellipse cx="0" cy="0" rx="260" ry="40" fill="${c1}" opacity=".18"/>`;
    for (let i = 0; i < 7; i++) { const dx = (i - 3) * 38, h = 180 + (i % 2) * 60 - Math.abs(i - 3) * 30; s += `<path d="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" fill="${c1}" opacity=".85"><animate attributeName="d" values="M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 46},-${h * 0.35} ${dx - 4},-${h * 0.7} ${dx + 8},-${h * 1.08} C${dx + 14},-${h * 0.6} ${dx + 36},-${h * 0.45} ${dx + 30},0 Z;M${dx - 30},0 C${dx - 40},-${h * 0.4} ${dx - 10},-${h * 0.6} ${dx},-${h} C${dx + 10},-${h * 0.6} ${dx + 40},-${h * 0.4} ${dx + 30},0 Z" dur="${(1.6 + i * 0.23).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    for (let i = 0; i < 5; i++) { const dx = (i - 2) * 40, h = 110 + (i % 2) * 40; s += `<path d="M${dx - 18},0 C${dx - 22},-${h * 0.4} ${dx - 6},-${h * 0.6} ${dx},-${h} C${dx + 6},-${h * 0.6} ${dx + 22},-${h * 0.4} ${dx + 18},0 Z" fill="${c2}" opacity=".9"><animate attributeName="opacity" values=".9;.6;.95;.7;.9" dur="${(0.9 + i * 0.17).toFixed(2)}s" repeatCount="indefinite"/></path>`; }
    s += `<circle cx="0" cy="-60" r="300" fill="${c1}" opacity=".12"><animate attributeName="opacity" values=".12;.18;.1;.15;.12" dur="1.3s" repeatCount="indefinite"/></circle>`;
    return s + '</g>';
  }
  A.fire = fire;

  A.define('ch0_hearthfire', () => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    P.pillars(6, 760, 620, '#0d0a10') +
    `<rect x="560" y="330" width="480" height="430" fill="#120d12"/>` +
    `<path d="M560,330 A240,240 0 0 1 1040,330" fill="#120d12"/>` +
    `<rect x="600" y="200" width="400" height="110" rx="4" fill="#221a20" stroke="#3a2c2c" stroke-width="3"/>` +
    P.circleRunes(800, 255, 46, 10, 'rgba(212,169,78,0.35)', 3) +
    fire(800, 760, 1, false) +
    P.floorTiles(760, '#0b0910', 'rgba(255,255,255,0.04)') +
    P.fog(600, 300, '#2a1a12', 0.35)
  ));

  /* ---------- the sentence on the prophecy stone ----------
     This row used to be Chapter VI's stone, drawn out: G.shapeInner over
     ['Flame','Flame','Crown','Hook','Spike','Flame','Crown','Hook'] with
     [false,true,false,false,false,true,true,true] — element for element the STONE array at
     js/content/ch6.js, ninety minutes before Chapter VI burns four of those cuts off the board and
     sells the missing four shapes to the Reader and their four orientations to the Seer.
     Enumerated (scratchpad/ch012/stone-field.js, against the shipped STONE and BURNT):
         the row the art drew is identical to ch6's STONE ............ true
         cuts the fire takes ........................................ 1, 3, 5, 7
         assignments of shape and orientation to those four cuts .... 4,096
           knowing only the Reader's page (the four shapes) .......... 16
           knowing only the Seer's page (the four orientations) ...... 256
           knowing this picture ...................................... 1
     In ch6's own board terms (ch6.js records them): drop the Reader 192, drop the Seer 8 — both
     answered here, for free, by a photograph of the Prologue. The chapter's only currency is a bell
     cracked per misreading, so a field of 1 is a chapter that costs nothing.
     So the Hearth promises the sentence and does not print it, the way the lamp's collar does forty
     lines below: what four hundred years of smoke left, not what was cut. Nothing here is a glyph —
     no closed teardrop, no arrow over a bar, no hook, no crown — only grooves, chips and soot, seeded
     so the stone is the same stone every night. tools/scripts/ch0.json and ch1.json assert that no
     path from js/content/glyphs.js is drawn in this chapter's art (ch1 allows the one on the Chair's
     banner, which is heraldry). */
  function wornCuts(n, colour, gap, sc, seed) {
    const r = A.rng(seed || 1707);
    let out = '';
    for (let i = 0; i < n; i++) {
      const lean = (r() * 30 - 15).toFixed(1), h = (11 + r() * 7), bow = (r() * 9 - 4.5);
      let g = `<g transform="translate(${(i * gap).toFixed(0)},0) scale(${sc})">`;
      g += `<g transform="rotate(${lean})" fill="none" stroke="${colour}" stroke-linecap="round">`;
      // the groove, in two strokes that do not meet: the middle of it is gone
      g += `<path d="M${(-bow / 2).toFixed(1)},${(-h).toFixed(1)} q${bow.toFixed(1)},${(h * 0.45).toFixed(1)} ${(bow / 3).toFixed(1)},${(h * 0.62).toFixed(1)}" stroke-width="3.4" opacity="${(0.55 + r() * 0.3).toFixed(2)}"/>`;
      g += `<path d="M${(bow / 3).toFixed(1)},${(h * 0.82).toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(h * 0.5).toFixed(1)}" stroke-width="2.8" opacity="${(0.35 + r() * 0.3).toFixed(2)}"/>`;
      // a chip across it, and sometimes one that stops short
      g += `<path d="M${(-6 - r() * 4).toFixed(1)},${(r() * 8 - 4).toFixed(1)} l${(9 + r() * 5).toFixed(1)},${(r() * 6 - 3).toFixed(1)}" stroke-width="2.4" opacity="${(0.25 + r() * 0.3).toFixed(2)}"/>`;
      if (r() > 0.35) g += `<path d="M${(2 + r() * 3).toFixed(1)},${(-h * 0.6).toFixed(1)} l${(r() * 5 - 1).toFixed(1)},${(4 + r() * 4).toFixed(1)}" stroke-width="2" opacity=".3"/>`;
      g += '</g>';
      // soot: what the fire has been doing to the foot of it for four hundred years
      for (let k = 0; k < 3; k++) g += `<ellipse cx="${(r() * 24 - 12).toFixed(1)}" cy="${(r() * 28 - 9).toFixed(1)}" rx="${(4 + r() * 7).toFixed(1)}" ry="${(3 + r() * 5).toFixed(1)}" fill="#0d0a0c" opacity="${(0.1 + r() * 0.18).toFixed(2)}"/>`;
      out += g + '</g>';
    }
    return out;
  }
  A.wornCuts = wornCuts;

  A.define('ch0_stone', () => P.wrap(
    P.sky('#0a0810', '#1a0f0a') +
    `<rect x="380" y="120" width="840" height="300" rx="6" fill="#1d1619" stroke="#3a2c2c" stroke-width="4"/>` +
    `<g transform="translate(470,250)" opacity=".9">${wornCuts(8, '#7a6a5a', 94, 1.9)}</g>` +
    `<text x="800" y="380" text-anchor="middle" fill="rgba(233,226,210,0.45)" font-size="22" font-family="Cinzel,serif" letter-spacing="6">THE ORDER'S READING</text>` +
    fire(800, 900, 1.6, false) +
    `<rect x="0" y="520" width="${W}" height="${H - 520}" fill="url(#stonefog)"/><defs><linearGradient id="stonefog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a3c" stop-opacity="0"/><stop offset="1" stop-color="#ff9a3c" stop-opacity=".55"/></linearGradient></defs>`
  ));

  A.define('ch0_dorm', () => P.wrap(
    P.sky('#0b0a12', '#15121d') +
    // window with stars
    `<rect x="1180" y="120" width="260" height="360" rx="130" fill="#070812"/>` + `<g clip-path="inset(0)">${P.stars(60, 12, 480).replace(/<circle /g, '<circle transform="translate(1180,120) scale(0.16,0.4)" ')}</g>` +
    `<rect x="1180" y="120" width="260" height="360" rx="130" fill="none" stroke="#2a2438" stroke-width="10"/>` +
    // beds
    `${[0, 1, 2, 3].map(i => `<g transform="translate(${140 + i * 250},640)"><rect x="0" y="0" width="200" height="90" rx="8" fill="#1b1626"/><rect x="0" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="174" y="-40" width="26" height="130" rx="4" fill="#241d33"/><rect x="30" y="10" width="140" height="40" rx="6" fill="#2b2340"/></g>`).join('')}` +
    // sill lamp
    `<g transform="translate(1310,500)"><rect x="-60" y="0" width="120" height="14" fill="#2a2438"/><rect x="-14" y="-70" width="28" height="70" rx="4" fill="#3a2f1a"/><circle cx="0" cy="-90" r="24" fill="#5a4a2a" stroke="#8a7040" stroke-width="3"/><circle cx="0" cy="-90" r="10" fill="#ffd27a" opacity=".55"><animate attributeName="opacity" values=".55;.2;.6;.3;.55" dur="2.4s" repeatCount="indefinite"/></circle></g>` +
    P.floorTiles(740, '#0d0b14', 'rgba(255,255,255,0.03)') +
    P.fog(560, 260, '#241d33', 0.35)
  ));

  A.define('ch0_lamp', () => P.wrap(
    P.sky('#0b0a12', '#1a1520') +
    `<rect x="0" y="600" width="${W}" height="300" fill="#100d16"/>` +
    `<g transform="translate(800,520)">` +
    `<rect x="-200" y="80" width="400" height="30" fill="#2a2438"/>` +
    `<rect x="-40" y="-120" width="80" height="200" rx="8" fill="#4a3c22" stroke="#8a7040" stroke-width="3"/>` +
    `<circle cx="0" cy="-170" r="70" fill="#5a4a2a" stroke="#8a7040" stroke-width="5"/>` +
    `<circle cx="0" cy="-170" r="46" fill="none" stroke="#c9a85a" stroke-width="3" opacity=".8"/>` +
    `${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${Math.cos(a) * 46}" cy="${-170 + Math.sin(a) * 46}" r="12" fill="#2a2010" stroke="#c9a85a" stroke-width="2"/>`; }).join('')}` +
    `<circle cx="0" cy="-170" r="14" fill="#ffd27a" opacity=".5"><animate attributeName="opacity" values=".5;.2;.55;.25;.5" dur="2s" repeatCount="indefinite"/></circle>` +
    // Two marks are cut here, but four hundred years have taken them: the Hearth shows the
    // wear, not the shapes. Only the Reader's page has them clean.
    `${[-60, 60].map((x, i) => `<g transform="translate(${x},-290)" opacity=".5">` +
      `<circle cx="0" cy="0" r="21" fill="none" stroke="#6a5a3c" stroke-width="2" stroke-dasharray="${i ? '5 7' : '8 6'}"/>` +
      `<path d="${i ? 'M-10 7 L-1 -8 M3 9 L8 -5 M-9 -6 L7 -2' : 'M-8 9 L6 -7 M-2 10 L-6 -8 M-10 0 L9 4'}" fill="none" stroke="#6a5a3c" stroke-width="3" stroke-linecap="round" opacity=".6"/>` +
      `</g>`).join('')}` +
    `</g>` +
    P.fog(600, 300, '#241d33', 0.3)
  ));
})();
