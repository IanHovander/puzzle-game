/* Companion — Chapter VI, The Bells of Thornhallow (WELL · cast: VOLUNTEER, PRECRACKED) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const F = 'font-family="Cinzel,serif"';

  /* ---------- the stone ---------- */
  const STONE = [{ shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Crown', inv: true }, { shape: 'Hook', inv: true }];
  const NAIVE = G.readNaive(STONE), TURNED = G.readTurned(STONE);
  const ORDER_GLOSS = ['fire', 'cold', 'one', 'of-four', 'goes-through', 'the Cold', 'closes', 'behind'];
  const FOUNDERS_GLOSS = ['four-as-one', 'as one', 'fire', 'go down', 'behind', 'kept', 'the fire', 'a hollow'];
  const HYMN = [4, -6, 4, 1, -2, -3, 'rest'];
  const gl = (n) => G.svg(n, { size: 28, color: '#f2d27a' });

  /* ---------- the Bells ---------- */
  const LANE = { B: 0, H: 1, O: 2, K: 3 };
  const SCRIPTS = {
    1: 'B H O K B O H K · O B K H K O B H · H K B O O H K B',
    2: 'B H (OK) B (KH) O (BH) K (OKB) H O (BK) H (OH) B (KHO) K O (BH) (BK) H (OB) K (ALL)',
    3: 'O K B O (ALL) B K O (OK) B K (ALL) O B K (BK) O B (ALL) K O (OB) K (ALL)',
  };
  const parse = (str) => str.trim().split(/\s+/).filter(t => t && t !== '·').map(tok => tok === '(ALL)' ? { all: true, lanes: [0, 1, 2, 3] } : tok[0] === '(' ? { lanes: tok.slice(1, -1).split('').map(c => LANE[c]).sort() } : { lanes: [LANE[tok]] });
  const CALL = ['BOOK', 'HUSH', 'OWL', 'KNOT'];
  const call = (e) => e.all ? 'ALL' : e.lanes.map(l => CALL[l]).join(' + ');
  const round3Rows = () => parse(SCRIPTS[3]).map((e, i) => [String(i + 1), String(2 * i + 1), `<b>${call(e)}</b>`]);
  const wordsOf = (n) => parse(SCRIPTS[n]).map(call).join(' · ');
  const round3Block = () => ({ t: 'table', head: ['bell', 'on beat', 'call'], rows: round3Rows() });

  /* ---------- Seer under-layers ---------- */
  const underChamber = `<svg viewBox="0 0 360 250">
    <rect width="360" height="250" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <rect x="10" y="10" width="340" height="230"/>
      <circle cx="180" cy="34" r="14"/><path d="M180,12 L180,4 M162,20 L156,14 M198,20 L204,14 M160,34 L152,34 M200,34 L208,34"/>
      <line x1="40" y1="78" x2="320" y2="78" stroke-width="2"/>
      ${[[70, 'Halvard'], [143, 'Idony'], [217, 'Rook'], [290, 'Mere']].map(([x, n]) => `<path d="M${x - 14},112 L${x - 14},92 Q${x - 14},80 ${x},80 Q${x + 14},80 ${x + 14},92 L${x + 14},112 Z"/><line x1="${x}" y1="78" x2="${x}" y2="80"/><text x="${x}" y="126" text-anchor="middle" fill="#fff" font-size="8" ${F}>${n}</text>`).join('')}
      <circle cx="180" cy="178" r="56" stroke-dasharray="4 3"/><circle cx="180" cy="178" r="8"/>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="180" cy="160" r="5"/><circle cx="112" cy="196" r="6"/><circle cx="148" cy="212" r="6"/><circle cx="212" cy="212" r="6"/><circle cx="248" cy="196" r="6"/><circle cx="180" cy="215" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M112,196 L98,224"/><path d="M148,212 L140,238"/><path d="M212,212 L220,238"/><path d="M248,196 L262,224"/><path d="M180,160 L180,180" opacity=".6"/></g>
    <g stroke="#a482e6" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M180,215 L180,190"/></g>
    <g fill="#fff" font-size="8" ${F}><text x="180" y="58" text-anchor="middle">the Hearth — up the shaft</text><text x="88" y="192">Bookmoth</text><text x="120" y="222">Hush</text><text x="222" y="222">Owl</text><text x="256" y="192">Knot</text><text x="190" y="160">Marrow</text><text x="190" y="228" fill="#a482e6">Wren</text><text x="180" y="245" text-anchor="middle" opacity=".7">the lid · shadows, as they fall</text></g>
  </svg>`;
  const stoneCarving = (mark) => G.inscription(STONE, { showMark: !!mark, mark: 'right', color: '#fff', markColor: '#a482e6' });
  const stoneInner = stoneCarving(true).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const underStone = `<svg viewBox="0 0 360 230">
    <rect width="360" height="230" fill="#000"/>
    <text x="180" y="18" text-anchor="middle" fill="#fff" font-size="10" ${F} opacity=".8">the prophecy stone, from below</text>
    <g transform="translate(10,26) scale(0.6967)">${stoneInner}</g>
    <g stroke="#a482e6" fill="none" stroke-width="1.5"><path d="M330,96 L60,96"/><path d="M68,91 L58,96 L68,101"/></g>
    <text x="195" y="112" text-anchor="middle" fill="#a482e6" font-size="10" ${F}>the mark is on the RIGHT — carved turned — read this way</text>
    <text x="340" y="128" text-anchor="end" fill="#a482e6" font-size="9" ${F}>slot 1 begins here</text>
    <g stroke="#fff" fill="none" stroke-width="1.5" transform="translate(180,190) scale(0.9)"><path d="M0,-16 C6,-8 10,-2 10,4 C10,11 5,15 0,15 C-5,15 -10,11 -10,4 C-10,-2 -6,-8 0,-16 Z" opacity=".8"/><path d="M-60,16 L60,16" opacity=".5"/></g>
    <text x="180" y="222" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">the fire — lower than it has ever been; the foot is bare</text>
  </svg>`;

  /* ---------- The Thread (the Chapter V volunteer's spent Sight, rounds 1–2) ---------- */
  const threadBlock = (ctx) => ({ t: 'custom', render: (el, cx) => {
    const st = cx.state; st.thread = st.thread || { letGo: 0, held: 0 }; cx.save();
    el.appendChild(UI.el('div', { class: 'blk-svg underlayer', html: `<svg viewBox="0 0 360 80"><rect width="360" height="80" fill="#000"/><path id="ch6-thread" d="M10,40 C80,30 120,50 180,40 S280,30 350,40" fill="none" stroke="#fff" stroke-width="2"/><g id="ch6-fray" stroke="#fff" stroke-width="1" opacity=".5"><path d="M150,40 l-8,-10"/><path d="M200,42 l6,-9"/><path d="M260,36 l-5,-9"/></g><text x="180" y="70" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif" id="ch6-thread-txt">the thread — fraying</text></svg>` }));
    const thread = el.querySelector('#ch6-thread'), fray = el.querySelector('#ch6-fray'), txt = el.querySelector('#ch6-thread-txt');
    let holding = false, t0 = 0;
    const btn = UI.el('button', { class: 'btn primary hold-btn', style: { width: '100%', marginTop: '8px' }, text: 'HOLD — keep a finger on it' });
    const down = (e) => { e.preventDefault(); if (holding) return; holding = true; t0 = Date.now(); thread.setAttribute('stroke-width', '3'); fray.style.opacity = '0'; txt.textContent = 'held'; btn.textContent = 'holding…'; };
    const up = () => { if (!holding) return; holding = false; st.thread.held += Date.now() - t0; st.thread.letGo += 1; cx.save(); thread.setAttribute('stroke-width', '2'); fray.style.opacity = '.5'; txt.textContent = 'the thread — fraying'; btn.textContent = 'HOLD — keep a finger on it'; };
    btn.addEventListener('pointerdown', down); btn.addEventListener('pointerup', up); btn.addEventListener('pointerleave', up); btn.addEventListener('pointercancel', up);
    el.appendChild(btn);
    el.appendChild(UI.el('p', { class: 'fine', text: 'Nothing on the Hearth shows whether you let go. Nothing on any other phone does either. This page remembers, and will tell you — only you — at the end.' }));
  } });

  C.chapters.push({
    id: 'ch6',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const vol = ctx.flags.VOLUNTEER | 0; const volRole = vol >= 1 && vol <= 4 ? L.roles[vol - 1] : null; const isVol = !!(volRole && volRole.id === roleId);
      const precracked = !!ctx.flags.PRECRACKED;
      const laundry = ctx.answer('ch3', 'whisper');
      const law0 = !!(ctx.state.unlocked && Object.values(ctx.state.unlocked).some(u => u && u.flags && u.flags.LAW0));
      const laneOwner = (l) => L.roles[l].nick;
      const neighbour = (l) => [l - 1, l + 1, l - 2, l + 2].filter(x => x >= 0 && x < 4 && x !== l)[0];

      P.speak.push({ t: 'fine', text: 'No sealed words in the bell-chamber. Tonight your voice is your own — out loud, and looking at Wren.' });

      /* ---- the volunteer's Thread sits on top of everything for rounds 1–2 ---- */
      const rest = [];
      if (isVol) {
        P.sight.push({ t: 'h', text: 'The Thread' });
        P.sight.push({ t: 'p', text: 'Your Sight is up the Stair, holding the way shut. It stays there through the first two rounds of the Bells; your bell is silent and **' + laneOwner(neighbour(vol - 1)) + '** rings for you. Keep a finger on the thread.' });
        P.sight.push(threadBlock(ctx));
        P.sight.push({ t: 'fine', text: 'When the Hearth says the Provost has *tied off* the thread — before the third round — your Sight returns. Open it then.' });
        P.sight.push({ t: 'divider' });
      }
      const S = isVol ? rest : P.sight;

      /* ================= READER ================= */
      if (roleId === 'reader') {
        S.push({ t: 'h', text: 'The Bells' });
        S.push({ t: 'p', text: 'Your lane is the first, on the left. Three rounds; in the third the lights go out and Hush calls **BOOK** for you. Press on the beat, not on the word.' });
        S.push({ t: 'h', text: 'The prophecy stone — eight shapes, clean' });
        S.push({ t: 'p', text: 'Left to right as the Hall sees them over the fire: a **Flame**; a Flame, *inverted*; a **Crown**; a **Hook**; a **Spike**; a Flame, *inverted*; a Crown, *inverted*; a Hook, *inverted*.' });
        S.push({ t: 'html', html: G.inscription(STONE, { showMark: false, color: '#f2d27a' }) });
        S.push({ t: 'p', text: 'Two readings. Which is true is not yours to say — it depends where the **mark** is, and only Under-Sight sees the foot of the stone. Here are both, so that when Owl calls it you can answer at once.' });
        S.push({ t: 'table', head: ['', 'read left to right, upright', 'read right to left, every glyph inverted'], rows: [
          ['if the mark is on the…', '**left**', '**right** (turned)'],
          ['the glyphs', NAIVE.map(gl).join(' '), TURNED.map(gl).join(' ')],
          ['the words', NAIVE.join(' · '), TURNED.join(' · ')],
          ['the glosses', NAIVE.map((n, i) => `*${ORDER_GLOSS[i]}*`).join(' · '), TURNED.map((n, i) => `*${FOUNDERS_GLOSS[i]}*`).join(' · ')],
        ] });
        S.push({ t: 'fine', text: 'The left-hand column is the Order\'s translation, word for word: *"one born of four shall walk into the Cold, and it shall close behind."* The right-hand column is a different sentence. On the strip, the first glyph **read** goes in slot 1.' });
        S.push({ t: 'fine', text: 'Glossary: **WRENN** — *the hollow of a bell; the space that rings.* **COLD** — *a hollow.* You noticed that in the study. You are about to be asked about it.' });
        P.wren.push({ t: 'h', text: 'Do you know now?' });
        if (laundry === 'TELL') P.wren.push({ t: 'p', text: 'In the laundry you told Wren it meant *a small brave bird*. It was kind, and it was a bluff, and it is not even in the alphabet the name is written in. Wren is going to ask you again, out loud, in front of everyone — and this time you know the answer.' });
        else if (laundry === 'DONTKNOW') P.wren.push({ t: 'p', text: 'In the laundry you told Wren you did not know yet. It was true, then. In the study you ciphered the Vigil roll yourself: *WRENN — the hollow of a bell*. Wren is going to ask you again, out loud, and *yet* has run out.' });
        else P.wren.push({ t: 'p', text: 'Wren asked you in the laundry what the name meant, and you never sealed an answer. Wren will ask again, out loud, and this time you know: *the hollow of a bell; the space that rings*.' });
        P.wren.push({ t: 'whisper', text: 'Four bells hang over the lid. You keep looking at the dark inside each of them.' });
      }

      /* ================= LISTENER ================= */
      if (roleId === 'listener') {
        S.push({ t: 'h', text: 'The Bells — the shape of every round' });
        S.push({ t: 'p', text: 'You are the **Voice** this chapter. Read this before the ready screen, aloud where it helps. A bell falls on every *odd* beat; even beats are rests. Chords are hands together within a breath.' });
        S.push({ t: 'list', items: [
          '**Practice** — eight bells at 70, nothing at stake: singles down the row, two chords, then everyone, twice.',
          '**Round one** — **70** to the minute, 24 bells, one hand each.',
          '**Round two** — **76** to the minute, 24 bells, chords of two, three and all four. The last bell is everyone.',
          '**Round three** — **60** to the minute, 24 bells, **the lights go out**. Your bell is removed: your bell is the voice. Only you have the script. The Hearth counts 1 to 48 aloud.',
        ] });
        if (volRole) S.push({ t: 'fine', text: `${volRole.nick}'s bell is silent in rounds one and two (the thread on the Stair). ${laneOwner(neighbour(vol - 1))} takes both keys; ${volRole.nick}'s bells fall into ${laneOwner(neighbour(vol - 1))}'s lane. The thread is tied off before round three.` });
        if (precracked) S.push({ t: 'fine', text: 'One bell is already cracked from the fall of the stair. You can hear it: Halvard\'s bell hums a quarter-tone flat. It still counts as rung when it is rung.' });
        S.push({ t: 'audio', label: 'Feel the tempo — 70, then 76, then 60', strip: '<div class="arrow-strip"><span class="step"><b>♥</b>70</span><span class="step"><b>♥</b>76</span><span class="step"><b>♥</b>60</span></div>', play: (A) => { CA.announce(0); CA.heartbeat(A, 70, 6); CA.later(() => { CA.announce(1); CA.heartbeat(A, 76, 6); }, 5600); CA.later(() => { CA.announce(2); CA.heartbeat(A, 60, 6); }, 10600); return 10600 + 6 * 1000 + 300; }, text: 'Six beats at each. Every second beat is a bell.' });
        S.push({ t: 'h', text: 'Round three — the script. You call it.' });
        S.push({ t: 'p', text: 'Bell *n* falls on beat *2n − 1*. Call each bell **two bells ahead** — four beats, four seconds — in one word: **BOOK**, **OWL**, **KNOT**, or **ALL** (Bookmoth, Owl and Knot together). Before the count reaches 1, call the first two. Then, when the count says 1, call bell 3; when it says 3, call bell 4; and so on. Keep your voice on the beat and your eyes on this list.' });
        S.push(round3Block());
        S.push({ t: 'fine', text: 'If the table chose slow bells, the count runs at 48 to the minute instead — the list does not change.' });
        S.push({ t: 'reveal', label: 'Rounds one and two, written out', blocks: [
          { t: 'p', text: '**Round one (70):** ' + wordsOf(1) },
          { t: 'p', text: '**Round two (76):** ' + wordsOf(2) },
          { t: 'fine', text: 'The lights show these; you need not call them. But a table that hears the rhythm spoken misses less.' },
        ] });
        S.push({ t: 'h', text: 'The stone\'s hymn' });
        S.push({ t: 'p', text: 'When the fire drops and the stone is read, the shaft rings with it. Eight glyphs, seven steps — and **one rest, at the very end**.' });
        S.push({ t: 'audio', label: 'The stone\'s hymn', strip: CA.strip(HYMN), play: (A) => CA.playSteps(A, HYMN), text: '**Up four, down six, up four, up one, down two, down three — then the rest.** COLD is the rest, and it comes last.' });
        S.push({ t: 'p', text: 'The Order\'s reading — ASH, COLD, CROWN, KNOT, THORN, COLD, EMBER, VEIL — has COLD **twice**, second and sixth: two rests *in the middle* of the tune, and none at the end. It cannot be this hymn. Only one ordering of the eight glyphs steps like this; test it on the row-player in your Book.' });
        S.push({ t: 'h', text: 'Heartbeats in the bell-chamber' });
        S.push({ t: 'html', html: `<div class="heartbeats"><div class="hb"><span>Provost Marrow</span>${D.trace('fast')}</div>${['Bookmoth', 'Hush', 'Owl', 'Knot'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        S.push({ t: 'fine', text: 'The Provost\'s, fast as a bird\'s. Wren\'s: too quiet to catch. Six chapters. It has never once been anything else.' });
        P.wren.push({ t: 'h', text: 'Can you hear my heart?' });
        if (laundry === 'LOUD') P.wren.push({ t: 'p', text: 'In the laundry you said *yes, loud*. You have listened for it every room since, the way you would worry a sore tooth. There is nothing there. Wren is going to ask you again, out loud, in front of the others, and you will have to decide whether the kind answer is still the kind answer.' });
        else if (laundry === 'NO') P.wren.push({ t: 'p', text: 'In the laundry you said *no*. It was the only true thing anyone in that room said to Wren that night, and you have wondered ever since whether it was cruel. Wren is going to ask you again, out loud.' });
        else P.wren.push({ t: 'p', text: 'Wren asked you in the laundry and you never sealed an answer. Wren is going to ask you again, out loud, and the flat line on your page will still be flat.' });
        P.wren.push({ t: 'whisper', text: 'In the third round your bell is the voice. Wren will be standing beside you, close enough to hear — the one heart you cannot.' });
        P.speak.push({ t: 'h', text: 'Your voice — round three' });
        P.speak.push({ t: 'p', text: 'Two bells ahead. One word. **BOOK · OWL · KNOT · ALL.**' });
        P.speak.push(round3Block());
      }

      /* ================= SEER ================= */
      if (roleId === 'seer') {
        S.push({ t: 'h', text: 'The Bells' });
        S.push({ t: 'p', text: 'Your lane is the third. In the third round the lights go out; Hush calls **OWL** for you. Press on the beat, not on the word.' });
        S.push({ t: 'h', text: 'Under the bell-chamber' });
        S.push({ t: 'p', text: 'The fire is straight up the shaft, far above. Every shadow in the room falls *down and away* from it — the Provost\'s, all four of yours. One falls up, toward the shaft. You have drawn this five times tonight. It is not the lamp. It was never the lamp.' });
        S.push({ t: 'svg', cls: 'underlayer', svg: underChamber });
        S.push({ t: 'h', text: 'The foot of the stone' });
        S.push({ t: 'p', text: 'When the fire drops, the Hearth will say: *Owl — the foot of the stone.* This is what is there. The **mark is on the RIGHT**: the prophecy was carved **turned**, and the Order has read it upright for four hundred years because the flame covered its foot from the night it was lit.' });
        S.push({ t: 'svg', cls: 'underlayer', svg: underStone });
        S.push({ t: 'p', text: 'Say it plainly: *read right to left, every glyph inverted.* Bookmoth has both readings ready. On the strip, slot 1 is the first glyph read — the shape at the **right-hand** end, inverted — and the eighth is the shape at the left-hand end, inverted.' });
        S.push({ t: 'fine', text: 'No mark on any ring this chapter. The strip is a line; it runs 1 to 8 left to right.' });
        P.wren.push({ t: 'h', text: 'What do you see when you look at me?' });
        if (laundry === 'TELL') P.wren.push({ t: 'p', text: 'In the laundry you told Wren about the shadow. Wren laughed and said you were being poetic. You were not being poetic. Wren is going to ask you again, out loud, and this time there is a fire straight overhead and everyone can look down.' });
        else if (laundry === 'NOTHING') P.wren.push({ t: 'p', text: 'In the laundry you said nothing, and looked at the wall. You have been looking at walls for fourteen years. Wren is going to ask you again, out loud, with a fire straight overhead.' });
        else P.wren.push({ t: 'p', text: 'Wren asked you in the laundry and you never sealed an answer. Wren is going to ask again, out loud, with a fire straight overhead and everyone able to look down.' });
        P.wren.push({ t: 'whisper', text: 'You have wanted to see the foot of that stone since you were eleven. Tonight the fire is low enough. Be careful what you wish for; then wish for it anyway.' });
      }

      /* ================= BINDER ================= */
      if (roleId === 'binder') {
        S.push({ t: 'h', text: 'The Bells' });
        S.push({ t: 'p', text: 'Your lane is the fourth, on the right. In the third round the lights go out; Hush calls **KNOT** for you. Press on the beat, not on the word.' });
        S.push({ t: 'h', text: 'The 212 page' });
        S.push({ t: 'p', text: 'One page of the Book, one year, one hand. Read it as a page, not as four Laws.' });
        S.push({ t: 'html', html: `<div class="laws">
          <div class="law founders${law0 ? '' : ' struck'}"><div class="era">Law 0 · Founders' · Year 0 · ${law0 ? 'RESTORED' : 'STRUCK, 212'}</div><div class="txt">COLD is written by four hands.</div><div class="fine">${law0 ? 'Older than Law 6. The older binds.' : 'struck by the Convocation, 212. See Law 6.'}</div></div>
          <div class="law order"><div class="era">Law 6 · Order's · Year 212</div><div class="txt">COLD is never written; where an inscription shows it, leave the slot empty.</div></div>
          <div class="law order"><div class="era">Law 9 · Order's · Year 212</div><div class="txt">A Founder faces the dial before them.</div></div>
          <div class="law order"><div class="era">Law 11 · Order's · Year 212</div><div class="txt">Every inscription is placed sunwise from the mark.</div></div>
        </div>` });
        S.push({ t: 'p', text: 'The same year the Vault was rebuilt and the statues re-set. The same year a Founders\' Law was **struck** and an Order\'s Law **written** to say the opposite — in the same ink, the same hand. A Law that is merely wrong is forgotten. A Law that is *inconvenient* is struck.' });
        S.push({ t: 'h', text: 'The Laws that read a stone' });
        S.push({ t: 'html', html: `<div class="laws"><div class="law founders"><div class="era">Law 10 · Founders' · Year 0</div><div class="txt">A turned line reverses and inverts; a lone turned glyph only inverts; every glyph keeps its place on the stone.</div></div><div class="law founders"><div class="era">Law 3 · Founders' · Year 0</div><div class="txt">Where two Laws disagree, the older binds.</div></div></div>` });
        S.push({ t: 'p', text: 'So: if Owl calls the stone **turned**, the whole line reverses and every glyph inverts — and where the line shows COLD, Law 6 says leave the slot empty, but Law 0 is older than Law 6. The stone shows the shape. Place it.' });
        S.push({ t: 'h', text: 'Threads in the bell-chamber' });
        S.push({ t: 'list', items: [
          '**Marrow — Wren:** grey. The colour of someone who has already said goodbye. It has been grey since the study; tonight it is the only thread she has left.',
          '**Marrow — the lid:** red. An oath, older than any of you. She swore it to the fire, kneeling, fourteen years ago.',
          '**The four of you:** red, each to each, tied tonight and holding. Whatever the Stair cost, it did not cost this.',
          '**Wren:** *No thread found.* Not unbound. The knot itself.',
        ] });
        S.push({ t: 'h', text: 'The thread on the Stair' });
        if (volRole) S.push({ t: 'p', text: `**${volRole.nick}**'s thread runs up the Stair from the iron ring, taut, anchored in ${volRole.nick}'s own Sight. A held thread needs a living anchor; a **tied-off** thread needs none. The Provost will tie it off to the ring before the third round — one turn of the wrist — and ${volRole.nick}'s Sight comes home. Until then ${volRole.nick}'s bell is silent and ${laneOwner(neighbour(vol - 1))} rings both.` });
        else S.push({ t: 'p', text: 'No thread was left on the Stair. Nothing to tie off; nobody\'s bell is silent tonight but the one the Founders silenced themselves, in the third round.' });
        S.push({ t: 'reveal', label: 'After the stone is read — when the Hearth says your Book has turned a page', blocks: [
          { t: 'omen', text: 'Four Masters, four Sightings. The Convocation would not pay it. They struck the Law and called it grammar.' },
          { t: 'fine', text: 'Law 0 is restored in your Book. It is older than Law 6. The older binds — and the Fourfold Walk is open.' },
        ] });
        P.wren.push({ t: 'h', text: 'Do you think I\'m really the one?' });
        if (laundry === 'YES') P.wren.push({ t: 'p', text: 'In the laundry you said *yes*. You see every thread in the school and you said yes to the one person who has none. Wren is going to ask you again, out loud — not whether Wren is the one. Whether Wren has a thread. Show it, if you can.' });
        else if (laundry === 'DONTKNOW') P.wren.push({ t: 'p', text: 'In the laundry you said *I don\'t know*. It was true, and Wren went quiet, and you have not forgiven yourself for the quiet. Wren is going to ask you again, out loud — a different question, with the same answer.' });
        else P.wren.push({ t: 'p', text: 'Wren asked you in the laundry and you never sealed an answer. Wren is going to ask again, out loud — not whether Wren is the one. Whether Wren has a thread.' });
        P.wren.push({ t: 'whisper', text: 'Struck, 212. Written, 212. You saw it on the Stair before anyone said it. Tonight someone will say it.' });
      }

      if (isVol) { P.sight.push({ t: 'reveal', label: 'The thread is tied off — open your Sight', blocks: rest }); }
      return P;
    },
  });

  /* The Binder's Book gains the chamber's line once Chapter VI is open (behind a reveal, so it is read when the Hearth says so). */
  C.bookExtras.push((roleId, ctx) => {
    if (roleId !== 'binder' || !ctx.unlocked('ch6')) return [];
    return [{ t: 'h', text: 'The bell-chamber' }, { t: 'reveal', label: 'Read when the Hearth says the Book has turned a page', blocks: [{ t: 'omen', text: 'Four Masters, four Sightings. The Convocation would not pay it. They struck the Law and called it grammar.' }] }];
  });
})();
