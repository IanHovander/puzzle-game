/* Prologue — The Night the Hearth Guttered */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Input = window.VigilInput, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  /* Chapter-local fit. The teaching ring is the widest board in the game — nine palette tiles, each
     with a shape on it — and it is the one puzzle the room meets before it has learned that the panel
     can be scrolled at all. Measured on the shipped build with `node tools/scan-fit.js ch0 --w 1152
     --h 648`: "ch0_lamp: puzzle panel scrolls, 193px below the fold", and what was below it was the
     Clear ring button, the bottom row of the palette and Close the sigil — every control for
     correcting a misplacement and the only way to commit. The global step at 820px is not enough for
     a ring this wide, so the Prologue takes a second one of its own. (ch1.js:15 does the same for the
     table of nine seats.) */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    @media (max-height: 780px) {
      body[data-chapter="ch0"] .ring-pz .wheel { width: min(31vh, 300px); height: min(31vh, 300px); }
      body[data-chapter="ch0"] .ring-pz .wheel-wrap { gap: 12px; }
      body[data-chapter="ch0"] .ring-pz .palette { min-width: 200px; flex-basis: 200px; }
      body[data-chapter="ch0"] .ring-pz .palette-grid { gap: 6px; max-width: 340px; }
      body[data-chapter="ch0"] .ring-pz .palette-grid .glyph { width: 62px; height: 66px; }
      body[data-chapter="ch0"] .ring-pz .palette-grid .glyph svg { width: 34px; height: 34px; }
      body[data-chapter="ch0"] .ring-pz .pz-note { font-size: 14px; line-height: 1.35; }
    }
  ` }));

  Game.addChapter({
    id: 'ch0', label: 'Prologue', title: 'The Night the Hearth Guttered', start: 'ch0_start', code: 'KINDLE',
    mood: 'hearth', fx: 'embers', art: 'ch0_hearthfire', flame: 1,
    flow: {
      nodes: [
        { id: 'ch0_start', label: 'Four hundred years of fire', col: 0, row: 0 },
        { id: 'ch0_dorm', label: 'The dormitory, past curfew', col: 1, row: 0 },
        { id: 'ch0_practice', label: 'The four keys', col: 2, row: 0 },
        { id: 'ch0_dare', label: "Wren's dare", col: 3, row: 0 },
        { id: 'ch0_carve', label: 'A name in the brass', col: 4, row: 0 },
        { id: 'ch0_lamp', label: 'The lamp, lit the old way', col: 5, row: 0 },
        { id: 'ch0_name', label: 'What Wren calls you', col: 6, row: 0, kind: 'choice' },
        { id: 'ch1_start', label: 'Tomorrow', col: 7, row: 0 },
      ],
      edges: [['ch0_start', 'ch0_dorm'], ['ch0_dorm', 'ch0_practice'], ['ch0_practice', 'ch0_dare'], ['ch0_dare', 'ch0_carve'], ['ch0_carve', 'ch0_lamp'], ['ch0_lamp', 'ch0_name'], ['ch0_name', 'ch1_start']],
    },
    scenes: {
      /* ---------- cold open ---------- */
      ch0_start: {
        art: 'ch0_hearthfire', mood: 'hearth', fx: 'embers', speed: 13,
        text: [
          { text: 'Four hundred years ago, four people closed a wound in the world.', cls: 'center' },
          { text: 'They left a fire on top of it, to hold it shut.', cls: 'center' },
          { text: 'The fire is called the Hearth. It has never once gone out.', cls: 'center' },
          { text: 'Except one night, fourteen years ago.', cls: 'center' },
          { text: 'When it came back, there was a baby asleep on the stones.', cls: 'center' },
          { text: 'That child is Wren. Wren is fourteen. So are you.', cls: 'center' },
        ],
        next: 'ch0_stone', button: 'Look up',
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          'Above the fire, cut into the stone, one sentence in a language nobody has spoken for four hundred years.',
          'Nobody alive has read the cuts. Every child here learns the school\'s translation, and every grown-up here argues about it.',
          { text: '"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them."', cls: 'omen' },
          'You cannot walk into weather. The Cold is a place, and nobody will tell you where.',
          { text: 'You will be shown this sentence again, when it matters, and closer than this. Nothing tonight needs writing down.', cls: 'small' },
          'Nobody agrees what the rest of it means. Everybody agrees who it is about.',
          { text: 'The masters come in the morning to argue about it. Tonight is only the night before.', cls: 'small' },
          'And tonight, for the first time in fourteen years, the Hearth is flickering.',
        ],
        next: 'ch0_dorm', button: 'The night before',
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          'Four of you, awake past curfew, in a room with four beds and one round window.',
          'On the sill stands a brass lamp older than any record the school keeps. Nobody has ever got it to light. Everybody has tried.',
          'You have known each other since you were seven. Each of you sees one thing the other three cannot.',
          { text: 'Sit in this order, left to right: the **Reader**, the **Listener**, the **Seer**, the **Binder**. Those are your seats for the whole night.', cls: 'whisper' },
        ],
        next: 'ch0_keys', button: 'Claim the keys',
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { text: 'One keyboard, one key each. Press yours when it glows.', cls: 'whisper' },
          { text: 'Then all four together, inside one second. Four hands is how this school does anything that matters.', cls: 'whisper' },
        ],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz' });
          const st = UI.el('div', { class: 'pz-status' });
          const pads = UI.el('div', {});
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE FOUR KEYS' }));
          wrap.appendChild(pads); wrap.appendChild(st);
          const remap = UI.el('button', { class: 'btn small ghost', text: 'A key is not working — change keys', onclick: async () => {
            const v = await UI.ask('Four keys, left to right, separated by spaces:', Store.state.keys.join(' '), { plain: true, ok: 'Set keys' });
            if (!v) return; const ks = v.trim().split(/\s+/).map(x => x.toUpperCase()).filter(x => x.length === 1);
            if (ks.length !== 4 || new Set(ks).size !== 4) { await UI.notice('Need four different single keys.'); return; }
            Store.state.keys = ks; Store.save(); Input.setKeys(ks); Input.deactivate(); Input.activate(pads, onPress); step = 0; arm();
          } });
          wrap.appendChild(remap);
          box.appendChild(wrap);
          let step = 0; const times = [];
          const arm = () => {
            for (let i = 0; i < 4; i++) Input.setPadState(i, 'armed', i === step);
            st.className = 'pz-status';
            st.textContent = step < 4 ? `${nick(step)} — your key.` : 'Now all four together.';
            // Hands may already be on the keys from the round just finished: those count, without a fresh press.
            if (step === 4) setTimeout(() => { const h = Input.held ? Input.held() : []; h.forEach((isDown, i) => { if (isDown) onPress(i); }); }, 60);
          };
          const onPress = (idx) => {
            if (step < 4) {
              if (idx !== step) { st.className = 'pz-status bad'; st.textContent = `That is the ${nick(idx)}'s key. ${nick(step)}, yours.`; Audio.sfx('wrong'); return; }
              Audio.sfx('key', idx); Input.setPadState(idx, 'good', true); step++; arm(); return;
            }
            // four hands
            times[idx] = performance.now(); Input.setPadState(idx, 'glow', true);
            const set = times.filter(x => x != null);
            if (set.length === 4) {
              const spread = Math.max(...set) - Math.min(...set);
              if (spread <= 1000) { Audio.sfx('success'); st.className = 'pz-status good'; st.textContent = 'Four hands. The room holds still.'; Input.deactivate(); setTimeout(() => resolve('ch0_practice'), 900); }
              else { st.className = 'pz-status bad'; st.textContent = `Too far apart (${(spread / 1000).toFixed(1)} s). Count in — one, two, three, press.`; for (let i = 0; i < 4; i++) { times[i] = null; Input.setPadState(i, 'glow', false); } }
            }
            setTimeout(() => { const now = performance.now(); for (let i = 0; i < 4; i++) if (times[i] != null && now - times[i] > 1000) { times[i] = null; Input.setPadState(i, 'glow', false); } }, 1100);
          };
          Input.activate(pads, onPress); arm();
        }),
      },
      ch0_practice: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch0_dorm', mood: 'tower', fx: 'dust', puzzleId: 'ch0_practice', replayable: true,
        text: [
          'Later tonight you will do this for real, against a clock, and it will cost something. This costs nothing.',
          { text: 'Press as your light crosses the line.', cls: 'whisper' },
          { text: 'Purple means everyone.', cls: 'whisper' },
        ],
        config: () => ({ practice: true, laneNames: L.nicks, fallMs: 2000, windowMs: 420, events: window.VigilReaction.generateEvents({ count: 7, seed: 5, mix: { single: 1 }, gapMs: 1500, startMs: 2500 }).concat([{ t: 14500, lanes: [0, 1, 2, 3], kind: 'all' }]) }),
        next: 'ch0_wren',
      },
      /* ---------- Wren ---------- */
      ch0_wren: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          'The door bangs open.',
          { speaker: 'Wren', text: 'You\'re awake. Good. I need four idiots and a lamp.' },
          { speaker: 'Wren', text: 'Reader — you read everything and eat nothing. Any carving, however worn.' },
          { speaker: 'Wren', text: 'Listener — you can hear a spider think, two floors down.' },
          { speaker: 'Wren', text: 'Seer — you see under things. Under paint. Under four hundred years of polish.' },
          { speaker: 'Wren', text: 'Binder — you know every rule in the book, and who is tied to who.' },
        ],
        next: 'ch0_dare', button: 'And you?',
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { speaker: 'Wren', text: 'Me? I\'m the thing they\'re all coming to look at.' },
          { speaker: 'Wren', text: 'Tomorrow I stand at the front of a hall and stay still while grown-ups decide about me. I don\'t get a say. That is the entire job.' },
          { speaker: 'Wren', text: 'So tonight I want one thing that\'s mine. That lamp.' },
          { speaker: 'Wren', text: 'A hundred people have tried to light it with a match. Nobody has tried it with a sigil.' },
          { speaker: 'Wren', text: 'Carve my name in it first, so it knows whose lamp it is.' },
        ],
        next: 'ch0_carve', button: 'Carve it',
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: ['A hundred names already in the brass. A hundred people who tried a match.'],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: 'Wren, arms folded: "My name. Mine. W-R-E-N."', submitText: 'Carve' }),
        solvedText: [
          'It flares blue, once, and dies.',
          { speaker: 'Wren', text: 'Told you. Names don\'t burn. Words do — the old ones.' },
          { speaker: 'Wren', text: 'Reader — there are two shapes cut round the lamp\'s collar. You\'re the only one here who can read them.' },
          { speaker: 'Wren', text: 'Listener — it hums. It\'s hummed since before we were born.' },
          { speaker: 'Wren', text: 'Seer — there\'s something cut under the brass that nobody has ever seen. You will.' },
          { speaker: 'Wren', text: 'Binder — you know the rule about rings. The one nobody else was taught.' },
          { speaker: 'Wren', text: 'Nobody has all four. That\'s the whole trick of it.' },
        ],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', mood: 'tower', fx: 'dust',
        text: [
          { text: 'Open the Companion on your phone. Take your seat. Type this word.', cls: 'whisper' },
          { text: 'Your phone keeps everything it shows you — in the **Book** tab, all night. You will never have to remember it.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          { text: 'A sigil is words in slots. This ring has four slots.', cls: 'whisper' },
          { text: 'The Reader has the words. The Listener has the order. The Seer has the cuts. The Binder has the rule. Nobody has two.', cls: 'whisper' },
          { text: 'Say what you see. Never show your phone.', cls: 'whisper' },
          { text: 'Stuck? The fire keeps a Hint.', cls: 'small' },
        ],
        config: () => ({
          title: 'THE DORMITORY LAMP',
          note: 'Four brass sockets around the foot. Two shapes cut around the collar, worn past reading — the Reader\'s page has them clean.',
          slots: 4, glyphs: glyphPalette(), answer: { 3: 'ASH', 4: 'EMBER' },
          allowEmpty: true, showArrow: false,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys, within a second',
          wrongText: 'The brass stays cold. The ring forgets what you put in it.',
          onWrong: (m, tries) => tries >= 2 ? 'The brass stays cold. Wren, unhelpfully: “Has everyone actually said their bit?”' : null,
        }),
        hints: [
          'Four answers, four people, and nobody has two. Which words — the Reader. What order — the Listener. What is cut under the brass — the Seer. What a cut means — the Binder.',
          'Two words, and the hum between them says which of the two is spoken first. The Listener has that step. And there is more than one cut under the brass — the Binder knows which kind starts a sigil.',
          'ASH in slot 3, EMBER in slot 4. The other two stay empty. Then four hands.',
        ],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); },
        solvedText: [
          'The brass takes the words. The lamp catches — warm, steady, and against about a dozen school rules.',
          { speaker: 'Wren', text: 'Four hundred years. Still works.' },
          'Four hundred years, and it needed all four of you: one to read it, one to put it in order, one to find the cuts, one to know the rule.',
          { text: 'ASH, EMBER. *Fire, keep.* That is all it ever said.', cls: 'small' },
          'And in that light, each of you sees the thing about Wren that you have never said out loud.',
          { text: 'Open the tab marked **Wren**. One line each, out loud, in seat order: Reader, Listener, Seer, Binder.', cls: 'whisper' },
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [
          'Nobody says anything for a moment.',
          { speaker: 'Wren', text: 'Yes. All four of you. I\'ve known for years.' },
          { speaker: 'Wren', text: 'It\'s fine. You can stop pretending you didn\'t notice.' },
          { speaker: 'Wren', text: 'And you need a name. As a set.' },
        ],
        options: [
          { id: 'four', text: '"The Four."', next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: 'Wren', text: 'Grand.' }] },
          { id: 'idiots', text: '"The Idiots."', next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: 'Wren', text: 'Finally, honesty.' }] },
          { id: 'vigil', text: '"The Vigil-in-waiting."', next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: 'Wren', text: 'Mum — the Provost — will hate that.' }] },
          { id: 'own', text: 'Something of our own.', next: 'ch0_flow', ask: { prompt: 'What does Wren call the four of you?', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => [{ speaker: 'Wren', text: '"' + (s.flags.GROUP_NAME || 'the Four') + '." Right. That\'s what I\'m saying tomorrow, then.' }] },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', mood: 'hearth', fx: 'dust',
        text: [
          'Below, in the great hall, the Hearth flickers again.',
          'The school has a word for what each of you just did. A Sighting. One way of seeing, one to a person, and nobody chooses which one they get.',
          'Tomorrow you will stand at the back of a hall while grown-ups decide about Wren. Every one of them has a Sighting of their own.',
          { text: 'After each chapter the Hearth shows you every path — the ones you walked, and the ones you did not.', cls: 'small' },
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: 'The Vigil',
      },
    },
  });
})();
