import type { Translation } from '../i18n';

/**
 * Sayfa bolumleri. Navbar (masaustu + mobil) ve Footer ayni listeyi okur,
 * boylece yeni bir bolum eklemek tek satirlik bir degisiklik oluyor.
 *
 * id degerleri bilesenlerin <section id="..."> etiketleriyle eslesmeli.
 * Etiketler ceviriden okunur, bu yuzden burada yalnizca anahtar tutulur.
 */
export const NAV_ITEMS = [
  { id: 'hero', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'gallery', key: 'gallery' },
  { id: 'location', key: 'location' },
  { id: 'reviews', key: 'reviews' },
  { id: 'contact', key: 'contact' },
] as const satisfies readonly { id: string; key: keyof Translation['nav'] }[];

export type NavItem = (typeof NAV_ITEMS)[number];
