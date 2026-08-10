import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarDays, Users, Clock, Sunrise, Sunset } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { pitruPakshaDays, pitruPakshaWindow } from '../data/pitruPakshaData';
import { pick } from '../data/lang';
import { Link } from 'react-router-dom';

const CROWD_COLORS = ['', 'bg-emerald-500/70', 'bg-lime-500/70', 'bg-yellow-500/80', 'bg-orange-500/85', 'bg-red-500/90'];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Pitrapaksha() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const now = useNow();

  const start = useMemo(() => new Date(pitruPakshaWindow.start), []);
  const end = useMemo(() => new Date(pitruPakshaWindow.end), []);
  const ongoing = now >= start && now <= end;
  const diffMs = start - now;

  const countdown = useMemo(() => {
    const s = Math.max(0, Math.floor(diffMs / 1000));
    return {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
  }, [diffMs]);

  const todayStr = now.toISOString().slice(0, 10);
  const todayRow = pitruPakshaDays.find((d) => d.date === todayStr);

  return (
    <section id="pitrapaksha" className="section bg-parchment dark:bg-ratri">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Pitru Paksha"
          title={t('sections.pitraTitle')}
          subtitle={t('sections.pitraSub')}
        />

        {/* Countdown / status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mx-auto mb-12 max-w-3xl rounded-3xl border-2 p-8 text-center shadow-glow ${
            ongoing
              ? 'border-golden/60 bg-gradient-to-br from-saffron/10 to-golden/10'
              : 'border-golden/40 bg-gradient-to-br from-maroon/5 to-golden/10'
          }`}
        >
          {ongoing ? (
            <>
              <span className="text-4xl">🪔</span>
              <h3 className="mt-3 font-heading text-2xl text-saffron dark:text-golden">
                {t('pitra.countdownStarted')}
              </h3>
              <p className="mt-2 text-sm text-charcoal/60 dark:text-sand/60">
                {pick(pitruPakshaWindow.startLabel, lang)} → {pick(pitruPakshaWindow.endLabel, lang)}
              </p>
            </>
          ) : (
            <>
              <h3 className="font-heading text-2xl text-maroon dark:text-golden">
                ⏳ {t('pitra.countdownTitle')}
              </h3>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {[
                  { v: countdown.d, l: t('pitra.days') },
                  { v: countdown.h, l: t('pitra.hours') },
                  { v: countdown.m, l: t('pitra.mins') },
                  { v: countdown.s, l: t('pitra.secs') },
                ].map((b, i) => (
                  <div key={i} className="rounded-2xl bg-white/70 py-3 shadow-card dark:bg-ratri-panel">
                    <div className="font-display text-2xl font-bold text-saffron dark:text-golden md:text-3xl">
                      {String(b.v).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-charcoal/50 dark:text-sand/50">
                      {b.l}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold text-charcoal/60 dark:text-sand/60">
                {pick(pitruPakshaWindow.startLabel, lang)} → {pick(pitruPakshaWindow.endLabel, lang)}
              </p>
            </>
          )}
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <CalendarDays className="text-saffron" size={22} />
              <h3 className="font-heading text-2xl text-maroon dark:text-golden">
                {t('pitra.calendarTitle')}
              </h3>
            </div>
            <p className="mb-6 -mt-3 text-sm text-charcoal/50 dark:text-sand/50">
              {t('pitra.calendarSub')}
            </p>

            <div className="card overflow-hidden">
              <div className="hidden grid-cols-[70px_1fr_1fr_1fr_1fr] gap-2 border-b border-sand-dark/50 bg-sand/60 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-charcoal/50 sm:grid dark:border-ratri-edge dark:bg-ratri dark:text-sand/50">
                <span>{t('pitra.legend')}</span>
                <span>🕯️ {t('pitra.startLabel')}</span>
                <span>🌅 {t('pitra.timingsTitle')}</span>
                <span>🌇 {t('pitra.crowdTitle')}</span>
                <span />
              </div>
              <ul>
                {pitruPakshaDays.map((d, i) => {
                  const isToday = d.date === todayStr;
                  return (
                    <li
                      key={d.date}
                      className={`grid grid-cols-2 items-center gap-2 border-b border-sand-dark/30 px-4 py-3 text-sm last:border-0 sm:grid-cols-[70px_1fr_1fr_1fr_1fr] dark:border-ratri-edge ${
                        isToday ? 'bg-saffron/10 dark:bg-golden/10' : i % 2 ? 'bg-white/40 dark:bg-ratri-panel/40' : ''
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="hidden h-6 w-6 items-center justify-center rounded-full bg-maroon/5 text-[10px] font-bold text-charcoal/50 sm:flex dark:bg-golden/10 dark:text-golden/70">
                          {i + 1}
                        </span>
                        <span className={`font-bold ${isToday ? 'text-saffron dark:text-golden' : 'text-charcoal/70 dark:text-sand/70'}`}>
                          {pick(d.tithi, lang)}
                        </span>
                      </span>
                      <span className="text-charcoal/60 dark:text-sand/60">{d.date.slice(5).replace('-', '/')}</span>
                      <span className="text-xs text-charcoal/50 dark:text-sand/50">🌅 {d.sunrise}</span>
                      <span className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${CROWD_COLORS[d.crowd]}`} />
                        <span className="text-xs text-charcoal/50 dark:text-sand/50">{d.crowd}/5</span>
                      </span>
                      <span className="text-right">
                        {isToday ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            {t('pitra.live')}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Crowd forecast */}
            <div className="card p-6">
              <div className="mb-2 flex items-center gap-3">
                <Users className="text-saffron" size={22} />
                <h3 className="font-heading text-xl text-maroon dark:text-golden">
                  {t('pitra.crowdTitle')}
                </h3>
              </div>
              <p className="mb-5 text-xs text-charcoal/50 dark:text-sand/50">{t('pitra.crowdSub')}</p>
              <div className="flex h-28 items-end gap-1.5">
                {pitruPakshaDays.map((d) => {
                  const isToday = d.date === todayStr;
                  return (
                    <div key={d.date} className="group relative flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${d.crowd * 20}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: pitruPakshaDays.indexOf(d) * 0.03 }}
                        className={`w-full rounded-t-md ${CROWD_COLORS[d.crowd]} ${isToday ? 'ring-2 ring-saffron' : ''}`}
                        style={{ minHeight: 6 }}
                      />
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-maroon px-2 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100 dark:bg-ratri">
                        {d.date.slice(5)} · {d.crowd}/5
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-semibold text-charcoal/55 dark:text-sand/55">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500/70" />{t('pitra.crowdLow')}</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-500/80" />{t('pitra.crowdModerate')}</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500/85" />{t('pitra.crowdHigh')}</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500/90" />{t('pitra.crowdVeryHigh')}</span>
              </div>
              <p className="mt-4 rounded-xl bg-golden/10 px-3 py-2.5 text-xs font-semibold text-charcoal/65 dark:text-golden/90">
                ⚠️ {t('pitra.peakDays')}
              </p>
            </div>

            {/* Daily timings */}
            <div className="card p-6">
              <div className="mb-2 flex items-center gap-3">
                <Clock className="text-saffron" size={22} />
                <h3 className="font-heading text-xl text-maroon dark:text-golden">
                  {t('pitra.timingsTitle')}
                </h3>
              </div>
              <p className="mb-5 text-xs text-charcoal/50 dark:text-sand/50">{t('pitra.timingsSub')}</p>

              {todayRow ? (
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-saffron/10 px-4 py-2.5 font-bold text-saffron dark:bg-golden/10 dark:text-golden">
                    <span>🪔 {t('pitra.live')} — {pick(todayRow.tithi, lang)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 dark:bg-ratri-panel/60">
                    <span className="flex items-center gap-2 text-charcoal/60 dark:text-sand/60"><Sunrise size={15} className="text-golden" /> {t('pitra.timingsTitle')} (Brahma)</span>
                    <span className="font-bold text-charcoal dark:text-sand">{todayRow.brahma}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 dark:bg-ratri-panel/60">
                    <span className="flex items-center gap-2 text-charcoal/60 dark:text-sand/60"><Sunrise size={15} className="text-golden" /> Sunrise</span>
                    <span className="font-bold text-charcoal dark:text-sand">{todayRow.sunrise}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 dark:bg-ratri-panel/60">
                    <span className="flex items-center gap-2 text-charcoal/60 dark:text-sand/60"><Sunset size={15} className="text-golden" /> Sunset</span>
                    <span className="font-bold text-charcoal dark:text-sand">{todayRow.sunset}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 dark:bg-ratri-panel/60">
                    <span className="text-charcoal/60 dark:text-sand/60">Abhijit</span>
                    <span className="font-bold text-charcoal dark:text-sand">{todayRow.abhijit}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-charcoal/50 dark:text-sand/50">{t('pitra.nextYear')}</p>
              )}
              <p className="mt-4 text-[11px] text-charcoal/40 dark:text-sand/40">{t('pitra.timingsNote')}</p>
            </div>

            <Link to="/booking" className="btn-golden w-full">
              🪔 {t('common.bookNow')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
