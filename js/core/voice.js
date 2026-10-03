/* Voice: a narrator reads the story aloud, Wren and the other characters have voices of their
   own, and the four players read their own characters' lines.

   The table still does the reading that matters. When one of the four speaks in the text ("Its,"
   says the Binder), the quote lights up in that player's colour and the narrator waits: for the
   microphone to hear someone speak and stop (Listen on), for that player's key, or, failing both,
   for about as long as the line takes to say. Nothing is transcribed and no audio leaves the
   machine: listening is a level meter, not speech recognition.

   Where the wry lines land is timing, not the voice. The narrator reads a sentence at a time, takes
   a beat before the short last sentence of a paragraph (where the turn usually is), slows for the
   prophecy, and leaves a pause after every box for the table. A caret (‸) in the text, which the
   screen never shows, asks for an extra beat at that exact point.

   The voices are the browser's own (speechSynthesis), picked by name from a preference list per
   character. Recorded files can replace them later without touching the content: see docs/VOICE-ACTING.md. */
(function () {
  'use strict';
  const Voice = {};
  const ROLES = ['Reader', 'Listener', 'Seer', 'Binder'];
  const synth = window.speechSynthesis || null;

  /* Who sounds like what. `names` are tried in order against the installed voices (macOS, Windows,
     Chrome and Edge ship different sets), then `lang`, then any English voice. */
  const CAST = {
    Narrator: { names: ['Daniel', 'Google UK English Male', 'Microsoft Ryan', 'Microsoft George', 'Arthur', 'Oliver', 'Microsoft Thomas'], lang: 'en-GB', rate: 0.94, pitch: 0.92 },
    Wren: { names: ['Google UK English Female', 'Serena', 'Martha', 'Microsoft Libby', 'Microsoft Sonia', 'Kate', 'Samantha'], lang: 'en-GB', rate: 1.08, pitch: 1.18 },
    Provost: { names: ['Martha', 'Microsoft Sonia', 'Stephanie', 'Google UK English Female', 'Kate'], lang: 'en-GB', rate: 0.9, pitch: 0.85 },
    Other: { names: ['Google UK English Male', 'Daniel', 'Microsoft Ryan', 'Arthur'], lang: 'en-GB', rate: 0.95, pitch: 0.78 },
  };

  const settings = () => {
    const st = window.VigilStore && window.VigilStore.state;
    if (!st) return { on: false, listen: false };
    if (!st.voice) st.voice = { on: false, listen: false };
    return st.voice;
  };
  Voice.available = () => !!(synth || window.VIGIL_VOICE_FILES);
  Voice.isOn = () => !!(Voice.available() && settings().on);

  /* ---------- voices ---------- */
  let voices = [];
  const loadVoices = () => { voices = synth ? synth.getVoices() : []; };
  if (synth) { loadVoices(); synth.addEventListener && synth.addEventListener('voiceschanged', loadVoices); }
  const castFor = (who) => CAST[who] || (/Provost/.test(who) ? CAST.Provost : (who === 'Narrator' ? CAST.Narrator : CAST.Other));
  function pickVoice(c) {
    if (!voices.length) loadVoices();
    for (const n of c.names) { const v = voices.find(x => x.name === n || x.name.startsWith(n + ' ') || x.name.includes(n)); if (v) return v; }
    return voices.find(x => x.lang && x.lang.replace('_', '-').startsWith(c.lang)) || voices.find(x => /^en/i.test(x.lang)) || null;
  }

  /* ---------- turning a box into a script ---------- */
  const plain = (s) => String(s).replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/~~(.+?)~~/g, '$1')
    .replace(/\{\{(.+?)\}\}/g, '$1').replace(/\[\[[^\]]*\]\]/g, '').replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  let names = ROLES.concat(['Wren', 'Provost Marrow', 'Provost', 'Marrow', 'Lord Vane', 'Vane', 'Master Sorrel', 'Sorrel', 'Master Oriel', 'Oriel', 'The captain', 'captain']);
  Voice.addNames = (list) => { for (const n of list) if (n && !names.includes(n)) names.push(n); names.sort((a, b) => b.length - a.length); };
  Voice.addNames([]);
  const nameAlt = () => names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const canon = (n) => (/^Provost|^Marrow$/.test(n) ? 'Provost' : n);

  /* Split one paragraph of narration into what the narrator says and what a character says.
     A quote belongs to whoever "says" it straight after it, else to a "says the X" just before it
     (a second quote from the same speaker), else to a short "Wren considers." sentence right
     before it. Anything else ("one born of four") is the narrator quoting, and the narrator reads it. */
  function segment(text) {
    const t = plain(text), out = [], re = /"([^"]+)"/g, alt = nameAlt();
    const after = new RegExp('^\\s*,?\\s*(?:says|asks|whispers|adds|answers|calls|said)\\s+(?:the\\s+)?(' + alt + ')\\b');
    const prevSays = new RegExp('(?:says|asks|whispers|adds|answers|calls)\\s+(?:the\\s+)?(' + alt + ')\\b[^"]*$');
    const prevSubject = new RegExp('(?:^\\s*|[.!?]\\s+)(?:the\\s+|The\\s+)?(' + alt + ')\\b[^.!?"]{0,40}[.:,]\\s*$');
    let last = 0, m;
    while ((m = re.exec(t))) {
      const gap = t.slice(last, m.index), rest = t.slice(m.index + m[0].length);
      const who = (rest.match(after) || [])[1] || (gap.match(prevSays) || [])[1] || (gap.match(prevSubject) || [])[1] || null;
      if (!who) continue; // narrator quoting: leave it in the narration
      if (gap.trim()) out.push({ who: 'Narrator', text: gap });
      out.push({ who: canon(who), text: m[1] });
      last = m.index + m[0].length;
    }
    if (t.slice(last).trim()) out.push({ who: 'Narrator', text: t.slice(last) });
    return out;
  }

  function scriptFor(paras) {
    const lines = [];
    paras.forEach((para, pi) => {
      const o = typeof para === 'object' ? para : { text: para };
      if (o.cls && /\b(whisper|small)\b/.test(o.cls)) return; // instructions are for the screen
      if (o.speaker) { lines.push({ who: canon(o.speaker), text: plain(o.text), para: pi }); return; }
      const omen = !!(o.cls && /\bomen\b/.test(o.cls));
      for (const s of segment(o.text)) lines.push(Object.assign(s, { para: pi, omen }));
    });
    return lines;
  }
  Voice.scriptFor = scriptFor; // for tools and tests

  /* Sentence-sized phrases with the pause that follows each. The beat before a paragraph's short last
     sentence is where the wry turn usually sits ("...and was gone a long time."). */
  function phrases(line) {
    const t = line.text.replace(/\s+/g, ' ').trim();
    if (!t) return [];
    const parts = t.split(/(?<=[.!?…:])\s+(?=["'A-Z0-9(])|\s*‸\s*|\s+—\s+/).filter(Boolean);
    return parts.map((p, i) => {
      const lastShort = parts.length > 1 && i === parts.length - 2 && parts[i + 1].split(' ').length <= 8;
      return { text: p.replace(/‸/g, ''), pause: line.omen ? 700 : lastShort ? 520 : /:$/.test(p) ? 320 : 200 };
    });
  }

  /* ---------- recorded performances ----------
     A line that has been recorded (tools/voice/render.js) plays from its file; anything else falls
     back to the browser's voice. Lines are looked up by who says them and what they say, so an
     edited line simply stops matching and is spoken by the browser until it is recorded again. */
  Voice.key = function (who, text) {
    const s = who + '|' + String(text).replace(/\s+/g, ' ').trim();
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  };
  const recorded = (line) => { const f = window.VIGIL_VOICE_FILES; return f ? f[Voice.key(line.who, line.text)] : null; };
  let current = null;
  function playFile(file, my) {
    return new Promise((resolve) => {
      if (my !== session) return resolve();
      const a = new Audio((window.VIGIL_VOICE_BASE || 'audio/voice/') + file);
      current = a;
      const fin = () => { if (current === a) current = null; resolve(); };
      a.onended = fin; a.onerror = fin;
      const p = a.play(); if (p && p.catch) p.catch(fin);
    });
  }

  /* ---------- playing ---------- */
  let session = 0;
  Voice.stop = function () { session++; if (synth) synth.cancel(); if (current) { current.pause(); current = null; } clearCue(); };
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function say(text, who, omen, my) {
    return new Promise((resolve) => {
      if (my !== session || !synth) return resolve();
      const c = castFor(who), u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(c); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = c.lang;
      u.rate = c.rate * (omen ? 0.82 : 1); u.pitch = c.pitch; u.volume = 1;
      let done = false; const fin = () => { if (!done) { done = true; resolve(); } };
      u.onend = fin; u.onerror = fin;
      // A safety net for engines that never fire onend: about 0.5 s a word, plus a little.
      setTimeout(fin, 1500 + text.split(' ').length * 520 / u.rate);
      synth.speak(u);
    });
  }

  /* ---------- the four players' lines ---------- */
  let cueEl = null, cueResolve = null, keyListener = null;
  function clearCue() {
    if (cueEl) { cueEl.remove(); cueEl = null; }
    document.querySelectorAll('.voice-cue-on').forEach(e => e.classList.remove('voice-cue-on'));
    if (keyListener) { window.removeEventListener('keydown', keyListener, true); keyListener = null; }
    if (cueResolve) { const r = cueResolve; cueResolve = null; r(); }
  }
  /* Light the quote in the paragraph it came from. */
  function markQuote(p, text) {
    if (!p) return null;
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    let n; const key = text.slice(0, 24);
    while ((n = walker.nextNode())) {
      const at = n.nodeValue.replace(/[“”]/g, '"').indexOf(key);
      if (at < 0) continue;
      const r = document.createRange(); r.setStart(n, at);
      r.setEnd(n, Math.min(n.nodeValue.length, at + text.length));
      const span = document.createElement('span'); span.className = 'voice-quote';
      try { r.surroundContents(span); } catch (e) { return null; }
      return span;
    }
    return null;
  }
  async function cue(line, p, my) {
    const idx = ROLES.indexOf(line.who);
    const span = markQuote(p, line.text);
    if (span) span.classList.add('voice-cue-on', 'p' + idx);
    const nm = (window.VigilStore && window.VigilStore.state.names[idx]) || line.who;
    cueEl = document.createElement('div');
    cueEl.className = 'voice-cue p' + idx;
    cueEl.innerHTML = `<span class="voice-cue-who">${nm}</span> read this aloud <span class="voice-cue-line">“${line.text.replace(/[<&]/g, c => c === '<' ? '&lt;' : '&amp;')}”</span><button class="btn small ghost" type="button">Said it</button>`;
    document.body.appendChild(cueEl);
    const words = line.text.split(/\s+/).length;
    await new Promise((resolve) => {
      cueResolve = resolve;
      cueEl.querySelector('button').onclick = () => clearCue();
      const keys = window.VigilInput ? window.VigilInput.keys() : [];
      keyListener = (e) => { const k = e.key.length === 1 ? e.key.toUpperCase() : e.key; if (k === keys[idx] || k === 'Enter') clearCue(); };
      window.addEventListener('keydown', keyListener, true);
      if (settings().listen) Listen.waitForSpeech(words).then(() => { if (my === session) clearCue(); });
      else setTimeout(() => { if (my === session) clearCue(); }, 1800 + words * 420);
    });
    if (span) span.classList.remove('voice-cue-on');
  }

  /* Read a box that has just been typed. `ps` are the paragraph elements, in order. Reads queue:
     a choice's reply is read after the box it joins. */
  let chain = Promise.resolve();
  Voice.read = function (paras, ps) {
    if (!Voice.isOn()) return;
    const my = session, lines = scriptFor(paras);
    chain = chain.then(async () => {
      for (const line of lines) {
        if (my !== session) return;
        const p = ps[line.para];
        if (ROLES.includes(line.who)) { await cue(line, p, my); await sleep(250); continue; }
        if (p) p.classList.add('voice-reading');
        const file = recorded(line);
        if (file) { await playFile(file, my); await sleep(320); if (p) p.classList.remove('voice-reading'); continue; }
        for (const ph of phrases(line)) { if (my !== session) return; await say(ph.text, line.who, line.omen, my); await sleep(ph.pause); }
        if (p) p.classList.remove('voice-reading');
      }
      await sleep(450);
    }).catch((e) => console.error(e));
  };

  /* ---------- listening: a level meter, not a transcriber ---------- */
  const Listen = {};
  let stream = null, analyser = null, buf = null;
  Listen.start = async function () {
    if (analyser) return true;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const AC = window.AudioContext || window.webkitAudioContext; const ac = new AC();
      analyser = ac.createAnalyser(); analyser.fftSize = 1024; buf = new Float32Array(analyser.fftSize);
      ac.createMediaStreamSource(stream).connect(analyser);
      return true;
    } catch (e) { analyser = null; return false; }
  };
  Listen.stop = function () { if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; analyser = null; };
  const level = () => { analyser.getFloatTimeDomainData(buf); let s = 0; for (const x of buf) s += x * x; return Math.sqrt(s / buf.length); };
  /* Resolves once someone has spoken for a moment and stopped, or after a generous timeout. The
     narrator's own voice is not playing while it listens, so the room's noise floor is the baseline. */
  Listen.waitForSpeech = function (words) {
    return new Promise(async (resolve) => {
      if (!analyser && !(await Listen.start())) { setTimeout(resolve, 1800 + words * 420); return; }
      let base = 0, n = 0; const t0 = performance.now(); let heard = 0, quietSince = 0;
      const limit = 6000 + words * 700;
      const tick = () => {
        if (!cueResolve) return resolve();
        const now = performance.now(), l = level();
        if (now - t0 < 300) { base = (base * n + l) / (++n); return requestAnimationFrame(tick); }
        const loud = l > Math.max(0.015, base * 3);
        if (loud) { heard += 16; quietSince = 0; } else if (heard > 250) { quietSince = quietSince || now; }
        if ((heard > 250 && quietSince && now - quietSince > 650) || now - t0 > limit) return resolve();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  Voice.Listen = Listen;

  /* ---------- settings ---------- */
  Voice.setOn = function (on) { settings().on = !!on; window.VigilStore.save(); if (!on) Voice.stop(); };
  Voice.setListen = async function (on) {
    if (on && !(await Listen.start())) { if (window.VigilUI) window.VigilUI.notice('The microphone is not available. The narrator will wait a moment for each line instead, or for that player\'s key.'); on = false; }
    if (!on) Listen.stop();
    settings().listen = !!on; window.VigilStore.save();
  };
  Voice.test = function () {
    Voice.stop(); const my = session;
    chain = Promise.resolve().then(async () => {
      for (const [who, t] of [['Narrator', 'The school, which knows what to do with a miracle, wrote it down.'], ['Wren', 'You\'re awake! Brilliant. I need four idiots and a lamp.']]) { await say(t, who, false, my); await sleep(400); }
    });
  };

  Voice.phrases = phrases;
  window.VigilVoice = Voice;
})();
