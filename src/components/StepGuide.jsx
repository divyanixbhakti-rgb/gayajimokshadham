import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { stepsData } from '../data/stepsData';
import { pick } from '../data/lang';
import { Link } from 'react-router-dom';

export default function StepGuide() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="steps" className="section bg-parchment dark:bg-ratri">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Vidhi"
          title={t('sections.stepsTitle')}
          subtitle={t('sections.stepsSub')}
        />

        <div className="relative">
          {/* connector line (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-saffron/20 via-golden to-saffron/20 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
            {stepsData.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* node */}
                <div className="relative z-10 mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-parchment bg-gradient-to-br from-saffron to-golden text-3xl shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow dark:border-ratri">
                  {step.icon}
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-maroon font-display text-xs font-bold text-golden">
                    {i + 1}
                  </span>
                </div>

                <div className="card card-hover w-full flex-1 p-4">
                  <h3 className="font-heading text-lg text-maroon dark:text-golden">
                    {pick(step.title, lang)}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-charcoal/60 dark:text-sand/60">
                    {pick(step.text, lang)}
                  </p>
                </div>

                {i < stepsData.length - 1 && (
                  <span className="mt-3 hidden text-golden lg:block">→</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/booking" className="btn-golden">
            🪔 {t('common.bookNow')}
          </Link>
        </div>
      </div>
    </section>
  );
}
