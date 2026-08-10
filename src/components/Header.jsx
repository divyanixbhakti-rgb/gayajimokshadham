import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  Moon,
  Sun,
  Phone,
  CalendarDays,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { contactConfig } from '../data/contactConfig';

const LANGS = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
];

const TICKER_ITEMS = ['ticker.item1', 'ticker.item2', 'ticker.item3', 'ticker.item4'];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setLangOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/vedis', label: t('nav.vedis') },
    { to: '/booking', label: t('nav.booking') },
    { to: '/pitrapaksha', label: t('nav.pitrapaksha') },
    { to: '/knowledge', label: t('nav.knowledge') },
    { to: '/gallery', label: t('nav.gallery') },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Panchang Ticker ─────────────────────────── */}
      <div className="bg-maroon text-sand/95 text-xs md:text-sm">
        <div className="flex items-stretch overflow-hidden">
          <span className="z-10 flex shrink-0 items-center gap-1.5 bg-saffron px-3 py-1.5 font-bold tracking-widest text-white">
            <Sparkles size={13} className="animate-flicker" />
            {t('ticker.label')}
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap py-1.5 pl-6">
              {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((key, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-golden">🪔</span>
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Nav ────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-parchment/90 shadow-card backdrop-blur-md dark:bg-ratri/90 dark:shadow-none'
            : 'bg-parchment/60 backdrop-blur-sm dark:bg-ratri/70'
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-3 py-3">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-golden font-heading text-xl text-white shadow-glow">
              ॐ
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg text-maroon transition group-hover:text-saffron dark:text-golden">
                {t('app.name')}
              </span>
              <span className="block text-[11px] font-bold tracking-[0.18em] text-saffron/80 dark:text-golden/70">
                {t('app.brand')}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-saffron/10 text-saffron dark:bg-golden/10 dark:text-golden'
                        : 'text-charcoal/70 hover:bg-sand hover:text-saffron dark:text-sand/70 dark:hover:bg-ratri-panel dark:hover:text-golden'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${contactConfig.phoneHref}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-maroon/15 text-maroon/70 transition hover:border-saffron hover:text-saffron md:flex dark:border-golden/30 dark:text-golden/70 dark:hover:border-golden dark:hover:text-golden"
              aria-label="Call"
            >
              <Phone size={17} />
            </a>

            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                className="flex h-10 items-center gap-1.5 rounded-full border border-maroon/15 px-3 text-sm font-bold text-charcoal/70 transition hover:border-saffron hover:text-saffron dark:border-golden/30 dark:text-sand/80 dark:hover:border-golden dark:hover:text-golden"
                aria-label={t('common.language')}
              >
                <Globe size={16} />
                <span className="hidden sm:inline">
                  {LANGS.find((l) => l.code === i18n.language)?.label || 'हिंदी'}
                </span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-sand-dark/60 bg-white p-1.5 shadow-card-lg dark:border-ratri-edge dark:bg-ratri-panel"
                  >
                    {LANGS.map((l) => (
                      <li key={l.code}>
                        <button
                          type="button"
                          onClick={() => changeLang(l.code)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition ${
                            i18n.language === l.code
                              ? 'bg-saffron/10 text-saffron dark:bg-golden/15 dark:text-golden'
                              : 'text-charcoal/70 hover:bg-sand dark:text-sand/70 dark:hover:bg-ratri'
                          }`}
                        >
                          {l.label}
                          {i18n.language === l.code && <span className="text-golden">✓</span>}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Dark mode */}
            <button
              type="button"
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/15 text-charcoal/70 transition hover:border-golden hover:text-golden dark:border-golden/30 dark:text-golden"
              aria-label={dark ? t('common.lightMode') : t('common.darkMode')}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Link
              to="/booking"
              className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex"
            >
              <CalendarDays size={15} />
              {t('nav.bookNow')}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/15 text-charcoal/70 lg:hidden dark:border-golden/30 dark:text-sand/80"
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-sand-dark/50 bg-parchment/95 backdrop-blur-md lg:hidden dark:border-ratri-edge dark:bg-ratri/95"
            >
              <ul className="container-x flex flex-col gap-1 py-4">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-semibold transition ${
                          isActive
                            ? 'bg-saffron/10 text-saffron dark:bg-golden/10 dark:text-golden'
                            : 'text-charcoal/75 hover:bg-sand dark:text-sand/75 dark:hover:bg-ratri-panel'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
                <li className="mt-2 flex gap-2 px-2 pb-2">
                  <Link to="/booking" className="btn-primary flex-1">
                    {t('nav.bookNow')}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
