/* Companion — Chapter VI, the bell-chamber (WELL · cast: VOLUNTEER, PRECRACKED).
   The stone, one fact each and no page holding another's: the Reader has what the four burnt cuts were,
   the Seer which way each of them was struck, the Listener where the lap ends, the Binder the older Law
   and its three clauses. The bells live on Speak: the Listener has the count and calls every number, and
   the Reader, the Seer and the Binder each have six numbers that are bells of theirs and nobody else's.
   No bell in the dark pattern is shared, so no page can be covered by pooling the other two. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const F = 'font-family="Cinzel,serif"';
  const COL = { reader: '#f2d27a', listener: '#4fb3bf', seer: '#a482e6', binder: '#d96b4a' };

  /* ---------- the dark pattern ----------
     One token per beat, 1 to 32. A COPY of ROUND3 in js/content/ch6.js — the Hearth rings it, this page
     reads it. Keep the two identical. 'x' is the Cold, '.' a silent beat. */
  const ROUND3 = '. R S B . xRSB S R B . xRSB B R . S B xRSB R . S B xRSB . xRSB S R . B S xRSB . R';
  const BEATS = ROUND3.trim().split(/\s+/);
  /* EVERY sounding beat is numbered, 1 to 24 — bells and Cold alike — and the Listener calls all of
     them. Nothing on this page says which is which. Every bell belongs to exactly one lane, so a page
     is the only thing that can ring it: pressing on every call rings the Cold and fails, and so does
     pressing on every number somebody else claimed. (The enumeration is above ROUND3 in ch6.js.) */
  const SOUND = [];                                    // { n, beat, tok, cold }
  BEATS.forEach((t, i) => { if (t !== '.') SOUND.push({ n: SOUND.length + 1, beat: i + 1, tok: t, cold: t[0] === 'x' }); });
  const CALL = {};                                     // beat -> the number to call on it (one beat early)
  SOUND.forEach(b => { CALL[b.beat - 1] = b.n; });
  const LETTER = { reader: 'R', seer: 'S', binder: 'B' };
  const mine = (roleId) => SOUND.filter(b => !b.cold && b.tok.indexOf(LETTER[roleId]) >= 0).map(b => b.n);

  /* The Listener's score: thirty-two beats, and the number to say on each. Nobody else has it. */
  const callComb = () => {
    const cw = 42, rows = 4, per = 8, ch = 48, pitch = 56;
    let s = `<svg viewBox="0 0 ${per * cw + 10} ${rows * pitch + 30}" style="width:100%">`;
    for (let i = 0; i < 32; i++) {
      const r = Math.floor(i / per), c = i % per, x = 8 + c * cw, y = 6 + r * pitch, b = i + 1, n = CALL[b];
      s += `<rect x="${x}" y="${y}" width="${cw - 6}" height="${ch}" rx="4" fill="${n ? 'rgba(79,179,191,.22)' : 'none'}" stroke="${n ? '#4fb3bf' : 'rgba(255,255,255,.18)'}" stroke-width="1.2"/>`;
      s += `<text x="${x + 4}" y="${y + 14}" fill="rgba(255,255,255,.55)" font-size="13" ${F}>${b}</text>`;
      if (n) s += `<text x="${x + (cw - 6) / 2}" y="${y + 41}" text-anchor="middle" fill="#4fb3bf" font-size="20" ${F}>${n}</text>`;
    }
    s += `<text x="${(per * cw + 10) / 2}" y="${rows * pitch + 22}" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="13" ${F}>the beats, and the number to say on each</text>`;
    return s + '</svg>';
  };
  /* One player's bells, drawn: all twenty-four numbers, and the six that are yours. The other
     eighteen are somebody else's bell or the Cold, and this page never says which. */
  const myBells = (roleId) => {
    const ms = mine(roleId), col = COL[roleId], cw = 42, n = SOUND.length;
    let s = `<svg viewBox="0 0 ${8 * cw + 10} 170" style="width:100%">`;
    for (let i = 1; i <= n; i++) {
      const r = Math.floor((i - 1) / 8), c = (i - 1) % 8, x = 8 + c * cw, y = 6 + r * 46, on = ms.indexOf(i) >= 0;
      s += `<rect x="${x}" y="${y}" width="${cw - 6}" height="36" rx="4" fill="${on ? col : 'none'}" fill-opacity="${on ? .85 : 0}" stroke="${on ? col : 'rgba(255,255,255,.18)'}" stroke-width="1.2"/>`;
      s += `<text x="${x + (cw - 6) / 2}" y="${y + 25}" text-anchor="middle" fill="${on ? '#12101a' : 'rgba(255,255,255,.3)'}" font-size="16" ${F}>${i}</text>`;
    }
    s += `<text x="${(8 * cw + 10) / 2}" y="160" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="13" ${F}>your bells, of the twenty-four numbers</text>`;
    return s + '</svg>';
  };

  /* ---------- the stone ----------
     Cuts 1, 3, 5 and 7 are the four the fire took, and cut numbers are the only coordinates on any
     page — the Hearth's board, the art and all four Sight pages use the same 1 to 8. */
  /* These three are pure functions of ch6.js's STONE and BURNT, computed with a pencil, because the
     Companion is a separate page and cannot see the Hearth's chapter file. Nothing in the app checks
     them against it, so `node tools/scripts/ch6-stone-check.js` does: it loads both files under a VM
     stub and asserts BURNT_CUTS === BURNT+1, BURN_SHAPES === the burnt cuts' shapes, BURN_UP ===
     their orientations, and that the Reader's and the Seer's sentences below say the same thing the
     arrays do. Change either file and run it. */
  const BURNT_CUTS = [1, 3, 5, 7];
  const BURN_SHAPES = ['Flame', 'Crown', 'Spike', 'Crown'];   // Reader: WHAT was cut
  const BURN_UP = [true, true, true, false];                  // Seer: which way the chisel went in

  /* The Reader's four burns, drawn on their side, so the page can say what was cut and cannot say which
     way up it stood — that half is the Seer's, and the geometry is what keeps it there. (ch0's collar.) */
  const burnCuts = () => `<svg viewBox="0 0 300 132" style="width:100%;max-width:300px">
    ${BURN_SHAPES.map((sh, i) => { const x = 38 + i * 75; return `<g><rect x="${x - 32}" y="6" width="64" height="64" rx="6" fill="rgba(0,0,0,.35)" stroke="rgba(242,210,122,.35)"/><g transform="translate(${x},38) rotate(90) scale(1.25)" style="color:#f2d27a">${G.SHAPES[sh]}</g><text x="${x}" y="89" text-anchor="middle" fill="rgba(242,210,122,.85)" font-size="13" ${F}>cut ${BURNT_CUTS[i]}</text></g>`; }).join('')}
    <text text-anchor="middle" fill="rgba(255,255,255,.65)" font-size="12.5" ${F}><tspan x="150" y="108">laid on their side</tspan><tspan x="150" y="125">what was cut, not which way up</tspan></text>
  </svg>`;

  /* The Listener's fact, drawn as a lap: eight notes round a ring, and the one it stops on is a
     silence. No cut number anywhere on it — WHICH cut that is comes from the other three pages, and
     this page may not know. The geometry is the separation. */
  const restFig = () => `<svg viewBox="0 0 300 196" style="width:100%;max-width:300px">
    <g transform="translate(150,100) scale(1.35) translate(-150,-62)">
    <circle cx="150" cy="62" r="44" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>
    ${[0,1,2,3,4,5,6].map(i => { const a = (-90 + (i + 1) * 45) * Math.PI / 180; return `<circle cx="${(150 + Math.cos(a) * 44).toFixed(1)}" cy="${(62 + Math.sin(a) * 44).toFixed(1)}" r="7" fill="#4fb3bf"/>`; }).join('')}
    <circle cx="150" cy="18" r="7" fill="none" stroke="#4fb3bf" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M120,104 A44,44 0 0 0 174,100" fill="none" stroke="#4fb3bf" stroke-width="1.4" opacity=".7"/>
    </g>
    <text x="150" y="22" text-anchor="middle" fill="#4fb3bf" font-size="13" ${F}>silence</text>
    <text x="150" y="188" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12.5" ${F}>one lap of eight, and it stops on the silence</text>
  </svg>`;

  /* Under the foot: eight recesses, four of them scorched, and which way each chisel went in.
     No shape and no rule — the Seer reports how a cut was struck, never what it says. */
  const underFoot6 = (() => {
    let s = `<svg viewBox="0 0 360 212"><rect width="360" height="212" fill="#000"/>`;
    s += `<text x="180" y="22" text-anchor="middle" fill="#fff" font-size="13" ${F} opacity=".85">the foot of the stone, from below · cuts 1 to 8</text>`;
    let burn = 0;
    for (let i = 0; i < 8; i++) {
      const x = 16 + i * 42, isBurn = i % 2 === 0;
      s += `<rect x="${x}" y="36" width="34" height="52" rx="3" fill="none" stroke="#fff" stroke-width="1.1" opacity="${isBurn ? .5 : .85}"/>`;
      s += `<text x="${x + 17}" y="108" text-anchor="middle" fill="${isBurn ? '#a482e6' : 'rgba(255,255,255,.55)'}" font-size="14" ${F}>${i + 1}</text>`;
      if (isBurn) {
        burn++;
        const up = BURN_UP[burn - 1];
        s += `<g stroke="#a482e6" stroke-width="2.4" fill="none" stroke-linecap="round" transform="translate(${x + 17},62)">`
          + (up ? `<path d="M-9,6 L0,-7 L9,6"/>` : `<path d="M-9,-6 L0,7 L9,-6"/>`) + `</g>`;
      }
    }
    s += `<g stroke="#fff" fill="none" stroke-width="1.4" transform="translate(180,150) scale(0.9)"><path d="M0,-16 C6,-8 10,-2 10,4 C10,11 5,15 0,15 C-5,15 -10,11 -10,4 C-10,-2 -6,-8 0,-16 Z" opacity=".7"/><path d="M-70,16 L70,16" opacity=".4"/></g>`;
    s += `<text x="180" y="198" text-anchor="middle" fill="#fff" font-size="13" ${F} opacity=".75">the fire, lower than it has ever been</text>`;
    return s + '</svg>';
  })();

  /* Wren, under the chamber: five shadows away from the shaft, one toward it. The bells are unnamed. */
  const underChamber = `<svg viewBox="0 0 360 296">
    <rect width="360" height="296" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="340" height="254"/>
      <circle cx="180" cy="34" r="14"/><path d="M180,12 L180,4 M162,20 L156,14 M198,20 L204,14 M160,34 L152,34 M200,34 L208,34"/>
      <line x1="40" y1="78" x2="320" y2="78" stroke-width="2"/>
      ${[70, 143, 217, 290].map((x) => `<path d="M${x - 14},112 L${x - 14},92 Q${x - 14},80 ${x},80 Q${x + 14},80 ${x + 14},92 L${x + 14},112 Z"/><line x1="${x}" y1="78" x2="${x}" y2="80"/>`).join('')}
      <circle cx="180" cy="178" r="56" stroke-dasharray="4 3"/><circle cx="180" cy="178" r="8"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="180" cy="160" r="5"/><circle cx="112" cy="196" r="6"/><circle cx="148" cy="212" r="6"/><circle cx="212" cy="212" r="6"/><circle cx="248" cy="196" r="6"/><circle cx="180" cy="215" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M112,196 L98,224"/><path d="M148,212 L140,238"/><path d="M212,212 L220,238"/><path d="M248,196 L262,224"/><path d="M180,160 L180,180" opacity=".6"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M180,215 L180,190"/></g>
    <g fill="#fff" font-size="13" ${F}><text x="180" y="67" text-anchor="middle">the Hearth — up the shaft</text><text x="180" y="286" text-anchor="middle" opacity=".75">shadows, as they fall</text><text x="180" y="252" text-anchor="middle" fill="#a482e6">Wren</text></g>
  </svg>`;

  const threadLine = (kind) => `<svg viewBox="0 0 90 16" style="width:74px;height:14px;vertical-align:middle">${
    kind === 'whole' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="#d96b4a" stroke-width="2.5" stroke-linecap="round"/>'
    : kind === 'grey' ? '<path d="M4,8 C24,2 34,14 52,8 S74,4 86,8" fill="none" stroke="rgba(200,200,210,.7)" stroke-width="2.5" stroke-linecap="round"/>'
    : '<path d="M4,8 L86,8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>'
  }</svg>`;

  /* ---------- the volunteer's thread (Chapter V's spent Sight), on the Speak tab ---------- */
  const threadBlock = () => ({ t: 'custom', render: (el, cx) => {
    const st = cx.state; st.thread = st.thread || { letGo: 0, held: 0 }; cx.save();
    el.appendChild(UI.el('div', { class: 'blk-svg underlayer', html: `<svg viewBox="0 0 360 80"><rect width="360" height="80" fill="#000"/><path id="ch6-thread" d="M10,40 C80,30 120,50 180,40 S280,30 350,40" fill="none" stroke="#fff" stroke-width="2"/><g id="ch6-fray" stroke="#fff" stroke-width="1" opacity=".5"><path d="M150,40 l-8,-10"/><path d="M200,42 l6,-9"/><path d="M260,36 l-5,-9"/></g><text x="180" y="72" text-anchor="middle" fill="#fff" font-size="13" font-family="Cinzel,serif" id="ch6-thread-txt">the thread — fraying</text></svg>` }));
    const thread = el.querySelector('#ch6-thread'), fray = el.querySelector('#ch6-fray'), txt = el.querySelector('#ch6-thread-txt');
    let holding = false, t0 = 0;
    const btn = UI.el('button', { class: 'btn primary hold-btn', style: { width: '100%', marginTop: '8px' }, text: 'HOLD — keep a finger on it' });
    const down = (e) => { e.preventDefault(); if (holding) return; holding = true; t0 = Date.now(); thread.setAttribute('stroke-width', '3'); fray.style.opacity = '0'; txt.textContent = 'held'; btn.textContent = 'holding…'; };
    const up = () => { if (!holding) return; holding = false; st.thread.held += Date.now() - t0; st.thread.letGo += 1; cx.save(); thread.setAttribute('stroke-width', '2'); fray.style.opacity = '.5'; txt.textContent = 'the thread — fraying'; btn.textContent = 'HOLD — keep a finger on it'; };
    btn.addEventListener('pointerdown', down); btn.addEventListener('pointerup', up); btn.addEventListener('pointerleave', up); btn.addEventListener('pointercancel', up);
    el.appendChild(btn);
    el.appendChild(UI.el('p', { class: 'fine', style: { marginTop: '10px' }, text: 'Nothing on the Hearth shows whether you let go. This page remembers, and will tell you — only you — at the end.' }));
  } });

  const COST = 'Four readings, no more. A wrong one cracks a bell above you.';

  C.chapters.push({
    id: 'ch6',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const vol = ctx.flags.VOLUNTEER | 0; const volRole = vol >= 1 && vol <= 4 ? L.roles[vol - 1] : null; const isVol = !!(volRole && volRole.id === roleId);
      const laundry = ctx.answer('ch3', 'whisper');
      /* DELIBERATE, and it reads out of ANOTHER chapter's cast on purpose: LAW0 is declared in ch5's
         cast, bit 3 (js/content/lore.js:22), and ch6's own cast is [VOLUNTEER, PRECRACKED]
         (lore.js:23), so a ch6 code alone cannot carry it. Scanning every stored attunement is how
         this page learns whether Chapter V already put the struck Law back in the Book.
         It is a display state and nothing else: BOTH branches give the Binder the same instruction —
         down the count, every cut its other word, the cold word written in. law0 only decides whether
         the Founders' card reads RESTORED or STRUCK, 212. A table whose phone has no ch5 code sees
         STRUCK and reads the stone exactly the same way. */
      const law0 = !!(ctx.state.unlocked && Object.values(ctx.state.unlocked).some(u => u && u.flags && u.flags.LAW0));
      const neighbor = (l) => L.roles[[l - 1, l + 1, l - 2, l + 2].filter(x => x >= 0 && x < 4 && x !== l)[0]].nick;

      /* ---------- SPEAK: the bells ---------- */
      if (roleId === 'listener') {
        P.speak.push({ t: 'h', text: 'The dark pattern — you are the voice' });
        P.speak.push({ t: 'p', text: 'Your own bell goes quiet. The Hearth counts the beats to thirty-two. Say the number on each beat that has one, and nothing on the others.' });
        P.speak.push({ t: 'svg', svg: callComb() });
        P.speak.push({ t: 'fine', text: '**Say all twenty-four.** You call each number one beat early, so its owner rings on the next.' });
      } else {
        P.speak.push({ t: 'h', text: 'Your bells' });
        P.speak.push({ t: 'p', text: 'In the dark the Listener calls every number, one beat early. Six of the twenty-four are yours: **' + mine(roleId).join(' · ') + '**. Ring on the beat after yours is called.' });
        P.speak.push({ t: 'svg', svg: myBells(roleId) });
        P.speak.push({ t: 'fine', text: 'Any other number is somebody else’s bell, or the Cold wearing a bell’s face. Keep your hand still for it.' });
      }
      if (isVol) {
        P.speak.push({ t: 'divider' });
        P.speak.push({ t: 'p', text: 'Your Sight is still up the Stair, holding the way shut. Through the first pattern your bell is silent and **' + neighbor(vol - 1) + '** rings it. The Provost ties the thread off before the dark one.' });
        P.speak.push(threadBlock());
      }
      P.speak.push({ t: 'fine', text: '*' + L.houseRule + '*' });

      /* ---------- SIGHT: the stone ---------- */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'What the fire ate' });
        P.sight.push({ t: 'p', text: 'The fire burned four of the eight cuts. On your page they are clean.' });
        P.sight.push({ t: 'html', html: burnCuts() });
        P.sight.push({ t: 'p', text: '**Cut 1 a flame. Cut 3 a crown. Cut 5 a spike. Cut 7 a crown.** Say them by number.' });
        P.sight.push({ t: 'fine', text: COST });
        P.sight.push({ t: 'fine', text: 'Which way up each one stood is not on your page. Ask, then find its word in your **Book**.' });
      }

      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'Where the lap ends' });
        P.sight.push({ t: 'p', text: 'When the fire drops, the shaft rings one lap of the stone. You cannot hear the words. You can hear where the lap stops.' });
        P.sight.push({ t: 'html', html: restFig() });
        /* Flat on purpose. The line's real steps would name two of the burnt words to anybody
           holding the Ladder in their Book, and this page may only say where the lap ends. */
        P.sight.push({ t: 'audio', label: 'The end of the lap', strip: CA.strip([0, 0, 'rest']), play: (A) => CA.playSteps(A, [0, 0, 'rest']), text: '**The lap ends on a silence.** Listen for the gap, not the tune.' });
        P.sight.push({ t: 'fine', text: 'One word has no note, and your **Book** says which. The cut that says it is read last. Ask for the rest.' });
      }

      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Under the soot' });
        P.sight.push({ t: 'p', text: 'Under the soot, the four burnt cuts are still there. You can see which way each chisel went in.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underFoot6 });
        P.sight.push({ t: 'p', text: '**Cuts 1, 3 and 5 were struck point-up. Cut 7 points down.**' });
        P.sight.push({ t: 'fine', text: 'Get one the wrong way up and the whole lap is wrong. Say which way, and stop.' });
      }

      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Two Laws, one hand' });
        P.sight.push({ t: 'html', html: `<div class="laws">
          <div class="law founders${law0 ? '' : ' struck'}"><div class="era">Law 0 · Founders' · Year 0 · ${law0 ? 'RESTORED' : 'STRUCK, 212'}</div><div class="txt">Read a line as the cuts count down. Every cut says its other word. COLD is written by four hands.</div></div>
          <div class="law order"><div class="era">Law 6 · the Convocation's · Year 212</div><div class="txt">Begin at the mark and read as the cuts count up. A cut says the word it stands for. COLD is never written.</div></div>
        </div>` });
        P.sight.push({ t: 'p', text: 'One hand wrote both, two hundred years apart. A Law that is merely wrong is forgotten. An *inconvenient* one is struck. **The older one binds, all three clauses of it.**' });
        P.sight.push({ t: 'fine', text: 'Down the count, every cut its other word, and the cold word written in. Ask for the cuts.' });
      }

      /* ---------- WREN ----------
         The Second Asking (P6). Wren asks each of you, out loud, the question you dodged in the
         laundry. The private line keeps your laundry answer (ch3's whisper token) and the thing you
         have seen. The letter is the true answer, said in your own voice. The Hearth's option you
         pick afterwards is still yours: the kind answer is on the board too. */
      const said = (w) => w ? w + ' ' : 'Wren asked you in the laundry, and you never answered. ';
      if (roleId === 'reader') {
        P.wren.push({ t: 'h', text: 'The name on the roll' });
        P.wren.push({ t: 'p', text: said(laundry === 'TELL' ? 'In the laundry you told Wren the name meant a small brave bird. You made it up.' : laundry === 'DONTKNOW' ? 'In the laundry you told Wren you did not know yet. It was true then.' : '')
          + 'Since the study, you know. The old spelling means the hollow of a bell.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“A hollow. The inside of a bell. I checked it four times in the study, hoping I’d read it wrong. I hadn’t. It’s the part that rings. Of course it’s you.”' });
      }
      if (roleId === 'listener') {
        P.wren.push({ t: 'h', text: 'How quiet' });
        P.wren.push({ t: 'html', html: `<div class="heartbeats"><div class="hb"><span>Provost Marrow</span>${D.trace('fast')}</div>${['Reader', 'Listener', 'Seer', 'Binder'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.wren.push({ t: 'p', text: said(laundry === 'LOUD' ? 'In the laundry you told Wren you could hear it, loud. You have worried at that ever since.' : laundry === 'NO' ? 'In the laundry you said no. It was the one true thing Wren heard that night.' : '')
          + 'Not once has there been anything to catch. You decided years ago the fault was yours.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“No. I’ve never heard it, not once. I kept thinking I was listening wrong. Can I just… put my hand over it, for a minute? In case it’s shy.”' });
      }
      if (roleId === 'seer') {
        P.wren.push({ t: 'h', text: 'The shadow' });
        P.wren.push({ t: 'svg', cls: 'underlayer', svg: underChamber });
        P.wren.push({ t: 'p', text: said(laundry === 'TELL' ? 'In the laundry you told Wren. Wren called it poetic.' : laundry === 'NOTHING' ? 'In the laundry you looked at the wall.' : '')
          + 'The fire is straight overhead. Every shadow runs away from it. One walks in.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“Toward the fire. Every lamp, since we were seven. I kept standing in the way so nobody would look. I’m moving now. It’s a terrible shadow. I’d know it anywhere.”' });
      }
      if (roleId === 'binder') {
        P.wren.push({ t: 'h', text: 'No thread found' });
        P.wren.push({ t: 'html', html: '<ul class="blk-list">'
          + '<li>' + threadLine('grey') + ' <strong>the Provost to Wren:</strong> gray. A goodbye already said.</li>'
          + '<li>' + threadLine('whole') + ' <strong>the four of you:</strong> red, each to each, and holding.</li>'
          + '<li>' + threadLine('none') + ' <strong>Wren:</strong> nothing at all.</li>'
          + '</ul>' });
        P.wren.push({ t: 'p', text: said(laundry === 'YES' ? 'In the laundry you told Wren yes. You said it to the one person with no thread.' : laundry === 'DONTKNOW' ? 'In the laundry you said you did not know, and Wren went quiet.' : '')
          + 'Not unbound. You know unbound. There is nothing there at all.' });
        P.wren.push({ t: 'fine', text: 'Say it to Wren, out loud:' });
        P.wren.push({ t: 'letter', text: '“None. Not unbound. I know unbound. You’re the knot itself. So I brought real string. It won’t count under any Law. I’m tying it anyway. Give me your wrist.”' });
      }

      return P;
    },
  });

  /* The Binder's Book keeps the year the Order paid nothing — opt-in, and only once Chapter VI is open. */
  C.bookExtras.push((roleId, ctx) => {
    if (roleId !== 'binder' || !ctx.unlocked('ch6')) return [];
    return [{ t: 'h', text: 'The bell-chamber' }, { t: 'reveal', label: 'Read when the Hearth says the Book has turned a page', blocks: [
      { t: 'omen', text: 'Four Masters, four Sightings. The Convocation would not pay it. They struck the Law and called it grammar.' },
      { t: 'fine', text: 'Two hundred and twelve years after the Founders the seal failed. Four hands meant four Masters giving up their Sight. The Convocation sent one Warden down instead.' },
    ] }];
  });
})();
