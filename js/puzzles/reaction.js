/* Four-lane reaction sequence ("the Stair"): orbs fall down each player's lane; press your key when the orb crosses the line.
   Prompt types: single (one lane), brace (two lanes together), all (all four), mimic (do NOT press).
   cfg: { events:[{t:ms, lanes:[i..], kind:'single'|'brace'|'all'|'mimic'}], fallMs, windowMs, practice:bool, laneNames:[..], target: number (0..1 pass ratio), onEnd(score) }
   Returns { hits, misses, total, ratio, passed } */
(function () {
  'use strict';
  const UI = window.VigilUI, Input = window.VigilInput, Audio = window.VigilAudio;

  function build(cfg) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'react' });
      const hud = UI.el('div', { class: 'react-hud' }, [UI.el('span', { text: cfg.practice ? 'PRACTICE — nothing is at stake' : (cfg.title || 'HOLD THE LINE') }), UI.el('span', { class: 'react-score', text: '' })]);
      const meter = UI.el('div', { class: 'react-meter' }, [UI.el('div', { style: { width: '100%' } })]);
      const lanesEl = UI.el('div', { class: 'lanes' });
      const big = UI.el('div', { class: 'react-big' });
      const lanes = [];
      for (let i = 0; i < 4; i++) {
        const l = UI.el('div', { class: 'lane lane-' + i }, [
          UI.el('div', { class: 'lane-name', text: (cfg.laneNames && cfg.laneNames[i]) || (window.VigilStore.state.names[i] || 'Player ' + (i + 1)) }),
          UI.el('div', { class: 'hitline' }), UI.el('div', { class: 'keycap', text: Input.keyLabel(i) }),
        ]);
        lanesEl.appendChild(l); lanes.push(l);
      }
      const wrap = UI.el('div', { style: { position: 'relative' } }, [lanesEl, big]);
      root.appendChild(hud); root.appendChild(meter); root.appendChild(wrap);
      const pads = UI.el('div', {}); root.appendChild(pads);
      cfg.container.appendChild(root);

      const fall = cfg.fallMs || 1800, win = cfg.windowMs || 380, braceWin = cfg.braceWindowMs || 350;
      const events = cfg.events.map(e => Object.assign({ done: false, pressed: {}, orbs: [] }, e));
      const total = events.filter(e => e.kind !== 'mimic').length + events.filter(e => e.kind === 'mimic').length;
      let hits = 0, misses = 0, health = 1, started = false, t0 = 0, raf = null, finished = false;
      const scoreEl = hud.lastChild, meterFill = meter.firstChild;

      function laneH() { return lanes[0].clientHeight; }
      function hitY() { return laneH() - 58; }

      function spawn(e) {
        e.lanes.forEach(li => {
          const o = UI.el('div', { class: 'orb ' + (e.kind === 'mimic' ? 'mimic' : e.kind === 'brace' ? 'brace' : e.kind === 'all' ? 'all' : '') });
          o.style.top = '-50px'; lanes[li].appendChild(o); e.orbs.push({ el: o, lane: li });
        });
        if (e.kind === 'brace' || e.kind === 'all') {
          // draw a chain across lanes visually via a full-width bar element in wrap
          const bar = UI.el('div', { class: 'orb-chain', style: { position: 'absolute', height: '4px', background: e.kind === 'all' ? 'rgba(155,123,216,0.6)' : 'rgba(255,200,150,0.6)', left: (Math.min(...e.lanes) / 4 * 100 + 12.5) + '%', width: ((Math.max(...e.lanes) - Math.min(...e.lanes)) / 4 * 100) + '%', top: '-50px', zIndex: 2 } });
          wrap.appendChild(bar); e.chain = bar;
        }
        e.spawned = true;
      }
      function judge(e, ok) {
        e.done = true;
        e.lanes.forEach(li => { lanes[li].classList.add(ok ? 'good' : 'bad'); setTimeout(() => lanes[li].classList.remove('good', 'bad'), 260); });
        e.orbs.forEach(o => o.el.remove()); if (e.chain) e.chain.remove();
        if (ok) { hits++; Audio.sfx('key', e.lanes[0]); if (e.kind === 'all') Audio.sfx('success'); }
        else { misses++; Audio.sfx('miss'); if (!cfg.practice) { health = Math.max(0, health - (cfg.damage || 0.12)); window.VigilFX.shake(lanesEl, 300); } }
        if (cfg.practice) { flashBig(ok ? '✓' : '✗', ok ? 'var(--moss)' : '#ff8b8b'); }
        meterFill.style.width = (health * 100) + '%';
        scoreEl.textContent = `${hits} / ${total}`;
      }
      function flashBig(txt, color) { big.textContent = txt; big.style.color = color || ''; big.style.opacity = '1'; setTimeout(() => { big.style.transition = 'opacity .4s'; big.style.opacity = '0'; setTimeout(() => { big.style.transition = ''; }, 400); }, 250); }

      function onPress(idx) {
        if (!started || finished) return;
        const now = performance.now() - t0;
        // find the nearest live event involving this lane whose orb is near the line
        let best = null, bestD = Infinity;
        for (const e of events) {
          if (e.done || !e.spawned) continue;
          if (!e.lanes.includes(idx)) continue;
          const d = Math.abs(now - e.t);
          if (d < bestD) { best = e; bestD = d; }
        }
        if (!best || bestD > win) {
          // stray press: penalize lightly only outside practice
          lanes[idx].classList.add('bad'); setTimeout(() => lanes[idx].classList.remove('bad'), 200);
          if (!cfg.practice && !cfg.lenient) { health = Math.max(0, health - 0.04); meterFill.style.width = (health * 100) + '%'; Audio.sfx('miss'); }
          return;
        }
        if (best.kind === 'mimic') { judge(best, false); return; }
        best.pressed[idx] = now;
        if (best.kind === 'single') { judge(best, true); return; }
        // brace/all: need all lanes within braceWin of each other
        const times = best.lanes.map(l => best.pressed[l]).filter(x => x != null);
        lanes[idx].classList.add('flash'); setTimeout(() => lanes[idx].classList.remove('flash'), 150);
        if (times.length === best.lanes.length) {
          const spread = Math.max(...times) - Math.min(...times);
          judge(best, spread <= braceWin);
        }
      }

      function frame() {
        if (finished) return;
        raf = requestAnimationFrame(frame);
        const now = performance.now() - t0; const hy = hitY();
        for (const e of events) {
          if (e.done) continue;
          if (!e.spawned && now >= e.t - fall) spawn(e);
          if (e.spawned) {
            const y = hy - (e.t - now) / fall * (hy + 50);
            e.orbs.forEach(o => { o.el.style.top = (y - 23) + 'px'; });
            if (e.chain) e.chain.style.top = (y - 2) + 'px';
            if (now > e.t + win) {
              if (e.kind === 'mimic') judge(e, true);        // correctly ignored
              else if (e.kind === 'brace' || e.kind === 'all') {
                const n = Object.keys(e.pressed).length;
                judge(e, false); void n;
              } else judge(e, false);
            }
          }
        }
        if (events.every(e => e.done)) finish();
        if (!cfg.practice && health <= 0 && !cfg.noFail) finish(true);
      }
      function finish(collapsed) {
        if (finished) return; finished = true; cancelAnimationFrame(raf); Input.deactivate();
        const ratio = total ? hits / total : 1;
        const passed = collapsed ? false : ratio >= (cfg.target == null ? 0.6 : cfg.target);
        setTimeout(() => resolve({ hits, misses, total, ratio, passed, collapsed: !!collapsed, health }), 500);
      }

      // countdown then start
      Input.activate(pads, onPress);
      let n = 3;
      flashBig(String(n));
      const iv = setInterval(() => {
        n--; if (n > 0) { flashBig(String(n)); Audio.sfx('tick'); }
        else { clearInterval(iv); flashBig(cfg.practice ? 'PRACTICE' : 'GO'); Audio.sfx('open'); started = true; t0 = performance.now(); raf = requestAnimationFrame(frame); }
      }, 900);
    });
  }

  /* Deterministic event generator: kinds pattern over duration. seed-based for reproducibility. */
  function generateEvents(opts) {
    const r = (function (s) { return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })(opts.seed || 42);
    const ev = []; let t = opts.startMs || 2500;
    const mix = opts.mix || { single: 0.6, mimic: 0.15, brace: 0.17, all: 0.08 };
    const kinds = Object.keys(mix);
    const rr = () => r();
    let lastLane = -1;
    for (let i = 0; i < opts.count; i++) {
      let k; const x = rr(); let acc = 0; for (const kk of kinds) { acc += mix[kk]; if (x <= acc) { k = kk; break; } } if (!k) k = 'single';
      if (i < (opts.warmup || 2)) k = 'single';
      let lanes;
      if (k === 'all') lanes = [0, 1, 2, 3];
      else if (k === 'brace') { const a = Math.floor(rr() * 4); let b = Math.floor(rr() * 3); if (b >= a) b++; lanes = [a, b].sort(); }
      else { let l = Math.floor(rr() * 4); if (l === lastLane && rr() < 0.7) l = (l + 1 + Math.floor(rr() * 3)) % 4; lanes = [l]; lastLane = l; }
      ev.push({ t: Math.round(t), lanes, kind: k });
      const gap = (opts.gapMs || 1400) * (0.75 + rr() * 0.5) * (k === 'all' ? 1.5 : 1);
      t += Math.max(opts.minGapMs || 700, gap * (opts.accel ? Math.max(0.55, 1 - i / opts.count * 0.45) : 1));
    }
    return ev;
  }

  window.VigilReaction = { build, generateEvents };
})();
