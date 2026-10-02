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
          { text: "Four hundred years ago, four people closed a wound in the world.", cls: "center" },
          { text: "They did it with fire, and without leaving notes. The school they left behind has been taking notes ever since.", cls: "center" },
          { text: "The fire is called the Hearth. It has gone out once: fourteen years ago, for one night. When it came back, there was a baby on the stones, and shortly after that, a clerk.", cls: "center" },
          { text: "*Register of the Hearth. Found: one infant. Condition: warm, and pleased with itself. Claimed by:*", cls: "center" },
          { text: "The clerk left the rest of that line blank, for whoever came. Nobody ever came.", cls: "center" },
          { text: "You were all born that year. Wren was found.", cls: "center" },
        ],
        next: 'ch0_stone', button: 'Look up',
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          "Above the fire, a line is cut into the stone. It is a prophecy: the kind of sentence that only becomes clear once it is too late to do anything about it.",
          { text: "\"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them.\"", cls: "omen" },
          "That is the school's translation. The original is in letters no one alive can read. The Reader keeps a copy under the pillow anyway, made by hand, in case the school got one word wrong.",
          "The Cold is not weather. It is a place, and no Master will say where. Everybody knows who it is about. Around Wren, people get as far as \"one born of four,\" and then remember an errand.",
          "Tonight, for the first time in fourteen years, the Hearth is flickering.",
          { text: "No need to write anything down.", cls: "small" },
        ],
        next: 'ch0_dorm', button: 'The night before',
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          "The tower room has four beds, one round window and, on the sill, a brass lamp that everyone has tried and nobody has lit. It has cost one third-year both eyebrows.",
          "*Notice to all students. The Vigil will sit at midnight tomorrow. Lessons will continue as normal.*",
          "Wren adopted you at seven, by announcement, and has never allowed an appeal. The fifth blanket is Wren's. Officially, Wren sleeps somewhere else.",
          "You are awake past curfew, not talking about tomorrow. \"I've read every rule this week,\" says the Binder, to the ceiling. \"There isn't one against tomorrow.\" Three people do not answer. Answering would count as talking about it.",
          "Under the four names on the door, the Binder has added Wren, in pencil.",
          { text: "Sit left to right: the Reader, the Listener, the Seer, the Binder. Keep these seats all night.", cls: "whisper" },
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
          "Practice. Later tonight, this counts.",
          { text: "Press as your light crosses the line.", cls: "whisper" },
          { text: "Purple means everyone.", cls: "whisper" },
        ],
        config: () => ({ practice: true, laneNames: L.nicks, fallMs: 2000, windowMs: 420, events: window.VigilReaction.generateEvents({ count: 7, seed: 5, mix: { single: 1 }, gapMs: 1500, startMs: 2500 }).concat([{ t: 14500, lanes: [0, 1, 2, 3], kind: 'all' }]) }),
        next: 'ch0_wren',
      },
      /* ---------- Wren ---------- */
      ch0_wren: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          "The door bangs open. Wren has never knocked on this door, on the principle that nobody knocks on their own.",
          { speaker: "Wren", text: "—so that's the plan. You're awake! Brilliant. I need four idiots and a lamp, and I'm on a bit of a schedule. Everyone's tried matches. Nobody's tried *reading* it." },
          "Words older than the school are cut round the lamp's collar. The Reader takes unreadable words personally, and is at the window before deciding to be.",
          "\"Rule Fourteen says we can't,\" says the Binder, already in boots. \"The old rules say how words go in a ring. Somebody had better come who knows both.\"",
          "The Reader has missed supper. A biscuit turns up in the Reader's lap. Wren knows nothing about it, loudly. Half of it is back at Wren's elbow before Wren has finished knowing nothing.",
        ],
        next: 'ch0_dare', button: 'And you?',
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Me?\" says Wren. \"I'm the main event. I borrowed a program.\"",
          "*Order of business for the Vigil. One: prayers. Two: the foundling, to stand before the Houses, who will decide its use. Three: any other business.*",
          "Wren's copy has been folded so many times it has gone soft. \"I've been practicing standing still,\" says Wren. \"My record is eleven seconds.\"",
          "\"Good joke,\" says the Seer. \"How long have you been working on it?\"",
          { speaker: "Wren", text: "Since Tuesday. It's not finished. Anyway. Everything I have, somebody gave me. The name's a bird the clerk could see from the desk. The bed's somewhere I don't sleep. My birthday's just the night they found me. Tonight I want one good thing that's *ours*." },
          "At \"ours,\" the lamp begins to hum: two notes, over and over, the way people hum while they wait for someone. Only the Listener hears it.",
        ],
        next: 'ch0_carve', button: 'Carve it',
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: [
          "\"Our names first,\" says Wren, \"so the lamp knows whose it is.\"",
          "The Seer finds a cut under the polish and does the face that means trouble.",
          "Wren does it back.",
          "A hundred names are scratched in the brass, by people who were very sure about matches.",
          "There is room for one more. All four of you look at the same person.",
        ],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: '"That\'s not the one you all looked at," says Wren, who noticed.', submitText: 'Carve' }),
        solvedText: [
          "The brass flares blue, once, and goes out.",
          { speaker: "Wren", text: "That's my name. I said *ours*." },
          "For once, Wren has no next line. Wren stands quite still. \"Eleven,\" says the Binder, who has been counting.",
          { speaker: "Wren", text: "Tie. Fine. At least it knows my name. Names won't light it. Old words will, and they need all four of you, which is lucky, because that's how many I adopted." },
          "The Seer puts a thumb over the new name, and leaves it there.*",
          { text: "*  At the back of the Seer's sketchbook, Wren is twenty, and forty, and ninety, and still talking. The Seer has never shown anyone those pages.", cls: "small" },
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
          "The lamp catches, small and gold and perfectly steady. Four hundred years of matches, and all it ever wanted was to be read to.",
          { speaker: "Wren", text: "Look at it. That's *ours*. Mom'll — the Provost'll — kill me." },
          "\"You had it right the first time,\" says the Reader, who corrects everybody. Wren does not argue.",
          { text: "ASH, EMBER. Fire, keep. That is all it ever said.", cls: "small" },
          "Wren drags the fifth blanket as close to the flame as a blanket can go without joining in. Every blanket Wren has ever owned is singed along one edge. In that light, each of you sees the thing about Wren you have never said out loud.",
          { text: "Open your Wren tab. Read your line to Wren, out loud, in seat order.", cls: "whisper" },
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [
          "For a while, nobody speaks. The lamp hums, for one of you. Then Wren laughs, and wipes both eyes, as if that were part of laughing.",
          "\"You lot are terrible at secrets,\" says Wren. \"I've known for years. Saw the drawing where I'm ninety. Good hat. You never said it, and I never made you. Best thing nobody ever said to me. Till now. Thank you.\"",
          "Wren holds out both hands, because the Listener always checks. Still cold. Held anyway.*",
          { text: "*  The Listener knitted Wren gloves last winter, badly, and has never found the right moment to hand them over. There will be a good moment after tomorrow. The Listener is almost sure.", cls: "small" },
          { speaker: "Wren", text: "You need a name. Fourteen years, that line in the register has said \"Claimed by,\" then nothing. Tomorrow, I fill it in." },
        ],
        options: [
          { id: 'four', text: "Binder: \"The Four.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: "Wren", text: "Grand. Four, like the founders. We'll leave better notes." }] },
          { id: 'idiots', text: "Seer: \"The Idiots.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: "Wren", text: "Finally, something in that register that's accurate." }] },
          { id: 'vigil', text: "Reader: \"The Vigil-in-waiting.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Vigil-in-waiting' }, after: [{ speaker: "Wren", text: "A vigil's just people staying up for someone. I'll hold you to that." }] },
          { id: 'own', text: "Listener: \"Something that's ours?\"", next: 'ch0_flow', ask: { prompt: 'What does Wren call the four of you?', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => [{ speaker: 'Wren', text: "\"" + (s.flags.GROUP_NAME || 'the Four') + ".\" Nobody gave us that one. And this time, in ink." }] },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', mood: 'hearth', fx: 'dust',
        text: [
          "Wren talks until you are asleep, or nearly. \"Anyone awake?\" The Listener keeps both eyes shut and says nothing, which is the kindest thing anyone says all night. Then Wren hums two notes. The Listener has never told anyone about those. Nobody sees whether Wren sleeps. Below, the Hearth flickers again.",
          "The school calls what you did in that light a Sighting: one way of seeing, one to a person, given at birth.",
          "Tomorrow the hall fills with grown-ups who have Sightings too. They have watched Wren for fourteen years, and never said what they saw. They only wrote it down.*",
          { text: "*  Wren asked what the Provost saw that night. The Provost said, \"A baby,\" and went to see about supper, and was gone a long time.", cls: "small" },
          "*Masters' notes. The foundling, age six. Subject stood still for eleven seconds.*",
          { text: "The chart shows the paths you took, and the ones you didn't.", cls: "small" },
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: 'The Vigil',
      },
    },
  });
})();
