/* Companion — Chapter III: The Whispering Gallery (VEIL · cast: VOTE_LOST, WREN_HURT, VANE_ACCEPT ·
   mini-words: LINEN opens Speak, WARD turns Sight over to the Tower door).
   In the corridors, one fact each and no page holds another's: the Reader has what is cut over each hidden
   door, the Listener has how far along its round each patrol is, the Seer has where the rooms and the rounds
   and the cuts are, the Binder has who is bought — the porter, and the four rooms his gold pays for, which
   are drawn on nobody's map — and which room nobody searches.
   At the Tower: the Reader has what the three shapes say, the Listener which of them sounds first, the Seer
   what is cut under the ring, the Binder where a sigil begins. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const F = 'font-family="Cinzel,serif"';

  /* ---------- the corridors, as data (mirrors the Hearth's published grid) ---------- */
  const CELLS = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'C1', 'B3', 'C2', 'C3', 'C4', 'D3', 'B5', 'C5', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'];
  const EDGES = [['A1', 'B1'], ['B1', 'C1'], ['A1', 'A2'], ['A2', 'A3'], ['A3', 'A4'], ['A4', 'A5'], ['A5', 'B5'], ['B5', 'C5'], ['C5', 'D5'], ['D5', 'E5'], ['E1', 'E2'], ['E2', 'E3'], ['E3', 'E4'], ['E4', 'E5'], ['C5', 'C4'], ['C4', 'C3'], ['C3', 'C2'], ['C3', 'D3'], ['D3', 'E3']];
  const DOORS = [['A3', 'B3'], ['B3', 'C3']];
  /* The Seer's half of the patrols: which room each numbered stop is. The Listener's half — which stop, beat
     by beat — is ROUND_A / ROUND_B below, and neither array says anything on its own. */
  const WALK_A = ['A3', 'A4', 'A5', 'B5', 'C5', 'C4', 'C3'];
  const WALK_B = ['E1', 'E2', 'E3', 'E4'];
  const ROUND_A = [3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2];
  const ROUND_B = [4, 4, 4, 4, 4, 4, 3, 2, 1, 1, 2, 3];

  /* ---------- Listener: the two rounds, drawn ----------
     One beat axis, two lanes, stop numbers and nothing else — no room letters anywhere, because the Listener
     hears a count, never a place. The accent is the sentry's six-beat stand at its stop 4: that flat run is
     the whole insight, and the two tables it replaces buried it. Drawn as a loop so no beat reads as a start. */
  const rounds = () => {
    const x = (b) => 26 + (b - 1) * 25;
    const yA = (s) => 62 - (s - 1) * 6, yB = (s) => 128 - (s - 1) * 12;
    const line = (r, y, col, w) => `<polyline points="${r.map((s, i) => x(i + 1) + ',' + y(s)).join(' ')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round"/>`;
    let s = `<svg viewBox="0 0 336 170" style="width:100%;max-width:330px;height:auto">`;
    s += `<text x="4" y="18" fill="#4fb3bf" font-size="9" ${F}>the lantern</text>`;
    s += line(ROUND_A, yA, 'rgba(79,179,191,.5)', 1.6);
    s += ROUND_A.map((st, i) => `<circle cx="${x(i + 1)}" cy="${yA(st)}" r="2.6" fill="rgba(79,179,191,.75)"/>`).join('');
    s += `<text x="4" y="84" fill="#4fb3bf" font-size="9" ${F}>the sentry</text>`;
    s += line(ROUND_B, yB, 'rgba(79,179,191,.45)', 1.6);
    // the accent: six beats without a step
    s += `<line x1="${x(1)}" y1="${yB(4)}" x2="${x(6)}" y2="${yB(4)}" stroke="#4fb3bf" stroke-width="4" stroke-linecap="round"/>`;
    s += `<text x="${x(3.5)}" y="${yB(4) - 7}" text-anchor="middle" fill="#4fb3bf" font-size="9" ${F}>six beats, not a step</text>`;
    s += ROUND_B.map((st, i) => `<circle cx="${x(i + 1)}" cy="${yB(st)}" r="2.6" fill="rgba(79,179,191,.75)"/>`).join('');
    s += `<g fill="rgba(255,255,255,.45)" font-size="7.5" ${F}>` + [1, 2, 3, 4, 5, 6, 7].map(st => `<text x="14" y="${yA(st) + 3}" text-anchor="middle">${st}</text>`).join('')
      + [1, 2, 3, 4].map(st => `<text x="14" y="${yB(st) + 3}" text-anchor="middle">${st}</text>`).join('') + `</g>`;
    s += `<g fill="rgba(255,255,255,.55)" font-size="8" ${F} text-anchor="middle">` + ROUND_A.map((_, i) => `<text x="${x(i + 1)}" y="146">${i + 1}</text>`).join('') + `</g>`;
    s += `<path d="M${x(12)},152 q-140,15 -276,0" fill="none" stroke="rgba(79,179,191,.6)" stroke-width="1.2"/><path d="M${x(1)},152 l8,4 l-1,-9 z" fill="rgba(79,179,191,.8)"/>`;
    s += `<text x="168" y="10" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="8" ${F}>twelve beats, then round again</text>`;
    return s + `</svg>`;
  };

  /* ---------- Seer: the under-layer of the corridors ----------
     Room ids, the two seams nobody else can find, and the numbered stops each round walks through — the stop
     numbers are the only coordinate this page shares with the Listener's, and they are what makes the two
     halves of a patrol into one fact. No timings anywhere.
     The porter is NOT drawn here. His lodge and the rooms it looks into used to be three dashed rays on this
     map, and every schedule the Binder's rule rules out already crossed one of them, which left the Binder
     holding nothing. The lodge is the Binder's page now, and this map says only where the walls are. */
  function underCorridors(hurt) {
    const S = 52, pad = 18, W = 5 * S + pad * 2, H = 5 * S + pad * 2 + 26;
    const col = (c) => c.charCodeAt(0) - 65, row = (c) => parseInt(c.slice(1), 10) - 1;
    const xy = (c) => ({ x: pad + col(c) * S, y: pad + row(c) * S });
    const open = new Set(); EDGES.forEach(([a, b]) => { open.add(a + '|' + b); open.add(b + '|' + a); });
    const door = new Set(); DOORS.forEach(([a, b]) => { door.add(a + '|' + b); door.add(b + '|' + a); });
    let s = `<svg viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#000"/>`;
    s += `<defs><pattern id="ch3hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,6 L6,0" stroke="#fff" stroke-width=".5" opacity=".18"/></pattern></defs>`;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const id = String.fromCharCode(65 + c) + (r + 1), p = { x: pad + c * S, y: pad + r * S };
      const isOpen = CELLS.includes(id);
      s += `<rect x="${p.x}" y="${p.y}" width="${S}" height="${S}" fill="${isOpen ? '#000' : 'url(#ch3hatch)'}" stroke="#fff" stroke-width="${isOpen ? 1.2 : 0.4}" opacity="${isOpen ? 1 : 0.7}"/>`;
      if (isOpen) s += `<text x="${p.x + 4}" y="${p.y + 10}" fill="#fff" font-size="8" ${F} opacity=".7">${id}</text>`;
    }
    for (const a of CELLS) for (const b of CELLS) {
      if (a >= b) continue; const dc = col(b) - col(a), dr = row(b) - row(a); if (Math.abs(dc) + Math.abs(dr) !== 1) continue;
      const A = xy(a), isOpen = open.has(a + '|' + b), isDoor = door.has(a + '|' + b);
      if (!isOpen && !isDoor) continue;
      if (dc) { const x = A.x + S; s += `<line x1="${x}" y1="${A.y + 7}" x2="${x}" y2="${A.y + S - 7}" stroke="${isDoor ? '#a482e6' : '#000'}" stroke-width="${isDoor ? 3 : 4}" ${isDoor ? 'stroke-dasharray="4 3"' : ''}/>`; }
      else { const y = A.y + S; s += `<line x1="${A.x + 7}" y1="${y}" x2="${A.x + S - 7}" y2="${y}" stroke="${isDoor ? '#a482e6' : '#000'}" stroke-width="${isDoor ? 3 : 4}" ${isDoor ? 'stroke-dasharray="4 3"' : ''}/>`; }
    }
    // the numbered stops of the two rounds
    const stops = (walk, label) => walk.map((c, i) => {
      const p = xy(c);
      return `<circle cx="${p.x + S - 12}" cy="${p.y + S - 12}" r="7.5" fill="#000" stroke="#fff" stroke-width="1"/><text x="${p.x + S - 12}" y="${p.y + S - 9}" text-anchor="middle" fill="#fff" font-size="8" ${F}>${i + 1}</text>`;
    }).join('') + (() => { const p = xy(walk[0]); return `<text x="${p.x + S / 2}" y="${p.y + 22}" text-anchor="middle" fill="#fff" font-size="7" ${F} opacity=".65">${label}</text>`; })();
    s += stops(WALK_A, 'lantern 1') + stops(WALK_B, 'sentry 1');
    // the laundry and the Tower door
    const b3 = xy('B3'); s += `<text x="${b3.x + S / 2}" y="${b3.y + S / 2 + 3}" text-anchor="middle" fill="#a482e6" font-size="9" ${F}>laundry</text>`;
    const g = xy('E5'); s += `<circle cx="${g.x + S / 2}" cy="${g.y + S / 2}" r="13" fill="none" stroke="#fff" stroke-dasharray="3 2"/><text x="${g.x + S / 2}" y="${g.y + 20}" text-anchor="middle" fill="#fff" font-size="7" ${F}>tower door</text>`;
    s += `<g ${F} font-size="7.5"><line x1="${pad}" y1="${H - 12}" x2="${pad + 18}" y2="${H - 12}" stroke="#a482e6" stroke-width="3" stroke-dasharray="4 3"/><text x="${pad + 22}" y="${H - 9}" fill="#a482e6">a seam, and a shape cut over it</text></g>`;
    if (hurt) s += `<text x="${W - pad}" y="${pad - 6}" text-anchor="end" fill="#fff" font-size="8" ${F} opacity=".8">Wren cannot run tonight</text>`;
    return s + `</svg>`;
  }

  /* ---------- Seer: the Gallery, shadows as they fall (Wren's falls toward the lamp) ---------- */
  const underGallery = `<svg viewBox="0 0 360 220">
    <rect width="360" height="220" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="340" height="200"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${24 + i * 58}" y="22" width="40" height="52"/><rect x="${24 + i * 58}" y="150" width="40" height="52"/>`).join('')}
      <circle cx="330" cy="110" r="10"/><path d="M330,100 L330,88 M324,92 L336,92"/>
      <text x="330" y="136" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" stroke="none">the lamp</text>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="90" cy="110" r="6"/><circle cx="130" cy="96" r="6"/><circle cx="150" cy="128" r="6"/><circle cx="190" cy="106" r="6"/><circle cx="250" cy="112" r="5"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M90,110 L52,110"/><path d="M130,96 L96,92"/><path d="M150,128 L116,132"/><path d="M190,106 L154,104"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M250,112 L300,112"/></g>
    <g fill="#fff" font-size="9" font-family="Cinzel,serif"><text x="78" y="128">Reader</text><text x="120" y="86">Listener</text><text x="140" y="146">Seer</text><text x="180" y="124">Binder</text><text x="238" y="130" fill="#a482e6">Wren</text></g>
    <text x="180" y="214" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">shadows, as they fall — the portraits have none</text>
  </svg>`;

  /* ---------- Seer: under the Tower door ----------
     Four slots, numbered as the Hearth numbers them, and TWO cuts. No arrow, no direction, no rule:
     the Seer reports cuts, not meanings. (ch0's underFoot, one notch harder.) */
  const underRing = `<svg viewBox="0 0 360 240">
    <rect width="360" height="240" fill="#000"/>
    <g transform="translate(180,118)">
      <circle r="66" fill="none" stroke="#fff" stroke-width="1.5"/>
      ${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (Math.cos(a) * 66).toFixed(1), y = (Math.sin(a) * 66).toFixed(1), hot = i === 0;
        return `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${hot ? '#a482e6' : '#fff'}" stroke-width="${hot ? 2.5 : 1.5}"/><text x="${x}" y="${(+y + 4).toFixed(1)}" text-anchor="middle" fill="${hot ? '#a482e6' : '#fff'}" font-size="12" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}
    </g>
    <g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"><path d="M68,112 L58,106 L58,118"/></g>
    <text x="62" y="132" text-anchor="middle" fill="rgba(255,255,255,.8)" font-size="10" font-family="Cinzel,serif">a small notch</text>
    <g stroke="#a482e6" stroke-width="2.5" stroke-linecap="round"><path d="M152,30 L208,24"/><path d="M154,38 L204,33"/></g>
    <text x="180" y="16" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">a scratch — long, deliberate</text>
    <text x="180" y="232" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">two cuts, under the soot</text>
  </svg>`;

  /* ---------- Reader: the arch, drawn as a band ----------
     A band has no first stone and no last, so the picture cannot imply an order — and the three shapes are
     set down in the reverse of the answer, so reading them round from the left fails. (ch0's collar.) */
  const archBand = () => `<svg viewBox="0 0 300 168" style="width:100%;max-width:280px">
    <circle cx="150" cy="84" r="60" fill="none" stroke="rgba(212,169,78,.3)" stroke-width="11"/>
    <g transform="translate(90,84) scale(1.1)" style="color:#f2d27a">${G.shapeInner('Hook', false)}</g>
    <g transform="translate(150,24) scale(1.1)" style="color:#f2d27a">${G.shapeInner('Spike', false)}</g>
    <g transform="translate(210,84) scale(1.1)" style="color:#f2d27a">${G.shapeInner('Flame', false)}</g>
    <text x="150" y="162" text-anchor="middle" fill="rgba(233,226,210,.55)" font-size="11" font-family="Cinzel,serif">the arch runs right over · no first, no last</text>
  </svg>`;

  /* ---------- Binder: a thread, drawn by what it is ----------
     red an oath, gold the Crown's coin, none no thread at all. No rooms and no numbers: the Binder holds
     whether, never where. */
  const thread = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'oath' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/><circle cx="45" cy="9" r="3.2" fill="#d96b4a"/>'
    : kind === 'coin' ? '<path d="M4,8 C24,3 60,13 78,8" fill="none" stroke="#c8a24a" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round"/><circle cx="83" cy="8" r="4" fill="#c8a24a"/>'
    : '<path d="M6,2 L2,2 L2,14 L6,14 M84,2 L88,2 L88,14 L84,14" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>'
  }</svg>`;

  const boots = (A) => { A.init(); if (A.isMuted()) A.setMuted(false); for (let i = 0; i < 7; i++) CA.later(() => A.sfx('step'), i * 250); for (let i = 0; i < 4; i++) CA.later(() => A.sfx('miss'), 2100 + i * 620); return 2100 + 4 * 620 + 400; };

  C.chapters.push({
    id: 'ch3',
    miniWords: { LINEN: 'speak', WARD: 'sight' },
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {}; const hurt = !!f.WREN_HURT, lost = !!f.VOTE_LOST, accepted = !!f.VANE_ACCEPT;
      const ward = ctx.mini('WARD');   // the Tower half of every Sight page, and only after the Hearth asks

      /* ================= READER ================= */
      if (roleId === 'reader') {
        if (!ward) {
          P.sight.push({ t: 'h', text: 'What is cut over the seams' });
          P.sight.push({ t: 'p', text: 'Two doors between here and the Tower are drawn on nothing. You cannot find them. You can read the one shape cut over each.' });
          P.sight.push({ t: 'table', head: ['cut over the seam', 'scratch at the left end', 'scratch at the right end'], rows: [
            [`${G.shapeSvg('Crown', false, { size: 38, color: '#f2d27a' })}<div class="fine">the west wall</div>`, '<b>CROWN</b>', '<b>EMBER</b>'],
            [`${G.shapeSvg('Spike', false, { size: 38, color: '#f2d27a' })}<div class="fine">the laundry’s back wall</div>`, '<b>THORN</b>', '<b>WELL</b>'],
          ] });
          P.sight.push({ t: 'p', text: '**One shape, two words, and only one of them opens a seam.** Say both, out loud, for each.' });
          P.sight.push({ t: 'fine', text: 'A word that is not the one costs Wren a turn — and a turn more for every guess that seam already remembers. The Hearth counts what is left.' });
          P.sight.push({ t: 'fine', text: 'Which end the scratch is on is not yours to see. Ask the Seer, seam by seam.' });
        } else {
          P.sight.push({ t: 'h', text: 'The arch over the Tower door' });
          P.sight.push({ t: 'p', text: 'Three shapes are cut into the arch, all of them standing up. The Hearth shows them worn away. On your page they are clean.' });
          P.sight.push({ t: 'html', html: archBand() });
          P.sight.push({ t: 'table', head: ['cut into the arch', 'it says'], rows: [
            [G.shapeSvg('Hook', false, { size: 40, color: '#f2d27a' }), '<b>KNOT</b>'],
            [G.shapeSvg('Spike', false, { size: 40, color: '#f2d27a' }), '<b>THORN</b>'],
            [G.shapeSvg('Flame', false, { size: 40, color: '#f2d27a' }), '<b>ASH</b>'],
          ] });
          P.sight.push({ t: 'fine', text: 'An arch has no first stone. This page cannot tell you which word comes first, and a wrong order wakes nothing. Somebody here can *hear* it.' });
        }
        P.wren.push({ t: 'h', text: 'The plaques' });
        P.wren.push({ t: 'p', text: 'Every portrait carries a brass plaque: a name, a House, a year. On the four oldest, the letters are the ones from the dormitory door.' });
        P.wren.push({ t: 'p', text: 'The second version of Wren’s name, chalked there in the same hand.' });
        P.wren.push({ t: 'fine', text: 'You decided a year ago that somebody was being funny. You still cannot read either of them.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        if (!ward) {
          P.sight.push({ t: 'h', text: 'Two rounds in the dark' });
          P.sight.push({ t: 'p', text: 'Two patrols. Each walks a round of **twelve beats** and then walks the very same round again. One beat is one turn on the Hearth.' });
          P.sight.push({ t: 'audio', label: 'Boots, in the dark', strip: '<div class="fine">quick and soft, then slow and iron-shod</div>', play: boots,
            text: 'The lantern goes out along its corridor and comes back. The sentry stands a long while at one end, walks away, and comes back.' });
          P.sight.push({ t: 'html', html: rounds() });
          P.sight.push({ t: 'fine', text: '**Lose the count and Wren walks into somebody.** A sighting sends Wren back, and the count keeps running.' });
          P.sight.push({ t: 'fine', text: 'You hear how far along a round they are. Never which room that is. The Seer has the rooms.' });
        } else {
          P.sight.push({ t: 'h', text: 'The ward hums' });
          P.sight.push({ t: 'p', text: 'Three notes under the soot, over and over. Nobody else in this stairwell can hear them.' });
          P.sight.push({ t: 'audio', label: 'The threshold, humming', strip: CA.strip([1, 1]), play: (A) => CA.playSteps(A, [1, 1]),
            text: 'The second note is **one rung above** the first. The third is one rung above that.' });
          P.sight.push({ t: 'p', text: 'Three notes, three words. Look their rungs up on the Ladder in your **Book**. Only one order climbs one, then one.' });
          P.sight.push({ t: 'fine', text: 'You never hear a word’s name. The Reader has the words. Say the climb out loud, and let them put it in order.' });
        }
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${[['The Provost', 'normal'], ['The captain', 'normal'], ['The porter', 'fast']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: hurt ? 'With the lamps out you will hear every heart in these corridors. The Provost’s. The porter’s. Every soldier’s. Not the one walking beside you in a sling.' : 'With the lamps out you will hear every heart in these corridors. The Provost’s. The porter’s. Every soldier’s. Not the one walking beside you.' });
        P.wren.push({ t: 'fine', text: 'You decided years ago that the fault was yours. You have never said it out loud to anyone.' });
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        if (!ward) {
          P.sight.push({ t: 'h', text: 'Under the corridors' });
          P.sight.push({ t: 'p', text: 'The Hearth draws rooms by letter and number. The Listener counts stops along a round. Only you have both.' });
          P.sight.push({ t: 'svg', cls: 'underlayer', svg: underCorridors(hurt) });
          P.sight.push({ t: 'p', text: '**The west seam is scratched at its left end. The laundry’s back seam is scratched at its right.**' });
          P.sight.push({ t: 'fine', text: 'Give the Reader the end before anybody speaks. A wrong word costs a turn, and more at a seam you have guessed at before.' });
          P.sight.push({ t: 'fine', text: 'What a shape says is not yours, and neither is what a cry costs. Say where things are, and stop.' });
        } else {
          P.sight.push({ t: 'h', text: 'Under the Tower door' });
          P.sight.push({ t: 'p', text: 'Four slots below the arch, black with soot. Two things are cut under them, and both were cut long before the soot.' });
          P.sight.push({ t: 'svg', cls: 'underlayer', svg: underRing });
          P.sight.push({ t: 'p', text: '**A small notch under slot 4. A long, deliberate scratch under slot 1.** The numbers are the ones the Hearth shows.' });
          P.sight.push({ t: 'fine', text: 'Which cut matters is not yours to know. That is the Binder’s half. Say what is cut, and where.' });
        }
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underGallery });
        P.wren.push({ t: 'p', text: 'Two hundred painted Masters and not one shadow between them, because paint has none. Five living people in that gallery, and five shadows. Four of them fall away from the lamp.' });
        P.wren.push({ t: 'fine', text: hurt ? 'Wren’s falls toward it, with one arm of it hanging wrong. It always has fallen that way. You have run out of lamps to blame.' : 'Wren’s falls toward it. It always has. You have run out of lamps to blame.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        if (!ward) {
          P.sight.push({ t: 'h', text: 'Who is bought down here' });
          P.sight.push({ t: 'p', text: accepted ? 'Three people are awake between the Gallery and the Tower. Two of them are paid. So, since the Hall, are you.' : 'Three people are awake between the Gallery and the Tower. Two of them are paid.' });
          P.sight.push({ t: 'html', html: '<ul class="blk-list">'
            + '<li>' + thread('oath') + ' <strong>Bess, in the laundry.</strong> Sworn to the Provost, thirty years. Nobody searches that room.</li>'
            + '<li>' + thread('coin') + ' <strong>The porter, in his lodge off the north corridor.</strong> New Crown gold, straight to the Envoy. He is paid to shout.</li>'
            + '<li>' + thread('coin') + ' <strong>Both patrols.</strong> The captain’s men, and nothing more than that.</li>'
            + '</ul>' });
          P.sight.push({ t: 'p', text: '**His gold buys four rooms: B5, C5, D5 and C4.** Wren in one of them and he shouts. The sentry leaves its round and stands at the foot of the Tower stair, that turn and three after it.' });
          P.sight.push({ t: 'fine', text: 'Say it before anybody moves. A room he has not bought is a room nobody is paid to watch.' });
          P.sight.push({ t: 'fine', text: 'You cannot see a seam, a shape, or a beat. Ask for all three.' });
        } else {
          P.sight.push({ t: 'h', text: 'Where a sigil begins' });
          P.sight.push({ t: 'p', text: 'You are the only one on this stair who was ever taught this, and tonight it is three lines.' });
          /* THE PROLOGUE SPENT THE OLD VERSION OF THIS PAGE. Until this pass these three lines were,
             word for word, the Binder's Chapter 0 page -- begin at the scratch, a notch is only a
             signature, run clockwise -- and the dormitory lamp is WORKED ON THE SHARED SCREEN with
             the Binder required to say the rule out loud to solve it. ADVERSARIAL 11: a fact is
             private only on its first use, and a rule the protocol asks a player to say aloud is
             public from that moment. Measured against the shipped wardCheck
             (scratchpad/prologue/binder.js): a Binder-less table applying what the lamp taught them
             faced a field of ONE and won it every time -- p = 1.000, where the chapter's own comment
             recorded four boards and p = 0.250. The seat was free.
             So the ward stops being a Founders' sigil. The accepted board does not move a single
             word -- ASH 4, THORN 1, KNOT 2, slot 3 empty, exactly as before, so every playthrough
             script and full-true.json still hold -- but the two cuts have swapped slots and the mark
             is the notch. A table that confidently applies the Prologue's rule now lays a full,
             lawful-looking, WRONG board, which is the same shape ch0's own lamp, ch4's oath and ch7's
             sigil all use: the guess a table makes without the missing seat has a cut under it. */
          P.sight.push({ t: 'list', items: [
            'The dormitory lamp was Founders\u2019 brass, and a Founders\u2019 sigil begins at the **scratch**. **This is not one.**',
            'A Vigil ward is cut by the keeper sworn to it, and on a Vigil ward the keeper\u2019s mark **binds**. It begins at the **notch**. The scratch is the older cut, and down here the older cut is only wear.',
            'The **first** word goes **in** the notched slot. Every word after it goes into the next slot clockwise, the way the numbers count up.',
            'When the count runs off the end it comes back to slot 1. **Any slot the words do not reach stays empty.**',
          ] });
          P.sight.push({ t: 'fine', text: 'A spare shape is not decoration. It is a different sign, and the iron can tell.' });
          P.sight.push({ t: 'fine', text: 'Say which cut binds **before** anybody places a word. The other three will start at the scratch, because that is what the lamp taught them, and they will be wrong.' });
          P.sight.push({ t: 'fine', text: 'You cannot see the cuts and you cannot read the shapes. Ask for both.' });
        }
        P.wren.push({ t: 'h', text: 'A thread you have not looked at' });
        P.wren.push({ t: 'p', text: 'Bess, the porter, the captain — you read every thread in that gallery at a glance.' });
        P.wren.push({ t: 'p', text: hurt ? 'There is one you have never let yourself follow: the one from the Provost to Wren. Tonight Wren took your arm with the good hand, and there was no thread in it. There was a hand.' : 'There is one you have never let yourself follow: the one from the Provost to Wren.' });
        P.wren.push({ t: 'fine', text: 'You know what colour a mother’s thread is. You decided long ago not to look.' });
      }

      /* ================= SPEAK (gated by LINEN) ================= */
      if (!ctx.mini('LINEN')) {
        P.speak.push({ t: 'fine', text: 'Nothing to speak yet. The Hearth will tell you when.' });
      } else {
        const Q = {
          reader: { prompt: hurt ? 'Wren, the arm re-strapped in a clean sheet, does not look at you while asking. *"The Reader. What does my name mean in the old tongue? Properly. Not the Provost\'s version."*' : 'Wren, over the kettle, so the others cannot hear. *"The Reader. What does my name mean in the old tongue? Properly. Not the Provost\'s version."*',
            opts: [['TELL', 'Tell Wren: **"A small brave bird."** ~~(a bluff — it is not in any alphabet you know)~~'], ['DONTKNOW', '**"I don\'t know yet."** ~~(the truth)~~']],
            after: { TELL: 'Wren grins, delighted, and says it twice under the breath. *A small brave bird.* You made that up. It sounded true, which is not the same thing.', DONTKNOW: 'Wren nods, not disappointed. *"Yet. Good. Tell me when."*' } },
          listener: { prompt: hurt ? 'Wren, on a tub with the bad arm held close, asks it to the arm rather than to you. *"The Listener. You hear everyone\'s heart. Can you hear mine?"*' : 'Wren, pretending to fold a sheet, so it looks like nothing. *"The Listener. You hear everyone\'s heart. Can you hear mine?"*',
            opts: [['LOUD', '**"Yes. Loud."** ~~(a lie)~~'], ['NO', '**"No."** ~~(the truth)~~']],
            after: { LOUD: 'Wren looks pleased, then looks at you a moment too long, then goes back to the sheet. You have never heard it. You said loud.', NO: 'Wren does not flinch. *"Right. Okay. Thank you for not — right."* The kettle covers whatever comes next.' } },
          seer: { prompt: hurt ? 'Wren, hurt and trying not to show it, asks without warning. *"The Seer. You look at me strangely. More, since the stair. What do you see?"*' : 'Wren, close, in the steam. *"The Seer. You look at me strangely sometimes. You\'re doing it now. What do you see?"*',
            opts: [['TELL', 'Tell Wren about **the shadow**: it falls toward the fire. Every fire. ~~(the truth)~~'], ['NOTHING', '**Say nothing.** Look at the wall.']],
            after: { TELL: 'Wren listens to the whole thing and does not laugh. *"Toward. Huh."* Then, later: *"That\'s very poetic, the Seer."* You did not mean it poetically.', NOTHING: 'You look at the wall. Wren looks at you looking at it, and lets you.' } },
          binder: { prompt: hurt ? 'Wren, white around the mouth, keeping the voice light. *"The Binder. Honestly. Am I really the one? Because the one should be able to get down a stair."*' : 'Wren, quietly, with a laundry basket between you as if it were a table. *"The Binder. Honestly. Do you think I\'m really the one?"*',
            opts: [['YES', '**"Yes."**'], ['DONTKNOW', '**"I don\'t know."** ~~(the truth)~~']],
            after: { YES: 'Wren nods like someone receiving an expected verdict. *"Right. Yes. Good to have it from a Binder."* You said yes because it was kind. You are not sure it was kind.', DONTKNOW: 'Wren is quiet a moment. *"Nobody\'s ever said that to me. Everyone always knows."* And then, almost too low to hear: *"Thanks."*' } },
        }[roleId];
        P.speak.push({ t: 'h', text: 'In the laundry, in a whisper' });
        P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });
        P.speak.push({ t: 'choice', id: 'whisper', prompt: Q.prompt, options: Q.opts.map(([id, text]) => ({ id, text })), after: (optId) => Q.after[optId] });
        P.speak.push({ t: 'fine', text: 'Nobody at the table will know what you answered. Wren will.' });
      }
      return P;
    },
  });
})();
