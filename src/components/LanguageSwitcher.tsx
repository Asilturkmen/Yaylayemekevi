import { Globe } from 'lucide-react';
import { LANGUAGES, currentLanguage, t } from '../i18n';

/**
 * Diller ayri URL'lerde yasadigi icin secici gercek link kullanir
 * (/, /en/, /ru/). Bu sayede her dil Google tarafindan ayri indekslenir;
 * sadece ekranda metin degistiren bir dugme bunu saglayamazdi.
 *
 * Ayni bolumde kalmak icin mevcut #capa korunur.
 */
type Props = {
  /** true: acik zemin uzerinde (kaydirilmis navbar), false: hero uzerinde. */
  onLight: boolean;
};

const LanguageSwitcher = ({ onLight }: Props) => {
  const hash = typeof window === 'undefined' ? '' : window.location.hash;

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`flex items-center gap-0.5 rounded-full p-0.5 ${
        onLight ? 'bg-green-50' : 'bg-white/20 backdrop-blur-sm'
      }`}
    >
      <Globe
        className={`w-4 h-4 mx-1.5 ${onLight ? 'text-green-700' : 'text-white'}`}
        aria-hidden="true"
      />
      {LANGUAGES.map((language) => {
        const isCurrent = language.code === currentLanguage;
        return (
          <a
            key={language.code}
            href={`${language.path}${hash}`}
            lang={language.htmlLang}
            hrefLang={language.htmlLang}
            aria-current={isCurrent ? 'true' : undefined}
            title={language.name}
            className={`px-2 py-1 text-xs font-semibold uppercase rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isCurrent
                ? onLight
                  ? 'bg-green-700 text-white focus-visible:outline-green-700'
                  : 'bg-white text-green-900 focus-visible:outline-white'
                : onLight
                  ? 'text-green-900 hover:bg-green-100 focus-visible:outline-green-700'
                  : 'text-white hover:bg-white/20 focus-visible:outline-white'
            }`}
          >
            <span aria-hidden="true">{language.code}</span>
            <span className="sr-only">{language.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
