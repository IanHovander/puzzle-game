/* Finale — One Born of Four (CROWN) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, S = window.VigilShared, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const ROLES = L.roles.map(r => r.id);

  const ch7css = Object.assign(document.createElement('style'), { textContent: `
    body[data-chapter="ch7"] .ring-pz .wheel { width: min(40vh, 360px); height: min(40vh, 360px); }
    @media (max-height: 820px) { body[data-chapter="ch7"] .ring-pz .wheel { width: min(32vh, 290px); height: min(32vh, 290px); } }
    /* Narrower than a full laptop, the palette wraps under the wheel: shrink both so the commit button
       stays above the fold. */
    @media (max-width: 1260px) {
      body[data-chapter="ch7"] .ring-pz .wheel { width: min(26vh, 190px); height: min(26vh, 190px); }
      body[data-chapter="ch7"] .glyph.name-only { width: 74px; height: 38px; }
      body[data-chapter="ch7"] .glyph.name-only .gname { font-size: 12px; }
    }
    body[data-chapter="ch7"] .pz-note { font-family: var(--serif); font-size: 15px; line-height: 1.45; letter-spacing: 0; text-transform: none; white-space: normal; color: var(--ink); }
    .bind-lane.ch7-muted .bind-orb { visibility: hidden; }
    body[data-chapter="ch7"] .bind-lane.ch7-muted.on { background: none; }
    .bind-lane.ch7-muted::before { content: 'cracked — on the count'; position: absolute; left: 0; right: 0; bottom: 44px; text-align: center; font-family: var(--display); font-size: 10px; letter-spacing: .1em; color: var(--sea); }
    .ch7-count { display: grid; grid-template-columns: 1fr; gap: 6px; }
    .ch7-count .cd-big { font-family: var(--display); font-size: 40px; color: var(--ember); text-align: center; letter-spacing: .12em; }
    /* .fourhands animates in with a translateY, which makes the panel briefly taller than it ends up.
       The Finale shows the box for the whole scene, so it appears at its final height. */
    body[data-chapter="ch7"] .fourhands { margin-top: 0; padding: 6px 8px; animation: none; }
    body[data-chapter="ch7"] .pads { margin-top: 4px; gap: 8px; }
    body[data-chapter="ch7"] .pad { padding: 2px 6px; gap: 0; }
    body[data-chapter="ch7"] .pad .pad-key { font-size: 20px; }
    body[data-chapter="ch7"] .pad .pad-name { font-size: 10px; }
    body[data-chapter="ch7"] .fourhands .pz-title { margin-bottom: 2px; }
    /* ring.js puts a "Close it without the ritual" button inside the four-hands box: one player can click
       past the beat the whole chapter is about. The Finale hides it. Four keys on one keyboard, or four
       pads under one mouse, still work, so nobody is blocked. */
    body[data-chapter="ch7"] .fourhands > .btn.small.ghost { display: none; }
    .ch7-vow { font-family: var(--hand); font-size: 14px; line-height: 1.2; color: var(--ink); text-align: center; padding: 0; margin: 0; }
  ` });
  if (document.head && document.head.appendChild) document.head.appendChild(ch7css);

  /* ---------- helpers ---------- */
  const castFlags = (s) => s.flags.CAST_FLAGS_CROWN || { WALK_UNLOCKED: !!s.flags.WALK_UNLOCKED, VANE_ALLY: !!s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED | 0, OATH_KNOT: !!(s.flags.OATH_KNOT || s.flags.OATH === 1) };
  const finaleValues = (s) => L.finaleValues(castFlags(s));
  const oathKnot = (s) => !!(s.flags.OATH_KNOT || s.flags.OATH === 1);
  const walkOn = (s) => !!castFlags(s).WALK_UNLOCKED;
  const walkers = (s) => ROLES.filter(r => s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'); // a kept bargain is a dead key: a stayer
  const stayers = (s) => ROLES.filter(r => !(s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'));
  const nickOf = (roleId) => L.roleById(roleId).nick;
  const kept = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'kept');
  const accepted = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'accepted');
  const broken = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'broken');
  const group = (s) => s.flags.GROUP_NAME || 'the Four';
  const artP = (s) => ({ ally: !!castFlags(s).VANE_ALLY });
  /* One line carries five choices made in earlier chapters. They pay off here as story, not as puzzle
     difficulty: the soldiers' shields the Hearth and the phones used to disagree about are gone. */
  const arrival = (s) => s.flags.ORIEL ? 'Master Oriel came down behind you and says nothing, loudly.'
    : (s.flags.SOLDIERS || s.flags.STAIR === 'RUN') ? 'His soldiers hold the stair you came down.'
    : (!s.flags.SORREL && !s.flags.VOTE_LOST) ? 'Two Masters whose price you would not pay watch from the edge.'
    : 'The stair behind you is empty. Nobody followed you down.';

  /* ---------- the Great Sigil ----------
     Two walls, four carvings each. A wall reads two ways: from one end, or from the other, where the line
     reverses and every word turns into its opposite. Together the two walls are one phrase of eight words.
     Four facts, one to a phone, and no phone holds another's:
       WEST / EAST      what each wall says, read from either end             Reader
       OPENING_CLIMB    the phrase's second word is one rung above the first  Listener
       SCRATCH / NOTCH  the two cuts in the rim of the floor                  Seer
       (the Laws)       a sigil begins in the scratch and runs sunwise,       Binder
                        and names every word once
     Enumerated against the live js/content/glyphs.js (the script is in the commit message):
       8 phrases (2 wall orders x 2 readings x 2 readings) x 8 start sockets x 2 directions = 128 rings.
       ALL FOUR PAGES  -> exactly 1 ring, with the oath and without it.
       drop the Reader   -> no glyph can be named at all: the palette is name-only, and the shape-to-word
                            lexicon lives only in the Reader's Book.
       drop the Listener -> 4 rings (2 under the oath).
       drop the Seer     -> 8 rings (8 under the oath).
       drop the Binder   -> 8 rings (2 under the oath).
       No pair of pages does better than 8. allowRepeat is load-bearing: without it ring.js refuses a
       duplicate glyph for free and the Binder's Law 8 costs the table nothing. */
  const WEST = [{ shape: 'Spike', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Hook', inv: true }, { shape: 'Crown', inv: true }];  // Reader
  const EAST = [{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }]; // Reader
  const OPENING_CLIMB = 1;                                  // Listener
  const SCRATCH = 1, NOTCH = 6;                             // Seer
  const SWORN = 'CROWN';                                    // Binder: the word of the one the oath was sworn to
  /* sockets 1..8; null is the socket the cold word falls in, which stays empty, or takes COLD by four hands */
  const BASE   = ['THORN', 'KNOT', 'VEIL', 'EMBER', 'ASH', 'WELL', 'CROWN', null];
  const ROT    = ['CROWN', null, 'THORN', 'KNOT', 'VEIL', 'EMBER', 'ASH', 'WELL'];
  /* the rings a table reaches by getting exactly one fact wrong */
  const RIVAL  = ['CROWN', 'KNOT', 'VEIL', 'WELL', 'ASH', 'EMBER', 'THORN', null];     // a wall read from the wrong end
  const BEGUN  = ['EMBER', 'ASH', 'WELL', 'CROWN', null, 'THORN', 'KNOT', 'VEIL'];     // begun at the notch, unsworn
  const WIDDER = ['THORN', null, 'CROWN', 'WELL', 'ASH', 'EMBER', 'VEIL', 'KNOT'];     // counted the wrong way, unsworn
  const WIDDER_ROT = ['CROWN', 'WELL', 'ASH', 'EMBER', 'VEIL', 'KNOT', 'THORN', null]; // counted the wrong way, sworn
  const SWAP   = ['ASH', 'WELL', 'CROWN', null, 'THORN', 'KNOT', 'VEIL', 'EMBER'];     // the two walls the wrong way round
  const ringOf = (map) => [1, 2, 3, 4, 5, 6, 7, 8].map(i => map[i] || null);
  const shape = (ring) => ring.map(x => x === 'COLD' ? null : x); // an empty socket and the cold word read alike
  const same = (a, b) => a.every((x, i) => x === b[i]);

  const nextBargain = (s, after) => { const idx = ROLES.findIndex((r, i) => i > after && s.flags['BARGAIN_' + r] === 'accepted'); return idx < 0 ? 'ch7_bargains_done' : 'ch7_bargain_' + ROLES[idx]; };
  /* Midnight is a beat and a hint unlock, never a guillotine: it stops for good, opens the whole ladder,
     and undoes nothing. ensureClock will not start it again once it has run out. */
  const onZero = () => {
    const s = Store.state;
    Store.inc('COLD_HEARTH_ATTEMPTS');
    ['ch7_sigil', 'ch7_binding'].forEach(id => { if ((s.hintsUsed[id] | 0) < 3) s.hintsUsed[id] = 3; });
    s.flags.MIDNIGHT_LEFT = 0; Store.save();
    const bell = document.getElementById('hint'); if (bell) bell.classList.add('attention');
    Store.note('Midnight came before the Binding. You finished in the dark.');
    window.Game.go('ch7_cold');
  };
  const ensureClock = (s) => {
    const C = window.Game.clock;
    if (C.running() || s.flags.BINDING_LANDED || (s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0) return;
    if (s.flags.MIDNIGHT_LEFT > 0 && s.flags.MIDNIGHT_STARTED) C.resume(onZero);
    else { s.flags.MIDNIGHT_STARTED = true; C.start(900, onZero); }
  };
  const computeEnding = (s) => {
    if (s.flags.DECISION === 'VANE' || kept(s).length >= 2) return 4;
    if (s.flags.DECISION === 'WALK') return 2;
    if (s.flags.DECISION === 'REFUSE') return 3;
    const w = walkers(s).length;
    if (w >= 4 && kept(s).length === 0 && s.flags.BINDING_LANDED) return 0;
    if (w >= 2) return 1;
    return 3;
  };
  const playHymn = () => { const names = ['THORN', 'KNOT', 'VEIL', 'EMBER', 'ASH', 'WELL', 'CROWN']; names.forEach((n, i) => setTimeout(() => Audio.note(G.MIDI[n], 1.1, 0.16), i * 420)); };
  const clockText = (sec) => Math.floor((sec | 0) / 60) + ':' + String((sec | 0) % 60).padStart(2, '0');

  Game.addChapter({
    id: 'ch7', label: 'Finale', title: 'One Born of Four', start: 'ch7_start', code: 'CROWN',
    mood: 'dread', fx: 'ash', art: 'ch7_edge', artParams: artP, flame: 0.06,
    flow: {
      nodes: [
        { id: 'ch7_start', label: 'The chamber', col: 0, row: 2 },
        { id: 'ch7_wall', label: 'The wall shown', col: 1, row: 0, kind: 'choice', secret: true, when: (s) => !!s.flags.VANE_STOOD_DOWN },
        { id: 'ch7_decision', label: 'The Decision', col: 2, row: 2, kind: 'choice' },
        { id: 'ch7_argue1', label: 'The Provost bars it', col: 2, row: 4, kind: 'choice', secret: true },
        { id: 'ch7_dec_vane', label: 'Wren given up', col: 3, row: 0, kind: 'end', secret: true },
        { id: 'ch7_tokens', label: 'Four sealed words', col: 3, row: 2 },
        { id: 'ch7_p0', label: 'Reader', col: 4, row: 0, kind: 'end', secret: true },
        { id: 'ch7_p1', label: 'Listener', col: 4, row: 1, kind: 'end', secret: true },
        { id: 'ch7_p2', label: 'Seer', col: 4, row: 3, kind: 'end', secret: true },
        { id: 'ch7_p3', label: 'Binder', col: 4, row: 4, kind: 'end', secret: true },
        { id: 'ch7_bargains_done', label: 'The bargains', col: 4, row: 2, kind: 'choice', secret: true, when: (s) => accepted(s).length + kept(s).length + broken(s).length > 0 },
        { id: 'ch7_sigil', label: 'The Great Sigil', col: 5, row: 2 },
        { id: 'ch7_cold', label: 'Midnight passed', col: 5, row: 4, secret: true, when: (s) => (s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0 },
        { id: 'ch7_binding', label: 'The Binding', col: 6, row: 2 },
        { id: 'ch7_wren_code', label: 'COLD, written', col: 7, row: 1, secret: true },
        { id: 'ch7_e0', label: 'The Fourfold Walk', col: 8, row: 0, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 0 },
        { id: 'ch7_e1', label: 'The Half-Walk', col: 8, row: 1, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 1 },
        { id: 'ch7_e2', label: 'The Sealing', col: 8, row: 2, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 2 },
        { id: 'ch7_e3', label: 'The Keeper\'s Walk', col: 8, row: 3, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 3 },
        { id: 'ch7_e4', label: 'The Envoy\'s Bargain', col: 8, row: 4, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 4 },
      ],
      edges: [
        ['ch7_start', 'ch7_wall'], ['ch7_wall', 'ch7_decision'], ['ch7_start', 'ch7_decision'],
        ['ch7_decision', 'ch7_argue1'], ['ch7_argue1', 'ch7_tokens'],
        ['ch7_decision', 'ch7_dec_vane'], ['ch7_dec_vane', 'ch7_e4'], ['ch7_decision', 'ch7_tokens'],
        ['ch7_tokens', 'ch7_p0'], ['ch7_tokens', 'ch7_p1'], ['ch7_tokens', 'ch7_p2'], ['ch7_tokens', 'ch7_p3'], ['ch7_tokens', 'ch7_bargains_done'], ['ch7_bargains_done', 'ch7_sigil'], ['ch7_bargains_done', 'ch7_e4'],
        ['ch7_sigil', 'ch7_binding'], ['ch7_sigil', 'ch7_cold'], ['ch7_cold', 'ch7_sigil'],
        ['ch7_binding', 'ch7_wren_code'], ['ch7_wren_code', 'ch7_e0'], ['ch7_binding', 'ch7_e1'], ['ch7_binding', 'ch7_e2'], ['ch7_binding', 'ch7_e3'],
      ],
    },
    scenes: {
      /* ---------- the chamber's edge ---------- */
      ch7_start: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, sfx: 'step',
        title: 'The bell-chamber',
        text: (s) => [
          'Far above, the Hearth is a spark. The floor is a lid, and under it the Cold glows.',
          'On the wall, four carved figures walk into a flame. Nobody is looking at them.',
          'Boots on the old road. Lord Vane stops at the edge. Behind him, Master Tarn\'s guards: Tarn took Crown coin at the Vigil.',
          arrival(s),
        ],
        next: 'ch7_vane', button: 'The Envoy speaks',
      },
      /* The Envoy's offer, and the one chance to disarm him. Settled BEFORE ch7_attune freezes
         CAST_FLAGS_CROWN, so the phones never ask about a bargain that no longer exists. */
      ch7_vane: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, choice: 'FINALE_WALL',
        text: (s) => [
          { speaker: 'Lord Vane', text: s.flags.VANE_ACCEPT
            ? 'You gave me your word in the Hall. Bring the boy up the road and he lives.'
            : 'One child, and a fire that will be out within the hour. Bring him up the road.' },
          { speaker: 'Wren', text: `Don't look at him. Look at me. ${group(s)} — this is the *in there* I meant.` },
        ],
        prompt: 'The Envoy waits.',
        options: [
          { id: 'wall', text: 'Show him what is under the paint.', next: 'ch7_wall' },
          { id: 'nothing', text: 'Say nothing. Read the floor.', next: 'ch7_attune' },
        ],
      },
      ch7_wall: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06, sfx: 'reveal',
        enter: (s) => { s.flags.VANE_ALLY = true; s.flags.VANE_STOOD_DOWN = true; Store.save(); },
        text: (s) => [
          s.flags.TAPESTRY
            ? 'The Seer says what is under the paint in the study, and the Hearth turns it round.'
            : 'The Seer takes four hundred years of soot off the wall.',
          'Four figures walking in. No child. The fourth writes a fire upside down.',
          { speaker: 'Lord Vane', text: 'Twenty-two years. I stood in your Hall with that paint under my nails and told them. They sent me away to learn manners.' },
          { speaker: 'Lord Vane', text: 'My offer is withdrawn. I will not be the thing you have to be brave about.' },
        ],
        next: 'ch7_attune', button: 'The word on the rim',
      },
      ch7_attune: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06,
        enter: (s) => {
          s.flags.WALK_UNLOCKED = !!s.flags.WALK_UNLOCKED; s.flags.VANE_ALLY = !!s.flags.VANE_ALLY;
          s.flags.BELLS_CRACKED = Math.max(0, Math.min(3, s.flags.BELLS_CRACKED | 0)); s.flags.OATH_KNOT = oathKnot(s);
          s.flags.CAST_FLAGS_CROWN = { WALK_UNLOCKED: s.flags.WALK_UNLOCKED, VANE_ALLY: s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED, OATH_KNOT: s.flags.OATH_KNOT };
          Store.save();
        },
        text: [
          'A word is cut into the rim of the floor, worn almost away.',
          { text: 'Open the Companion. Take your seat. Type the word on the rim.', cls: 'whisper' },
          { text: 'Read your page. Say nothing.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Seer**. Voice (reads aloud): **the Binder**.', sightSeconds: 90,
        next: 'ch7_decision',
      },

      /* ---------- Stage 1: the Decision ---------- */
      ch7_decision: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_DECISION',
        text: (s) => {
          const out = [{ speaker: 'Provost Marrow', text: 'The ring has been ready for fourteen years. Decide.' }];
          out.push(s.flags.WALK_UNLOCKED
            ? { text: 'Four figures on the wall. Four hands on the stone.', cls: 'whisper' }
            : { text: 'One walks in, and the Cold closes behind. That is the reading you have.', cls: 'whisper' });
          return out;
        },
        prompt: 'No clock on this. Talk.',
        options: [
          { id: 'fourfold', text: 'Four of us go in together.', cls: 'bright', if: (s) => !!s.flags.WALK_UNLOCKED, next: (s) => oathKnot(s) ? 'ch7_argue1' : 'ch7_dec_fourfold', set: { DECISION: 'FOURFOLD' }, note: 'You chose the Fourfold Walk.' },
          { id: 'walk', text: 'Let Wren walk.', next: 'ch7_dec_walk', set: { DECISION: 'WALK' }, note: 'You let Wren walk.' },
          { id: 'refuse', text: 'Nobody walks.', next: 'ch7_dec_refuse', set: { DECISION: 'REFUSE' }, note: 'You refused to send anyone.' },
          { id: 'vane', text: 'Give Wren to the Envoy.', cls: 'dark', if: (s) => !s.flags.VANE_ALLY, next: 'ch7_dec_vane', set: { DECISION: 'VANE' }, note: 'You gave Wren to the Envoy.' },
        ],
      },
      /* The Provost bars the Walk when the oath was sworn under KNOT. She asks for one thing, so she gets
         one round: three options ever visible, every one yields, every one restates its own fact. */
      ch7_argue1: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_ARGUE1',
        text: [
          'Provost Marrow steps between you, doing what you asked.',
          { speaker: 'Provost Marrow', text: 'You swore under KNOT, and it cannot be unbound. You swore to see Wren into the Cold.' },
        ],
        prompt: 'Name one thing you saw.',
        options: [
          { id: 'stone', text: 'The stone has a mark at its foot. Read from there it says four.', next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'The foot of the stone. One Seer low enough to look.' }] },
          { id: 'tapestry', text: 'Under the paint in your study: four walking in, no child.', if: (s) => !!s.flags.TAPESTRY, next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'I scraped it myself, as a girl.' }] },
          { id: 'letter', text: 'A struck Law says the cold word is written by four hands.', if: (s) => !s.flags.TAPESTRY || !!(s.flags.LETTER_READ || s.flags.LETTER), next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'They could not afford four Masters, so they made it grammar.' }] },
          { id: 'feel', text: 'Because it is Wren, and we are not doing it.', cls: 'dark', next: 'ch7_dec_fourfold',
            after: [{ speaker: 'Provost Marrow', text: 'That is not a reading. She steps aside anyway.' }] },
        ],
      },
      ch7_dec_walk: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: (s) => [
          { speaker: 'Wren', text: 'Right. Good. That is what the stone says, and I have had years to get used to it.' },
          { speaker: 'Wren', text: `Don't do faces. ${group(s)} don't do faces. I'll stand in the bit that isn't written.` },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_refuse: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: [
          { speaker: 'Provost Marrow', text: 'Nobody. Then the fire goes out and the Envoy gets what he came for.' },
          { speaker: 'Provost Marrow', text: 'Build the sigil anyway. Hold the Cold while I think.' },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_fourfold: {
        art: 'ch7_edge', artParams: artP, mood: 'wonder', fx: 'ash', flame: 0.06, sfx: 'chime',
        text: (s) => {
          const out = [];
          if (oathKnot(s)) out.push({ speaker: 'Provost Marrow', text: 'The oath was sworn to me, and it stands. The ring will have to be turned. Ask your Binder.' });
          out.push('You say it the way the Founders wrote it. Four, as one, go through.');
          out.push({ speaker: 'Wren', text: `The *deal* was that I go in. Fine. Fine! ${group(s)}. Four idiots and a hollow.` });
          return out;
        },
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_sigil', button: 'Seal your word',
      },
      ch7_dec_vane: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.03, sfx: 'boom',
        enter: (s) => { s.flags.ENDING = 4; Store.save(); },
        text: [
          'The Envoy does not gloat. He holds his hand out as if helping someone over a stream.',
          { speaker: 'Wren', text: 'Oh. No, it is fine. He promised. People keep saying he keeps promises.' },
          'Wren goes without looking back. The spark goes out.',
        ],
        next: 'ch7_ending', button: 'What the Crown does',
      },

      /* ---------- private tokens ---------- */
      ch7_tokens_intro: {
        type: 'custom', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: (s) => {
          const v = finaleValues(s);
          const out = [{ text: 'Every phone, now. Open SPEAK. Nobody here sees the question or the answer.', cls: 'whisper' }];
          if (v && v.length === 4) out.push({ text: 'Two questions, one sealed word.', cls: 'whisper' });
          else if (v && v[0] === 'WALK') out.push({ text: 'One question. Whether you walk.', cls: 'whisper' });
          else out.push({ text: 'One question, from the Envoy, to you alone.', cls: 'whisper' });
          return out;
        },
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch7-count' });
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'TWO MINUTES' }));
          const big = UI.el('div', { class: 'cd-big', text: '2:00' }); wrap.appendChild(big);
          box.appendChild(wrap);
          const ctl = UI.countdown(wrap, 120, (sec) => { big.textContent = clockText(sec); big.classList.toggle('urgent', sec <= 15); });
          let done = false;
          const finish = () => { if (done || !api.alive()) return; done = true; ctl.cancel(); resolve('ch7_tokens'); };
          ctl.promise.then((r) => { if (r === 'timeout') { Audio.sfx('chime'); UI.toast('Time. The fire asks now.', 2400); finish(); } });
          api.button('Every phone is sealed', finish, 'primary');
        }),
      },
      ch7_tokens: {
        type: 'token', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: ['Four sealed words, in seat order. The Hearth answers only "received".'],
        prompt: 'Read your word into the slot with your name.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i, s) => { const v = finaleValues(s); return v ? S.decode(L.channel('finale', ROLES[i]), tok, v) : null; },
        badText: 'The fire does not know that word. Read it again.',
        stuckText: 'Four letters, from your own SPEAK page.',
        onTokens: (values, s) => {
          values.forEach((v, i) => {
            const r = ROLES[i]; const parts = String(v).split('_');
            const walk = parts.find(p => p === 'WALK' || p === 'STAY'), barg = parts.find(p => p === 'ACCEPT' || p === 'REFUSE');
            if (walk) s.flags['WALK_' + r] = walk;
            if (barg) s.flags['BARGAIN_' + r] = (s.flags.VANE_ALLY || barg === 'REFUSE') ? 'refused' : 'accepted';
          });
          Store.save();
        },
        next: (s) => nextBargain(s, -1),
      },

      /* ---------- Stage 2: bargains in the room ----------
         Silence is a refusal. It used to be a kept bargain, so fifteen seconds of hesitation bound a
         player's key to the Envoy, and two such silences ended the night with neither puzzle played. */
      ...Object.fromEntries(ROLES.map((r, i) => ['ch7_bargain_' + r, {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, choice: 'FINALE_BARGAIN_' + r, timer: 15, timerText: '*Fifteen heartbeats. Silence is a refusal.*', timeout: 'break', sfx: 'heart',
        text: [
          `The fire says one name out loud: ${nickOf(r)}.`,
          { speaker: 'Lord Vane', text: 'I keep my promises. Do you keep yours?' },
        ],
        prompt: `${nickOf(r)} — in front of everyone.`,
        options: [
          { id: 'break', text: 'Break it.', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'broken' }, note: `${nickOf(r)} almost took the Envoy's word.`,
            after: [{ speaker: 'Wren', text: `${nickOf(r)}. It's alright. I'd have taken it too.` }] },
          { id: 'keep', text: 'Keep it.', cls: 'dark', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'kept' }, note: `${nickOf(r)} kept the Envoy's bargain.`,
            after: [{ speaker: 'Lord Vane', text: 'Thank you.' }] },
        ],
      }])),
      ch7_bargains_done: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        enter: (s) => { if (kept(s).length >= 2) { s.flags.ENDING = 4; Store.save(); } },
        text: (s) => {
          const k = kept(s), b = broken(s), v = s.flags.VOLUNTEER | 0;
          if (k.length >= 2) return [
            `Two keys bound to the Envoy: ${UI.list(k.map(nickOf))}. A majority of hands.`,
            'He does not have to take anybody. The rest follow, and the spark goes out.',
          ];
          const out = [];
          if (k.length === 1) out.push(`${nickOf(k[0])}'s key goes dark. Three hands must bind what four should.`);
          if (b.length) out.push(`${UI.list(b.map(nickOf))} broke the Envoy's word to his face.`);
          if (!k.length && !b.length) out.push('Nobody was bound. The room lets out a breath.');
          if (v >= 1 && v <= 4) out.push(`${nick(v - 1)} flexes the bell-rope hand.`);
          out.push('Now the ring.');
          return out;
        },
        next: (s) => kept(s).length >= 2 ? 'ch7_ending' : 'ch7_sigil', button: 'What comes of it',
      },

      /* ---------- the Great Sigil ---------- */
      ch7_sigil: {
        type: 'puzzle', puzzle: 'ring', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, puzzleId: 'ch7_sigil', par: [4, 7, 10],
        enter: (s) => ensureClock(s),
        text: [
          { text: 'Eight sockets, one phrase. Say your one thing first.', cls: 'whisper' },
          { text: 'Reader — what each wall says, both ways.', cls: 'whisper' },
          { text: 'Listener — how the phrase opens.', cls: 'whisper' },
          { text: 'Seer — where the floor is cut.', cls: 'whisper' },
          { text: 'Binder — what a cut obliges.', cls: 'whisper' },
          { text: 'A wrong ring costs no time.', cls: 'whisper' },
        ],
        config: (s) => {
          const knot = oathKnot(s), walk = walkOn(s);
          const ans = knot ? ROT : BASE;
          return {
            title: 'THE GREAT SIGIL',
            note: 'Provost Marrow reads it off the rim: *Eight sockets. Two walls, four words each, one phrase. It begins at a cut in the floor. Not every socket takes a word.*'
              + (knot ? ' *A sworn ring is built, then turned whole, until the sworn word stands where the phrase began.*' : ''),
            slots: 8, glyphs: glyphPalette(), allowEmpty: true,
            allowRepeat: true,   /* load-bearing: without it the palette enforces Law 8 and the Binder is droppable */
            showArrow: false,    /* the hub arrow says SUNWISE, and sunwise is the Binder's Law, not the Hearth's */
            resetOnWrong: false,
            fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat',
            check: (map) => {
              const g = ringOf(map), sh = shape(g);
              const named = g.filter(Boolean), filled = named.length;
              if (same(sh, ans)) {
                if (g.includes('COLD') && !walk) return 'The cold word is never written. Where the phrase shows it, that socket stays empty. Ask the Binder.';
                return true;
              }
              if (knot && same(sh, BASE)) return 'Right by the Laws, and still it will not close. You swore to somebody. Turn the whole ring until the sworn word stands where the phrase began.';
              if (!knot && same(sh, ROT)) return 'Nothing was sworn tonight. The ring does not turn. Build it from the cut and leave it there.';
              if (named.length !== new Set(named).size) return 'Two sockets say the same word. A Great Sigil names every word once — that is the Law on the rim.';
              if (same(sh, RIVAL)) return 'Eight words, each once, and the floor stays cold. One wall is being read from the wrong end. The phrase opens with the smallest climb there is.';
              if (same(sh, SWAP)) return 'The right eight words, and the two walls the wrong way round. The phrase opens with the smallest climb there is.';
              if (same(sh, knot ? WIDDER_ROT : WIDDER)) return 'Counted the wrong way round. A sigil runs sunwise from its cut — clockwise, the way the numbers count up.';
              if (!knot && same(sh, BEGUN)) return 'The phrase began at the wrong cut. A notch is only a maker\'s signature. Ask the Binder which cut starts a sigil.';
              if (filled < 7) return `Only ${filled} sockets spoken for. Seven words and one silence — the ring will not close half-said.`;
              return false;
            },
            wrongText: 'Frost creeps over the ring. It keeps what you put in it.',
            onWrong: (m, tries) => tries >= 2 ? 'Frost over the ring. Wren, from the edge: "Has everybody actually said their one thing?"' : null,
            successText: 'The ring warms. Every word, once.',
          };
        },
        hints: [
          'Four answers, and nobody has two. What the walls say — the Reader. How the phrase opens — the Listener. Where the floor is cut — the Seer. What a cut obliges — the Binder.',
          (s) => 'Two walls, two ways each: four phrases. Only two say eight different words, and only one opens with the smallest climb.'
            + (oathKnot(s) ? ' A sworn ring is turned after it is built.' : ''),
          (s) => (oathKnot(s)
            ? 'CROWN 1, empty 2, THORN 3, KNOT 4, VEIL 5, EMBER 6, ASH 7, WELL 8.'
            : 'THORN 1, KNOT 2, VEIL 3, EMBER 4, ASH 5, WELL 6, CROWN 7, empty 8.')
            + (walkOn(s) ? ' COLD may go there, by four hands.' : '') + ' Then four hands.',
        ],
        onSolve: (s, r) => { playHymn(); Store.note('The Great Sigil closed' + (r && r.tries > 1 ? ` after ${r.tries} tries.` : ' first time.')); },
        solvedText: [
          'The ring warms, socket by socket, and the Hymn plays itself through the floor.',
          'Then a rest, where nothing is written.',
          { speaker: 'Provost Marrow', text: 'Hands on your keys.' },
        ],
        next: 'ch7_binding', button: 'The Binding',
      },
      /* The Binding is a reflex round, not a partitioned puzzle: it gets a rule card and a practice pass
         instead of a hint ladder (the old ladder gave the answer at rung 1 and spoiled the stakes at rung 3). */
      ch7_binding: {
        type: 'puzzle', puzzle: 'binding', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.1, puzzleId: 'ch7_binding',
        enter: (s) => ensureClock(s),
        text: (s) => {
          const k = kept(s), cracked = s.flags.BELLS_CRACKED | 0;
          const out = ['Hands on your keys. No phones now.'];
          if (k.length) out.push(`${nickOf(k[0])}'s key is bound to the Envoy. Three notes, a longer climb.`);
          if (cracked) out.push(`${cracked} lane${cracked > 1 ? 's have' : ' has'} no light. Go on the count.`);
          out.push({ text: 'Listener — count them in and out. Say it once with hands off the keys.', cls: 'whisper' });
          out.push({ text: 'A slip costs thirty seconds. It cannot cost the night.', cls: 'whisper' });
          return out;
        },
        config: (s) => {
          const k = kept(s); const dead = k.length ? [ROLES.indexOf(k[0])] : [];
          const cracked = Math.min(3, s.flags.BELLS_CRACKED | 0); const muted = [0, 2, 3, 1].filter(i => !dead.includes(i)).slice(0, cracked);
          /* binding.js does not read cfg.mutedCues; the dimming is done here, after the widget has built its
             lanes synchronously. Reported, not fixed: the widget is a shared file. */
          setTimeout(() => { document.querySelectorAll('.bind-lane').forEach((el, i) => { if (muted.includes(i)) el.classList.add('ch7-muted'); }); }, 0);
          return {
            title: dead.length ? 'THE BINDING — THREE-HANDED' : 'THE BINDING',
            note: 'Provost Marrow, without looking up: *Press once to sound your note. All ' + (dead.length ? 'three' : 'four') + ' together. Hold while the fire climbs, then let go together, inside half a second.* The Listener counts you out.',
            joinMs: 1000, holdMs: dead.length ? 8000 : 6000, releaseMs: 500, attempts: 3, deadLanes: dead, mutedCues: muted,
            onAttempt: () => { Store.inc('BINDING_FAILS'); Game.clock.penalty(30); },
            failText: 'The fire will not wait. The Hearth counts for you: one — two — three — off.',
          };
        },
        onSolve: (s, r) => {
          s.flags.BINDING_LANDED = true; if (!(r && r.success)) s.flags.WITH_HELP = true;
          s.flags.MIDNIGHT_SPARE = Game.clock.left(); Game.clock.stop(); s.flags.MIDNIGHT_LEFT = s.flags.MIDNIGHT_SPARE; /* the Epilogue reads MIDNIGHT_LEFT as "to spare" */
          s.flags.ENDING = computeEnding(s); Store.save();
          Store.note(r && r.success ? `The Binding held, with ${clockText(s.flags.MIDNIGHT_SPARE)} to midnight.` : 'The Binding held, with help.');
          if (s.flags.ENDING === 0) Audio.mood('wonder');
        },
        solvedText: (s, r) => [
          r && r.success ? 'Four notes, one release. The fire climbs — not much, but it climbs.' : 'The Hearth counts for you. It holds, barely.',
        ],
        next: (s) => s.flags.ENDING === 0 ? 'ch7_cold_slot' : 'ch7_ending', button: 'What the fire decides',
      },
      /* Midnight, when it comes. Nothing is undone, the ladder is open, and the table walks back into
         whichever puzzle it was in. */
      ch7_cold: {
        type: 'custom', art: 'ch7_cold', mood: 'void', fx: 'snow', flame: 0,
        enter: (s) => { Game.clock.stop(); s.flags.MIDNIGHT_LEFT = 0; Store.save(); },
        text: [
          'Midnight. The spark goes out — not guttering, simply gone.',
          'Then Wren, in the dark, still talking.',
          { speaker: 'Wren', text: 'Well. Nothing is on fire. Finish the ring.' },
          { text: 'Nothing you have done is undone. The clock has stopped for good.', cls: 'small' },
        ],
        run: (box, api) => new Promise((resolve) => {
          api.button('Finish it in the dark', () => resolve((Store.state.solved && Store.state.solved.ch7_sigil) ? 'ch7_binding' : 'ch7_sigil'), 'primary');
        }),
      },

      /* ---------- the true path: writing COLD ---------- */
      ch7_cold_slot: {
        art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1,
        text: [
          'The ring is full but for one socket. Wren walks to it and stands in it.',
          { text: 'It is never written.', cls: 'omen' },
          { speaker: 'Wren', text: 'It\'s cold in here. Obviously. It\'s me.' },
          'Four sealed words said WALK. Nothing here looks surprised.',
          'Something is cut into that socket, in letters the Reader knows.',
        ],
        next: 'ch7_wren_code', button: 'Look',
      },
      ch7_wren_code: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1, code: 'WREN',
        enter: (s) => { s.flags.WREN_SHOWN = true; Store.save(); }, /* the Epilogue skips its own WREN cast on the true path when this is set */
        cast: (s) => S.cast('WREN', S.pack(L.chapter('ch8').cast, Object.assign({}, s.flags, { ENDING: s.flags.ENDING | 0 }))),
        codeLabel: 'It is never written. Write it.',
        codeSub: 'Each phone shows one thing, then goes dark. **Your Sighting is spent. Look up.**',
        text: ['The eighth word. Every phone, now.'],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Reader**.',
        button: 'Every phone is dark',
        next: 'ch7_fourhands',
      },
      ch7_fourhands: {
        type: 'custom', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.12,
        text: [
          { speaker: 'Wren', text: 'Nothing left but the keyboard and each other. Write it.' },
        ],
        run: async (box, api) => {
          const wrap = UI.el('div', { class: 'pz' });
          wrap.appendChild(UI.el('div', { class: 'ch7-vow', text: '"COLD is written by four hands." — Law 0. Restored.' }));
          box.appendChild(wrap);
          await window.VigilRing.fourHands(wrap, 'WRITE IT — all four keys within a heartbeat');
          if (!api.alive()) return;
          Audio.sfx('seal'); Store.note('COLD was written by four hands.');
          await UI.sleep(900);
          return 'ch7_white';
        },
      },
      ch7_white: {
        art: 'ch7_white', mood: 'silence', fx: 'none', flame: 1, speed: 40,
        text: [
          { text: 'A fire the wrong way up appears in the empty socket, written by four hands.', cls: 'center' },
          { text: 'Wren steps aside. The four step through.', cls: 'center' },
          { text: 'White.', cls: 'big' },
        ],
        next: 'ch7_ending', button: 'After',
      },

      /* ---------- Stage 3: the Walk ---------- */
      ch7_ending: {
        art: 'ch7_end', artParams: (s) => ({ ending: s.flags.ENDING | 0 }), mood: 'sorrow', fx: 'ash', flame: 0.06,
        enter: (s) => { if (s.flags.ENDING == null) { s.flags.ENDING = computeEnding(s); Store.save(); } const E = s.flags.ENDING; Audio.mood(E === 0 ? 'triumph' : E === 1 ? 'wonder' : E === 4 ? 'dread' : 'sorrow'); Game.flame(E === 0 ? 1 : E === 1 ? 0.7 : E === 4 ? 0 : 0.4); },
        title: 'The Walk',
        text: (s) => {
          const E = s.flags.ENDING | 0, w = (E === 0 ? ROLES : walkers(s)).map(nickOf), st = stayers(s).map(nickOf);
          if (E === 0) return [
            `Walked into the Cold: ${UI.list(w)}. Stayed: no one.`,
            'The Hearth roars white. Four people come out, grey-eyed and ordinary.',
            'The Reader looks at the wall and sees shapes. The Listener hears a room, the way rooms sound. The Seer looks at the floor and it is a floor. The Binder looks at the Provost and has to ask what she feels.',
            'Wren is on the warm stones, crying, and will deny it. And there is a heartbeat.',
            { speaker: 'Wren', text: 'You *idiots*. I had a *speech*.' },
          ];
          if (E === 1) return [
            `Walked into the Cold: ${UI.list(w)}. Stayed: ${UI.list(st)}.`,
            'The Cold closes. Not all the way. Enough. The walkers come out with no gift.',
            { speaker: 'Wren', text: 'Half a walk. Story of my life.' },
          ];
          if (E === 2) return [
            'Walked into the Cold: Wren. Stayed: all four of you.',
            { speaker: 'Wren', text: 'It is alright. I knew. I wanted to hear what you would say.' },
            'The fire takes the shape of a door, and Wren goes through. Provost Marrow is left holding a grey thread.',
          ];
          if (E === 3) return [
            'Walked into the Cold: the Provost. Stayed: all four of you, and Wren.',
            { speaker: 'Provost Marrow', text: 'Then I go. I should have gone fourteen years ago.' },
            'She gives Wren the Chair\'s seal. The flame takes her.',
          ];
          return [
            'Nobody walked. Wren is kept warm, and kept, as promised. The school is a garrison by spring.',
            { speaker: 'Wren', text: 'Write to me. They let you write, apparently.' },
          ];
        },
        next: 'ch7_flow', button: 'The night, whole',
      },
      ch7_flow: {
        type: 'flow', art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: ['The Finale, as you walked it. What it meant is in the Epilogue.'],
        flowTitle: 'Finale — the paths you walked',
        stats: (s) => {
          const names = ['the Fourfold Walk', 'the Half-Walk', 'the Sealing', 'the Keeper\'s Walk', 'the Envoy\'s Bargain'];
          const one = `The night ended in ${names[s.flags.ENDING | 0]}.`;
          const two = s.flags.MIDNIGHT_SPARE != null
            ? `The Binding held with ${clockText(s.flags.MIDNIGHT_SPARE)} of midnight left${s.flags.WITH_HELP ? ', counted for you' : ''}.`
            : 'The Binding was never called.';
          const three = kept(s).length ? `${UI.list(kept(s).map(nickOf))} kept the Envoy's word.`
            : broken(s).length ? `${UI.list(broken(s).map(nickOf))} almost took it.`
            : `You asked the fire for ${s.flags.hintsTotal || 0} hints.`;
          return `${one} ${two} ${three}`;
        },
        next: 'ch8_start', button: 'What the fire left behind',
      },
    },
  });
})();
