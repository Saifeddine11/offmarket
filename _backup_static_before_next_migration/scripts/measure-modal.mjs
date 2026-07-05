import { chromium } from 'playwright';

const VIEWPORT = {
  width: Number(process.env.VIEWPORT_W || 1440),
  height: Number(process.env.VIEWPORT_H || 900),
};
const URL = process.env.MODAL_URL || 'http://127.0.0.1:8767/';

function box(el) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    width: Math.round(r.width),
    height: Math.round(r.height),
    ratio: +(r.width / r.height).toFixed(3),
    top: Math.round(r.top),
    left: Math.round(r.left),
    right: Math.round(r.right),
    bottom: Math.round(r.bottom),
  };
}

function analyze(data) {
  const cardW = data.whiteCard?.width || 0;
  const imageShare = cardW ? +((data.image.width / cardW) * 100).toFixed(1) : 0;
  const rightShare = cardW ? +((data.rightContent.width / cardW) * 100).toFixed(1) : 0;
  return { ...data, imageShare, rightShare };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: VIEWPORT });
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

await page.evaluate(() => {
  document.documentElement.classList.remove('is-arc-reveal-pending');
  const arc = document.getElementById('offmarket-arc-reveal');
  if (arc) arc.hidden = true;
});

await page.waitForSelector('[data-property-modal-trigger]', { timeout: 30000 });
await page.evaluate(() => {
  const trigger = document.querySelector('[data-property-modal-trigger]');
  if (trigger) trigger.click();
});
await page.waitForSelector('.om-property-modal.is-open', { timeout: 10000 });
await page.waitForTimeout(800);

const measurements = await page.evaluate(() => {
  const shell = document.querySelector('.om-property-modal__shell');
  const card = document.querySelector('.om-property-modal__card');
  const media = document.querySelector('.om-property-modal__media');
  const tabs = document.querySelector('.om-property-modal__tabs');
  const content = document.querySelector('.om-property-modal__content');
  const price = document.querySelector('.om-property-modal__price');
  const closeBtn = document.querySelector('.om-property-modal__close');

  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      width: Math.round(r.width),
      height: Math.round(r.height),
      ratio: +(r.width / r.height).toFixed(3),
      top: Math.round(r.top),
      left: Math.round(r.left),
      right: Math.round(r.right),
      bottom: Math.round(r.bottom),
    };
  };

  const priceBox = box(price);
  const closeBox = box(closeBtn);
  const overlap =
    priceBox &&
    closeBox &&
    !(
      priceBox.right < closeBox.left ||
      priceBox.left > closeBox.right ||
      priceBox.bottom < closeBox.top ||
      priceBox.top > closeBox.bottom
    );

  return {
    shell: box(shell),
    whiteCard: box(card),
    image: box(media),
    rightContent: box(content),
    tabs: box(tabs),
    price: priceBox,
    close: closeBox,
    priceCloseOverlap: overlap,
  };
});

const result = analyze(measurements);
console.log(JSON.stringify(result, null, 2));
await browser.close();
