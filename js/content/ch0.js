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
          { text: 'They did it the way people did things then: thoroughly, with fire, and without leaving notes.', cls: 'center' },
          { text: 'The fire is called the Hearth. It has gone out exactly once. Fourteen years ago, for one night.', cls: 'center' },
          { text: 'When it came back, a baby was asleep on the stones, looking pleased with itself, as if it had been expected. Nobody ever came for it.', cls: 'center' },
          { text: 'You were all born that year. Wren was found.', cls: 'center' },
        ],
        next: 'ch0_stone', button: 'Look up',
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          'Above the fire, a line is cut into the stone. It is a prophecy: the kind of sentence that only becomes clear once it is too late to do anything about it.',
          { text: '"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them."', cls: 'omen' },
          'The school teaches a translation. The original is in letters no one alive can read. The Cold is not weather. It is a place, and the Masters will not say where.',
          'Everybody agrees who it is about. Nobody finishes it out loud when Wren is in the room.',
          'And tonight, for the first time in fourteen years, the Hearth is flickering. The Masters give it until midnight tomorrow.',
          { text: 'No need to write anything down.', cls: 'small' },
        ],
        next: 'ch0_dorm', button: 'The night before',
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          'Up the east stair is a tower room with four beds, one round window, and, on the sill, a brass lamp that has never been lit.',
          'This is not for want of trying. The lamp has been offered matches, tapers, prayers and one very confident third-year. It has declined them all.',
          'A fifth blanket lies folded on the floor. Each of you has folded it at some point and said nothing. Officially, it is nobody\'s.',
          'The four of you are in bed past curfew, in the particular silence of people not talking about tomorrow.',
          'You have been friends since you were seven. Wren adopted you the first week, the way a cat adopts a house: without asking, and for good.',
          { text: 'Sit left to right: the **Reader**, the **Listener**, the **Seer**, the **Binder**. Keep these seats all night.', cls: 'whisper' },
        ],
        next: 'ch0_keys', button: 'Claim the keys',
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { text: 'One keyboard, one key each. Press yours when it glows.', cls: 'whisper' },
          { text: 'Then all four at once.', cls: 'whisper' },
        ],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz' });
          const st = UI.el('div', { class: 'pz-status' });
          const pads = UI.el('div', {});
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE FOUR KEYS' }));
          wrap.appendChild(pads); wrap.appendChild(st);
          const remap = UI.el('button', { class: 'btn small ghost', text: 'Key not working? Change keys', onclick: async () => {
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
          'Practice. Later tonight, it counts.',
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
          'The door bangs open. Wren has never knocked on this door, on the principle that nobody knocks on their own.',
          { speaker: 'Wren', text: 'You\'re awake! Brilliant. I need four idiots and a lamp, and look, the universe has provided.' },
          'The Binder knows every school rule, and a few ancient ones about how words go into a ring. This, the Binder points out, breaks four of them. "Five," says Wren, pleased. The Binder counts, finds five, and gets up anyway.',
          { speaker: 'Wren', text: 'Everyone\'s tried that lamp with a match. Nobody\'s ever tried *reading* it.' },
          'Words older than the school are cut round its collar. The Reader is out of bed before deciding to be, and takes unreadable words personally.',
          'The Reader has missed supper again. A biscuit appears in the Reader\'s hand. Nobody sees Wren put it there. Nobody ever does.',
        ],
        next: 'ch0_dare', button: 'And you?',
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { speaker: 'Wren', text: 'Me? I\'m the main event. Tomorrow I stand at the front of the hall while the Houses decide what I\'m for. I\'ve been practicing standing still. My record is eleven seconds.' },
          'It is a good joke. Wren has clearly been working on it. The Listener checks, very casually, whether Wren\'s hands are cold. They always are.',
          { speaker: 'Wren', text: 'Everything I have, somebody gave me. The name. The bed. My birthday is just the night they found me. So tonight I want one good thing that\'s *ours*.' },
          'Then, as if it had been listening, the lamp begins to hum. Two notes, over and over. Only the Listener hears it.',
          'The Seer looks under the lamp, finds an old cut beneath the polish, and does the face. The face has meant "terrible idea" since you were seven. It has never once stopped anything.',
        ],
        next: 'ch0_carve', button: 'Carve it',
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: ['"Our names first," says Wren, "so it knows whose it is."', 'A hundred names are already in the brass, mostly belonging to people who were very sure about matches. There is room for one more.', 'Four of you look at the same person.'],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: '"That\'s not the one you all looked at," says Wren, who noticed.', submitText: 'Carve' }),
        solvedText: [
          'The brass flares blue, once, and goes out.',
          { speaker: 'Wren', text: 'That\'s my name. I said *ours*.' },
          'Wren looks at the four of you for a long second. For once, Wren does not have the next line ready.',
          { speaker: 'Wren', text: 'Right. Well. It noticed me. Names don\'t burn, though. Old words do. And old words need all four of you.' },
        ],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', mood: 'tower', fx: 'dust',
        text: [
          { text: 'Open the Companion on your phone. Pick your seat. Type this word.', cls: 'whisper' },
          { text: 'Your phone\'s **Book** tab keeps everything.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          { text: 'A sigil is words in slots. This ring has four slots.', cls: 'whisper' },
          { text: 'Say what you see. Never show your phone.', cls: 'whisper' },
          { text: 'Stuck? Press Hint.', cls: 'small' },
        ],
        config: () => ({
          title: 'THE DORMITORY LAMP',
          note: 'Two shapes on the collar, worn smooth.',
          slots: 4, glyphs: glyphPalette(), answer: { 3: 'ASH', 4: 'EMBER' },
          allowEmpty: true, showArrow: false,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys, within a second',
          wrongText: 'The brass stays cold. The ring forgets what you put in it.',
          onWrong: (m, tries) => tries >= 2 ? 'The brass stays cold. Wren, unhelpfully: “Has everyone actually said their bit?”' : null,
        }),
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'The hum says which word goes first. Only one cut marks the start.',
          'ASH in slot 3, EMBER in slot 4. The other two stay empty. Then four hands.',
        ],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); },
        solvedText: [
          'The lamp catches: warm, steady and gold, as if it had only been waiting for the right people to ask.',
          { speaker: 'Wren', text: 'Four hundred years, and it still works. Mom\'ll — the Provost\'ll — kill me.' },
          'Wren drags the fifth blanket over and sits as close to the flame as the glass allows. Wren always does.',
          { text: 'ASH, EMBER. *Fire, keep.* That is all it ever said.', cls: 'small' },
          'In that light, each of you sees the thing about Wren you have never said out loud.',
          { text: 'Open your **Wren** tab. Read your line to Wren, out loud, in seat order.', cls: 'whisper' },
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [
          'For a while, the only sound is the lamp. Then Wren laughs, which is what Wren does instead of the other thing.',
          { speaker: 'Wren', text: 'I know. All four of you. I\'ve known for years. I let you.' },
          { speaker: 'Wren', text: 'You lot are terrible at secrets. …Thank you. Don\'t make it a thing.' },
          { speaker: 'Wren', text: 'Now. You need a name, as a set. I want something good to say tomorrow.' },
        ],
        options: [
          { id: 'four', text: 'Binder: "The Four."', next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: 'Wren', text: 'Grand. Very carved-in-stone.' }] },
          { id: 'idiots', text: 'Seer: "The Idiots."', next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: 'Wren', text: 'Finally, honesty.' }] },
          { id: 'vigil', text: 'Reader: "The Vigil-in-waiting."', next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: 'Wren', text: 'The Provost will *hate* that. Perfect.' }] },
          { id: 'own', text: 'Listener: "Something of our own?"', next: 'ch0_flow', ask: { prompt: 'What does Wren call the four of you?', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => [{ speaker: 'Wren', text: '"' + (s.flags.GROUP_NAME || 'the Four') + '." Right. That\'s what I\'m saying tomorrow, then.' }] },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', mood: 'hearth', fx: 'dust',
        text: [
          'Wren talks until all four of you are asleep. This takes some time, because Wren is never more interesting than at one in the morning. Nobody sees whether Wren sleeps at all.',
          'Below, in the great hall, the Hearth flickers again.',
          'The school has a word for what each of you did tonight. A *Sighting*. One way of seeing, one to a person, handed out at birth by nobody in particular.',
          'Tomorrow the hall fills with grown-ups who have Sightings too. They have watched Wren for fourteen years. Not one of them has said what they saw.',
          { text: 'The chart shows the paths you took, and the ones you didn\'t.', cls: 'small' },
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: 'The Vigil',
      },
    },
  });
})();
