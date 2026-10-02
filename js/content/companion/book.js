/* Companion persistent pages (the BOOK tab) and shared phone audio helpers. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI;
  window.CompanionContent = window.CompanionContent || { chapters: [], bookExtras: [] };
  const C = window.CompanionContent;
  C.bookExtras = C.bookExtras || [];

  /* ---------- audio helpers ---------- */
  const CA = {};
  /* A step is a number (up/down the ladder), 'rest' (a pause) or 'start' (the first note after an opening rest).
     Anything else — or a number that is not finite — is drawn as a start and played as nothing, never as NaN. */
  CA.stepKind = function (s) {
    if (s === 'rest') return { kind: 'rest' };
    const v = typeof s === 'number' ? s : (typeof s === 'string' && /^[-+]?\d+$/.test(s.trim()) ? parseInt(s, 10) : NaN);
    return Number.isFinite(v) ? { kind: 'step', v } : { kind: 'start' };
  };
  CA.stepLabel = (s) => { const k = CA.stepKind(s); return k.kind === 'rest' ? 'rest' : k.kind === 'start' ? 'begins' : (k.v > 0 ? '+' + k.v : String(k.v)); };
  CA.strip = function (steps) {
    return `<div class="arrow-strip">${steps.map(s => { const k = CA.stepKind(s); if (k.kind === 'rest') return '<span class="step rest"><b>—</b>rest</span>'; if (k.kind === 'start') return '<span class="step start"><b>◆</b>begins</span>'; return `<span class="step${k.v === 0 ? ' same' : ''}"><b>${k.v > 0 ? '▲' : k.v < 0 ? '▼' : '='}</b>${k.v > 0 ? 'up ' + k.v : k.v < 0 ? 'down ' + (-k.v) : 'same'}</span>`; }).join('')}</div>`;
  };
  /* Tell whichever strip is listening that step i (0-based, in the array the strip was drawn from) is sounding now. */
  CA.announce = function (i, extra) { try { document.dispatchEvent(new CustomEvent('vigil:step', { detail: Object.assign({ step: i }, extra || {}) })); } catch (e) {} };
  /* Every note the helpers schedule goes through CA.later, so a new press (UI.stopAudio → 'vigil:stop') can drop
     the rest of the phrase that was playing. Content that chains its own timeouts should use CA.later too. */
  let pending = [];
  CA.later = function (fn, ms) { const id = setTimeout(() => { pending = pending.filter(x => x !== id); fn(); }, ms); pending.push(id); return id; };
  CA.stop = function () { pending.forEach(clearTimeout); pending = []; };
  try { document.addEventListener('vigil:stop', CA.stop); } catch (e) {}
  /* Play a contour of steps relative to a starting pitch (room-tuned: absolute pitch varies per call).
     Returns the length of the phrase in ms. opts.offset shifts the announced step index (for a second voice). */
  CA.playSteps = function (Audio, steps, base, opts) {
    Audio.init(); if (Audio.isMuted()) Audio.setMuted(false);
    const off = (opts && opts.offset) || 0;
    let midi = base || (60 + Math.floor(Math.random() * 7));
    const ladder = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];
    let idx = 4; // start mid-ladder
    const at = (k) => { const oct = Math.floor(k / 7), d = ((k % 7) + 7) % 7; return midi + oct * 12 + ladder[d]; };
    Audio.note(at(idx), 1.0, 0.18);
    let t = 650;
    steps.forEach((s, i) => {
      const k = CA.stepKind(s);
      if (k.kind === 'rest') { const tt = t; CA.later(() => CA.announce(off + i, { rest: true }), tt); t += 700; return; }
      if (k.kind === 'step') idx += k.v; // 'start' keeps the pitch and just sounds
      const m = at(idx), tt = t; CA.later(() => { Audio.note(m, 1.0, 0.18); CA.announce(off + i); }, tt); t += 650;
    });
    return t + 500;
  };
  /* Play glyphs by their own pitch (the Book's row-player); COLD is a silent beat. Returns the length in ms. */
  CA.playGlyphs = function (Audio, names) { Audio.init(); if (Audio.isMuted()) Audio.setMuted(false); let t = 0; names.forEach((n, i) => { const m = G.MIDI[n]; const tt = t; CA.later(() => { if (m) Audio.note(m, 1.0, 0.18); if (i > 0) CA.announce(i - 1, m ? {} : { rest: true }); }, tt); t += 650; }); return t + 500; };
  CA.heartbeat = function (Audio, bpm, beats) { Audio.init(); if (Audio.isMuted()) Audio.setMuted(false); if (!bpm) return 0; const iv = 60000 / bpm, n = beats || 8; for (let i = 0; i < n; i++) CA.later(() => Audio.sfx('heart'), i * iv); return n * iv + 300; };
  CA.pulses = function (Audio, n, gapMs) { Audio.init(); if (Audio.isMuted()) Audio.setMuted(false); n = n | 0; const gap = gapMs || 420; for (let i = 0; i < n; i++) CA.later(() => Audio.sfx('chime'), i * gap); return n * gap + 400; };
  window.CompanionAudio = CA;

  /* ---------- shared drawing helpers ---------- */
  const D = {};
  D.trace = (kind) => { // heartbeat trace svg
    if (kind === 'flat') return `<svg viewBox="0 0 120 22" class="trace"><path d="M0,11 L120,11" stroke="#4fb3bf" stroke-width="1.5" fill="none" opacity=".6"/></svg>`;
    const fast = kind === 'fast'; let d = 'M0,11 '; const n = fast ? 5 : kind === 'slow' ? 1 : 3; for (let i = 0; i < n; i++) { const x = 8 + i * (110 / n); d += `L${x},11 L${x + 4},3 L${x + 8},19 L${x + 12},11 `; } d += 'L120,11';
    return `<svg viewBox="0 0 120 22" class="trace"><path d="${d}" stroke="#4fb3bf" stroke-width="1.5" fill="none"/></svg>`;
  };
  D.glyphCard = (name, size) => `<div class="lx"><div>${G.svg(name, { size: size || 40, color: '#f2d27a' })}</div><div><b>${name}</b><span>${G.GLYPHS[name].gloss}</span></div></div>`;
  window.CompanionDraw = D;

  /* ---------- BOOK tab ----------
     Reference, not story: one short heading per section, the fact drawn or tabled where it can be, and
     the fewest words that keep every gloss, step, Law and ring rule exactly as the pages rely on them.
     The words here are the Hearth's: a ring has numbered SLOTS (js/puzzles/ring.js). */
  const SHAPE_ROWS = [['Flame', 'ASH'], ['Spike', 'THORN'], ['Hook', 'KNOT'], ['Crown', 'CROWN']];
  const THREAD = { red: '#d96b4a', gold: '#d4a94e', gray: 'rgba(200,200,210,.75)' };
  const threadSwatch = (kind) => `<svg viewBox="0 0 90 16" class="sw">${kind === 'none'
    ? '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
    : `<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="${THREAD[kind]}" stroke-width="2.5" stroke-linecap="round"/>`}</svg>`;
  const keyRows = (rows) => `<div class="bk-key">${rows.map(([a, b]) => `<div class="bk-row"><div class="bk-k">${a}</div><div class="bk-v">${b}</div></div>`).join('')}</div>`;

  C.book = function (roleId, ctx) {
    const blocks = [];
    const n = ctx.maxChapter;
    if (roleId === 'reader') {
      blocks.push({ t: 'h', text: 'The Lexicon' });
      blocks.push({ t: 'html', html: keyRows([
        ['a shape <b>upright</b>', 'its <b>first</b> word'],
        ['a shape <b>turned</b> (rotated)', 'its <b>second</b> word'],
        ['a carved line, mark on the <b>left</b>', 'upright: read left to right'],
        ['a carved line, mark on the <b>right</b>', '<em>turned</em>: read right to left, and every glyph inverts'],
      ]) });
      /* Four shapes, one row each: the shape's name over its two words, upright beside turned. */
      blocks.push({ t: 'html', html: `<div class="lexicon"><div class="lx-col">upright</div><div class="lx-col">turned</div>${SHAPE_ROWS.map(([shape, u]) =>
        `<div class="lx-shape">${shape}</div>${D.glyphCard(u)}${D.glyphCard(G.PAIR[u])}`).join('')}</div>` });
      blocks.push({ t: 'h', text: 'Glossary' });
      blocks.push({ t: 'html', html: `<dl class="gloss"><dt>WREN</dt><dd>${n >= 4
        ? 'The Vigil roll spells it WRENN in the older alphabet: <em>the hollow of a bell; the space that rings.</em>'
        : 'The child\'s name. Written on the dormitory door in the older alphabet, which you have not learned.'}</dd></dl>` });
      // Plinth order, not the order the vault door wants, and not before the door is behind them:
      // this entry used to name the door's own answer sequence from the scene before the puzzle.
      /* The plinth order, hand-copied out of Chapter II. It moved: ch2's CUTFOR was [2,3,4,1], which
         is the floor turned one sunwise -- the single idiom a Seer-less table reaches for, and the
         shipped answer was that guess, so a recorded 1-in-23 was really 1-in-3. CUTFOR is [3,4,2,1]
         now and WORDS moved with it (js/content/ch2.js:88), so this line was the Reader's permanent
         Book contradicting the Reader's own Chapter II page from Chapter III onward. It is gated
         n >= 3, so it was never visible during ch2 itself, which is why nothing caught it. */
      if (n >= 3) blocks.push({ t: 'html', html: `<dl class="gloss"><dt>THE FOUNDERS' GLYPHS <small>from the vault door</small></dt><dd>${keyRows([['plinth 1', 'THORN'], ['plinth 2', 'VEIL'], ['plinth 3', 'EMBER'], ['plinth 4', 'KNOT']])}</dd></dl>` });
      // From Chapter IV the primer itself is the section (companion/ch4.js adds it after this one).
      if (n < 4) { blocks.push({ t: 'h', text: 'The Older Alphabet' }); blocks.push({ t: 'fine', text: '*Locked — "You have not learned it yet."*' }); }
    }
    if (roleId === 'listener') {
      blocks.push({ t: 'h', text: 'The Ladder' });
      blocks.push({ t: 'fine', text: 'Seven steps and a rest. Every room is tuned differently, so you never hear a glyph\'s *name*, only how far the tune **steps** from one glyph to the next. COLD is the rest.' });
      /* Drawn as a ladder: the top rung is the highest step, so "up" on the page is up in the tune. */
      blocks.push({ t: 'html', html: `<div class="ladder">${G.LADDER.map((nm, i) => ({ nm, i })).reverse().map(({ nm, i }) =>
        `<div class="rung"><span class="n">${i}</span>${G.svg(nm, { size: 30, color: '#4fb3bf' })}<b>${nm}</b><span class="what">step ${i}</span></div>`).join('')}<div class="rung rest"><span class="n">—</span>${G.svg('COLD', { size: 30, color: '#4fb3bf' })}<b>COLD</b><span class="what">a rest — no step</span></div></div>` });
      blocks.push({ t: 'html', html: keyRows([
        ['THORN (1) → KNOT (2)', '<em>up one</em>'],
        ['KNOT (2) → VEIL (5)', '<em>up three</em>'],
        ['VEIL (5) → EMBER (3)', '<em>down two</em>'],
      ]) });
      blocks.push({ t: 'fine', text: 'A rest is a pause, not a new start: the step after it is counted from the last glyph that sounded.' });
      blocks.push({ t: 'h', text: 'Row-player' });
      blocks.push({ t: 'custom', render: (el, cx) => {
        el.appendChild(UI.el('p', { class: 'fine', text: 'Tap glyphs in order to hear how that row steps. Compare it with the room\'s phrase, by ear or by the arrows.' }));
        const row = []; const seqEl = UI.el('div', { class: 'seq-list' }); const grid = UI.el('div', { class: 'pick-grid' });
        const render = () => { UI.clear(seqEl); if (!row.length) seqEl.appendChild(UI.el('span', { class: 'seq-empty', text: 'No glyphs yet.' })); row.forEach(nm => seqEl.appendChild(UI.el('span', { class: 'seq-chip', text: nm }))); };
        G.ORDER.forEach(nm => grid.appendChild(UI.el('div', { class: 'pk', html: G.svg(nm, { size: 40, color: '#4fb3bf' }) + '<div>' + nm + '</div>', onclick: () => { row.push(nm); render(); } })));
        el.appendChild(grid); el.appendChild(seqEl);
        const strip = UI.el('div', { class: 'strip' });
        const showSteps = () => { if (row.length < 2) { strip.innerHTML = '<p class="fine">Tap at least two glyphs to see a step.</p>'; return; } strip.innerHTML = CA.strip(G.steps(row)) + '<p class="fine">' + UI.esc(G.stepsText(row)) + '.</p>'; };
        el.appendChild(UI.el('div', { class: 'row' }, [
          UI.audioButton('Play row', () => { showSteps(); if (!row.length) return 0; const len = CA.playGlyphs(window.VigilAudio, row); UI.lightStrip(strip, len); return len; }, { cls: 'small' }),
          UI.el('button', { class: 'btn small ghost', text: 'Show steps', onclick: showSteps }),
          UI.el('button', { class: 'btn small ghost', text: 'Clear', onclick: () => { row.length = 0; render(); strip.innerHTML = ''; } }),
        ]));
        el.appendChild(strip); render();
      } });
      blocks.push({ t: 'h', text: 'Heartbeats' });
      blocks.push({ t: 'html', html: `<div class="heartbeats">${[['steady', 'normal'], ['fast', 'fast'], ['slow', 'slow'], ['nothing to hear', 'flat']].map(([w, k]) => `<div class="hb"><span>${w}</span>${D.trace(k)}</div>`).join('')}</div>` });
      blocks.push({ t: 'fine', text: 'Every heart in a room, when you listen for it. Each chapter\'s pages show who is there.' });
    }
    if (roleId === 'seer') {
      blocks.push({ t: 'h', text: 'The Ring Page' });
      blocks.push({ t: 'svg', cls: 'underlayer', svg: `<svg viewBox="0 0 320 188"><circle cx="80" cy="82" r="52" fill="none" stroke="#fff" stroke-width="1.5"/>${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180, x = (80 + Math.cos(a) * 52).toFixed(1), y = (82 + Math.sin(a) * 52).toFixed(1); return `<circle cx="${x}" cy="${y}" r="13" fill="#000" stroke="#fff" stroke-width="1.5"/><text x="${x}" y="${(+y + 4.5).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="13" font-family="Cinzel,serif">${i + 1}</text>`; }).join('')}<text x="80" y="164" text-anchor="middle" fill="#fff" font-size="12" font-family="Cinzel,serif">1 at the top,</text><text x="80" y="179" text-anchor="middle" fill="#fff" font-size="12" font-family="Cinzel,serif">clockwise</text><g font-family="Cinzel,serif" font-size="12" fill="#fff" text-anchor="middle"><rect x="186" y="26" width="110" height="28" rx="4" fill="none" stroke="#fff" stroke-width="1.5"/><g fill="#fff" opacity=".55"><circle cx="214" cy="40" r="4"/><circle cx="241" cy="40" r="4"/><circle cx="268" cy="40" r="4"/></g><path d="M172,32 l10,8 l-10,8 z" fill="#a482e6"/><text x="241" y="74">mark left · upright</text><rect x="174" y="104" width="110" height="28" rx="4" fill="none" stroke="#fff" stroke-width="1.5"/><g fill="#fff" opacity=".55"><circle cx="202" cy="118" r="4"/><circle cx="229" cy="118" r="4"/><circle cx="256" cy="118" r="4"/></g><path d="M298,110 l-10,8 l10,8 z" fill="#a482e6"/><text x="229" y="152">mark right · turned</text></g></svg>` });
      blocks.push({ t: 'html', html: keyRows([
        ['slots', 'numbered like a clock: <b>1</b> at the top, then clockwise'],
        ['cuts', 'a <b>scratch</b>, a <b>notch</b>, or a <b>chip</b> in the glaze. Every ring has them. Say what each one is, and which slot it is by.'],
        ['a carved line', 'has a mark at one end. Mark on the <b>left</b>: it stands upright. Mark on the <b>right</b>: it was carved turned.'],
      ]) });
      blocks.push({ t: 'h', text: 'Under-Sight' });
      blocks.push({ t: 'fine', text: 'What is beneath a room: doors under plaster, holes under rebuilt stone, and shadows as they truly fall. Look at every shadow. Say what you see.' });
    }
    if (roleId === 'binder') {
      blocks.push({ t: 'h', text: 'The Book of Laws' });
      blocks.push({ t: 'html', html: `<div class="eras"><span class="era-chip founders">Founders' · Year 0</span><span class="era-chip order">Order's · Year 212 or 340</span></div><p class="law-rule"><b>Law 3:</b> where two Laws disagree, the older binds.</p>` });
      const laws = L.lawsUpTo(L.chapters[Math.max(0, Math.min(8, n))].id);
      const struckRestored = !!(ctx.flags && ctx.flags.LAW0) || (ctx.state.unlocked && Object.values(ctx.state.unlocked).some(u => u.flags && u.flags.LAW0));
      const render = (list) => `<div class="laws">${list.map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}${l.struck && !struckRestored ? ' struck' : ''}"><div class="era"><b>Law ${l.n}</b> · ${l.era === 'F' ? 'Founders\' · Year 0' : 'Order\'s · Year ' + l.year}${l.struck ? (struckRestored ? ' · RESTORED' : ' · STRUCK') : ''}</div><div class="txt">${UI.esc(l.text)}</div>${l.struck ? `<div class="fine">${struckRestored ? 'Older than Law 6. The older binds.' : UI.esc(l.note)}</div>` : ''}</div>`).join('')}</div>`;
      blocks.push({ t: 'h', text: 'In the order learned' });
      blocks.push({ t: 'html', html: render(laws) });
      // The same Laws again, oldest first. Folded away: printed open, it doubled the page.
      blocks.push({ t: 'reveal', label: 'Show them by year', blocks: [{ t: 'html', html: render(laws.slice().sort((a, b) => a.year - b.year || a.n - b.n)) }] });
      blocks.push({ t: 'h', text: 'Threads' });
      blocks.push({ t: 'html', html: keyRows([
        [threadSwatch('gray') + 'Gray', 'grief, or a goodbye already said'],
        [threadSwatch('gold') + 'Gold', 'the Crown\'s coin or favor'],
        [threadSwatch('red') + 'Red', 'an oath'],
        [threadSwatch('none') + 'No thread', 'unbound. Or, once, "not unbound: the knot itself."'],
      ]) });
    }
    (C.bookExtras || []).forEach(fn => { try { const b = fn(roleId, ctx); if (b && b.length) blocks.push(...b); } catch (e) { console.error(e); } });
    return blocks;
  };
})();
