import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// The normal dist stays deployable. This extra, single-file edition runs from
// Finder without a web server, network fonts, package installation or API keys.
let html = await readFile('dist/index.html', 'utf8');
const script = html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
const style = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!script || !style) throw new Error('Vite output assets could not be located.');
let js = await readFile(path.join('dist', script[1]), 'utf8');
const css = await readFile(path.join('dist', style[1]), 'utf8');
const pdf = (await readFile('dist/Palak-Pandit-Resume.pdf')).toString('base64');
js = js.replaceAll('./Palak-Pandit-Resume.pdf', `data:application/pdf;base64,${pdf}`);
const portrait = (await readFile('dist/palak-portrait.jpg')).toString('base64');
js = js.replaceAll('./palak-portrait.jpg', `data:image/jpeg;base64,${portrait}`);
// Callback replacements preserve dollar sequences in minified JavaScript.
// A replacement string would interpret sequences like $& as substitution tokens.
// Unlike Vite's module script, a classic inline script is not deferred.
// Put it after the root element so React can mount when opening the file.
html = html.replace(script[0], '');
html = html.replace('</body>', () => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`);
html = html.replace(style[0], () => `<style>${css}</style>`);
html = html.replaceAll('./Palak-Pandit-Resume.pdf', './public/Palak-Pandit-Resume.pdf');
html = html.replaceAll('./favicon.svg', './public/favicon.svg').replaceAll('./social-preview.png', './public/social-preview.png');
const notices = await readFile('public/THIRD-PARTY-NOTICES.txt', 'utf8');
html = html.replace('</html>', () => `<!--\n${notices.replaceAll('--', '—')}\n-->\n</html>`);
await writeFile('OPEN-PORTFOLIO.html', html);
console.log('Created OPEN-PORTFOLIO.html — an offline, double-click preview.');
