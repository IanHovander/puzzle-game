/* Companion (phone) app: role + first name, attunement word + cast, four tabs (SIGHT / WREN / SPEAK / BOOK),
   private choices -> tokens, timed mini-tasks. Content comes from window.CompanionContent (see docs/CONVENTIONS.md). */
(function () {
  'use strict';
  const UI = window.VigilUI, Shared = window.VigilShared, Audio = window.VigilAudio, Lore = window.VigilLore;
  const C = window.CompanionContent;
  document.body.classList.add('companion'); document.body.classList.remove('hearth');
  document.documentElement.classList.add('companion-page'); // the scroll rules for browsers without :has()
  const KEY = 'vigil.companion.v2';
  const fresh = () => ({ role: null, name: '', unlocked: {}, mini: {}, answers: {}, notes: {}, done: {}, tab: 'sight', current: null });
  let st = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) st = Object.assign(fresh(), JSON.parse(raw)); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const main = document.getElementById('cmain'), roleEl = document.getElementById('crole');
  document.addEventListener('pointerdown', () => { try { Audio.init(); } catch (e) {} }, { once: true });
  document.getElementById('cmenu').addEventListener('click', menu);

  /* Answers, task results and notes belong to the player in the seat, not to the phone: changing seat parks the
     current seat's private state under st.seats and restores the new seat's (chapter unlocks stay: the Hearth's
     words are the same for everyone). Otherwise a second player on this phone would see, and be unable to change,
     the first one's sealed answers. */
  function switchRole(id) {
    if (st.role === id) return;
    st.seats = st.seats || {};
    if (st.role) st.seats[st.role] = { answers: st.answers, done: st.done, notes: st.notes };
    const s = (id && st.seats[id]) || {};
    st.answers = s.answers || {}; st.done = s.done || {}; st.notes = s.notes || {};
    st.role = id;
  }
  const qs = new URLSearchParams(location.search);
  if (qs.get('role') && Lore.roleById(qs.get('role'))) { switchRole(qs.get('role')); save(); }

  const role = () => Lore.roleById(st.role);
  function setHeader() { const r = role(); roleEl.textContent = r ? r.nick : ''; roleEl.className = 'crole' + (r ? ' p' + r.idx : ''); }
  const chapterOrder = () => Lore.chapters.map(c => c.id);
  const maxUnlockedN = () => Math.max(-1, ...Object.keys(st.unlocked).map(id => Lore.chapter(id).n));

  /* ctx handed to content functions */
  function ctx(chId) {
    const u = st.unlocked[chId] || {};
    return { role: role(), roleId: st.role, name: st.name, flags: u.flags || {}, cast: u.cast || null, state: st, save,
      unlocked: (id) => !!st.unlocked[id], mini: (w) => !!st.mini[chId + ':' + Shared.norm(w)], maxChapter: maxUnlockedN(),
      answer: (chapterId, choiceId) => st.answers[chapterId + ':' + choiceId], ui: UI, audio: Audio, shared: Shared, glyphs: window.VigilGlyphs, lore: Lore };
  }

  /* ---------- Screens ---------- */
  function showRoles() {
    setHeader(); UI.clear(main);
    const p = UI.el('div', { class: 'cpanel' });
    p.appendChild(UI.el('h2', { text: 'Choose your Sighting' }));
    p.appendChild(UI.el('p', { class: 'fine', html: UI.rich(C.roleIntro || 'Sit left to right: Reader, Listener, Seer, Binder. Pick the seat you are in. What appears here is for your eyes — share it by talking.') }));
    const grid = UI.el('div', { class: 'role-grid' });
    Lore.roles.forEach((r, i) => {
      grid.appendChild(UI.el('button', { class: 'role-card p' + i, onclick: () => { switchRole(r.id); save(); Audio.sfx('chime'); showName(); } }, [
        UI.el('span', { class: 'rname', text: r.name }), UI.el('span', { class: 'rgift', text: r.gift + ' · ' + r.what }),
      ]));
    });
    p.appendChild(grid); main.appendChild(p);
  }

  function showName() {
    setHeader(); UI.clear(main);
    const r = role();
    const p = UI.el('div', { class: 'cpanel' });
    p.appendChild(UI.el('h2', { text: r.nick }));
    p.appendChild(UI.el('p', { html: UI.rich(r.blurb) }));
    p.appendChild(UI.el('p', { class: 'fine', text: 'Your first name, for the Companion alone. The Hearth will never ask for it. It is used once, at the end.' }));
    const inp = UI.el('input', { class: 'field plain', placeholder: 'first name', maxlength: 16, value: st.name || '', autocomplete: 'given-name' });
    p.appendChild(inp);
    p.appendChild(UI.el('div', { class: 'row' }, [UI.el('button', { class: 'btn primary', text: 'Keep it', onclick: () => { st.name = inp.value.trim(); save(); showHome(); } })]));
    main.appendChild(p);
  }

  function showHome() {
    setHeader(); UI.clear(main);
    const r = role();
    // Who you are, first thing on the page: the rest of the night hangs off it.
    const who = UI.el('div', { class: 'cpanel who p' + r.idx });
    who.appendChild(UI.el('h2', { text: r.nick }));
    who.appendChild(UI.el('p', { class: 'fine', html: UI.rich(r.blurb) }));
    who.appendChild(UI.el('p', { class: 'fine rule', html: '<em>' + UI.esc(Lore.houseRule) + '</em>' }));
    main.appendChild(who);

    const u = UI.el('div', { class: 'cpanel' });
    u.appendChild(UI.el('h2', { text: 'Word of attunement' }));
    u.appendChild(UI.el('p', { class: 'fine', text: 'When the Hearth shows a word, enter it here. If a mark stands beside the word, enter the mark too.' }));
    const row = UI.el('div', { class: 'unlock' });
    const inp = UI.el('input', { class: 'field', placeholder: 'WORD', maxlength: 12, autocomplete: 'off', autocapitalize: 'characters' });
    const mark = UI.el('input', { class: 'field mark', placeholder: 'MARK', maxlength: 3, autocomplete: 'off', autocapitalize: 'characters' });
    const go = () => {
      const w = Shared.norm(inp.value), m = Shared.norm(mark.value);
      // mini-words
      for (const ch of C.chapters) { const mw = ch.miniWords || {}; for (const k in mw) if (Shared.norm(k) === w) { if (!st.unlocked[ch.id]) { fail('That word is for a page you have not turned yet.'); return; } st.mini[ch.id + ':' + Shared.norm(k)] = true; save(); Audio.sfx('unlock'); st.tab = mw[k] || 'speak'; showChapter(ch.id); return; } }
      const lc = Lore.chapters.find(c => Shared.norm(c.word) === w);
      if (!lc) { fail('The fire does not know that word.'); return; }
      let flags = {}, castStr = null;
      if (lc.cast.length) {
        if (!m) { fail('This word has a mark beside it on the Hearth. Enter it too.'); return; }
        const data = Shared.uncast(lc.word, m);
        if (data == null) { fail('The mark is not right. Look again at the Hearth.'); return; }
        flags = Shared.unpack(lc.cast, data); castStr = m;
      }
      const prev = st.unlocked[lc.id];
      if (prev && (prev.cast || null) !== (castStr || null)) {
        // The same page turned again with a different mark: the Hearth's night has changed (a retry), so this
        // chapter's sealed answers and finished tasks are stale — the option sets and tokens may differ now.
        // Seats parked on this phone are cleared as well; they never turn the page themselves.
        const wipe = (o) => o && Object.keys(o).forEach(k => { if (k.startsWith(lc.id + ':')) delete o[k]; });
        [st.answers, st.done].forEach(wipe);
        Object.values(st.seats || {}).forEach(s => { wipe(s.answers); wipe(s.done); });
        UI.toast('A new mark: this page\'s answers begin again.', 2600);
      }
      st.unlocked[lc.id] = { cast: castStr, flags }; st.current = lc.id; st.tab = 'sight'; save(); Audio.sfx('unlock'); showChapter(lc.id);
    };
    const fail = (msg) => { inp.classList.add('wrong'); setTimeout(() => inp.classList.remove('wrong'), 500); Audio.sfx('wrong'); UI.toast(msg, 2600, 'bad'); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { if (inp.value && !mark.value) mark.focus(); else go(); } });
    mark.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    row.appendChild(inp); row.appendChild(mark); row.appendChild(UI.el('button', { class: 'btn', text: 'Turn', onclick: go }));
    u.appendChild(row); main.appendChild(u);

    const l = UI.el('div', { class: 'cpanel' });
    l.appendChild(UI.el('h2', { text: 'Your pages' }));
    const list = UI.el('div', { class: 'chap-list' });
    Lore.chapters.forEach(lc => {
      const open = !!st.unlocked[lc.id];
      const b = UI.el('button', { class: 'btn chap-btn' + (open ? '' : ' locked'), onclick: () => { if (open) showChapter(lc.id); else { inp.focus(); UI.toast('Enter the word the Hearth shows.'); } } });
      b.appendChild(UI.el('span', { text: open ? `${lc.label} — ${lc.title}` : lc.label }));
      b.appendChild(UI.el('span', { class: 'lock', text: open ? 'open' : 'sealed' }));
      list.appendChild(b);
    });
    l.appendChild(list); main.appendChild(l);
  }

  const TABS = [['sight', 'Sight'], ['wren', 'Wren'], ['speak', 'Speak'], ['book', 'Book']];
  function showChapter(id, tab) {
    setHeader(); UI.clear(main); window.scrollTo(0, 0);
    const lc = Lore.chapter(id); const ch = C.chapters.find(c => c.id === id); const r = role();
    if (tab) st.tab = tab; st.current = id; save();
    const back = UI.el('div', { class: 'back-row' }, [UI.el('button', { class: 'btn small ghost', text: '‹ Pages', onclick: showHome }), UI.el('span', { class: 'tag', text: lc.label })]);
    main.appendChild(back);
    const tabs = UI.el('div', { class: 'ctabs' });
    TABS.forEach(([k, label]) => tabs.appendChild(UI.el('button', { class: 'ctab' + (st.tab === k ? ' on' : ''), text: label, onclick: () => { st.tab = k; save(); showChapter(id); } })));
    main.appendChild(tabs);
    const p = UI.el('div', { class: 'cpanel' });
    p.appendChild(UI.el('h2', { text: lc.title }));
    const cx = ctx(id);
    let blocks = [];
    try {
      if (st.tab === 'book') blocks = (C.book ? C.book(st.role, cx) : []);
      else if (ch) { const pages = typeof ch.pages === 'function' ? ch.pages(st.role, cx) : ch.pages; blocks = (pages && pages[st.tab]) || []; }
      if (typeof blocks === 'function') blocks = blocks(cx);
    } catch (e) { console.error(e); blocks = [{ t: 'p', text: 'This page is smudged. Reload the Companion.' }]; }
    if (!blocks.length) blocks = [{ t: 'fine', text: st.tab === 'speak' ? 'Nothing to speak yet. The Hearth will tell you when.' : st.tab === 'wren' ? 'Nothing here yet.' : 'Nothing here.' }];
    renderBlocks(blocks, p, ch || { id }, cx);
    if (st.tab === 'sight') p.appendChild(UI.el('p', { class: 'fine end-mark', text: '— end of your Sight for this chapter —' }));
    main.appendChild(p);
  }

  /* ---------- Blocks ---------- */
  function renderBlocks(blocks, into, ch, cx) {
    for (const b0 of blocks) {
      const b = typeof b0 === 'function' ? b0(cx) : b0;
      if (!b) continue;
      if (b.if && !b.if(cx)) continue;
      const t = b.t || 'p';
      switch (t) {
        case 'h': into.appendChild(UI.el('h3', { text: b.text })); break;
        case 'p': into.appendChild(UI.el('p', { html: UI.rich(b.text) })); break;
        case 'fine': into.appendChild(UI.el('p', { class: 'fine', html: UI.rich(b.text) })); break;
        case 'letter': into.appendChild(UI.el('div', { class: 'blk-letter', html: UI.rich(b.text) })); break;
        case 'whisper': into.appendChild(UI.el('p', { class: 'blk-whisper', html: UI.rich(b.text) })); break;
        case 'omen': into.appendChild(UI.el('p', { class: 'blk-omen', html: UI.rich(b.text) })); break;
        case 'html': into.appendChild(UI.el('div', { html: b.html })); break;
        case 'svg': into.appendChild(UI.el('div', { class: 'blk-svg' + (b.cls ? ' ' + b.cls : ''), html: typeof b.svg === 'function' ? b.svg(cx) : b.svg })); break;
        case 'table': {
          const tb = UI.el('table', { class: 'blk-table' });
          if (b.head) tb.appendChild(UI.el('tr', {}, b.head.map(h => UI.el('th', { html: h }))));
          b.rows.forEach(row => tb.appendChild(UI.el('tr', {}, row.map(c => UI.el('td', { html: typeof c === 'string' && !c.startsWith('<') ? UI.rich(c) : c })))));
          into.appendChild(tb); break;
        }
        case 'list': into.appendChild(UI.el('ul', { class: 'blk-list' }, b.items.map(i => UI.el('li', { html: UI.rich(i) })))); break;
        case 'glyphs': into.appendChild(UI.el('div', { class: 'blk-glyphs' }, b.items.map(g => UI.el('div', { class: 'g' }, [UI.el('div', { html: g.svg }), UI.el('span', { html: UI.rich(g.label || '') })])))); break;
        case 'key': into.appendChild(UI.el('div', { class: 'blk-key' }, b.items.map(g => UI.el('div', { class: 'k' }, [UI.el('div', { html: g.svg }), UI.el('b', { text: g.label })])))); break;
        case 'code': into.appendChild(UI.el('div', { class: 'blk-code ' + (b.cls || '') }, [UI.el('div', { class: 'label', text: b.label || 'Token' }), UI.el('div', { class: 'word', text: typeof b.text === 'function' ? b.text(cx) : b.text })])); break;
        case 'divider': into.appendChild(UI.el('div', { class: 'blk-divider' })); break;
        case 'audio': {
          // b.play(audioApi) starts sound; b.strip = html for the arrow/waveform strip
          const w = UI.el('div', { class: 'blk-audio' });
          if (b.label) w.appendChild(UI.el('div', { class: 'label', text: b.label }));
          if (b.strip) w.appendChild(UI.el('div', { class: 'strip', html: typeof b.strip === 'function' ? b.strip(cx) : b.strip }));
          const btn = UI.audioButton(b.button || 'Cup your ear', () => {
            Audio.init(); if (Audio.isMuted()) Audio.setMuted(false);
            const ms = b.play(Audio, cx);
            const len = typeof ms === 'number' && isFinite(ms) ? ms : 2200;
            UI.lightStrip(w.querySelector('.strip'), len);
            return len;
          });
          w.appendChild(btn);
          if (b.text) w.appendChild(UI.el('p', { class: 'fine', html: UI.rich(b.text) }));
          w.appendChild(UI.el('p', { class: 'fine nohear', text: 'No sound? Set the phone to ring, not silent, turn the volume up, and press again. Everything you would hear is also written on this page.' }));
          into.appendChild(w); break;
        }
        case 'reveal': {
          const w = UI.el('div', { class: 'blk-reveal' });
          const inner = UI.el('div', { class: 'inner hidden' });
          const btn = UI.el('button', { class: 'btn', text: b.label || 'Reveal', onclick: () => { btn.remove(); inner.classList.remove('hidden'); Audio.sfx('chime'); } });
          w.appendChild(btn); renderBlocks(b.blocks, inner, ch, cx); w.appendChild(inner); into.appendChild(w); break;
        }
        case 'secret': {
          const w = UI.el('div', { class: 'blk-secret' });
          w.appendChild(UI.el('div', { class: 'label', text: b.label || 'For your eyes only — hold to read' }));
          const content = UI.el('div', { class: 'content' }); renderBlocks(b.blocks, content, ch, cx);
          const hb = UI.el('button', { class: 'btn hold-btn', text: 'Hold to read' });
          const open = () => w.classList.add('open'); const close = () => w.classList.remove('open');
          hb.addEventListener('pointerdown', e => { e.preventDefault(); open(); }); hb.addEventListener('pointerup', close); hb.addEventListener('pointerleave', close); hb.addEventListener('pointercancel', close);
          w.appendChild(hb); w.appendChild(content); into.appendChild(w); break;
        }
        case 'choice': {
          // Private choice -> opaque token. channel must match the Hearth's decode channel.
          const w = UI.el('div', { class: 'blk-choice' });
          if (b.prompt) w.appendChild(UI.el('p', { html: UI.rich(b.prompt) }));
          const opts = UI.el('div', { class: 'opts' });
          const key = ch.id + ':' + b.id;
          const values = b.options.map(o => o.id);
          // A stored answer that is not one of this page's options is stale (another seat's, or an older mark's): unanswered.
          let chosen = values.includes(st.answers[key]) ? st.answers[key] : undefined;
          if (chosen === undefined && st.answers[key] !== undefined) { delete st.answers[key]; save(); } // a stale answer is no answer, to content too
          const channel = b.channel || Lore.channel(b.id, st.role);
          const showToken = (optId) => {
            const tok = Shared.token(channel, optId, values);
            w.appendChild(UI.el('div', { class: 'blk-code sea' }, [UI.el('div', { class: 'label', text: b.tokenLabel || 'Your sealed word — type it into the Hearth when it asks' }), UI.el('div', { class: 'word', text: tok })]));
            const after = b.after ? (typeof b.after === 'function' ? b.after(optId, cx) : b.after) : '';
            if (after) w.appendChild(UI.el('p', { class: 'fine after', html: UI.rich(after) }));
          };
          b.options.forEach(o => {
            const btn = UI.el('button', { class: 'btn opt' + (chosen === o.id ? ' chosen' : ''), html: UI.rich(o.text), onclick: async () => {
              if (chosen !== undefined && !b.changeable) return;
              if (!b.changeable && !(await UI.confirm('Seal this answer? It cannot be unsaid.', { ok: 'Seal it', cancel: 'Not yet' }))) return;
              chosen = o.id; st.answers[key] = o.id; save(); Audio.sfx('seal');
              Array.from(opts.children).forEach(x => { x.classList.toggle('chosen', x === btn); x.disabled = !b.changeable; });
              w.querySelectorAll('.blk-code, .fine.after').forEach(x => x.remove()); showToken(o.id);
            } });
            if (chosen !== undefined && !b.changeable) btn.disabled = true;
            opts.appendChild(btn);
          });
          w.appendChild(opts); if (chosen !== undefined) showToken(chosen); into.appendChild(w); break;
        }
        case 'task': {
          const w = UI.el('div', { class: 'blk-task' });
          if (b.title) w.appendChild(UI.el('div', { class: 'task-title', text: b.title }));
          const key = ch.id + ':' + b.id;
          const box = UI.el('div', {}); w.appendChild(box);
          const api = Object.assign({}, cx, { box, done: (result) => { st.done[key] = result; save(); UI.clear(box); if (b.onDone) renderBlocks(b.onDone(result, cx), box, ch, cx); }, result: () => st.done[key] });
          if (st.done[key] !== undefined && !b.replayable) { if (b.onDone) renderBlocks(b.onDone(st.done[key], cx), box, ch, cx); }
          else { try { b.run(box, api); } catch (e) { console.error(e); box.textContent = 'This page is smudged. Reload.'; } }
          into.appendChild(w); break;
        }
        case 'note': {
          const w = UI.el('div', { class: 'blk-note' });
          const key = ch.id + ':' + (b.id || 'note');
          const ta = UI.el('textarea', { placeholder: b.placeholder || 'Scribble here…' }); ta.value = st.notes[key] || '';
          ta.addEventListener('input', () => { st.notes[key] = ta.value; save(); });
          w.appendChild(ta); into.appendChild(w); break;
        }
        case 'custom': { const w = UI.el('div', {}); try { b.render(w, cx); } catch (e) { console.error(e); } into.appendChild(w); break; }
        default: into.appendChild(UI.el('p', { html: UI.rich(b.text || '') }));
      }
    }
  }

  function menu() {
    const box = UI.el('div', {});
    box.appendChild(UI.el('p', { html: `You are <strong>${role() ? role().nick : 'unassigned'}</strong>${st.name ? ' (' + UI.esc(st.name) + ')' : ''}.` }));
    const row = UI.el('div', { class: 'row' });
    row.appendChild(UI.el('button', { class: 'btn small', text: 'Change seat / name', onclick: () => { m.close(); showRoles(); } }));
    row.appendChild(UI.el('button', { class: 'btn small', text: Audio.isMuted() ? 'Unmute' : 'Mute', onclick: () => { Audio.init(); Audio.toggleMute(); m.close(); } }));
    row.appendChild(UI.el('button', { class: 'btn small danger', text: 'Forget everything', onclick: async () => { if (await UI.confirm('Erase this phone\'s pages and choices?', { danger: true, ok: 'Erase' })) { st = fresh(); save(); m.close(); showRoles(); } } }));
    box.appendChild(row);
    const m = UI.modal(box, { title: 'Companion' });
  }

  if (st.role && role()) { if (st.current && st.unlocked[st.current]) showChapter(st.current); else showHome(); } else showRoles();
  window.Companion = { showChapter, showHome, state: () => st, ctx };
})();
