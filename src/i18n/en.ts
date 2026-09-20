import type { Translation } from './tr';

/** Ingilizce sozluk. Eksik anahtar birakilirsa TypeScript hata verir. */
export const en: Translation = {
  code: 'en',
  htmlLang: 'en',
  locale: 'en_GB',
  name: 'English',
  path: '/en/',

  seo: {
    title: 'Yayla Yemek Evi | Village Breakfast in Pamuklu - Iskele, North Cyprus',
    description:
      'Traditional Cypriot village breakfast and home cooking in the countryside of Pamuklu, ' +
      'North Cyprus. Serving fresh, home-grown produce since 2018.',
    keywords:
      'village breakfast north cyprus, cypriot breakfast, Pamuklu, Iskele, TRNC, ' +
      'traditional cypriot food, home cooking, restaurant north cyprus, where to eat Iskele',
  },

  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],

  nav: {
    mainMenu: 'Main menu',
    footerMenu: 'Footer menu',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    reserve: 'Reservation',
    languageLabel: 'Choose language',
    home: 'Home',
    about: 'About Us',
    gallery: 'Gallery',
    location: 'Location',
    reviews: 'Reviews',
    contact: 'Contact',
  },

  hero: {
    tagline: 'Village Breakfast in the Heart of Nature',
    description:
      'Traditional Cypriot spread breakfast and natural flavours, surrounded by the countryside of Pamuklu.',
    imageAlt: 'The garden of Yayla Yemek Evi surrounded by nature',
  },

  about: {
    title: 'About Us',
    intro:
      '{name} is a village restaurant where nature and traditional flavours meet. In Pamuklu ' +
      'we serve home cooking and breakfasts prepared with our own fresh produce, for a meal ' +
      'our guests remember.',
    welcomeNote:
      'We welcome everyone who walks through our door as a guest, not a customer. ' +
      'You will not leave the table without tasting something on the house.',
    features: [
      {
        title: 'Natural Produce',
        description:
          'Every morning we bring fresh, additive-free breakfast ingredients straight to your table.',
      },
      {
        title: 'Traditional Flavours',
        description: 'The authentic tastes of a Cypriot village breakfast, all homemade',
      },
      {
        title: 'Family Warmth',
        description: 'A friendly setting and the hospitality that makes the visit memorable',
      },
    ],
    badgeSince: 'Since {year}',
    badgeServing: 'at your service',
    imageAlt: 'A village breakfast served in the open air at Yayla Yemek Evi',
  },

  gallery: {
    title: 'Photo Gallery',
    subtitle: 'Discover our natural flavours and welcoming setting',
    groupLabel: 'Restaurant photos',
    roleDescription: 'gallery',
    previous: 'Previous photo',
    next: 'Next photo',
    photoStatus: 'Photo {n} of {total}: {alt}',
    thumbLabel: 'Show photo {n}: {alt}',
    alts: {
      slide2: 'Plates of a traditional Cypriot spread breakfast',
      slide3: 'A dining table set outdoors',
      slide4: 'The village setting and garden',
      slide5: 'Wooden table arrangement',
      slide6: 'View over the natural garden',
    },
  },

  location: {
    title: 'How to Find Us',
    addressTitle: 'Our Address',
    directions: 'Get directions',
    hoursTitle: 'Opening Hours',
    closed: 'Closed',
    openNow: 'Open now',
    closedNow: 'Closed now',
    closesAt: 'Closes',
    opensAt: 'Opens',
    today: 'today',
    todayTag: '(today)',
    reservationHint: 'Booking is recommended, especially at weekends.',
    openInMaps: 'Open in Google Maps',
    mapTitle: 'location - Google Maps',
  },

  reviews: {
    title: 'What Our Guests Say',
    googleReviews: 'Google Reviews',
    shareYours: 'Share your experience too',
    writeReview: 'Write a Google Review',
    languageNote: 'Reviews are shown in the language they were written in.',
  },

  contact: {
    title: 'Contact',
    subtitle: 'Call us for reservations and information',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    facebook: 'Facebook',
    instagram: 'Instagram',
    followUs: 'Follow us',
    reserveTitle: 'Make a Reservation',
    reserveText:
      'We recommend booking ahead, especially at weekends. ' +
      'It would be our pleasure to host you in the heart of nature.',
    callNow: 'Call Now',
  },

  footer: {
    rights: 'All rights reserved.',
    developedBy: 'Developed by {dev}',
  },
};
