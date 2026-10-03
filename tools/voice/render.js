#!/usr/bin/env node
/* Records the narrator, Wren and the other characters with a directable AI voice (Gemini TTS), line
   by line, from the game's own text and a director's notes file. The four players' lines are not
   recorded: the players read those themselves.

     GEMINI_API_KEY=... node tools/voice/render.js ch0            record what is missing for ch0
     node tools/voice/render.js ch0 --list                         print the script with keys, no API
     node tools/voice/render.js ch0 --only "The school, which"     re-record lines starting with this
     node tools/voice/render.js ch0 --force                        re-record everything in ch0
     node tools/voice/render.js audition                           sample passages in several voices
                                                                    and styles, into audio/voice/audition/
     node tools/voice/render.js ch0 --engine kokoro                record with the local Kokoro voice
                                                                    instead (no key; run setup-kokoro.sh once)

   Options: --model NAME (default gemini-2.5-pro-preview-tts, or $VOICE_MODEL), --dry (print prompts).
   Needs Python's `lameenc` for MP3 (pip install lameenc). Writes audio/voice/<ch>/<key>.mp3 and
   rewrites js/content/voice-manifest.js from what is on disk. Direction: tools/voice/direction/<ch>.json
   and the cast in tools/voice/direction/cast.json. See docs/VOICE-ACTING.md. */
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.join(__dirname, '..', '..');
const { loadHearth, blankState } = require(path.join(root, 'tools', 'lib-content.js'));

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? (args[i + 1] || true) : null; };
const target = args.find(a => !a.startsWith('--')) || 'ch0';
let MODEL = opt('--model') || process.env.VOICE_MODEL || 'gemini-2.5-pro-preview-tts';
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const dirDir = path.join(__dirname, 'direction');
const readJSON = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const cast = readJSON(path.join(dirDir, 'cast.json'));

/* ---------- the script, exactly as the game will look it up ---------- */
function scriptFor(chId) {
  const H = loadHearth(); const V = H.win.VigilVoice, G = H.Game, st = blankState();
  const scenes = Object.entries(G.scenes).filter(([id]) => id.startsWith(chId + '_'));
  const out = [], seen = new Set();
  const add = (sceneId, paras) => {
    for (const l of V.scriptFor(paras)) {
      if (['Reader', 'Listener', 'Seer', 'Binder'].includes(l.who)) continue;
      const text = l.text.replace(/\s+/g, ' ').trim(); if (!text || !/[A-Za-z]/.test(text)) continue;
      if (/^"the Four\."/.test(text)) continue; // quotes the players' own group name: differs every game
      const key = V.key(l.who, l.text);
      if (seen.has(key)) continue; seen.add(key);
      out.push({ scene: sceneId, who: l.who, text, key, omen: !!l.omen, phrases: V.phrases(l) });
    }
  };
  const val = (x, ...a) => (typeof x === 'function' ? x(...a) : x);
  for (const [id, sc] of scenes) {
    try { const t = val(sc.text, st); if (t) add(id, t); } catch (e) {}
    try { const s = val(sc.solvedText, st, {}); if (s) add(id, s); } catch (e) {}
    for (const o of (sc.options || [])) { try { const a = val(o.after, st); if (a) add(id, a); } catch (e) {} }
  }
  return out;
}

/* ---------- direction ---------- */
function directionFor(line, dir) {
  const c = cast[line.who] || cast[/Provost/.test(line.who) ? 'Provost' : 'Other'];
  const notes = [];
  if (c.style) notes.push(c.style);
  if (dir.scenes && dir.scenes[line.scene]) notes.push(dir.scenes[line.scene]);
  for (const l of (dir.lines || [])) if (line.text.startsWith(l.match)) notes.push(l.note);
  if (line.omen && cast.omen) notes.push(cast.omen);
  return { voice: c.voice, prompt:
`# AUDIO PROFILE: ${c.name}
${c.profile}

## THE SCENE
${dir.setting || ''}

### DIRECTOR'S NOTES
${notes.join('\n')}
Say only the words of the transcript, exactly as written. No sound effects, no music.

#### TRANSCRIPT
${line.text}` };
}

