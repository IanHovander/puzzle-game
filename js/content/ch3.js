/* Chapter III — The Whispering Gallery (Listener drives, Binder is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, S = window.VigilShared;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  /* chapter-local styling */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch3-linen { text-align: center; }
    .ch3-linen .ch3-word { font-family: var(--display); font-size: 44px; letter-spacing: .3em; color: var(--sea); margin: 14px 0 6px; text-shadow: 0 0 24px rgba(79,179,191,.5); }
    .ch3-linen .ch3-sub { color: var(--ink-dim); font-style: italic; }
    .ch3-rules { font-size: 15px; color: var(--ink-dim); margin: 6px 0 10px; line-height: 1.45; }
    .ch3-rules b { color: var(--gold-2); }
    /* Hob's spyhole cells are the Seer's to know: the grid widget's small red alarm dots stay off the Hearth. */
    .grid-pz .grid-board svg circle[r="4"] { display: none; }
  ` }));
  /* A hurt-door step that was spotted or rang the bell is cut short on purpose (see doorOpened); keep the console clean. */
  window.addEventListener('unhandledrejection', (e) => { if (e.reason && e.reason.ch3DoorAbort) e.preventDefault(); });

  /* ---------- the published grid data (docs/DESIGN.md §5 Ch3) ---------- */
  const CELLS = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'C1', 'B3', 'C2', 'C3', 'C4', 'D3', 'B5', 'C5', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'];
  const EDGES = [['A1', 'B1'], ['B1', 'C1'], ['A1', 'A2'], ['A2', 'A3'], ['A3', 'A4'], ['A4', 'A5'], ['A5', 'B5'], ['B5', 'C5'], ['C5', 'D5'], ['D5', 'E5'], ['E1', 'E2'], ['E2', 'E3'], ['E3', 'E4'], ['E4', 'E5'], ['C5', 'C4'], ['C4', 'C3'], ['C3', 'C2'], ['C3', 'D3'], ['D3', 'E3']];
  const PATROL_A = ['A5', 'B5', 'C5', 'C4', 'C3', 'C4', 'C5', 'B5', 'A5', 'A4', 'A3', 'A4'];
  const PATROL_B = ['E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E3', 'E2', 'E1', 'E1', 'E2', 'E3'];
  /* Only what the design publishes on the Hearth: the porter's lodge is a landmark, and landmarks are the Seer's to place. */
  const LABELS = { A1: 'Gallery', B3: 'Laundry', D1: 'Cook\'s door', E5: 'Tower' };

  /* A secret door. `revealed` is written by the grid widget the moment a password is accepted, before Wren steps
     through — so when Wren is hurt, opening the door spends a turn on the near side (the widget's own Wait). */
  function mkDoor(password, prompt, wrongText) {
    const o = { password, prompt, wrongText, _rev: false };
    Object.defineProperty(o, 'revealed', { enumerable: true, get: () => o._rev, set: (v) => { o._rev = !!v; if (v) doorOpened(); } });
    return o;
  }
  function doorOpened() {
    if (!Store.state.flags.WREN_HURT) return;
    const widget = document.getElementById('widget'); if (!widget) return;
    const wait = Array.from(widget.querySelectorAll('.grid-controls .btn')).find(b => b.textContent.trim() === 'Wait');
    if (!wait || wait.disabled) return;
    wait.click();   // the widget's own Wait: one turn on the near side, patrols checked, board redrawn (synchronous)
    const status = widget.querySelector('.grid-pz .pz-status'), turnEl = widget.querySelector('.grid-pz .g-turn');
    const seen = !!(status && /sees Wren/.test(status.textContent));
    const turn = turnEl ? parseInt((turnEl.textContent.match(/\d+/) || ['0'])[0], 10) : 0;
    if (seen || turn >= 12) {
      // The breath was spent and Wren never got through: a patrol saw the door being shouldered, or the bell rang.
      // Abort the widget's step itself (it is mid-move, just after accepting the word) so Wren is not carried through anyway.
      const err = new Error('ch3: the door turn ended the move'); err.ch3DoorAbort = true; throw err;
    }
    UI.toast('Wren\'s arm. Shouldering a hidden door open one-handed costs a breath — a turn passes on the near side.', 3200, 'bad');
  }

  let linenShown = false;
  function showLinen() {
    if (linenShown) return; linenShown = true;
    Store.set('LINEN', true);
    const box = UI.el('div', { class: 'ch3-linen' });
    box.appendChild(UI.el('p', { class: 'para', html: 'Bess does not look up from the copper. Wren tugs your sleeve — each of your sleeves, one at a time, while the kettle hides it.' }));
    box.appendChild(UI.el('p', { class: 'para', html: '<em>"Open SPEAK. Type this. Then don\'t say anything — just answer me."</em>' }));
    box.appendChild(UI.el('div', { class: 'ch3-word', text: 'LINEN' }));
    box.appendChild(UI.el('p', { class: 'ch3-sub', text: 'Every phone: the Pages screen, the word LINEN, no mark. Wren\'s question is on your SPEAK tab. Answer it alone; the Hearth will ask for your sealed words after the Tower.' }));
    Audio.sfx('reveal');
    UI.modal(box, { title: 'The Laundry', closeText: 'Back to the corridors' });
  }

  const gridConfig = (s) => ({
    title: 'THE CORRIDORS — THE GALLERY TO THE TOWER',
    note: 'Wren moves one room a turn, or waits. Guards are never drawn ahead — after each turn the Hearth shows where they *stood*.',
    cols: 5, rows: 5, cells: CELLS, edges: EDGES,
    doors: {
      'A3|B3': mkDoor('VEIL', 'A hidden door in the west corridor. Its lintel carries one carved shape. Speak the word:', 'The wall stays a wall.'),
      'B3|C3': mkDoor('THORN', 'The Laundry\'s back door. One carved shape over it. Speak the word:', 'The wall stays a wall.'),
    },
    start: 'A1', goal: 'E5', safe: ['A1', 'B3'],
    patrols: [
      { name: 'Light steps', short: 'A', path: PATROL_A },
      { name: 'Heavy boots', short: 'B', path: PATROL_B, alarmCell: 'E4' },
    ],
    alarm: { cells: ['B5', 'C5', 'D5', 'C4'], turns: 3, text: 'A spyhole slides. Hob\'s voice: "Here! The boy!" The heavy boots turn and hold the tower stair-foot.' },
    maxTurns: 12,
    labels: LABELS,
    timeoutText: 'The third bell. Wren is not at the Tower. Far above, Marrow rings a fourth — the timetable rolls on, and the patrols begin their round again.',
    successText: 'The Tower door. Wren flattens against it, grinning, out of breath.',
    onCell: (cell) => { if (cell === 'B3') showLinen(); },
    onSpotted: (n) => { Store.set('CH3_SPOTTED', n); },
    onTimeout: () => {
      if (!Store.state.flags.WREN_SCARED) { Store.set('WREN_SCARED', true); Store.inc('WREN_TRUST', -1); Store.note('The third bell rang with Wren still in the corridors.'); }
      Store.inc('CH3_BELLS');
    },
  });

  Game.addChapter({
    id: 'ch3', label: 'Chapter III', title: 'The Whispering Gallery', start: 'ch3_start', code: 'VEIL',
    mood: 'tense', fx: 'dust', art: 'ch3_gallery', flame: 0.7,
    flow: {
      nodes: [
        { id: 'ch3_start', label: 'The search', col: 0, row: 2 },
        { id: 'ch3_gallery', label: 'The Gallery', col: 1, row: 2 },
        { id: 'ch3_grid', label: 'The corridors', col: 2, row: 2, kind: 'choice' },
        { id: 'ch3_laundry', label: 'The Laundry', col: 3, row: 2, when: (s) => !!s.flags.LINEN, secret: true },
        { id: 'ch3_bell4', label: 'A fourth bell', col: 3, row: 4, when: (s) => !!s.flags.WREN_SCARED, secret: true },
        { id: 'ch3_w0', label: 'only Bookmoth knows', col: 4, row: 0, kind: 'end', secret: true, when: (s) => !!s.flags.WHISPER_reader },
        { id: 'ch3_w1', label: 'only Hush knows', col: 4, row: 1, kind: 'end', secret: true, when: (s) => !!s.flags.WHISPER_listener },
        { id: 'ch3_w2', label: 'only Owl knows', col: 4, row: 3, kind: 'end', secret: true, when: (s) => !!s.flags.WHISPER_seer },
        { id: 'ch3_w3', label: 'only Knot knows', col: 4, row: 4, kind: 'end', secret: true, when: (s) => !!s.flags.WHISPER_binder },
        { id: 'ch3_thanks', label: 'Even the ones who lied', col: 4, row: 2 },
        { id: 'ch3_door', label: 'The Tower door', col: 5, row: 2, kind: 'choice' },
        { id: 'ch3_fight', label: 'The ward flares', col: 6, row: 0, secret: true },
        { id: 'ch3_bluff', label: 'A bluff', col: 6, row: 1, secret: true },
        { id: 'ch3_word', label: 'Vane\'s word', col: 6, row: 2, secret: true },
        { id: 'ch3_writ', label: 'Sorrel\'s writ', col: 6, row: 3, secret: true },
        { id: 'ch3_surrender', label: 'Wren, handed over', col: 6, row: 4, secret: true },
        { id: 'ch4_start', label: 'The Oath', col: 7, row: 2, secret: true },
      ],
      edges: [['ch3_start', 'ch3_gallery'], ['ch3_gallery', 'ch3_grid'], ['ch3_grid', 'ch3_laundry'], ['ch3_grid', 'ch3_bell4'], ['ch3_laundry', 'ch3_w0'], ['ch3_laundry', 'ch3_w1'], ['ch3_laundry', 'ch3_w2'], ['ch3_laundry', 'ch3_w3'], ['ch3_laundry', 'ch3_thanks'], ['ch3_thanks', 'ch3_door'], ['ch3_door', 'ch3_fight'], ['ch3_door', 'ch3_bluff'], ['ch3_door', 'ch3_word'], ['ch3_door', 'ch3_writ'], ['ch3_door', 'ch3_surrender'], ['ch3_fight', 'ch4_start'], ['ch3_bluff', 'ch4_start'], ['ch3_word', 'ch4_start'], ['ch3_writ', 'ch4_start'], ['ch3_surrender', 'ch4_start']],
    },
    scenes: {
      /* ---------- the search ---------- */
      ch3_start: {
        art: 'ch3_corridors', mood: 'tense', fx: 'dust', sfx: 'boom',
        title: 'The school, searched',
        text: (s) => [
          s.flags.VOTE_LOST
            ? 'The Convocation voted to send Wren to the capital, and Vane\'s guard closed around the dais, and the Provost said *I will get the child back myself* — and she did. Nobody knows how, and nobody is asking. Vane has noticed. His soldiers are turning the school over, room by room, with a writ in one hand and a lantern in the other.'
            : 'The Convocation voted to keep Wren, and Lord Vane bowed to the vote and said nothing, and now his soldiers are turning the school over room by room, with a writ in one hand and a lantern in the other.',
          s.flags.WREN_HURT
            ? 'Wren\'s arm is strapped across the chest in what is left of Knot\'s cloak. The stair took it, and Wren has stopped pretending it did not.'
            : 'Boots on the stair. Boots in the Great Hall. The portraits in the long gallery have begun to mutter, the way they do when the school is afraid.',
          s.flags.VANE_ACCEPT
            ? { text: 'You told the Envoy you would bring him the boy. Nobody has mentioned it since. It sits in the pocket of the night like a coin.', cls: 'whisper' }
            : { text: 'Somewhere below, the Hearth burns lower than it did an hour ago.', cls: 'whisper' },
        ],
        next: 'ch3_gallery', button: 'The Gallery',
      },
      ch3_gallery: {
        art: 'ch3_gallery', mood: 'tense', fx: 'dust', sfx: 'open',
        title: 'The Gallery of the Masters',
        text: (s) => [
          'Two hundred years of Provosts and Masters in oil, floor to ceiling, and every one of them talking under their breath. You cannot make out the words. Hush can, a little, and wishes not to.',
          'Marrow is waiting between the frames with Wren, and with a face that has decided several things in a hurry.',
          { speaker: 'Marrow', text: 'The Bell Tower is warded; a Founders\' door and a threshold sigil. Vane\'s men cannot pass it and do not know that yet. Get Wren there before the third bell. I ring the bells tonight; I can give you twelve turns of the corridor clock, no more, or the timetable is noticed.' },
        ],
        next: 'ch3_marrow', button: 'The dark',
      },
      ch3_marrow: {
        art: 'ch3_gallery', mood: 'tense', fx: 'dust',
        title: 'The only map',
        text: (s) => [
          { speaker: 'Marrow', text: 'The corridors are dark. I have put out every lamp between here and the Tower myself. The only map of the patrols tonight is *sound*.' },
          'She looks at Hush when she says it.',
          { speaker: 'Wren', text: s.flags.WREN_HURT ? 'I can sneak. I can *mostly* sneak. Hush, you\'re going to have to tell me where the boots are, because I can\'t run from them one-armed.' : 'I like it. Sneaking. I\'ve been sneaking round this school for fourteen years and nobody\'s ever *asked* me to.' },
          { speaker: 'Marrow', text: 'Hearth. Attune them.' },
          'She touches the nearest frame — a woman with a thin gold chain — and the word beneath the paint shows through, for a moment, cold and green.',
        ],
        next: 'ch3_attune', button: 'The word',
      },
      ch3_attune: {
        type: 'code', art: 'ch3_gallery', mood: 'tense', fx: 'dust',
        text: ['Under the varnish of the oldest portrait, a word, and beside it a mark that was not there this morning. Each of you: open your Companion and turn the page with it.'],
        roles: 'Warden of the Hearth (keyboard): **Hush**. Voice (reads aloud): **Knot**.', sightSeconds: 90,
        next: 'ch3_corridors',
      },
      ch3_corridors: {
        art: 'ch3_corridors', mood: 'dread', fx: 'dust', sfx: 'step',
        title: 'The rules of the dark',
        text: (s) => [
          'Marrow goes to ring the bells. The lamps are out. Two patrols walk the corridors between here and the Tower, and they walk the same rounds every twelve beats, because soldiers are soldiers.',
          { text: 'Each turn, Wren moves one room or waits. At the end of a turn, if a patrol stands in Wren\'s room — or in a room joined to it by an open passage — Wren is seen, and scrambles back to the last safe room. The count keeps running.', cls: 'small' },
          { text: 'The third bell rings at the end of turn twelve. Guards are never drawn ahead of time; after every turn the Hearth shows where both patrols stood, so arguments end with facts.', cls: 'small' },
          s.flags.WREN_HURT ? { text: 'Wren\'s arm: the hidden doors are heavy, and one-handed, any hidden door will cost a turn to open before Wren can go through it.', cls: 'small' } : { text: 'Hush drives; Knot reads. Owl, Bookmoth — say what you see.', cls: 'small' },
        ],
        next: 'ch3_grid', button: 'Into the dark',
      },
      /* ---------- the stealth grid ---------- */
      ch3_grid: {
        type: 'puzzle', puzzle: 'grid', art: 'ch3_corridors', mood: 'dread', fx: 'dust', puzzleId: 'ch3_grid', par: [7, 10, 11],
        text: [
          'The Gallery at A1. The Tower door at E5. Between them: the west corridor, the porter\'s lodge, the cook\'s locked door, the east stair — and a great deal of dark.',
          { text: 'Row 1 dead-ends at the cook\'s door. What Hush hears, Owl can place. What Owl sees, Bookmoth can read. What Knot knows about the people in these rooms is worth more than a map.', cls: 'whisper' },
        ],
        config: gridConfig,
        hints: [
          'The patrols repeat every twelve beats. Hush hears where they are, beat by beat; Owl knows where "where" is.',
          'There is a room nobody searches. Owl sees its door; Knot knows who is inside — and Bookmoth can read what is carved over it.',
          'Into the Laundry by turn 6, out on turn 7; the east stair is clear on turns 9–11.',
          (s) => s.flags.WREN_HURT
            ? 'Turn 1 A2 · 2 A3 · 3 speak VEIL (the arm costs the turn) · 4 into the Laundry, B3 · 5 wait · 6 speak THORN (the turn) · 7 C3 · 8 D3 · 9 E3 · 10 E4 · 11 E5, the Tower. No slack.'
            : 'Turn 1 A2 · 2 A3 · 3 B3, the Laundry (VEIL) · wait turns 4, 5 and 6 · 7 C3 (THORN) · 8 D3 · 9 E3 · 10 E4 · 11 E5, the Tower. Leaving the Laundry on turn 8 instead arrives on turn 12.',
        ],
        onSolve: (s, r) => {
          Store.set('CH3_TURNS', r && r.turns);
          const seen = s.flags.CH3_SPOTTED || 0;   // counts every sighting, including before a "start over"
          Store.note(`Wren reached the Tower door on turn ${r && r.turns}${seen ? ', seen ' + seen + ' time' + (seen === 1 ? '' : 's') : ', never seen'}.`);
        },
        solvedText: (s, r) => [
          `Turn ${r.turns}. The Tower door, iron-bound, older than the wall around it, and Wren against it with both hands flat, laughing without any sound.`,
          s.flags.WREN_SCARED
            ? { speaker: 'Wren', text: 'The *fourth* bell. She rang a fourth bell. She\'s never done that. She\'s going to be in so much trouble, and it\'s going to be my fault, and — Hush. Hush, I could hear them. I could hear them the whole time.' }
            : { speaker: 'Wren', text: 'Hush. You\'re *terrifying*. "Boots, left, wait, now." Like a — like a very small general.' },
          s.flags.LINEN ? 'You answered Wren in the Laundry, one at a time, over the kettle. Nobody has said what.' : 'You did not go through the Laundry, and Wren did not get to ask.',
        ],
        next: (s) => s.flags.LINEN ? 'ch3_whispers' : 'ch3_whispers_late',
      },
      ch3_whispers_late: {
        art: 'ch3_towerdoor', mood: 'tense', fx: 'dust',
        text: [
          'Before the door, in the dark of the stair-foot, Wren tugs each of your sleeves in turn. There was no Laundry, no kettle to hide it; Wren does it anyway.',
          { speaker: 'Wren', text: 'Open SPEAK. Type LINEN. Then just — answer me. Don\'t say it out loud.' },
        ],
        enter: () => { Store.set('LINEN', true); },
        next: 'ch3_whispers', button: 'Answer',
      },
      /* ---------- the whispers ---------- */
      ch3_whispers: {
        type: 'token', art: 'ch3_towerdoor', mood: 'sorrow', fx: 'dust',
        text: [
          'Wren asked each of you one question, in a whisper, and each of you answered alone.',
          { text: 'Say what you see. Never show your phone. Each of you: open SPEAK, choose, and type the sealed word your phone gives you here. The Hearth will say only *received*.', cls: 'whisper' },
          { text: 'If your SPEAK page is still sealed, the word is LINEN, with no mark.', cls: 'small' },
        ],
        prompt: 'Four sealed words, one from each phone.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i) => S.decode(L.channel('whisper', L.roles[i].id), tok, L.tokens.whisper[L.roles[i].id]),
        badText: 'The fire does not know that word. Check the phone — the sealed word is four letters, and it is only shown after you choose.',
        stuckText: 'A wrong-beat word is rejected too: make sure it is the word from the whisper, not from an earlier page.',
        onTokens: (values, s) => {
          const truth = { reader: 'DONTKNOW', listener: 'NO', seer: 'TELL', binder: 'DONTKNOW' };
          let truths = 0;
          values.forEach((v, i) => { const r = L.roles[i].id; s.flags['WHISPER_' + r] = v; if (v === truth[r]) truths++; });
          s.flags.TRUTHS = truths;
          s.flags.WREN_TRUST = (s.flags.WREN_TRUST || 0) + 1;
          Store.note('Wren asked each of you a question in the dark. Each of you answered.');
        },
        button: 'Speak the words',
        next: 'ch3_thanks',
      },
      ch3_thanks: {
        art: 'ch3_towerdoor', mood: 'sorrow', fx: 'dust',
        text: [
          'Received. Received. Received. Received.',
          'Wren looks at the four of you, one after another, longer than is comfortable.',
          { speaker: 'Wren', text: 'Thank you. All of you. Even the ones who lied.' },
          'Nobody asks which ones that means. Behind you, on the stair, something in armour clears its throat.',
        ],
        next: 'ch3_door', button: 'Turn around',
      },
      /* ---------- the Tower door ---------- */
      ch3_door: {
        type: 'choice', art: 'ch3_towerdoor', mood: 'dread', fx: 'dust', sfx: 'alarm', choice: 'TOWER_DOOR',
        timer: 60, timerText: '*Sixty heartbeats. If no one speaks, the captain takes the silence for an answer.*', timeout: 'surrender',
        text: (s) => [
          'Vane\'s captain, and six of Vane\'s soldiers, filling the stair behind you with lantern-light. He is not hurried. He has the writ, and he has something else.',
          { speaker: 'The captain', text: 'Hand over the boy or the Provost hangs. The Envoy has her in the Great Hall with a rope over the beam, and a countdown. I am not a cruel man. I am a punctual one.' },
          s.flags.VANE_ACCEPT ? 'He looks at you a beat longer than at Wren. He knows what you told the Envoy.' : 'Wren has gone very still against the door.',
        ],
        prompt: 'The Tower door is warded. Vane\'s captain waits. Choose, together.',
        options: [
          { id: 'fight', text: 'FIGHT — wake the threshold ward on the Tower door.', sub: 'Two carved shapes over the door. A two-glyph sigil, closed by four hands. The ward flares; the rest of the night gets no gentler for it.', next: 'ch3_fight' },
          { id: 'bluff', text: 'BLUFF — "Lord Vane\'s orders. We are bringing the boy to him ourselves."', sub: 'You told the Envoy you would. The captain may have been told the same.', cls: 'bright', if: (s) => !!s.flags.VANE_PRETEND, next: 'ch3_bluff', set: { DOOR: 'BLUFF' }, note: 'You bluffed the captain with the Envoy\'s own offer.' },
          { id: 'word', text: 'VANE\'S WORD — "The Envoy has our word. Stand aside."', sub: 'You accepted his offer. His captain knows it.', cls: 'bright', if: (s) => !!s.flags.VANE_ACCEPT, next: 'ch3_word', set: { DOOR: 'WORD' }, note: 'The captain let Wren pass on Vane\'s word.' },
          { id: 'writ', text: 'SORREL\'S WRIT — "The Convocation\'s seal. Read it, captain."', sub: 'Master Sorrel gave you her writ for the Ember. It names the bearers as the Convocation\'s own.', cls: 'bright', if: (s) => !!s.flags.SORREL, next: 'ch3_writ', set: { DOOR: 'WRIT' }, note: 'Sorrel\'s writ turned the captain back.' },
          { id: 'surrender', text: 'SURRENDER WREN.', sub: 'The Provost lives. Wren goes with the captain.', cls: 'dark', next: 'ch3_surrender', set: { DOOR: 'SURRENDERED', SURRENDERED: true, WREN_TRUST: (s) => (s.flags.WREN_TRUST || 0) - 2 }, note: 'You handed Wren to the captain at the Tower door.' },
        ],
      },
      ch3_fight: {
        type: 'puzzle', puzzle: 'ring', art: 'ch3_towerdoor', mood: 'tense', fx: 'dust', puzzleId: 'ch3_fight', par: [2, 4],
        text: [
          'Over the Tower door, two shapes cut deep into the lintel by a Founder\'s hand, and beneath them a ring of two slots gone dull with soot. A threshold sigil: it does not open a door. It decides who may stand in front of one.',
          { text: 'Two glyphs. Which two, in which slots, and which way up: Bookmoth, Owl, Hush, Knot. Then four hands, before the captain counts to anything.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE THRESHOLD OF THE BELL TOWER', note: 'Two shapes are carved over the door:', html: G.inscription([{ shape: 'Flame', inv: false }, { shape: 'Spike', inv: false }], { showMark: false }),
          slots: 2, glyphs: glyphPalette(), answer: { 1: 'ASH', 2: 'THORN' }, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to wake the ward',
          wrongText: 'The soot stays soot. Frost creeps into the slots and the ring forgets. The captain takes a step.',
        }),
        hints: ['Owl knows which end the lintel\'s mark is on, and where the ring begins. Bookmoth has both readings of both shapes.', 'Upright, left to right: fire, then go-through. Knot\'s first Law: sunwise from the mark.', 'ASH in slot 1, THORN in slot 2. Then four hands.'],
        onSolve: () => { Store.set('DOOR', 'FIGHT'); Store.note('You woke the threshold ward on the Tower door.'); },
        solvedText: [
          'The ward wakes. Not light — *heat*, a wall of it, the kind that stands off a winter. The lanterns on the stair gutter and go out together. The captain\'s hand goes to his face.',
          { speaker: 'The captain', text: 'Founders\' work. So. Not tonight, then.' },
          'He backs his men down the stair without turning round. He is, as he said, a punctual man; he will be punctual later.',
          { speaker: 'Wren', text: 'That was the *best* thing. That was the best thing I have ever seen. Is the Provost — she\'s fine. She\'s always fine. Isn\'t she?' },
          { text: 'The ward will remember what you asked of it. Whatever comes down the Long Stair after you will come faster.', cls: 'whisper' },
        ],
        next: 'ch3_flow',
      },
      ch3_bluff: {
        art: 'ch3_towerdoor', mood: 'court', fx: 'dust',
        text: [
          { speaker: 'Knot', text: 'Lord Vane\'s orders. He offered us Masterships before dawn for the boy, and we are bringing him — ourselves, to the Envoy\'s own door, as he asked. Do you want to be the one who took that from your master\'s hands?' },
          'It is the offer, word for word. The captain heard his master make it; he has no way to know how you answered.',
          { speaker: 'The captain', text: '…Then the Envoy will see you at his door. With the boy.' },
          'He goes down the stair with his lanterns. Wren lets out a breath that has been held since the Great Hall.',
          { speaker: 'Wren', text: 'You lied to a man with a *rope*. Knot. I didn\'t know you had it in you.' },
          { speaker: 'Knot', text: 'Neither did I.' },
        ],
        next: 'ch3_flow', button: 'The Tower',
      },
      ch3_word: {
        art: 'ch3_towerdoor', mood: 'court', fx: 'dust',
        text: [
          'You do not need to raise your voices. The captain already knows.',
          { speaker: 'The captain', text: 'The Envoy said you had given your word. He said you would bring the boy before dawn, and that I was to let you go about it however you chose.' },
          'He steps aside. His men step aside. It costs you nothing at all, which is the worst thing about it.',
          { speaker: 'Wren', text: 'Why is he letting us — what did you *say* to him?' },
          'Nobody answers. Wren looks at the four of you, and then at the door, and decides, visibly, not to ask again tonight.',
        ],
        next: 'ch3_flow', button: 'The Tower',
      },
      ch3_writ: {
        art: 'ch3_towerdoor', mood: 'court', fx: 'dust',
        text: [
          'Master Sorrel\'s writ, the one she gave you for the Ember: *the bearers act for the Convocation of Thornhallow, and any who hinder them answer to the nine.* The captain reads it twice by lantern-light.',
          { speaker: 'The captain', text: 'The Envoy holds the Crown\'s writ. This is the Convocation\'s. I was not sent to start a war between them on a stair.' },
          'He backs down. He does not like it. Sorrel, you suspect, will hear about this before you do.',
          { speaker: 'Wren', text: 'Sorrel? *Sorrel* saved me? I called her a goat once. To her face. Twice.' },
        ],
        next: 'ch3_flow', button: 'The Tower',
      },
      ch3_surrender: {
        art: 'ch3_towerdoor', mood: 'sorrow', fx: 'ash',
        text: (s) => [
          s.flags.TOWER_DOOR_timedout
            ? 'The sixty heartbeats run out. Nobody has spoken. The captain takes that for an answer, and so, after a moment, does Wren.'
            : 'You say it. One of you says it, and the others do not say otherwise, which is the same thing.',
          { speaker: 'Wren', text: 'Right. Yes. That\'s — she\'d do the same. She\'d hand me over for her, I mean, if — that came out wrong.' },
          'Wren walks down the stair between two soldiers without being touched, and looks back once, not at any of you in particular.',
          { speaker: 'Wren', text: 'Tell the Provost I said the corridors were *easy*.' },
          'The captain nods to you, as one punctual person to another, and is gone. The Tower door stands warded and useless behind you.',
          { text: 'The Provost will not hang tonight. She will find that out for herself, and she will find out why.', cls: 'whisper' },
        ],
        enter: () => { Store.set('DOOR', 'SURRENDERED'); Store.set('SURRENDERED', true); },
        next: 'ch3_flow', button: 'The empty stair',
      },
      /* ---------- the flowchart ---------- */
      ch3_flow: {
        type: 'flow', art: 'ch3_towerdoor', artParams: (s) => ({ ward: s.flags.DOOR === 'FIGHT' ? 'ash' : null }), mood: 'hearth', fx: 'dust',
        text: (s) => [
          s.flags.DOOR === 'SURRENDERED' ? 'The third bell has rung. The Provost is coming up the stair, and she is not coming to thank you.' : 'The Tower stair, and the third bell already rung. Above you, the Provost\'s study, and an oath she means you to swear.',
          { text: 'Four boxes on the chart are sealed. They stay sealed until the end of the night.', cls: 'small' },
        ],
        flowTitle: 'Chapter III — the paths you walked',
        stats: (s) => {
          const parts = [];
          if (s.flags.CH3_TURNS) parts.push(`Wren reached the Tower on **turn ${s.flags.CH3_TURNS}**` + (s.flags.CH3_SPOTTED ? `, seen ${s.flags.CH3_SPOTTED} time${s.flags.CH3_SPOTTED === 1 ? '' : 's'}` : ', never seen') + (s.flags.WREN_SCARED ? ', after a fourth bell' : '') + '.');
          parts.push('Wren asked four questions. **Four sealed answers.**');
          parts.push(`The Tower door: **${({ FIGHT: 'the ward, woken', BLUFF: 'a bluff', WORD: 'the Envoy\'s word', WRIT: 'Sorrel\'s writ', SURRENDERED: 'Wren, surrendered' })[s.flags.DOOR] || 'unresolved'}**.`);
          parts.push('Hints so far: ' + (s.flags.hintsTotal || 0) + '.');
          return parts.join(' ');
        },
        next: 'ch4_start', button: 'The Oath',
      },
    },
  });
})();
