import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { site, SCHEMA_WEEKDAYS, formattedAddress } from './src/config/site';
import { LANGUAGES, DEFAULT_LANGUAGE, type Translation } from './src/i18n/languages';

const OG_IMAGE = `${site.url}/og-image.jpg`;

/** Bu dilin tam URL'i: tr -> https://.../, en -> https://.../en/ */
const urlFor = (language: Translation) => `${site.url}${language.path}`;

/** Build ciktisindaki HTML yolundan dili bulur: en/index.html -> en */
const languageForHtml = (htmlPath: string): Translation => {
  const segment = htmlPath.replace(/^\/+/, '').split('/')[0];
  return LANGUAGES.find((l) => l.code === segment) ?? LANGUAGES[0];
};

/**
 * Hero gorseli React render olduktan sonra kesfedilir; bu da LCP'yi
 * JS'in inip calismasina baglar. Bu eklenti build ciktisindaki hashli
 * hero turevlerini bulup her HTML sayfasina preload olarak enjekte eder.
 *
 * order: 'post' sart -- ctx.bundle yalnizca generateBundle asamasinda dolu olur.
 */
const preloadHero = (slug: string, sizes: string): Plugin => ({
  name: 'preload-hero-image',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.bundle) return html;

      const prefix = `${slug}-`;
      const srcSet = Object.keys(ctx.bundle)
        .flatMap((fileName) => {
          // ornek: assets/herosection-960-C1Q1RNS6.avif
          const base = fileName.split('/').pop() ?? '';
          if (!base.startsWith(prefix) || !base.endsWith('.avif')) return [];
          const width = Number.parseInt(base.slice(prefix.length), 10);
          return Number.isInteger(width) ? [{ width, fileName }] : [];
        })
        .sort((a, b) => a.width - b.width)
        .map(({ fileName, width }) => `/${fileName} ${width}w`)
        .join(', ');

      // Turev yoksa (npm run images calismamis) preload atlanir.
      if (!srcSet) return html;

      return {
        html,
        tags: [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/avif',
              imagesrcset: srcSet,
              imagesizes: sizes,
              fetchpriority: 'high',
            },
            injectTo: 'head',
          },
        ],
      };
    },
  },
});

/** Calisma saatlerini schema.org OpeningHoursSpecification bicimine cevirir. */
const openingHoursSpecification = () =>
  site.hours.map((day, index) =>
    day.closed
      ? // Kapali gunun Google tarafindan beklenen gosterimi: acilis ve kapanis ayni an.
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: SCHEMA_WEEKDAYS[index],
          opens: '00:00',
          closes: '00:00',
        }
      : {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: SCHEMA_WEEKDAYS[index],
          opens: day.opens,
          // 24:00 (gece yarisi kapanis) schema.org bicimde 00:00 olarak yazilir.
          closes: day.closes === '24:00' ? '00:00' : day.closes,
        }
  );

/**
 * Yapisal veri notu: Google Yorumlari bilincli olarak aggregateRating veya
 * Review olarak isaretlenmiyor. Google yapisal veri politikasi baska
 * sitelerden toplanan puanlarin isaretlenmesini yasakliyor; isletme puani
 * zaten Maps verisinden Bilgi Panelinde gosteriliyor.
 */
const restaurantSchema = (language: Translation) => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  // Uc dil ayni isletmeyi anlatiyor: tek @id kullanilir.
  '@id': `${site.url}/#restaurant`,
  name: site.name,
  description: language.seo.description,
  url: urlFor(language),
  inLanguage: language.htmlLang,
  telephone: site.phone.e164,
  email: site.email,
  image: [OG_IMAGE],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  hasMap: site.maps.place,
  sameAs: [site.social.instagram, site.social.facebook, site.maps.place],
  foundingDate: String(site.foundingYear),
  servesCuisine: ['Cypriot', 'Turkish', 'Breakfast'],
  acceptsReservations: 'True',
  openingHoursSpecification: openingHoursSpecification(),
});

/** Arama motoru meta etiketleri, hreflang, JSON-LD, robots.txt ve sitemap.xml uretir. */
const seo = (): Plugin => ({
  name: 'seo-meta',
  transformIndexHtml: {
    order: 'pre',
    handler: (html, ctx) => {
      const language = languageForHtml(ctx.path);
      const pageUrl = urlFor(language);
      const title = language.seo.title;

      return {
        html,
        tags: [
          { tag: 'title', children: title, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'description', content: language.seo.description }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'keywords', content: language.seo.keywords }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'canonical', href: pageUrl }, injectTo: 'head' },

          // hreflang: Google'a uc dilin ayni sayfanin karsiliklari oldugunu soyler.
          ...LANGUAGES.map((alternate) => ({
            tag: 'link',
            attrs: {
              rel: 'alternate',
              hreflang: alternate.htmlLang,
              href: urlFor(alternate),
            },
            injectTo: 'head' as const,
          })),
          {
            tag: 'link',
            attrs: {
              rel: 'alternate',
              hreflang: 'x-default',
              href: urlFor(LANGUAGES.find((l) => l.code === DEFAULT_LANGUAGE) ?? LANGUAGES[0]),
            },
            injectTo: 'head',
          },

          { tag: 'meta', attrs: { name: 'theme-color', content: '#14532d' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'author', content: site.name }, injectTo: 'head' },
          {
            tag: 'meta',
            attrs: {
              name: 'geo.position',
              content: `${site.geo.latitude};${site.geo.longitude}`,
            },
            injectTo: 'head',
          },
          { tag: 'meta', attrs: { name: 'geo.placename', content: formattedAddress }, injectTo: 'head' },

          // Open Graph -- WhatsApp, Facebook ve Instagram link onizlemeleri
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:site_name', content: site.name }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:title', content: title }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:description', content: language.seo.description }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: pageUrl }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:locale', content: language.locale }, injectTo: 'head' },
          ...LANGUAGES.filter((l) => l.code !== language.code).map((other) => ({
            tag: 'meta',
            attrs: { property: 'og:locale:alternate', content: other.locale },
            injectTo: 'head' as const,
          })),
          { tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          {
            tag: 'meta',
            attrs: { property: 'og:image:alt', content: `${site.name} - ${language.hero.tagline}` },
            injectTo: 'head',
          },

          // Twitter / X
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:title', content: title }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:description', content: language.seo.description }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE }, injectTo: 'head' },

          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(restaurantSchema(language)),
            injectTo: 'head',
          },
        ],
      };
    },
  },
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10);

    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: ['User-agent: *', 'Allow: /', '', `Sitemap: ${site.url}/sitemap.xml`, ''].join('\n'),
    });

    // Her dil ayri <url>, her biri digerlerine xhtml:link ile baglanir.
    const entries = LANGUAGES.map((language) =>
      [
        '  <url>',
        `    <loc>${urlFor(language)}</loc>`,
        ...LANGUAGES.map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate.htmlLang}" href="${urlFor(alternate)}"/>`
        ),
        `    <lastmod>${today}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${language.code === DEFAULT_LANGUAGE ? '1.0' : '0.8'}</priority>`,
        '  </url>',
      ].join('\n')
    );

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        '',
      ].join('\n'),
    });
  },
});

export default defineConfig({
  plugins: [react(), seo(), preloadHero('herosection', '100vw')],
  build: {
    rollupOptions: {
      // Her dil kendi HTML giris noktasi; JS ve CSS paketleri paylasilir.
      input: {
        tr: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
        ru: resolve(__dirname, 'ru/index.html'),
      },
    },
  },
});
