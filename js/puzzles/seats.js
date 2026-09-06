/* Seats: N seats around a round table; the group may "approach" up to K of them, then convene.
   cfg: { title, note, seats:[{id, label, sub, banner(svg string)?, locked?}], max:K, check(selectedIds)=>{ok:boolean, text, tally?}, submitText, maxTries, timer:seconds?, onTimeout() }
   Resolves { selected, ok, tries, timedOut } */
(function () {
  'use strict';
  const UI = window.VigilUI, Audio = window.VigilAudio;
  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz seats-pz' });
      if (cfg.title) root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title }));
      if (cfg.note) root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note) }));
      const area = UI.el('div', { class: 'table-area' });
      const n = cfg.seats.length; const R = 42; // percent
      area.innerHTML = `<svg viewBox="0 0 100 100" class="table-svg"><circle cx="50" cy="50" r="30" fill="rgba(0,0,0,0.35)" stroke="rgba(212,169,78,0.35)"/><circle cx="50" cy="50" r="6" fill="rgba(255,122,61,0.35)"><animate attributeName="r" values="6;7;6" dur="3s" repeatCount="indefinite"/></circle><text x="50" y="52" text-anchor="middle" font-size="4" fill="rgba(233,226,210,0.6)" font-family="Cinzel,serif">${UI.esc(cfg.center || '')}</text></svg>`;
      const seatEls = [];
      cfg.seats.forEach((s, i) => {
        const a = ((i + 0.5) / n * 360 - 90 + (cfg.startAngle || 0)) * Math.PI / 180;
        const x = 50 + Math.cos(a) * R, y = 50 + Math.sin(a) * R;
        const el = UI.el('div', { class: 'seat' + (s.locked ? ' locked' : ''), style: { left: `calc(${x}% - 37px)`, top: `calc(${y}% - 37px)` } });
        el.appendChild(UI.el('span', { class: 'seatn', text: s.n != null ? s.n : (i + 1) }));
        el.appendChild(UI.el('span', { html: (s.banner ? `<div class="seat-banner">${s.banner}</div>` : '') + UI.esc(s.label) + (s.sub ? `<br><small>${UI.esc(s.sub)}</small>` : '') }));
        el.addEventListener('click', () => toggle(i));
        area.appendChild(el); seatEls.push(el);
      });
      root.appendChild(area);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const row = UI.el('div', { class: 'pz-row right' });
      const submit = UI.el('button', { class: 'btn primary', text: cfg.submitText || 'Convene', onclick: check }); row.appendChild(submit); root.appendChild(row);
      container.appendChild(root);
      let ctl = null;
      if (cfg.timer) { ctl = UI.countdown(root, cfg.timer); ctl.promise.then(r => { if (r === 'timeout' && !finished) { if (cfg.onTimeout) cfg.onTimeout(); status.className = 'pz-status bad'; status.textContent = cfg.timeoutText || 'The bell. The vote is called as it stands.'; setTimeout(check, 900); } }); }
      const selected = []; let tries = 0, finished = false;
      function toggle(i) {
        const s = cfg.seats[i];
        if (s.locked) { Audio.sfx('wrong'); status.className = 'pz-status bad'; status.textContent = s.lockedText || 'That Master cannot be approached.'; return; }
        const k = selected.indexOf(s.id);
        if (k >= 0) selected.splice(k, 1); else { if (selected.length >= (cfg.max || 2)) { Audio.sfx('wrong'); status.className = 'pz-status bad'; status.textContent = `You may approach only ${cfg.max || 2}.`; return; } selected.push(s.id); }
        Audio.sfx('click'); render();
      }
      function render() { seatEls.forEach((el, i) => el.classList.toggle('filled', selected.includes(cfg.seats[i].id))); }
      function check() {
        if (finished) return;
        const r = cfg.check(selected.slice());
        tries++;
        if (r.ok) { finished = true; if (ctl) ctl.cancel(); Audio.sfx('solved'); status.className = 'pz-status good'; status.textContent = r.text || 'It carries.'; submit.disabled = true; setTimeout(() => resolve({ selected: selected.slice(), ok: true, tries }), 1200); return; }
        Audio.sfx('fail'); status.className = 'pz-status bad'; status.textContent = r.text || 'It fails.';
        if (tries >= 2) document.getElementById('hint').classList.add('attention');
        if ((cfg.maxTries && tries >= cfg.maxTries) || r.final) { finished = true; if (ctl) ctl.cancel(); submit.disabled = true; setTimeout(() => resolve({ selected: selected.slice(), ok: false, tries, tally: r.tally }), 1200); }
        else if (!cfg.keepSelection) { selected.length = 0; render(); }
      }
      render();
    });
  }
  window.VigilSeats = { build };
})();
