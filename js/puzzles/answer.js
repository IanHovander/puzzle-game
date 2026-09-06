/* Typed answer widget. cfg: { title, note, fields:[{label, placeholder, len}], accept: (values)=>bool | [[accepted strings per field]], normalize, wrongText, onWrong(values,tries), maxTries, submitText, successText }
   Resolves { values, tries } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  const norm = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      if (cfg.html) root.appendChild(UI.el('div', { html: cfg.html }));
      const form = UI.el('div', { class: 'name-entry' });
      const fields = cfg.fields || [{ label: '', placeholder: '' }];
      const inputs = fields.map((f, i) => {
        const row = UI.el('div', { class: 'token-row' + (f.player != null ? ' p' + f.player : '') });
        if (f.label) row.appendChild(UI.el('label', { text: f.label }));
        const inp = UI.el('input', { class: 'field' + (f.plain ? ' plain' : ''), placeholder: f.placeholder || '', maxlength: f.len || 24, autocomplete: 'off', spellcheck: 'false' });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { if (inputs[i + 1]) inputs[i + 1].focus(); else check(); } });
        inp.addEventListener('input', () => inp.classList.remove('wrong'));
        row.appendChild(inp); form.appendChild(row); return inp;
      });
      root.appendChild(form);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Speak', onclick: check });
      row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);
      setTimeout(() => inputs[0].focus(), 80);
      let tries = 0;
      function check() {
        const raw = inputs.map(i => i.value.trim());
        const values = raw.map(v => cfg.normalize ? cfg.normalize(v) : norm(v));
        let ok, perField = null;
        if (typeof cfg.accept === 'function') ok = cfg.accept(values, raw);
        else { perField = cfg.accept.map((acc, i) => acc.map(norm).includes(values[i])); ok = perField.every(Boolean); }
        tries++;
        if (ok) { Audio.sfx('solved'); status.textContent = cfg.successText || 'It is heard.'; status.className = 'pz-status good'; submit.disabled = true; inputs.forEach(i => i.disabled = true); setTimeout(() => resolve({ values, raw, tries }), 800); return; }
        Audio.sfx('fail');
        inputs.forEach((inp, i) => { if (!perField || !perField[i]) { inp.classList.add('wrong'); } });
        const msg = cfg.onWrong ? cfg.onWrong(values, tries, raw) : null;
        status.textContent = msg || cfg.wrongText || 'Nothing answers.'; status.className = 'pz-status bad';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
        if (cfg.maxTries && tries >= cfg.maxTries) { submit.disabled = true; resolve({ values, raw, tries, failed: true }); }
      }
    });
  }
  window.VigilAnswer = { build, norm };
})();
