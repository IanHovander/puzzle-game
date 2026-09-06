/* The Binding: four notes, toggle-press (press to sound, press again to release). All four must sound within joinMs,
   hold together for holdMs (any early release dips the flame and restarts the hold), then release together within releaseMs.
   cfg: { joinMs:1000, holdMs:6000, releaseMs:500, attempts:3, deadLanes:[idx], mutedCues:[idx], onAttempt(n, result) }
   Resolves { success, attempts, releaseSpread } */
(function () {
  'use strict';
  const UI = window.VigilUI, Input = window.VigilInput, Audio = window.VigilAudio;
  const NOTES = [60, 64, 67, 71];

  function build(container, cfg, api) {
    return new Promise((resolve) => {
      const root = UI.el('div', { class: 'pz binding' });
      root.appendChild(UI.el('div', { class: 'pz-title', text: cfg.title || 'THE BINDING' }));
      root.appendChild(UI.el('div', { class: 'pz-note', html: UI.rich(cfg.note || 'Press your key once to sound your note. It holds until you press again. All four must sound together, hold while the fire climbs, then **release together** — count yourselves in aloud. The Hearth gives no count.') }));
      const flame = UI.el('div', { class: 'flame-meter' }, [UI.el('div', { class: 'flame-fill' })]);
      root.appendChild(flame);
      const lanesEl = UI.el('div', { class: 'bind-lanes' });
      const lanes = [];
      for (let i = 0; i < 4; i++) { const l = UI.el('div', { class: 'bind-lane lane-' + i + ((cfg.deadLanes || []).includes(i) ? ' dead' : '') }, [UI.el('div', { class: 'lane-name', text: window.VigilStore.state.names[i] || 'Player ' + (i + 1) }), UI.el('div', { class: 'bind-orb' }), UI.el('div', { class: 'keycap', text: Input.keyLabel(i) })]); lanesEl.appendChild(l); lanes.push(l); }
      root.appendChild(lanesEl);
      const pads = UI.el('div', {}); root.appendChild(pads);
      const status = UI.el('div', { class: 'pz-status' }); root.appendChild(status);
      const log = UI.el('div', { class: 'pz-note bind-log' }); root.appendChild(log);
      container.appendChild(root);

      const joinMs = cfg.joinMs || 1000, holdMs = cfg.holdMs || 6000, releaseMs = cfg.releaseMs || 500, maxAttempts = cfg.attempts || 3;
      const active = (cfg.deadLanes || []).length ? [0, 1, 2, 3].filter(i => !(cfg.deadLanes || []).includes(i)) : [0, 1, 2, 3];
      let sounding = [false, false, false, false], onTimes = [null, null, null, null], offTimes = [null, null, null, null];
      let phase = 'join', holdStart = null, attempts = 0, fill = 0, raf = null, done = false, voices = [], ignoreUntil = 0;

      function startVoice(i) { if (Audio.ready && Audio.ready() && !Audio.isMuted()) { /* sustained tone via repeated bell */ voices[i] = setInterval(() => Audio.note(NOTES[i], 1.2, 0.12), 900); Audio.note(NOTES[i], 1.2, 0.14); } }
      function stopVoice(i) { if (voices[i]) { clearInterval(voices[i]); voices[i] = null; } }
      function setLane(i, on) { lanes[i].classList.toggle('on', on); Input.setPadState(i, 'good', on); }
      function resetAll(msg, cls) { ignoreUntil = performance.now() + 700; active.forEach(i => { sounding[i] = false; onTimes[i] = null; offTimes[i] = null; setLane(i, false); stopVoice(i); }); phase = 'join'; holdStart = null; fill = 0; flame.firstChild.style.width = '0%'; if (msg) { status.className = 'pz-status ' + (cls || ''); status.textContent = msg; } }

      Input.activate(pads, (idx) => {
        if (done || !active.includes(idx)) return;
        const now = performance.now();
        if (now < ignoreUntil) return; // settle window after a reset: the other hands' in-flight presses are not new joins
        if (!sounding[idx]) {
          if (phase === 'release') { resetAll('A hand came back after letting go. Again.', 'bad'); Audio.sfx('miss'); fail(); return; }
          sounding[idx] = true; onTimes[idx] = now; setLane(idx, true); startVoice(idx);
          if (active.every(i => sounding[i])) {
            const ts = active.map(i => onTimes[i]); const spread = Math.max(...ts) - Math.min(...ts);
            if (spread > joinMs) { resetAll(`Joined too far apart (${(spread / 1000).toFixed(1)} s). Sound them together.`, 'bad'); Audio.sfx('miss'); return; }
            phase = 'hold'; holdStart = now; status.className = 'pz-status good'; status.textContent = 'Four hands. Hold — the fire climbs.';
          }
        } else {
          // release
          sounding[idx] = false; offTimes[idx] = now; setLane(idx, false); stopVoice(idx);
          if (phase === 'hold') {
            if (now - holdStart < holdMs) { resetAll(`${window.VigilStore.state.names[idx] || 'Player ' + (idx + 1)} let go early — the flame dips. Sound them again.`, 'bad'); Audio.sfx('miss'); return; }
            phase = 'release';
          }
          if (phase === 'release' && active.every(i => !sounding[i])) {
            const ts = active.map(i => offTimes[i]); const spread = Math.max(...ts) - Math.min(...ts);
            const detail = active.map(i => `${window.VigilStore.state.names[i] || 'P' + (i + 1)} ${((offTimes[i] - Math.min(...ts)) / 1000).toFixed(2)}s`).join(' · ');
            if (spread <= releaseMs) { done = true; Input.deactivate(); Audio.sfx('seal'); status.className = 'pz-status good'; status.textContent = `Released together (${(spread / 1000).toFixed(2)} s). The Binding holds.`; log.textContent = detail; flame.firstChild.style.width = '100%'; setTimeout(() => resolve({ success: true, attempts: attempts + 1, releaseSpread: spread }), 1400); }
            else { log.textContent = detail; resetAll(`Released ${(spread / 1000).toFixed(2)} s apart — it needs ${(releaseMs / 1000).toFixed(1)}. Count yourselves in: one, two, three, off.`, 'bad'); Audio.sfx('fail'); fail(); }
          }
        }
      });
      function fail() { attempts++; if (cfg.onAttempt) cfg.onAttempt(attempts, false); if (attempts >= maxAttempts) { done = true; Input.deactivate(); status.className = 'pz-status bad'; status.textContent = cfg.failText || 'The fire will not take a fourth attempt. It flares, thin.'; setTimeout(() => resolve({ success: false, attempts }), 1400); } }
      function frame() { if (done) return; raf = requestAnimationFrame(frame); if (phase === 'hold') { fill = Math.min(1, (performance.now() - holdStart) / holdMs); flame.firstChild.style.width = (fill * 100) + '%'; if (fill >= 1 && !flame.classList.contains('ready')) { flame.classList.add('ready'); status.textContent = 'It has climbed. Now — together — let go.'; Audio.sfx('chime'); } } else { flame.classList.remove('ready'); } }
      raf = requestAnimationFrame(frame);
    });
  }
  window.VigilBinding = { build };
})();
