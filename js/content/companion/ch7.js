/* Companion — Finale (CROWN) */
(function () {
  'use strict';
  const G = window.VigilGlyphs, L = window.VigilLore, CA = window.CompanionAudio, D = window.CompanionDraw, UI = window.VigilUI, Shared = window.VigilShared;
  const C = window.CompanionContent;
  const V = '#a482e6';

  const WEST = [{ shape: 'Spike', inv: false }, { shape: 'Hook', inv: false }, { shape: 'Hook', inv: true }, { shape: 'Crown', inv: true }];
  const EAST = [{ shape: 'Flame', inv: false }, { shape: 'Crown', inv: true }, { shape: 'Spike', inv: false }, { shape: 'Flame', inv: true }];
  const wall = (items, mark, showMark) => G.inscription(items, { showMark, mark, color: '#fff', markColor: V });
  const gl = (n, c) => G.svg(n, { size: 28, color: c || '#f2d27a' });
  const row = (names, c) => names.map(n => gl(n, c) + ' ' + n).join(', ');
  const law = (n, era, year, text, extra) => `<div class="law ${era === 'O' ? 'order' : 'founders'}${extra && extra.struck ? ' struck' : ''}"><div class="era">Law ${n} · ${era === 'F' ? 'Founders\' · Year 0' : 'Order\'s · Year ' + year}${extra && extra.tag ? ' · ' + extra.tag : ''}</div><div class="txt">${UI.esc(text)}</div>${extra && extra.note ? `<div class="fine">${extra.note}</div>` : ''}</div>`;

  /* Seer: the ring page with two marks — slot 1 (west) and slot 8 (east); the east half turned. */
  const twoMarks = () => {
    const cx = 130, cy = 120, R = 82;
    let s = `<svg viewBox="0 0 360 240"><rect width="360" height="240" fill="#000"/>`;
    // turned half shading (slots 5..8 occupy the left half of the circle)
    s += `<path d="M${cx},${cy - R - 18} A${R + 18},${R + 18} 0 0 0 ${cx},${cy + R + 18} Z" fill="rgba(164,130,230,0.12)" stroke="none"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="1.5"/>`;
    s += `<path d="M${cx + 30},${cy - R - 24} a${R + 24},${R + 24} 0 0 1 40,12" fill="none" stroke="#fff" stroke-width="2"/><path d="M${cx + 70},${cy - R - 12} l-9,-3 l2,9 z" fill="#fff"/>`;
    s += `<text x="${cx}" y="12" text-anchor="middle" fill="#fff" font-size="10" font-family="Cinzel,serif">sunwise = clockwise</text>`;
    for (let i = 0; i < 8; i++) { const a = (i / 8 * 360 - 90) * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="#000" stroke="${i >= 4 ? V : '#fff'}" stroke-width="1.5"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="11" font-family="Cinzel,serif">${i + 1}</text>`; }
    // mark at slot 1 (top) and slot 8 (top-left)
    s += `<path d="M${cx - 6},${cy - R - 30} L${cx},${cy - R - 18} L${cx + 6},${cy - R - 30} Z" fill="${V}"/><text x="${cx + 14}" y="${cy - R - 24}" fill="${V}" font-size="10" font-family="Cinzel,serif">west · slot 1</text>`;
    const a8 = (7 / 8 * 360 - 90) * Math.PI / 180, x8 = cx + Math.cos(a8) * (R + 26), y8 = cy + Math.sin(a8) * (R + 26);
    s += `<g transform="translate(${x8.toFixed(1)},${y8.toFixed(1)}) rotate(-45)"><path d="M-6,-12 L0,0 L6,-12 Z" fill="${V}"/></g><text x="${(x8 - 8).toFixed(1)}" y="${(y8 - 16).toFixed(1)}" text-anchor="end" fill="${V}" font-size="10" font-family="Cinzel,serif">east · slot 8</text>`;
    s += `<text x="${cx - R + 6}" y="${cy + 4}" text-anchor="start" fill="${V}" font-size="9" font-family="Cinzel,serif" opacity=".9">turned</text>`;
    // legend
    s += `<g transform="translate(250,40)"><text x="0" y="0" fill="#fff" font-size="10" font-family="Cinzel,serif">two marks,</text><text x="0" y="14" fill="#fff" font-size="10" font-family="Cinzel,serif">carved by two hands</text><text x="0" y="28" fill="#fff" font-size="10" font-family="Cinzel,serif">facing each other</text>`;
    s += `<circle cx="8" cy="52" r="6" fill="none" stroke="#fff"/><text x="20" y="56" fill="#fff" font-size="9" font-family="Cinzel,serif">west half · upright</text>`;
    s += `<circle cx="8" cy="72" r="6" fill="none" stroke="${V}"/><text x="20" y="76" fill="#fff" font-size="9" font-family="Cinzel,serif">east half · turned</text>`;
    s += `<text x="0" y="104" fill="${V}" font-size="9" font-family="Cinzel,serif">the west mark is at 1;</text><text x="0" y="116" fill="${V}" font-size="9" font-family="Cinzel,serif">the east mark is at 8.</text></g>`;
    s += `<text x="180" y="232" text-anchor="middle" fill="#fff" font-size="9" font-family="Cinzel,serif" opacity=".7">the floor-ring, as it was cut</text></svg>`;
    return s;
  };

  /* Seer: the under-layer of the bell-chamber, with shadows. */
  const underChamber = () => {
    let s = `<svg viewBox="0 0 360 240"><rect width="360" height="240" fill="#000"/>`;
    s += `<g stroke="#fff" fill="none" stroke-width="1.2"><rect x="10" y="10" width="340" height="220"/>`;
    s += `<path d="M10,60 L60,30 L300,30 L350,60" stroke-dasharray="3 3"/>`; // the shaft above
    s += `<ellipse cx="180" cy="150" rx="120" ry="52"/>`; // the floor ring
    for (let i = 0; i < 8; i++) { const a = (i / 8 * 360 - 90) * Math.PI / 180; s += `<circle cx="${(180 + Math.cos(a) * 120).toFixed(1)}" cy="${(150 + Math.sin(a) * 52).toFixed(1)}" r="6"/>`; }
    s += `<rect x="20" y="70" width="70" height="18"/><rect x="270" y="70" width="70" height="18"/>`; // the two walls
    s += `<path d="M180,60 L180,20" stroke-dasharray="2 4"/></g>`;
    s += `<text x="55" y="66" text-anchor="middle" fill="#fff" font-size="8" font-family="Cinzel,serif">west wall</text><text x="305" y="66" text-anchor="middle" fill="#fff" font-size="8" font-family="Cinzel,serif">east wall</text>`;
    s += `<path d="M14,79 L20,76 L20,82 Z" fill="${V}"/><path d="M346,79 L340,76 L340,82 Z" fill="${V}"/>`;
    s += `<text x="180" y="18" text-anchor="middle" fill="#fff" font-size="8" font-family="Cinzel,serif" opacity=".8">the Hearth, far above: a spark</text>`;
    // the spark at centre
    s += `<circle cx="180" cy="150" r="4" fill="#fff"/><circle cx="180" cy="150" r="9" fill="none" stroke="#fff" opacity=".5"/>`;
    // the four: shadows away from the spark; Wren's toward it
    const four = [[120, 205, 'Bookmoth'], [150, 212, 'Hush'], [210, 212, 'Owl'], [240, 205, 'Knot']];
    s += `<g fill="#fff">${four.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}<circle cx="180" cy="110" r="5" fill="${V}"/></g>`;
    s += `<g stroke="#fff" stroke-width="3" opacity=".55" stroke-linecap="round">${four.map(([x, y]) => { const dx = x - 180, dy = y - 150, n = Math.hypot(dx, dy); return `<path d="M${x},${y} L${(x + dx / n * 22).toFixed(1)},${(y + dy / n * 22).toFixed(1)}"/>`; }).join('')}</g>`;
    s += `<g stroke="${V}" stroke-width="3" opacity=".9" stroke-linecap="round"><path d="M180,110 L180,138"/></g>`;
    s += `<g fill="#fff" font-size="8" font-family="Cinzel,serif">${four.map(([x, y, n]) => `<text x="${x}" y="${y + 16}" text-anchor="middle">${n}</text>`).join('')}<text x="180" y="100" text-anchor="middle" fill="${V}">Wren</text></g>`;
    // Vane, Tarn and guards at the edge; Marrow near the spark
    s += `<g fill="#fff" opacity=".7"><circle cx="40" cy="120" r="4"/><circle cx="52" cy="128" r="3"/><circle cx="60" cy="118" r="3"/><circle cx="68" cy="130" r="3"/><circle cx="330" cy="130" r="4"/></g>`;
    s += `<g stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"><path d="M40,120 L22,116"/><path d="M52,128 L36,130"/><path d="M60,118 L44,112"/><path d="M68,130 L52,136"/><path d="M330,130 L348,128"/></g>`;
    s += `<g fill="#fff" font-size="8" font-family="Cinzel,serif" opacity=".8"><text x="40" y="108" text-anchor="middle">Vane</text><text x="62" y="146" text-anchor="middle">Tarn's guards</text><text x="330" y="146" text-anchor="middle">Marrow</text></g>`;
    s += `<text x="180" y="236" text-anchor="middle" fill="#fff" font-size="8" font-family="Cinzel,serif" opacity=".7">shadows, as they fall — four away from the spark, one toward it</text></svg>`;
    return s;
  };

  /* SPEAK: the finale token. Two questions when four values exist; one otherwise. */
  const finaleBlock = (ctx) => {
    const values = L.finaleValues(ctx.flags);
    if (!values) return { t: 'fine', text: 'Nothing to speak. The Envoy has stood down and no Walk was read from the stone. The fire will not ask.' };
    const channel = L.channel('finale', ctx.roleId);
    const WALKQ = 'When the sigil closes, do you walk into the fire, or stay?';
    const VANEQ = 'Vane\'s word, to you alone: *bring the boy to my door and you live a Master.*';
    if (values.length === 2 && values[0] === 'WALK') return { t: 'choice', id: 'finale', prompt: WALKQ, options: [{ id: 'WALK', text: 'WALK' }, { id: 'STAY', text: 'STAY' }], after: 'Sealed. Nobody at the table knows which. Say the word to the Hearth when it asks; never the answer.' };
    if (values.length === 2) return { t: 'choice', id: 'finale', prompt: VANEQ, options: [{ id: 'ACCEPT', text: 'ACCEPT' }, { id: 'REFUSE', text: 'REFUSE' }], after: 'Sealed. Whatever you chose, the Hearth will say it aloud only if it binds you.' };
    return { t: 'custom', render: (el, cx) => {
      const key = 'ch7:finale';
      const draw = () => {
        UI.clear(el);
        const chosen = cx.state.answers[key];
        const w = UI.el('div', { class: 'blk-choice' });
        if (chosen) {
          const [walk, barg] = chosen.split('_');
          w.appendChild(UI.el('p', { html: UI.rich(WALKQ) }));
          w.appendChild(UI.el('div', { class: 'opts' }, [UI.el('button', { class: 'btn opt chosen', text: walk, disabled: 'true' })]));
          w.appendChild(UI.el('p', { html: UI.rich(VANEQ) }));
          w.appendChild(UI.el('div', { class: 'opts' }, [UI.el('button', { class: 'btn opt chosen', text: barg, disabled: 'true' })]));
          w.appendChild(UI.el('div', { class: 'blk-code sea' }, [UI.el('div', { class: 'label', text: 'Your sealed word — type it into the Hearth when it asks' }), UI.el('div', { class: 'word', text: Shared.token(channel, chosen, values) })]));
          w.appendChild(UI.el('p', { class: 'fine', text: 'One word answers both. Nobody at the table knows either half. Say the word to the Hearth; never the answers.' }));
          el.appendChild(w); return;
        }
        let walk = null, barg = null;
        const mk = (prompt, ids, set) => { w.appendChild(UI.el('p', { html: UI.rich(prompt) })); const o = UI.el('div', { class: 'opts' }); ids.forEach(id => o.appendChild(UI.el('button', { class: 'btn opt', text: id, onclick: () => { set(id); Array.from(o.children).forEach(b => b.classList.toggle('chosen', b.textContent === id)); seal.disabled = !(walk && barg); cx.audio.sfx('click'); } }))); w.appendChild(o); };
        mk(WALKQ, ['WALK', 'STAY'], (id) => { walk = id; });
        mk(VANEQ, ['ACCEPT', 'REFUSE'], (id) => { barg = id; });
        const seal = UI.el('button', { class: 'btn primary big-btn', text: 'Seal both', disabled: 'true', onclick: () => { if (!walk || !barg) return; if (!confirm('Seal these answers? They cannot be unsaid.')) return; cx.state.answers[key] = walk + '_' + barg; cx.save(); cx.audio.sfx('seal'); draw(); } });
        w.appendChild(seal);
        w.appendChild(UI.el('p', { class: 'fine', text: 'Two questions, one sealed word. Choose both, then seal.' }));
        el.appendChild(w);
      };
      draw();
    } };
  };

  C.chapters.push({
    id: 'ch7',
    pages: (roleId, ctx) => {
      const P = { sight: [], wren: [], speak: [] };
      const f = ctx.flags || {};
      const ally = !!f.VANE_ALLY, knot = !!f.OATH_KNOT, walkOn = !!f.WALK_UNLOCKED, cracked = f.BELLS_CRACKED | 0;

      /* ---------- SPEAK ---------- */
      P.speak.push({ t: 'h', text: 'The last sealed word' });
      P.speak.push({ t: 'fine', text: 'When the Hearth announces two minutes, answer here. *Say what you see. Never show your phone.*' });
      P.speak.push(finaleBlock(ctx));
      if (ally) P.speak.push({ t: 'fine', text: 'The Envoy has stood down. There is no bargain on this page, only the fire.' });

      /* ---------- WREN: Vane's last offer, to you alone ---------- */
      P.wren.push({ t: 'h', text: 'To you alone' });
      if (ally) {
        P.wren.push({ t: 'p', text: 'Vane looks at the wall for a long time. When he looks back at you, there is nothing in his face that wants anything from you.' });
        P.wren.push({ t: 'letter', text: '"Twenty-two years. I told them. Nobody scraped the paint." He does not make you an offer. He holds the stair.' });
      } else {
        P.wren.push({ t: 'p', text: 'While the others read, the Envoy is somehow beside you, not close, courteous, certain.' });
        P.wren.push({ t: 'letter', text: `"${ctx.name ? ctx.name + '. ' : ''}To you alone, and I will not say it twice. Bring the boy to my door before the fire is out and you live a Master — a Chair of your own House, a seal, a name. The others need never know who opened the door. He lives. That is the one thing I can promise and she cannot."` });
        P.wren.push({ t: 'p', text: { reader: 'He knows you can read what is on the door of your dormitory now. He does not mention it. That is the offer, really: a library, and time.', listener: 'He waits while you listen for his heart. It is fast. He knows you can hear it, and lets you.', seer: 'He glances, once, at the way the child\'s shadow falls, and then at you, and says nothing about it. He has known for twenty-two years what you have known since the dormitory.', binder: 'Two threads on him: red, to the child; gold, to the capital. He is pulled both ways, and knows it, and asks you anyway.' }[roleId] });
        P.wren.push({ t: 'fine', text: 'The SPEAK page asks what you do with this. The Hearth will say your name aloud only if you accept.' });
      }
      if (walkOn) P.wren.push({ t: 'whisper', text: { reader: 'You will not be able to read tomorrow. Not the door, not the lexicon, not whatever Wren leaves you. Decide whether that is a price or a gift.', listener: 'If you walk, the house goes quiet. You have never heard a quiet house. You do not know if you would like it.', seer: 'If you walk, every shadow will fall the ordinary way, forever, and you will be the only one who remembers that once they did not.', binder: 'If you walk, you will never see another thread. You will have to ask people what they feel, like everyone else does.' }[roleId] });

      /* ---------- SIGHT ---------- */
      if (roleId === 'reader') {
        P.sight.push({ t: 'h', text: 'Two walls' });
        P.sight.push({ t: 'p', text: 'Clean on your page. Where the Hearth shows a shield, you see the carving. Two inscriptions in two halves, one on each wall. Which is upright and which is turned is Under-Sight — Owl\'s — not yours.' });
        P.sight.push({ t: 'p', text: '**West wall**, shapes left to right: Spike, Hook, Hook-inverted, Crown-inverted.' });
        P.sight.push({ t: 'html', html: wall(WEST, 'left', false) });
        P.sight.push({ t: 'table', head: ['If the west wall is…', 'it reads'], rows: [['upright (mark on the left)', row(['THORN', 'KNOT', 'VEIL', 'EMBER']) + ' — <em>go through · together · behind · keep</em>'], ['turned (mark on the right)', row(['CROWN', 'KNOT', 'VEIL', 'WELL']) + ' — <em>one · together · behind · down</em>']] });
        P.sight.push({ t: 'p', text: '**East wall**, shapes left to right: Flame, Crown-inverted, Spike, Flame-inverted.' });
        P.sight.push({ t: 'html', html: wall(EAST, 'right', false) });
        P.sight.push({ t: 'table', head: ['If the east wall is…', 'it reads'], rows: [['upright (mark on the left)', row(['ASH', 'EMBER', 'THORN', 'COLD']) + ' — <em>fire · keep · go through · cold</em>'], ['turned (mark on the right)', row(['ASH', 'WELL', 'CROWN', 'COLD']) + ' — <em>fire · down · one · cold</em>']] });
        P.sight.push({ t: 'h', text: 'Law 8, carved on the rim' });
        P.sight.push({ t: 'html', html: `<div class="laws">${law(8, 'F', 0, 'A Great Sigil names every glyph once.')}</div>` });
        P.sight.push({ t: 'p', text: 'Eight slots; eight glyphs in the Tongue. If one reading of a wall names a glyph the other wall already has, that reading is wrong. There is only one pair of readings in which every glyph appears once.' });
        P.sight.push({ t: 'fine', text: 'The lexicon and the older alphabet are in your **Book**. The word cut into the empty socket is in the older alphabet; you will know it when you see it.' });
      }
      if (roleId === 'listener') {
        P.sight.push({ t: 'h', text: 'The Founders\' Hymn, whole' });
        P.sight.push({ t: 'p', text: 'Every room tonight sang a piece of it. This is all of it: seven steps and the rest. The rest is where COLD sits — the eighth glyph, the one that is never written.' });
        P.sight.push({ t: 'audio', label: 'The Hymn, eight glyphs in wall order', strip: CA.strip([1, 3, -2, -3, 4, 2, 'rest']), play: (A) => CA.playSteps(A, [1, 3, -2, -3, 4, 2, 'rest']), text: '**Up one, up three, down two, down three, up four, up two, then the rest.** Over the eight glyphs only one order climbs like that — the Ladder is in your Book. The first four are the west wall in order; the last four are the east wall in order; the rest is last.' });
        P.sight.push({ t: 'fine', text: 'Use the row-player in your **Book** to test any order Bookmoth reads against this contour, by ear or by the arrows.' });
        P.sight.push({ t: 'h', text: 'The Binding count' });
        P.sight.push({ t: 'p', text: 'The Hearth gives no count. You do. Say it aloud, and the others move on your word.' });
        P.sight.push({ t: 'list', items: ['**To sound:** "one — two — three — FOUR." Everyone presses on **four**. All four notes within one heartbeat.', '**Hold.** Say nothing while the fire climbs (about six seconds; eight if a key is bound). The Hearth chimes when it has climbed.', '**To release:** "one — two — three — OFF." Everyone presses again on **off**. Within half a second of each other.', cracked ? `**${cracked} cracked bell${cracked > 1 ? 's' : ''}:** ${cracked > 1 ? 'those lanes have' : 'that lane has'} no light on the Hearth. They press on your count and nothing else.` : '**No bells cracked.** Every lane has its light; call the count anyway.'] });
        P.sight.push({ t: 'audio', label: 'Practise the count (60 to the minute)', strip: '<div class="arrow-strip"><span class="step"><b>1</b>one</span><span class="step"><b>2</b>two</span><span class="step"><b>3</b>three</span><span class="step"><b>●</b>FOUR / OFF</span></div>', play: (A) => CA.heartbeat(A, 60, 4), text: 'Four beats, a second apart. Say the count on the beats.' });
        P.sight.push({ t: 'h', text: 'Heartbeats in the chamber' });
        P.sight.push({ t: 'html', html: `<div class="heartbeats">${[['Bookmoth', 'fast'], ['Hush', 'fast'], ['Owl', 'fast'], ['Knot', 'fast'], ['Provost Marrow', 'normal'], ['Lord Vane', 'fast'], ['Master Tarn', 'normal'], ['the guards', 'normal']].map(([n, k]) => `<div class="hb"><span>${n}</span>${D.trace(k)}</div>`).join('')}<div class="hb"><span>Wren</span>${D.trace('flat')}</div></div>` });
        P.sight.push({ t: 'fine', text: 'Wren: too quiet to catch. You stopped calling it a fault in the laundry.' });
      }
      if (roleId === 'seer') {
        P.sight.push({ t: 'h', text: 'Two marks' });
        P.sight.push({ t: 'p', text: 'The floor-ring has **two** marks, carved by two hands facing each other. The **west wall\'s** mark is at **slot 1**; the **east wall\'s** mark is at **slot 8**. The east half of the ring — slots 5 to 8 — is **turned**. Sunwise is clockwise.' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: twoMarks() });
        P.sight.push({ t: 'h', text: 'The walls' });
        P.sight.push({ t: 'p', text: 'West wall: mark on the **left** — upright, read left to right. East wall: mark on the **right** — carved turned. Bookmoth has both readings of each; the Binder\'s Laws say where a turned line goes.' });
        P.sight.push({ t: 'html', html: `<div class="underlayer" style="padding:8px;border-radius:8px"><div style="color:#fff;font-family:Cinzel,serif;font-size:11px;text-align:center">west — mark left</div>${wall(WEST, 'left', true)}<div style="color:#fff;font-family:Cinzel,serif;font-size:11px;text-align:center;margin-top:8px">east — mark right</div>${wall(EAST, 'right', true)}</div>` });
        P.sight.push({ t: 'h', text: 'Under the bell-chamber' });
        P.sight.push({ t: 'svg', cls: 'underlayer', svg: underChamber() });
        P.sight.push({ t: 'fine', text: 'The empty socket is not empty. Something is cut in its floor, in the older alphabet, that Bookmoth can read. You do not need to say so yet.' });
      }
      if (roleId === 'binder') {
        P.sight.push({ t: 'h', text: 'Every Law at once' });
        P.sight.push({ t: 'p', text: 'Seven Laws bear on this ring, and one that was struck. Reconcile them aloud; Law 3 says how.' });
        P.sight.push({ t: 'html', html: `<div class="laws">${[
          law(1, 'F', 0, 'A sigil is read sunwise from the mark.', { note: 'The west wall: sunwise from its mark at slot 1 — slots 1, 2, 3, 4.' }),
          law(5, 'F', 0, 'A turned inscription is placed widdershins from its mark.', { note: 'The east wall is turned: widdershins from <em>its</em> mark at slot 8 — slots 8, 7, 6, 5.' }),
          law(11, 'O', 212, 'Every inscription is placed sunwise from the mark.', { note: 'Disagrees with Law 5. Law 3: the older binds.' }),
          law(3, 'F', 0, 'Where two Laws disagree, the older binds.'),
          law(8, 'F', 0, 'A Great Sigil names every glyph once.', { note: 'Carved on the rim. Eight slots, eight glyphs; no glyph twice.' }),
          law(6, 'O', 212, 'COLD is never written; where an inscription shows it, leave the slot empty.', { note: walkOn ? 'Younger than Law 0. Where they disagree, the older binds: COLD is <em>written</em> — by four hands. The ring accepts either the empty slot or COLD.' : 'The slot where COLD falls stays empty.' }),
          law(0, 'F', 0, 'COLD is written by four hands.', walkOn ? { tag: 'RESTORED', note: 'Struck by the Convocation in 212 — the same year, the same hand as Law 6. Restored tonight, on the stone.' } : { tag: 'STRUCK', struck: true, note: 'Struck by the Convocation, 212. See Law 6.' }),
          law(7, 'F', 0, 'Idony\'s Law: a sigil sworn under KNOT begins at the sworn-to. Build the ring by the Laws, then turn it sunwise until the sworn-to\'s glyph sits at the first mark.', { note: knot ? '<strong>You swore under KNOT.</strong> The oath was sworn to the Chair. The Chair\'s mark is <strong>CROWN</strong> (the Vigil seat list; the seal on the scroll). Build the ring, then turn the whole ring sunwise until CROWN sits at slot 1 — every glyph moves the same number of slots.' : 'You did not swear under KNOT. The ring begins where the marks put it and does not turn.' }),
        ].join('')}</div>` });
        P.sight.push({ t: 'h', text: 'Threads in the chamber' });
        P.sight.push({ t: 'list', items: [
          '**Vane:** two threads. Red — an oath, old, to the child. Gold — to the capital. He is pulled both ways and stands still.' + (ally ? ' Tonight the gold one went slack.' : ''),
          '**Master Tarn:** gold, bright, and only gold.',
          '**Marrow — Wren:** grey. The colour of someone who has already said goodbye. It has been grey since before the Vigil.',
          '**Bookmoth, Hush, Owl, Knot:** four red threads to one place. Not to Wren. To each other.',
          '**Wren:** *No thread found.* Not unbound; the knot itself.',
        ] });
        P.sight.push({ t: 'fine', text: 'The full Book of Laws, by year, is in your **Book**.' });
      }
      return P;
    },
  });
})();
