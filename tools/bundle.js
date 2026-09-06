/* Bundle the Hearth and the Companion into single-file HTML pages (everything inlined) so they can be hosted anywhere
   that serves one HTML file — an artifact host, a pastebin, an email attachment.
   Usage: node tools/bundle.js [--companion-url URL] [--out dist]
   Produces dist/hearth.html and dist/companion.html. The Google Fonts stylesheet link is kept (with fallbacks). */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const outDir = path.resolve(root, get('--out') || 'dist');
const companionUrl = get('--companion-url');
fs.mkdirSync(outDir, { recursive: true });

function bundle(file, injectHead) {
  let html = fs.readFileSync(path.join(root, file), 'utf8');
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, href) => {
    if (/^https?:/.test(href)) return m;
    let css = fs.readFileSync(path.join(root, href), 'utf8');
    // hoist @import lines (Google Fonts) to a <link> so they stay valid inside a <style>
    const imports = [];
    css = css.replace(/@import url\('([^']+)'\);\s*/g, (mm, u) => { imports.push(u); return ''; });
    return imports.map(u => `<link rel="stylesheet" href="${u}">`).join('\n') + `\n<style>\n${css}\n</style>`;
  });
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    if (/^https?:/.test(src)) return m;
    const js = fs.readFileSync(path.join(root, src), 'utf8').replace(/<\/script/gi, '<\\/script');
    return `<script>/* ${src} */\n${js}\n</script>`;
  });
  if (injectHead) html = html.replace('</head>', injectHead + '\n</head>');
  return html;
}

const hearthInject = companionUrl ? `<script>window.COMPANION_URL = ${JSON.stringify(companionUrl)};</script>` : '';
/* --artifact: emit page fragments for hosts that wrap the file in their own <html>/<head>/<body> skeleton
   (title, font link and styles first, then the markup and scripts; no doctype/html/head/body/meta/favicon). */
const artifact = args.includes('--artifact');
function fragment(html) {
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1], body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  const keep = head.replace(/<meta[^>]*>\s*/g, '').replace(/<link rel="icon"[^>]*>\s*/g, '');
  return keep.trim() + '\n' + body.trim() + '\n';
}
const H = bundle('index.html', hearthInject), C = bundle('companion.html', '');
fs.writeFileSync(path.join(outDir, 'hearth.html'), artifact ? fragment(H) : H);
fs.writeFileSync(path.join(outDir, 'companion.html'), artifact ? fragment(C) : C);
if (args.includes('--host-sim')) {
  const wrap = (frag) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui;background:#f6f5f1}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n${frag}</body></html>`;
  fs.writeFileSync(path.join(outDir, 'hearth-hosted.html'), wrap(fragment(H)));
  fs.writeFileSync(path.join(outDir, 'companion-hosted.html'), wrap(fragment(C)));
}
for (const f of ['hearth.html', 'companion.html']) console.log(f, Math.round(fs.statSync(path.join(outDir, f)).size / 1024) + ' KB');
