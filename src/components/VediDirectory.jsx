import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { vedisData, vediCategories } from '../data/vedisData';
import { pick } from '../data/lang';

const CAT_ICONS = {
  temple: '🛕',
  river: '🌊',
  hill: '⛰️',
  kund: '💧',
  tree: '🌳',
};

const CAT_KEYS = {
  temple: 'vedis.cat.temple',
  river: 'vedis.cat.river',
  hill: 'vedis.cat.hill',
  kund: 'vedis.cat.kund',
  tree: 'vedis.cat.tree',
};

export default function VediDirectory() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vedisData.filter((v) => {
      const okCat = cat === 'all' || v.category === cat;
      const okQ =
        !q ||
        pick(v.name, lang).toLowerCase().includes(q) ||
        pick(v.deity, lang).toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [cat, query, lang]);

  return (
    <section id="vedis" className="section bg-parchment dark:bg-ratri">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Kshetra"
          title={t('sections.vedisTitle')}
          subtitle={t('sections.vedisSub')}
        />

        {/* Filters */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setCat('all')}
              className={`chip ${cat === 'all' ? 'chip-active' : ''}`}
            >
              🕉️ {t('common.all')}
            </button>
            {vediCategories
              .filter((c) => c.id !== 'all')
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={`chip ${cat === c.id ? 'chip-active' : ''}`}
                >
                  <span>{CAT_ICONS[c.id]}</span>
                  {t(CAT_KEYS[c.id])}
                </button>
              ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`🔎 ${t('vedis.searchPlaceholder')}`}
            className="field max-w-sm"
          />
        </div>

        <p className="mb-8 text-center text-sm font-semibold text-charcoal/50 dark:text-sand/50">
          {filtered.length} {t('vedis.found')}
        </p>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <motion.article
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="card card-hover group overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={v.image}
                    alt={pick(v.name, lang)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-saffron">
                    {CAT_ICONS[v.category]} {t(CAT_KEYS[v.category])}
                  </span>
                  <h3 className="absolute bottom-3 left-3 right-3 font-heading text-xl text-white drop-shadow">
                    {pick(v.name, lang)}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-golden">
                    {t('common.deity')}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-maroon dark:text-golden-light">
                    {pick(v.deity, lang)}
                  </p>

                  <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-charcoal/60 dark:text-sand/60">
                    {pick(v.desc, lang)}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-sand-dark/50 pt-4 dark:border-ratri-edge">
                    <button
                      type="button"
                      onClick={() => setSelected(v)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-3.5 py-2 text-xs font-bold text-saffron transition hover:bg-saffron hover:text-white dark:bg-golden/10 dark:text-golden dark:hover:bg-golden dark:hover:text-maroon"
                    >
                      <MapPin size={13} />
                      {t('common.viewOnMap')}
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${v.coords.lat},${v.coords.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal/50 transition hover:text-saffron dark:text-sand/50 dark:hover:text-golden"
                    >
                      <Navigation size={13} />
                      {t('common.directions')}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-charcoal/50 dark:text-sand/50">
            🙏 {t('vedis.empty')}
          </p>
        )}
      </div>

      {/* Map modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-maroon/95 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-card-lg dark:bg-ratri-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-sand-dark/50 px-6 py-4 dark:border-ratri-edge">
                <div>
                  <h3 className="font-heading text-xl text-maroon dark:text-golden">
                    {pick(selected.name, lang)}
                  </h3>
                  <p className="text-xs font-semibold text-charcoal/50 dark:text-sand/50">
                    {t('vedis.modalSub')} · {selected.coords.lat.toFixed(4)}, {selected.coords.lng.toFixed(4)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-charcoal/60 transition hover:bg-saffron hover:text-white dark:bg-ratri dark:text-sand/60"
                  aria-label={t('common.close')}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="h-[380px] w-full bg-sand dark:bg-ratri">
                <iframe
                  title={`${pick(selected.name, lang)} — map`}
                  src={`https://maps.google.com/maps?q=${selected.coords.lat},${selected.coords.lng}&z=15&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                <p className="text-sm font-semibold text-charcoal/70 dark:text-sand/70">
                  🪔 {t('common.ritual')}: {pick(selected.ritual, lang)}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selected.coords.lat},${selected.coords.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-golden !px-4 !py-2 text-xs"
                >
                  <ExternalLink size={14} />
                  {t('vedis.openMaps')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
