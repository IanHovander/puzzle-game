/* Chapter II — The Ember Vault (Seer drives, Reader is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch2-niche { display: flex; flex-direction: column; gap: 14px; }
    .ch2-niche .ch2-label { font-family: var(--display); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-dim); }
    .ch2-sheet { font-family: var(--hand); font-size: 26px; line-height: 1.5; color: #d9cba8; background: rgba(255,240,200,0.05); border: 1px solid rgba(255,240,200,0.12); border-radius: 4px; padding: 14px 18px; letter-spacing: .08em; filter: blur(.6px); user-select: none; word-break: break-all; }
    .ch2-sheet span { display: inline-block; transform: rotate(180deg) scaleX(-1); opacity: .85; }
    .ch2-sheet .sig { display: block; text-align: right; margin-top: 8px; filter: blur(.9px); }
    .ch2-plinths { display: flex; flex-wrap: wrap; gap: 10px; }
  ` })); } catch (e) { /* headless shim */ }

  /* The four epitaphs as the Hearth shows them: worn, no mark. Reader's page has them clean; Seer's has the marks. */
  const EPITAPHS = [
    { shape: 'Crown', inv: false, worn: true, label: 'MERE' },
    { shape: 'Spike', inv: false, worn: true, label: 'HALVARD' },
    { shape: 'Hook', inv: false, worn: true, label: 'ROOK' },
    { shape: 'Hook', inv: false, worn: true, label: 'IDONY' },
  ];
  /* The niche strip, left to right: Spike-inverted, Crown-inverted, Hook-inverted. No mark on the Hearth. */
  const STRIP = [{ shape: 'Spike', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const ANSWER = [{ dial: 'C', glyph: 'THORN' }, { dial: 'A', glyph: 'KNOT' }, { dial: 'D', glyph: 'VEIL' }, { dial: 'B', glyph: 'EMBER' }];

  /* A sheet in the older alphabet: unreadable on purpose. Deterministic scribble. */
  function oldSheet() {
    const chars = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
    let seed = 41; const r = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const words = []; for (let i = 0; i < 46; i++) { let w = ''; const n = 2 + Math.floor(r() * 6); for (let k = 0; k < n; k++) w += chars[Math.floor(r() * chars.length)]; words.push(w); }
    return `<div class="ch2-sheet"><span>${words.join(' ')}</span><span class="sig">— ᛗᛖᚱᛖ</span></div>`;
  }

  Game.addChapter({
    id: 'ch2', label: 'Chapter II', title: 'The Ember Vault', start: 'ch2_start', code: 'KNOT',
    mood: 'wonder', fx: 'dust', art: 'ch2_antechamber', flame: 0.8,
    flow: {
      nodes: [
        { id: 'ch2_start', label: "Marrow's errand", col: 0, row: 1 },
        { id: 'ch2_door', label: "The Founders' Door", col: 1, row: 1 },
        { id: 'ch2_niche_found', label: "Found Mere's niche?", col: 2, row: 0, kind: 'choice', when: (s) => Store.chose('CH2_NICHE', 'mere') },
        { id: 'ch2_rubbing', label: 'Bookmoth took a rubbing', col: 3, row: 0, secret: true, when: (s) => !!s.flags.LETTER },
        { id: 'ch2_ember', label: 'The Cold Ember, the bricked road', col: 2, row: 1 },
        { id: 'ch2_stairfall', label: 'The stair falls', col: 3, row: 1, kind: 'choice' },
        { id: 'ch2_grab_wren', label: 'Grabbed Wren — the Ember fell', col: 4, row: 0, secret: true, when: (s) => Store.chose('CH2_STAIR', 'wren') },
        { id: 'ch2_grab_ember', label: 'Grabbed the Ember — Wren hurt', col: 4, row: 2, secret: true, when: (s) => Store.chose('CH2_STAIR', 'ember') },
        { id: 'ch2_sorrel', label: "Sorrel's price — the Ember goes up", col: 5, row: 2, kind: 'end', secret: true, when: (s) => !!s.flags.SORREL && Store.chose('CH2_STAIR', 'ember') },
        { id: 'ch3_start', label: 'The Whispering Gallery', col: 5, row: 1, secret: true },
      ],
      edges: [['ch2_start', 'ch2_door'], ['ch2_door', 'ch2_niche_found'], ['ch2_niche_found', 'ch2_rubbing'], ['ch2_door', 'ch2_ember'], ['ch2_niche_found', 'ch2_ember'], ['ch2_ember', 'ch2_stairfall'], ['ch2_stairfall', 'ch2_grab_wren'], ['ch2_stairfall', 'ch2_grab_ember'], ['ch2_grab_wren', 'ch3_start'], ['ch2_grab_ember', 'ch3_start'], ['ch2_grab_ember', 'ch2_sorrel']],
    },
    scenes: {
      /* ---------- Marrow's errand ---------- */
      ch2_start: {
        art: 'ch2_stair', mood: 'court', fx: 'dust', sfx: 'step',
        title: 'The Great Hall, after the bell',
        text: (s) => (s.flags.VOTE_LOST ? [
          'The vote is lost. Vane\'s guard closes around Wren on the Vigil dais, courteous as a coffin lid, and the nine Houses file out without looking at the child they have just given away.',
          'Wren, over a soldier\'s shoulder, mouths something at you. It is probably *rude*.',
          { speaker: 'Marrow', text: 'Then bring the Ember. I will get the child back myself.' },
        ] : [
          'Five to four. The Hall empties in a slow, offended hush; Vane bows to the Convocation as if he had won something, and perhaps he has.',
          'The Hearth flickered twice during the count. Nobody looked at it but the Provost — and she was not looking at the fire.',
          { speaker: 'Marrow', text: 'Wren stays with me. You four have an errand.' },
          { speaker: 'Wren', text: 'I\'ll stay put. Look at me staying put.' },
          'Nobody in the Hall believes it, and Marrow least of all.',
        ]).concat([
          { speaker: 'Marrow', text: 'Beneath this school there is a thing that relights the Hearth if it gutters again. The Founders called it the Cold Ember and left it in their vault. Bring it up. Tonight.' },
          { speaker: 'Marrow', text: 'Take the Seer\'s eyes. The vault was rebuilt in the Order\'s time, and the rebuild was not honest.' },
        ]),
        next: 'ch2_descent', button: 'Down',
      },
      ch2_descent: {
        art: 'ch2_stair', mood: 'wonder', fx: 'dust', sfx: 'step', flame: 0.8,
        text: [
          'The stair to the vault begins behind a tapestry nobody has lifted since the last Provost died. It goes down further than a school has any right to.',
          'Torches, then fewer torches, then a light that is not torchlight at all: a cold blue, breathing, somewhere below.',
          { text: 'The Map of the Night unfolds a panel downward. Beneath the Great Hall it draws a vault — and beneath the vault, a road that keeps going, with a line of brick across it.', cls: 'whisper' },
          'Nobody says anything about the road. Everyone has seen it.',
        ],
        next: 'ch2_antechamber', button: 'The bottom',
      },
      ch2_antechamber: {
        art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'open',
        title: "The Founders' Antechamber",
        text: [
          'Four statues in a row, hooded, faceless the way all of Thornhallow\'s stone is faceless. Left to right, the plinths say: **Mere. Halvard. Rook. Idony.** The Founders, in an order nobody at the table can explain.',
          'In the floor before each statue, a bronze dial: **A** before Mere, **B** before Halvard, **C** before Rook, **D** before Idony. Each Founder appears to be looking straight down at the dial in front of them.',
          'On each plinth, one carved shape, worn almost smooth. Beyond the statues, the Founders\' Door — no handle, no lock, only a count.',
          { text: 'Something about the plinths is wrong, and only one of you can see what.', cls: 'whisper' },
        ],
        next: 'ch2_attune', button: 'Attune',
      },
      ch2_attune: {
        type: 'code', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust',
        text: ['Cut into the lintel of the Founders\' Door, deep and unworn, a word — and beside it, a small mark the torchlight catches. Each of you: open your Companion and turn the page with both.'],
        roles: 'Warden of the Hearth (keyboard): **Owl**. Voice (reads aloud): **Bookmoth**.', sightSeconds: 90,
        next: 'ch2_door',
      },
      /* ---------- the Founders' Door ---------- */
      ch2_door: {
        type: 'puzzle', puzzle: 'dialseq', art: 'ch2_antechamber', mood: 'tense', fx: 'dust', puzzleId: 'ch2_door', par: [6, 9],
        text: [
          'Four dials, four Founders, four epitaphs. Each dial turns to any glyph; the door counts every turn you make, in order, and forgets a wrong count.',
          { text: 'Which glyph, on which dial, in what order — and by which Law, when the Laws disagree. Say what you see.', cls: 'whisper' },
        ],
        config: () => ({
          title: "THE FOUNDERS' DOOR",
          note: 'The epitaphs, left to right as the statues stand — worn on the Hearth, not on every page:',
          html: G.inscription(EPITAPHS, { showMark: false }),
          dials: [{ id: 'A', label: 'A · before Mere' }, { id: 'B', label: 'B · before Halvard' }, { id: 'C', label: 'C · before Rook' }, { id: 'D', label: 'D · before Idony' }],
          glyphs: glyphPalette(), answer: ANSWER, maxTurns: 6,
          submitText: 'Try the door',
          wrongText: 'The door forgets the count.',
          successText: 'The door remembers the count. Stone grinds on stone.',
        }),
        hints: [
          'Two plinths are upside down — Owl knows which; Bookmoth\'s lexicon has both readings of every epitaph.',
          'The statues lie about where they look — the older Law binds, and Owl can see the original sockets. Hush has the order the dials must turn in.',
          'Four turns, in this order: dial **C** to THORN, then dial **A** to KNOT, then dial **D** to VEIL, then dial **B** to EMBER. Nothing else, and nothing first.',
        ],
        onSolve: (s, r) => { Store.note('You opened the Founders\' Door' + (r && r.tries > 1 ? ' on the ' + r.tries + (r.tries === 2 ? 'nd' : r.tries === 3 ? 'rd' : 'th') + ' count' : ' on the first count') + '.'); },
        solvedText: [
          'The door does not open so much as remember that it was never really shut. It swings inward on a breath of air four hundred years old, and the cold blue light beyond it fills the antechamber.',
          'Four glyphs, four Founders, each on the dial they truly faced: **THORN, KNOT, VEIL, EMBER.** *A gate. Together. Hidden. Kept.* Bookmoth says it aloud, and nobody quite likes how it sounds.',
        ],
        next: 'ch2_opened',
      },
      ch2_opened: {
        type: 'choice', art: 'ch2_vault', mood: 'wonder', fx: 'motes', choice: 'CH2_VAULT', sfx: 'reveal',
        text: [
          'The vault is round and low and older than the school on top of it. In its centre, on a plinth of the same stone as the statues, a case of glass — and in the case a flame that is not burning. The Cold Ember. Blue, and breathing, and giving off no heat at all.',
          'Behind the plinth, an archway, bricked shut with newer stone. Above the bricks, one number: **212**.',
          'The four of you have the vault to yourselves. Nothing down here is going anywhere; nothing up there will wait.',
        ],
        options: [
          { id: 'ember', text: 'Take the Ember.', next: 'ch2_ember' },
          { id: 'niche', text: 'Look around before you take it.', sub: 'The antechamber, the plinths, the rebuilders\' work.', next: 'ch2_niche' },
        ],
        hints: ['Owl — behind Mere.', 'Owl\'s under-layer shows a hollow behind one of the plinths. It is not on the way to the Ember, and nobody will make you look.', 'Choose *Look around before you take it*, then *Behind Mere*. Let Bookmoth read what is inside — twice.'],
      },
      /* ---------- Mere's niche (optional) ---------- */
      ch2_niche: {
        type: 'custom', art: 'ch2_antechamber', mood: 'wonder', fx: 'dust', sfx: 'step',
        text: (s) => (Store.chose('CH2_NICHE', 'mere') ? [
          'Mere\'s plinth stands a hand\'s breadth from the wall. Behind it, at knee height, a hollow in the old stone that the rebuilders either missed or left alone.',
          'Inside: a strip of stone the length of a forearm, three shapes cut into it; and a sheet of something that was once vellum, folded small, written close in an alphabet none of you can read.',
        ] : [
          'Back through the door. Four plinths in a row, each a hand\'s breadth from the wall; four dials; a floor of the Order\'s grey laid over something older.',
          'The Hearth shows you stone. It does not show you what is under it, or behind it. If one of you knows where to look, say so.',
        ]),
        run: (box, api) => new Promise((resolve) => {
          const wrap = UI.el('div', { class: 'pz ch2-niche' });
          box.appendChild(wrap);
          const done = () => { UI.clear(api.actions); resolve('ch2_ember'); };
          const showNiche = async (fresh) => {
            UI.clear(wrap); UI.clear(api.actions);
            wrap.appendChild(UI.el('div', { class: 'pz-title', text: "MERE'S NICHE" }));
            wrap.appendChild(UI.el('div', { class: 'ch2-label', text: 'the strip — three shapes, left to right' }));
            wrap.appendChild(UI.el('div', { html: G.inscription(STRIP, { showMark: false }) }));
            wrap.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich('Bookmoth can read the shapes; only Owl can say which end the strip begins at. Read it both ways before you decide which one Mere meant.') }));
            wrap.appendChild(UI.el('div', { class: 'ch2-label', text: 'the sheet — the older alphabet' }));
            wrap.appendChild(UI.el('div', { html: oldSheet() }));
            const status = UI.el('div', { class: 'pz-status' }); wrap.appendChild(status);
            if (fresh) await api.say([
              'Mere\'s plinth stands a hand\'s breadth from the wall. Behind it, at knee height, a hollow in the old stone that the rebuilders either missed or left alone.',
              'Inside: a strip of stone the length of a forearm, three shapes cut into it; and a sheet of something that was once vellum, folded small, written close in an alphabet none of you can read.',
            ]);
            if (!api.alive()) return;
            if (Store.get('LETTER')) {
              status.className = 'pz-status good'; status.textContent = 'The rubbing is folded into Bookmoth\'s sleeve.';
              api.button('Take the Ember', done, 'primary'); return;
            }
            const rub = api.button('Take a rubbing (Bookmoth)', async () => {
              Store.set('LETTER', true); Store.note('Bookmoth took a rubbing of Mere\'s sheet.');
              api.audio.sfx('reveal'); rub.disabled = true;
              status.className = 'pz-status good'; status.textContent = 'Charcoal, a page torn from somebody\'s notebook, and thirty seconds. The rubbing goes into Bookmoth\'s sleeve, unread.';
              await api.say([{ speaker: 'Bookmoth', text: 'I can\'t read it. Not yet. I\'m keeping it anyway.' }]);
            }, '');
            api.button('Leave the sheet. Take the Ember', done, 'primary');
          };
          if (Store.chose('CH2_NICHE', 'mere')) { showNiche(false); return; }
          /* Stage one: where? The Hearth does not know. The Seer's under-layer does. */
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE ANTECHAMBER' }));
          wrap.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich('Four plinths, one wall. Behind which? The Hearth cannot see it; one of you can.') }));
          const row = UI.el('div', { class: 'ch2-plinths' });
          const status = UI.el('div', { class: 'pz-status' });
          ['Mere', 'Halvard', 'Rook', 'Idony'].forEach(n => row.appendChild(UI.el('button', { class: 'btn', text: 'Behind ' + n, onclick: () => {
            if (n === 'Mere') { Store.choose('CH2_NICHE', 'mere'); Store.note('You found the niche behind Mere\'s plinth.'); api.audio.sfx('reveal'); showNiche(true); return; }
            api.audio.sfx('wrong'); status.className = 'pz-status bad'; status.textContent = 'Dust, mortar, and the back of ' + n + '\'s plinth. Nothing.';
          } })));
          wrap.appendChild(row); wrap.appendChild(status);
          api.button('Enough. Take the Ember', done, 'primary');
        }),
        hints: ['Owl — behind Mere. Then: Bookmoth has both readings of the strip; Owl has the end it begins at.', 'Mark on the right means turned: read right to left, every glyph inverted. The Order\'s reading is the upright one.', 'Turned, the strip says KNOT · CROWN · THORN — *four · as one · went through.* And take the rubbing; you cannot read it tonight, but you may be able to later.'],
        next: 'ch2_ember',
      },
      /* ---------- the Cold Ember ---------- */
      ch2_ember: {
        art: 'ch2_vault', mood: 'wonder', fx: 'motes', sfx: 'magic',
        text: (s) => [
          'The case lifts from the plinth with no ward, no click, no protest. It is lighter than it looks and colder than anything has a right to be; the hands that carry it go numb to the wrist.',
          'Inside the glass the blue flame leans, very slightly, toward whoever holds it.',
          s.flags.LETTER ? 'Bookmoth keeps one hand on the sleeve with the rubbing in it, as if it might get up and leave.' : 'Owl looks back through the door at the antechamber one more time, and says nothing, and the moment passes.',
          { speaker: 'Knot', text: 'Four statues. Four dials. Four of us. Does anyone else feel like a set?' },
        ],
        next: 'ch2_road', button: 'The archway',
      },
      ch2_road: {
        art: 'ch2_map', mood: 'dread', fx: 'motes', flame: 0.75,
        text: [
          'Behind the plinth, the bricked arch. The mortar is the Order\'s grey, not the Founders\' black; the number above it is the year they closed it.',
          { text: 'The Map of the Night turns its panel a little further down than the vault. The Founders\' road runs on past the bricks — and far beneath it, faint as breath on glass, four small shapes in a row. Thrones, perhaps. Or chairs. Or statues.', cls: 'whisper' },
          'The Hearth is a long way up. The Ember is very cold. It is time to go.',
        ],
        next: 'ch2_stairfall', button: 'Up',
      },
      /* ---------- the stair falls (timed, 30 s) ---------- */
      ch2_stairfall: {
        type: 'choice', art: 'ch2_stair', artParams: { broken: true }, mood: 'tense', fx: 'ash', sfx: 'boom', choice: 'CH2_STAIR', flame: 0.75,
        text: (s) => [
          'Halfway up, the stair gives.',
          'Not all of it — a bite out of the middle, a dozen steps crumbling into the blue dark with a sound like a door closing very far away. The four of you are on the upper side. The case is not.',
          s.flags.VOTE_LOST ? 'Because on the lower side, across the gap, holding the Ember case in both arms and looking extremely pleased about it, is a fourteen-year-old who was under guard on the Vigil dais twenty minutes ago.' : 'Because on the lower side, across the gap, holding the Ember case in both arms and looking extremely pleased about it, is a fourteen-year-old who promised to stay put.',
          { speaker: 'Wren', text: 'You *left* without me. I\'ve never been where I was put in my life, you know that. Also you dropped this. Also the stairs are going. Also —' },
          'The step under Wren\'s feet tilts. Wren has one arm for the case and one for you. So do you.',
        ],
        prompt: 'The gap is a body\'s length and growing. One reach. What do you catch?',
        timer: 30, timerText: '*Thirty heartbeats. The stair is going.*', timeout: 'wren',
        options: [
          { id: 'wren', text: 'GRAB WREN.', sub: 'The case goes where the stair goes.', next: 'ch2_top', set: { EMBER_LOST: true }, note: 'At the stair, you caught Wren and let the Ember fall.',
            after: [
              'Four hands close on one thin wrist and haul. Wren comes over the gap in a scramble of elbows; the case does not. It turns once in the air, blue and slow, and the dark takes it without a sound.',
              { speaker: 'Wren', text: 'Ow. Thank you. Ow. Was that — that was important, wasn\'t it. The box.' },
              'Nobody answers. Below, for a moment, the blue light is brighter, and then it is not.',
            ] },
          { id: 'ember', text: 'GRAB THE EMBER.', cls: 'dark', sub: 'Wren is quick. Wren will manage.', next: 'ch2_top', set: { WREN_HURT: true }, note: 'At the stair, you caught the Ember and Wren fell.',
            after: [
              'The case comes over the gap into eight numb hands. Wren does not. Wren goes down with the step, and there is a sound from the dark that nobody at the table will forget — and then, worse, a small voice.',
              { speaker: 'Wren', text: 'I\'m fine. I\'m fine. It\'s only my arm. I landed on the — I\'m fine. Don\'t look like that. You got the box.' },
              'It takes ten minutes and Knot\'s cloak, torn into a rope, to get Wren up. The arm is not fine. Wren does not mention it again, which is the worst part.',
            ] },
        ],
      },
      /* ---------- the top of the stair ---------- */
      ch2_top: {
        art: 'ch2_stair', mood: 'sorrow', fx: 'dust', sfx: 'step', flame: 0.75,
        enter: (s) => { if (s.flags.SORREL) { Store.set('EMBER_LOST', true); if (Store.chose('CH2_STAIR', 'ember')) Store.note('At the top of the stair, Sorrel\'s clerk took the Ember for the Convocation.'); } },
        text: (s) => {
          const wren = Store.chose('CH2_STAIR', 'wren'), sorrel = !!s.flags.SORREL, lost = !!s.flags.VOTE_LOST;
          const out = ['The tapestry at the top of the stair is held aside by a hand that is not the Provost\'s.'];
          if (sorrel) {
            out.push('Master Sorrel\'s clerk, with two of the Convocation\'s guards and a writ in a very good hand. *The Cold Ember, when you bring it up, comes to the Convocation, not to the Provost.* You agreed. You were asked, and you agreed.');
            if (wren) out.push({ speaker: 'the clerk', text: 'The Ember.' }, 'Wren, one wrist still red from four hands, explains where the Ember is. The clerk writes it down. The Convocation\'s price has been paid to the dark, and the Convocation will not see it that way.');
            else out.push({ speaker: 'the clerk', text: 'The Ember. Thank you. The Convocation is grateful.' }, 'The case goes into a velvet bag and away down the corridor. The cold goes out of your hands slowly, and Wren\'s arm hangs wrong, and the clerk does not look at either.');
            out.push('Then Marrow, behind them, who has seen the bag and the child and the empty hands, and looks at only one of the three.');
          } else {
            out.push('Marrow, with a lamp, at the top of her own stair, as if she had been standing there since she sent you.');
            if (wren) out.push({ speaker: 'Marrow', text: 'The Ember.' }, 'You tell her. She listens to all of it — the gap, the case, the dark — and does not look down the stair once. She looks at Wren.', { speaker: 'Marrow', text: 'Then we do without it. Come up. All of you.' });
            else out.push('She takes the case from you in both hands and holds it the way you would hold a lantern in wind. Then she sees Wren\'s arm.', { speaker: 'Marrow', text: 'Who —' }, 'She stops. She has never once in fourteen years finished that sentence, and she does not finish it now.', { speaker: 'Wren', text: 'I fell. They got the box. It\'s fine, Mum — Provost. It\'s fine.' });
          }
          if (lost) out.push('At the end of the corridor, Vane\'s captain, come to collect what the vote gave him. Marrow puts herself between the captain and the child without appearing to move at all.', { speaker: 'Marrow', text: 'The child comes with me now. Take it up with the Convocation. Take it up with me.' });
          out.push({ text: 'Far above, the Hearth flickers, and this time everyone sees it.', cls: 'whisper' });
          return out;
        },
        next: 'ch2_flow', button: 'The night moves on',
      },
      ch2_flow: {
        type: 'flow', art: 'ch2_stair', mood: 'hearth', fx: 'dust',
        text: (s) => [
          s.flags.EMBER_LOST ? 'The Cold Ember is not coming up tonight.' : 'The Cold Ember is on the Provost\'s desk, and the Provost is not looking at it.',
          'Somewhere below, a road runs on past the bricks. Somewhere above, soldiers are being told which corridors to search.',
        ],
        flowTitle: 'Chapter II — the paths you walked',
        stats: (s) => {
          const bits = [];
          bits.push(Store.chose('CH2_NICHE', 'mere') ? 'You found Mere\'s niche' + (s.flags.LETTER ? ' and took the rubbing.' : ' and left the sheet.') : 'Something in the antechamber went unlooked-at.');
          bits.push(s.flags.WREN_HURT ? 'Wren\'s arm is broken.' : 'Wren is unhurt.');
          bits.push(s.flags.EMBER_LOST ? (s.flags.SORREL && !Store.chose('CH2_STAIR', 'wren') ? 'The Ember went to the Convocation.' : 'The Ember is at the bottom of the stair.') : 'The Ember came up.');
          bits.push('Hints so far: ' + (s.flags.hintsTotal || 0) + '.');
          return bits.join(' ');
        },
        next: 'ch3_start', button: 'The Whispering Gallery',
      },
    },
  });
})();
