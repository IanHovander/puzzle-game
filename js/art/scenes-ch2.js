/* Art — Chapter II: The Ember Vault */
(function () {
  'use strict';
  const A = window.VigilArt, P = A.P, W = A.W, H = A.H;
  const COLD = '#4fb3bf', COLD2 = '#a8e6ee';

  /* A hooded silhouette on a plinth, lit edge toward `lit` (-1 left, 1 right). */
  function statue(x, base, scale, lit, name) {
    const sc = scale || 1;
    return `<g transform="translate(${x},${base}) scale(${sc})">` +
      `<rect x="-70" y="0" width="140" height="70" fill="#17131c" stroke="#2a2330" stroke-width="3"/>` +
      `<rect x="-58" y="12" width="116" height="46" rx="3" fill="#100d14"/>` +
      `<ellipse cx="0" cy="-110" rx="80" ry="150" fill="#2a2234" opacity=".35"/>` +
      `<path d="M-38,0 L-30,-150 C-30,-190 -14,-215 0,-222 C14,-215 30,-190 30,-150 L38,0 Z" fill="#06050a"/>` +
      `<path d="M${lit * 30},-150 C${lit * 30},-190 ${lit * 14},-215 0,-222 L0,-214 C${lit * 11},-208 ${lit * 24},-186 ${lit * 24},-150 L${lit * 32},0 L${lit * 38},0 Z" fill="#5a4c66" opacity=".85"/>` +
      `<path d="M-14,-226 C-14,-238 14,-238 14,-226 L10,-206 L-10,-206 Z" fill="#06050a"/>` +
      (name ? `<text y="46" text-anchor="middle" fill="rgba(212,169,78,0.55)" font-size="17" font-family="Cinzel,serif" letter-spacing="4">${name}</text>` : '') +
      `</g>`;
  }
  /* A bronze dial set in the floor. */
  function dial(x, y, label) {
    return `<g transform="translate(${x},${y})">` +
      `<ellipse cx="0" cy="0" rx="62" ry="24" fill="#2a2010" stroke="#8a7040" stroke-width="3"/>` +
      `<ellipse cx="0" cy="-4" rx="46" ry="17" fill="#3a2c14" stroke="#c9a85a" stroke-width="2" opacity=".9"/>` +
      `<ellipse cx="0" cy="-5" rx="12" ry="5" fill="#1a1408" stroke="#c9a85a" stroke-width="1.5"/>` +
      `<line x1="0" y1="-20" x2="0" y2="-12" stroke="#f2d27a" stroke-width="3" stroke-linecap="round"/>` +
      `<text y="52" text-anchor="middle" fill="rgba(233,226,210,0.6)" font-size="22" font-family="Cinzel,serif" letter-spacing="3">${label}</text>` +
      `</g>`;
  }
  /* The Ember: a cold blue stone in a glass case. */
  function ember(x, y, scale) {
    const sc = scale || 1;
    return `<g transform="translate(${x},${y}) scale(${sc})">` +
      `<circle cx="0" cy="-30" r="180" fill="${COLD}" opacity=".10"><animate attributeName="opacity" values=".10;.16;.09;.14;.10" dur="3.2s" repeatCount="indefinite"/></circle>` +
      `<rect x="-40" y="-70" width="80" height="80" rx="6" fill="rgba(168,230,238,0.08)" stroke="${COLD2}" stroke-width="2" opacity=".8"/>` +
      `<path d="M0,-58 C12,-48 18,-38 18,-28 C18,-16 10,-8 0,-8 C-10,-8 -18,-16 -18,-28 C-18,-38 -12,-48 0,-58 Z" fill="${COLD}" opacity=".9"><animate attributeName="opacity" values=".9;.6;.95;.7;.9" dur="2.1s" repeatCount="indefinite"/></path>` +
      `<path d="M0,-46 C6,-40 9,-34 9,-28 C9,-21 5,-17 0,-17 C-5,-17 -9,-21 -9,-28 C-9,-34 -6,-40 0,-46 Z" fill="${COLD2}" opacity=".95"/>` +
      `</g>`;
  }
  A.ch2 = { statue, dial, ember };

  /* ---------- the stair down ---------- */
  A.define('ch2_stair', (p) => {
    let steps = '';
    for (let i = 0; i < 14; i++) {
      const t = i / 13, y = 300 + Math.pow(t, 1.35) * 560, w = 220 + t * 1500, x = 800 - w / 2;
      const gap = p && p.broken && i >= 7 && i <= 8;
      if (gap) { steps += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(w * 0.28).toFixed(0)}" height="${(26 + t * 40).toFixed(0)}" fill="#14111a"/><rect x="${(x + w * 0.72).toFixed(0)}" y="${y.toFixed(0)}" width="${(w * 0.28).toFixed(0)}" height="${(26 + t * 40).toFixed(0)}" fill="#14111a"/>`; continue; }
      steps += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(26 + t * 40).toFixed(0)}" fill="${i % 2 ? '#14111a' : '#181420'}"/><line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x + w).toFixed(0)}" y2="${y.toFixed(0)}" stroke="rgba(255,255,255,0.06)"/>`;
    }
    return P.wrap(
      P.sky('#050409', '#0d0a12') +
      `<path d="M520,0 L1080,0 L1600,900 L0,900 Z" fill="#0b0910"/>` +
      `<path d="M640,0 L960,0 L800,300 Z" fill="#2a1a12" opacity=".35"/>` +
      steps +
      (p && p.broken ? `<path d="M690,700 L910,700 L980,900 L620,900 Z" fill="#050409"/><path d="M700,690 l30,-20 l20,30 l-40,10 Z" fill="#1a151f"/><path d="M880,700 l40,-14 l10,24 l-40,6 Z" fill="#1a151f"/>` : '') +
      `<g transform="translate(800,300)"><path d="M-120,0 L120,0 L60,-160 L-60,-160 Z" fill="#0a0810" opacity=".9"/></g>` +
      P.torch(430, 330, 1.2) + P.torch(1170, 330, 1.2) +
      `<ellipse cx="800" cy="900" rx="500" ry="140" fill="${COLD}" opacity=".16"><animate attributeName="opacity" values=".16;.22;.14;.2;.16" dur="4s" repeatCount="indefinite"/></ellipse>` +
      P.fog(560, 340, '#0f2a30', 0.5)
    );
  });

  /* ---------- the Founders' Antechamber: four statues, four dials ---------- */
  A.define('ch2_antechamber', (p) => {
    const names = ['MERE', 'HALVARD', 'ROOK', 'IDONY'];
    const xs = [320, 640, 960, 1280];
    return P.wrap(
      P.sky('#07060b', '#120e16') +
      `<rect x="0" y="0" width="${W}" height="520" fill="#0d0a12"/>` +
      `<path d="M0,520 A800,420 0 0 1 1600,520" fill="#100c15"/>` +
      P.pillars(5, 560, 520, '#0a0810') +
      P.floorTiles(560, '#0e0b13', 'rgba(255,255,255,0.045)') +
      xs.map((x, i) => statue(x, 490, 0.95, i < 2 ? 1 : -1, names[i])).join('') +
      `<rect x="120" y="556" width="1360" height="6" fill="#221a20"/>` +
      xs.map((x, i) => dial(x, 690, 'ABCD'[i])).join('') +
      `<g transform="translate(800,300)"><rect x="-260" y="-90" width="520" height="180" rx="8" fill="#15101a" stroke="#2c2330" stroke-width="4"/>` +
      `<path d="M-260,-90 A260,260 0 0 1 260,-90" fill="#15101a" stroke="#2c2330" stroke-width="4"/>` +
      `<line x1="0" y1="-300" x2="0" y2="90" stroke="#2c2330" stroke-width="5"/>` +
      `<circle cx="0" cy="-30" r="64" fill="none" stroke="rgba(212,169,78,0.35)" stroke-width="3"/><circle cx="0" cy="-30" r="50" fill="none" stroke="rgba(212,169,78,0.2)" stroke-width="1.5"/>` +
      `${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * Math.PI * 2 - Math.PI / 2; return `<line x1="${(Math.cos(a) * 50).toFixed(1)}" y1="${(-30 + Math.sin(a) * 50).toFixed(1)}" x2="${(Math.cos(a) * 64).toFixed(1)}" y2="${(-30 + Math.sin(a) * 64).toFixed(1)}" stroke="rgba(212,169,78,0.4)" stroke-width="3" stroke-linecap="round"/>`; }).join('')}</g>` +
      P.torch(150, 400, 1.1) + P.torch(1450, 400, 1.1) +
      P.fog(480, 260, '#1a1420', 0.4)
    );
  });

  /* ---------- the Vault: the Ember on its plinth, the road bricked beyond ---------- */
  A.define('ch2_vault', (p) => {
    let bricks = '';
    for (let r = 0; r < 9; r++) for (let c = 0; c < 6; c++) { const x = 690 + c * 38 + (r % 2 ? 19 : 0), y = 250 + r * 26; bricks += `<rect x="${x}" y="${y}" width="36" height="24" fill="#1a1418" stroke="#0a0810" stroke-width="2"/>`; }
    return P.wrap(
      P.sky('#05060c', '#0b0d16') +
      `<path d="M0,900 L0,420 A800,520 0 0 1 1600,420 L1600,900 Z" fill="#0c0b14"/>` +
      `<path d="M120,900 L120,520 A680,420 0 0 1 1480,520 L1480,900 Z" fill="#0f0e18"/>` +
      // the bricked archway at the back
      `<path d="M660,480 L660,300 A140,140 0 0 1 940,300 L940,480 Z" fill="#241c22" stroke="#2c2330" stroke-width="6"/>` +
      `<clipPath id="ch2arch"><path d="M672,480 L672,300 A128,128 0 0 1 928,300 L928,480 Z"/></clipPath><g clip-path="url(#ch2arch)">${bricks}</g>` +
      `<text x="800" y="512" text-anchor="middle" fill="rgba(233,226,210,0.35)" font-size="16" font-family="Cinzel,serif" letter-spacing="5">212</text>` +
      P.floorTiles(560, '#0b0a12', 'rgba(255,255,255,0.05)') +
      // plinth with the Ember
      `<g transform="translate(800,600)"><path d="M-90,60 L-70,-40 L70,-40 L90,60 Z" fill="#17131c" stroke="#2a2330" stroke-width="3"/><rect x="-80" y="-52" width="160" height="14" fill="#221a20"/></g>` +
      ember(800, 550, 1.4) +
      (p && p.empty ? `<rect x="740" y="470" width="120" height="100" fill="#0b0a12" opacity=".9"/>` : '') +
      `<g transform="translate(800,600)"><rect x="-80" y="-52" width="160" height="14" fill="#221a20"/></g>` +
      P.torch(230, 470, 1) + P.torch(1370, 470, 1) +
      P.fog(500, 300, '#0f2a30', 0.35)
    );
  });

  /* ---------- the Map of the Night turning downward: the school, the vault, the bricked road, four thrones far below ---------- */
  A.define('ch2_map', () => {
    const vellum = '#3a2f22', ink = 'rgba(233,226,210,0.75)', gold = 'rgba(242,210,122,0.9)';
    let thrones = '';
    [-135, -45, 45, 135].forEach(dx => { thrones += `<g transform="translate(${900 + dx},790)"><rect x="-16" y="-30" width="32" height="30" fill="none" stroke="${COLD}" stroke-width="2"/><rect x="-22" y="0" width="44" height="6" fill="${COLD}" opacity=".7"/></g>`; });
    return P.wrap(
      P.sky('#0a0810', '#120d12') +
      `<defs><linearGradient id="ch2vel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${vellum}"/><stop offset=".62" stop-color="#241b14"/><stop offset=".64" stop-color="#101426"/><stop offset="1" stop-color="#070a16"/></linearGradient></defs>` +
      `<path d="M300,60 L1300,60 L1310,880 L290,880 Z" fill="url(#ch2vel)" stroke="rgba(212,169,78,0.45)" stroke-width="3"/>` +
      `<path d="M300,60 L1300,60 L1290,80 L310,80 Z" fill="#000" opacity=".25"/>` +
      // the school above
      `<g fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="M560,300 L560,180 L640,120 L720,180 L720,300 Z"/><path d="M720,300 L720,200 L1040,200 L1040,300"/><path d="M1040,300 L1040,180 L1120,120 L1200,180 L1200,300 Z"/>` +
      `<path d="M500,300 L1260,300"/><path d="M820,300 L820,380 A60,60 0 0 1 940,380 L940,300"/>` +
      `<path d="M600,420 L1160,420 M600,420 L600,500 A40,40 0 0 1 680,500 L680,420 M1080,420 L1080,500 A40,40 0 0 1 1160,500 L1160,420"/>` +
      `<path d="M880,380 L880,560" stroke-dasharray="6 6"/>` +
      `<path d="M760,560 L1000,560 L1000,620 L760,620 Z"/>` +
      `<path d="M880,620 L880,700"/>` +
      `</g>` +
      // labels
      `<g fill="${ink}" font-family="Cinzel,serif" font-size="15" letter-spacing="2"><text x="880" y="160" text-anchor="middle">THORNHALLOW</text><text x="880" y="470" text-anchor="middle">THE GREAT HALL</text><text x="1010" y="600" text-anchor="start" font-size="13">· THE VAULT</text></g>` +
      // the bricked road
      `<g transform="translate(880,700)"><rect x="-40" y="0" width="80" height="26" fill="none" stroke="#c9704a" stroke-width="2.5"/><line x1="-40" y1="13" x2="40" y2="13" stroke="#c9704a" stroke-width="2"/><line x1="-13" y1="0" x2="-13" y2="13" stroke="#c9704a" stroke-width="2"/><line x1="13" y1="13" x2="13" y2="26" stroke="#c9704a" stroke-width="2"/><text x="60" y="20" fill="#c9704a" font-family="Cinzel,serif" font-size="13" letter-spacing="2">BRICKED · 212</text></g>` +
      `<path d="M880,726 L880,760" stroke="${COLD}" stroke-width="2" stroke-dasharray="4 6" opacity=".8"/>` +
      thrones +
      `<text x="900" y="840" text-anchor="middle" fill="${COLD}" font-family="Cinzel,serif" font-size="13" letter-spacing="4" opacity=".8">THE FOUNDERS' ROAD · CONTINUES</text>` +
      // the gold route line
      `<path d="M640,140 C660,260 700,300 880,310 C900,360 880,520 880,570" fill="none" stroke="${gold}" stroke-width="2.5" stroke-dasharray="500" stroke-dashoffset="500"><animate attributeName="stroke-dashoffset" from="500" to="0" dur="4s" fill="freeze"/></path>` +
      P.fog(600, 300, '#0f2a30', 0.25)
    );
  });
})();
