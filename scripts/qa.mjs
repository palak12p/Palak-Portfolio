import { chromium } from 'playwright';
import axe from 'axe-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile, stat, readdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const base = process.env.QA_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
const checks = [];
const mark = text => { checks.push(text); console.log(`PASS ${text}`); };
const noOverflow = async label => {
  // Resizing a page can cross a responsive breakpoint before its next layout.
  // Wait for the settled layout, rather than measuring the prior frame.
  await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth + 1, null, { timeout: 3000 });
  const sizes = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert(sizes.scroll <= sizes.viewport + 1, `${label}: horizontal overflow ${JSON.stringify(sizes)}`);
};
const audit = async label => {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }));
  assert.deepEqual(result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })), [], `${label}: axe violations`);
  mark(`axe WCAG A/AA and best-practice scan: ${label}, zero violations`);
};

try {
  await mkdir('screenshots', { recursive: true });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  assert.match(await page.title(), /Palak Pandit/);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('a[href="tel:+918252836961"]').count(), 1);
  assert.match(await page.locator('h1').innerText(), /Palak\s+Pandit/);
  await page.getByRole('img', { name: 'Portrait of Palak Pandit' }).evaluate(img => img.decode());
  mark('Home title, Palak name heading, loaded portrait and confirmed telephone link');

  for (const width of [320, 360, 390, 600, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    await noOverflow(`home ${width}px`);
  }
  mark('No home horizontal overflow at nine widths from 320px to 1920px');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await audit('desktop home');
  await page.screenshot({ path: 'screenshots/desktop.png', fullPage: true });
  await page.screenshot({ path: 'screenshots/hero-desktop.png' });

  for (const [name, heading] of [['Vision', 'Teaching pixels meaning.'], ['Strategy', 'A few moves ahead.'], ['Systems', 'From browse to bought.'], ['Context', 'Answers, with a source.']]) {
    await page.getByRole('tab', { name: new RegExp(name) }).click();
    assert.equal(await page.getByRole('heading', { name: heading }).count(), 1);
  }
  await page.getByRole('tab', { name: /Context/ }).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab', { name: /Vision/ }).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('End');
  assert.equal(await page.getByRole('tab', { name: /Systems/ }).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('Home');
  mark('All project tabs, arrow-key navigation, Home and End');

  for (const word of ['Build', 'Connect', 'Learn']) {
    const button = page.getByRole('button', { name: new RegExp(`0[123].*${word}`) });
    await button.click();
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
  }
  mark('All three signal-lab modes');

  const inlineIndex = page.locator('#ask-index');
  await inlineIndex.getByRole('textbox', { name: 'Ask the portfolio index' }).fill('Tell me about ChessBot');
  await inlineIndex.getByRole('button', { name: 'Submit question to the index' }).click();
  assert.match(await inlineIndex.locator('.index-answer').innerText(), /chess.*AI opponent/i);
  await inlineIndex.getByRole('button', { name: 'How does Palak bring people together?' }).click();
  assert.match(await inlineIndex.locator('.index-answer').innerText(), /200\+/);
  await inlineIndex.screenshot({ path: 'screenshots/homepage-index.png' });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await noOverflow(`homepage index answer ${width}px`);
  }
  await inlineIndex.screenshot({ path: 'screenshots/homepage-index-mobile.png' });
  await inlineIndex.getByRole('textbox', { name: 'Ask the portfolio index' }).fill('What is Palak’s favorite food?');
  await page.keyboard.press('Enter');
  assert.match(await inlineIndex.locator('.index-answer').innerText(), /don’t have verified information/);
  await page.setViewportSize({ width: 1440, height: 1000 });
  mark('Visible homepage index, typed questions, suggestion chips, keyboard submission and fallback');

  for (const id of ['gitlab-rag', 'cifar-cnn', 'chessbot', 'e-store']) {
    await page.goto(`${base}/#project/${id}`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.case-page').count(), 1);
    assert.equal(await page.locator('.pipeline>div').count(), 4);
    assert.equal(await page.locator('h1').count(), 1);
    await noOverflow(`${id} desktop`);
    await audit(`${id} case study`);
    if (id === 'gitlab-rag') await page.screenshot({ path: 'screenshots/case-study.png', fullPage: true });
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      await noOverflow(`${id} ${width}px`);
    }
    if (id === 'gitlab-rag') {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: 'screenshots/case-study-mobile.png', fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  mark('All four case-study URLs, architecture steps and mobile layouts');
  await page.goto(`${base}/#project/missing`);
  await page.getByRole('heading', { name: /right signal/ }).waitFor();
  assert.equal(await page.getByRole('heading', { name: /right signal/ }).count(), 1);
  await page.getByRole('link', { name: /Back to selected work/ }).click();
  await page.locator('#work').waitFor();
  assert.equal(await page.locator('#work').count(), 1);
  mark('Unknown-project fallback and recovery');

  await page.keyboard.press('Control+k');
  const combo = page.getByRole('combobox', { name: /Search portfolio commands/ });
  await combo.fill('chess');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('dialog').count(), 0);
  assert.match(page.url(), /#project\/chessbot/);
  await page.keyboard.press('Control+k');
  await combo.fill('does-not-exist');
  assert.equal(await page.getByText(/No matching command/).count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog').count(), 0);
  mark('Control-K, command filtering, Enter navigation, empty results and Escape');

  await page.goto(`${base}/#top`);
  await page.getByRole('button', { name: 'Ask the index', exact: true }).click();
  await audit('question-index dialog');
  const question = page.getByRole('textbox', { name: 'Ask about Palak' });
  await question.fill('What community events has she organized?');
  await page.getByRole('button', { name: 'Find an answer' }).click();
  assert.match(await page.locator('.index-answer').innerText(), /200\+/);
  await question.fill('What internships has she done?');
  await page.getByRole('button', { name: 'Find an answer' }).click();
  assert.match(await page.locator('.index-answer').innerText(), /does not list formal employment/);
  await question.fill('What is her favorite food?');
  await page.getByRole('button', { name: 'Find an answer' }).click();
  assert.match(await page.locator('.index-answer').innerText(), /don’t have verified information/);
  await page.screenshot({ path: 'screenshots/question-index.png' });
  await page.keyboard.press('Escape');
  mark('Resume-grounded Q&A, professional-experience answer and unknown-question fallback');

  await page.getByRole('button', { name: /Open portfolio commands/ }).click();
  await audit('command dialog');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open portfolio commands, Control or Command K');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Open portfolio commands, Control or Command K');
  mark('Native-dialog focus restoration');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/#top`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'People', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  assert.match(page.url(), /#people/);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  await page.goto(`${base}/#top`, { waitUntil: 'networkidle' });
  await audit('mobile home');
  await page.screenshot({ path: 'screenshots/mobile.png', fullPage: true });
  await page.screenshot({ path: 'screenshots/hero-mobile.png' });
  mark('Mobile navigation, anchor routing and Escape dismissal');
  assert.equal(await page.locator('.signal-threads').evaluate(el => getComputedStyle(el).animationName), 'none');
  mark('Reduced-motion preference disables the signal animation');

  for (const asset of ['Palak-Pandit-Resume.pdf', 'favicon.svg', 'social-preview.png', 'robots.txt']) {
    const response = await page.request.get(`${base}/${asset}`);
    assert.equal(response.status(), 200, asset);
    if (asset.endsWith('.pdf')) assert.match(response.headers()['content-type'], /pdf/);
    if (asset.endsWith('.png')) assert.match(response.headers()['content-type'], /png/);
  }
  mark('Resume, favicon, social-preview and robots assets served correctly');
  await page.getByRole('button', { name: /Open portfolio commands/ }).click();
  await page.getByRole('combobox').fill('resume');
  const downloadPromise = page.waitForEvent('download');
  await page.keyboard.press('Enter');
  const download = await downloadPromise;
  assert.match((await readFile(await download.path())).toString('ascii', 0, 4), /%PDF/);
  mark('Command-palette resume download returns a valid PDF');

  const file = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const offlineRequests = [];
  file.on('request', r => { if (/^https?:/.test(r.url())) offlineRequests.push(r.url()); });
  const offlineErrors = [];
  file.on('pageerror', e => offlineErrors.push(e.message));
  await file.goto(pathToFileURL(path.resolve('OPEN-PORTFOLIO.html')).href, { waitUntil: 'load' });
  await file.getByRole('tab', { name: /Strategy/ }).click();
  await file.getByRole('link', { name: 'Explore the build' }).click();
  assert.match(file.url(), /#project\/chessbot/);
  await file.keyboard.press('Control+k');
  await file.getByRole('combobox').fill('Contact');
  await file.keyboard.press('Enter');
  const pdfLink = file.locator('a[download]').first();
  assert.match(await pdfLink.getAttribute('href'), /^data:application\/pdf;base64,/);
  const offlineDownloadPromise = file.waitForEvent('download');
  await pdfLink.click();
  const offlineDownload = await offlineDownloadPromise;
  assert.match((await readFile(await offlineDownload.path())).toString('ascii', 0, 4), /%PDF/);
  assert.deepEqual(offlineRequests, []);
  assert.deepEqual(offlineErrors, []);
  await file.close();
  mark('Standalone file works offline, with embedded resume and zero network requests');

  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const fallback = await noJS.newPage();
  await fallback.goto(base);
  assert.equal(await fallback.getByRole('heading', { name: 'Palak Pandit', exact: true }).count(), 1);
  assert.equal(await fallback.getByRole('link', { name: 'Email Palak' }).count(), 1);
  await noJS.close();
  mark('No-JavaScript resume and contact fallback');

  assert.deepEqual(errors, [], 'Browser errors');
  mark('No browser JavaScript or console errors');
  const assetFiles = await readdir('dist/assets');
  const jsSizes = await Promise.all(assetFiles.filter(f => f.endsWith('.js')).map(async f => (await stat(`dist/assets/${f}`)).size));
  const summary = { checkedAt: new Date().toISOString(), browser: browser.version(), base, checks, consoleErrors: errors, jsBytes: jsSizes.reduce((a,b)=>a+b,0) };
  await writeFile('screenshots/qa-results.json', JSON.stringify(summary, null, 2) + '\n');
  console.log(`\n${checks.length} check groups passed.`);
} finally {
  await context.close();
  await browser.close();
}
