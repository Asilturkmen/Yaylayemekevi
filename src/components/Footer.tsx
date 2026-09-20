import { site } from '../config/site';
import { t, currentLanguage, LANGUAGES } from '../i18n';
import { NAV_ITEMS } from '../config/navigation';

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
 * Ayni gerekce sonradan geri kalanlara da uygulandi: telefon, e-posta,
 * sosyal hesap butonlari ve canli acik/kapali rozeti de cikarildi. Dordu de
 * hemen yukaridaki Iletisim bolumunde duruyor, yani ekrani bir kaydirma
 * boyu asagi indirince ayni sey iki kez gorunuyordu; mobilde rozet ve iki
 * yuvarlak buton ayrica sikisik duruyordu.
 *
 * Geriye yalnizca footer'a ozgu olanlar kaldi: marka, bolum linkleri,
 * telif ve gelistirici kredisi.
 *
 * Mobile-first: taban stiller telefon icin ortalanmis ve dikey; sm: ile
 * yatay duzene ve sola yaslanmaya gecer.
 */
const Footer = () => {
  const link =
    'text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded transition-colors duration-200';

  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobilde dikey (marka -> menu), lg: tek satirda marka | menu. */}
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
          <div className="lg:shrink-0">
            <p className="text-lg sm:text-xl font-bold text-white">{site.name}</p>
            <p className="mt-1 text-sm text-green-300">{t.hero.tagline}</p>
          </div>

          {/*
            Bolum linkleri: dikey liste yerine tek satirda sarmalanir.
            Ustunde ayirici cizgi yok: telifin uzerindeki cizgiyle birlikte
            iki tane olunca menu mobilde ayri bir bant gibi gorunuyordu.
            Marka ile arasindaki bosluk ayirmaya zaten yetiyor.
          */}
          <nav aria-label={t.nav.footerMenu} className="w-full lg:w-auto">
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
