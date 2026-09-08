/* Chapter VI — The Bells of Thornhallow */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio;
  const nick = L.nick;
  const glyphPalette = () => G.names.map(n => ({ id: n, svg: G.inner(n), label: n }));

  /* ---------- chapter-local CSS ---------- */
  try { (document.head || document.body).appendChild(Object.assign(document.createElement('style'), { textContent: `
    #widget.ch6-bells .react-meter { display: none; }
    #widget.ch6-bells .beat-counter { display: none; }
    #widget.ch6-bells .lanes { height: min(34vh, 260px); }
    #widget.ch6-bells .lanes.dark ~ .orb-chain { display: none; }
    #widget.ch6-dark .lanes { margin-top: 46px; }
    .ch6-rule { display: flex; gap: 18px; justify-content: center; align-items: center; flex-wrap: wrap; margin: 2px 0 0; font-family: var(--display); font-size: 13px; letter-spacing: .06em; color: var(--ink-dim); }
    .ch6-rule span { display: inline-flex; align-items: center; gap: 6px; }
    .ch6-rule svg { width: 30px; height: 24px; }
    .ch6-beat { position: absolute; left: 50%; top: 0; transform: translateX(-50%); font-family: var(--display); font-size: 44px; color: var(--gold-2); text-shadow: 0 0 24px rgba(0,0,0,.9); z-index: 4; pointer-events: none; transition: transform .1s; line-height: 1; }
    .ch6-beat.tick { transform: translateX(-50%) scale(1.15); }
    .ch6-ready { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .ch6-ready .ch6-lanes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .ch6-ready .ch6-lane { text-align: center; border-radius: 8px; padding: 6px 4px; border: 2px solid rgba(255,255,255,0.12); font-family: var(--display); font-size: 13px; letter-spacing: .08em; }
    .ch6-ready .ch6-lane.silent { opacity: .45; border-style: dashed; }
    .ch6-ready .ch6-lane .k { display: block; font-size: 22px; font-weight: 700; margin-top: 2px; }
    .ch6-ready .ch6-lane.p0 { border-color: var(--p1); } .ch6-ready .ch6-lane.p1 { border-color: var(--p2); } .ch6-ready .ch6-lane.p2 { border-color: var(--p3); } .ch6-ready .ch6-lane.p3 { border-color: var(--p4); }
    .ch6-ready .ch6-slow { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; border: 1px solid var(--line); border-radius: 10px; padding: 8px 12px; background: rgba(79,179,191,0.05); }
    .ch6-ready .ch6-slow.on { border-color: var(--sea); background: rgba(79,179,191,0.14); }
    .ch6-ready .ch6-slow .btn { border-color: rgba(79,179,191,0.5); }
    body[data-chapter="ch6"] .ring-pz .wheel-wrap { gap: 10px; }
    body[data-chapter="ch6"] .ring-pz .wheel.striplayout { width: min(660px, 96%); height: 150px; }
    body[data-chapter="ch6"] .ring-pz .pz-html { align-self: center; width: 100%; max-width: 660px; }
    body[data-chapter="ch6"] .ring-pz .palette-grid .glyph { width: 66px; height: 46px; }
    body[data-chapter="ch6"] .ring-pz .pz-note { white-space: normal; font-family: var(--serif); font-size: 15px; letter-spacing: 0; text-transform: none; line-height: 1.45; }
    @media (max-height: 820px) {
      #widget.ch6-bells .lanes { height: min(30vh, 210px); }
      body[data-chapter="ch6"] .ring-pz .wheel.striplayout { height: 100px; }
      body[data-chapter="ch6"] .ring-pz .pz-html svg { max-height: 56px; }
      body[data-chapter="ch6"] .ring-pz .palette-grid .glyph { width: 58px; height: 34px; font-size: 11px; }
      body[data-chapter="ch6"] .ring-pz .pz-note { font-size: 14px; }
    }
  ` })); } catch (e) {}

  /* ================= THE BELLS =================
     Two counted patterns and a practice peal. Lanes are R L S B, left to right.
     A token is a bell (the lanes that ring it); `x` before it is the Cold — pale blue lights that
     must NOT be answered (reaction.js `kind:'mimic'`, judged wrong on any press, right if ignored).
     A third of every pattern is Cold, so what the widget scores is lights answered right, not bells
     struck: a table that strikes all sixteen bells and rings the eight Colds with them scores 16 of 24.

     Verified by enumeration (scratchpad/v/bells-after.js, replaying reaction.js's own remap and judge):
       ROUND ONE  24 events = 16 bells (4 singles, 8 chords of two, 4 of all four) + 8 Cold.
         Every Cold falls on THREE lanes at once, so no single careful player can buy back a mashing
         table: pass mark 16.8/24 · four hands played right 24 · four mashing 16 · one careful and
         three mashing 16 · two careful and two mashing 16 — all fail. Three careful and one mashing
         is 18/24 and passes, which is the intended forgiveness. Drop any one lane 15/24 fails, and
         so does dropping any survivor on the volunteer branch (that lane silent, remapped onto a
         neighbour, who then covers both).
       ROUND THREE 32 beats, of which 24 sound: 16 bells (10 singles, 4 chords of two, 2 of all three)
         and 8 Cold. Lane 1 never rings — the Listener is the voice, so reaction.js's dead-lane remap
         is a no-op. EVERY sounding beat carries a number, 1 to 24, and the Listener calls all of them
         one beat early. Only the three role pages say which numbers are bells, one list each, and the
         eight numbers on nobody's list are the Cold.
         pass mark 16.8/24 · four hands with four pages 24 · press on every number called 16 ·
         drop the Reader, the Seer or the Binder 16 · one page only 11 to 12 — all fail.
       Neither round is *physically* four-handed: reaction.js binds keys to lanes and not to people,
       so three players can cover four keys. Round one is a declared reflex pass with a rule card and
       a practice peal (R10.26); round three is four-handed by information, which is the claim that holds. */
  const LEAD = 2500;                                   // ms from GO to beat 1
  const LANE = { R: 0, L: 1, S: 2, B: 3 };
  const ROUND1 = 'R xRSB S B xLSB L RS xRLB LB RLSB xRLS RL SB xLSB RB LS RLSB xRSB SB xRLB RL RLSB xRLS RLSB';
  const PRACTICE = 'R L S xRLS RS xRSB LB RLSB';
  /* One token per beat, 1 to 32. '.' is a silent beat. THIS STRING IS COPIED IN js/content/companion/ch6.js
     — the Listener's comb and the three bell-lists are derived from it there. Keep them identical. */
  const ROUND3 = '. R xRSB S . RS B xRSB R . SB xRSB S B . RSB xRSB R . RB S xRSB . B xRSB R SB . xRSB . xRSB RSB';

  const tok = (t) => { const m = t[0] === 'x'; const ls = (m ? t.slice(1) : t).split('').map(c => LANE[c]).sort(); return { lanes: ls, kind: m ? 'mimic' : ls.length === 1 ? 'single' : ls.length === 4 ? 'all' : 'brace' }; };
  /* a free-running pattern: one event every two beats */
  const evenEvents = (script, beatMs) => script.trim().split(/\s+/).map((t, i) => Object.assign({ t: Math.round(LEAD + beatMs * (2 * i + 1)) }, tok(t)));
  /* a counted pattern: the token's position IS its beat */
  const beatEvents = (script, beatMs) => { const out = []; script.trim().split(/\s+/).forEach((t, i) => { if (t !== '.') out.push(Object.assign({ t: Math.round(LEAD + beatMs * (i + 1)) }, tok(t))); }); return out; };

  const volunteerLane = (s) => { const v = s.flags.VOLUNTEER | 0; return v >= 1 && v <= 4 ? v - 1 : null; };
  const neighbourOf = (l, dead) => [l - 1, l + 1, l - 2, l + 2].filter(x => x >= 0 && x < 4 && !dead.includes(x))[0];
  const tempo = (s, bpm) => bpm * (s.flags.SLOW_BELLS ? 0.8 : 1);
  const win = (s, ms) => Math.round(ms * (s.flags.SLOW_BELLS ? 1.5 : 1));
  const crackedNow = (s) => Math.max(s.flags.BELLS_CRACKED | 0, s.flags.PRECRACKED ? 1 : 0);
  const widgetClass = (cls, on) => { const w = document.getElementById('widget'); if (w) w.classList.toggle(cls, !!on); };

  /* Something injected into the widget has to find it first: reaction.js builds its DOM inside a promise,
     so retry for about two seconds and say so in the console rather than failing silently. */
  function inWidget(fn) {
    let n = 0;
    (function attach() {
      const react = document.querySelector('#widget .react');
      if (!react) { if (n++ < 40) return setTimeout(attach, 50); return console.warn('ch6: the widget never appeared'); }
      fn(react);
    })();
  }
  /* The rule of the Bells, drawn, and left on screen for the whole round.
     reaction.js renders no rule card of its own (it emits hud, meter, lanes and the big countdown and
     reads no `note`), so the chapter injects one, the way the beat count is injected. */
  const ICON = {
    press: '<svg viewBox="0 0 30 24"><rect x="4" y="1" width="22" height="22" rx="3" fill="none" stroke="rgba(255,255,255,.3)"/><circle cx="15" cy="8" r="4.5" fill="#d4a94e"/><path d="M6,17 L24,17" stroke="rgba(255,255,255,.6)" stroke-width="2"/></svg>',
    chord: '<svg viewBox="0 0 30 24"><circle cx="8" cy="9" r="4.5" fill="#ff7a3d"/><circle cx="22" cy="9" r="4.5" fill="#ff7a3d"/><path d="M8,9 L22,9" stroke="#ff7a3d" stroke-width="2.5"/><path d="M2,18 L28,18" stroke="rgba(255,255,255,.6)" stroke-width="2"/></svg>',
    cold: '<svg viewBox="0 0 30 24"><circle cx="15" cy="10" r="5" fill="#8fb7d9"/><path d="M6,20 L24,2" stroke="#fff" stroke-width="2"/></svg>',
  };
  function ruleCard(parts) {
    inWidget((react) => {
      if (react.querySelector('.ch6-rule')) return;
      const el = UI.el('div', { class: 'ch6-rule', html: parts.map(([ic, tx]) => `<span>${ic ? ICON[ic] : ''}${tx}</span>`).join('') });
      const hud = react.querySelector('.react-hud');
      react.insertBefore(el, hud ? hud.nextSibling : react.firstChild);
    });
  }
  /* The count, for the dark round: the beat that has just landed, anchored to the widget's own GO. */
  function beatOverlay(beatMs, beats) {
    inWidget((react) => {
      const big = react.querySelector('.react-big'); if (!big) return console.warn('ch6: no countdown to anchor the beat to');
      const el = UI.el('div', { class: 'ch6-beat', text: '·' }); big.parentNode.appendChild(el);
      let t0 = null, last = -1;
      const obs = new MutationObserver(() => { if (t0 == null && /GO|PRACTICE/.test(big.textContent)) { t0 = performance.now(); tick(); } });
      obs.observe(big, { childList: true, characterData: true, subtree: true });
      function tick() {
        if (!document.body.contains(el)) { obs.disconnect(); return; }
        requestAnimationFrame(tick);
        const b = Math.floor((performance.now() - t0 - LEAD) / beatMs);
        if (b === last) return;
        last = b;
        if (b < 1) { el.textContent = '·'; return; }
        if (b > beats) { el.textContent = ''; return; }
        el.textContent = String(b);
        el.classList.add('tick'); setTimeout(() => el.classList.remove('tick'), 120);
        Audio.sfx('tick');
      }
    });
  }

  function litCfg(s) {
    const beatMs = 60000 / tempo(s, 88);
    const v = volunteerLane(s);
    ruleCard([['press', 'press on the line'], ['chord', 'joined lights, one breath'], ['cold', 'blue is the Cold — every hand off'], [null, 'seven lights in ten holds']]);
    return {
      title: 'THE PATTERN' + (s.flags.SLOW_BELLS ? ' · SLOW' : ''), laneNames: L.nicks,
      events: evenEvents(ROUND1, beatMs), fallMs: 1800, windowMs: win(s, 380), braceWindowMs: win(s, 320),
      target: 0.7, noFail: true, damage: 0.03, deadLanes: v != null ? [v] : [], pulse: false,
    };
  }
  function darkCfg(s) {
    const beatMs = 60000 / tempo(s, 60);
    beatOverlay(beatMs, 32);
    ruleCard([[null, 'the Hearth counts the beats'], [null, 'the Listener calls every number'], [null, 'if the number is yours, ring on the next beat'], ['cold', 'a number that is on no page is the Cold']]);
    return {
      title: 'THE DARK PATTERN' + (s.flags.SLOW_BELLS ? ' · SLOW' : ''),
      laneNames: L.nicks.map((k, i) => i === 1 ? 'Voice' : k),
      events: beatEvents(ROUND3, beatMs), fallMs: 1800, windowMs: win(s, 520), braceWindowMs: win(s, 420),
      target: 0.7, noFail: true, damage: 0.03, deadLanes: [1], dark: true, pulse: false,
    };
  }
  /* A round is scored, never lost: BELLS_CRACKED is a cost carried into ch7, not a dead end. */
  function roundSolve(n) {
    return (s, r) => {
      Store.set('BELLS_R' + n + '_HITS', r.hits); Store.set('BELLS_R' + n + '_TOTAL', r.total); Store.set('BELLS_R' + n + '_PASS', !!r.passed);
      if (!r.passed) { Store.set('BELLS_CRACKED', Math.min(3, crackedNow(s) + 1)); Store.set('BELLS_R' + n + '_CRACK', true); }
    };
  }
  /* The widget scores decisions, not strikes: a Cold answered by keeping still counts as much as a bell
     rung. So the line says lights answered right, and the failure text does not claim to know whether a
     light was a missed bell or a Cold that was rung. `again` is the round's own closing line — the dark
     pattern has no next one to send them back to. */
  function roundText(holdLines, again) {
    return (s, r) => {
      const out = [{ text: `${r.hits} of ${r.total} lights answered right. Seven in ten holds the lid.`, cls: 'whisper' }];
      if (r.passed) { out.push.apply(out, holdLines); return out; }
      const c = s.flags.BELLS_CRACKED | 0;
      out.push('Not enough. The Cold comes up through the gaps, and a bell answers it with a flat note that goes on too long.');
      out.push({ text: c >= 3 ? 'Three bells cracked. The lid holds on the pattern alone now.' : `A bell is cracked. ${c} of four.`, cls: 'whisper' });
      out.push({ speaker: 'Provost Marrow', text: again });
      return out;
    };
  }

  /* ---------- the Second Asking ----------
     Four one-of-one questions, each answerable from the asked player's own page since the dormitory.
     Wren's reply keys on the answer given AND restates the laundry answer it is a callback to. */
  const W = (s, role) => s.flags['WHISPER_' + role];
  const TRUTH = { listener: 'NO', seer: 'TELL', reader: 'DONTKNOW', binder: 'DONTKNOW' };
  const RIGHT = { seer: 'toward', listener: 'none', reader: 'hollow', binder: 'none' };
  const REPLY = {
    seer: { yes: (w) => 'Toward it. ' + (w === 'TELL' ? 'You said so in the laundry. I called you poetic.' : 'Six years, and you never said it out loud.'),
      no: () => 'Look down, some time when I am not standing here.' },
    listener: { yes: (w) => 'Nothing. ' + (w === 'NO' ? 'You said no in the laundry. You did not flinch.' : 'You have listened for it since we were seven.'),
      no: () => 'That was kind. It was not true, and I would rather have had the true one.' },
    reader: { yes: (w) => 'A hollow. The part of a bell that rings. ' + (w === 'TELL' ? 'Not a small brave bird, then.' : 'You found it in the study.'),
      no: () => 'That is what they call me. It is not what it says.' },
    binder: { yes: (w) => 'None. Not unbound. The knot itself. ' + (w === 'YES' ? 'You said yes in the laundry, to the one person with none.' : 'You have seen unbound people. I am not one.'),
      no: () => 'You are being kind again. Hold out your arm and look.' },
  };
  const wrenSays = (s, role) => ({ speaker: 'Wren', text: REPLY[role][s.flags['ASK_' + role] === RIGHT[role] ? 'yes' : 'no'](W(s, role)) });
  const askOpt = (id, text, role, right, next) => ({ id, text, next, set: Object.assign({ ['ASK_' + role]: id }, right ? { CLUES: (s) => (s.flags.CLUES | 0) + 1 } : {}) });

  /* ================= THE PROPHECY STONE =================
     Eight cuts along the foot of the stone. The fire has burned four of them away — cuts 1, 3, 5 and 7,
     numbered on the Hearth's own board as burns 1 to 4. The four that survive are public.

       READER   what the four burns were: a flame, a crown, a spike, a crown. Drawn on their side,
                so the page cannot say which way up any of them stood.
       SEER     which way each chisel went in: up, up, up, down.
       LISTENER the tune ends on a silence, and there is no silence anywhere before it.
       BINDER   the cold word is written, not left out. The older Law binds.

     The rule card states the ORDER's practice — leave the cold word out — so the Binder's page has
     something to overturn. The Hearth never says how many words go back, and never names a role in a
     wrong-answer line: those two leaks were what made the Binder and the Listener droppable.

     Enumerated (scratchpad/v/stone.js) over every board the rule card can produce — four burns x
     (4 shapes x 2 orientations) x 2 directions x the cold word written or left out = 13,981 boards:
       all four        -> 1   KNOT CROWN ASH WELL VEIL EMBER ASH COLD
       drop the Reader -> 36
       drop the Seer   -> 8
       drop the Listener -> 2  (the answer, and the Order's own reading — which is the decoy)
       drop the Binder -> 2  (the answer, and the answer with slot 8 left empty, which is what the
                              rule card alone tells a table to do — so a Binder-less table reads it wrong)
     No pair of pages gets below 4 boards; the best pair, Reader+Seer, still has 4.
     A wrong reading is not free: it cracks a bell (BELLS_CRACKED, the same currency the two patterns
     spend, read by ch7 and ch8), so neither binary fact can be flipped for nothing. */
  const STONE = [{ shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const BURNT = [0, 2, 4, 6];                          // the cuts the fire took (0-based)
  const NAIVE = G.readNaive(STONE);                    // ASH COLD CROWN KNOT THORN COLD EMBER VEIL
  const TURNED = G.readTurned(STONE);                  // KNOT CROWN ASH WELL VEIL EMBER ASH COLD
  const same = (got, want) => got.every((g, i) => g === want[i]);

  /* The board the room sees: four cuts as the carver left them, four scorched over and numbered. */
  function footStrip() {
    const cell = 74, w = 8 * cell + 30;
    let s = `<svg viewBox="0 0 ${w} 96" width="100%" style="max-width:${w}px;display:block;margin:0 auto">`;
    s += `<rect x="2" y="2" width="${w - 4}" height="92" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    let burn = 0;
    STONE.forEach((it, i) => {
      const x = 15 + i * cell + cell / 2;
      if (BURNT.indexOf(i) >= 0) {
        burn++;
        s += `<g transform="translate(${x},46)"><ellipse rx="26" ry="27" fill="#0d0a0c" opacity=".85"/><ellipse cx="-6" cy="-5" rx="17" ry="14" fill="#000" opacity=".6"/><ellipse cx="8" cy="7" rx="14" ry="11" fill="#000" opacity=".5"/><path d="M-20,16 L-6,-2 L4,10 L18,-12" fill="none" stroke="#3a3034" stroke-width="2"/></g>`;
        s += `<text x="${x}" y="88" text-anchor="middle" font-size="12" fill="#c98a4a" font-family="Cinzel,serif">burn ${burn}</text>`;
      } else {
        s += `<g transform="translate(${x},46) scale(1.15)" style="color:#c9bfae">${G.shapeInner(it.shape, it.inv)}</g>`;
      }
    });
    return s + '</svg>';
  }

  /* ---------- flowchart, built at the end from what happened ---------- */
  function buildFlow(s) {
    const f = s.flags;
    const SHORT = {
        seer: { toward: '"toward the fire"', away: '"away, like ours"', none: '"no shadow at all"' }, listener: { none: '"I have never heard it"', loud: '"loud"', faint: '"faint, far off"' },
        reader: { hollow: '"a hollow"', bird: '"a brave bird"', fire: '"a fire"' }, binder: { none: '"the knot itself"', red: '"red — an oath"', grey: '"grey — grief"' },
    };
    const said = (role) => L.roleById(role).nick + ': ' + (SHORT[role][f['ASK_' + role]] || 'no answer');
    const c = f.BELLS_CRACKED | 0; const rounds = [1, 3].filter(n => f['BELLS_R' + n + '_CRACK']);
    const broke = rounds.length + (f.STONE_MISREAD | 0);
    const crackLabel = broke ? (broke > 1 ? 'bells cracked' : 'a bell cracked') : (c ? 'a bell was cracked already' : 'a bell cracked');
    const nodes = [
      { id: 'ch6_start', label: 'The bell-chamber', col: 0, row: 1 },
      { id: 'ch6_ready', label: 'Hands on the keys', col: 1, row: 1 },
      { id: 'ch6_round1', label: 'The pattern', col: 2, row: 1 },
      { id: 'ch6_round3', label: 'The dark pattern', col: 2, row: 0 },
      { id: 'ch6_crack', label: crackLabel, col: 2, row: 2, kind: 'end', secret: true, when: (st) => broke > 0 || (st.flags.BELLS_CRACKED | 0) > 0 },
      { id: 'ch6_ask_owl', label: said('seer'), col: 3, row: 0, kind: 'choice' },
      { id: 'ch6_ask_hush', label: said('listener'), col: 3, row: 1, kind: 'choice' },
      { id: 'ch6_ask_bookmoth', label: said('reader'), col: 3, row: 2, kind: 'choice' },
      { id: 'ch6_ask_knot', label: said('binder'), col: 3, row: 3, kind: 'choice' },
      { id: 'ch6_strip', label: '"I know, Mum." — the stone', col: 4, row: 1 },
      { id: 'ch6_walk', label: 'The Fourfold Walk', col: 5, row: 0, kind: 'end', secret: true, when: (st) => !!st.flags.WALK_UNLOCKED },
      { id: 'ch7_start', label: 'One Born of Four', col: 5, row: 2, secret: true },
    ];
    const edges = [['ch6_start', 'ch6_ready'], ['ch6_ready', 'ch6_round1'], ['ch6_round1', 'ch6_round3'], ['ch6_round1', 'ch6_crack'],
      ['ch6_round3', 'ch6_ask_owl'], ['ch6_round3', 'ch6_ask_hush'], ['ch6_round3', 'ch6_ask_bookmoth'], ['ch6_round3', 'ch6_ask_knot'],
      ['ch6_ask_owl', 'ch6_strip'], ['ch6_ask_hush', 'ch6_strip'], ['ch6_ask_bookmoth', 'ch6_strip'], ['ch6_ask_knot', 'ch6_strip'],
      ['ch6_strip', 'ch6_walk'], ['ch6_strip', 'ch7_start']];
    return { nodes, edges };
  }

  Game.addChapter({
    id: 'ch6', label: 'Chapter VI', title: 'The Bells of Thornhallow', start: 'ch6_start', code: 'WELL',
    mood: 'tense', fx: 'ash', art: 'ch6_chamber', flame: 0.22,
    flow: buildFlow(Store.state),
    buildFlow, // the labels depend on what was said; the epilogue rebuilds the chart from the saved night
    scenes: {
      /* ---------- the bell-chamber ---------- */
      ch6_start: {
        art: 'ch6_chamber', mood: 'tense', fx: 'ash', sfx: 'step', flame: 0.22,
        title: 'The bell-chamber',
        // PRECRACKED must be seeded before the count is taken, or a fallen stair cracks a bell in the prose and in no flag.
        enter: (s) => { if (s.flags.PRECRACKED == null && s.flags.STAIR === 'COLLAPSE') Store.set('PRECRACKED', true); Store.set('BELLS_CRACKED', crackedNow(s)); widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const out = [
            'The Long Stair ends in a room that is mostly floor.',
            'Four bells hang from a beam of black iron, each the height of a person. Under them the floor is one round plate, riveted, faintly warm.',
            'You are standing on a lid. Under it, the Cold.',
            { text: 'Straight up through the ceiling goes a shaft, and at the top of it a coin of orange light. That is the Hearth, seen from underneath.', cls: 'whisper' },
            { speaker: 'Wren', text: 'Huh. It is smaller from down here. Do not tell it I said that.' },
          ];
          if (s.flags.STAIR === 'COLLAPSE') out.push({ text: 'One bell is wrong already. When the stair came down the shock ran along the beam, and the first bell went *tang* instead of *tong*.', cls: 'whisper' });
          else if (s.flags.STAIR === 'RUN') out.push({ text: 'Somewhere far above, boots on the Stair. They will be a while. The Stair is long.', cls: 'whisper' });
          else if (volunteerLane(s) != null) out.push({ text: `${nick(volunteerLane(s))}'s thread still runs up the Stair behind you, taut as wire, holding the way shut.`, cls: 'whisper' });
          return out;
        },
        next: 'ch6_marrow', button: 'The Provost',
      },
      ch6_marrow: {
        art: 'ch6_lid', mood: 'dread', fx: 'ash', flame: 0.2,
        text: [
          'Provost Marrow kneels at the middle of the lid, where the bell-ropes meet an iron ring. Chalk. Salt. Her seal pressed into the iron.',
          'The lid shivers. Frost blooms out of the rivets and is gone. All four bells hum with it.',
          { speaker: 'Provost Marrow', text: 'It knows. It always knows when somebody kneels here.' },
          { speaker: 'Provost Marrow', text: 'I can close this wound. While I work the Cold pushes, and nothing holds it but the old pattern, rung on these bells by four hands.' },
          { speaker: 'Provost Marrow', text: 'Miss it and the Cold pushes further. That is all that happens. Hands on your keys.' },
        ],
        next: 'ch6_attune', button: 'Attune',
      },
      ch6_attune: {
        type: 'code', art: 'ch6_lid', mood: 'dread', fx: 'ash', flame: 0.2,
        text: [
          { text: 'Cut into the rim of the lid, worn nearly smooth: a word, and a mark beside it.', cls: 'whisper' },
          { text: 'Open the Companion. Take your seat. Type the word and the mark.', cls: 'whisper' },
          { text: 'Read your **Speak** first. The bells come before the stone.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        next: 'ch6_ready',
      },
      /* ---------- the ready screen ---------- */
      ch6_ready: {
        type: 'custom', art: 'ch6_chamber', mood: 'tense', fx: 'ash', flame: 0.2,
        title: 'Before anything counts',
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [
            { text: 'Four lanes, one each, left to right. Press your key as your light crosses the line.', cls: 'whisper' },
            { text: 'Pale blue lights are the Cold. Every hand off the keys.', cls: 'whisper' },
            { text: 'Two patterns. Get seven lights in ten right and the lid holds. Fewer cracks a bell, and the night goes on either way.', cls: 'whisper' },
          ];
          if (v != null) out.push({ text: `${nick(v)}'s bell is silent for the first pattern. ${nick(neighbourOf(v, [v]))}, take both keys.`, cls: 'whisper' });
          return out;
        },
        run: (box, api) => new Promise((resolve) => {
          const s = api.state; const v = volunteerLane(s);
          const wrap = UI.el('div', { class: 'pz' });
          wrap.appendChild(UI.el('div', { class: 'pz-title', text: 'THE BELLS — READY' }));
          const grid = UI.el('div', { class: 'ch6-ready' });
          const lanes = UI.el('div', { class: 'ch6-lanes' });
          for (let i = 0; i < 4; i++) lanes.appendChild(UI.el('div', { class: 'ch6-lane p' + i + (v === i ? ' silent' : ''), html: `${nick(i)}${v === i ? ' — silent' : ''}<span class="k">${window.VigilInput.keyLabel(i)}</span>` }));
          grid.appendChild(lanes);
          const slow = UI.el('div', { class: 'ch6-slow' + (s.flags.SLOW_BELLS ? ' on' : '') });
          const slowBtn = UI.el('button', { class: 'btn small', text: '' });
          const slowTxt = UI.el('span', { class: 'small', style: { fontSize: '15px', flex: '1 1 240px' }, html: '<strong>Slow bells</strong> — wider windows, an easier tempo, nothing scored. Choose it now, not later.' });
          const paint = () => { slow.classList.toggle('on', !!s.flags.SLOW_BELLS); slowBtn.textContent = s.flags.SLOW_BELLS ? 'Slow bells: ON' : 'Slow bells: off'; };
          slowBtn.addEventListener('click', () => { Store.set('SLOW_BELLS', !s.flags.SLOW_BELLS); if (s.flags.SLOW_BELLS) Store.set('SLOW_NOTED', true); paint(); Audio.sfx('click'); });
          slow.appendChild(slowTxt); slow.appendChild(slowBtn); paint();
          grid.appendChild(slow);
          wrap.appendChild(grid);
          box.appendChild(wrap);
          api.button('Practice peal', () => resolve('ch6_practice'), 'primary');
        }),
      },
      ch6_practice: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_chamber', mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_practice', replayable: true,
        text: ['Eight lights, nothing counted. Two of them are the pale blue of the Cold. Every hand off for those.'],
        hints: [
          'Four keys, one each. Nobody presses another player\'s.',
          'Two lights joined by a bar are a chord: those hands together, inside a breath.',
          'Pale blue is the Cold wearing a bell\'s face. Every hand off the keys until it is past.',
        ],
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        config: (s) => {
          const v = volunteerLane(s);
          ruleCard([['press', 'press on the line'], ['chord', 'joined lights, one breath'], ['cold', 'blue is the Cold']]);
          return { practice: true, laneNames: L.nicks, events: evenEvents(PRACTICE, 60000 / tempo(s, 80)), fallMs: 1800, windowMs: win(s, 380), braceWindowMs: win(s, 320), deadLanes: v != null ? [v] : [], pulse: false };
        },
        solvedText: (s, r) => [`${r.hits} of ${r.total}. Nothing counted.`, { text: 'Now the real one.', cls: 'whisper' }],
        next: 'ch6_round1', button: 'Ring the pattern',
      },
      /* ---------- the lit pattern ---------- */
      ch6_round1: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_round1',
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        text: [
          'Provost Marrow presses her seal into the iron. The lid answers with a low note that is none of the bells.',
          { speaker: 'Provost Marrow', text: 'Chords now. Together means *together* — every hand inside a breath, or the bell does not sound.' },
          { text: 'Twenty-four lights. Eight of them are the Cold.', cls: 'whisper' },
        ],
        hints: [
          'Four hands, and a chord needs every hand it joins. Nobody rings anybody else\'s bell.',
          'It is the chords that fail. One hand a beat late loses the bell. Count yourselves in, out loud.',
          'A third of the lights are the Cold. Hammer the keys and you ring all eight, and crack a bell.',
        ],
        config: litCfg,
        onSolve: roundSolve(1),
        solvedText: roundText(['The pattern holds. The frost at the rivets stops a hand\'s breadth from her knees and goes no further.', { speaker: 'Provost Marrow', text: 'Good. Do not get proud. The last one is the Founders\' own, and they did not ring it by sight.' }],
          'Again. The next one. You do not stop for a cracked bell.'),
        next: 'ch6_tieoff', button: 'The last pattern',
      },
      ch6_tieoff: {
        art: 'ch6_chamber', mood: 'dread', fx: 'ash', flame: 0.16,
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [];
          if (v != null) {
            out.push(`Marrow reaches up, takes hold of something none of you can see, and ties it off to the iron ring.`);
            out.push({ text: `${nick(v)}, your Sight comes back like blood into a numb hand. Open it.`, cls: 'whisper' });
          }
          out.push('Then the chamber goes dark. Not the lamps. There are no lamps. The light simply stops.');
          out.push({ speaker: 'Provost Marrow', text: 'The Founders rang the last pattern blind. One of them called it. Three of them rang.' });
          out.push({ speaker: 'Provost Marrow', text: 'Listener — your bell goes quiet. You are the voice.' });
          out.push({ text: 'The Hearth counts the beats, one to thirty-two.', cls: 'whisper' });
          out.push({ text: 'Listener — call a number on every beat that sounds.', cls: 'whisper' });
          out.push({ text: 'Reader, Seer, Binder — ring only the numbers on your **Speak**.', cls: 'whisper' });
          return out;
        },
        next: 'ch6_round3', button: 'Ring it blind',
      },
      ch6_round3: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', mood: 'dread', fx: 'void', flame: 0.15, puzzleId: 'ch6_round3',
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', true); },
        text: ['Thirty-two beats at sixty to the minute. Nothing falls that you can see.'],
        hints: [
          'The count is the Hearth\'s. Every number is the Listener\'s. Which of them are bells is on three other pages, one list each.',
          'The call comes one beat early, so a hand has time to arrive. Ring on the count, never on the word.',
          'Every number gets called. If the number is not on your list, keep still. Eight of the twenty-four belong to nobody, and those are the Cold.',
        ],
        config: darkCfg,
        onSolve: roundSolve(3),
        solvedText: roundText(['The last chord goes on ringing after your hands have left the keys, and the lid under your feet stops beating.', 'The chamber comes back a little at a time. The beam. The bells. Marrow kneeling in chalk gone from white to gold.'],
          'That is what we have. Hands off the keys.'),
        next: 'ch6_held', button: 'The Cold is held',
      },
      /* ---------- held, and the Second Asking ---------- */
      ch6_held: {
        art: 'ch6_lid', mood: 'sorrow', fx: 'ash', flame: 0.15,
        enter: (s) => {
          widgetClass('ch6-bells', false); widgetClass('ch6-dark', false);
          Store.set('CLUES', 0);
          Store.set('TRUTHS', ['reader', 'listener', 'seer', 'binder'].filter(r => W(s, r) === TRUTH[r]).length);
          const c = s.flags.BELLS_CRACKED | 0;
          Store.note(c ? `The Bells held with ${c === 1 ? 'one bell' : c + ' bells'} cracked.` : 'The Bells held, and not one bell cracked.');
        },
        text: (s) => {
          const c = s.flags.BELLS_CRACKED | 0;
          return [
            c === 0 ? 'Four bells, whole, still humming.' : c === 1 ? 'Three bells humming, and one hanging silent with its wound.' : `${c === 2 ? 'Two bells' : 'One bell'} humming. The others hang with their cracks.`,
            'Marrow lays both hands flat on the iron and, for the first time tonight, lets her shoulders down.',
            { speaker: 'Provost Marrow', text: 'It is held. Not closed — held. The last of it is not mine to do.' },
            { speaker: 'Provost Marrow', text: 'Now, love. Walk.' },
            'Wren does not walk. Wren looks at the four of you, one at a time.',
            { speaker: 'Wren', text: 'In the laundry I asked each of you one question about me. You all got out of it.' },
            { speaker: 'Wren', text: 'I am asking again, out loud. Look at me when you answer.' },
          ];
        },
        next: 'ch6_ask_owl', button: 'Seer first',
      },
      ch6_ask_owl: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_OWL',
        text: [
          { text: 'Four questions, one each. The table may argue. The one asked answers.', cls: 'whisper' },
          { speaker: 'Wren', text: 'Seer. You see under things. Which way does my shadow fall?' },
        ],
        prompt: 'The Seer answers.',
        options: [
          askOpt('away', 'Away from the fire, like everybody\'s.', 'seer', false, 'ch6_ask_hush'),
          askOpt('toward', 'Toward the fire.', 'seer', true, 'ch6_ask_hush'),
          askOpt('none', 'You have no shadow at all.', 'seer', false, 'ch6_ask_hush'),
        ],
      },
      ch6_ask_hush: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_HUSH',
        text: (s) => [wrenSays(s, 'seer'), { speaker: 'Wren', text: 'Listener. You hear every heart in a room. Can you hear mine?' }],
        prompt: 'The Listener answers.',
        options: [
          askOpt('loud', 'Loud.', 'listener', false, 'ch6_ask_bookmoth'),
          askOpt('faint', 'Faint. Far off.', 'listener', false, 'ch6_ask_bookmoth'),
          askOpt('none', 'No. I have never heard it.', 'listener', true, 'ch6_ask_bookmoth'),
        ],
      },
      ch6_ask_bookmoth: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_BOOKMOTH',
        text: (s) => [wrenSays(s, 'listener'), { speaker: 'Wren', text: 'Reader. You read the old tongue now. What does my name mean?' }],
        prompt: 'The Reader answers.',
        options: [
          askOpt('bird', 'A small bird. A brave one.', 'reader', false, 'ch6_ask_knot'),
          askOpt('hollow', 'A hollow. The space inside a bell, the part that rings.', 'reader', true, 'ch6_ask_knot'),
          askOpt('fire', 'A fire.', 'reader', false, 'ch6_ask_knot'),
        ],
      },
      ch6_ask_knot: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_KNOT',
        text: (s) => [wrenSays(s, 'reader'), { speaker: 'Wren', text: 'Binder. You see the threads. Do I have one?' }],
        prompt: 'The Binder answers.',
        options: [
          askOpt('red', 'Red. An oath, to us.', 'binder', false, 'ch6_iknow'),
          askOpt('grey', 'Grey. Grief.', 'binder', false, 'ch6_iknow'),
          askOpt('none', 'None. Not unbound. The knot itself.', 'binder', true, 'ch6_iknow'),
        ],
      },
      ch6_iknow: {
        art: 'ch6_lid', mood: 'sorrow', fx: 'ash', flame: 0.14,
        enter: () => { Store.note('Marrow said aloud what came out of the fire.'); },
        text: (s) => {
          const c = s.flags.CLUES | 0;
          return [
            wrenSays(s, 'binder'),
            { speaker: 'Wren', text: c === 4 ? 'Four answers, and all four were the ones I already knew.' : c === 0 ? 'Four answers. I heard every one of them, and it changes nothing.' : `Four answers. ${c === 1 ? 'One was' : c + ' were'} the one I already knew.` },
            { speaker: 'Wren', text: 'And — Mum. I know. I have known since the laundry. Tell them. You are allowed.' },
            'Marrow does not stand up. She tells it kneeling, because the child gave her leave.',
            { speaker: 'Provost Marrow', text: 'It came out of the fire the night the Hearth guttered. I picked it up. I named it. I raised it to be—' },
            '"Loved," says Wren. "Loved enough to walk back in," says Marrow, and does not look up.',
          ];
        },
        next: 'ch6_stone', button: 'The stone',
      },
      /* ---------- the stone ---------- */
      ch6_stone: {
        art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12,
        text: [
          'Far above, the Hearth gutters. For a moment the light in the shaft comes from below, and it is blue.',
          'The underside of the prophecy stone, lit from beneath for the first time in four hundred years.',
          'Eight cuts in a line along its foot. Four of them are clean. Four are burned to a smear.',
          'The school has read it from the other side, over the fire, since the night the fire was lit.',
          { text: 'Open your **Sight**. The stone is on it.', cls: 'whisper' },
        ],
        next: 'ch6_strip', button: 'Read it',
      },
      ch6_strip: {
        type: 'puzzle', puzzle: 'ring', art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12, puzzleId: 'ch6_strip', par: [3, 5, 7],
        text: [
          'Eight cuts. The fire took four. A wrong reading cracks a bell.',
          { text: 'Reader — what the four burns were.', cls: 'whisper' },
          { text: 'Listener — where the silence falls in the tune.', cls: 'whisper' },
          { text: 'Seer — which way each burn was struck.', cls: 'whisper' },
          { text: 'Binder — whether the cold word may be written.', cls: 'whisper' },
          { text: 'Say your one thing out loud before anybody places a word.', cls: 'whisper' },
        ],
        config: () => {
        /* The price of a wrong reading. Retries are otherwise free, and with free retries a two-state
           fact (which end to read from, whether the cold word is written) can be flipped for nothing —
           which is what made the Listener and the Binder droppable. A reading costs a bell, in the same
           currency the two patterns spend. A board with fewer than six words is not a reading and costs
           nothing (R10.19: under-commitment is coached, not punished). */
        let reads = 0;                                   // complete readings, for the try-2 nudge (R10.18)
        const price = () => {
          const st = Store.state;
          Store.set('STONE_MISREAD', (st.flags.STONE_MISREAD | 0) + 1);
          if (crackedNow(st) >= 3) return ' The cracked bells hum and say nothing.';
          Store.set('BELLS_CRACKED', Math.min(3, crackedNow(st) + 1));
          return ' Above you a bell takes the wrong word, and cracks.';
        };
        return {
          title: 'THE FOOT OF THE STONE',
          note: 'The Provost, not looking up: *Read a line **left to right** and every cut says the word it stands for. Read it **right to left** and every cut says its other word. Slot 1 is the first word you read. The cold word is never written. Leave that slot **empty**.*',
          html: footStrip(),
          slots: 8, layout: 'strip', glyphs: glyphPalette(), allowRepeat: true, allowEmpty: true,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to read it aloud',
          submitText: 'Read the stone', resetOnWrong: true,
          /* No wrongText and no onWrong: check() answers every board itself, because every wrong board
             also has to carry what the reading cost. */
          check: (m) => {
            const got = []; for (let i = 1; i <= 8; i++) got.push(m[i] || null);
            if (same(got, TURNED)) return true;
            if (got.filter(Boolean).length < 6) return 'Not a reading yet. Six words at least, and then read it aloud.';
            /* Past here the strip has been read, and the reading was wrong. Every line below says what
               the stone did — never which of the four facts was the wrong one, and never a role name. */
            reads++;
            const cost = price();
            if (same(got, NAIVE)) return 'Left to right, upright: four hundred years of school. The strip stays cold.' + cost;
            if (same(got, TURNED.slice(0, 7).concat([null]))) return 'Seven words, and a hole where the eighth was. The strip stays cold.' + cost;
            if (same(got, TURNED.slice().reverse())) return 'The right eight words, the wrong way round. Slot 1 is the first word you read.' + cost;
            if (same(got, NAIVE.slice().reverse())) return 'Right to left, and every cut still saying the word it stands up for. Read from that end and it says its *other* word.' + cost;
            return (reads >= 2 ? 'The stone does not answer. Wren, quietly: "Has everybody actually said their bit?"'
              : 'The stone does not answer. Frost feathers across the strip and it clears.') + cost;
          },
        }; },
        hints: [
          'Four things, four people, and nobody has two. What the four burns were — the Reader. Where the silence falls — the Listener. Which way each was struck — the Seer. Whether the cold word may be written — the Binder.',
          'Two ways to read one line, and only one of them ends the way the tune ends. Somebody here can hear which end that is.',
          'Slot 1 KNOT, 2 CROWN, 3 ASH, 4 WELL, 5 VEIL, 6 EMBER, 7 ASH, 8 COLD. Then four hands.',
        ],
        onSolve: (s) => {
          Store.set('WALK_UNLOCKED', true); Store.set('LAW0', true);
          if ((s.hintsUsed.ch6_strip || 0) >= 3) { Store.set('CLUES_HELP', true); Store.note('You read the stone with help.'); }
          Store.note('You read the prophecy stone the way it was carved. The Fourfold Walk is open.');
        },
        solvedText: [
          'Four hands. Above you the Hearth flares white for the space of a breath, and the strip reads itself aloud.',
          'KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD',
          { text: '"Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left."', cls: 'omen' },
        ],
        next: 'ch6_open', button: 'What it means',
      },
      ch6_open: {
        art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.14,
        text: [
          'Four went down. Not one born of four — four, as one. The fire is only what they left behind.',
          { text: 'THE FOURFOLD WALK IS OPEN.', cls: 'big' },
          { text: 'The road four people walk together, not one.', cls: 'whisper' },
          { text: 'Binder — the struck Law is back in your Book.', cls: 'whisper' },
          { speaker: 'Wren', text: 'Then ask me a third time. In there.' },
        ],
        next: 'ch6_flow', button: 'The night moves on',
      },
      ch6_flow: {
        type: 'flow', art: 'ch6_chamber', mood: 'hearth', fx: 'ash', flame: 0.12,
        enter: (s) => { Game.scenes.ch6_flow.flow = buildFlow(s); },
        text: ['The bells. The Asking. The stone, read at last from the side the fire had covered.', { text: 'Next: the Cold. Pass the keyboard by name.', cls: 'small' }],
        flowTitle: 'Chapter VI — the paths you walked',
        stats: (s) => {
          const c = s.flags.BELLS_CRACKED | 0;
          const bells = c === 0 ? 'The four bells came through whole.' : c === 1 ? 'One bell is cracked.' : (c === 2 ? 'Two' : 'Three') + ' bells are cracked.';
          return `${bells} You gave Wren **${s.flags.CLUES | 0}** of the four answers Wren already had. Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch7_start', button: 'The Finale',
      },
    },
  });
})();
