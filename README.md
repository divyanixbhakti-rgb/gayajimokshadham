# 🪔 Gaya Ji Pitrapaksh Seva — GayaJiPindDaan.com

A production-grade, fully responsive **Hindu pilgrimage web application** for Pind Daan, Tarpan and Shraddha services at **Vishnupad Temple, Gaya (Bihar)** — built with React + Vite + Tailwind CSS.

> **Pitru Paksha 2026: 26 September – 10 October 2026** (Sarva Pitri Amavasya on 10 Oct)

---

## 🚀 THIS BRANCH = HOSTINGER DEPLOYMENT

This `hostinger` branch is configured for **Hostinger shared hosting with your own domain** (e.g. `GayaJiPindDaan.com`):

- **Clean URLs** — `BrowserRouter` (no `#` in links): `https://yourdomain.com/booking`, `/vedis`, …
- **Absolute asset paths** — `vite.config.js` uses `base: '/'`
- **`.htaccess` included** — SPA routing rewrite (no 404 on refresh/deep links), HTTPS redirect (commented until SSL is on), caching + gzip, security headers
- **Production SEO** — `sitemap.xml` lists every page; `robots.txt`, canonical URL, hreflang, Open Graph and JSON-LD all point at `https://GayaJiPindDaan.com/` (⚠️ *placeholder — update when you buy the domain*)

> The GitHub Pages version of this code lives on the `arena/019fecbc-gayajimokshadham` branch (HashRouter + relative paths).

### How to deploy to Hostinger (from your phone, no coding needed)

The `dist/` folder in this repository is **already built** — you can upload it directly:

1. **Buy your domain** (e.g. from Hostinger) and attach it to your hosting plan in hPanel (Hostinger usually asks you to set nameservers once).
2. In hPanel → **Websites → your site → File Manager** (or FTP/SSH), open **`public_html`**.
3. **Upload the contents of `dist/`** (the folder, index.html, assets/, .htaccess, robots.txt, sitemap.xml, favicon) into `public_html`. On mobile: download this repository as ZIP → extract → upload.
4. In hPanel → **Security → SSL** → enable the free Let's Encrypt certificate for your domain, then uncomment the HTTPS-redirect lines in `.htaccess`.
5. Open your domain — the site is live with clean URLs.

**When your domain is final, update these files** (search for `GayaJiPindDaan.com`):
- `index.html` — canonical, Open Graph, hreflang, JSON-LD
- `public/sitemap.xml` and `public/robots.txt`
Then run `npm run build` and re-upload `dist/`.

### Hostinger commands (for a computer with Node)

```bash
npm install
npm run build     # fresh build into dist/
npm test          # 41 smoke tests (languages, routes, validation, SEO files)
```



---

## ✨ Features

| Section | Highlights |
| --- | --- |
| **Header** | Sticky nav, animated Panchang ticker, 5-language dropdown, Ratrikal dark-mode toggle |
| **Hero** | Vishnupad visual, animated temple bell with synthesized chime, stats, CTAs |
| **Sacred Stories** | Gaya Asur timeline (7 eras) + Sita Mata's 5 Witnesses (Panch Sakshi) cards |
| **Step Guide** | 7-step Pind Daan visual stepper (Sankalp → Kshamapan) |
| **Gallery** | Masonry gallery, 4 category filters, full lightbox (prev/next, keyboard-free tap) |
| **Vedi Directory** | 14 sacred vedis (13 classical + Brahma Sarovar) with deity, rites, Google-Maps modal & directions |
| **Booking Engine** | 4 tabs (Pind Daan / Pandit / Cab / Hotel), live summary, validation, WhatsApp deep-link, no-advance trust badges |
| **Pitru Paksha 2026** | Live countdown, 15-day tithi calendar, crowd forecast chart, daily muhurats (Gaya) |
| **Knowledge Hub** | 5 Garuda Purana & Gaya Mahatmya articles + **54 FAQs** in 6 categories with search |
| **Footer** | Centralised contact config, timings, social links, floating WhatsApp button |

## 🌐 i18n — 5 languages

Hindi (default) · English · Bengali · Gujarati · Punjabi — with Hindi→English fallback chain.

- UI chrome: `src/i18n/locales/{hi,en,bn,gu,pa}.json`
- Long-form content (vedis, stories, steps, articles, 54 FAQs): authored per-language in `src/data/*`

## 🎨 Design system

- **Palette:** Saffron `#D9531E` · Golden `#E5A93C` · Maroon `#58111A` · Sandstone `#F5EBE0` · Parchment `#FDFBF7` · Charcoal `#211C1D`
- **Ratrikal dark mode:** `#0C101C` background, glowing brass highlights
- **Motifs:** CSS-swinging temple bell, Om/lotus SVG dividers, manuscript texture, shimmer text, floating ॐ
- **Fonts:** Cinzel · Rozha One · Plus Jakarta Sans (+ Noto Sans for Bengali/Gujarati/Gurmukhi)

