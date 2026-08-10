import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, Crown } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { gayaAsurTimeline, sitaWitnesses } from '../data/storiesData';
import { pick } from '../data/lang';

export default function SacredStories() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [tab, setTab] = useState('asur');

  return (
    <section id="stories" className="section bg-manuscript">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Katha"
          title={t('sections.storiesTitle')}
          subtitle={t('sections.storiesSub')}
        />

        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-golden/40 bg-white p-1.5 shadow-card dark:bg-ratri-panel">
            <button
              type="button"
              onClick={() => setTab('asur')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                tab === 'asur'
                  ? 'bg-saffron text-white shadow-md shadow-saffron/30'
                  : 'text-charcoal/60 hover:text-saffron dark:text-sand/60'
              }`}
            >
              <ScrollText size={15} />
              {t('stories.tabAsur')}
            </button>
            <button
              type="button"
              onClick={() => setTab('sita')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                tab === 'sita'
                  ? 'bg-saffron text-white shadow-md shadow-saffron/30'
                  : 'text-charcoal/60 hover:text-saffron dark:text-sand/60'
              }`}
            >
              <Crown size={15} />
              {t('stories.tabSita')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'asur' ? (
            <motion.div
              key="asur"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mx-auto mb-12 max-w-2xl text-center text-charcoal/60 dark:text-sand/60">
                {t('stories.asurNote')}
              </p>

              {/* Timeline */}
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-saffron via-golden to-maroon md:left-1/2 md:-translate-x-1/2" />
                <div className="space-y-8">
                  {gayaAsurTimeline.map((ev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className={`relative flex flex-col gap-3 pl-12 md:w-1/2 md:pl-0 ${
                        i % 2 === 0
                          ? 'md:pr-12 md:text-right md:items-end'
                          : 'md:ml-auto md:pl-12'
                      }`}
                    >
                      {/* node */}
                      <span
                        className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-golden bg-white text-xs font-bold text-saffron shadow-glow left-0 ${
                          i % 2 === 0 ? 'md:left-auto md:-right-4' : 'md:-left-4'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="temple-frame">
                        <span className="mb-1 inline-block rounded-full bg-saffron/10 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-saffron dark:bg-golden/10 dark:text-golden">
                          {pick(ev.era, lang)}
                        </span>
                        <h3 className="font-heading text-xl text-maroon dark:text-golden">
                          {pick(ev.title, lang)}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-charcoal/65 dark:text-sand/65">
                          {pick(ev.text, lang)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sita"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mx-auto mb-4 max-w-3xl text-center text-charcoal/60 dark:text-sand/60">
                {t('stories.sitaNote')}
              </p>
              <p className="mx-auto mb-12 max-w-3xl text-center font-heading text-lg text-saffron dark:text-golden">
                {t('stories.sitaIntro')}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {sitaWitnesses.map((w, i) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card card-hover group relative overflow-hidden p-6 text-center"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron via-golden to-saffron opacity-0 transition group-hover:opacity-100" />
                    <span className="text-5xl">{w.icon}</span>
                    <span className="mt-3 block text-[11px] font-extrabold uppercase tracking-[0.2em] text-golden">
                      {t('stories.tabSita')} {i + 1}
                    </span>
                    <h3 className="mt-1 font-heading text-xl text-maroon dark:text-golden">
                      {pick(w.name, lang)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/60 dark:text-sand/60">
                      {pick(w.text, lang)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
