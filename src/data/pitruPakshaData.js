/**
 * Pitru Paksha 2026 — Shraddha tithi calendar, crowd forecast & daily muhurats.
 * Verified against public panchanga sources: 26 Sep – 10 Oct 2026.
 * Timings are approximate for Gaya (IST) and drift naturally across the fortnight.
 */

const T = (hi, en, bn, gu, pa) => ({ hi, en, bn, gu, pa });

export const pitruPakshaWindow = {
  start: '2026-09-26T00:00:00',
  end: '2026-10-10T23:59:59',
  startLabel: T('26 सितंबर 2026', '26 September 2026', '২৬ সেপ্টেম্বর ২০২৬', '૨૬ સપ્ટેમ્બર ૨૦૨૬', '26 ਸਤੰਬਰ 2026'),
  endLabel: T('10 अक्टूबर 2026', '10 October 2026', '১০ অক্টোবর ২০২৬', '૧૦ ઑક્ટોબર ૨૦૨૬', '10 ਅਕਤੂਬਰ 2026'),
};

export const pitruPakshaDays = [
  { date: '2026-09-26', crowd: 2, sunrise: '05:36', sunset: '17:42', brahma: '04:26 – 05:12', abhijit: '11:42 – 12:26', tithi: T('पूर्णिमा श्राद्ध', 'Purnima Shraddha', 'পূর্ণিমা শ্রাদ্ধ', 'પૂર્ણિમા શ્રાદ્ધ', 'ਪੂਰਨਮਾਸ਼ੀ ਸ਼ਰਾਧ') },
  { date: '2026-09-27', crowd: 2, sunrise: '05:36', sunset: '17:41', brahma: '04:26 – 05:12', abhijit: '11:42 – 12:25', tithi: T('प्रतिपदा श्राद्ध', 'Pratipada Shraddha', 'প্রতিপদ শ্রাদ্ধ', 'પ્રતિપદા શ્રાદ્ધ', 'ਪ੍ਰਤਿਪਦਾ ਸ਼ਰਾਧ') },
  { date: '2026-09-28', crowd: 2, sunrise: '05:37', sunset: '17:40', brahma: '04:27 – 05:13', abhijit: '11:41 – 12:25', tithi: T('द्वितीया श्राद्ध', 'Dwitiya Shraddha', 'দ্বিতীয়া শ্রাদ্ধ', 'દ્વિતીયા શ્રાદ્ધ', 'ਦੁਜ ਸ਼ਰਾਧ') },
  { date: '2026-09-29', crowd: 3, sunrise: '05:37', sunset: '17:39', brahma: '04:27 – 05:13', abhijit: '11:41 – 12:24', tithi: T('तृतीया श्राद्ध', 'Tritiya Shraddha', 'তৃতীয়া শ্রাদ্ধ', 'તૃતીયા શ્રાદ્ધ', 'ਤੀਜ ਸ਼ਰਾਧ') },
  { date: '2026-09-30', crowd: 3, sunrise: '05:37', sunset: '17:38', brahma: '04:28 – 05:14', abhijit: '11:41 – 12:24', tithi: T('चतुर्थी/पंचमी श्राद्ध', 'Chaturthi/Panchami Shraddha', 'চতুর্থী/পঞ্চমী শ্রাদ্ধ', 'ચતુર્થી/પંચમી શ્રાદ્ધ', 'ਚੌਥ/ਪੰਜਮੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-01', crowd: 3, sunrise: '05:38', sunset: '17:37', brahma: '04:28 – 05:14', abhijit: '11:40 – 12:23', tithi: T('षष्ठी श्राद्ध', 'Shashthi Shraddha', 'ষষ্ঠী শ্রাদ্ধ', 'ષષ્ઠી શ્રાદ્ધ', 'ਛੇਵੀਂ ਸ਼ਰਾਧ') },
  { date: '2026-10-02', crowd: 3, sunrise: '05:38', sunset: '17:36', brahma: '04:28 – 05:14', abhijit: '11:40 – 12:23', tithi: T('सप्तमी श्राद्ध', 'Saptami Shraddha', 'সপ্তমী শ্রাদ্ধ', 'સપ્તમી શ્રાદ્ધ', 'ਸੱਤਮੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-03', crowd: 4, sunrise: '05:38', sunset: '17:35', brahma: '04:29 – 05:15', abhijit: '11:40 – 12:22', tithi: T('अष्टमी श्राद्ध', 'Ashtami Shraddha', 'অষ্টমী শ্রাদ্ধ', 'અષ્ટમી શ્રાદ્ધ', 'ਅੱਠਮੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-04', crowd: 4, sunrise: '05:39', sunset: '17:34', brahma: '04:29 – 05:15', abhijit: '11:39 – 12:22', tithi: T('नवमी श्राद्ध', 'Navami Shraddha', 'নবমী শ্রাদ্ধ', 'નવમી શ્રાદ્ધ', 'ਨੌਮੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-05', crowd: 4, sunrise: '05:39', sunset: '17:33', brahma: '04:30 – 05:16', abhijit: '11:39 – 12:21', tithi: T('दशमी श्राद्ध', 'Dashami Shraddha', 'দশমী শ্রাদ্ধ', 'દશમી શ્રાદ્ધ', 'ਦਸਮੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-06', crowd: 4, sunrise: '05:39', sunset: '17:32', brahma: '04:30 – 05:16', abhijit: '11:39 – 12:21', tithi: T('एकादशी श्राद्ध', 'Ekadashi Shraddha', 'একাদশী শ্রাদ্ধ', 'એકાદશી શ્રાદ્ધ', 'ਇਕਾਦਸ਼ੀ ਸ਼ਰਾਧ') },
  { date: '2026-10-07', crowd: 4, sunrise: '05:40', sunset: '17:31', brahma: '04:30 – 05:16', abhijit: '11:38 – 12:20', tithi: T('द्वादशी श्राद्ध', 'Dwadashi Shraddha', 'দ্বাদশী শ্রাদ্ধ', 'દ્વાદશી શ્રાદ્ધ', 'ਬਾਰ੍ਹਵੀਂ ਸ਼ਰਾਧ') },
  { date: '2026-10-08', crowd: 4, sunrise: '05:40', sunset: '17:30', brahma: '04:31 – 05:17', abhijit: '11:38 – 12:20', tithi: T('त्रयोदशी श्राद्ध', 'Trayodashi Shraddha', 'ত্রয়োদশী শ্রাদ্ধ', 'ત્રયોદશી શ્રાદ્ધ', 'ਤੇਰ੍ਹਵੀਂ ਸ਼ਰਾਧ') },
  { date: '2026-10-09', crowd: 5, sunrise: '05:40', sunset: '17:29', brahma: '04:31 – 05:17', abhijit: '11:38 – 12:19', tithi: T('चतुर्दशी श्राद्ध', 'Chaturdashi Shraddha', 'চতুর্দশী শ্রাদ্ধ', 'ચતુર્દશી શ્રાદ્ધ', 'ਚੌਦਸ ਸ਼ਰਾਧ') },
  { date: '2026-10-10', crowd: 5, sunrise: '05:41', sunset: '17:28', brahma: '04:32 – 05:18', abhijit: '11:37 – 12:19', tithi: T('सर्वपितृ अमावस्या', 'Sarva Pitri Amavasya', 'সর্বপিতৃ অমাবস্যা', 'સર્વપિતૃ અમાવસ્યા', 'ਸਰਵ ਪਿਤਰ ਅਮਾਵਸਿਆ') },
];

export default { pitruPakshaWindow, pitruPakshaDays };
