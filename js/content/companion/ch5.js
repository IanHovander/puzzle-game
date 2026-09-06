/* Companion — Chapter V: The Long Stair (ASH · cast: OATH, EMBER_LOST, LAW0, VANE_ACCEPT, WREN_HURT) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI;
  const C = window.CompanionContent;
  const VIOLET = '#a482e6', GOLD = '#f2d27a', SEA = '#4fb3bf', RED = '#d96b4a';
  const F = 'font-family="Cinzel,serif"';

  const GATE1 = [{ shape: 'Crown', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: false }];
  const GATE2 = [{ shape: 'Crown', inv: false }, { shape: 'Flame', inv: false }, { shape: 'Flame', inv: true }, { shape: 'Hook', inv: false }, { shape: 'Spike', inv: true }];
  const DOOR = [{ shape: 'Flame', inv: false }, { shape: 'Spike', inv: false }, { shape: 'Spike', inv: true }];
  const insc = (items, mark) => G.inscription(items, { showMark: !!mark, mark: mark || null, color: '#fff', markColor: VIOLET });
  const gl = (n, c) => G.svg(n, { size: 30, color: c || GOLD });
  const pg = (i, n) => ({ t: 'fine', text: `~~page ${i} of ${n}~~` });

  /* ---------- Seer under-layers ---------- */
  function ringUnder(n, markSlot, caption) {
    const cx = 120, cy = 100, R = 62;
    let s = `<g stroke="#fff" fill="none" stroke-width="1.5" transform="translate(${cx},${cy})"><circle r="${R}"/>`;
    for (let i = 0; i < n; i++) { const a = (i / n * 360 - 90) * Math.PI / 180; s += `<circle cx="${(Math.cos(a) * R).toFixed(1)}" cy="${(Math.sin(a) * R).toFixed(1)}" r="11"/><text x="${(Math.cos(a) * (R + 22)).toFixed(1)}" y="${(Math.sin(a) * (R + 22) + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" ${F} stroke="none">${i + 1}</text>`; }
    const am = ((markSlot - 1) / n * 360 - 90) * Math.PI / 180;
    s += `<path d="M${(Math.cos(am) * (R - 20)).toFixed(1)},${(Math.sin(am) * (R - 20)).toFixed(1)} l-6,-6 l12,0 z" fill="${VIOLET}" stroke="none" transform="rotate(${((markSlot - 1) / n * 360).toFixed(0)} ${(Math.cos(am) * (R - 20)).toFixed(1)} ${(Math.sin(am) * (R - 20)).toFixed(1)})"/>`;
    s += `<path d="M-16,-${R + 18} a${R + 18},${R + 18} 0 0 1 32,0" stroke-width="1.5"/><path d="M16,-${R + 18} l-7,-4 l0,8 z" fill="#fff" stroke="none"/></g>`;
    s += `<text x="${cx}" y="192" text-anchor="middle" fill="${VIOLET}" font-size="10" ${F}>${caption}</text>`;
    return s;
  }
  // An inscription drawn as a plain group (a nested <svg> would be resized by the page's CSS).
  const inscG = (items, mark, x, y) => {
    const cell = 40, w = items.length * cell + 28, h = 52;
    let s = `<g transform="translate(${x - w / 2},${y})"><rect x="0" y="0" width="${w}" height="${h}" rx="5" fill="none" stroke="#fff" stroke-opacity=".35"/>`;
    items.forEach((it, i) => { s += `<g transform="translate(${14 + i * cell + cell / 2},${h / 2}) scale(0.9)" style="color:#fff">${G.shapeInner(it.shape, it.inv)}</g>`; });
    const mx = mark === 'left' ? 7 : w - 7; s += `<path d="M${mx},${h / 2 - 7} L${mx + (mark === 'left' ? 6 : -6)},${h / 2} L${mx},${h / 2 + 7} Z" fill="${VIOLET}"/>`;
    return s + `</g>`;
  };
  const underGate = (items, mark, n, markSlot, title, cap) => `<svg viewBox="0 0 360 300"><rect width="360" height="300" fill="#000"/>
    <text x="180" y="16" text-anchor="middle" fill="#fff" font-size="11" ${F}>${title}</text>
    ${inscG(items, mark, 180, 28)}
    <text x="180" y="98" text-anchor="middle" fill="${VIOLET}" font-size="10" ${F}>the carving's mark: on the ${mark.toUpperCase()}${mark === 'right' ? ' — turned' : ' — upright'}</text>
    <g transform="translate(60,100)">${ringUnder(n, markSlot, cap)}</g>
    <text x="310" y="196" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">sunwise =</text><text x="310" y="208" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">clockwise</text>
  </svg>`;
  const underGate1 = underGate(GATE1, 'right', 5, 1, 'THE TURNED GATE — under the stone', 'the scratch — slot 1');
  const underGate2 = underGate(GATE2, 'left', 5, 3, 'THE SILENT GATE — under the stone', 'the scratch — slot 3');
  const underDoor = underGate(DOOR, 'left', 4, 2, 'MERE\'S DOOR — under the wall', 'the scratch — slot 2');

  // The ledge over the Under-Marches: a torch, four shadows away from it, Wren's toward it.
  const underLedge = `<svg viewBox="0 0 360 230">
    <rect width="360" height="230" fill="#000"/>
    <g stroke="#fff" fill="none" stroke-width="1.2">
      <path d="M10,150 L120,150 L140,170 L350,170"/><path d="M10,150 L10,220 M350,170 L350,220"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${200 + i * 36},130 l0,-24 l6,-8 l6,8 l0,24 z"/>`).join('')}
      <text x="254" y="92" text-anchor="middle" fill="#fff" font-size="9" ${F}>four thrones</text>
      <path d="M30,120 L30,80 M22,84 L38,84"/><ellipse cx="30" cy="74" rx="6" ry="9"/>
      <text x="30" y="135" text-anchor="middle" fill="#fff" font-size="9" ${F}>torch</text>
      <path d="M0,200 C60,190 120,210 180,200 C240,190 300,210 360,200" stroke="${SEA}" stroke-dasharray="3 3"/>
      <text x="180" y="222" text-anchor="middle" fill="${SEA}" font-size="9" ${F}>the Cold, below — it throws no shadow that you can see</text>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="90" cy="120" r="6"/><circle cx="120" cy="105" r="6"/><circle cx="150" cy="125" r="6"/><circle cx="175" cy="108" r="6"/><circle cx="110" cy="140" r="6"/></g>
    <g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round"><path d="M90,120 L124,132"/><path d="M120,105 L154,113"/><path d="M150,125 L184,133"/><path d="M175,108 L208,114"/></g>
    <g stroke="${VIOLET}" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M110,140 L72,130"/></g>
    <g fill="#fff" font-size="9" ${F}><text x="82" y="112">Bookmoth</text><text x="112" y="97">Hush</text><text x="142" y="118">Owl</text><text x="167" y="100">Knot</text><text x="100" y="158" fill="${VIOLET}">Wren</text></g>
    <text x="180" y="30" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".7">shadows on the ledge, as they fall</text>
  </svg>`;

  // Nine stones, two hollow.
  const stonesSvg = `<svg viewBox="0 0 360 250">
    <rect width="360" height="250" fill="#000"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => { const x = 60 + (i % 3) * 120, y = 50 + Math.floor(i / 3) * 75; const hollow = i === 2 || i === 7; const rx = 44 + (i % 2) * 6, ry = 26 + (i % 3) * 3;
      return `<g transform="translate(${x},${y})"><path d="M${-rx},0 C${-rx},-${ry} ${-rx * 0.4},-${ry + 6} 0,-${ry} C${rx * 0.5},-${ry + 4} ${rx},-${ry * 0.6} ${rx},0 C${rx},${ry} ${rx * 0.3},${ry + 4} 0,${ry} C${-rx * 0.6},${ry + 2} ${-rx},${ry * 0.5} ${-rx},0 Z" fill="none" stroke="#fff" stroke-width="1.4"/>${hollow ? `<path d="M${-rx * 0.55},2 C${-rx * 0.5},-${ry * 0.5} ${-rx * 0.1},-${ry * 0.6} ${rx * 0.2},-${ry * 0.35} C${rx * 0.55},-${ry * 0.1} ${rx * 0.5},${ry * 0.5} ${rx * 0.1},${ry * 0.55} C${-rx * 0.3},${ry * 0.6} ${-rx * 0.55},${ry * 0.3} ${-rx * 0.55},2 Z" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity=".8"/>` : `${[0, 1, 2].map(k => `<path d="M${-rx * 0.6 + k * 12},${-ry * 0.5 + k * 8} l${rx * 0.9},${ry * 0.15}" stroke="#fff" stroke-width=".8" opacity=".35"/>`).join('')}`}<text y="${ry + 14}" text-anchor="middle" fill="#fff" font-size="9" ${F} opacity=".6">${i + 1}</text></g>`; }).join('')}
    <text x="180" y="244" text-anchor="middle" fill="${VIOLET}" font-size="10" ${F}>solid stone hatches; a hollow shows its cavity</text>
  </svg>`;

  /* ---------- Reader: nine worn glyphs, three read EMBER ---------- */
  const NINE = [['Crown', true], ['Crown', false], ['Flame', false], ['Crown', true], ['Hook', false], ['Spike', true], ['Crown', false], ['Flame', true], ['Crown', true]];
  const nineSvg = `<svg viewBox="0 0 330 260" width="100%" style="max-width:330px;display:block;margin:0 auto">
    <rect x="2" y="2" width="326" height="256" rx="6" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.25)"/>
    ${NINE.map(([sh, inv], i) => { const x = 55 + (i % 3) * 110, y = 48 + Math.floor(i / 3) * 84; return `<g transform="translate(${x},${y}) scale(1.3)" style="color:#e9e2d2" opacity="${0.55 + (i % 4) * 0.08}">${G.shapeInner(sh, inv)}</g><path d="M${x - 22 + (i * 7) % 15},${y - 16 + (i * 11) % 30} l${18 + (i * 5) % 20},${(i % 3) * 6 - 4}" stroke="rgba(11,10,16,0.9)" stroke-width="${2 + i % 3}"/><text x="${x}" y="${y + 36}" text-anchor="middle" font-size="9" fill="rgba(233,226,210,0.45)" ${F}>${i + 1}</text>`; }).join('')}
  </svg>`;

  /* ---------- Binder: Laws and oaths ---------- */
  const lawHtml = (list) => `<div class="laws">${list.map(l => `<div class="law ${l.era === 'O' ? 'order' : 'founders'}${l.struck ? ' struck' : ''}${l.restored ? ' restored' : ''}"><div class="era">Law ${l.n} · ${l.era === 'F' ? 'Founders\' · Year 0' : 'Order\'s · Year ' + l.year}${l.restored ? ' · RESTORED' : l.struck ? ' · STRUCK' : ''}</div><div class="txt">${l.text}</div>${l.note ? `<div class="fine">${l.note}</div>` : ''}</div>`).join('')}</div>`;
  const law = (n) => L.laws.find(l => l.n === n);
  const OATHS = [
    { name: 'Oath of the Gate', line: ['THORN', 'ASH'], lock: 'KNOT' },
    { name: 'Oath of the Keeper', line: ['WELL', 'EMBER'], lock: 'EMBER' },
    { name: 'Oath of the Veil', line: ['ASH', 'THORN'], lock: 'VEIL' },
    { name: 'Oath of the Well', line: ['WELL', 'ASH'], lock: 'KNOT' },
    { name: 'Oath of the Chair', line: ['CROWN', 'THORN'], lock: 'EMBER' },
  ];
  const oathsHtml = `<table class="blk-table"><tr><th>oath</th><th>line</th><th>lock (last glyph)</th></tr>${OATHS.map(o => `<tr><td>${o.name}</td><td>${o.line.map(n => gl(n, RED)).join(' ')}</td><td>${gl(o.lock, RED)}</td></tr>`).join('')}</table><p class="fine">Locks are shown as carved, unnamed. The Hook upright is ${gl('KNOT', RED)} KNOT; turned, ${gl('VEIL', RED)} VEIL. The Crown upright is ${gl('CROWN', RED)} CROWN; turned, ${gl('EMBER', RED)} EMBER.</p>`;

  /* ---------- the Founders' Count task ---------- */
  const MATERIAL = {
    reader: { q: 'Nine glyphs on the newel, worn. The line is upright — read each as it stands. **How many read EMBER?**', html: nineSvg },
    listener: { q: 'A peal of two bells, one higher, one lower. **How many times does the LOWER bell strike?** Cup your ear; play it as often as you need.', html: null },
    seer: { q: 'Nine stones in the under-layer of the landing. **How many are hollow?**', html: `<div class="blk-svg underlayer">${stonesSvg}</div>` },
    binder: { q: 'Five oaths carved on the newel. Law 12 (Founders\'): *an oath binds only if its lock is KNOT or EMBER.* The lock is the last glyph. **How many bind?**', html: oathsHtml },
  };
  const PEAL = 'HLHLHHLHLHHL'; // lower bell strikes 5 times, the higher 7
  function playPeal(Audio) { Audio.init(); if (Audio.isMuted()) Audio.setMuted(false); PEAL.split('').forEach((c, i) => CA.later(() => Audio.note(c === 'H' ? 79 : 64, 0.9, c === 'H' ? 0.14 : 0.2), i * 480)); return PEAL.length * 480 + 600; }

  function countTask(roleId) {
    return { t: 'task', id: 'count', title: 'The Founders\' Count — 45 seconds', replayable: true, run: (box, api) => {
      const key = 'ch5:count'; const prev = api.state.done[key];
      let ctl = null;
      const mat = MATERIAL[roleId];
      const idle = () => {
        UI.clear(box);
        if (prev != null) { box.appendChild(UI.el('div', { class: 'big-digit', text: String(prev) })); box.appendChild(UI.el('p', { class: 'fine', text: 'Your digit. Say it aloud when the Hearth asks — in seat order, Bookmoth first. Never show the phone.' })); }
        else box.appendChild(UI.el('p', { class: 'fine', text: 'The Hearth will count 3, 2, 1, START. On START, press Start. You have forty-five seconds to find one digit.' }));
        box.appendChild(UI.el('button', { class: 'btn primary big-btn', text: prev != null ? 'Count again' : 'Start', onclick: start }));
      };
      const start = () => {
        UI.stopAudio(); // Start is a press like any other: drop a peal still sounding from the last attempt
        if (ctl) { ctl.cancel(); ctl = null; }
        UI.clear(box); api.audio.init(); if (api.audio.unlockMedia) api.audio.unlockMedia();
        box.appendChild(UI.el('p', { html: UI.rich(mat.q) }));
        if (mat.html) box.appendChild(UI.el('div', { html: mat.html }));
        if (roleId === 'listener') { box.appendChild(UI.audioButton('Cup your ear — the peal', () => playPeal(api.audio))); const rv = UI.el('div', {}); box.appendChild(rv); rv.appendChild(UI.el('button', { class: 'btn small ghost', text: 'I cannot hear it — show the peal', onclick: () => { rv.innerHTML = `<div class="arrow-strip">${PEAL.split('').map(c => `<span class="step"><b>${c === 'H' ? '▲' : '▼'}</b>${c === 'H' ? 'high' : 'low'}</span>`).join('')}</div>`; } })); playPeal(api.audio); }
        const cd = UI.el('div', { class: 'cd', text: '45' }); box.appendChild(cd);
        ctl = UI.countdown(box, 45, (s) => { cd.textContent = s; });
        ctl.promise.then(() => { cd.textContent = 'TIME — pick your digit'; });
        box.appendChild(UI.el('p', { class: 'fine', text: 'Your digit:' }));
        const grid = UI.el('div', { class: 'pick-grid', style: { gridTemplateColumns: 'repeat(5, 1fr)' } });
        for (let d = 0; d <= 9; d++) grid.appendChild(UI.el('div', { class: 'pk', text: String(d), onclick: () => { ctl.cancel(); api.state.done[key] = d; api.save(); api.audio.sfx('seal'); render(d); } }));
        box.appendChild(grid);
      };
      const render = (d) => { UI.clear(box); box.appendChild(UI.el('div', { class: 'big-digit', text: String(d) })); box.appendChild(UI.el('p', { class: 'fine', text: 'Sealed. Say it aloud when the Hearth asks — in seat order, Bookmoth first. Never show the phone.' })); box.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Count again', onclick: start })); };
      idle();
    } };
  }

  /* ---------- The Thread (after YES): a hold-button; fraying is counted on this phone only ---------- */
  const threadBlock = { t: 'custom', render: (el, ctx) => {
    // Appears once this phone has answered YES (the page is not re-rendered by the choice, so poll briefly).
    if (ctx.answer('ch5', 'hold') !== 'YES') { const iv = setInterval(() => { if (!el.isConnected) { clearInterval(iv); return; } if (ctx.answer('ch5', 'hold') === 'YES') { clearInterval(iv); threadBlock.render(el, ctx); } }, 500); return; }
    const key = 'ch5:thread'; const st = ctx.state.done[key] || { fray: 0, held: 0 }; ctx.state.done[key] = st;
    el.appendChild(UI.el('div', { class: 'blk-divider' }));
    el.appendChild(UI.el('h3', { text: 'The Thread' }));
    el.appendChild(UI.el('p', { html: UI.rich('If the Hearth named **you**: your Sight is spent for now, and this is your page. Keep a finger on the thread until the Hearth says it is tied off — through the first two rounds of the Bells. If it named someone else, you may put this down; nothing is counted.') }));
    const line = UI.el('div', { class: 'thread-line' }); line.style.opacity = '.35';
    const btn = UI.el('button', { class: 'btn thread-hold', text: 'HOLD THE THREAD' });
    const stat = UI.el('p', { class: 'fine', text: 'Not held.' });
    let holding = false, since = 0, everHeld = !!st.held;
    const down = (e) => { e.preventDefault(); if (holding) return; holding = true; since = Date.now(); everHeld = true; line.style.opacity = '1'; btn.textContent = 'HOLDING'; stat.textContent = 'Held. Do not let go.'; try { ctx.audio.init(); ctx.audio.sfx('seal'); } catch (x) {} };
    const up = () => { if (!holding) return; holding = false; st.held += Math.round((Date.now() - since) / 1000); st.fray += 1; ctx.save(); line.style.opacity = '.35'; btn.textContent = 'HOLD THE THREAD'; stat.textContent = 'The thread frays a little. Take it up again.'; try { ctx.audio.sfx('miss'); } catch (x) {} };
    btn.addEventListener('pointerdown', down); btn.addEventListener('pointerup', up); btn.addEventListener('pointerleave', up); btn.addEventListener('pointercancel', up);
    el.appendChild(line); el.appendChild(btn); el.appendChild(stat);
    el.appendChild(UI.el('p', { class: 'fine', text: 'The Hearth cannot see this page. Only you will ever know how well it was held.' }));
    void everHeld;
  } };

  /* ---------- pages ---------- */
  C.chapters.push({
    id: 'ch5',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {}; const refused = (f.OATH | 0) === 0; const law0 = !!f.LAW0;
      const npages = refused ? 4 : 3;

      /* ===== READER ===== */
      if (roleId === 'reader') {
        let p = 1;
        if (refused) {
          P.sight.push(pg(p++, npages), { t: 'h', text: 'Mere\'s door — three shapes' });
          P.sight.push({ t: 'p', text: 'Over a ring of four slots, if the Hearth shows a door: a **Flame**, a **Spike**, a **Spike inverted**. Which way the line is read is Owl\'s to say.' });
          P.sight.push({ t: 'html', html: insc(DOOR) });
          P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark left)', `${gl('ASH')} ASH · ${gl('THORN')} THORN · ${gl('WELL')} WELL — <em>fire · a gate · down</em>`], ['turned (mark right)', `${gl('THORN')} THORN · ${gl('WELL')} WELL · ${gl('COLD')} COLD — <em>a gate · down · cold</em>`]] });
        }
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Turned Gate — three shapes' });
        P.sight.push({ t: 'p', text: 'Clean on your page where the Hearth shows them worn: a **Crown**, a **Hook**, a **Spike**, all standing upright, left to right.' });
        P.sight.push({ t: 'html', html: insc(GATE1) });
        P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark left), left to right', `${gl('CROWN')} CROWN · ${gl('KNOT')} KNOT · ${gl('THORN')} THORN — <em>one · bound · a gate</em>`], ['turned (mark right), right to left, every glyph inverted', `${gl('WELL')} WELL · ${gl('VEIL')} VEIL · ${gl('EMBER')} EMBER — <em>down · hidden · kept</em>`]] });
        P.sight.push({ t: 'fine', text: 'A glyph never changes its place on the stone — only its reading. Which end the mark is on is Under-Sight, not yours. Where a turned line is *placed* on a ring is Knot\'s Law.' });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Silent Gate — five shapes' });
        P.sight.push({ t: 'p', text: 'Five shapes as they physically stand, left to right: a **Crown**, a **Flame**, a **Flame inverted**, a **Hook**, a **Spike inverted**.' });
        P.sight.push({ t: 'html', html: insc(GATE2) });
        P.sight.push({ t: 'table', head: ['If the line is…', 'it reads'], rows: [['upright (mark left)', `${gl('CROWN')} CROWN · ${gl('ASH')} ASH · ${gl('COLD')} COLD · ${gl('KNOT')} KNOT · ${gl('WELL')} WELL — <em>one · fire · cold · bound · down</em>`], ['turned (mark right)', `${gl('THORN')} THORN · ${gl('VEIL')} VEIL · ${gl('ASH')} ASH · ${gl('COLD')} COLD · ${gl('EMBER')} EMBER — <em>a gate · hidden · fire · cold · kept</em>`]] });
        P.sight.push({ t: 'fine', text: 'Either way, one of the five is **COLD** — the glyph the Order says is never written. The Book of Laws is Knot\'s; the bells\' counts are Hush\'s; the mark is Owl\'s.' });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Founders\' Count' });
        P.sight.push({ t: 'p', text: 'The third gate asks you for a **digit**: nine worn glyphs, and a question. It is on your **SPEAK** page. Do not start it until the Hearth says START.' });
        P.wren.push({ t: 'h', text: 'On the ledge' });
        P.wren.push({ t: 'p', text: 'Wren stands beside you looking at the four thrones, and says without turning: "You went quiet in the study, Bookmoth. You read something with my name in it." A pause. "You don\'t have to say. I just — I wanted you to know I noticed you being kind."' });
        if (f.WREN_HURT) P.wren.push({ t: 'p', text: 'Wren\'s strapped arm is between you. Wren has not mentioned it since the Vault, and has laughed twice on the stair, both times at the wrong moment.' });
        P.wren.push({ t: 'fine', text: 'The glossary in your Book still says what it said in the study. You have not told anyone. You are not sure what there is to tell.' });
      }

      /* ===== LISTENER ===== */
      if (roleId === 'listener') {
        let p = 1;
        if (refused) {
          P.sight.push(pg(p++, npages), { t: 'h', text: 'Mere\'s door — the phrase' });
          P.sight.push({ t: 'audio', label: 'The door, three notes', strip: CA.strip([1, 3]), play: (A) => CA.playSteps(A, [1, 3]), text: 'Up one, then up three. Of the glyphs Bookmoth reads, only one order climbs that way.' });
        }
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Turned Gate — the phrase' });
        P.sight.push({ t: 'audio', label: 'The gate, three notes', strip: CA.strip([1, -2]), play: (A) => CA.playSteps(A, [1, -2]), text: '**Up one, then down two.** Your Ladder is in the **Book**.' });
        P.sight.push({ t: 'p', text: 'Say this before anyone touches the ring: if Bookmoth reads the carving *upright* — CROWN, KNOT, THORN — those three fit this phrase in **no order at all**. CROWN is step 6, KNOT step 2, THORN step 1; nothing there goes up one and down two. Only the *turned* reading fits, and it fits exactly one way.' });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Silent Gate — five muted bells' });
        P.sight.push({ t: 'p', text: 'One bell hangs above each of the five shapes, first to fifth, left to right. The Hearth cannot hear them. You can: each bell taps a **count**. A bell\'s count is its glyph\'s slot, counted **sunwise from the mark** — and the mark is Owl\'s.' });
        const counts = [2, 5, 1, 3, 4];
        P.sight.push({ t: 'custom', render: (el, cx) => {
          const wrap = UI.el('div', { class: 'blk-audio' });
          counts.forEach((n, i) => {
            const cracked = f.EMBER_LOST && n === 5;
            const row = UI.el('div', { class: 'row', style: { alignItems: 'center', gap: '10px', margin: '6px 0' } });
            row.appendChild(UI.audioButton(`Bell ${i + 1}${cracked ? ' — cracked' : ''}`, () => { cx.audio.init(); if (cx.audio.isMuted()) cx.audio.setMuted(false); if (cracked) { cx.audio.sfx('miss'); return 700; } return CA.pulses(cx.audio, n, 440); }, { cls: 'small' + (cracked ? ' ghost' : '') }));
            row.appendChild(UI.el('span', { class: 'fine', text: cracked ? 'over the second shape. It does not sound.' : `over the ${['first', 'second', 'third', 'fourth', 'fifth'][i]} shape` }));
            wrap.appendChild(row);
          });
          wrap.appendChild(UI.el('p', { class: 'fine nohear', text: 'No sound? Set the phone to ring, not silent, turn the volume up, and press again. The counts are also written under "If your ear fails", below.' }));
          el.appendChild(wrap);
        } });
        if (f.EMBER_LOST) P.sight.push({ t: 'p', text: 'The second bell is **cracked** — a hairline from the night the Ember left the school — and gives nothing. But the five counts are one each of **1 to 5**, so the missing count is whichever the other four do not say.' });
        P.sight.push({ t: 'reveal', label: 'If your ear fails — the counts, written', blocks: [{ t: 'table', head: ['bell', 'taps'], rows: counts.map((n, i) => [`${i + 1} (${['first', 'second', 'third', 'fourth', 'fifth'][i]} shape)`, f.EMBER_LOST && n === 5 ? 'cracked — silent. The one count the others leave out.' : String(n)]) }] });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Founders\' Count' });
        P.sight.push({ t: 'p', text: 'The third gate asks you for a **digit**: a peal of two bells, and a question. It is on your **SPEAK** page. Do not start it until the Hearth says START.' });
        P.sight.push({ t: 'h', text: 'Heartbeats on the stair' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${['Bookmoth', 'Hush', 'Owl', 'Knot'].map(n => `<div class="hb"><span>${n}</span>${D.trace('normal')}</div>`).join('')}<div class="hb"><span>Provost Marrow</span>${D.trace('normal')}</div><div class="hb"><span>the soldiers, above</span>${D.trace('fast')}</div><div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'Marrow\'s is the slowest you have ever heard it — the beat of someone who has decided. Wren: too quiet to catch. The stair is quiet enough now that you would hear it, if there were anything to hear.' });
        P.wren.push({ t: 'h', text: 'What the stair sounds like' });
        P.wren.push({ t: 'p', text: 'Boots above, in step, twelve pairs. Water below, moving very slowly. Marrow, once, drawing a breath as if to say something to Wren, and not saying it. And beside you on the ledge, where Wren is standing, the thing you have been calling a fault in your gift for four years: nothing. Not quiet. *Nothing.*' });
        if (f.WREN_HURT) P.wren.push({ t: 'p', text: 'Wren\'s strapped arm knocks the wall on a turn of the stair. You hear the breath Wren does not let out.' });
        P.wren.push({ t: 'fine', text: 'The portraits in the Gallery said *four went down*. You have not stopped hearing it.' });
      }

      /* ===== SEER ===== */
      if (roleId === 'seer') {
        let p = 1;
        if (refused) {
          P.sight.push(pg(p++, npages), { t: 'h', text: 'Under Mere\'s door' });
          P.sight.push({ t: 'p', text: 'The carving\'s **mark is on the left**: upright, read left to right. The ring\'s scratch is at **slot 2** of four.' });
          P.sight.push({ t: 'svg', cls: 'underlayer', svg: underDoor });
        }
        P.sight.push(pg(p++, npages), { t: 'h', text: 'Under the Turned Gate' });
        P.sight.push({ t: 'p', text: 'The carving\'s **mark is on the RIGHT**. It was cut for those coming *up* the stair: the line is **turned** — Bookmoth reads it right to left with every glyph inverted. The ring\'s scratch is at **slot 1** of five.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underGate1 });
        P.sight.push({ t: 'fine', text: 'Where a *turned* line is placed around a ring — sunwise or the other way — is not yours to see. Knot has two Laws about it. Ask.' });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'Under the Silent Gate' });
        P.sight.push({ t: 'p', text: 'The carving\'s **mark is on the LEFT**: upright, left to right. The ring\'s scratch is at **slot 3** of five — the sigil begins there, in the middle of the ring, and goes sunwise.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underGate2 });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Founders\' Count' });
        P.sight.push({ t: 'p', text: 'The third gate asks you for a **digit**: nine stones in the under-layer, and a question. It is on your **SPEAK** page. Do not start it until the Hearth says START.' });
        P.sight.push({ t: 'h', text: 'Under the ledge' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underLedge });
        P.sight.push({ t: 'fine', text: 'Four thrones, facing the same way — toward the Founders\' road, down. Under the water, the First Hall\'s floor has a door in it. Nothing on this page is a puzzle. Say what you see anyway.' });
        P.wren.push({ t: 'h', text: 'The shadow, again' });
        P.wren.push({ t: 'p', text: 'One torch on the ledge. Four shadows falling away from it, the way shadows do. Wren\'s falling toward it — and, when Marrow moves the lantern, toward *that* instead, as if Wren\'s shadow simply went to whatever was warmest. You have looked at this every chapter of the night. You have stopped calling it the lamp.' });
        if (f.WREN_HURT) P.wren.push({ t: 'p', text: 'Under the strapping on Wren\'s arm, in the under-layer, there is nothing wrong. Nothing to see at all. You are not sure what that means, and you are not going to say it on a stair.' });
      }

      /* ===== BINDER ===== */
      if (roleId === 'binder') {
        let p = 1;
        if (refused) {
          P.sight.push(pg(p++, npages), { t: 'h', text: 'Mere\'s door — one Law' });
          P.sight.push({ t: 'html', html: lawHtml([law(1)]) });
          P.sight.push({ t: 'p', text: 'Sunwise from the mark, three glyphs. Owl has the mark; Bookmoth the words; Hush the order. Nothing here disagrees with anything.' });
        }
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Turned Gate — two Laws that disagree' });
        P.sight.push({ t: 'html', html: lawHtml([law(5), law(11), law(3)]) });
        P.sight.push({ t: 'p', text: 'Read them by year. Law 11 is the Order\'s, written in 212: *every* inscription sunwise. Law 5 is the Founders\': a **turned** inscription is placed **widdershins** — anticlockwise — from its mark. Law 3 says which wins. This is the first time tonight two Laws have truly disagreed. It will not be the last.' });
        P.sight.push({ t: 'fine', text: 'So: if Owl says the carving is turned, place its first glyph *on* the mark and the rest going the other way round the ring. If Owl says upright, sunwise as ever.' });
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Silent Gate — the glyph that is never written' });
        P.sight.push({ t: 'html', html: lawHtml([law(6)]) });
        P.sight.push({ t: 'p', text: 'Order\'s, 212 — the same year as Law 11, the same year the Vault was rebuilt, the same year Law 0 was struck. Where the carving shows COLD, the Order leaves that slot **empty**.' });
        if (law0) {
          P.sight.push({ t: 'html', html: lawHtml([Object.assign({}, law(0), { struck: false, restored: true, note: 'Restored, by what you found in the study.' })]) });
          P.sight.push({ t: 'p', text: '**Law 0 is older than Law 6. The older binds: COLD is *written* — by four hands.** The gate will take the empty slot the way it has taken it from the Order for four hundred years. It will also take COLD, if all four keys close it. Either way is a true reading. One of them is older.' });
        } else {
          P.sight.push({ t: 'fine', text: 'On the 212 page of your Book, a Founders\' Law about COLD stands struck through in the same hand. It is struck. Struck Laws do not bind. You have read it a dozen times anyway.' });
        }
        P.sight.push(pg(p++, npages), { t: 'h', text: 'The Founders\' Count — Law 12' });
        P.sight.push({ t: 'html', html: lawHtml([law(12)]) });
        P.sight.push({ t: 'p', text: 'The third gate asks you for a **digit**: five oaths, and this Law. It is on your **SPEAK** page. Do not start it until the Hearth says START.' });
        P.sight.push({ t: 'h', text: 'Threads on the stair' });
        const threads = [
          '**Marrow — Wren:** grey. The colour of someone who has already said goodbye. It has not changed since the study.',
          (f.OATH | 0) === 1 ? '**The four of you — the Chair:** red, and tight. KNOT. It cannot be unbound; she holds the other end and does not know it.' : (f.OATH | 0) === 2 ? '**The four of you — the Chair:** red, with a slip in it that you tied yourself. EMBER. She cannot tell the difference. You can.' : '**The four of you — the Chair:** no thread. You did not swear. She did not look at you on the stair.',
          '**The soldiers, above — the capital:** gold, every one of them, and none of it theirs.',
          f.VANE_ACCEPT ? '**The four of you — the Envoy:** gold, thin, going up the stair into the dark. His word, accepted. It has not been paid for yet.' : '**The Envoy (somewhere above):** two threads, red and gold, pulling opposite ways. You have never seen a man wear both.',
          '**Wren:** *No thread found.* Not unbound. The knot itself.',
        ];
        P.sight.push({ t: 'list', items: threads });
        P.wren.push({ t: 'h', text: 'The 212 page' });
        P.wren.push({ t: 'p', text: 'Three Order\'s Laws in one year: a Founder faces the dial before them; every inscription sunwise; COLD is never written. And one Founders\' Law struck through in the same ink. You are standing on a stair that was warded by a Founder against exactly those three Laws, and every gate on it opens for the older reading.' });
        P.wren.push({ t: 'p', text: 'You have not said this aloud. You are going to need to.' });
      }

      /* ===== SPEAK (all roles) ===== */
      P.speak.push({ t: 'h', text: 'The Founders\' Count' });
      P.speak.push({ t: 'fine', text: 'A job, not a secret: forty-five seconds and one digit. Wait for the Hearth\'s START.' });
      P.speak.push(countTask(roleId));
      P.speak.push({ t: 'divider' });
      P.speak.push({ t: 'h', text: 'The stair' });
      P.speak.push({ t: 'fine', text: 'Only when the Hearth asks. *Say what you see. Never show your phone.*' });
      if (roleId === 'binder') P.speak.push({ t: 'reveal', label: 'If the table chooses to collapse the stair', blocks: [{ t: 'omen', text: 'Law 6 says never. The struck Law says four hands. You are about to write it with one.' }, { t: 'fine', text: 'Say it aloud before the Warden writes it. It will not stop anyone. It should be said.' }] });
      P.speak.push({ t: 'choice', id: 'hold', prompt: '**A held thread needs a living anchor.** Someone stays on the stair and holds it while the others go on; their Sight pays for it through the first two rounds of the bells. The first YES the Hearth receives, in seat order, is the one who stays. *Stay and hold?*', options: [{ id: 'YES', text: 'YES — I stay and hold the stair.' }, { id: 'NO', text: 'NO — I go on.' }],
        after: (opt) => opt === 'YES' ? 'Type it into the Hearth when it asks. If the Hearth names you, come back to this page: your thread is below.' : 'Type it into the Hearth when it asks. Nobody will know what it said.' });
      P.speak.push(threadBlock);
      return P;
    },
  });
})();
