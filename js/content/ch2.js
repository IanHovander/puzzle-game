/* Chapter II — The Ember Vault (Seer drives, Reader is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, UI = window.VigilUI, Store = window.VigilStore;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch2-niche { display: flex; flex-direction: column; gap: 7px; }
    .ch2-niche .inscription-svg { max-width: 210px; }
    .ch2-niche .ch2-label { font-family: var(--display); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-dim); }
    .ch2-sheet { font-family: var(--hand); font-size: 15px; line-height: 1.35; color: #d9cba8; background: rgba(255,240,200,0.05); border: 1px solid rgba(255,240,200,0.12); border-radius: 4px; padding: 8px 12px; letter-spacing: .06em; filter: blur(.5px); user-select: none; word-break: break-all; }
    .ch2-sheet span { display: inline-block; transform: rotate(180deg) scaleX(-1); opacity: .85; }
    .ch2-sheet .sig { display: block; text-align: right; margin-top: 5px; filter: blur(.8px); }
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
      .ch2-sheet { font-size: 12px; line-height: 1.3; padding: 5px 9px; max-height: 58px; overflow: hidden; }
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
         Hand-off: js/content/companion/book.js:78 hard-copies the old plinth order into the Reader's
         permanent Book and is not a file this pass may edit. It must become
         'plinth 1 — THORN · plinth 2 — VEIL · plinth 3 — EMBER · plinth 4 — KNOT (from the vault door)'.
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
    short: 'The door hears what you have given it, and lets it go. A count is four, one word to each dial.',
    twice: 'Two of those turns are the same dial. One word to a dial, and there are four dials.',
    floor: 'Every word went to the dial its own plinth stands over. That is the newer rule. The lintel was cut before this floor was laid.',
    drill: 'One, two, three, four, the way the school drills it. The school has drilled it since the floor was laid, and a drill is not a Law.',
    order: 'The right words on the right dials, and the door heard them in an order it has never hummed.',
    dialmap: 'The four right words, and at least one of them on a dial no plinth was ever cut to face.',
    one: 'One of those words is cut into no plinth in this room.',
    some: 'Some of those words are cut into no plinth in this room.',
    other: 'Four turns, and not one of them was what the door was waiting for.',
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

  /* A sheet in an alphabet nobody at the table has learned: unreadable on purpose. Deterministic scribble. */
  function oldSheet() {
    const chars = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
    let seed = 41; const r = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const words = []; for (let i = 0; i < 24; i++) { let w = ''; const n = 2 + Math.floor(r() * 6); for (let k = 0; k < n; k++) w += chars[Math.floor(r() * chars.length)]; words.push(w); }
    return `<div class="ch2-sheet"><span>${words.join(' ')}</span><span class="sig">— ᛗᛖᚱᛖ</span></div>`;
  }

  Game.addChapter({
    id: 'ch2', label: 'Chapter II', title: 'The Ember Vault', start: 'ch2_start', code: 'KNOT',
    mood: 'wonder', fx: 'dust', art: 'ch2_antechamber', flame: 0.8,
    flow: {
      nodes: [
        { id: 'ch2_start', label: "The Provost's errand", col: 0, row: 1 },
        { id: 'ch2_door', label: 'The door that counts once', col: 1, row: 1, kind: 'choice' },
        { id: 'ch2_counted', label: 'It counted you', col: 2, row: 0, secret: true, when: () => Store.chose('CH2_DOOR', 'counted') },
        { id: 'ch2_crawled', label: 'It stopped counting. You crawled in', col: 2, row: 2, secret: true, when: () => Store.chose('CH2_DOOR', 'crawled') },
        { id: 'ch2_niche_found', label: "Mere's niche, behind the first plinth", col: 3, row: 0, kind: 'choice', secret: true, when: () => Store.chose('CH2_NICHE', 'mere') },
        { id: 'ch2_strip', label: 'Read from its mark: four went through', col: 4, row: 0, secret: true, when: () => Store.chose('CH2_STRIP', 'right') },
        { id: 'ch2_rubbing', label: 'The Reader took a rubbing', col: 4, row: 2, secret: true, when: (s) => !!s.flags.LETTER },
        { id: 'ch2_ember', label: 'The Cold Ember, the bricked arch', col: 3, row: 1 },
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
        art: 'ch2_stair', mood: 'court', fx: 'dust', sfx: 'step',
        title: 'The Great Hall, after the bell',
        text: (s) => (s.flags.VOTE_LOST ? [
          'The vote is lost. Vane\'s guard closes around Wren, and the Houses file out without looking at the child they gave away.',
          'Wren, over a soldier\'s shoulder, mouths something at you. It is probably *rude*.',
          { speaker: 'Provost Marrow', text: 'Then bring me the Ember. I will get the child back myself.' },
        ] : [
          'Five to four. Vane bows as if he had won something.',
          'The Hearth flickered twice during the count. The Provost was the only one in the Hall not watching it.',
          { speaker: 'Provost Marrow', text: 'Wren stays with me tonight. You four have an errand.' },
        ]).concat([
          { speaker: 'Provost Marrow', text: 'Under this school the Founders left the Cold Ember. If the Hearth goes out, the Ember lights it again. Bring it up.' },
          { speaker: 'Provost Marrow', text: 'And take the Seer\'s eyes with you. That vault was rebuilt once, and the rebuilding was not honest.' },
        ]).concat(s.flags.VOTE_LOST ? [] : [{ speaker: 'Wren', text: 'I\'ll stay put. Look at me staying put.' }]),
        next: 'ch2_descent', button: 'Down',
      },
      ch2_descent: {
        art: 'ch2_stair', mood: 'wonder', fx: 'dust', sfx: 'step', flame: 0.8,
        text: [
          'The stair behind the tapestry goes down further than a school has any right to.',
          'Torches, then fewer torches. Then a light that is not torchlight at all: a cold blue, breathing, somewhere below.',
        ],
        next: 'ch2_antechamber', button: 'The bottom',
      },
      ch2_antechamber: {
        art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'open',
        title: 'The bottom of the stair',
        text: [
          'The four Founders stand in a row, hooded, one on each plinth. On each plinth, one shape cut into the stone and worn nearly smooth.',
          'In the floor before each statue, a bronze dial. Plinths and dials alike are numbered one to four.',
          'Every statue looks straight down at the dial in front of it.',
          'Beyond them, a door with no handle and no lock.',
          { text: 'This floor is newer than the room. Only one of you can see how much newer.', cls: 'whisper' },
        ],
        next: 'ch2_attune', button: 'Attune',
      },
      ch2_attune: {
        type: 'code', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust',
        text: [
          'Cut into the lintel above the door: a word, and a small mark beside it.',
          { text: 'Open the Companion. Take your seat. Type both.', cls: 'whisper' },
          { text: 'Read your page. Say nothing yet.', cls: 'whisper' },
          { text: 'Your phone keeps everything it shows you, all night. There is nothing to write down.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **the Seer**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch2_door',
      },
      /* ---------- the door that counts once ---------- */
      ch2_door: {
        type: 'puzzle', puzzle: 'dialseq', art: 'ch2_antechamber', mood: 'tense', fx: 'dust', puzzleId: 'ch2_door', par: [3, 4.5, 6],
        text: [
          { text: 'Four turns, one order. Say your one thing before anybody touches a dial.', cls: 'whisper' },
          { text: 'Reader — the word cut into each plinth.', cls: 'whisper' },
          { text: 'Listener — the order the door hums.', cls: 'whisper' },
          { text: 'Seer — which hole each plinth was cut for.', cls: 'whisper' },
          { text: 'Binder — which of the three counts binds.', cls: 'whisper' },
          { text: 'One count only. A wrong one does not end the night.', cls: 'small' },
        ],
        config: () => ({
          title: "THE FOUNDERS' DOOR",
          note: 'The Reader reads the lintel: *Four plinths, four dials. Turn all four, one word each, in the order the door hums. The door counts **once**.* Three rules say which dial a word goes on: the dial its plinth **stands over**, the dial it was **cut for**, or **one to four** in turn. Only one is older than this floor.',
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
          'Four things, four people, and nobody has two. The words — the Reader. The order — the Listener. Which hole each plinth was cut for — the Seer. Which of the three counts binds — the Binder.',
          'Three ways to count this door, and the room can see all three. Which one the door was cut to obey is a question of dates, and only one of you can date them.',
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
            'The door does not open so much as remember that it was never really shut. Cold blue light comes up the steps to meet you.',
            { text: 'THORN, KNOT, VEIL, EMBER. *A gate. Together. Hidden. Kept.* That is all it ever said.', cls: 'small' },
            { text: 'Four words, four holes, one order, and the older rule. Nobody at this table had two of them.', cls: 'small' },
          ]; }
          const why = j.onFloor ? DOOR.floor : j.onDrill ? DOOR.drill : (j.onHoles && !j.ordered) ? DOOR.order
            : j.strange === 1 ? DOOR.one : j.strange > 1 ? DOOR.some
            : !j.strange ? DOOR.dialmap : DOOR.other;
          receipt(true, why);
          return [
            why,
            'It counts to four and stops. Stone does not argue.',
            'In the end the Seer finds the way the rebuilders came and went. A gap behind the end of the row, mortar and grit, and a crawl on your hands and knees. They did not trust their own door either.',
          ];
        },
        next: 'ch2_opened', button: 'Into the vault',
      },
      ch2_opened: {
        type: 'choice', art: 'ch2_vault', mood: 'wonder', fx: 'motes', choice: 'CH2_VAULT', sfx: 'reveal',
        text: [
          'The vault is round and low and older than the school on top of it.',
          'In the middle, on a plinth of the same stone, a case of glass. In the case, a flame that is not burning. Blue, breathing, giving off no heat at all.',
          'The Cold Ember. Nothing down here is going anywhere. Nothing up there will wait.',
        ],
        prompt: 'The Ember is two steps away.',
        options: [
          { id: 'ember', text: 'Take it and go.', next: 'ch2_ember' },
          { id: 'niche', text: 'Look behind the plinths first.', sub: 'The Seer saw something the Hearth did not.', next: 'ch2_niche' },
        ],
      },
      /* ---------- the niche behind the first plinth (optional) ---------- */
      ch2_niche: {
        type: 'custom', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'reveal',
        enter: () => { if (!Store.chose('CH2_NICHE', 'mere')) { Store.choose('CH2_NICHE', 'mere'); Store.note('You found the niche behind the first plinth.'); } },
        text: [
          'The first plinth stands a hand\'s breadth from the wall. Behind it, at knee height, a hollow the rebuilders missed.',
          'Inside: a strip of stone with three shapes cut into it, and a sheet folded small, written close in letters none of you can read.',
          'The name worn off the front of that plinth is cut fresh on its back. Mere. One of the four who closed the wound.',
        ],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch2-niche' });
          box.appendChild(wrap);
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: "MERE'S NICHE" }));
          wrap.appendChild(UI.el('div', { class: 'ch2-label', text: 'the strip — three shapes, left to right' }));
          wrap.appendChild(UI.el('div', { html: G.inscription(STRIP, { showMark: false }) }));
          wrap.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich('The Reader has both readings. Only the Seer can say which end this line begins at.') }));
          const status = UI.el('div', { class: 'pz-status' }); wrap.appendChild(status);
          wrap.appendChild(UI.el('div', { html: oldSheet() }));
          const say = (cls, t) => { status.className = 'pz-status ' + cls; status.textContent = t; };
          api.button('Read it left to right', () => {
            Store.choose('CH2_STRIP', 'left'); api.audio.sfx('wrong');
            say('bad', 'WELL, EMBER, VEIL — one went down alone and kept it. It is the reading the school teaches, and the mark on this stone is at the other end.');
          }, '');
          api.button('Read it from its mark', () => {
            Store.choose('CH2_STRIP', 'right'); api.audio.sfx('reveal');
            say('good', 'KNOT, CROWN, THORN — four, as one, went through. Not one. And the stone above the Hearth has said one born of four for four hundred years.');
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
          'The case lifts off the plinth with no ward and no click. It is lighter than it looks and colder than anything has a right to be.',
          'The hands that carry it go numb to the wrist. Inside the glass the blue flame leans, very slightly, toward whoever is holding it.',
          s.flags.LETTER ? 'The Reader keeps one hand on the sleeve with the rubbing in it.' : 'Nobody says anything for a moment. The vault is very quiet.',
        ],
        next: 'ch2_road', button: 'The archway',
      },
      ch2_road: {
        art: 'ch2_vault', artParams: { empty: true, arch: true }, mood: 'dread', fx: 'motes', flame: 0.75,
        text: [
          'Behind the empty plinth, an archway bricked shut with newer stone, grey where everything down here is black.',
          'The Hearth is a long way up and the Ember is very cold. It is time to go.',
        ],
        next: 'ch2_stairfall', button: 'Up',
      },
      /* ---------- the stair falls (timed, 30 s) ---------- */
      ch2_stairfall: {
        type: 'choice', art: 'ch2_stair', artParams: { broken: true }, mood: 'tense', fx: 'ash', sfx: 'boom', choice: 'CH2_STAIR', flame: 0.75,
        text: (s) => [
          'Halfway up, the stair gives.',
          'A dozen steps go into the blue dark, a long way down. You are on the upper side. The case is not.',
          s.flags.VOTE_LOST
            ? 'Across the gap, holding the case in both arms and extremely pleased with itself, is a child who was under guard twenty minutes ago.'
            : 'Across the gap, holding the case in both arms and extremely pleased with itself, is a child who promised to stay put.',
          { speaker: 'Wren', text: 'You *left* without me. Also you dropped this. Also the stairs are going. Also —' },
          'The step under Wren tilts. Wren has one arm for the case and one for you.',
        ],
        prompt: 'One reach. What do you catch?',
        timer: 30, timerText: '*Thirty heartbeats. The stair is going.*', timeout: 'wren',
        options: [
          { id: 'wren', text: 'Catch Wren.', sub: 'The case goes where the stair goes.', next: 'ch2_top', set: { EMBER_LOST: true }, note: 'At the stair, you caught Wren and let the Ember fall.',
            after: [
              'Four hands close on one thin wrist and haul. The case does not come. It turns once in the air, and the dark takes it without a sound.',
              { speaker: 'Wren', text: 'Ow. Thank you. Ow. That was important, wasn\'t it. The box.' },
              'Nobody answers. Below, for a moment, the blue light is brighter. Then it is not.',
            ] },
          { id: 'ember', text: 'Catch the case.', cls: 'dark', sub: 'Wren is quick. Wren will manage.', next: 'ch2_top', set: { WREN_HURT: true }, note: 'At the stair, you caught the Ember and Wren fell.',
            after: [
              'The case comes over the gap into eight numb hands. Wren does not, and there is a sound from the dark that nobody here will forget.',
              { speaker: 'Wren', text: 'I\'m fine. It\'s only my arm. Don\'t look like that. You got the box.' },
              'It takes ten minutes and a cloak torn into a rope to get Wren up. The arm is not fine. Wren does not mention it again, which is the worst part.',
            ] },
        ],
      },
      /* ---------- the top of the stair ---------- */
      ch2_top: {
        art: 'ch2_stair', mood: 'sorrow', fx: 'dust', sfx: 'step', flame: 0.75,
        enter: (s) => { if (s.flags.SORREL) { Store.set('EMBER_LOST', true); if (Store.chose('CH2_STAIR', 'ember')) Store.note('At the top of the stair, the Convocation\'s guards took the Ember.'); } },
        text: (s) => {
          const wren = Store.chose('CH2_STAIR', 'wren');
          const out = ['At the top of the stair the tapestry is held aside. The Provost stands in it, as if she had not moved since she sent you.'];
          out.push(s.flags.SORREL
            ? 'Behind her, two of the Convocation\'s guards and a writ. You promised them the Ember. They have come for it.'
            : s.flags.ORIEL
              ? 'Behind her, Master Oriel, with a lamp she does not need. You promised her everything you found below. She has come to be told.'
              : 'Behind her, nobody. You promised nobody anything tonight, and tonight that turns out to have been clever.');
          out.push({ speaker: 'Provost Marrow', text: 'The Ember.' });
          out.push(wren
            ? 'You tell her all of it. She does not look down the stair once. She looks at Wren.'
            : 'She takes the case in both hands. Then she sees how Wren is holding one arm.');
          out.push({ speaker: 'Provost Marrow', text: wren ? 'Then we do without it. Come up. All of you.' : 'Who did —' });
          if (!wren) out.push('She has never finished that sentence in fourteen years, and she does not finish it now.');
          if (s.flags.VOTE_LOST) out.push('At the end of the corridor, Vane\'s captain, come for what the vote gave him. The Provost puts herself between him and the child.');
          out.push({ text: 'Far above, the Hearth flickers, and this time everyone sees it.', cls: 'whisper' });
          return out;
        },
        next: 'ch2_flow', button: 'The night moves on',
      },
      ch2_flow: {
        type: 'flow', art: 'ch2_stair', mood: 'hearth', fx: 'dust',
        text: (s) => [
          Store.chose('CH2_DOOR', 'crawled') ? 'The door counted once, and you were not what it counted.' : 'The door counted once, and it counted you.',
          s.flags.EMBER_LOST ? 'The Cold Ember is not coming up tonight.' : 'The Cold Ember is on the Provost\'s desk, and the Provost is not looking at it.',
          { text: 'The paths you walked, and the ones you did not.', cls: 'small' },
        ],
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
