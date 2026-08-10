/**
 * Gallery dataset — vibrant imagery of Gaya Ji with category tags.
 * `tall` marks portrait-oriented images for the masonry layout.
 */
export const galleryCategories = [
  { id: 'all', icon: '🌸' },
  { id: 'temple', icon: '🛕' },
  { id: 'river', icon: '🌊' },
  { id: 'ritual', icon: '🪔' },
  { id: 'nature', icon: '🌳' },
];

export const galleryData = [
  {
    id: 'vishnupad-dawn',
    src: 'assets/hero-vishnupad.jpg',
    tags: ['temple'],
    tall: false,
    caption: {
      hi: 'भोर की पहली किरणों में विष्णुपद मंदिर',
      en: 'Vishnupad Temple in the first light of dawn',
      bn: 'ভোরের প্রথম আলোয় বিষ্ণুপদ মন্দির',
      gu: 'પરોઢના પહેલા પ્રકાશમાં વિષ્ણુપદ મંદિર',
      pa: 'ਸਵੇਰ ਦੀ ਪਹਿਲੀ ਰੋਸ਼ਨੀ ਵਿੱਚ ਵਿਸ਼ਨੂੰ ਪਦ ਮੰਦਰ',
    },
  },
  {
    id: 'falgu-sandbank',
    src: 'assets/gallery-falgu.jpg',
    tags: ['river', 'ritual'],
    tall: true,
    caption: {
      hi: 'फल्गु नदी के रेतीले तट पर तर्पण',
      en: 'Tarpan on the sandy banks of the Falgu',
      bn: 'ফল্গু নদীর বালুকা তীরে তর্পণ',
      gu: 'ફલ્ગુ નદીના રેતાળ કિનારે તર્પણ',
      pa: 'ਫਲਗੂ ਨਦੀ ਦੇ ਰੇਤਲੇ ਕੰਢੇ ਤਰਪਣ',
    },
  },
  {
    id: 'pind-offering',
    src: 'assets/gallery-pind.jpg',
    tags: ['ritual'],
    tall: true,
    caption: {
      hi: 'पिंडदान — श्रद्धा का पहला अर्पण',
      en: 'Pind Daan — the first offering of devotion',
      bn: 'পিণ্ডদান — শ্রদ্ধার প্রথম অর্পণ',
      gu: 'પિંડદાન — શ્રદ્ધાનું પ્રથમ અર્પણ',
      pa: 'ਪਿੰਡ ਦਾਨ — ਸ਼ਰਧਾ ਦਾ ਪਹਿਲਾ ਅਰਪਣ',
    },
  },
  {
    id: 'akshayavat',
    src: 'assets/gallery-akshayavat.jpg',
    tags: ['nature', 'temple'],
    tall: false,
    caption: {
      hi: 'अक्षयवट — अमर बरगद का पवित्र छाँव',
      en: 'Akshayavat — the sacred shade of the immortal banyan',
      bn: 'অক্ষয়বট — অমর বটবৃক্ষের পবিত্র ছায়া',
      gu: 'અક્ષયવટ — અમર બરગદનો પવિત્ર છાંયડો',
      pa: 'ਅਕਸ਼ੈ ਵਟ — ਅਮਰ ਬੋਹੜ ਦੀ ਪਵਿੱਤਰ ਛਾਂ',
    },
  },
  {
    id: 'ghat-diyas',
    src: 'assets/gallery-ghat.jpg',
    tags: ['river', 'ritual'],
    tall: false,
    caption: {
      hi: 'संध्या आरती — घाट पर दीपों की माला',
      en: 'Evening aarti — a garland of lamps on the ghat',
      bn: 'সন্ধ্যা আরতি — ঘাটে প্রদীপের মালা',
      gu: 'સંધ્યા આરતી — ઘાટ પર દીપોની માળા',
      pa: 'ਸੰਧਿਆ ਆਰਤੀ — ਘਾਟ ਉੱਤੇ ਦੀਵਿਆਂ ਦੀ ਮਾਲਾ',
    },
  },
  {
    id: 'temple-bells',
    src: 'assets/gallery-bell.jpg',
    tags: ['temple'],
    tall: true,
    caption: {
      hi: 'मंदिर की पीतल की घंटियाँ',
      en: 'Brass bells of the temple courtyard',
      bn: 'মন্দিরের পিতলের ঘণ্টা',
      gu: 'મંદિરની પિત્તળની ઘંટડીઓ',
      pa: 'ਮੰਦਰ ਦੀਆਂ ਪਿੱਤਲ ਦੀਆਂ ਘੰਟੀਆਂ',
    },
  },
  {
    id: 'aarti-thali',
    src: 'assets/gallery-aarti.jpg',
    tags: ['ritual', 'temple'],
    tall: false,
    caption: {
      hi: 'आरती थाल — ज्योत, फूल और धूप',
      en: 'Aarti thali — flame, flowers and incense',
      bn: 'আরতি থাল — জ্যোতি, ফুল ও ধূপ',
      gu: 'આરતી થાળ — જ્યોત, ફૂલ અને ધૂપ',
      pa: 'ਆਰਤੀ ਥਾਲ — ਜੋਤ, ਫੁੱਲ ਤੇ ਧੂਪ',
    },
  },
  {
    id: 'pretshila-hill',
    src: 'assets/gallery-pretshila.jpg',
    tags: ['nature', 'temple'],
    tall: true,
    caption: {
      hi: 'प्रेतशिला पर्वत की सीढ़ियाँ',
      en: 'The stone steps of Pretshila hill',
      bn: 'প্রেতশিলা পাহাড়ের পাথরের সিঁড়ি',
      gu: 'પ્રેતશિલા પહાડનાં પગથિયાં',
      pa: 'ਪ੍ਰੇਤਸ਼ਿਲਾ ਪਹਾੜ ਦੀਆਂ ਪੌੜੀਆਂ',
    },
  },
  {
    id: 'falgu-tarpan',
    src: 'assets/gallery-falgu.jpg',
    tags: ['river'],
    tall: false,
    caption: {
      hi: 'फल्गु तट — पितरों के नाम जलांजलि',
      en: 'Falgu bank — water offerings for the ancestors',
      bn: 'ফল্গু তীর — পিতৃপুরুষের নামে জলাঞ্জলি',
      gu: 'ફલ્ગુ કિનારો — પિતૃઓના નામે જળાંજલિ',
      pa: 'ਫਲਗੂ ਕੰਢਾ — ਪਿਤਰਾਂ ਦੇ ਨਾਮ ਜਲਾਂਜਲੀ',
    },
  },
  {
    id: 'samagri-kit',
    src: 'assets/gallery-pind.jpg',
    tags: ['ritual'],
    tall: false,
    caption: {
      hi: 'पिंडदान सामग्री — तिल, कुश, जौ और गुड़',
      en: 'Pind Daan samagri — til, kusha, barley and jaggery',
      bn: 'পিণ্ডদান সামগ্রী — তিল, কুশ, যব ও গুড়',
      gu: 'પિંડદાન સામગ્રી — તલ, કુશ, જવ અને ગોળ',
      pa: 'ਪਿੰਡ ਦਾਨ ਸਮੱਗਰੀ — ਤਿਲ, ਕੁਸ਼, ਜੌਂ ਤੇ ਗੁੜ',
    },
  },
  {
    id: 'vishnupad-spire',
    src: 'assets/hero-vishnupad.jpg',
    tags: ['temple', 'nature'],
    tall: false,
    caption: {
      hi: 'विष्णुपद का शिखर आकाश को छूता हुआ',
      en: 'The spire of Vishnupad reaching the sky',
      bn: 'আকাশ ছোঁয়া বিষ্ণুপদ-এর শিখর',
      gu: 'આકાશને અડકતું વિષ્ણુપદનું શિખર',
      pa: 'ਅਸਮਾਨ ਨੂੰ ਛੋਹਂਦੀ ਵਿਸ਼ਨੂੰ ਪਦ ਦੀ ਕਲਸ਼ੀ',
    },
  },
  {
    id: 'ghat-sandhya',
    src: 'assets/gallery-ghat.jpg',
    tags: ['river'],
    tall: true,
    caption: {
      hi: 'गोधूलि बेला — गया के घाटों का स्वर्णिम रंग',
      en: 'Godhuli vela — the golden hour on Gaya ghats',
      bn: 'গোধূলি বেলা — গয়ার ঘাটের সোনালি রং',
      gu: 'ગોધૂલિ વેળા — ગયાના ઘાટનો સોનેરી રંગ',
      pa: 'ਗੋਧੂਲੀ ਵੇਲਾ — ਗਯਾ ਦੇ ਘਾਟਾਂ ਦਾ ਸੁਨਹਿਰੀ ਰੰਗ',
    },
  },
];

export default galleryData;
