/* Epilogue — What the Fire Left Behind */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX;
  const R = L.roles;

  /* ---------- chapter-local styling ---------- */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch8-night { display: flex; flex-direction: column; gap: 14px; }
    .ch8-night .ch8-chapter { border-top: 1px solid rgba(212,169,78,0.2); padding-top: 8px; }
    .ch8-night .ch8-chapter h4 { margin: 0 0 4px; font-family: var(--display); font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
    .ch8-night .ch8-chapter .ch8-sub { font-size: 14px; color: var(--ink-dim); margin: 0 0 4px; }
    .ch8-seals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 6px; }
    .ch8-seal { border: 1px dashed rgba(255,255,255,0.22); border-radius: 8px; padding: 10px 12px; min-height: 92px; background: rgba(0,0,0,0.3); font-size: 15px; color: var(--ink-dim); position: relative; transition: all .5s; }
    .ch8-seal .ch8-who { font-family: var(--display); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; display: block; margin-bottom: 4px; }
    .ch8-seal.p0 .ch8-who { color: var(--p1); } .ch8-seal.p1 .ch8-who { color: var(--p2); } .ch8-seal.p2 .ch8-who { color: var(--p3); } .ch8-seal.p3 .ch8-who { color: var(--p4); }
    .ch8-seal.open { border-style: solid; border-color: var(--gold); color: var(--ink); background: rgba(212,169,78,0.08); animation: fadeUp .5s ease both; }
    .ch8-seal .ch8-line { display: block; margin-top: 3px; }
    .ch8-seal .ch8-line em { font-style: italic; }
    .ch8-seal .ch8-wax { position: absolute; right: 10px; top: 8px; width: 18px; height: 18px; border-radius: 50%; background: var(--blood); box-shadow: 0 0 8px rgba(178,58,58,0.6); }
    .ch8-seal.open .ch8-wax { display: none; }
    .ch8-stats { width: 100%; border-collapse: collapse; font-size: 18px; }
    .ch8-stats td { padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.08); vertical-align: top; }
    .ch8-stats td:first-child { font-family: var(--display); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-dim); width: 42%; padding-top: 11px; }
    .ch8-stats td b { color: var(--gold-2); font-family: var(--display); font-size: 20px; }
    .ch8-log { margin: 10px 0 0; padding-left: 20px; font-size: 15px; color: var(--ink-dim); columns: 2; column-gap: 24px; }
    .ch8-log li { margin-bottom: 3px; break-inside: avoid; }
    .ch8-map svg.night-map { width: 100%; height: auto; }
    .ch8-knot { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; margin-top: 6px; }
    .ch8-knot svg { width: min(520px, 100%); height: auto; overflow: visible; }
    .ch8-knot .ch8-route path.trace { stroke-width: 1.5; stroke-dasharray: 40; stroke-dashoffset: 40; animation: ch8draw 3.6s ease-out forwards; }
    .ch8-knot .ch8-route path.trace.second { stroke-dasharray: 16; stroke-dashoffset: 16; animation: ch8draw 1.6s ease-out 3.4s forwards; }
    @keyframes ch8draw { to { stroke-dashoffset: 0; } }
    .ch8-knot .ch8-waypoint { opacity: 0; animation: fadeUp .4s ease forwards; }
    .ch8-knot .ch8-caption { font-family: var(--display); font-size: 14px; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-2); text-align: center; width: 100%; opacity: 0; animation: fadeUp 1s 5.2s ease forwards; }
    .ch8-words { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin: 8px 0; }
    .ch8-words .ch8-w { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 6px; border: 1px solid rgba(212,169,78,0.3); border-radius: 8px; background: rgba(0,0,0,0.3); min-width: 78px; opacity: 0; animation: fadeUp .5s ease forwards; }
    .ch8-words .ch8-w span { font-family: var(--display); font-size: 11px; letter-spacing: .12em; color: var(--gold-2); }
    .ch8-words .ch8-w small { font-size: 11px; color: var(--ink-dim); }
    .ch8-words .ch8-w.cold { border-style: dashed; border-color: rgba(79,179,191,0.5); }
    .ch8-words .ch8-w.cold span { color: var(--sea); }
    .ch8-sit { font-family: var(--display); font-size: 30px; letter-spacing: .2em; color: var(--gold-2); text-align: center; padding: 18px 0 8px; text-shadow: 0 0 30px rgba(242,210,122,0.4); }
    .ch8-endrow { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
  ` }));

  /* ---------- helpers ---------- */
  const ending = (s) => { const e = +(s.flags.ENDING || 0); return e >= 0 && e <= 4 ? e : 0; };
  const walked = (s, r) => { const e = ending(s); if (e === 0) return true; if (e !== 1) return false; return s.flags['WALK_' + r.id] === 'WALK' && s.flags['BARGAIN_' + r.id] !== 'kept'; };
  const walkers = (s) => R.filter(r => walked(s, r)).map(r => r.nick);
  const stayers = (s) => R.filter(r => !walked(s, r)).map(r => r.nick);
  const kept = (s) => R.filter(r => s.flags['BARGAIN_' + r.id] === 'kept').map(r => r.nick);
  const broken = (s) => R.filter(r => s.flags['BARGAIN_' + r.id] === 'broken').map(r => r.nick);
  const listOr = (arr, none) => arr.length ? UI.list(arr) : none;
  const TRUTH = { reader: 'DONTKNOW', listener: 'NO', seer: 'TELL', binder: 'DONTKNOW' };
  const truths = (s) => s.flags.TRUTHS != null ? +s.flags.TRUTHS : R.filter(r => s.flags['WHISPER_' + r.id] === TRUTH[r.id]).length;
  const clues = (s) => s.flags.CLUES != null ? +s.flags.CLUES : 0;
  const midnightText = (s) => { const v = s.flags.MIDNIGHT_LEFT; if (v == null) return '— (the clock never ran)'; const m = Math.floor(v / 60), sec = v % 60; return `${m}:${String(sec).padStart(2, '0')} to spare`; };
  const stairText = (s) => { const v = +(s.flags.VOLUNTEER || 0); if (v >= 1 && v <= 4) return `**${L.nick(v - 1)}** — a living anchor`; const st = s.flags.STAIR; if (st === 'COLLAPSE') return 'nobody — you brought the stair down'; if (st === 'RUN') return 'nobody — you ran, and were followed'; if (st === 'HOLD') return 'nobody said yes; you ran'; return 'nobody'; };
  const WHISPER_TEXT = {
    reader: { TELL: '"A small brave bird." — a bluff', DONTKNOW: '"I don\'t know yet." — the truth' },
    listener: { LOUD: '"Yes. Loud." — a lie', NO: '"No." — the truth' },
    seer: { TELL: 'told Wren about the shadow — the truth', NOTHING: 'said nothing, and looked at the wall' },
    binder: { YES: '"Yes." — a kindness, which is not the same as the truth', DONTKNOW: '"I don\'t know." — the truth' },
  };
  const whisperLine = (s, r) => { const v = s.flags['WHISPER_' + r.id]; return (WHISPER_TEXT[r.id] && WHISPER_TEXT[r.id][v]) || 'never whispered back'; };
  const finaleLine = (s, r) => {
    const w = s.flags['WALK_' + r.id], b = s.flags['BARGAIN_' + r.id]; const out = [];
    if (w === 'WALK') out.push('would walk into the fire'); else if (w === 'STAY') out.push('would stay on the stones');
    if (b === 'kept') out.push('took the Envoy\'s word, and kept it'); else if (b === 'broken') out.push('took the Envoy\'s word, then broke it in the room'); else if (b === 'accepted') out.push('took the Envoy\'s word, in the dark'); else if (b === 'refused' || b === false) out.push('refused the Envoy');
    return out.length ? out.join('; ') : 'was never asked — the fire did not need a word';
  };
  const ENDING_NAMES = ['The Fourfold Walk', 'The Half-Walk', 'The Sealing', 'The Keeper\'s Walk', 'The Envoy\'s Bargain'];

  /* art / mood / fx must be strings on a scene; the endings re-dress the scene on enter */
  const dress = (s, arts, moods, fxs) => { const e = ending(s); try { Game.setArt(arts[e]); } catch (x) {} try { Audio.mood(moods[e]); } catch (x) {} try { FX.set(fxs[e]); } catch (x) {} };

  /* every chapter's flowchart in order, with the lit set the engine would use */
  function litSet(state) { const done = new Set(state.visited); Game.chapters.forEach(ch => { if (ch.flow) ch.flow.nodes.forEach(n => { if (n.when) { try { if (n.when(state)) done.add(n.id); } catch (e) {} } }); }); return done; }

  Game.addChapter({
    id: 'ch8', label: 'Epilogue', title: 'What the Fire Left Behind', start: 'ch8_start', code: 'WREN',
    mood: 'hearth', fx: 'embers', art: 'ch8_dawn', flame: 1,
    flow: {
      nodes: [
        { id: 'ch8_start', label: 'Who walked', col: 0, row: 2 },
        { id: 'ch8_e0', label: 'The Fourfold Walk', col: 1, row: 0, kind: 'end', secret: true, when: (s) => ending(s) === 0 && s.visited.includes('ch8_e0') },
        { id: 'ch8_e1', label: 'The Half-Walk', col: 1, row: 1, kind: 'end', secret: true, when: (s) => ending(s) === 1 && s.visited.includes('ch8_e1') },
        { id: 'ch8_e2', label: 'The Sealing', col: 1, row: 2, kind: 'end', secret: true, when: (s) => ending(s) === 2 && s.visited.includes('ch8_e2') },
        { id: 'ch8_e3', label: 'The Keeper\'s Walk', col: 1, row: 3, kind: 'end', secret: true, when: (s) => ending(s) === 3 && s.visited.includes('ch8_e3') },
        { id: 'ch8_e4', label: 'The Envoy\'s Bargain', col: 1, row: 4, kind: 'end', secret: true, when: (s) => ending(s) === 4 && s.visited.includes('ch8_e4') },
        { id: 'ch8_together', label: 'They went in together', col: 0, row: 0, kind: 'end', secret: true, when: (s) => ending(s) === 0 && s.visited.includes('ch8_e0') },
        { id: 'ch8_night', label: 'The whole night', col: 2, row: 2 },
        { id: 'ch8_unseal', label: 'Unseal the dark?', col: 3, row: 2, kind: 'choice' },
        { id: 'ch8_unsealed', label: 'four seals broken', col: 4, row: 1, secret: true },
        { id: 'ch8_map', label: 'The route: KNOT', col: 4, row: 3 },
        { id: 'ch8_words', label: 'The eighth glyph', col: 5, row: 2 },
        { id: 'ch8_code', label: 'WREN, written', col: 6, row: 1, secret: true },
        { id: 'ch8_end', label: 'Sit with it', col: 6, row: 3, kind: 'end' },
      ],
      edges: [['ch8_start', 'ch8_e0'], ['ch8_start', 'ch8_e1'], ['ch8_start', 'ch8_e2'], ['ch8_start', 'ch8_e3'], ['ch8_start', 'ch8_e4'], ['ch8_together', 'ch8_e0'],
        ['ch8_e0', 'ch8_night'], ['ch8_e1', 'ch8_night'], ['ch8_e2', 'ch8_night'], ['ch8_e3', 'ch8_night'], ['ch8_e4', 'ch8_night'],
        ['ch8_night', 'ch8_unseal'], ['ch8_unseal', 'ch8_unsealed'], ['ch8_unseal', 'ch8_map'], ['ch8_unsealed', 'ch8_map'], ['ch8_map', 'ch8_words'], ['ch8_words', 'ch8_code'], ['ch8_words', 'ch8_end'], ['ch8_code', 'ch8_end']],
    },
    scenes: {
      /* ---------- who walked ---------- */
      ch8_start: {
        title: 'What the Fire Left Behind',
        art: 'ch8_stones', mood: 'wonder', fx: 'embers', flame: 1, speed: 20,
        enter: (s) => { dress(s, ['ch8_white', 'ch8_stones', 'ch8_stones', 'ch8_flicker', 'ch8_cage'], ['triumph', 'wonder', 'sorrow', 'sorrow', 'dread'], ['motes', 'embers', 'embers', 'ash', 'ash']); Game.flame([1, 0.65, 1, 0.3, 0.15][ending(s)]); if (Game.clock && Game.clock.running()) Game.clock.stop(); Store.set('EPILOGUE_ENDING', ENDING_NAMES[ending(s)]); },
        text: (s) => {
          const e = ending(s);
          const voice = { text: 'The Voice, for what is left of the night: all four of you, a paragraph each, sunwise from the Reader. The keyboard: whoever is nearest.', cls: 'small' };
          if (e === 0) return [
            { text: `Walked into the fire: **${UI.list(walkers(s))}**.`, cls: 'center' },
            { text: 'Stayed on the stones: **nobody**.', cls: 'center' },
            'Four hands on one key, with the phones already dark. The eighth glyph, written.',
            'The Hearth does not gutter. It does the other thing.',
            voice,
          ];
          if (e === 1) return [
            { text: `Walked into the fire: **${listOr(walkers(s), 'fewer of you than meant to')}**.`, cls: 'center' },
            { text: `Stayed on the stones: **${listOr(stayers(s), 'nobody')}**.`, cls: 'center' },
            kept(s).length ? `${UI.list(kept(s))} had kept the Envoy's word; that key was dead, and three hands wrote what four should have.` : 'Not every hand went in. The glyph was written anyway, thinner than it was meant to be.',
            'The Cold closes. Narrower than the Founders closed it. Wider than it was an hour ago.',
            voice,
          ];
          if (e === 2) return [
            { text: 'Walked into the fire: **Wren**.', cls: 'center' },
            { text: `Stayed on the stones: **${UI.list(L.nicks)}**.`, cls: 'center' },
            { speaker: 'Wren', text: 'It\'s alright. I knew.' },
            'That is all Wren says. It is the only time all night Wren has been short of words.',
            voice,
          ];
          if (e === 3) return [
            { text: 'Walked into the fire: **the Provost**.', cls: 'center' },
            { text: `Stayed on the stones: **Wren**, and **${UI.list(L.nicks)}**.`, cls: 'center' },
            { speaker: 'Marrow', text: 'Then I go. I should have gone fourteen years ago.' },
            'Nobody argues. Everybody meant to.',
            voice,
          ];
          return [
            { text: 'Walked into the fire: **nobody**.', cls: 'center' },
            { text: 'Walked out of Thornhallow: **Lord Cassian Vane**, with **Wren**, in a cage it took four soldiers to carry.', cls: 'center' },
            'The Hearth is still lit. That is the horror of it: nothing about the fire has changed at all.',
            voice,
          ];
        },
        next: (s) => 'ch8_e' + ending(s), button: 'What the fire left behind',
      },

      /* ---------- the five endings ---------- */
      ch8_e0: {
        art: 'ch8_white', mood: 'triumph', fx: 'motes', flame: 1, speed: 20,
        text: [
          'White. Not the white of snow — the white of a forge, of a thing too hot to have a colour. The Hearth of Thornhallow roars, and for the first time in four hundred years it is not holding anything shut. It is simply a fire.',
          'You come out of it the way the Founders came out: grey-eyed and ordinary. The Reader looks at the stone and sees shapes. The Listener hears a room. The Seer sees a floor. The Binder sees four friends and nothing between them but air.',
          'Wren is waiting on the stones.',
          { speaker: 'Wren', text: 'You took your *time*.' },
          'There is a pulse in Wren\'s throat. You can see it from here. The Listener, who will never hear anything like it again, does not need to.',
        ],
        next: 'ch8_report', button: 'Dawn',
      },
      ch8_report: {
        art: 'ch8_stones', mood: 'wonder', fx: 'embers', flame: 1,
        text: [
          'The Provost sits down on the bottom step of the Long Stair, which she has never done, and stays there a long time. Wren sits down next to her. Neither says anything. The Binder, who cannot see threads any more, does not need to.',
          'Lord Cassian Vane writes his report to the Crown by the light of a fire that no longer needs him. It says the Cold is closed. It says there is nothing under Thornhallow to harness. It is the first true thing he has ever sent them.',
          'Master Tarn goes home. Nobody stops him. The nine Houses find, in the morning, that the school beneath them is still there, and that it is warm.',
        ],
        next: 'ch8_years', button: 'Years later',
      },
      ch8_years: {
        title: 'Years later', art: 'ch8_years', mood: 'wonder', fx: 'snow', flame: 1, speed: 18,
        text: [
          'Four unremarkable people, in a house that is too small for all of them, every winter.',
          'They argue about what the ring looked like. The Reader says the mark was at the top. The Seer says there were two marks and the Reader is remembering the lamp. The Listener says the whole thing went up one, up three, and is told, every year, that nobody else could ever hear that.',
          'The Reader keeps a letter in the drawer by the bed. It is one line of glyphs. The Reader cannot read it, and will not have it translated.',
          'The Listener says the house is too quiet, and means the opposite.',
          'The Binder ties the others to each other, and calls it kindness, and it holds.',
          'They would do it again. They say so, every winter, at the point in the evening when it becomes true.',
          'Wren visits. Grown, and tall, and still coming through doors sideways. There is a pulse in Wren\'s throat that the Listener cannot hear, and does not need to.',
          { speaker: 'Wren', text: 'You\'re all *awake*. Excellent.' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e1: {
        art: 'ch8_stones', mood: 'wonder', fx: 'embers', flame: 0.65, speed: 20,
        text: (s) => [
          'The Cold closes — not the way the Founders closed it, and not the way the Order would have. Narrower. Enough.',
          `**${listOr(walkers(s), 'The walkers')}** come out of the fire grey-eyed and free, and stand blinking at a room they cannot see under any more.`,
          `**${listOr(stayers(s), 'The rest')}** keep their Sightings, and the fire, for life. There is a school above you that knows now what it is built on, and it will need Masters who can read the wall. Those are the Masters.`,
          'Wren lives. Wren stands on the stones and laughs and hugs everyone, walkers and stayers alike, and holds on slightly too long.',
          'There is no pulse in Wren\'s throat. It is the one visible difference, and only the Listener would ever have known.',
          { speaker: 'Wren', text: 'Half of you can\'t see me properly any more. Good. I looked *terrible*.' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e2: {
        art: 'ch8_stones', artParams: { noWren: true }, mood: 'sorrow', fx: 'embers', flame: 1, speed: 22,
        text: [
          { speaker: 'Wren', text: 'It\'s alright. I knew. I\'ve known since the laundry.' },
          'Wren walks into the Hearth the way Wren walks through doors. It closes behind. Four hundred years of fire, again, from a spark.',
          'In the morning a mason carves a fifth name over the Hearth, beneath the four Founders. He has to ask how to spell it. Nobody in the room can tell him, in the older alphabet, and the Reader does not offer.',
          'The Provost stands at the fire with a thread nobody can see but the Binder. It is grey. It has been grey for fourteen years.',
          'On the chart of the night, one step from where you stood, there is a box you did not open.',
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e3: {
        art: 'ch8_flicker', mood: 'sorrow', fx: 'ash', flame: 0.3, speed: 20,
        text: [
          'She does not say goodbye to Wren. She has been saying it for fourteen years; the Binder has seen the colour of it. She puts her hand on the fire as if it were a door, and it is.',
          'The seal holds. Thin — the kind of hold that needs watching — but it holds.',
          'Wren lives. No pulse. Wren does not seem to mind, and stands a long time where the Provost stood, and then makes a joke about it that nobody laughs at, and then one that everybody does.',
          { text: 'Years later.', cls: 'big' },
          'Provost Wren of Thornhallow keeps a fire that flickers. Every winter it dips, and every winter it comes back. The fourth-years are told it is nothing.',
          'The Provost, who once called someone Mum by accident, looks at the fire when it flickers. Not at them.',
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e4: {
        art: 'ch8_cage', mood: 'dread', fx: 'ash', flame: 0.15, speed: 20,
        text: (s) => [
          'The Envoy is courteous about it. He has always been courteous.',
          'Wren goes into the cage without being pushed, and does not say anything to any of you, which is the worst thing Wren has ever done.',
          'By spring the Cold feeds the Crown\'s engines. What leaks from under Thornhallow is harnessed, as promised. The school is a garrison. The Hearth is a furnace with a schedule.',
          'You are Masters, as promised. Masters of ash.',
          broken(s).length ? { text: `On the chart of the night, beside ${UI.list(broken(s))}, it says: *one of you almost did.*`, cls: 'whisper' } : { text: 'On the chart of the night, beside your four names, it says nothing at all.', cls: 'whisper' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },

      /* ---------- the whole night ---------- */
      ch8_night: {
        type: 'custom', art: 'ch8_dawn', mood: 'hearth', fx: 'dust',
        text: ['The whole night, unfolded down the Hearth. Lit: what you did. Grey: what you did not. Sealed: what each of you chose alone.'],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'ch8-night' });
          const done = litSet(api.state);
          Game.chapters.forEach(ch => {
            if (!ch.flow || !ch.flow.nodes || !ch.flow.nodes.length) return;
            const sec = UI.el('div', { class: 'ch8-chapter' });
            sec.appendChild(UI.el('h4', { text: (ch.label ? ch.label + ' — ' : '') + ch.title }));
            const reached = api.state.visited.some(v => Game.sceneChapter[v] === ch.id);
            if (!reached) sec.appendChild(UI.el('p', { class: 'ch8-sub', text: 'The fire has no record of this hour.' }));
            try { sec.appendChild(UI.flowchart(ch.buildFlow ? ch.buildFlow(api.state) : ch.flow, done)); } catch (e) { console.error(e); }
            wrap.appendChild(sec);
          });
          const sealsSec = UI.el('div', { class: 'ch8-chapter' });
          sealsSec.appendChild(UI.el('h4', { text: 'Sealed — chosen in the dark' }));
          const seals = UI.el('div', { class: 'ch8-seals' });
          R.forEach((r, i) => seals.appendChild(UI.el('div', { class: 'ch8-seal p' + i, html: `<span class="ch8-who">only the ${UI.esc(r.nick)} knows</span><span class="ch8-wax"></span><span class="ch8-line">the laundry, the stair, the fire.</span>` })));
          sealsSec.appendChild(seals);
          wrap.appendChild(sealsSec);
          box.appendChild(wrap);
          api.button('Onward', () => resolve('ch8_unseal'), 'primary');
        }),
      },
      ch8_unseal: {
        type: 'choice', art: 'ch8_dawn', mood: 'hearth', fx: 'dust', choice: 'UNSEAL',
        text: ['Four boxes. Each of you chose something in the laundry, something on the stair, something at the fire, and told nobody. The fire kept them.'],
        prompt: 'Unseal what each of you chose in the dark?',
        options: [
          { id: 'yes', text: 'Unseal them. All four, one at a time.', next: 'ch8_unsealed', after: ['The wax cracks.'] },
          { id: 'no', text: 'Leave them sealed.', sub: 'Some things a night keeps.', next: 'ch8_map', after: ['The fire keeps them. It is good at that.'] },
        ],
      },
      ch8_unsealed: {
        type: 'custom', art: 'ch8_dawn', mood: 'hearth', fx: 'dust',
        text: ['One at a time. By nickname. Nobody has to say anything about it.'],
        run: (box, api) => new Promise((resolve) => {
          const s = api.state;
          const wrap = UI.el('div', { class: 'ch8-night' });
          const seals = UI.el('div', { class: 'ch8-seals' });
          const cards = R.map((r, i) => { const c = UI.el('div', { class: 'ch8-seal p' + i, html: `<span class="ch8-who">only the ${UI.esc(r.nick)} knows</span><span class="ch8-wax"></span><span class="ch8-line">sealed</span>` }); seals.appendChild(c); return c; });
          wrap.appendChild(seals); box.appendChild(wrap);
          let n = 0; let btn;
          const open = () => {
            const r = R[n], c = cards[n];
            Audio.sfx('reveal');
            const v = +(s.flags.VOLUNTEER || 0);
            const stair = v === n + 1 ? 'said yes to the stair, and was fastest' : (v > 0 || s.flags.STAIR === 'HOLD') ? 'the fire does not say which' : '';
            c.classList.add('open');
            c.innerHTML = `<span class="ch8-who">${UI.esc(r.nick)}</span>` +
              `<span class="ch8-line"><em>In the laundry:</em> ${UI.rich(whisperLine(s, r))}</span>` +
              (stair ? `<span class="ch8-line"><em>On the stair:</em> ${UI.esc(stair)}</span>` : '') +
              `<span class="ch8-line"><em>At the fire:</em> ${UI.esc(finaleLine(s, r))}</span>`;
            n++;
            if (n >= 4) { btn.remove(); Store.note('You unsealed the four boxes.'); api.button('Onward', () => resolve('ch8_map'), 'primary'); }
            else btn.textContent = `Unseal ${R[n].nick}`;
          };
          btn = api.button(`Unseal ${R[0].nick}`, open, 'primary');
        }),
      },

      /* ---------- the map ---------- */
      ch8_map: {
        type: 'custom', art: 'ch8_dawn', mood: 'wonder', fx: 'dust',
        text: ['The Map of the Night, and the gold line of the route you walked: dormitory, hall, vault, gallery, study, stair, chamber, the Cold, dawn.', { text: 'Seen whole —', cls: 'whisper' }],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'ch8-map' });
          try { wrap.appendChild(UI.el('div', { html: window.VigilMap.render() })); } catch (e) { console.error(e); }
          const knot = UI.el('div', { class: 'ch8-knot' });
          const glyph = G.inner('KNOT').replace(/<path /g, '<path class="trace" ').replace('class="trace" d="M-5,15', 'class="trace second" d="M-5,15');
          knot.appendChild(UI.el('div', { class: 'ch8-route', html: `<svg viewBox="-26 -22 52 44"><g style="color:var(--gold-2)">${glyph}</g><g class="ch8-pts"></g></svg>` }));
          knot.appendChild(UI.el('div', { class: 'ch8-caption', text: '— it is the glyph KNOT. Bound; together; four-as-one.' }));
          wrap.appendChild(knot); box.appendChild(wrap);
          // waypoints along the route, placed by path length
          try {
            const svg = knot.querySelector('svg'); const paths = Array.from(svg.querySelectorAll('path.trace')); const pts = svg.querySelector('.ch8-pts');
            // seven hours up the hook (the sheet turns over at the curl), two along the closing stroke
            const hook = paths[0], base = paths[1];
            // [label, path, fraction, label dx, label dy, anchor]
            const spots = [['dormitory', hook, 0, 0, 4.2, 'middle'], ['Great Hall', hook, 1 / 6, -2.4, 0.9, 'end'], ['Vault', hook, 2 / 6, 2.4, 0.9, 'start'], ['Gallery', hook, 3 / 6, -2.4, 0.9, 'end'], ['study', hook, 4 / 6, 2.4, 0.9, 'start'], ['Long Stair', hook, 5 / 6, 0.6, -2.6, 'middle'], ['bell-chamber', hook, 1, -2.2, 0.9, 'end'], ['the Cold', base, 0.1, -2.4, 0.9, 'end'], ['dawn', base, 0.9, 2.4, 0.9, 'start']];
            spots.forEach(([lab, p, f, dx, dy, anchor], i) => {
              const pt = p.getPointAtLength(p.getTotalLength() * f);
              const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'ch8-waypoint'); g.style.animationDelay = (0.3 + i * 0.42) + 's';
              g.innerHTML = `<circle cx="${pt.x.toFixed(2)}" cy="${pt.y.toFixed(2)}" r="1.1" fill="#f2d27a" stroke="#0b0a10" stroke-width=".4"/><text x="${(pt.x + dx).toFixed(2)}" y="${(pt.y + dy).toFixed(2)}" font-size="2.4" fill="#e9e2d2" font-family="Cormorant Garamond,serif" text-anchor="${anchor}">${UI.esc(lab)}</text>`;
              pts.appendChild(g);
            });
          } catch (e) { console.error(e); }
          Audio.sfx('reveal');
          api.button('The numbers', () => resolve('ch8_stats'), 'primary');
        }),
      },

      /* ---------- stats ---------- */
      ch8_stats: {
        type: 'custom', art: 'ch8_dawn', mood: 'hearth', fx: 'dust',
        text: (s) => ['The fire keeps count. It always has.', { text: `Wren called you **${s.flags.GROUP_NAME || 'the Four'}**. Wren was right.`, cls: 'small' }],
        run: (box, api) => new Promise((resolve) => {
          const s = api.state;
          const rows = [
            ['Clues caught, in the bell-chamber', `<b>${clues(s)}</b> of 4${s.flags.CLUES_HELP ? ' <span class="small">(with help)</span>' : ''}`],
            ['Truths told to Wren, in the laundry', `<b>${truths(s)}</b> of 4`],
            ['Hints asked of the fire', `<b>${s.flags.hintsTotal || 0}</b>`],
            ['Bells cracked', `<b>${s.flags.BELLS_CRACKED || 0}</b> of 3`],
            ['Minutes to midnight', `<b>${UI.esc(midnightText(s))}</b>`],
            ['Who held the stair', UI.rich(stairText(s))],
            ['Who almost took the Envoy\'s word', broken(s).length ? `<b>${UI.esc(UI.list(broken(s)))}</b> — and then did not` : (kept(s).length ? `<b>${UI.esc(UI.list(kept(s)))}</b> — and did` : 'nobody')],
            ['The ending', `<b>${UI.esc(ENDING_NAMES[ending(s)])}</b>`],
            ['The night, in hours', `<b>${UI.esc(Store.elapsedText())}</b>`],
          ];
          const tb = UI.el('table', { class: 'ch8-stats' });
          rows.forEach(([k, v]) => tb.appendChild(UI.el('tr', {}, [UI.el('td', { text: k }), UI.el('td', { html: v })])));
          box.appendChild(tb);
          const log = (s.log || []).slice(-16);
          if (log.length) { box.appendChild(UI.el('p', { class: 'small', style: { marginTop: '12px' }, text: 'The fire also remembers:' })); box.appendChild(UI.el('ul', { class: 'ch8-log' }, log.map(t => UI.el('li', { text: t })))); }
          api.button('One more thing', () => resolve('ch8_words'), 'primary');
        }),
      },

      /* ---------- the words ---------- */
      ch8_words: {
        type: 'custom', art: 'ch8_dawn', mood: 'wonder', fx: 'motes', speed: 22,
        text: [
          { text: 'The words that woke your phones tonight — THORN, KNOT, VEIL, EMBER, ASH, WELL, CROWN — were the Great Sigil in wall order. The eighth glyph is never written. You wrote it twice: once in the dormitory, when it was a dare, and once just now.', cls: 'omen' },
        ],
        run: (box, api) => new Promise((resolve) => {
          const words = ['THORN', 'KNOT', 'VEIL', 'EMBER', 'ASH', 'WELL', 'CROWN'];
          const row = UI.el('div', { class: 'ch8-words' });
          words.forEach((w, i) => { const c = UI.el('div', { class: 'ch8-w', html: `${G.svg(w, { size: 44, color: '#f2d27a' })}<span>${w}</span><small>${UI.esc(L.chapters[i + 1].label)}</small>` }); c.style.animationDelay = (0.4 + i * 0.35) + 's'; row.appendChild(c); });
          const cold = UI.el('div', { class: 'ch8-w cold', html: `${G.svg('COLD', { size: 44, color: '#4fb3bf' })}<span>WREN</span><small>never written</small>` }); cold.style.animationDelay = '3.4s'; row.appendChild(cold);
          box.appendChild(UI.el('div', { class: 'pz-title', text: 'THE GREAT SIGIL, IN WALL ORDER' }));
          box.appendChild(row);
          box.appendChild(UI.el('p', { class: 'small', text: 'KINDLE, in the dormitory, was only a lamp. Everything after it was the wall.' }));
          words.forEach((w, i) => setTimeout(() => { if (api.alive()) Audio.note(G.MIDI[w], 1.2, 0.14); }, 400 + i * 350));
          api.button('The last word', () => resolve(ending(api.state) === 0 && api.state.flags.WREN_SHOWN ? 'ch8_flow' : 'ch8_code'), 'primary');
        }),
      },
      ch8_code: {
        type: 'code', art: 'ch8_dawn', mood: 'wonder', fx: 'motes',
        text: (s) => [
          ending(s) === 0 ? 'The last word. In the dormitory it was a dare. Write it.' : 'The last word, for the phones. In the dormitory it was a dare; the fire never got to see it written properly. Write it now, and look at your own page — nobody else\'s.',
        ],
        roles: 'Warden of the Hearth (keyboard): **whoever is nearest**. Voice: **all four of you** — a paragraph each, sunwise from the Reader.', sightSeconds: 90,
        codeSub: 'Each phone shows its last page. Read yours. Say nothing.',
        enter: () => { Store.set('WREN_SHOWN', true); },
        next: 'ch8_flow', button: 'Every phone has gone dark',
      },
      ch8_flow: {
        type: 'flow', art: 'ch8_dawn', mood: 'hearth', fx: 'embers',
        text: ['The last chart. Small, because the night was long and this is the end of it.'],
        flowTitle: 'Epilogue — the paths you walked',
        stats: (s) => `Ending: **${ENDING_NAMES[ending(s)]}**. Clues ${clues(s)}/4 · truths ${truths(s)}/4 · hints ${s.flags.hintsTotal || 0} · bells cracked ${s.flags.BELLS_CRACKED || 0}.${ending(s) === 2 ? ' One step from where you stood: *They went in together.*' : ''}`,
        next: 'ch8_end', button: 'Sit with it',
      },
      ch8_end: {
        type: 'end', art: 'ch8_stones', mood: 'silence', fx: 'embers', speed: 30,
        enter: (s) => dress(s, ['ch8_years', 'ch8_stones', 'ch8_stones', 'ch8_flicker', 'ch8_cage'], ['silence', 'silence', 'silence', 'silence', 'void'], ['snow', 'embers', 'embers', 'ash', 'ash']),
        text: (s) => [
          { text: 'Sit with it.', cls: 'big' },
          ending(s) === 0 ? { text: 'Four friends, a small house, a fire that is only a fire.', cls: 'center' } : ending(s) === 2 ? { text: 'They went in together. One step away. The fire will show you the way back to CROWN, if you want it.', cls: 'center' } : { text: 'The fire will show you the way back to any hour of the night, if you want it.', cls: 'center' },
          { text: 'Thank you for playing Hearthfall.', cls: 'small center' },
        ],
        button: 'Begin again',
        render: (actions, api) => {
          actions.appendChild(UI.el('div', { class: 'ch8-sit', text: 'S I T   W I T H   I T .' }));
          const row = UI.el('div', { class: 'ch8-endrow' });
          row.appendChild(UI.el('button', { class: 'btn', text: 'Replay from any hour', onclick: () => { Audio.sfx('click'); Game.showChapterSelect(); } }));
          row.appendChild(UI.el('button', { class: 'btn ghost', text: 'The whole night again', onclick: () => { Audio.sfx('click'); Game.go('ch8_night'); } }));
          actions.appendChild(row);
        },
      },
    },
  });
})();
