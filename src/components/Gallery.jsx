import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { galleryData, galleryCategories } from '../data/galleryData';
import { pick } from '../data/lang';

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index into filtered list

  const filtered = useMemo(
    () => (cat === 'all' ? galleryData : galleryData.filter((g) => g.tags.includes(cat))),
    [cat]
  );

  const close = () => setLightbox(null);
  const step = (dir) =>
    setLightbox((cur) => (cur + dir + filtered.length) % filtered.length);

  return (
    <section id="gallery" className="section bg-manuscript">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Darshan"
          title={t('sections.galleryTitle')}
          subtitle={t('sections.gallerySub')}
        />

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCat(c.id);
                setLightbox(null);
              }}
              className={`chip ${cat === c.id ? 'chip-active' : ''}`}
            >
              <span>{c.icon}</span>
              {c.id === 'all' ? t('common.all') : t(`gallery.cat.${c.id}`)}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {filtered.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => setLightbox(i)}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-card focus:outline-none focus-visible:ring-4 focus-visible:ring-golden/50"
            >
              <img
                src={g.src}
                alt={pick(g.caption, lang)}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-maroon/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left transition-transform duration-300 group-hover:translate-y-0">
                <div className="mb-1.5 flex gap-1.5">
                  {g.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-golden/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-maroon"
                    >
                      {t(`gallery.cat.${tag}`)}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold leading-snug text-white">
                  {pick(g.caption, lang)}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal/40 dark:text-sand/40">
          <ImageIcon size={12} className="mr-1 inline" />
          {t('gallery.lightboxHint')}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-maroon/95 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-saffron"
              onClick={close}
              aria-label={t('common.close')}
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-saffron md:left-6"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={t('common.prev')}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-saffron md:right-6"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={t('common.next')}
            >
              <ChevronRight size={22} />
            </button>

            <motion.figure
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[88vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt={pick(filtered[lightbox].caption, lang)}
                className="max-h-[76vh] w-auto rounded-2xl object-contain shadow-glow-lg"
              />
              <figcaption className="mt-4 text-center text-sm font-semibold text-sand">
                {pick(filtered[lightbox].caption, lang)}
                <span className="mt-1 block text-xs text-sand/50">
                  {lightbox + 1} / {filtered.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
