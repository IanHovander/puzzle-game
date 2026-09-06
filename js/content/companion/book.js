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
    const fast = kind === 'fast'; let d = 'M0,11 '; const n = fast ? 5 : 3; for (let i = 0; i < n; i++) { const x = 8 + i * (110 / n); d += `L${x},11 L${x + 4},3 L${x + 8},19 L${x + 12},11 `; } d += 'L120,11';
    return `<svg viewBox="0 0 120 22" class="trace"><path d="${d}" stroke="#4fb3bf" stroke-width="1.5" fill="none"/></svg>`;
  };
  D.glyphCard = (name, size) => `<div class="lx"><div>${G.svg(name, { size: size || 40, color: '#f2d27a' })}</div><div><b>${name}</b><span>${G.GLYPHS[name].gloss}</span></div></div>`;
  window.CompanionDraw = D;

  /* ---------- BOOK tab ---------- */
  C.book = function (roleId, ctx) {
    const blocks = [];
    const n = ctx.maxChapter;
    if (roleId === 'reader') {
      blocks.push({ t: 'h', text: 'The Lexicon — four shapes, read two ways' });
      blocks.push({ t: 'fine', text: 'Upright, a shape reads as the first word; **turned** (rotated), as the second. A carved line with its mark on the **left** is read upright, left to right. With the mark on the **right** it is *turned*: read right to left, and every glyph inverts.' });
      blocks.push({ t: 'html', html: `<div class="lexicon">${['ASH', 'THORN', 'KNOT', 'CROWN'].map(u => D.glyphCard(u) + D.glyphCard(G.PAIR[u])).join('')}</div>` });
      blocks.push({ t: 'fine', text: 'Shapes: **Flame** = ASH / COLD · **Spike** = THORN / WELL · **Hook** = KNOT / VEIL · **Crown** = CROWN / EMBER.' });
      blocks.push({ t: 'h', text: 'Glossary' });
      const gl = [['WREN', n >= 4 ? 'the Vigil roll spells it WRENN in the older alphabet: *the hollow of a bell; the space that rings*' : 'the child\'s name. Written on the dormitory door in the older alphabet, which you have not learned.']];
      if (n >= 2) gl.push(['THE FOUNDERS\' GLYPHS', 'Halvard — THORN · Idony — KNOT · Rook — VEIL · Mere — EMBER (from the plinths in the Vault)']);
      blocks.push({ t: 'list', items: gl.map(([k, v]) => `**${k}** — ${v}`) });
      blocks.push({ t: 'h', text: 'The Older Alphabet' });
      blocks.push(n >= 4 ? { t: 'p', text: 'Learned from the Provost\'s primer (Chapter IV). A simple substitution: each old letter is the modern letter shown beside it on the primer page.' } : { t: 'fine', text: '*Locked — "You have not learned it yet."*' });
    }
    if (roleId === 'listener') {
      blocks.push({ t: 'h', text: 'The Ladder' });
      blocks.push({ t: 'fine', text: 'The Founders\' Tongue is a ladder of seven steps and a rest. You never hear a glyph\'s *name* — every room is tuned differently — only how far the tune **steps** from one glyph to the next. COLD is the rest.' });
      blocks.push({ t: 'html', html: `<div class="lexicon">${G.LADDER.map((nm, i) => `<div class="lx"><div>${G.svg(nm, { size: 36, color: '#4fb3bf' })}</div><div><b>${nm}</b><span>step ${i}</span></div></div>`).join('')}<div class="lx"><div>${G.svg('COLD', { size: 36, color: '#4fb3bf' })}</div><div><b>COLD</b><span>a rest — no step</span></div></div></div>` });
      blocks.push({ t: 'fine', text: 'So THORN (1) to KNOT (2) is *up one*; KNOT (2) to VEIL (5) is *up three*; VEIL (5) to EMBER (3) is *down two*. A rest is a pause, not a new start: the step after it is counted from the last glyph that sounded.' });
      blocks.push({ t: 'h', text: 'Row-player' });
      blocks.push({ t: 'custom', render: (el, cx) => {
        el.appendChild(UI.el('p', { class: 'fine', text: 'Tap glyphs in an order to hear how that row would step. Compare it with the room\'s phrase by ear or by the arrows.' }));
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
      blocks.push({ t: 'fine', text: 'Every heart in a room, when you listen for it. The pages of each chapter list who is present.' });
    }
    if (roleId === 'seer') {
      blocks.push({ t: 'h', text: 'The Ring Page' });
      blocks.push({ t: 'fine', text: 'Every ring of slots has a **mark** — a scratch where the sigil begins. Slots are numbered **sunwise**, which is clockwise, from the top. An inscription\'s mark sits at one end: on the **left**, the line is upright; on the **right**, the line was carved *turned* — the Reader must read it right to left with every glyph inverted, and the Binder\'s Laws say where a turned line is placed.' });
      blocks.push({ t: 'svg', cls: 'underlayer', svg: `<svg viewBox="0 0 320 200"><circle cx="100" cy="100" r="70" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M100,22 a78,78 0 0 1 55,23" fill="none" stroke="#fff" stroke-width="2"/><path d="M155,45 l-9,-2 l3,9 z" fill="#fff"/><text x="100" y="18" text-anchor="middle" fill="#fff" font-size="11" font-family="Cinzel,serif">sunwise = clockwise</text>${[0, 1, 2, 3].map(i => { const a = (i / 4 * 360 - 90) * Math.PI / 180; return `<circle cx="${100 + Math.cos(a) * 70}" cy="${100 + Math.sin(a) * 70}" r="12" fill="none" stroke="#fff"/><text x="${100 + Math.cos(a) * 70}" y="${104 + Math.sin(a) * 70}" text-anchor="middle" fill="#fff" font-size="11">${i + 1}</text>`; }).join('')}<path d="M100,178 l-6,10 l12,0 z" fill="#a482e6"/><text x="100" y="196" text-anchor="middle" fill="#a482e6" font-size="10" font-family="Cinzel,serif">the mark</text><g transform="translate(200,60)"><rect x="0" y="0" width="110" height="34" rx="4" fill="none" stroke="#fff"/><path d="M-4,17 l-8,-6 l0,12 z" fill="#a482e6"/><text x="55" y="22" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">mark left · upright</text></g><g transform="translate(200,120)"><rect x="0" y="0" width="110" height="34" rx="4" fill="none" stroke="#fff"/><path d="M114,17 l8,-6 l0,12 z" fill="#a482e6"/><text x="55" y="22" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">mark right · turned</text></g></svg>` });
      blocks.push({ t: 'h', text: 'Shadows' });
      blocks.push({ t: 'fine', text: 'Under-Sight shows what is beneath a room: doors under plaster, sockets under rebuilt stone, and shadows as they truly fall. Look at every shadow. Say what you see.' });
    }
    if (roleId === 'binder') {
      blocks.push({ t: 'h', text: 'The Book of Laws' });
      blocks.push({ t: 'fine', text: 'Every Law is dated: **Founders\'** (Year 0) or **Order\'s** (Year 212 or 340). Law 3: where two Laws disagree, the older binds.' });
      const laws = L.lawsUpTo(L.chapters[Math.max(0, Math.min(8, n))].id);
      const struckRestored = !!(ctx.flags && ctx.flags.LAW0) || (ctx.state.unlocked && Object.values(ctx.state.unlocked).some(u => u.flags && u.flags.LAW0));
      const render = (list) => `<div class="laws">${list.map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}${l.struck && !struckRestored ? ' struck' : ''}"><div class="era">Law ${l.n} · ${l.era === 'F' ? 'Founders\' · Year 0' : 'Order\'s · Year ' + l.year}${l.struck ? (struckRestored ? ' · RESTORED' : ' · STRUCK') : ''}</div><div class="txt">${UI.esc(l.text)}</div>${l.struck ? `<div class="fine">${struckRestored ? 'Older than Law 6. The older binds.' : UI.esc(l.note)}</div>` : ''}</div>`).join('')}</div>`;
      blocks.push({ t: 'h', text: 'In the order learned' });
      blocks.push({ t: 'html', html: render(laws) });
      blocks.push({ t: 'h', text: 'By year' });
      blocks.push({ t: 'html', html: render(laws.slice().sort((a, b) => a.year - b.year || a.n - b.n)) });
      blocks.push({ t: 'h', text: 'Threads' });
      blocks.push({ t: 'fine', text: 'Grey — grief, or a goodbye already said. Gold — the Crown\'s coin or favour. Red — an oath. No thread — unbound; or, once, "not unbound: the knot itself."' });
    }
    (C.bookExtras || []).forEach(fn => { try { const b = fn(roleId, ctx); if (b && b.length) blocks.push(...b); } catch (e) { console.error(e); } });
    return blocks;
  };
})();
