/* Wheel / sequence lock: N slots around a circle, each with a glyph (SVG) and optional label.
   Players click slots to build an ordered sequence, then submit. Deterministic check against cfg.answer.
   cfg: { slots:[{id, svg, label, flip, rot, dim}], answer:[ids] | check(seq)=>bool, maxLen, hub:'text', allowRepeat, orient (deg rotation of whole wheel), marks:[deg], onWrong(seq, tries), maxTries, submitText }
   Resolves { seq, tries } when correct. */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;

  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      if (cfg.html) root.appendChild(UI.el('div', { class: 'pz-html', html: cfg.html }));
      const wrap = UI.el('div', { class: 'wheel-wrap' });
      const wheel = UI.el('div', { class: 'wheel' });
      const n = cfg.slots.length, R = 200, cx = 240, cy = 240, sr = cfg.slotRadius || (n > 10 ? 26 : 34);
      const isRow = cfg.layout === 'row';
      if (isRow) wheel.classList.add('rowlayout');
      let svg = isRow ? `<svg viewBox="0 0 ${n * 90 + 40} 150"><g class="wheel-g">` : `<svg viewBox="0 0 480 480"><g class="wheel-g" transform="rotate(${cfg.orient || 0} ${cx} ${cy})">`;
      if (!isRow) svg += `<circle class="ring" cx="${cx}" cy="${cy}" r="${R + sr + 10}"/><circle class="ring" cx="${cx}" cy="${cy}" r="${R - sr - 10}"/>`;
      else svg += `<rect x="6" y="20" width="${n * 90 + 28}" height="110" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(212,169,78,0.3)"/>`;
      (cfg.marks || []).forEach(deg => { const a = (deg - 90) * Math.PI / 180; svg += `<circle class="mark" cx="${cx + Math.cos(a) * (R + sr + 22)}" cy="${cy + Math.sin(a) * (R + sr + 22)}" r="6"/>`; });
      if (cfg.chip != null) { const a = (cfg.chip - 90) * Math.PI / 180; svg += `<path d="M${cx + Math.cos(a) * (R + sr + 26)},${cy + Math.sin(a) * (R + sr + 26)} l-9,-14 l18,0 z" fill="var(--ember)" transform="rotate(${cfg.chip} ${cx + Math.cos(a) * (R + sr + 26)} ${cy + Math.sin(a) * (R + sr + 26)})"/>`; }
      cfg.slots.forEach((s, i) => {
        const a = (i / n * 360 - 90) * Math.PI / 180, x = isRow ? 20 + 45 + i * 90 : cx + Math.cos(a) * R, y = isRow ? 70 : cy + Math.sin(a) * R;
        svg += `<g class="slot${s.dim ? ' dim' : ''}${s.lit ? ' lit' : ''}" data-i="${i}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle class="bg" r="${sr}"/>`;
        svg += `<g transform="rotate(${(s.rot || 0) - (cfg.orient || 0)}) scale(${s.flip ? -1 : 1},1)">${s.svg}</g>`;
        if (s.label) svg += `<text class="lbl" y="${sr + 14}" text-anchor="middle" transform="rotate(${-(cfg.orient || 0)})">${UI.esc(s.label)}</text>`;
        svg += `<text class="ord" y="-${sr + 6}" text-anchor="middle" transform="rotate(${-(cfg.orient || 0)})"></text></g>`;
      });
      svg += `</g>`;
      if (cfg.hub) svg += `<circle class="hub" cx="${cx}" cy="${cy}" r="${cfg.hubR || 62}"/><text class="hub-text" x="${cx}" y="${cy + 5}" text-anchor="middle">${UI.esc(cfg.hub)}</text>`;
      if (cfg.hubSvg) svg += `<g transform="translate(${cx},${cy})">${cfg.hubSvg}</g>`;
      svg += `</svg>`;
      wheel.innerHTML = svg; wrap.appendChild(wheel); root.appendChild(wrap);
      const seqEl = UI.el('div', { class: 'seq-list' }); root.appendChild(seqEl);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      const undo = UI.el('button', { class: 'btn small ghost', text: 'Undo', onclick: () => { seq.pop(); render(); Audio.sfx('tick'); } });
      const clear = UI.el('button', { class: 'btn small ghost', text: 'Clear', onclick: () => { seq.length = 0; render(); Audio.sfx('tick'); } });
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Speak the ward', onclick: check });
      row.appendChild(undo); row.appendChild(clear); row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);

      const seq = []; let tries = 0;
      const slotEls = Array.from(wheel.querySelectorAll('.slot'));
      slotEls.forEach(el => el.addEventListener('click', () => {
        const i = +el.dataset.i; const s = cfg.slots[i];
        if (s.dim && !cfg.allowDim) { Audio.sfx('wrong'); return; }
        if (!cfg.allowRepeat && seq.includes(i)) { seq.splice(seq.indexOf(i), 1); render(); Audio.sfx('tick'); return; }
        if (cfg.maxLen && seq.length >= cfg.maxLen) { Audio.sfx('wrong'); status.textContent = 'The ward holds only ' + cfg.maxLen + ' words.'; return; }
        seq.push(i); Audio.sfx('click'); if (cfg.onPick) cfg.onPick(s, seq.length); render();
      }));
      function render() {
        slotEls.forEach((el, i) => { const k = seq.indexOf(i); el.classList.toggle('sel', k >= 0); el.querySelector('.ord').textContent = k >= 0 ? (k + 1) : ''; });
        UI.clear(seqEl);
        if (!seq.length) seqEl.appendChild(UI.el('span', { class: 'seq-empty', text: cfg.emptyText || 'Click the slots in the order the ward is spoken.' }));
        seq.forEach((i, k) => { const s = cfg.slots[i]; seqEl.appendChild(UI.el('span', { class: 'seq-chip', html: `${k + 1}. <span style="display:inline-block;transform:scaleX(${s.flip ? -1 : 1}) rotate(${s.rot || 0}deg)"><svg viewBox="-20 -20 40 40">${s.svg}</svg></span>${UI.esc(s.label || s.id)}` })); });
        status.textContent = ''; status.className = 'pz-status';
      }
      function check() {
        const ids = seq.map(i => cfg.slots[i].id);
        const ok = cfg.check ? cfg.check(ids, seq) : (JSON.stringify(ids) === JSON.stringify(cfg.answer));
        tries++;
        if (ok) { Audio.sfx('solved'); status.textContent = cfg.successText || 'The ward answers.'; status.className = 'pz-status good'; slotEls.forEach(e => e.classList.add('sel')); submit.disabled = true; setTimeout(() => resolve({ seq: ids, tries }), 900); return; }
        Audio.sfx('fail'); window.VigilFX.shake(wheel, 400);
        const msg = cfg.onWrong ? cfg.onWrong(ids, tries) : null;
        status.textContent = msg || cfg.wrongText || 'The ward does not answer. The slots dim and wait.';
        status.className = 'pz-status bad';
        if (tries >= 2 && api && api.scene && api.scene.hints) document.getElementById('hint').classList.add('attention');
        if (cfg.clearOnWrong !== false) { seq.length = 0; setTimeout(render, 700); }
        if (cfg.maxTries && tries >= cfg.maxTries) { submit.disabled = true; resolve({ seq: ids, tries, failed: true }); }
      }
      render();
    });
  }
  window.VigilWheel = { build };
})();