/* ---------- the voice actor ---------- */
async function perform(prompt, voice) {
  if (!KEY) throw new Error('GEMINI_API_KEY is not set. Add it to the environment (see docs/VOICE-ACTING.md).');
  const body = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } } };
  for (let attempt = 0; attempt < 4; attempt++) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY }, body: JSON.stringify(body) });
    if (r.status === 429 || r.status >= 500) { await new Promise(s => setTimeout(s, 4000 * (attempt + 1))); continue; }
    const j = await r.json();
    if (r.status === 404 && !opt('--model')) { // model renamed: take the best text-to-speech model on offer
      const lm = await (await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers: { 'x-goog-api-key': KEY } })).json();
      const tts = (lm.models || []).map(m => m.name.replace('models/', '')).filter(n => /tts/i.test(n));
      const pick = tts.find(n => /pro/.test(n)) || tts[0];
      if (pick && pick !== MODEL) { console.error(`(model ${MODEL} not found; using ${pick})`); MODEL = pick; return perform(prompt, voice); }
    }
    if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 400)}`);
    const part = ((j.candidates || [])[0] || {}).content?.parts?.find(p => p.inlineData);
    if (!part) throw new Error('no audio in response: ' + JSON.stringify(j).slice(0, 300));
    return { pcm: Buffer.from(part.inlineData.data, 'base64'), rate: +((part.inlineData.mimeType || '').match(/rate=(\d+)/) || [0, 24000])[1] };
  }
  throw new Error('gave up after retries');
}

function writeMp3(pcm, rate, outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const tmp = outFile + '.pcm'; fs.writeFileSync(tmp, pcm);
  try { execFileSync('python3', [path.join(__dirname, 'encode.py'), tmp, outFile, String(rate)], { stdio: 'inherit', env: process.env }); }
  finally { fs.unlinkSync(tmp); }
}

function writeManifest() {
  const base = path.join(root, 'audio', 'voice'), files = {};
  if (fs.existsSync(base)) for (const ch of fs.readdirSync(base)) {
    const d = path.join(base, ch); if (ch === 'audition' || !fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).sort()) if (/^[0-9a-f]{8}\.mp3$/.test(f)) files[f.slice(0, 8)] = ch + '/' + f;
  }
  const js = `/* Recorded performances, by line key (VigilVoice.key(who, text)). Written by tools/voice/render.js;
   do not edit by hand. Lines not listed here are spoken by the browser's own voice. */
window.VIGIL_VOICE_BASE = 'audio/voice/';
window.VIGIL_VOICE_FILES = ${JSON.stringify(files, null, 0).replace(/,"/g, ',\n  "').replace(/^\{"/, '{\n  "').replace(/\}$/, '\n}')};
`;
  fs.writeFileSync(path.join(root, 'js', 'content', 'voice-manifest.js'), files && Object.keys(files).length ? js : js.replace(/\{[\s\S]*\};\n$/, '{};\n'));
  return Object.keys(files).length;
}

/* ---------- audition: the same passages in several voices and styles ---------- */
async function audition() {
  const a = readJSON(path.join(dirDir, 'audition.json'));
  const out = path.join(root, 'audio', 'voice', 'audition'); fs.mkdirSync(out, { recursive: true });
  const index = [];
  for (const take of a.takes) {
    for (const passage of a.passages) {
      const prompt = `# AUDIO PROFILE: ${take.name}\n${take.profile}\n\n## THE SCENE\n${a.setting}\n\n### DIRECTOR'S NOTES\n${take.style}\n${passage.note || ''}\nSay only the words of the transcript, exactly as written.\n\n#### TRANSCRIPT\n${passage.text}`;
      const name = `${take.id}--${passage.id}.mp3`;
      if (opt('--dry')) { console.log('---', name, '\n' + prompt); continue; }
      if (fs.existsSync(path.join(out, name)) && !opt('--force')) { console.log('have', name); index.push({ take: take.id, passage: passage.id, file: name }); continue; }
      process.stdout.write(`recording ${name} ... `);
      const { pcm, rate } = await perform(prompt, take.voice);
      writeMp3(pcm, rate, path.join(out, name)); console.log('ok');
      index.push({ take: take.id, passage: passage.id, file: name });
    }
  }
  fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ takes: a.takes.map(t => ({ id: t.id, name: t.name, voice: t.voice, style: t.style })), passages: a.passages.map(p => ({ id: p.id, title: p.title, text: p.text })), files: index }, null, 1));
}

