/* Procedural audio: ambient moods + synthesized SFX. No audio files. */
(function () {
  'use strict';
  const Audio = {};
  let ctx = null, master = null, dry = null, wet = null, convolver = null;
  let moodLayer = null, moodName = null, sparkleTimer = null;
  let muted = false;
  try { muted = localStorage.getItem('hearthfall.muted') === '1'; } catch (e) {}

  const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // midi -> hz

  function makeImpulse(seconds, decay) {
    const rate = ctx.sampleRate, len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  Audio.init = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 0.8;
    dry = ctx.createGain(); dry.gain.value = 0.7;
    wet = ctx.createGain(); wet.gain.value = 0.45;
    convolver = ctx.createConvolver(); convolver.buffer = makeImpulse(3.2, 2.6);
    dry.connect(master); convolver.connect(wet); wet.connect(master); master.connect(ctx.destination);
    if (moodName) { const m = moodName; moodName = null; Audio.mood(m); }
    return true;
  };
  Audio.ready = () => !!ctx;
  Audio.isMuted = () => muted;
  Audio.setMuted = function (m) {
    muted = !!m;
    try { localStorage.setItem('hearthfall.muted', muted ? '1' : '0'); } catch (e) {}
    if (master) master.gain.setTargetAtTime(muted ? 0 : 0.8, ctx.currentTime, 0.05);
  };
  Audio.toggleMute = () => { Audio.setMuted(!muted); return muted; };

  function out(node, wetAmt) { node.connect(dry); if (wetAmt !== 0) node.connect(convolver); }

  /* ---------- Moods ---------- */
  // Each mood: root midi note, chord intervals, brightness, movement, sparkle scale
  const MOODS = {
    silence: null,
    hearth:   { root: 45, chord: [0, 7, 12, 16, 19], type: 'sine', bright: 900,  lfo: 0.06, sparkle: [0, 4, 7, 11, 14], sparkleRate: 5.5, gain: 0.16 },
    tower:    { root: 43, chord: [0, 7, 12, 14, 19], type: 'triangle', bright: 700, lfo: 0.05, sparkle: [0, 2, 7, 9, 14], sparkleRate: 6.5, gain: 0.15 },
    wonder:   { root: 48, chord: [0, 4, 7, 11, 14, 21], type: 'sine', bright: 1400, lfo: 0.09, sparkle: [0, 4, 7, 11, 16, 19], sparkleRate: 3.2, gain: 0.15 },
    dread:    { root: 38, chord: [0, 6, 12, 13], type: 'sawtooth', bright: 320, lfo: 0.035, sparkle: [0, 1, 6, 12], sparkleRate: 9, gain: 0.11 },
    tense:    { root: 41, chord: [0, 3, 7, 10, 14], type: 'triangle', bright: 800, lfo: 0.2, sparkle: [0, 3, 5, 10], sparkleRate: 2.4, gain: 0.14 },
    court:    { root: 45, chord: [0, 5, 7, 12, 16], type: 'triangle', bright: 1100, lfo: 0.07, sparkle: [0, 2, 5, 7, 9, 12], sparkleRate: 4.5, gain: 0.14 },
    sorrow:   { root: 43, chord: [0, 3, 7, 10, 15], type: 'sine', bright: 600, lfo: 0.04, sparkle: [0, 3, 7, 10, 12], sparkleRate: 7, gain: 0.14 },
    triumph:  { root: 48, chord: [0, 4, 7, 12, 16, 19], type: 'triangle', bright: 1800, lfo: 0.12, sparkle: [0, 4, 7, 12, 16, 19, 24], sparkleRate: 1.6, gain: 0.17 },
    void:     { root: 36, chord: [0, 12, 19, 24], type: 'sine', bright: 400, lfo: 0.02, sparkle: [0, 7, 12, 19], sparkleRate: 12, gain: 0.13 },
  };

  function buildLayer(m) {
    const g = ctx.createGain(); g.gain.value = 0;
    const filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = m.bright; filt.Q.value = 0.7;
    const lfo = ctx.createOscillator(); lfo.frequency.value = m.lfo;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = m.bright * 0.35;
    lfo.connect(lfoGain); lfoGain.connect(filt.frequency); lfo.start();
    const oscs = [];
    m.chord.forEach((iv, i) => {
      for (let d = -1; d <= 1; d += 2) {
        const o = ctx.createOscillator(); o.type = m.type;
        o.frequency.value = NOTE(m.root + iv); o.detune.value = d * (3 + i * 1.5);
        const og = ctx.createGain(); og.gain.value = 0.5 / Math.sqrt(m.chord.length) / (1 + iv / 24);
        o.connect(og); og.connect(filt); o.start(); oscs.push(o);
      }
    });
    // slow breathing amplitude
    const breath = ctx.createOscillator(); breath.frequency.value = m.lfo * 0.7;
    const breathG = ctx.createGain(); breathG.gain.value = 0.25;
    const amp = ctx.createGain(); amp.gain.value = 0.75;
    breath.connect(breathG); breathG.connect(amp.gain); breath.start();
    filt.connect(amp); amp.connect(g); out(g, 1);
    return { g, oscs: oscs.concat([lfo, breath]), m };
  }

  function sparkle(m) {
    if (!ctx || muted) return;
    const scale = m.sparkle;
    const n = m.root + 24 + scale[Math.floor(Math.random() * scale.length)] + (Math.random() < 0.3 ? 12 : 0);
    bell(NOTE(n), 0.06 + Math.random() * 0.05, 2.5 + Math.random() * 2);
  }

  Audio.mood = function (name, fadeSec) {
    if (name === moodName) return;
    moodName = name;
    if (!ctx) return; // will apply on init
    fadeSec = fadeSec || 2.5;
    const now = ctx.currentTime;
    if (moodLayer) {
      const old = moodLayer; moodLayer = null;
      old.g.gain.cancelScheduledValues(now);
      old.g.gain.setTargetAtTime(0, now, fadeSec / 3);
      setTimeout(() => { try { old.oscs.forEach(o => o.stop()); old.g.disconnect(); } catch (e) {} }, fadeSec * 1000 + 500);
    }
    if (sparkleTimer) { clearInterval(sparkleTimer); sparkleTimer = null; }
    const m = MOODS[name];
    if (!m) return;
    moodLayer = buildLayer(m);
    moodLayer.g.gain.setTargetAtTime(m.gain, now + 0.05, fadeSec / 3);
    sparkleTimer = setInterval(() => { if (Math.random() < 0.6) sparkle(m); }, m.sparkleRate * 1000 * (0.6 + Math.random() * 0.8));
  };
  Audio.currentMood = () => moodName;

  /* ---------- SFX primitives ---------- */
  function bell(freq, vol, dur) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    [1, 2.01, 2.99, 4.2].forEach((h, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq * h;
      const og = ctx.createGain(); og.gain.value = 1 / (i + 1) / 2;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.1);
    });
    out(g, 1);
  }
  function noise(dur, vol, filterFreq, type) {
    if (!ctx) return;
    const t = ctx.currentTime, len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = type || 'bandpass'; f.frequency.value = filterFreq; f.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); out(g, 1); src.start(t); src.stop(t + dur);
    return { src, f, g };
  }
  function tone(freq, dur, vol, type, freqEnd) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); out(g, 1); o.start(t); o.stop(t + dur + 0.05);
  }

  const SFX = {
    click:   () => { noise(0.05, 0.25, 2500, 'highpass'); tone(1200, 0.06, 0.08, 'sine', 700); },
    tick:    () => { noise(0.03, 0.18, 4000, 'highpass'); },
    hover:   () => { tone(900, 0.04, 0.03, 'sine'); },
    type:    () => { noise(0.02, 0.06, 5000, 'highpass'); },
    open:    () => { noise(0.6, 0.35, 400, 'lowpass'); tone(80, 0.6, 0.35, 'sine', 40); },
    success: () => { [0, 4, 7, 12].forEach((iv, i) => setTimeout(() => bell(NOTE(72 + iv), 0.18, 2.2), i * 110)); },
    solved:  () => { [0, 7, 12, 16, 19, 24].forEach((iv, i) => setTimeout(() => bell(NOTE(64 + iv), 0.16, 3), i * 90)); noise(1.2, 0.2, 800, 'lowpass'); },
    fail:    () => { tone(220, 0.35, 0.2, 'triangle', 110); setTimeout(() => tone(160, 0.5, 0.18, 'triangle', 70), 120); },
    wrong:   () => { tone(180, 0.18, 0.15, 'square', 120); },
    chime:   () => { bell(NOTE(84), 0.16, 3); },
    boom:    () => { tone(60, 1.6, 0.6, 'sine', 28); noise(1.4, 0.5, 200, 'lowpass'); },
    whoosh:  () => { const n = noise(0.8, 0.3, 300, 'bandpass'); if (n) { n.f.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.7); } },
    heart:   () => { tone(55, 0.14, 0.5, 'sine', 40); setTimeout(() => tone(52, 0.18, 0.4, 'sine', 35), 200); },
    key:     (i) => { bell(NOTE([60, 64, 67, 71][i % 4] + 12), 0.14, 0.9); },
    miss:    () => { noise(0.12, 0.3, 500, 'lowpass'); tone(90, 0.12, 0.25, 'square', 60); },
    alarm:   () => { tone(880, 0.12, 0.12, 'square'); setTimeout(() => tone(880, 0.12, 0.12, 'square'), 200); },
    reveal:  () => { [0, 3, 7, 10, 14, 19].forEach((iv, i) => setTimeout(() => bell(NOTE(55 + iv), 0.14, 4), i * 160)); },
    unlock:  () => { noise(0.25, 0.4, 900, 'bandpass'); setTimeout(() => { tone(600, 0.15, 0.1, 'square'); bell(NOTE(79), 0.1, 1.5); }, 180); },
    step:    () => { noise(0.08, 0.15, 250, 'lowpass'); },
    magic:   () => { for (let i = 0; i < 6; i++) setTimeout(() => bell(NOTE(76 + Math.floor(Math.random() * 12)), 0.06, 1.2), i * 70); },
    seal:    () => { tone(110, 2.5, 0.35, 'sine', 55); [0, 7, 12].forEach((iv, i) => setTimeout(() => bell(NOTE(52 + iv), 0.25, 5), i * 400)); },
  };
  Audio.sfx = function (name, arg) { if (!ctx || muted) return; const f = SFX[name]; if (f) try { f(arg); } catch (e) {} };
  Audio.note = function (midi, dur, vol) { if (!ctx || muted) return; bell(NOTE(midi), vol || 0.15, dur || 1.5); };
  Audio.moods = Object.keys(MOODS);

  window.VigilAudio = Audio;
})();
