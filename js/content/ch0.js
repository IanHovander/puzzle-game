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
          { text: "It has burned gold ever since. It went out once, fourteen years ago, and the school found out what cold is.", cls: "center" },
          { text: "When it came back, a baby lay asleep on the stones, the flames curled around it like a hand.", cls: "center" },
          { text: "*Register of the Hearth. Found: one infant. Condition: warm, and pleased with itself. Claimed by:*", cls: "center" },
          { text: "The clerk left the line blank. Nobody ever came.", cls: "center" },
          { text: "You were all born that year. Wren was found.", cls: "center" },
        ],
        next: 'ch0_stone', button: "Look up",
      },
      ch0_stone: {
        art: 'ch0_stone', mood: 'hearth', fx: 'embers',
        text: [
          "Above the fire, a line is cut into the stone. It is a prophecy: the kind of sentence that only becomes clear once it is too late to do anything about it.",
          { text: "\"When the Hearth goes cold, one born of four shall walk into the Cold, and it shall close behind them.\"", cls: "omen" },
          "That is the school's translation. The original is in the Founders' shapes, which nobody at the school will admit to reading.",
          "Only one thing has ever come for Wren, and it is cut in stone.",
          "This week the Hearth began to flicker. Tomorrow night the Houses vote: the school, or the stone. Wren has been told to wear something warm.",
        ],
        next: 'ch0_dorm', button: "The night before",
      },
      /* ---------- dormitory & setup ---------- */
      ch0_dorm: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust', sfx: 'step',
        title: 'Past curfew',
        text: [
          { text: "Sit left to right: the Reader, the Listener, the Seer, the Binder. Stay in these seats all night.", cls: "whisper" },
          "\"*Item two,*\" the Binder reads, again. \"*The foundling, to stand before the Houses, who will decide its use.*\" A pause, in case it has changed. \"*Its* use,\" says the Binder. \"There's no rule against tomorrow. I've looked.\"",
          "On the sill, a brass lamp as old as the Hearth. On the floor, a fifth blanket. On the door, a fifth name in pencil. Officially, Wren sleeps at Provost Marrow's.",
        ],
        next: 'ch0_plan', button: "The plan",
      },
      ch0_plan: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Could we hide Wren?\" says the Listener. But every room here belongs to somebody. Wren is the only thing that doesn't.",
          "\"I keep making plans for next spring,\" says the Seer. \"I can't get Wren into any of them.\" Far below, the Hearth gutters.",
        ],
        next: 'ch0_keys', button: "The knock",
      },
      ch0_keys: {
        type: 'custom', art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "Wren adopted you at seven. That same week Wren invented a knock: one each, then all four together. It means *everybody's here*. Wren never joins in.",
          "\"Somebody,\" Wren likes to say, \"has to be the door.\"",
          "\"Knock it with me?\" says the Listener. \"I want to hear everybody. While everybody's still here.\"",
          { text: "One keyboard, one key each. Press yours when it lights up. Then all four at once.", cls: "whisper" },
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
          "On sleepless nights the knock becomes a game on the bedframes, faster and faster, until somebody laughs.",
          "Tonight it never gets that far. The Seer just says, \"Again.\"",
          { text: "The lights slide down your lanes. Press as yours crosses the line.", cls: "whisper" },
          { text: "A white light in all four lanes means everyone presses.", cls: "whisper" },
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
          "The door bangs open. Wren does not knock. Wren never has. A biscuit lands in the Reader's lap, because the Reader has missed supper again. Wren, loudly, knows nothing about it.",
          { speaker: "Wren", text: "You're awake. Good. I heard all that through the door. The knock, too. Nobody's hiding me. I need four idiots and a lamp, and this room has both." },
          "The Reader is already at the sill. Worn shapes run round the lamp's collar, like the ones on the stone. Four hundred years of matches, never once lit.",
          "\"One sentence in all that time,\" says Wren, \"and it's about me. I'd like a second opinion.\"",
        ],
        next: 'ch0_dare', button: "Item two",
      },
      ch0_dare: {
        art: 'ch0_dorm', mood: 'tower', fx: 'dust',
        text: [
          "\"Item two,\" says Wren. \"That's me. I'm an item.\" Wren's copy of the order of business is folded very small. \"I've been practicing standing still. My record is eleven seconds.\" The Binder writes it down.",
          { speaker: "Wren", text: "Everything I have, somebody gave me. Before they decide what I'm for, I want one thing I get to keep." },
          "This week Wren gave you a penknife, a lucky marble and the good pillow, and called it tidying up.",
          "The Listener checks Wren's hands. Cold, as always. Then the lamp hums, two notes. Only the Listener hears it.",
        ],
        next: 'ch0_carve', button: "A dare",
      },
      ch0_carve: {
        type: 'puzzle', puzzle: 'answer', art: 'ch0_lamp', mood: 'tower', fx: 'dust', puzzleId: 'ch0_carve',
        text: [
          "\"It should know who's asking,\" says Wren. \"Our names first. I dare you.\"",
          "The Seer opens the penknife and makes the face the Seer saves for terrible ideas. Wren makes it back.",
          "Generations of dares are carved in the brass: initials, mostly, and one rude word. All four of you look at the same person.",
          { text: "Type the one name all four of you are looking at.", cls: "whisper" },
        ],
        config: () => ({ title: 'CARVE A NAME', fields: [{ label: 'the name', placeholder: 'four letters', len: 8 }], accept: (v) => v[0] === 'WREN', wrongText: '"That\'s not the one you all looked at," says Wren, who noticed.', submitText: 'Carve' }),
        onSolve: () => { try { Game.setArt('ch0_lamp', { carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The Seer cuts it small, under the rude word. \"Good company,\" says the Seer. The brass flares Hearth-gold once, and goes out. Far below, the Hearth answers.",
          { speaker: "Wren", text: "That's my name. I said *ours*." },
          "\"It is ours,\" says the Reader. Wren has no next line, and stands quite still. \"Eleven,\" says the Binder.",
          { speaker: "Wren", text: "Tied my record. Don't write that down. My name's on Founders' brass. Mom'll — the Provost'll — kill me." },
          "Nobody says a word about *Mom*.",
          "\"If those were words,\" says the Reader, \"and I'm not saying they are, there'd be two. I can't tell which goes first.\" In the brass, the hum starts again.",
        ],
        next: 'ch0_attune',
      },
      ch0_attune: {
        type: 'code', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust',
        text: [
          "Each of you sees one thing nobody else can.",
          { text: 'This big screen is the Hearth. Open the Companion on your phone, pick your seat, and type the word shown.', cls: 'whisper' },
          { text: 'Your phone\'s **Book** tab has every word, rule and shape.', cls: 'small' },
        ],
        roles: 'Warden (keyboard): **anyone**. Voice (reads aloud): **the Reader**.', sightSeconds: 90,
        next: 'ch0_lamp',
      },
      /* ---------- the tutorial sigil ---------- */
      ch0_lamp: {
        type: 'puzzle', puzzle: 'ring', art: 'ch0_lamp', artParams: { carved: true }, mood: 'tower', fx: 'dust', puzzleId: 'ch0_lamp', par: [3, 6],
        text: [
          { text: 'A sigil is words in slots. This ring has four. Fill it together, here.', cls: 'whisper' },
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
          'Each of you holds one piece. Say yours.',
          'The hum says which word goes first. Only one cut marks the start.',
          'ASH in slot 3, EMBER in slot 4. The other two stay empty. Then four hands.',
        ],
        onSolve: (s) => { Store.note('You lit the dormitory lamp the old way.'); try { Game.setArt('ch0_lamp', { lit: true, carved: true }); } catch (e) {} },
        clearWidget: true, clearText: true,
        solvedText: [
          "The lamp catches, small and gold. All those matches, and it only ever wanted to be read to. Far below, the Hearth stops flickering.",
          "The Reader stops pretending. \"Ash over ember is one word. It's how you bank a fire: embers under ash, still there in the morning.\" Then, with no ifs at all: \"The word is *keep*.\"",
          "\"It didn't say *walk*,\" says the Listener, and has to sit down.",
          "\"*Walk* is the school's word. *Keep* is the Founders',\" says the Binder. \"That's our second opinion, and the Houses are getting it.\"",
          { speaker: "Wren", text: "Keeps what? Oh. Don't. Nobody look at me like that." },
        ],
        next: 'ch0_tabs',
      },
      ch0_tabs: {
        art: 'ch0_dorm', artParams: { lit: true }, mood: 'tower', fx: 'dust',
        text: [
          "Wren drags the fifth blanket up to the lamp, as close as a blanket can go without catching. The Seer, for once, does not move.",
          { text: "Open your Wren tab. Read your line to Wren, out loud, in seat order.", cls: "whisper" },
        ],
        next: 'ch0_name', button: "Read to Wren",
      },
      ch0_name: {
        type: 'choice', art: 'ch0_dorm', artParams: { lit: true }, mood: 'tower', fx: 'dust', choice: 'WREN_NAME_FOR_GROUP', prompt: 'Choose one together. The named player says it to Wren.',
        text: [
          "For a while the only sound is the lamp. Then Wren laughs and wipes both eyes, as if that were part of laughing.",
          "\"You lot are terrible at secrets,\" says Wren. \"You never said, and I never made you. Best thing nobody ever said to me. Thank you.\"",
          "Then Wren looks at the chalk on the door. That one is news. Wren stands still, and the Binder does not count.",
          "Wren holds out both hands, because the Listener always checks. Still cold, this close to the lamp. Held anyway.",
          { speaker: "Wren", text: "*Keep.* I asked for one thing I get to keep, and you lot went and kept me. The Houses fill in that Register tomorrow. We do it tonight. Claimed by *who*?" },
        ],
        options: [
          { id: 'vigil', text: "Reader: \"The Night Watch.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Night Watch' }, after: [{ speaker: "Wren", text: "A watch is people who stay up for someone. Stay up for me tomorrow." }] },
          { id: 'own', text: "Listener: a name of our own (type it, then say it)", next: 'ch0_dawn', ask: { prompt: 'Claimed by who? Type the name.', set: 'GROUP_NAME', ok: 'That one' }, after: (s) => { const n = ((s.flags.GROUP_NAME || '').replace(/^["'“”‘’\s]+|["'“”‘’.!?,:;\s]+$/g, '') || 'the Four').replace(/^the\s+/i, 'the '); Store.set('GROUP_NAME', n); return [{ speaker: 'Wren', text: n.charAt(0).toUpperCase() + n.slice(1) + ". Nobody gave us that one. We made it, so it goes in ink." }]; } },
          { id: 'idiots', text: "Seer: \"The Idiots.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Idiots' }, after: [{ speaker: "Wren", text: "I asked for four idiots. Apparently there are five. Warm, pleased with itself, claimed by idiots." }] },
          { id: 'four', text: "Binder: \"The Four. It's not taken. I checked.\"", next: 'ch0_dawn', set: { GROUP_NAME: 'the Four' }, after: [{ speaker: "Wren", text: "Four, like the Founders. We'll leave better notes." }] },
        ],
      },
      ch0_dawn: {
        art: 'ch0_dorm', artParams: { lit: true }, mood: 'hearth', fx: 'dust',
        text: (s) => [
          "Wren talks about everything except tomorrow until you are nearly asleep. Then, soft on the floorboards, you knock.",
          { text: "Knock it on the table now, soft: one each, Reader first, then all together.", cls: "whisper" },
          "This time the door is in the room with you, pretending to be asleep.",
          "At dawn the lamp sinks to a red glow under its own ash: banked, not out. Far below, the Hearth flickers again.",
          `While Wren's eyes are shut, the penknife, the marble and the good pillow go back on the fifth blanket. The Binder goes over the pencil name in ink and adds: *Claimed by ${s.flags.GROUP_NAME || 'the Four'}.*`,
          "Somebody came for Wren in the end: four somebodies, fourteen years late, in their socks.",
        ],
        next: 'ch0_flow', button: "Morning",
      },
      ch0_flow: {
        type: 'flow', art: 'ch0_dorm', artParams: { dawn: true }, mood: 'hearth', fx: 'dust',
        text: (s) => [
          "By the Vigil bell, the hall fills with Masters who were born seeing, like you. Whatever the Houses write after \"Claimed by,\" they will be writing second.",
        ],
        flowTitle: 'Prologue — the paths you walked',
        stats: (s) => `Wren calls you **${s.flags.GROUP_NAME || 'the Four'}**. Hints so far: **${s.flags.hintsTotal || 0}**.`,
        next: 'ch1_start', button: "The Vigil",
      },
    },
  });
})();
