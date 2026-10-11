/* Chapter II — The Ember Vault (Seer drives, Reader is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, UI = window.VigilUI, Store = window.VigilStore;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch2-niche { display: flex; flex-direction: column; gap: 7px; }
    .ch2-niche .inscription-svg { max-width: 210px; }
    .ch2-niche .ch2-label { font-family: var(--display); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-dim); }
    .ch2-sheet { color: #b9bcc6; background: rgba(150,156,170,0.10); border: 1px solid rgba(190,196,210,0.22); border-radius: 3px; padding: 6px 10px; filter: blur(.45px); user-select: none; line-height: 0; }
    .ch2-sheet svg { display: block; width: 100%; height: auto; max-height: 92px; opacity: .8; }
    .ch2-count { font-size: 15px; line-height: 1.4; color: var(--ink-dim); border-left: 2px solid rgba(212,169,78,0.4); padding: 4px 10px; margin: 2px 0 6px; min-height: 38px; }
    .ch2-count b { color: var(--gold-2); }
    /* The door has to fit a laptop: the panel does not shrink itself, so shrink it here. */
    body[data-chapter="ch2"] .dialseq .pz-note { font-family: var(--serif); font-size: 15px; line-height: 1.45; letter-spacing: 0; text-transform: none; white-space: normal; }
    body[data-chapter="ch2"] .dialseq .pz-status { font-family: var(--serif); font-size: 16px; letter-spacing: 0; text-transform: none; line-height: 1.4; color: var(--ink); min-height: 18px; }
    body[data-chapter="ch2"] .dialseq .pz-status.bad { color: #ffb0a0; }
    body[data-chapter="ch2"] .dialseq .dials { gap: 12px; }
    body[data-chapter="ch2"] .dialseq .dial .dial-face { width: 84px; height: 84px; }
    body[data-chapter="ch2"] .dialseq .dial .dial-face svg { width: 48px; height: 48px; }
    body[data-chapter="ch2"] .dialseq .palette-grid { max-width: 470px; gap: 6px; margin-top: 4px; }
    body[data-chapter="ch2"] .dialseq .glyph.name-only { width: 88px; height: 40px; }
    body[data-chapter="ch2"] .dialseq .seq-list { min-height: 30px; padding: 4px 10px; }
    @media (max-height: 760px) {
      body[data-chapter="ch2"] .dialseq .dials { gap: 10px; }
      body[data-chapter="ch2"] .dialseq .dial .dial-face { width: 58px; height: 58px; }
      body[data-chapter="ch2"] .dialseq .dial .dial-face svg { width: 34px; height: 34px; }
      body[data-chapter="ch2"] .dialseq .glyph.name-only { width: 80px; height: 30px; }
      body[data-chapter="ch2"] .dialseq .glyph.name-only .gname { font-size: 12px; }
      body[data-chapter="ch2"] .dialseq .pz-note { font-size: 13px; line-height: 1.35; }
      body[data-chapter="ch2"] .dialseq .seq-list { min-height: 22px; padding: 3px 8px; }
      .ch2-count { font-size: 13px; min-height: 28px; padding: 2px 8px; margin: 0 0 4px; }
      .ch2-niche { gap: 5px; }
      .ch2-niche .inscription-svg { max-width: 150px; }
      .ch2-niche .pz-title { font-size: 12px; }
      .ch2-niche .ch2-label { font-size: 10px; }
      .ch2-sheet { padding: 4px 8px; max-height: 58px; overflow: hidden; }
      .ch2-sheet svg { max-height: 50px; }
    }
  ` })); } catch (e) { /* headless shim */ }

  /* ---------- the door in the antechamber ----------
     One number set, 1..4, for plinths, dials and the old holes alike. The Hearth shows four worn plinths,
     four dials and a lintel; it shows no shape and no map. Four facts, one to a phone:

       WORDS    the word cut into each plinth                                    Reader
       CUTFOR   the hole under the older floor each plinth was cut to stand in   Seer
       CONTOUR  the steps the door hums from one word to the next                Listener
       Law 3    a drill is not a Law, and where two Laws disagree the older binds   Binder

     THREE ways to count this door, and the Hearth prints all three, because a fork of two on a
     commit-once puzzle is a coin: the dial a plinth stands over (Law 9, Order's, 212), the dial it was
     cut for (Law 13, Founders', Year 0) and the drill the school has taught since that floor was laid —
     one, two, three, four, in the order the door hums. Dating them is the Binder's whole seat.

     Brute-forced over every believable committed count — an ordered four turns, four different dials,
     four different words from the palette of eight, 4! x 8P4 = 40,320 — by
     scratchpad/ch012/ch2-field.js, which first reproduced this comment's previous table exactly
     (1 / 72 / 24 / 23 / 2, pairs 48 / 24 / 552 / 72 / 72 / 576 / 72). A subset's candidates are the
     counts consistent with the pages it holds:
       all four ......... 1      drop the Reader .. 72     drop the Listener . 24
       drop the Seer .... 22     drop the Binder ... 3
       (The Seer's 22 excludes the floor AND the drill; the others exclude the floor only. Under the
       floor-only model the Seer's figure is 23. r0 art check, MAY 16.)
       Reader+Seer 70 · Reader+Listener 24 · Seer+Listener 72 · Listener+Binder 72 · Reader+Binder 552 ·
       Reader alone 576 · Listener alone 72 · Seer or Binder alone 40,320.
     (The old note said 98,304 for those last two: 4! x 8^4, which counts counts that repeat a word.
     Four plinths carry four different words and the room can see that, so the honest space is 8P4.)

     Two things those numbers used to hide.
     (a) The Binder's fork was two counts against one commit — a coin, on the chapter's only puzzle.
         The drill is the third, and it is the one the room's own schooling proposes, so a Binder-less
         table now guesses at 1 in 3 and knows it is guessing.
     (b) CUTFOR was [2, 3, 4, 1] — FLOOR turned by exactly one sunwise. A uniform sunwise offset is the
         only kind of offset this game ever shows a table (companion/ch0.js:134 teaches the word out
         loud and ring.js draws the arrow on every ring), so a Seer-less table looking for structure
         had four candidates, three once the Binder ruled out the floor, and the shipped answer was the
         one the Prologue drilled: a recorded 1-in-23 that was really 1-in-3. CUTFOR is now [3, 4, 2, 1]
         — not a rotation of [1, 2, 3, 4], not its own inverse, and still a derangement, so no member of
         the guessable family is the answer and the Seer has to be heard.
         THE COUNT THE DOOR ACCEPTS DID NOT MOVE. The word -> hole map is frozen (EMBER 2, THORN 3,
         VEIL 4, KNOT 1); WORDS was permuted with CUTFOR, so which word is cut on which plinth changed
         and the committed answer did not. Every script that opened this door still opens it.
         The Reader's permanent Book copies the new plinth order (companion/book.js:102).
         Still open there: the Listener's Book example (book.js:113-115) is this door's own contour in
         this door's answer order, which hands a Reader-less table the word set (r0 art check, MUST 1).
     G.orderingsMatching(WORDS, CONTOUR) returns exactly one ordering, so the answer is unique.
     The door counts ONCE, so none of those subsets can search. */
  const WORDS = ['THORN', 'VEIL', 'EMBER', 'KNOT'];        // Reader   — plinth 1..4
  const CUTFOR = [3, 4, 2, 1];                             // Seer     — plinth 1..4 -> the hole it was cut for
  const CONTOUR = [1, 3, -2];                              // Listener — up one, up three, down two
  const FLOOR = [1, 2, 3, 4];                              // public   — the dial each plinth stands over
  const ORDER = G.orderingsMatching(WORDS, CONTOUR)[0];    // THORN, KNOT, VEIL, EMBER
  /* dial 3 -> THORN, dial 1 -> KNOT, dial 4 -> VEIL, dial 2 -> EMBER */
  const ANSWER = ORDER.map(g => ({ dial: String(CUTFOR[WORDS.indexOf(g)]), glyph: g }));
  /* public — the drill: the four words on dials 1..4, in the order the door hums */
  const DRILL = ORDER.map((g, i) => ({ dial: String(i + 1), glyph: g }));

  /* A count, judged. Pure: hand it the turns and nothing else. */
  function judge(turns) {
    const gs = turns.map(t => t.glyph), ds = turns.map(t => t.dial);
    if (turns.length !== 4) return { form: 'short', n: turns.length };
    if (new Set(ds).size !== 4) return { form: 'twice' };
    const strange = gs.filter(g => WORDS.indexOf(g) < 0).length;
    const at = (map) => (g) => String(map[WORDS.indexOf(g)]);
    const onHoles = !strange && gs.every((g, i) => ds[i] === at(CUTFOR)(g));
    const onFloor = !strange && gs.every((g, i) => ds[i] === at(FLOOR)(g));
    const onDrill = !strange && turns.every((t, i) => t.dial === DRILL[i].dial);
    const ordered = gs.join() === ORDER.join();
    const ok = turns.every((t, i) => t.dial === ANSWER[i].dial && t.glyph === ANSWER[i].glyph);
    return { form: 'count', strange, onHoles, onFloor, onDrill, ordered, ok };
  }

  /* What the door gives back. Each line names the clause that stopped it. Free lines cost nothing. */
  const DOOR = {
    none: 'No turns yet. A count is four, one word to each dial, and it is called once.',
    short: 'The door hears what you gave it, and lets it go. A count is four, one word to each dial.',
    twice: 'Two of those turns are the same dial. One word to each, and there are four.',
    floor: 'Every word went to the dial its own plinth stands over. The lintel was cut before this floor was laid.',
    drill: 'One, two, three, four, the way the school drills it. A drill is not a Law.',
    order: 'The right words on the right dials, and the door heard them in an order it has never hummed.',
    /* True on every count that reaches it, a repeated word included (r0 art check, MUST 3). */
    dialmap: 'Every word you gave is on a plinth here. At least one sits on a dial its plinth was not cut for.',
    one: 'One of those words is cut into no plinth in this room.',
    some: 'Some of those words are cut into no plinth in this room.',
    other: 'Four turns, and not one of them was what the door was waiting for.',   // unreachable: every count lands above
  };
  function receipt(spent, why) {
    try { const el = document.getElementById('ch2-count'); if (el) el.innerHTML = UI.rich((spent ? '**The count has been called.** ' : '**Nothing spent.** ') + why); } catch (e) { /* headless */ }
    return why;
  }

  /* The niche strip, left to right: Spike-inverted, Crown-inverted, Hook-inverted. No mark on the Hearth.
     From the left it reads WELL, EMBER, VEIL; from its mark at the right, KNOT, CROWN, THORN.
     (This used to say ch7 quotes the second reading verbatim and must not be changed. It does not:
     grep for KNOT, CROWN, THORN outside this file returns docs/DESIGN.md:139 and nothing else. The
     array is ch2's own, and the sentence it reads is the one ch2_strip prints eight lines below.) */
  const STRIP = [{ shape: 'Spike', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];

  /* Mere's sheet: a sheet of lead, scratched in the older alphabet of the door chalk, which the table has
     not learned. The strokes are ch4's OLD_RUNES (js/content/ch4.js, copied byte for byte from that table;
     edit there first), so the sheet is the same alphabet the Chapter IV primer teaches. The letters are a
     seeded scramble, not Mere's words: nobody can read this sheet tonight, and nobody can read it later
     off a screenshot either. No signature on its face: her name is cut on the plinth (r0 audit A10). */
  const OLD_RUNES = {
    A: 'M10,2 L10,26 M10,8 L18,14', B: 'M10,2 L10,26 M10,2 L18,10 L10,18', C: 'M16,4 L4,14 L16,24', D: 'M10,2 L10,26 M2,14 L18,14',
    E: 'M10,2 L10,26 M2,20 L10,14 L18,20', F: 'M10,2 L10,26 M10,6 L18,12 M10,14 L18,20', G: 'M6,2 L14,2 L14,26 L6,26', H: 'M6,2 L6,26 M14,2 L14,26 M6,10 L14,18',
    I: 'M10,2 L10,26', J: 'M10,2 L10,20 L4,26', K: 'M10,2 L10,26 M18,6 L10,14 L18,22', L: 'M10,2 L10,26 M10,26 L18,20',
    M: 'M4,2 L4,26 M16,2 L16,26 M4,2 L16,26', N: 'M4,2 L4,26 M16,2 L16,26 M4,26 L16,2', O: 'M10,4 L18,14 L10,24 L2,14 Z', P: 'M10,2 L10,26 M2,10 L10,2 L18,10',
    R: 'M10,2 L10,26 M2,20 L10,26 L18,20', S: 'M16,4 L6,10 L14,18 L4,24', T: 'M2,6 L18,6 M10,6 L10,26', U: 'M4,2 L10,26 L16,2',
    V: 'M4,4 L16,24 M16,4 L4,24', W: 'M2,4 L10,14 L18,4 M10,14 L10,26', Y: 'M10,2 L10,26 M2,20 L18,8', Z: 'M4,6 L16,6 M4,22 L16,22 M10,6 L10,22',
  };
  function oldSheet() {
    const keys = Object.keys(OLD_RUNES);
    let seed = 41; const r = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const cell = 13, rowH = 22, rows = 4, width = 420; let s = '';
    for (let row = 0; row < rows; row++) {
      let x = 4 + Math.floor(r() * 10);
      while (x < width - cell) {
        const n = 2 + Math.floor(r() * 5);
        for (let k = 0; k < n && x < width - cell; k++, x += cell) {
          s += `<path d="${OLD_RUNES[keys[Math.floor(r() * keys.length)]]}" transform="translate(${x},${4 + row * rowH}) scale(0.6)" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
        }
        x += 8;
      }
    }
    return `<div class="ch2-sheet" aria-label="a sheet of lead, scratched in letters you cannot read"><svg viewBox="0 0 ${width} ${rows * rowH + 4}">${s}</svg></div>`;
  }

  Game.addChapter({
    id: 'ch2', label: 'Chapter II', title: 'The Ember Vault', start: 'ch2_start', code: 'KNOT',
    mood: 'wonder', fx: 'dust', art: 'ch2_antechamber', flame: 0.8,
    flow: {
      nodes: [
        { id: 'ch2_start', label: "The Provost's errand", col: 0, row: 1 },
        { id: 'ch2_door', label: 'The door that counts once', col: 1, row: 1, kind: 'choice' },
        { id: 'ch2_counted', label: 'It counted you', col: 2, row: 0, secret: true, when: () => Store.chose('CH2_DOOR', 'counted') },
        { id: 'ch2_crawled', label: 'You crawled in', col: 2, row: 2, secret: true, when: () => Store.chose('CH2_DOOR', 'crawled') },
        { id: 'ch2_niche_found', label: "Mere's niche", col: 3, row: 0, kind: 'choice', secret: true, when: () => Store.chose('CH2_NICHE', 'mere') },
        { id: 'ch2_strip', label: 'Four went through', col: 4, row: 0, secret: true, when: () => Store.chose('CH2_STRIP', 'right') },
        { id: 'ch2_rubbing', label: 'The rubbing', col: 4, row: 2, secret: true, when: (s) => !!s.flags.LETTER },
        { id: 'ch2_ember', label: 'The Cold Ember', col: 3, row: 1 },
        { id: 'ch2_stairfall', label: 'The stair falls', col: 5, row: 1, kind: 'choice' },
        { id: 'ch2_grab_wren', label: 'Caught Wren — the Ember fell', col: 6, row: 0, secret: true, when: () => Store.chose('CH2_STAIR', 'wren') },
        { id: 'ch2_grab_ember', label: 'Caught the Ember — Wren fell', col: 6, row: 2, secret: true, when: () => Store.chose('CH2_STAIR', 'ember') },
        { id: 'ch2_sorrel', label: 'The Convocation took the Ember', col: 7, row: 2, kind: 'end', secret: true, when: (s) => !!s.flags.SORREL && Store.chose('CH2_STAIR', 'ember') },
        { id: 'ch3_start', label: 'The Whispering Gallery', col: 7, row: 1, secret: true },
      ],
      edges: [
        ['ch2_start', 'ch2_door'], ['ch2_door', 'ch2_counted'], ['ch2_door', 'ch2_crawled'],
        ['ch2_counted', 'ch2_niche_found'], ['ch2_crawled', 'ch2_niche_found'],
        ['ch2_niche_found', 'ch2_strip'], ['ch2_niche_found', 'ch2_rubbing'],
        ['ch2_counted', 'ch2_ember'], ['ch2_crawled', 'ch2_ember'], ['ch2_niche_found', 'ch2_ember'],
        ['ch2_ember', 'ch2_stairfall'], ['ch2_stairfall', 'ch2_grab_wren'], ['ch2_stairfall', 'ch2_grab_ember'],
        ['ch2_grab_wren', 'ch3_start'], ['ch2_grab_ember', 'ch3_start'], ['ch2_grab_ember', 'ch2_sorrel'],
      ],
    },
    scenes: {
      /* ---------- the Provost's errand ---------- */
      ch2_start: {
        art: 'ch2_stair', artParams: { down: true, unlit: true }, mood: 'court', fx: 'dust', sfx: 'step',
        title: 'The Great Hall, after the bell',
        /* The errand itself is given at the end of Chapter I (ch1_errand, ch1_lost). This is the leaving.
           "Seer first, as you said": the Seer said "Then I go first" at the end of ch1, in her hearing. */
        text: (s) => [
          'Behind the tapestry, past the hand under the paint, a stair goes down into the dark. Most old schools have a stair like this. Most of them end at the laundry.',
          { speaker: 'Provost Marrow', text: 'Seer first, as you said. That vault was rebuilt once, and the rebuilding was not honest.' },
        ].concat(s.flags.VOTE_LOST ? [
          'By the fire, Wren sits between two soldiers and mouths something at you. It is probably rude.',
          'When the soldiers look away, Wren points at the stair and winks.',
        ] : [
          'Wren is already on the top step.',
          { speaker: 'Wren', text: 'I\'ll stay put. Look at me staying put. You bring the Ember up, the fire stays lit, and nobody walks anywhere.' },
          'Wren says the last part quickly, the way you carry something hot.',
          /* Plants "Yes, Binder, I promised" on the stair. A promise makes a thread (ch0, ch1). Not Wren's. */
          '"Promise?" says the Binder. "Promise," says Wren. No thread comes. None ever has.',
        ]),
        next: 'ch2_descent', button: 'Down',
      },
      ch2_descent: {
        art: 'ch2_stair', artParams: { down: true }, mood: 'wonder', fx: 'dust', sfx: 'step', flame: 0.8,
        text: [
          'The stair goes down past the laundry. Well past. Torches, then fewer torches, then a blue light from below.',
          'On the first landing, the Reader finds a biscuit in a pocket that was empty at the top. Seven years, and Wren has never once been caught.',
          /* ch0: "I keep making plans for next spring. I can't get Wren into any of them." */
          'Nobody says the sum out loud. Ember up, fire lit, nobody walks. For once, the Seer can fit Wren into a plan.',
          'Halfway down, the Listener turns to check on Wren, out of habit. The step behind is empty. It did not sound empty.',
        ],
        next: 'ch2_antechamber', button: 'The bottom',
      },
      ch2_antechamber: {
        art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'open',
        title: 'The bottom of the stair',
        text: [
          'Four hooded Founders stand in a row, carved by a mason who could not do faces. Each plinth carries one worn shape.',
          /* Names swapped for numbers: the Reader's offense is the chapter's (the school says "the child"). */
          'Where the Founders\' names should be, somebody has bolted bronze plates, numbered one to four. The Reader looks personally offended.',
          'Each statue looks down at the dial in the floor with the same number.',
          'Beyond them, a door with no handle and no lock, which is the most locked a door can be.',
          { text: 'Only one of you can see under this floor.', cls: 'whisper' },
        ],
        next: 'ch2_attune', button: 'Attune',
      },
      ch2_attune: {
        type: 'code', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust',
        text: [
          'Cut into the lintel: the word and mark on the screen. The Founders left almost no notes, so the Reader copies this one down.',
          { text: 'Open the Companion. Take your seat. Type the word and mark.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Seer**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch2_door',
      },
      /* ---------- the door that counts once ---------- */
      ch2_door: {
        type: 'puzzle', puzzle: 'dialseq', art: 'ch2_antechamber', mood: 'tense', fx: 'dust', puzzleId: 'ch2_door', par: [3, 4.5, 6],
        text: [
          { text: 'Read your pages aloud first. Four turns, one word on each dial.', cls: 'whisper' },
          { text: 'One count only. A wrong one does not end the night.', cls: 'small' },
        ],
        config: () => ({
          title: "THE FOUNDERS' DOOR",
          note: 'The lintel: *Four plinths, four dials. Turn all four, one word each, in the order the door hums. The door counts **once**.* Three rules say which dial a word goes on: the dial its plinth **stands over**, the dial it was **cut for**, or **one to four** in turn. Only one of them binds.',
          html: '<div class="ch2-count" id="ch2-count">One count. It has not been called yet.</div>',
          dials: [1, 2, 3, 4].map(n => ({ id: String(n), label: String(n) })),
          glyphs: glyphPalette(), maxTurns: 4,
          submitText: 'Try the door',
          successText: 'The door counts to four, and remembers the count.',
          check: (turns) => {
            const j = judge(turns);
            if (j.form === 'short') return receipt(false, j.n ? DOOR.short : DOOR.none);
            if (j.form === 'twice') return receipt(false, DOOR.twice);
            return true;   // a whole count is a count, and the door hears only one
          },
        }),
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'Three ways to count this door, and the card names all three. Which one it was cut to obey is a question of dates, and only one of you can date them.',
          /* Generated, never written out twice: ch4's oath is what a hand-copied last rung costs on a
             puzzle that commits once. tools/check-hints.js puts this string back through check(). */
          'Dial ' + ANSWER.map(a => a.dial + ' to ' + a.glyph).join('. Then dial ') + '. Then press *Try the door*.',
        ],
        onSolve: (s, r) => {
          const j = judge((r && r.turns) || []);
          Store.choose('CH2_DOOR', j.ok ? 'counted' : 'crawled');
          Store.note(j.ok ? 'The door counted once, and it counted you.' : 'The door counted once and stopped. You went in under the lintel.');
        },
        solvedText: (s, r) => {
          const j = judge((r && r.turns) || []);
          if (j.ok) { receipt(true, 'The door opens.'); return [
            'The door does not open so much as remember that it was never really shut.',
            { text: 'THORN, KNOT, VEIL, EMBER. *A gate. Together. Hidden. Kept.*', cls: 'small' },
            'The Reader says *Kept* twice.',
          ]; }
          /* Right dials in the wrong order is the order line, even on dials one to four: the drill line is
             only for the drill itself, the hummed order on dials 1..4 (r0 art check, MUST 4 and MAY 15). */
          const why = j.onFloor ? DOOR.floor : (j.onHoles && !j.ordered) ? DOOR.order : (j.onDrill && j.ordered) ? DOOR.drill
            : j.strange === 1 ? DOOR.one : j.strange > 1 ? DOOR.some
            : !j.strange ? DOOR.dialmap : DOOR.other;
          receipt(true, why);
          return [
            why,
            /* ch0: Wren's knock, one each, then all together: "everybody's here". Wren is on the stair behind them. */
            'It counts to four and stops, like Wren\'s knock without the last beat, the one that means everybody\'s here.',
            'The rebuilders left themselves a gap under the door. You go in on your hands and knees.',
            '"They didn\'t trust their door either," says the Seer, and goes first.',
          ];
        },
        clearText: true,
        next: 'ch2_opened', button: 'Into the vault',
      },
      ch2_opened: {
        type: 'choice', art: 'ch2_vault', mood: 'wonder', fx: 'motes', choice: 'CH2_VAULT', sfx: 'reveal',
        text: [
          'The vault is older than the school. The school is the lid.',
          'In the middle, under glass, a blue flame breathes and gives no heat.',
          'It beats slow, in time with something a long way above. It hums a tune only the Listener can hear.',
          'The Cold Ember. Upstairs, the fire is waiting. So is Wren.',
        ],
        /* Vane, every path in ch1: "Bring the child to me before midnight." The clock gets a plain line. */
        prompt: 'The Ember is two steps away. Somewhere above, a bell rings the quarter. Vane said midnight.',
        options: [
          { id: 'ember', text: 'Binder: "We came for the Ember. We take it and go."', next: 'ch2_ember' },
          { id: 'niche', text: 'Seer: "Back to the first plinth. Humor me."', next: 'ch2_niche' },
        ],
      },
      /* ---------- the niche behind the first plinth (optional) ---------- */
      ch2_niche: {
        type: 'custom', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'reveal',
        enter: () => { if (!Store.chose('CH2_NICHE', 'mere')) { Store.choose('CH2_NICHE', 'mere'); Store.note('You found the niche behind the first plinth.'); } },
        text: [
          'Behind the first plinth is a hollow the rebuilders missed.',
          'Inside, a strip of stone with three shapes, and a sheet of lead pinned flat.',
          'It is scratched in the same letters as the chalk under Wren\'s name on your door.',
          'The Reader has been losing to that chalk all year. "I can\'t read it. *Yet.*"',
          /* The name under the bronze (ch2_antechamber), cut again where the rebuilders never looked, in
             letters anyone can read. The sheet stays unreadable until ch4's primer. "Her name was" so that
             "Mere", read aloud, is heard as a name. */
          'On the back of the plinth, where no bronze reached, a Founder\'s name is cut in plain letters. Her name was Mere.',
        ],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch2-niche' });
          box.appendChild(wrap);
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: "MERE'S NICHE" }));
          wrap.appendChild(UI.el('div', { class: 'ch2-label', text: 'the strip — three shapes, left to right' }));
          wrap.appendChild(UI.el('div', { html: G.inscription(STRIP, { showMark: false }) }));
          const status = UI.el('div', { class: 'pz-status' }); wrap.appendChild(status);
          wrap.appendChild(UI.el('div', { html: oldSheet() }));
          const say = (cls, t) => { status.className = 'pz-status ' + cls; status.textContent = t; };
          api.button('Read it left to right', () => {
            Store.choose('CH2_STRIP', 'left'); api.audio.sfx('wrong');
            /* The school has never seen this strip (a hollow the rebuilders missed): its translation of the
               prophecy runs the same way. r0 audit A3. */
            say('bad', 'WELL, EMBER, VEIL — one went down alone and kept it. The school\'s prophecy, near enough. The school has not noticed the mark is at the other end.');
          }, '');
          api.button('Read it from its mark', () => {
            Store.choose('CH2_STRIP', 'right'); api.audio.sfx('reveal');
            /* The Reader says it, and the table hears the contrast with the prophecy without a narrator's thesis. */
            say('good', 'KNOT, CROWN, THORN. "Four, as one, went through," the Reader reads, twice. Nobody says "one born of four." Nobody has to.');
          }, '');
          if (Store.get('LETTER')) say('good', 'The rubbing is folded into the Reader\'s sleeve.');
          else {
            const rub = api.button('Take a rubbing', () => {
              Store.set('LETTER', true); Store.note('The Reader took a rubbing of Mere\'s sheet.');
              api.audio.sfx('reveal'); rub.disabled = true;
              say('good', 'Charcoal, a torn page, thirty seconds. The Reader cannot read a word of it, and is keeping it anyway.');
            }, '');
          }
          api.button('Leave the sheet. Take the Ember', () => { UI.clear(api.actions); resolve('ch2_ember'); }, 'primary');
        }),
        next: 'ch2_ember',
      },
      /* ---------- the Cold Ember ---------- */
      ch2_ember: {
        art: 'ch2_vault', artParams: { empty: true }, mood: 'wonder', fx: 'motes', sfx: 'magic',
        text: (s) => [
          /* "Go and read to it. Tonight." (ch1_errand, won); on a lost vote it is the Reader's own idea.
             "I have tried every winter of Wren's life" (ch1, the Provost on the Ember). */
          'The Reader reads the plinth words to the Ember' + (s.flags.VOTE_LOST ? '.' : ', as the Provost said.')
            + ' The whole case comes up, no ward, no click. ' + (s.flags.VOTE_LOST ? 'The Provost' : 'She') + ' tried every winter of Wren\'s life.',
          'Four old threads end at the case. The Binder watches them go slack.',
          'The hands carrying it go numb to the wrist, so you take turns. The flame leans toward whoever holds it.',
          '"Next time, gloves," says the Seer. The Listener does not laugh. Wren\'s hands are always like this.',
          s.flags.LETTER ? 'The Reader keeps checking the sleeve with the rubbing in it, like a pocket in a crowd.' : 'The vault is very quiet without it.',
        ],
        next: 'ch2_road', button: 'The archway',
      },
      ch2_road: {
        art: 'ch2_vault', artParams: { empty: true, arch: true }, mood: 'dread', fx: 'motes', flame: 0.75,
        text: [
          'Behind the Ember\'s empty plinth, an archway bricked shut with newer stone. Frost grows through the mortar, from the far side. One brick carries a date.',
          { text: '*Closed and made good. 212.*', cls: 'small' },
          /* The Binder's own ch0 line, "Walk is the school's word." Law 0, "COLD is written by four hands",
             struck in 212 (the Binder's page, lore.js): the thread to "four, as one". companion/ch6.js:266
             pays what 212 cost. */
          '"Made good," says the Binder. "The school\'s word, like *walk*. Same year they struck the Law about four hands."',
          /* The Seer sees what is hidden, and keeps it: the Cold is on the other side (ch0: "The Cold is a place"). */
          'The Seer looks through the bricks once and does not say what is there.',
          'Wren will want every word of this, twice, with the boring parts left in.',
        ],
        next: 'ch2_stairfall', button: 'Up',
      },
      /* ---------- the stair falls (timed, 30 s) ---------- */
      ch2_stairfall: {
        type: 'choice', art: 'ch2_stair', artParams: { broken: true, down: true }, mood: 'tense', fx: 'ash', sfx: 'boom', choice: 'CH2_STAIR', flame: 0.75,
        /* Text and reply share one box: three paragraphs here and three in the longer reply, at most 150
           words on the worst branch (VOTE_LOST, the case caught). The shadow is the Seer's to tell: the
           Seer's Wren tab ("Nobody saw. I made sure.") is read aloud on this landing. */
        text: (s) => [
          /* The case falls first, into Wren's arms below. Then the rebuilders' newer steps give, between. */
          'Halfway up, numb hands drop the case. '
            + (s.flags.VOTE_LOST
              ? 'It tumbles down, into the arms of a child who was under guard twenty minutes ago.'
              : 'It tumbles down, into the arms of a child who promised to stay put.')
            + ' Then the newer steps start to go.',
          { speaker: 'Wren', text: s.flags.VOTE_LOST
            ? 'You *left* without me. The soldiers are fine, Listener, before you ask. Also you dropped this. Also the stairs are going. Also —'
            : 'You *left* without me. Yes, Binder, I promised. Also you dropped this. Also the stairs are going. Also —' },
          /* The four are on the older steps above. Wren is below, within one reach, so either catch can happen. */
          'The step under Wren tilts. Wren is one long reach below, one arm for the case and one for you.',
        ],
        prompt: 'One reach. What do you catch?',
        timer: 30, timerText: '*Thirty heartbeats. The stair is going.*', timeout: 'wren',
        options: [
          { id: 'wren', text: 'Catch Wren.', sub: 'The Ember goes where the stair goes. So does the sum.', next: 'ch2_top', set: { EMBER_LOST: true }, note: 'At the stair, you caught Wren and let the Ember fall.',
            after: [
              /* "Seven years, and Wren has never once been caught." (ch2_descent, the biscuit) */
              'Eight hands close on one thin wrist and haul. The case turns once, and the dark takes it without a sound. Seven years, and somebody has finally caught Wren.',
              '"Ow. Thank you. Ow," says Wren. "You do know the box was the plan." It is not much of a joke. Wren has not had time to work on it. Nobody lets go for a while.',
              { text: 'Open your **Wren** tab. Read Wren your line, Reader first.', cls: 'whisper' },
            ] },
          { id: 'ember', text: 'Catch the case.', cls: 'dark', sub: 'Wren is quick. Wren will manage.', next: 'ch2_top', set: { WREN_HURT: true }, note: 'At the stair, you caught the Ember and Wren fell.',
            after: [
              'Wren throws. The case comes up into eight numb hands. Wren does not. Nobody here will forget the sound. "I\'m fine," Wren calls up. "It\'s only my arm. Listener, don\'t look like that. You got the box."',
              /* The four's own beat, before the Wren tab: they chose the box, and nobody apologizes. */
              'The Binder\'s cloak, torn into a rope, gets Wren up. The Listener checks the arm anyway. Nobody says sorry. Wren would only be nice about it.',
              { text: 'Open your **Wren** tab. Read Wren your line, Reader first.', cls: 'whisper' },
            ] },
        ],
      },
      /* ---------- the top of the stair ---------- */
      ch2_top: {
        art: 'ch1_hall', artParams: { aside: true, low: true }, mood: 'sorrow', fx: 'dust', sfx: 'step', flame: 0.75,
        enter: (s) => { if (s.flags.SORREL) { Store.set('EMBER_LOST', true); if (Store.chose('CH2_STAIR', 'ember')) Store.note('At the top of the stair, the Convocation\'s guards took the Ember.'); } },
        /* Opens on Wren's answer to the four Wren-tab lines read on the landing (ch2_stairfall). */
        text: (s) => {
          const wren = Store.chose('CH2_STAIR', 'wren');
          /* Wren answers two of the four (docs/VOICE.md, no roll calls): the Listener's "walk with us" and the Seer's box. */
          const out = [{ speaker: 'Wren', text: 'Fine, Listener. Next time I\'ll walk *with* you. And Seer, I didn\'t follow the box. I followed you. The box was just shiny.' }];
          out.push('The Provost holds the tapestry aside, as if she had not moved since she sent you. '
            + (s.flags.SORREL
              /* ch1, Sorrel path: the Binder's promise put a red thread to her. Now the loan falls due. */
              ? 'Behind her are two of the Convocation\'s guards, which is how the Convocation says please. They have come for it. The Binder\'s red thread to Master Sorrel pulls tight.'
              : s.flags.ORIEL
                ? 'Behind her is Master Oriel, with a lamp she does not need and a notebook she does. You promised her everything you found below.'
                : 'Behind her, nobody. You promised no Master anything tonight.'));
          /* SORREL with the case caught: the loan falls due on screen, and she pays it looking at Wren. */
          out.push(wren
            ? 'You tell the Provost all of it. She does not look down the stair once. She looks at Wren.'
            : 'The Provost takes the case in both hands. Then she sees how Wren is holding one arm.'
              + (s.flags.SORREL ? ' She hands the case to the guards without looking at it.' : ''));
          out.push({ speaker: 'Provost Marrow', text: wren ? 'Then we do without it. Come up. All of you.' : 'Who did —' });
          /* Six paragraphs on the worst branch (VOTE_LOST, the case caught): the captain shares the last one. */
          const guard = s.flags.VOTE_LOST ? 'Vane\'s captain waits in the corridor for what the vote gave him. The Provost puts herself between him and Wren.' : '';
          if (!wren) out.push('She has started that sentence over every scraped knee Wren ever had. She does not finish it now.' + (guard ? ' ' + guard : ''));
          else if (guard) out.push(guard);
          /* The tender beat goes last, so no joke stands next to it (docs/VOICE.md rule 5). */
          out.push('Wren holds out ' + (wren ? 'a wrist' : 'the good wrist') + ' to the Binder, for the thread, and hums. The Listener heard that tune tonight, under the glass.');
          return out;
        },
        next: 'ch2_flow', button: 'The night moves on',
      },
      ch2_flow: {
        type: 'flow', art: 'ch1_hall', artParams: { low: true, wren: true }, mood: 'hearth', fx: 'dust',
        /* The night's answer, with Wren there to see it. The door is the chart's to recap, not this text's.
           Shown wherever the case came up, the Provost's or the Convocation's (SORREL): the fire refuses it.
           Only when the four caught Wren, and the Ember is at the stair's foot, is it said instead. */
        text: (s) => [
          Store.chose('CH2_STAIR', 'wren')
            ? '"The Ember would not have mattered," says the Provost, and does not say how she knows.'
            : 'The Ember goes to the Hearth. The fire draws back from it, the way most people draw back from cold hands.',
          /* Read from its mark, the strip reaches Wren before the night ends. */
          Store.chose('CH2_STRIP', 'right') && 'The Reader tells Wren what the strip says. *Four, as one.* Wren asks for it again, slower.',
          'The Hearth flickers, and this time it does not stop. Wren flinches with every flicker. It is not midnight yet.',
        ].filter(Boolean),
        flowTitle: 'Chapter II — the paths you walked',
        stats: (s) => {
          const door = Store.chose('CH2_DOOR', 'crawled') ? 'You went in the way the rebuilders did.' : 'You counted the door open.';
          const niche = Store.chose('CH2_NICHE', 'mere')
            ? (s.flags.LETTER ? 'You found Mere\'s niche and took the rubbing.' : 'You found Mere\'s niche and left the sheet.')
            : 'Something in the antechamber went unlooked-at.';
          const end = (s.flags.WREN_HURT ? 'Wren\'s arm is broken' : 'Wren is unhurt')
            + ', and ' + (s.flags.EMBER_LOST
              ? ((s.flags.SORREL && Store.chose('CH2_STAIR', 'ember')) ? 'the Ember went to the Convocation.' : 'the Ember is at the bottom of the stair.')
              : 'the Ember came up.');
          return `${door} ${niche} ${end} Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch3_start', button: 'The Whispering Gallery',
      },
    },
  });
})();
