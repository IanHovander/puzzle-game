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
     A quarter to a third of every pattern is Cold, so what the widget scores is lights answered right,
     not bells struck: a table that strikes every bell and rings every Cold with them still fails.

     Verified by enumeration (scratchpad/v/bells-after.js, replaying reaction.js's own remap and judge):
       ROUND ONE  24 events = 16 bells (4 singles, 8 chords of two, 4 of all four) + 8 Cold.
         Every Cold falls on THREE lanes at once, so no single careful player can buy back a mashing
         table: pass mark 16.8/24 · four hands played right 24 · four mashing 16 · one careful and
         three mashing 16 · two careful and two mashing 16 — all fail. Three careful and one mashing
         is 18/24 and passes, which is the intended forgiveness. Drop any one lane 15/24 fails, and
         so does dropping any survivor on the volunteer branch (that lane silent, remapped onto a
         neighbour, who then covers both).
       ROUND THREE 32 beats, of which 24 sound: 18 bells and 6 Cold. Lane 1 never rings — the Listener
         is the voice, so reaction.js's dead-lane remap is a no-op. EVERY sounding beat carries a
         number, 1 to 24, and the Listener calls all of them one beat early. Only the three role pages
         say which numbers are bells, six each.
         EVERY BELL IS A SINGLE LANE. That is the whole of the fix, and it is load-bearing: with a
         chord, the lanes that share it can ring it for a lane that has lost its page, so the surviving
         lists pool into one safe press set. With no chords, a lane's six bells are its own and nobody
         else's key can sound them. The Cold falls on all three ringing lanes at once, so one stray
         hand rings it.
         RE-ENUMERATED because the last pass recorded a result that was false. Replay of reaction.js's
         onPress/frame/judge, beat by beat, off this very string (scratchpad/w/sim2.js + r3-full.js).
         A press on a lane the event does not use is a stray, and darkCfg's `noFail` plus this
         chapter's hidden meter make a stray free, so strays are modelled as costing nothing.
         target 0.8 -> pass mark 20 of 24; honest four-handed play may miss four.
           four pages, called and played right ......................... 24  PASSES
           four pages, and everybody hammers every beat ................ 18
           no Reader / no Seer / no Binder page, with that lane
             (a) pressing on every beat, (b) pressing on every beat
             another lane presses, (c) all three lanes pressing the
             pooled union, (d) pressing every number the Listener
             calls, (e) pressing the complement of the union,
             (f) never pressing at all ................................. 18  each, all 18 runs
           no Listener at all (nothing maps a number to a beat):
             beat = your number 7 · offset by one 6 · nobody presses 6 ·
             everybody hammers 18 · each lane guessing beats 0% of 4000
         24 strategies searched; only four pages played right passes.
         NOT proved four-handed against luck: a lane with no page that guesses blind — pressing k of
         the 12 numbers it cannot account for — passes about 28% of the time at its best k. It cannot
         do better than that, and it cracks a bell when it fails.
       Neither round is *physically* four-handed: reaction.js binds keys to lanes and not to people,
       so three players can cover four keys. Round one is a declared reflex pass with a rule card and
       a practice peal (R10.26); round three is four-handed by information. */
  const LEAD = 2500;                                   // ms from GO to beat 1
  const LANE = { R: 0, L: 1, S: 2, B: 3 };
  const ROUND1 = 'R xRSB S B xLSB L RS xRLB LB RLSB xRLS RL SB xLSB RB LS RLSB xRSB SB xRLB RL RLSB xRLS RLSB';
  const PRACTICE = 'R L S xRLS RS xRSB LB RLSB';
  /* One token per beat, 1 to 32. '.' is a silent beat. THIS STRING IS COPIED IN js/content/companion/ch6.js
     — the Listener's comb and the three bell-lists are derived from it there. Keep them identical. */
  const ROUND3 = '. R S B . xRSB S R B . xRSB B R . S B xRSB R . S B xRSB . xRSB S R . B S xRSB . R';

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
    ruleCard([[null, 'the Hearth counts the beats'], [null, 'the Listener calls each number'], ['press', 'your number — ring next beat'], ['cold', 'not yours — hands off'], [null, 'eight in ten holds']]);
    return {
      title: 'THE DARK PATTERN' + (s.flags.SLOW_BELLS ? ' · SLOW' : ''),
      laneNames: L.nicks.map((k, i) => i === 1 ? 'Voice' : k),
      events: beatEvents(ROUND3, beatMs), fallMs: 1800, windowMs: win(s, 520), braceWindowMs: win(s, 420),
      target: 0.8, noFail: true, damage: 0.03, deadLanes: [1], dark: true, pulse: false,
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
  function roundText(mark, holdLines, again) {
    return (s, r) => {
      const out = [{ text: `${r.hits} of ${r.total} lights answered right. ${mark} holds the lid.`, cls: 'whisper' }];
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
     One reply per role per answer, plus one clause of laundry callback when the laundry answer was the
     one Wren remembers. (Twelve keyed variants was 138 words for the four lines a table ever sees.) */
  const W = (s, role) => s.flags['WHISPER_' + role];
  const TRUTH = { listener: 'NO', seer: 'TELL', reader: 'DONTKNOW', binder: 'DONTKNOW' };
  const RIGHT = { seer: 'toward', listener: 'none', reader: 'hollow', binder: 'none' };
  const REPLY = {
    seer: { yes: 'Toward it.', no: 'Look down, some time when I am not standing here.' },
    listener: { yes: 'Nothing.', no: 'That was kind. It was not true, and I would rather have had the true one.' },
    reader: { yes: 'A hollow. The part of a bell that rings.', no: 'That is what they call me. It is not what it says.' },
    binder: { yes: 'None. Not unbound. The knot itself.', no: 'You are being kind again. Hold out your arm and look.' },
  };
  /* One clause of callback on a right answer, and only two ways for it to run: the laundry answer Wren
     remembers, or the one she does not. (Twelve keyed variants was three times the words for the same
     four lines a table ever reads.) */
  const ECHO = { seer: 'TELL', listener: 'NO', reader: 'DONTKNOW', binder: 'YES' };
  const LAUNDRY = {
    seer: [' You said so in the laundry. I called you poetic.', ' Six years, and nobody said it.'],
    listener: [' You said no in the laundry, and did not flinch.', ' You have listened since we were seven.'],
    reader: [' You said you did not know. That was true then.', ' You found it in the study.'],
    binder: [' You said yes, to the one person with none.', ' You have seen unbound people. I am not one.'],
  };
  const wrenSays = (s, role) => {
    const right = s.flags['ASK_' + role] === RIGHT[role];
    return { speaker: 'Wren', text: right ? REPLY[role].yes + LAUNDRY[role][W(s, role) === ECHO[role] ? 0 : 1] : REPLY[role].no };
  };
  const askOpt = (id, text, role, right, next) => ({ id, text, next, set: Object.assign({ ['ASK_' + role]: id }, right ? { CLUES: (s) => (s.flags.CLUES | 0) + 1 } : {}) });

  /* ================= THE PROPHECY STONE =================
     Eight cuts running ALL THE WAY ROUND the foot of the stone, numbered 1 to 8 on the Hearth's board.
     A ring has no first cut. The fire has burned four of them away — cuts 1, 3, 5 and 7. The other four
     are public: the room can see both their shape and which way up they stand.

       READER   what the four burnt cuts were: 1 a flame, 3 a crown, 5 a spike, 7 a crown. Drawn on
                their side, so the page cannot say which way up any of them stood.
       SEER     which way each burnt chisel went in: 1, 3 and 5 point-up, 7 point-down.
       LISTENER the lap ends on a silence. A silence is the one word with no note, so this says which
                cut is read LAST, and therefore where the ring begins — one of eight, not one of two.
       BINDER   the older Law, in three clauses: read as the cuts count DOWN, every cut says its OTHER
                word, and the cold word IS written. The rule card states the school's practice, which
                is the opposite of all three, so the Binder has something to overturn.

     Why the ring. On a strip the whole reading is three bits — direction, which word a cut says, and
     whether the cold word is written — and three bits split between two roles leaves one of them
     holding a single bit, which is a coin the table can flip for the price of one bell. That is the
     defect this rewrite is fixing. Closing the line into a ring adds three more bits (where the lap
     ends) and gives them to the Listener, so no role is left holding a coin.

     Enumerated over every board the four pages and the rule card can produce — burnt shapes (4 each) x
     burnt orientations (2 each) x which word a cut says x which way the lap runs x where it starts (8)
     x cold written or left out (scratchpad/w/stone-after.js):
       all four            -> 1    KNOT CROWN ASH WELL VEIL EMBER ASH COLD
       drop the Reader     -> 192
       drop the Seer       -> 8
       drop the Listener   -> 8    (the eight rotations of one lap)
       drop the Binder     -> 12
     Worst pair, the Listener and the Binder together, is still 64. No keyed wrong-answer line touches
     any of those sets: the one line that is keyed answers the school's own reading, which the
     Listener's fact rules out, so it can never split a field for a table that is missing a page.
     A wrong reading is never free — see price(). */
  const STONE = [{ shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const BURNT = [0, 2, 4, 6];                          // the cuts the fire took (0-based)
  const NAIVE = G.readNaive(STONE);                    // ASH COLD CROWN KNOT THORN COLD EMBER VEIL
  const TURNED = G.readTurned(STONE);                  // KNOT CROWN ASH WELL VEIL EMBER ASH COLD
  const SCHOOL = NAIVE.map(w => w === 'COLD' ? null : w);   // the school's reading, cold slots left empty
  const same = (got, want) => got.every((g, i) => g === want[i]);

  /* The board the room sees: eight cuts, numbered, four of them scorched over — and the two dashed
     hooks at the ends, which are the whole geometry of the puzzle. The line does not stop at cut 8.
     It goes round the foot and comes back to cut 1, so nothing on the board says where to begin.
     The only thing that does is the school's mark, and the school is wrong. (ch0's collar, closed.) */
  function footStrip() {
    const cell = 74, w = 8 * cell + 44, mid = 62;
    let s = `<svg viewBox="0 0 ${w} 120" width="100%" style="max-width:${w}px;display:block;margin:0 auto">`;
    s += `<rect x="14" y="18" width="${w - 28}" height="${mid + 22 - 18}" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>`;
    s += `<path d="M14,${mid} C0,${mid} 0,10 22,10" fill="none" stroke="rgba(212,169,78,0.5)" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<path d="M${w - 14},${mid} C${w},${mid} ${w},10 ${w - 22},10" fill="none" stroke="rgba(212,169,78,0.5)" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<text x="${w / 2}" y="14" text-anchor="middle" font-size="12" fill="rgba(212,169,78,0.75)" font-family="Cinzel,serif">the line runs round the foot — cut 8 touches cut 1</text>`;
    STONE.forEach((it, i) => {
      const x = 22 + i * cell + cell / 2;
      if (BURNT.indexOf(i) >= 0) {
        s += `<g transform="translate(${x},${mid})"><ellipse rx="24" ry="24" fill="#0d0a0c" opacity=".85"/><ellipse cx="-6" cy="-5" rx="15" ry="12" fill="#000" opacity=".6"/><ellipse cx="8" cy="7" rx="12" ry="10" fill="#000" opacity=".5"/><path d="M-18,14 L-5,-2 L4,9 L16,-11" fill="none" stroke="#3a3034" stroke-width="2"/></g>`;
      } else {
        s += `<g transform="translate(${x},${mid}) scale(1.05)" style="color:#c9bfae">${G.shapeInner(it.shape, it.inv)}</g>`;
      }
      s += `<text x="${x}" y="102" text-anchor="middle" font-size="12" fill="#c98a4a" font-family="Cinzel,serif">cut ${i + 1}</text>`;
    });
    s += `<g transform="translate(${22 + cell / 2},${mid + 26})"><path d="M0,-9 L-7,4 L7,4 Z" fill="#8a7fd8"/></g>`;
    s += `<text x="${22 + cell / 2 + 46}" y="${mid + 28}" font-size="11" fill="#8a7fd8" font-family="Cinzel,serif">the school's mark</text>`;
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
            { text: 'Two patterns. Each one says how many lights it needs. Fall short and a bell cracks, and the night goes on either way.', cls: 'whisper' },
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
          'Pale blue is the Cold. Every hand off the keys until it is past.',
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
          'Four hands, one key each. A chord needs every hand it joins.',
          'It is the chords that fail. One hand late loses the bell. Count yourselves in, out loud.',
          'A third of the lights are the Cold. Hammer the keys and you ring all eight of them.',
        ],
        config: litCfg,
        onSolve: roundSolve(1),
        solvedText: roundText('Seven in ten', ['The pattern holds. The frost at the rivets stops a hand\'s breadth from her knees and goes no further.', { speaker: 'Provost Marrow', text: 'Good. Do not get proud. The last one is the Founders\' own, and they did not ring it by sight.' }],
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
          out.push({ text: 'Listener — say the number in each cell the count reaches.', cls: 'whisper' });
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
          'The count is the Hearth\'s. Every number is the Listener\'s. Which numbers are bells is on three other pages, one list each.',
          'The call comes one beat early, so a hand has time to arrive. Ring on the count, never on the word.',
          'Three lists, six numbers each, and no number is on two of them. Ring your own six, on the beat after yours is called.',
        ],
        config: darkCfg,
        onSolve: roundSolve(3),
        solvedText: roundText('Eight in ten', ['The last bell goes on ringing after your hands have left the keys, and the lid under your feet stops beating.', 'The chamber comes back a little at a time. The beam. The bells. Marrow kneeling in chalk gone from white to gold.'],
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
          'Eight cuts run all the way round its foot. Four are clean. Four are burned to a smear.',
          'From above, the school reads it "one born of four shall walk into the Cold". Nobody has read it from under here.',
          { text: 'Open your **Sight**. The stone is on it.', cls: 'whisper' },
        ],
        next: 'ch6_strip', button: 'Read it',
      },
      ch6_strip: {
        type: 'puzzle', puzzle: 'ring', art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12, puzzleId: 'ch6_strip', par: [3, 5, 7],
        text: [
          'Eight cuts. The fire took four. A wrong reading cracks a bell, and you will want that bell later.',
          { text: 'Reader — what the four burnt cuts were.', cls: 'whisper' },
          { text: 'Listener — where the line ends.', cls: 'whisper' },
          { text: 'Seer — which way each burnt cut was struck.', cls: 'whisper' },
          { text: 'Binder — which way it runs, and what a cut says.', cls: 'whisper' },
          { text: 'Say your one thing out loud first.', cls: 'whisper' },
        ],
        config: () => {
        /* The price of a wrong reading, and it never stops being charged. The last version capped at
           three cracked bells and then went free, and free retries are what let a table brute-force a
           reading instead of asking the fourth player — so a table arriving with three bells already
           cracked paid nothing from its very first attempt.
           BELLS_CRACKED cannot simply be uncapped: ch7 mutes one lane per crack and ch8 prints it out
           of three. So the stone keeps its OWN counter as well. A bell cracks while there is a whole
           bell left to crack; after that STONE_MISREAD carries the cost, it is uncapped, and it is said
           aloud in the line, written into the night's record and drawn on the chapter's flowchart.
           A board with fewer than six words is not a reading and costs nothing at all
           (R10.19: under-commitment is coached, not punished). */
        let reads = 0;                                   // complete readings, for the try-2 nudge (R10.18)
        const price = () => {
          const st = Store.state;
          const n = (st.flags.STONE_MISREAD | 0) + 1;
          Store.set('STONE_MISREAD', n);
          if (crackedNow(st) < 3) { Store.set('BELLS_CRACKED', crackedNow(st) + 1); return ' Above you a bell takes the wrong word, and cracks.'; }
          return ` No bell left to crack. Marrow says the count out loud: ${n} wrong readings.`;
        };
        return {
          title: 'THE FOOT OF THE STONE',
          note: 'The Provost, not looking up: *Eight cuts round the foot, and a ring has no first. Every cut says one word standing up and its other upside down. The school starts at the **mark** and reads up the count, leaving the cold word **empty**. Slot 1 is the first word you read.*',
          html: footStrip(),
          slots: 8, layout: 'strip', glyphs: glyphPalette(), allowRepeat: true, allowEmpty: true,
          fourHands: true, fourHandsText: 'FOUR HANDS — all four keys within a heartbeat, to read it aloud',
          submitText: 'Read the stone', resetOnWrong: true,
          /* No wrongText and no onWrong: check() answers every board itself, because every wrong board
             also has to carry what the reading cost. */
          /* One keyed line only, and it answers the school's own reading — the decoy the fiction has
             already set up. The three lines that used to sit here (seven-words-and-a-hole, the answer
             reversed, the answer un-inverted) each fired on exactly one board, which made them oracles:
             a table missing a page could walk a two-board field with them. Gone. */
          check: (m) => {
            const got = []; for (let i = 1; i <= 8; i++) got.push(m[i] || null);
            if (same(got, TURNED)) return true;
            if (got.filter(Boolean).length < 6) return 'Not a reading yet. Six words at least, and then read it aloud.';
            reads++;
            const cost = price();
            if (same(got, NAIVE) || same(got, SCHOOL)) return 'From the mark, the way the cuts count up: four hundred years of school. The strip stays cold.' + cost;
            return (reads >= 2 ? 'The stone does not answer. Wren, quietly: "Has everybody actually said their bit?"'
              : 'The stone does not answer. Frost feathers across the strip and it clears.') + cost;
          },
        }; },
        hints: [
          'Four things, four people, nobody has two. What the burnt cuts were — the Reader. Where the line ends — the Listener. Which way each was struck — the Seer. The older Law — the Binder.',
          'A ring has no first cut, so something must say where the lap ends. Somebody here can hear it. And the school is not the only way to read a cut.',
          'Slot 1 KNOT, 2 CROWN, 3 ASH, 4 WELL, 5 VEIL, 6 EMBER, 7 ASH, 8 COLD. Then four hands.',
        ],
        onSolve: (s) => {
          Store.set('WALK_UNLOCKED', true); Store.set('LAW0', true);
          if ((s.hintsUsed.ch6_strip || 0) >= 3) { Store.set('CLUES_HELP', true); Store.note('You read the stone with help.'); }
          const mis = s.flags.STONE_MISREAD | 0;
          Store.note('You read the prophecy stone the way it was carved. The Fourfold Walk is open.' + (mis ? ` It took ${mis === 1 ? 'one wrong reading' : mis + ' wrong readings'} first.` : ''));
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
