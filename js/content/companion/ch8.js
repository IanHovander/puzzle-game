/* Companion — Epilogue (WREN·cast). Four parallel private goodbyes, not four complementary facts:
   the Reader gets three shapes to keep and not read, the Listener the heartbeat that was never there,
   the Seer the shadow drawn the right way at last, the Binder the thread with something on the far
   end of it. There is nothing to solve, so R11.11's union-sufficiency test does not apply and a
   missing phone costs that player their letter and blocks nothing.
   Each goodbye is the dormitory's teasing paid off (ch0_wren): eat nothing, then eat something; the
   Listener checking whether Wren is cold, then "I'm fine. I promise"; the Seer's face; the Binder's
   "Please?". The Wren tab answers back in the four's voices, per ending (STYLE P6).
   Branches: ENDING (the cast), the phone's own ch7 finale token, and the player's first name. The
   phone is NEVER asked a question about the night -- the ch8 cast is three bits of ENDING and
   lore.js is frozen, so where the phone cannot know, the page says something true either way.
   DELIBERATE, DO NOT 'FIX': the E=0 Seer under-layer draws FIVE shadows falling away from the fire,
   Wren's included, against docs/CONVENTIONS.md §4. That inversion is the payoff of the Seer's
   running anomaly from ch0 to ch7, and the caption says so. */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;

  /* ---------- chapter-local styling (the warm-white page, the dark page) ---------- */
  if (document.head) document.head.appendChild(Object.assign(document.createElement('style'), { textContent: `
    body.companion.ch8-white { background: #f6efe2 !important; color: #2a2420; transition: background 1.2s ease; }
    body.companion.ch8-white #chead { background: rgba(246,239,226,0.94); border-bottom-color: rgba(42,36,32,0.15); }
    body.companion.ch8-white #chead .brand, body.companion.ch8-white .crole { color: #7a6a4a !important; }
    body.companion.ch8-white .cpanel { background: #fbf6ec; border-color: rgba(42,36,32,0.12); color: #2a2420; }
    body.companion.ch8-white .cpanel h2, body.companion.ch8-white .cpanel h3 { color: #7a6a4a; }
    body.companion.ch8-white .cpanel .fine, body.companion.ch8-white .end-mark { color: #8a7c66; }
    body.companion.ch8-white .ctab { color: #8a7c66; border-color: rgba(42,36,32,0.15); background: rgba(0,0,0,0.02); }
    body.companion.ch8-white .ctab.on { color: #5a4a2a; border-color: #b8a070; background: rgba(184,160,112,0.15); }
    body.companion.ch8-white .btn { color: #5a4a2a; border-color: rgba(90,74,42,0.4); background: rgba(255,255,255,0.5); }
    body.companion.ch8-white .tag { color: #7a6a4a; border-color: rgba(122,106,74,0.4); }
    body.companion.ch8-white .iconbtn { color: #5a4a2a; }
    body.companion.ch8-white .iconbtn:hover { color: #3a2e1a; border-color: rgba(90,74,42,0.4); }
    body.companion.ch8-white .cpanel .fine, body.companion.ch8-white .end-mark { color: #6b5d48; }
    body.companion.ch8-white .end-mark { opacity: 1; }
    body.companion.ch8-white .ctab { color: #6b5d48; }
    body.companion.ch8-white .laws .law .era, body.companion.ch8-white em, body.companion.ch8-white strong { color: #7a6a4a; }
    body.companion.ch8-white .back-row .btn { color: #7a6a4a; }
    body.companion.ch8-dark { background: #000 !important; }
    body.companion.ch8-dark .cpanel { background: #000; border-color: rgba(255,255,255,0.06); }
    body.companion.ch8-dark #chead { background: #000; border-bottom-color: rgba(255,255,255,0.06); }
    .ch8-goodbye { animation: fadeUp 1.2s ease both; }
    .ch8-goodbye .ch8-name { font-family: var(--display); font-size: 30px; letter-spacing: .12em; color: var(--gold-2); margin: 6px 0 10px; }
    .ch8-goodbye .ch8-line { font-family: var(--hand); font-size: 21px; line-height: 1.5; color: var(--ink); margin: 0 0 10px; }
    .ch8-goodbye .ch8-sign { font-family: var(--hand); font-style: italic; color: var(--ink-dim); text-align: right; margin-top: 8px; }
    .ch8-glyphrow { display: flex; gap: 10px; justify-content: center; padding: 14px 6px; background: rgba(0,0,0,0.35); border: 1px solid rgba(224,176,74,0.35); border-radius: 10px; margin: 10px 0; }
    .ch8-glyphrow svg { width: 56px; height: 56px; }
    .ch8-burn { position: fixed; inset: 0; background: #000; z-index: 50; display: flex; align-items: center; justify-content: center; text-align: center; padding: 30px; opacity: 0; transition: opacity 1.6s ease; pointer-events: none; }
    .ch8-burn.on { opacity: 1; pointer-events: all; }
    .ch8-burn .ch8-spent { font-family: var(--display); font-size: 22px; letter-spacing: .18em; color: #e9e2d2; line-height: 1.7; animation: fadeUp 2s 1.2s ease both; }
    .ch8-white-page { text-align: center; padding: 30px 10px 10px; }
    .ch8-white-page .ch8-wp-name { font-family: var(--display); font-size: 26px; letter-spacing: .14em; color: #5a4a2a; margin-bottom: 8px; }
    .ch8-white-page p { color: #4a4036; font-size: 19px; }
    .ch8-white-page .ch8-again { margin-top: 26px; }
    .ch8-trace svg { width: 100%; height: 64px; display: block; }
    .ch8-trace .ch8-beat { stroke-dasharray: 600; stroke-dashoffset: 600; animation: ch8beat 3.2s ease-out forwards; }
    @keyframes ch8beat { to { stroke-dashoffset: 0; } }
    .ch8-thread { margin: 10px 0; background: rgba(0,0,0,0.35); border: 1px solid rgba(217,107,74,0.35); border-radius: 10px; padding: 8px; }
    .ch8-thread svg { width: 100%; height: auto; display: block; }
    .ch8-thread .ch8-th { stroke-dasharray: 700; stroke-dashoffset: 700; animation: ch8thread 3.5s .8s ease-out forwards; }
    @keyframes ch8thread { to { stroke-dashoffset: 0; } }
    .ch8-seal-crown { text-align: center; padding: 18px 0 6px; }
    .ch8-seal-crown svg { width: 150px; height: 150px; }
    .ch8-seal-crown .ch8-decree { font-family: var(--display); font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); margin-top: 8px; line-height: 1.9; }
    .ch8-darkline { font-family: var(--hand); font-size: 22px; color: var(--ink); text-align: center; padding: 28px 8px; animation: fadeUp 1.5s ease both; }
    .ch8-fade { transition: opacity 5s ease 9s; }
    .ch8-fade.gone { opacity: 0.08; }
    body.companion.ch8-dark .btn { color: #e9e2d2; border-color: rgba(233,226,210,0.35); background: rgba(255,255,255,0.04); }
    .ch8-readagain { margin-top: 22px; }
  ` }));

  /* keep a body class only while a given element is on the page */
  function bodyClassWhile(el, cls) {
    document.body.classList.add(cls);
    const main = document.getElementById('cmain');
    if (!main || !window.MutationObserver) return;
    const mo = new MutationObserver(() => { if (!el.isConnected) { document.body.classList.remove(cls); mo.disconnect(); } });
    mo.observe(main, { childList: true, subtree: true });
  }
  const esc = UI.esc;
  const firstName = (ctx) => (ctx.name && ctx.name.trim()) || ctx.role.nick;
  const walkedHere = (ctx) => { const a = ctx.answer('ch7', 'finale'); if (typeof a === 'string') return a.indexOf('WALK') === 0; return null; };

  /* ---------- the four goodbyes, by real first name ---------- */
  const GOODBYE = {
    reader: (ctx) => {
      const name = firstName(ctx);
      return `<div class="ch8-goodbye"><div class="ch8-name">${esc(name)}</div>` +
        `<p class="ch8-line">You read everything and eat nothing. Read this one. It's the last thing in the old tongue you'll ever read, so I kept it short. You'll pretend it was easy.</p>` +
        `<div class="ch8-glyphrow">${['KNOT', 'ASH', 'EMBER'].map(n => G.svg(n, { size: 56, color: '#f2d27a' })).join('')}</div>` +
        `<p class="ch8-line">Tomorrow it'll be three shapes on a page. Keep it anyway. You'll know what it said. Now go and eat something, ${esc(name)}.</p>` +
        `<div class="ch8-sign">— W.</div></div>`;
    },
    listener: (ctx) => {
      const name = firstName(ctx);
      return `<div class="ch8-goodbye"><div class="ch8-name">${esc(name)}</div>` +
        `<p class="ch8-line">You're checking whether I'm all right. I can tell from here. You never once heard this. It wasn't a fault in you. There wasn't one to hear.</p>` +
        `<div class="ch8-trace"><svg viewBox="0 0 360 64"><path d="M0,32 L360,32" stroke="#4fb3bf" stroke-width="1" opacity=".35" fill="none"/><path class="ch8-beat" d="M0,32 L60,32 L70,32 L78,12 L88,52 L96,32 L170,32 L178,10 L188,54 L196,32 L270,32 L278,12 L288,52 L296,32 L360,32" stroke="#4fb3bf" stroke-width="2.2" fill="none" stroke-linejoin="round"/></svg></div>` +
        `<p class="ch8-line">There. That one's mine. Listen once, ${esc(name)}. Then stop checking, and look up. I'm fine. I promise.</p>` +
        `<div class="ch8-sign">— W.</div></div>`;
    },
    seer: (ctx) => {
      const name = firstName(ctx);
      const fig = (x, y, lab, shadowTo, col) => `<circle cx="${x}" cy="${y}" r="6" fill="#fff"/><path d="M${x},${y} L${shadowTo[0]},${shadowTo[1]}" stroke="${col || '#fff'}" stroke-width="3" opacity=".6" stroke-linecap="round"/><text x="${x}" y="${y + 18}" text-anchor="middle" fill="${col || '#fff'}" font-size="9" font-family="Cinzel,serif">${esc(lab)}</text>`;
      const under = `<svg viewBox="0 0 360 250"><rect width="360" height="250" fill="#000"/>` +
        `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="200"/><path d="M150,150 L150,110 A30,30 0 0 1 210,110 L210,150 Z"/></g>` +
        `<g stroke="#fff" fill="none" stroke-width="1.5"><path d="M180,146 C168,132 172,120 180,110 C188,120 192,132 180,146 Z"/><path d="M180,146 L180,128"/></g>` +
        `<text x="180" y="168" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">the Hearth, which is only a fire</text>` +
        fig(70, 70, 'Reader', [38, 44]) + fig(70, 170, 'Listener', [38, 196]) + fig(290, 70, 'Seer', [322, 44]) + fig(290, 170, 'Binder', [322, 196]) +
        fig(180, 44, 'Wren', [180, 14], '#a482e6') +
        `<text x="180" y="236" text-anchor="middle" fill="#a482e6" font-size="9" font-family="Cinzel,serif">all five shadows fall away from the fire. At last.</text></svg>`;
      return `<div class="ch8-goodbye"><div class="ch8-name">${esc(name)}</div>` +
        `<p class="ch8-line">Don't do the face. I drew it myself, and yes, the fire's wonky.</p>` +
        `<div class="blk-svg underlayer">${under}</div>` +
        `<p class="ch8-line">You stood between me and every lamp for years, and never once said why. You can sit down now, ${esc(name)}. Thank you.</p>` +
        `<div class="ch8-sign">— W.</div></div>`;
    },
    binder: (ctx) => {
      const name = firstName(ctx);
      /* The name is boxed by textLength rather than positioned by name.length, and both ends of
         the thread are fixed: a name of any length is squeezed into 20..140 and can never reach the
         thread's start at x=158. The old x = min(150, 44 + name.length * 13) clamped at eight
         characters and then ran the name straight through the knot. */
      const nameW = Math.max(24, Math.min(120, name.length * 12));
      const thread = `<svg viewBox="0 0 360 120"><text x="20" y="66" fill="#e9e2d2" font-size="20" font-family="Cinzel,serif" textLength="${nameW}" lengthAdjust="spacingAndGlyphs">${esc(name)}</text><text x="340" y="66" text-anchor="end" fill="#a482e6" font-size="20" font-family="Cinzel,serif">Wren</text>` +
        `<path class="ch8-th" d="M158,60 C 200,20 220,100 268,60" stroke="#d96b4a" stroke-width="3" fill="none" stroke-linecap="round"/>` +
        `<circle cx="158" cy="60" r="3" fill="#d96b4a"/><circle cx="268" cy="60" r="3" fill="#d96b4a"/></svg>`;
      return `<div class="ch8-goodbye"><div class="ch8-name">${esc(name)}</div>` +
        `<p class="ch8-line">You tried to tie a thread to me every week since we were seven. It never took. There wasn't a <em>me</em> on the other end to tie it to. There is now.</p>` +
        `<div class="ch8-thread">${thread}</div>` +
        `<p class="ch8-line">Red. Not grey. Look at it once, ${esc(name)}, before it goes. That isn't a rule. It's a please.</p>` +
        `<div class="ch8-sign">— W.</div></div>`;
    },
  };

  /* the goodbye -> "Your Sighting is spent. Look up." -> a warm-white page */
  function goodbyeBlock(roleId) {
    return { t: 'custom', render: (el, ctx) => {
      const key = 'ch8:spent';
      const showWhite = () => {
        UI.clear(el);
        const w = UI.el('div', { class: 'ch8-white-page' });
        w.appendChild(UI.el('div', { class: 'ch8-wp-name', text: firstName(ctx) }));
        w.appendChild(UI.el('p', { text: 'There is nothing left on this page.' }));
        w.appendChild(UI.el('p', { text: 'Look at the people at the table.' }));
        w.appendChild(UI.el('button', { class: 'btn small ghost ch8-again', text: 'Read the goodbye again', onclick: () => { ctx.state.done[key] = false; ctx.save(); document.body.classList.remove('ch8-white'); showGoodbye(); } }));
        el.appendChild(w);
        bodyClassWhile(w, 'ch8-white');
      };
      const burn = () => {
        const b = UI.el('div', { class: 'ch8-burn' }, [UI.el('div', { class: 'ch8-spent', html: 'Your Sighting is spent.<br>Look up.' })]);
        document.body.appendChild(b);
        requestAnimationFrame(() => b.classList.add('on'));
        ctx.state.done[key] = true; ctx.save();
        setTimeout(() => { showWhite(); b.classList.remove('on'); setTimeout(() => b.remove(), 1700); }, 4200);
      };
      const showGoodbye = () => {
        UI.clear(el);
        const g = UI.el('div', { html: GOODBYE[roleId](ctx) });
        el.appendChild(g);
        if (roleId === 'listener') { const btn = UI.audioButton('Cup your ear — once', () => CA.heartbeat(ctx.audio, 64, 8)); g.appendChild(btn); }
        const look = UI.el('button', { class: 'btn primary big-btn', text: 'Look up', style: { marginTop: '14px' }, onclick: burn });
        el.appendChild(look);
        el.appendChild(UI.el('p', { class: 'fine', text: 'The page burns when you look up. Or in a little while, whether you do or not.' }));
        const t = setTimeout(() => { if (el.isConnected && !ctx.state.done[key]) burn(); }, 45000 + ctx.role.idx * 5000);
        const mo = window.MutationObserver ? new MutationObserver(() => { if (!el.isConnected) { clearTimeout(t); mo.disconnect(); } }) : null;
        if (mo) mo.observe(document.getElementById('cmain'), { childList: true, subtree: true });
      };
      if (ctx.state.done[key]) showWhite(); else showGoodbye();
    } };
  }

  /* A page that goes dark after its line is read. The four SEALING_LINEs are 27-31 words, which is
     ten seconds of reading, and the fade used to begin at 5.5s and finish at 10.5s with no way back
     -- a slow reader lost Wren's last words to them and had to switch tabs to get them again. The
     fade now begins at 10.5s, and the button is there for as long as the page is. */
  function darkBlock(html) {
    return { t: 'custom', render: (el) => {
      const w = UI.el('div', { class: 'ch8-fade', html });
      el.appendChild(w);
      bodyClassWhile(w, 'ch8-dark');
      const dim = () => setTimeout(() => { if (w.isConnected) w.classList.add('gone'); }, 1500);
      el.appendChild(UI.el('button', { class: 'btn small ghost ch8-readagain', text: 'Read it again', onclick: () => {
        w.style.transition = 'none'; w.classList.remove('gone'); void w.offsetWidth; w.style.transition = ''; dim();
      } }));
      dim();
    } };
  }

  const SEALING_LINE = {
    reader: 'The Reader. Eat something. Then read the name on the door. You\'ll be able to, and you\'ll pretend it was easy. It wasn\'t. I watched.',
    listener: 'The Listener. I can see you checking. I\'m fine. It was never a fault in you. There was nothing there to hear, and you listened anyway.',
    seer: 'The Seer. Yes, you especially. You were right about the wall, and the floor, and my shadow. Thank you for standing in front of it.',
    binder: 'The Binder. Tie the others to each other. Tight. Then let someone tie one to you, for once. I know it isn\'t in the rules. Please?',
  };
  const oathSworn = (ctx) => { try { const u = ctx.state.unlocked && ctx.state.unlocked.ch5; if (!u || !u.flags || u.flags.OATH == null) return null; return +u.flags.OATH > 0; } catch (e) { return null; } };
  const KEEPER_LINE = {
    reader: 'Read him the name properly, one day. I never once heard it said right, and I am the one who chose it.',
    listener: 'You will not hear it. You never will. Do not let that stop you listening — I did, and it cost fourteen years.',
    seer: 'You saw. I should have asked you sooner. I should have asked anyone. Ask, when you are me.',
    binder: 'The oath you swore tonight was to a Chair. Swear the next one to a person. Wren will need at least one of you to have done that.',
  };
  const STAY_LINE = {
    reader: 'The wall still reads. You will teach the next Reader what the shapes say, and never tell them which of the shapes you cannot look at.',
    listener: 'Every heart in the room, still. All but one, still. You will listen for it every day and it will never be there, and it will not be a fault.',
    seer: 'Every shadow in the room, still. Four fall away from the fire. One falls toward it. It always will.',
    binder: 'Every thread in the room, still. Between you and the ones who walked: red, and thin, and held.',
  };

  const crownSeal = () => `<div class="ch8-seal-crown"><svg viewBox="-60 -60 120 120"><circle r="56" fill="#1a1410" stroke="#d4a94e" stroke-width="3"/><circle r="48" fill="none" stroke="#d4a94e" stroke-width="1" opacity=".6"/><g transform="scale(1.9)" style="color:#f2d27a">${G.inner('CROWN')}</g><path id="ch8arc" d="M-44,0 A44,44 0 0 1 44,0" fill="none"/><text font-size="8" fill="#d4a94e" font-family="Cinzel,serif" letter-spacing="2"><textPath href="#ch8arc" startOffset="50%" text-anchor="middle">BY ORDER OF THE CROWN</textPath></text></svg>` +
    `<div class="ch8-decree">Sighting registered.<br>Report to the Envoy at dawn.<br>The Cold is open for business.</div></div>`;

  C.chapters.push({
    id: 'ch8',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const E = +(ctx.flags.ENDING || 0);
      const name = firstName(ctx);
      const walked = walkedHere(ctx);
      P.speak.push({ t: 'fine', text: 'Nothing to speak. The night has been spoken.' });
      /* The one who held the stair: what the thread recorded, shown to that player alone. It sits in
         the private part of whatever Wren page the ending builds, as a `fine` line under the setup and
         before the line said out loud, so that page keeps exactly one {t:'h'} (R11.5). */
      let stairFine = null;
      try {
        const u6 = ctx.state.unlocked && ctx.state.unlocked.ch6; const vol = u6 && u6.flags ? +u6.flags.VOLUNTEER : 0;
        const seat = ['reader', 'listener', 'seer', 'binder'].indexOf(roleId) + 1;
        if (vol && vol === seat) {
          const th = ctx.state.thread || { letGo: 0 }; const n = th.letGo | 0;
          stairFine = n === 0 ? 'You held the stair, and you never let go. Nobody will ever know that but you.'
            : `You held the stair. You let go ${n === 1 ? 'once' : n === 2 ? 'twice' : n + ' times'}. The thread frayed and held anyway. Nobody knew. Nobody needs to.`;
        }
      } catch (e) {}

      /* The Wren tab, every ending (STYLE P6): one private line of setup, then the line this player
         says out loud. The Hearth calls for it -- on the stones in ch8_e0 on the true path, on
         ch8_code everywhere else -- and Wren answers on the next scene. Where Wren is gone (2, 4) the
         line is what the four say anyway, and they catch themselves carrying his jokes. */
      const wren = (h, setup, say, line) => {
        P.wren.push({ t: 'h', text: h });
        P.wren.push({ t: 'p', text: setup });
        if (stairFine) P.wren.push({ t: 'fine', text: stairFine });
        P.wren.push({ t: 'fine', text: say });
        P.wren.push({ t: 'letter', text: line });
      };
      const SAY = 'Say it to Wren, out loud:';

      if (E === 0) {
        /* THE FOURFOLD WALK: every phone gets the goodbye */
        P.sight.push({ t: 'h', text: 'A letter, in Wren\'s hand' });
        P.sight.push(goodbyeBlock(roleId));
        wren('What you keep', {
          reader: 'Wren’s letter is three shapes on a page now. You cannot read it. You would do it again.',
          listener: 'You cannot hear a single heart now. There is a pulse in Wren’s throat, and you can see it.',
          seer: 'You cannot see under anything now. Wren’s shadow is only a shadow. It falls away from the fire.',
          binder: 'You cannot see threads now. The last one you saw ran from your name to Wren’s, and it was red.',
        }[roleId], SAY, {
          reader: '“I can’t read your letter any more. I tried twice, on the stairs. I won’t have it translated. I know what it says. And yes, I’ll eat something.”',
          listener: '“I can’t hear a single heart now. Not one. But I can see yours, right there. You’re going to say you’re fine. I know. I’m still going to check.”',
          seer: '“I checked your shadow. Old habit. It falls the right way now. So I’m retired from standing between you and lamps. Yes, this is the face. It’s the happy one.”',
          binder: '“You said please, so I looked, before my Sight went. It was red. I can’t see it now, and it doesn’t matter. It’s tied. I intend to keep it that way.”',
        }[roleId]);
      } else if (E === 1) {
        /* THE HALF-WALK. The phone knows its own finale token and nothing else: the ch8 cast is three
           bits of ENDING and lore.js is frozen, so a phone that took the Envoy's word cannot be told
           whether that word was kept in the room. It used to ASK -- a two-button quiz about the
           player's own bookkeeping, in jargon, on the last screen of the game, which is precisely the
           procedural meta-question R5.4 says to retire. It does not ask any more.
           Instead the letter goes to every phone whose token said WALK, and one extra sentence
           covers the case where a kept key stayed dark. The Hearth has already named the walkers and
           the stayers out loud, two scenes back, in front of everybody -- that is where a player
           finds out, and it costs nobody Wren's goodbye. The Wren-tab line is the same for a walker
           and a stayer, so it is written to be true for both. */
        const tok = ctx.answer('ch7', 'finale');
        const acceptedTok = typeof tok === 'string' && /_ACCEPT$/.test(tok);
        if (walked === true) {
          P.sight.push({ t: 'h', text: 'A letter, in Wren\'s hand' });
          P.sight.push(goodbyeBlock(roleId));
          if (acceptedTok) P.sight.push({ t: 'fine', text: 'You took the Envoy\'s word tonight. If your key stayed dark at the fire, keep the letter anyway. It was written to you, not to your key.' });
        } else {
          P.sight.push({ t: 'h', text: 'On the stones' });
          P.sight.push({ t: 'p', text: '**You kept your Sight. You watched them go.**' });
          P.sight.push({ t: 'p', text: STAY_LINE[roleId] });
          if (walked === null) P.sight.push({ t: 'fine', text: 'This phone holds no word from the fire. If you walked, the goodbye was on the phone that spoke for you.' });
        }
        wren(walked === true ? 'Walker' : 'Master',
          walked === true ? 'You walked, and your Sighting is gone. Wren lives, with no pulse, and does not seem to mind.'
            : `Master ${name} of Thornhallow. The Sight is yours for life. Wren has no pulse, and you are the only kind of person who will ever notice.`,
          SAY, {
            reader: '“I read your other name tonight, the one on the door. It took me a year. I’m not telling you what it says yet. You’ll have to keep visiting.”',
            listener: '“You still haven’t got a heartbeat, have you? I… don’t mind. You’re here, and you’re warm. You’ll say you’re fine. I’m going to keep checking anyway. Every visit.”',
            seer: '“No pulse. Wrong shadow, probably. Nobody hears either from me. I’ve kept your secrets for years, and I’m good at it. And no, this isn’t the face. It’s just my face.”',
            binder: '“Some of us walked and some of us stayed. It doesn’t change who’s tied to who. You’re tied to me. I’ve decided. You don’t even have to say please.”',
          }[roleId]);
      } else if (E === 2) {
        /* THE SEALING: Wren's last line to this player by name, then dark */
        P.sight.push({ t: 'h', text: 'The last thing Wren said to you' });
        P.sight.push(darkBlock(`<div class="ch8-darkline">${esc(SEALING_LINE[roleId])}<br><br><span style="opacity:.6">— W.</span></div>`));
        wren('What you keep', {
          reader: 'A name over the Hearth that nobody in the room could spell. You could. You did not offer.',
          listener: 'A heartbeat you never heard, in a throat you knew by sight. It was never there. You listened anyway.',
          seer: 'A shadow that fell the wrong way for years. This morning it fell no way at all.',
          binder: 'A thread you looked for all night. It is tied to a fire now, and it holds.',
        }[roleId], 'Wren is not here. Say it anyway, out loud:', {
          reader: '“The mason asked how to spell your name. I knew, the old way too. I didn’t say. It’s yours, not his. And I ate something. You don’t have to keep asking.”',
          listener: '“You’d say you’re fine. You always said you were fine. I listened for you right up to the door. Nothing. There never was. I’m going to keep listening anyway.”',
          seer: '“I stood between you and every lamp for seven years, so nobody would see. Then you walked into the biggest one. Rude. I’d do it all again.”',
          binder: '“You asked me to tie the others together, tight. I will, every one of them. It isn’t in any rule. I’m doing it because you said please.”',
        }[roleId]);
      } else if (E === 3) {
        /* THE KEEPER'S WALK: Marrow's one line to each */
        P.sight.push({ t: 'h', text: 'Provost Marrow, before she goes' });
        const keeperLine = roleId === 'binder' && oathSworn(ctx) === false ? 'You would not swear to a Chair tonight. Good. Swear, one day, to a person. Wren will need at least one of you to have done that.' : KEEPER_LINE[roleId];
        P.sight.push({ t: 'letter', text: `${name} —\n\n${keeperLine}\n\n— I. M.` });
        P.sight.push({ t: 'fine', text: 'She wrote it on the stair, on the back of the writ, and did not wait to see it read.' });
        wren('The Provost', {
          reader: 'Years from now, Provost Wren will have you read the name on the door aloud once a year, properly, and never say why.',
          listener: 'Years from now, the Provost will ask you once a year whether you can hear it yet. You will say no. The Provost will say good.',
          seer: 'Years from now, the Provost will ask you once a year which way the shadow falls. You will say toward. The Provost will say good.',
          binder: 'Years from now, the Provost will ask you once a year whether there is a thread. You will say no. The Provost will say: not unbound. The knot itself. And laugh.',
        }[roleId], SAY, {
          reader: '“She chose your name. The one on the door. I can read it now. Whenever you want, I’ll read it to you properly. The way she’d have said it.”',
          listener: '“I can hear everyone crying except you. You’re making jokes instead. That’s… all right. You don’t have to say you’re fine. I’ll just sit here until you are.”',
          seer: '“You’ll have a whole school watching you now. I’ll watch the school. Your shadow stays our secret. And for once, you’re allowed to do the face.”',
          binder: '“She left you her seal. I’ll help with the rules, all of them. I’m swearing to you now, not to the Chair. No thread needed. You don’t have to say please.”',
        }[roleId]);
      } else {
        /* THE ENVOY'S BARGAIN: a Crown seal */
        P.sight.push({ t: 'h', text: 'Your posting' });
        P.sight.push({ t: 'html', html: crownSeal() });
        P.sight.push({ t: 'fine', text: `Master ${name}. Sighting: ${ctx.role.gift}. Assigned: the Cold-works, at the school. There is no page after this one.` });
        /* Wren is in a cage, and asked them to write (ch7_ending). The line is the letter. */
        wren('The last thing you saw', {
          reader: 'Wren looked at the writing above the Hearth on the way out, then at the floor. You were the only one who could have read it aloud. Nobody asked you.',
          listener: 'Wren asked you to write, and then said nothing more. You heard the cage, the boots, and the fire going on exactly as before.',
          seer: 'Four soldiers, a cage, and Wren’s shadow falling towards the fire the whole way out. Nobody but you will ever know that.',
          binder: 'Every thread in that hall went Crown gold on the way out, yours included. Wren’s went nowhere. There was nobody left to tie it to.',
        }[roleId], 'Say it out loud, then write it to Wren:', {
          reader: '“I’m writing this in both alphabets. The Crown can only read one. The other half is just for you. Also, I ate something. You’d have asked.”',
          listener: '“Are you cold? You’d say you’re fine. You always say you’re fine. I can’t hear you from here, but I never could. So I’ll write every week, just to check.”',
          seer: '“They’ll read this before you do. Hello, the Crown. Wren, I’m doing the face, and you’re not here to stop me. Your secrets stay mine. All of them.”',
          binder: '“I looked for a rule that lets me come and get you. There isn’t one yet. So I’m writing one. You’d say please. Consider it said.”',
        }[roleId]);
      }

      /* the Binder restates the Law the night was about */
      if (roleId === 'binder') {
        /* No {t:'h'} here: the Law card names itself in its own era line, and a second heading is
           what pushed the Binder's Sight page to two (R11.5 -- one heading per tab). */
        P.sight.push({ t: 'divider' });
        P.sight.push({ t: 'html', html: `<div class="laws"><div class="law founders${E === 4 ? ' struck' : ''}"><div class="era">Law 0 · Founders' · Year 0${E === 4 ? ' · STRUCK, AGAIN' : E === 0 ? ' · WRITTEN' : ' · RESTORED'}</div><div class="txt">COLD is written by four hands.</div><div class="fine">${E === 0 ? 'Tonight it was.' : E === 1 ? 'Tonight it nearly was.' : E === 4 ? 'The Crown struck it. The Crown does not need Laws.' : 'It was not, tonight. It is still the Law.'}</div></div></div>` });
      }
      return P;
    },
  });
})();
