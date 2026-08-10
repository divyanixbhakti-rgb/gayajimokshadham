import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:5173/',
  pretendToBeVisual: true,
});
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.SVGElement = dom.window.SVGElement;
global.CustomEvent = dom.window.CustomEvent;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.requestAnimationFrame = dom.window.requestAnimationFrame;
global.localStorage = dom.window.localStorage;
global.Audio = class { play() { return Promise.resolve(); } pause(){} set currentTime(v){} set volume(v){} };
global.window.matchMedia = (q) => ({ matches: false, media: q, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
global.IntersectionObserver = class { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } };
global.ResizeObserver = class { constructor(){} observe(){} unobserve(){} disconnect(){} };
global.scrollTo = () => {};
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

const { default: React } = await import('react');
const { default: ReactDOM } = await import('react-dom/client');
const { default: i18n } = await import('./src/i18n/i18n.js');
const { default: App } = await import('./src/App.jsx');

const errors = [];
const origErr = console.error;
console.error = (...a) => errors.push(a.join(' '));

let fail = 0;
const expect = (name, cond) => {
  console.log((cond ? 'PASS' : 'FAIL') + ' — ' + name);
  if (!cond) fail++;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
const snapshot = () => document.body.textContent || '';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await wait(1200); // initial mount

const navigate = async (path) => {
  dom.window.history.pushState(null, '', path);
  dom.window.dispatchEvent(new dom.window.PopStateEvent('popstate'));
  await new Promise((r) => setTimeout(r, 800));
};

const LANG_MARKERS = {
  hi: ['गया जी पितृपक्ष सेवा', 'पिंडदान बुक करें', 'वेदी निर्देशिका'],
  en: ['Gaya Ji Pitrapaksh Seva', 'Book Pind Daan', 'Vedi Directory'],
  bn: ['গয়া জি পিতৃপক্ষ সেবা', 'পিণ্ডদান বুক করুন', 'বেদি নির্দেশিকা'],
  gu: ['ગયા જી પિતૃપક્ષ સેવા', 'પિંડદાન બુક કરો', 'વેદી નિર્દેશિકા'],
  pa: ['ਗਯਾ ਜੀ ਪਿਤਰ ਪੱਖ ਸੇਵਾ', 'ਪਿੰਡ ਦਾਨ ਬੁੱਕ ਕਰੋ', 'ਵੇਦੀ ਨਿਰਦੇਸ਼ਿਕਾ'],
};

for (const lang of ['hi', 'en', 'bn', 'gu', 'pa']) {
  i18n.changeLanguage(lang);
  await wait(400);
  const text = snapshot();
  for (const marker of LANG_MARKERS[lang]) {
    expect(`[${lang}] renders "${marker}"`, text.includes(marker));
  }
}

// Route navigation smoke tests (HashRouter)
i18n.changeLanguage('hi');
await wait(300);
await navigate('/booking');
expect('Route #/booking shows booking form', document.body.textContent.includes('यजमान का नाम'));
await navigate('/pitrapaksha');
expect('Route #/pitrapaksha shows calendar', document.body.textContent.includes('सर्वपितृ अमावस्या'));
await navigate('/knowledge');
expect('Route #/knowledge shows FAQ', document.body.textContent.includes('पूछे जाने वाले प्रश्न'));
await navigate('/vedis');
expect('Route #/vedis shows vedi grid', document.body.textContent.includes('ब्रह्मकुंड वेदी'));
await navigate('/gallery');
expect('Route #/gallery shows gallery', document.body.textContent.includes('दर्शन चित्र'));
await navigate('/does-not-exist');
expect('Unknown route → 404 page', document.body.textContent.includes('पृष्ठ नहीं मिला'));
await navigate('/');


// ── Interaction tests ─────────────────────────────────
// Dark mode toggle
const themeBtn = [...document.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || '').includes('Ratrikal') || (b.getAttribute('aria-label') || '').includes('रात्रिकाल') || (b.getAttribute('aria-label') || '').includes('ਰਾਤਰੀਕਾਲ'));
if (themeBtn) themeBtn.click();
await wait(300);
expect('Dark mode toggles .dark class', document.documentElement.classList.contains('dark'));

// SEO: title + meta description update per route (Hindi)
i18n.changeLanguage('hi');
await wait(300);
await navigate('/booking');
expect('Document title updates on route', document.title.includes('बुकिंग'));
const descEl = document.querySelector('meta[name="description"]');
expect('Meta description updates on route', !!descEl && descEl.content.includes('एक ही स्थान पर संपूर्ण व्यवस्था'));

// Booking form fill + submit (with validation)
await navigate('/booking');
i18n.changeLanguage('hi');
await wait(300);
const setVal = (el, v) => {
  const proto = el.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
  el.dispatchEvent(new window.Event('input', { bubbles: true }));
  el.dispatchEvent(new window.Event('change', { bubbles: true }));
};
const byLabel = (label) => {
  const labels = [...document.querySelectorAll('label')];
  const l = labels.find((x) => x.textContent.trim().startsWith(label));
  return l ? l.nextElementSibling : null;
};
const submitBtn = () => [...document.querySelectorAll('button')].find((b) => b.textContent.includes('बुकिंग अनुरोध भेजें'));

const d = new Date();
const fmtIso = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
const pastISO = fmtIso(new Date(d.getTime() - 5 * 86400000));
const farFutureISO = fmtIso(new Date(d.getTime() + 200 * 86400000));
const validFutureISO = fmtIso(new Date(d.getTime() + 7 * 86400000));

// 1) invalid phone + past date + invalid email → validation errors, no chooser
setVal(byLabel('यजमान का नाम'), 'राम कुमार शर्मा');
setVal(byLabel('मोबाइल नंबर'), '12345');
setVal(byLabel('ईमेल'), 'a@b'); // passes native type=email, fails our stricter dot rule
setVal(byLabel('वांछित तिथि'), pastISO);
setVal(byLabel('वेदी / विधान चुनें'), 'ekodrishti');
await wait(200);
submitBtn().click();
await wait(400);
expect('Invalid phone shows 10-digit validation error', document.body.textContent.includes('10 अंकों का मोबाइल नंबर'));
expect('Invalid email shows validation error', document.body.textContent.includes('सही ईमेल'));
expect('Past date shows validation error', document.body.textContent.includes('आज या भविष्य की तिथि'));
expect('No chooser with invalid data', !document.body.textContent.includes('अपनी पूछताछ कैसे भेजें'));

// 2) future date beyond 90 days → error
setVal(byLabel('वांछित तिथि'), farFutureISO);
await wait(200);
submitBtn().click();
await wait(300);
expect('Date beyond 90 days shows validation error', document.body.textContent.includes('आज या भविष्य की तिथि'));

// 3) phone input caps at 10 digits even if more typed
setVal(byLabel('मोबाइल नंबर'), '9123171655099'); // 13 digits
const phoneVal = byLabel('मोबाइल नंबर').value;
expect('Phone field holds max 10 digits', phoneVal.length === 10 && phoneVal === '9123171655');

// 4) valid details → chooser with WhatsApp + Email options
setVal(byLabel('मोबाइल नंबर'), '9123171655');
setVal(byLabel('ईमेल'), 'test@example.com');
setVal(byLabel('वांछित तिथि'), validFutureISO);
await wait(200);
submitBtn().click();
await wait(500);
expect('Chooser asks how to send', document.body.textContent.includes('अपनी पूछताछ कैसे भेजें'));
expect('WhatsApp option present', document.body.innerHTML.includes('wa.me/919123171655'));
expect('Email option present', document.body.innerHTML.includes('mailto:DivyaNix.bhakti@gmail.com'));
expect('Edit form option present', document.body.textContent.includes('फॉर्म वापस संपादित करें'));

// 5) Edit goes back to the form
const editBtn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('फॉर्म वापस संपादित करें'));
editBtn.click();
await wait(300);
expect('Edit returns to form', document.body.textContent.includes('यजमान का नाम'));

