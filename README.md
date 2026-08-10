# 🪔 Gaya Ji Pitrapaksh Seva — GayaJiPindDaan.com

A production-grade, fully responsive **Hindu pilgrimage web application** for Pind Daan, Tarpan and Shraddha services at **Vishnupad Temple, Gaya (Bihar)** — built with React + Vite + Tailwind CSS, deployed to **GitHub Pages**.

> **Pitru Paksha 2026: 26 September – 10 October 2026** (Sarva Pitri Amavasya on 10 Oct)

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

React 18 · Vite 5 · Tailwind CSS 3 · react-router-dom (HashRouter) · react-i18next · Framer Motion · Lucide icons · Context API (theme)

## 📁 Project structure

```
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── public/                        # favicon, images, bell chime audio
├── scripts/json-loader.mjs        # node loader for the smoke test
├── smoke.test.mjs                 # jsdom smoke test (26 checks)
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

## ☁️ Deployment (GitHub Pages)

1. Push to `main` — the workflow `.github/workflows/deploy.yml` builds and deploys automatically.
2. In **Settings → Pages**, set *Source* to **GitHub Actions**.
3. The site will be live at `https://<user>.github.io/<repo>/` (HashRouter + relative `base: './'` mean no 404s and no path config).

Manual trigger: **Actions → Deploy to GitHub Pages → Run workflow**.

## ✏️ Contact details

All contact details are centralised in **`src/data/contactConfig.js`** — edit once, everywhere updates:

- 📞 Phone / WhatsApp: **+91 91231 71655** (`wa.me/919123171655`)
- ✉️ Enquiry email (booking form + footer): **DivyaNix.bhakti@gmail.com**

The booking form validates Indian mobile numbers (10 digits, starts 6–9, optional `+91`/`0` prefix) and email format, and lets the visitor send the enquiry via **email** (opens their mail app pre-filled to the address above) or **WhatsApp** deep-link. The site ships with a demo disclaimer; verify tithi timings and prices with the seva desk.

## 📜 Content sources

- Pitru Paksha 2026 tithi calendar cross-checked with public panchanga listings (26 Sep – 10 Oct 2026).
- Vedi names/rites per Gaya pind-daan tradition (Vishnupad, Falgu, Akshayavat, Gayasir, Dakshin/Uttar Manas, Pretshila, Brahmakund, Ramshila, Kakbali, Sita Kund, Gaya Kup, Gadhadhar, Brahma Sarovar).
- Stories & articles from Gaya Mahatmya / Garuda Purana tradition (Vana Parva, Karna legend).

---

🪔 *श्रद्धा से निर्मित — Crafted with devotion.*
