/* Canvas particle layer + screen transitions. */
(function () {
  'use strict';
  const FX = {};
  let canvas, ctx, W, H, raf = null, particles = [], preset = null, lastT = 0, intensity = 1;

  const PRESETS = {
    none: null,
    embers: { n: 70, spawn: (p) => { p.x = Math.random() * W; p.y = H + 10; p.vx = (Math.random() - 0.5) * 12; p.vy = -18 - Math.random() * 30; p.life = 6 + Math.random() * 6; p.r = 1 + Math.random() * 2.2; p.hue = 20 + Math.random() * 25; },
      draw: (p, a) => { ctx.fillStyle = `hsla(${p.hue},95%,${55 + 20 * a}%,${a * 0.8})`; circle(p.x, p.y, p.r * (0.5 + a)); }, wobble: 25 },
    dust: { n: 90, spawn: (p) => { p.x = Math.random() * W; p.y = Math.random() * H; p.vx = (Math.random() - 0.5) * 6; p.vy = -2 - Math.random() * 6; p.life = 10 + Math.random() * 10; p.r = 0.8 + Math.random() * 1.6; },
      draw: (p, a) => { ctx.fillStyle = `rgba(255,236,200,${a * 0.5})`; circle(p.x, p.y, p.r); }, wobble: 10 },
    stars: { n: 140, spawn: (p) => { p.x = Math.random() * W; p.y = Math.random() * H * 0.8; p.vx = 0; p.vy = 0; p.life = 4 + Math.random() * 8; p.r = 0.6 + Math.random() * 1.4; p.tw = Math.random() * 6.28; },
      draw: (p, a) => { const t = 0.5 + 0.5 * Math.sin(p.tw + p.age * 3); ctx.fillStyle = `rgba(220,230,255,${a * t * 0.9})`; circle(p.x, p.y, p.r * (0.6 + t * 0.6)); }, wobble: 0 },
    ash: { n: 110, spawn: (p) => { p.x = Math.random() * W; p.y = -10; p.vx = (Math.random() - 0.5) * 20; p.vy = 12 + Math.random() * 25; p.life = 8 + Math.random() * 8; p.r = 1 + Math.random() * 2.5; },
      draw: (p, a) => { ctx.fillStyle = `rgba(160,150,150,${a * 0.6})`; circle(p.x, p.y, p.r); }, wobble: 30 },
    snow: { n: 120, spawn: (p) => { p.x = Math.random() * W; p.y = -10; p.vx = (Math.random() - 0.5) * 14; p.vy = 18 + Math.random() * 22; p.life = 10 + Math.random() * 8; p.r = 1 + Math.random() * 2.2; },
      draw: (p, a) => { ctx.fillStyle = `rgba(240,245,255,${a * 0.85})`; circle(p.x, p.y, p.r); }, wobble: 24 },
    motes: { n: 60, spawn: (p) => { p.x = Math.random() * W; p.y = Math.random() * H; p.vx = (Math.random() - 0.5) * 10; p.vy = (Math.random() - 0.5) * 10; p.life = 6 + Math.random() * 8; p.r = 1.5 + Math.random() * 2.5; p.hue = 170 + Math.random() * 60; },
      draw: (p, a) => { ctx.fillStyle = `hsla(${p.hue},90%,70%,${a * 0.7})`; circle(p.x, p.y, p.r); ctx.fillStyle = `hsla(${p.hue},90%,80%,${a * 0.15})`; circle(p.x, p.y, p.r * 3.5); }, wobble: 20 },
    void: { n: 80, spawn: (p) => { const ang = Math.random() * 6.28, d = 60 + Math.random() * Math.max(W, H) * 0.6; p.x = W / 2 + Math.cos(ang) * d; p.y = H / 2 + Math.sin(ang) * d; p.vx = -(p.x - W / 2) * 0.05; p.vy = -(p.y - H / 2) * 0.05; p.life = 10 + Math.random() * 6; p.r = 1 + Math.random() * 2; p.hue = 250 + Math.random() * 60; },
      draw: (p, a) => { ctx.fillStyle = `hsla(${p.hue},80%,75%,${a * 0.7})`; circle(p.x, p.y, p.r); }, wobble: 0 },
    rain: { n: 160, spawn: (p) => { p.x = Math.random() * (W + 200) - 100; p.y = -20; p.vx = -60; p.vy = 380 + Math.random() * 200; p.life = 3; p.r = 1; },
      draw: (p, a) => { ctx.strokeStyle = `rgba(180,200,230,${a * 0.35})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03); ctx.stroke(); }, wobble: 0 },
  };
  function circle(x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); }

  function resize() { if (!canvas) return; W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; }

  function frame(t) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016); lastT = t;
    ctx.clearRect(0, 0, W, H);
    if (!preset) return;
    const target = Math.round(preset.n * intensity);
    while (particles.length < target) { const p = { age: 0 }; preset.spawn(p); p.age = Math.random() * p.life * 0.8; particles.push(p); }
    if (particles.length > target) particles.length = target;
    for (const p of particles) {
      p.age += dt;
      if (p.age > p.life || p.y < -30 || p.y > H + 30 || p.x < -120 || p.x > W + 120) { preset.spawn(p); p.age = 0; }
      const wob = preset.wobble ? Math.sin(p.age * 1.7 + p.x * 0.01) * preset.wobble : 0;
      p.x += (p.vx + wob) * dt; p.y += p.vy * dt;
      const a = Math.sin(Math.PI * Math.min(1, p.age / p.life));
      preset.draw(p, a);
    }
  }

  FX.mount = function (el) {
    canvas = el; ctx = canvas.getContext('2d'); resize();
    window.addEventListener('resize', resize);
    if (!raf) raf = requestAnimationFrame(frame);
  };
  FX.set = function (name, inten) { preset = PRESETS[name] || null; intensity = inten == null ? 1 : inten; particles = []; };
  FX.intensity = (v) => { intensity = v; };
  FX.burst = function (x, y, color, count) {
    // one-off burst drawn via temporary particles in the same layer
    if (!ctx) return;
    const n = count || 40; const parts = [];
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, s = 60 + Math.random() * 220; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.6 + Math.random() * 0.8, age: 0, r: 1 + Math.random() * 3 }); }
    let last = performance.now();
    (function step(t) {
      const dt = (t - last) / 1000; last = t; let alive = false;
      for (const p of parts) { p.age += dt; if (p.age > p.life) continue; alive = true; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 120 * dt; const a = 1 - p.age / p.life; ctx.fillStyle = color.replace('A', a.toFixed(2)); circle(p.x, p.y, p.r * a); }
      if (alive) requestAnimationFrame(step);
    })(last);
  };

  /* Screen flash / fade helpers operate on an overlay div */
  let overlay = null;
  function ov() { if (!overlay) { overlay = document.createElement('div'); overlay.id = 'fx-overlay'; document.body.appendChild(overlay); } return overlay; }
  FX.flash = function (color, ms) { const o = ov(); o.style.transition = 'none'; o.style.background = color || '#fff'; o.style.opacity = '1'; o.style.pointerEvents = 'none'; requestAnimationFrame(() => { o.style.transition = `opacity ${ms || 600}ms ease-out`; o.style.opacity = '0'; }); };
  FX.fadeOut = function (ms, color) { return new Promise(res => { const o = ov(); o.style.transition = `opacity ${ms || 700}ms ease-in`; o.style.background = color || '#000'; o.style.pointerEvents = 'all'; o.style.opacity = '1'; setTimeout(res, ms || 700); }); };
  FX.fadeIn = function (ms) { return new Promise(res => { const o = ov(); o.style.transition = `opacity ${ms || 700}ms ease-out`; o.style.opacity = '0'; setTimeout(() => { o.style.pointerEvents = 'none'; res(); }, ms || 700); }); };
  FX.shake = function (el, ms) { el = el || document.body; el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), ms || 500); };

  window.VigilFX = FX;
})();
