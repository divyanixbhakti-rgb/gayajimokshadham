import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronDown, MapPin, Phone } from 'lucide-react';
import TempleBell from './TempleBell';
import { contactConfig } from '../data/contactConfig';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32 pb-20 md:pt-40">
      {/* Background — Vishnupad */}
      <div className="absolute inset-0">
        <img
          src="assets/hero-vishnupad.jpg"
          alt="Vishnupad Temple, Gaya"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/80 via-maroon/55 to-parchment dark:to-ratri" />
        <div className="absolute inset-0 bg-om-pattern opacity-30 mix-blend-overlay" />
      </div>

      {/* floating Om */}
      <div className="pointer-events-none absolute -right-10 top-24 hidden select-none font-heading text-[16rem] leading-none text-golden/10 animate-om-spin lg:block dark:text-golden/15">
        ॐ
      </div>
      <div className="pointer-events-none absolute -left-8 bottom-10 hidden select-none font-heading text-[11rem] leading-none text-golden/8 md:block dark:text-golden/10">
        ॐ
      </div>

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-golden/50 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-golden backdrop-blur-sm">
              <MapPin size={13} />
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white text-glow-gold sm:text-5xl md:text-6xl"
          >
            {t('hero.title1')}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 font-heading text-xl text-golden-light md:text-2xl"
          >
            {t('hero.title2')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/booking" className="btn-golden w-full sm:w-auto">
              🪔 {t('hero.ctaPrimary')}
            </Link>
            <Link to="/pitrapaksha" className="btn w-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto">
              <CalendarDays size={16} />
              {t('hero.ctaSecondary')}
            </Link>
            <a href={`tel:${contactConfig.phoneHref}`} className="btn w-full border-2 border-white/40 text-white hover:bg-white/20 sm:w-auto">
              <Phone size={16} />
              {contactConfig.phone}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md"
          >
            {[
              { v: t('hero.stat1v'), l: t('hero.stat1l') },
              { v: t('hero.stat2v'), l: t('hero.stat2l') },
              { v: t('hero.stat3v'), l: t('hero.stat3l') },
            ].map((s, i) => (
              <div key={i} className="px-2 py-4 text-center">
                <div className="font-display text-2xl font-bold text-golden-light md:text-3xl">{s.v}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/70 md:text-xs">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Temple bell + scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <TempleBell size={34} className="hidden md:flex" />
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
          {t('hero.scroll')}
          <ChevronDown size={14} className="animate-bounce" />
        </span>
      </motion.div>
    </section>
  );
}