## 🛠 Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · react-router-dom (BrowserRouter, clean URLs) · react-i18next · Framer Motion · Lucide icons · Context API (theme)

## 📁 Project structure

```
├── public/                        # .htaccess, favicon, images, bell chime audio,
│                                  # robots.txt, sitemap.xml (copied to dist/)
├── dist/                          # PRE-BUILT production bundle — upload to public_html
├── scripts/json-loader.mjs        # node loader for the smoke test
├── smoke.test.mjs                 # jsdom smoke test (41 checks)
└── src/
    ├── components/                # Header, Hero, SacredStories, StepGuide, Gallery,
    │                              # VediDirectory, BookingEngine, Pitrapaksha,
    │                              # KnowledgeHub, ContactFooter, TempleBell + shared
    ├── context/ThemeContext.jsx   # Ratrikal dark-mode
    ├── i18n/                      # i18next setup + 5 locales
    ├── data/                      # vedis (14), gallery, 54 FAQs, stories, steps,
    │                              # articles, pitru paksha 2026, contact config
    └── pages/HomePage.jsx
```

## 🚀 Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # jsdom smoke test (languages, routes, dark mode, booking, lightbox)
npm run build      # static bundle → dist/
npm run preview    # serve the production build
```

## ☁️ Deployment

This branch is for **Hostinger** — see the **"THIS BRANCH = HOSTINGER DEPLOYMENT"** section at the top for the full step-by-step guide (upload `dist/` contents to `public_html`).

> Looking for the GitHub Pages version? That lives on the `arena/019fecbc-gayajimokshadham` branch (HashRouter + relative paths, no `.htaccess` needed).

## ✏️ Contact details

All contact details are centralised in **`src/data/contactConfig.js`** — edit once, everywhere updates:

- 📞 Phone / WhatsApp: **+91 91231 71655** (`wa.me/919123171655`)
- ✉️ Enquiry email (booking form + footer): **DivyaNix.bhakti@gmail.com**

The booking form validates Indian mobile numbers (**exactly 10 digits, starting with 6–9** — no prefix/spaces allowed, input capped at 10 digits), email format, and a preferred date **between today and 90 days ahead**. On "Send Request" the visitor picks a delivery method — **WhatsApp** (deep-link to `wa.me/919123171655`) or **Email** (`mailto:DivyaNix.bhakti@gmail.com`) — both opening with the validated enquiry pre-filled. The site ships with a demo disclaimer; verify tithi timings and prices with the seva desk.

## 📜 Content sources

- Pitru Paksha 2026 tithi calendar cross-checked with public panchanga listings (26 Sep – 10 Oct 2026).
- Vedi names/rites per Gaya pind-daan tradition (Vishnupad, Falgu, Akshayavat, Gayasir, Dakshin/Uttar Manas, Pretshila, Brahmakund, Ramshila, Kakbali, Sita Kund, Gaya Kup, Gadhadhar, Brahma Sarovar).
- Stories & articles from Gaya Mahatmya / Garuda Purana tradition (Vana Parva, Karna legend).

## 🔍 Search engine visibility (SEO)

Already built into the site:

- `public/sitemap.xml` + `public/robots.txt` (auto-copied into `dist/` on build)
- `src/components/Seo.jsx` — updates `<title>`, meta description, OG tags and `<html lang>` per route & language
- Canonical URL, Open Graph + Twitter cards, `hreflang` for the 5 languages, JSON-LD structured data (`LocalBusiness` + `WebSite`) in `index.html`
- Semantic HTML, descriptive image `alt` texts, responsive/mobile-friendly layout

**To get indexed by Google (one-time, needs your Google account):**

1. After your domain is live, go to https://search.google.com/search-console → **Add property** → choose **URL prefix** → paste `https://GayaJiPindDaan.com/` (or your final domain).
2. Choose the **HTML tag** verification method — it shows a `<meta name="google-site-verification" content="...">` tag. Send that tag to the developer and it can be added to `index.html` and redeployed (DNS/alternative methods also work).
3. After verification: **Sitemaps** (left menu) → submit `sitemap.xml` → visit **URL Inspection** with the site URL → **Request Indexing**.
4. Indexing usually takes a few days to a few weeks.

**Bing** (also powers DuckDuckGo): https://www.bing.com/webmasters → sign in with a Microsoft/Google account → add site → submit `sitemap.xml` (option: import your verified sites from Google Search Console with one click).

**Remember:** before going live, replace the `GayaJiPindDaan.com` placeholder in `index.html` (canonical/OG/hreflang/JSON-LD), `public/sitemap.xml` and `public/robots.txt` with your actual purchased domain, then rebuild.

---

🪔 *श्रद्धा से निर्मित — Crafted with devotion.*
