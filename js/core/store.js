/* Game state, save/resume, elapsed timer, flowchart log. */
(function () {
  'use strict';
  const KEY = 'hearthfall.save.v1';
  const Store = {};
  const listeners = [];

  function fresh() {
    return {
      version: 1,
      scene: null,            // current scene id
      chapter: null,          // current chapter id
      flags: {},              // arbitrary key -> value
      choices: {},            // choiceId -> optionId
      tokens: {},             // tokenSlot -> decoded value
      visited: [],            // scene ids in order (for flowchart)
      hintsUsed: {},          // puzzleId -> level reached
      solved: {},             // puzzleId -> true
      names: ['Reader', 'Listener', 'Seer', 'Binder'], // seat names, left to right
      keys: ['A', 'C', 'M', '/'],
      elapsedMs: 0,           // accumulated play time (excluding pauses)
      startedAt: null,        // wall-clock of first start
      lastTick: null,
      log: [],                // notable events for epilogue
    };
  }

  Store.state = fresh();

  Store.load = function () {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      if (!s || s.version !== 1) return false;
      Store.state = Object.assign(fresh(), s);
      return true;
    } catch (e) { return false; }
  };
  Store.hasSave = function () { try { return !!localStorage.getItem(KEY); } catch (e) { return false; } };
  Store.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(Store.state)); } catch (e) {}
    listeners.forEach(f => { try { f(Store.state); } catch (e) {} });
  };
  Store.reset = function () { Store.state = fresh(); try { localStorage.removeItem(KEY); } catch (e) {} };
  Store.onChange = (f) => listeners.push(f);

  Store.set = function (k, v) { Store.state.flags[k] = v; Store.save(); };
  Store.get = function (k, d) { const v = Store.state.flags[k]; return v === undefined ? d : v; };
  Store.inc = function (k, by) { Store.state.flags[k] = (Store.state.flags[k] || 0) + (by == null ? 1 : by); Store.save(); return Store.state.flags[k]; };
  Store.choose = function (id, opt) { Store.state.choices[id] = opt; Store.save(); };
  Store.chose = function (id, opt) { return opt === undefined ? Store.state.choices[id] : Store.state.choices[id] === opt; };
  Store.markSolved = function (id) { Store.state.solved[id] = true; Store.save(); };
  Store.isSolved = (id) => !!Store.state.solved[id];
  Store.note = function (text) { Store.state.log.push(text); Store.save(); };
  Store.visit = function (sceneId, chapterId) {
    Store.state.scene = sceneId; if (chapterId) Store.state.chapter = chapterId;
    if (Store.state.visited[Store.state.visited.length - 1] !== sceneId) Store.state.visited.push(sceneId);
    Store.save();
  };

  /* ---------- Timer ---------- */
  let ticking = false, tickHandle = null;
  Store.startTimer = function () {
    if (!Store.state.startedAt) Store.state.startedAt = Date.now();
    Store.state.lastTick = Date.now(); ticking = true;
    if (!tickHandle) tickHandle = setInterval(() => {
      if (!ticking || document.hidden) { Store.state.lastTick = Date.now(); return; }
      /* Clamped to one tick. The document.hidden guard above catches a backgrounded tab, but a CLOSED
         LID does not set document.hidden -- the interval simply stops, and the first tick after wake
         added the whole suspension in one go. A table that stops at Chapter VI and comes back next
         Saturday without closing the tab was credited the entire week, and ch8 prints this number as
         the last thing the game says about the night. */
      const now = Date.now(); Store.state.elapsedMs += Math.min(now - Store.state.lastTick, 2000); Store.state.lastTick = now;
      if (Math.floor(Store.state.elapsedMs / 1000) % 15 === 0) Store.save();
    }, 1000);
  };
  Store.pauseTimer = function () { ticking = false; Store.save(); };
  Store.resumeTimer = function () { Store.state.lastTick = Date.now(); ticking = true; };
  Store.elapsed = function () { return Store.state.elapsedMs; };
  Store.elapsedText = function () {
    const s = Math.floor(Store.state.elapsedMs / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  };

  window.VigilStore = Store;
})();
