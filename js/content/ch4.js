/* Chapter IV — The Oath (the Provost's study). Pass-around Warden; the Seer is the Voice. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const F = () => Store.state.flags;

  /* ---------- chapter-local CSS (all selectors .ch4-) ---------- */
  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch4-room svg { width: 100%; max-height: 34vh; display: block; }
    .ch4-hot { cursor: pointer; }
    .ch4-hot .hs { fill: rgba(255,255,255,0.02); stroke: rgba(255,255,255,0.18); stroke-width: 1.5; stroke-dasharray: 5 4; transition: all .15s; }
    .ch4-hot:hover .hs { stroke: var(--gold); fill: rgba(212,169,78,0.10); }
    .ch4-hot.found .hs { stroke: var(--moss); stroke-dasharray: none; fill: rgba(120,180,120,0.06); }
    .ch4-hot text { font-family: var(--display); font-size: 12px; letter-spacing: .08em; }
    .ch4-hot .who { font-size: 11px; }
    .ch4-panel { display: flex; flex-direction: column; gap: 9px; animation: fadeUp .3s ease both; }
    .ch4-panel .para { margin: 0; font-size: 17px; }
    .ch4-panel .speech { padding-left: 14px; border-left: 2px solid var(--line); }
    .ch4-panel .speaker { display: block; font-family: var(--display); font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 2px; }
    .ch4-panel .whisper { color: var(--sea); font-style: italic; }
    .ch4-panel .omen { color: var(--violet); font-family: var(--hand); font-size: 19px; }
    .ch4-panel .letter { font-family: var(--hand); color: #d9cba8; background: rgba(255,240,200,0.05); padding: 8px 12px; border-radius: 4px; font-size: 19px; }
    .ch4-runes { background: rgba(255,240,200,0.05); border: 1px solid rgba(212,169,78,0.25); border-radius: 8px; padding: 8px 12px; }
    .ch4-runes svg { width: 100%; max-width: 640px; max-height: 11vh; display: block; margin: 0 auto; color: #e9dcb8; }
    .ch4-scrape { touch-action: none; user-select: none; cursor: crosshair; border-radius: 8px; overflow: hidden; }
    .ch4-scrape svg { width: 100%; max-height: 26vh; display: block; }
    .ch4-scrape .over { transition: opacity 1.6s ease; }
    .ch4-count { font-family: var(--display); font-size: 15px; letter-spacing: .1em; color: var(--gold); }
    @media (max-height: 760px) {
      .ch4-panel .para { font-size: 16px; }
      .ch4-panel { gap: 7px; }
      .ch4-runes { padding: 6px 10px; }
      .ch4-runes svg { max-height: 9vh; }
      .ch4-room svg { max-height: 30vh; }
      .ch4-scrape svg { max-height: 22vh; }
    }
    body[data-chapter="ch4"] .ring-pz .pz-note { line-height: 1.35; }
    body[data-chapter="ch4"] .ring-pz .wheel { width: min(40vh, 380px); height: min(40vh, 380px); }
    body[data-chapter="ch4"] .ring-pz .palette-grid { max-width: 380px; gap: 6px; }
    body[data-chapter="ch4"] .ring-pz .glyph.name-only { width: 84px; height: 44px; }
    @media (max-height: 760px) {
      body[data-chapter="ch4"] .ring-pz .wheel { width: min(27vh, 300px); height: min(27vh, 300px); }
      body[data-chapter="ch4"] .ring-pz .glyph.name-only { width: 76px; height: 38px; }
      body[data-chapter="ch4"] .ring-pz .glyph.name-only .gname { font-size: 12px; }
      body[data-chapter="ch4"] .ring-pz .pz-note { font-size: 15px; }
      body[data-chapter="ch4"] .ring-pz .wheel-wrap { gap: 12px; }
    }
  ` })); } catch (e) { /* headless shim without a document head */ }

  /* ---------- the older alphabet (24 letters; no Q, no X).
     KEEP BYTE-IDENTICAL with the copy in js/content/companion/ch4.js — the Hearth draws the journal
     from this table and only the Companion's primer decodes it. Edit one, edit both. ---------- */
  const OLD_RUNES = {
    A: 'M10,2 L10,26 M10,8 L18,14', B: 'M10,2 L10,26 M10,2 L18,10 L10,18', C: 'M16,4 L4,14 L16,24', D: 'M10,2 L10,26 M2,14 L18,14',
    E: 'M10,2 L10,26 M2,20 L10,14 L18,20', F: 'M10,2 L10,26 M10,6 L18,12 M10,14 L18,20', G: 'M6,2 L14,2 L14,26 L6,26', H: 'M6,2 L6,26 M14,2 L14,26 M6,10 L14,18',
    I: 'M10,2 L10,26', J: 'M10,2 L10,20 L4,26', K: 'M10,2 L10,26 M18,6 L10,14 L18,22', L: 'M10,2 L10,26 M10,26 L18,20',
    M: 'M4,2 L4,26 M16,2 L16,26 M4,2 L16,26', N: 'M4,2 L4,26 M16,2 L16,26 M4,26 L16,2', O: 'M10,4 L18,14 L10,24 L2,14 Z', P: 'M10,2 L10,26 M2,10 L10,2 L18,10',
    R: 'M10,2 L10,26 M2,20 L10,26 L18,20', S: 'M16,4 L6,10 L14,18 L4,24', T: 'M2,6 L18,6 M10,6 L10,26', U: 'M4,2 L10,26 L16,2',
    V: 'M4,4 L16,24 M16,4 L4,24', W: 'M2,4 L10,14 L18,4 M10,14 L10,26', Y: 'M10,2 L10,26 M2,20 L18,8', Z: 'M4,6 L16,6 M4,22 L16,22 M10,6 L10,22',
  };
  /* Render a line of text in the older alphabet. Letters not in the alphabet (Q, X) are drawn as a blank. */
  function runeLine(text, opts) {
    opts = opts || {};
    const cell = 24, h = 34, gap = 12; let x = 8; let s = '';
    for (const ch of String(text).toUpperCase()) {
      if (ch === ' ') { x += gap; continue; }
      if (ch === '.') { s += `<circle cx="${x + 5}" cy="26" r="2" fill="currentColor"/>`; x += 12; continue; }
      const d = OLD_RUNES[ch];
      if (d) s += `<path d="${d}" transform="translate(${x},3)" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      x += cell;
    }
    const w = x + 8;
    return `<svg viewBox="0 0 ${w} ${h + 6}" class="rune-line" style="height:${opts.height || 44}px;width:auto;max-width:100%;color:${opts.color || 'currentColor'}">${s}</svg>`;
  }
  const runeBlock = (lines, opts) => `<div class="ch4-runes">${lines.map(l => `<div style="text-align:center;margin:4px 0">${runeLine(l, opts)}</div>`).join('')}</div>`;

  /* ---------- helpers ---------- */
  const wren = (normal, scared) => (F().WREN_SCARED ? scared : normal);
  const secretsFound = (f) => ['JOURNAL', 'MEMORY', 'TAPESTRY', 'GREY'].filter(k => f[k]).length;
  const hasMarrowLetter = (f) => !f.ORIEL && !f.SORREL && !f.VANE_ACCEPT;
  /* Left exactly as it was, ORIEL and all: ch5.js:8 computes the identical expression and ch5 is not
     editable here. ORIEL is the ch1 promise rather than ORIEL_NOTE, which looks wrong — but the two
     files must agree, so it is a report item, not an edit. */
  const computeLaw0 = () => { const f = F(); Store.set('LAW0', !!(f.LETTER_READ || f.TAPESTRY || f.ORIEL)); };

  /* ---------- the false shelf ----------
     Six great books. The Hearth prints a place number and a stamp rubbed past reading, and never a shape:
     the shapes are the Reader's, and the shared Book renders every glyph beside its name on the
     Listener's Ladder page, so a shape on a Hearth surface hands the Reader's monopoly away (R10.10).

       as they stand   1 EMBER  2 WELL   3 ASH   4 KNOT  5 CROWN  6 VEIL
       hung the other way up (every book says the opposite, and keeps its place)
                       1 CROWN  2 THORN  3 COLD  4 VEIL  5 EMBER  6 KNOT

     Enumerated over all 6*5*4*3 = 360 ordered four-picks, filtered by the shelf's phrase (up two, up
     two, up one) under each reading a table can hold — exactly one match each:
       upside down, places kept   2,5,4,1  THORN EMBER VEIL CROWN  <- the answer
       as they stand              3,4,2,6  ASH KNOT WELL VEIL      <- decoy, disarmed by the Seer
       upside down, places mirrored 5,2,3,6                        <- decoy, disarmed by the Binder
     The catch gives ONE pull (a pull of fewer than four books is coached and refunded, so
     under-commitment never spends it). So the drop-a-role result is odds on a single commit, exactly
     as ch1's two asks are — re-run pullsFor() below and count:
       all four                   1 candidate  — certain
       drop the Seer              2            — a coin: as they stand, or turned
       drop the Binder            2            — a coin: places kept, or places mirrored
       the Reader and Listener alone
                                  3            — one in three
       drop the Reader            360          — no word for any place, no path
       drop the Listener          360          — no phrase, no path
     The three keyed replies below are receipts, not clues: a pull ends the puzzle, so they are only
     ever read once the board is already lost. That is where ch1 keeps REASONS.
     The phrase is deliberately not the Book's worked example (up one, up three, down two) and the four
     words are deliberately not the set that example names, nor the Founders' plinth set: both are
     printed permanently in the shared Book, and either would hand a Listener-less table the four books. */
  const SPINES = ['EMBER', 'WELL', 'ASH', 'KNOT', 'CROWN', 'VEIL'];  // Reader — place 1..6, as the stamps stand
  const PHRASE = [2, 2, 1];                                          // Listener — up two, up two, up one
  const MARKED_END = 'right';                                        // Seer — which end of the board is marked
  const KEEPS_ITS_PLACE = true;                                      // Binder — a turned board moves no book

  /* What place p says, under a reading. Marked on the left, the board reads as it stands. Marked on the
     right it is turned, so every book says the opposite word — and if the places are kept, place p is
     still place p, while a table without the Binder may mirror them instead. */
  const readPlace = (p, marked, keeps) => marked === 'right'
    ? G.PAIR[SPINES[(keeps ? p : 7 - p) - 1]]
    : SPINES[p - 1];
  /* Every ordered four-pick of six whose ladder steps are PHRASE, under one reading. The answer is not
     written down anywhere: it is this function of the four constants above, so dropping one and
     re-running is a real experiment rather than a claim. */
  function pullsFor(marked, keeps) {
    const step = (w) => (G.GLYPHS[w] && G.GLYPHS[w].step !== null && G.GLYPHS[w].step !== undefined) ? G.GLYPHS[w].step : null;
    const out = [];
    (function walk(seq) {
      if (seq.length === 4) {
        const w = seq.map(p => readPlace(p, marked, keeps));
        if (w.every(x => step(x) !== null) && PHRASE.every((s, i) => step(w[i + 1]) - step(w[i]) === s)) out.push(seq.map(String));
        return;
      }
      for (let p = 1; p <= 6; p++) if (seq.indexOf(p) < 0) walk(seq.concat(p));
    })([]);
    return out;
  }
  const SHELF_ANSWER = pullsFor(MARKED_END, KEEPS_ITS_PLACE)[0];   // 2,5,4,1 — THORN EMBER VEIL CROWN
  const SHELF_STAND = pullsFor('left', true)[0].join(',');         // 3,4,2,6 — read as the stamps stand
  const SHELF_MIRROR = pullsFor('right', false)[0].join(',');      // 5,2,3,6 — turned, but the places mirrored
  /* One worn spine, drawn six times: a book, two gilt bands, and a stamp rubbed past reading. */
  const spineSvg = '<g fill="none" stroke="currentColor" stroke-width="2" opacity=".65">'
    + '<rect x="-11" y="-17" width="22" height="34" rx="2"/><path d="M-8,-12 h16 M-8,12 h16"/>'
    + '<ellipse cx="0" cy="0" rx="6.5" ry="6.5" stroke-dasharray="2 3"/><path d="M-3.5,3 L-1,-3 M1,-2.5 L3.5,2.5" opacity=".7"/></g>';

  /* ---------- the oath ----------
     Four facts, one per role, as four droppable constants. The placement below is computed from them,
     so the check is a function of the partition rather than a written-down answer.

     The Listener hears ONE step, not the contour. A two-step contour on a seven-rung ladder is
     satisfied by three ordered triples whatever the steps are, and two of those three can always be
     closed, so a published contour made the Reader's word set decoration. One step plus the Reader's
     three words is still exactly one order, and one step alone is thirty-two boards.
     The Seer reports TWO cuts, as in the Prologue: which kind of cut starts a sigil is the Binder's
     rule and nothing else on any surface says it, so a Binder-less table faces a real fork instead of
     the one reading everybody guesses. */
  const OATH_WORDS = ['ASH', 'THORN', 'WELL'];   // Reader — the three cut round the ring, as a set
  const OATH_FIRST_STEP = -1;                    // Listener — the first word to the second, down one
  /* Deliberately NOT ch3's pair. js/content/ch3.js declares CUTS = { scratch: 4, notch: 2 }; with the
     same cuts here, a table that solved the Tower threshold already knew where this sigil begins and
     the Seer's seat was free. Scratch at 2 puts the words in 2, 3, 4 and the lock in 1 — a different
     board from ch3's words-in-4,1,2. */
  const OATH_SCRATCH = 2;                        // Seer — a long scratch beside slot 2
  const OATH_NOTCH = 4;                          // Seer — a small notch beside slot 4
  const OATH_LOCKS = ['KNOT', 'EMBER'];          // Binder — the only two the wax will take

  /* The order the Listener's one step puts the Reader's three words in — with these three words there
     is exactly one. Then the Binder's rule starts it at the scratch (never the notch) and runs it
     clockwise, which leaves exactly one slot for the lock. */
  const permute = (a) => a.length <= 1 ? [a] : a.reduce((acc, x, i) => acc.concat(permute(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p))), []);
  const OATH_ORDER = permute(OATH_WORDS).filter(p => G.GLYPHS[p[1]].step - G.GLYPHS[p[0]].step === OATH_FIRST_STEP);
  const OATH_SLOTS = (() => { const m = {}; OATH_ORDER[0].forEach((w, i) => { m[(OATH_SCRATCH - 1 + i) % 4 + 1] = w; }); return m; })();
  const OATH_WORD_SLOTS = [0, 1, 2].map(i => (OATH_SCRATCH - 1 + i) % 4 + 1);   // 2, 3, 4 — THORN, ASH, WELL
  const OATH_LOCK_SLOT = [1, 2, 3, 4].filter(i => !OATH_SLOTS[i])[0];           // 1
  /* The board a table that begins at the notch builds instead: the same three words, one slot on. */
  const OATH_NOTCH_SLOTS = (() => { const m = {}; OATH_ORDER[0].forEach((w, i) => { m[(OATH_NOTCH - 1 + i) % 4 + 1] = w; }); return m; })();
  /* The last hint rung, read off the board the check accepts — the pattern at js/content/ch7.js:490,
     so "Reveal the answer (last resort)" can never drift from the constants. It had drifted: the rung
     still dictated the pre-move board (words in 4, 1, 2, lock in 3) after OATH_SCRATCH moved from 4 to
     2, which is byte-for-byte OATH_NOTCH_SLOTS — the board this ring keys as its named wrong answer.
     The ring is maxTries: 1 and does not refund a full, lawful, wrong board, so a table that spent its
     last resort and typed what the fire told it lost the oath and wrote OATH 0 / OATH_KNOT false /
     REFUSED_OATH true into ch5, ch7 and ch8. tools/check-hints.js and tools/scripts/ch4-oath-check.js
     both put this string back through the shipped check() now, so it cannot ship wrong again. */
  const oathAnswerRung = () => OATH_WORD_SLOTS.map(i => `${OATH_SLOTS[i]} in slot ${i}`).join(', then ')
    + `. The lock goes in slot ${OATH_LOCK_SLOT}: ${OATH_LOCKS.join(' or ')}. Close it, and four hands.`;

  /* The receipt the one closing printed, kept for ch4_refused: a commit-once puzzle resolves the
     moment it fails, so the line under the ring is on screen for an instant. ch1 prints its reasons on
     the losing branch for the same reason. */
  let oathReceipt = '';

  const CORNER = { desk: 'The desk — the Reader', bell: 'The mantel — the Listener', tapestry: 'The tapestry — the Seer', chair: 'The chair — the Binder' };
  /* The journal, in one place: the Hearth draws these two lines in the older alphabet and the last
     hint rung quotes them, so the picture and the answer cannot separate. They had: the rung quoted
     the journal as FOURTEEN YEARS, a phrase that exists nowhere else in this game (a leftover from
     docs/DESIGN.md:168), while the desk requires SLEEPS and WINDOW — so a table that spent the whole
     ladder and typed what the fire gave it burnt one of three tries and, with the desk shut, never
     set LETTER_READ. The same rung offered 'the fourth of them' for the tapestry, which normalises to
     THEFOURTHOFTHEM and is in no corner's list either.
     The other three corners keep their accepted words as literals inside accept(), where
     tools/check-hints.js can extract and run them: it puts every phrase of the last rung through the
     shipped accept() of all four corners on every run of tools/check-content.js, which is the guard
     that was missing. A constant lifted out of accept() is invisible to that tool and would quietly
     drop the corner from its coverage — a shadow constant costs more here than it saves. */
  const JOURNAL_LINES = ['IT SLEEPS WITH THE WINDOW OPEN.', 'IT LAUGHS AT MY JOKES.'];
  /* The one line each corner leaves behind, printed once when found and again if the corner is reopened. */
  const FOUND = {
    desk: { text: 'It sleeps with the window open. It laughs at my jokes.', cls: 'letter' },
    bell: { text: '"Then the Crown will go through me. And through it."', cls: 'letter' },
    tapestry: { text: 'Four walk into the fire. No child anywhere in it.', cls: 'letter' },
    chair: { text: 'Grey. The colour of someone who has already said goodbye.', cls: 'letter' },
  };
  /* Every corner has a budget and a written consequence: spend it and the corner shuts for the night,
     the way ch1's vote is called once. The two corners that ask for a transcription get three tries,
     because a slip of the finger is not a wrong answer; the two that ask for a short claim get two.
     The ledger is a flag per corner and NOT a local of run(): it used to be `const shut = {}` inside
     the scene, so Menu -> Replay scene rebuilt it and handed all four budgets back while the Hearth
     went on printing 'guess at a corner and it shuts for the night'. Two guesses per re-entry, and a
     Seer-less or Binder-less table could buy a corner outright — and TAPESTRY feeds LAW0, which ch5's
     second gate reads. TRIED_<corner> counts tries actually spent, so a corner that has been half
     spent stays half spent across a re-entry rather than being all-or-nothing. */
  const TRIES = { desk: 3, bell: 3, tapestry: 2, chair: 2 };
  const spent = (id) => F()['TRIED_' + id] | 0;
  const budget = (id) => Math.max(0, TRIES[id] - spent(id));
  const SHUT = {
    desk: { text: 'The letters will not come. Wren shuts the journal.', cls: 'small' },
    bell: { text: 'Struck again, the bell gives nothing but bell.', cls: 'small' },
    tapestry: { text: 'Nobody scrapes on a guess. The paint stays.', cls: 'small' },
    chair: { text: 'The threads go out. What is in the chair stays hers.', cls: 'small' },
  };

  /* The study, as a clickable room (four corners, four Sightings). The drawing carries the partition
     that a rule card would otherwise have to say in words. */
  function roomSvg(f) {
    const hot = (id, x, y, w, h, label, who, color, found) => `<g class="ch4-hot${found ? ' found' : ''}" data-id="${id}"><rect class="hs" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text x="${x + 10}" y="${y + h - 22}" fill="${found ? '#8fbf8f' : '#e9e2d2'}">${label}${found ? ' ✓' : ''}</text><text class="who" x="${x + 10}" y="${y + h - 8}" fill="${color}">${who}</text></g>`;
    let s = `<svg viewBox="0 0 900 400">`;
    s += `<rect width="900" height="400" rx="10" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    s += `<path d="M0,300 L900,300" stroke="rgba(255,255,255,0.08)"/>`;
    // desk (left)
    s += `<rect x="60" y="240" width="220" height="14" rx="3" fill="#3a2a1c"/><rect x="72" y="254" width="14" height="60" fill="#2a1e14"/><rect x="254" y="254" width="14" height="60" fill="#2a1e14"/>`;
    s += `<path d="M120,238 L168,232 L172,238 L176,232 L224,238 Z" fill="#d9cba8"/><rect x="200" y="226" width="60" height="10" rx="2" fill="#3a2a30"/>`;
    s += `<circle cx="172" cy="236" r="60" fill="#ffd27a" opacity=".08"/>`;
    // tapestry (centre) — the school's overpaint until the Seer has said what is under it
    s += `<rect x="340" y="40" width="260" height="180" fill="#3a2a1a"/>`;
    s += f.TAPESTRY ? window.VigilArt.ch4.foundersWalking(348, 48, 244, 164) : window.VigilArt.ch4.orderPaint(348, 48, 244, 164);
    s += `<rect x="340" y="40" width="260" height="180" fill="none" stroke="#5a4020" stroke-width="4"/>`;
    // mantel and the bell (right, top)
    s += `<rect x="660" y="150" width="200" height="10" fill="#3a2a1a"/><rect x="690" y="160" width="140" height="130" rx="50" fill="#0a0708"/>`;
    s += `<g transform="translate(760,272)"><ellipse rx="26" ry="30" fill="#ff9a3c" opacity=".8"><animate attributeName="ry" values="30;36;28;34;30" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse rx="12" ry="18" fill="#fff0a0" opacity=".9"/></g>`;
    s += `<g transform="translate(820,148)"><path d="M-12,0 L-12,-8 Q-12,-26 0,-28 Q12,-26 12,-8 L12,0 Z" fill="#8a7040"/><circle cx="0" cy="3" r="3" fill="#c9a85a"/></g>`;
    // chair (right, bottom)
    s += `<g transform="translate(790,330)"><rect x="-44" y="-96" width="88" height="96" rx="12" fill="#1c1418"/><rect x="-54" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="38" y="-60" width="16" height="60" rx="6" fill="#241a1e"/><rect x="-36" y="-34" width="72" height="34" rx="6" fill="#2a1e24"/></g>`;
    // hotspots — the label carries whose corner it is, in that role's colour
    s += hot('desk', 40, 190, 260, 150, 'the desk', 'Reader', '#e0b04a', f.JOURNAL);
    s += hot('tapestry', 320, 20, 300, 250, 'the tapestry', 'Seer', '#a482e6', f.TAPESTRY);
    s += hot('bell', 650, 90, 230, 80, 'the bell on the mantel', 'Listener', '#4fb3bf', f.MEMORY);
    s += hot('chair', 680, 220, 200, 130, 'the chair by the fire', 'Binder', '#d96b4a', f.GREY);
    return s + `</svg>`;
  }

  const para = (into, paragraphs) => paragraphs.forEach(p => { const isObj = typeof p === 'object'; const el = UI.el('p', { class: 'para' + (isObj && p.cls ? ' ' + p.cls : '') + (isObj && p.speaker ? ' speech' : '') }); if (isObj && p.speaker) el.appendChild(UI.el('span', { class: 'speaker', text: p.speaker })); el.appendChild(UI.el('span', { html: UI.rich(isObj ? p.text : p) })); into.appendChild(el); });

  /* The tapestry scrape: an overpaint layer masked away by dragging (or by the Scrape button).
     It runs AFTER the Seer has answered, so nothing here can be read off the screen. */
  function scrape(into) {
    return new Promise((resolve) => {
      const Art = window.VigilArt.ch4;
      const box = UI.el('div', { class: 'ch4-scrape' });
      const id = 'ch4m' + Date.now();
      box.innerHTML = `<svg viewBox="0 0 600 300"><defs><mask id="${id}"><rect width="600" height="300" fill="#fff"/><g class="holes"></g></mask></defs>${Art.foundersWalking(0, 0, 600, 300)}<g class="over" mask="url(#${id})">${Art.orderPaint(0, 0, 600, 300)}</g></svg>`;
      into.appendChild(box);
      const row = UI.el('div', { class: 'pz-row' });
      const st = UI.el('div', { class: 'pz-status', text: 'Drag across the cloth, or press Scrape.' });
      const btn = UI.el('button', { class: 'btn', text: 'Scrape' });
      row.appendChild(btn); into.appendChild(row); into.appendChild(st);
      const svg = box.querySelector('svg'), holes = box.querySelector('.holes'), over = box.querySelector('.over');
      let n = 0, done = false, presses = 0, drawing = false;
      const hole = (x, y, r) => { holes.insertAdjacentHTML('beforeend', `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r || 26}" fill="#000"/>`); n++; check(); };
      const finish = () => { if (done) return; done = true; over.style.opacity = '0'; Audio.sfx('reveal'); st.className = 'pz-status good'; st.textContent = 'The paint gives.'; btn.disabled = true; setTimeout(resolve, 1100); };
      const check = () => { if (n >= 50) finish(); else if (n > 0) st.textContent = 'The paint is lifting. Keep going.'; };
      const pt = (e) => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 600, (e.clientY - r.top) / r.height * 300]; };
      svg.addEventListener('pointerdown', (e) => { drawing = true; const [x, y] = pt(e); hole(x, y); Audio.sfx('tick'); });
      svg.addEventListener('pointermove', (e) => { if (!drawing || done) return; const [x, y] = pt(e); hole(x, y); });
      const stop = () => { drawing = false; };
      svg.addEventListener('pointerup', stop); svg.addEventListener('pointerleave', stop); svg.addEventListener('pointercancel', stop);
      btn.addEventListener('click', () => { if (done) return; presses++; Audio.sfx('tick'); const y = 50 + ((presses - 1) % 3) * 90; for (let x = 20; x < 600; x += 40) hole(x + (presses % 2) * 20, y + Math.sin(x / 50) * 12, 40); if (presses >= 3) finish(); });
    });
  }

  Game.addChapter({
    id: 'ch4', label: 'Chapter IV', title: 'The Oath', start: 'ch4_start', code: 'EMBER',
    mood: 'tower', fx: 'dust', art: 'ch4_study', flame: 0.5,
    flow: {
      nodes: [
        { id: 'ch4_start', label: 'The Provost\'s study', col: 0, row: 2 },
        { id: 'ch4_attune', label: 'EMBER', col: 1, row: 2 },
        { id: 'ch4_shelf', label: 'The false shelf', col: 2, row: 2 },
        { id: 'ch4_s_journal', label: 'the journal — the Reader', col: 3, row: 0, secret: true, when: (s) => !!s.flags.JOURNAL },
        { id: 'ch4_s_memory', label: 'the bell — the Listener', col: 3, row: 1, secret: true, when: (s) => !!s.flags.MEMORY },
        { id: 'ch4_s_tapestry', label: 'under the paint — the Seer', col: 3, row: 3, secret: true, when: (s) => !!s.flags.TAPESTRY },
        { id: 'ch4_s_grey', label: 'the grey thread — the Binder', col: 3, row: 4, secret: true, when: (s) => !!s.flags.GREY },
        { id: 'ch4_s_rubbing', label: 'Mere\'s sheet, read', col: 4, row: 0, secret: true, kind: 'end', when: (s) => !!s.flags.LETTER_READ },
        { id: 'ch4_s_note', label: 'a note under the cushion', col: 4, row: 4, secret: true, kind: 'end', when: (s) => !!(s.flags.ORIEL_NOTE || s.flags.MARROW_LETTER) },
        { id: 'ch4_swear', label: 'The oath', col: 4, row: 2, kind: 'choice' },
        { id: 'ch4_oath_knot', label: 'sworn under KNOT', col: 5, row: 1, secret: true, when: (s) => s.flags.OATH === 1 },
        { id: 'ch4_oath_ember', label: 'sworn under EMBER', col: 5, row: 2, secret: true, when: (s) => s.flags.OATH === 2 },
        { id: 'ch4_refused', label: 'Refused to swear', col: 5, row: 3, secret: true },
        { id: 'ch5_start', label: 'The Long Stair', col: 6, row: 2, secret: true },
      ],
      edges: [['ch4_start', 'ch4_attune'], ['ch4_attune', 'ch4_shelf'], ['ch4_shelf', 'ch4_s_journal'], ['ch4_shelf', 'ch4_s_memory'], ['ch4_shelf', 'ch4_s_tapestry'], ['ch4_shelf', 'ch4_s_grey'],
        ['ch4_s_journal', 'ch4_s_rubbing'], ['ch4_s_grey', 'ch4_s_note'], ['ch4_s_journal', 'ch4_swear'], ['ch4_s_memory', 'ch4_swear'], ['ch4_s_tapestry', 'ch4_swear'], ['ch4_s_grey', 'ch4_swear'],
        ['ch4_swear', 'ch4_oath_knot'], ['ch4_swear', 'ch4_oath_ember'], ['ch4_swear', 'ch4_refused'],
        ['ch4_oath_knot', 'ch5_start'], ['ch4_oath_ember', 'ch5_start'], ['ch4_refused', 'ch5_start']],
    },
    scenes: {
      /* ---------- the study ---------- */
      ch4_start: {
        art: 'ch4_study', mood: 'court', fx: 'dust', sfx: 'open',
        title: 'The Provost\'s study',
        text: (s) => {
          const f = s.flags, out = [];
          out.push('A fire, a wall of books, and a primer left open on the desk.');
          /* ch3 sets DOOR and this is that choice's only payoff, so it stays — one clause per value,
             each restating the fact it depends on (R3.4). */
          if (f.DOOR === 'FIGHT') out.push('The ward you broke on the Tower door is still smoking.');
          else if (f.DOOR === 'BLUFF') out.push('You are still holding the lie you told the captain.');
          else if (f.DOOR === 'WORD') out.push('You used the Envoy\'s name at the door. It opened.');
          else if (f.DOOR === 'WRIT') out.push('You came up on a writ, and nobody read it closely.');
          /* ch3 hands Wren to the captain on this branch and sets DOOR='SURRENDERED'. The return is
             carried in the same sentence, so the branch closes its own hole instead of announcing it. */
          else if (f.DOOR === 'SURRENDERED') out.push('Wren is here. The Provost went down and took the child back.');
          else out.push('Nobody stopped you on the stair.');
          out.push(f.SURRENDERED
            ? { speaker: 'Provost Marrow', text: 'You gave the child to a man with a writ. Not now. Sit down.' }
            : 'Provost Marrow stands with her back to the fire, which is how she stands when she has decided something.');
          out.push(f.WREN_SCARED
            ? 'Wren sits on the window seat, knees up, and has not made a joke since the stair.'
            : { speaker: 'Wren', text: 'She has a *fire*. In her study. We had a lamp.' });
          return out;
        },
        next: 'ch4_marrow', button: 'What she wants',
      },
      ch4_marrow: {
        art: 'ch4_study', mood: 'court', fx: 'dust',
        text: (s) => {
          const f = s.flags, out = [];
          out.push({ speaker: 'Provost Marrow', text: 'Midnight is ninety minutes off. By then I will be under the school.' });
          out.push({ speaker: 'Provost Marrow', text: 'So I am asking you to swear an oath. Take Wren down into the Cold at midnight, whatever it costs.' });
          out.push({ speaker: 'Provost Marrow', text: 'The scroll is behind the third shelf. Read it. Argue. ' + (f.SURRENDERED ? 'After tonight I will decide what you are.' : 'I will be ten minutes.') });
          out.push('The door shuts.');
          return out;
        },
        next: 'ch4_attune', button: 'Look at the mantel',
      },
      ch4_attune: {
        type: 'code', art: 'ch4_study', mood: 'tower', fx: 'dust',
        text: [
          { text: 'Cut into the mantel above the fire: a word, and a mark beside it.', cls: 'whisper' },
          { text: 'Open the Companion. Take your seat. Type them both.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **passed by name**. Voice (reads aloud): **the Seer**.', sightSeconds: 90,
        next: 'ch4_shelf',
      },
      /* ---------- the false shelf ---------- */
      ch4_shelf: {
        type: 'puzzle', puzzle: 'wheel', art: 'ch4_shelf', mood: 'tower', fx: 'dust', puzzleId: 'ch4_shelf', par: [3, 5, 7], clearWidget: true,
        text: [
          'Six great books, each stamped with a shape rubbed past reading.',
          { text: 'Reader — what the six books say.', cls: 'whisper' },
          { text: 'Listener — the phrase the shelf hums.', cls: 'whisper' },
          { text: 'Seer — which end of the board is marked.', cls: 'whisper' },
          { text: 'Binder — what that does to a book.', cls: 'whisper' },
          { text: 'Say all four out loud. The catch gives one pull.', cls: 'whisper' },
        ],
        config: () => {
          /* One pull, as the plate says. A pull of fewer than four books is coached and refunded —
             cfg.maxTries is raised by one — so under-commitment never spends the commit (R10.19). */
          const cfg = {
            title: 'THE FALSE SHELF',
            note: 'Wren reads the plate screwed under the shelf: *Six books, six places. Pull **four**, in the order the phrase names them. The catch gives once: pull wrong and the board holds. The stamps are rubbed to nothing — the Reader\'s page has them clean.*',
            layout: 'row', maxLen: 4, maxTries: 1, submitText: 'Pull the books', emptyText: 'No books pulled yet.',
            slots: SPINES.map((_, i) => ({ id: String(i + 1), svg: spineSvg, label: String(i + 1) })),
            answer: SHELF_ANSWER,
            onWrong: (ids, tries) => {
              let m;
              if (ids.length < 4) {
                cfg.maxTries = tries + 1;   // refunded: nothing has been pulled
                m = 'Books out, and not four of them. Nothing has moved. Wren, from the window seat: "Has everybody actually said their bit?"';
              } else {
                const k = ids.join(',');
                if (k === SHELF_STAND) m = 'They slide back. You pulled them as they stand, and the board is not hanging as it was hung.';
                else if (k === SHELF_MIRROR) m = 'They slide back. Right words, wrong books. Turning the board moved no book at all.';
                else if (ids.slice().sort().join(',') === '1,2,4,5') m = 'The four are right and the order is not. The catch counted, and stopped.';
                else m = 'The books slide back into their places, and the catch does not give.';
              }
              UI.toast(m, 3200, 'bad'); return m;
            },
          };
          return cfg;
        },
        hints: [
          'Four answers, four people, nobody has two. What the books say, the Reader. What order, the Listener. Which end is marked, the Seer. What that does to a book, the Binder.',
          'Two of you hold what this board does to a book. One can see which way it is hanging. One knows what that costs a word. Neither of you can say it alone.',
          /* read off SHELF_ANSWER, which is pullsFor() of the four constants — the shelf's rung is one
             constant away from the oath's failure mode, and nothing was reading it back */
          () => `Pull books ${SHELF_ANSWER.slice(0, 3).join(', ')} and ${SHELF_ANSWER[3]}, in that order. Then press Pull.`,
        ],
        onSolve: (s, r) => { Store.note(r && r.failed ? 'The false shelf beat you. Wren kicked it in.' : 'You opened the false shelf in the Provost\'s study.'); },
        solvedText: (s, r) => (r && r.failed)
          ? ['One pull, and the catch will not give. Wren puts a boot through the board, and there is the cupboard.',
            { speaker: 'Wren', text: 'She will know it was me. She will know all night.' },
            { text: 'The board had been hung the other way up. Every book still stood in its own place. Only what it said had changed.', cls: 'small' }]
          : ['Four books out, and the third shelf swings open on a hinge nobody has oiled.',
            'Behind it, a cupboard, and a scroll sealed in red wax.',
            { text: 'THORN, EMBER, VEIL, CROWN. *A gate, kept hidden, by the first.*', cls: 'small' },
            wren({ speaker: 'Wren', text: 'Badly, and in plain sight. I told you.' }, 'Wren does not come to look.')],
        next: 'ch4_secrets', button: 'Search the study',
      },
      /* ---------- four discoveries, one to a Sighting ---------- */
      ch4_secrets: {
        type: 'custom', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'tower', fx: 'dust',
        text: [
          'Ten minutes, less now. Four Sightings, four corners of one room, and nobody can find another\'s.',
          { text: 'The keyboard goes to whoever\'s corner it is. Everyone else says what they see.', cls: 'whisper' },
          { text: 'Guess at a corner and it shuts for the night.', cls: 'whisper' },
        ],
        hints: [
          'Four corners, four Sightings. Words at the desk. A voice at the bell. Old paint on the tapestry. A thread on the chair.',
          'Nothing here is guessed. If a corner will not open, the page that opens it has not spoken.',
          () => `The journal: ${JOURNAL_LINES.join(' ')} The bell: the envoy, and through it. `
            + 'The tapestry: the fourth carries, the second reaches back. '
            + 'The chair: grey, and red — not tied yet. Then stop searching.',
        ],
        run: (box, api) => new Promise((resolve) => {
          const f = F();   // a live reference: Store.set mutates this object in place
          const wrap = UI.el('div', { class: 'pz ch4-study' });
          const count = UI.el('div', { class: 'ch4-count' });
          const room = UI.el('div', { class: 'ch4-room' });
          const panel = UI.el('div', { class: 'ch4-panel hidden' });
          const row = UI.el('div', { class: 'pz-row right' });
          const leave = UI.el('button', { class: 'btn ghost' });
          row.appendChild(leave);
          wrap.appendChild(count); wrap.appendChild(room); wrap.appendChild(panel); wrap.appendChild(row); box.appendChild(wrap);
          let finished = false;
          const lightBell = () => { try { const h = document.getElementById('hint'); if (h) h.classList.add('attention'); } catch (e) { /* headless */ } };
          /* answer.js lights the bell on the second wrong answer, which for a two-try corner is the
             same click that shuts it — the invitation to ask arriving after the thing it was for is
             over. This lights it when one try is left, whatever the budget, and records the spend. */
          const charge = (id, base) => (v, tries) => { const n = base + tries; Store.set('TRIED_' + id, n); if (n === TRIES[id] - 1) lightBell(); return null; };
          /* runCustom does not honour par, so the two hint marks are hand-rolled: 6 minutes and 8. */
          const parTimers = [setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire stirs. It has something to whisper, if you ask.', 3200); Audio.sfx('chime'); }, 6 * 60000),
            setTimeout(() => { if (!api.alive() || finished) return; document.getElementById('hint').classList.add('attention'); UI.toast('The fire dims a little. Ask it.', 3200); }, 8 * 60000)];
          const renderRoom = () => {
            const n = secretsFound(f);
            count.textContent = `The study keeps four secrets: ${n} found`;
            room.innerHTML = roomSvg(f);
            room.querySelectorAll('.ch4-hot').forEach(el => el.addEventListener('click', () => open(el.dataset.id)));
            leave.textContent = n >= 4 ? 'Marrow returns' : `Stop searching — ${n} of four found`;
            leave.className = 'btn ' + (n >= 4 ? 'primary' : 'ghost');
            room.classList.remove('hidden'); panel.classList.add('hidden'); row.classList.remove('hidden'); UI.clear(panel);
            api.flashArt('ch4_study', { scraped: !!f.TAPESTRY });
          };
          leave.addEventListener('click', () => { finished = true; parTimers.forEach(clearTimeout); computeLaw0(); Store.note(`The study kept four secrets; you found ${secretsFound(f)}.`); Audio.sfx('step'); resolve('ch4_swear'); });
          const back = () => { const b = UI.el('div', { class: 'pz-row right' }); b.appendChild(UI.el('button', { class: 'btn small', text: 'Back to the room', onclick: () => { Audio.sfx('click'); renderRoom(); } })); panel.appendChild(b); try { b.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* headless */ } };
          const head = (t) => panel.appendChild(UI.el('div', { class: 'pz-title', text: t }));
          /* A found corner replaces its own question: the prompt, the runes and the answer box all go,
             so the discovery is the only thing in the box and the room can read it without scrolling. */
          const reveal = (t, paragraphs) => { UI.clear(panel); head(t); para(panel, paragraphs); back(); };
          async function open(id) {
            room.classList.add('hidden'); panel.classList.remove('hidden'); row.classList.add('hidden'); UI.clear(panel); Audio.sfx('click');

            /* --- the desk: the older alphabet. Only the Reader's primer decodes it. --- */
            if (id === 'desk') {
              head(CORNER.desk);
              if (f.JOURNAL) { para(panel, [FOUND.desk]); back(); return; }
              if (!budget('desk')) { para(panel, [SHUT.desk]); back(); return; }
              para(panel, ['Her journal, under the primer, open at a page in the old letters.']);
              panel.appendChild(UI.el('div', { html: runeBlock(JOURNAL_LINES, { height: (typeof window !== 'undefined' && window.innerHeight < 760) ? 32 : 40 }) }));
              para(panel, [{ text: 'Reader — read it out, letter by letter. Both lines.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'the first line', placeholder: 'six words', len: 40, plain: true }, { label: 'the second line', placeholder: 'five words', len: 40, plain: true }],
                accept: (v) => /SLEEPS/.test(v[0]) && /WINDOW/.test(v[0]) && /LAUGHS/.test(v[1]) && /JOKES/.test(v[1]),
                onWrong: charge('desk', spent('desk')),
                wrongText: 'That is not what it says. Reader — letter by letter, and both lines.', submitText: 'Read it', successText: 'Read.', maxTries: budget('desk'),
              }, api);
              if (!api.alive()) return;
              if (r && r.failed) { Store.note('The journal went back under the primer, unread.'); reveal(CORNER.desk, [SHUT.desk]); return; }
              Store.set('JOURNAL', true); Store.note('The Reader read the Provost\'s journal.');
              const out = [FOUND.desk];
              out.push(wren({ speaker: 'Wren', text: 'She writes *it*. And then she writes that.' }, { speaker: 'Wren', text: 'She wrote *it*.' }));
              if (f.LETTER && !f.LETTER_READ) { Store.set('LETTER_READ', true); Store.note('Mere\'s sheet was read at last.'); out.push({ text: 'The grey smear you took below comes clear. It will be in your **Book** from here on.', cls: 'whisper' }); }
              reveal(CORNER.desk, out); Audio.sfx('reveal'); return;
            }

            /* --- the mantel: what the bell kept. The words exist on the Listener's page and nowhere else. --- */
            if (id === 'bell') {
              head(CORNER.bell);
              if (f.MEMORY) { para(panel, [FOUND.bell]); back(); return; }
              if (!budget('bell')) { para(panel, [SHUT.bell]); back(); return; }
              para(panel, ['A small bell, older than the mantel. Struck, it says back the last thing said near it — to an Ear only.',
                { text: 'Listener — who else was in this room, and how she answered.', cls: 'whisper' }]);
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'the other voice', placeholder: 'a name', len: 16 }, { label: 'her last two words', placeholder: 'two words', len: 20 }],
                /* One accept function, not the per-field array this corner used to carry. answer.js
                   marks only the failing input (js/puzzles/answer.js:41), so on the one screen the
                   whole room is watching the Hearth shook exactly the field that was wrong — and the
                   name is nearly free, since Lord Vane is spoken on the Hearth in ch1. That turned a
                   blended three-try search over a name and a phrase into two independent ones. */
                accept: (v) => ['VANE', 'LORDVANE', 'ENVOY', 'THEENVOY'].indexOf(v[0]) >= 0 && v[1] === 'THROUGHIT',
                onWrong: charge('bell', spent('bell')),
                wrongText: 'The bell hums and says it again. Listener — word for word.', submitText: 'Say it back', successText: 'Said.', maxTries: budget('bell'),
              }, api);
              if (!api.alive()) return;
              if (r && r.failed) { Store.note('The bell was struck once too often and went quiet.'); reveal(CORNER.bell, [SHUT.bell]); return; }
              Store.set('MEMORY', true); Store.note('The Listener heard what the bell on the mantel kept.');
              reveal(CORNER.bell, [FOUND.bell, 'Far below, the Hearth gutters, and steadies.',
                wren({ speaker: 'Wren', text: 'She never says things like that to my face. Only to Envoys.' }, { speaker: 'Wren', text: 'Through *it*. She said through it.' })]);
              Audio.sfx('chime'); return;
            }

            /* --- the tapestry: the Seer answers first, and only then does the paint come off. --- */
            if (id === 'tapestry') {
              head(CORNER.tapestry);
              if (f.TAPESTRY) { para(panel, [FOUND.tapestry]); back(); return; }
              if (!budget('tapestry')) { para(panel, [SHUT.tapestry]); back(); return; }
              para(panel, ['The picture this school hangs in every hall: a fire, and one small figure walking into it. Painted over older paint.',
                { text: 'Seer — which of them carries, and which reaches back.', cls: 'whisper' }]);
              /* Under the paint: four walk in, the FOURTH carries the cold glyph, and the SECOND has
                 turned and reached back for something that is not there. Both are on the Seer's plate
                 (js/content/companion/ch4.js) and on no other surface, and the reveal art draws both
                 (js/art/scenes-ch4.js foundersWalking).
                 Neither field is the count. The Hearth announced four-as-one in Chapter II
                 (ch2.js:289) and no-child is the question the chapter is built on, so the count was
                 the room's first guess and the Seer's seat was one ordinal wide against two tries.
                 Two ordinals is sixteen. One accept function, not a per-field list, so a half-right
                 guess confirms nothing and the corner cannot be walked one field at a time. */
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'which of them carries', placeholder: 'first, second…', len: 12 }, { label: 'and which reaches back', placeholder: 'first, second…', len: 12 }],
                accept: (v) => ['FOURTH', 'THEFOURTH', 'FOURTHONE', 'LAST', 'THELAST', 'LASTONE'].indexOf(v[0]) >= 0 && ['SECOND', 'THESECOND', 'SECONDONE'].indexOf(v[1]) >= 0,
                onWrong: charge('tapestry', spent('tapestry')),
                wrongText: 'The cloth keeps its paint. Seer — both figures, together.', submitText: 'Say what is under it', successText: 'Said.', maxTries: budget('tapestry'),
              }, api);
              if (!api.alive()) return;
              if (r && r.failed) { Store.note('Nobody would scrape the tapestry on a guess.'); reveal(CORNER.tapestry, [SHUT.tapestry]); return; }
              UI.clear(panel); head(CORNER.tapestry);
              await scrape(panel); if (!api.alive()) return;
              Store.set('TAPESTRY', true); Store.note('The Seer scraped the tapestry and found four.');
              api.flashArt('ch4_study', { scraped: true });
              reveal(CORNER.tapestry, [FOUND.tapestry,
                { text: '"I have seen what is under the paint," the Envoy said. So he had.', cls: 'omen' },
                wren({ speaker: 'Wren', text: 'Four of them. Where is the one born of four? Where am I?' }, { speaker: 'Wren', text: 'There is no child in it.' })]);
              return;
            }

            /* --- the chair: thread colour, which lives on the Binder's page and in the Binder's Book. --- */
            if (id === 'chair') {
              head(CORNER.chair);
              if (f.GREY) { para(panel, [FOUND.chair]); back(); return; }
              if (!budget('chair')) { para(panel, [SHUT.chair]); back(); return; }
              para(panel, ['Her chair by the fire, still warm. Nothing in it.',
                { text: 'Binder — her thread to Wren, and hers to you four.', cls: 'whisper' }]);
              /* The second field was a yes/no — NOTYET, NOT, NOTTIED, UNTIED, NO and nothing else —
                 so two tries covered it twice over and the corner was really one field wide
                 (ADVERSARIAL 12, a window wider than the budget). It now wants the second thread's
                 colour AND its state, which is the same line of the Binder's page and is still
                 Thread-Sight and nothing else. One accept function, so the widget lights both fields
                 together and a half-right guess confirms nothing. */
              const r = await window.VigilAnswer.build(panel, {
                fields: [{ label: 'to Wren, the colour', placeholder: 'a colour', len: 12 }, { label: 'to you four, colour and state', placeholder: 'a colour, and…', len: 22 }],
                accept: (v) => ['GREY', 'GRAY'].indexOf(v[0]) >= 0 && /^RED/.test(v[1]) && /NOT|UNTIED/.test(v[1]),
                onWrong: charge('chair', spent('chair')),
                wrongText: 'Nothing in the chair answers. Binder — hers to Wren, then hers to you.', submitText: 'Say what you see', successText: 'Seen.', maxTries: budget('chair'),
              }, api);
              if (!api.alive()) return;
              if (r && r.failed) { Store.note('The threads in the study went dark before the Binder could name them.'); reveal(CORNER.chair, [SHUT.chair]); return; }
              Store.set('GREY', true); Store.note('The Binder saw the grey thread.');
              const out = [FOUND.chair];
              if (f.ORIEL) {
                Store.set('ORIEL_NOTE', true); Store.note('Oriel\'s note was found in the Provost\'s chair.');
                out.push('Under the cushion, a note from Master Oriel, who asked you to tell her everything.');
                out.push({ text: '"I scraped that paint myself, as a girl, with a bread-knife. They painted it back inside the week. — Oriel"', cls: 'letter' });
              } else if (hasMarrowLetter(f)) {
                Store.set('MARROW_LETTER', true); Store.note('Marrow\'s unsent letter was found in her chair.');
                out.push('Under the cushion, a letter she never sent.');
                out.push({ text: '"To the nine. Tonight I go down to the thing I have never named to you. — Marrow"', cls: 'letter' });
              } else out.push('Under the cushion, nothing but the shape of her.');
              out.push(wren({ speaker: 'Wren', text: 'Grey is a colour. I have seen grey. Grey is fine.' }, 'Wren does not ask what colour.'));
              reveal(CORNER.chair, out); Audio.sfx('chime'); return;
            }
          }
          renderRoom();
        }),
      },
      /* ---------- the oath ---------- */
      ch4_swear: {
        type: 'choice', art: 'ch4_scroll', mood: 'court', fx: 'embers', choice: 'OATH_SWEAR',
        enter: () => computeLaw0(),
        text: (s) => {
          const f = s.flags, out = [];
          out.push('The stair creaks. Provost Marrow is back early, and does not say why.');
          if (f.TAPESTRY) out.push('She sees the tapestry, and stops in the doorway.');
          out.push({ speaker: 'Provost Marrow', text: (f.TAPESTRY ? 'So. The Seer. ' : '') + 'The scroll, then. Read it, all four of you. Then swear, or do not.' });
          out.push('Unrolled: the words she said before she went out, and under them a ring of four slots.');
          out.push(f.WREN_SCARED ? 'Wren says nothing at all.' : { speaker: 'Wren', text: 'For the record, I do not get a vote on the whatever-it-costs part.' });
          out.push({ text: 'No bell counts this one. Argue as long as you need.', cls: 'whisper' });
          return out;
        },
        prompt: 'Swear the oath?',
        options: [
          { id: 'swear', text: 'Swear it. Place the words.', sub: 'The Binder chooses the lock.', next: 'ch4_oath', set: { REFUSED_OATH: false } },
          { id: 'refuse', text: 'Refuse to swear.', sub: 'She will not ask twice.', cls: 'dark', next: 'ch4_refused', set: { OATH: 0, OATH_KNOT: false, REFUSED_OATH: true }, note: 'You refused the oath.' },
        ],
      },
      ch4_oath: {
        type: 'puzzle', puzzle: 'ring', art: 'ch4_scroll', mood: 'court', fx: 'embers', puzzleId: 'ch4_oath', par: [4, 6, 8],
        text: [
          'Four slots in the ring, and three words cut above it, worn nearly smooth.',
          { text: 'Reader — which three words.', cls: 'whisper' },
          { text: 'Listener — how far the first two words step.', cls: 'whisper' },
          { text: 'Seer — every cut in the ring, and where.', cls: 'whisper' },
          { text: 'Binder — where a sigil begins, and what may lock it.', cls: 'whisper' },
          { text: 'Say all four out loud. The wax takes one closing.', cls: 'whisper' },
        ],
        config: () => {
          const mine = {};   // slots filled so far (re-placing a slot does not move the keyboard on)
          /* Enumerated over all 3393 legal boards (four slots, each empty or one of eight words, no
             repeats), against this very check, by node tools/scripts/ch4-oath-check.js, which loads
             glyphs.js and this file and calls cfg.check. It prints the accepted set rather than
             asserting a written-down one, so no sentence here can drift from it: today
                 3393 legal boards, 2 accepted
                      KNOT/THORN/ASH/WELL          <- slot 1/2/3/4
                      EMBER/THORN/ASH/WELL
             Both are right; the lock is the story fork, not a right answer. Of the rest, 1432 hold
             COLD and 1121 are not full: those are refused and refunded below, so the ring costs a try
             only for a full, lawful, wrong board — 838 of them, 840 paid boards in all.
             ONE closing, as the plate says (a refused board is refunded, so under-commitment and COLD
             never spend it). Miss it and the oath goes unsworn: the written ch4_refused branch, which
             the flow map and ch5 already read.
             No branch confirms a partial answer. The no-lock line fires for ANY three glyphs and an
             empty slot, so it cannot be used to test a rotation.
             Paid boards each seat is left facing, and the odds on the one closing. Re-derived by
             enumeration against this same check (a table's hypothesis is an ordered word triple, a
             start slot, a direction and a lock; a seat is dropped by widening the axis it holds):
               all four                      2 boards, both winners     certain
               drop the Reader              32 boards, 2 winners        0.063
               drop the Listener            12 boards, 2 winners        0.167
               drop the Seer                 8 boards, 2 winners        0.250  (four rotations)
               drop the Binder               8 boards, 2 winners        0.250  (two cuts x four locks)
             THE BINDER'S ROW HAS BEEN 8 / 0.250, THEN 4 / 0.500, THEN 8 / 0.250 AGAIN, and the
             history is worth keeping because none of it was arithmetic.
               (a) 8 / 0.250 was what this file always claimed: two cuts to start at, four lawful
                   locks. Correct on its face.
               (b) The whole-game sweep proved it false. The Prologue does not merely SAY the
                   Binder's rule, it WORKS it on the shared screen (companion/ch0.js:118 and :132
                   against the lamp board at ch0.js:180), and the Binder is required to say it aloud
                   to solve the lamp. Scratch-not-notch was table knowledge from the tutorial on, so
                   a Binder-less table was not choosing between two cuts at all -- only a lock -- and
                   the row was really 4 / 0.500. A coin, on a maxTries: 1 puzzle whose losing branch
                   writes OATH, OATH_KNOT and REFUSED_OATH for ch5, ch7 and ch8. This file recorded
                   that honestly and said it could not be repaired from inside ch4, which was true.
               (c) It was repaired from OUTSIDE ch4, and not by touching the Prologue. ch3's Tower
                   ward had the same defect far worse (its Binder-less field was ONE board), and the
                   fix was to make that ward a Vigil ward that begins at the NOTCH. So the room now
                   learns, one chapter before this one, that WHICH CUT STARTS A RING DEPENDS ON THE
                   RING. The Binder's page here -- "a sigil begins at the scratch, and runs the way a
                   clock counts, the same rule as the lamp" (companion/ch4.js:251) -- stopped being a
                   restatement of public knowledge and became a fact again, and the row is 8 / 0.250.
             Enumerated against the shipped cfg.check in scratchpad/prologue/oath.js, which reports
             both states side by side: 4 boards / 0.500 if the room knows a ring starts at the
             scratch, 8 / 0.250 if it only knows a ring starts at A CUT. COLD boards are not in the
             field because check() refunds them.
             The lesson, and it is now docs/ADVERSARIAL.md 11's corollary: a tutorial spends the rule
             it teaches, and the chapter that gets the seat back is the one that introduces an
             EXCEPTION -- not the tutorial, which must go on teaching.
             Hint 2 is free, so it is part of the answer space: it says only that the cuts differ and
             that one of you keeps the rule, and none of the rows above moves when it is read. */
          const cfg = {
            title: 'THE OATH',
            note: 'The Provost, on her way out: *Three words go in the ring, then a lock. The lock is the **last** thing placed, and it is not written on the scroll — your Binder knows what the wax will take. You may close it **once**. Wax does not soften twice.*',
            slots: 4, glyphs: glyphPalette(), showArrow: false, maxTries: 1,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to swear it',
            onPlace: (g, slot) => { const before = Object.keys(mine).length; mine[slot] = g; const n = Object.keys(mine).length; if (n === before) return; const who = ['Listener', 'Seer', 'Binder'][n - 1]; if (who) UI.toast(`${who} — the keyboard.`, 1600); },
            /* A refused board (COLD, or not full) is refunded — cfg.maxTries goes up by one — so an
               impossible placement and an unfinished ring cost nothing (R10.16, R10.19). */
            check: (m) => {
              const filled = [1, 2, 3, 4].filter(i => m[i]);
              if (filled.some(i => m[i] === 'COLD')) { cfg.maxTries++; return 'The wax will not take COLD. Nothing is spent; the ring is still open.'; }
              if (filled.length < 4) {
                cfg.maxTries++;
                return filled.length === 3 ? 'Three words and no lock. An oath without a lock is a wish.' : 'Four slots, and the ring is not full. It is not closed, and it has not cost you.';
              }
              const three = OATH_WORD_SLOTS.every(i => m[i] === OATH_SLOTS[i]);
              if (three && OATH_LOCKS.indexOf(m[OATH_LOCK_SLOT]) >= 0) return true;
              return false;
            },
            /* The one closing is spent, so these are receipts: each names the clause that stopped the
               board, in the order the rule card states them (R10.13, R10.15). */
            onWrong: (m) => {
              const lock = m[OATH_LOCK_SLOT];
              const set = [1, 2, 3, 4].map(i => m[i]).filter(w => OATH_WORDS.indexOf(w) >= 0).length;
              oathReceipt = OATH_WORD_SLOTS.every(i => m[i] === OATH_SLOTS[i])
                ? `Three words stood, and the wax would not take ${lock}. It takes what binds, and nothing else.`
                : [1, 2, 3, 4].every(i => m[i] === OATH_NOTCH_SLOTS[i] || !OATH_NOTCH_SLOTS[i])
                  ? 'You began at the notch. A notch says somebody made this ring. It does not say where to start.'
                  : set === 3
                    ? 'The three words are the ones cut there. In that arrangement they are a different oath, and the ring knows it.'
                    : `Only ${['none', 'one', 'two'][set]} of the three words cut on this scroll went in. The ring closed on an oath nobody wrote.`;
              return oathReceipt;
            },
            wrongText: 'Frost creeps over the ring. It forgets what you put in it.',
          };
          return cfg;
        },
        hints: [
          'Four answers, four people, nobody has two. The three words, the Reader. The step from the first to the second, the Listener. Every cut, the Seer. Where one starts and what may close it, the Binder.',
          'A ring has no first, and there is more than one cut in this one. Which kind of cut starts a sigil is the Binder\'s rule.',
          oathAnswerRung,
        ],
        onSolve: (s, r) => {
          if (r && r.failed) {
            /* The one closing, and no oath. The world state is the same as a refusal — nobody swore —
               so it writes the same flags, and ch5 sends them down Mere's door either way. */
            Store.set('OATH', 0); Store.set('OATH_KNOT', false); Store.set('REFUSED_OATH', true);
            Store.note('The wax went cold. The ring never closed.');
            return;
          }
          const lock = r && r.map ? r.map[OATH_LOCK_SLOT] : 'KNOT';   // derived, not the literal 3: the lock moves with the scratch
          Store.set('OATH', lock === 'KNOT' ? 1 : 2); Store.set('OATH_KNOT', lock === 'KNOT'); Store.set('REFUSED_OATH', false);
          Store.note(lock === 'KNOT' ? 'You swore the oath under KNOT — it cannot be unbound.' : 'You swore the oath under EMBER — it can be reconsidered.');
        },
        next: (s, r) => (r && r.failed) ? 'ch4_refused' : 'ch4_sworn', autoNext: true,
      },
      ch4_sworn: {
        art: 'ch4_scroll', mood: 'court', fx: 'embers', sfx: 'seal',
        text: (s) => {
          const f = s.flags, knot = f.OATH === 1, out = [];
          out.push(knot
            ? 'The ring closes under KNOT, and the wax of the seal softens, as if warmed.'
            : 'The ring closes under EMBER. The wax does not change.');
          out.push({ speaker: 'Provost Marrow', text: 'Bound. Good. Then I need not carry it alone.' });
          out.push({ speaker: 'Provost Marrow', text: 'When the bells ring tonight, hold them. I will do the rest.' });
          if (knot) out.push('She puts a hand on the nearest shoulder. Nobody has seen her do that before.');
          out.push(wren(knot
            ? { speaker: 'Wren', text: 'That is a KNOT. It is the one that does not come undone.' }
            : { speaker: 'Wren', text: 'That one is EMBER. *What remains.* Binder, you are shaking.' },
          'Wren gets up and goes to stand beside her.'));
          return out;
        },
        next: 'ch4_flow', button: 'The night moves on',
      },
      /* Two ways to arrive unsworn: refusing, and a closing that would not take. The room is
         in the same place either way, so the scene is one scene and only the first beat differs. */
      ch4_refused: {
        art: 'ch4_scroll', mood: 'sorrow', fx: 'ash', sfx: 'whoosh',
        text: () => {
          const tried = Store.chose('OATH_SWEAR', 'swear');
          return [
            tried ? 'The ring shuts on the wrong oath. The wax stays grey.'
              : 'The scroll stays unrolled, and unsworn. Provost Marrow does not raise her voice. She never has.',
            ...(tried && oathReceipt ? [{ text: oathReceipt, cls: 'small' }] : []),
            { speaker: 'Provost Marrow', text: 'Then you are no part of this. Go to your beds. I will do it alone, with the child.' },
            tried ? { speaker: 'Wren', text: 'It nearly took. I saw it nearly take.' }
              : wren({ speaker: 'Wren', text: 'They said *no*, Mum. Nobody says no to you. I want to remember it.' }, { speaker: 'Wren', text: '…they said no.' }),
            'She takes Wren by the hand, and the door shuts. It does not lock.',
            { text: 'You will be at the stair before she is.', cls: 'whisper' },
          ];
        },
        next: 'ch4_flow', button: 'The night moves on',
      },
      ch4_flow: {
        type: 'flow', art: 'ch4_study', artParams: (s) => ({ scraped: !!s.flags.TAPESTRY }), mood: 'hearth', fx: 'dust',
        enter: () => computeLaw0(),
        text: ['The bell. Midnight comes up the stair a step at a time.', { text: 'The paths you walked, and the ones you did not.', cls: 'small' }],
        flowTitle: 'Chapter IV — the paths you walked',
        stats: (s) => {
          const f = s.flags;
          const n = ['none', 'one', 'two', 'three', 'all four'][secretsFound(f)];
          const oath = f.OATH === 1 ? 'You swore under KNOT, which does not come undone.'
            : f.OATH === 2 ? 'You swore under EMBER, which can be reconsidered.'
              : Store.chose('OATH_SWEAR', 'swear') ? 'The ring would not close, and the oath went unsworn.'
                : 'You refused to swear.';
          return `The study kept four secrets and you found ${n}. ${oath}`;
        },
        next: 'ch5_start', button: 'The Long Stair',
      },
    },
  });
})();
