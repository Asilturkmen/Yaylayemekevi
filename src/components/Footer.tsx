import { Instagram, Facebook } from 'lucide-react';
import { site } from '../config/site';
import { t, currentLanguage, LANGUAGES } from '../i18n';
import { NAV_ITEMS } from '../config/navigation';
import { useOpenStatus } from '../hooks/useOpenStatus';

/** Capa linkleri bu dilin kok yolunu kullanir. */
const langRoot = LANGUAGES.find((l) => l.code === currentLanguage)?.path ?? '/';

/** Siteyi gelistiren. Isletme verisi olmadigi icin site.ts'e konmadi. */
const DEVELOPER = { name: 'asilturkmen.com', url: 'https://asilturkmen.com' };

/**
 * Kredi cumlesinde yalnizca alan adi link olacak, ama linkin cumle icindeki
 * yeri dile gore degisiyor (TR'de basta, EN ve RU'da sonda). Bu yuzden metin
 * {dev} yer tutucusundan ikiye bolunup linkin iki yanina yaziliyor.
 */
const [creditBefore, creditAfter] = t.footer.developedBy.split('{dev}');

/**
 * Site alt bilgisi -- ince bir kapanis seridi.
 *
 * Tasarim notu: burasi eskiden adres, telefon, dort satirlik iletisim
 * listesi ve tam calisma saati tablosu iceriyordu; mobilde 825px, yani
 * neredeyse bir ekran boyu yer kapliyordu. Tek sayfalik bir sitede bunlarin
 * hepsi zaten yukarida duruyor (saatler Konum'da tam tablo halinde, adres
 * ve telefon hem Konum hem Iletisim'de), yani footer siteyi ikinci kez
 * gosteriyordu. Kucuk tanitim siteleri icin onerilen araliga (200-300px)
 * inmek uzere tekrar eden her sey cikarildi.
 *
 * Geriye yalnizca footer'a ozgu olanlar kaldi: marka, canli acik/kapali
 * durumu, sosyal hesaplar, bolum linkleri, telif ve gelistirici kredisi.
 * Telefon ve e-posta da bilincli olarak cikarildi; ikisi de Iletisim
 * bolumunde duruyor ve footer'in minimal kalmasi istendi.
 *
 * Mobile-first: taban stiller telefon icin ortalanmis ve dikey; sm: ile
 * yatay duzene ve sola yaslanmaya gecer.
 */
const Footer = () => {
  const status = useOpenStatus();

  const link =
    'text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded transition-colors duration-200';

  const socialButton =
    'p-3 rounded-full bg-green-900 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 transition-colors duration-200';

  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/*
          Mobilde dikey: marka -> durum/sosyal -> menu.
          lg: tek satir: marka | menu | durum/sosyal. DOM sirasi mobil icin
          dogru oldugundan masaustu sirasi order ile ayarlanir; boylece
          genis ekranda ortada kalan devasa bosluk menuyle doluyor.
        */}
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
          <div className="lg:order-1 lg:shrink-0">
            <p className="text-lg sm:text-xl font-bold text-white">{site.name}</p>
            <p className="mt-1 text-sm text-green-300">{t.hero.tagline}</p>
          </div>

          <div className="order-2 lg:order-3 lg:shrink-0 flex flex-wrap items-center justify-center gap-3">
            {/* Kibris saatine gore canli hesaplanir. */}
            <span
              aria-live="polite"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                status.open ? 'bg-green-800 text-green-100' : 'bg-green-900 text-green-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full shrink-0 ${
                  status.open ? 'bg-green-400' : 'bg-green-600'
                }`}
              />
              {status.open ? t.location.openNow : t.location.closedNow}
            </span>

            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} ${t.footer.instagramLabel}`}
              className={socialButton}
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} ${t.footer.facebookLabel}`}
              className={socialButton}
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Bolum linkleri: dikey liste yerine tek satirda sarmalanir */}
          <nav
            aria-label={t.nav.footerMenu}
            className="order-3 lg:order-2 w-full border-t border-green-900 pt-4 lg:w-auto lg:border-t-0 lg:pt-0"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0.5 text-sm lg:gap-x-6">
              {NAV_ITEMS.map(({ id, key }) => (
                <li key={id}>
                  <a href={`${langRoot}#${id}`} className={`inline-block py-1.5 ${link}`}>
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Telif + gelistirici kredisi */}
        <div className="mt-4 border-t border-green-900 pt-4 flex flex-col items-center gap-1.5 text-xs text-green-400 sm:flex-row sm:justify-between sm:gap-4 lg:mt-6 lg:pt-5">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p>
            {creditBefore}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-1 ${link}`}
            >
              {DEVELOPER.name}
            </a>
            {creditAfter}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
