import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Search } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { articlesData } from '../data/articlesData';
import { faqData, faqCategories } from '../data/faqData';
import { pick } from '../data/lang';

export default function KnowledgeHub() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [openFaq, setOpenFaq] = useState(null);
  const [faqCat, setFaqCat] = useState('all');
  const [query, setQuery] = useState('');
  const [openArticle, setOpenArticle] = useState(0);

  const filteredFaq = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqData.filter((f) => {
      const okCat = faqCat === 'all' || f.cat === faqCat;
      const okQ =
        !q ||
        pick(f.q, lang).toLowerCase().includes(q) ||
        pick(f.a, lang).toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [faqCat, query, lang]);

  return (
    <section id="knowledge" className="section bg-manuscript">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Jnana"
          title={t('sections.knowTitle')}
          subtitle={t('sections.knowSub')}
        />

        {/* ── Articles ─────────────────────────────── */}
        <h3 className="mb-6 flex items-center gap-3 font-heading text-2xl text-maroon dark:text-golden">
          <BookOpen size={22} className="text-saffron" />
          {t('knowledge.articlesTitle')}
        </h3>
        <div className="mb-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articlesData.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card card-hover flex flex-col overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenArticle(openArticle === i ? null : i)}
                className="flex flex-1 flex-col p-6 text-left"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron/15 to-golden/20 text-2xl">
                  {a.icon}
                </span>
                <h4 className="font-heading text-lg leading-snug text-maroon dark:text-golden">
                  {pick(a.title, lang)}
                </h4>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal/60 dark:text-sand/60">
                  {pick(a.excerpt, lang)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-saffron dark:text-golden">
                  {t('common.readMore')}
                  <ChevronDown size={14} className={`transition-transform ${openArticle === i ? 'rotate-180' : ''}`} />
                </span>
              </button>
              <AnimatePresence>
                {openArticle === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-sand-dark/40 dark:border-ratri-edge"
                  >
                    <div className="space-y-3 p-6 pt-4">
                      {a.body.map((p, j) => (
                        <p key={j} className="text-[13px] leading-relaxed text-charcoal/65 dark:text-sand/65">
                          {pick(p, lang)}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        {/* ── FAQ ──────────────────────────────────── */}
        <h3 className="mb-2 flex items-center gap-3 font-heading text-2xl text-maroon dark:text-golden">
          ❓ {t('knowledge.faqTitle')}
        </h3>
        <p className="mb-6 text-sm text-charcoal/50 dark:text-sand/50">
          {faqData.length} {t('knowledge.faqCount')} · {t('knowledge.faqSub')}
        </p>

        {/* FAQ controls */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFaqCat('all')}
              className={`chip ${faqCat === 'all' ? 'chip-active' : ''}`}
            >
              🕉️ {t('knowledge.catAll')}
            </button>
            {faqCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFaqCat(c.id)}
                className={`chip ${faqCat === c.id ? 'chip-active' : ''}`}
              >
                {c.icon} {pick(c.label, lang)}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/35 dark:text-sand/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('knowledge.searchPlaceholder')}
              className="field !pl-9"
            />
          </div>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-4xl space-y-3">
          <AnimatePresence initial={false}>
            {filteredFaq.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={`${f.cat}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.3 }}
                  className={`card overflow-hidden ${open ? '!border-golden/60 shadow-glow' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-sm dark:bg-golden/10">
                      {faqCategories.find((c) => c.id === f.cat)?.icon || '🪔'}
                    </span>
                    <span className="flex-1 text-sm font-bold leading-snug text-charcoal/85 dark:text-sand/85">
                      {pick(f.q, lang)}
                    </span>
                    <ChevronDown
                      size={17}
                      className={`shrink-0 text-saffron transition-transform duration-300 dark:text-golden ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-sand-dark/40 px-5 pb-5 pt-4 text-sm leading-relaxed text-charcoal/65 dark:border-ratri-edge dark:text-sand/65">
                          {pick(f.a, lang)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaq.length === 0 && (
            <p className="py-12 text-center text-charcoal/50 dark:text-sand/50">
              🙏 {t('vedis.empty')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
