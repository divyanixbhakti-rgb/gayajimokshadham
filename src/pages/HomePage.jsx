import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HandHeart, UserRound, CarFront, Hotel, Droplets, Globe2, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import SacredStories from '../components/SacredStories';
import StepGuide from '../components/StepGuide';
import Gallery from '../components/Gallery';
import VediDirectory from '../components/VediDirectory';

const SERVICES = [
  { icon: HandHeart, key: 'pind' },
  { icon: UserRound, key: 'pandit' },
  { icon: CarFront, key: 'cab' },
  { icon: Hotel, key: 'hotel' },
  { icon: Droplets, key: 'astthi' },
  { icon: Globe2, key: 'online' },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />

      {/* ── Services strip ─────────────────────────── */}
      <section className="relative z-20 -mt-10 pb-4">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SERVICES.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to="/booking"
                  className="card card-hover flex flex-col items-center gap-2 p-4 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron/15 to-golden/25 text-saffron dark:text-golden">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-bold text-charcoal/70 dark:text-sand/70">
                    {t(`booking.tabs.${key}`)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SacredStories />
      <StepGuide />
      <Gallery />
      <VediDirectory />

      {/* ── Pitru Paksha CTA band ──────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-saffron via-maroon to-maroon py-16 text-center text-white">
        <div className="absolute inset-0 bg-om-pattern opacity-25" />
        <div className="pointer-events-none absolute -left-10 -top-10 select-none font-heading text-[10rem] leading-none text-white/5">
          ॐ
        </div>
        <div className="container-x relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-golden/60 bg-white/10 px-4 py-1.5 text-xs font-extrabold tracking-[0.25em] text-golden">
              26 SEP – 10 OCT 2026
            </span>
            <h2 className="mt-5 font-heading text-3xl text-golden text-glow-gold md:text-5xl">
              {t('sections.ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">{t('sections.ctaSub')}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/booking" className="btn-golden !px-8 !py-3.5">
                {t('nav.bookNow')} <ArrowRight size={16} />
              </Link>
              <Link
                to="/pitrapaksha"
                className="btn border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                {t('nav.pitrapaksha')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
