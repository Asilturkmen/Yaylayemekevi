/**
 * Yayinlanacak build'i gercek bir tarayicida acip dogrular:
 *   - sayfa render oluyor mu, konsol hatasi var mi
 *   - hangi gorsel turevi seciliyor, hepsi yukleniyor mu
 *   - mobilde yatay tasma var mi
 *   - 404 veren istek var mi
 *
 * Kullanim:
 *   npm run build
 *   npx vite preview --port 4173 &
 *   npm run smoke
 *
 * Tarayici yolu CHROME_PATH ortam degiskeni ile degistirilebilir.
 */
import puppeteer from 'puppeteer-core';

const BROWSER =
  process.env.CHROME_PATH ||
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.env.SMOKE_URL || 'http://localhost:4173';
/** Her dil kendi URL'inde yayinlanir. */
const PAGES = ['/', '/en/', '/ru/'];

const VIEWPORTS = [
  { label: 'mobil', width: 390, height: 844 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'masaustu', width: 1440, height: 900 },
];

const browser = await puppeteer.launch({
  executablePath: BROWSER,
  headless: 'new',
  args: ['--no-sandbox'],
});

let failures = 0;

for (const page_path of PAGES)
  for (const { label, width, height } of VIEWPORTS) {
  const page = await browser.newPage();
  const errors = [];
  const notFound = [];

  page.on('pageerror', (e) => errors.push('JS hatasi: ' + e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push('konsol: ' + m.text()));
  page.on('response', (r) => r.status() === 404 && notFound.push(new URL(r.url()).pathname));

  await page.setViewport({ width, height });
  await page.goto(BASE + page_path, { waitUntil: 'networkidle0', timeout: 30000 });

  // Lazy gorselleri tetiklemek icin sayfayi bastan sona kaydir.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const overflowing = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vw + 0.5 || r.left < -0.5) {
        overflowing.push(
          `<${el.tagName.toLowerCase()}> ${Math.round(r.left)}..${Math.round(r.right)} ` +
            `class="${(el.className ?? '').toString().slice(0, 60)}"`
        );
      }
    }
    return {
      vw,
      scrollW: document.documentElement.scrollWidth,
      h1: document.querySelector('h1')?.textContent?.trim() ?? null,
      lang: document.documentElement.lang,
      navFirst: document.querySelector('nav ul li a')?.textContent?.trim() ?? null,
      sections: document.querySelectorAll('section').length,
      overflowing: overflowing.slice(0, 5),
      broken: [...document.images]
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => i.alt || i.src || '(kaynaksiz img)'),
      loaded: [...document.images].length,
    };
  });

  const problems = [];
  if (!report.h1) problems.push('h1 bulunamadi - sayfa render olmamis olabilir');
  if (report.scrollW > report.vw)
    problems.push(`yatay tasma: ${report.scrollW}px > ${report.vw}px -> ${report.overflowing.join(' | ')}`);
  if (report.broken.length) problems.push('yuklenmeyen gorsel: ' + report.broken.join(', '));
  if (notFound.length) problems.push('404: ' + [...new Set(notFound)].join(', '));
  problems.push(...errors);

  console.log(`\n[${label} ${width}x${height}] ${report.sections} section, ${report.loaded} gorsel`);
  if (problems.length) {
    failures += problems.length;
    for (const p of problems) console.log('  ! ' + p);
  } else {
    console.log('  hepsi temiz');
  }

  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} sorun bulundu.` : '\nSorun bulunamadi.');
process.exit(failures ? 1 : 0);
