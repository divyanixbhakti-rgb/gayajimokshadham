import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Per-route SEO: keeps <title>, meta description, OG tags and <html lang>
 * in sync with the active route + language. Google renders JavaScript, so
 * these dynamic values are what the crawler sees on each page.
 */
const ROUTE_META = {
  '/': { titleKey: 'nav.home', descKey: 'hero.subtitle' },
  '/booking': { titleKey: 'nav.booking', descKey: 'sections.bookingSub' },
  '/vedis': { titleKey: 'nav.vedis', descKey: 'sections.vedisSub' },
  '/pitrapaksha': { titleKey: 'nav.pitrapaksha', descKey: 'sections.pitraSub' },
  '/gallery': { titleKey: 'nav.gallery', descKey: 'sections.gallerySub' },
  '/knowledge': { titleKey: 'nav.knowledge', descKey: 'sections.knowSub' },
};

export default function Seo() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    const title = `${t(meta.titleKey)} — ${t('app.name')} | ${t('app.brand')}`;
    const desc = t(meta.descKey);

    document.title = title;
    document.documentElement.lang = i18n.language;

    const updateMeta = (attr, value, content) => {
      let el = document.head.querySelector(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    updateMeta('name', 'description', desc);
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', desc);
  }, [pathname, t, i18n.language]);

  return null;
}
