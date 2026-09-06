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
          { text: 'Four hundred years ago, four Wardens closed a wound in the world.', cls: 'center' },
          { text: 'They left a fire to hold it shut.', cls: 'center' },
          { text: 'The Hearth has never gone out. Except one night, fourteen years ago.', cls: 'center' },
          { text: 'When it came back, a baby lay on the stones.', cls: 'center' },
          { text: 'That child is Wren, now fourteen.', cls: 'center' },
        ],
        next: 'ch0_stone', button: 'Look up',
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          'The prophecy, cut in stone above the fire.',
          'The Order\'s translation:',
          { text: '"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them."', cls: 'omen' },
          'Tonight is the Vigil. Nine Houses will name Wren.',
          'And the Hearth flickers. First time in fourteen years.',
        ],
        next: 'ch0_dorm', button: 'The night before',
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          'Four fourth-years. A Sighting each: four ways of seeing.',
          { text: 'Sit left to right: Reader, Listener, Seer, Binder.', cls: 'whisper' },
        ],
        next: 'ch0_keys', button: 'Claim the keys',
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { text: 'One keyboard, one key each. Press yours when it glows.', cls: 'whisper' },
          { text: 'Four hands means all four keys inside one second.', cls: 'whisper' },
        ],
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
              if (spread <= 1000) { Audio.sfx('magic'); st.className = 'pz-status good'; st.textContent = 'Four hands. The lanterns steady.'; Input.deactivate(); setTimeout(() => resolve('ch0_practice'), 900); }
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
          'Real bells later, on a timer. This costs nothing.',
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
          { speaker: 'Wren', text: 'Reader, you read everything and eat nothing.' },
          { speaker: 'Wren', text: 'Listener, you hear spiders think.' },
          { speaker: 'Wren', text: 'Seer, you stare at walls.' },
          { speaker: 'Wren', text: 'Binder, you tie people together and call it kindness.' },
        ],
        next: 'ch0_dare', button: 'And you?',
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          { speaker: 'Wren', text: 'Me? The one born of four, apparently.' },
          { speaker: 'Wren', text: 'Tomorrow nine Houses say so. I stand still.' },
          { speaker: 'Wren', text: 'Nobody lights that lamp. Light it the old way.' },
          { speaker: 'Wren', text: 'Carve my name first.' },
        ],
        next: 'ch0_carve', button: 'Carve it',
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: ['A hundred names in the brass.'],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: 'Wren, arms folded: "My name. Mine. W-R-E-N."', submitText: 'Carve' }),
        solvedText: ['It flares blue, and dies.', { speaker: 'Wren', text: 'Told you. Now properly.' }],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', mood: 'tower', fx: 'dust',
        text: [
          { text: 'Open your Companion. Take your seat. Type this word.', cls: 'whisper' },
          { text: 'Every chapter has one.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          { text: 'A sigil is glyphs in slots.', cls: 'whisper' },
          { text: 'Four questions: which glyphs, where it starts, what order, what rule.', cls: 'whisper' },
          { text: 'One answer each. Say what you see.', cls: 'whisper' },
          { text: 'Every puzzle has a Hint.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE DORMITORY LAMP', note: 'Two shapes are carved above the ring:', html: G.inscription([{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }], { showMark: false }),
          slots: 4, glyphs: glyphPalette(), answer: { 3: 'ASH', 4: 'EMBER' }, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys, within a second',
          wrongText: 'The brass stays cold. The ring forgets.',
        }),
        hints: ['The Seer knows where a ring begins — and whether the carving is upright.', 'Two glyphs, sunwise from slot 3. The Reader has both readings; the Listener has the order.', 'ASH in slot 3, EMBER in slot 4. Then four hands.'],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); },
        solvedText: [
          'The lamp catches. Warm, steady, forbidden.',
          { speaker: 'Wren', text: 'Four hundred years. Still works.' },
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [{ speaker: 'Wren', text: 'You need a name. As a set.' }],
        options: [
          { id: 'four', text: '"The Four."', next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: 'Wren', text: 'Grand.' }] },
          { id: 'idiots', text: '"The Idiots."', next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: 'Wren', text: 'Finally, honesty.' }] },
          { id: 'vigil', text: '"The Vigil-in-waiting."', next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: 'Wren', text: 'Mum — the Provost — will hate that.' }] },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', mood: 'hearth', fx: 'dust',
        text: ['Below, the Hearth flickers.', { text: 'After each chapter the Hearth shows every path, taken and not.', cls: 'small' }],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**.`,
        next: 'ch1_start', button: 'The Vigil',
      },
    },
  });
})();
