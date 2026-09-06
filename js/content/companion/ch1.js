/* Companion — Chapter I: The Vigil (THORN, no cast) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw;
  const C = window.CompanionContent;

  /* The nine Houses, sunwise from the Chair — a copy of the table in js/art/scenes-ch1.js (the phone does not load the art). */
  const HOUSES = [
    { n: 1, house: 'Harrowden', color: '#3f7a4a', sym: 'chevron', master: 'Sorrel', sight: 'Thread' },
    { n: 2, house: 'Ossery',    color: '#8c93a6', sym: 'crescent', master: 'Quill', sight: 'Glyph' },
    { n: 3, house: 'Dunmere',   color: '#4a5f8a', sym: 'tower', master: 'Brack', sight: 'Eye' },
    { n: 4, house: 'Fellwood',  color: '#2f5a3a', sym: 'tree', master: 'Hallan', sight: 'Ear' },
    { n: 5, house: 'Goldmarch', color: '#b8892e', sym: 'sun', master: 'Vey', sight: 'Glyph' },
    { n: 6, house: 'Redmoor',   color: '#8a2f2f', sym: 'wave', master: 'Orrin', sight: 'Thread' },
    { n: 7, house: 'Sable',     color: '#5a3f8a', sym: 'stars', master: 'Oriel', sight: 'Eye' },
    { n: 8, house: 'Wyeburn',   color: '#8a6a3a', sym: 'key', master: 'Tarn', sight: 'Ear' },
    { n: 9, house: 'the Chair', color: '#2a2434', sym: 'crown', master: 'Marrow', sight: 'the Provost' },
  ];
  const st = 'fill="none" stroke="#f4ecd8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  function emblem(sym) {
    switch (sym) {
      case 'chevron': return `<path d="M9,27 L20,12 L31,27" ${st}/><path d="M13,31 L20,22 L27,31" ${st}/>`;
      case 'crescent': return `<path d="M25,9 A11,11 0 1 0 25,31 A8.5,8.5 0 1 1 25,9 Z" fill="#f4ecd8"/>`;
      case 'tower': return `<path d="M13,31 V14 H27 V31 Z M11,14 V9 H15 V14 M18,14 V9 H22 V14 M25,14 V9 H29 V14" ${st}/><path d="M18,31 V24 H22 V31" ${st}/>`;
      case 'tree': return `<path d="M20,7 L28,17 L24,17 L30,25 L25,25 L31,32 L9,32 L15,25 L10,25 L16,17 L12,17 Z" fill="#f4ecd8"/>`;
      case 'sun': return `<circle cx="20" cy="20" r="6" fill="#f4ecd8"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M20,20 m${(Math.cos(a * Math.PI / 180) * 9).toFixed(1)},${(Math.sin(a * Math.PI / 180) * 9).toFixed(1)} l${(Math.cos(a * Math.PI / 180) * 5).toFixed(1)},${(Math.sin(a * Math.PI / 180) * 5).toFixed(1)}" ${st}/>`).join('')}`;
      case 'wave': return `<path d="M8,17 C12,12 16,12 20,17 C24,22 28,22 32,17" ${st}/><path d="M8,26 C12,21 16,21 20,26 C24,31 28,31 32,26" ${st}/>`;
      case 'stars': { const s = (x, y, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; d += (i ? 'L' : 'M') + (x + Math.cos(a) * rr).toFixed(1) + ',' + (y + Math.sin(a) * rr).toFixed(1); } return `<path d="${d}Z" fill="#f4ecd8"/>`; }; return s(20, 12, 5) + s(12, 26, 5) + s(28, 26, 5); }
      case 'key': return `<circle cx="14" cy="16" r="5.5" ${st}/><path d="M18,20 L30,32 M26,28 L29,25 M23,25 L26,22" ${st}/>`;
      case 'crown': return `<g transform="translate(20,21) scale(0.9)" style="color:#f4ecd8">${G.shapeInner('Crown', false)}</g>`;
    }
    return '';
  }
  const banner = (h, size) => `<svg viewBox="0 0 40 40" width="${size || 30}" height="${size || 30}" style="display:inline-block;vertical-align:middle"><path d="M5,3 H35 V28 L20,38 L5,28 Z" fill="${h.color}" stroke="rgba(244,236,216,0.5)" stroke-width="1.5"/>${emblem(h.sym)}</svg>`;
  const seatLabel = (n) => { const h = HOUSES[n - 1]; return `${banner(h, 22)} <b>${n}</b> · ${h.house}`; };

  /* Seat positions for the under-layer and thread-map: a ring, the Chair (9) at the top, sunwise. */
  const ring = (cx, cy, r) => HOUSES.map((h, i) => { const a = ((i + 0.5) / 9 * 360 - 90 + 20) * Math.PI / 180; return { n: h.n, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }; });

  /* ---------- Seer: under-layer of the Great Hall ---------- */
  const underHall = (() => {
    const seats = ring(180, 170, 78);
    const F = 'font-family="Cinzel,serif"';
    let s = `<svg viewBox="0 0 360 330"><rect width="360" height="330" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="310"/>`;
    // the Hearth at the top wall, the prophecy stone above it
    s += `<path d="M140,10 L140,50 A40,40 0 0 0 220,50 L220,10"/><rect x="150" y="14" width="60" height="12"/>`;
    s += `<path d="M165,50 C160,40 168,36 170,28 C176,36 182,40 176,50 Z M180,52 C174,38 186,30 190,22 C196,32 204,42 194,52 Z"/>`;
    // the dais, right; the tapestry on the left wall
    s += `<rect x="262" y="60" width="78" height="60" rx="3"/><ellipse cx="300" cy="90" rx="14" ry="4"/>`;
    s += `<rect x="18" y="56" width="18" height="120" stroke-dasharray="3,3"/>`;
    s += `</g>`;
    s += `<text x="180" y="66" text-anchor="middle" fill="#fff" font-size="9" ${F}>the Hearth</text>`;
    s += `<text x="301" y="132" text-anchor="middle" fill="#fff" font-size="9" ${F}>the dais</text>`;
    s += `<text x="27" y="190" text-anchor="middle" fill="#a482e6" font-size="8" ${F}>the tapestry</text><text x="27" y="200" text-anchor="middle" fill="#a482e6" font-size="7" ${F}>older paint beneath</text>`;
    // the nine seats
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="11" fill="none" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 3.5).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="10" ${F}>${p.n}</text>`; });
    s += `<text x="180" y="174" text-anchor="middle" fill="#fff" font-size="8" ${F} opacity=".7">the nine, sunwise from the Chair</text>`;
    // coin under 5 and 8
    [5, 8].forEach(n => { const p = seats[n - 1]; s += `<g transform="translate(${p.x.toFixed(1)},${(p.y + 17).toFixed(1)})"><circle r="4" fill="none" stroke="#a482e6" stroke-width="1.5"/><path d="M-7,-6 l3,3 M7,-6 l-3,3 M0,7 l0,3" stroke="#a482e6" stroke-width="1"/></g>`; });
    const p5 = seats[4], p8 = seats[7];
    s += `<text x="${(p5.x + 12).toFixed(1)}" y="${(p5.y + 30).toFixed(1)}" fill="#a482e6" font-size="8" ${F}>coin, Crown-struck</text>`;
    s += `<text x="${(p8.x - 12).toFixed(1)}" y="${(p8.y + 32).toFixed(1)}" text-anchor="end" fill="#a482e6" font-size="8" ${F}>coin, Crown-struck</text>`;
    // the guard behind 6
    const p6 = seats[5];
    s += `<g transform="translate(${(p6.x + 22).toFixed(1)},${(p6.y + 4).toFixed(1)})"><path d="M-4,10 L-3,-4 L3,-4 L4,10 Z M0,-4 m-3,0 a3,3 0 1 1 6,0" fill="#a482e6"/><path d="M6,-10 L6,10" stroke="#a482e6" stroke-width="1.2"/></g>`;
    s += `<text x="${(p6.x + 34).toFixed(1)}" y="${(p6.y + 8).toFixed(1)}" fill="#a482e6" font-size="8" ${F}>the Envoy's guard</text>`;
    // people: the four at the back, Wren on the dais; shadows away from the Hearth (down), Wren's toward it (up)
    const four = [[110, 285], [150, 292], [200, 292], [240, 285]];
    four.forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="5" fill="#fff"/><path d="M${x},${y} l${(x - 180) * 0.12},20" stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"/>`; });
    s += `<circle cx="300" cy="90" r="5" fill="#fff"/><path d="M300,90 L246,64" stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"/>`;
    s += `<g fill="#fff" font-size="8" ${F}><text x="94" y="279">Bookmoth</text><text x="141" y="313">Hush</text><text x="192" y="313">Owl</text><text x="232" y="279">Knot</text><text x="306" y="84" fill="#a482e6">Wren</text></g>`;
    s += `<text x="180" y="326" text-anchor="middle" fill="#fff" font-size="8" ${F} opacity=".7">shadows, as they fall</text>`;
    return s + '</svg>';
  })();

  /* ---------- Binder: thread-map of the hall ---------- */
  const threadMap = (() => {
    const seats = ring(150, 150, 92);
    const P = (n) => seats[n - 1];
    const F = 'font-family="Cinzel,serif"';
    let s = `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>`;
    seats.forEach(p => { s += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" fill="none" stroke="#fff" stroke-width="1.2"/><text x="${p.x.toFixed(1)}" y="${(p.y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="10" ${F}>${p.n}</text>`; });
    // Quill (2) follows Sorrel (1): a thread with an arrow toward Sorrel
    const a = P(2), b = P(1);
    s += `<path d="M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}" stroke="#d96b4a" stroke-width="2"/><circle cx="${((a.x + b.x) / 2).toFixed(1)}" cy="${((a.y + b.y) / 2).toFixed(1)}" r="3" fill="#d96b4a"/>`;
    // Orrin (6) opposite Brack (3): a taut thread with a cross at the middle
    const c = P(6), d = P(3); const mx = (c.x + d.x) / 2, my = (c.y + d.y) / 2;
    s += `<path d="M${c.x.toFixed(1)},${c.y.toFixed(1)} L${d.x.toFixed(1)},${d.y.toFixed(1)}" stroke="#d96b4a" stroke-width="2" stroke-dasharray="6,3"/><path d="M${(mx - 5).toFixed(1)},${(my - 5).toFixed(1)} l10,10 M${(mx + 5).toFixed(1)},${(my - 5).toFixed(1)} l-10,10" stroke="#fff" stroke-width="2"/>`;
    // Oriel (7): a loose end
    const e = P(7);
    s += `<path d="M${e.x.toFixed(1)},${e.y.toFixed(1)} c-6,14 -14,18 -10,32" stroke="#d96b4a" stroke-width="2" fill="none" stroke-dasharray="2,3"/>`;
    // Vane, right: gold thread off the page, red thread toward the dais
    s += `<circle cx="300" cy="150" r="12" fill="none" stroke="#fff" stroke-width="1.2"/><text x="300" y="154" text-anchor="middle" fill="#fff" font-size="8" ${F}>V</text>`;
    s += `<path d="M312,150 L356,150" stroke="#e0b04a" stroke-width="2.5"/><text x="334" y="142" text-anchor="middle" fill="#e0b04a" font-size="7" ${F}>to the capital</text>`;
    s += `<path d="M300,138 C300,100 300,80 300,60" stroke="#c0392b" stroke-width="2.5"/><rect x="262" y="20" width="76" height="40" rx="3" fill="none" stroke="#fff" stroke-dasharray="3,3"/><text x="300" y="44" text-anchor="middle" fill="#fff" font-size="8" ${F}>the dais</text>`;
    s += `<g font-size="8" ${F} fill="#d96b4a"><text x="16" y="270">red — an oath · gold — the Crown's coin or favour</text><text x="16" y="284" fill="#fff" opacity=".7">a dashed thread pulls against; a loose end waits to be tied</text></g>`;
    return s + '</svg>';
  })();

  /* ---------- Listener: heartbeats in the hall ---------- */
  const heartbeats = () => {
    const rows = [];
    HOUSES.forEach(h => rows.push([h.n === 9 ? 'The Provost (the Chair)' : `Seat ${h.n} · ${h.house}`, 'normal']));
    rows.push(['The Envoy, Lord Vane', 'fast']);
    rows.push(['Bookmoth', 'normal'], ['Hush', 'normal'], ['Owl', 'normal'], ['Knot', 'normal']);
    rows.push(['Wren', 'flat']);
    return `<div class="heartbeats">${rows.map(([n, k]) => `<div class="hb"><span>${n}${k === 'fast' ? ' <small>(fast)</small>' : k === 'flat' ? ' <small>(too quiet to catch)</small>' : ''}</span>${D.trace(k)}</div>`).join('')}</div>`;
  };
  const murmur = (n, text, steps, base) => ({ t: 'audio', label: `Seat ${n} — ${HOUSES[n - 1].house}`, strip: `<div class="fine">overheard: <em>"${text}"</em></div>`, button: '♪ Cup your ear', play: (A) => CA.playSteps(A, steps, base), text: `Seat ${n} murmurs it to nobody; nobody hears it but you.` });

  C.chapters.push({
    id: 'ch1',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when — and it will call all four of you at once.' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The nine seats, decoded' });
        P.sight.push({ t: 'p', text: 'The banners are cloth; the seat-plates beneath them are carved in the Vigil\'s script, and you can read them from the back of the hall. Sunwise from the Chair:' });
        P.sight.push({ t: 'table', head: ['Seat', 'Master', 'Sighting'], rows: HOUSES.map(h => [seatLabel(h.n), h.n === 9 ? `<b>Marrow</b> — the Chair; the Chair's mark: ${G.svg('CROWN', { size: 28, color: '#f2d27a' })} <b>CROWN</b>` : `<b>${h.master}</b>`, h.n === 9 ? 'KEEP; cannot be approached' : h.sight]) });
        P.sight.push({ t: 'fine', text: 'That is what the plates say. What each Master will *do* is not written on a plate.' });
        P.sight.push({ t: 'h', text: 'The word on the lintel' });
        P.sight.push({ t: 'p', text: `${G.svg('THORN', { size: 34, color: '#f2d27a' })} **THORN** — *a gate; to go through.* Cut over the Masters' door, which is, when you think about it, a gate.` });
        P.wren.push({ t: 'h', text: 'Under the paint' });
        P.wren.push({ t: 'p', text: 'The Envoy said it twice: *under the paint*. You know every word in this hall — the banners, the plates, the prophecy over the fire. You have never once looked at the tapestry as something with words under it.' });
        P.wren.push({ t: 'p', text: 'And when the Hearth flickered, every Master looked at the fire. You were watching the Provost. She looked at Wren. She looked at Wren the way you look at a line you have read a hundred times and only now suspect you have been reading wrong.' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Murmurs, before the bell' });
        P.sight.push({ t: 'p', text: 'Three Masters are saying things under their breath. Nobody else in the hall can hear them. You can.' });
        P.sight.push(murmur(1, 'The boy goes to the capital unless someone asks me to my face.', [-1, 1, -2], 52));
        P.sight.push(murmur(3, 'I stand with the Provost.', [2, -1], 50));
        P.sight.push(murmur(4, 'I vote as Orrin votes, and I hear no one else.', [1, 1, -3], 48));
        P.sight.push({ t: 'fine', text: 'Seat 4 means it. You have tried; that Master hears nothing tonight but Seat 6.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the hall' });
        P.sight.push({ t: 'html', html: heartbeats() });
        P.sight.push({ t: 'audio', label: 'The Envoy', strip: '<div class="fine">fast — a man who walks as if the hall were his, with a heart that says otherwise</div>', play: (A) => CA.heartbeat(A, 118, 8), text: 'Nine Masters, steady. The Envoy, fast. Wren: a flat line, too quiet to catch. As always.' });
        P.wren.push({ t: 'h', text: 'When the fire bowed' });
        P.wren.push({ t: 'p', text: 'When the Hearth flickered, nine hearts jumped. The Provost\'s skipped — one beat, then two — and she was not looking at the fire. She was looking at Wren.' });
        P.wren.push({ t: 'p', text: 'Wren\'s did not skip. Wren\'s never does anything. You have decided, again, that this is a fault in your gift.' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the Great Hall' });
        P.sight.push({ t: 'p', text: 'Coin under two seats — Crown-struck, the kind that buys a vote. A guard in the Envoy\'s grey standing where he can put himself between anyone and **Seat 6**. And on the left wall, the tapestry: there is older paint beneath it. You can see *that* there is a shape under it. Not what.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underHall });
        P.sight.push({ t: 'list', items: ['**Seat 5** — Crown coin under the cushion.', '**Seat 8** — Crown coin, in the sleeve.', '**Seat 6** — the Envoy\'s guard stands behind the chair. Nobody reaches that Master tonight.'] });
        P.sight.push({ t: 'fine', text: 'The word over the Masters\' door is upright, mark on the left. Nothing to turn tonight.' });
        P.wren.push({ t: 'h', text: 'The shadows, again' });
        P.wren.push({ t: 'p', text: 'You have stopped calling it a trick of the lamp. In the Great Hall there is no lamp; there is the Hearth, and forty torches, and Wren\'s shadow falls toward the Hearth through all of them.' });
        P.wren.push({ t: 'p', text: '"Ask your Owl what is under the paint," the Envoy said. He was not looking at you when he said it. He was looking at the tapestry. He is Eye-Sighted; you would swear it. And he has *seen* what is under it.' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Threads in the Convocation' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: threadMap });
        P.sight.push({ t: 'list', items: [
          '**Seat 2 → Seat 1:** Quill follows Sorrel. Wherever Sorrel votes, Quill votes — unless someone asks Quill directly.',
          '**Seat 6 ⟷ Seat 3:** Orrin votes *opposite* Brack. Always has. A thread pulled against.',
          '**Seat 7:** Oriel. Undecided — a thread waiting to be tied.',
          '**Seat 9:** the Chair. No thread to anyone in the hall tonight. Not unbound; *held*.',
          '**The Envoy:** two threads pull him. **Gold**, off through the doors — the Crown. And **red** — an oath — toward the dais. You lose it in the crowd.',
        ] });
        P.sight.push({ t: 'h', text: 'The Laws that bear tonight' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 1 · Founders' · Year 0</div><div class="txt">A sigil is read sunwise from the mark.</div></div><div class="law founders struck"><div class="era">Law 0 · Founders' · Year 0 · STRUCK</div><div class="txt">COLD is written by four hands.</div><div class="fine">struck by the Convocation, 212. See Law 6.</div></div></div>` });
        P.sight.push({ t: 'p', text: 'The Convocation\'s rule card is not a Law; it is a custom, and customs are read *literally*. "Follows a thread unless approached." "Undecided votes SEND unless approached." The seats are sunwise from the Chair — Law 1 again, applied to chairs.' });
        P.sight.push({ t: 'fine', text: 'The whole Book is in your **Book** tab.' });
        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'p', text: 'Wren, on the dais, in front of nine Houses: *no thread found.* Not to the Provost who named the child. Not to you. Not unbound — you know unbound. The knot itself.' });
        P.wren.push({ t: 'p', text: 'When the fire flickered, the Provost\'s eyes went to Wren, and for one moment you thought you saw a thread there after all — and then the light came back, and it was gone, and you are not sure what colour it was.' });
      }
      return P;
    },
  });
})();
