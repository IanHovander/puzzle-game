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
    /* There was a rule here hiding .orb-chain in the dark round. It could never fire: a chain is only
       built for kind 'brace' or 'all' (js/puzzles/reaction.js:50) and ROUND3 is singles and Cold only.
       Gone, and tools/scripts/ch6.json now asserts the chain count is 0 during the dark round, so the
       day somebody puts a chord in ROUND3 the suite says so instead of a stylesheet silently coping. */
    #widget.ch6-bells .lanes { height: min(34vh, 260px); }
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
      /* #text.tight only fires at 88% of base, and UI.fitBox will not go below 17px of an 18px
         puzzle brief — so on a short screen the brief never gets the tighter padding it was
         calibrated for. ch6_strip's brief is six lines and cannot lose one, so take it here. */
      body[data-chapter="ch6"] #text.narrow { padding: 16px 22px; }
      body[data-chapter="ch6"] #text.narrow .para { margin-bottom: 9px; }
      body[data-chapter="ch6"] .ring-pz .wheel.striplayout { height: 86px; }
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

     Both rounds re-measured from these very strings, by replaying reaction.js's own remap, onPress,
     frame and judge (a throwaway simulator; the runs are printed in the report for this pass):
       ROUND ONE  24 events = 16 bells (4 singles, 8 chords of two, 4 of all four) + 8 Cold.
         Every Cold falls on THREE lanes at once, so no single careful player can buy back a mashing
         table: target 0.7 -> pass mark 17 of 24 · four hands played right 24 · one lane mashing and
         three careful 18 PASSES (the intended forgiveness) · two mashing 16 · three mashing 16 ·
         four mashing 16 — all fail. Drop any one lane (that lane silent) 15 and fails. On the
         volunteer branch, with one lane already dead and remapped onto a neighbor, dropping a
         survivor is 11 to 15 and fails, two mashing is still 16, and one mashing with two careful is
         16 or 18 depending on which lane went silent.
       ROUND THREE 32 beats, of which 24 sound: 18 bells and 6 Cold. Lane 1 never rings — the Listener
         is the voice, so reaction.js's dead-lane remap is a no-op. EVERY sounding beat carries a
         number, 1 to 24, and the Listener calls all of them one beat early. Only the three role pages
         say which numbers are bells, six each.
           Reader 1 6 10 14 20 24 · Seer 2 5 11 15 19 22 · Binder 3 7 9 12 16 21 · Cold 4 8 13 17 18 23
         EVERY BELL IS A SINGLE LANE, and that is load-bearing. With a chord, the lanes that share it
         can ring it for a lane that has lost its page, so the surviving lists pool into one safe press
         set — which is exactly how the last version fell over. With no chords, a lane's six bells are
         its own and nobody else's key can sound them. The Cold falls on all three ringing lanes at
         once, so one stray hand rings it.
         RE-MEASURED off this very string by replaying reaction.js's onPress/frame/judge beat by beat,
         because the pass before recorded a drop-a-role result that was false. A press on a lane the
         event does not use is a stray, and darkCfg's `noFail` plus this chapter's hidden meter make a
         stray free, so strays are modeled as costing nothing — the friendliest assumption to an
         exploit. target 0.8 -> pass mark 20 of 24; honest four-handed play may miss four.
           four pages, called and played right ......................... 24  PASSES
           four pages, and everybody hammers every beat ................ 18
           no Reader / no Seer / no Binder page, with that lane
             (a) pressing on every beat, (b) pressing every number the
             Listener calls, (c) pressing every beat another lane
             presses, (d) pressing the complement of the two surviving
             lists, (e) never pressing at all, (f) all three lanes
             pressing the pooled union ................................ 18  each, all 18 runs
           no Listener at all (nothing maps a number to a beat):
             beat = your number 7 · your number +1 6 · your number -1 5 ·
             nobody presses 6 · everybody hammers every beat 18 ·
             each lane guessing six beats of thirty-two 0.0% of 4000
         26 runs in all: two four-page baselines, eighteen drop-a-page (three roles x six strategies)
         and six with no Listener. Only four pages played right passes. The arithmetic says why it cannot be dodged: a page-less lane scores
         12 (the two surviving lists) + its own bells pressed + (6 − Colds it rang), and its own six
         bells and the six Cold are indistinguishable to it, so every strategy above takes all twelve
         or none and lands on 18 exactly.
         NOT four-handed against luck, and this is the honest limit, stated exhaustively rather than
         sampled: a page-less lane's guess is a subset of the 12 numbers nobody claimed, and it passes
         when it rings at least two more of its own bells than Colds. 794 of the 4,096 subsets do that
         — 19.4% taken flat, 28.4% at the best fixed size (any 6 of the 12) — and exactly ONE of the
         4,096 is right. It cannot do better than that, and it cracks a bell when it fails.
       Neither round is *physically* four-handed: reaction.js binds keys to lanes and not to people,
       so three players can cover four keys. Round one is a declared reflex pass with a rule card and
       a practice peal (R10.26). Round three is four-handed by information, meaning: no strategy
       available to three pages passes it, only luck does. */
  const LEAD = 2500;                                   // ms from GO to beat 1
  const LANE = { R: 0, L: 1, S: 2, B: 3 };
  const ROUND1 = 'R xRSB S B xLSB L RS xRLB LB RLSB xRLS RL SB xLSB RB LS RLSB xRSB SB xRLB RL RLSB xRLS RLSB';
  const PRACTICE = 'R L S xRLS RS xRSB LB RLSB';
  /* One token per beat, 1 to 32. '.' is a silent beat. THIS STRING IS COPIED IN js/content/companion/ch6.js
     — the Listener's comb and the three bell-lists are derived from it there. Keep them identical.

     WHAT THIS ROUND IS, stated once and accurately, because the record here has been written wrong
     twice in the same direction and the next person to read it should not have to find that out.

     It is four-handed PHYSICALLY. The Voice lane is dead (deadLanes: [1]), a chord wants its presses
     inside braceWindowMs, and the Cold must be answered by keeping still, so hammering every key
     scores 18 of 24 against a pass mark of 20 and fails. That much is measured and holds.

     It is NOT four-handed INFORMATIONALLY, and it cannot be made so in this widget. reaction.js
     judges every event as it happens and answers it out loud: a hit plays Audio.sfx('key', lane) and
     a miss plays Audio.sfx('miss'), inside the window, one event at a time. A player with no list
     therefore learns from their own presses which beats were theirs, and can rebuild the list inside
     a single round. A correctly ignored Cold is judged a hit and sounds like one, so even the Cold is
     not hidden. Underneath all of that the bells audibly ring, so "which beats sound" — the whole of
     the Listener's fact — is broadcast to the room by the puzzle itself.

     Three rounds of work each closed one leak of this kind and opened another, because the leak is
     the genre: a rhythm game answers you per press, and that is what makes it playable. So the four
     lists are a fairness and legibility aid, not a secret, and R10.26 licenses exactly that — a
     reflex round with a rule card and a practice pass. Do not re-add a claim of informational
     four-handedness here without first changing how reaction.js reports, which is a shared file. */
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
  /* EVERY scene whose backdrop hangs the four bells must pass this, and the reason is a defect that
     shipped: js/core/engine.js setArt keys its memo on `name + JSON.stringify(params)` and returns
     early when the key repeats. Six scenes share 'ch6_lid' and five share 'ch6_chamber', so with no
     artParams the chamber was drawn once, whole, and never again — ch6_held said "one hanging silent
     with its wound" over four undamaged bells for every table that cracked one in a round. Moving the
     count into the memo key is the whole fix (ch3.js:560, ch4.js:428 and ch5.js:520 already do this).
     A crack that happens WITHIN a scene redraws through crackBell() below, which calls Game.setArt. */
  const bellParams = (s) => ({ cracked: Math.max(crackedNow(s), s.flags.STAIR === 'COLLAPSE' ? 1 : 0) });
  /* STAIR is read as well as the count because the engine sets the art BEFORE the scene's enter()
     runs (engine.js:95, then :96): on the first frame of ch6_start, a stair that came down in ch5
     has not yet seeded PRECRACKED, and a params object saying 0 would hide the wound the very next
     paragraph describes. js/art/scenes-ch6.js keeps the same fallback for any caller passing none. */
  /* The one place a bell is ever cracked. Charges the flag, keeps the cap, and repaints the backdrop
     so the picture and the prose can never disagree again. */
  function crackBell(s, artName) {
    const before = crackedNow(s);
    Store.set('BELLS_CRACKED', Math.min(3, before + 1));
    const after = crackedNow(Store.state);
    if (after !== before && artName && window.Game && Game.setArt) { try { Game.setArt(artName, { cracked: after }); } catch (e) {} }
    return after !== before;
  }
  const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const readings = (n) => (n === 1 ? 'one wrong reading' : (WORDS[n] || n) + ' wrong readings');
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
    ruleCard([['press', 'your own key, on the line'], ['chord', 'joined lights, one breath — count yourselves in'], ['cold', 'blue is the Cold — every hand off'], [null, 'seven lights in ten holds']]);
    return {
      title: 'THE PATTERN' + (s.flags.SLOW_BELLS ? ' · SLOW' : ''), laneNames: L.nicks,
      events: evenEvents(ROUND1, beatMs), fallMs: 1800, windowMs: win(s, 380), braceWindowMs: win(s, 320),
      target: 0.7, noFail: true, damage: 0.03, deadLanes: v != null ? [v] : [], pulse: false,
    };
  }
  function darkCfg(s) {
    const beatMs = 60000 / tempo(s, 60);
    beatOverlay(beatMs, 32);
    ruleCard([[null, 'the Hearth counts the beats'], [null, 'the Listener calls each number'], ['press', 'your number — ring on the NEXT beat, never on the word'], ['cold', 'not on your list — hands off'], [null, 'eight in ten holds']]);
    return {
      title: 'THE DARK PATTERN' + (s.flags.SLOW_BELLS ? ' · SLOW' : ''),
      laneNames: L.nicks.map((k, i) => i === 1 ? 'Voice' : k),
      events: beatEvents(ROUND3, beatMs), fallMs: 1800, windowMs: win(s, 520), braceWindowMs: win(s, 420),
      target: 0.8, noFail: true, damage: 0.03, deadLanes: [1], dark: true, pulse: false,
      /* reaction.js writes a live hits/total; in the dark round that is ground truth per event.
         Say plainly what this does NOT close: reaction.js:59 paints the responsible lane green for a
         hit and red for a miss on every event, and css/puzzles.css:81-82 gives each a 40px inset
         glow that `.lanes.dark` does not touch (it hides only .orb, css/puzzles.css:155). So the
         per-event verdict is on the shared screen whatever this flag says, and hiding the running
         total buys legibility, not secrecy. It stays because the round is honest about being a
         reflex round (ADVERSARIAL 15), not because it keeps a secret. */
      hideScore: true,
    };
  }
  /* A round is scored, never lost: BELLS_CRACKED is a cost carried into ch7, not a dead end.

     WALKING AWAY FROM A ROUND USED TO BE FREE, and that was the round's real defect. The score was
     written only here, when the widget resolved, while reaction.js keeps hits/misses/health in locals
     (reaction.js:37) — and round one shows a live `hits / total` on the HUD. A table thirty seconds
     into a losing round could read "7 / 24", take Menu -> Replay scene (or simply reload and Resume),
     and get a fresh round with the pattern already known, for nothing. The pattern is a fixed string
     at a fixed tempo, so the second run is the same round with the answers in hand.
     So the round is now charged where it is actually abandoned: roundEnter() below runs in the
     scene's `enter`, and a SECOND arrival at a round that never resolved cracks a bell on the spot.
     It cannot double-charge — the engine marks a resolved puzzle solved (engine.js:203) and will not
     re-run the widget, so re-entry only ever happens on an abandoned attempt — and BELLS_R{n}_SEEN is
     a Store flag, not a local, because Resume and paste-a-save both reload (ADVERSARIAL 7).
     The live score STAYS on round one. It is the reflex feedback the round is made of, and now that
     the tell costs the same as the failure it was a tell for, reading it is honest information rather
     than an exploit. */
  function roundEnter(n, artName) {
    return (s) => {
      if (s.flags['BELLS_R' + n + '_PASS']) return;
      const seen = s.flags['BELLS_R' + n + '_SEEN'] | 0;
      Store.set('BELLS_R' + n + '_SEEN', seen + 1);
      if (seen > 0 && !s.flags['BELLS_R' + n + '_CRACK']) {
        Store.set('BELLS_R' + n + '_CRACK', true);
        Store.set('BELLS_R' + n + '_ABANDONED', true);
        crackBell(s, artName);
      }
    };
  }
  /* One line, only on the branch where it happened, so the room is told what the walk-away cost. */
  const abandonedLine = (s, n) => s.flags['BELLS_R' + n + '_ABANDONED']
    ? [{ text: 'A pattern left half-rung. Above you a bell took the Cold instead.', cls: 'whisper' }] : [];
  function roundSolve(n) {
    return (s, r) => {
      Store.set('BELLS_R' + n + '_HITS', r.hits); Store.set('BELLS_R' + n + '_TOTAL', r.total); Store.set('BELLS_R' + n + '_PASS', !!r.passed);
      if (!r.passed && !s.flags['BELLS_R' + n + '_CRACK']) { Store.set('BELLS_R' + n + '_CRACK', true); crackBell(s, 'ch6_lid'); }
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
      out.push('Not enough. The Cold comes up through the gaps. A bell answers it with a flat note that goes on too long.');
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
  /* There was a copy of the laundry truth map here, and ch6_held recomputed TRUTHS from it. It is
     gone. The map is written three times in three chapters that may not edit each other (ch3.js:440,
     ch8.js:75), the number is computed twice and printed once, and ch6's copy did nothing but
     OVERWRITE the value ch3 had already written correctly — so the only thing it could ever do was
     go stale and be wrong. ch3 writes TRUTHS at the laundry (ch3.js:443) and ch8 prefers the flag
     over its own fallback (ch8.js:76). The real fix is one map in lore.js beside L.tokens.whisper,
     which no chapter agent may make alone; this at least removes the copy that could disagree. */
  const RIGHT = { seer: 'toward', listener: 'none', reader: 'hollow', binder: 'none' };
  /* A right answer is `yes`, then the laundry clause, then `end` -- Wren answering the line the
     player just read off the Wren tab. A wrong one is keyed by the option id, so Wren can answer
     what was actually said. Gray gets the joke: that is Wren's humor coming back. */
  const REPLY = {
    seer: { yes: 'Toward.', end: ' Thanks for moving.', no: { away: 'Away, like everybody\'s? Look down some time, when I\'m not standing here.', none: 'No shadow? I\'ve got one. Look down some time, when I\'m not standing here.' } },
    listener: { yes: 'Nothing.', end: ' Go on. Leave your hand there.', no: { loud: 'That was kind. It wasn\'t true, and I\'d rather have had the true one.', faint: 'That was kind. It wasn\'t true, and I\'d rather have had the true one.' } },
    reader: { yes: 'A hollow. The bit that rings. Four times? I\'d have stopped at one.', end: '', no: { bird: 'That\'s what they call me. It\'s not what it says.', fire: 'I wish. It\'s not what it says.' } },
    binder: { yes: 'None. The knot itself.', end: ' Go on, then. Tie it tight.', no: { red: 'You\'re being kind again. Hold out your arm and look.', grey: 'Gray is a color. I have seen gray. Gray is fine. It isn\'t mine.' } },
  };
  /* One clause of callback on a right answer, and only two ways for it to run: the laundry answer Wren
     remembers, or the one she does not. (Twelve keyed variants was three times the words for the same
     four lines a table ever reads.) */
  const ECHO = { seer: 'TELL', listener: 'NO', reader: 'DONTKNOW', binder: 'YES' };
  const LAUNDRY = {
    seer: [' You told me in the laundry, and I called you poetic.', ' Out loud, this time.'],
    listener: [' You said no in the laundry too, and didn\'t flinch.', ' That\'s the true one.'],
    reader: [' You didn\'t know yet, in the laundry. Now you do.', ' I liked the bird, though.'],
    binder: [' You said yes in the laundry. That was the kind one.', ' You said you didn\'t know. Nobody else ever has.'],
  };
  const wrenSays = (s, role) => {
    const a = s.flags['ASK_' + role], R = REPLY[role];
    return { speaker: 'Wren', text: a === RIGHT[role] ? R.yes + LAUNDRY[role][W(s, role) === ECHO[role] ? 0 : 1] + R.end : (R.no[a] || R.no[Object.keys(R.no)[0]]) };
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

     Enumerated independently, twice, over every DISTINCT BOARD the rule card can produce from the
     pages a table holds — burnt shapes (4 each) x burnt orientations (2 each) x which word a cut says
     x which way the lap runs x where it starts (8) x cold written or left out; the raw space is
     262,144 parameter combinations and 111,752 distinct boards with no pages at all:
       all four            ->      1    KNOT CROWN ASH WELL VEIL EMBER ASH COLD
       drop the Reader     ->    192
       drop the Listener   ->      8
       drop the Seer       ->      8
       drop the Binder     ->     12
       worst pair (Listener + Binder) 64 · (Reader + Binder) 3,064 · (Reader + Seer) 2,048
     Every one of those fields contains the answer, so no drop-a-role table is dead-ended.
     RE-DERIVED A THIRD TIME for the adversarial pass, from the shipped glyphs.js lexicon and the
     STONE and BURNT below, counting distinct boards rather than parameter tuples. Every figure above
     reproduces exactly (1 · 192 · 8 · 8 · 12 · 64 · 3,064 · 2,048 · 262,144 raw · 111,752 unpaged).
     The sweep reported 256 / 8 / 16 / 8 for the four single drops and called three of them wrong;
     that model gives the Listener the START CUT as a parameter. It is not one. The Listener's page
     (companion/ch6.js restFig) carries no cut number at all — it says only that the lap ENDS on a
     silence, i.e. that the last word read is the one with no note — so the start is derived from that
     constraint together with the shapes, the orientations and the direction, and drops out differently
     for every hypothesis about them. That is precisely why the Listener's fact is worth three bits
     rather than one, and it is why dropping the Seer costs 8 and not 16: with the shapes known, only
     one burnt cut can carry the silence, which pins its orientation and leaves three free.
     What the fields were NOT bigger than was the retry budget, because there wasn't one. See
     ch6_strip's maxTries.
     No keyed wrong-answer line touches ANY single-drop field: the only keyed line answers the school's
     own reading, which the Listener's fact rules out, so it cannot split a field for a table that is
     missing a page. (The two boards it does key are reachable only when the Listener AND the Binder
     are both gone, and that field is 64.) The three lines that used to sit beside it —
     seven-words-and-a-hole, the answer reversed, the answer un-inverted — each fired on exactly one
     board, which made them oracles, and they are gone.
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
        reader: { hollow: '"a hollow"', bird: '"a brave bird"', fire: '"a fire"' }, binder: { none: '"the knot itself"', red: '"red — an oath"', grey: '"gray — grief"' },
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
      { id: 'ch6_strip', label: f.STONE_TOLD ? 'The stone, read to you' : '"I know, Mom." — the stone', col: 4, row: 1 },
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
        art: 'ch6_chamber', artParams: bellParams, mood: 'tense', fx: 'ash', sfx: 'step', flame: 0.22,
        title: 'The bell-chamber',
        // PRECRACKED must be seeded before the count is taken, or a fallen stair cracks a bell in the prose and in no flag.
        enter: (s) => { if (s.flags.PRECRACKED == null && s.flags.STAIR === 'COLLAPSE') Store.set('PRECRACKED', true); Store.set('BELLS_CRACKED', crackedNow(s)); widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const out = [
            'The Long Stair ends in a room that is mostly floor. Four bells hang from an iron beam, each as tall as a person.',
            'The floor is one round plate, riveted and faintly warm. You are standing on a lid. Under it, the Cold.',
            { text: 'A shaft runs straight up through the ceiling. At the top is a coin of orange light. It is the Hearth, seen from underneath.', cls: 'whisper' },
            { speaker: 'Wren', text: 'Huh. It\'s smaller from down here. Don\'t tell it I said that.' },
            '"It heard," says the Seer.',
          ];
          if (s.flags.STAIR === 'COLLAPSE') out.push({ text: 'One bell is wrong already. The stair\'s fall ran along the beam, and the first bell went *tang* instead of *tong*.', cls: 'whisper' });
          else if (volunteerLane(s) != null) out.push({ text: `${nick(volunteerLane(s))}'s thread still runs up the Stair behind you, taut as wire, holding the way shut.`, cls: 'whisper' });
          return out;
        },
        next: 'ch6_marrow', button: 'The Provost',
      },
      ch6_marrow: {
        art: 'ch6_lid', artParams: bellParams, mood: 'dread', fx: 'ash', flame: 0.2,
        text: [
          'Provost Marrow kneels where the bell-ropes meet an iron ring. She lays out chalk and salt, and presses her seal into the iron.',
          'The lid shivers. Frost blooms out of the rivets and is gone. Wren watches her hands and says nothing, which is new.',
          { speaker: 'Provost Marrow', text: 'I can close this wound. While I work the Cold pushes, and nothing holds it but the old pattern, rung on these bells by four hands.' },
          { speaker: 'Provost Marrow', text: 'Miss it and the Cold pushes further. That is all that happens. Hands on your keys.' },
          { speaker: 'Wren', text: 'Binder, that\'s an actual rule. From a Provost. Enjoy it.' },
        ],
        next: 'ch6_attune', button: 'Attune',
      },
      ch6_attune: {
        type: 'code', art: 'ch6_lid', artParams: bellParams, mood: 'dread', fx: 'ash', flame: 0.2,
        text: [
          { text: 'A word is cut into the rim of the lid, with a mark beside it. Type both.', cls: 'whisper' },
          { text: 'Read your **Speak** first. The bells come before the stone.', cls: 'whisper' },
        ],
        roles: 'Warden (keyboard): **the Binder**. Voice (reads aloud): **the Listener**.', sightSeconds: 90,
        next: 'ch6_ready',
      },
      /* ---------- the ready screen ---------- */
      ch6_ready: {
        type: 'custom', art: 'ch6_chamber', artParams: bellParams, mood: 'tense', fx: 'ash', flame: 0.2,
        title: 'Before anything counts',
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [
            { text: 'Four lanes, one each, left to right. Press your key as your light crosses the line.', cls: 'whisper' },
            { text: 'Pale blue lights are the Cold. Every hand off the keys.', cls: 'whisper' },
            { text: 'Two patterns. Each one says how many lights it needs. Fall short and a bell cracks, and the night goes on either way.', cls: 'whisper' },
          ];
          if (v != null) out.push({ text: `${nick(v)}'s bell is silent for the first pattern. ${nick(neighbourOf(v, [v]))}, take both keys. One hand on each, and never both at once.`, cls: 'whisper' });
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
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_chamber', artParams: bellParams, mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_practice', replayable: true,
        text: ['Eight lights, nothing counted. Two are the pale blue of the Cold. Hands off for those.'],
        /* NO HINT LADDER, and the three rounds are the same: R10.26's other branch, the one ch7's
           Binding already took (ch7.js:501). Three reasons, and the first is decisive.
           (a) OPENING THE LADDER COSTS THE ROUND. reaction.js drives the pattern from
               requestAnimationFrame + performance.now() (reaction.js:99, :134) with no pause hook, so
               the modal takes four hands off the keys while the lights keep falling. A hint you
               cannot afford to read is not a hint.
           (b) NOTHING ANNOUNCED IT. The other seven widgets pulse #hint after two wrong tries
               (ring.js:89, answer.js:44, grid.js:105 and so on); reaction.js has no such call and
               these scenes had no `par`, so the bell never rang for them at all.
           (c) THE RUNGS WERE NOT ANSWERS. All three restated the rule card, and round three's went
               further and named the partition's cardinality — "three lists, six numbers each" — which
               is the one thing that lets a lane with no page play. Measured off ch6.js's own model: a
               page-less lane told nothing scores 18 of 24 against a pass mark of 20 by every strategy
               there is, and is told "six each, disjoint" it picks six of the twelve unclaimed numbers
               and passes on 262 of the 924 subsets, 28.4%. The last rung sold the round.
           What the rungs were actually carrying — one key each, a chord is one breath, blue is hands
           off, ring on the beat and never on the word — is on the rule card below, on screen for the
           whole round, which is where R10.1 says it belongs. */
        enter: () => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); },
        config: (s) => {
          const v = volunteerLane(s);
          ruleCard([['press', 'your own key, on the line'], ['chord', 'joined lights, one breath'], ['cold', 'blue is the Cold — hands off']]);
          return { practice: true, laneNames: L.nicks, events: evenEvents(PRACTICE, 60000 / tempo(s, 80)), fallMs: 1800, windowMs: win(s, 380), braceWindowMs: win(s, 320), deadLanes: v != null ? [v] : [], pulse: false };
        },
        solvedText: (s, r) => [`${r.hits} of ${r.total}. Nothing counted.`, 'Wren applauds, off the beat. The Reader bows, in case it was for them.', { text: 'Now the real one.', cls: 'whisper' }],
        next: 'ch6_round1', button: 'Ring the pattern',
      },
      /* ---------- the lit pattern ---------- */
      ch6_round1: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', artParams: bellParams, mood: 'tense', fx: 'ash', flame: 0.2, puzzleId: 'ch6_round1',
        enter: (s) => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', false); roundEnter(1, 'ch6_lid')(s); },
        text: (s) => [
          'Marrow presses her seal to the iron. The lid answers, lower than any bell.',
          { speaker: 'Provost Marrow', text: 'Chords now. Together means *together* — every hand inside a breath, or the bell does not sound.' },
          { text: 'Twenty-four lights. Eight of them are the Cold.', cls: 'whisper' },
        ].concat(abandonedLine(s, 1)),
        /* No ladder — see the note on ch6_practice. */
        config: litCfg,
        onSolve: roundSolve(1),
        solvedText: roundText('Seven in ten', ['The pattern holds. The frost stops a hand\'s breadth from her knees.', { speaker: 'Wren', text: 'Ha! Listener, stop checking on me. Check on her.' }, { speaker: 'Provost Marrow', text: 'Good. Do not get proud. The last one is the Founders\' own, and they did not ring it by sight.' }],
          'Again. The next one. You do not stop for a cracked bell.'),
        next: 'ch6_tieoff', button: 'The last pattern',
      },
      ch6_tieoff: {
        art: 'ch6_chamber', artParams: bellParams, mood: 'dread', fx: 'ash', flame: 0.16,
        enter: () => { widgetClass('ch6-bells', false); widgetClass('ch6-dark', false); },
        text: (s) => {
          const v = volunteerLane(s);
          const out = [];
          if (v != null) {
            out.push(`Marrow reaches up, takes hold of something none of you can see, and ties it off to the iron ring.`);
            out.push({ text: `${nick(v)}, your Sight comes back like blood into a numb hand. Open it.`, cls: 'whisper' });
          }
          out.push('Then the light simply stops. In the dark the Listener counts heads out loud. Wren answers last, cheerfully.');
          out.push({ speaker: 'Provost Marrow', text: 'The Founders rang the last pattern blind. One of them called it. Three rang. Listener, your bell goes quiet. You are the voice.' });
          out.push({ text: 'Listener — say the number on each beat that has one.', cls: 'whisper' });
          out.push({ text: 'Reader, Seer, Binder — ring only the numbers on your **Speak**.', cls: 'whisper' });
          return out;
        },
        next: 'ch6_round3', button: 'Ring it blind',
      },
      ch6_round3: {
        type: 'puzzle', puzzle: 'reaction', art: 'ch6_lid', artParams: bellParams, mood: 'dread', fx: 'void', flame: 0.15, puzzleId: 'ch6_round3',
        enter: (s) => { widgetClass('ch6-bells', true); widgetClass('ch6-dark', true); roundEnter(3, 'ch6_lid')(s); },
        text: (s) => ['Thirty-two beats at sixty to the minute. Nothing falls that you can see.'].concat(abandonedLine(s, 3)),
        /* No ladder — see the note on ch6_practice. The old rung 3 named the partition's cardinality,
           which took a page-less lane from a certain 18 to a 28.4% pass. */
        config: darkCfg,
        onSolve: roundSolve(3),
        solvedText: roundText('Eight in ten', ['The last bell goes on ringing after your hands leave the keys. Under your feet, the lid stops beating.', 'The light comes back slowly. Marrow kneels in chalk gone from white to gold.'],
          'That is what we have. Hands off the keys.'),
        next: 'ch6_held', button: 'The Cold is held',
      },
      /* ---------- held, and the Second Asking ---------- */
      ch6_held: {
        art: 'ch6_lid', artParams: bellParams, mood: 'sorrow', fx: 'ash', flame: 0.15,
        enter: (s) => {
          widgetClass('ch6-bells', false); widgetClass('ch6-dark', false);
          Store.set('CLUES', 0);
          const c = s.flags.BELLS_CRACKED | 0;
          Store.note(c ? `The Bells held with ${c === 1 ? 'one bell' : c + ' bells'} cracked.` : 'The Bells held, and not one bell cracked.');
        },
        text: (s) => {
          const c = s.flags.BELLS_CRACKED | 0;
          return [
            (c === 0 ? 'Four bells, whole, still humming.' : c === 1 ? 'Three bells humming, and one hanging silent with its wound.' : `${c === 2 ? 'Two bells' : 'One bell'} humming. The others hang with their cracks.`)
              + ' Marrow lays both hands flat on the iron and lets her shoulders down.',
            { speaker: 'Provost Marrow', text: 'It is held. Not closed. Held. The last of it is not mine to do.' },
            { speaker: 'Provost Marrow', text: 'Now, love. Walk.' },
            'The Seer steps in front of Wren without a word. Wren doesn\'t walk. For once, there is no joke.',
            { speaker: 'Wren', text: 'In the laundry I asked you each one question. You all wriggled out of it. I\'m asking again, out loud. Look at me when you answer.' },
            { text: 'Open your **Wren** tab. When Wren asks you, read your line to Wren. Then pick the answer you gave.', cls: 'whisper' },
          ];
        },
        next: 'ch6_ask_owl', button: 'Seer first',
      },
      ch6_ask_owl: {
        type: 'choice', art: 'ch6_shaft', mood: 'sorrow', fx: 'ash', flame: 0.15, choice: 'ASK_OWL',
        text: [
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
          askOpt('grey', 'Gray. Grief.', 'binder', false, 'ch6_iknow'),
          askOpt('none', 'None. Not unbound. The knot itself.', 'binder', true, 'ch6_iknow'),
        ],
      },
      ch6_iknow: {
        art: 'ch6_lid', artParams: bellParams, mood: 'sorrow', fx: 'ash', flame: 0.14,
        enter: () => { Store.note('Marrow said aloud what came out of the fire.'); },
        text: (s) => {
          const c = s.flags.CLUES | 0;
          return [
            wrenSays(s, 'binder'),
            { speaker: 'Wren', text: c === 4 ? 'Four for four. I knew them all already. It\'s better out loud.' : c === 0 ? 'Four kind answers. I heard every one, and it changes nothing.' : `${c === 1 ? 'One true answer. I knew that one' : (c === 2 ? 'Two' : 'Three') + ' true answers. I knew those'} already.` },
            { speaker: 'Wren', text: 'And, Mom? I know. I\'ve known since the laundry. Tell them. You\'re allowed.' },
            'Wren sits down beside her, on the warm part of the lid. Marrow tells it without getting up.',
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
          'It lights the underside of the prophecy stone. Eight cuts run all the way round its foot. Four are clean. Four are burned to a smear.',
          { speaker: 'Wren', text: 'Right. Everybody stop looking at me and look at that. The school has only ever read it from the top.' },
          'The Reader is already reading, lips moving.',
          { text: 'Open your **Sight**. The stone is on it.', cls: 'whisper' },
        ],
        next: 'ch6_strip', button: 'Read it',
      },
      ch6_strip: {
        type: 'puzzle', puzzle: 'ring', art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.12, puzzleId: 'ch6_strip', par: [3, 5, 7],
        /* THE READING BUDGET. Four readings, and then the stone is read for you.
           Until this pass the stone had no maxTries at all, and its only cost stopped being charged
           after the third cracked bell — a ceiling a table can ARRIVE at (ch5's collapsed stair seeds
           one, each bell round can spend one). So a table missing a page faced a field of 8 or 12
           boards, submitted them one after another, and after the third wrong reading paid nothing
           whatever. Field against budget, re-derived (see the enumeration above STONE):
             pages at the table   distinct boards   readings to be certain   passes within 4
             all four                          1                        1              always
             no Binder                        12                       12         4/12 = 33%
             no Listener                       8                        8         4/8  = 50%
             no Seer                           8                        8         4/8  = 50%
             no Reader                       192                      192          4/192 = 2%
           A four-handed table needs one reading and never meets the budget; a three-handed table now
           has to be right rather than patient. This is HALF of ADVERSARIAL.md OPEN 2 and it is the
           half that can be taken inside one chapter: the budget bites, but running out of it still
           opens the Walk, because WALK_UNLOCKED is read by ch7 (ch7.js:49, :276) and printed by ch8,
           and a ch6 agent may not decide on its own what losing costs there. What running out DOES
           cost is recorded in STONE_TOLD, said by Marrow, printed in ch6_open and in the ledger, and
           left where ch7/ch8 can spend it if the Integrate phase decides they should.
           The budget itself is on the ring's config below, where ring.js reads it. */
        text: (s) => [
          /* R1.4: six paragraphs, none over 18 words. The cost clause is CONDITIONAL because the
             card used to state a price the game could not charge — a table arriving with three
             bells already cracked (ch5's stair, both rounds lost) was told each wrong reading
             cracked one, and none did. Marrow's own failure line has always said the truth; the
             brief now says it too, before the first reading rather than after it. */
          crackedNow(s) < 3
            ? 'Eight cuts, four burnt. Four readings, and a wrong one cracks a bell you need later.'
            : 'Eight cuts, four burnt. Four readings, and no bell left to pay for a wrong one.',
          { text: 'Say your one thing out loud first.', cls: 'whisper' },
        ],
        config: () => {
        /* The price of a wrong reading, in two stages, and it never stops being charged.
           BELLS_CRACKED cannot simply be uncapped: ch7 mutes one lane per crack out of three and ch8
           prints it out of three, so at three the mechanical currency this chapter owns is not capped,
           it is SPENT — a table that has cracked all four bells has already paid the heaviest
           compounding price in the game, and R10.20 forbids a dead end besides.
           So the stone keeps its own counter, STONE_MISREAD, and it is a Store flag, never a local:
           Resume and paste-a-save both call location.reload(), and Chapter V shipped a cost a refresh
           erased. Uncapped, it is said aloud in the failure line with its running total, it changes
           what Marrow says when the Walk opens, and it is printed in the chapter's ledger.
           Beyond the third cracked bell the money runs out and the BUDGET is what still bites: the
           fourth wrong reading is the last reading, whatever it costs in bells.
           A board with fewer than six words is not a reading and costs nothing at all, and does not
           spend a try either (R10.19: under-commitment is coached, not punished). */
        const price = () => {
          const st = Store.state;
          const n = (st.flags.STONE_MISREAD | 0) + 1;                 // NOT a local: the game reloads on Resume
          Store.set('STONE_MISREAD', n);
          const left = 4 - n;
          const tail = left > 0 ? ` ${left === 1 ? 'One reading left.' : left + ' readings left.'}` : '';
          /* no art name: ch6_stonefoot hangs no bells, so there is nothing for a repaint to change
             and a crossfade of the same picture on every wrong reading is only a flicker. The count
             reaches the screen again at ch6_flow, which is the chamber. */
          if (crackBell(st, null)) return { n: n, line: ' Above you a bell takes the wrong word, and cracks.' + tail };
          return { n: n, line: ` No bell left to crack. Marrow says it out loud instead. ${readings(n)}, and the stone keeps the count.` + tail };
        };
        const cfg = {
          title: 'THE FOOT OF THE STONE',
          note: 'The Provost, not looking up: *Eight cuts round the foot, and a ring has no first. Every cut says one word standing up and its other upside down. The school starts at the **mark** and reads up the count, leaving the cold word **empty**. Slot 1 is the first word you read. You have **four readings**.*',
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
            /* An unfinished board must not spend a try, and ring.js counts a try for every check that
               is not `true`. So it is refunded here, on the one branch that costs nothing. */
            if (got.filter(Boolean).length < 6) { cfg.maxTries++; return 'Not a reading yet. Six words at least, and then read it aloud.'; }
            const cost = price();
            if (same(got, NAIVE) || same(got, SCHOOL)) return 'From the mark, the way the cuts count up: four hundred years of school. The strip stays cold.' + cost.line;
            return (cost.n >= 2 ? 'The stone does not answer. Wren, quietly: "Has everybody actually said their bit?"'
              : 'The stone does not answer. Frost feathers across the strip and it clears.') + cost.line;
          },
          /* The budget is spent in STONE_MISREAD, not in ring.js's local `tries`, because Resume and
             paste-a-save both call location.reload() and a budget a refresh refills is not a budget
             (ADVERSARIAL 7 — Chapter V shipped exactly that). ring.js counts every check that is not
             `true`, so the under-committed branch above hands its try back. */
          maxTries: Math.max(1, 4 - (Store.state.flags.STONE_MISREAD | 0)),
        };
        return cfg; },
        hints: [
          'Each of you holds one piece. Say yours out loud.',
          'A ring has no first cut, so something must say where the lap ends. Somebody here can hear it. And the school is not the only way to read a cut.',
          /* GENERATED, never typed. ch4 shipped a rung 3 that had drifted from the board the puzzle
             accepts, on a maxTries:1 puzzle, and a table that spent its last resort lost the oath.
             TURNED is the board check() accepts; this sentence is that board and cannot disagree with
             it. tools/scripts/ch6-stone-check.js asserts as much without a browser. */
          () => TURNED.map((g, i) => (i === 0 ? 'Slot 1 ' : (i + 1) + ' ') + g).join(', ') + '. Then four hands.',
        ],
        onSolve: (s, r) => {
          const told = !!(r && r.failed);
          Store.set('WALK_UNLOCKED', true); Store.set('LAW0', true);
          if (told) Store.set('STONE_TOLD', true);
          if ((s.hintsUsed.ch6_strip || 0) >= 3) { Store.set('CLUES_HELP', true); Store.note('You read the stone with help.'); }
          const mis = s.flags.STONE_MISREAD | 0;
          Store.note(told
            ? `You spent four readings and the Provost read the stone for you. The Fourfold Walk is open, and the stone keeps the count.`
            : 'You read the prophecy stone the way it was carved. The Fourfold Walk is open.' + (mis ? ` It took ${readings(mis)} first.` : ''));
        },
        solvedText: (s, r) => (r && r.failed
          ? [{ speaker: 'Provost Marrow', text: 'Four readings. Stop. Hands off it — I have had four hundred years of this stone and you have had five minutes.' },
             'She kneels at the foot, puts one thumb in the first burn, and reads it the way the Founders cut it.']
          : ['Four hands. Above you the Hearth flares white for the space of a breath, and the strip reads itself aloud.'])
          .concat([
            'KNOT · CROWN · ASH · WELL · VEIL · EMBER · ASH · COLD',
            { text: '"Four, as one, go down with fire. What is kept stays behind. The fire is the hollow they left."', cls: 'omen' },
          ]),
        next: 'ch6_open', button: 'What it means',
      },
      ch6_open: {
        art: 'ch6_stonefoot', mood: 'wonder', fx: 'motes', flame: 0.14,
        /* The wrong readings have to land somewhere the room can see, or the price is only a number.
           One swapped clause, never an added section. */
        text: (s) => {
          const mis = s.flags.STONE_MISREAD | 0;
          return [
            'Four went down. Not one born of four, but four, as one. The fire is only what they left behind.',
            /* WHY THE FIRE IS GOING OUT, said out loud, once, here. The Prologue opens with it ("it
               has never once gone out — except one night, fourteen years ago"), ch5.js:250 has Marrow
               state it flat ("the fire is going out"), and until this pass no chapter answered it:
               two chapter owners flagged it in this sweep and neither could take it, because the
               answer has to agree with ch6's reveal (the fire IS the Founders) AND with ch8's endings
               (ch8.js:266 "for the first time in four hundred years it is not holding anything shut",
               ch8.js:311 "four hundred years of fire, again, from a spark"). It invents nothing: the
               fire is four people, four people is a finite amount of fire, and that is the whole of
               it. It goes in Marrow's mouth at the one beat where the stone has just said what the
               fire is, and it says nobody is to blame, which is the chapter's own line about Wren. */
            { speaker: 'Provost Marrow', text: 'Four people\'s worth of fire, and four hundred years to spend it in. That is why it is going out. They came back up, all four, and never had a Sighting again. Nobody did anything wrong.' },
            /* STONE_TOLD is the losing branch of the reading budget, and this is where it is SAID.
               docs/ADVERSARIAL.md OPEN 2 is settled across ch6, ch7 and ch8 together: the last two
               chapters price a wrong answer as a record rather than a loss, the Walk still opens, and
               the one cross-chapter bite is that ch7's night starts two minutes short (ch7.js,
               nightFor). Marrow names that here, in the chapter that charged it, in the mouth of the
               person who charged it -- a swapped clause, not an added section. */
            s.flags.STONE_TOLD
              ? { speaker: 'Provost Marrow', text: 'And I read it, not you. That is two minutes you will want at the bottom. Walk anyway.' }
              : mis ? { speaker: 'Provost Marrow', text: `And ${readings(mis)} first. The stone keeps that too. Walk anyway.` } : null,
            { text: 'THE FOURFOLD WALK IS OPEN.', cls: 'big' },
            { text: 'The road four people walk together, not one. Binder, the struck Law is back in your **Book**.', cls: 'whisper' },
            { speaker: 'Wren', text: 'No. Those are *yours*. The Listener is not going deaf on my account. …I did say I needed four idiots. I didn\'t mean this.' },
          ].filter(Boolean);
        },
        next: 'ch6_flow', button: 'The night moves on',
      },
      ch6_flow: {
        type: 'flow', art: 'ch6_chamber', artParams: bellParams, mood: 'hearth', fx: 'ash', flame: 0.12,
        enter: (s) => { Game.scenes.ch6_flow.flow = buildFlow(s); },
        text: ['At the edge of the lid, Wren holds out a wrist with a bit of string on it. The Binder checks the knot twice.', { text: 'Next: the Cold. Pass the keyboard by name.', cls: 'small' }],
        flowTitle: 'Chapter VI — the paths you walked',
        stats: (s) => {
          const c = s.flags.BELLS_CRACKED | 0, mis = s.flags.STONE_MISREAD | 0;
          const bells = c === 0 ? 'The four bells came through whole' : c === 1 ? 'One bell is cracked' : (c === 2 ? 'Two' : 'Three') + ' bells are cracked';
          const read = s.flags.STONE_TOLD ? `, and the stone was read to you after ${readings(mis)}`
            : mis ? `, and the stone took ${readings(mis)}` : '';
          return `${bells}${read}. You gave Wren **${s.flags.CLUES | 0}** of the four answers Wren already had. Hints so far: ${s.flags.hintsTotal || 0}.`;
        },
        next: 'ch7_start', button: 'The Finale',
      },
    },
  });
})();
