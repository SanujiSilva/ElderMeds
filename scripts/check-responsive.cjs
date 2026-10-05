// Run against a local Chrome debugging session: node scripts/check-responsive.cjs
// No packages required; uses the WebSocket and fetch APIs in Node 22+.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const pages = await (await fetch('http://127.0.0.1:9231/json')).json();
  const page = pages.find(page => page.type === 'page');
  assert(page, 'Chrome must have a page open');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const errors = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (pending.has(message.id)) {
      const { resolve, reject, timer } = pending.get(message.id);
      clearTimeout(timer);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    const timer = setTimeout(() => { pending.delete(next); reject(new Error('CDP timed out: ' + method)); }, 10000);
    pending.set(next, { resolve, reject, timer });
    socket.send(JSON.stringify({ id: next, method, params }));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  try {
    await send('Runtime.enable');
    await send('Page.enable');
    const motionEnabled = process.argv.includes('--motion');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: motionEnabled ? 'no-preference' : 'reduce' }] });
    for (const width of [320, 390, 768, 1024, 1440]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      await send('Page.navigate', { url: 'http://localhost:4173/' });
      for (let attempt = 0; attempt < 50; attempt++) {
        if (await evaluate("document.readyState === 'complete' && !!document.querySelector('.preview-top')")) break;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await evaluate(`Promise.all([...document.images].map(image => { image.loading = 'eager'; return image.decode().catch(() => {}); }))`);
      if (motionEnabled) {
        await evaluate(`Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})))`);
        assert(await evaluate(`getComputedStyle(document.querySelector('.hero h1')).opacity === '1' && getComputedStyle(document.querySelector('.hero-copy')).opacity === '1'`), 'Hero must remain visible after entrance animations');
      }
      const layout = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
        overflow: [...document.querySelectorAll('body *')].filter(e => { const r=e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && getComputedStyle(e).position !== 'absolute' && !e.closest('.brand-mark'); }).slice(0,10).map(e=>e.className) })`);
      assert.equal(layout.width, width, 'Viewport must match requested width');
      assert(layout.scrollWidth <= width, `Overflow at ${width}: ${JSON.stringify(layout)}`);
      assert.equal(layout.brokenImages.length, 0, 'Broken images: ' + layout.brokenImages.join(', '));
      if (width < 1221) {
        assert(await evaluate(`(() => { const b=document.querySelector('.nav-toggle'); b.click(); return b.getAttribute('aria-expanded') === 'true' && getComputedStyle(document.querySelector('.nav-links')).display !== 'none'; })()`), 'Mobile menu opens');
        await evaluate(`document.querySelector('.nav-links a[href="#documents"]').click()`);
        assert(await evaluate(`document.querySelector('.nav-toggle').getAttribute('aria-expanded') === 'false'`), 'Menu closes after navigation');
      }
      for (const key of ['safety','wellbeing','records','intake']) {
        assert(await evaluate(`(() => { document.querySelector('[data-view="${key}"]').click(); return document.querySelector('#experience-panel').getAttribute('aria-labelledby') === 'tab-${key}'; })()`), 'Walkthrough tab: '+key);
      }
      await evaluate('window.scrollTo(0,0)');
      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(os.tmpdir(), `eldermeds-brand-${width}.png`), Buffer.from(screenshot.data, 'base64'));
      if (width === 390) {
        await evaluate("document.querySelector('#experience').scrollIntoView()");
        const detail = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(os.tmpdir(), 'eldermeds-brand-mobile-walkthrough.png'), Buffer.from(detail.data, 'base64'));
      }
      if (width === 390 || width === 1440) {
        await evaluate("document.querySelector('#gap').scrollIntoView()");
        const gap = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(os.tmpdir(), `eldermeds-gap-${width}.png`), Buffer.from(gap.data, 'base64'));
      }
      console.log(`PASS ${width}px: no page overflow, images loaded, navigation and walkthrough work`);
    }
    assert.equal(errors.length, 0, 'Browser exceptions: ' + errors.join(', '));
    console.log('PASS: no browser JavaScript exceptions. Screenshots saved to the OS temporary directory.');
  } finally { socket.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
