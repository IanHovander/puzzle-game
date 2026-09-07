/* Chapter V — The Long Stair (Reader drives, Listener is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, S = window.VigilShared;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const F = (s) => s.flags;
  const law0 = (s) => !!(F(s).LAW0 || F(s).LETTER_READ || F(s).TAPESTRY || F(s).ORIEL);

  (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch5-count { font-family: var(--display); font-size: 110px; text-align: center; color: var(--gold-2); letter-spacing: .1em; line-height: 1.1; min-height: 130px; text-shadow: 0 0 30px rgba(242,210,122,.35); }
    .ch5-count.go { color: var(--sea); }
    .ch5-count-sub { text-align: center; color: var(--ink-dim); font-style: italic; margin-top: 6px; }
    .ch5-name { font-family: var(--display); font-size: 30px; text-transform: uppercase; text-align: center; color: var(--gold-2); letter-spacing: .12em; margin: 8px 0; }
    body[data-chapter="ch5"] .ring-pz .pz-note { white-space: normal; font-family: var(--serif); font-size: 16px; letter-spacing: 0; text-transform: none; line-height: 1.45; color: var(--ink); }
    body[data-chapter="ch5"] .ring-pz .pz-status { font-family: var(--serif); font-size: 16px; letter-spacing: 0; text-transform: none; line-height: 1.45; color: var(--ink); }
    body[data-chapter="ch5"] .ring-pz .pz-status.bad { color: #ffb0a0; }
    body[data-chapter="ch5"] .ring-pz .pz-status.good { color: var(--moss); }
    body[data-chapter="ch5"] .wheel { width: min(38vh, 360px); height: min(38vh, 360px); }
    @media (max-height: 820px) {
      body[data-chapter="ch5"] .wheel { width: min(30vh, 260px); height: min(30vh, 260px); }
      body[data-chapter="ch5"] .wheel-wrap { flex-wrap: nowrap; align-items: flex-start; gap: 14px; }
      body[data-chapter="ch5"] .ring-pz .pz-note { font-size: 14px; line-height: 1.35; }
      body[data-chapter="ch5"] .palette-grid .glyph.name-only { width: 78px; height: 40px; }
    }
  ` }));

  /* ---------- Mere's two gates: one rule, used twice ------------------------------------------
     A bell's count says which slot its word takes, counted round the ring from the cut a sigil
     begins at, that cut's own slot being one.

       items    what is cut, shape by shape, in the order it was cut      Reader — both words for each
       markEnd  which end of the carving carries the mason's mark         Seer
       cuts     a scratch, a notch and a chip, and which slot each is at  Seer
       counts   the bell hanging over each shape                          Listener
       the rule a sigil begins at a scratch, never at a notch or a chip;
                a carving marked at its right-hand end runs against the
                slot numbers, one marked at its left runs with them —
                the newer Law says with them always, the older Law
                disagrees, and the older binds; and where a carving shows
                COLD the newer Law leaves the slot empty and the older
                writes it                                                 Binder

     The word "mark" means what the shared Book (companion/book.js) means by it — the end of the
     carving — and never a cut in the ring. The ring's cuts are the Book's own three: a scratch,
     a notch, a chip in the glaze.

     The Hearth shows none of it: no carving on the board (the art draws the lintel worn past
     reading) and showArrow:false, so the hub prints no SUNWISE arrow.

     Enumerated over all 19,081 legal boards (5 slots, 8 glyphs, no repeats, empties allowed)
     against the shipped check(): each gate has exactly ONE winner, in both Law-0 states.
       gate 1  {1:WELL, 3:EMBER, 5:VEIL}, slots 2 and 4 empty
       gate 2  {1:WELL, 2:ASH, 4:CROWN, 5:KNOT}, slot 3 empty — and the same board with COLD at 3
               instead of empty once Law 0 is back in the Book. Exactly one of those two wins,
               and which one is the Binder's third clause.
     Boards still consistent with the pages that remain when one role is dropped (a dropped role's
     axis ranges over everything its page would have fixed: the Reader's the ordered word list, the
     Listener's the counts, the Seer's the marked end and all five start slots, the Binder's the
     three cuts x two directions x writing COLD or not) — each set containing exactly one winner:
       gate 1  no Reader 336 · no Listener 60 · no Seer 10 · no Binder 6
       gate 2  no Reader 10,920 · no Listener 240 · no Seer 20 · no Binder 12
     No three pages reach a single board at either gate, so the answer is not derivable from any
     three. Guessing is bounded rather than taxed: each gate answers four times and then stops, and
     no frost line says which axis was wrong (naming the axis turned a six-board field into a guided
     binary search). A Binder-less table therefore clears gate 1 with p = 4/6 and both gates with
     p = 4/6 x 4/12 = 2/9, and pays five heartbeats a frost and ten a forced gate.

     W1.counts is [3,1,5] and not [3,1,4] on purpose. The shared Book tells the Reader that a
     carving marked on the right is read right to left with every glyph inverted, so a table will
     often name the words backwards. With [3,1,4] the reversed list zipped against the bells landed
     on the winning board anyway, so a table could learn the direction Law inside out and still win.
     With [3,1,5] it does not. The chip exists so that "which kind of cut starts a sigil" is a
     three-way and not a coin flip. */
  const W1 = {
    items: [{ shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }],
    markEnd: 'right', scratch: 4, notch: 2, chip: 5, counts: [3, 1, 5], startKind: 'chip',
  };
  const W2 = {
    items: [{ shape: 'Crown', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: true }],
    markEnd: 'left', scratch: 3, notch: 5, chip: 2, counts: [2, 5, 1, 3, 4], startKind: 'notch',
  };
  const N = 5, GATE_TRIES = 2, COUNT = '3534', COUNT_TRIES = 3;
  const reading = (w, end) => w.items.map(it => { const g = G.read(it.shape, it.inv); return end === 'right' ? G.invert(g) : g; });
  const dirOf = (end) => end === 'right' ? -1 : 1;
  /* The four facts -> the board, and nothing else decides it. */
  function place(words, counts, start, dir, writeCold) {
    const m = {};
    words.forEach((wd, i) => { const s = (((start - 1) + dir * (counts[i] - 1)) % N + N) % N + 1; if (wd === 'COLD' && !writeCold) return; m[s] = wd; });
    return m;
  }
  const W1_WORDS = reading(W1, W1.markEnd);      // EMBER · VEIL · WELL
  const W2_WORDS = reading(W2, W2.markEnd);      // CROWN · ASH · COLD · KNOT · WELL
  const DIR1 = dirOf(W1.markEnd), DIR2 = dirOf(W2.markEnd);
  const START1 = W1[W1.startKind], START2 = W2[W2.startKind];
  const ANS1 = place(W1_WORDS, W1.counts, START1, DIR1);
  const ANS2 = place(W2_WORDS, W2.counts, START2, DIR2);
  const ANS2_COLD = place(W2_WORDS, W2.counts, START2, DIR2, true);
  /* Where the count actually lands COLD: derived, never a literal. Moving the start cut moved this
     slot from 3 to 5, and a hardcoded 3 would have silently stopped GATE2_COLD ever being set. */
  const COLD_SLOT = (() => { for (let i = 1; i <= N; i++) if (ANS2_COLD[i] === 'COLD') return i; return 0; })();
  const same = (m, want) => { for (let i = 1; i <= N; i++) if ((m[i] || null) !== (want[i] || null)) return false; return true; };
  const filled = (m) => { const o = []; for (let i = 1; i <= N; i++) if (m[i]) o.push(m[i]); return o; };
  const inARow = (m) => { const k = filled(m).length; if (k < 2 || k >= N) return false;
    for (let s = 1; s <= N; s++) { let ok = true; for (let j = 0; j < k; j++) if (!m[((s - 1 + j) % N) + 1]) ok = false; if (ok) return true; } return false; };

  /* The frost ledger is two flags, not a variable: the game ships a Resume path and a paste-a-save
     path that reload the page, and a counter in module scope would refund every frost the table
     paid. Five heartbeats a frost and ten a forced gate come off the choice on the stair.
     No frost line names the axis that was wrong; what escalates is the try, not the diagnosis. */
  const frost = (k, line) => { Store.inc(k); return line; };
  const frostLine = (n) => n === 2 ? 'Frost. Wren, from the step above: "Has everyone actually said their one thing?"'
    : n === 3 ? 'Frost. A sigil begins at one cut and runs one way round. Both of those are the Binder\'s.'
      : n >= GATE_TRIES ? 'Frost, and the gate stops answering.' : null;
  const gateFrosts = (s) => [s.flags.GATE1_FROST | 0, s.flags.GATE2_FROST | 0];
  const forcedGates = (s) => gateFrosts(s).filter(n => n >= GATE_TRIES).length;
  /* The oath was refused in Chapter IV: that is what Mere's door on this stair is for. */
  const unsworn = (s) => !!s.flags.REFUSED_OATH || (F(s).OATH | 0) === 0;
  let doorNoted = false;

  Game.addChapter({
    id: 'ch5', label: 'Chapter V', title: 'The Long Stair', start: 'ch5_start', code: 'ASH',
    mood: 'dread', fx: 'motes', art: 'ch5_stair', flame: 0.3,
    flow: {
      nodes: [
        { id: 'ch5_start', label: 'The Long Stair', col: 0, row: 2 },
        { id: 'ch5_door', label: 'Mere\'s door', col: 1, row: 0, secret: true },
        { id: 'ch5_gate1', label: 'Mere\'s first gate', col: 1, row: 2 },
        { id: 'ch5_marches', label: 'The world ends at a ledge', col: 2, row: 2 },
        { id: 'ch5_gate2', label: 'The Silent Gate', col: 3, row: 2 },
        { id: 'ch5_gate2_cold', label: 'The word nobody writes', col: 3, row: 0, kind: 'end', secret: true, when: (s) => !!F(s).GATE2_COLD },
        { id: 'ch5_count', label: 'The Founders\' Count', col: 4, row: 2 },
        { id: 'ch5_stair', label: 'The soldiers', col: 5, row: 2, kind: 'choice' },
        { id: 'ch5_collapse', label: 'A bell cracks', col: 6, row: 0, secret: true },
        { id: 'ch5_hold', label: 'A living anchor', col: 6, row: 2, secret: true },
        { id: 'ch5_hold_named', label: 'one of you stays', col: 7, row: 1, kind: 'end', secret: true, when: (s) => F(s).STAIR === 'HOLD' && F(s).VOLUNTEER > 0 },
        { id: 'ch5_hold_none', label: 'nobody stays', col: 7, row: 3, kind: 'end', secret: true, when: (s) => !!F(s).HOLD_NOBODY },
        { id: 'ch5_run', label: 'They follow', col: 6, row: 4, secret: true, when: (s) => F(s).STAIR === 'RUN' },
        { id: 'ch6_start', label: 'The Bells', col: 8, row: 2, secret: true },
      ],
      edges: [['ch5_start', 'ch5_door'], ['ch5_door', 'ch5_gate1'], ['ch5_start', 'ch5_gate1'], ['ch5_gate1', 'ch5_marches'], ['ch5_marches', 'ch5_gate2'], ['ch5_gate2', 'ch5_gate2_cold'], ['ch5_gate2', 'ch5_count'], ['ch5_count', 'ch5_stair'],
        ['ch5_stair', 'ch5_collapse'], ['ch5_stair', 'ch5_hold'], ['ch5_stair', 'ch5_run'], ['ch5_hold', 'ch5_hold_named'], ['ch5_hold', 'ch5_hold_none'], ['ch5_hold_none', 'ch5_run'],
        ['ch5_collapse', 'ch6_start'], ['ch5_hold_named', 'ch6_start'], ['ch5_run', 'ch6_start']],
    },
    scenes: {
      /* ---------- the descent ---------- */
      ch5_start: {
        art: 'ch5_stair', mood: 'dread', fx: 'motes', sfx: 'step', flame: 0.3,
        title: 'The Long Stair, an hour before midnight',
        enter: (s) => {
          doorNoted = false; Store.set('GATE1_FROST', 0); Store.set('GATE2_FROST', 0); Store.set('COUNT_LOST', 0);
          if (!F(s).LAW0 && law0(s)) Store.set('LAW0', true);
          if (F(s).OATH == null) Store.set('OATH', s.flags.REFUSED_OATH ? 0 : (F(s).OATH_KNOT ? 1 : 0));
        },
        text: (s) => {
          const t = ['Midnight is an hour away. The Hearth is a blue tongue the height of a hand.'];
          t.push({ speaker: 'Provost Marrow', text: 'Under this school there is a wound. The Founders shut it and left the fire on top to hold it.' });
          t.push({ speaker: 'Provost Marrow', text: 'The fire is going out. Tonight I take the child down and shut it again.' });
          t.push(unsworn(s)
            ? { speaker: 'Provost Marrow', text: 'You would not swear, so I do not take you. There is a door on this stair for the unasked.' }
            : { speaker: 'Provost Marrow', text: 'You swore in the study to see the child into the Cold. Then you come.' });
          t.push({ speaker: 'Wren', text: 'And I am the — what am I again? The occasion.' });
          t.push('She lifts the lantern and goes down. Wren goes after.');
          return t;
        },
        next: 'ch5_descent', button: 'Down',
      },
      ch5_descent: {
        art: 'ch5_foundations', mood: 'dread', fx: 'dust', sfx: 'step',
        text: [
          'The stair is older than the school. It goes down past the last stone anybody cut.',
          'Above you, boots. The Envoy\'s soldiers are on the stair.',
          { speaker: 'Provost Marrow', text: 'Mere warded this stair. She was one of the four who built the Hearth.' },
          { speaker: 'Provost Marrow', text: 'Her gates do not lie. They do not play fair. Read them together.' },
          'Cut into the first landing, worn almost away, a word.',
        ],
        next: 'ch5_attune', button: 'Read it',
      },
      ch5_attune: {
        type: 'code', art: 'ch5_foundations', mood: 'dread', fx: 'dust',
        text: [
          { text: 'Open the Companion. Take your seat. Type the word on the landing.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Reader**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        next: (s) => unsworn(s) ? 'ch5_door' : 'ch5_gate1',
      },
      /* ---------- the door, if the oath was refused ---------- */
      ch5_door: {
        art: 'ch5_foundations', mood: 'tense', fx: 'dust',
        enter: () => { if (!doorNoted) { doorNoted = true; Store.note('You came down by Mere\'s door, unasked.'); } },
        text: [
          'The lantern goes on down without you, and the dark closes over where it was.',
          'Then a draught at the first landing, and Wren standing in the wall.',
          { speaker: 'Wren', text: 'Mere left this one for people who were not asked. Mum will pretend she did not see.' },
          'Wren came back up three flights in the dark, for you.',
        ],
        next: 'ch5_gate1', button: 'Go down',
      },
      /* ---------- gate 1 ---------- */
      ch5_gate1: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 1 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate1', par: [2.5, 5, 7],
        text: [
          'Three shapes on the lintel, three bells above them, five slots below.',
          { text: 'Reader — what each shape says, both ways.', cls: 'whisper' },
          { text: 'Listener — the bell over each shape, and its count.', cls: 'whisper' },
          { text: 'Seer — which end is marked, and every cut on the ring.', cls: 'whisper' },
          { text: 'Binder — where a sigil begins, and which way round.', cls: 'whisper' },
          { text: 'All four out loud, before anybody touches the ring.', cls: 'whisper' },
        ],
        config: (s) => {
          const c = {
            title: 'THE FIRST GATE',
            note: 'Provost Marrow, low: *Three shapes, three bells. A bell\'s count says which slot its word takes. Count round from the cut a sigil begins at, and that cut\'s own slot is one. The Binder says which cut, and which way round. Slots the words do not reach stay empty. Two frosts and the gate stops answering.*',
            slots: N, glyphs: glyphPalette(), allowEmpty: true, showArrow: false,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
            maxTries: Math.max(1, GATE_TRIES - (F(s).GATE1_FROST | 0)),
            wrongText: 'Frost creeps over the ring. It resets.',
            onWrong: () => frostLine(F(s).GATE1_FROST | 0),
            check: (m) => {
              if (same(m, ANS1)) return true;
              /* An under-committed board is refused before it costs anything: the try is given back. */
              if (filled(m).length < 3) { c.maxTries++; return 'The gate counts three shapes and finds fewer. Nothing frosts yet.'; }
              if (inARow(m)) return frost('GATE1_FROST', 'Frost. The bells were ignored. Every bell says which slot its word takes.');
              return frost('GATE1_FROST', false);
            },
          };
          return c;
        },
        hints: [
          'Four answers, four people, nobody has two. The words — the Reader. The counts — the Listener. The cuts — the Seer. Where a sigil begins, and which way — the Binder.',
          'Three cuts on that ring, and only one kind starts a sigil. The Binder knows which kind, and which way the count then runs.',
          'WELL at 1, EMBER at 3, VEIL at 5. Slots 2 and 4 stay empty. Then four hands.',
        ],
        onSolve: (s, r) => {
          if (r && r.failed) Store.note('Mere\'s first gate would not open. The Provost broke it.');
          else Store.note('Mere\'s first gate: counted the older way round.' + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : ''));
        },
        solvedText: (s, r) => (r && r.failed) ? [
          'The gate stops answering. The Provost sets her palm flat on it.',
          { speaker: 'Provost Marrow', text: 'That was Mere\'s, and it was four hundred years old. Go down.' },
          'It breaks. Above you, the boots come a flight closer.',
        ] : [
          'The gate does not open so much as forget it was ever shut.',
          { speaker: 'Wren', text: 'Kept, hidden, down. Cheerful woman, Mere.' },
        ],
        next: 'ch5_marches', button: 'On down',
      },
      /* ---------- the ledge ---------- */
      ch5_marches: {
        art: 'ch5_marches', mood: 'wonder', fx: 'motes', sfx: 'reveal', flame: 0.28,
        text: [
          'The stair ends at a ledge, and the world ends with it.',
          'Below, a cavern with no far side, and drowned arches standing in black water.',
          'On a shelf above them, four thrones. Empty.',
          'And under all of it, glowing like a sky from beneath, the Cold. Nobody would say where it was.',
          { speaker: 'Wren', text: 'Four thrones. Four Founders. It is a *theme*.' },
        ],
        next: 'ch5_gate2', button: 'The second gate',
      },
      /* ---------- gate 2 ---------- */
      ch5_gate2: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 2, cold: 0.5 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate2', par: [2.5, 5, 7],
        text: [
          'Five shapes, five bells the Hearth cannot hear, and the same four jobs.',
          { text: 'Reader — what each shape says.', cls: 'whisper' },
          { text: 'Listener — every bell, and its count.', cls: 'whisper' },
          { text: 'Seer — which end is marked, and every cut on the ring.', cls: 'whisper' },
          { text: 'Binder — where a sigil begins, which way, and one word.', cls: 'whisper' },
          { text: 'All four out loud, before anybody touches the ring.', cls: 'whisper' },
        ],
        config: (s) => {
          const want = law0(s) ? ANS2_COLD : ANS2;
          const c = {
            title: 'THE SILENT GATE',
            note: 'Provost Marrow, quieter: *Five shapes, five bells. A bell\'s count says which slot its word takes. Count round from the cut a sigil begins at, and that cut\'s slot is one. The Binder says which cut, and which way round. One of the five words is one the Laws argue about. Two frosts and the gate stops answering.*',
            slots: N, glyphs: glyphPalette(), allowEmpty: true, showArrow: false,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
            maxTries: Math.max(1, GATE_TRIES - (F(s).GATE2_FROST | 0)),
            wrongText: 'Frost creeps over the ring. It resets.',
            onWrong: () => frostLine(F(s).GATE2_FROST | 0),
            check: (m) => {
              if (same(m, want)) return true;
              if (filled(m).length < 4) { c.maxTries++; return 'The gate counts five shapes and finds fewer. Nothing frosts yet.'; }
              return frost('GATE2_FROST', false);
            },
          };
          return c;
        },
        hints: [
          'Four answers, four people, nobody has two. The words — the Reader. The counts — the Listener. The cuts — the Seer. Where it begins, which way, and one word — the Binder.',
          'Three cuts here too, and only one kind starts a sigil. One of the five words is one the Laws argue about — also the Binder\'s.',
          (s) => law0(s)
            ? 'CROWN 1, KNOT 2, WELL 3, ASH 4, COLD 5. Then four hands.'
            : 'CROWN 1, KNOT 2, WELL 3, ASH 4, slot 5 empty. Then four hands.',
        ],
        onSolve: (s, r) => {
          const cold = !!(r && !r.failed && r.map && r.map[COLD_SLOT] === 'COLD');
          Store.set('GATE2_COLD', cold);
          Store.note(r && r.failed ? 'The Silent Gate would not open. The Provost broke that one too.'
            : cold ? 'The Silent Gate: you wrote the word nobody writes.' : 'The Silent Gate: you left the cold slot empty.');
        },
        solvedText: (s, r) => (r && r.failed) ? [
          'The gate stops answering, and the Provost breaks the second one too.',
          { speaker: 'Provost Marrow', text: 'Mere. Forgive me. There is a child on this stair.' },
          'The boots come another flight closer.',
        ] : (r && r.map && r.map[COLD_SLOT] === 'COLD') ? [
          'You wrote the word nobody writes, and the gate took it.',
          { speaker: 'Provost Marrow', text: 'That is not in the Book I was given.' },
          { speaker: 'Wren', text: 'It is in Mere\'s, apparently.' },
        ] : [
          'The gate counts five, finds four, and opens anyway.',
          { speaker: 'Wren', text: 'A gap in the middle. I would have written something.' },
        ],
        next: 'ch5_count_start', button: 'The third gate',
      },
      /* ---------- gate 3: the Founders' Count ---------- */
      ch5_count_start: {
        type: 'custom', art: 'ch5_gate', artParams: { n: 2, cold: 0.6 }, mood: 'tense', fx: 'motes',
        text: [
          'The third gate is not a door. It is a count.',
          { speaker: 'Provost Marrow', text: 'Mere\'s last ward. One question each, one number from the four of you.' },
          { text: 'Every phone: open SPEAK and find *The Founders\' Count*.', cls: 'whisper' },
          { text: 'On START, forty-five seconds. Then say your digit aloud, in seat order.', cls: 'whisper' },
        ],
        run: (box, api) => new Promise((resolve) => {
          const big = UI.el('div', { class: 'ch5-count', text: '' });
          const sub = UI.el('div', { class: 'ch5-count-sub', text: '' });
          box.appendChild(big); box.appendChild(sub);
          api.button('Count us in — 3, 2, 1', () => {
            UI.clear(api.actions);
            ['3', '2', '1', 'START'].forEach((t, i) => setTimeout(() => {
              if (!api.alive()) return;
              big.textContent = t; big.classList.toggle('go', t === 'START'); Audio.sfx(t === 'START' ? 'chime' : 'tick');
              if (t === 'START') {
                sub.textContent = 'Forty-five seconds. Then four digits, in seat order.';
                const c = UI.countdown(box, 45); c.promise.then(() => { if (api.alive()) { big.textContent = 'TIME'; big.classList.remove('go'); Audio.sfx('chime'); } });
                api.button('The digits are in', () => { c.cancel(); resolve('ch5_count'); }, 'primary');
              }
            }, i * 1000));
          }, 'primary');
        }),
      },
      ch5_count: {
        type: 'puzzle', puzzle: 'answer', art: 'ch5_gate', artParams: { n: 2, cold: 0.6 }, mood: 'tense', fx: 'motes', puzzleId: 'ch5_count', par: [1.5, 4],
        text: ['Four digits, one number, in seat order. A wrong digit is everybody\'s job.'],
        config: (s) => {
          /* Not a permutation of one run of digits: with 2,3,4,5 any three roles handed the fourth
             its digit by elimination. Two roles now count 3 and the set has a gap.
             The budget is a Store flag, not a widget-local counter: the game ships a Resume path and a
             paste-a-save path that call location.reload(), and a reload was handing the ward back all
             three hearings -- which is the whole cost this puzzle leans on. */
          const c = {
            title: 'THE FOUNDERS\' COUNT',
            note: 'The Reader\'s number, then the Listener\'s, then the Seer\'s, then the Binder\'s. Four digits, typed as one. The ward hears three answers and then stops.',
            fields: [{ label: 'the count', placeholder: '· · · ·', len: 4 }], submitText: 'Count', maxTries: Math.max(1, COUNT_TRIES - (F(s).COUNT_LOST | 0)),
            accept: (v) => v[0] === COUNT,
            onWrong: (v, tries) => {
              const w = v[0] || '';
              /* Nothing but four digits is an answer, and the ward does not spend a hearing on it. */
              if (w.length !== 4 || /\D/.test(w)) { c.maxTries++; return 'Four digits, and only digits. The ward does not count that as an answer.'; }
              Store.inc('COUNT_LOST');   // a well-formed wrong answer is spent, and stays spent across a reload
              const left = c.maxTries - tries;
              if (left <= 0) return 'The ward has stopped saying how close you are. That was the last.';
              if (left === 1) return 'The ward has stopped saying how close you are. One answer left.';
              let n = 0; for (let i = 0; i < 4; i++) if (w[i] === COUNT[i]) n++;
              return (n === 0 ? 'The ward counts, and disagrees with all four of you.'
                : `The ward counts ${n === 1 ? 'one digit' : n + ' digits'} true, and does not say which.`) + ' ' + left + ' answers left.';
            },
          };
          return c;
        },
        hints: [
          'One digit on each phone, and nobody has two. The Reader first, then the Listener, the Seer, the Binder.',
          'Every one of the four questions has a trap. Count what it asks for, not what is easy to count.',
          'Three, five, three, four: **3534**.',
        ],
        onSolve: (s, r) => {
          if (r && r.failed) { Store.set('COUNT_FORCED', true); Store.note('The Founders\' Count went unanswered. The Provost forced the ward, and it cost the stair.'); }
          else Store.note('The Founders\' Count: ' + COUNT + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : ''));
        },
        solvedText: (s, r) => (r && r.failed) ? [
          'The ward stops asking. The Provost puts her hand flat on the stone and says a word that costs her something.',
          { speaker: 'Provost Marrow', text: 'Mere. Forgive me. There is a child on this stair.' },
          'It gives, slowly, and the boots above come three flights closer.',
        ] : [
          'Three, five, three, four. The count closes, and the ward is not there any more.',
          { speaker: 'Wren', text: 'I would have got two. I do not have a phone.' },
          { speaker: 'Provost Marrow', text: 'Four questions, four eyes, one answer. That was Mere.' },
        ],
        next: 'ch5_soldiers', button: 'Boots, above',
      },
      /* ---------- the soldiers ---------- */
      ch5_soldiers: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash', sfx: 'boom',
        text: (s) => [
          'Boots above, no longer quiet. Torchlight coming down the shaft in a line.',
          'A voice comes down the shaft and asks the Provost to stop.',
          { speaker: 'Provost Marrow', text: 'Then the Envoy can ask the stair.' },
          F(s).DOOR === 'FIGHT'
            ? { text: 'The ward you flared at the Tower door told them where to look.', cls: 'whisper' }
            : forcedGates(s)
              ? { text: 'Mere\'s gates cost you time, and they had it.', cls: 'whisper' }
              : { text: 'They are three flights up, and coming.', cls: 'whisper' },
          { text: 'The Hearth is about to ask you something. It will not wait.', cls: 'whisper' },
        ],
        next: 'ch5_stair', button: 'Ready',
      },
      ch5_stair: {
        type: 'choice', choice: 'STAIR', art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        prompt: 'The soldiers reach the stair.',
        timer: 45,
        enter: (s) => {
          const sc = Game.scenes.ch5_stair;
          const frosts = gateFrosts(s).reduce((a, b) => a + b, 0);
          const lost = (F(s).DOOR === 'FIGHT' ? 15 : 0) + frosts * 5 + forcedGates(s) * 10 + (F(s).COUNT_FORCED ? 10 : 0);
          sc.timer = Math.max(25, 45 - lost);
          const spent = 45 - sc.timer;
          sc.timerText = spent ? `*${sc.timer} heartbeats. Getting this far has cost you ${spent} of them.*` : '*Forty-five heartbeats.*';
        },
        timeout: 'run',
        text: ['Three things can be done with a stair.'],
        options: [
          { id: 'collapse', text: 'Collapse the stair.', sub: 'One hand, no time for four. Nobody follows.', next: 'ch5_collapse', note: 'You chose to collapse the stair.' },
          { id: 'hold', text: 'Hold the stair with a thread.', sub: 'One of you stays, and their Sight pays for it.', next: 'ch5_hold_ask', note: 'You chose to hold the stair with a thread.' },
          { id: 'run', text: 'Run for the road down.', sub: 'They follow.', next: 'ch5_run', note: 'You ran for the road down.' },
        ],
      },
      /* ---------- collapse ---------- */
      ch5_collapse: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_stair', artParams: { broken: false }, mood: 'tense', fx: 'ash', puzzleId: 'ch5_collapse', par: [1, 2],
        text: [
          'Two slots cut into the newel post. One hand, because there is no time for four.',
          { text: 'The Binder has one thing to say first. Say it, then write.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE COLLAPSE — ONE HAND',
          note: 'Provost Marrow, fast: *Fire in the first slot, and what fire leaves in the second. One hand, and no ritual.*',
          slots: 2, glyphs: glyphPalette(), answer: { 1: 'ASH', 2: 'COLD' }, fourHands: false, showArrow: false, submitText: 'Write it',
          wrongText: 'The newel stays whole. Boots, closer.',
        }),
        hints: [
          'Nobody\'s page has this one. Two words, and you have both already.',
          'The second word is the first word upside down.',
          'ASH in slot 1, COLD in slot 2. One hand. There is no ritual.',
        ],
        onSolve: () => { Store.set('STAIR', 'COLLAPSE'); Store.set('PRECRACKED', true); Store.set('BELLS_CRACKED', 1); Store.set('VOLUNTEER', 0); Store.set('SOLDIERS', false); Store.note('You collapsed the stair. A bell cracked before the Bells began.'); },
        solvedText: [
          'The stair goes. Not the flight you are on, but the one above it.',
          'Then, far above, a bell answers the fall. One note, and a wrong one.',
          { speaker: 'Provost Marrow', text: 'One bell gone. We will manage with three.' },
          { speaker: 'Wren', text: 'You wrote the cold one. With one hand.' },
        ],
        next: 'ch5_endcard', button: 'The road down',
      },
      /* ---------- hold ---------- */
      ch5_hold_ask: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: [
          'A held thread needs a living anchor. One of you stays and holds it.',
          'That Sight is spent until the Provost ties it off, down in the bell-chamber.',
          { speaker: 'Provost Marrow', text: 'I will not choose. Mere would not have either.' },
          { text: 'Every phone: open SPEAK and answer *Stay and hold?* Alone, in silence.', cls: 'whisper' },
          { text: 'Then type each sealed word into the Hearth. The first yes stays.', cls: 'whisper' },
        ],
        next: 'ch5_hold', button: 'Every phone has answered',
      },
      ch5_hold: {
        type: 'token', art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: ['Four sealed words, in seat order. The Hearth answers only *Received*.'],
        prompt: 'Type each phone\'s sealed word.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i) => S.decode(L.channel('hold', L.roles[i].id), tok, L.tokens.hold),
        badText: 'The fire does not know that word. Check the phone and try again.',
        stuckText: 'The word is on the phone, under the answer. Four letters.',
        onTokens: (values) => {
          const yes = values.map((v, i) => v === 'YES' ? i : -1).filter(i => i >= 0);
          Store.set('HOLD_YES', yes.length);
          if (yes.length) { Store.set('VOLUNTEER', yes[0] + 1); Store.set('STAIR', 'HOLD'); Store.set('SOLDIERS', false); Store.set('HOLD_NOBODY', false); Store.note(nick(yes[0]) + ' held the stair.' + (yes.length > 1 ? ' (' + yes.length + ' said yes.)' : '')); }
          else { Store.set('VOLUNTEER', 0); Store.set('STAIR', 'RUN'); Store.set('SOLDIERS', true); Store.set('HOLD_NOBODY', true); Store.note('Nobody would hold the stair. You ran.'); }
        },
        next: (s) => F(s).VOLUNTEER > 0 ? 'ch5_hold_named' : 'ch5_hold_none',
      },
      ch5_hold_named: {
        art: 'ch5_stair', mood: 'sorrow', fx: 'motes', sfx: 'seal',
        text: (s) => {
          const v = nick((F(s).VOLUNTEER || 1) - 1), n = F(s).HOLD_YES || 1;
          const t = ['The Hearth reads four words and says one name.', { text: `The ${v} was faster.`, cls: 'ch5-name' }];
          t.push(n > 1 ? `${n === 4 ? 'All four' : n === 3 ? 'Three' : 'Two'} of you said yes. The ${v} said it first.` : 'One yes, and nobody has to say that twice.');
          t.push(`The ${v} sits down, back to the wall, and takes hold of something nobody else can see.`);
          t.push({ speaker: 'Provost Marrow', text: 'I will tie it off down in the bell-chamber. Do not let go.' });
          t.push({ speaker: 'Wren', text: `${v}. Do not let go. I will be really annoyed.` });
          return t;
        },
        next: 'ch5_endcard', button: 'The road down',
      },
      ch5_hold_none: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: [
          'Received. Received. Received. Received.',
          'The Hearth reads four words and says no name.',
          'Nobody stays. Not cowardice — four people who each thought somebody else would.',
        ],
        next: 'ch5_run', button: 'Run',
      },
      /* ---------- run ---------- */
      ch5_run: {
        art: 'ch5_marches', mood: 'tense', fx: 'ash', sfx: 'whoosh',
        enter: (s) => { if (F(s).STAIR !== 'RUN') { Store.set('STAIR', 'RUN'); Store.set('VOLUNTEER', 0); Store.note('You ran. The soldiers followed.'); } Store.set('SOLDIERS', true); },
        text: [
          'You run. The road down is wider than the stair, and older.',
          'Behind you, boots and torches. They will reach the bell-chamber soon after you.',
          { speaker: 'Wren', text: 'For the record, I said we should collapse it.' },
          'Nobody remembers Wren saying that.',
        ],
        next: 'ch5_endcard', button: 'The bell-chamber',
      },
      /* ---------- end card ---------- */
      ch5_endcard: {
        art: 'ch5_stair', artParams: (s) => ({ broken: F(s).STAIR === 'COLLAPSE' }),
        mood: 'dread', fx: 'motes', flame: 0.25, sfx: 'chime',
        text: [
          { text: 'Next: the Bells.', cls: 'big' },
          { text: 'Hands on your keys.', cls: 'whisper' },
          'Nothing else tonight is faster than this.',
        ],
        next: 'ch5_flow', button: 'The paths you walked',
      },
      ch5_flow: {
        type: 'flow', art: 'ch5_marches', mood: 'dread', fx: 'motes',
        text: ['The road goes down, and the bell-chamber is at the end of it.'],
        flowTitle: 'Chapter V — the paths you walked',
        stats: (s) => {
          const st = F(s).STAIR, v = F(s).VOLUNTEER;
          const stair = st === 'COLLAPSE' ? 'You collapsed the stair, and one bell cracked.'
            : st === 'HOLD' ? `**The ${nick(v - 1)}** holds the stair with a thread.`
              : 'You ran, and the soldiers follow.';
          return `${stair}${F(s).GATE2_COLD ? ' At the Silent Gate you wrote COLD.' : ''} Hints so far: ${F(s).hintsTotal || 0}.`;
        },
        next: 'ch6_start', button: 'The Bells',
      },
    },
  });
})();
