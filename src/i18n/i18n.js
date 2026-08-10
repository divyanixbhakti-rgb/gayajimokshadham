import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import hi from './locales/hi.json';
import en from './locales/en.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import pa from './locales/pa.json';

/**
 * Gaya Ji Pitrapaksh Seva — i18n
 * Hindi is the default; English, Bengali, Gujarati & Punjabi supported.
 * Any missing key falls back hi → en so the UI is never empty.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      hi: { translation: hi },
      en: { translation: en },
      bn: { translation: bn },
      gu: { translation: gu },
      pa: { translation: pa },
    },
    fallbackLng: ['hi', 'en'],
    supportedLngs: ['hi', 'en', 'bn', 'gu', 'pa'],
    returnObjects: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gaya-ji-lang',
    },
  });

export default i18n;
