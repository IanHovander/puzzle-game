/* Four-key shared-keyboard input + on-screen fallback pads for touch/mouse. */
(function () {
  'use strict';
  const Input = {};
  let keys = ['Z', 'V', 'M', '.'];
  let handler = null, padsEl = null, active = false;
  const down = [false, false, false, false];

  Input.setKeys = function (k) { keys = k.map(x => String(x).toUpperCase()); if (padsEl) renderPads(); };
  Input.keys = () => keys.slice();
  Input.keyLabel = (i) => keys[i] === ' ' ? 'SPACE' : keys[i];

  function onKey(e, isDown) {
    if (e.repeat) return;
    if (!isDown) { // always release, even when inactive, so keys never stick
      const k0 = e.key.length === 1 ? e.key.toUpperCase() : e.key; const i0 = keys.indexOf(k0); if (i0 >= 0) down[i0] = false; else down.fill(false);
      if (!active) return;
    }
    if (!active) return;
    if (e.target && e.target.matches && e.target.matches('input,textarea')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.length === 1 ? e.key.toUpperCase() : e.key;
    let idx = keys.indexOf(k);
    if (idx < 0 && e.code) { const byCode = keys.map(x => x.length === 1 && /[A-Z]/.test(x) ? 'Key' + x : x === '.' ? 'Period' : x === ',' ? 'Comma' : x === '/' ? 'Slash' : x === ';' ? 'Semicolon' : x === ' ' ? 'Space' : /[0-9]/.test(x) ? 'Digit' + x : x); idx = byCode.indexOf(e.code); }
    if (idx < 0) return;
    e.preventDefault();
    if (isDown) { if (down[idx]) return; down[idx] = true; press(idx, 'key'); }
    else down[idx] = false;
  }
  function press(idx, source) { if (handler) handler(idx, source); }

  window.addEventListener('keydown', e => onKey(e, true));
  window.addEventListener('keyup', e => onKey(e, false));

  function renderPads() {
    if (!padsEl) return;
    padsEl.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const b = document.createElement('button');
      b.className = 'pad pad-' + i; b.type = 'button';
      b.innerHTML = `<span class="pad-name">${escapeHtml(window.VigilStore ? (window.VigilStore.state.names[i] || 'Player ' + (i + 1)) : 'Player ' + (i + 1))}</span><span class="pad-key">${Input.keyLabel(i)}</span>`;
      const fire = (ev) => { ev.preventDefault(); if (!active) return; b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 120); press(i, 'pad'); };
      b.addEventListener('pointerdown', fire);
      padsEl.appendChild(b);
    }
  }

  /* Activate a 4-key session. handler(idx, source) is called on each press. */
  Input.activate = function (container, fn) {
    handler = fn; active = true; down.fill(false);
    if (container) { padsEl = container; padsEl.classList.add('pads'); renderPads(); }
  };
  Input.deactivate = function () { active = false; handler = null; if (padsEl) { padsEl.innerHTML = ''; padsEl.classList.remove('pads'); padsEl = null; } };
  /* Which keys are held right now. A phase that begins while hands are already on the keys reads this
     instead of waiting for a fresh keydown that will never come. */
  Input.held = () => down.slice();
  Input.pulse = function (idx, cls) { if (!padsEl) return; const b = padsEl.children[idx]; if (!b) return; b.classList.add(cls || 'glow'); setTimeout(() => b.classList.remove(cls || 'glow'), 260); };
  Input.setPadState = function (idx, cls, on) { if (!padsEl) return; const b = padsEl.children[idx]; if (b) b.classList.toggle(cls, !!on); };

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  window.VigilInput = Input;
})();
