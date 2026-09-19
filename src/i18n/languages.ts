/**
 * Dil sozlukleri ve saf yardimcilar.
 *
 * Bu dosya bilincli olarak tarayiciya ait hicbir sey (window, document)
 * kullanmaz: vite.config.ts build sirasinda Node icinde bunu okuyup
 * her dilin meta etiketlerini ve JSON-LD verisini uretir.
 * Tarayiciya ozgu kisim src/i18n/index.ts icinde.
 */
import { tr, type Translation } from './tr';
import { en } from './en';
import { ru } from './ru';

export type { Translation };
export type LanguageCode = 'tr' | 'en' | 'ru';

export const TRANSLATIONS: Record<LanguageCode, Translation> = { tr, en, ru };

/** Sira, dil secicideki gorunum sirasidir. */
export const LANGUAGES = [tr, en, ru];

export const DEFAULT_LANGUAGE: LanguageCode = 'tr';

/** URL yolundan dili okur: /en/ -> en, /ru/ -> ru, digeri tr. */
export const languageFromPath = (pathname: string): LanguageCode => {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'en' || segment === 'ru') return segment;
  return DEFAULT_LANGUAGE;
};

/**
 * Sablondaki {anahtar} yer tutucularini doldurur.
 * fill('Fotograf {n} / {total}', { n: 2, total: 5 }) -> 'Fotograf 2 / 5'
 * Karsiligi olmayan yer tutucu oldugu gibi birakilir.
 */
export const fill = (
  template: string,
  values: Record<string, string | number>
): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
