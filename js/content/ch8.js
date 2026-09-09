/* Epilogue — What the Fire Left Behind */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX;
  const R = L.roles;

  /* ---------- chapter-local styling ---------- */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch8-night { position: relative; display: flex; flex-direction: column; gap: 5px; padding: 2px 0 2px 26px; }
    .ch8-night::before { content: ''; position: absolute; left: 8px; top: 12px; bottom: 12px; width: 2px; border-radius: 1px; background: linear-gradient(180deg, rgba(212,169,78,0.12), var(--gold-2) 10%, var(--gold-2) 90%, rgba(212,169,78,0.12)); }
    .ch8-hour { position: relative; margin: 0; font-size: clamp(17px, 2.55vh, 19px); line-height: 1.36; color: var(--ink); opacity: 0; animation: fadeUp .55s ease forwards; }
    .ch8-hour::before { content: ''; position: absolute; left: -22px; top: .5em; width: 9px; height: 9px; border-radius: 50%; background: var(--gold-2); box-shadow: 0 0 9px rgba(242,210,122,0.55); }
    .ch8-hour.faint { color: var(--ink-dim); }
    .ch8-hour.faint::before { background: rgba(255,255,255,0.22); box-shadow: none; }
    .ch8-hour.faint .ch8-where { color: var(--ink-dim); }
    .ch8-where { font-family: var(--display); font-size: .8em; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); margin-right: .55em; white-space: nowrap; }
    .ch8-seals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 6px; }
    .ch8-seal { border: 1px dashed rgba(255,255,255,0.22); border-radius: 8px; padding: 10px 12px; min-height: 92px; background: rgba(0,0,0,0.3); font-size: 15px; color: var(--ink-dim); position: relative; transition: all .5s; }
    .ch8-seal .ch8-who { font-family: var(--display); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; display: block; margin-bottom: 4px; }
    .ch8-seal.p0 .ch8-who { color: var(--p1); } .ch8-seal.p1 .ch8-who { color: var(--p2); } .ch8-seal.p2 .ch8-who { color: var(--p3); } .ch8-seal.p3 .ch8-who { color: var(--p4); }
    .ch8-seal.open { border-style: solid; border-color: var(--gold); color: var(--ink); background: rgba(212,169,78,0.08); animation: fadeUp .5s ease both; }
    .ch8-seal .ch8-line { display: block; margin-top: 3px; }
    .ch8-seal .ch8-line em { font-style: italic; }
    .ch8-seal .ch8-wax { position: absolute; right: 10px; top: 8px; width: 18px; height: 18px; border-radius: 50%; background: var(--blood); box-shadow: 0 0 8px rgba(178,58,58,0.6); }
    .ch8-seal.open .ch8-wax { display: none; }
    .ch8-counts { display: flex; flex-direction: column; gap: 10px; padding: 4px 0; }
    .ch8-count { margin: 0; font-size: clamp(17px, 2.6vh, 20px); line-height: 1.35; color: var(--ink); opacity: 0; animation: fadeUp .5s ease forwards; }
    .ch8-count b { font-family: var(--display); font-size: 1.4em; color: var(--gold-2); letter-spacing: .04em; }
    .ch8-map svg.night-map { width: 100%; height: auto; max-height: 34vh; }
    .ch8-knot { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-top: 2px; }
    .ch8-knot svg { width: min(260px, 100%); max-height: 26vh; height: auto; overflow: visible; }
    .ch8-knot .ch8-route path.trace { stroke-width: 1.5; stroke-dasharray: 40; stroke-dashoffset: 40; animation: ch8draw 2s ease-out forwards; }
    .ch8-knot .ch8-route path.trace.second { stroke-dasharray: 16; stroke-dashoffset: 16; animation: ch8draw 1s ease-out 1.9s forwards; }
    @keyframes ch8draw { to { stroke-dashoffset: 0; } }
    .ch8-knot .ch8-waypoint { opacity: 0; animation: fadeUp .4s ease forwards; }
    .ch8-knot .ch8-caption { font-family: var(--display); font-size: 14px; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-2); text-align: center; width: 100%; opacity: 0; animation: fadeUp 1s 2.9s ease forwards; }
    .ch8-words { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin: 8px 0; }
    .ch8-words .ch8-w { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 6px; border: 1px solid rgba(212,169,78,0.3); border-radius: 8px; background: rgba(0,0,0,0.3); min-width: 78px; opacity: 0; animation: fadeUp .5s ease forwards; }
    .ch8-words .ch8-w span { font-family: var(--display); font-size: 11px; letter-spacing: .12em; color: var(--gold-2); }
    .ch8-words .ch8-w small { font-size: 11px; color: var(--ink-dim); }
    .ch8-words .ch8-w.cold { border-style: dashed; border-color: rgba(79,179,191,0.5); }
    .ch8-words .ch8-w.cold span { color: var(--sea); }
    .ch8-sit { font-family: var(--display); font-size: 30px; letter-spacing: .2em; color: var(--gold-2); text-align: center; padding: 18px 0 8px; text-shadow: 0 0 30px rgba(242,210,122,0.4); }
    .ch8-endrow { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
  ` }));

  /* ---------- notes for the next pass, so they are not re-litigated ------------------------------
     cls:'center' is this chapter's LEDGER form -- the two 'Walked into the fire / Stayed on the
     stones' lines and the three closing lines, and nothing else. It is a new use (ch0 spends
     cls:'center' on its cold open, ch1 not at all); it is settled here rather than left to drift.
     The two bold spans on a ledger line mark WHO, not an instruction, and every ENDING branch of
     ch8_start spends exactly two.
     VigilLore.houseRule ('Say what you see. Never show your phone.') is DELIBERATELY absent. It is a
     table protocol for a chapter with a puzzle, and this chapter has none: nothing here is solved,
     nothing is private that the Hearth does not say out loud a scene later. Do not re-add it.
     There is no hint ladder and no `par`, for the same reason.
     HOURS and COUNTS live at chapter scope with their strings under `text:` keys, so
     node tools/prose-count.js charges every word of them to (chapter) and to the 1,600-word
     chapter budget. That is the honest attribution: they are player-visible prose, and hiding them
     under a key the tool does not scan would have bought 150 words of budget for nothing.
     litSet() is GONE. It walked every chapter's flow.nodes and ran each node's when() inside a
     try/catch, which made ch8_night the one place a broken flow spec in ANY chapter surfaced -- as a
     silently missing node rather than an error. That was never a real check, and it coupled the
     epilogue to eight files it cannot edit. The cost is named in the report: nothing now
     cross-checks other chapters' flow specs, and that belongs in tools/check-content.js. */

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
  /* null when the clock never ran, so the sentence that carries it can drop out rather than print
     a dash where a number should be. MIDNIGHT_LEFT is a cross-chapter flag whose only reader is
     this chapter (node tools/flag-map.js --danger); the read stays here for that reason. */
  const midnightLeft = (s) => { const v = s.flags.MIDNIGHT_LEFT; if (v == null) return null; const m = Math.floor(v / 60), sec = v % 60; return `${m}:${String(sec).padStart(2, '0')} to spare`; };
  const WHISPER_TEXT = {
    reader: { TELL: '"A small brave bird." — a bluff', DONTKNOW: '"I don\'t know yet." — the truth' },
    listener: { LOUD: '"Yes. Loud." — a lie', NO: '"No." — the truth' },
    seer: { TELL: 'told Wren about the shadow — the truth', NOTHING: 'said nothing, and looked at the wall' },
    binder: { YES: '"Yes." — a kindness, which is not the same as the truth', DONTKNOW: '"I don\'t know." — the truth' },
  };
  const whisperLine = (s, r) => { const v = s.flags['WHISPER_' + r.id]; return (WHISPER_TEXT[r.id] && WHISPER_TEXT[r.id][v]) || 'never whispered back'; };
  /* Sentences, not clauses joined by a semicolon: ch0 and ch1 have none and R2.1 is absolute. */
  const finaleLine = (s, r) => {
    const w = s.flags['WALK_' + r.id], b = s.flags['BARGAIN_' + r.id]; const out = [];
    if (w === 'WALK') out.push('Would walk into the fire.'); else if (w === 'STAY') out.push('Would stay on the stones.');
    if (b === 'kept') out.push('Took the Envoy\'s word, and kept it.'); else if (b === 'broken') out.push('Took the Envoy\'s word, and then broke it.'); else if (b === 'accepted') out.push('Took the Envoy\'s word, in the dark.'); else if (b === 'refused' || b === false) out.push('Refused the Envoy.');
    return out.length ? out.join(' ') : 'Was never asked. The fire did not need a word.';
  };
  const ENDING_NAMES = ['The Fourfold Walk', 'The Half-Walk', 'The Sealing', 'The Keeper\'s Walk', 'The Envoy\'s Bargain'];
  const lowerName = (n) => n.replace(/^The /, 'the ');

  /* art / mood / fx must be strings on a scene; the endings re-dress the scene on enter */
  const dress = (s, arts, moods, fxs) => { const e = ending(s); try { Game.setArt(arts[e]); } catch (x) {} try { Audio.mood(moods[e]); } catch (x) {} try { FX.set(fxs[e]); } catch (x) {} };

  /* ---- the whole night, one hour at a time -------------------------------------------------------
     Eight rows, one per hour, in the order the map draws two scenes later: dormitory, hall, vault,
     gallery, study, stair, chamber, the Cold. The row is HTML text, not a flowchart, and that is a
     measured decision, not a taste: UI.flowchart writes node labels at 15px inside an SVG whose
     natural width is 1160-1730px, and .flowchart{max-width:100%} scales that into a 606px panel, so
     the 122 labels of the old nine-chart wall rendered at 5.25px-7.84px at 1280x720 (4.14-6.18px at
     1152x648) against a 17px readability floor. The wall carried no words at any size this panel
     allows. The sentence is the text; the thread and the beads are the picture.
     Each row rings its chapter's glyph note as it lands, so by the eighth the room has heard THORN,
     KNOT, VEIL, EMBER, ASH, WELL, CROWN in wall order -- which is what ch8_words names three scenes
     later. KINDLE has no note, and was only a lamp.
     Five of the eight lines are unconditional: where a fork was the hour's whole point (ch1, ch4,
     ch5) the sentence swaps a phrase, and everywhere else STYLE 12.3 applies -- find the line that
     works under both states. No row may name a scene the table has not reached. */
  const stairShort = (s) => {
    const v = +(s.flags.VOLUNTEER || 0);
    if (v >= 1 && v <= 4) return `The ${L.nick(v - 1)} stayed behind to hold it.`;
    if (s.flags.STAIR === 'COLLAPSE') return 'You brought it down behind you.';
    return 'Nobody held it, and you were followed.';
  };
  const HOURS = [
    { ch: 'ch0', word: 'KINDLE', where: 'the dormitory',
      text: 'You lit a lamp the old way, past curfew, on a dare.' },
    { ch: 'ch1', word: 'THORN', where: 'the Great Hall',
      text: (s) => s.flags.VOTE_LOST
        ? 'Nine Masters, and five votes needed. The two you asked were not enough.'
        : 'Nine Masters, and five votes needed. You found the two that carried them.' },
    { ch: 'ch2', word: 'KNOT', where: 'the Ember Vault',
      text: 'You went under the school, and found something older than the school.' },
    { ch: 'ch3', word: 'VEIL', where: 'the Whispering Gallery',
      text: 'Wren asked each of you a question, and each of you answered alone.' },
    { ch: 'ch4', word: 'EMBER', where: 'the study',
      text: (s) => +(s.flags.OATH || 0) === 0
        ? 'A false shelf behind a tapestry, and an oath you would not swear.'
        : 'A false shelf behind a tapestry, and an oath you swore to a fourteen-year-old.' },
    { ch: 'ch5', word: 'ASH', where: 'the Long Stair',
      text: (s) => 'Soldiers behind you, all the way down. ' + stairShort(s) },
    { ch: 'ch6', word: 'WELL', where: 'the bell-chamber',
      text: 'You kept the bells ringing in the dark, and under them the stone said a name.' },
    { ch: 'ch7', word: 'CROWN', where: 'the Cold',
      text: 'At the edge of the Cold you wrote the Great Sigil. Then each of you chose alone.' },
  ];

  /* ---- the counted night ---------------------------------------------------------------------
     Five sentences, not a nine-row table with the last sixteen Store.note lines under it. The old
     scene MEASURED 757px of content in a 538px box once the log was real (219px below the fold at
     1280x720, with twenty notes) and tools/scan-fit.js could not see it, because it launches every
     scene with an empty log. ch7_flow already names the ending and the midnight clock one scene
     earlier, and ch8_night now says who held the stair, so none of the three is repeated here.
     {n} is the one number in each sentence; it is rendered as a <b> so the strings stay free of
     **bold**, which R7.4 reserves for instructions. */
  const COUNTS = [
    { text: (s) => s.flags.CLUES_HELP ? 'Four clues in the bell-chamber, and the fire helped. You caught {n}.' : 'Four clues in the bell-chamber. You caught {n}.', n: (s) => clues(s) },
    { text: 'Four questions in the laundry. Wren got {n} true answers.', n: (s) => truths(s) },
    { text: 'Three bells to keep whole. You cracked {n}.', n: (s) => +(s.flags.BELLS_CRACKED || 0) },
    { text: 'You asked the fire for {n} hints.', n: (s) => +(s.flags.hintsTotal || 0) },
    { text: 'You wrote the last word with {n}.', n: (s) => midnightLeft(s), if: (s) => midnightLeft(s) != null },
    { text: 'The night took you {n}.', n: () => Store.elapsedText() },
  ];

  Game.addChapter({
    id: 'ch8', label: 'Epilogue', title: 'What the Fire Left Behind', start: 'ch8_start', code: 'WREN',
    mood: 'hearth', fx: 'embers', art: 'ch8_dawn', flame: 1,
    /* The flow is a map of CHOICES, not an index of scenes: every branch point and every outcome is
       a node, and the linear display scenes that sit on an edge (ch8_years, ch8_stats, ch8_words'
       companion beat, ch8_flow itself) are not. A chart cannot usefully contain the act of drawing
       itself. Every edge runs left to right, because UI.flowchart draws from a node's right side to
       the next node's left: an edge inside one column, or back a column, renders as an arrow that
       points the wrong way -- which is what the old ch8_together -> ch8_e0 and
       ch8_unsealed -> ch8_map edges did. ch8_together was also a node with no scene whose when()
       was word for word ch8_e0's, so it is gone; on ENDING 2 the road not taken is the greyed
       ch8_e0 sibling in the same column, which is what ch8_e2's closing line now points at.
       ADVERSARIAL #6: of the non-secret labels left -- 'Who walked', 'The whole night',
       'Unseal the dark?', 'Sit with it' -- every one names a scene at or behind the player. */
    flow: {
      nodes: [
        { id: 'ch8_start', label: 'Who walked', col: 0, row: 2 },
        { id: 'ch8_e0', label: 'The Fourfold Walk', col: 1, row: 0, kind: 'end', secret: true, when: (s) => ending(s) === 0 && s.visited.includes('ch8_e0') },
        { id: 'ch8_e1', label: 'The Half-Walk', col: 1, row: 1, kind: 'end', secret: true, when: (s) => ending(s) === 1 && s.visited.includes('ch8_e1') },
        { id: 'ch8_e2', label: 'The Sealing', col: 1, row: 2, kind: 'end', secret: true, when: (s) => ending(s) === 2 && s.visited.includes('ch8_e2') },
        { id: 'ch8_e3', label: 'The Keeper\'s Walk', col: 1, row: 3, kind: 'end', secret: true, when: (s) => ending(s) === 3 && s.visited.includes('ch8_e3') },
        { id: 'ch8_e4', label: 'The Envoy\'s Bargain', col: 1, row: 4, kind: 'end', secret: true, when: (s) => ending(s) === 4 && s.visited.includes('ch8_e4') },
        { id: 'ch8_night', label: 'The whole night', col: 2, row: 2 },
        { id: 'ch8_unseal', label: 'Unseal the dark?', col: 3, row: 2, kind: 'choice' },
        { id: 'ch8_unsealed', label: 'four seals broken', col: 4, row: 1, secret: true },
        /* secret, because ch8_night used to print both of these labels in full two and four scenes
           before their own reveals. They are lit by the time ch8_flow draws this chart. */
        { id: 'ch8_map', label: 'The route: KNOT', col: 5, row: 2, secret: true },
        { id: 'ch8_words', label: 'The eighth glyph', col: 6, row: 2, secret: true },
        { id: 'ch8_code', label: 'WREN, written', col: 7, row: 1, secret: true },
        { id: 'ch8_end', label: 'Sit with it', col: 7, row: 3, kind: 'end' },
      ],
      edges: [['ch8_start', 'ch8_e0'], ['ch8_start', 'ch8_e1'], ['ch8_start', 'ch8_e2'], ['ch8_start', 'ch8_e3'], ['ch8_start', 'ch8_e4'],
        ['ch8_e0', 'ch8_night'], ['ch8_e1', 'ch8_night'], ['ch8_e2', 'ch8_night'], ['ch8_e3', 'ch8_night'], ['ch8_e4', 'ch8_night'],
        ['ch8_night', 'ch8_unseal'], ['ch8_unseal', 'ch8_unsealed'], ['ch8_unseal', 'ch8_map'], ['ch8_unsealed', 'ch8_map'], ['ch8_map', 'ch8_words'], ['ch8_words', 'ch8_code'], ['ch8_words', 'ch8_end'], ['ch8_code', 'ch8_end']],
    },
    scenes: {
      /* ---------- who walked ---------- */
      ch8_start: {
        title: 'What the Fire Left Behind',
        art: 'ch8_stones', mood: 'wonder', fx: 'embers', flame: 1, speed: 20,
        enter: (s) => { dress(s, ['ch8_white', 'ch8_stones', 'ch8_stones', 'ch8_flicker', 'ch8_cage'], ['triumph', 'wonder', 'sorrow', 'sorrow', 'dread'], ['motes', 'embers', 'embers', 'ash', 'ash']); Game.flame([1, 0.65, 1, 0.3, 0.15][ending(s)]); if (Game.clock && Game.clock.running()) Game.clock.stop(); },
        text: (s) => {
          const e = ending(s);
          /* The one table instruction in the chapter, said once (R5.4). ch8_code's roles: line is
             the engine's own, and no longer repeats this. */
          const voice = { text: 'Whoever is nearest has the keyboard. Read the rest aloud, a paragraph each, round the table from the Reader.', cls: 'small' };
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
            kept(s).length ? `${UI.list(kept(s))} had kept the Envoy's word. That key was dead, and three hands wrote what four should have.` : 'Not every hand went in. The glyph was written anyway, thinner than it was meant to be.',
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
            { text: `Stayed on the stones: **Wren, and ${UI.list(L.nicks)}**.`, cls: 'center' },
            { speaker: 'Provost Marrow', text: 'Then I go. I should have gone fourteen years ago.' },
            'Nobody argues. Everybody meant to.',
            voice,
          ];
          return [
            { text: 'Walked into the fire: **nobody**.', cls: 'center' },
            { text: 'Walked out of Thornhallow: **Lord Vane, with Wren**, in a cage it took four soldiers to carry.', cls: 'center' },
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
        next: 'ch8_years', button: 'Years later',
      },
      ch8_years: {
        title: 'Years later', art: 'ch8_years', mood: 'wonder', fx: 'snow', flame: 1, speed: 18,
        text: [
          'Four unremarkable people, in a house that is too small for all of them, every winter. They argue about what the ring looked like, and never settle it.',
          'The Reader keeps a letter in the drawer by the bed. It is one line of glyphs. The Reader cannot read it, and will not have it translated.',
          'They would do it again. They say so, every winter, at the point in the evening when it becomes true.',
          'Wren visits. Grown, and tall, and still coming through doors sideways. There is a pulse in Wren\'s throat that the Listener cannot hear, and does not need to.',
          { speaker: 'Wren', text: 'You\'re all *awake*. Excellent.' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e1: {
        art: 'ch8_stones', mood: 'wonder', fx: 'embers', flame: 0.65, speed: 20,
        text: (s) => [
          'The Cold closes. Not the way the Founders closed it. Narrower. Enough.',
          `**${listOr(walkers(s), 'The walkers')}** come out of the fire grey-eyed and free, blinking at a room they cannot see under any more.`,
          `**${listOr(stayers(s), 'The rest')}** keep their Sightings, and the fire, for life. There is a school above you that needs Masters who can read the wall. Those are the Masters.`,
          'Wren lives. Wren hugs everyone, walkers and stayers alike, and holds on slightly too long. There is no pulse in Wren\'s throat. Only the Listener would ever have known.',
          { speaker: 'Wren', text: 'Half of you can\'t see me properly any more. Good. I looked *terrible*.' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e2: {
        art: 'ch8_stones', artParams: { noWren: true }, mood: 'sorrow', fx: 'embers', flame: 1, speed: 22,
        text: [
          { speaker: 'Wren', text: 'It\'s alright. I knew. I\'ve known since the laundry.' },
          'Wren walks into the Hearth the way Wren walks through doors. It closes behind. Four hundred years of fire, again, from a spark.',
          'In the morning a mason carves a fifth name over the Hearth, beneath the four Founders. He has to ask how to spell it. Nobody in the room can spell it the old way, and the Reader does not offer.',
          'The Provost stands at the fire with a thread nobody can see but the Binder. It is grey. It has been grey for fourteen years.',
          'On the chart of the night, beside the road you took, there are four boxes you did not open.',
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e3: {
        art: 'ch8_flicker', mood: 'sorrow', fx: 'ash', flame: 0.3, speed: 20,
        text: [
          'She does not say goodbye to Wren. She has been saying it for fourteen years, and the Binder has seen the colour of it. She puts her hand on the fire, and it opens like a door.',
          'The seal holds. Thin — the kind of hold that needs watching — but it holds.',
          'Wren lives. No pulse. Wren stands a long time where the Provost stood. Then Wren makes a joke that nobody laughs at, and then one that everybody does.',
          { text: 'Years later.', cls: 'center' },
          'Provost Wren of Thornhallow keeps a fire that flickers. Every winter it dips, and every winter it comes back. The fourth-years are told it is nothing.',
          'Wren, who once called someone Mum by accident, looks at the fire when it flickers. Not at them.',
        ],
        next: 'ch8_night', button: 'The whole night',
      },
      ch8_e4: {
        art: 'ch8_cage', mood: 'dread', fx: 'ash', flame: 0.15, speed: 20,
        text: (s) => [
          'The Envoy is courteous about it. He has always been courteous.',
          'Wren goes into the cage without being pushed. Wren does not say anything to any of you. It is the worst thing Wren has ever done.',
          'By spring the Cold feeds the Crown\'s engines. What leaks from under Thornhallow is harnessed, as promised. The school is a garrison. The Hearth is a furnace with a schedule.',
          'You are Masters, as promised. Masters of ash.',
          broken(s).length ? { text: `On the chart of the night, beside ${UI.list(broken(s))}, it says: *one of you almost did.*`, cls: 'whisper' } : { text: 'On the chart of the night, beside your four names, it says nothing at all.', cls: 'whisper' },
        ],
        next: 'ch8_night', button: 'The whole night',
      },

      /* ---------- the whole night ---------- */
      ch8_night: {
        type: 'custom', art: 'ch8_dawn', mood: 'hearth', fx: 'dust',
        text: ['The night, from the dormitory to the Cold. Eight hours. This is what the fire kept of them.'],
        run: (box, api) => new Promise((resolve) => {
          const s = api.state;
          /* An hour with no visited scene is dimmed, not dropped -- a table that came in from the
             chapter select still lived the story, only not tonight. If NOTHING has been reached (a
             ?scene= jump, which is how tools/scan-fit.js enters) every row lights, so the layout
             check meets the real content instead of an empty panel. */
          const played = (id) => s.visited.some(v => Game.sceneChapter[v] === id);
          const anyPlayed = HOURS.some(h => played(h.ch));
          const wrap = UI.el('div', { class: 'ch8-night' });
          HOURS.forEach((h, i) => {
            const line = typeof h.text === 'function' ? h.text(s) : h.text;
            const p = UI.el('p', {
              class: 'ch8-hour' + (anyPlayed && !played(h.ch) ? ' faint' : ''),
              html: `<b class="ch8-where">${UI.esc(h.where)}</b>${UI.rich(line)}`,
            });
            p.style.animationDelay = (0.25 + i * 0.48) + 's';
            wrap.appendChild(p);
            const note = G.MIDI[h.word];
            if (note != null) setTimeout(() => { if (api.alive()) Audio.note(note, 1.4, 0.11); }, 250 + i * 480);
          });
          box.appendChild(wrap);
          api.button('Four boxes, still sealed', () => resolve('ch8_unseal'), 'primary');
        }),
      },
      ch8_unseal: {
        type: 'choice', art: 'ch8_dawn', mood: 'hearth', fx: 'dust', choice: 'UNSEAL',
        text: ['Twice tonight, each of you chose alone and told nobody. The fire kept all four boxes.'],
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
          /* Two lines a card, not three: who held the stair is now a public sentence on ch8_night,
             and the third line was what pushed this panel over at 1152x648. */
          const open = () => {
            const r = R[n], c = cards[n];
            Audio.sfx('reveal');
            c.classList.add('open');
            c.innerHTML = `<span class="ch8-who">${UI.esc(r.nick)}</span>` +
              `<span class="ch8-line"><em>In the laundry:</em> ${UI.rich(whisperLine(s, r))}</span>` +
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
        text: ['The map of the night, and the gold line of the route you walked: dormitory, hall, vault, gallery, study, stair, chamber, the Cold, dawn.', { text: 'Seen whole —', cls: 'whisper' }],
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'ch8-map' });
          try { wrap.appendChild(UI.el('div', { html: window.VigilMap.render() })); } catch (e) { console.error(e); }
          const knot = UI.el('div', { class: 'ch8-knot' });
          const glyph = G.inner('KNOT').replace(/<path /g, '<path class="trace" ').replace('class="trace" d="M-5,15', 'class="trace second" d="M-5,15');
          knot.appendChild(UI.el('div', { class: 'ch8-route', html: `<svg viewBox="-26 -22 52 44"><g style="color:var(--gold-2)">${glyph}</g><g class="ch8-pts"></g></svg>` }));
          knot.appendChild(UI.el('div', { class: 'ch8-caption', text: '— it is the glyph KNOT. Bound together, four as one.' }));
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
              const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'ch8-waypoint'); g.style.animationDelay = (0.2 + i * 0.22) + 's';
              g.innerHTML = `<circle cx="${pt.x.toFixed(2)}" cy="${pt.y.toFixed(2)}" r="1.1" fill="#f2d27a" stroke="#0b0a10" stroke-width=".4"/><text x="${(pt.x + dx).toFixed(2)}" y="${(pt.y + dy).toFixed(2)}" font-size="2.4" fill="#e9e2d2" font-family="Cormorant Garamond,serif" text-anchor="${anchor}">${UI.esc(lab)}</text>`;
              pts.appendChild(g);
            });
          } catch (e) { console.error(e); }
          Audio.sfx('reveal');
          api.button('The numbers', () => resolve('ch8_stats'), 'primary');
        }),
      },

      /* ---------- the numbers ---------- */
      ch8_stats: {
        type: 'custom', art: 'ch8_dawn', mood: 'hearth', fx: 'dust',
        text: (s) => ['The fire keeps count. It always has.', { text: `Wren called you **${s.flags.GROUP_NAME || 'the Four'}**. Wren was right.`, cls: 'small' }],
        run: (box, api) => new Promise((resolve) => {
          const s = api.state;
          const wrap = UI.el('div', { class: 'ch8-counts' });
          COUNTS.filter(c => !c.if || c.if(s)).forEach((c, i) => {
            const line = typeof c.text === 'function' ? c.text(s) : c.text;
            const p = UI.el('p', { class: 'ch8-count', html: UI.rich(line).replace('{n}', `<b>${UI.esc(String(c.n(s)))}</b>`) });
            p.style.animationDelay = (0.2 + i * 0.35) + 's';
            wrap.appendChild(p);
          });
          box.appendChild(wrap);
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
          ending(s) === 0 ? 'The last word. In the dormitory it was a dare. Write it.' : 'The last word, for the phones. In the dormitory it was a dare, and the fire never got to see it written properly. Write it now, and look at your own page — nobody else\'s.',
        ],
        roles: 'Warden (keyboard): **whoever is nearest**. Voice (reads aloud): **all four of you**.', sightSeconds: 90,
        codeSub: 'Each phone shows its last page. Read yours. Say nothing.',
        enter: () => { Store.set('WREN_SHOWN', true); },
        next: 'ch8_flow', button: 'Every phone has gone dark',
      },
      ch8_flow: {
        type: 'flow', art: 'ch8_dawn', mood: 'hearth', fx: 'embers',
        text: ['The last chart. Small, because the night was long and this is the end of it.'],
        flowTitle: 'Epilogue — the paths you walked',
        /* Two plain sentences and no numbers (R5.3). ch8_stats counted the night one scene ago and
           ch7_flow named the ending one chapter ago; this line only has to say what the greyed
           boxes are, and must not name any of them. */
        stats: (s) => `The night ended in ${lowerName(ENDING_NAMES[ending(s)])}. Greyed beside it are the four nights it could have been.`,
        next: 'ch8_end', button: 'Sit with it',
      },
      ch8_end: {
        type: 'end', art: 'ch8_stones', mood: 'silence', fx: 'embers', speed: 30,
        enter: (s) => dress(s, ['ch8_years', 'ch8_stones', 'ch8_stones', 'ch8_flicker', 'ch8_cage'], ['silence', 'silence', 'silence', 'silence', 'void'], ['snow', 'embers', 'embers', 'ash', 'ash']),
        text: (s) => [
          { text: 'Sit with it.', cls: 'big' },
          ending(s) === 0 ? { text: 'Four friends, a small house, a fire that is only a fire.', cls: 'center' } : ending(s) === 2 ? { text: 'There was a night where nobody had to. The fire will show you the way back to CROWN, if you want it.', cls: 'center' } : { text: 'The fire will show you the way back to any hour of the night, if you want it.', cls: 'center' },
          { text: 'Thank you for playing What the Fire Keeps.', cls: 'small center' },
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
