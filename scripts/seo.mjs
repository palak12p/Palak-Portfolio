import { readFile, writeFile } from 'node:fs/promises';

const arg = process.argv[2];
if (!arg) throw new Error('Usage: npm run seo -- https://your-public-domain.example');
const url = new URL(arg);
if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('Use your public root URL without credentials, query parameters or a hash.');
const root = url.href.replace(/\/$/, '');
const xmlEscape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
let html = await readFile('index.html', 'utf8');
html = html.replace(/\s*<link rel="canonical"[^>]*>/g, '').replace(/\s*<meta property="og:url"[^>]*>/g, '');
html = html.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${xmlEscape(root)}/social-preview.png" />`);
html = html.replace('</head>', `  <link rel="canonical" href="${xmlEscape(root)}/" />\n    <meta property="og:url" content="${xmlEscape(root)}/" />\n  </head>`);
await writeFile('index.html', html);
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${root}/sitemap.xml\n`);
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlEscape(root)}/</loc></url></urlset>\n`);
console.log('Updated canonical URL, Open Graph URL, robots.txt and sitemap.xml. Run npm run build again.');
