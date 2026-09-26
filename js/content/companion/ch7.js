/* Companion — Finale (CROWN). One puzzle fact each, and no page holds another's:
   the Reader has what the two walls say, read from either end;
   the Listener has how the phrase opens — the second word is one rung above the first;
   the Seer has the two cuts in the rim of the floor, and which socket each is in;
   the Binder has the Laws: a sigil begins in the scratch and runs sunwise, and names every word once.
   Verified by enumeration over 128 rings — tools/scripts/ch7-sigil-check.js, run against the shipped
   check(): all four pages give exactly one ring; drop the Listener and four remain (two under the
   oath, which rotates the wall order away), drop the Seer and eight, drop the Binder and eight. Drop
   the Reader and no word can be named — the Hearth's palette is name-only and the walls are legible
   only here. Note that the shape-to-word lexicon is NOT private: book.js prints all eight shapes
   beside their names on the Listener's Book page, so the Reader's necessity rests on
   js/art/scenes-ch7.js drawing the wear on those walls and never the cut.
   The walls moved this pass: the first four words used to be Chapter II's vault-door answer in
   Chapter II's order, which is also the worked example on the Listener's permanent Book page. The
   same check script now compares both walls, both readings of each, and the phrase against every
   ordered sequence the game prints where more than one seat can read it. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI, Shared = window.VigilShared;
  const C = window.CompanionContent;
  const V = '#a482e6', GOLD = '#f2d27a', SEA = '#4fb3bf', RED = '#d96b4a';
  const F = 'font-family="Cinzel,serif"';

  /* a copy of the two walls in js/content/ch7.js — the phone does not load the chapter file.
     KEEP IN STEP WITH js/content/ch7.js:WEST/EAST/SCRATCH/NOTCH; tools/scripts/ch7-sigil-check.js
     compares the two files and fails if they drift. */
  const WEST = [{ shape: 'Hook', inv: false }, { shape: 'Crown', inv: true }, { shape: 'Spike', inv: false }, { shape: 'Spike', inv: true }];
  const EAST = [{ shape: 'Flame', inv: false }, { shape: 'Hook', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Flame', inv: true }];
  const SCRATCH = 6, NOTCH = 1;
  const words = (items, end) => G.readLine(items, end === 'other' ? 'right' : 'left')
    .map(n => `<b>${n}</b>`).join('<br>');

  /* Reader: the two walls, each drawn once and read both ways. No mark, no arrow, no socket number —
     which end a wall begins at is the Seer's, and which wall speaks first is the Listener's. */
  const wallRow = (items) => G.inscription(items.map(it => Object.assign({}, it)), { showMark: false, color: GOLD })
    .replace('style="', 'style="width:100%;height:auto;');
  /* One table, each wall across its full width with its two readings under it: in a three-column row
     the drawing shrank to a thumbnail on a phone. */
  const wallTable = () => {
    const TH = '<tr><th>from one end</th><th>from the other</th></tr>';
    const wall = (items, lab) => `<tr><td colspan="2">${wallRow(items)}<div class="fine" style="text-align:center">${lab}</div></td></tr>`
      + TH + `<tr><td>${words(items, 'one')}</td><td>${words(items, 'other')}</td></tr>`;
    return '<table class="blk-table"><tr><th colspan="2">cut into the wall</th></tr>' + wall(WEST, 'one wall') + wall(EAST, 'the other') + '</table>';
  };

  /* The Listener's interval, drawn: two rungs of the ladder and the smallest climb there is.
     The dormitory lamp opened on +3. This one opens on +1. */
  const climbOne = () => `<svg viewBox="0 0 200 100" style="width:180px;height:90px">
    ${[0, 1, 2, 3, 4].map(i => `<line x1="30" y1="${70 - i * 15}" x2="86" y2="${70 - i * 15}" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`).join('')}
    <circle cx="58" cy="70" r="7" fill="${SEA}"/><circle cx="58" cy="55" r="7" fill="${SEA}"/>
    <path d="M110,70 L110,55" stroke="${SEA}" stroke-width="2"/><path d="M110,49 l-5,10 l10,0 Z" fill="${SEA}"/>
    <text x="128" y="66" fill="${SEA}" font-size="18" ${F}>+1</text>
    <text x="100" y="94" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9" ${F}>the smallest climb there is</text>
  </svg>`;

  /* The Seer's floor: eight sockets, numbered as the Hearth numbers them, and TWO cuts.
     No arrow, no direction, no rule — the Seer reports cuts, not meanings. */
  const ringCuts = () => {
    const cx = 180, cy = 148, R = 86;
    const at = (n, d) => { const a = ((n - 1) / 8 * 360 - 90) * Math.PI / 180; return [cx + Math.cos(a) * (R + d), cy + Math.sin(a) * (R + d)]; };
    /* labels are placed by the mark's own bearing, so they stay inside the box wherever the cuts move */
    const lab = (n, d) => { const a = ((n - 1) / 8 * 360 - 90) * Math.PI / 180, c = Math.cos(a), v = Math.sin(a);
      if (Math.abs(v) <= 0.9) d += 24;   /* beside a mark, the label clears the mark's own width */
      return [(cx + c * (R + d)).toFixed(1), (cy + v * (R + d) + (Math.abs(v) > 0.9 ? (v > 0 ? 17 : -10) : 5)).toFixed(1),
        c > 0.35 ? 'start' : c < -0.35 ? 'end' : 'middle']; };
    let s = `<svg viewBox="0 0 360 298"><rect width="360" height="298" fill="#000"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="1.4"/>`;
    for (let i = 0; i < 8; i++) {
      const [x, y] = at(i + 1, 0); const hot = (i + 1) === SCRATCH;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="#000" stroke="${hot ? V : '#fff'}" stroke-width="${hot ? 2.5 : 1.4}"/>`;
      s += `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" fill="${hot ? V : '#fff'}" font-size="14" ${F}>${i + 1}</text>`;
    }
    const [sx, sy] = at(SCRATCH, 26), [slx, sly, sla] = lab(SCRATCH, 34);
    s += `<g stroke="${V}" stroke-width="2.5" stroke-linecap="round"><path d="M${(sx - 17).toFixed(1)},${(sy + 3).toFixed(1)} L${(sx + 17).toFixed(1)},${(sy - 5).toFixed(1)}"/><path d="M${(sx - 13).toFixed(1)},${(sy + 10).toFixed(1)} L${(sx + 13).toFixed(1)},${(sy + 3).toFixed(1)}"/></g>`;
    s += `<text x="${slx}" y="${sly}" text-anchor="${sla}" fill="${V}" font-size="13" ${F}>a scratch</text>`;
    const [nx, ny] = at(NOTCH, 24), [nlx, nly, nla] = lab(NOTCH, 32);
    s += `<g stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"><path d="M${(nx - 7).toFixed(1)},${(ny + 7).toFixed(1)} L${nx.toFixed(1)},${(ny - 4).toFixed(1)} L${(nx + 7).toFixed(1)},${(ny + 7).toFixed(1)}"/></g>`;
    s += `<text x="${nlx}" y="${nly}" text-anchor="${nla}" fill="rgba(255,255,255,.85)" font-size="13" ${F}>a small notch</text>`;
    s += `<text x="180" y="288" text-anchor="middle" fill="#fff" font-size="13" ${F} opacity=".75">two cuts in the rim, under the polish</text></svg>`;
    return s;
  };

  /* The Binder's rule, drawn: which cut starts a sigil, and which way it runs from there.
     THE GEOMETRY ENFORCES THE SEPARATION. An earlier version drew eight sockets on the Hearth's own
     angular convention (i/8*360-90, socket 1 at the top, clockwise — js/puzzles/ring.js), and put the
     scratch and the notch radially outside two of them. Held next to the Hearth's numbered wheel it read
     off "the scratch is on this socket, the notch on that one", which is the Seer's whole page, and dropping
     the Seer went from eight candidate rings to one. So: NO sockets at all here, and the two cuts sit at
     angles no socket ever occupies (22.5 degrees off every one of eight, whatever the ring's rotation).
     Where the cuts are is the Seer's. This page says only that one of them starts a sigil, and which
     way the sigil then runs. The Prologue's lawRing does the same thing by rotating off the Hearth's
     convention (companion/ch0.js).
     THE ANGLE BETWEEN THE TWO MARKS, checked this pass and deliberately left alone. The marks sit 221
     degrees apart, which rounds to five sockets, and five sockets is also how far apart the cuts
     really are — so the obvious next move is to break that too. It cannot be broken and it does not
     need to be. It cannot: on an eight-fold ring, if BOTH marks are half-way between sockets (which
     is what keeps either from being read off as a socket number) then the angle between them is
     always a whole multiple of 45 degrees, so "no mark on a socket" and "no whole number of sockets
     between the marks" are mutually exclusive, and the first is the one worth having. It does not
     need to be: the separation relates the two cuts to each other and says nothing about where
     either one is, and the page that matters here — the Seer-less field, eight start sockets — is
     eight because nobody knows which socket the scratch is in. Knowing the two cuts are five apart
     leaves all eight. tools/scripts/ch7-companion.json asserts the invariant that IS load-bearing:
     every mark in this drawing is more than 15 degrees off every one of the eight socket bearings. */
  const placingRule = () => `<svg viewBox="0 0 170 160" style="width:150px;height:141px">
    <circle cx="85" cy="80" r="52" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/>
    <g stroke="${RED}" stroke-width="2.5" stroke-linecap="round"><path d="M104,19 L120,11"/><path d="M107,25 L122,18"/></g>
    <text x="71" y="14" text-anchor="middle" fill="${RED}" font-size="9" ${F}>the scratch</text>
    <g stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"><path d="M16,115 L22,103 L28,115"/></g>
    <text x="26" y="129" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9" ${F}>a notch</text>
    <path d="M129,36 a62,62 0 0 1 0,88" fill="none" stroke="${RED}" stroke-width="2.5"/>
    <path d="M129,124 l-8,-5 l0,10 Z" fill="${RED}"/>
    <text x="128" y="84" text-anchor="end" fill="${RED}" font-size="9" ${F}>clockwise</text>
    <text x="85" y="156" text-anchor="middle" fill="rgba(255,255,255,.65)" font-size="8" ${F}>the scratch starts it, then clockwise</text>
  </svg>`;

  /* Wren, under the chamber: four shadows away from the spark, and one toward it. No names but Wren's. */
  const underChamber = () => {
    let s = `<svg viewBox="0 0 360 252"><rect width="360" height="252" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="212"/>`;
    s += `<ellipse cx="180" cy="128" rx="120" ry="50"/>`;
    for (let i = 0; i < 8; i++) { const a = (i / 8 * 360 - 90) * Math.PI / 180; s += `<circle cx="${(180 + Math.cos(a) * 120).toFixed(1)}" cy="${(128 + Math.sin(a) * 50).toFixed(1)}" r="6"/>`; }
    s += `<path d="M180,40 L180,18" stroke-dasharray="2 4"/></g>`;
    s += `<circle cx="180" cy="128" r="4" fill="#fff"/><circle cx="180" cy="128" r="9" fill="none" stroke="#fff" opacity=".5"/>`;
    const four = [[118, 182], [150, 190], [210, 190], [242, 182]];
    s += `<g fill="#fff">${four.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}<circle cx="180" cy="90" r="5" fill="${V}"/></g>`;
    s += `<g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round">${four.map(([x, y]) => { const dx = x - 180, dy = y - 128, n = Math.hypot(dx, dy); return `<path d="M${x},${y} L${(x + dx / n * 22).toFixed(1)},${(y + dy / n * 22).toFixed(1)}"/>`; }).join('')}</g>`;
    s += `<g stroke="${V}" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M180,90 L180,116"/></g>`;
    s += `<text x="189" y="98" fill="${V}" font-size="13" ${F}>Wren</text>`;
    s += `<text x="180" y="243" text-anchor="middle" fill="#fff" font-size="13" ${F} opacity=".75">shadows, as they fall</text></svg>`;
    return s;
  };

  /* A thread, drawn three ways: whole, gray, absent. */
  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`
    : kind === 'grey' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="rgba(233,226,210,.45)" stroke-width="2.5" stroke-linecap="round"/>'
    : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  /* SPEAK: the finale token. Two questions when four values exist; one otherwise. */
  const finaleBlock = (ctx) => {
    const values = L.finaleValues(ctx.flags);
    if (!values) return { t: 'fine', text: 'Nothing to speak. The Envoy has stood down and no Walk was read from the stone. The fire will not ask.' };
    const channel = L.channel('finale', ctx.roleId);
    const WALKQ = 'When the ring closes, do you walk into the fire, or stay?';
    const VANEQ = 'The Envoy\'s word, to you alone: *bring the boy to my door and you live a Master.*';
    if (values.length === 2 && values[0] === 'WALK') return { t: 'choice', id: 'finale', prompt: WALKQ, options: [{ id: 'WALK', text: 'WALK' }, { id: 'STAY', text: 'STAY' }], after: 'Sealed. Nobody at the table knows which. Say the word to the Hearth when it asks, never the answer.' };
    if (values.length === 2) return { t: 'choice', id: 'finale', prompt: VANEQ, options: [{ id: 'ACCEPT', text: 'ACCEPT' }, { id: 'REFUSE', text: 'REFUSE' }], after: 'Sealed. Whatever you chose, the Hearth will say it aloud only if it binds you.' };
    return { t: 'custom', render: (el, cx) => {
      const key = 'ch7:finale';
      const draw = () => {
        UI.clear(el);
        const stored = cx.state.answers[key];
        const parts = typeof stored === 'string' ? stored.split('_') : [];
        const chosen = parts.length === 2 && ['WALK', 'STAY'].includes(parts[0]) && ['ACCEPT', 'REFUSE'].includes(parts[1]) ? stored : null;
        const w = UI.el('div', { class: 'blk-choice' });
        if (chosen) {
          const [walk, barg] = chosen.split('_');
          w.appendChild(UI.el('p', { html: UI.rich(WALKQ) }));
          w.appendChild(UI.el('div', { class: 'opts' }, [UI.el('button', { class: 'btn opt chosen', text: walk, disabled: 'true' })]));
          w.appendChild(UI.el('p', { html: UI.rich(VANEQ) }));
          w.appendChild(UI.el('div', { class: 'opts' }, [UI.el('button', { class: 'btn opt chosen', text: barg, disabled: 'true' })]));
          w.appendChild(UI.el('div', { class: 'blk-code sea' }, [UI.el('div', { class: 'label', text: 'Your sealed word — type it into the Hearth when it asks' }), UI.el('div', { class: 'word', text: Shared.token(channel, chosen, values) })]));
          w.appendChild(UI.el('p', { class: 'fine', text: 'One word answers both. Nobody at the table knows either half.' }));
          el.appendChild(w); return;
        }
        let walk = null, barg = null;
        const mk = (prompt, ids, set) => { w.appendChild(UI.el('p', { html: UI.rich(prompt) })); const o = UI.el('div', { class: 'opts' }); ids.forEach(id => o.appendChild(UI.el('button', { class: 'btn opt', text: id, onclick: () => { set(id); Array.from(o.children).forEach(b => b.classList.toggle('chosen', b.textContent === id)); seal.disabled = !(walk && barg); cx.audio.sfx('click'); } }))); w.appendChild(o); };
        mk(WALKQ, ['WALK', 'STAY'], (id) => { walk = id; });
        mk(VANEQ, ['ACCEPT', 'REFUSE'], (id) => { barg = id; });
        const seal = UI.el('button', { class: 'btn primary big-btn', text: 'Seal both', disabled: 'true', onclick: async () => { if (!walk || !barg) return; if (!(await UI.confirm('Seal these answers? They cannot be unsaid.', { ok: 'Seal them', cancel: 'Not yet' }))) return; cx.state.answers[key] = walk + '_' + barg; cx.save(); cx.audio.sfx('seal'); draw(); } });
        w.appendChild(seal);
        w.appendChild(UI.el('p', { class: 'fine', text: 'Two questions, one sealed word. Choose both, then seal.' }));
        el.appendChild(w);
      };
      draw();
    } };
  };

  C.chapters.push({
    id: 'ch7',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {};
      const ally = !!f.VANE_ALLY, knot = !!f.OATH_KNOT, walkOn = !!f.WALK_UNLOCKED;

      /* ---------- SPEAK ---------- */
      P.speak.push({ t: 'h', text: 'The last sealed word' });
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });
      if (!ally) P.speak.push({ t: 'letter', text: `"${ctx.name ? ctx.name + '. ' : ''}To you alone, and I will not say it twice. Bring the boy to my door before the fire is out and you live a Master. The others need never know who opened the door."` });
      P.speak.push(finaleBlock(ctx));
      if (walkOn) P.speak.push({ t: 'fine', text: {
        reader: 'If you walk, you will not read tomorrow. Not the door, not the lexicon, not whatever Wren leaves you.',
        listener: 'If you walk, the house goes quiet. You have never heard a quiet house.',
        seer: 'If you walk, every shadow will fall the ordinary way, and only you will remember that once they did not.',
        binder: 'If you walk, you will never see another thread. You will have to ask people what they feel.',
      }[roleId] });
      if (ally) P.speak.push({ t: 'fine', text: 'The Envoy has stood down. There is no bargain on this page, only the fire.' });

      /* ---------- SIGHT ---------- */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'The two walls' });
        P.sight.push({ t: 'p', text: 'What the fire shows worn, you see cut.' });
        P.sight.push({ t: 'html', html: wallTable() });
        P.sight.push({ t: 'fine', text: 'a wall has two ends and no beginning' });
        P.sight.push({ t: 'p', text: '**Each wall says one of those two things, never both.** Read all four rows out loud.' });
        if (knot) P.sight.push({ t: 'fine', text: 'The seal at the foot of the Chair’s scroll is one word: **CROWN**.' });
        P.sight.push({ t: 'fine', text: 'Nothing on the walls says which one speaks first. Ask.' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'How it opens' });
        P.sight.push({ t: 'p', text: 'You have never heard the whole Hymn. You have heard how it starts.' });
        P.sight.push({ t: 'audio', label: 'The first two notes', strip: CA.strip([1]), play: (A) => CA.playSteps(A, [1]), text: '**The second note is one rung above the first.**' });
        P.sight.push({ t: 'html', html: climbOne() });
        P.sight.push({ t: 'p', text: 'Open on any other climb and the ring will not sing. Say it before anybody places a word.' });
        P.sight.push({ t: 'fine', text: 'You hear steps, never names.' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Two cuts in the floor' });
        P.sight.push({ t: 'p', text: 'Under the polish, the rim is cut in two places, by two different hands.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: ringCuts() });
        P.sight.push({ t: 'p', text: `A long, deliberate **scratch** at socket **${SCRATCH}**. A small **notch** at socket **${NOTCH}**. Those are the numbers the Hearth shows.` });
        P.sight.push({ t: 'p', text: 'Begin in the wrong socket and every word after it lands wrong too.' });
        P.sight.push({ t: 'fine', text: 'Say what is cut, and where.' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'The Law on the rim' });
        P.sight.push({ t: 'html', html: placingRule() });
        P.sight.push({ t: 'list', items: [
          'A sigil starts in the **scratch**. A notch is only a signature.',
          'It runs **sunwise**. Sunwise is clockwise, the way the numbers count up.',
          '**Eight words, and no word twice.** Say that first.',
          'Where the phrase shows the cold word, that socket stays empty.',
        ].concat(knot ? ['**You swore under KNOT, to the Chair.** Build the ring, then turn it whole until the Chair’s word stands where the phrase began.'] : []) });
        P.sight.push({ t: 'fine', text: 'You have no words and no numbers. Ask for both. The Laws are in your **Book**.' });
      }

      /* ---------- WREN: one anomaly, four ways, one last time ---------- */
      if (roleId === 'reader') {
        P.wren.push({ t: 'h', text: 'The word in the socket' });
        P.wren.push({ t: 'p', text: 'A word is cut into the floor of the empty socket, in the old letters. It is Wren’s name. In the study, you decided you had misread it.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your name is cut in that empty socket, in the old letters. I told myself I’d misread it. I don’t misread. Whatever it means, I’ll read it to you first.”' });
      }
      if (roleId === 'listener') {
        P.wren.push({ t: 'h', text: 'Eight hearts' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats">${[['Reader', 'fast'], ['Listener', 'fast'], ['Seer', 'fast'], ['Binder', 'fast']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: 'Nine people in this chamber, and eight hearts. You have never said aloud which one is missing.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Every heart in here is racing. Yours is… still not there. It never has been. So I’m staying right beside you tonight. If it starts, I’ll hear it first.”' });
      }
      if (roleId === 'seer') {
        P.wren.push({ t: 'h', text: 'The shadow, still' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underChamber() });
        P.wren.push({ t: 'p', text: 'Every shadow in the chamber falls away from the spark. Wren’s falls toward it. There is barely any light left to blame.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Your shadow still leans toward the fire. In this little light, anyone could see it. So I’m standing between you and the spark. It was never about the lamps.”' });
      }
      if (roleId === 'binder') {
        P.wren.push({ t: 'h', text: 'No thread, tonight of all nights' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('whole') + ' <strong>The four of you:</strong> red, knotted, to each other.</li>'
          + '<li>' + threadLine('grey') + ' <strong>The Provost, to Wren:</strong> gray since before you were born.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren, to anyone:</strong> nothing at all.</li>'
          + '</ul>' });
        P.wren.push({ t: 'p', text: 'You decided years ago that your gift had a blind spot. It does not.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Still no thread, Wren. Not to any of us. So I’m saying it the old way, out loud. You are bound to us. I don’t need a thread to keep an oath.”' });
      }

      return P;
    },
  });
})();