// Gallery lightbox
await navigate('/gallery');
i18n.changeLanguage('hi');
await wait(400);
const firstImg = document.querySelector('#gallery button img, section button img');
if (firstImg) {
  firstImg.closest('button').click();
  await wait(400);
  expect('Lightbox opens with image', !!document.querySelector('img[src*="assets/"]') && document.body.textContent.includes('/ 12'));
}

// SEO files must exist in the built dist/ (copied from public/)
import { existsSync, readFileSync } from 'node:fs';
expect('dist/robots.txt exists', existsSync('dist/robots.txt'));
expect('dist/sitemap.xml exists', existsSync('dist/sitemap.xml'));
const robots = readFileSync('dist/robots.txt', 'utf8');
expect('robots.txt allows crawling', robots.includes('Allow: /') && robots.includes('Sitemap:'));
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
expect('sitemap.xml lists the production domain', sitemap.includes('GayaJiPindDaan.com'));
expect('dist/.htaccess exists (Hostinger SPA rewrite)', existsSync('dist/.htaccess'));

const realErrors = errors.filter((e) => !/Warning:|Download the React DevTools|not wrapped in act|Future Flag|scrollTo/i.test(e));
console.log(`\nconsole.error (filtered): ${realErrors.length}`);
realErrors.slice(0, 8).forEach((e) => console.log('  ⚠', e.slice(0, 260)));
process.exit(fail || realErrors.length ? 1 : 0);
