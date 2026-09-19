/**
 * Isletmeye ait tum sabit bilgilerin tek kaynagi.
 *
 * Telefon, adres, saatler gibi veriler eskiden 5 ayri bilesende
 * tekrarlaniyordu; buradan okununca bir degisiklik tek yerde yapiliyor.
 * vite.config.ts de bu dosyayi okuyup index.html'e meta etiketlerini
 * ve JSON-LD yapisal verisini uretiyor.
 */

/** schema.org karsiliklari, ayni sirada. */
export const SCHEMA_WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export type DayHours =
  | { closed: true }
  /** "08:00" - "24:00" (24:00 = gece yarisi kapanis). */
  | { closed: false; opens: string; closes: string };

const EVERY_DAY: DayHours = { closed: false, opens: '08:00', closes: '24:00' };

export const site = {
  name: 'Yayla Yemek Evi',
  url: 'https://yaylayemekevi.com',
  locale: 'tr_TR',
  foundingYear: 2018,
  /** Hakkimizda metninde kullanilir. Kullanici adin gecmesini onayladi. */
  owner: "Cavit Bey",

  phone: {
    /** Ekranda gorunen bicim. */
    display: '+90 533 847 1010',
    /** tel: linki ve schema icin E.164. */
    e164: '+905338471010',
  },

  email: 'yaylayemekevi@gmail.com',

  address: {
    street: 'Pamuklu Köyü',
    locality: 'İskele',
    region: 'Kuzey Kıbrıs',
    /** ISO 3166-1 alpha-2. */
    country: 'CY',
  },

  /** Google Maps kisa linkinden cozulen gercek konum. */
  geo: {
    latitude: 35.3972296,
    longitude: 34.0745119,
  },

  maps: {
    /** Isletmenin Google Maps sayfasi. */
    place: 'https://maps.app.goo.gl/wcYphXJ9DXy4kK6s6',
    /** Mobilde dogrudan navigasyon uygulamasini acar. */
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=35.3972296%2C34.0745119',
  },

  social: {
    instagram: 'https://instagram.com/yaylayemekevi',
    facebook:
      'https://www.facebook.com/profile.php?id=100063710611861&locale=tr_TR',
  },

  /** Indeks = Date.getDay(). Pazartesi kapali, diger gunler 08:00 - gece yarisi. */
  hours: [
    EVERY_DAY, // Pazar
    { closed: true }, // Pazartesi
    EVERY_DAY, // Sali
    EVERY_DAY, // Carsamba
    EVERY_DAY, // Persembe
    EVERY_DAY, // Cuma
    EVERY_DAY, // Cumartesi
  ] as readonly DayHours[],
} as const;

/** tel: href'i tek yerden uretmek icin. */
export const telHref = `tel:${site.phone.e164}`;
export const mailHref = `mailto:${site.email}`;

/** Gun adlari ceviri dosyalarinda (src/i18n); burada yalnizca dil bagimsiz veri tutulur. */
export const formattedAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region}`;
