/**
 * ─────────────────────────────────────────────────────────────
 *  CONTACT CONFIG — Edit these values in ONE place.
 *  Everything (footer, WhatsApp button, booking, maps) reads
 *  from this file. Update the placeholders before going live.
 * ─────────────────────────────────────────────────────────────
 */
export const contactConfig = {
  brand: 'Gaya Ji Pitrapaksh Seva',
  domain: 'GayaJiPindDaan.com',
  tagline: 'गया जी पितृपक्ष सेवा — श्रद्धा का पवित्र संकल्प',

  phone: '+91 91231 71655',
  phoneHref: '+919123171655',
  whatsapp: '919123171655',
  email: 'DivyaNix.bhakti@gmail.com',

  address: {
    line1: 'Near Vishnupad Temple, Deoghat Road',
    line2: 'Gaya, Bihar — 823001, India',
    mapsQuery: 'Vishnupad Temple, Gaya, Bihar 823001',
  },

  // Open hours for seva desk (Pitru Paksha season runs 24×7)
  timings: [
    { day: { hi: 'प्रातः सेवा', en: 'Morning Seva', bn: 'সকাল সেবা', gu: 'સવાર સેવા', pa: 'ਸਵੇਰ ਦੀ ਸੇਵਾ' }, time: '04:30 – 12:00' },
    { day: { hi: 'अपराह्न सेवा', en: 'Afternoon Seva', bn: 'দুপুর সেবা', gu: 'બપોર સેવા', pa: 'ਦੁਪਹਿਰ ਦੀ ਸੇਵਾ' }, time: '14:00 – 18:00' },
    { day: { hi: 'पितृपक्ष काल', en: 'Pitru Paksha Season', bn: 'পিতৃপক্ষ কাল', gu: 'પિતૃપક્ષ કાળ', pa: 'ਪਿਤਰ ਪੱਖ ਸਮਾਂ' }, time: '24 × 7' },
  ],

  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  },

  // Maps & coordinates
  map: {
    lat: 24.7769,
    lng: 84.9877,
    zoom: 15,
  },

  // Booking engine defaults
  booking: {
    email: 'DivyaNix.bhakti@gmail.com',
    whatsapp: '919123171655',
    currency: '₹',
  },

  // Small print
  disclaimer:
    'This is a demo service website. Please verify all prices, tithi timings and availability directly with the seva desk before confirming any booking.',
};

export default contactConfig;
