/* Layout check: does every scene fit on screen without scrolling?
   node tools/scan-fit.js [ch0 ch1] [--w 1280 --h 720]
   Jumps to each scene with ?scene=, then reports two things:
     - the text box (#text), which shrinks its own type to fit: the size it settled on, and any
       overflow left at the smallest size it is allowed to use
     - the puzzle panel (#widget), which does NOT shrink: a puzzle whose ring, palette and commit
       button do not fit is scrolled, and players miss the half below the fold. */
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { ({ chromium } = require('/tmp/claude-0/-home-user-puzzle-game/6c53366b-c261-5c1b-b535-5225f4be0786/scratchpad/node_modules/playwright-core')); }
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs'), vm = require('vm');

function scenesOf(chIds) {
  const sandbox = { window: {}, console, Math, Date, JSON, Store: { note() {}, set() {}, state: { flags: {} } } };
  sandbox.window.VigilGlyphs = new Proxy(function () {}, { get: () => new Proxy(function () {}, { get: () => () => '', apply: () => '' }), apply: () => '' });
  sandbox.window.VigilLore = { roles: [{}, {}, {}, {}], chapters: [] };
  const out = [];
  for (const id of chIds) {
    const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'content', id + '.js'), 'utf8');
    const ids = [...src.matchAll(/^      ([a-z0-9_]+): \{/gm)].map(m => m[1]);
    ids.forEach(s => out.push(s));
  }
  return out;
}

(async () => {
  const args = process.argv.slice(2);
  const get = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
  const chs = args.filter(a => /^ch\d$/.test(a)); if (!chs.length) chs.push('ch0', 'ch1');
  const W = +get('--w', 1280), H = +get('--h', 720);
  const ids = scenesOf(chs);
  const port = 8900 + Math.floor(Math.random() * 90);
  const srv = spawn('python3', ['-m', 'http.server', String(port)], { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 700));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await (await browser.newContext({ viewport: { width: W, height: H } })).newPage();
  await page.route('**://*.googleapis.com/**', r => r.abort());
  await page.route('**://*.gstatic.com/**', r => r.abort());
  const bad = [], shrunk = [];
  for (const id of ids) {
    await page.goto(`http://localhost:${port}/index.html?scene=${encodeURIComponent(id)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(420);
    // The text box sizes itself before a character is typed, so it can be measured at once.
    const r = await page.evaluate(() => {
      const UI = window.VigilUI, el = document.getElementById('text');
      if (!UI || !UI.lastFit || !el) return null;
      return Object.assign({}, UI.lastFit, { scroll: el.scrollHeight > el.clientHeight + 1 });
    });
    // The puzzle panel is only built once the typewriter finishes, so skip it and wait for the widget.
    await page.keyboard.press('Space');
    const wid = await page.evaluate(() => new Promise(res => {
      const t0 = Date.now(); // eslint-disable-line
      const tick = () => {
        const w = document.getElementById('widget');
        const built = w && !w.classList.contains('hidden') && w.children.length && w.scrollHeight > 40;
        if (built) return res({ over: Math.max(0, w.scrollHeight - w.clientHeight), h: w.scrollHeight, c: w.clientHeight });
        if (Date.now() - t0 > 6000) return res(null); // eslint-disable-line
        setTimeout(tick, 120);
      };
      tick();
    }));
    if (wid && wid.over > 1) bad.push(`${id}: puzzle panel scrolls, ${wid.over}px below the fold`);
    if (!r) continue;
    if (r.over > 0 || r.scroll) bad.push(`${id}: text still ${r.over}px over at ${r.size}px${r.scroll ? ' (scrolls)' : ''}`);
    else if (r.size && r.size < r.base) shrunk.push(`${id}: ${r.base}px -> ${r.size}px`);
  }
  console.log(`viewport ${W}x${H} — ${ids.length} scenes`);
  console.log(shrunk.length ? 'shrunk to fit:\n  ' + shrunk.join('\n  ') : 'shrunk to fit: none');
  console.log(bad.length ? 'STILL OVERFLOWING:\n  ' + bad.join('\n  ') : 'overflowing: none');
  console.log('(the puzzle panel does not shrink itself: anything listed above as "puzzle panel scrolls" is a real cut, not a CSS tweak)');
  await browser.close(); srv.kill(); process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('SCAN FAILED', e); process.exit(2); });
