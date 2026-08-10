import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import { pick } from '../data/lang';
import OmDivider from './OmDivider';

export default function ContactFooter() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/vedis', label: t('nav.vedis') },
    { to: '/booking', label: t('nav.booking') },
    { to: '/pitrapaksha', label: t('nav.pitrapaksha') },
    { to: '/knowledge', label: t('nav.knowledge') },
    { to: '/gallery', label: t('nav.gallery') },
  ];

  return (
    <>
      {/* ── Footer ─────────────────────────────────── */}
      <footer id="contact" className="relative overflow-hidden bg-maroon text-sand">
        <div className="absolute inset-0 bg-om-pattern opacity-20" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 select-none font-heading text-[14rem] leading-none text-golden/5">
          ॐ
        </div>

        <div className="container-x relative z-10 py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-golden font-heading text-xl text-white shadow-glow">
                  ॐ
                </span>
                <div>
                  <div className="font-heading text-lg text-golden">{t('app.name')}</div>
                  <div className="text-[11px] font-bold tracking-[0.18em] text-sand/60">
                    {t('app.brand')}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-sand/70">{t('footer.tagline')}</p>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-sand/50">
                <Heart size={12} className="text-saffron" />
                {t('footer.madeWith')} · {contactConfig.domain}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-heading text-lg text-golden">{t('footer.quickLinks')}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="inline-flex items-center gap-2 text-sand/70 transition hover:translate-x-1 hover:text-golden"
                    >
                      <span className="text-golden/70">🪔</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-lg text-golden">{t('footer.contactUs')}</h4>
              <ul className="mt-4 space-y-3 text-sm text-sand/75">
                <li className="flex gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-golden" />
                  <span>
                    {contactConfig.address.line1}
                    <br />
                    {contactConfig.address.line2}
                  </span>
                </li>
                <li>
                  <a href={`tel:${contactConfig.phoneHref}`} className="flex items-center gap-2.5 transition hover:text-golden">
                    <Phone size={16} className="shrink-0 text-golden" />
                    {contactConfig.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contactConfig.email}`} className="flex items-center gap-2.5 transition hover:text-golden">
                    <Mail size={16} className="shrink-0 text-golden" />
                    {contactConfig.email}
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex gap-2.5">
                {[
                  { href: contactConfig.social.facebook, icon: Facebook, label: 'Facebook' },
                  { href: contactConfig.social.instagram, icon: Instagram, label: 'Instagram' },
                  { href: contactConfig.social.youtube, icon: Youtube, label: 'YouTube' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sand/70 transition hover:bg-golden hover:text-maroon"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Timings */}
            <div>
              <h4 className="font-heading text-lg text-golden">{t('footer.timings')}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {contactConfig.timings.map((tm, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sand/75">
                    <Clock size={15} className="mt-0.5 shrink-0 text-golden" />
                    <span>
                      <span className="font-semibold text-sand">{pick(tm.day, lang)}</span>
                      <span className="mx-1.5 text-golden/60">·</span>
                      <span className="text-sand/60">{tm.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-white/5 px-3 py-2.5 text-xs leading-relaxed text-sand/55">
                {t('footer.hours')}
              </p>
            </div>
          </div>

          <OmDivider className="mt-12 opacity-60" />

          <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-sand/50 md:flex-row">
            <p>
              © {new Date().getFullYear()} {t('app.name')} · {t('app.brand')} · {t('footer.rights')}
            </p>
            <p className="max-w-md text-center md:text-right">{t('footer.disclaimer')}</p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ──────────────── */}
      <a
        href={`https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(`🙏 ${t('app.name')} — नमस्ते, मुझे सेवा की जानकारी चाहिए।`)}`}
        target="_blank"
        rel="noreferrer"
        aria-label={t('common.whatsappUs')}
        className="group fixed bottom-5 right-5 z-[80] flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-green-600/40 transition-all hover:scale-105 hover:shadow-xl"
      >
        <MessageCircle size={26} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[120px] group-hover:pr-1">
          {t('common.whatsappUs')}
        </span>
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
      </a>
    </>
  );
}
