/* Finale — One Born of Four (CROWN) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, S = window.VigilShared, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const ROLES = L.roles.map(r => r.id);

  const ch7css = Object.assign(document.createElement('style'), { textContent: `
    body[data-chapter="ch7"] .ring-pz .wheel { width: min(40vh, 360px); height: min(40vh, 360px); }
    @media (max-height: 820px) { body[data-chapter="ch7"] .ring-pz .wheel { width: min(32vh, 290px); height: min(32vh, 290px); } }
    /* Narrower than a full laptop, the palette wraps under the wheel: shrink both so the commit button
       stays above the fold. */
    @media (max-width: 1260px) {
      body[data-chapter="ch7"] .ring-pz .wheel { width: min(26vh, 190px); height: min(26vh, 190px); }
      body[data-chapter="ch7"] .glyph.name-only { width: 74px; height: 38px; }
      body[data-chapter="ch7"] .glyph.name-only .gname { font-size: 12px; }
    }
    body[data-chapter="ch7"] .pz-note { font-family: var(--serif); font-size: 15px; line-height: 1.45; letter-spacing: 0; text-transform: none; white-space: normal; color: var(--ink); }
    .bind-lane.ch7-muted .bind-orb { visibility: hidden; }
    body[data-chapter="ch7"] .bind-lane.ch7-muted.on { background: none; }
    .bind-lane.ch7-muted::before { content: 'cracked — on the count'; position: absolute; left: 0; right: 0; bottom: 44px; text-align: center; font-family: var(--display); font-size: 10px; letter-spacing: .1em; color: var(--sea); }
    .ch7-count { display: grid; grid-template-columns: 1fr; gap: 6px; }
    .ch7-count .cd-big { font-family: var(--display); font-size: 40px; color: var(--ember); text-align: center; letter-spacing: .12em; }
    /* .fourhands animates in with a translateY, which makes the panel briefly taller than it ends up.
       The Finale shows the box for the whole scene, so it appears at its final height. */
    body[data-chapter="ch7"] .fourhands { margin-top: 0; padding: 6px 8px; animation: none; }
    body[data-chapter="ch7"] .pads { margin-top: 4px; gap: 8px; }
    body[data-chapter="ch7"] .pad { padding: 2px 6px; gap: 0; }
    body[data-chapter="ch7"] .pad .pad-key { font-size: 20px; }
    body[data-chapter="ch7"] .pad .pad-name { font-size: 10px; }
    body[data-chapter="ch7"] .fourhands .pz-title { margin-bottom: 2px; }
    /* ring.js puts a "Close it without the ritual" button inside the four-hands box, and it is the only
       other way out of the ritual. The Finale must not hide it outright: a stuck key at the last beat of
       the game would be a dead end with no hint and no navigation. So it is held back for forty-five
       seconds — long enough that nobody clicks past the beat, short enough that nobody is trapped. */
    body[data-chapter="ch7"] .fourhands > .btn.small.ghost {
      opacity: 0; pointer-events: none; animation: ch7-hatch 0s linear 45s forwards;
    }
    @keyframes ch7-hatch { to { opacity: .5; pointer-events: auto; } }
    .ch7-vow { font-family: var(--hand); font-size: 14px; line-height: 1.2; color: var(--ink); text-align: center; padding: 0; margin: 0; }
  ` });
  if (document.head && document.head.appendChild) document.head.appendChild(ch7css);

  /* ---------- helpers ---------- */
  const castFlags = (s) => s.flags.CAST_FLAGS_CROWN || { WALK_UNLOCKED: !!s.flags.WALK_UNLOCKED, VANE_ALLY: !!s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED | 0, OATH_KNOT: !!(s.flags.OATH_KNOT || s.flags.OATH === 1) };
  const finaleValues = (s) => L.finaleValues(castFlags(s));
  const oathKnot = (s) => !!(s.flags.OATH_KNOT || s.flags.OATH === 1);
  const walkOn = (s) => !!castFlags(s).WALK_UNLOCKED;
  const walkers = (s) => ROLES.filter(r => s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'); // a kept bargain is a dead key: a stayer
  const stayers = (s) => ROLES.filter(r => !(s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'));
  const nickOf = (roleId) => L.roleById(roleId).nick;
  const kept = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'kept');
  const accepted = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'accepted');
  const broken = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'broken');
  const group = (s) => s.flags.GROUP_NAME || 'the Four';
  const artP = (s) => ({ ally: !!castFlags(s).VANE_ALLY });
  /* One line carries five choices made in earlier chapters. They pay off here as story, not as puzzle
     difficulty: the soldiers' shields the Hearth and the phones used to disagree about are gone. */
  const arrival = (s) => s.flags.ORIEL ? 'Master Oriel came down behind you and says nothing, loudly.'
    : (s.flags.SOLDIERS || s.flags.STAIR === 'RUN') ? 'His soldiers hold the stair you came down.'
    : (!s.flags.SORREL && !s.flags.VOTE_LOST) ? 'Two Masters whose price you would not pay watch from the edge.'
    : 'The stair behind you is empty. Nobody followed you down.';

  /* ---------- the Great Sigil ----------
     Two walls, four carvings each. A wall reads two ways: from one end, or from the other, where the line
     reverses and every word turns into its opposite. Together the two walls are one phrase of eight words.
     Four facts, one to a phone, and no phone holds another's:
       WEST / EAST      what each wall says, read from either end             Reader
       OPENING_CLIMB    the phrase's second word is one rung above the first  Listener
       SCRATCH / NOTCH  the two cuts in the rim of the floor                  Seer
       (the Laws)       a sigil begins in the scratch and runs sunwise,       Binder
                        and names every word once
     BASE and ROT are COMPUTED from those four facts, not typed in, and so is the hint ladder's last rung.
     Enumerated by tools/scripts/ch7-sigil-check.js against the live js/content/glyphs.js and the
     shipped check() -- every figure below is that script's output, not an assertion:
       8 phrases (2 wall orders x 2 readings x 2 readings) x 8 start sockets x 2 directions = 128 rings.
       Law 8 leaves 4 of the 8 phrases standing; the Listener's opening climb leaves exactly 1.
       ALL FOUR PAGES  -> exactly 1 ring, with the oath and without it.
       drop the Reader   -> no word can be named: the palette is name-only and the walls are legible only
                            on the Reader's page. (The shape-to-word lexicon itself is NOT private —
                            companion/book.js prints all eight shapes beside their names on the Listener's
                            Book page — so the art is load-bearing: js/art/scenes-ch7.js must draw the
                            wear on those walls and never the cut.)
       drop the Listener -> 4 rings (2 under the oath: the rotation destroys the wall order).
       drop the Seer     -> 8 rings (8 under the oath).
       drop the Binder   -> 8 rings (8 under the oath): 2 of the 8 phrases open on the Listener's
                            climb, x 2 cuts x 2 directions, deduplicated. (The sweep's own probe
                            reported 12 here for the old walls; re-measured against the shipped
                            check(), the old walls give 8 by this model too, so the figure the chapter
                            recorded was right and the number to distrust was the model. Both are now
                            the same model, and it is in ch7-sigil-check.js where it can be re-run.)
       No pair of pages does better than 16. allowRepeat is load-bearing: without it ring.js refuses a
       duplicate glyph for free and the Binder's Law 8 costs the table nothing.
     WHY THESE WALLS.  The first four words used to be THORN KNOT VEIL EMBER -- which is, character for
     character, Chapter II's vault-door answer (js/content/ch2.js, `ORDER`), printed on the Hearth at
     ch2_door's solvedText, and printed AGAIN as the worked example on the Listener's permanent Book page
     (js/content/companion/book.js:87, there since the Prologue). Half the Great Sigil was on a shared
     page five chapters before the Finale, and this file's own companion header claimed a Reader-less
     table could not name a single word. ch2 and book.js are forbidden ground, so the walls moved.
     AND THE WHOLE OF IT WAS WORSE THAN HALF. The old phrase's seven written words, in order, were
     THORN KNOT VEIL EMBER ASH WELL CROWN -- which is the chapter attunement words of ch1 through ch7
     in chapter order (js/content/lore.js:18-24). Every player types all seven into the Hearth over
     the evening, one a chapter, and js/content/ch8.js:433 ENDS THE GAME by saying so: "The words that
     woke your phones tonight -- THORN, KNOT, VEIL, EMBER, ASH, WELL, CROWN -- were the Great Sigil in
     wall order." It was written as a payoff and it was a live oracle: the Finale's phrase, in its
     whole order, was public from Chapter I, and the drop-the-Reader claim above was false. Making the
     codes match the new phrase would only re-arm it, so the codes stay and the phrase leaves them.
     HAND-OFF, and it is not optional: ch8.js:433 now names a sequence that is not this Sigil, and
     js/content/ch8.js is not a file this pass may edit. It has to become a line that does not claim
     an order -- the seven words ARE still exactly the seven glyphs that can be written, and COLD is
     still the eighth and never a chapter code, so the payoff survives the correction.
     tools/scripts/ch7-sigil-check.js reads the codeword sequence out of lore.js and refuses any wall
     that shares a run of three with it, so this cannot come back by accident.
     The new pair is chosen by enumerating all 8P4 x 8P4 wall readings (scratchpad/ch7/walls2.js) and
     keeping only those that satisfy all six of:
       1. exactly 4 phrases pass Law 8 -- the drop-the-Listener field the chapter records;
       2. exactly 1 of those 4 opens on the Listener's climb;
       3. the phrase ends on the cold word, so the Hymn's last beat is the rest ch7_sigil's
          solvedText describes and Wren's empty socket is the eighth;
       4. neither wall's word SET is ch2's four (book.js names that set on the Reader's own page);
       5. no wall reading, either end, shares a run of three with any ordered sequence this game
          prints where more than one seat can see it -- ch2's door and niche, book.js:78 and :87 and
          the three chains its contour admits, ch3's threshold, ch4's shelf and oath, ch5's two
          gates, ch6's stone, and the Ladder itself, each also in its TURNED reading, since the Book
          teaches how to turn a line;
       6. the phrase itself passes 5 as well, across the join between the two walls.
     924 wall pairs survive; this is one of them, kept for what it says:
       KNOT EMBER THORN WELL ASH VEIL CROWN COLD
       four-as-one, to close; a gate, a going-down; the Hearth, behind; the one, and the hollow.
     tools/scripts/ch7-sigil-check.js re-runs that whole collision scan over the shipped chapters, so
     the next hand to move a wall is told what it has collided with.
     THE CUTS are deliberately OFF the defaults, and off every other ring in the game: ch3 is
     scratch 4 / notch 2, ch4 is 2 / 4, ch5's gates are 3 / 1 and 5 / 2. The scratch was on 4 here too,
     which is ch3's and ch5 gate 1's, the coordinate ch4's oath was rewritten to escape -- a table that
     had read three floors tonight tried 4 first and was right. It is 6 now. Socket 1 is the top socket
     and the first number, so "start at 1 and count up" is what a table with no Seer and no Binder tries
     first; the notch sits there and the scratch does not, exactly as the Prologue's lamp puts its decoy
     notch on socket 1, and ch5 gate 1 its own. */
  const WEST = [{ shape: 'Hook', inv: false }, { shape: 'Crown', inv: true }, { shape: 'Spike', inv: false }, { shape: 'Spike', inv: true }];  // Reader — KNOT EMBER THORN WELL, from its left end
  const EAST = [{ shape: 'Flame', inv: false }, { shape: 'Hook', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Flame', inv: true }];  // Reader — ASH VEIL CROWN COLD, from its left end
  const OPENING_CLIMB = 1;                                  // Listener
  const SCRATCH = 6, NOTCH = 1;                             // Seer
  const ONCE_EACH = true, SWORN = 'CROWN';                  // Binder

  /* The answer, and the near misses, computed from those four facts. */
  const readEnd = (wall, end) => G.readLine(wall, end);      // 'left' or 'right'
  const climb = (a, b) => { const x = G.GLYPHS[a].step, y = G.GLYPHS[b].step; return (x == null || y == null) ? null : y - x; };
  const PHRASES = [];
  ['left', 'right'].forEach(we => ['left', 'right'].forEach(ee => {
    const w = readEnd(WEST, we), e = readEnd(EAST, ee);
    PHRASES.push(w.concat(e)); PHRASES.push(e.concat(w));
  }));
  /* Law 8 leaves four of the eight phrases standing (two pairings, either wall first).
     The Listener's opening climb leaves exactly one. */
  const LEGAL = PHRASES.filter(p => !ONCE_EACH || new Set(p).size === 8);
  const PHRASE = LEGAL.filter(p => climb(p[0], p[1]) === OPENING_CLIMB)[0];
  /* Lay a phrase into the ring from a cut, one socket at a time. The cold word is never placed. */
  const lay = (phrase, start, dir) => { const m = new Array(8).fill(null); for (let i = 0; i < 8; i++) { const g = phrase[i]; m[((start - 1 + dir * i) % 8 + 8) % 8] = g === 'COLD' ? null : g; } return m; };
  const turnTo = (ring, word, socket) => { for (let k = 0; k < 8; k++) { const r = ring.map((_, i) => ring[((i - k) % 8 + 8) % 8]); if (r[socket - 1] === word) return r; } return ring; };
  const BASE       = lay(PHRASE, SCRATCH, 1);                                          // by the Laws, unsworn
  const ROT        = turnTo(BASE, SWORN, SCRATCH);                                     // and then turned, under the oath
  const ringOf = (map) => [1, 2, 3, 4, 5, 6, 7, 8].map(i => map[i] || null);
  const shape = (ring) => ring.map(x => x === 'COLD' ? null : x); // an empty socket and the cold word read alike
  const same = (a, b) => a.every((x, i) => x === b[i]);

  /* ---------- what a cold ring costs ----------
     The widest single-drop field is eight rings (the table above) and the night is 900 seconds. A flat
     30 s let a table lay all eight and still have 660 s in hand, so the only budget in the Finale was
     four times wider than the field it was there to price -- and after midnight, when the clock is
     stopped, penalty() returns early and a wrong ring cost nothing at all.
     The nth cold ring now costs 30 + 30n seconds. Enumerated in
     scratchpad/ch7/price.js over the shipped clock:
         nth cold ring     1    2    3    4    5    6    7
         costs (s)        60   90  120  150  180  210  240
         spent by then    60  150  270  420  600  810 1050
     so the night runs out on the seventh cold ring even if the table reads the floor instantly, and
     midnight now arrives INSIDE the eight-ring field instead of well beyond it. A table that asks its
     four pages pays none of it. An under-committed ring is still free (R10.19), and so is putting the
     cold word down, which is a rule-card violation refusing itself (R10.16).
     SIGIL_COLD is in the save, and it is what the charge is counted on, because the clock is not:
     Game.clock keeps endAt in a module-local closure and writes flags.MIDNIGHT_LEFT from render()
     without ever calling Store.save() (js/core/engine.js:69), so every penalty applied between the
     store's 15-second heartbeats was refunded by a reload. Store.inc() saves, so charging the clock
     and then incrementing SIGIL_COLD is what puts the charge on disk. After midnight the clock is
     gone and SIGIL_COLD is the whole of the cost -- a recorded one; see the OPEN 2 note at the foot
     of this file. */
  const sigilPrice = (n) => 30 + 30 * n;                    // n counts this cold ring
  const chargeRing = (s) => {
    const n = (s.flags.SIGIL_COLD | 0) + 1;
    Game.clock.penalty(sigilPrice(n));                      // moves endAt and rewrites flags.MIDNIGHT_LEFT
    Store.inc('SIGIL_COLD');                                // ... and this is the save that keeps it
    return n;
  };

  const nextBargain = (s, after) => { const idx = ROLES.findIndex((r, i) => i > after && s.flags['BARGAIN_' + r] === 'accepted'); return idx < 0 ? 'ch7_bargains_done' : 'ch7_bargain_' + ROLES[idx]; };
  /* Midnight is a beat and a hint unlock, never a guillotine: it stops for good, opens the whole ladder,
     and undoes nothing. ensureClock will not start it again once it has run out. */
  const onZero = () => {
    const s = Store.state;
    Store.inc('COLD_HEARTH_ATTEMPTS');
    /* Open the whole ladder -- but BILL it. hintsTotal is only ever incremented by the hint button
       (js/core/engine.js:327), so three rungs given away here used to arrive free, and the Epilogue's
       closing line ("You asked the fire for N hints", ch8.js:157) under-reported the night by three.
       ch7_binding is not in this list any more: it carries no ladder, so marking it 3 granted nothing
       and would now bill for nothing. */
    const rungs = (Game.scenes.ch7_sigil.hints || []).length;
    const given = Math.max(0, rungs - (s.hintsUsed.ch7_sigil | 0));
    if (given > 0) { s.hintsUsed.ch7_sigil = rungs; Store.inc('hintsTotal', given); }
    s.flags.MIDNIGHT_LEFT = 0; Store.save();
    const bell = document.getElementById('hint'); if (bell) bell.classList.add('attention');
    Store.note('Midnight came before the Binding. You finished in the dark.');
    window.Game.go('ch7_cold');
  };
  /* HOW LONG THE NIGHT IS -- and the one place ch6 is allowed to charge ch7.
     docs/ADVERSARIAL.md OPEN 2 is settled: the last two chapters price a wrong answer as a RECORD
     rather than a loss, and the one cross-chapter bite the record is allowed is this. A table that
     ran out of readings at the prophecy stone (ch6 sets STONE_TOLD; Marrow reads it for them) comes
     to the Cold with less night. The size of the cut is enumerated, not chosen -- scratchpad/open2/
     night.js, reading the shipped sigilPrice:
         night   cold rings the night pays for
          900s                6                 810s spent, 90s over
          840s                6                 810s spent, 30s over
          780s                5                 600s spent
     so 120 seconds is the smallest cut that actually takes a ring off the night, and it takes exactly
     one: six wrong rings become five, against a widest single-drop field of eight. It is not a dead
     end and it cannot become one -- midnight is still a beat that opens the whole ladder, ch7_cold
     still hands the answer over, and a table that asks its four pages pays none of this. */
  const NIGHT = 900, STONE_TOLD_COST = 120;
  const nightFor = (s) => NIGHT - (s.flags.STONE_TOLD ? STONE_TOLD_COST : 0);
  const ensureClock = (s) => {
    const C = window.Game.clock;
    if (C.running() || s.flags.BINDING_LANDED || (s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0) return;
    if (s.flags.MIDNIGHT_LEFT > 0 && s.flags.MIDNIGHT_STARTED) C.resume(onZero);
    /* Store.save() on the start, not just on the tick: the clock's own writer never saves, so without
       this a reload inside the first fifteen seconds began the night a second time. */
    else { s.flags.MIDNIGHT_STARTED = true; C.start(nightFor(s), onZero); Store.save(); }
  };
  const computeEnding = (s) => {
    if (s.flags.DECISION === 'VANE' || kept(s).length >= 2) return 4;
    if (s.flags.DECISION === 'WALK') return 2;
    if (s.flags.DECISION === 'REFUSE') return 3;
    const w = walkers(s).length;
    if (w >= 4 && kept(s).length === 0 && s.flags.BINDING_LANDED) return 0;
    if (w >= 2) return 1;
    return 3;
  };
  /* The Hymn IS the phrase, and it is played FROM the phrase. It used to be the seven names written
     out by hand -- THORN, KNOT, VEIL, EMBER, ASH, WELL, CROWN -- which was the Sigil before the
     walls moved, and which is also the attunement word of ch1..ch7 in chapter order. When the
     phrase moved, this line did not: the ring's own reward music went on playing an answer the
     ring no longer takes, one scene after solvedText says 'the Hymn plays itself through the
     floor'. ADVERSARIAL 10, in the audio. COLD is the rest and MIDI.COLD is null, so it holds its
     beat and sounds nothing -- which is what makes the last beat of the Hymn a silence, exactly as
     the constraint at the head of this file says it should be. */
  const playHymn = () => PHRASE.forEach((n, i) => { const midi = G.MIDI[n]; if (midi != null) setTimeout(() => Audio.note(midi, 1.1, 0.16), i * 420); });
  const clockText = (sec) => Math.floor((sec | 0) / 60) + ':' + String((sec | 0) % 60).padStart(2, '0');

  Game.addChapter({
    id: 'ch7', label: 'Finale', title: 'One Born of Four', start: 'ch7_start', code: 'CROWN',
    mood: 'dread', fx: 'ash', art: 'ch7_edge', artParams: artP, flame: 0.06,
    flow: {
      nodes: [
        { id: 'ch7_start', label: 'The chamber', col: 0, row: 2 },
        { id: 'ch7_wall', label: 'The wall shown', col: 1, row: 0, kind: 'choice', secret: true, when: (s) => !!s.flags.VANE_STOOD_DOWN },
        { id: 'ch7_decision', label: 'The Decision', col: 2, row: 2, kind: 'choice' },
        { id: 'ch7_argue1', label: 'The Provost bars it', col: 2, row: 4, kind: 'choice', secret: true },
        { id: 'ch7_dec_vane', label: 'Wren given up', col: 3, row: 0, kind: 'end', secret: true },
        { id: 'ch7_tokens', label: 'Four sealed words', col: 3, row: 2 },
        /* One node per player's sealed word, lit when that player's word is in -- ch7_tokens'
           onTokens() writes WALK_<role>. These four are not scene ids, so without a when() they
           could never light: all four sat at '? ? ?' for the whole chart, on every path. Derived
           from ROLES rather than written out four times, so a role rename cannot leave a literal
           behind. Rows skip 2, which is ch7_bargains_done. */
        ...ROLES.map((r, i) => ({ id: 'ch7_p' + i, label: nickOf(r), col: 4, row: [0, 1, 3, 4][i], kind: 'end', secret: true, when: (s) => !!s.flags['WALK_' + r] })),
        { id: 'ch7_bargains_done', label: 'The bargains', col: 4, row: 2, kind: 'choice', secret: true, when: (s) => accepted(s).length + kept(s).length + broken(s).length > 0 },
        { id: 'ch7_sigil', label: 'The Great Sigil', col: 5, row: 2 },
        { id: 'ch7_cold', label: 'Midnight passed', col: 5, row: 4, secret: true, when: (s) => (s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0 },
        { id: 'ch7_binding', label: 'The Binding', col: 6, row: 2 },
        { id: 'ch7_wren_code', label: 'COLD, written', col: 7, row: 1, secret: true },
        { id: 'ch7_e0', label: 'The Fourfold Walk', col: 8, row: 0, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 0 },
        { id: 'ch7_e1', label: 'The Half-Walk', col: 8, row: 1, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 1 },
        { id: 'ch7_e2', label: 'The Sealing', col: 8, row: 2, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 2 },
        { id: 'ch7_e3', label: 'The Keeper\'s Walk', col: 8, row: 3, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 3 },
        { id: 'ch7_e4', label: 'The Envoy\'s Bargain', col: 8, row: 4, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 4 },
      ],
      edges: [
        ['ch7_start', 'ch7_wall'], ['ch7_wall', 'ch7_decision'], ['ch7_start', 'ch7_decision'],
        ['ch7_decision', 'ch7_argue1'], ['ch7_argue1', 'ch7_tokens'],
        ['ch7_decision', 'ch7_dec_vane'], ['ch7_dec_vane', 'ch7_e4'], ['ch7_decision', 'ch7_tokens'],
        ['ch7_tokens', 'ch7_p0'], ['ch7_tokens', 'ch7_p1'], ['ch7_tokens', 'ch7_p2'], ['ch7_tokens', 'ch7_p3'], ['ch7_tokens', 'ch7_bargains_done'], ['ch7_bargains_done', 'ch7_sigil'], ['ch7_bargains_done', 'ch7_e4'],
        ['ch7_sigil', 'ch7_binding'], ['ch7_sigil', 'ch7_cold'], ['ch7_cold', 'ch7_sigil'],
        ['ch7_binding', 'ch7_wren_code'], ['ch7_wren_code', 'ch7_e0'], ['ch7_binding', 'ch7_e1'], ['ch7_binding', 'ch7_e2'], ['ch7_binding', 'ch7_e3'],
      ],
    },
    scenes: {
      /* ---------- the chamber's edge ---------- */
      ch7_start: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, sfx: 'step',
        title: 'The bell-chamber',
        text: (s) => [
          'Far above, the Hearth is a spark. The floor is a lid, and under it the Cold glows.',
          'On the wall, four carved figures walk into a flame. Nobody is looking at them.',
          'Boots on the old road. Lord Vane stops at the edge, with the Crown\'s soldiers behind him.',
          arrival(s),
        ],
        next: 'ch7_vane', button: 'The Envoy speaks',
      },
      /* The Envoy's offer, and the one chance to disarm him. Settled BEFORE ch7_attune freezes
         CAST_FLAGS_CROWN, so the phones never ask about a bargain that no longer exists. */
      ch7_vane: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, choice: 'FINALE_WALL',
        text: (s) => [
          { speaker: 'Lord Vane', text: s.flags.VANE_ACCEPT
            ? 'You gave me your word in the Hall. Bring the boy up the road and he lives.'
            : 'One child, and a fire that will be out within the hour. Bring him up the road.' },
          { speaker: 'Wren', text: `Don't look at him. Look at me. ${group(s)} — this is the *in there* I meant.` },
        ],
        prompt: 'The Envoy waits.',
        options: [
          { id: 'wall', text: 'Show him what is under the paint.', next: 'ch7_wall' },
          { id: 'nothing', text: 'Say nothing. Read the floor.', next: 'ch7_attune' },
        ],
      },
      ch7_wall: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06, sfx: 'reveal',
        /* The Envoy withdraws here, so the bargain is settled here too. ch7_tokens.onTokens is the only
           other writer of BARGAIN_<role>, and on this path L.finaleValues() never asks the question —
           so without this line the flag would go unwritten and the Epilogue would say the four were
           never asked. They were asked, in the Hall, and the offer has just been taken off the table. */
        enter: (s) => {
          s.flags.VANE_ALLY = true; s.flags.VANE_STOOD_DOWN = true;
          ROLES.forEach(r => { s.flags['BARGAIN_' + r] = 'refused'; });
          Store.save();
        },
        text: (s) => [
          s.flags.TAPESTRY
            ? 'The Seer says what is under the paint in the study, and the Hearth turns it round.'
            : 'The Seer takes four hundred years of soot off the wall.',
          'Four figures walking in. No child. The fourth writes a fire upside down.',
          { speaker: 'Lord Vane', text: 'Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners.' },
          { speaker: 'Lord Vane', text: 'My offer is withdrawn. I will not be the thing you have to be brave about.' },
        ],
        next: 'ch7_attune', button: 'The word on the rim',
      },
      ch7_attune: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06,
        enter: (s) => {
          s.flags.WALK_UNLOCKED = !!s.flags.WALK_UNLOCKED; s.flags.VANE_ALLY = !!s.flags.VANE_ALLY;
          s.flags.BELLS_CRACKED = Math.max(0, Math.min(3, s.flags.BELLS_CRACKED | 0)); s.flags.OATH_KNOT = oathKnot(s);
          s.flags.CAST_FLAGS_CROWN = { WALK_UNLOCKED: s.flags.WALK_UNLOCKED, VANE_ALLY: s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED, OATH_KNOT: s.flags.OATH_KNOT };
          Store.save();
        },
        text: [
          'A word is cut into the rim of the floor, worn almost away.',
          { text: 'Open the Companion. Take your seat. Type the word on the rim.', cls: 'whisper' },
          { text: 'Read your page. Say nothing.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Seer**. Voice (reads aloud): **the Binder**.', sightSeconds: 90,
        next: 'ch7_decision',
      },

      /* ---------- Stage 1: the Decision ---------- */
      ch7_decision: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_DECISION',
        text: (s) => {
          const out = [{ speaker: 'Provost Marrow', text: 'The ring has been ready for fourteen years. Decide.' }];
          out.push(s.flags.WALK_UNLOCKED
            ? { text: 'Four figures on the wall. Four hands on the stone.', cls: 'whisper' }
            : { text: 'One walks in, and the Cold closes behind. That is the reading you have.', cls: 'whisper' });
          return out;
        },
        prompt: 'No clock on this. Talk.',
        options: [
          { id: 'fourfold', text: 'Four of us go in together.', cls: 'bright', if: (s) => !!s.flags.WALK_UNLOCKED, next: (s) => oathKnot(s) ? 'ch7_argue1' : 'ch7_dec_fourfold', set: { DECISION: 'FOURFOLD' }, note: 'You chose the Fourfold Walk.' },
          { id: 'walk', text: 'Let Wren walk.', next: 'ch7_dec_walk', set: { DECISION: 'WALK' }, note: 'You let Wren walk.' },
          { id: 'refuse', text: 'Nobody walks.', next: 'ch7_dec_refuse', set: { DECISION: 'REFUSE' }, note: 'You refused to send anyone.' },
          { id: 'vane', text: 'Give Wren to the Envoy.', cls: 'dark', if: (s) => !s.flags.VANE_ALLY, next: 'ch7_dec_vane', set: { DECISION: 'VANE' }, note: 'You gave Wren to the Envoy.' },
        ],
      },
      /* The Provost bars the Walk when the oath was sworn under KNOT. She asks for one thing, so she gets
         one round: three options ever visible, every one yields, every one restates its own fact. */
      ch7_argue1: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_ARGUE1',
        text: [
          'Provost Marrow steps between you, doing what you asked.',
          { speaker: 'Provost Marrow', text: 'You swore under KNOT, and it cannot be unbound. You swore to see Wren into the Cold.' },
        ],
        prompt: 'Name one thing you saw.',
        options: [
          { id: 'stone', text: 'The stone has a mark at its foot. Read from there it says four.', next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'The foot of the stone. One Seer low enough to look.' }] },
          { id: 'tapestry', text: 'Under the paint in your study: four walking in, no child.', if: (s) => !!s.flags.TAPESTRY, next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'I scraped it myself, as a girl.' }] },
          { id: 'letter', text: 'A struck Law says the cold word is written by four hands.', if: (s) => !s.flags.TAPESTRY || !!(s.flags.LETTER_READ || s.flags.LETTER), next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'They could not afford four Masters, so they made it grammar.' }] },
          { id: 'feel', text: 'Because it is Wren, and we are not doing it.', cls: 'dark', next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'That is not a reading.' }, 'She steps aside anyway.'] },
        ],
      },
      ch7_dec_walk: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: (s) => [
          { speaker: 'Wren', text: 'Right. Good. That is what the stone says, and I have had years to get used to it.' },
          { speaker: 'Wren', text: `Don't do faces. ${group(s)} don't do faces. I'll stand in the bit that isn't written.` },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_refuse: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: [
          { speaker: 'Provost Marrow', text: 'Nobody. Then the fire goes out and the Envoy gets what he came for.' },
          { speaker: 'Provost Marrow', text: 'Build the sigil anyway. Hold the Cold while I think.' },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_fourfold: {
        art: 'ch7_edge', artParams: artP, mood: 'wonder', fx: 'ash', flame: 0.06, sfx: 'chime',
        text: (s) => {
          const out = [];
          if (oathKnot(s)) out.push({ speaker: 'Provost Marrow', text: 'The oath was sworn to me, and it stands. The ring will have to be turned. Ask your Binder.' });
          out.push('You say it the way the Founders wrote it. Four, as one, go through.');
          out.push({ speaker: 'Wren', text: `The *deal* was that I go in. Fine. Fine! ${group(s)}. Four idiots and a hollow.` });
          return out;
        },
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_vane: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.03, sfx: 'boom',
        enter: (s) => { s.flags.ENDING = 4; Store.save(); },
        text: [
          'The Envoy does not gloat. He holds his hand out as if helping someone over a stream.',
          { speaker: 'Wren', text: 'Oh. No, it is fine. He promised. People keep saying he keeps promises.' },
          'Wren goes without looking back. The spark goes out.',
        ],
        next: 'ch7_ending', button: 'What the Crown does',
      },

      /* ---------- private tokens ---------- */
      ch7_tokens_intro: {
        type: 'custom', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: (s) => {
          const v = finaleValues(s);
          const out = [{ text: 'Every phone, now. Open SPEAK. Nobody here sees the question or the answer.', cls: 'whisper' }];
          if (v && v.length === 4) out.push({ text: 'Two questions, one sealed word.', cls: 'whisper' });
          else if (v && v[0] === 'WALK') out.push({ text: 'One question. Whether you walk.', cls: 'whisper' });
          else out.push({ text: 'One question, from the Envoy, to you alone.', cls: 'whisper' });
          return out;
        },
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch7-count' });
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'TWO MINUTES' }));
          const big = UI.el('div', { class: 'cd-big', text: '2:00' }); wrap.appendChild(big);
          box.appendChild(wrap);
          const ctl = UI.countdown(wrap, 120, (sec) => { big.textContent = clockText(sec); big.classList.toggle('urgent', sec <= 15); });
          let done = false;
          const finish = () => { if (done || !api.alive()) return; done = true; ctl.cancel(); resolve('ch7_tokens'); };
          ctl.promise.then((r) => { if (r === 'timeout') { Audio.sfx('chime'); UI.toast('Time. The fire asks now.', 2400); finish(); } });
          api.button('Every phone is sealed', finish, 'primary');
        }),
      },
      ch7_tokens: {
        type: 'token', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: ['Four sealed words, in seat order. The Hearth answers only "received".'],
        prompt: 'Read your word into the slot with your name.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i, s) => { const v = finaleValues(s); return v ? S.decode(L.channel('finale', ROLES[i]), tok, v) : null; },
        badText: 'The fire does not know that word. Read it again.',
        stuckText: 'Four letters, from your own SPEAK page.',
        onTokens: (values, s) => {
          values.forEach((v, i) => {
            const r = ROLES[i]; const parts = String(v).split('_');
            const walk = parts.find(p => p === 'WALK' || p === 'STAY'), barg = parts.find(p => p === 'ACCEPT' || p === 'REFUSE');
            if (walk) s.flags['WALK_' + r] = walk;
            if (barg) s.flags['BARGAIN_' + r] = (s.flags.VANE_ALLY || barg === 'REFUSE') ? 'refused' : 'accepted';
          });
          Store.save();
        },
        next: (s) => nextBargain(s, -1),
      },

      /* ---------- Stage 2: bargains in the room ----------
         Silence is a refusal, and the timeout writes 'refused' — not 'broken' and not 'kept'. It used to
         be a kept bargain, so fifteen seconds of hesitation bound a player's key to the Envoy; then it
         was a broken one, and the Epilogue credited a player who never clicked with breaking the Envoy's
         word to his face. The timeout has its own destination now, so the promise, the flag and the
         Epilogue all say the same thing. */
      ...Object.fromEntries(ROLES.map((r, i) => ['ch7_bargain_' + r, {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, choice: 'FINALE_BARGAIN_' + r, timer: 15, timerText: '*Fifteen heartbeats. Silence is a refusal.*', sfx: 'heart',
        timeout: { id: 'silence', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'refused' }, note: `${nickOf(r)} said nothing, and the Envoy heard it.`,
          after: [{ speaker: 'Lord Vane', text: 'Nothing. Well. Nothing is an answer.' }] },
        text: [
          `The fire says one name out loud: ${nickOf(r)}.`,
          { speaker: 'Lord Vane', text: 'I keep my promises. Do you keep yours?' },
        ],
        prompt: `${nickOf(r)} — in front of everyone.`,
        options: [
          { id: 'break', text: 'Break it.', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'broken' }, note: `${nickOf(r)} almost took the Envoy's word.`,
            after: [{ speaker: 'Wren', text: `${nickOf(r)}. It's alright. I'd have taken it too.` }] },
          { id: 'keep', text: 'Keep it.', cls: 'dark', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'kept' }, note: `${nickOf(r)} kept the Envoy's bargain.`,
            after: [{ speaker: 'Lord Vane', text: 'Thank you.' }] },
        ],
      }])),
      ch7_bargains_done: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        enter: (s) => { if (kept(s).length >= 2) { s.flags.ENDING = 4; Store.save(); } },
        text: (s) => {
          const k = kept(s), b = broken(s), v = s.flags.VOLUNTEER | 0;
          if (k.length >= 2) return [
            `Two keys bound to the Envoy: ${UI.list(k.map(nickOf))}. A majority of hands.`,
            'He does not have to take anybody. The rest follow, and the spark goes out.',
          ];
          const out = [];
          if (k.length === 1) out.push(`${nickOf(k[0])}'s key goes dark. Three hands must bind what four should.`);
          if (b.length) out.push(`${UI.list(b.map(nickOf))} broke the Envoy's word to his face.`);
          if (!k.length && !b.length) out.push('Nobody was bound. The room lets out a breath.');
          if (v >= 1 && v <= 4) out.push(`${nick(v - 1)} flexes the bell-rope hand.`);
          out.push('Now the ring.');
          return out;
        },
        next: (s) => kept(s).length >= 2 ? 'ch7_ending' : 'ch7_sigil', button: 'What comes of it',
      },

      /* ---------- the Great Sigil ---------- */
      ch7_sigil: {
        type: 'puzzle', puzzle: 'ring', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, puzzleId: 'ch7_sigil', par: [4, 7, 10],
        enter: (s) => ensureClock(s),
        /* The brief names the four axes and nothing else. 'A cold ring costs a minute, the next more'
           used to sit here AND, word for word, on the rule card below; the card is the surface the
           whole room reads for the length of the puzzle, so the price lives there and only there --
           along with the two minutes the prophecy stone can take off the night. */
        text: [
          { text: 'Eight sockets, one phrase. Say your one thing first.', cls: 'whisper' },
          { text: 'Reader — what each wall says, both ways.', cls: 'whisper' },
          { text: 'Listener — how the phrase opens.', cls: 'whisper' },
          { text: 'Seer — where the floor is cut.', cls: 'whisper' },
          { text: 'Binder — what a cut obliges.', cls: 'whisper' },
        ],
        config: (s) => {
          const knot = oathKnot(s), walk = walkOn(s);
          const ans = knot ? ROT : BASE;
          return {
            title: 'THE GREAT SIGIL',
            /* "Either wall may speak first" is the x2 that doubles the phrase space. It used to live only
               in the Reader's closing line and in hint 2; it is on the shared surface now, because no
               phone may hold a position. */
            note: 'Provost Marrow, off the rim: *Eight sockets, one phrase, two walls of four words. Either wall may speak first. It begins at a cut in the floor, and not every socket takes a word. A cold ring costs a minute, the next more.*'
              + (knot ? ' *A sworn ring is built, then turned whole, until the sworn word stands where the phrase began.*' : '')
              /* the night is two minutes shorter when ch6's stone was read for the table (nightFor
                 above); a price the room cannot see is not a price, it is a trap */
              + (s.flags.STONE_TOLD ? ' You came down two minutes short.' : ''),
            slots: 8, glyphs: glyphPalette(), allowEmpty: true,
            allowRepeat: true,   /* load-bearing: without it the palette enforces Law 8 and the Binder is droppable */
            showArrow: false,    /* the hub arrow says SUNWISE, and sunwise is the Binder's Law, not the Hearth's */
            resetOnWrong: false,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat',
            /* A keyed failure may quote the RULE CARD, which the whole room can read, and may describe
               what the floor did. It may NOT name the role to ask, and it may not say WHICH axis is
               wrong -- that was the leak: naming the axis turns a three-role table's residual field
               into a guided binary search, and across the eight lines the Hearth recited the Binder's
               whole Law set back to a table that had just lost it.
               ONE line now answers every cold ring, and this is the third time that has had to be
               widened. What was still keyed, and why each had to go:
                 'Two sockets say the same word' fired on, and only on, a board that breaks Law 8 --
                   which is the Binder's, and `allowRepeat: true` four lines above exists precisely so
                   that the palette does not enforce it. The Hearth was giving away the flag the widget
                   had been configured to withhold. (And it is a perfect oracle: there are seven words
                   that are not COLD and seven sockets to fill, so "no repeat" and "the right words"
                   are the same statement.)
                 'Nothing was sworn tonight. The ring does not turn.' fired on the turned board with
                   no oath, and states Law 7 -- also the Binder's, and not on the rule card at all when
                   there is no oath to put it there.
                 the laid-down-wrong line listed RIVAL / SWAP / WIDDER / BEGUN and their sworn twins as
                   constants, which left one member of its own family out: begun at the notch AND
                   counted widdershins fell through to wrongText, which named it by being different.
               There is no list to leave anything out of now. Every cold ring gets the same sentence, so
               a table cannot learn one axis by elimination; the sentence has to be true of all of them,
               which is why it says nothing about the words. Two exceptions survive, both of them a
               quotation of the card the whole room is reading: laying the cold word (R10.16 -- it
               refuses itself, and costs nothing, and says the same thing whether or not the phrase has
               a cold word in it), and, under the oath only, a lawful ring left unturned.
               Under-commitment is coached and costs nothing (R10.19). */
            check: (map) => {
              const g = ringOf(map), sh = shape(g);
              const filled = g.filter(Boolean).length;
              if (filled < 7) return `Only ${filled} sockets spoken for. The ring will not close half-said.`;
              if (g.includes('COLD') && !walk) return 'The cold word is never written. Where the phrase shows it, that socket stays empty.';
              if (same(sh, ans)) return true;
              const n = chargeRing(Store.state);
              if (knot && same(sh, BASE)) return 'Right by the Laws, and still it will not close. You swore to somebody. Turn the whole ring until the sworn word stands where the phrase began.';
              /* ring.js only reaches onWrong when check() returns false, and this one never does, so the
                 second-try nudge is appended here -- off SIGIL_COLD, which a Replay scene cannot refund. */
              return 'Frost takes the ring socket by socket, and says nothing about which part of it was wrong. Say all four things again, out loud.'
                + (n >= 2 ? ' Wren, from the edge: "Has everybody actually said their one thing?"' : '');
            },
            successText: 'The ring warms. Every word, once.',
          };
        },
        hints: [
          'Four answers, and nobody has two. The walls — Reader. How it opens — Listener. Where the floor is cut — Seer. What a cut obliges — Binder.',
          /* R10.22: the insight in the abstract. The rung that stood here read "Two walls, two ways each,
             and either may speak first: eight phrases. Four say eight different words. Only one opens
             with the smallest climb." Both of those last two sentences are somebody's page said out
             loud: the eight-different-words is Law 8, which is the Binder's alone (companion/ch7.js's
             law(8, ...)) and which `allowRepeat: true` exists to keep his, and the smallest climb is
             the Listener's page with the article changed (companion/ch7.js, "The smallest climb there
             is."). Hints are free -- js/core/engine.js:329 charges nothing but hintsTotal -- and this
             puzzle has no try limit, so the rung WAS the puzzle: measured, it took a Listener-less
             table from four rings to one (two to one under a KNOT oath) and a Binder-less table from
             eight to four. It names the four questions now and answers none of them. */
          (s) => 'Four decisions before a word goes down: which wall speaks first, which way each is read, which cut it begins in, which way it runs. One of them wrong is all eight sockets wrong.'
            + (oathKnot(s) ? ' The oath adds a fifth, and it comes last.' : ''),
          /* read off the answer itself, so the last rung can never drift from the constants */
          (s) => (oathKnot(s) ? ROT : BASE).map((g, i) => (g || 'empty') + ' ' + (i + 1)).join(', ') + '.'
            + (walkOn(s) ? ' COLD may go in the empty one, by four hands.' : '') + ' Then four hands.',
        ],
        onSolve: (s, r) => { playHymn(); Store.note('The Great Sigil closed' + (r && r.tries > 1 ? ` after ${r.tries} tries.` : ' first time.')); },
        solvedText: [
          'The ring warms, socket by socket, and the Hymn plays itself through the floor.',
          'Then a rest, where nothing is written.',
          { speaker: 'Provost Marrow', text: 'Hands on your keys.' },
        ],
        next: 'ch7_binding', button: 'The Binding',
      },
      /* The Binding is a reflex round, not a partitioned puzzle: it gets a rule card and a practice pass
         instead of a hint ladder (the old ladder gave the answer at rung 1 and spoiled the stakes at rung 3). */
      ch7_binding: {
        type: 'puzzle', puzzle: 'binding', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.1, puzzleId: 'ch7_binding',
        enter: (s) => ensureClock(s),
        text: (s) => {
          const k = kept(s), cracked = s.flags.BELLS_CRACKED | 0;
          const out = ['Hands on your keys. No phones now.'];
          if (k.length) out.push(`${nickOf(k[0])}'s key is bound to the Envoy. Three notes, a longer climb.`);
          if (cracked) out.push(`${cracked} lane${cracked > 1 ? 's have' : ' has'} no light. Go on the count.`);
          out.push({ text: 'Listener — count them in and out. Say it once with hands off the keys.', cls: 'whisper' });
          out.push({ text: 'A slip costs thirty seconds. It cannot cost the night.', cls: 'whisper' });
          return out;
        },
        config: (s) => {
          const k = kept(s); const dead = k.length ? [ROLES.indexOf(k[0])] : [];
          const cracked = Math.min(3, s.flags.BELLS_CRACKED | 0); const muted = [0, 2, 3, 1].filter(i => !dead.includes(i)).slice(0, cracked);
          /* binding.js does not read cfg.mutedCues; the dimming is done here, after the widget has built its
             lanes synchronously. Reported, not fixed: the widget is a shared file. */
          setTimeout(() => { document.querySelectorAll('.bind-lane').forEach((el, i) => { if (muted.includes(i)) el.classList.add('ch7-muted'); }); }, 0);
          return {
            title: dead.length ? 'THE BINDING — THREE-HANDED' : 'THE BINDING',
            note: 'Provost Marrow, without looking up: *Press once to sound your note. All ' + (dead.length ? 'three' : 'four') + ' together. Hold while the fire climbs, then let go together, inside half a second.*',
            joinMs: 1000, holdMs: dead.length ? 8000 : 6000, releaseMs: 500, attempts: 3, deadLanes: dead, mutedCues: muted,
            /* onSlip, not onAttempt. Four things reset the ring and only two of them used to reach
               onAttempt, so the card promised 'a slip costs thirty seconds' and two kinds of slip
               cost nothing -- and the Epilogue's 'after N slips' printed 0 after a table had slipped
               twice (tools/scripts/ch7-alt2.json). js/puzzles/binding.js now fires onSlip on all four
               and keeps onAttempt for the three-attempt budget alone, so the charge lands exactly
               once per reset and the budget is untouched: the Binding is still priced so that it
               cannot cost the night (the OPEN 2 note at the foot of this file).
               penalty() first, then the Store.inc that saves it: the clock rewrites
               flags.MIDNIGHT_LEFT from render(), and this order is what keeps a slip charged across a
               reload. The 30 s is flat on purpose -- a reflex round is not a search. */
            onSlip: () => { Game.clock.penalty(30); Store.inc('BINDING_FAILS'); },
            failText: 'The fire will not wait. The Hearth counts for you: one — two — three — off.',
          };
        },
        onSolve: (s, r) => {
          s.flags.BINDING_LANDED = true; if (!(r && r.success)) s.flags.WITH_HELP = true;
          s.flags.MIDNIGHT_SPARE = Game.clock.left(); Game.clock.stop(); s.flags.MIDNIGHT_LEFT = s.flags.MIDNIGHT_SPARE; /* the Epilogue reads MIDNIGHT_LEFT as "to spare" */
          s.flags.ENDING = computeEnding(s); Store.save();
          Store.note(r && r.success ? `The Binding held, with ${clockText(s.flags.MIDNIGHT_SPARE)} to midnight.` : 'The Binding held, with help.');
          if (s.flags.ENDING === 0) Audio.mood('wonder');
        },
        solvedText: (s, r) => [
          r && r.success ? 'Four notes, one release. The fire climbs — not much, but it climbs.' : 'The Hearth counts for you. It holds, barely.',
        ],
        next: (s) => s.flags.ENDING === 0 ? 'ch7_cold_slot' : 'ch7_ending', button: 'What the fire decides',
      },
      /* Midnight, when it comes. Nothing is undone, the ladder is open, and the table walks back into
         whichever puzzle it was in. */
      ch7_cold: {
        type: 'custom', art: 'ch7_cold', mood: 'void', fx: 'snow', flame: 0,
        enter: (s) => { Game.clock.stop(); s.flags.MIDNIGHT_LEFT = 0; Store.save(); },
        text: [
          'Midnight. The spark goes out — not guttering, simply gone.',
          'Then Wren, in the dark, still talking.',
          { speaker: 'Wren', text: 'Well. Nothing is on fire. Finish the ring.' },
          { text: 'Nothing you have done is undone. The clock has stopped for good.', cls: 'small' },
        ],
        run: (box, api) => new Promise((resolve) => {
          api.button('Finish it in the dark', () => resolve((Store.state.solved && Store.state.solved.ch7_sigil) ? 'ch7_binding' : 'ch7_sigil'), 'primary');
        }),
      },

      /* ---------- the true path: writing COLD ---------- */
      ch7_cold_slot: {
        art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1,
        text: [
          'The ring is full but for one socket. Wren walks to it and stands in it.',
          { text: 'It is never written.', cls: 'omen' },
          { speaker: 'Wren', text: 'It\'s cold in here. Obviously. It\'s me.' },
          'Four sealed words said WALK. Nothing here looks surprised.',
          'Something is cut into that socket, in letters the Reader knows.',
        ],
        next: 'ch7_wren_code', button: 'Look',
      },
      ch7_wren_code: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1, code: 'WREN',
        enter: (s) => { s.flags.WREN_SHOWN = true; Store.save(); }, /* the Epilogue skips its own WREN cast on the true path when this is set */
        cast: (s) => S.cast('WREN', S.pack(L.chapter('ch8').cast, Object.assign({}, s.flags, { ENDING: s.flags.ENDING | 0 }))),
        codeLabel: 'It is never written. Write it.',
        codeSub: 'Each phone shows one thing, then goes dark. **Your Sighting is spent. Look up.**',
        text: ['The eighth word. Every phone, now.'],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Reader**.',
        button: 'Every phone is dark',
        next: 'ch7_fourhands',
      },
      ch7_fourhands: {
        type: 'custom', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.12,
        text: [
          { speaker: 'Wren', text: 'Nothing left but the keyboard and each other. Write it.' },
        ],
        run: async (box, api) => {
          const wrap = UI.el('div', { class: 'pz' });
          wrap.appendChild(UI.el('div', { class: 'ch7-vow', text: '"COLD is written by four hands." — Law 0. Restored.' }));
          box.appendChild(wrap);
          /* fourHands resolves false when the escape hatch is used. Do not record a ritual that did not
             happen: the Epilogue reads these notes back. */
          const byFour = await window.VigilRing.fourHands(wrap, 'WRITE IT — all four keys within a heartbeat');
          if (!api.alive()) return;
          Audio.sfx('seal'); Store.note(byFour ? 'COLD was written by four hands.' : 'COLD was written, but not by four hands.');
          await UI.sleep(900);
          return 'ch7_white';
        },
      },
      ch7_white: {
        art: 'ch7_white', mood: 'silence', fx: 'none', flame: 1, speed: 40,
        text: [
          { text: 'A fire the wrong way up appears in the empty socket, written by four hands.', cls: 'center' },
          { text: 'Wren steps aside. The four step through.', cls: 'center' },
          { text: 'White.', cls: 'big' },
        ],
        next: 'ch7_ending', button: 'After',
      },

      /* ---------- Stage 3: the Walk ---------- */
      ch7_ending: {
        art: 'ch7_end', artParams: (s) => ({ ending: s.flags.ENDING | 0 }), mood: 'sorrow', fx: 'ash', flame: 0.06,
        enter: (s) => { if (s.flags.ENDING == null) { s.flags.ENDING = computeEnding(s); Store.save(); } const E = s.flags.ENDING; Audio.mood(E === 0 ? 'triumph' : E === 1 ? 'wonder' : E === 4 ? 'dread' : 'sorrow'); Game.flame(E === 0 ? 1 : E === 1 ? 0.7 : E === 4 ? 0 : 0.4); },
        title: 'The Walk',
        text: (s) => {
          const E = s.flags.ENDING | 0, w = (E === 0 ? ROLES : walkers(s)).map(nickOf), st = stayers(s).map(nickOf);
          if (E === 0) return [
            `Walked into the Cold: ${UI.list(w)}. Stayed: no one.`,
            'The Hearth roars white. Four people come out, grey-eyed and ordinary.',
            'The Reader looks at the wall and sees shapes. The Listener hears a room, the way rooms sound. The Seer looks at the floor and it is a floor. The Binder looks at the Provost and has to ask what she feels.',
            'Wren is on the warm stones, crying, and will deny it. And there is a heartbeat.',
            { speaker: 'Wren', text: 'You *idiots*. I had a *speech*.' },
          ];
          if (E === 1) return [
            `Walked into the Cold: ${UI.list(w)}. Stayed: ${UI.list(st)}.`,
            'The Cold closes. Not all the way. Enough. The walkers come out with no gift.',
            { speaker: 'Wren', text: 'Half a walk. Story of my life.' },
          ];
          if (E === 2) return [
            'Walked into the Cold: Wren. Stayed: all four of you.',
            { speaker: 'Wren', text: 'It is alright. I knew. I wanted to hear what you would say.' },
            'The fire takes the shape of a door, and Wren goes through. Provost Marrow is left holding a grey thread.',
          ];
          if (E === 3) return [
            'Walked into the Cold: the Provost. Stayed: all four of you, and Wren.',
            { speaker: 'Provost Marrow', text: 'Then I go. I should have gone fourteen years ago.' },
            'She gives Wren the Chair\'s seal. The flame takes her.',
          ];
          return [
            'Nobody walked. Wren is kept warm, and kept, as promised. The school is a garrison by spring.',
            { speaker: 'Wren', text: 'Write to me. They let you write, apparently.' },
          ];
        },
        next: 'ch7_flow', button: 'The night, whole',
      },
      ch7_flow: {
        type: 'flow', art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: ['The Finale, as you walked it. What it meant is in the Epilogue.'],
        flowTitle: 'Finale — the paths you walked',
        stats: (s) => {
          const names = ['the Fourfold Walk', 'the Half-Walk', 'the Sealing', 'the Keeper\'s Walk', 'the Envoy\'s Bargain'];
          const one = `The night ended in ${names[s.flags.ENDING | 0]}.`;
          const cold = s.flags.SIGIL_COLD | 0;
          const rings = cold ? `The ring went cold ${cold} time${cold === 1 ? '' : 's'}` : 'The ring closed first time';
          const two = s.flags.MIDNIGHT_SPARE != null
            ? `${rings}, and the Binding held with ${clockText(s.flags.MIDNIGHT_SPARE)} of midnight left, after ${s.flags.BINDING_FAILS | 0} slips${s.flags.WITH_HELP ? ', counted for you' : ''}.`
            : `${rings}. The Binding was never called.`;
          const three = kept(s).length ? `${UI.list(kept(s).map(nickOf))} kept the Envoy's word.`
            : broken(s).length ? `${UI.list(broken(s).map(nickOf))} almost took it.`
            : `You asked the fire for ${s.flags.hintsTotal || 0} hints.`;
          return `${one} ${two} ${three}`;
        },
        next: 'ch8_start', button: 'What the fire left behind',
      },
    },
  });

  /* ============================================================================================
     OPEN 2 -- the retry economy in the last two chapters. ch7's half, and what is left owing.

     WHAT IS DONE HERE, inside ch7 alone.
       The Great Sigil now has a budget narrower than its own widest single-drop field: eight rings
       against six the night will pay for (sigilPrice above). It is priced in the currency the Finale
       already has -- the night -- and every charge is written to disk by the Store.inc that follows
       it, which is the fix for a clock whose own writer never saves. Nothing here can lose the game:
       midnight is still a beat, ch7_cold still hands the ladder over, and the ring can still be
       closed in the dark.
       The Binding is priced at zero ON PURPOSE and this is the note that says so, so that the next
       auditor does not re-find it: `attempts: 3` is binding.js's own local counter, BINDING_LANDED is
       set on both outcomes, and computeEnding never reads WITH_HELP. A reflex round at the last beat
       of a two-hour game, with four hands on four keys, is not a search and must not be a wall. Its
       30 s is atmosphere, and it is flat.

     WHAT IS NOT DONE, AND WHY IT CANNOT BE DONE FROM THIS FILE.
       (a) SIGIL_COLD and COLD_HEARTH_ATTEMPTS are ch7-local. `node tools/flag-map.js` prints
           COLD_HEARTH_ATTEMPTS as ch7 ch7 -- it reaches nothing. docs/ADVERSARIAL.md's OPEN 2 says
           these are "a recorded cost that ch8's ending already prints"; they are not. ch8.js's COUNTS
           (ch8.js:154-160) does not mention either, and MIDNIGHT_LEFT is the ONLY retry-adjacent
           number the Epilogue prints -- which, until this pass, a reload could refund.
       (b) What I would do with ch6 and ch8 in hand, as one edit:
             * one COUNTS row in ch8, reading a single number that both chapters write:
               `COLD_RINGS = (SIGIL_COLD|0) + (STONE_MISREAD|0)` -- "the fire was told the wrong thing
               N times" -- so that ch6's stone and ch7's ring are priced in the same currency and the
               Epilogue says so out loud. That is a ch8 edit and one line in each of ch6 and ch7.
             * NOT a losing branch. ch6 argued itself out of one honestly (there is no fourth bell)
               and ch7 must not have one at the last beat. The cost that both chapters can carry is a
               recorded one, and a recorded cost is only real once ch8 reads it.
             * ch6's stone should take the same escalating shape as sigilPrice: a first misreading
               that is cheap and a fourth that is not, rather than a flat one that a field of eight
               walks through.
           None of that is safe to do half. This file writes SIGIL_COLD, keeps it in the save, and
           prints it on ch7_flow, so the number exists and is correct whenever ch8 is ready to read it.
     ============================================================================================ */
})();
