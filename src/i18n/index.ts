/**
 * Tarayici tarafi i18n giris noktasi.
 *
 * Dil URL'e bagli oldugu icin (/ , /en/ , /ru/) calisma aninda degismez;
 * bu yuzden React context'e gerek yok, modul yuklenirken bir kez belirlenir.
 */
import {
  TRANSLATIONS,
  DEFAULT_LANGUAGE,
  languageFromPath,
  type LanguageCode,
  type Translation,
} from './languages';

export {
  TRANSLATIONS,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  languageFromPath,
  fill,
} from './languages';
export type { Translation, LanguageCode } from './languages';

/** Bu sayfanin dili. */
export const currentLanguage: LanguageCode =
  typeof window === 'undefined'
    ? DEFAULT_LANGUAGE
    : languageFromPath(window.location.pathname);

/** Bu sayfada kullanilacak sozluk. */
export const t: Translation = TRANSLATIONS[currentLanguage];
