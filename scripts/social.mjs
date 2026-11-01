import { chromium } from 'playwright';

const paths = Array.from({ length: 28 }, (_, i) => {
  const points = [];
  for(let n = 0; n <= 160; n++) {
    const t = n / 160 * Math.PI * 2, v = i / 28 * Math.PI * 2;
    const r = 124 + 42 * Math.cos(3*t+v);
    const x = r*Math.cos(2*t), y = r*Math.sin(2*t), z = 42*Math.sin(3*t+v);
    const xx = x*Math.cos(.5)+z*Math.sin(.5), zz = -x*Math.sin(.5)+z*Math.cos(.5);
    const yy = y*Math.cos(.6)-zz*Math.sin(.6);
    points.push(`${n?'L':'M'}${(240+xx*1.12).toFixed(1)},${(224+yy*1.12).toFixed(1)}`);
  }
  return `<path d="${points.join(' ')}" fill="none" stroke="${i%7===0?'#e3ff9b':'#9caf77'}" stroke-width="${i%7===0?1.3:.65}" opacity=".7"/>`;
});
const b = await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL ? {channel:process.env.BROWSER_CHANNEL} : {})});
try {
  const p = await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await p.setContent(`<!doctype html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box}body{margin:0;background:#171916;color:#efefe5;font-family:Arial,sans-serif;padding:55px 65px}header{display:flex;justify-content:space-between;font:10px monospace;letter-spacing:2px;color:#b2bba5;border-bottom:1px solid #3a4232;padding-bottom:24px}.name{color:#d9fa77}h1{font-size:79px;font-weight:400;letter-spacing:-5px;line-height:1.03;margin:65px 0 25px;position:relative;z-index:1}em{color:#d9fa77;font-family:Georgia,serif;font-weight:400}p{font-size:17px;color:#bcc4af;line-height:1.65;position:relative;z-index:1}svg{position:absolute;right:8px;top:85px;width:550px;height:490px}footer{position:absolute;bottom:40px;font:9px monospace;letter-spacing:1.5px;color:#a6aa9c}</style></head><body><header><span class="name">PALAK PANDIT ↗</span><span>AI / ML · ENGINEERING · COMMUNITY</span></header><h1>From signal<br>to something<br><em>real.</em></h1><p>Systems that learn.<br>Communities that build.</p><svg viewBox="0 0 480 448">${paths.join('')}<circle cx="240" cy="224" r="4" fill="#d9fa77"/></svg><footer>SELECTED WORK / BENGALURU, INDIA</footer></body></html>`);
  await p.screenshot({path:'public/social-preview.png'});
  console.log('Generated public/social-preview.png at 1200 × 630.');
} finally { await b.close(); }
