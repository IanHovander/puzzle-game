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
      body[data-chapter="ch0"] .ring-pz .wheel .slot text.lbl { font-size: 28px; fill: var(--ink); }
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
          { text: "Four hundred years ago, four people closed a wound in the world. They did it with fire, and without leaving notes. Their fire is the Hearth.", cls: "center" },
          { text: "It has burned ever since, orange at the edges, gold at the heart. It has gone out once. Fourteen years ago, for one night, the whole school stood in the dark and found out what cold is.", cls: "center" },
          { text: "When the fire came back, a baby was asleep on the stones. The flames had curled round the baby like a hand. The school, which knows what to do with a miracle, wrote it down.", cls: "center" },
          { text: "*Register of the Hearth. Found: one infant. Condition: warm, and pleased with itself. Claimed by:*", cls: "center" },
          { text: "The clerk left the line blank, for whoever came. Nobody ever came.", cls: "center" },
          { text: "You were all born that year. Wren was found.", cls: "center" },
        ],
        next: 'ch0_stone', button: "Look up",
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          "Above the fire, a line is cut into the stone. It is a prophecy: the kind of sentence that makes perfect sense the morning after.",
          { text: "\"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them.\"", cls: "omen" },
          "That is the school's translation. The original is cut in the Founders' shapes, which nobody at the school will admit to reading. The Cold is a place, and no Master will say where.",
          "People who start reciting it near Wren get as far as \"one born of four,\" and remember an errand. Only one thing has ever come for Wren, and it is cut in stone.",
          "Tonight the Hearth is flickering. Tomorrow night, at the Vigil, the Houses decide who Wren belongs to. If they give Wren to the prophecy, Wren walks into the Cold. Wren has been told to wear something warm.",
          { text: "No need to write anything down.", cls: "small" },
        ],
        next: 'ch0_dorm', button: "The night before",
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          { text: "Sit left to right: the Reader, the Listener, the Seer, the Binder. Keep these seats all night.", cls: "whisper" },
          "The tower room has four beds, one round window and, on the sill, a brass lamp nobody has ever lit.",
          "On the floor, a fifth blanket: Wren's. On the door, a fifth name, in pencil, which rubs off. Officially, Wren sleeps at Provost Marrow's.",
          "The Binder is rereading the Vigil's order of business. *Item two: the foundling, to stand before the Houses, who will decide its use.* \"Its use,\" the Binder reads again, as if it might change. \"There's no rule against tomorrow. I've looked.\"",
          "\"We could hide Wren,\" says the Listener.",
          "\"Where?\" says the Reader. \"Every room here belongs to somebody.\"",
          "\"I keep trying to picture next spring,\" says the Seer. \"I can't get Wren into it.\" Nobody answers. Far below, the Hearth gutters.",
        ],
        next: 'ch0_keys', button: "The knock",
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "Wren adopted you at seven, by announcement, and has never allowed an appeal. That same week Wren invented a knock: one each, then all four together. It means *everybody's here*. Wren never joins in. Somebody, Wren says, has to be the door. Tomorrow, the door stands before the Houses alone. Tonight, on the bedframes, you practice the only answer you have.",
          { text: "One keyboard, one key each. Press yours when it glows.", cls: "whisper" },
          { text: "Then all four at once.", cls: "whisper" },
        ],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz' });
          const st = UI.el('div', { class: 'pz-status' });
          const pads = UI.el('div', {});
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE KNOCK' }));
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
            st.textContent = step < 4 ? `${nick(step)}, your knock.` : 'Now all four together.';
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
              if (spread <= 1000) { Audio.sfx('success'); st.className = 'pz-status good'; st.textContent = 'Four hands. Everybody\'s here. Nearly.'; Input.deactivate(); setTimeout(() => resolve('ch0_practice'), 900); }
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
          "On nights nobody can sleep, the knock becomes a game, faster and faster, until somebody laughs.",
          "Tonight nobody laughs. Practice anyway. Before morning, you will knock it for real.",
          { text: "Press as your light crosses the line.", cls: "whisper" },
          { text: "A chain across all four lanes means everyone at once.", cls: "whisper" },
        ],
        /* The knock itself, three times, each time faster: one each in seat order, then all four together. */
        config: () => {
          const events = []; let t = 2500;
          [{ gap: 1100, fall: 2100 }, { gap: 750, fall: 1650 }, { gap: 480, fall: 1250 }].forEach((r) => {
            for (let lane = 0; lane < 4; lane++) { events.push({ t, lanes: [lane], kind: 'single', fall: r.fall }); t += r.gap; }
            t += r.gap * 0.4; events.push({ t, lanes: [0, 1, 2, 3], kind: 'all', fall: r.fall }); t += r.gap * 2.2;
          });
          return { practice: true, laneNames: L.nicks, fallMs: 2100, windowMs: 360, events };
        },
        next: 'ch0_wren',
      },
      /* ---------- Wren ---------- */
      ch0_wren: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'open',
        text: [
          "The door bangs open. Wren has never knocked on this door, on the principle that nobody knocks on their own door. A biscuit lands in the Reader's lap, because the Reader has missed supper again. Wren, loudly, knows nothing about it.",
          { speaker: "Wren", text: "You're awake! Brilliant. I need four idiots and a lamp, and this room has always had both. Everybody's tried that lamp with matches. Nobody's ever tried *reading* it." },
          "Worn shapes run round the lamp's collar. The Reader, who takes unreadable words personally, is at the window before the rest of the Reader has agreed to it. \"Founders' work. Same shapes as the stone.\"",
          "\"The Founders never left notes,\" says Wren. \"Just one sentence, about me. I'd like to hear them say anything else. Tonight, before the Houses get their turn.\"",
          "The Binder is already off the bed. \"There are old rules for words in rings. None against this. I checked.\"",
        ],
        next: 'ch0_dare', button: "What about you, Wren?",
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Me?\" says Wren. \"I'm the main event. Item two.\" Wren's copy of the order of business is folded very small. \"I've been practicing standing still. My record is eleven seconds.\" The Binder writes it down, in pencil.",
          { speaker: "Wren", text: "Everything I have, somebody gave me. The name's a bird. Nobody will say who picked it. The bed's on loan. My birthday's the night they found me. Before they decide what I'm for, I want one good thing that's ours." },
          "This week Wren gave you a penknife, a lucky marble and the good pillow, and called it tidying up. Now, for the first time in seven years, Wren is asking to keep something.",
          "The Listener checks Wren's hands. Cold. Always cold. Then the lamp hums: two notes, like someone waiting at a door. Only the Listener hears it.",
        ],
        next: 'ch0_carve', button: "One good thing",
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: [
          "\"Our names first,\" says Wren, \"so the lamp knows whose it is. I dare you.\"",
          "The Seer turns Wren's old penknife over, looks at the lamp, and does the terrible-idea face. Wren does it back.",
          "Generations of dares are carved in the brass: initials, mostly, and one rude word. There is room for one more name, and all four of you look at the same person.",
          { text: "Type the one name all four of you are looking at.", cls: "whisper" },
        ],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: '"That\'s not the one you all looked at," says Wren, who noticed.', submitText: 'Carve' }),
        onSolve: () => { try { Game.setArt('ch0_lamp', { carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The brass flares Hearth-gold, once, and goes out. Far below, for one breath, the great fire answers.",
          { speaker: "Wren", text: "That's my name. I said *ours*." },
          "For once, Wren has no next line. Wren stands quite still. \"Eleven,\" says the Binder, who has been counting.",
          { speaker: "Wren", text: "Tied my record. Don't write that down. And we just carved Founders' brass. Mom'll — the Provost'll — kill me." },
          "\"It is ours,\" says the Reader, who corrects everybody. Wren does not argue, which is new, and changes the subject before anyone can notice: \"Names won't light it, though. It wants Founders' words, and those take four. Lucky I adopted exactly four.\"",
        ],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust',
        text: [
          "Each of you was born with a Sighting: one way of seeing that is yours alone. The school would rather you didn't mention it. Wren has never once asked. Tonight the lamp needs all four.",
          { text: 'Open the Companion on your phone and pick your seat. This big screen is the Hearth. Type the word on this screen into your phone.', cls: 'whisper' },
          { text: 'Your phone\'s **Book** tab keeps everything.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
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
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); try { Game.setArt('ch0_lamp', { lit: true, carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The lamp catches: small and gold, a piece of the Hearth on the sill, and warm all the way to the door. All those matches, and it only ever wanted to be read to. Far below, the Hearth stops flickering. \"That's *ours*,\" whispers Wren.",
          "Somebody finally admits to reading the Founders' shapes. \"Ash. Ember,\" says the Reader. \"That's the sound, not the sense.\" Then, slower, a finger on the brass: \"*Fire. Keeps.* The stone downstairs says *walk*. Up here, the Founders said *keep*.\"",
          "\"Keeps what?\" says Wren. Nobody needs to answer. All four of you are looking at the same person again, and this time it is not a dare.",
          { speaker: "Wren", text: "Don't. If you all look at me like that, I'll have to stand still again." },
          "Wren drags the fifth blanket right up to the lamp, the way Wren sits by every fire: as close as a blanket can go without joining in. Each of you has one thing about Wren you have never said out loud.",
          { text: "Open your Wren tab. Read your line to Wren, out loud, in seat order.", cls: "whisper" },
        ],
        next: 'ch0_name',
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', artParams: { lit: true }, mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP',
        text: [
          "For a while, the only sound is the lamp, humming for one of you. Then Wren laughs, and wipes both eyes, as if that were part of laughing.",
          "\"You lot are terrible at secrets,\" says Wren. \"Three of those I've known for years that you knew. You never said, and I never made you, and it was the best thing nobody ever said to me. Now you've gone and ruined it. Thank you.\" Then Wren looks at the chalk on the door for a long moment, and lets it be.",
          "Wren holds out both hands, because the Listener always checks. Still cold, even this close to the lamp. Held anyway.",
          { speaker: "Wren", text: "Right. *Keep.* I can work with that. If I'm being kept, I want it in writing. For fourteen years that register has said \"Claimed by,\" and then nothing. Before the Houses fill it in, I will. So: claimed by *who*?" },
        ],
        options: [
          { id: 'four', text: "Binder: \"The Four.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: "Wren", text: "Four, like the Founders. We'll leave better notes." }] },
          { id: 'idiots', text: "Seer: \"The Idiots.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: "Wren", text: "I did ask for four idiots. Warm, pleased with itself, claimed by idiots. That register is finally accurate." }] },
          { id: 'vigil', text: "Reader: \"The Night Watch.\"", next: 'ch0_flow', set: { GROUP_NAME: 'the Night Watch' }, after: [{ speaker: "Wren", text: "A watch is just people staying up for someone. Stay up for me tomorrow. I'll be the one standing still." }] },
          { id: 'own', text: "Listener: \"Something that's ours.\" (type it)", next: 'ch0_flow', ask: { prompt: 'Claimed by who? Type the name.', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => { const n = ((s.flags.GROUP_NAME || '').replace(/^["'“”‘’\s]+|["'“”‘’.!?,:;\s]+$/g, '') || 'the Four').replace(/^the\s+/i, 'the '); Store.set('GROUP_NAME', n); return [{ speaker: 'Wren', text: n.charAt(0).toUpperCase() + n.slice(1) + ". Nobody gave us that one. We made it, so it goes in ink." }]; } },
        ],
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', artParams: { dawn: true }, mood: 'hearth', fx: 'dust',
        text: (s) => [
          "Wren talks until you are nearly asleep, the Reader's biscuit still uneaten, and nobody sees whether Wren sleeps. Then, soft on the floorboards, you knock: one each, then all together. This time the door is in the room. *Everybody's here.*",
          { text: "Knock it on the table now, soft.", cls: "whisper" },
          `At dawn the lamp burns out, and the Hearth flickers again. While Wren's eyes are shut, the penknife, the lucky marble and the good pillow go back on the fifth blanket, and somebody goes over the pencil name on the door in ink, and writes beside it: *Claimed by ${s.flags.GROUP_NAME || 'the Four'}.* Somebody came for Wren in the end: four somebodies, fourteen years late, in their socks.`,
          "Worn letters, seen clean. No heartbeat. A wrong-way shadow. No thread. Tonight the hall fills with grown-ups who have Sightings too. They have watched Wren for fourteen years and never said what they saw. Whatever the Houses write after \"Claimed by,\" they will be writing second.",
          { text: "The chart shows the paths you took, and the ones you didn't.", cls: "small" },
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: "The Vigil",
      },
    },
  });
})();
