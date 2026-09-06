/* Finale — One Born of Four (CROWN) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, S = window.VigilShared, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const ROLES = L.roles.map(r => r.id);

  const ch7css = Object.assign(document.createElement('style'), { textContent: `
    .ch7-walls { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px; }
    .ch7-wall .ch7-wall-name { font-family: var(--display); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-dim); text-align: center; margin-bottom: 4px; }
    .ch7-caller { font-family: var(--display); font-size: 14px; letter-spacing: .1em; color: var(--gold-2); text-align: center; padding: 8px 10px; border: 1px solid rgba(212,169,78,0.3); border-radius: 8px; background: rgba(212,169,78,0.06); margin-top: 6px; }
    .ch7-rim { font-family: var(--hand); font-style: italic; color: var(--ink-dim); text-align: center; font-size: 15px; margin-top: 4px; }
    .bind-lane.ch7-muted .bind-orb { visibility: hidden; }
    .bind-lane.ch7-muted::before { content: 'cracked — on the count'; position: absolute; left: 0; right: 0; bottom: 44px; text-align: center; font-family: var(--display); font-size: 10px; letter-spacing: .1em; color: var(--sea); }
    .ch7-count { display: grid; grid-template-columns: 1fr; gap: 6px; }
    .ch7-count .cd-big { font-family: var(--display); font-size: 42px; color: var(--ember); text-align: center; letter-spacing: .12em; }
    .ch7-vow { font-family: var(--hand); font-size: 19px; color: var(--ink); text-align: center; padding: 10px; }
    #text .ch7-white-p { color: #1a1620; }
  ` });
  if (document.head && document.head.appendChild) document.head.appendChild(ch7css);

  /* ---------- helpers ---------- */
  const castFlags = (s) => s.flags.CAST_FLAGS_CROWN || { WALK_UNLOCKED: !!s.flags.WALK_UNLOCKED, VANE_ALLY: !!s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED | 0, OATH_KNOT: !!(s.flags.OATH_KNOT || s.flags.OATH === 1) };
  const finaleValues = (s) => L.finaleValues(castFlags(s));
  const sorrelRefused = (s) => !s.flags.SORREL && !s.flags.VOTE_LOST;
  const oathKnot = (s) => !!(s.flags.OATH_KNOT || s.flags.OATH === 1);
  const walkers = (s) => ROLES.filter(r => s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'); // a kept bargain is a dead key: a stayer
  const stayers = (s) => ROLES.filter(r => !(s.flags['WALK_' + r] === 'WALK' && s.flags['BARGAIN_' + r] !== 'kept'));
  const nickOf = (roleId) => L.roleById(roleId).nick;
  const kept = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'kept');
  const accepted = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'accepted');
  const broken = (s) => ROLES.filter(r => s.flags['BARGAIN_' + r] === 'broken');
  const group = (s) => s.flags.GROUP_NAME || 'the Four';
  const shieldCount = (s) => { if (s.flags.VANE_ALLY) return { west: false, east: false }; let w = !!(s.flags.SOLDIERS || s.flags.STAIR === 'RUN'), e = sorrelRefused(s); if (s.flags.ORIEL) { if (e) e = false; else w = false; } return { west: w, east: e }; };
  const artP = (s) => ({ shields: shieldCount(s), ally: !!s.flags.VANE_ALLY });
  const WEST = [{ shape: 'Spike', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Hook', inv: true }, { shape: 'Crown', inv: true }];
  const EAST = [{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }];
  const BASE = { 1: 'THORN', 2: 'KNOT', 3: 'VEIL', 4: 'EMBER', 5: 'COLD', 6: 'CROWN', 7: 'WELL', 8: 'ASH' };
  const ROT = { 1: 'CROWN', 2: 'WELL', 3: 'ASH', 4: 'THORN', 5: 'KNOT', 6: 'VEIL', 7: 'EMBER', 8: 'COLD' };
  const matches = (map, ans) => { for (let i = 1; i <= 8; i++) { const want = ans[i], got = map[i] || null; if (want === 'COLD') { if (got !== null && got !== 'COLD') return false; } else if (got !== want) return false; } return true; };
  const ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
  const nextBargain = (s, after) => { const idx = ROLES.findIndex((r, i) => i > after && s.flags['BARGAIN_' + r] === 'accepted'); return idx < 0 ? 'ch7_bargains_done' : 'ch7_bargain_' + ROLES[idx]; };
  const onZero = () => { Store.inc('COLD_HEARTH_ATTEMPTS'); Store.note('Midnight came before the Binding. The fire was relit from CROWN.'); window.Game.go('ch7_cold'); };
  const ensureClock = (s) => { const C = window.Game.clock; if (C.running() || s.flags.BINDING_LANDED) return; if (s.flags.MIDNIGHT_LEFT > 0 && s.flags.MIDNIGHT_STARTED) C.resume(onZero); else { s.flags.MIDNIGHT_STARTED = true; C.start(900, onZero); } };
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

  Game.addChapter({
    id: 'ch7', label: 'Finale', title: 'One Born of Four', start: 'ch7_start', code: 'CROWN',
    mood: 'dread', fx: 'ash', art: 'ch7_edge', artParams: artP, flame: 0.06,
    flow: {
      nodes: [
        { id: 'ch7_start', label: 'The chamber\'s edge', col: 0, row: 2 },
        { id: 'ch7_decision', label: 'The Decision', col: 1, row: 2, kind: 'choice' },
        { id: 'ch7_wall', label: 'Vane shown the wall', col: 1, row: 0, kind: 'choice', secret: true, when: (s) => !!s.flags.VANE_STOOD_DOWN },
        { id: 'ch7_argue1', label: 'Marrow bars the Walk', col: 1, row: 4, kind: 'choice', secret: true },
        { id: 'ch7_dec_vane', label: 'Wren given to Vane', col: 2, row: 0, kind: 'end', secret: true },
        { id: 'ch7_tokens', label: 'Four sealed words', col: 2, row: 2 },
        { id: 'ch7_p0', label: 'only Bookmoth knows', col: 3, row: 0, kind: 'end', secret: true },
        { id: 'ch7_p1', label: 'only Hush knows', col: 3, row: 1, kind: 'end', secret: true },
        { id: 'ch7_p2', label: 'only Owl knows', col: 3, row: 3, kind: 'end', secret: true },
        { id: 'ch7_p3', label: 'only Knot knows', col: 3, row: 4, kind: 'end', secret: true },
        { id: 'ch7_bargains_done', label: 'Bargains, in the room', col: 3, row: 2, kind: 'choice', secret: true, when: (s) => accepted(s).length + kept(s).length + broken(s).length > 0 },
        { id: 'ch7_sigil', label: 'The Great Sigil', col: 4, row: 2 },
        { id: 'ch7_cold', label: 'Cold Hearth', col: 4, row: 4, kind: 'end', secret: true, when: (s) => (s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0 },
        { id: 'ch7_binding', label: 'The Binding', col: 5, row: 2 },
        { id: 'ch7_wren_code', label: 'COLD, written', col: 6, row: 1, secret: true },
        { id: 'ch7_e0', label: 'The Fourfold Walk', col: 7, row: 0, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 0 },
        { id: 'ch7_e1', label: 'The Half-Walk', col: 7, row: 1, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 1 },
        { id: 'ch7_e2', label: 'The Sealing', col: 7, row: 2, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 2 },
        { id: 'ch7_e3', label: 'The Keeper\'s Walk', col: 7, row: 3, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 3 },
        { id: 'ch7_e4', label: 'The Envoy\'s Bargain', col: 7, row: 4, kind: 'end', secret: true, when: (s) => s.flags.ENDING === 4 },
      ],
      edges: [
        ['ch7_start', 'ch7_decision'], ['ch7_decision', 'ch7_wall'], ['ch7_wall', 'ch7_decision'], ['ch7_decision', 'ch7_argue1'], ['ch7_argue1', 'ch7_tokens'],
        ['ch7_decision', 'ch7_dec_vane'], ['ch7_dec_vane', 'ch7_e4'], ['ch7_decision', 'ch7_tokens'],
        ['ch7_tokens', 'ch7_p0'], ['ch7_tokens', 'ch7_p1'], ['ch7_tokens', 'ch7_p2'], ['ch7_tokens', 'ch7_p3'], ['ch7_tokens', 'ch7_bargains_done'], ['ch7_bargains_done', 'ch7_sigil'], ['ch7_bargains_done', 'ch7_e4'],
        ['ch7_sigil', 'ch7_binding'], ['ch7_sigil', 'ch7_cold'], ['ch7_cold', 'ch7_start'],
        ['ch7_binding', 'ch7_wren_code'], ['ch7_wren_code', 'ch7_e0'], ['ch7_binding', 'ch7_e1'], ['ch7_binding', 'ch7_e2'], ['ch7_binding', 'ch7_e3'],
      ],
    },
    scenes: {
      /* ---------- the chamber's edge ---------- */
      ch7_start: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, sfx: 'step',
        title: 'The bell-chamber, a spark',
        text: (s) => {
          const withTarn = [];
          if (!s.flags.VOTE_LOST && !s.flags.SORREL) withTarn.push('Sorrel');
          if (!s.flags.VOTE_LOST && !s.flags.ORIEL) withTarn.push('Oriel');
          const out = [
            'The Hearth, far above through the shaft, is a spark. You can hold your breath longer than it has been alight. The bells hang silent over a floor that is a lid, and under the lid the Cold glows like a sky the wrong way up.',
            'Boots on the Founders\' road. Lord Cassian Vane comes to the chamber\'s edge and stops there, courteous, certain, as if he has been invited.',
            `Behind him, Master Tarn — Ear-Sighted, Crown-coined since the Vigil — leads the Convocation's guards${withTarn.length ? `, and beside him ${UI.list(withTarn)}, whose price you did not pay` : ''}.`,
          ];
          if (s.flags.ORIEL) out.push('Master Oriel steps past all of them and stands with you. She does not say anything. She does not need to.');
          out.push('Marrow is at the fire with Wren. On the chamber wall, lit by the last of it, four carved figures walk into a flame. Everyone who can see them is pretending not to.');
          if (s.flags.VOLUNTEER) out.push(`${nick(s.flags.VOLUNTEER - 1)} still has the feel of the thread in their hand. It comes back at odd moments.`);
          return out;
        },
        next: 'ch7_vane', button: 'Vane speaks',
      },
      ch7_vane: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06,
        text: (s) => [
          { speaker: 'Vane', text: s.flags.VANE_ACCEPT ? 'You gave me your word in the Hall. I have not forgotten it, and I have not told the Provost. Bring the boy to the road. He lives. Whatever she has told you tonight, he *lives* — that is the one thing I can promise and she cannot.' : 'Four Wardens. One child. A fire that will be out before the hour turns. I have made you an offer already and you did not take it. I make it once more, because I would rather not take him past you.' },
          { speaker: 'Vane', text: 'Bring him to the road. The Crown keeps him warm, and keeps him. You come up Masters. Nobody walks into anything.' },
          { speaker: 'Marrow', text: 'Cassian.' },
          { speaker: 'Vane', text: 'Ilsabet. I have come down the road you bricked up. I know what the wall says, even if nobody else in this school has scraped it.' },
          { speaker: 'Wren', text: `He does this thing where he sounds *reasonable*. Don't look at him. Look at me. ${group(s)}: I asked you a third time. This is the "in there" I meant.` },
          'The word is on the rim of the floor, worn by four hundred years of nobody standing on it. The Chair\'s glyph.',
        ],
        next: 'ch7_attune', button: 'Attune',
      },
      ch7_attune: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06,
        enter: (s) => {
          s.flags.WALK_UNLOCKED = !!s.flags.WALK_UNLOCKED; s.flags.VANE_ALLY = !!s.flags.VANE_ALLY;
          s.flags.BELLS_CRACKED = Math.max(0, Math.min(3, s.flags.BELLS_CRACKED | 0)); s.flags.OATH_KNOT = oathKnot(s);
          s.flags.CAST_FLAGS_CROWN = { WALK_UNLOCKED: s.flags.WALK_UNLOCKED, VANE_ALLY: s.flags.VANE_ALLY, BELLS_CRACKED: s.flags.BELLS_CRACKED, OATH_KNOT: s.flags.OATH_KNOT };
          Store.save();
        },
        text: ['Cut into the rim of the floor-ring, the seventh word. Each of you: turn the page with it, and read. Say nothing yet — there will be time to say everything.'],
        roles: 'Warden of the Hearth (keyboard): **passed around by name**, then all four keys. Voice (reads aloud): **Knot**.', sightSeconds: 90,
        next: 'ch7_decision',
      },

      /* ---------- Stage 1: the Decision ---------- */
      ch7_decision: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_DECISION',
        text: (s) => {
          const out = [{ speaker: 'Marrow', text: 'The Sealing is ready. It has been ready for fourteen years. Decide, and then we will see what the fire thinks of it.' }];
          if (s.flags.WALK_UNLOCKED) out.push({ text: 'On the wall, four figures. On the stone, four hands. On the 212 page, a Law struck by people who did not want to pay for it. You know a road the Order forgot.', cls: 'whisper' });
          else out.push({ text: 'Whatever the stone says when it is read the other way, you did not read it. The Order\'s road is the one you have.', cls: 'whisper' });
          if (s.flags.VANE_STOOD_DOWN) out.push('Vane\'s soldiers face outward now, toward Tarn. The Envoy stands where he stood, but his offer is gone and everyone heard it go.');
          return out;
        },
        prompt: 'No clock on this. Talk.',
        options: [
          { id: 'walk', text: 'LET WREN WALK.', sub: 'The Order\'s road. One goes in; the Cold closes behind them.', next: 'ch7_dec_walk', set: { DECISION: 'WALK' }, note: 'You let Wren walk.' },
          { id: 'vane', text: 'GIVE WREN TO VANE.', sub: 'The Crown keeps the child. Nobody walks.', cls: 'dark', next: 'ch7_dec_vane', set: { DECISION: 'VANE' }, note: 'You gave Wren to the Envoy.', if: (s) => !s.flags.VANE_ALLY },
          { id: 'refuse', text: 'REFUSE. Nobody walks.', sub: 'Not Wren, not any of you. Let the fire go out and see.', next: 'ch7_dec_refuse', set: { DECISION: 'REFUSE' }, note: 'You refused to send anyone.' },
          { id: 'fourfold', text: 'THE FOURFOLD WALK.', sub: 'Four who love what they close. The road the Founders took.', cls: 'bright', next: (s) => oathKnot(s) ? 'ch7_argue1' : 'ch7_dec_fourfold', set: { DECISION: 'FOURFOLD' }, note: 'You chose the Fourfold Walk.', if: (s) => !!s.flags.WALK_UNLOCKED },
          { id: 'wall', text: 'SHOW VANE THE WALL.', sub: 'Owl scraped the tapestry. Turn it to him.', next: 'ch7_wall', if: (s) => !!s.flags.TAPESTRY && !s.flags.VANE_ALLY },
        ],
      },
      ch7_wall: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06, sfx: 'reveal',
        enter: (s) => { s.flags.VANE_ALLY = true; s.flags.VANE_STOOD_DOWN = true; Store.save(); },
        text: [
          'Owl says what is under the paint, in the same words as in the study, and the Hearth turns the tapestry to the chamber\'s edge: four figures, no child, the fourth hand writing a flame the wrong way up.',
          'Vane looks at it for a long time.',
          { speaker: 'Vane', text: 'Twenty-two years. I told them, Ilsabet. I stood in your Hall with the paint under my nails and told them, and they sent me to the capital to learn manners.' },
          { speaker: 'Vane', text: 'Nobody scraped the paint. Not one of them. Not once.' },
          'He takes his hand off his sword, and his soldiers turn — not toward you. Toward the stair, and Master Tarn.',
          { speaker: 'Vane', text: 'My offer is withdrawn. Whatever your phones say of my word tonight, it is void; I will not be the thing you have to be brave about. The stair is held. Go and read your wall.' },
          { text: 'The Envoy has stood down. There will be no shields on the walls, and no bargains to keep.', cls: 'whisper' },
        ],
        next: 'ch7_decision', button: 'Back to the Decision',
      },
      /* Marrow bars the Walk (OATH_KNOT): a short argument tree */
      ch7_argue1: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_ARGUE1',
        text: [
          'Marrow steps between you and the ring. She is not angry. She is doing what she was asked.',
          { speaker: 'Marrow', text: 'You swore under KNOT. KNOT cannot be unbound — you chose it knowing. You swore to see Wren into the Cold, whatever the cost. I hold you to it, because you asked me to.' },
          { speaker: 'Marrow', text: 'If the oath was sworn to the wrong reading, then show me the wrong reading. Cite me one thing. Not a feeling. A thing you saw.' },
        ],
        prompt: 'Cite a clue.',
        options: [
          { id: 'stone', text: 'The prophecy stone is carved turned — Owl saw the mark at its foot, on the right. Read that way, it says four.', next: 'ch7_argue_yield', after: ['Marrow closes her eyes.', { speaker: 'Marrow', text: 'The foot of the stone. Four hundred years of fire in front of it, and one Seer with the fire low enough to look.' }] },
          { id: 'vane', text: 'Vane says four went in. He saw the paint.', next: 'ch7_argue2', after: [{ speaker: 'Marrow', text: 'Vane has said many things in my Hall. An oath does not bend to an Envoy. Again.' }] },
          { id: 'feel', text: 'Because it\'s Wren, and we\'re not doing it.', next: 'ch7_argue2', after: [{ speaker: 'Marrow', text: 'I know. I have known for fourteen years. That is not a reading. Again.' }] },
        ],
      },
      ch7_argue2: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_ARGUE2',
        text: [{ speaker: 'Marrow', text: 'You have read more of this school tonight than most Masters read in a life. Use it. One thing.' }],
        prompt: 'Cite a clue.',
        options: [
          { id: 'law0', text: 'Law 0 — "COLD is written by four hands" — struck in 212, the same year and the same hand as Law 6. Knot read the page.', next: 'ch7_argue_yield', after: [{ speaker: 'Marrow', text: 'The same hand. Yes. They could not afford four Masters, so they made it grammar.' }] },
          { id: 'mere', text: 'Mere\'s rubbing: "I offered to go alone and was refused. One was never asked." The Founder who kept the fire wrote it herself.', next: 'ch7_argue_yield', if: (s) => !!(s.flags.LETTER_READ || s.flags.LETTER), after: [{ speaker: 'Marrow', text: 'Mere. Who kept the fire, *after*. I have that sheet in my study. I have had it for twenty years.' }] },
          { id: 'break', text: 'Then we break the oath.', next: 'ch7_argue3', cls: 'dark', after: [{ speaker: 'Marrow', text: 'KNOT cannot be unbound. You do not get to be brave by forgetting what you signed. One more. The last one, and then I decide for you.' }] },
        ],
      },
      ch7_argue3: {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, choice: 'FINALE_ARGUE3',
        text: [{ speaker: 'Wren', text: 'Come *on*. You told me in the laundry. Tell her.' }],
        prompt: 'Cite a clue.',
        options: [
          { id: 'niche', text: 'The strip in Mere\'s niche, read from its mark: "four · as one · went through." Not "one went down alone."', next: 'ch7_argue_yield', if: () => Store.chose('CH2_NICHE', 'mere'), after: [{ speaker: 'Marrow', text: 'The niche. Nobody has stood behind that plinth since the rebuild.' }] },
          { id: 'tapestry', text: 'The tapestry under the paint: four figures walking into the flame, no child, and the fourth hand writing COLD.', next: 'ch7_argue_yield', if: (s) => !!s.flags.TAPESTRY, after: [{ speaker: 'Marrow', text: 'I scraped it myself, as a girl. I painted it back. I have never told anyone that.' }] },
          { id: 'thrones', text: 'Four statues and four thrones in the Vault; "four went down," said the portraits in the Gallery. Not one. Never one.', next: 'ch7_argue_yield', after: [{ speaker: 'Marrow', text: 'Four thrones. I have sat in the Chair\'s for twenty years and never once counted the others.' }] },
          { id: 'anyway', text: 'We\'re going in anyway.', next: 'ch7_argue1', cls: 'dark', after: [{ speaker: 'Marrow', text: 'No. Not through me, and not without a reason you can say aloud. From the top.' }] },
        ],
      },
      ch7_argue_yield: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: [
          { speaker: 'Marrow', text: 'Then the oath was sworn to the wrong reading, and the one you swore it to is telling you so.' },
          { speaker: 'Marrow', text: 'It was sworn to the Chair. That does not go away because I wish it. Idony\'s Law is on the rim: build the ring by the Laws, and then turn it until my mark sits at the first mark. You know my glyph. It is on every seal in this school.' },
          'She steps aside.',
          { speaker: 'Wren', text: 'Thanks, Mum.' },
          { speaker: 'Marrow', text: '…Don\'t.' },
        ],
        next: 'ch7_dec_fourfold', button: 'The Walk',
      },
      ch7_dec_walk: {
        art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: (s) => [
          { speaker: 'Wren', text: 'Right. Good. That\'s — good. That\'s what the stone says and I\'ve had fourteen years to get used to it, which is more than most people get for anything.' },
          { speaker: 'Wren', text: `Don't do faces. ${group(s)} don't do faces. Build the ring; I'll stand in the bit that isn't written.` },
          'Marrow does not look at the fire. She looks at Wren.',
          s.flags.WALK_UNLOCKED ? { text: 'On the Binder\'s page, a node that was lit once tonight goes grey again.', cls: 'whisper' } : { text: 'Nobody says the other way aloud. Nobody read it.', cls: 'whisper' },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_ring_intro', button: 'Continue',
      },
      ch7_dec_refuse: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: [
          { speaker: 'Marrow', text: 'Nobody.' },
          'You say it again, all four, so it is on the record of a room that has heard every kind of vow.',
          { speaker: 'Marrow', text: 'Then the fire goes out, and the Cold opens, and the Envoy gets what he came for without lifting a hand. Unless somebody walks.' },
          'She looks at the ring. She looks at the spark.',
          { speaker: 'Marrow', text: 'Build the sigil anyway. Hold the Cold while I think. I have not had a new thought in fourteen years and I am owed one.' },
          { speaker: 'Wren', text: 'Well, this is tense.' },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_ring_intro', button: 'Continue',
      },
      ch7_dec_fourfold: {
        art: 'ch7_edge', artParams: artP, mood: 'wonder', fx: 'ash', flame: 0.06, sfx: 'chime',
        text: (s) => [
          'You say it the way the Founders wrote it: four, as one, go through.',
          { speaker: 'Wren', text: 'You realise the *deal* was I go in. It was a very simple deal. I had a speech.' },
          { speaker: 'Wren', text: `Fine. Fine! ${group(s)}. Four idiots and a hollow. Build the ring.` },
          'Vane says nothing. Marrow says nothing. The Cold, under the lid, brightens very slightly, the way a room brightens when someone it likes walks in.',
          { text: 'The Walk is chosen. What each of you actually does when the sigil closes is still yours alone.', cls: 'whisper' },
        ],
        next: (s) => finaleValues(s) ? 'ch7_tokens_intro' : 'ch7_ring_intro', button: 'Continue',
      },
      ch7_dec_vane: {
        art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.03, sfx: 'boom',
        enter: (s) => { s.flags.ENDING = 4; Store.save(); },
        text: [
          'Vane does not gloat. That is the worst of it. He holds out his hand as if he is helping someone across a stream.',
          { speaker: 'Wren', text: 'Oh.' },
          { speaker: 'Wren', text: 'No, it\'s — it\'s fine. He promised. People keep saying he keeps promises.' },
          'Wren walks to the road without looking back, because looking back is a thing you do when you expect to be stopped.',
          'Marrow sits down on the floor of the chamber, very carefully, like someone whose knees have been told something.',
          'The spark goes out. Under the lid, the Cold opens like an eye.',
        ],
        next: 'ch7_ending', button: 'What the Crown does with it',
      },

      /* ---------- private tokens ---------- */
      ch7_tokens_intro: {
        type: 'custom', art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: (s) => {
          const v = finaleValues(s);
          const out = ['Every phone, now. Open SPEAK. What it asks you is yours; nobody else at this table will see the question, and nobody will see the answer.'];
          if (v && v.length === 4) out.push('Two questions. Whether you walk when the sigil closes — and what you do with the Envoy\'s word, to you alone. One sealed word answers both.');
          else if (v && v[0] === 'WALK') out.push('One question: whether you walk when the sigil closes, or stay.');
          else out.push('One question, from the Envoy, to you alone.');
          if (s.flags.VANE_STOOD_DOWN) out.push({ text: 'Vane\'s offer is void. Whatever your page still asks about his word, the fire will not count it.', cls: 'whisper' });
          if (s.flags.DECISION !== 'FOURFOLD' && v && v[0].startsWith('WALK')) out.push({ text: 'Your page may ask about a walk you did not choose. Answer it honestly anyway. The fire keeps what it needs.', cls: 'whisper' });
          out.push({ text: 'Two minutes. Say what you see — never show your phone.', cls: 'whisper' });
          return out;
        },
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch7-count' });
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'TWO MINUTES — SEAL YOUR WORD' }));
          const big = UI.el('div', { class: 'cd-big', text: '2:00' }); wrap.appendChild(big);
          wrap.appendChild(UI.el('div', { class: 'pz-note', text: 'When every phone shows a sealed word, come back to the Hearth. The fire will ask for all four at once.' }));
          box.appendChild(wrap);
          const ctl = UI.countdown(wrap, 120, (sec) => { big.textContent = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); big.classList.toggle('urgent', sec <= 15); });
          let done = false;
          const finish = () => { if (done || !api.alive()) return; done = true; ctl.cancel(); resolve('ch7_tokens'); };
          ctl.promise.then((r) => { if (r === 'timeout') { Audio.sfx('chime'); UI.toast('Time. The fire asks now.', 2400); finish(); } });
          api.button('Every phone is sealed', finish, 'primary');
        }),
      },
      ch7_tokens: {
        type: 'token', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: ['Four sealed words, in seat order. The Hearth answers only "received" — never what it received.'],
        prompt: 'Each of you: read the sealed word from your SPEAK page into the slot with your name.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i, s) => { const v = finaleValues(s); return v ? S.decode(L.channel('finale', ROLES[i]), tok, v) : null; },
        badText: 'The fire does not know that word. Check the phones; a sealed word can be re-read as often as it takes.',
        stuckText: 'A sealed word is four letters, exactly as the phone shows it, from this chapter\'s SPEAK page — not an older one.',
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

      /* ---------- Stage 2: bargains in the room ---------- */
      ...Object.fromEntries(ROLES.map((r, i) => ['ch7_bargain_' + r, {
        type: 'choice', art: 'ch7_edge', artParams: artP, mood: 'dread', fx: 'ash', flame: 0.06, choice: 'FINALE_BARGAIN_' + r, timer: 15, timerText: '*Fifteen heartbeats. A kept bargain binds your key.*', timeout: 'keep', sfx: 'heart',
        text: [
          { text: `Bound by the Envoy's word: ${nickOf(r)}.`, cls: 'big' },
          'The fire says it out loud. It does not say anything else, and the room is very quiet.',
          { speaker: 'Vane', text: 'I keep my promises. Do you keep yours?' },
        ],
        prompt: `${nickOf(r)} — in front of everyone.`,
        options: [
          { id: 'break', text: 'BREAK THE BARGAIN.', sub: 'Your key is free. The room saw you almost.', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'broken' }, note: `${nickOf(r)} almost took the Envoy's word.`, after: [{ speaker: 'Wren', text: `${nickOf(r)}. It's alright. I'd have taken it too, if he'd asked me nicely.` }] },
          { id: 'keep', text: 'KEEP IT.', sub: 'Your key stays bound. The others bind three-handed.', cls: 'dark', next: (s) => nextBargain(s, i), set: { ['BARGAIN_' + r]: 'kept' }, note: `${nickOf(r)} kept the Envoy's bargain.`, after: [{ speaker: 'Vane', text: 'Thank you. That was not nothing.' }, `${nickOf(r)}'s key goes dark on the Hearth.`] },
        ],
      }])),
      ch7_bargains_done: {
        art: 'ch7_edge', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        enter: (s) => { if (kept(s).length >= 2) { s.flags.ENDING = 4; Store.save(); } },
        text: (s) => {
          const k = kept(s), b = broken(s);
          if (k.length >= 2) return [
            `Two keys bound to the Envoy: ${UI.list(k.map(nickOf))}. That is a majority of hands on a four-handed thing.`,
            'Vane does not have to take anyone. The bargain walks Wren to the road on its own feet, and the rest of you follow because there is nothing left in the chamber to hold.',
            'The spark goes out.',
          ];
          const out = [];
          if (k.length === 1) out.push(`${nickOf(k[0])}'s key is dark. Three hands will bind what four should; the Walk, if it comes, is a narrower thing now, and the fire knows it.`);
          if (b.length) out.push(`${UI.list(b.map(nickOf))} broke the Envoy's word in front of him. He nods, once, as if a debt has been paid.`);
          if (!k.length && !b.length) out.push('Nobody in the room was bound. The Hearth says so, and the room lets out a breath.');
          out.push('Now the ring.');
          return out;
        },
        next: (s) => kept(s).length >= 2 ? 'ch7_ending' : 'ch7_ring_intro',
      },

      /* ---------- the Great Sigil ---------- */
      ch7_ring_intro: {
        art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06,
        text: (s) => {
          const sh = shieldCount(s);
          const out = [
            'The floor-ring: eight sockets in a circle, the whole grammar of the night at once. Around the walls, two inscriptions in two halves — one on the west wall, one on the east.',
            'Carved on the rim, in the Founders\' hand, a Law the fire cannot read. Knot can; it is on the Binder\'s page, and on Bookmoth\'s.',
          ];
          if (sh.west || sh.east) out.push(`${sh.west && sh.east ? 'Two soldiers stand' : 'A soldier stands'} against the wall${sh.west && sh.east ? 's' : ''}, shield up, and a glyph is behind ${sh.west && sh.east ? 'each' : 'it'}. A shield hides a carving; it does not change it.`);
          else if (s.flags.VANE_ALLY) out.push('Vane\'s soldiers face the stair. Nothing stands against the walls.');
          out.push({ text: 'When the ring appears, midnight starts: fifteen minutes. Placement passes the keyboard by name. Say what you place.', cls: 'whisper' });
          return out;
        },
        next: 'ch7_sigil', button: 'The ring',
      },
      ch7_sigil: {
        type: 'puzzle', puzzle: 'ring', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.06, puzzleId: 'ch7_sigil', par: [6, 10],
        enter: (s) => ensureClock(s),
        text: [
          'Eight slots, sunwise. Two walls, two marks, seven Laws and one that was struck. Nobody at this table can do another\'s job.',
          { text: 'Bookmoth reads. Owl calls the marks. Hush holds the Hymn and its rest. Knot reconciles the Laws aloud — all of them, at once.', cls: 'whisper' },
        ],
        config: (s) => {
          const sh = shieldCount(s);
          const west = WEST.map((it, i) => Object.assign({}, it, { hidden: sh.west && i === 1 }));
          const east = EAST.map((it, i) => Object.assign({}, it, { hidden: sh.east && i === 1 }));
          const html = `<div class="ch7-walls"><div class="ch7-wall"><div class="ch7-wall-name">West wall</div>${G.inscription(west, { showMark: false })}</div><div class="ch7-wall"><div class="ch7-wall-name">East wall</div>${G.inscription(east, { showMark: false })}</div></div><div class="ch7-rim">on the rim, in the Founders' hand: a Law — Knot has it</div><div class="ch7-caller" id="ch7-caller">${nick(0)}, the first glyph.</div>`;
          let placed = 0;
          return {
            title: 'THE GREAT SIGIL', html, slots: 8, glyphs: glyphPalette(), allowEmpty: true, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat. The Hymn plays.',
            check: (map) => {
              const knot = oathKnot(s);
              if (knot) { if (matches(map, ROT)) return true; if (matches(map, BASE)) return 'The ring is right by the Laws — and still it will not close. It was sworn to someone. Idony\'s Law: turn it until the sworn-to\'s glyph sits at the first mark.'; return false; }
              if (matches(map, BASE)) return true;
              if (matches(map, ROT)) return 'The ring turns under no oath tonight. Build it from the marks, not from the Chair.';
              return false;
            },
            onPlace: (g, slot) => { placed++; const el = document.getElementById('ch7-caller'); if (!el) return; if (placed < 7) el.textContent = `${nick(placed % 4)}, the ${ORD[placed]} glyph.`; else if (placed === 7) el.textContent = `${nick(3)}, the eighth glyph — or say why it stays empty.`; else el.textContent = 'Every hand has placed twice. Close it — or move what must move.'; },
            wrongText: 'Frost creeps over the ring. It resets. Midnight does not.',
            successText: 'The ring warms. Every glyph, once.',
          };
        },
        hints: [
          'The east wall is turned; the west is not; each has its own mark — Owl has both. Bookmoth has both readings of each wall.',
          (s) => 'Turned means widdershins from its mark — Owl says which mark, Hush says which reading climbs. Knot\'s Laws say what the empty slot is' + (oathKnot(s) ? ' — and, because you swore under KNOT, where the ring begins: the Chair\'s glyph at the first mark.' : '.'),
          (s) => oathKnot(s)
            ? 'CROWN in slot 1, WELL in 2, ASH in 3, THORN in 4, KNOT in 5, VEIL in 6, EMBER in 7, and slot 8 left empty (or COLD, by four hands). Then four hands.'
            : 'THORN in slot 1, KNOT in 2, VEIL in 3, EMBER in 4, slot 5 left empty (or COLD, by four hands), CROWN in 6, WELL in 7, ASH in 8. Then four hands.',
        ],
        onSolve: (s, r) => { playHymn(); Store.note('The Great Sigil closed' + (r && r.tries > 1 ? ` after ${r.tries} tries.` : ' first time.')); },
        solvedText: (s) => [
          'The ring warms, socket by socket, and the Hymn plays itself through the floor: up one, up three, down two, down three, up four, up two —',
          '— and a rest, where nothing is written.',
          { speaker: 'Wren', text: 'Ha. Listen to that. Four hundred years and it *still works*.' },
          { speaker: 'Marrow', text: 'Hands on your keys. The Binding, and then the fire decides.' },
          { text: `Midnight: ${Math.floor(Game.clock.left() / 60)}:${String(Game.clock.left() % 60).padStart(2, '0')}.`, cls: 'whisper' },
        ],
        next: 'ch7_binding',
      },
      ch7_binding: {
        type: 'puzzle', puzzle: 'binding', art: 'ch7_ring', artParams: artP, mood: 'tense', fx: 'ash', flame: 0.1, puzzleId: 'ch7_binding', par: [3],
        enter: (s) => ensureClock(s),
        text: (s) => {
          const k = kept(s), cracked = s.flags.BELLS_CRACKED | 0;
          const out = ['Press once to sound your note; it holds. All four within a heartbeat. The fire climbs only while all four sound. When the Hymn reaches its rest, let go — together, within half a second — and the Hearth gives no count. Count yourselves in aloud.'];
          if (k.length) out.push(`${nickOf(k[0])}'s key is bound to the Envoy. Three notes; hold it eight seconds; one note missing.`);
          if (cracked) out.push(`${cracked} cracked bell${cracked > 1 ? 's' : ''}: ${cracked > 1 ? 'those lanes have' : 'that lane has'} no light. Press on Hush's count.`);
          out.push({ text: 'Each failure costs thirty seconds of midnight. Hush has the count.', cls: 'whisper' });
          return out;
        },
        config: (s) => {
          const k = kept(s); const dead = k.length ? [ROLES.indexOf(k[0])] : [];
          const cracked = Math.min(3, s.flags.BELLS_CRACKED | 0); const muted = [0, 2, 3, 1].filter(i => !dead.includes(i)).slice(0, cracked);
          setTimeout(() => { document.querySelectorAll('.bind-lane').forEach((el, i) => { if (muted.includes(i)) el.classList.add('ch7-muted'); }); }, 0);
          return {
            title: dead.length ? 'THE BINDING — THREE-HANDED' : 'THE BINDING',
            note: dead.length ? 'Three notes. Sound them together; hold while the fire climbs — eight seconds, one note short; then **release together**. The Hearth gives no count.' : undefined,
            joinMs: 1000, holdMs: dead.length ? 8000 : 6000, releaseMs: 500, attempts: 3, deadLanes: dead, mutedCues: muted,
            onAttempt: (n) => { Store.inc('BINDING_FAILS'); Game.clock.penalty(30); },
            failText: 'The fire will not wait for a fourth. The Hearth counts for you: one — two — three — off.',
          };
        },
        hints: [
          'Hush has the count on the Listener\'s page: press on "four"; release on "one — two — three — off".',
          'Say it aloud, all four, before anyone moves: "one, two, three, OFF" — and let go on OFF. The release must land within half a second.',
          'If it fails a third time the Hearth counts for you and the night goes on. Nothing ends here except the clock.',
        ],
        onSolve: (s, r) => {
          s.flags.BINDING_LANDED = true; if (!(r && r.success)) s.flags.WITH_HELP = true;
          s.flags.MIDNIGHT_SPARE = Game.clock.left(); Game.clock.stop(); s.flags.MIDNIGHT_LEFT = s.flags.MIDNIGHT_SPARE; /* the Epilogue reads MIDNIGHT_LEFT as "to spare"; ensureClock never restarts once BINDING_LANDED */
          s.flags.ENDING = computeEnding(s); Store.save();
          Store.note(r && r.success ? `The Binding held, released ${((r.releaseSpread || 0) / 1000).toFixed(2)} s apart, with ${Math.floor((s.flags.MIDNIGHT_SPARE || 0) / 60)}:${String((s.flags.MIDNIGHT_SPARE || 0) % 60).padStart(2, '0')} to midnight.` : 'The Binding held, with help.');
          if (s.flags.ENDING === 0) Audio.mood('wonder');
        },
        solvedText: (s, r) => [
          r && r.success ? 'Four notes, one release. The fire climbs — not much; it is a spark — but it climbs, and the Cold under the lid stops pushing.' : 'The Hearth counts for you, and on "off" the notes stop together. It holds. Barely. It holds.',
          `Midnight stops at ${Math.floor((s.flags.MIDNIGHT_SPARE || 0) / 60)}:${String((s.flags.MIDNIGHT_SPARE || 0) % 60).padStart(2, '0')}. The clock has nothing left to say.`,
          'The Cold is held. Whatever happens next happens because you chose it, not because you ran out of time.',
        ],
        next: (s) => s.flags.ENDING === 0 ? 'ch7_cold_slot' : 'ch7_ending',
      },
      ch7_cold: {
        type: 'custom', art: 'ch7_cold', mood: 'void', fx: 'snow', flame: 0,
        enter: () => { Game.clock.stop(); },
        text: [
          { text: 'Midnight.', cls: 'big' },
          'The spark goes out. It does not gutter; it simply is not there, the way a word is not there when you have forgotten it.',
          'Under the lid the Cold opens, and it is quiet, and nobody has to decide anything any more.',
          { text: 'Some nights simply end.', cls: 'omen' },
          { text: 'The fire can be relit from CROWN. The first attempt is recorded, and the flowchart will remember it.', cls: 'whisper' },
        ],
        run: (box, api) => new Promise((resolve) => {
          api.button('Try again from CROWN', () => {
            const s = Store.state;
            ['DECISION', 'ENDING', 'WITH_HELP', 'BINDING_LANDED', 'BINDING_FAILS', 'MIDNIGHT_SPARE', 'MIDNIGHT_STARTED', 'WREN_SHOWN'].forEach(k => delete s.flags[k]);
            ROLES.forEach(r => { delete s.flags['WALK_' + r]; delete s.flags['BARGAIN_' + r]; });
            s.flags.MIDNIGHT_LEFT = 0;
            ['ch7_sigil', 'ch7_binding'].forEach(id => delete s.solved[id]);
            delete s.tokens.ch7_tokens;
            Store.save();
            resolve('ch7_start');
          }, 'primary');
        }),
      },

      /* ---------- the true path: writing COLD ---------- */
      ch7_cold_slot: {
        art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1,
        text: [
          'The ring is full but for one slot. Wren walks to it, the way Wren walks to everything, and stands in it.',
          { text: 'It is never written.', cls: 'omen' },
          { speaker: 'Wren', text: 'It\'s cold in here. Obviously. It\'s me.' },
          'Four sealed words said WALK. The Hearth knows it, and the Hearth is the only thing in the room that does not look surprised.',
          { speaker: 'Marrow', text: 'The last word. It has never been shown. There is nothing after it.' },
          'Something is carved in the empty socket. It was carved four hundred years ago, in the older alphabet, and the Reader could read it since the study.',
        ],
        next: 'ch7_wren_code', button: 'Look',
      },
      ch7_wren_code: {
        type: 'code', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.1, code: 'WREN',
        enter: (s) => { s.flags.WREN_SHOWN = true; Store.save(); }, /* the Epilogue skips its own WREN·cast on the true path when this is set */
        cast: (s) => S.cast('WREN', S.pack(L.chapter('ch8').cast, Object.assign({}, s.flags, { ENDING: s.flags.ENDING | 0 }))),
        codeLabel: 'It is never written. Write it.',
        codeSub: 'Everyone types it. Each phone, in seat order, will show you something, and then it will go dark. **Your Sighting is spent. Look up.**',
        text: [
          'The eighth word. Every phone, now — it is the last time tonight anyone will ask you to look down.',
        ],
        roles: 'Bookmoth first, then Hush, then Owl, then Knot. When your phone has gone dark, put it face down on the table.',
        button: 'Every phone is dark',
        next: 'ch7_fourhands',
      },
      ch7_fourhands: {
        type: 'custom', art: 'ch7_ring', artParams: artP, mood: 'wonder', fx: 'motes', flame: 0.12,
        text: [
          'Nothing is left on the table but the keyboard and each other.',
          'Wren steps out of the empty slot and stands behind the Warden of the Hearth, and puts one hand over the hand on the key.',
          { speaker: 'Wren', text: 'Write it.' },
        ],
        run: async (box, api) => {
          const wrap = UI.el('div', { class: 'pz' });
          wrap.appendChild(UI.el('div', { class: 'ch7-vow', text: '"COLD is written by four hands." — Law 0, Founders\', Year 0. Restored.' }));
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
          { text: 'The inverted flame appears in the empty slot: a fire the wrong way up, written by four hands who did not need to read it.', cls: 'center' },
          { text: 'Wren steps aside.', cls: 'center' },
          { text: 'The four step through.', cls: 'center' },
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
          const E = s.flags.ENDING | 0, w = (E === 0 ? ROLES : walkers(s)).map(nickOf), st = stayers(s).map(nickOf), k = kept(s).map(nickOf), b = broken(s).map(nickOf);
          const out = [];
          if (E === 0) {
            out.push({ text: `Walked into the Cold: ${UI.list(w)}. Stayed: no one. Wren waited on the stones.`, cls: 'big' });
            out.push('The Hearth roars white. For a moment nobody in the chamber can see anything at all, and Vane\'s soldiers, who have seen fire, put their arms over their faces like children.');
            out.push('Then four people come out of the white, one after another, grey-eyed and ordinary, blinking like people who have woken somewhere warm.');
            out.push('Bookmoth looks at the wall and sees shapes. Hush hears a room, the way rooms sound. Owl looks at the floor and it is just a floor. Knot looks at Marrow and does not know what she is feeling, and has to ask.');
            out.push('Wren is sitting on the warm stones. Wren has been crying, which Wren will deny. And — Hush would tell you, if Hush could still hear it — there is a heartbeat.');
            out.push({ speaker: 'Wren', text: 'You *idiots*. You absolute — I had a *speech*.' });
            out.push('Marrow sits down on the floor beside the child she named, and says nothing, because she has been allowed to say nothing for the first time in fourteen years.');
            out.push('Vane\'s report to the Crown, written that morning on the chamber\'s edge, says the Cold is closed and there is nothing beneath Thornhallow to harness. It is the first true thing he has ever sent them.');
            if (s.flags.WITH_HELP) out.push({ text: 'The Binding was counted for you. The fire does not mind. The fire has always counted.', cls: 'whisper' });
          } else if (E === 1) {
            out.push({ text: `Walked into the Cold: ${UI.list(w)}. Stayed: ${UI.list(st)}.`, cls: 'big' });
            if (k.length) out.push(`${UI.list(k)}'s key was bound to the Envoy; three hands wrote what four should have, and the seal is the shape of that.`);
            out.push(`The flame goes white, narrower than the wall shows it. ${UI.list(w)} step through. ${UI.list(st)} hold the keys and the fire and watch ${w.length === 1 ? 'a friend' : 'their friends'} go.`);
            out.push('The Cold closes. Not all the way; enough. The walkers come out grey-eyed and free of every gift they had, and the stayers keep their Sightings for life — the new Masters of a school that finally knows what it is standing on.');
            out.push('Wren lives. Wren stands up off the stones and makes a joke that does not quite land, because the room is not ready for it yet.');
            out.push('Hush — if Hush stayed — listens, and hears the room, and every heart in it. Except one. That is the one visible difference, and it is not visible at all.');
            out.push({ speaker: 'Wren', text: 'Half a walk. Story of my life. Come on. Somebody help Mum up.' });
          } else if (E === 2) {
            out.push({ text: 'Walked into the Cold: Wren. Stayed: Bookmoth, Hush, Owl and Knot.', cls: 'big' });
            out.push({ speaker: 'Wren', text: 'It\'s alright. I knew. I\'ve known since the laundry — since before the laundry. I just wanted to hear what you\'d say.' });
            out.push('Wren steps into the empty slot, and the fire takes the shape of a door, and Wren goes through it without looking back, because looking back is what you do when you expect to be stopped.');
            out.push('The Hearth catches. Four hundred years of fire, and it will burn four hundred more.');
            out.push('In the morning a fifth name is carved over the Hearth, in the older alphabet, which the Reader can read and wishes they could not.');
            out.push('Marrow stands alone at the fire with a grey thread that nobody can cut, and the Binder does not tell her it is there.');
            out.push({ text: 'On the flowchart, one step from where you stood, a node stays grey: "They went in together."', cls: 'whisper' });
          } else if (E === 3) {
            out.push({ text: 'Walked into the Cold: the Provost. Stayed: Bookmoth, Hush, Owl and Knot — and Wren.', cls: 'big' });
            if (s.flags.DECISION === 'FOURFOLD') out.push(`The Walk was chosen and, when the sigil closed, ${w.length ? `only ${UI.list(w)} would have gone` : 'nobody would have gone'}. The fire does not close on good intentions.`);
            out.push({ speaker: 'Marrow', text: 'Then I go. I should have gone fourteen years ago, and I told myself a story instead. Move.' });
            out.push('She takes off the Chair\'s seal and gives it to Wren, and does not say goodbye, because she has already said it, in grey, every day for fourteen years.');
            out.push('The flame takes her. The seal holds — thin, a skin of ice on a well — and the Cold stops pushing, for now.');
            out.push('Wren lives, without a heartbeat, holding a seal that is too big.');
            out.push({ speaker: 'Wren', text: 'Right. So. Who\'s going to teach me to be Provost? Not you lot. Obviously.' });
          } else {
            out.push({ text: 'Nobody walked.', cls: 'big' });
            if (s.flags.DECISION !== 'VANE') out.push(`Two keys were bound to the Envoy: ${UI.list(k)}. The rest of the room followed them up the road, because there was nothing left in the chamber to hold.`);
            out.push('Wren is kept warm, and kept, exactly as promised: in a cage with a fire in it, in the capital, where the Cold can be drawn up through the Founders\' road and fed to the Crown\'s engines.');
            out.push('Thornhallow is a garrison by spring. The Hearth burns on coal.');
            out.push('You come up Masters — of ash, of a school that stands on a wound the Crown keeps open on purpose — and the Convocation, which sold its Law for four Masters\' comfort in 212, sells it again for four more.');
            if (b.length) out.push({ text: `One of you almost did it differently. ${UI.list(b)}. The flowchart will say so.`, cls: 'whisper' });
            out.push({ speaker: 'Wren', text: 'Write to me. They let you write, apparently. I\'ll tell you if it laughs at your jokes.' });
          }
          return out;
        },
        next: 'ch7_flow', button: 'The night, whole',
      },
      ch7_flow: {
        type: 'flow', art: 'ch7_edge', artParams: artP, mood: 'sorrow', fx: 'ash', flame: 0.06,
        text: ['The Finale, as you walked it. What the night meant is in the Epilogue.'],
        flowTitle: 'Finale — the paths you walked',
        stats: (s) => {
          const E = s.flags.ENDING | 0; const names = ['The Fourfold Walk', 'The Half-Walk', 'The Sealing', 'The Keeper\'s Walk', 'The Envoy\'s Bargain'];
          const bits = [`Ending: **${names[E]}**`];
          if (s.flags.MIDNIGHT_SPARE != null) bits.push(`Midnight spared: **${Math.floor(s.flags.MIDNIGHT_SPARE / 60)}:${String(s.flags.MIDNIGHT_SPARE % 60).padStart(2, '0')}**`);
          bits.push(`Binding failures: **${s.flags.BINDING_FAILS | 0}**${s.flags.WITH_HELP ? ' (counted with help)' : ''}`);
          if (broken(s).length) bits.push(`Almost took the Envoy's word: **${UI.list(broken(s).map(nickOf))}**`);
          if (kept(s).length) bits.push(`Kept the Envoy's word: **${UI.list(kept(s).map(nickOf))}**`);
          if ((s.flags.COLD_HEARTH_ATTEMPTS | 0) > 0) bits.push(`Cold Hearths: **${s.flags.COLD_HEARTH_ATTEMPTS}**`);
          bits.push(`Hints so far: **${s.flags.hintsTotal || 0}**`);
          return bits.join(' · ');
        },
        next: 'ch8_start', button: 'What the fire left behind',
      },
    },
  });
})();
