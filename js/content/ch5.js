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
     A bell's count is how far its shape sits from the mark, count one being the mark slot itself.

       items    what is cut, shape by shape, in the order it was cut      Reader — both words for each
       markEnd  which end of the carving carries the mason's mark         Seer
       scratch  where the ring is cut, and the second cut beside it       Seer
       counts   the bell hanging over each shape                          Listener
       the rule a sigil begins at a scratch, never at a notch; a carving
                marked at its right-hand end runs the other way round
                the ring, one marked at its left runs the way the slots
                count up — the newer Law says sunwise always, the older
                Law disagrees, and the older binds                        Binder

     The Hearth shows none of it: no carving on the board (the art draws the lintel worn past
     reading) and showArrow:false, so the hub prints no SUNWISE arrow.

     Enumerated over all 19,081 legal boards (5 slots, 8 glyphs, no repeats, empties allowed):
     each gate has exactly ONE winner.
       gate 1  {2:EMBER, 4:VEIL, 5:WELL}, slots 1 and 3 empty
       gate 2  {1:WELL, 2:ASH, 4:CROWN, 5:KNOT}, slot 3 empty — and the same board with COLD at 3
               when Law 0 is restored, which is the only case with two winners.
     Boards still consistent with the pages that remain when one role is dropped:
       gate 1  no Reader 336 · no Listener 105 · no Seer 10 · no Binder 4
       gate 2  no Reader 6720 · no Listener 365 · no Seer 10 · no Binder 8
     No three pages reach a single board at either gate. A narrowed field is not a free field:
     every frost at either gate costs five heartbeats off the choice on the stair (gateFrost,
     spent in ch5_stair.enter), which is the currency this chapter already charges in.

     W1.counts is [3,1,5] and not [3,1,4] on purpose. The shared Book tells the Reader that a
     carving marked on the right is read right to left with every glyph inverted, so a table will
     often name the words backwards. With [3,1,4] the reversed list zipped against the bells landed
     on the winning board anyway, so a table could learn the direction Law inside out and still win.
     With [3,1,5] the reversed zip lands on G1_REV, which is keyed: the bells do not turn round with
     the reading. W2.notch exists for the same reason — without it the Binder's first clause (a
     sigil begins at a scratch) was inert at the second gate. */
  const W1 = {
    items: [{ shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }],
    markEnd: 'right', scratch: 4, notch: 2, counts: [3, 1, 5],
  };
  const W2 = {
    items: [{ shape: 'Crown', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: true }],
    markEnd: 'left', scratch: 3, notch: 5, counts: [2, 5, 1, 3, 4],
  };
  const N = 5;
  const reading = (w, end) => w.items.map(it => { const g = G.read(it.shape, it.inv); return end === 'right' ? G.invert(g) : g; });
  const dirOf = (end) => end === 'right' ? -1 : 1;
  /* The four facts -> the board, and nothing else decides it. */
  function place(words, counts, mark, dir, writeCold) {
    const m = {};
    words.forEach((wd, i) => { const s = (((mark - 1) + dir * (counts[i] - 1)) % N + N) % N + 1; if (wd === 'COLD' && !writeCold) return; m[s] = wd; });
    return m;
  }
  const backwards = (a) => a.slice().reverse();
  const W1_WORDS = reading(W1, W1.markEnd);      // EMBER · VEIL · WELL
  const W1_STANDS = reading(W1, 'left');         // CROWN · KNOT · THORN — the decoy reading
  const W2_WORDS = reading(W2, W2.markEnd);      // CROWN · ASH · COLD · KNOT · WELL
  const W2_OTHER = reading(W2, 'right');         // EMBER · COLD · ASH · VEIL · THORN — the decoy reading
  const DIR1 = dirOf(W1.markEnd), DIR2 = dirOf(W2.markEnd);
  const ANS1 = place(W1_WORDS, W1.counts, W1.scratch, DIR1);
  const G1_ROUND = place(W1_WORDS, W1.counts, W1.scratch, -DIR1);
  const G1_NOTCH = place(W1_WORDS, W1.counts, W1.notch, DIR1);
  const G1_TOP = place(W1_WORDS, W1.counts, 1, DIR1);
  const G1_REV = place(backwards(W1_WORDS), W1.counts, W1.scratch, DIR1);
  const ANS2_COLD = place(W2_WORDS, W2.counts, W2.scratch, DIR2, true);
  const ANS2 = place(W2_WORDS, W2.counts, W2.scratch, DIR2);
  const G2_TOP = place(W2_WORDS, W2.counts, 1, DIR2);
  const G2_NOTCH = place(W2_WORDS, W2.counts, W2.notch, DIR2);
  const G2_ROUND = place(W2_WORDS, W2.counts, W2.scratch, -DIR2);
  const G2_REV = place(backwards(W2_WORDS), W2.counts, W2.scratch, DIR2);
  const G2_ROW = place(W2_WORDS, [1, 2, 3, 4, 5], W2.scratch, DIR2);
  const same = (m, want) => { for (let i = 1; i <= N; i++) if ((m[i] || null) !== (want[i] || null)) return false; return true; };
  const filled = (m) => { const o = []; for (let i = 1; i <= N; i++) if (m[i]) o.push(m[i]); return o; };
  const sameSet = (a, b) => a.length === b.length && a.slice().sort().join() === b.slice().sort().join();
  const inARow = (m) => { const k = filled(m).length; if (k < 2 || k >= N) return false;
    for (let s = 1; s <= N; s++) { let ok = true; for (let j = 0; j < k; j++) if (!m[((s - 1 + j) % N) + 1]) ok = false; if (ok) return true; } return false; };
  const noCold = (arr) => arr.filter(x => x !== 'COLD');

  /* The gates charge in heartbeats. A frost at either ring takes five off the forty-five the stair
     gives you, to a floor of twenty-five, so a table that narrows the field and guesses pays for it. */
  let gateFrost = 0;
  const frost = (line) => { gateFrost++; return line; };
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
        enter: (s) => { doorNoted = false; gateFrost = 0; if (!F(s).LAW0 && law0(s)) Store.set('LAW0', true); if (F(s).OATH == null) Store.set('OATH', F(s).OATH_KNOT ? 1 : 0); },
        text: (s) => {
          const t = ['Midnight is an hour away. The Hearth, as you pass it, is a blue tongue the height of a hand.'];
          t.push({ speaker: 'Provost Marrow', text: 'Under this school there is a wound. The Founders shut it and left the fire on top to hold it.' });
          t.push({ speaker: 'Provost Marrow', text: 'The fire is going out. Tonight I take the child down and shut it again.' });
          t.push((F(s).OATH | 0) === 0
            ? { speaker: 'Provost Marrow', text: 'You would not swear, so I do not take you. There is a door on this stair for the unasked.' }
            : { speaker: 'Provost Marrow', text: 'You swore in the study to see the child into the Cold, whatever it cost. Then you come.' });
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
          'Far below, a light that is not fire. Blue, and steady.',
          'Above you, boots. The Envoy\'s soldiers are on the stair.',
          { speaker: 'Provost Marrow', text: 'Mere warded this stair. She was one of the four who built the Hearth.' },
          { speaker: 'Provost Marrow', text: 'Her gates do not lie. They do not play fair. Read them together.' },
          'Cut into the first landing, worn by four hundred years of feet, a word.',
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
        next: (s) => (F(s).OATH | 0) === 0 ? 'ch5_door' : 'ch5_gate1',
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
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 1 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate1', par: [4, 7],
        text: [
          'Three shapes on the lintel, three bells above them, five slots below.',
          { text: 'Reader — what each shape says, both ways.', cls: 'whisper' },
          { text: 'Listener — the bell over each shape, and its count.', cls: 'whisper' },
          { text: 'Seer — which end is marked, and every cut on the ring.', cls: 'whisper' },
          { text: 'Binder — which cut starts it, and which way round.', cls: 'whisper' },
          { text: 'All four out loud, before anybody touches the ring.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE FIRST GATE',
          note: 'Provost Marrow, low: *Three shapes, three bells. A bell\'s count is how far its shape sits from the mark, counting the mark slot as one. Which cut is the mark, and which way round, are the Binder\'s. Slots the shapes do not reach stay empty. Every frost costs the stair five heartbeats.*',
          slots: N, glyphs: glyphPalette(), allowEmpty: true, showArrow: false,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          wrongText: 'Frost creeps over the ring. It resets.',
          onWrong: (m, tries) => tries >= 2 ? 'Frost. Wren, from the step above: "Has everyone actually said their one thing?"' : null,
          check: (m) => {
            const f = filled(m);
            if (same(m, ANS1)) return true;
            if (f.length < 3) return 'The gate counts three shapes and finds fewer. Nothing frosts yet.';
            if (sameSet(f, W1_STANDS)) return frost('Frost. Those are the words the other way up. Which way up a carving is read is the Seer\'s.');
            if (same(m, G1_REV)) return frost('Frost. Each bell belongs to the shape it hangs over. The bells do not turn round with the reading.');
            if (same(m, G1_ROUND)) return frost('Frost. Two Laws want opposite things here, and one of them is older.');
            if (same(m, G1_NOTCH) || same(m, G1_TOP)) return frost('Frost. Only one kind of cut begins a sigil, and the ring does not begin at the top.');
            if (sameSet(f, W1_WORDS) && inARow(m)) return frost('Frost. A bell says how far its shape sits from the mark. It never says the shapes sit in a row.');
            return frost(false);
          },
        }),
        hints: [
          'Four answers, four people, and nobody has two. Which words — the Reader. How far from the mark — the Listener. Where the mark is — the Seer. Which way to count — the Binder.',
          'More than one cut on that ring, and only one kind starts a sigil. Two Laws also disagree about which way round. The older wins.',
          'EMBER at 2, VEIL at 4, WELL at 5. The rest stay empty. Then four hands.',
        ],
        onSolve: (s, r) => { Store.note('Mere\'s first gate: counted the older way round.' + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : '')); },
        solvedText: [
          'The gate does not open so much as forget it was ever shut.',
          { speaker: 'Provost Marrow', text: 'She cut that one for people coming up. Nobody comes up.' },
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
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 2, cold: 0.5 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate2', par: [4, 7],
        text: [
          'Five shapes, five bells the Hearth cannot hear, and the same four jobs.',
          { text: 'Reader — what each shape says.', cls: 'whisper' },
          { text: 'Listener — every bell, and its count.', cls: 'whisper' },
          { text: 'Seer — which end is marked, and every cut on the ring.', cls: 'whisper' },
          { text: 'Binder — which way round, and the word the Laws argue about.', cls: 'whisper' },
          { text: 'All four out loud, before anybody touches the ring.', cls: 'whisper' },
        ],
        config: (s) => ({
          title: 'THE SILENT GATE',
          note: 'Provost Marrow, quieter: *Five shapes, five bells, the same rule. A bell\'s count is how far its shape sits from the mark, counting the mark slot as one. Which cut is the mark, and which way round, are the Binder\'s. One of the five words is one the Laws argue about. Every frost costs the stair five heartbeats.*',
          slots: N, glyphs: glyphPalette(), allowEmpty: true, showArrow: false,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          wrongText: 'Frost creeps over the ring. It resets.',
          onWrong: (m, tries) => tries >= 2 ? 'Frost. Provost Marrow, without turning round: "All four of you. Out loud."' : null,
          check: (m) => {
            const f = filled(m);
            const base = m[1] === ANS2[1] && m[2] === ANS2[2] && m[4] === ANS2[4] && m[5] === ANS2[5];
            if (base && !m[3]) return true;
            if (same(m, ANS2_COLD)) return law0(s) ? true : frost('Frost over the middle slot. The newer Law will not have that word written at all. The Binder has what is done instead.');
            if (f.length < 4) return 'The gate counts five shapes and finds fewer. Nothing frosts yet.';
            if (base) return frost('Frost over the middle slot. That is the one the Laws argue about, and the Binder holds it.');
            if (sameSet(f, W2_OTHER) || sameSet(f, noCold(W2_OTHER))) return frost('Frost. Those are the words the other way up. Which way up a carving is read is the Seer\'s.');
            if (same(m, G2_REV)) return frost('Frost. Each bell belongs to the shape it hangs over. The bells do not turn round with the reading.');
            if (same(m, G2_NOTCH) || same(m, G2_TOP)) return frost('Frost. Only one kind of cut begins a sigil, and the ring does not begin at the top.');
            if (same(m, G2_ROUND)) return frost('Frost. Two Laws want opposite things here, and one of them is older.');
            if (same(m, G2_ROW)) return frost('Frost. The bells were ignored. Each bell says how far its shape sits from the mark.');
            return frost(false);
          },
        }),
        hints: [
          'Four answers, four people, and nobody has two. The words — the Reader. How far from the mark — the Listener. Where the mark is — the Seer. Which way round, and the word nobody writes — the Binder.',
          'Two cuts on this ring as well, and only one kind of cut starts a sigil. And one of the five words is one the newer Law never has written.',
          (s) => law0(s)
            ? 'WELL 1, ASH 2, CROWN 4, KNOT 5. Slot 3 empty, or COLD in it. Then four hands.'
            : 'WELL 1, ASH 2, slot 3 empty, CROWN 4, KNOT 5. Then four hands.',
        ],
        onSolve: (s, r) => { const cold = !!(r && r.map && r.map[3] === 'COLD'); Store.set('GATE2_COLD', cold); Store.note(cold ? 'The Silent Gate: you wrote the word nobody writes.' : 'The Silent Gate: you left the cold slot empty.'); },
        solvedText: (s, r) => (r && r.map && r.map[3] === 'COLD') ? [
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
        config: () => ({
          title: 'THE FOUNDERS\' COUNT',
          note: 'The Reader\'s number, then the Listener\'s, then the Seer\'s, then the Binder\'s. Four digits, typed as one. The ward hears four answers and then stops.',
          fields: [{ label: 'the count', placeholder: '· · · ·', len: 4 }], submitText: 'Count', maxTries: 4,
          accept: (v) => v[0] === '3524',
          onWrong: (v, tries) => {
            const w = v[0] || '';
            const left = 4 - tries;
            if (w.length !== 4 || /\D/.test(w)) return 'Four digits, and only digits. The ward counted that as an answer.' + (left ? ' ' + left + ' left.' : '');
            if (tries >= 3) return 'The ward has stopped saying how close you are. ' + (left ? 'One answer left.' : 'That was the last.');
            let n = 0; for (let i = 0; i < 4; i++) if (w[i] === '3524'[i]) n++;
            return (n === 0 ? 'The ward counts, and disagrees with all four of you.'
              : `The ward counts ${n === 1 ? 'one digit' : n + ' digits'} true, and does not say which.`) + ' ' + left + ' answers left.';
          },
        }),
        hints: [
          'One digit on each phone, and nobody has two. The Reader first, then the Listener, the Seer, the Binder.',
          'Every one of the four questions has a trap. Count what it asks for, not what is easy to count.',
          'Three, five, two, four: **3524**.',
        ],
        onSolve: (s, r) => {
          if (r && r.failed) { Store.set('COUNT_FORCED', true); Store.note('The Founders\' Count went unanswered. The Provost forced the ward, and it cost the stair.'); }
          else Store.note('The Founders\' Count: 3524' + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : ''));
        },
        solvedText: (s, r) => (r && r.failed) ? [
          'The ward stops asking. The Provost puts her hand flat on the stone and says a word that costs her something.',
          { speaker: 'Provost Marrow', text: 'Mere. Forgive me. There is a child on this stair.' },
          'It gives, slowly, and the boots above come three flights closer.',
        ] : [
          'Three, five, two, four. The count closes, and the ward is not there any more.',
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
          'A voice carries the height of the shaft, and asks the Provost to stop.',
          { speaker: 'Provost Marrow', text: 'Then the Envoy can ask the stair.' },
          F(s).DOOR === 'FIGHT'
            ? { text: 'The ward you flared at the Tower door told them where to look.', cls: 'whisper' }
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
          const lost = (F(s).DOOR === 'FIGHT' ? 15 : 0) + gateFrost * 5 + (F(s).COUNT_FORCED ? 10 : 0);
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
          'A held thread needs a living anchor. One of you stays and holds it while the others go on.',
          'That Sight is spent until the Provost ties it off, before the bells are done.',
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
          t.push({ speaker: 'Provost Marrow', text: 'I will tie it off before the third round of the bells. Do not let go.' });
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
