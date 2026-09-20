/**
 * Turkce sozluk. Diger dillerin tip semasi bu dosyadan turer
 * (Translation = typeof tr), yani en.ts veya ru.ts icinde eksik
 * birakilan her anahtar derleme hatasi verir.
 */
export const tr = {
  code: 'tr',
  htmlLang: 'tr',
  locale: 'tr_TR',
  /** Dil secicide gorunen ad. */
  name: 'Türkçe',
  /** Bu dilin kok yolu. */
  path: '/',

  seo: {
    title: 'Yayla Yemek Evi | Pamuklu Köyü Serpme Köy Kahvaltısı - İskele, KKTC',
    description:
      'Pamuklu Köyü’nde doğanın içinde serpme köy kahvaltısı ve ev yemekleri. ' +
      '2018’den beri kendi üretimimiz taze ürünlerle geleneksel Kıbrıs lezzetleri.',
    keywords:
      'köy kahvaltısı, serpme kahvaltı, Pamuklu Köyü, İskele, Kuzey Kıbrıs, KKTC, ' +
      'ev yemekleri, doğal ürünler, geleneksel Kıbrıs lezzetleri, kahvaltı mekanı',
  },

  /** Date.getDay() sirasi: 0 = Pazar. */
  weekdays: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],

  nav: {
    mainMenu: 'Ana menü',
    footerMenu: 'Alt menü',
    skipToContent: 'İçeriğe geç',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    reserve: 'Rezervasyon',
    languageLabel: 'Dil seçimi',
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    gallery: 'Galeri',
    location: 'Konum',
    reviews: 'Yorumlar',
    contact: 'İletişim',
  },

  hero: {
    tagline: 'Doğallığın Kalbinde, Köy Kahvaltısı',
    description:
      'Pamuklu Köyü’nde doğanın içinde, doğal lezzetler ve serpme köy kahvaltısı sizi bekliyor.',
    imageAlt: 'Yayla Yemek Evi’nin doğa içindeki bahçesi',
  },

  about: {
    title: 'Hakkımızda',
    intro:
      '{name}, doğallık ve geleneksel tatların buluştuğu bir köy restoranıdır. ' +
      'Pamuklu Köyü’nde, kendi üretimimiz taze ürünlerle hazırladığımız ev yemekleri ve ' +
      'kahvaltılarla misafirlerimize unutulmaz bir lezzet deneyimi sunuyoruz.',
    welcomeNote:
      'Kapımızdan girenleri müşteri olarak değil, misafir olarak karşılıyoruz. ' +
      'Sofranızda ikramlarımızı görmeden kalkmanıza izin vermeyiz.',
    features: [
      {
        title: 'Doğal Ürünler',
        description:
          'Her sabah özenle seçtiğimiz taze ve katkısız kahvaltılıklarla, doğallığı sofranıza taşıyoruz.',
      },
      {
        title: 'Geleneksel Lezzetler',
        description: 'Köy kahvaltısının özgün tatları ve ev yapımı lezzetler',
      },
      {
        title: 'Aile Sıcaklığı',
        description: 'Samimi ortam ve misafirperverliğimizle unutulmaz anlar',
      },
    ],
    badgeSince: '{year}’den beri',
    badgeServing: 'hizmetinizdeyiz',
    imageAlt: 'Yayla Yemek Evi’nde doğal ortamda hazırlanmış köy kahvaltısı',
  },

  gallery: {
    title: 'Fotoğraf Galerisi',
    subtitle: 'Doğal lezzetlerimizi ve samimi ortamımızı keşfedin',
    groupLabel: 'Restoran fotoğrafları',
    roleDescription: 'galeri',
    previous: 'Önceki fotoğraf',
    next: 'Sonraki fotoğraf',
    /** {n}, {total} ve {alt} yer tutuculari doldurulur. */
    photoStatus: 'Fotoğraf {n} / {total}: {alt}',
    thumbLabel: '{n}. fotoğrafı göster: {alt}',
    alts: {
      slide2: 'Serpme köy kahvaltısı tabakları',
      slide3: 'Doğal ortamda kurulmuş yemek masası',
      slide4: 'Köy ortamı ve bahçe',
      slide5: 'Ahşap masa düzeni',
      slide6: 'Doğal bahçe manzarası',
    },
  },

  location: {
    title: 'Bizi Nasıl Bulursunuz?',
    addressTitle: 'Adresimiz',
    directions: 'Yol tarifi al',
    hoursTitle: 'Çalışma Saatleri',
    closed: 'Kapalı',
    openNow: 'Şu an açık',
    closedNow: 'Şu an kapalı',
    closesAt: 'Kapanış',
    opensAt: 'Açılış',
    today: 'bugün',
    todayTag: '(bugün)',
    reservationHint: 'Özellikle hafta sonları için rezervasyon önerilir.',
    openInMaps: 'Google Haritalar’da aç',
    mapTitle: 'konumu - Google Haritalar',
  },

  reviews: {
    title: 'Misafirlerimiz Ne Diyor?',
    googleReviews: 'Google Yorumları',
    shareYours: 'Siz de deneyiminizi paylaşın',
    writeReview: 'Google’da Yorum Yap',
    /** TR icin not gerekmiyor; bos birakilirsa gosterilmez. */
    languageNote: '',
  },

  contact: {
    title: 'İletişim',
    subtitle: 'Rezervasyon ve bilgi için bizi arayın',
    phone: 'Telefon',
    email: 'E-posta',
    address: 'Adres',
    facebook: 'Facebook',
    instagram: 'Instagram',
    followUs: 'Bizi takip edin',
    reserveTitle: 'Rezervasyon Yapın',
    reserveText:
      'Özellikle hafta sonları için rezervasyon yapmanızı öneriyoruz. ' +
      'Sizleri doğanın kalbinde ağırlamaktan mutluluk duyarız.',
    callNow: 'Hemen Ara',
  },

  footer: {
    instagramLabel: 'Instagram sayfası',
    facebookLabel: 'Facebook sayfası',
    rights: 'Tüm hakları saklıdır.',
    /** {dev} yerine gelistiricinin alan adi link olarak yerlesir. */
    developedBy: '{dev} tarafından geliştirildi',
  },
};

export type Translation = typeof tr;
