/* Tile sentence builder: click tiles from a tray into a sentence; submit. cfg: { title, note, tiles:[{id,text,cls}], answer:[ids] | check(ids), maxLen, allowRepeat } -> { ids, tries } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      if (cfg.html) root.appendChild(UI.el('div', { html: cfg.html }));
      const sentence = UI.el('div', { class: 'sentence' });
      const tray = UI.el('div', { class: 'tiles' });
      root.appendChild(sentence); root.appendChild(tray);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      row.appendChild(UI.el('button', { class: 'btn small ghost', text: 'Clear', onclick: () => { seq.length = 0; render(); } }));
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Read it aloud', onclick: check }); row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);
      const seq = []; let tries = 0;
      function render() {
        UI.clear(sentence); UI.clear(tray);
        if (!seq.length) sentence.appendChild(UI.el('span', { class: 'seq-empty', text: cfg.emptyText || 'Build the reading from the tiles below.' }));
        seq.forEach((id, k) => { const t = cfg.tiles.find(x => x.id === id); sentence.appendChild(UI.el('button', { class: 'tile ' + (t.cls || ''), html: UI.rich(t.text), onclick: () => { seq.splice(k, 1); Audio.sfx('tick'); render(); } })); });
        cfg.tiles.forEach(t => { const used = !cfg.allowRepeat && seq.includes(t.id); tray.appendChild(UI.el('button', { class: 'tile ' + (t.cls || '') + (used ? ' used' : ''), html: UI.rich(t.text), onclick: () => { if (cfg.maxLen && seq.length >= cfg.maxLen) { Audio.sfx('wrong'); return; } seq.push(t.id); Audio.sfx('click'); render(); } })); });
      }
      function check() {
        const ids = seq.slice();
        const ok = cfg.check ? cfg.check(ids) : JSON.stringify(ids) === JSON.stringify(cfg.answer);
        tries++;
        if (ok) { Audio.sfx('solved'); status.textContent = cfg.successText || 'The reading is true.'; status.className = 'pz-status good'; submit.disabled = true; setTimeout(() => resolve({ ids, tries }), 800); return; }
        Audio.sfx('fail'); window.VigilFX.shake(sentence, 400);
        status.textContent = (cfg.onWrong && cfg.onWrong(ids, tries)) || cfg.wrongText || 'The words fall flat.'; status.className = 'pz-status bad';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
      }
      render();
    });
  }
  window.VigilTiles = { build };
})();
