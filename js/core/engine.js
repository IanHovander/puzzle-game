/* Scene runner for the Hearth (main screen). Data-driven: chapters -> scenes. */
(function () {
  'use strict';
  const UI = window.VigilUI, Store = window.VigilStore, Audio = window.VigilAudio, FX = window.VigilFX, Input = window.VigilInput;
  const Game = { chapters: [], scenes: {}, sceneChapter: {}, puzzles: {}, hooks: {} };
  let dom = {};
  let currentArt = null, currentScene = null, hintCtl = null, cancelToken = 0;

  /* ---------- Registration ---------- */
  Game.addChapter = function (ch) {
    Game.chapters.push(ch);
    for (const id in ch.scenes) { const s = ch.scenes[id]; s.id = id; Game.scenes[id] = s; Game.sceneChapter[id] = ch.id; }
  };
  Game.registerPuzzle = function (type, fn) { Game.puzzles[type] = fn; };
  Game.chapter = (id) => Game.chapters.find(c => c.id === id);
  Game.currentChapter = () => Game.chapter(Game.sceneChapter[currentScene && currentScene.id]);

  /* ---------- Boot ---------- */
  Game.mount = function (ids) {
    dom = {};
    for (const k in ids) dom[k] = document.getElementById(ids[k]);
    FX.mount(dom.fx);
    dom.hint.addEventListener('click', () => Game.showHint());
    const muteLabel = () => { const m = Audio.isMuted(); dom.mute.textContent = m ? '🔇 Muted' : '🔊 Sound'; dom.mute.title = m ? 'Sound is off' : 'Sound is on'; };
    dom.mute.addEventListener('click', () => { Audio.init(); Audio.toggleMute(); muteLabel(); });
    muteLabel();
    dom.menu.addEventListener('click', () => Game.showMenu());
    setInterval(() => { dom.timer.textContent = Store.elapsedText(); }, 500);
    document.addEventListener('keydown', (e) => { if (e.key === ' ' && !e.target.matches('input,textarea,button')) { UI.requestSkip(); } });
    dom.text.addEventListener('click', () => UI.requestSkip());
    document.addEventListener('pointerdown', () => Audio.init(), { once: true });
    document.addEventListener('keydown', () => Audio.init(), { once: true });
  };

  Game.begin = function (firstScene) {
    Store.startTimer();
    Game.go(firstScene);
  };
  Game.resume = function () {
    Store.startTimer();
    const s = Store.state.scene;
    if (s && Game.scenes[s]) Game.go(s); else Game.go(Game.chapters[0].start);
  };

  /* ---------- Presentation ---------- */
  function setArt(name, params) {
    const key = name + JSON.stringify(params || {});
    if (key === currentArt) return;
    currentArt = key;
    const Art = window.VigilArt;
    const html = Art && Art.render ? Art.render(name, params || {}) : '';
    const next = UI.el('div', { class: 'art-layer', html });
    dom.stage.appendChild(next);
    requestAnimationFrame(() => next.classList.add('in'));
    const olds = Array.from(dom.stage.querySelectorAll('.art-layer')).filter(x => x !== next);
    olds.forEach(o => { o.classList.add('out'); setTimeout(() => o.remove(), 1400); });
    if (Art && Art.animate) Art.animate(name, next, params || {});
  }
  function setChapterLabel(ch) {
    dom.chapter.textContent = ch ? (ch.label || ch.title) : '';
    document.body.dataset.chapter = ch ? ch.id : '';
  }
  Game.setArt = setArt;
  /* Persistent countdown shown in the top bar (the Finale's midnight). */
  Game.clock = (function () {
    let el = null, endAt = 0, iv = null, onZero = null, running = false;
    function ensure() { if (!el) { el = UI.el('span', { id: 'midnight', class: 'hidden' }); dom.timer.parentNode.insertBefore(el, dom.timer); } return el; }
    function render() { const left = Math.max(0, endAt - Date.now()); const s = Math.ceil(left / 1000); el.textContent = 'MIDNIGHT ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); el.classList.toggle('urgent', s <= 60); Store.state.flags.MIDNIGHT_LEFT = s; if (left <= 0 && running) { running = false; clearInterval(iv); iv = null; Audio.sfx('boom'); if (onZero) onZero(); } }
    return {
      start: (seconds, cb) => { ensure(); endAt = Date.now() + seconds * 1000; onZero = cb; running = true; el.classList.remove('hidden'); if (iv) clearInterval(iv); iv = setInterval(render, 250); render(); },
      resume: (cb) => { const s = Store.state.flags.MIDNIGHT_LEFT; if (s > 0) Game.clock.start(s, cb); },
      penalty: (seconds) => { if (!running) return; endAt -= seconds * 1000; render(); UI.toast('Midnight comes ' + seconds + ' seconds closer.', 2200, 'bad'); },
      bonus: (seconds) => { if (!running) return; endAt += seconds * 1000; render(); },
      stop: () => { running = false; if (iv) clearInterval(iv); iv = null; if (el) el.classList.add('hidden'); },
      left: () => Math.max(0, Math.ceil((endAt - Date.now()) / 1000)),
      running: () => running,
    };
  })();
  Game.flame = function (level) { const f = document.querySelector('#flame .flame-bar > div'); if (f) f.style.width = Math.round(Math.max(0, Math.min(1, level)) * 100) + '%'; Store.set('FLAME', level); };

  /* ---------- Scene execution ---------- */
  Game.go = async function (id) {
    const scene = typeof id === 'function' ? Game.scenes[id(Store.state)] : Game.scenes[id];
    if (!scene) { console.error('No scene', id); return; }
    const myToken = ++cancelToken;
    if (hintCtl) { hintCtl = null; }
    Input.deactivate();
    currentScene = scene;
    const ch = Game.chapter(Game.sceneChapter[scene.id]);
    Store.visit(scene.id, ch.id);
    setChapterLabel(ch);
    if (scene.mood || ch.mood) Audio.mood(scene.mood || ch.mood);
    if (scene.fx !== undefined || ch.fx !== undefined) FX.set(scene.fx !== undefined ? scene.fx : ch.fx, scene.fxIntensity);
    setArt(scene.art || ch.art || 'blank', typeof scene.artParams === 'function' ? scene.artParams(Store.state) : scene.artParams);
    if (scene.flame != null || ch.flame != null) Game.flame(scene.flame != null ? scene.flame : ch.flame);
    if (scene.enter) { try { scene.enter(Store.state); } catch (e) { console.error(e); } }
    if (scene.sfx) Audio.sfx(scene.sfx);
    dom.hint.classList.toggle('hidden', !(scene.type === 'puzzle' || scene.hints));
    dom.hint.classList.remove('attention');

    UI.clear(dom.text); UI.clear(dom.actions); UI.clear(dom.widget);
    dom.widget.classList.toggle('hidden', scene.type !== 'puzzle' && scene.type !== 'custom' && scene.type !== 'reaction' && scene.type !== 'token');
    dom.text.classList.toggle('narrow', !!(scene.type === 'puzzle' || scene.type === 'custom' || scene.type === 'reaction'));

    const text = typeof scene.text === 'function' ? scene.text(Store.state) : (scene.text || []);
    if (scene.title) dom.text.appendChild(UI.el('h2', { class: 'scene-title', text: scene.title }));
    await UI.typewrite(dom.text, text, { speed: scene.speed });
    if (myToken !== cancelToken) return;

    const api = makeApi(scene, ch, myToken);
    switch (scene.type || 'story') {
      case 'story': return runStory(scene, api);
      case 'choice': return runChoice(scene, api);
      case 'puzzle': return runPuzzle(scene, api);
      case 'reaction': return runPuzzle(scene, api);
      case 'code': return runCode(scene, api, ch);
      case 'token': return runToken(scene, api);
      case 'flow': return runFlow(scene, api, ch);
      case 'custom': return runCustom(scene, api);
      case 'end': return runEnd(scene, api);
    }
  };

  function makeApi(scene, ch, token) {
    return {
      scene, chapter: ch, state: Store.state, store: Store, ui: UI, audio: Audio, fx: FX, input: Input,
      text: dom.text, actions: dom.actions, widget: dom.widget,
      alive: () => token === cancelToken,
      go: (id) => { if (token === cancelToken) Game.go(resolveNext(id, scene)); },
      button: (label, fn, cls) => { const b = UI.el('button', { class: 'btn ' + (cls || ''), text: label, onclick: () => { Audio.sfx('click'); fn(); } }); dom.actions.appendChild(b); return b; },
      note: (t) => Store.note(t),
      say: async (paragraphs) => { await UI.typewrite(dom.text, paragraphs, {}); },
      setHints: (ladder) => { hintCtl = { ladder, id: scene.id }; dom.hint.classList.remove('hidden'); },
      flashArt: (n, p) => setArt(n, p),
    };
  }
  function resolveNext(next, scene) {
    if (next == null) next = scene.next;
    if (typeof next === 'function') next = next(Store.state);
    return next;
  }

  function runStory(scene, api) {
    if (scene.auto) { setTimeout(() => api.go(scene.next), scene.auto); return; }
    api.button(scene.button || 'Continue', () => api.go(scene.next), 'primary');
  }

  async function runChoice(scene, api) {
    const opts = (typeof scene.options === 'function' ? scene.options(Store.state) : scene.options).filter(o => !o.if || o.if(Store.state));
    let ctl = null;
    const holder = UI.el('div', { class: 'choices' });
    if (scene.prompt) dom.actions.appendChild(UI.el('div', { class: 'prompt', html: UI.rich(scene.prompt) }));
    dom.actions.appendChild(holder);
    const pick = (o, how) => {
      if (!api.alive()) return;
      if (ctl) ctl.cancel();
      Array.from(holder.children).forEach(b => b.disabled = true);
      if (scene.choice) Store.choose(scene.choice, o.id);
      if (o.set) for (const k in o.set) Store.set(k, typeof o.set[k] === 'function' ? o.set[k](Store.state) : o.set[k]);
      if (o.note) Store.note(typeof o.note === 'function' ? o.note(Store.state) : o.note);
      if (o.sfx) Audio.sfx(o.sfx);
      Store.save();
      if (o.after) { UI.clear(holder); UI.typewrite(dom.text, typeof o.after === 'function' ? o.after(Store.state) : o.after).then(() => api.button('Continue', () => api.go(o.next), 'primary')); }
      else api.go(o.next);
    };
    opts.forEach((o, i) => {
      const b = UI.el('button', { class: 'btn choice' + (o.cls ? ' ' + o.cls : ''), html: `<span class="choice-num">${i + 1}</span><span>${UI.rich(typeof o.text === 'function' ? o.text(Store.state) : o.text)}</span>`, onclick: () => { Audio.sfx('click'); pick(o, 'click'); } });
      if (o.sub) b.appendChild(UI.el('span', { class: 'choice-sub', html: UI.rich(o.sub) }));
      holder.appendChild(b);
    });
    if (scene.timer) {
      const tw = UI.el('div', { class: 'timer-note', html: UI.rich(scene.timerText || '*Decide quickly.*') });
      dom.actions.insertBefore(tw, holder);
      ctl = UI.countdown(dom.actions, scene.timer);
      const r = await ctl.promise;
      if (r === 'timeout' && api.alive()) {
        Audio.sfx('fail');
        const to = scene.timeout || opts[opts.length - 1];
        const o = typeof to === 'string' ? opts.find(x => x.id === to) || { id: to, next: to } : to;
        if (scene.choice) Store.choose(scene.choice, o.id === undefined ? 'timeout' : o.id);
        Store.set(scene.choice + '_timedout', true);
        pick(Object.assign({}, o, { id: o.id }), 'timeout');
      }
    }
  }

  async function runPuzzle(scene, api) {
    const fn = Game.puzzles[scene.puzzle];
    if (!fn) { dom.widget.appendChild(UI.el('p', { text: 'Missing puzzle: ' + scene.puzzle })); api.button('Skip', () => api.go(scene.next)); return; }
    const cfg = typeof scene.config === 'function' ? scene.config(Store.state) : (scene.config || {});
    if (scene.hints) api.setHints(scene.hints);
    dom.widget.appendChild(UI.el('div', { class: 'widget-inner' }));
    const box = dom.widget.firstChild;
    const pid = scene.puzzleId || scene.id;
    if (Store.isSolved(pid) && !scene.replayable) {
      box.appendChild(UI.el('p', { class: 'para', text: 'This ward has already been opened.' }));
      api.button('Continue', () => api.go(scene.next), 'primary'); return;
    }
    let result;
    const parTimers = [];
    if (scene.par) { const mins = Array.isArray(scene.par) ? scene.par : [scene.par]; mins.forEach((m, i) => parTimers.push(setTimeout(() => { if (!api.alive()) return; dom.hint.classList.add('attention'); UI.toast(i === 0 ? 'The fire stirs. It has something to whisper, if you ask.' : 'The fire dims a little. Ask it.', 3200); Audio.sfx('chime'); }, m * 60000))); }
    try { result = await fn(box, cfg, api); } catch (e) { console.error(e); result = { error: e }; }
    parTimers.forEach(clearTimeout);
    if (!api.alive()) return;
    Store.markSolved(pid);
    if (scene.onSolve) scene.onSolve(Store.state, result);
    if (result && result.set) for (const k in result.set) Store.set(k, result.set[k]);
    Store.save();
    if (scene.solvedText) {
      if (scene.clearWidget) { UI.clear(dom.widget); dom.widget.classList.add('hidden'); dom.text.classList.remove('narrow'); }
      await UI.typewrite(dom.text, typeof scene.solvedText === 'function' ? scene.solvedText(Store.state, result) : scene.solvedText);
      if (!api.alive()) return;
    }
    const next = typeof scene.next === 'function' ? scene.next(Store.state, result) : scene.next;
    if (scene.autoNext) api.go(next); else api.button(scene.button || 'Continue', () => api.go(next), 'primary');
  }

  function runCode(scene, api, ch) {
    const code = scene.code || ch.code;
    let cast = null;
    if (scene.cast) cast = typeof scene.cast === 'function' ? scene.cast(Store.state) : scene.cast;
    else if (!scene.code && window.VigilLore && window.VigilLore.chapter(ch.id) && window.VigilLore.chapter(ch.id).cast.length) {
      const spec = window.VigilLore.chapter(ch.id).cast; cast = window.VigilShared.cast(code, window.VigilShared.pack(spec, Store.state.flags));
    }
    if (cast) Store.state.flags['CAST_' + code] = cast;
    const box = UI.el('div', { class: 'attune' }, [
      UI.el('div', { class: 'attune-label', text: scene.codeLabel || (cast ? 'Word of attunement, and the mark beside it — on every phone' : 'Word of attunement — enter it on every phone') }),
      UI.el('div', { class: 'attune-word', html: UI.esc(code) + (cast ? `<span class="attune-cast">·${UI.esc(cast)}</span>` : '') }),
      UI.el('div', { class: 'attune-sub', html: UI.rich(scene.codeSub || 'Type this word into every phone. Each of you gets a different page — read yours, and only yours. Say nothing until all four of you have looked up.') }),
    ]);
    if (scene.roles) box.appendChild(UI.el('div', { class: 'attune-roles', html: UI.rich(typeof scene.roles === 'function' ? scene.roles(Store.state) : scene.roles) }));
    dom.actions.appendChild(box);
    Audio.sfx('unlock');
    if (scene.sightSeconds) { const c = UI.countdown(box, scene.sightSeconds); c.promise.then(() => {}); }
    api.button(scene.button || 'All phones are ready', () => api.go(scene.next), 'primary');
  }

  /* Token entry: scene.slots = [{label, player}] ; scene.decode(token, slotIndex, state) => value|null ; scene.onTokens(values, state) */
  function runToken(scene, api) {
    const slots = typeof scene.slots === 'function' ? scene.slots(Store.state) : scene.slots;
    const box = UI.el('div', { class: 'token-entry' });
    const inputs = [];
    slots.forEach((s, i) => {
      const row = UI.el('div', { class: 'token-row' + (s.player != null ? ' p' + s.player : '') });
      row.appendChild(UI.el('label', { text: s.label }));
      const inp = UI.el('input', { class: 'field token', maxlength: s.length || 6, autocomplete: 'off', spellcheck: 'false', placeholder: '· · · ·' });
      inp.addEventListener('input', () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); inp.classList.remove('wrong'); if (inp.value.length >= (s.length || 6) && inputs[i + 1]) inputs[i + 1].focus(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
      row.appendChild(inp); box.appendChild(row); inputs.push(inp);
    });
    dom.widget.appendChild(box);
    if (scene.prompt) dom.actions.appendChild(UI.el('div', { class: 'prompt', html: UI.rich(scene.prompt) }));
    setTimeout(() => inputs[0] && inputs[0].focus(), 50);
    let tries = 0;
    const submit = () => {
      const values = []; let bad = false;
      inputs.forEach((inp, i) => {
        const v = scene.decode(inp.value.trim().toUpperCase(), i, Store.state);
        if (v == null) { bad = true; inp.classList.add('wrong'); } else values.push(v);
      });
      if (bad) { tries++; Audio.sfx('wrong'); UI.toast(scene.badText || 'One of the words is not attuned. Check the phones and try again.', 2400, 'bad'); if (tries >= 3 && scene.stuckText) setTimeout(() => UI.toast(scene.stuckText, Math.max(5000, scene.stuckText.split(' ').length * 320)), 2500); return; }
      Audio.sfx('success');
      Store.state.tokens[scene.id] = values; Store.save();
      if (scene.onTokens) scene.onTokens(values, Store.state);
      Store.save();
      UI.clear(dom.actions);
      const next = typeof scene.next === 'function' ? scene.next(Store.state, values) : scene.next;
      api.go(next);
    };
    api.button(scene.button || 'Speak the words', submit, 'primary');
  }

  function runFlow(scene, api, ch) {
    const flow = scene.flow || ch.flow;
    if (flow) {
      const done = new Set(Store.state.visited);
      // allow nodes to declare a predicate
      flow.nodes.forEach(n => { if (n.when && n.when(Store.state)) done.add(n.id); });
      const wrap = UI.el('div', { class: 'flow-panel' });
      wrap.appendChild(UI.el('h3', { class: 'flow-title', text: (scene.flowTitle || (ch.title + ' — the paths you walked')) }));
      wrap.appendChild(UI.flowchart(flow, done));
      const stats = typeof scene.stats === 'function' ? scene.stats(Store.state) : null;
      if (stats) wrap.appendChild(UI.el('div', { class: 'flow-stats', html: UI.rich(stats) }));
      dom.actions.appendChild(wrap);
    }
    api.button(scene.button || 'Onward', () => api.go(scene.next), 'primary');
  }

  async function runCustom(scene, api) {
    const box = UI.el('div', { class: 'widget-inner' }); dom.widget.appendChild(box);
    let next;
    try { next = await scene.run(box, api); } catch (e) { console.error(e); }
    if (!api.alive()) return;
    if (next === false) return; // scene handled navigation itself
    api.go(next || scene.next);
  }

  function runEnd(scene, api) {
    Store.pauseTimer();
    if (scene.render) scene.render(dom.actions, api);
    api.button(scene.button || 'Begin again', () => { Store.reset(); location.reload(); }, 'ghost');
  }

  /* ---------- Hints ---------- */
  Game.showHint = function () {
    const scene = currentScene; if (!scene) return;
    const ladder = (hintCtl && hintCtl.id === scene.id ? hintCtl.ladder : null) || scene.hints;
    if (!ladder) return;
    const id = scene.puzzleId || scene.id;
    const used = Store.state.hintsUsed[id] || 0;
    const wrap = UI.el('div', { class: 'hints' });
    const list = UI.el('div', { class: 'hint-list' });
    const render = () => {
      UI.clear(list);
      const n = Store.state.hintsUsed[id] || 0;
      ladder.forEach((h, i) => {
        const text = typeof h === 'function' ? h(Store.state) : h;
        if (i < n) list.appendChild(UI.el('div', { class: 'hint revealed' + (i === ladder.length - 1 ? ' solution' : ''), html: `<span class="hint-n">${i === ladder.length - 1 ? 'Answer' : 'Hint ' + (i + 1)}</span>${UI.rich(text)}` }));
        else if (i === n) list.appendChild(UI.el('button', { class: 'btn hint-btn' + (i === ladder.length - 1 ? ' danger' : ''), text: i === ladder.length - 1 ? 'Reveal the answer (last resort)' : 'Ask the Vigil for a hint (' + (i + 1) + ' of ' + (ladder.length - 1) + ')', onclick: () => { Store.state.hintsUsed[id] = i + 1; Store.inc('hintsTotal'); Store.save(); Audio.sfx('chime'); render(); } }));
      });
    };
    render();
    wrap.appendChild(UI.el('p', { class: 'small', text: 'Hints cost nothing but pride. The Vigil keeps count.' }));
    wrap.appendChild(list);
    UI.modal(wrap, { title: 'The Vigil whispers', closeText: 'Back to the ward' });
    void used;
  };

  /* ---------- Menu ---------- */
  Game.showMenu = function () {
    const box = UI.el('div', {});
    box.appendChild(UI.el('p', { html: `Elapsed: <strong>${Store.elapsedText()}</strong> · Hints used: <strong>${Store.get('hintsTotal', 0)}</strong>` }));
    const names = Store.state.names.map((n, i) => `<span class="pname p${i}">${UI.esc(n || 'Player ' + (i + 1))}</span> <span class="small">(${Input.keyLabel(i)})</span>`).join(' &nbsp; ');
    box.appendChild(UI.el('p', { html: names }));
    const row = UI.el('div', { class: 'row' });
    row.appendChild(UI.el('button', { class: 'btn small', text: 'Companion QR', onclick: () => { m.close(); Game.showQR(); } }));
    row.appendChild(UI.el('button', { class: 'btn small', text: 'Replay scene', onclick: () => { m.close(); Game.go(currentScene.id); } }));
    row.appendChild(UI.el('button', { class: 'btn small', text: 'Chapter select', onclick: () => { m.close(); Game.showChapterSelect(); } }));
    row.appendChild(UI.el('button', { class: 'btn small danger', text: 'Abandon game', onclick: async () => { if (await UI.confirm('Erase this playthrough and start over?', { danger: true, ok: 'Erase it' })) { Store.reset(); location.reload(); } } }));
    box.appendChild(row);
    const row2 = UI.el('div', { class: 'row' });
    row2.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Copy save code', onclick: () => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(Store.state)))); const ta = UI.el('textarea', { class: 'field plain', style: { height: '90px', fontSize: '12px', letterSpacing: '0', textTransform: 'none' } }); ta.value = code; box.appendChild(UI.el('p', { class: 'small', text: 'Paste this into another laptop\'s menu to continue there (elapsed time carries over).' })); box.appendChild(ta); ta.select(); try { navigator.clipboard.writeText(code); UI.toast('Save code copied.'); } catch (e) {} } }));
    row2.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Paste save code', onclick: async () => { const v = await UI.ask('Paste the save code:', '', { plain: true, ok: 'Load', maxlength: 100000 }); if (!v) return; try { const st = JSON.parse(decodeURIComponent(escape(atob(v.trim())))); if (!st || st.version !== 1) throw new Error('bad'); Store.state = Object.assign(Store.state, st); Store.save(); location.reload(); } catch (e) { UI.notice('That code is not a Hearthfall save.'); } } }));
    box.appendChild(row2);
    const m = UI.modal(box, { title: 'The Hearth' });
  };
  Game.showChapterSelect = function () {
    const box = UI.el('div', { class: 'chapter-list' });
    Game.chapters.forEach(ch => {
      if (ch.hidden) return;
      const reached = Store.state.visited.includes(ch.start);
      box.appendChild(UI.el('button', { class: 'btn small' + (reached ? '' : ' ghost'), text: ch.label ? ch.label + ' — ' + ch.title : ch.title, onclick: () => { m.close(); Game.go(ch.start); } }));
    });
    box.appendChild(UI.el('p', { class: 'small', text: 'Jumping ahead skips story and may leave choices unset. Use to recover from a mistake.' }));
    const m = UI.modal(box, { title: 'Chapters' });
  };
  Game.showQR = function () {
    const url = Game.companionUrl();
    const box = UI.el('div', { class: 'qr-box' });
    if (url) {
      try { const q = qrcode(0, 'M'); q.addData(url); q.make(); box.appendChild(UI.el('div', { class: 'qr', html: q.createSvgTag({ cellSize: 6, margin: 2 }) })); } catch (e) {}
      box.appendChild(UI.el('p', { class: 'qr-url', text: url }));
    } else {
      box.appendChild(UI.el('p', { html: 'This page was opened from a file, so phones cannot reach it. Host the folder (for example <code>python3 -m http.server 8080</code>) and open <code>http://YOUR-LAN-IP:8080/</code> on this screen and <code>.../companion.html</code> on phones. GitHub Pages also works.' }));
    }
    UI.modal(box, { title: 'Companion — open on each phone' });
  };
  Game.companionUrl = function () {
    if (window.COMPANION_URL) return window.COMPANION_URL;
    if (location.protocol === 'file:') return null;
    return new URL('companion.html', location.href).href;
  };

  window.Game = Game;
})();