/* ---------- the local voice: Kokoro, which takes timing rather than direction ---------- */
function kokoro(lines, dir, force, only) {
  const cache = path.join(__dirname, '.cache'), py = path.join(cache, 'venv', 'bin', 'python');
  if (!fs.existsSync(py) || !fs.existsSync(path.join(cache, 'kokoro.onnx'))) throw new Error('Run tools/voice/setup-kokoro.sh first.');
  const roleOf = (who) => cast[who] ? who : /Provost/.test(who) ? 'Provost' : 'Other';
  const voices = {}; for (const r of ['Narrator', 'Wren', 'Provost', 'Other']) voices[r] = cast[r].kokoro;
  const jobs = [];
  for (const l of lines) {
    if (only && !l.text.startsWith(only)) continue;
    const out = path.join(root, 'audio', 'voice', target, l.key + '.mp3');
    if (fs.existsSync(out) && !force && !only) continue;
    const note = (dir.lines || []).find(d => l.text.startsWith(d.match)) || {};
    const ph = l.phrases.map((p, i, a) => ({ text: p.text, pause: p.pause, turn: i > 0 && i === a.length - 1 && a[i - 1].pause === 520 }));
    jobs.push({ out, who: l.who, voice: roleOf(l.who), pace: l.omen ? 'omen' : note.pace || null, phrases: ph });
  }
  if (!jobs.length) return 0;
  const jf = path.join(cache, 'jobs.json'); fs.writeFileSync(jf, JSON.stringify({ voices, lines: jobs }));
  execFileSync(py, [path.join(__dirname, 'kokoro.py'), jf], { stdio: 'inherit' });
  return jobs.length;
}

(async () => {
  if (target === 'audition') return audition();
  const lines = scriptFor(target);
  const dirFile = path.join(dirDir, target + '.json');
  const dir = fs.existsSync(dirFile) ? readJSON(dirFile) : {};
  if (opt('--list')) { for (const l of lines) console.log(l.key, l.scene.padEnd(13), l.who.padEnd(9), l.text); return; }
  const only = opt('--only'), force = !!opt('--force');
  if (opt('--engine') === 'kokoro') { const n = kokoro(lines, dir, force, only); return console.log(`recorded ${n}; manifest lists ${writeManifest()} lines`); }
  let made = 0;
  for (const l of lines) {
    if (only && !l.text.startsWith(only)) continue;
    const file = path.join(root, 'audio', 'voice', target, l.key + '.mp3');
    if (fs.existsSync(file) && !force && !only) continue;
    const { voice, prompt } = directionFor(l, dir);
    if (opt('--dry')) { console.log('---', l.key, voice, '\n' + prompt); continue; }
    process.stdout.write(`${l.key} ${l.who.padEnd(9)} ${l.text.slice(0, 60)} ... `);
    const { pcm, rate } = await perform(prompt, voice);
    writeMp3(pcm, rate, file); made++; console.log('ok');
  }
  if (!opt('--dry')) console.log(`recorded ${made}; manifest lists ${writeManifest()} lines`);
})().catch(e => { console.error(e.message || e); process.exit(1); });
