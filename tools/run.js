/* Headless runner for a chapter: node tools/run.js <sceneId> [--flags A,B] [--set K=v,K2=v2] [--shots dir] [--steps N]
   Loads index.html?scene=..., reports console errors/page errors, takes a screenshot, and prints the visible text/actions.
   Use tools/play.js for scripted click-throughs. */
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) { ({ chromium } = require('/tmp/claude-0/-home-user-puzzle-game/6c53366b-c261-5c1b-b535-5225f4be0786/scratchpad/node_modules/playwright-core')); }
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const args = process.argv.slice(2); const scene = args[0];
  const get = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
  const port = 8700 + Math.floor(Math.random() * 200);
  const srv = spawn('python3', ['-m', 'http.server', String(port)], { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 700));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 860 } })).newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' && !/ERR_CONNECTION|fonts.googleapis|net::/.test(m.text())) errors.push('[console] ' + m.text()); });
  page.on('pageerror', e => errors.push('[pageerror] ' + e.message));
  let url = `http://localhost:${port}/index.html?scene=${encodeURIComponent(scene)}`;
  if (get('--flags')) url += '&flags=' + get('--flags'); if (get('--set')) url += '&set=' + get('--set');
  await page.goto(url); await page.waitForTimeout(1500); await page.keyboard.press('Space'); await page.waitForTimeout(800);
  const shots = get('--shots'); if (shots) await page.screenshot({ path: path.join(shots, scene.replace(/[^a-z0-9_]/gi, '_') + '.png') });
  const text = await page.evaluate(() => ({ text: document.getElementById('text').innerText.slice(0, 1200), actions: Array.from(document.querySelectorAll('#actions button')).map(b => b.innerText.trim()), widget: document.getElementById('widget').innerText.slice(0, 400) }));
  console.log(JSON.stringify({ scene, errors, ...text }, null, 1));
  await browser.close(); srv.kill();
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error('RUN FAILED', e); process.exit(2); });
