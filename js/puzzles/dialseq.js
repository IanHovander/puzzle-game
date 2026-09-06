/* Dial sequence (the Founders' Door): N dials; each "turn" sets one dial to one glyph. The door counts turns in order.
   cfg: { title, note, dials:[{id,label}], glyphs:[{id,svg,label}], answer:[{dial, glyph}] (ordered) | check(turns)=>bool|string, maxTurns, submitText }
   Resolves { turns, tries } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz dialseq' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      if (cfg.html) root.appendChild(UI.el('div', { html: cfg.html }));
      const dialsEl = UI.el('div', { class: 'dials' });
      const faces = [];
      cfg.dials.forEach((d, i) => {
        const wrap = UI.el('div', { class: 'dial' });
        wrap.appendChild(UI.el('div', { class: 'dial-label', text: d.label }));
        const face = UI.el('div', { class: 'dial-face' }); faces.push(face);
        face.addEventListener('click', () => { sel = sel === i ? null : i; Audio.sfx('click'); render(); });
        wrap.appendChild(face); dialsEl.appendChild(wrap);
      });
      root.appendChild(dialsEl);
      const palette = UI.el('div', { class: 'palette-grid' }); root.appendChild(palette);
      const turnsEl = UI.el('div', { class: 'seq-list' }); root.appendChild(turnsEl);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      row.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Undo turn', onclick: () => { turns.pop(); Audio.sfx('tick'); render(); } }));
      row.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Reset', onclick: () => { turns.length = 0; Audio.sfx('tick'); render(); } }));
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Try the door', onclick: check }); row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);
      const turns = []; let sel = null, tries = 0;
      function current(i) { for (let k = turns.length - 1; k >= 0; k--) if (turns[k].dial === cfg.dials[i].id) return turns[k].glyph; return null; }
      function render() {
        cfg.dials.forEach((d, i) => { const g = current(i); faces[i].innerHTML = g ? `<svg viewBox="-20 -20 40 40">${cfg.glyphs.find(x => x.id === g).svg}</svg>` : '<span style="opacity:.4">—</span>'; faces[i].classList.toggle('sel', sel === i); });
        UI.clear(palette);
        palette.appendChild(UI.el('div', { class: 'pz-note', style: { flexBasis: '100%' }, text: sel != null ? `Turn dial ${cfg.dials[sel].label} to…` : 'Select a dial, then a glyph. Each choice is one turn; the door counts them in order.' }));
        cfg.glyphs.forEach(g => palette.appendChild(UI.el('button', { class: 'glyph name-only', html: `<span class="gname">${UI.esc(g.label || g.id)}</span>`, onclick: () => { if (sel == null) { Audio.sfx('wrong'); return; } if (cfg.maxTurns && turns.length >= cfg.maxTurns) { Audio.sfx('wrong'); status.textContent = 'The door counts no more than ' + cfg.maxTurns + ' turns.'; return; } turns.push({ dial: cfg.dials[sel].id, glyph: g.id }); Audio.sfx('click'); sel = null; render(); } })));
        UI.clear(turnsEl);
        if (!turns.length) turnsEl.appendChild(UI.el('span', { class: 'seq-empty', text: 'No turns yet.' }));
        turns.forEach((t, k) => turnsEl.appendChild(UI.el('span', { class: 'seq-chip', text: `${k + 1}. ${t.dial} → ${t.glyph}` })));
        status.textContent = ''; status.className = 'pz-status';
      }
      function check() {
        tries++;
        let ok;
        if (cfg.check) ok = cfg.check(turns.slice());
        else ok = turns.length === cfg.answer.length && turns.every((t, k) => t.dial === cfg.answer[k].dial && t.glyph === cfg.answer[k].glyph);
        if (ok === true) { Audio.sfx('open'); status.className = 'pz-status good'; status.textContent = cfg.successText || 'The door remembers the count. It opens.'; submit.disabled = true; setTimeout(() => resolve({ turns: turns.slice(), tries }), 900); return; }
        Audio.sfx('fail'); window.VigilFX.shake(dialsEl, 400);
        status.className = 'pz-status bad'; status.textContent = (typeof ok === 'string' ? ok : null) || cfg.wrongText || 'The door forgets the count.';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
        setTimeout(() => { turns.length = 0; render(); }, 900);
      }
      render();
    });
  }
  window.VigilDialSeq = { build };
})();
