import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://iphone-17-pro-max-amber.vercel.app/', { waitUntil: 'networkidle' });
  // wait for fonts/assets to load
  await page.waitForTimeout(5000);
  // scroll to the color section / product detail area
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
  await page.waitForTimeout(2000);
  const outPath = path.join(__dirname, 'img', 'iphone17.png');
  await page.screenshot({ path: outPath, fullPage: false });
  await browser.close();
  console.log('Screenshot saved to', outPath);
})();
