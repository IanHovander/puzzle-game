/* Sigil ring: N numbered slots around a circle; a palette of glyphs; place one glyph per slot (or leave empty).
   cfg: { title, note, slots:n, glyphs:[{id,svg,label}], answer:{slotIndex(1-based): glyphId|null} | check(map)=>bool|string,
          marks:[{slot, label, color}], orient, allowEmpty, fourHands:bool, submitText, wrongText, onWrong(map,tries), maxTries,
          callers:[nickname per placement] (optional: shows "X, place a glyph") }
   Resolves { map, tries } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio, Input = window.VigilInput;

  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz ring-pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      if (cfg.html) root.appendChild(UI.el('div', { class: 'pz-html', html: cfg.html }));
      const wrap = UI.el('div', { class: 'wheel-wrap' });
      const wheel = UI.el('div', { class: 'wheel ring' });
      const n = cfg.slots, R = 190, cx = 240, cy = 240, sr = n > 8 ? 26 : 32;
      const strip = cfg.layout === 'strip';
      if (strip) wheel.classList.add('striplayout');
      let svg = strip ? `<svg viewBox="0 0 ${n * 84 + 40} 160"><g>` : `<svg viewBox="0 0 480 480"><g transform="rotate(${cfg.orient || 0} ${cx} ${cy})">`;
      if (!strip) {
        svg += `<circle class="ring" cx="${cx}" cy="${cy}" r="${R + sr + 12}"/><circle class="ring" cx="${cx}" cy="${cy}" r="${R - sr - 12}"/>`;
        // sunwise arrow, drawn at the hub so it never suggests where the sigil begins
        if (cfg.showArrow !== false) svg += `<g opacity=".55"><path d="M${cx - 26},${cy - 6} a28,28 0 1 1 52,0" fill="none" stroke="rgba(212,169,78,.7)" stroke-width="2"/><path d="M${cx + 26},${cy - 6} l-9,-7 l1,11 z" fill="rgba(212,169,78,.9)"/><text x="${cx}" y="${cy + 22}" text-anchor="middle" fill="rgba(212,169,78,.7)" font-size="10" font-family="Cinzel,serif" letter-spacing="1">SUNWISE</text></g>`;
        (cfg.marks || []).forEach(m => { const a = ((m.slot - 1) / n * 360 - 90) * Math.PI / 180; const mx = cx + Math.cos(a) * (R + sr + 30), my = cy + Math.sin(a) * (R + sr + 30); svg += `<g transform="translate(${mx.toFixed(1)},${my.toFixed(1)})"><path d="M0,10 L-8,-6 L8,-6 Z" fill="${m.color || 'var(--ember)'}" transform="rotate(${((m.slot - 1) / n * 360 + 180).toFixed(0)})"/>${m.label ? `<text y="-14" text-anchor="middle" fill="${m.color || 'var(--ember)'}" font-size="11" font-family="Cinzel,serif" transform="rotate(${-(cfg.orient || 0)})">${UI.esc(m.label)}</text>` : ''}</g>`; });
      } else {
        svg += `<rect x="6" y="30" width="${n * 84 + 28}" height="100" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(212,169,78,0.3)"/>`;
        (cfg.marks || []).forEach(m => { const mx = 20 + 42 + (m.slot - 1) * 84; svg += `<g transform="translate(${mx},18)"><path d="M0,8 L-8,-6 L8,-6 Z" fill="${m.color || 'var(--ember)'}"/>${m.label ? `<text y="-10" text-anchor="middle" fill="${m.color || 'var(--ember)'}" font-size="11" font-family="Cinzel,serif">${UI.esc(m.label)}</text>` : ''}</g>`; });
      }
      for (let i = 0; i < n; i++) {
        const a = (i / n * 360 - 90) * Math.PI / 180, x = strip ? 20 + 42 + i * 84 : cx + Math.cos(a) * R, y = strip ? 80 : cy + Math.sin(a) * R;
        svg += `<g class="slot" data-i="${i}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle class="bg" r="${sr}"/><g class="glyph-holder" transform="rotate(${-(cfg.orient || 0)})"></g><text class="lbl" y="${sr + 15}" text-anchor="middle" transform="rotate(${-(cfg.orient || 0)})">${i + 1}</text></g>`;
      }
      svg += `</g>`;
      if (cfg.hub) svg += `<circle class="hub" cx="${cx}" cy="${cy}" r="70"/><text class="hub-text" x="${cx}" y="${cy + 5}" text-anchor="middle">${UI.esc(cfg.hub)}</text>`;
      svg += `</svg>`;
      wheel.innerHTML = svg; wrap.appendChild(wheel);
      const palette = UI.el('div', { class: 'palette' });
      wrap.appendChild(palette); root.appendChild(wrap);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      row.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Clear ring', onclick: () => { for (let i = 0; i < n; i++) map[i] = null; sel = null; render(); Audio.sfx('tick'); } }));
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Close the sigil', onclick: check });
      row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);

      const map = Array(n).fill(null); let sel = null, tries = 0;
      const slotEls = Array.from(wheel.querySelectorAll('.slot'));
      slotEls.forEach(el => el.addEventListener('click', () => { const i = +el.dataset.i; if (sel === i) { if (map[i]) { map[i] = null; Audio.sfx('tick'); } sel = null; } else { sel = i; Audio.sfx('click'); } render(); }));
      function render() {
        slotEls.forEach((el, i) => {
          el.classList.toggle('sel', sel === i);
          const holder = el.querySelector('.glyph-holder');
          const g = map[i] ? cfg.glyphs.find(x => x.id === map[i]) : null;
          holder.innerHTML = g ? `<g transform="scale(1.15)">${g.svg}</g>` : '';
          el.classList.toggle('filled', !!g);
        });
        UI.clear(palette);
        palette.appendChild(UI.el('div', { class: 'pz-note', text: sel != null ? `Slot ${sel + 1} — choose a glyph` : 'Select a slot, then a glyph.' }));
        const grid = UI.el('div', { class: 'palette-grid' });
        cfg.glyphs.forEach(g => {
          const used = !cfg.allowRepeat && map.includes(g.id);
          grid.appendChild(UI.el('button', { class: 'glyph name-only' + (used ? ' used' : ''), html: `<span class="gname">${UI.esc(g.label || g.id)}</span>`, title: 'Bookmoth reads the shapes; the palette names only the words.', onclick: () => {
            if (sel == null) { status.textContent = 'Choose a slot first.'; Audio.sfx('wrong'); return; }
            if (used) { const j = map.indexOf(g.id); map[j] = null; }
            map[sel] = g.id; Audio.sfx('click'); if (cfg.onPlace) cfg.onPlace(g.id, sel + 1);
            sel = null; render();
          } }));
        });
        if (cfg.allowEmpty) grid.appendChild(UI.el('button', { class: 'glyph empty', html: `<span class="gi">leave empty</span>`, onclick: () => { if (sel == null) return; map[sel] = null; sel = null; render(); } }));
        palette.appendChild(grid);
      }
      async function check() {
        const m = {}; map.forEach((g, i) => { m[i + 1] = g; });
        let ok;
        if (cfg.check) ok = cfg.check(m);
        else { ok = true; for (let i = 1; i <= n; i++) { const want = cfg.answer[i] === undefined ? null : cfg.answer[i]; if ((m[i] || null) !== want) ok = false; } }
        tries++;
        if (ok === true) {
          Audio.sfx('success'); status.className = 'pz-status good'; status.textContent = cfg.successText || 'The ring warms.';
          submit.disabled = true;
          if (cfg.fourHands !== false) { const r = await fourHands(root, cfg.fourHandsText); if (!r) { /* skipped */ } }
          Audio.sfx('solved'); setTimeout(() => resolve({ map: m, tries }), 700); return;
        }
        Audio.sfx('fail'); window.VigilFX.shake(wheel, 400);
        status.className = 'pz-status bad';
        status.textContent = (typeof ok === 'string' ? ok : null) || (cfg.onWrong && cfg.onWrong(m, tries)) || cfg.wrongText || 'Frost creeps over the ring. It resets.';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
        if (cfg.resetOnWrong !== false) setTimeout(() => { for (let i = 0; i < n; i++) map[i] = null; sel = null; render(); }, 900);
        if (cfg.maxTries && tries >= cfg.maxTries) { submit.disabled = true; resolve({ map: m, tries, failed: true }); }
      }
      render();
    });
  }

  /* Four Hands: all four keys within windowMs. Resolves true when done (or after skip). */
  function fourHands(root, text, windowMs) {
    return new Promise((resolve) => {
      const box = UI.el('div', { class: 'fourhands' });
      setTimeout(() => { try { box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {} }, 50);
      box.appendChild(UI.el('div', { class: 'pz-title', text: text || 'FOUR HANDS — all four keys together to close it' }));
      const pads = UI.el('div', {}); box.appendChild(pads);
      const st = UI.el('div', { class: 'pz-status' }); box.appendChild(st);
      const skip = UI.el('button', { class: 'btn small ghost', text: 'Close it without the ritual', onclick: () => { Input.deactivate(); box.remove(); resolve(false); } });
      box.appendChild(skip);
      root.appendChild(box);
      const times = [null, null, null, null];
      Input.activate(pads, (idx) => {
        times[idx] = performance.now(); Input.setPadState(idx, 'good', true); Audio.sfx('key', idx);
        const set = times.filter(x => x != null);
        if (set.length === 4) {
          const spread = Math.max(...set) - Math.min(...set);
          if (spread <= (windowMs || 1000)) { st.className = 'pz-status good'; st.textContent = 'Four hands.'; Audio.sfx('magic'); Input.deactivate(); setTimeout(() => { box.remove(); resolve(true); }, 600); }
          else { st.className = 'pz-status bad'; st.textContent = `Too far apart (${(spread / 1000).toFixed(1)} s). Again — count yourselves in.`; for (let i = 0; i < 4; i++) { times[i] = null; Input.setPadState(i, 'good', false); } }
        }
      });
      // stale presses expire
      setInterval(() => { const now = performance.now(); for (let i = 0; i < 4; i++) if (times[i] != null && now - times[i] > (windowMs || 1000)) { times[i] = null; Input.setPadState(i, 'good', false); } }, 200);
    });
  }
  window.VigilRing = { build, fourHands };
})();
