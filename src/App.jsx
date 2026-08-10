import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Seo from './components/Seo';
import ContactFooter from './components/ContactFooter';
import HomePage from './pages/HomePage';
import Gallery from './components/Gallery';
import VediDirectory from './components/VediDirectory';
import BookingEngine from './components/BookingEngine';
import Pitrapaksha from './components/Pitrapaksha';
import KnowledgeHub from './components/KnowledgeHub';
import { ThemeProvider } from './context/ThemeContext';

/**
 * BrowserRouter gives clean URLs (https://domain.com/booking) —
 * ideal for Hostinger hosting where public/.htaccess rewrites all
 * routes to index.html (no 404s on refresh/deep links).
 * (The GitHub Pages branch uses HashRouter instead.)
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-manuscript py-32">
      <div className="text-center">
        <div className="font-heading text-7xl text-shimmer">ॐ</div>
        <h1 className="mt-4 font-heading text-3xl text-maroon dark:text-golden">{t('notFound.title')}</h1>
        <p className="mt-2 text-charcoal/60 dark:text-sand/60">{t('notFound.sub')}</p>
        <Link to="/" className="btn-golden mt-6">
          {t('notFound.back')}
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Seo />
        <div className="flex min-h-screen flex-col bg-parchment dark:bg-ratri">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/vedis" element={<VediDirectory />} />
              <Route path="/booking" element={<BookingEngine />} />
              <Route path="/pitrapaksha" element={<Pitrapaksha />} />
              <Route path="/knowledge" element={<KnowledgeHub />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <ContactFooter />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
