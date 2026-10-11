/* Chapter III — The Whispering Gallery (Listener drives, Binder is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, S = window.VigilShared;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  /* ---------- chapter-local styling, namespaced (ch1.js lines 8-14 are the pattern) ---------- */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    /* Where the patrols are is the Listener's and the Seer's. revealPatrols:false stops the widget drawing
       their markers; this hides the HUD line, which grid.js writes with their room ids after every turn. */
    body[data-chapter="ch3"] .grid-pz .react-hud .g-msg { display: none; }
    /* Which rooms the porter is paid for is the Binder's: the widget's small red alarm dots stay off the Hearth. */
    body[data-chapter="ch3"] .grid-pz .grid-board svg circle[r="4"] { display: none; }
    /* grid.js tints every cfg.safe cell green with this exact literal (js/puzzles/grid.js, the cell rect
       fill). The gallery is no secret, but a tinted square teaches the widget's vocabulary for nothing. */
    body[data-chapter="ch3"] .grid-pz .grid-board svg rect[fill="rgba(127,174,94,0.15)"] { fill: rgba(255,255,255,0.05); }
    /* No free restart. grid.js's own ghost button resets the board at no cost, which turns a sighting and
       a wrong word into nothing and lets eight door words be guessed for free. The third bell already
       resets the board (grid.js, on maxTurns), and that reset is written down and costs the table. */
    body[data-chapter="ch3"] .grid-pz > .btn.ghost { display: none; }
    /* Fit: the rule card is 68 words (71 with the hurt clause), so the board gives the height back. */
    body[data-chapter="ch3"] .grid-pz .grid-board svg { max-height: min(34vh, 320px); }
    body[data-chapter="ch3"] .grid-controls .btn { padding: 7px 4px; font-size: 13px; }
    body[data-chapter="ch3"] .ring-pz .wheel { width: min(34vh, 320px); height: min(34vh, 320px); }
    /* The slot numbers are what the Seer's page names ("a small notch under slot 4"): legible at any size (ch0 does the same). */
    body[data-chapter="ch3"] .ring-pz .wheel .slot text.lbl { font-size: 28px; fill: var(--ink); }
    /* The rule card and the status line are prose, not a machine label. */
    body[data-chapter="ch3"] .pz-note { white-space: normal; font-family: var(--serif); font-size: 15px; line-height: 1.45; }
    body[data-chapter="ch3"] .pz-status { font-family: var(--serif); font-size: 15px; letter-spacing: 0; text-transform: none; line-height: 1.4; }
    @media (max-height: 760px) {
      body[data-chapter="ch3"] .grid-pz .grid-board svg { max-height: min(29vh, 260px); }
      body[data-chapter="ch3"] .ring-pz .wheel { width: min(28vh, 280px); height: min(28vh, 280px); }
    }
    /* R1.2 (1152 x 648): the wheel and the palette stacked, and Close the sigil sat 165px below the fold.
       A smaller wheel and short name tiles put them side by side. */
    @media (max-height: 680px) {
      body[data-chapter="ch3"] .ring-pz .wheel { width: min(24vh, 156px); height: min(24vh, 156px); }
      body[data-chapter="ch3"] .ring-pz .wheel-wrap { gap: 10px; }
      body[data-chapter="ch3"] .ring-pz .palette { min-width: 200px; flex-basis: 200px; }
      body[data-chapter="ch3"] .ring-pz .palette-grid { gap: 5px; margin-top: 4px; }
      body[data-chapter="ch3"] .ring-pz .glyph.name-only { width: 72px; height: 30px; }
      body[data-chapter="ch3"] .ring-pz .glyph.name-only .gname { font-size: 12px; }
      body[data-chapter="ch3"] .ring-pz .palette-grid .glyph.empty { width: 72px; height: 30px; }
      body[data-chapter="ch3"] .ring-pz .wheel .slot text.lbl { font-size: 32px; }
    }
  ` }));
  /* A hurt-arm door turn that was spotted or rang the bell is cut short on purpose (see doorOpened); keep the console clean. */
  window.addEventListener('unhandledrejection', (e) => { if (e.reason && e.reason.ch3DoorAbort) e.preventDefault(); });

  /* ============================================================================================
     THE CORRIDORS.  The board, the doors, the rounds and the budget are published; who walks where
     and when, what is cut over a door and what a cry costs are on four separate phones.

     The two patrol timetables are BUILT from two arrays that live on two different pages:
        ROUND_x  — the Listener: how far along its own round a patrol is, beat by beat. No rooms.
        WALK_x   — the Seer: which room each of those stops is. No timings.
     Neither array means anything alone, and the Hearth prints neither.

     Search (an independent re-implementation of grid.js's move/detect/bounce loop, run over every legal
     turn sequence; tools/scripts/ch3-grid-check.js re-runs the same assertions against the live config):
       412 safe schedules unhurt, 34 under WREN_HURT. Every one passes through the laundry (B3) and
       leaves it for C3 on beat 7 or 8. Arrivals: unhurt 50 on turn 11, 362 on turn 12; hurt 4 and 30.
     The gallery is the ONLY safe room. B3 is undetectable by construction — no patrol path contains it
     and it has no open edge — so leaving it out of `safe` changes nothing about being caught there, and
     the two counts above are unchanged by it. What it changes is where a sighting throws Wren back to,
     and that is the whole budget. Winning runs counted by sightings, with the bounce modeled:
       safe:['A1']         unhurt 412 / 1 / 0 ...      hurt 34 / 0
       safe:['A1','B3']    unhurt 412 / 132 / 37 / 6   hurt 34 / 1
     With the laundry safe, a table that knew only the two door words and the word 'east' walked in on
     turn 3 and pushed east every turn: seen three times, through on turn 11, first run, no phones.
     THE COSTS, and every one of them in Store.state.flags, so that a Resume, a pasted save code and the
     Menu's "Replay scene" all keep them (ADVERSARIAL 7) and none of them stops charging (ADVERSARIAL 14):
       the bell     CH3_BELLS counts every third bell, not only the first. The budget is twelve turns for
                    the first run and one turn fewer for every bell, floored at eleven — enumerated: of the
                    412 safe unhurt schedules 50 arrive on turn 11, and 4 of the 34 hurt ones, so eleven is
                    where the corridors stop being winnable and the budget stops shrinking. A blind table
                    pays for it: 412 of 3,995 schedules = 10.3% at twelve turns, 50 of 869 = 5.8% at eleven
                    (hurt 34 of 1,257 = 2.7% -> 4 of 282 = 1.4%).
       a sighting   costs 1 + CH3_BELLS turns, so the bell goes on charging after the budget has hit its
                    floor, and the one strategy the turn count cannot see — walk into a patrol on purpose,
                    read the room and the turn off grid.js's own sighting line, ring the bell, walk again —
                    gets dearer every time it is used.
       a seam       SEAM_A3B3 and SEAM_B3C3: the nth wrong word at one seam costs n turns, and the seam
                    remembers across a bell, a re-entry and a reload. The Reader-less costing below is
                    priced on that memory, and it used to live on a door object gridConfig rebuilt on entry.
     THE LADDER IS PART OF THE FIELD, because a hint costs nothing. Rung 1 re-partitions. Rung 2 names no
     room, no beat and no turn (guarded in tools/scripts/ch3-grid-check.js), so the 3,995 blind schedules
     and the 412 safe ones below are exactly what they were before it was taken. Rung 3 is the route, and
     it is the only rung that names a cell. The rung 2 that stood here until this pass gave the round
     length (the Listener's) and the room nobody searches (the Binder's), which between them are the whole
     plan — the only free parameter left is how many beats to sit in the laundry, and measured, that is
     2 winners among 5 in-time exits: 10.3% -> 40% unhurt, and 2 among 3, 2.7% -> 67%, under WREN_HURT.
     Drop-a-role (honest numbers, not claims):
       no Listener — the Seer's map gives rooms but no timing. 3,995 schedules reach E5 inside twelve
                     turns and 412 of them are safe, so a blind pick wins 10.3% of the time, and the
                     only feedback is being seen, which now costs the approach.
       no Seer     — strictly worse than that: the Listener's twelve numbers index nothing, so the same
                     blind 10.3%, and on top of it a coin flip at each seam over which end is scratched.
                     (Where the seams ARE is free — grid.js prompts for the word before it checks the
                     wall, and canceling costs nothing. What the Seer holds is the mapping and the ends.)
       no Binder   — the porter is the Binder's alone now. The Seer's under-layer draws the rooms, the
                     passages and the two seams, and no longer draws the lodge or its sight-lines, so
                     nothing else on the table says the south corridor is watched. With the cry unknown
                     a table believes 824 schedules are safe and 412 are (hurt: 68 believed, 34 real).
                     Exactly half, and the wrong half is a sighting. A COSTED COIN FLIP.
       no Reader   — eight words per seam, and the nth wrong word at a seam costs n turns. Surviving
                     schedules by wasted turns (west+back): 0+0 412, 1+0 114, 0+1 125, 1+1 34, 1+2 9,
                     2+2 1; hurt 0+0 34, 0+1 9, 1+1 1. The right word sits uniformly among the eight, so
                     a seam costs 0 turns 1 time in 8, 1 turn 1 time in 8, and 3 turns after that:
                     guessing both seams inside two wasted turns succeeds 4 times in 64. (The 115 and the
                     "6 times in 64" recorded here before were a flat one-turn-per-guess model, which is
                     not what mkDoor has ever charged.)
     ============================================================================================ */
  const CELLS = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'C1', 'B3', 'C2', 'C3', 'C4', 'D3', 'B5', 'C5', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'];
  const EDGES = [['A1', 'B1'], ['B1', 'C1'], ['A1', 'A2'], ['A2', 'A3'], ['A3', 'A4'], ['A4', 'A5'], ['A5', 'B5'], ['B5', 'C5'], ['C5', 'D5'], ['D5', 'E5'], ['E1', 'E2'], ['E2', 'E3'], ['E3', 'E4'], ['E4', 'E5'], ['C5', 'C4'], ['C4', 'C3'], ['C3', 'C2'], ['C3', 'D3'], ['D3', 'E3']];

  const ROUND_A = [3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2];        // Listener: the lantern, stop by stop
  const ROUND_B = [4, 4, 4, 4, 4, 4, 3, 2, 1, 1, 2, 3];        // Listener: the sentry, stop by stop
  const WALK_A = ['A3', 'A4', 'A5', 'B5', 'C5', 'C4', 'C3'];   // Seer: where the lantern's seven stops are
  const WALK_B = ['E1', 'E2', 'E3', 'E4'];                     // Seer: where the sentry's four stops are
  const PATROL_A = ROUND_A.map(i => WALK_A[i - 1]);            // = A5 B5 C5 C4 C3 C4 C5 B5 A5 A4 A3 A4
  const PATROL_B = ROUND_B.map(i => WALK_B[i - 1]);            // = E4 x6, E3 E2 E1 E1 E2 E3

  const LINTELS = { 'A3|B3': 'Crown', 'B3|C3': 'Spike' };      // Reader: one shape cut over each hidden door
  const SCRATCH = { 'A3|B3': 'left', 'B3|C3': 'right' };       // Seer: which end of each lintel is scratched
  /* Crown scratched left reads CROWN, scratched right reads EMBER. Spike left THORN, right WELL.
     Neither password is printed on the Hearth tonight: VEIL is the attunement word, THORN was ch1's. */
  const WORDS = { 'A3|B3': 'CROWN', 'B3|C3': 'WELL' };
  const BOUGHT_ROOMS = ['B5', 'C5', 'D5', 'C4'];               // Binder: what the porter is paid to watch

  /* Only the start and the goal are named on the board. grid.js writes cfg.labels onto closed cells too,
     so a label on D1 would spell out the row-1 dead end the board already draws; and the laundry is the
     Binder's to name, not the Hearth's. */
  const LABELS = { A1: 'the gallery', E5: 'the tower door' };

  /* Every cost in the corridors, read live out of the save. Nothing here is a module-local `let`: the
     Menu hands "Replay scene" back at any moment, and js/core/engine.js re-evaluates `scene.config` on
     every entry, so a counter held anywhere else is refunded by two clicks. */
  const bells = () => Store.state.flags.CH3_BELLS | 0;
  const turnBudget = () => Math.max(11, 12 - bells());          // floor: no safe schedule arrives sooner
  const sightCost = () => 1 + bells();
  /* The two seams' memories, written out rather than built from the key, so that a grep and
     tools/flag-map.js both see the names. Both are ch3-local: no other chapter reads or writes either. */
  const seamCount = (key) => (key === 'A3|B3' ? Store.state.flags.SEAM_A3B3 : Store.state.flags.SEAM_B3C3) | 0;
  const seamWrong = (key) => { const n = seamCount(key) + 1; if (key === 'A3|B3') Store.set('SEAM_A3B3', n); else Store.set('SEAM_B3C3', n); return n; };
  const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  const num = (n) => NUM[n] || String(n);
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

  /* A hidden door.  grid.js reads `password` to compare, reads `wrongText` ONLY when the spoken word was
     wrong (one place, in move()), and writes `revealed` the moment a word is accepted, before Wren steps
     through. Both of those buy the chapter a turn on the near side: a wrong word costs a breath, and so
     does shouldering a heavy door with one arm. */
  function mkDoor(key, password, prompt, wrong) {
    const o = { password, prompt, _rev: false };
    Object.defineProperty(o, 'revealed', { enumerable: true, get: () => o._rev, set: (v) => { o._rev = !!v; if (v) doorOpened(); } });
    Object.defineProperty(o, 'wrongText', { enumerable: true, get: () => {
      // grid.js sets the status to bad and then reads this; the deferred turn wipes the status, so write it again.
      // The nth wrong word at this seam costs n turns, and the count is in the save: gridConfig rebuilds
      // these door objects on every scene entry, so an object field was a budget the Menu could refund.
      const turns = seamWrong(key);
      const tail = turns === 1 ? ' A turn goes with it, and the rounds walk on.'
        : ' ' + cap(num(turns)) + ' turns go with it — this seam has heard you guess before.';
      setTimeout(() => { for (let i = 0; i < turns; i++) { const r = spendTurn(wrong + tail); if (!r || r.ended) break; } }, 0);
      return wrong;
    } });
    return o;
  }
  /* Spend one turn on the near side by pressing the widget's own Wait: patrols are checked and the board
     redrawn exactly as for any other turn. Returns the widget's status element if it is still ours to write. */
  function spendTurn(msg) {
    const widget = document.getElementById('widget'); if (!widget) return null;
    const wait = Array.from(widget.querySelectorAll('.grid-controls .btn')).find(b => b.textContent.trim() === 'Wait');
    if (!wait || wait.disabled) return null;
    wait.click();
    const status = widget.querySelector('.grid-pz .pz-status'), turnEl = widget.querySelector('.grid-pz .g-turn');
    const seen = !!(status && /sees Wren/.test(status.textContent));
    const turn = turnEl ? parseInt((turnEl.textContent.match(/\d+/) || ['0'])[0], 10) : 0;
    if (seen || turn >= turnBudget()) return { spent: true, ended: true, status };
    if (msg && status) { status.className = 'pz-status bad'; status.textContent = msg; }
    return { spent: true, ended: false, status };
  }
  function doorOpened() {
    if (!Store.state.flags.WREN_HURT) return;
    // No status line here: this runs inside grid.js's move(), which clears the status a moment later.
    const r = spendTurn(null);
    if (!r) return;
    if (!r.ended) UI.toast('Wren\'s arm. Shouldering a hidden door open one-handed costs a breath, and a turn passes on the near side.', 3200, 'bad');
    if (r.ended) {
      // The breath was spent and Wren never got through: a patrol saw the door being shouldered, or the bell rang.
      // Abort the widget's step itself (it is mid-move, just after accepting the word) so Wren is not carried through.
      const err = new Error('ch3: the door turn ended the move'); err.ch3DoorAbort = true; throw err;
    }
  }

  const gridConfig = (s) => ({
    title: 'THE CORRIDORS — THE GALLERY TO THE TOWER',
    /* Every number on this card is the number in force, not the number it started at: after a bell the
       budget is eleven and a sighting is dearer, and a card that still said twelve would be a promise the
       widget does not keep (R10.4 — a reader holding only the card must be able to compute any position). */
    /* "one doorway" read as a seam too, and grid.js's seenBy uses open edges only: a patrol never sees
       through a seam, open or shut, and rung 3 parks Wren behind one with the lantern on the far side.
       "At the bells", not "at the bell-rope": ch3_flow's "There was never a rope" is the captain's rope,
       and a card that put one in her hands contradicted it (r0 audit A2). The door cost is n turns for the
       nth wrong word at that door (seamWrong), said as a count, with one name for the thing: a hidden door. */
    note: 'The Provost, at the bells: *' + cap(num(turnBudget())) + ' turns. A turn is one room, or a wait. A patrol that ends a turn in Wren\'s room, or one open passage from it, has seen Wren. Wren runs all the way back to the gallery, and '
      + (sightCost() === 1 ? 'a turn goes with it. ' : num(sightCost()) + ' turns go with it. ')
      + 'Nobody sees through a hidden door. '
      + (s.flags.WREN_HURT ? 'One-handed, Wren needs a turn to shove one open. ' : '')
      + 'The first wrong word at a door costs a turn, the second two, the third three.*',
    cols: 5, rows: 5, cells: CELLS, edges: EDGES,
    doors: {
      /* The cost is on the rule card, and it is n turns for the nth wrong word, not "a turn". */
      'A3|B3': mkDoor('A3|B3', WORDS['A3|B3'], 'A seam in the west wall, and one shape cut over it. Speak the word.', 'Not that word. The seam stays a seam.'),
      'B3|C3': mkDoor('B3|C3', WORDS['B3|C3'], 'A seam in the laundry\'s back wall, and one shape cut over it. Speak the word.', 'Not that word. The seam stays a seam.'),
    },
    start: 'A1', goal: 'E5', safe: ['A1'],   // the gallery, and nothing else: see the budget above
    revealPatrols: false,
    patrols: [
      { name: 'The lantern', short: 'A', path: PATROL_A },
      { name: 'The sentry', short: 'B', path: PATROL_B, alarmCell: 'E4' },
    ],
    /* The world's reaction only. What the cry buys the Envoy, and for how long, is the Binder's page. */
    alarm: { cells: BOUGHT_ROOMS, turns: 3, text: 'A spyhole slides. A voice out of the lodge: "Here! The foundling!" Somewhere east, boots stop walking.' },
    get maxTurns() { return turnBudget(); },     // twelve, then one fewer per bell, floored at eleven
    labels: LABELS,
    /* Read by grid.js one line BEFORE it calls onTimeout, so this bell is not counted yet: the terms
       quoted here are next run's, computed at n + 1. */
    get timeoutText() {
      const n = bells();
      const nth = ['a fourth', 'a fifth', 'a sixth'][Math.min(n, 2)] || 'another';
      return `The third bell, and Wren is not at the door. Far above, the Provost rings ${nth}. Both rounds begin again from the top — ${num(Math.max(11, 11 - n))} turns in them now, and being seen costs ${num(2 + n)} of them.`;
    },
    successText: 'The Tower door, at last.',
    /* Cumulative: a restart does not wipe the count. The turn matters more than the count — without it,
       being thrown back to the gallery on turn 4 still leaves exactly the eight turns the direct line needs,
       so "push east, and when you are thrown back walk the same road again" won with no phones at all.
       Deferred, because this runs inside grid.js's move(). */
    onSpotted: () => {
      Store.inc('CH3_SPOTTED');
      const cost = sightCost();
      // Keep grid.js's own line about who saw Wren and where: the deferred turn would otherwise wipe it.
      setTimeout(() => {
        const st = document.querySelector('#widget .grid-pz .pz-status');
        // The board's own exclamation mark is the only one in the chapter: keep the line, drop the shout.
        const seenLine = st ? st.textContent.trim().replace(/!/g, '.') : '';
        // grid.js's own line already says Wren scrambled back to the gallery: say only what it cost.
        const tail = cost === 1 ? 'The rounds did not wait.' : `The rounds did not wait, and ${num(cost)} turns went with them.`;
        for (let i = 0; i < cost; i++) { const r = spendTurn((seenLine ? seenLine + ' ' : '') + 'Wren is breathing hard. ' + tail); if (!r || r.ended) break; }
      }, 0);
    },
    /* Every bell charges. WREN_SCARED is ch4's flag and means "the third bell rang with Wren still out",
       so it is written once and never unwritten; the cost that keeps biting is CH3_BELLS itself, which
       shortens the budget and raises the price of a sighting above. */
    onTimeout: () => {
      if (!Store.state.flags.WREN_SCARED) { Store.set('WREN_SCARED', true); Store.note('The third bell rang with Wren still in the corridors.'); }
      Store.inc('WREN_TRUST', -1);
      Store.inc('CH3_BELLS');
    },
  });

  /* ============================================================================================
     THE THRESHOLD.  Four slots, three words, one slot left empty.

        ARCH   = ['ASH','THORN','KNOT']   Reader — Flame, Spike and Hook, upright, set down in no order
        CLIMB  = [1, 1]                   Listener — each note one rung above the last
        CUTS   = { scratch: 1, notch: 4 } Seer — two cuts under the ring, no arrow and no rule
        LAW    = a Vigil ward: begin in the NOTCHED slot, then one slot back, widdershins (Binder)

     Enumerated: 4 slots, 8 glyph names, no repeats, empties allowed = 3,393 submittable states.
     Exactly one passes: ASH in 4, THORN in 3, KNOT in 2, slot 1 empty (RING, derived below).
     Drop a page and the states still consistent with the other three are — re-enumerated; the figure of
     336 for the Reader that stood here before was simply wrong:
        no Reader   5 — the Ladder is seven rungs, so a climb of one-then-one fits five triples:
                        ASH/THORN/KNOT, THORN/KNOT/EMBER, KNOT/EMBER/WELL, EMBER/WELL/VEIL, WELL/VEIL/CROWN.
                        Five is the most three notes can ever leave: any three-note contour spans at least
                        two rungs, and seven minus the span is at most five. This one is already at that
                        ceiling, so the Reader cannot be made harder to drop by choosing other words.
        no Listener 6 — the six orderings of the three words across slots 4, 1 and 2.
        no Seer     4 — begin at either of two cuts, run either way: the Binder's rule needs the cut's slot.
        no Binder   4 — begin at the scratch or at the notch, clockwise or widdershins. BOTH bits are
                        the Binder's, and it took two goes to make that true. This row was FALSE twice.
                        First it was 1: the Binder's page here was word for word the Binder's PROLOGUE
                        page, and the dormitory lamp is worked on the shared screen with the Binder
                        required to say the rule aloud, so by Chapter III 'begin at the scratch, run
                        clockwise' is table knowledge (ADVERSARIAL 11). Moving the mark to the notch
                        fixed half of that and the row was STILL false, at 2 rather than 4, because the
                        DIRECTION sits in the same four-line list on the same Prologue page and nothing
                        in the game had ever shown a ring running the other way -- so three tries walked
                        it with certainty: p 1.000 against a recorded 0.750.
                        A Vigil ward is sealed behind its keeper and runs widdershins. That is on the
                        Binder's page and nowhere else, ring.js's SUNWISE arrow is off, and the Hearth
                        draws no cuts. Now the field is four and the Prologue answers neither bit.
                        The board a table lays from the Prologue's rule (scratch, clockwise) is a full
                        lawful WRONG one, so the missing seat costs a try rather than nothing.
     No single drop leaves one. But four to six wrong sigils is nothing to a table that may submit for
     ever, so three tries is the price: three cold rings and the captain takes Wren (ch3_surrender, which
     has its own written branch; onSolve writes DOOR and SURRENDERED the moment the ring goes cold, so a
     detour through the Menu cannot skip past the scene that used to be the only writer). The count is WARD_TRIES,
     in the save, and `maxTries` is what is left of it — the widget's own `tries` is a local `let` that
     the Menu's "Replay scene" hands back in full, and a budget two clicks can refund is not a budget
     (ADVERSARIAL 7). Guessing blind, and drawing distinct boards, a three-role table gets through
     3/|field| of the time: no Reader 3/5, no Listener 3/6, no Seer and no Binder 3/4 — turned away
     between one time in four and one time in two. Recomputed against the shipped
     wardCheck in docs/PARTITION.md; if that table and this comment ever disagree, the table is the one
     that was run and this is a copy (ADVERSARIAL 18).
     THE LADDER IS PART OF THE ANSWER SPACE, because a hint costs nothing. Enumerated against the
     shipped wardCheck (all four fields, every rung applied as a predicate):
        rung 1  re-partitions and names no coordinate:            5 / 6 / 4 / 4, unchanged
        rung 2  names no slot, no cut and no direction:           5 / 6 / 4 / 4, unchanged
        rung 3  is the answer. The bell lights on the second wrong try (ring.js:89) and rung 3 is free, so
                a table that asks the fire is never shut out; tools/check-hints.js proves rung 3 is a board
                wardCheck actually takes, which is the check that would have caught ch4's drifted oath.
     The rung 2 that stood here until this pass — "one slot stays empty, and it is not the last one. The
     count runs off the end of the ring and comes back to slot 1" — was the Seer's slot and the Binder's
     wrap, and measured it cut the Seer-less and the Binder-less fields from 4 to 2: a free hint took
     p(3 tries) from 0.750 to 1.000 in both, and the 25% it deleted is the captain taking Wren.
     And no wrong line names a slot, a cut, a direction or the shape of the hum: the Hearth is
     the one screen all four can see, and four of the five keyed lines used to read out somebody's page.
     The mark sits at slot 4 and the run goes 4, 3, 2, so it never wraps, and "it begins at slot 1", which
     the widget's own numbering suggests, is a wrong board with the same line as every other wrong board.
     ============================================================================================ */
  const ARCH = ['ASH', 'THORN', 'KNOT'];
  /* The two cuts. They are the SEER's page and nothing on the Hearth draws them (the ring ships
     marks: []), so this constant feeds no code -- it is the record of what companion/ch3.js draws and
     says, and tools/scripts/ch3-grid-check.js now compares the two so they cannot drift apart.
     They SWAPPED in the Integrate pass. See the note on the Binder's page in companion/ch3.js: the
     scratch-is-the-mark rule was spent by the Prologue's dormitory lamp, in front of the whole room,
     so this ward's Binder-less field was 1 and not 4. The mark here is the NOTCH, which is what the
     Binder now holds. The accepted board moved once more when the run turned widdershins (RING below).
     The scratch sits on slot 1 -- the slot a guessing table starts at, and the slot ch0's lamp and
     ch7's sigil both put their decoy cut on, for the same reason. It cannot be slot 2: that is
     ch4's oath pair (OATH_SCRATCH 2, OATH_NOTCH 4) and tools/scripts/ch4-oath-check.js fails on the
     repeat, which is ADVERSARIAL 9 and is how this was caught. */
  const CUTS = { scratch: 1, notch: 4 };   // Seer: what is cut. Binder: which of them binds.
  /* WHICH WAY IT RUNS is the Binder's second bit, and it had to become one. Moving the mark to the
     notch fixed only half of what the Prologue spends: the dormitory lamp is worked on the shared
     screen and its answer settles BOTH the start AND the direction, and the Binder's Prologue page
     teaches the clockwise run, which the Binder says aloud to the whole room to solve the lamp. So with the start moved the Binder-less field was 2 boards, not 4, and three tries walked
     it with certainty: p 1.000 against a recorded 0.750.
     A Vigil ward is sealed by its keeper behind them, so it runs WIDDERSHINS -- back against the
     count. That is on the Binder's page and nowhere else; ring.js would draw a SUNWISE arrow at the
     hub and `showArrow: false` is what stops it, which tools/scripts/ch3.json asserts. The field is
     four again and honestly four: two cuts to begin at, two ways to run, and the Prologue answers
     neither for a ring of this class.
     RING is DERIVED from CUTS and the direction, so the board cannot drift away from the rule the
     Binder is given -- which is exactly how ch4's oath hint broke (ADVERSARIAL 10, 18). */
  const WIDDERSHINS = true;
  const RING = (() => {
    const step = WIDDERSHINS ? -1 : 1, r = {};
    let slot = CUTS.notch;
    for (const w of ARCH) { r[slot] = w; slot = ((slot - 1 + step + 4) % 4) + 1; }
    return r;
  })();   // { 4: ASH, 3: THORN, 2: KNOT } -- and the scratch at slot 1 stays empty, being only wear
  /* wardCheck always returns true or a line, so ring.js's own onWrong never fires: the second-try nudge
     that suspects a player who has not spoken is appended here instead.
     WARD_TRIES is the budget, and it is in the save: a module-local `let` survives a Replay scene but
     not a reload, and ring.js's own `tries` survives neither. Every refused submission counts, the
     under-committed ones included, because ring.js's own `tries` counts every submission and compares it
     to maxTries: let the two drift apart and the widget can go cold at a count the card never mentioned. */
  const wardBudget = (s) => Math.max(1, 3 - (s.flags.WARD_TRIES | 0));
  /* An empty ring and a half-filled one are not attempts, and they are not charged. Every other ring in
     the game already does this and says so on the line -- ch4's oath ('It is not closed, and it has not
     cost you'), ch5's two gates ('Nothing frosts yet'), ch6's strip ('Not a reading yet') -- and this one
     was missed, on the puzzle with the harshest losing branch in the chapter. It mattered less while a
     reload handed the count back; moving WARD_TRIES into the save removed that accidental refund and left
     a table able to lose the Tower door by pressing Close three times on an empty ring.
     cfg.maxTries++ is how the other four keep the widget in step: js/puzzles/ring.js reads cfg.maxTries
     live, AFTER check() has run, and its own `tries` local counts every submission -- so bumping the
     ceiling here is what stops the two counters drifting apart. */
  const UNDER = { none: 'Nothing in the ring, and the soot stays soot.', few: 'Three shapes are cut into the arch. Three words go in.' };
  function wardCheck(m, cfg) {
    const line = wardReason(m);
    if (line === true) return true;
    if (line === UNDER.none || line === UNDER.few) { if (cfg) cfg.maxTries++; return line + ' Nothing is spent.'; }
    const n = Store.inc('WARD_TRIES');
    return n >= 2 ? line + ' Wren, not helping: "Has everybody actually said their bit?"' : line;
  }
  /* Every line here may say only what is on the rule card, what the Hearth has already printed, or what
     the iron does. It may never name which slot is cut, which cut is which, which way the run goes, or
     the shape of the hum — those are one phone each, and this text lands on the screen all four share. */
  function wardReason(m) {
    const placed = [1, 2, 3, 4].filter(i => m[i]);
    if (!placed.length) return UNDER.none;
    if (placed.length < 3) return UNDER.few;
    if (placed.length > 3) return 'Three shapes, three words. A fourth makes a different ward, and the iron can tell.';
    if (placed.map(i => m[i]).slice().sort().join() !== ARCH.slice().sort().join()) return 'Those are not the three words cut over this door.';
    const missing = [1, 2, 3, 4].find(i => !m[i]);          // three of four slots are always a run
    /* There used to be a keyed line here for the board a table lays from the Prologue's rule -- 'begun at
       slot 1. Nothing on this ring says it begins at slot 1.' It named the axis the missing Binder holds,
       on the screen all four share, which is the whole of ADVERSARIAL 2. A wrong run now gets one line
       whichever way it is wrong, so the Hearth cannot tell a Binder-less table which half to change. */
    if ([1, 2, 3, 4].every(i => (m[i] || null) === (RING[i] || null))) return true;   // derived: see RING
    return 'The iron does not answer. Something under the soot disagrees with what you have made.';
  }

  /* One scene for the three ways of talking past the captain: the branch swaps three sentences.
     Each option still writes its own DOOR value in ch3_door — ch4 branches on all five. */
  const STAND = {
    /* ch1: the captain stood in the side passage through the whole offer, and heard the Reader's answer. */
    BLUFF: {
      said: 'It is the Envoy\'s own offer, word for word. The captain heard the Reader say yes to it.',
      captain: 'Then the Envoy will see you at his door. With the child.',
      wren: 'You lied to a man with a *rope*. With a straight face. Last time you were *terrible*.',
    },
    WORD: {
      said: 'You do not have to raise your voices. The captain already knows.',
      captain: 'The Envoy said you had given your word, and that I was to let you go about it however you chose.',
      wren: 'Why is he letting us go? What did you say to him? …Fine. Don\'t tell me.',
    },
    WRIT: {
      /* ch2: the Binder's red thread to Sorrel "pulls tight" when her guards come for the Ember. The writ
         is a second loan on the same thread. The captain reads it closely ("every line, then the seal"): ch4's
         queued fix for "nobody read it closely" should say so in those words rather than "twice". */
      said: 'The Binder holds out Master Sorrel\'s writ, one-handed. The captain reads every line, then the seal. The Binder\'s red thread to Sorrel pulls tighter.',
      captain: 'The Envoy holds the Crown\'s writ. This one is the Convocation\'s. I was not sent to start a war on a stair.',
      /* Sorrel's two votes kept Wren at the Vigil, the same night (ch1). On the unhurt branch her Ember was
         never paid (ch2), and on both the writ is a second loan on that thread: the cost is the silence. */
      wren: 'Sorrel. Twice in one night. I called her a goat once. To her face. …What does she get?',
      after: 'The Binder does not answer. The thread does not loosen.',
    },
  };

  Game.addChapter({
    id: 'ch3', label: 'Chapter III', title: 'The Whispering Gallery', start: 'ch3_start', code: L.chapter('ch3').word,
    mood: 'tense', fx: 'dust', art: 'ch3_gallery', flame: 0.7,
    flow: {
      nodes: [
        { id: 'ch3_start', label: 'The long gallery', col: 0, row: 2 },
        { id: 'ch3_grid', label: 'The corridors', col: 1, row: 2, kind: 'choice' },
        { id: 'ch3_bell4', label: 'A fourth bell', col: 1, row: 4, when: (s) => !!s.flags.WREN_SCARED, secret: true },
        { id: 'ch3_whispers', label: 'The laundry', col: 2, row: 2, secret: true, when: (s) => !!s.flags.LINEN },
        { id: 'ch3_thanks', label: 'Even the ones who lied', col: 3, row: 2 },
        { id: 'ch3_door', label: 'The Tower door', col: 4, row: 2, kind: 'choice' },
        { id: 'ch3_fight', label: 'Waking the ward', col: 5, row: 0, secret: true },
        { id: 'ch3_bluff', label: 'A bluff', col: 5, row: 1, secret: true, when: (s) => s.flags.DOOR === 'BLUFF' },
        { id: 'ch3_word', label: 'Vane\'s word', col: 5, row: 2, secret: true, when: (s) => s.flags.DOOR === 'WORD' },
        { id: 'ch3_writ', label: 'Sorrel\'s writ', col: 5, row: 3, secret: true, when: (s) => s.flags.DOOR === 'WRIT' },
        { id: 'ch3_surrender', label: 'Wren, handed over', col: 5, row: 4, secret: true },
        { id: 'ch4_start', label: 'The Oath', col: 6, row: 2, secret: true },
      ],
      edges: [['ch3_start', 'ch3_grid'], ['ch3_grid', 'ch3_bell4'], ['ch3_grid', 'ch3_whispers'], ['ch3_whispers', 'ch3_thanks'], ['ch3_thanks', 'ch3_door'],
        ['ch3_door', 'ch3_fight'], ['ch3_fight', 'ch3_surrender'], ['ch3_door', 'ch3_bluff'], ['ch3_door', 'ch3_word'], ['ch3_door', 'ch3_writ'], ['ch3_door', 'ch3_surrender'],
        ['ch3_fight', 'ch4_start'], ['ch3_bluff', 'ch4_start'], ['ch3_word', 'ch4_start'], ['ch3_writ', 'ch4_start'], ['ch3_surrender', 'ch4_start']],
    },
    scenes: {
      /* ---------- the search, the gallery and the brief, in one scene ---------- */
      ch3_start: {
        art: 'ch3_gallery', mood: 'tense', fx: 'dust', sfx: 'boom',
        title: 'The long gallery',
        text: (s) => [
          /* ch2 ends a lost vote with the Provost between the captain and Wren: nobody took Wren, so nobody
             took Wren back. "The child" is Vane's word, never the narrator's (ch1.js:155). */
          /* "a soldier on every stair" plants the Tower stair the chapter ends on. */
          s.flags.VOTE_LOST
            ? 'The nine voted Wren away. The Provost has not handed Wren over, so Lord Vane has put a soldier on every stair.'
            : 'The nine voted to keep Wren. Lord Vane bowed to the vote. Then he put a soldier on every stair.',
          /* "four came back" is the source of the Listener's ch5 letter (companion/ch5.js:317) and of ch6.js:845. */
          'The portraits in this gallery mutter. Only the Listener can make out the words: *four went down.* Then, fainter: *four came back.*',
          /* ch2's last line is the Hearth flickering and Wren flinching with it. It carries on here, and ch3_flow
             closes the chapter on the same gutter with Wren holding on instead. "A third" frame: the portraits
             here are of the dead. */
          (s.flags.WREN_HURT
            ? 'Wren waits between two frames, one arm strapped up in a strip of the Binder\'s cloak.'
            : 'Wren waits between two frames, as if posing for a third.')
            + ' Far below, the Hearth gutters, and Wren flinches. The Provost straightens Wren\'s collar without looking. Wren lets her.',
          /* The ward is asleep until the four wake it (ch3_door), and it is a Vigil ward, not Founders' work:
             "older than the school" is gone (companion/ch3.js, the Binder's page; companion/ch4.js:275). She
             rings the bells from the Tower, which is what makes the captain's rope a lie (ch3_flow). */
          { speaker: 'Provost Marrow', text: 'There is a ward on the door of the Bell Tower. Wake it, and Vane\'s men cannot pass. Get Wren there before the third bell. I ring the bells, and I will ring them slowly.' },
          /* The hum is the Listener's Wren-tab line ("humming the Ember's tune"), read at ch3_thanks. */
          s.flags.WREN_HURT
            ? '"Nobody sneaks anywhere in a sling," says the Seer, flatly.'
            : '"You\'re humming," says the Seer, flatly.',
          { speaker: 'Wren', text: s.flags.WREN_HURT ? 'Sneaking is mostly legs. I\'ve still got both of those.' : '*Quietly.* Seven years of sneaking out after the bells. Tonight she\'s ringing them for me.' },
        ],
        next: 'ch3_attune', button: 'Under the varnish',
      },
      ch3_attune: {
        type: 'code', art: 'ch3_gallery', mood: 'tense', fx: 'dust',
        /* "Up to the bells" is where she goes and what she does there: the captain's rope (ch3_door) is a lie a
           table can catch, and ch3_flow's bell is her. The code line sits last, so "the word, then the letters" has both. */
        text: [
          'The Reader is already bent over the oldest portrait\'s plaque. Wren slips a biscuit into the Reader\'s pocket.',
          'On her way up to the bells, the Provost touches the frame. The varnish lifts: one word, and three letters.',
          { text: 'Open the Companion. Take your seat. Type the word, then the letters.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Listener**. Voice (reads aloud): **the Binder**.', sightSeconds: 90,
        next: 'ch3_grid',
      },
      /* ---------- the corridors ---------- */
      ch3_grid: {
        type: 'puzzle', puzzle: 'grid', art: 'ch3_corridors', mood: 'dread', fx: 'dust',
        puzzleId: 'ch3_grid', par: [3, 5, 7], clearWidget: true,
        enter: (s) => { if (s.flags.CH3_SPOTTED == null) Store.set('CH3_SPOTTED', 0); },   // cumulative: a re-entry is not a clean sheet (the WREN_TRUST init in ch1's enter is the pattern)
        text: [
          /* The hand the Binder's Wren-tab line, ch3_door and ch3_flow all rely on, taken on screen. */
          'The Binder takes Wren\'s hand. Cold, as always. To the Tower door, in the dark, past two patrols.',
          { speaker: 'Wren', text: 'Listener, you call it. Say "now" and I go. Say "wait" and I\'ll try. I\'m bad at waiting.' },
          { text: 'Each page holds one thing. Say yours out loud before Wren moves.', cls: 'whisper' },
        ],
        config: gridConfig,
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          /* "when to move, not which way" was false: 412 of the 824 timing-correct schedules die on the route
             (the porter's rooms), which is the Binder's whole page. */
          'Most rooms are safe on some beats and not on others, and the beats come around again. So the question is when to move as well as which way — and no two of you can answer that between you. Ask for all four things before Wren moves.',
          (s) => s.flags.WREN_HURT
            ? 'A2, then A3. Speak the west word on turn 3, and the bad arm spends it, so Wren is in the laundry on turn 4. Wait once. The back seam spends turn 6. Then C3, D3, E3, E4, and the door on turn 11.'
            : 'A2, then A3, and speak the west word into the laundry on turn 3. Wait through turns 4, 5 and 6. The back seam on turn 7, then D3, E3, E4, and the door on turn 11.',
        ],
        onSolve: (s, r) => {
          Store.set('CH3_TURNS', r && r.turns);
          const seen = s.flags.CH3_SPOTTED || 0;
          Store.note(`Wren reached the Tower door on turn ${r && r.turns}${seen ? ', seen ' + seen + ' time' + (seen === 1 ? '' : 's') : ', never seen'}.`);
        },
        solvedText: (s, r) => [
          r && r.turns ? { text: `Turn ${r.turns}.`, cls: 'small' } : null,
          'The Tower door, iron-bound, and Wren flat against it, laughing without any sound.',
          s.flags.WREN_SCARED
            ? { speaker: 'Wren', text: 'She rang a *fourth* bell. She\'s never rung four. I\'m fine, Listener. My knees just haven\'t heard yet.' }
            : { speaker: 'Wren', text: 'Listener. You are *terrifying*. "Wait. Wait. Now." Like a very small general.' },
        ].filter(Boolean),
        next: 'ch3_whispers', button: 'The laundry',
      },
      /* ---------- the whispers ---------- */
      ch3_whispers: {
        type: 'token', art: 'ch3_laundry', mood: 'sorrow', fx: 'dust',
        enter: () => { Store.set('LINEN', true); },
        text: [
          /* "Earlier": the turns spent waiting in B3 (most safe routes pass through it), told after the run. Bess is on the Binder's
             corridor page, read aloud before Wren moved, and on the Listener's Wren tab. */
          'Earlier, in the laundry, Bess at the stove did not look up. She did not look up very carefully.',
          'Wren sat on the warm lid of the boiler, heels drumming. Then the drumming stopped.',
          /* The four told Wren the heart, the shadow and the thread in ch0 ("Knew. Knew. Guessed."). */
          { speaker: 'Wren', text: 'The whole school knows something about me and won\'t say it. You four did. So. One question each. Don\'t look at each other. And don\'t just be nice.' },
          { text: 'Every phone: **Pages**, and the word LINEN. Answer alone, then type back the sealed word your phone gives you.', cls: 'whisper' },
        ],
        prompt: 'Four sealed words, one from each phone.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i) => S.decode(L.channel('whisper', L.roles[i].id), tok, L.tokens.whisper[L.roles[i].id]),
        badText: 'The fire does not know that word. The sealed word is four letters, and the phone shows it only after you choose.',
        stuckText: 'Wren, patient: "The four letters it gave you after you picked. Not before."',
        /* Writes WHISPER_reader, WHISPER_listener, WHISPER_seer and WHISPER_binder, plus TRUTHS.
           ch8 reads all five; the values may not change. The truth map itself is L.whisperTruth in
           js/content/lore.js -- it used to be written out here AND in ch8's fallback AND (until this
           sweep) in ch6, three copies in three chapters that cannot edit one another. */
        onTokens: (values, s) => {
          const truth = L.whisperTruth;
          let truths = 0;
          /* +1 for answering at all, once: the Menu's "Replay scene" re-runs this, and every other cost in
             this file is guarded against exactly that. TRUTHS is unset until the first answer. */
          const first = s.flags.TRUTHS == null;
          values.forEach((v, i) => { const r = L.roles[i].id; s.flags['WHISPER_' + r] = v; if (v === truth[r]) truths++; });
          s.flags.TRUTHS = truths;
          if (first) s.flags.WREN_TRUST = (s.flags.WREN_TRUST || 0) + 1;
          Store.note('Wren asked each of you a question in the dark. Each of you answered.');
        },
        button: 'Seal the words',
        next: 'ch3_thanks',
      },
      ch3_thanks: {
        /* The soldiers arrive in the next scene, so the art leaves them out here. */
        art: 'ch3_towerdoor', artParams: { soldiers: false }, mood: 'sorrow', fx: 'dust',
        /* Four "Received"s, one each, then Wren's "All of you": Wren's knock from the Prologue, one each and
           then all together, and this time the last beat comes. */
        text: (s) => {
          /* "Even the ones who lied" is true on any night with a bluff, a lie or a kindness in it (ch8 labels
             them). On a night with none, Wren says it anyway and watches: a test, not a verdict, and it gives
             no seat's answer away. A night without all four answers (a chapter-select jump) reads as usual. */
          const f = s.flags, answered = ['reader', 'listener', 'seer', 'binder'].every(r => f['WHISPER_' + r]);
          const none = answered && !(f.WHISPER_reader === 'TELL' || f.WHISPER_listener === 'LOUD' || f.WHISPER_binder === 'YES');
          return [
            'Received. Received. Received. Received. One each, like Wren\'s knock.',
            'Back at the Tower door, Wren looks at you one at a time. For once, the joke does not come. The last beat does.',
            { speaker: 'Wren', text: 'Thank you. All of you. Even the ones who lied.' },
            'Nobody asks which ones that means.' + (none ? ' Wren watches to see who looks away.' : ''),
            { text: 'Open your **Wren** tab. Read your line to Wren, out loud, Reader first.', cls: 'whisper' },
          ];
        },
        next: 'ch3_door', button: 'Turn around',
      },
      /* ---------- the Tower door ---------- */
      ch3_door: {
        type: 'choice', art: 'ch3_towerdoor', mood: 'dread', fx: 'dust', sfx: 'alarm', choice: 'TOWER_DOOR',
        /* Silence defaults to the door, never to handing Wren over: every other timed choice in this game
           defaults to the passive option, and surrender is the harshest outcome in the chapter. */
        timer: 75, timerText: '*Seventy-five heartbeats. He is counting them.*', timeout: 'fight',
        text: (s) => {
          /* ch1: the Seer refused the Envoy with "No. And the name is Wren." Vane: "Then I will ask again later,
             when it costs more." This is later, and it costs the Provost. */
          /* Read the way ch1's own stats line reads it (ch1.js, ch1_after): not accepted, not pretended, not
             timed out. A refusal by choice record alone missed every route that carries only the flags. */
          const refused = !s.flags.VANE_ACCEPT && !s.flags.VANE_PRETEND && !s.flags.VANE_OFFER_timedout;
          return [
            /* Wren answers two of the four lines just read (docs/VOICE.md, no roll calls): the Listener's
               "Breathe now" and the Binder's "I am not letting go". */
            { speaker: 'Wren', text: 'I\'m breathing, Listener. Look. Binder, you can let go now. …No? Fine. You lot are going to make me cry on a —' },
            'Lantern-light fills the stair behind you. Vane\'s captain, the one who learned your faces, and six soldiers, in no hurry. The Binder steps in front of Wren, still holding on.',
            /* The rope is a lie: the Provost is up in the Tower, ringing the bells (ch3_flow says so). The last
               barb keeps the poison of the old line, that Marrow means Wren to walk (ch4's oath pays it). */
            { speaker: 'The captain', text: (refused ? 'The Envoy asks again, and it costs more now. ' : '') + 'Hand over the child, or the Provost hangs. The Envoy has her in the Great Hall with a rope over the beam. He wants the child alive. Ask your Provost what *she* wants. I am not a cruel man. I am a punctual one.' },
            /* The bells going quiet is what makes the threat worth weighing, and it is what ch3_flow's one slow
               bell answers. Wren's hand goes to the collar she straightened in the gallery (ch3_start). */
            (s.flags.VANE_ACCEPT ? 'He looks at the Listener a beat longer than he looks at Wren. '
              : refused ? '"The name is Wren," says the Seer. ' : '')
              + 'Far above, the bells have gone quiet. Wren touches the collar.',
          ];
        },
        prompt: 'The ward is asleep. The captain is not. Choose, together.',
        /* Each deal is spent by the seat that made it: the Reader lied to Vane (ch1, "Badly"), the Listener
           said yes, the Binder holds Sorrel's writ. The Seer, who goes first (ch1), calls the ward. */
        options: [
          { id: 'fight', text: 'Seer: "We wake the ward."', sub: 'Three shapes are cut over it. It takes four hands.', next: 'ch3_fight' },
          { id: 'bluff', text: 'Reader: "Lord Vane\'s orders. We are bringing him the child."', sub: 'You told the Envoy you would.', cls: 'bright', if: (s) => !!s.flags.VANE_PRETEND, next: 'ch3_stand', set: { DOOR: 'BLUFF' }, note: 'You bluffed the captain with the Envoy\'s own offer.' },
          { id: 'word', text: 'Listener: "The Envoy has my word. Stand aside."', sub: 'You said yes. His captain knows it.', cls: 'bright', if: (s) => !!s.flags.VANE_ACCEPT, next: 'ch3_stand', set: { DOOR: 'WORD' }, note: 'The captain let Wren pass on Vane\'s word.' },
          { id: 'writ', text: 'Binder: "This is the Convocation\'s seal. Read it, captain. Please."', sub: 'Sorrel gave you her writ.', cls: 'bright', if: (s) => !!s.flags.SORREL, next: 'ch3_stand', set: { DOOR: 'WRIT' }, note: 'Sorrel\'s writ turned the captain back.' },
          { id: 'surrender', text: 'Give Wren to the captain.', sub: 'The Provost lives.', cls: 'dark', next: 'ch3_surrender', set: { DOOR: 'SURRENDERED', SURRENDERED: true, WREN_TRUST: (s) => (s.flags.WREN_TRUST || 0) - 2 }, note: 'You handed Wren to the captain at the Tower door.' },
        ],
      },
      /* ---------- the threshold ---------- */
      ch3_fight: {
        type: 'puzzle', puzzle: 'ring', art: 'ch3_towerdoor', mood: 'tense', fx: 'dust',
        puzzleId: 'ch3_fight', par: [2, 3.5, 5], clearWidget: true,
        text: (s) => [
          /* "A ring" here, because the rule card says "Nothing on this ring" and the Binder counts around one. */
          s.flags.TOWER_DOOR_timedout && 'Nobody answers. Wren turns to the door instead.',
          'Three shapes are cut into the arch. Below them, four sooty slots make a ring.',
          { speaker: 'Wren', text: s.flags.WREN_HURT ? 'Four hands. Don\'t count mine. I\'ve only got the one.' : 'Four hands. Don\'t count mine. They\'re shaking.' },
          { text: 'Every phone: **Pages**, and the word WARD.', cls: 'whisper' },
        ].filter(Boolean),
        config: (s) => {
          const cfg = {
          title: 'THE THRESHOLD OF THE BELL TOWER',
          /* "Ward", not "sigil": the Binder's page keeps that word for the Founders' rings, and this is not one. */
          note: 'Wren, flat against the door: *Four slots in the soot. Three words go in and one slot stays empty. Nothing on this ring says which slot it begins in. That was left to the Binders. And the captain will not wait past three tries'
            + ((s.flags.WARD_TRIES | 0) ? ' — and he has counted ' + num(s.flags.WARD_TRIES | 0) + '.*' : '.*'),
          slots: 4, glyphs: glyphPalette(), allowEmpty: true, showArrow: false, marks: [],
          check: (m) => wardCheck(m, cfg), maxTries: wardBudget(s),
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to wake the ward', submitText: 'Wake the ward',
          wrongText: 'The soot stays soot. Frost creeps into the slots and the ring forgets.',
          };
          return cfg;
        },
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          /* "the only question is where the run begins" left out the direction, the Binder's second bit, and
             a table that trusted it ran the Prologue's way round and laid a wrong board. */
          'A ring is a loop: it has no first slot, and the empty one is not a fifth thing to choose — it is whatever the three words do not reach. So what is left is where the run begins and which way it runs. Those answers are on two phones.',
          /* Derived, never typed out: a rung that restates the answer by hand is what broke ch4's oath
             (ADVERSARIAL 18). tools/check-hints.js runs this text through wardCheck on every build. */
          ARCH.map((w, i) => w + ' in slot ' + Object.keys(RING).find(k => RING[k] === w)).join(', ')
            + '. Slot ' + [1, 2, 3, 4].find(i => !RING[i]) + ' stays empty. Then four hands.',
        ],
        /* The losing branch writes DOOR and SURRENDERED here, not only in ch3_surrender's `enter`: once the
           ring has resolved the puzzle is markSolved, and a table that opens the Menu at that moment and
           presses "Replay scene" is shown "This ward has already been opened" and continued past the
           surrender scene by engine.js:84, which calls a function `next` without the result and so reads
           'ch3_flow'. That path used to leave DOOR unset, and ch4 and ch5 both branch on it. */
        onSolve: (s, r) => {
          /* The art is set when a scene is entered, so the door would only catch (or go cold) one scene late. */
          if (r && r.failed) { Store.set('WARD_COLD', true); Store.set('DOOR', 'SURRENDERED'); Store.set('SURRENDERED', true); Store.note('Three cold sigils at the Tower door, and the captain stopped waiting.'); try { Game.setArt('ch3_towerdoor', { ward: 'cold' }); } catch (e) {} return; }
          Store.set('DOOR', 'FIGHT'); Store.note('You woke the threshold ward on the Tower door.'); try { Game.setArt('ch3_towerdoor', { ward: 'ash' }); } catch (e) {}
        },
        solvedText: (s, r) => (r && r.failed) ? [
          'The third try goes into the soot, and the soot stays soot.',
          { speaker: 'The captain', text: 'Enough. I gave you longer than I was told to.' },
          /* Not "closes on": ch3_surrender has Wren go down the stair "without being touched". */
          'A gauntlet reaches for Wren. Wren steps forward before it lands.',
        ] : [
          'The ward wakes. Not light. *Heat*, a wall of it, and every lantern on the stair goes out together.',
          /* Not "Founders' work": the Binder's page says this is a Vigil ward and not a Founders' ring. */
          { speaker: 'The captain', text: 'Old work. So. Not tonight, then.' },
          'He backs his men down the stair without turning around.',
          /* The ward's words, said aloud rather than in small type, set against ch0's "That is the school's
             translation." The table makes the one step. Saying "Not one born of four" is ch6's (ch6.js:834). */
          '"Ash. Thorn. Knot," the Reader reads. "*Fire, go through, four as one.*" Nobody says the school\'s translation out loud.',
          /* Wren's hands are always cold (ch0). The door is warm, not Wren: ch8 keeps that payoff. */
          'Wren stays pressed to the hot iron long after the rest of you step back.',
          { speaker: 'Wren', text: 'It\'s warm. All the way through. Is that what you lot feel like?' },
        ],
        next: (s, r) => (r && r.failed) ? 'ch3_surrender' : 'ch3_flow', button: 'The stair',
      },
      /* ---------- talked past, three ways ---------- */
      ch3_stand: {
        art: 'ch3_towerdoor', mood: 'court', fx: 'dust',
        text: (s) => {
          const k = STAND[s.flags.DOOR] || STAND.BLUFF;
          /* The ward stays asleep on these three roads (ch4 and ch5 read only FIGHT as woken), but the arch is
             still read: the chapter's one line of the Founders' words is not kept behind one door. */
          return [
            k.said,
            { speaker: 'The captain', text: k.captain },
            { speaker: 'Wren', text: k.wren },
            k.after,
            'The lanterns go back down the stair. He is, as he said, a punctual man. He will be punctual later.',
            'By the last of the lantern-light, the Reader reads the arch out loud. *Fire, go through, four as one.* Wren makes the Reader say it again, slower.',
          ].filter(Boolean);
        },
        next: 'ch3_flow', button: 'The Tower stair',
      },
      ch3_surrender: {
        art: 'ch3_towerdoor', artParams: (s) => ({ ward: s.flags.WARD_COLD ? 'cold' : null }), mood: 'sorrow', fx: 'ash',
        enter: () => { Store.set('DOOR', 'SURRENDERED'); Store.set('SURRENDERED', true); },
        text: (s) => [
          s.flags.WARD_COLD
            ? 'Nobody says it out loud. The ring would not wake, and the captain took that for an answer.'
            : 'One of you says it, and the others do not say otherwise, which is the same thing.',
          { speaker: 'Wren', text: 'Right. Yes. She\'d do the same for me. Tell Mom — tell the Provost I said the corridors were *easy*.' },
          'Wren goes down the stair between two soldiers without being touched, and looks back once, at nobody in particular.',
          /* Narration, not an instruction. True either way: ch3_flow says why. */
          'The Provost will not hang tonight.',
        ],
        next: 'ch3_flow', button: 'The empty stair',
      },
      /* ---------- the flowchart ---------- */
      ch3_flow: {
        /* The captain and his men have gone down the stair on every path, and on the surrender path Wren with them. */
        type: 'flow', art: 'ch3_towerdoor', mood: 'hearth', fx: 'dust',
        artParams: (s) => ({ ward: s.flags.DOOR === 'FIGHT' ? 'ash' : (s.flags.WARD_COLD ? 'cold' : null), soldiers: false, wren: s.flags.DOOR !== 'SURRENDERED' }),
        /* The night's answer, as a sound. The Provost rings the bells from the Tower (the rule card, the
           fourth bell, "I will ring them slowly"), and they went quiet while the captain talked (ch3_door), so
           one slow bell above the stair is her, and the captain's rope was a lie. She comes DOWN after Wren:
           ch4.js:337 "The Provost went down and took the child back". The last line answers ch3_start's
           flinch at the same gutter, instead of repeating ch2's closer. */
        text: (s) => [
          /* The table chose the door over her neck, as far as it knew. One beat of that before the bell. */
          s.flags.DOOR !== 'SURRENDERED' && 'Nobody says the Provost\'s name.',
          'Above you, at the top of the Tower stair, a bell rings, slowly. Only one person in this school rings the bells.',
          'There was never a rope.',
          s.flags.DOOR === 'SURRENDERED'
            ? 'The Provost is coming down the stair after Wren, alive and furious. Far below, the Hearth gutters. Nobody is holding Wren\'s hand.'
            : 'Far below, the Hearth gutters. This time Wren does not flinch, and holds on to the Binder instead.',
          /* "Punctual" is the captain's word, and midnight is Vane's (ch1: "before midnight"). On the surrender
             path the empty hand is the hook. */
          s.flags.DOOR !== 'SURRENDERED' && 'Down the stair, a punctual man is waiting for midnight.',
          { text: 'The chart shows the paths you took, and the ones you didn\'t.', cls: 'small' },
        ].filter(Boolean),
        flowTitle: 'Chapter III — the paths you walked',
        stats: (s) => {
          const seen = s.flags.CH3_SPOTTED | 0, bells = s.flags.CH3_BELLS | 0;
          const run = s.flags.CH3_TURNS
            ? `Wren reached the Tower on turn ${s.flags.CH3_TURNS}, ${seen ? (seen === 1 ? 'seen once' : 'seen ' + seen + ' times') : 'never seen'}${bells ? ', after ' + bells + ' more bell' + (bells === 1 ? '' : 's') : ''}.`
            : 'Wren never reached the Tower door.';
          const door = ({ FIGHT: 'you woke the ward', BLUFF: 'you bluffed the captain', WORD: 'you spent the Envoy\'s word', WRIT: 'you spent Sorrel\'s writ', SURRENDERED: 'you handed Wren over' })[s.flags.DOOR] || 'nothing was decided';
          return `${run} Wren asked four questions in the laundry and four sealed answers came back. At the door, ${door}. Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch4_start', button: 'The Oath',
      },
    },
  });
})();
