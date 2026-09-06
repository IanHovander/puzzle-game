/* Prologue — The Night the Hearth Guttered */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Input = window.VigilInput, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  Game.addChapter({
    id: 'ch0', label: 'Prologue', title: 'The Night the Hearth Guttered', start: 'ch0_start', code: 'KINDLE',
    mood: 'hearth', fx: 'embers', art: 'ch0_hearthfire', flame: 1,
    flow: {
      nodes: [
        { id: 'ch0_start', label: 'Four hundred years of fire', col: 0, row: 2 },
        { id: 'ch0_dorm', label: 'The dormitory', col: 1, row: 2 },
        { id: 'ch0_lamp', label: 'The lamp, the old way', col: 2, row: 2, kind: 'choice' },
        { id: 'ch0_name', label: 'What Wren calls you', col: 3, row: 2, kind: 'choice' },
        { id: 'ch1_start', label: 'The Vigil', col: 4, row: 2, secret: true },
        { id: 'ch0_x1', label: 'the Convocation', col: 4, row: 0, secret: true },
        { id: 'ch0_x2', label: 'the Envoy', col: 4, row: 1, secret: true },
        { id: 'ch0_x3', label: 'the Vault', col: 4, row: 3, secret: true },
        { id: 'ch0_x4', label: 'the Gallery', col: 4, row: 4, secret: true },
        { id: 'ch0_x5', label: 'the Stair', col: 5, row: 1, secret: true },
        { id: 'ch0_x6', label: 'the Bells', col: 5, row: 3, secret: true },
      ],
      edges: [['ch0_start', 'ch0_dorm'], ['ch0_dorm', 'ch0_lamp'], ['ch0_lamp', 'ch0_name'], ['ch0_name', 'ch1_start'], ['ch0_name', 'ch0_x1'], ['ch0_name', 'ch0_x2'], ['ch0_name', 'ch0_x3'], ['ch0_name', 'ch0_x4'], ['ch0_x2', 'ch0_x5'], ['ch0_x3', 'ch0_x6']],
    },
    scenes: {
      /* ---------- cold open ---------- */
      ch0_start: {
        art: 'ch0_hearthfire', mood: 'hearth', fx: 'embers', speed: 18,
        text: [
          { text: 'Four hundred years ago, four Wardens closed a wound in the world and left a fire behind to hold it shut.', cls: 'center' },
          { text: 'The fire has never gone out. Schools were built around it; a border realm learned to sleep. The Hearth of Thornhallow is the oldest lit thing in the Marches of Cael.', cls: 'center' },
          { text: 'Fourteen years ago, for one night, it did go out.', cls: 'center' },
          { text: 'When it came back, a baby lay on the warm stones.', cls: 'center' },
        ],
        next: 'ch0_stone', button: 'Look up',
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          'Over the Hearth, cut into the stone by the Founders themselves, the prophecy. The flames lick at its foot; nobody has seen the bottom of it since the night it was lit.',
          { text: '"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them."', cls: 'omen' },
          'So reads the Order\'s translation, and the Order has read it for four hundred years. Born of four: the four Founders\' bloodlines. The child from the stones was named Wren, and raised knowing.',
          'Tonight is the Vigil. Tonight Wren is named before the nine Houses. And tonight, for the first time in fourteen years, the Hearth is flickering.',
        ],
        next: 'ch0_dorm', button: 'The night before',
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'The fourth-years\' dormitory, an hour past curfew',
        text: [
          'Four beds, four trunks, one forbidden lamp. You are the fourth-years of Thornhallow, each sorted by your Sighting — Glyph, Ear, Eye, Thread — and each, in your own way, seeing more than you say.',
          { text: 'Later tonight the bells of Thornhallow will ring. You will need your keys and each other. The Hearth will tell you before it happens.', cls: 'whisper' },
          'First, the keys. Each of you has a seat and a key. When your lantern glows, press it.',
        ],
        next: 'ch0_keys', button: 'Claim the keys',
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: ['Left to right: Reader, Listener, Seer, Binder. Press your key when your lantern glows.'],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz' });
          const st = UI.el('div', { class: 'pz-status' });
          const pads = UI.el('div', {});
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE FOUR KEYS' }));
          wrap.appendChild(pads); wrap.appendChild(st);
          const remap = UI.el('button', { class: 'btn small ghost', text: 'A key will not answer — change keys', onclick: async () => {
            const v = await UI.ask('Four keys, left to right, separated by spaces:', Store.state.keys.join(' '), { plain: true, ok: 'Set keys' });
            if (!v) return; const ks = v.trim().split(/\s+/).map(x => x.toUpperCase()).filter(x => x.length === 1);
            if (ks.length !== 4 || new Set(ks).size !== 4) { await UI.notice('Need four different single keys.'); return; }
            Store.state.keys = ks; Store.save(); Input.setKeys(ks); Input.deactivate(); Input.activate(pads, onPress); step = 0; arm();
          } });
          wrap.appendChild(remap);
          box.appendChild(wrap);
          let step = 0; const times = [];
          const arm = () => { for (let i = 0; i < 4; i++) Input.setPadState(i, 'armed', i === step); st.className = 'pz-status'; st.textContent = step < 4 ? `${nick(step)} — your key.` : 'Now all four together, within one heartbeat.'; };
          const onPress = (idx) => {
            if (step < 4) {
              if (idx !== step) { st.className = 'pz-status bad'; st.textContent = `That was ${nick(idx)}'s key. ${nick(step)}, yours.`; Audio.sfx('wrong'); return; }
              Audio.sfx('key', idx); Input.setPadState(idx, 'good', true); step++; arm(); return;
            }
            // four hands
            times[idx] = performance.now(); Input.setPadState(idx, 'glow', true);
            const set = times.filter(x => x != null);
            if (set.length === 4) {
              const spread = Math.max(...set) - Math.min(...set);
              if (spread <= 1000) { Audio.sfx('magic'); st.className = 'pz-status good'; st.textContent = 'Four hands. The lanterns steady.'; Input.deactivate(); setTimeout(() => resolve('ch0_practice'), 900); }
              else { st.className = 'pz-status bad'; st.textContent = `Too far apart (${(spread / 1000).toFixed(1)} s). Count yourselves in — one, two, three, press.`; for (let i = 0; i < 4; i++) { times[i] = null; Input.setPadState(i, 'glow', false); } }
            }
            setTimeout(() => { const now = performance.now(); for (let i = 0; i < 4; i++) if (times[i] != null && now - times[i] > 1000) { times[i] = null; Input.setPadState(i, 'glow', false); } }, 1100);
          };
          Input.activate(pads, onPress); arm();
        }),
      },
      ch0_practice: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch0_dorm', mood: 'tower', fx: 'dust', puzzleId: 'ch0_practice', replayable: true,
        text: ['A practice peal, so your hands know the shape of it. Nothing is at stake. When a light falls into your lane, press your key as it crosses the line. A purple light joined across all four lanes means everyone, together.'],
        config: () => ({ practice: true, laneNames: L.nicks, fallMs: 2000, windowMs: 420, events: window.VigilReaction.generateEvents({ count: 7, seed: 5, mix: { single: 1 }, gapMs: 1500, startMs: 2500 }).concat([{ t: 14500, lanes: [0, 1, 2, 3], kind: 'all' }]) }),
        solvedText: (s, r) => [`${r.hits} of ${r.total}. Good enough for a dormitory. The real bells come later, and you will be warned.`],
        next: 'ch0_wren',
      },
      /* ---------- Wren ---------- */
      ch0_wren: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          'The door bangs open and a fourteen-year-old comes through it sideways, the way Wren comes through every door.',
          { speaker: 'Wren', text: 'You\'re all *awake*. Excellent. I have decided you need names, because "the fourth-years" sounds like a disease.' },
          { speaker: 'Wren', text: 'You —' },
          'Wren points at the Reader.',
          { speaker: 'Wren', text: '— read everything and eat nothing. *the Reader.* You —' },
          'The Listener.',
          { speaker: 'Wren', text: '— hear a spider change its mind. *the Listener.* You look at walls like they owe you money. *the Seer.* And you —' },
          'The Binder.',
          { speaker: 'Wren', text: '— tie everyone to everyone and call it kindness. *the Binder.* There. Done. You\'re welcome.' },
        ],
        next: 'ch0_dare', button: 'And you?',
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { speaker: 'Wren', text: 'Me? I\'m Wren. I\'m the one born of four, apparently, which is one more than most people manage. Tomorrow they say it in front of nine Houses and I have to stand still for it.' },
          'Wren looks at the lamp on the sill — the old one, the one nobody lights, the one with a ring of four slots and two shapes carved above it.',
          { speaker: 'Wren', text: 'Mum\'ll — the *Provost\'ll* — kill me if she finds it lit. So let\'s light it. The old way, with the ring. Carve my name in it first — go on. Everyone does, the night before something.' },
          'Someone should type it. Four letters.',
        ],
        next: 'ch0_carve', button: 'Carve it',
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: ['The lamp\'s brass is scratched with a hundred names. There is room for one more.'],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: 'Wren, arms folded: "My name. Mine. W-R-E-N."', submitText: 'Carve' }),
        solvedText: ['The lamp flickers — a small blue tongue — and dies.', { speaker: 'Wren', text: 'Told you. Now do it properly. The old way needs all four of you, and your phones, and — hang on. Attune first. There\'s a word.' }],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', mood: 'tower', fx: 'dust',
        text: ['Scratched into the sill beneath the lamp, worn smooth by four hundred years of thumbs, a word. Each of you: open your Companion, choose your seat if you have not, and turn the page with it.'],
        roles: 'Warden of the Hearth (keyboard): **anyone**. Voice (reads aloud): **The Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          'The lamp: a ring of four slots, and above it two shapes cut into the brass — faded on the Hearth, but not on every page.',
          { text: 'A sigil is glyphs placed in slots. Which glyphs, which slots, in what order, and by what rule: four questions, four Sightings. Say what you see.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE DORMITORY LAMP', note: 'Two shapes are carved above the ring:', html: G.inscription([{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }], { showMark: false }),
          slots: 4, glyphs: glyphPalette(), answer: { 3: 'ASH', 4: 'EMBER' }, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          wrongText: 'The brass stays cold. The ring forgets.',
        }),
        hints: ['The Seer knows where a ring begins — and whether the carving is upright.', 'Two glyphs, sunwise from slot 3. The Reader has both readings; the Listener has the order.', 'ASH in slot 3, EMBER in slot 4. Then four hands.'],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); },
        solvedText: [
          'The lamp catches — a warm, steady, entirely forbidden light.',
          { speaker: 'Wren', text: 'Ha. *Ha.* Four hundred years and it still works. Don\'t tell the Provost. Don\'t tell the Provost anything, actually, that\'s my general policy.' },
          'Wren sits on the end of a bed, in the lamplight, and for a moment says nothing at all.',
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [{ speaker: 'Wren', text: 'You need a name too. As a set. I\'ll be saying it a lot tomorrow — "where are the —" what?' }],
        options: [
          { id: 'four', text: '"The Four." Plain. Old.', next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: 'Wren', text: '"The Four." Very grand. I\'ll try to say it without laughing.' }] },
          { id: 'idiots', text: '"The Idiots." Wren\'s word for us anyway.', next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: 'Wren', text: '"The Idiots." Finally, some honesty in this school.' }] },
          { id: 'vigil', text: '"The Vigil-in-waiting." We are, after all.', next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: 'Wren', text: '"The Vigil-in-waiting." Mum — the Provost — will hate that. Perfect.' }] },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', mood: 'hearth', fx: 'dust',
        text: ['The lamp burns. Somewhere below, the Hearth flickers, and nobody in the dormitory sees it.', { text: 'After every chapter the Hearth shows the paths you walked, and the ones you did not.', cls: 'small' }],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**.`,
        next: 'ch1_start', button: 'The Vigil',
      },
    },
  });
})();
