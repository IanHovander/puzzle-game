/* Chapter VI — The Bells of Thornhallow */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  /* ---------- chapter-local CSS ---------- */
  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    #widget.ch6-bells .react-score { visibility: hidden; }
    #widget.ch6-bells .beat-counter { display: none; }
    #widget.ch6-dark .orb-chain { display: none; }
    #widget.ch6-dark .lanes { margin-top: 72px; }
    #widget.ch6-dark .ch6-beat { top: -2px; font-size: 64px; }
    .ch6-beat { position: absolute; left: 50%; top: 8px; transform: translateX(-50%); font-family: var(--display); font-size: 54px; color: var(--gold-2); text-shadow: 0 0 24px rgba(0,0,0,.9); z-index: 4; pointer-events: none; transition: transform .1s; line-height: 1; }
    .ch6-beat.small { font-size: 30px; top: 12px; color: rgba(242,210,122,0.75); }
    .ch6-beat.tick { transform: translateX(-50%) scale(1.15); }
    .ch6-ready { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; }
    .ch6-ready .ch6-rounds { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .ch6-ready .ch6-round { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: rgba(0,0,0,0.25); }
    .ch6-ready .ch6-round b { display: block; font-family: var(--display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
    .ch6-ready .ch6-round span { font-size: 15px; color: var(--ink-dim); }
    .ch6-ready .ch6-lanes { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .ch6-ready .ch6-lane { text-align: center; border-radius: 8px; padding: 8px 4px; border: 2px solid rgba(255,255,255,0.12); font-family: var(--display); font-size: 13px; letter-spacing: .08em; }
    .ch6-ready .ch6-lane.silent { opacity: .45; border-style: dashed; }
    .ch6-ready .ch6-lane .k { display: block; font-size: 26px; font-weight: 700; margin-top: 2px; }
    .ch6-ready .ch6-lane.p0 { border-color: var(--p1); } .ch6-ready .ch6-lane.p1 { border-color: var(--p2); } .ch6-ready .ch6-lane.p2 { border-color: var(--p3); } .ch6-ready .ch6-lane.p3 { border-color: var(--p4); }
    .ch6-ready .ch6-slow { grid-column: 1 / -1; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; background: rgba(79,179,191,0.05); }
    .ch6-ready .ch6-slow.on { border-color: var(--sea); background: rgba(79,179,191,0.14); }
    .ch6-ready .ch6-slow .btn { border-color: rgba(79,179,191,0.5); }
    .ch6-reading { border-left: 3px solid var(--gold); padding: 10px 16px; margin: 6px 0 10px; background: rgba(212,169,78,0.06); border-radius: 4px; }
    .ch6-reading .g { display: inline-flex; flex-direction: column; align-items: center; margin: 0 6px 6px 0; font-family: var(--display); font-size: 12px; letter-spacing: .08em; color: var(--gold-2); }
    .ch6-reading .g svg { width: 38px; height: 38px; }
    .ch6-reading .g i { font-style: normal; color: var(--ink-dim); font-family: var(--serif); font-size: 13px; letter-spacing: 0; }
  ` })); } catch (e) {}

  /* ---------- the Bells: scripts (design §6) ---------- */
  const LEAD = 2500;                                   // ms before beat 1
  const LANE = { B: 0, H: 1, O: 2, K: 3 };
  const ROUNDS = {
    1: { bpm: 70, title: 'ROUND ONE — SINGLES', script: 'B H O K B O H K · O B K H K O B H · H K B O O H K B' },
    2: { bpm: 76, title: 'ROUND TWO — CHORDS', script: 'B H (OK) B (KH) O (BH) K (OKB) H O (BK) H (OH) B (KHO) K O (BH) (BK) H (OB) K (ALL)' },
    3: { bpm: 60, title: 'ROUND THREE — THE DARK ROUND', script: 'O K B O (ALL) B K O (OK) B K (ALL) O B K (BK) O B (ALL) K O (OB) K (ALL)' },
  };
  const PRACTICE = { bpm: 70, script: 'B H O K (BH) (OK) (ALL) (ALL)' };
  function parseScript(str) {
    return str.trim().split(/\s+/).filter(t => t && t !== '·').map(tok => {
      if (tok === '(ALL)') return { lanes: [0, 1, 2, 3], kind: 'all' };
      if (tok[0] === '(') { const ls = tok.slice(1, -1).split('').map(c => LANE[c]).sort(); return { lanes: ls, kind: ls.length === 4 ? 'all' : 'brace' }; }
      return { lanes: [LANE[tok]], kind: 'single' };
    });
  }
  /* event n (1-based) falls on beat 2n-1: t = LEAD + beatMs*(2n-1) */
  function roundEvents(script, bpm) { const beatMs = 60000 / bpm; return parseScript(script).map((e, i) => Object.assign({ t: Math.round(LEAD + beatMs * (2 * i + 1)) }, e)); }
  const callWord = (e) => e.kind === 'all' ? 'ALL' : e.lanes.map(l => ['BOOK', 'HUSH', 'OWL', 'KNOT'][l]).join('+');
  const scriptWords = (script) => parseScript(script).map(callWord).join(' · ');

  const volunteerLane = (s) => { const v = s.flags.VOLUNTEER | 0; return v >= 1 && v <= 4 ? v - 1 : null; };
  const neighbourOf = (l, dead) => [l - 1, l + 1, l - 2, l + 2].filter(x => x >= 0 && x < 4 && !dead.includes(x))[0];
  const tempo = (s, bpm) => bpm * (s.flags.SLOW_BELLS ? 0.8 : 1);
  const win = (s, ms) => Math.round(ms * (s.flags.SLOW_BELLS ? 1.5 : 1));
  const crackedNow = (s) => Math.max(s.flags.BELLS_CRACKED | 0, s.flags.PRECRACKED ? 1 : 0);

  /* Our own beat overlay, anchored to the widget's GO (so a lead-in works and the count reads 1..48 on the beat). */
  function beatOverlay(opts) {
    setTimeout(() => {
      const react = document.querySelector('#widget .react'); if (!react) return;
      const big = react.querySelector('.react-big'); if (!big) return; const wrap = big.parentNode;
      const el = UI.el('div', { class: 'ch6-beat' + (opts.numbers ? '' : ' small'), text: '·' }); wrap.appendChild(el);
      let t0 = null, last = 0;
      const obs = new MutationObserver(() => { if (t0 == null && /GO|PRACTICE/.test(big.textContent)) { t0 = performance.now(); tick(); } });
      obs.observe(big, { childList: true, characterData: true, subtree: true });
      function tick() {
        if (!document.body.contains(el)) { obs.disconnect(); return; }
        requestAnimationFrame(tick);
        const now = performance.now() - t0; const b = Math.floor((now - opts.lead) / opts.beatMs);
        if (b < 1) { el.textContent = '·'; return; }
        if (b > opts.total) { el.textContent = ''; return; }
        if (b !== last) { last = b; el.textContent = opts.numbers ? String(b) : (b % 2 ? '●' : '○'); el.classList.add('tick'); setTimeout(() => el.classList.remove('tick'), 120); Audio.sfx(b % 2 ? 'tick' : 'step'); }
      }
    }, 60);
  }
  const widgetClass = (cls, on) => { const w = document.getElementById('widget'); if (w) w.classList.toggle(cls, !!on); };

  function bellCfg(s, n) {
    const R = ROUNDS[n]; const bpm = tempo(s, R.bpm); const beatMs = 60000 / bpm;
    const dead = n === 3 ? [1] : (volunteerLane(s) != null ? [volunteerLane(s)] : []);
    beatOverlay({ lead: LEAD, beatMs, total: 48, numbers: n === 3 });
    return {
      title: R.title + (s.flags.SLOW_BELLS ? ' · SLOW' : ''), laneNames: L.nicks.map((k, i) => n === 3 && i === 1 ? 'Voice' : k),
      events: roundEvents(R.script, bpm), fallMs: 1800, windowMs: win(s, 350), braceWindowMs: win(s, 300),
      target: 0.7, noFail: true, damage: 0.03, deadLanes: dead, dark: n === 3, bpm: n === 3 ? bpm : undefined, pulse: false,
    };
  }
  function roundSolve(n) {
    return (s, r) => {
      Store.set('BELLS_R' + n + '_HITS', r.hits); Store.set('BELLS_R' + n + '_TOTAL', r.total); Store.set('BELLS_R' + n + '_PASS', !!r.passed);
      if (!r.passed) { Store.set('BELLS_CRACKED', Math.min(3, crackedNow(s) + 1)); Store.set('BELLS_R' + n + '_CRACK', true); Store.note(`Round ${n} of the Bells fell short (${r.hits} of ${r.total}); a bell cracked.`); }
      else Store.note(`Round ${n} of the Bells held (${r.hits} of ${r.total}).`);
    };
  }
  function roundText(n, holdLines) {
    return (s, r) => {
      const pct = Math.round(r.ratio * 100);
      const out = [{ text: `${r.hits} of ${r.total} bells struck clean — ${pct} of every hundred.`, cls: 'big' }];
      if (r.passed) out.push(...holdLines);
      else {
        const c = s.flags.BELLS_CRACKED | 0;
        out.push('Not enough. The Cold pushes up through the pattern where the pattern was thin, and one of the four bells answers it with a flat, wrong note that goes on too long.');
        out.push({ text: c >= 3 ? 'Three bells cracked. There is no fourth to crack; the lid holds on the pattern alone.' : `A bell is cracked. ${c} of four.`, cls: 'whisper' });
        out.push('Marrow does not look up from the lid. "Again. The next one. You do not stop for a cracked bell; you ring the three that are left."');
      }
      return out;
    };
  }
  const roundHints = (n) => [
    'Watch the line, not the light: press as the light *crosses* it. Count aloud together — one-and-two-and — every second beat is a bell.',
    'The slow bells are on the ready screen — windows half again as wide, the tempo eased. Nothing is lost but a note on the chart. Missed bells never end the night; a missed round cracks one bell.',
    (s) => `The script is fixed and the same every time. Round ${n}, in order: ${scriptWords(ROUNDS[n].script)}.`,
  ];

  /* ---------- the Second Asking ---------- */
  const W = (s, role) => s.flags['WHISPER_' + role];
  const REPLY = {
    listener: { LOUD: 'You said loud. In the laundry. I let you.', NO: 'You said no. You were the only one who didn\'t flinch.' },
    seer: { TELL: 'You told me in the laundry. I thought you were being poetic.', NOTHING: 'You looked at the wall. You\'re looking at it now.' },
    reader: { TELL: '\'A small brave bird.\' Bookmoth. It isn\'t even in your alphabet.', DONTKNOW: 'You said you didn\'t know yet. Do you now?' },
    binder: { YES: 'You said yes. You see every thread in this room. Show me mine.', DONTKNOW: 'That was the kindest thing anyone said to me tonight.' },
  };
  const FALLBACK = { listener: 'You never answered me in the laundry, Hush. You\'re answering now.', seer: 'You never answered me in the laundry, Owl. You\'re answering now.', reader: 'You never answered me in the laundry, Bookmoth. You\'re answering now.', binder: 'You never answered me in the laundry, Knot. You\'re answering now.' };
  const TRUTH = { listener: 'NO', seer: 'TELL', reader: 'DONTKNOW', binder: 'DONTKNOW' };
  const wrenReply = (s, role) => { const v = W(s, role); return (REPLY[role][v]) || FALLBACK[role]; };
  const asked = (role, right, lead, wrongLead) => (s) => [
    (right ? lead : wrongLead) ? { text: right ? lead : wrongLead, cls: right ? undefined : 'whisper' } : null,
    { speaker: 'Wren, to ' + L.roleById(role).nick, text: wrenReply(s, role) },
  ].filter(Boolean);
  const askOpt = (id, text, role, right, next, lead, wrongLead) => ({ id, text, next, set: Object.assign({ ['ASK_' + role]: id }, right ? { CLUES: (s) => (s.flags.CLUES | 0) + 1 } : {}), after: asked(role, right, lead, wrongLead) });

  /* ---------- the Stone ---------- */
  const STONE = [{ shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const NAIVE = G.readNaive(STONE);   // ASH COLD CROWN KNOT THORN COLD EMBER VEIL
  const TURNED = G.readTurned(STONE); // KNOT CROWN ASH WELL VEIL EMBER ASH COLD
  const STONE_ANSWER = {}; TURNED.forEach((g, i) => { STONE_ANSWER[i + 1] = g; });
  const readingHtml = (names, glosses) => `<div class="ch6-reading">${names.map((n, i) => `<span class="g">${G.svg(n, { size: 38, color: '#f2d27a' })}${n}<i>${glosses[i]}</i></span>`).join('')}</div>`;
  const FOUNDERS_GLOSS = ['four-as-one', 'as one', 'fire', 'go down', 'behind', 'kept', 'the fire', 'a hollow'];

  /* ---------- flowchart, built at the end from what happened ---------- */
  function buildFlow(s) {
    const f = s.flags;
    const reply = (role) => { const v = W(s, role); const n = L.roleById(role).nick; if (!v) return n + ': no answer'; const short = { listener: { LOUD: '"I let you."', NO: '"You didn\'t flinch."' }, seer: { TELL: '"Poetic, I thought."', NOTHING: '"Still at the wall."' }, reader: { TELL: '"A brave bird."', DONTKNOW: '"Do you know now?"' }, binder: { YES: '"Show me mine."', DONTKNOW: '"The kindest thing."' } }; return n + ': ' + (short[role][v] || ''); };
    const c = f.BELLS_CRACKED | 0; const rounds = [1, 2, 3].filter(n => f['BELLS_R' + n + '_CRACK']);
    const crackLabel = rounds.length ? 'a bell cracked: round ' + rounds.join(', ') : (c ? 'a bell was cracked already' : 'a bell cracked');
    const nodes = [
      { id: 'ch6_start', label: 'The bell-chamber', col: 0, row: 1 },
      { id: 'ch6_ready', label: 'Hands on the keys', col: 1, row: 1 },
      { id: 'ch6_round1', label: 'The Bells — three rounds', col: 2, row: 1 },
      { id: 'ch6_crack', label: crackLabel, col: 2, row: 2, kind: 'end', secret: true, when: (st) => rounds.length > 0 || (st.flags.BELLS_CRACKED | 0) > 0 },
      { id: 'ch6_slow', label: 'You rang slowly', col: 2, row: 3, kind: 'choice', secret: true, when: (st) => !!st.flags.SLOW_BELLS },
      { id: 'ch6_ask_owl', label: reply('seer'), col: 3, row: 0, kind: 'choice' },
      { id: 'ch6_ask_hush', label: reply('listener'), col: 3, row: 1, kind: 'choice' },
      { id: 'ch6_ask_bookmoth', label: reply('reader'), col: 3, row: 2, kind: 'choice' },
      { id: 'ch6_ask_knot', label: reply('binder'), col: 3, row: 3, kind: 'choice' },
      { id: 'ch6_strip', label: '"I know, Mum." — the Stone', col: 4, row: 1 },
      { id: 'ch6_walk', label: 'The Fourfold Walk', col: 5, row: 0, kind: 'end', secret: true, when: (st) => !!st.flags.WALK_UNLOCKED },
      { id: 'ch7_start', label: 'One Born of Four', col: 5, row: 2, secret: true },
    ];
    const edges = [['ch6_start', 'ch6_ready'], ['ch6_ready', 'ch6_round1'], ['ch6_ready', 'ch6_crack'], ['ch6_ready', 'ch6_slow'],
      ['ch6_round1', 'ch6_ask_owl'], ['ch6_round1', 'ch6_ask_hush'], ['ch6_round1', 'ch6_ask_bookmoth'], ['ch6_round1', 'ch6_ask_knot'],
      ['ch6_ask_owl', 'ch6_strip'], ['ch6_ask_hush', 'ch6_strip'], ['ch6_ask_bookmoth', 'ch6_strip'], ['ch6_ask_knot', 'ch6_strip'],
      ['ch6_strip', 'ch6_walk'], ['ch6_strip', 'ch7_start']];
    void f;
    return { nodes, edges };
  }

  Game.addChapter({
    id: 'ch6', label: 'Chapter VI', title: 'The Bells of Thornhallow', start: 'ch6_start', code: 'WELL',
    mood: 'tense', fx: 'ash', art: 'ch6_chamber', flame: 0.22,
    flow: buildFlow(Store.state),
    buildFlow, // the labels depend on what was chosen; the epilogue rebuilds the chart from the saved night
    scenes: {
      /* ---------- the bell-chamber ---------- */
      ch6_start: {
        art: 'ch6_chamber', mood: 'tense', fx: 'ash', sfx: 'step', flame: 0.22,
        title: 'The bell-chamber',
        enter: (s) => { Store.set('BELLS_CRACKED', crackedNow(s)); if (s.flags.PRECRACKED == null && s.flags.STAIR === 'COLLAPSE') Store.set('PRECRACKED', true); widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const out = [
            'The Long Stair ends in a room that is mostly floor.',
            'Four bells hang from a beam of black iron, each the height of a person, each cast by a Founder and named for one. Beneath them the floor is a single round plate, riveted, faintly warm. You are standing on a lid.',
            'Under it, the Cold. You can feel it through your boots the way you feel a held breath.',
          ];
          if (s.flags.STAIR === 'COLLAPSE') out.push({ text: 'One bell is wrong already. When the stair came down, the shock ran along the beam and something inside Halvard\'s bell went *tang* instead of *tong*. It has a crack you could lose a fingernail in.', cls: 'whisper' });
          else if (s.flags.STAIR === 'RUN') out.push({ text: 'Somewhere above, boots on the Stair. They will be a while. The Stair is long, and they do not know what waits at the bottom.', cls: 'whisper' });
          else if (volunteerLane(s) != null) out.push({ text: `${nick(volunteerLane(s))}'s thread still runs up the Stair behind you, taut as wire, holding the way shut. ${nick(volunteerLane(s))} looks tired in a way that has nothing to do with the hour.`, cls: 'whisper' });
          return out;
        },
        next: 'ch6_shaft', button: 'Look up',
      },
      ch6_shaft: {
        art: 'ch6_shaft', mood: 'tense', fx: 'ash', flame: 0.2,
        text: [
          'Above the bells, a shaft goes straight up through the roots of the school, through the Vault and the Hall and four hundred years of masonry, to a coin of orange light very far away.',
          'The Hearth. You are looking at it from underneath, for the first time. The fire is lower than anyone alive has seen it — a blue tongue in an orange bed — and above it, dim and huge, the underside of the prophecy stone.',
          { text: 'Wren, beside you, looks up at it the way you might look up at your own house from the bottom of a well.', cls: 'whisper' },
          { speaker: 'Wren', text: 'Huh. It\'s smaller from down here. Everything is. Don\'t tell it I said that.' },
        ],
        next: 'ch6_marrow', button: 'The Provost',
      },
      ch6_marrow: {
        art: 'ch6_lid', mood: 'dread', fx: 'ash', flame: 0.2,
        text: [
          'Provost Marrow kneels at the centre of the lid, where the four bell-ropes meet an iron ring, and begins the Sealing: chalk, salt, and her seal pressed to the iron. CROWN. The Chair\'s mark.',
          'The lid shivers. Frost blooms out from the rivets in a breath and is gone; the bells hum with it, low, all four at once.',
          { speaker: 'Marrow', text: 'It knows. It always knows when someone kneels here. Listen to me, all four of you: the Cold will push while I work, and nothing holds it but the Founders\' pattern rung on these bells — by four hands, in time. Miss the pattern and it pushes further. Nothing worse than that. Ring it clean and I can close the wound.' },
          { speaker: 'Marrow', text: 'Hands on your keys. The bells of Thornhallow are ringing tonight, and you were told.' },
        ],
        next: 'ch6_attune', button: 'Attune',
      },
      ch6_attune: {
        type: 'code', art: 'ch6_lid', mood: 'dread', fx: 'ash', flame: 0.2,
        text: ['Cut into the rim of the lid, where the four ropes meet, a word worn nearly smooth by chalk and salt. Each of you: open your Companion and turn the page with it — and its mark.'],
        roles: 'Warden of the Hearth (keyboard): **all four keys**. Voice (reads aloud): **Hush**.', sightSeconds: 90,
        next: 'ch6_ready',
      },
      /* ---------- the ready screen ---------- */
      ch6_ready: {
        type: 'custom', art: 'ch6_chamber', mood: 'tense', fx: 'ash', flame: 0.2,
        title: 'Before anything counts',
        hints: roundHints(1), enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [
            'Four lanes, left to right: Bookmoth, Hush, Owl, Knot. A light falls down your lane; press your key as it crosses the line. Lights joined across lanes are a chord — those hands together, within a breath. A purple chain across every lane means everyone.',
            'Three rounds. Each round the pattern changes, and Hush will tell you how before it starts. Seven bells in ten hold the Cold; fewer than that cracks a bell — the night goes on either way.',
          ];
          if (v != null) out.push({ text: `${nick(v)}'s bell is silent for the first two rounds — ${nick(v)}'s Sight is up the Stair, holding a thread. ${nick(neighbourOf(v, [v]))}, take both keys: ${nick(v)}'s bells fall into your lane.`, cls: 'whisper' });
          out.push('First, a practice peal with these lanes. Nothing is at stake in it. Then the bells.');
          return out;
        },
        run: (box, api) => new Promise((resolve) => {
          const s = api.state; const v = volunteerLane(s);
          const wrap = UI.el('div', { class: 'pz' });
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE BELLS OF THORNHALLOW — READY' }));
          const grid = UI.el('div', { class: 'ch6-ready' });
          const rounds = UI.el('div', { class: 'ch6-rounds' });
          [['Round one', '70 to the minute · 24 bells · one hand at a time'], ['Round two', '76 to the minute · 24 bells · chords: two, three, all four'], ['Round three', '60 to the minute · 24 bells · the lights go dark; Hush\'s bell is the voice']].forEach(([a, b]) => rounds.appendChild(UI.el('div', { class: 'ch6-round', html: `<b>${a}</b><span>${b}</span>` })));
          grid.appendChild(rounds);
          const lanes = UI.el('div', { class: 'ch6-lanes' });
          for (let i = 0; i < 4; i++) lanes.appendChild(UI.el('div', { class: 'ch6-lane p' + i + (v === i ? ' silent' : ''), html: `${nick(i)}${v === i ? ' — silent, rounds 1–2' : ''}<span class="k">${window.VigilInput.keyLabel(i)}</span>` }));
          grid.appendChild(lanes);
          const slow = UI.el('div', { class: 'ch6-slow' + (s.flags.SLOW_BELLS ? ' on' : '') });
          const slowBtn = UI.el('button', { class: 'btn small', text: '' });
          const slowTxt = UI.el('span', { class: 'small', style: { fontSize: '15px', flex: '1 1 260px' }, html: '<strong>Slow bells</strong> — windows half again as wide, tempo eased to four-fifths. Costs nothing but a note on the chart. Choose it now, not later.' });
          const paint = () => { slow.classList.toggle('on', !!s.flags.SLOW_BELLS); slowBtn.textContent = s.flags.SLOW_BELLS ? 'Slow bells: ON' : 'Slow bells: off'; };
          slowBtn.addEventListener('click', () => { Store.set('SLOW_BELLS', !s.flags.SLOW_BELLS); if (s.flags.SLOW_BELLS && !s.flags.SLOW_NOTED) { Store.set('SLOW_NOTED', true); Store.note('You rang slowly.'); } paint(); Audio.sfx('click'); });
          slow.appendChild(slowTxt); slow.appendChild(slowBtn); paint();
          grid.appendChild(slow);
          wrap.appendChild(grid);
          wrap.appendChild(UI.el('p', { class: 'small', style: { marginTop: '12px' }, text: 'Hush: your Sight has the shape of every round, and the third round\'s whole script. Read it now; nobody else can.' }));
          box.appendChild(wrap);
          api.button('Practice peal', () => resolve('ch6_practice'), 'primary');
        }),
      },
      ch6_practice: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_chamber', mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_practice', replayable: true,
        text: ['Eight bells at seventy to the minute, with the real lanes. Singles, then two chords, then everyone, twice. Nothing is at stake; ring it until your hands know it.'],
        hints: roundHints(1), enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        config: (s) => {
          const bpm = tempo(s, PRACTICE.bpm); beatOverlay({ lead: LEAD, beatMs: 60000 / bpm, total: 16, numbers: false });
          return { practice: true, laneNames: L.nicks, events: roundEvents(PRACTICE.script, bpm), fallMs: 1800, windowMs: win(s, 350), braceWindowMs: win(s, 300), deadLanes: volunteerLane(s) != null ? [volunteerLane(s)] : [], pulse: false };
        },
        solvedText: (s, r) => [`${r.hits} of ${r.total}. ${r.hits === r.total ? 'Clean. Marrow, at the lid, almost smiles.' : r.hits >= r.total * 0.7 ? 'That would hold. Do it again if you want; the Cold is patient tonight.' : 'The bells do not mind a bad practice. Ring it again if you like — nothing counted.'}`, { text: 'When you are ready, the first round. Hush has the shape of it.', cls: 'whisper' }],
        next: 'ch6_round1', button: 'Ring the first round',
      },
      /* ---------- rounds ---------- */
      ch6_round1: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_round1', par: 3.5,
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        text: (s) => [
          'Marrow presses her seal to the iron and the lid answers with a long, low note that is not any of the bells.',
          { speaker: 'Marrow', text: 'Now. The first pattern. One hand at a time.' },
          `Twenty-four bells, one lane each, seventy to the minute${s.flags.SLOW_BELLS ? ' — eased' : ''}. Every second beat is a bell; the beats between are rests. Count them.`,
        ],
        config: (s) => bellCfg(s, 1),
        hints: roundHints(1),
        onSolve: roundSolve(1),
        solvedText: roundText(1, ['The pattern holds. The frost at the rivets stops a hand\'s breadth from Marrow\'s knees and goes no further.', { speaker: 'Marrow', text: 'Good. Do not get proud. The second is chords.' }]),
        next: 'ch6_round2', button: 'The second round',
      },
      ch6_round2: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', mood: 'tense', fx: 'ash', flame: 0.18, puzzleId: 'ch6_round2', par: 3.5,
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        text: (s) => [
          'The Cold pushes back. The lid lifts — a finger\'s width, no more — and settles, and every bell on the beam says something about it.',
          { speaker: 'Marrow', text: 'Chords. Two hands, three, all four. Together means *together*: within a breath of each other, or the bell does not sound.' },
          `Twenty-four bells at seventy-six${s.flags.SLOW_BELLS ? ', eased' : ''}. The last one is everyone.`,
        ],
        config: (s) => bellCfg(s, 2),
        hints: roundHints(2),
        onSolve: roundSolve(2),
        solvedText: roundText(2, ['The lid settles and stays settled. Marrow\'s chalk lines have joined into a ring, and inside the ring the iron is warm.', { speaker: 'Marrow', text: 'One more. The last pattern is the Founders\' own, and they did not ring it by sight.' }]),
        next: 'ch6_tieoff', button: 'The last round',
      },
      ch6_tieoff: {
        art: 'ch6_chamber', mood: 'dread', fx: 'ash', flame: 0.16,
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [];
          if (v != null) {
            out.push(`Marrow reaches up without looking and takes hold of something none of the rest of you can see — ${nick(v)}'s thread, where it runs past her into the dark of the Stair — and ties it off to the iron ring with one turn of her wrist.`);
            out.push({ text: `${nick(v)}, your Sight comes back like blood into a numb hand. Open it. The rest of the chapter is yours again — and so is your bell.`, cls: 'whisper' });
          }
          out.push('Then Marrow does something to the lamps. There are no lamps. The chamber goes dark except for the coin of the Hearth far above, and the beat of the lid under your feet, which you can feel now more than hear.');
          out.push({ speaker: 'Marrow', text: 'The Founders rang the last pattern blind. One of them called it; three of them rang. Hush — your bell is the voice. Nobody in this room can see a light fall. You can see the script. Call it.' });
          out.push('The Hearth will count the beats aloud, one to forty-eight. Hush calls each bell two bells ahead — four beats, four seconds — in one word: **BOOK**, **OWL**, **KNOT**, or **ALL**. Bookmoth, Owl, Knot: press on the beat you were given. Sixty to the minute. The lights are gone. The line is still there.');
          return out;
        },
        next: 'ch6_round3', button: 'Ring it blind',
      },
      ch6_round3: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', mood: 'dread', fx: 'void', flame: 0.15, puzzleId: 'ch6_round3', par: 3.5,
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', true); },
        text: (s) => [`Twenty-four bells at sixty${s.flags.SLOW_BELLS ? ', eased' : ''}, on the odd beats: one, three, five. Hush calls; three hands ring. Nothing falls that you can see.`],
        config: (s) => bellCfg(s, 3),
        hints: [
          'Hush reads the list; the Hearth reads the count. A bell falls on every *odd* beat — one, three, five — so Hush calls the bell for beat five while the count says one.',
          'Ring on the count, not on the call: when Hush says OWL, Owl presses on the next odd beat after the one that is sounding. ALL is Bookmoth, Owl and Knot together. Slow bells ease the count to forty-eight to the minute.',
          (s) => `The dark round, in order (one bell every odd beat from beat 1): ${scriptWords(ROUNDS[3].script)}.`,
        ],
        onSolve: roundSolve(3),
        solvedText: roundText(3, ['The last chord goes on ringing after your hands have left the keys, and the lid under your feet stops beating.', 'The chamber comes back a little at a time: the beam, the bells, Marrow kneeling in a ring of chalk that has gone from white to gold.']),
        next: 'ch6_held', button: 'The Cold is held',
      },
      /* ---------- held ---------- */
      ch6_held: {
        art: 'ch6_chamber', mood: 'sorrow', fx: 'ash', flame: 0.15,
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const c = s.flags.BELLS_CRACKED | 0;
          const out = [
            c === 0 ? 'Four bells, whole, still humming. Marrow lays both hands flat on the iron and, for the first time tonight, lets her shoulders down.' : c === 1 ? 'Three bells humming and one hanging silent with its wound. Marrow lays both hands flat on the iron and, for the first time tonight, lets her shoulders down.' : `${c === 2 ? 'Two bells' : 'One bell'} still humming; the others hang with their cracks. Marrow lays both hands flat on the iron and, for the first time tonight, lets her shoulders down.`,
            { speaker: 'Marrow', text: 'It is held. Not sealed — held. The Sealing needs the last thing, and the last thing is not mine to do.' },
            'She stands. She looks at Wren, not the fire. She has done that all night, and you have all seen her do it, and only now does it look like what it is.',
            { speaker: 'Marrow', text: 'Now, love. Walk.' },
          ];
          return out;
        },
        next: 'ch6_asking', button: 'Wren',
      },
      /* ---------- the Second Asking ---------- */
      ch6_asking: {
        art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15,
        enter: (s) => { Store.set('CLUES', 0); Store.set('TRUTHS', ['reader', 'listener', 'seer', 'binder'].filter(r => W(s, r) === TRUTH[r]).length); },
        text: [
          'Wren does not walk. Wren looks at the four of you — properly, one at a time, the way Wren looks at a door before deciding which way to come through it.',
          { speaker: 'Wren', text: 'Before I do — I asked you all something in the laundry. I\'ll ask again. Out loud, this time. Look at me when you answer.' },
          { text: 'Four questions, each for the one whose gift it is. The table may argue. The one asked must answer.', cls: 'whisper' },
        ],
        next: 'ch6_ask_owl', button: 'Owl first',
      },
      ch6_ask_owl: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_OWL',
        text: [{ speaker: 'Wren', text: 'Owl. You see under things. Which way does my shadow fall?' }],
        prompt: 'Owl answers.',
        hints: ['Owl\'s page. Every chapter.', 'The under-layer of the dormitory, the vault, the study, this chamber: four shadows fall one way from every fire. One does not.', 'TOWARD THE FIRE.'],
        options: [
          askOpt('away', 'Away from the fire. Like everyone\'s.', 'seer', false, 'ch6_ask_hush', '', 'Wren glances at the coin of light overhead, and then at the floor by Wren\'s feet, and says nothing about it.'),
          askOpt('toward', 'Toward the fire.', 'seer', true, 'ch6_ask_hush', 'Wren nods once, as if a sum had come out.', ''),
          askOpt('none', 'You have no shadow.', 'seer', false, 'ch6_ask_hush', '', 'Wren looks down at the floor, where there is quite clearly a shadow, and lets it go.'),
        ],
      },
      ch6_ask_hush: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_HUSH',
        text: [{ speaker: 'Wren', text: 'Hush. You hear every heart in a room. Can you hear mine?' }],
        prompt: 'Hush answers.',
        hints: ['Hush\'s page. The heartbeats, every chapter.', 'Five names in the dormitory, nine Masters in the Hall, everyone on the Stair — one line on every page has always been flat.', 'NONE.'],
        options: [
          askOpt('loud', 'Loud.', 'listener', false, 'ch6_ask_bookmoth', '', 'Wren smiles at that, which is worse than if Wren had not.'),
          askOpt('faint', 'Faint. Far off.', 'listener', false, 'ch6_ask_bookmoth', '', 'Wren tilts a head, listening for it too, and does not find it either.'),
          askOpt('none', 'No. I have never heard it.', 'listener', true, 'ch6_ask_bookmoth', 'Wren breathes out, which is a thing Wren does, and has a pulse in it, which is not.', ''),
        ],
      },
      ch6_ask_bookmoth: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_BOOKMOTH',
        text: [{ speaker: 'Wren', text: 'Bookmoth. You read the old tongue now. What does my name mean?' }],
        prompt: 'Bookmoth answers.',
        hints: ['Bookmoth\'s page. The glossary, since the study.', 'The Vigil roll spells it WRENN in the older alphabet — and the lexicon\'s gloss for COLD already says the same word.', 'A HOLLOW — the space inside a bell.'],
        options: [
          askOpt('bird', 'A small bird. A brave one.', 'reader', false, 'ch6_ask_knot', '', 'Wren waits a moment longer, in case there is more, and there is not.'),
          askOpt('hollow', 'A hollow. The space inside a bell — the part that rings.', 'reader', true, 'ch6_ask_knot', 'Wren looks up at the four bells, and at the dark inside each of them, and back.', ''),
          askOpt('fire', 'A fire.', 'reader', false, 'ch6_ask_knot', '', 'Wren glances at the Hearth overhead and shakes a head, gently, as if correcting a much younger child.'),
        ],
      },
      ch6_ask_knot: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_KNOT',
        text: [{ speaker: 'Wren', text: 'Knot. You see the threads. Do I have one?' }],
        prompt: 'Knot answers.',
        hints: ['Knot\'s page. Wren\'s entry, every chapter.', '"No thread found. Not unbound — the knot itself." It has said that since the dormitory.', 'NONE.'],
        options: [
          askOpt('red', 'Red. An oath — to us.', 'binder', false, 'ch6_iknow', '', 'Wren holds out an arm, as if a thread might be seen on it, and the arm is only an arm.'),
          askOpt('grey', 'Grey. Grief.', 'binder', false, 'ch6_iknow', '', 'Wren looks past you at the Provost when you say grey, and does not argue.'),
          askOpt('none', 'None. Not unbound. The knot itself.', 'binder', true, 'ch6_iknow', 'Wren goes very still, the way the lid went still.', ''),
        ],
      },
      ch6_iknow: {
        art: 'ch6_lid', mood: 'sorrow', fx: 'ash', flame: 0.14,
        text: (s) => {
          const c = s.flags.CLUES | 0;
          return [
            { text: c === 4 ? 'Four answers. All four the ones Wren already knew.' : c === 0 ? 'Four answers. Wren heard every one of them, and forgave every one of them, and it changed nothing.' : `Four answers. ${c} of them the ones Wren already knew.`, cls: 'whisper' },
            'Then Wren turns — not to the four of you. To the woman kneeling in the chalk.',
            { speaker: 'Wren', text: 'I know, Mum. I\'ve known since the laundry. Tell them. You\'re allowed.' },
            'Marrow does not stand up. She tells it kneeling, because the child gave her permission and not because anyone cornered her, and that is the only way she could ever have told it.',
            { speaker: 'Marrow', text: 'It came out of the fire the night the Hearth guttered. I picked it up. I named it. I raised it to be —' },
            { speaker: 'Wren', text: 'Loved. Say it.' },
            { speaker: 'Marrow', text: 'Loved enough to walk back in.' },
          ];
        },
        next: 'ch6_stone', button: 'The stone',
      },
      /* ---------- the Stone ---------- */
      ch6_stone: {
        art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12,
        enter: () => { Store.note('Marrow confessed what came out of the fire.'); },
        text: [
          'Nobody says anything for a while. The Hearth, far above, gutters — and for a moment the shaft is full of a light that comes from below, blue, and the underside of the prophecy stone is lit from an angle nobody has ever lit it from.',
          { text: 'The fire has never been this low. Owl — the foot of the stone.', cls: 'big' },
          'Eight shapes, cut deep, in a line. The Order has read them from the Hall side, over the fire, for four hundred years, and the fire has hidden the foot of the stone every one of those years — the foot, where a carver puts the mark.',
          { text: 'Bookmoth has the shapes. Owl has the foot. Hush has the tune. Knot has the Law. Lay it on the strip the way it was carved.', cls: 'whisper' },
        ],
        next: 'ch6_strip', button: 'Read it',
      },
      ch6_strip: {
        type: 'puzzle', puzzle: 'ring', art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12, puzzleId: 'ch6_strip', par: [5, 9],
        text: [
          'The strip: eight slots in a line, one for each glyph of the reading. Lay the stone\'s reading on it — the first glyph *read* in slot 1, the last in slot 8 — in the order the mark says to read it, each shape read the way the mark says to read it.',
          { text: 'The Hearth shows the shapes as the Order shows them. It does not show the mark.', cls: 'whisper' },
        ],
        config: () => ({
          title: 'THE PROPHECY STONE', note: 'Eight shapes, left to right, as the Order has always read them:', html: G.inscription(STONE, { showMark: false }),
          slots: 8, layout: 'strip', glyphs: glyphPalette(), allowRepeat: true, fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to read it aloud',
          submitText: 'Read the stone',
          check: (m) => {
            const got = []; for (let i = 1; i <= 8; i++) got.push(m[i] || null);
            if (got.every((g, i) => g === TURNED[i])) return true;
            if (got.every((g, i) => g === NAIVE[i])) return 'Read upright, it says what the Order has said for four hundred years. The strip stays cold. Hush — does the tune agree with that? Owl — which end is the mark on?';
            if (got.every((g, i) => g === NAIVE.slice().reverse()[i])) return 'Right to left — but a turned line also inverts every glyph. Bookmoth: every shape reads as its other word.';
            if (got.every((g, i) => g === TURNED.slice().reverse()[i])) return 'Every glyph inverted — but a turned line is read from its mark, right to left. Slot 1 is the shape farthest from the mark.';
            if (got.some(g => !g)) return 'Eight shapes, eight slots. COLD is a glyph too, whatever the Order says; the stone shows the shape.';
            return 'The stone does not answer. Frost feathers across the strip and it clears.';
          },
        }),
        hints: [
          'Owl — the foot of the stone.',
          'Turned: right to left, every glyph flips — and a glyph keeps its place on the stone (Knot, Law 10). Hush — where is the rest?',
          'Slot 1 KNOT, slot 2 CROWN, slot 3 ASH, slot 4 WELL, slot 5 VEIL, slot 6 EMBER, slot 7 ASH, slot 8 COLD. Then four hands.',
        ],
        onSolve: (s) => {
          Store.set('WALK_UNLOCKED', true); Store.set('LAW0', true);
          if ((s.hintsUsed.ch6_strip || 0) >= 3) { Store.set('CLUES_HELP', true); Store.note('You read the stone with help.'); }
          Store.note('You read the prophecy stone the way it was carved. The Fourfold Walk is open.');
        },
        solvedText: [
          'Four hands. Above you the Hearth flares — not orange, not blue, white for the space of a breath — and the strip on the Hearth reads itself aloud in the lexicon\'s own words.',
          { text: 'KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD', cls: 'big' },
          { text: '"Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left."', cls: 'omen' },
        ],
        next: 'ch6_reading', button: 'Marrow',
      },
      ch6_reading: {
        art: 'ch6_stonefoot', mood: 'sorrow', fx: 'motes', flame: 0.12,
        text: (s) => [
          { text: 'Four went down. Not one born of four — four, as one. They wrote the cold glyph with four hands and came up grey, and the fire is only what they left behind. The stone has said so since the day it was cut. It was read from the wrong side.', cls: 'whisper' },
          'Marrow looks at it for a long time. When she speaks it is to the stone, not to any of you.',
          { speaker: 'Marrow', text: 'Both roads needed him loved. One road needed him alone. I chose the one that cost one, and told myself the one was not a person.' },
          { speaker: 'Marrow', text: 'The Order chose it before me. Two hundred and twelve years after the Founders, the seal failed, and four hands meant four Masters giving up their Sightings. The Convocation would not pay it. They struck the Law and called the rest grammar, and sent one Warden down, and the stone let them, because the fire had already covered its foot.' },
        ],
        next: 'ch6_open', button: 'The Book',
      },
      ch6_open: {
        art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.14,
        text: (s) => [
          { text: 'Knot, your Book turns a page by itself: *Four Masters, four Sightings. The Convocation would not pay it. They struck the Law and called it grammar.* Law 0 is written again, and it is older than Law 6.', cls: 'whisper' },
          { text: 'THE FOURFOLD WALK IS OPEN.', cls: 'big' },
          'Wren has been very quiet. Wren looks at the four of you, and at the lid, and at the shaft full of white light going orange again, and grins — the sideways one, the one from the dormitory door.',
          { speaker: 'Wren', text: 'Then ask me a third time. In there.' },
          s.flags.STAIR === 'RUN' ? { text: 'Far up the Stair, boots. Nearer than they were.', cls: 'whisper' } : { text: 'Far up the Stair, faint through four hundred years of stone, a door. Vane, and the Convocation behind him, coming the long way round.', cls: 'whisper' },
        ],
        next: 'ch6_flow', button: 'The night moves on',
      },
      ch6_flow: {
        type: 'flow', art: 'ch6_chamber', mood: 'hearth', fx: 'ash', flame: 0.12,
        enter: (s) => { Game.scenes.ch6_flow.flow = buildFlow(s); },
        text: ['The bells. The Asking. The stone, read from the right side at last. Midnight is a spark away.', { text: 'NEXT: THE COLD. Pass the keyboard by name. Nobody places two glyphs in a row.', cls: 'small' }],
        flowTitle: 'Chapter VI — the paths you walked',
        stats: (s) => {
          const r = (n) => s.flags['BELLS_R' + n + '_TOTAL'] ? `${s.flags['BELLS_R' + n + '_HITS']}/${s.flags['BELLS_R' + n + '_TOTAL']}${s.flags['BELLS_R' + n + '_PASS'] ? '' : ' ✕'}` : '—';
          return `**Bells:** ${r(1)} · ${r(2)} · ${r(3)}${s.flags.SLOW_BELLS ? ' (rung slowly)' : ''} · **cracked:** ${s.flags.BELLS_CRACKED | 0} of 3\n**Clues caught:** ${s.flags.CLUES | 0} of 4${s.flags.CLUES_HELP ? ' (with help)' : ''} · **Truths told in the laundry:** ${s.flags.TRUTHS | 0} of 4 · **Hints so far:** ${s.flags.hintsTotal || 0}`;
        },
        next: 'ch7_start', button: 'The Finale',
      },
    },
  });
})();
