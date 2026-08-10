import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HandHeart,
  UserRound,
  CarFront,
  Hotel,
  Send,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  IndianRupee,
  PencilLine,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { contactConfig } from '../data/contactConfig';

const TABS = [
  { id: 'pind', icon: HandHeart },
  { id: 'pandit', icon: UserRound },
  { id: 'cab', icon: CarFront },
  { id: 'hotel', icon: Hotel },
];

export default function BookingEngine() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('pind');
  // 'form' → user fills the enquiry; 'choose' → validated, pick WhatsApp or Email
  const [stage, setStage] = useState('form');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    vedi: '',
    persons: '1',
    gotra: '',
    ancestorName: '',
    message: '',
    city: '',
    mode: '',
    arrival: '',
    cabType: '',
    hotelType: '',
    nights: '1',
    language: '',
    packageType: '',
    pickup: 'no',
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    // clear the field's error + generic error as soon as the user edits it
    setErrors((prev) => {
      const next = { ...prev };
      delete next[k];
      delete next.required;
      return next;
    });
  };

  /** Indian mobile validation: 10 digits, starts 6–9, optional +91 / 0 prefix */
  const isValidPhone = (phone) => {
    const digits = phone.replace(/[\s\-()]/g, '');
    return /^(\+?91|0)?[6-9]\d{9}$/.test(digits);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || !form.phone.trim() || !form.date.trim()) {
      errs.required = t('booking.errors.required');
    }
    if (tab === 'pind' && !form.vedi) {
      errs.vedi = t('booking.errors.required');
    }
    if (!isValidPhone(form.phone)) errs.phone = t('booking.errors.invalidPhone');
    if (!isValidEmail(form.email)) errs.email = t('booking.errors.invalidEmail');
    return errs;
  };

  const summaryLines = useMemo(() => {
    const lines = [];
    const push = (label, value) => value && lines.push(`${label}: ${value}`);
    push(t('booking.summary.name'), form.name);
    push(t('booking.summary.phone'), form.phone);
    push(t('booking.summary.email'), form.email);
    push(t('booking.summary.date'), form.date);
    if (tab === 'pind') {
      push(t('booking.fields.vedi'), t(`booking.vediOptions.${form.vedi}`) || form.vedi);
      push(t('booking.fields.persons'), form.persons);
      push(t('booking.fields.gotra'), form.gotra);
      push(t('booking.fields.ancestorName'), form.ancestorName);
    }
    if (tab === 'pandit') {
      push(t('booking.fields.language'), form.language || form.language);
      push(t('booking.fields.vedi'), t(`booking.vediOptions.${form.vedi}`) || form.vedi);
      push(t('booking.fields.date'), form.date);
    }
    if (tab === 'cab') {
      push(t('booking.fields.cabType'), t(`booking.cabOptions.${form.cabType}`) || form.cabType);
      push(t('booking.fields.mode'), form.mode);
      push(t('booking.fields.arrival'), form.arrival);
      push(t('booking.fields.pickup'), form.pickup === 'yes' ? '✅' : '—');
    }
    if (tab === 'hotel') {
      push(t('booking.fields.hotelType'), t(`booking.hotelOptions.${form.hotelType}`) || form.hotelType);
      push(t('booking.fields.nights'), form.nights);
    }
    push(t('booking.fields.city'), form.city);
    push(t('booking.fields.message'), form.message);
    return lines;
  }, [form, tab, t]);

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setError(errs.required || '');
      return;
    }
    setError('');
    setErrors({});
    setStage('choose');
    // bring the delivery options into view (they sit beside/below the form)
    requestAnimationFrame(() => {
      const el = document.getElementById('enquiry-actions');
      if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const waText = encodeURIComponent(
    [
      `🙏 ${t('app.name')} — ${t('nav.booking')}`,
      `📋 ${t('booking.tabs.' + tab)}`,
      ...summaryLines,
    ].join('\n')
  );

  const mailHref = `mailto:${contactConfig.booking.email}?subject=${encodeURIComponent(
    `${t('app.name')} — ${t('nav.booking')}`
  )}&body=${encodeURIComponent(
    [`🙏 ${t('app.name')} — ${t('nav.booking')}`, `📋 ${t('booking.tabs.' + tab)}`, ...summaryLines].join('\n')
  )}`;

  const input = 'field';
  const label = 'field-label';

  return (
    <section id="booking" className="section bg-manuscript">
      <div className="container-x">
        <SectionHeading
          eyebrow="🪔 Seva"
          title={t('sections.bookingTitle')}
          subtitle={`${t('sections.bookingSub')} ${t('booking.sub')}`}
        />

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {TABS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id);
                setStage('form');
              }}
              className={`chip !px-5 !py-2.5 ${tab === id ? 'chip-active' : ''}`}
            >
              <Icon size={15} />
              {t(`booking.tabs.${id}`)}
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Form */}
          <motion.form
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={submit}
            className="card p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className={label}>{t('booking.fields.name')} *</label>
                <input className={input} value={form.name} onChange={set('name')} placeholder={t('booking.placeholders.name')} required />
              </div>
              <div>
                <label className={label}>{t('booking.fields.phone')} *</label>
                <input
                  className={`${input} ${errors.phone ? '!border-red-500 dark:!border-red-400' : ''}`}
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder={t('booking.placeholders.phone')}
                  type="tel"
                  inputMode="tel"
                  maxLength="18"
                  required
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                    ⚠️ {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className={label}>{t('booking.fields.date')} *</label>
                <input className={input} value={form.date} onChange={set('date')} type="date" required />
              </div>
              <div>
                <label className={label}>{t('booking.fields.email')} *</label>
                <input
                  className={`${input} ${errors.email ? '!border-red-500 dark:!border-red-400' : ''}`}
                  value={form.email}
                  onChange={set('email')}
                  type="email"
                  inputMode="email"
                  placeholder={t('booking.placeholders.email')}
                  required
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                    ⚠️ {errors.email}
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'pind' && (
                  <motion.div key="pind-fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.vedi')} *</label>
                      <select
                        className={`${input} ${errors.vedi ? '!border-red-500 dark:!border-red-400' : ''}`}
                        value={form.vedi}
                        onChange={set('vedi')}
                        required
                      >
                        <option value="">—</option>
                        {Object.keys(t('booking.vediOptions', { returnObjects: true })).map((k) => (
                          <option key={k} value={k}>{t(`booking.vediOptions.${k}`)}</option>
                        ))}
                      </select>
                      {errors.vedi && (
                        <p className="mt-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                          ⚠️ {errors.vedi}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.persons')}</label>
                      <input className={input} value={form.persons} onChange={set('persons')} type="number" min="1" max="50" />
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.gotra')}</label>
                      <input className={input} value={form.gotra} onChange={set('gotra')} placeholder={t('booking.placeholders.gotra')} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.ancestorName')}</label>
                      <input className={input} value={form.ancestorName} onChange={set('ancestorName')} />
                    </div>
                  </motion.div>
                )}

                {tab === 'pandit' && (
                  <motion.div key="pandit-fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                    <div className="sm:col-span-2">
                      <label className={label}>{t('pandit.language')}</label>
                      <select className={input} value={form.language} onChange={set('language')}>
                        <option value="">—</option>
                        {Object.entries(t('pandit.langs', { returnObjects: true })).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.vedi')}</label>
                      <select className={input} value={form.vedi} onChange={set('vedi')}>
                        <option value="">—</option>
                        {Object.keys(t('booking.vediOptions', { returnObjects: true })).map((k) => (
                          <option key={k} value={k}>{t(`booking.vediOptions.${k}`)}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

                {tab === 'cab' && (
                  <motion.div key="cab-fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.cabType')}</label>
                      <select className={input} value={form.cabType} onChange={set('cabType')}>
                        <option value="">—</option>
                        {Object.keys(t('booking.cabOptions', { returnObjects: true })).map((k) => (
                          <option key={k} value={k}>{t(`booking.cabOptions.${k}`)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.mode')}</label>
                      <select className={input} value={form.mode} onChange={set('mode')}>
                        <option value="">—</option>
                        <option>🚂 {t('booking.fields.mode')}: Train</option>
                        <option>✈️ Flight</option>
                        <option>🚌 Bus</option>
                        <option>🚗 Car</option>
                      </select>
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.arrival')}</label>
                      <input className={input} value={form.arrival} onChange={set('arrival')} placeholder="12345 / AI-021" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.pickup')}</label>
                      <select className={input} value={form.pickup} onChange={set('pickup')}>
                        <option value="yes">✅ {t('booking.fields.pickup')}</option>
                        <option value="no">—</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {tab === 'hotel' && (
                  <motion.div key="hotel-fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                    <div className="sm:col-span-2">
                      <label className={label}>{t('booking.fields.hotelType')}</label>
                      <select className={input} value={form.hotelType} onChange={set('hotelType')}>
                        <option value="">—</option>
                        {Object.keys(t('booking.hotelOptions', { returnObjects: true })).map((k) => (
                          <option key={k} value={k}>{t(`booking.hotelOptions.${k}`)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.nights')}</label>
                      <input className={input} value={form.nights} onChange={set('nights')} type="number" min="1" max="30" />
                    </div>
                    <div>
                      <label className={label}>{t('booking.fields.persons')}</label>
                      <input className={input} value={form.persons} onChange={set('persons')} type="number" min="1" max="20" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={label}>{t('booking.fields.city')}</label>
                <input className={input} value={form.city} onChange={set('city')} />
              </div>
              <div>
                <label className={label}>{t('booking.fields.message')}</label>
                <input className={input} value={form.message} onChange={set('message')} placeholder={t('booking.placeholders.message')} />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-saffron/10 px-4 py-2.5 text-sm font-semibold text-saffron">
                ⚠️ {error}
              </p>
            )}

            <div className="mt-6">
              <button type="submit" className="btn-primary w-full">
                <Send size={16} />
                {t('booking.send')}
              </button>
              <p className="mt-3 text-center text-xs text-charcoal/45 dark:text-sand/45">
                {t('booking.afterSubmit')}
              </p>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-charcoal/50 dark:text-sand/50">
              <ShieldCheck size={13} className="text-green-600" />
              {t('booking.note')}
            </p>
          </motion.form>

          {/* Summary / Delivery options */}
          <div className="space-y-5" id="enquiry-actions">
            <AnimatePresence mode="wait">
              {stage === 'choose' ? (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                  className="card border-2 border-golden/50 p-6 shadow-glow"
                >
                  <h3 className="font-heading text-xl text-maroon dark:text-golden">
                    📨 {t('booking.choose.title')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60 dark:text-sand/60">
                    {t('booking.choose.sub')}
                  </p>

                  {/* Enquiry summary being sent */}
                  <div className="mt-4 rounded-2xl border border-sand-dark/50 bg-sand/40 p-4 dark:border-ratri-edge dark:bg-ratri/60">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-saffron dark:text-golden">
                      {t('booking.choose.summaryTitle')}
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[13px]">
                      {summaryLines.map((l, i) => (
                        <li key={i} className="flex gap-2 text-charcoal/70 dark:text-sand/70">
                          <span className="text-golden">🪔</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Two delivery options */}
                  <div className="mt-4 grid gap-3">
                    <a
                      href={`https://wa.me/${contactConfig.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border-2 border-green-600/40 bg-green-50 p-4 transition-all hover:-translate-y-0.5 hover:bg-green-100 hover:shadow-lg dark:border-green-400/40 dark:bg-green-400/10 dark:hover:bg-green-400/20"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
                        <MessageCircle size={22} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-green-800 dark:text-green-300">
                          {t('booking.choose.whatsapp')}
                        </span>
                        <span className="block text-xs text-green-700/70 dark:text-green-300/60">
                          {t('booking.choose.whatsappDesc')} · {contactConfig.phone}
                        </span>
                      </span>
                      <span className="text-green-600 transition-transform group-hover:translate-x-1 dark:text-green-300">→</span>
                    </a>

                    <a
                      href={mailHref}
                      className="group flex items-center gap-4 rounded-2xl border-2 border-saffron/40 bg-saffron/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-saffron/10 hover:shadow-lg dark:border-golden/40 dark:bg-golden/10 dark:hover:bg-golden/20"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-saffron text-white shadow-md">
                        <Mail size={22} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-bold text-saffron dark:text-golden">
                          {t('booking.choose.email')}
                        </span>
                        <span className="block text-xs text-charcoal/55 dark:text-sand/55">
                          {t('booking.choose.emailDesc')} · {contactConfig.booking.email}
                        </span>
                      </span>
                      <span className="text-saffron transition-transform group-hover:translate-x-1 dark:text-golden">→</span>
                    </a>
                  </div>

                  {/* Edit + call */}
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStage('form')}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-charcoal/55 transition hover:text-saffron dark:text-sand/55 dark:hover:text-golden"
                    >
                      <PencilLine size={14} />
                      {t('booking.choose.edit')}
                    </button>
                    <a
                      href={`tel:${contactConfig.phoneHref}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal/40 transition hover:text-saffron dark:text-sand/40 dark:hover:text-golden"
                    >
                      <Phone size={12} />
                      {t('booking.choose.call')} {contactConfig.phone}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card p-6"
                >
                  <h3 className="font-heading text-lg text-maroon dark:text-golden">
                    📋 {t('booking.summary.title')}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {summaryLines.length === 0 && (
                      <li className="text-charcoal/40 dark:text-sand/40">
                        {t('booking.summary.title')}…
                      </li>
                    )}
                    {summaryLines.map((l, i) => (
                      <li key={i} className="flex gap-2 border-b border-dashed border-sand-dark/40 pb-2 text-charcoal/70 last:border-0 dark:border-ratri-edge dark:text-sand/70">
                        <span className="text-golden">🪔</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="card flex flex-col items-center gap-1.5 p-4 text-center">
                <ShieldCheck size={20} className="text-saffron" />
                <span className="text-[11px] font-bold text-charcoal/60 dark:text-sand/60">100%</span>
                <span className="text-[10px] uppercase tracking-wide text-charcoal/40 dark:text-sand/40">Trust</span>
              </div>
              <div className="card flex flex-col items-center gap-1.5 p-4 text-center">
                <IndianRupee size={20} className="text-saffron" />
                <span className="text-[11px] font-bold text-charcoal/60 dark:text-sand/60">0</span>
                <span className="text-[10px] uppercase tracking-wide text-charcoal/40 dark:text-sand/40">Advance</span>
              </div>
              <div className="card flex flex-col items-center gap-1.5 p-4 text-center">
                <MessageCircle size={20} className="text-saffron" />
                <span className="text-[11px] font-bold text-charcoal/60 dark:text-sand/60">24×7</span>
                <span className="text-[10px] uppercase tracking-wide text-charcoal/40 dark:text-sand/40">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
