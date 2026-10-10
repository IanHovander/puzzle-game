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
        { id: 'ch1_start', label: 'The Vigil', col: 7, row: 0 },
      ],
      edges: [['ch0_start', 'ch0_dorm'], ['ch0_dorm', 'ch0_practice'], ['ch0_practice', 'ch0_dare'], ['ch0_dare', 'ch0_carve'], ['ch0_carve', 'ch0_lamp'], ['ch0_lamp', 'ch0_name'], ['ch0_name', 'ch1_start']],
    },
    scenes: {
      /* ---------- cold open ---------- */
      ch0_start: {
        art: 'ch0_hearthfire', mood: 'hearth', fx: 'embers', speed: 13,
        text: [
          { text: "Four hundred years ago, four people closed a wound in the world. They did it with fire, and without leaving notes. Their fire is the Hearth.", cls: "center" },
          { text: "It has burned gold ever since, except once. Fourteen years ago, for one night, the school found out what cold is.", cls: "center" },
          { text: "When the fire came back, it was curled like a hand around a baby asleep on the stones.", cls: "center" },
          { text: "*Register of the Hearth. Found: one infant. Condition: warm, and pleased with itself. Claimed by:*", cls: "center" },
          { text: "Nobody ever came.", cls: "center" },
          { text: "You were all born that year. Wren was found.", cls: "center" },
        ],
        next: 'ch0_stone', button: "Look up",
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          "Above the fire, a prophecy is cut into the stone: the kind of sentence that makes perfect sense the morning after.",
          { text: "\"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them.\"", cls: "omen" },
          "That is the school's translation. The original is in the Founders' shapes, which nobody will admit to reading. The Masters say the Cold is a place, then change the subject.",
          "Four Founders. One fire. One baby. The school did the sum.",
          "Only one thing has ever come for Wren, and it is cut in stone.",
          "This week the Hearth began to flicker. Tomorrow night, at the Vigil bell, the Houses vote. Does Wren belong to the school, or to the stone? If the stone wins, Wren walks into the Cold. Wren has been told to wear something warm.",
        ],
        next: 'ch0_dorm', button: "The night before",
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          { text: "Sit left to right: the Reader, the Listener, the Seer, the Binder. Stay in these seats all night.", cls: "whisper" },
          "\"*Item two,*\" the Binder reads, again. \"*The foundling, to stand before the Houses, who will decide its use.*\" A pause, in case it has changed.",
          "\"*Its* use,\" says the Binder. \"There's no rule against tomorrow. I've looked.\"",
          "On the sill, a brass lamp as old as the Hearth, never lit. On the floor, a fifth blanket. On the door, a fifth name in pencil. Officially, Wren sleeps at Provost Marrow's.",
        ],
        next: 'ch0_plan', button: "The plan",
      },
      ch0_plan: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Could we hide Wren?\" says the Listener. Every room here belongs to somebody. Wren is the only thing that doesn't.",
          "\"I keep making plans for next spring,\" says the Seer. \"I can't get Wren into any of them.\" Far below, the Hearth gutters.",
          "\"They vote on the school's translation,\" says the Binder. \"The Founders don't get a say.\"",
          "\"Unless we ask them,\" says the Listener, and everyone looks at the lamp.",
        ],
        next: 'ch0_keys', button: "The knock",
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "Wren adopted you at seven. That same week Wren invented a knock: one each, then all four together. It means *everybody's here*.",
          "\"Somebody,\" Wren likes to say, \"has to be the door.\"",
          "Tomorrow, the door stands before the Houses alone. \"Knock it with me?\" says the Listener. \"While everybody's still here.\"",
          { text: "One keyboard, one key each. Press yours when it lights up.", cls: "whisper" },
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
          "On sleepless nights the knock becomes a game, faster and faster, until somebody laughs.",
          "Tonight the Seer just says, \"Again.\"",
          { text: "Press as your light crosses the line. A white light means all four press.", cls: "whisper" },
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
          "The door bangs open. Wren does not knock. The Reader missed supper again. A biscuit lands in that lap. Wren, loudly, knows nothing about it.",
          { speaker: "Wren", text: "You're awake. Good. I heard all that through the door. Hiding me: no. Spring: try harder. The lamp: yes. I need four idiots and a lamp, and this room has both." },
          "\"Five idiots,\" says the Seer. \"You never count yourself.\"",
          "Worn shapes circle the lamp's collar, like the ones on the stone. \"Nobody can read those,\" says the Reader, a little too quickly.",
          "\"One sentence in four hundred years,\" says Wren, \"and it's about me. I'd like a second opinion.\"",
        ],
        next: 'ch0_dare', button: "Item two",
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Item two,\" says Wren. \"That's me. I'm an item.\" Wren's copy is folded very small. \"I've been practicing standing still. My record is eleven seconds.\" The Binder writes it down, in pencil.",
          { speaker: "Wren", text: "Everything I have, somebody gave me. The name's a bird. Nobody will say who picked it. Before they decide what I'm for, I want one thing I get to keep." },
          "This week Wren gave you a penknife, a lucky marble and the good pillow, and called it tidying up.",
          "The Listener checks Wren's hands. Cold, as always.",
        ],
        next: 'ch0_carve', button: "A dare",
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: [
          "\"The lamp should know who's asking,\" says Wren. \"Our names first. I dare you.\"",
          "The Seer opens the penknife and makes the face reserved for terrible ideas.",
          "Older dares are carved in the brass: initials, and one rude word.",
          "You all look at the same person.",
          { text: "Type that person's name.", cls: "whisper" },
        ],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: '"That\'s not the one you all looked at," says Wren, who noticed.', submitText: 'Carve' }),
        onSolve: () => { try { Game.setArt('ch0_lamp', { carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The Seer cuts it small, under the rude word. \"Good company,\" says the Seer. The brass flares Hearth-gold, once. Downstairs, the great fire answers.",
          { speaker: "Wren", text: "That's my name. I said *ours*." },
          "\"It is ours,\" says the Reader. Wren has no next line, and stands still. \"Eleven,\" says the Binder.",
          { speaker: "Wren", text: "Tied my record. Don't write that down. My name's on Founders' brass. Mom'll — the Provost'll — kill me." },
          "Nobody says a word about *Mom*.",
          "\"If those were words,\" says the Reader, \"and I'm not saying they are, there'd be two. I can't tell which goes first.\" Only the Listener hears the brass begin to hum.",
        ],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust',
        text: [
          "Each of you was born with a Sighting: one way of seeing, yours alone. The school would rather you didn't mention it.",
          { text: 'This big screen is the Hearth. Open the Companion on your phone, pick your seat, and type the word shown.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          { text: 'A sigil is words in slots. Fill this ring together, here.', cls: 'whisper' },
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
          onWrong: (m, tries) => tries >= 2 ? 'The brass stays cold. Wren, unhelpfully: "Has everyone actually said their part?"' : null,
        }),
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'The hum says which word goes first. Only one cut marks the start.',
          'ASH in slot 3, EMBER in slot 4. The other two stay empty.',
        ],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); try { Game.setArt('ch0_lamp', { lit: true, carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The lamp catches, small and gold. Four hundred years of matches, and it only ever wanted to be read to. Far below, the Hearth stops flickering.",
          "The Reader stops pretending. \"Ash over ember is one word. It's how you bank a fire, so it lasts till morning.\" Then, with no ifs at all: \"The word is *keep*.\"",
          "\"It didn't say *walk*,\" says the Listener, and has to sit down.",
          "\"The stone still says *walk*,\" says the Seer, and does not look at Wren's shadow.",
          "\"*Walk* is the school's word. *Keep* is the Founders' word,\" says the Binder. \"That's our second opinion, and that's what we tell the Houses.\"",
          { speaker: "Wren", text: "Keeps what? Oh. Don't. Nobody look at me like that." },
        ],
        next: 'ch0_tabs',
      },
      ch0_tabs: {
        art: 'ch0_dorm', artParams: { lit: true }, mood: 'tower', fx: 'dust',
        text: [
          "Wren drags the fifth blanket up to the lamp, as close as a blanket can go without catching. The Seer, for once, does not move.",
          "Tonight each of you gives something back: the thing you noticed, and never said.",
          { text: "Open your Wren tab. Read your line to Wren, out loud, in seat order.", cls: "whisper" },
        ],
        next: 'ch0_name', button: "Read to Wren",
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', artParams: { lit: true }, mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP', prompt: 'Choose one together. The named player says it to Wren.',
        text: [
          "Wren laughs and wipes both eyes, as if that were part of laughing.",
          "\"You lot are terrible at secrets,\" says Wren. \"No heartbeat? Knew. Wrong-way shadow? Knew. No thread? Guessed. You never said, and I never made you. Best thing nobody ever said to me. Thank you.\"",
          "Wren looks at the chalk on the door. That one is news. Wren stands still. The Binder does not count.",
          "Wren holds out both hands, because the Listener always checks. Still cold, this close to the lamp. Held anyway.",
          { speaker: "Wren", text: "*Keep.* I asked for one thing I get to keep, and you lot went and kept me. Tomorrow the Houses fill in that Register. Tonight we do. Claimed by *who*?" },
        ],
        options: [
          { id: 'vigil', text: "Reader: \"The Night Watch.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Night Watch' }, after: [{ speaker: "Wren", text: "A watch stays up for someone. Stay up for me tomorrow. I'll be the one standing very still." }] },
          { id: 'own', text: "Listener: a name of our own (type it, then say it)", next: 'ch0_dawn', ask: { prompt: 'Claimed by who? Type the name.', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => { const n = ((s.flags.GROUP_NAME || '').replace(/^["'“”‘’\s]+|["'“”‘’.!?,:;\s]+$/g, '') || 'the Four').replace(/^the\s+/i, 'the '); Store.set('GROUP_NAME', n); return [{ speaker: 'Wren', text: n.charAt(0).toUpperCase() + n.slice(1) + ". Nobody gave us that one. We made it, so it goes in ink." }]; } },
          { id: 'idiots', text: "Seer: \"The Idiots.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: "Wren", text: "I asked for four idiots. Apparently there are five. Warm, pleased with itself, claimed by idiots." }] },
          { id: 'four', text: "Binder: \"The Four. It's not taken. I checked.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: "Wren", text: "Four, like the Founders. We'll leave better notes." }] },
        ],
      },
      ch0_dawn: {
        art: 'ch0_dorm', artParams: { lit: true }, mood: 'hearth', fx: 'dust',
        text: (s) => [
          "Wren talks about everything except tomorrow until you are nearly asleep. Then, soft on the floorboards, you knock.",
          { text: "Knock it on the table now, soft, Reader first.", cls: "whisper" },
          "This time the door is in the room with you, pretending to be asleep. *Everybody's here.*",
          "At dawn the lamp sinks to a red glow under its own ash: banked, not out. Far below, the Hearth flickers again.",
          `While Wren's eyes are shut, the penknife, the marble and the good pillow go back on the fifth blanket. The Reader still hasn't eaten the biscuit. It is being kept. The Binder goes over the pencil name in ink and adds: *Claimed by ${s.flags.GROUP_NAME || 'the Four'}.*`,
          "Somebody came for Wren in the end: four somebodies, fourteen years late, in their socks.",
        ],
        next: 'ch0_flow', button: "Morning",
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', artParams: { dawn: true }, mood: 'hearth', fx: 'dust',
        text: (s) => [
          "The Masters have watched Wren for fourteen years. Not one of them has said what they saw. Whatever the Houses write after \"Claimed by,\" they will be writing second.",
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: "The Vigil",
      },
    },
  });
})();
