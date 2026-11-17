import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from 'vite';

const cases = [
  ['frame-noir', 'Cut after dark', 'Pleated trouser'],
  ['studio-object', 'A closer look', 'Everyday overshirt'],
  ['city-edit', 'Between addresses', 'Straight denim'],
  ['hybrid', 'Study in charcoal', 'Pleated trouser'],
];

const output = process.env.SHOP_CITY_EVIDENCE ?? 'evidence';
await mkdir(output, { recursive: true });
const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true } });
let browser;

try {
  browser = await chromium.launch(process.env.SHOP_CITY_EDGE ? {
    executablePath: process.env.SHOP_CITY_EDGE
  } : { channel: 'msedge' });
  console.log('Edge Chromium ' + browser.version());

  for (const [variant, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({
      viewport, deviceScaleFactor: 1, isMobile: variant === 'mobile', hasTouch: variant === 'mobile',
    });

    for (const [slug, headline, secondProduct] of cases) {
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.status() >= 400) errors.push(response.status() + ' ' + response.url());
      });

      const url = 'http://127.0.0.1:4173/concepts/' + slug;
      const response = await page.goto(url);
      assert.equal(response?.status(), 200);
      assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim(), headline);
      assert.equal(await page.locator('.card').count(), 3);
      assert.equal(await page.locator('#editorial').isVisible(), true);
      assert.equal(await page.locator('#product').isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), viewport.width);
      const cta = page.locator('.cta');
      if (slug === 'hybrid') {
        assert.equal(await page.getByRole('navigation', { name: 'All concepts' }).getByRole('link').count(), 4);
        assert.equal(await page.locator('#collection').getByText('749 000 UZS').isVisible(), true);
      }
      const ctaBox = await cta.boundingBox();
      assert.ok(ctaBox && ctaBox.y + ctaBox.height <= viewport.height, 'CTA fits in first view');

      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const media of document.images) {
          media.loading = 'eager';
          await media.decode();
        }
      });
      if (slug === 'hybrid') {
        const study = page.locator('.hybrid-study-image');
        const mask = () => study.evaluate((element) => {
          const style = getComputedStyle(element, '::after');
          return { name: style.animationName, scale: style.transform === 'none' ? null : new DOMMatrixReadOnly(style.transform).a };
        });
        const scrollToEntry = (progress) => study.evaluate((element, { progress, edge }) => {
          const box = element.getBoundingClientRect();
          window.scrollBy(0, box.top - innerHeight * edge + box.height * progress);
        }, { progress, edge: variant === 'mobile' ? .76 : 1 });
        await scrollToEntry(0.62);
        await page.waitForFunction(() => {
          const style = getComputedStyle(document.querySelector('.hybrid-study-image'), '::after');
          if (style.transform === 'none') return false;
          const scale = new DOMMatrixReadOnly(style.transform).a;
          return scale > .20 && scale < .38;
        });
        const entering = await mask();
        assert.equal(entering.name, 'lift-studio-shadow');
        if (variant === 'desktop') await page.screenshot({ path: output + '/hybrid-transition-desktop.png' });
        await scrollToEntry(0.96);
        await page.waitForFunction(() => {
          const value = getComputedStyle(document.querySelector('.hybrid-study-image'), '::after').transform;
          return value !== 'none' && new DOMMatrixReadOnly(value).a < .01;
        });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.deepEqual(await mask(), { name: 'none', scale: null });
        if (variant === 'desktop') {
          await scrollToEntry(0.62);
          await page.screenshot({ path: output + '/hybrid-transition-reduced-desktop.png' });
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: output + '/hybrid-' + variant + '-fold.png' });
        console.log('PASS hybrid ' + variant + ' · native scroll mask entry scale ' + entering.scale.toFixed(2) + ', fully released, reduced-motion mask absent');
      }
      const filename = output + '/' + slug + '-' + variant + '.png';
      await page.screenshot({ path: filename, fullPage: true, animations: 'disabled' });

      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.skip').evaluate((element) => element === document.activeElement), true);
      await cta.click();
      assert.equal(new URL(page.url()).hash, '#collection');
      const secondCard = page.locator('.card').nth(1);
      if (slug === 'hybrid') {
        await secondCard.focus();
        await page.keyboard.press('Enter');
      } else {
        await secondCard.click();
      }
      assert.equal(new URL(page.url()).hash, '#product');
      assert.equal(await page.locator('#product-title').innerText(), secondProduct);
      assert.equal(await page.locator('#product-title').evaluate((element) => element === document.activeElement), true);
      const size = page.getByRole('radio').nth(1);
      await size.locator('..').click();
      assert.equal(await size.isChecked(), true);
      assert.match(await page.getByRole('status').innerText(), /Sample availability/);
      assert.equal(await page.getByRole('status').innerText(), (await size.getAttribute('value')) + ' · Sample availability');

      if (variant === 'desktop') {
        if (slug === 'studio-object') {
          const gallery = page.locator('.detail-visual');
          assert.equal(await gallery.evaluate((element) => getComputedStyle(element).animationName), 'studio-reveal');
          await page.emulateMedia({ reducedMotion: 'reduce' });
          assert.equal(await gallery.evaluate((element) => getComputedStyle(element).animationName), 'none');
          await page.emulateMedia({ reducedMotion: 'no-preference' });
        }
        if (slug === 'hybrid') await page.emulateMedia({ reducedMotion: 'no-preference' });
        const arrow = cta.locator('span');
        await cta.hover();
        await page.waitForFunction(() => getComputedStyle(document.querySelector('.cta span')).transform !== 'none');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await arrow.evaluate((element) => getComputedStyle(element).transform), 'none');
        assert.equal(await arrow.evaluate((element) => getComputedStyle(element).transitionDuration), '0s');
      }

      if (slug === 'city-edit') {
        await page.locator('.look-index a').last().click();
        assert.equal(await page.locator('#product-title').innerText(), 'Canvas shoulder bag');
      }
      assert.deepEqual(errors, []);
      console.log('PASS ' + slug + ' ' + viewport.width + 'x' + viewport.height +
        ' · images, CTA, keyboard focus, product selection, size, no overflow or request errors' +
        (variant === 'desktop' ? ', normal and reduced motion' : '') + ' · ' + filename);
      await page.close();
    }
    await context.close();
  }
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()));
}
