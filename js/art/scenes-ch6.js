/* Art — Chapter VI, the bell-chamber */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;
  const Gl = () => window.VigilGlyphs;
  const STONE = [['Flame', false], ['Flame', true], ['Crown', false], ['Hook', false], ['Spike', false], ['Flame', true], ['Crown', true], ['Hook', true]];
  const COLD = '#4fb3bf';

  /* a Founders' bell hanging from a beam */
  function bell(x, top, h, color, rim, cracked) {
    const w = h * 0.78;
    let s = `<g transform="translate(${x},${top})">`;
    s += `<rect x="-6" y="-40" width="12" height="40" fill="#1a1416"/>`;
    s += `<path d="M${-w * 0.42},${h} L${-w * 0.42},${h * 0.35} C${-w * 0.42},${h * 0.05} ${-w * 0.2},0 0,0 C${w * 0.2},0 ${w * 0.42},${h * 0.05} ${w * 0.42},${h * 0.35} L${w * 0.42},${h} Z" fill="${color}"/>`;
    s += `<path d="M${-w * 0.5},${h} L${w * 0.5},${h} L${w * 0.44},${h + 16} L${-w * 0.44},${h + 16} Z" fill="${rim}"/>`;
    s += `<path d="M${-w * 0.36},${h * 0.32} C${-w * 0.36},${h * 0.12} ${-w * 0.16},${h * 0.06} ${-w * 0.08},${h * 0.06}" fill="none" stroke="rgba(255,200,120,0.25)" stroke-width="3"/>`;
    s += `<circle cx="0" cy="${h + 26}" r="9" fill="${rim}"/>`;
    if (cracked) s += `<path d="M${w * 0.1},${h} L${w * 0.16},${h * 0.7} L${w * 0.08},${h * 0.55} L${w * 0.18},${h * 0.4}" fill="none" stroke="#06050a" stroke-width="4" stroke-linecap="round"/>`;
    return s + '</g>';
  }
  /* the iron lid on the chamber floor, seen in perspective */
  function lid(cx, cy, rx, ry, glow) {
    let s = `<g>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 26}" ry="${ry + 12}" fill="#0a090d"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#1a1719" stroke="#2b262c" stroke-width="6"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.72}" ry="${ry * 0.72}" fill="none" stroke="#2b262c" stroke-width="3"/>`;
    for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; s += `<circle cx="${(cx + Math.cos(a) * rx * 0.9).toFixed(0)}" cy="${(cy + Math.sin(a) * ry * 0.9).toFixed(0)}" r="5" fill="#332c33"/>`; }
    s += `<line x1="${cx - rx * 0.72}" y1="${cy}" x2="${cx + rx * 0.72}" y2="${cy}" stroke="#2b262c" stroke-width="3"/><line x1="${cx}" y1="${cy - ry * 0.72}" x2="${cx}" y2="${cy + ry * 0.72}" stroke="#2b262c" stroke-width="3"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="18" fill="#0b0a0e" stroke="#4a3f48" stroke-width="4"/>`;
    if (glow) {
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.72}" ry="${ry * 0.72}" fill="none" stroke="${COLD}" stroke-width="2" opacity=".45"><animate attributeName="opacity" values=".45;.15;.5;.2;.45" dur="3.2s" repeatCount="indefinite"/></ellipse>`;
      s += `<line x1="${cx - rx * 0.72}" y1="${cy}" x2="${cx + rx * 0.72}" y2="${cy}" stroke="${COLD}" stroke-width="1.5" opacity=".5"><animate attributeName="opacity" values=".5;.1;.55;.2;.5" dur="2.6s" repeatCount="indefinite"/></line>`;
      s += `<line x1="${cx}" y1="${cy - ry * 0.72}" x2="${cx}" y2="${cy + ry * 0.72}" stroke="${COLD}" stroke-width="1.5" opacity=".5"><animate attributeName="opacity" values=".2;.5;.15;.55;.2" dur="2.9s" repeatCount="indefinite"/></line>`;
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${COLD}" opacity=".06"><animate attributeName="opacity" values=".06;.12;.05;.1;.06" dur="2.2s" repeatCount="indefinite"/></ellipse>`;
    }
    return s + '</g>';
  }
  /* the shaft mouth in the ceiling with the far coin of the Hearth */
  function shaftMouth(cx, cy, r) {
    let s = `<g>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r + 22}" fill="#070609"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#0b0810"/>`;
    for (let i = 4; i >= 1; i--) s += `<circle cx="${cx}" cy="${cy}" r="${(r * i / 5).toFixed(0)}" fill="none" stroke="rgba(255,154,60,${(0.05 + (5 - i) * 0.05).toFixed(2)})" stroke-width="2"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="#ff9a3c" opacity=".85"><animate attributeName="opacity" values=".85;.5;.9;.6;.85" dur="2.1s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.09}" fill="#a8e6ee" opacity=".8"><animate attributeName="r" values="${r * 0.09};${r * 0.12};${r * 0.08};${r * 0.11};${r * 0.09}" dur="1.7s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.6}" fill="#ff9a3c" opacity=".08"><animate attributeName="opacity" values=".08;.14;.07;.12;.08" dur="2.4s" repeatCount="indefinite"/></circle>`;
    return s + '</g>';
  }
  const cracked = (i) => { try { return i < (window.VigilStore.state.flags.BELLS_CRACKED | 0); } catch (e) { return false; } };

  /* 1. the bell-chamber: four bells on a beam over the lid; the shaft above */
  A.define('ch6_chamber', () => P.wrap(
    P.sky('#06050a', '#14101a') +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="#0c0a12"/>` +
    P.pillars(4, 700, 560, '#0a0810') +
    P.lightBeam(800, 150, 200, 560, '#7a4a22') +
    shaftMouth(800, 120, 110) +
    `<rect x="240" y="250" width="1120" height="34" fill="#1a1416"/><rect x="240" y="284" width="1120" height="8" fill="#0d0a0e"/>` +
    [380, 660, 940, 1220].map((x, i) => bell(x, 292, 210, ['#2d2320', '#2a2426', '#2b2522', '#2c2325'][i], '#3a2f26', cracked(i))).join('') +
    P.floorTiles(690, '#0b0910', 'rgba(255,255,255,0.03)') +
    lid(800, 780, 470, 95, true) +
    P.figures([{ x: 560, s: 0.9 }, { x: 640, s: 0.95 }, { x: 960, s: 0.95 }, { x: 1040, s: 0.9 }, { x: 800, s: 0.8, color: '#1e1626' }], 720, '#141018') +
    P.fog(560, 340, '#1b1626', 0.4)
  ));

  /* 2. up the shaft: the Hearth as a far coin, the underside of the stone above it */
  A.define('ch6_shaft', () => {
    const cx = 800, cy = 420;
    let s = P.sky('#040308', '#0b0912');
    for (let i = 9; i >= 1; i--) { const r = 90 + i * 78; s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,${(0.025 + (9 - i) * 0.008).toFixed(3)})" stroke-width="${10 + i}"/>`; }
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; s += `<line x1="${(cx + Math.cos(a) * 160).toFixed(0)}" y1="${(cy + Math.sin(a) * 160).toFixed(0)}" x2="${(cx + Math.cos(a) * 900).toFixed(0)}" y2="${(cy + Math.sin(a) * 900).toFixed(0)}" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="150" fill="#100c14"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="150" fill="#ff9a3c" opacity=".12"><animate attributeName="opacity" values=".12;.2;.1;.17;.12" dur="2.3s" repeatCount="indefinite"/></circle>`;
    // the stone's underside, foreshortened, above the coin
    s += `<rect x="${cx - 190}" y="${cy - 118}" width="380" height="64" rx="4" fill="#1c1619" stroke="#2f2528" stroke-width="3"/>`;
    s += STONE.map(([sh, inv], i) => `<g transform="translate(${cx - 164 + i * 47},${cy - 86}) scale(0.85)" style="color:#5a4d4a" opacity=".85">${Gl().shapeInner(sh, inv)}</g>`).join('');
    // the fire: a low orange bed with a blue tongue
    s += `<ellipse cx="${cx}" cy="${cy + 40}" rx="120" ry="26" fill="#3a1c0c"/>`;
    s += A.fire ? A.fire(cx, cy + 44, 0.42, false) : '';
    s += A.fire ? A.fire(cx, cy + 44, 0.28, true) : '';
    s += `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#1c1619" stroke-width="14"/>`;
    s += P.fog(0, 900, '#05040a', 0.35);
    return P.wrap(s);
  });

  /* 3. the lid, close: Marrow kneeling in a ring of chalk, the seal, frost at the rivets, bell-rims above */
  A.define('ch6_lid', () => {
    const cx = 800, cy = 620;
    let s = P.sky('#07060b', '#100d16');
    s += `<rect x="0" y="0" width="${W}" height="${H}" fill="#0b0911"/>`;
    s += P.lightBeam(800, -40, 180, 640, '#7a4a22');
    s += [420, 690, 910, 1180].map((x, i) => `<g transform="translate(${x},-60)">${bell(0, 0, 250, ['#2d2320', '#2a2426', '#2b2522', '#2c2325'][i], '#3a2f26', cracked(i))}</g>`).join('');
    s += P.floorTiles(560, '#0b0910', 'rgba(255,255,255,0.03)');
    s += lid(cx, cy, 620, 150, true);
    // chalk ring and salt
    s += `<ellipse cx="${cx}" cy="${cy}" rx="300" ry="72" fill="none" stroke="rgba(233,226,210,0.5)" stroke-width="3" stroke-dasharray="14 9"/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="240" ry="58" fill="none" stroke="rgba(233,226,210,0.25)" stroke-width="2"/>`;
    // the seal: CROWN
    s += `<g transform="translate(${cx},${cy - 4}) scale(2.2)" style="color:#d4a94e" opacity=".9">${Gl().shapeInner('Crown', false)}</g>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="46" ry="14" fill="none" stroke="#d4a94e" stroke-width="2" opacity=".6"/>`;
    // Marrow kneeling (a low silhouette) and Wren standing at the rim
    s += `<g transform="translate(${cx + 110},${cy + 10})"><ellipse cx="0" cy="0" rx="40" ry="10" fill="#000" opacity=".35"/><path d="M-34,0 L-30,-40 L-12,-62 L12,-62 L26,-40 L34,0 Z" fill="#17121a"/><circle cx="0" cy="-74" r="12" fill="#17121a"/></g>`;
    s += P.figures([{ x: cx - 560, s: 0.9 }, { x: cx - 470, s: 0.95 }, { x: cx + 470, s: 0.95 }, { x: cx + 560, s: 0.9 }, { x: cx - 300, s: 0.8, color: '#1e1626' }], cy + 120, '#141018');
    // rope-ring above centre
    s += `<line x1="${cx}" y1="0" x2="${cx}" y2="${cy - 60}" stroke="#1a1416" stroke-width="5"/>`;
    s += P.fog(420, 300, '#1b1626', 0.35);
    return P.wrap(s);
  });

  /* 4. the stone seen from below: the slab, the eight shapes, the fire lower than ever and the foot bare */
  A.define('ch6_stonefoot', () => {
    let s = P.sky('#05040a', '#12101a');
    s += `<rect x="0" y="0" width="${W}" height="${H}" fill="#0a0912"/>`;
    for (let i = 6; i >= 1; i--) s += `<rect x="${200 - i * 30}" y="${40 - i * 6}" width="${1200 + i * 60}" height="${520 + i * 12}" rx="10" fill="none" stroke="rgba(255,255,255,${(0.02 + (6 - i) * 0.008).toFixed(3)})" stroke-width="6"/>`;
    // the slab, foreshortened from below (wider at the bottom)
    s += `<path d="M300,120 L1300,120 L1380,540 L220,540 Z" fill="#1c1619" stroke="#33282b" stroke-width="5"/>`;
    s += `<path d="M330,150 L1270,150 L1335,515 L265,515 Z" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>`;
    s += STONE.map(([sh, inv], i) => `<g transform="translate(${400 + i * 114},330) scale(2.6)" style="color:#8a7a70" opacity=".92">${Gl().shapeInner(sh, inv)}</g>`).join('');
    // the foot: bare, lit from below in cold light
    s += `<rect x="220" y="540" width="1160" height="26" fill="#23191c"/>`;
    s += `<rect x="220" y="540" width="1160" height="26" fill="${COLD}" opacity=".18"><animate attributeName="opacity" values=".18;.3;.14;.26;.18" dur="2.4s" repeatCount="indefinite"/></rect>`;
    // the fire: an orange bed, very low, and a blue tongue; white flare
    s += `<ellipse cx="800" cy="820" rx="380" ry="46" fill="#2a160c"/>`;
    s += A.fire ? A.fire(800, 830, 0.55, false) : '';
    s += A.fire ? A.fire(800, 830, 0.38, true) : '';
    s += `<ellipse cx="800" cy="700" rx="700" ry="200" fill="${COLD}" opacity=".06"><animate attributeName="opacity" values=".06;.11;.05;.09;.06" dur="3s" repeatCount="indefinite"/></ellipse>`;
    s += P.fog(560, 260, '#0d0b14', 0.45);
    return P.wrap(s);
  });
})();
