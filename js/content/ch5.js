/* Chapter V — The Long Stair (Reader drives, Listener is the Voice) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, S = window.VigilShared;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));
  const F = (s) => s.flags;
  const law0 = (s) => !!(F(s).LAW0 || F(s).LETTER_READ || F(s).TAPESTRY || F(s).ORIEL);

  (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    .ch5-count { font-family: var(--display); font-size: 110px; text-align: center; color: var(--gold-2); letter-spacing: .1em; line-height: 1.1; min-height: 130px; text-shadow: 0 0 30px rgba(242,210,122,.35); }
    .ch5-count.go { color: var(--sea); }
    .ch5-count-sub { text-align: center; color: var(--ink-dim); font-style: italic; margin-top: 6px; }
    .ch5-name { font-family: var(--display); font-size: 30px; text-align: center; color: var(--gold-2); letter-spacing: .12em; margin: 8px 0; }
  ` }));

  const GATE1 = [{ shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }];
  const GATE2 = [{ shape: 'Crown', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: true }];
  const DOOR = [{ shape: 'Flame', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Spike', inv: true }];

  Game.addChapter({
    id: 'ch5', label: 'Chapter V', title: 'The Long Stair', start: 'ch5_start', code: 'ASH',
    mood: 'dread', fx: 'motes', art: 'ch5_stair', flame: 0.3,
    flow: {
      nodes: [
        { id: 'ch5_start', label: 'The Long Stair', col: 0, row: 2 },
        { id: 'ch5_door', label: 'Mere\'s door, for the unasked', col: 1, row: 0, kind: 'choice', secret: true },
        { id: 'ch5_gate1', label: 'The Turned Gate', col: 1, row: 2 },
        { id: 'ch5_marches', label: 'The Map turns over', col: 2, row: 2 },
        { id: 'ch5_gate2', label: 'The Silent Gate', col: 3, row: 2 },
        { id: 'ch5_gate2_cold', label: 'COLD, written by four hands', col: 3, row: 0, kind: 'end', secret: true, when: (s) => !!F(s).GATE2_COLD },
        { id: 'ch5_count', label: 'The Founders\' Count', col: 4, row: 2 },
        { id: 'ch5_stair', label: 'The soldiers reach the stair', col: 5, row: 2, kind: 'choice' },
        { id: 'ch5_collapse', label: 'Collapse: a bell cracks', col: 6, row: 0, secret: true },
        { id: 'ch5_hold', label: 'Hold: a living anchor', col: 6, row: 2, secret: true },
        { id: 'ch5_hold_named', label: 'one of you stays', col: 7, row: 1, kind: 'end', secret: true, when: (s) => F(s).STAIR === 'HOLD' && F(s).VOLUNTEER > 0 },
        { id: 'ch5_hold_none', label: 'nobody stays', col: 7, row: 3, kind: 'end', secret: true, when: (s) => !!F(s).HOLD_NOBODY },
        { id: 'ch5_run', label: 'Run: they follow', col: 6, row: 4, secret: true, when: (s) => F(s).STAIR === 'RUN' },
        { id: 'ch6_start', label: 'The Bells', col: 8, row: 2, secret: true },
      ],
      edges: [['ch5_start', 'ch5_door'], ['ch5_door', 'ch5_gate1'], ['ch5_start', 'ch5_gate1'], ['ch5_gate1', 'ch5_marches'], ['ch5_marches', 'ch5_gate2'], ['ch5_gate2', 'ch5_gate2_cold'], ['ch5_gate2', 'ch5_count'], ['ch5_count', 'ch5_stair'],
        ['ch5_stair', 'ch5_collapse'], ['ch5_stair', 'ch5_hold'], ['ch5_stair', 'ch5_run'], ['ch5_hold', 'ch5_hold_named'], ['ch5_hold', 'ch5_hold_none'], ['ch5_hold_none', 'ch5_run'],
        ['ch5_collapse', 'ch6_start'], ['ch5_hold_named', 'ch6_start'], ['ch5_run', 'ch6_start']],
    },
    scenes: {
      /* ---------- the descent ---------- */
      ch5_start: {
        art: 'ch5_stair', mood: 'dread', fx: 'motes', sfx: 'step', flame: 0.3,
        title: 'The Long Stair, an hour before midnight',
        enter: (s) => { if (!F(s).LAW0 && law0(s)) Store.set('LAW0', true); if (F(s).OATH == null) Store.set('OATH', F(s).OATH_KNOT ? 1 : 0); },
        text: (s) => {
          const t = [
            'Midnight is an hour away. The Hearth, as you pass it, is a blue tongue the height of a hand. Nobody says anything about it. Marrow does not look at it.',
          ];
          if (F(s).REFUSED_OATH) t.push({ speaker: 'Marrow', text: 'You did not swear. Then you are not part of the Sealing, and I cannot bring you. Mere left a door on the stair for people who were not asked. I will not tell you where it is.' }, 'She goes down with the lantern and the child and does not look back. It is not unkind. It is a woman who has stopped arguing with anyone, including herself.');
          else if (F(s).OATH === 2) t.push('She reads the oath once, on the top step, rolls it, and puts it in her sleeve.', { speaker: 'Marrow', text: 'Sworn. Good. Then you come.' }, { text: 'She notices nothing. That is its own kind of grief.', cls: 'whisper' });
          else t.push('She reads the oath once, on the top step, and for a moment her hand rests on the scroll the way it might rest on a head.', { speaker: 'Marrow', text: 'Sworn to the Chair. Good. Then you come — all of you, to the end of it.' });
          t.push({ speaker: 'Wren', text: 'Right. Who\'s carrying the lamp? Not me, I\'m the — what am I again? The occasion.' });
          if (F(s).WREN_HURT) t.push('Wren\'s arm is still strapped from the Vault. Wren has not mentioned it once, which is how you know it hurts.');
          if (F(s).VANE_ACCEPT) t.push({ text: 'The Envoy\'s word sits in the room like a coin nobody has spent yet.', cls: 'whisper' });
          t.push('Marrow lifts the lantern and goes down first. Wren goes after. The four of you follow, because that is what you do.');
          return t;
        },
        next: 'ch5_descent', button: 'Down',
      },
      ch5_descent: {
        art: 'ch5_foundations', mood: 'dread', fx: 'dust', sfx: 'step',
        text: [
          'The stair is older than the school. It goes down past the cellars, past the cisterns, past the place where the mortar changes colour and the stones stop being *cut* and start being *found*.',
          'The foundations. The whole of Thornhallow stands on these, and these stand on nothing anyone has named.',
          'Far below, a light that is not fire. Blue. Steady. Like a sky seen from the wrong side.',
          'Somewhere above, boots. Vane\'s soldiers are on the stair behind you — you can hear them, if you are the sort who hears boots.',
          { speaker: 'Marrow', text: 'Mere warded this stair. Her gates do not lie. They do not play fair either. Read carefully, and read *together*.' },
          'Cut into the first landing, worn by four hundred years of descending feet, a word.',
        ],
        next: 'ch5_attune', button: 'Read it',
      },
      ch5_attune: {
        type: 'code', art: 'ch5_foundations', mood: 'dread', fx: 'dust',
        text: ['The word, and the mark beside it. Every phone. Read your Sight; say nothing until all four pages have turned.'],
        roles: 'Warden of the Hearth (keyboard): **The Reader**. Voice (reads aloud): **The Listener**.', sightSeconds: 90,
        next: (s) => F(s).REFUSED_OATH ? 'ch5_door' : 'ch5_gates',
      },
      /* ---------- Mere's door (only if the oath was refused) ---------- */
      ch5_door: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 3, cold: 0.3 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_door', par: [3, 5],
        text: [
          'Marrow\'s lantern goes on down without you, and the dark closes over where it was.',
          'Then, at the first landing, a draught that smells of cold water — and in the wall, three shapes over a ring of four slots. Mere\'s door. For people who were not asked.',
        ],
        config: () => ({
          title: 'MERE\'S DOOR', note: 'Three shapes are carved above the ring:', html: G.inscription(DOOR, { showMark: false }),
          slots: 4, glyphs: glyphPalette(), answer: { 2: 'ASH', 3: 'THORN', 4: 'WELL' }, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          wrongText: 'The wall stays a wall. The ring forgets.',
        }),
        hints: ['The Seer knows where this ring begins, and which end of the carving the mark is on.', 'Upright, left to right, and sunwise from slot 2: *fire · a gate · down*.', 'ASH at 2, THORN at 3, WELL at 4; slot 1 empty. Then four hands.'],
        onSolve: () => { Store.note('You came down by Mere\'s door, unasked.'); },
        solvedText: ['The wall opens on the stair one flight below. Marrow\'s lantern, ahead, does not slow down.', { speaker: 'Wren', text: '*Told* you they\'d find it.', cls: 'whisper' }, 'Marrow says nothing. She knew.'],
        next: 'ch5_gates',
      },
      /* ---------- Gate 1 ---------- */
      ch5_gates: {
        art: 'ch5_gate', artParams: { n: 1 }, mood: 'tense', fx: 'dust',
        text: [
          { speaker: 'Marrow', text: 'Mere\'s gates. Three of them, and a grammar. She warded this stair against the Order, not against Wardens. Her gates break the rules in ways that are fair — if you know the rules.' },
          { speaker: 'Wren', text: 'So they\'re exams. Brilliant. I love exams. I\'ve never passed one.' },
          'The first gate: three shapes carved over a ring of five slots, and a scratch on the ring where the sigil begins. The shapes are worn almost smooth on the Hearth. Not on every page.',
        ],
        next: 'ch5_gate1', button: 'The Turned Gate',
      },
      ch5_gate1: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 1 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate1', par: [4, 7],
        text: [
          'Three shapes, five slots. Which way is the carving read, and which way round the ring does it go? Two questions, and two Laws that do not agree.',
          { text: 'Say what you see. Never show your phone.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE TURNED GATE', note: 'Three shapes are carved above the ring, left to right:', html: G.inscription(GATE1, { showMark: false }),
          slots: 5, glyphs: glyphPalette(), fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          check: (m) => {
            const filled = Object.keys(m).filter(k => m[k]).length;
            if (m[1] === 'WELL' && m[5] === 'VEIL' && m[4] === 'EMBER' && filled === 3) return true;
            if (m[1] === 'CROWN' && m[2] === 'KNOT' && m[3] === 'THORN') return 'Frost — slow, patient, as if the gate had heard that reading before. It was carved for those coming UP. Read it the way it was cut.';
            if (m[1] === 'WELL' && m[2] === 'VEIL' && m[3] === 'EMBER') return 'The right words, the wrong way round the ring. Two Laws disagree here, the Binder. Which is older?';
            if (m[1] === 'WELL' && m[5] === 'VEIL' && m[4] === 'EMBER') return 'Nearly. The gate wants three glyphs and nothing else in the ring.';
            return 'Frost creeps over the ring. It resets.';
          },
        }),
        hints: ['Which end is the mark on, the Seer?', 'Turned means inverted, right to left — and the older Law says *widdershins* from the mark.', 'WELL at 1, VEIL at 5, EMBER at 4. Slots 2 and 3 empty. Then four hands.'],
        onSolve: (s, r) => { Store.note('The Turned Gate: read turned, placed widdershins.' + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : '')); },
        solvedText: [
          'The gate does not open so much as forget it was ever shut. Mere\'s grammar: turned, and widdershins, and the older Law binds.',
          { speaker: 'Marrow', text: 'Good. She would have liked you. She did not like many people.' },
          { speaker: 'Wren', text: 'Down, hidden, kept. Cheerful woman, Mere.' },
        ],
        next: 'ch5_marches',
      },
      /* ---------- the Map turns over ---------- */
      ch5_marches: {
        art: 'ch5_marches', mood: 'wonder', fx: 'motes', sfx: 'reveal', flame: 0.28,
        text: [
          'The stair ends at a ledge, and the world ends with it.',
          'Below: the Under-Marches. A cavern the size of a county. The drowned First Hall stands to its arches in black water, and above it, on a shelf of stone, four thrones — empty, all facing the same way.',
          'And under all of it, glowing like a sky seen from beneath, the Cold.',
          { text: 'The Map turns over. Thornhallow was never the world. It was the lid.', cls: 'whisper' },
          { speaker: 'Wren', text: 'Four thrones. Four Founders. It\'s a *theme*.' },
          'Wren\'s voice is very light. Wren is standing a little closer to the edge than anyone would like.',
          { speaker: 'Marrow', text: 'The Founders\' road goes down from here to the bell-chamber. The second gate first. Come away from the edge, love.' },
        ],
        next: 'ch5_gate2_intro', button: 'The second gate',
      },
      ch5_gate2_intro: {
        art: 'ch5_gate', artParams: { n: 2, cold: 0.5 }, mood: 'tense', fx: 'dust',
        text: [
          'The second gate stands where the road leaves the ledge. Five shapes carved over five slots — and above the shapes, five small bells, green with age.',
          'The flames in the gate\'s sconces gutter too fast to count. If the bells are still saying anything, the Hearth cannot hear it.',
          { speaker: 'Marrow', text: 'The Silent Gate. The Founders muted its bells; only the strike-counts remain. And one of the five is a glyph the Order says is never written. Mind the Law on that.' },
        ],
        next: 'ch5_gate2', button: 'The Silent Gate',
      },
      ch5_gate2: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_gate', artParams: { n: 2, cold: 0.5 }, mood: 'tense', fx: 'dust', puzzleId: 'ch5_gate2', par: [4, 7],
        text: (s) => [
          'Five shapes, five slots, and a scratch where the ring begins. The bells are silent on the Hearth. Somebody in the room can still count them.',
          law0(s) ? { text: 'One slot may have to stay empty. Or not. The Binder has two Laws about that, written two hundred years apart, and they do not agree.', cls: 'whisper' } : { text: 'One slot may have to stay empty. The Binder has a Law about that. Ask what it says — and what it was written over.', cls: 'whisper' },
        ],
        config: (s) => ({
          title: 'THE SILENT GATE', note: 'Five shapes carved above the ring, left to right; five muted bells above them:', html: G.inscription(GATE2, { showMark: false }),
          slots: 5, glyphs: glyphPalette(), allowEmpty: true, fourHands: true,
          fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to close it',
          check: (m) => {
            const base = m[1] === 'WELL' && m[2] === 'ASH' && m[4] === 'CROWN' && m[5] === 'KNOT';
            if (base && !m[3]) return true;
            if (base && m[3] === 'COLD') { if (law0(s)) return true; return 'Frost, thick and sudden, over the third slot alone — the gate will not take that glyph from one Book. The Binder: what does the Order say is done with it?'; }
            if (base) return 'Four of five sit right. The slot on the mark is the one the Order says is never written — what does the Book say to do with it?';
            if (m[1] === 'CROWN' && m[2] === 'ASH' && m[4] === 'KNOT' && m[5] === 'WELL') return 'Read right, placed from the wrong slot. The gate begins where the mark is — The Seer has it — and the bells say how far from it each glyph sits.';
            if (m[3] && m[3] !== 'COLD') return 'The slot on the mark takes one glyph only, and the Order says it takes none. Frost.';
            return 'Frost creeps over the ring. It resets.';
          },
        }),
        hints: ['The Listener counts the bells — one bell per shape, first to fifth. A bell\'s count is its slot, counted sunwise from the mark.', 'The first slot from the mark is the one that is never written — The Binder\'s Law 6 says why. The Seer has the mark.', (s) => law0(s) ? 'WELL at 1, ASH at 2, slot 3 empty — or COLD at 3, written by four hands — CROWN at 4, KNOT at 5.' : 'WELL at 1, ASH at 2, slot 3 empty, CROWN at 4, KNOT at 5. Then four hands.'],
        onSolve: (s, r) => { const cold = r && r.map && r.map[3] === 'COLD'; Store.set('GATE2_COLD', !!cold); Store.note(cold ? 'The Silent Gate: you wrote COLD with four hands.' : 'The Silent Gate: you left the cold slot empty.'); },
        solvedText: (s, r) => r && r.map && r.map[3] === 'COLD' ? [
          'You wrote the glyph that is never written, with four hands on the cold slot — and the gate took it, the way a door takes a key that was cut for it.',
          { speaker: 'Marrow', text: 'That is not in the Order\'s Book.' },
          { speaker: 'Wren', text: 'It\'s in Mere\'s, apparently.' },
          'Marrow looks at the empty air where the fourth hand was, and then at Wren, and says nothing at all.',
        ] : [
          'The empty slot. The gate counts five and finds four, and opens anyway — the way it has opened for the Order for four hundred years.',
          { speaker: 'Wren', text: 'A gap in the middle. Very tasteful. I\'d have written something.' },
          'Something on the stair is very quiet about that.',
        ],
        next: 'ch5_count_intro',
      },
      /* ---------- Gate 3: the Founders' Count ---------- */
      ch5_count_intro: {
        art: 'ch5_gate', artParams: { n: 2, cold: 0.6 }, mood: 'tense', fx: 'motes',
        text: [
          'The third gate is not a door. It is a count.',
          { speaker: 'Marrow', text: 'Mere\'s last ward. It asks each Sighting one question, and wants one number from the four of you. She built it so that no one person could answer it. She did not trust one person. Ever.' },
          'Each phone will ask you for a **digit** — a job of forty-five seconds. When it is done, say your digit aloud in seat order, the Reader first, and the Warden types the four digits as one number.',
          { text: 'Every phone: open SPEAK and find *The Founders\' Count*. Do not press Start until the Hearth says START.', cls: 'whisper' },
        ],
        next: 'ch5_count_start', button: 'Everyone has the page — count us in',
      },
      ch5_count_start: {
        type: 'custom', art: 'ch5_gate', artParams: { n: 2, cold: 0.6 }, mood: 'tense', fx: 'motes',
        text: ['Thumbs over Start. On START, everyone presses together.'],
        run: (box, api) => new Promise((resolve) => {
          const big = UI.el('div', { class: 'ch5-count', text: '' });
          const sub = UI.el('div', { class: 'ch5-count-sub', text: 'Thumbs over Start.' });
          box.appendChild(big); box.appendChild(sub);
          api.button('Count us in — 3, 2, 1', () => {
            UI.clear(api.actions);
            const seq = ['3', '2', '1', 'START'];
            seq.forEach((t, i) => setTimeout(() => {
              if (!api.alive()) return;
              big.textContent = t; big.classList.toggle('go', t === 'START'); Audio.sfx(t === 'START' ? 'chime' : 'tick');
              if (t === 'START') {
                sub.textContent = 'Forty-five seconds. Then four digits, in seat order.';
                const c = UI.countdown(box, 45); c.promise.then(() => { if (api.alive()) { big.textContent = 'TIME'; big.classList.remove('go'); Audio.sfx('chime'); } });
                api.button('The digits are in', () => { c.cancel(); resolve('ch5_count'); }, 'primary');
              }
            }, i * 1000));
          }, 'primary');
        }),
      },
      ch5_count: {
        type: 'puzzle', puzzle: 'answer', art: 'ch5_gate', artParams: { n: 2, cold: 0.6 }, mood: 'tense', fx: 'motes', puzzleId: 'ch5_count', par: [1.5, 4],
        text: ['Four digits, one number. Seat order: Reader, Listener, Seer, Binder. A wrong digit is nobody\'s fault and everybody\'s job.'],
        config: () => ({
          title: 'THE FOUNDERS\' COUNT', note: 'The Reader · the Listener · the Seer · the Binder — four digits, as one number.',
          fields: [{ label: 'the count', placeholder: '· · · ·', len: 4 }], submitText: 'Count',
          accept: (v) => v[0] === '3524',
          onWrong: (v) => { const w = v[0] || ''; if (w.length !== 4 || /\D/.test(w)) return 'Four digits, and only digits.'; let n = 0; for (let i = 0; i < 4; i++) if (w[i] === '3524'[i]) n++; return n === 0 ? 'The gate counts, and disagrees with all four of you.' : `The gate counts ${n === 1 ? 'one digit' : n + ' digits'} true, and does not say which.`; },
        }),
        hints: ['Each phone yields one digit. Seat order: Reader\'s first, then the Listener, then the Seer, then the Binder. If one is doubted, that phone can count again.', 'The Reader counts glyphs that read EMBER — the Crown turned. The Listener counts the *lower* bell\'s strikes. The Seer counts hollow stones. The Binder counts oaths whose lock is KNOT or EMBER — Law 12.', 'Three, five, two, four: **3524**.'],
        onSolve: (s, r) => { Store.note('The Founders\' Count: 3524' + (r && r.tries > 1 ? ' (' + r.tries + ' tries)' : '')); },
        solvedText: [
          'Three, five, two, four. The count closes, and the gate is simply not there any more.',
          { speaker: 'Wren', text: 'I got two. I mean, I didn\'t get anything, I don\'t have a phone. But I\'d have got two.' },
          { speaker: 'Marrow', text: 'Four questions, four eyes, one answer. That was the whole of Mere. Come.' },
        ],
        next: 'ch5_soldiers',
      },
      /* ---------- the soldiers ---------- */
      ch5_soldiers: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash', sfx: 'boom',
        text: (s) => [
          'Boots on the stair above, no longer bothering to be quiet. Torchlight on the shaft wall, coming down in a line.',
          'A voice, carrying the whole height of the stair:',
          { speaker: 'Vane\'s captain', text: 'Provost! The Envoy asks you to stop where you are. He would rather ask than order.' },
          { speaker: 'Marrow', text: 'Then the Envoy can ask the stair.' },
          F(s).DOOR === 'FIGHT' ? { text: 'The ward you flared at the Tower door told them where to look. They are closer than they should be.', cls: 'whisper' } : { text: 'They are three flights up and coming.', cls: 'whisper' },
          { text: 'In five heartbeats the Hearth will ask you something, and it will not wait long.', cls: 'omen' },
        ],
        next: 'ch5_stair', button: 'Ready',
      },
      ch5_stair: {
        type: 'choice', choice: 'STAIR', art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        prompt: 'The soldiers reach the stair.',
        timer: 45, timerText: '*Forty-five heartbeats.*',
        enter: (s) => { /* DOOR=FIGHT shortens the choice; the scene's timer is patched at enter */ const sc = Game.scenes.ch5_stair; if (F(s).DOOR === 'FIGHT') { sc.timer = 30; sc.timerText = '*Thirty heartbeats. The flared ward has cost you fifteen.*'; } else { sc.timer = 45; sc.timerText = '*Forty-five heartbeats.*'; } },
        timeout: 'run',
        text: [{ text: 'Three things can be done with a stair.', cls: 'center' }],
        options: [
          { id: 'collapse', text: 'COLLAPSE THE STAIR — a quick sigil, one hand: fire, and its absence.', sub: 'Nobody follows. Something will crack.', next: 'ch5_collapse', note: 'You chose to collapse the stair.' },
          { id: 'hold', text: 'HOLD THE STAIR WITH A THREAD — a held thread needs a living anchor.', sub: 'One of you stays. Their Sight pays for it, for a while.', next: 'ch5_hold_ask', note: 'You chose to hold the stair with a thread.' },
          { id: 'run', text: 'RUN — the Founders\' road, now.', sub: 'They follow.', next: 'ch5_run', note: 'You ran for the Founders\' road.' },
        ],
      },
      /* ---------- COLLAPSE ---------- */
      ch5_collapse: {
        type: 'puzzle', puzzle: 'ring', art: 'ch5_stair', artParams: { broken: false }, mood: 'tense', fx: 'ash', puzzleId: 'ch5_collapse', par: [1, 2],
        text: [
          'The quick sigil. Two slots cut into the newel, one hand — there is no time for four. Fire, and the absence of fire.',
          { text: 'The Binder has one thing to say before it is written. Let the Binder say it. Then write.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE COLLAPSE — ONE HAND', note: 'Two slots. The Warden places both. No ritual; there is no time.',
          slots: 2, glyphs: glyphPalette(), answer: { 1: 'ASH', 2: 'COLD' }, fourHands: false, submitText: 'Write it',
          wrongText: 'The newel stays whole. Boots, closer.',
        }),
        hints: ['Two glyphs: the flame, and the flame turned.', 'ASH first, then COLD. Sunwise from slot 1.', 'ASH at 1, COLD at 2. One hand. No four hands.'],
        onSolve: () => { Store.set('STAIR', 'COLLAPSE'); Store.set('PRECRACKED', true); Store.set('BELLS_CRACKED', 1); Store.set('VOLUNTEER', 0); Store.set('SOLDIERS', false); Store.note('You collapsed the stair. A bell cracked before the Bells began.'); },
        solvedText: [
          'The stair goes. Not the flight you are on — the one above, and the one above that, in a long stone sigh. Dust. Torches going out one by one, and shouting, and then not.',
          'Then, far above, through the whole height of the school, a bell answers the fall. One note, and a wrong one: the sound a bell makes when it cracks.',
          { speaker: 'Marrow', text: 'One bell. We will manage with three. Vane will come the long way, by the Founders\' road, and he will be late.' },
          { speaker: 'Wren', text: 'You wrote the cold one. With one hand.' },
          'Wren says it lightly. Wren is looking at the slot, not at anyone.',
        ],
        next: 'ch5_endcard',
      },
      /* ---------- HOLD ---------- */
      ch5_hold_ask: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: [
          'A held thread needs a living anchor: someone who stays on the stair, back to the wall, and holds it while the others go on. Their Sighting pays for it — for a while, not for ever. Marrow says she can tie it off before the bells are done.',
          { speaker: 'Marrow', text: 'I will not choose. Mere would not have either.' },
          { text: 'Every phone, now: open SPEAK. *Stay and hold? YES / NO.* Answer alone. Say nothing. Then each of you type your sealed word into the Hearth. The first YES, in seat order, holds the stair.', cls: 'whisper' },
          { text: 'Say what you see. Never show your phone.', cls: 'small' },
        ],
        next: 'ch5_hold', button: 'Every phone has answered',
      },
      ch5_hold: {
        type: 'token', art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: ['Four sealed words, in seat order. The Hearth answers only *Received*.'],
        prompt: 'Type each phone\'s sealed word.',
        slots: [0, 1, 2, 3].map(i => ({ label: nick(i), player: i, length: 4 })),
        decode: (tok, i) => S.decode(L.channel('hold', L.roles[i].id), tok, L.tokens.hold),
        badText: 'The fire does not know that word. Check the phone and try again.',
        stuckText: 'A sealed word is four letters, shown on the phone only after the answer is chosen. Type exactly what the phone shows.',
        onTokens: (values) => {
          const yes = values.map((v, i) => v === 'YES' ? i : -1).filter(i => i >= 0);
          Store.set('HOLD_YES', yes.length);
          if (yes.length) { Store.set('VOLUNTEER', yes[0] + 1); Store.set('STAIR', 'HOLD'); Store.set('SOLDIERS', false); Store.set('HOLD_NOBODY', false); Store.note(nick(yes[0]) + ' held the stair.' + (yes.length > 1 ? ' (' + yes.length + ' said yes.)' : '')); }
          else { Store.set('VOLUNTEER', 0); Store.set('STAIR', 'RUN'); Store.set('SOLDIERS', true); Store.set('HOLD_NOBODY', true); Store.note('Nobody would hold the stair. You ran.'); }
        },
        next: (s) => F(s).VOLUNTEER > 0 ? 'ch5_hold_named' : 'ch5_hold_none',
      },
      ch5_hold_named: {
        art: 'ch5_stair', mood: 'sorrow', fx: 'motes', sfx: 'seal',
        text: (s) => {
          const v = nick((F(s).VOLUNTEER || 1) - 1); const n = F(s).HOLD_YES || 1;
          const t = ['Received. Received. Received. Received.', 'The Hearth reads four words and says one name.', { text: `${v.toUpperCase()} WAS FASTER.`, cls: 'big' }];
          if (n > 1) t.push(`${n === 4 ? 'All four' : n === 3 ? 'Three' : 'Two'} of you said yes. ${v} said it first. Nobody will ever know who the others were, unless they say.`);
          else t.push(`One yes. It is not the kind of thing anyone has to say twice.`);
          t.push(`${v} sits down on the stair, back to the wall, and takes hold of something nobody else can see. ${v}'s page goes dark. What is on it now is a thread, and a job.`);
          t.push({ speaker: 'Marrow', text: 'I will tie it off before the third round of the bells. You have my word; it is worth what it is worth. Do not let go before that.' });
          t.push({ speaker: 'Wren', text: `${v}. Don't let go. I'll be — I'll be really annoyed.` });
          t.push(`Wren says it lightly. Wren stays a moment longer at ${v}'s side than the boots above allow, and then comes.`);
          return t;
        },
        next: 'ch5_endcard', button: 'The Founders\' road',
      },
      ch5_hold_none: {
        art: 'ch5_soldiers', mood: 'tense', fx: 'ash',
        text: [
          'Received. Received. Received. Received.',
          'The Hearth reads four words and says no name.',
          'Nobody stays. It is not cowardice; it is four people who each thought someone else would. Marrow does not say anything, which is worse.',
          'Then it is the third thing.',
        ],
        next: 'ch5_run', button: 'Run',
      },
      /* ---------- RUN ---------- */
      ch5_run: {
        art: 'ch5_marches', mood: 'tense', fx: 'ash', sfx: 'whoosh',
        enter: (s) => { if (F(s).STAIR !== 'RUN') { Store.set('STAIR', 'RUN'); Store.set('VOLUNTEER', 0); Store.note('You ran. The soldiers followed.'); } Store.set('SOLDIERS', true); },
        text: [
          'You run. The Founders\' road is wider than the stair and older, and it does not care who uses it.',
          'Behind you: boots, torches, a captain\'s voice. They follow. They will be in the bell-chamber when you are, or a little after, with shields.',
          { speaker: 'Wren', text: 'For the record, I said we should collapse it.' },
          'Nobody remembers Wren saying that.',
        ],
        next: 'ch5_endcard', button: 'The bell-chamber',
      },
      /* ---------- end card ---------- */
      ch5_endcard: {
        art: 'ch5_marches', mood: 'dread', fx: 'motes', flame: 0.25, sfx: 'chime',
        text: [
          { text: 'NEXT: THE BELLS.', cls: 'big' },
          { text: 'Hands on your keys.', cls: 'big' },
          { text: 'Nothing else tonight is faster than this.', cls: 'center' },
          { text: 'Four lanes, four keys, a strike line. The Hearth will show the shape of it and run one practice round before anything counts. If your hands are slow, say so: there is a slow-bells choice on the ready screen.', cls: 'small' },
        ],
        next: 'ch5_flow', button: 'The paths you walked',
      },
      ch5_flow: {
        type: 'flow', art: 'ch5_marches', mood: 'dread', fx: 'motes',
        text: ['The Founders\' road goes down. The bell-chamber is at the end of it, and the Hearth is a spark far above.'],
        flowTitle: 'Chapter V — the paths you walked',
        stats: (s) => {
          const st = F(s).STAIR; const v = F(s).VOLUNTEER;
          const stair = st === 'COLLAPSE' ? 'You collapsed the stair; **one bell cracked** before the Bells begin.' : st === 'HOLD' ? `**${nick(v - 1)}** holds the stair with a thread.` : 'You ran; **the soldiers follow**.';
          return stair + (F(s).GATE2_COLD ? ' You wrote COLD with four hands at the Silent Gate.' : '') + ` Hints so far: ${F(s).hintsTotal || 0}.`;
        },
        next: 'ch6_start', button: 'The Bells',
      },
    },
  });
})();
