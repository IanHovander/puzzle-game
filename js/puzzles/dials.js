/* Dials widget: N dials, each cycling through a list of options (text or svg). Submit when all match.
   cfg: { title, note, dials:[{label, options:[{id, text|svg}], start}], answer:[ids] | check(ids), submitText, wrongText, onWrong } -> { ids, tries } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      const dialsEl = UI.el('div', { class: 'dials' });
      const state = cfg.dials.map(d => d.start || 0);
      const faces = [];
      cfg.dials.forEach((d, i) => {
        const wrap = UI.el('div', { class: 'dial' });
        wrap.appendChild(UI.el('div', { class: 'dial-label', text: d.label || '' }));
        const face = UI.el('div', { class: 'dial-face' }); faces.push(face);
        const btns = UI.el('div', { class: 'dial-btns' }, [
          UI.el('button', { class: 'btn small ghost', text: '‹', title: 'Turn back', 'aria-label': 'Turn back', onclick: () => { state[i] = (state[i] - 1 + d.options.length) % d.options.length; Audio.sfx('tick'); render(); } }),
          UI.el('button', { class: 'btn small ghost', text: '›', title: 'Turn forward', 'aria-label': 'Turn forward', onclick: () => { state[i] = (state[i] + 1) % d.options.length; Audio.sfx('tick'); render(); } }),
        ]);
        face.addEventListener('click', () => { state[i] = (state[i] + 1) % d.options.length; Audio.sfx('tick'); render(); });
        wrap.appendChild(face); wrap.appendChild(btns); dialsEl.appendChild(wrap);
      });
      root.appendChild(dialsEl);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Set', onclick: check }); row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);
      function render() { cfg.dials.forEach((d, i) => { const o = d.options[state[i]]; faces[i].innerHTML = o.svg ? o.svg : UI.esc(o.text != null ? o.text : o.id); }); }
      let tries = 0;
      function check() {
        const ids = cfg.dials.map((d, i) => d.options[state[i]].id);
        const ok = cfg.check ? cfg.check(ids) : JSON.stringify(ids) === JSON.stringify(cfg.answer);
        tries++;
        if (ok) { Audio.sfx('solved'); status.textContent = cfg.successText || 'The mechanism turns over.'; status.className = 'pz-status good'; submit.disabled = true; setTimeout(() => resolve({ ids, tries }), 800); return; }
        Audio.sfx('fail'); window.VigilFX.shake(dialsEl, 400);
        status.textContent = (cfg.onWrong && cfg.onWrong(ids, tries)) || cfg.wrongText || 'It does not turn.'; status.className = 'pz-status bad';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
      }
      render();
    });
  }
  window.VigilDials = { build };
})();
