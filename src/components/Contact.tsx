import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { site, telHref, mailHref, formattedAddress } from '../config/site';
import { t } from '../i18n';
import { useOpenStatus } from '../hooks/useOpenStatus';

/**
 * Iletisim bolumu.
 *
 * Tasarim notu 1: bu bolum eskiden koyu yesil zeminliydi ve hemen altindaki
 * footer da koyu oldugu icin ikisi tek bir footer gibi okunuyordu. Artik
 * sitenin geri kalaniyla ayni acik kart dilini kullaniyor (green-50 zemin +
 * beyaz kartlar, About ve Location ile ayni). Koyu yesil yalnizca tek bir
 * vurgu kartinda kaliyor; bu hem bolumu footer'dan ayiriyor hem de
 * rezervasyon cagrisini one cikariyor.
 *
 * Tasarim notu 2: buradaki "Yol tarifi al" butonu kaldirildi. Yol tarifi bir
 * navigasyon eylemi; yeri, haritanin ve adresin zaten bulundugu Konum bolumu
 * (bkz. Location.tsx). Iletisim bolumu yalnizca iletisim bilgisi tasir:
 * telefon, e-posta, adres ve sosyal hesaplar. Boylece iki bolum birbirini
 * tekrar etmiyor ve her kartin tek bir isi oluyor.
 *
 * Yerlesim mobile-first: taban stiller telefon icindir (tek kolon, kucuk
 * punto, dar bosluk, tam genislikte dokunma hedefleri), genis ekran
 * duzenlemeleri sm: ve lg: ile eklenir.
 */
const Contact = () => {
  const status = useOpenStatus();

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  /** Bilgi satirlari: mobilde 44px'i asan rahat dokunma hedefleri. */
  const infoRow = 'flex items-start gap-4 rounded-xl px-3 py-3';

  const infoIcon = 'bg-green-100 text-green-700 p-2.5 rounded-full shrink-0';

  const infoLabel =
    'block text-xs font-semibold uppercase tracking-wider text-green-700';

  const infoValue = 'mt-0.5 block text-sm sm:text-base text-gray-800';

  return (
    <section
      id="contact"
      aria-labelledby="contact-baslik"
      className="py-16 sm:py-20 bg-green-50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2
            id="contact-baslik"
            className="text-3xl sm:text-4xl font-bold text-green-900 mb-6"
          >
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/*
          Mobilde tek kolon: once rezervasyon karti (birincil eylem arama),
          sonra diger iletisim bilgileri ve sosyal hesaplar.
          lg: asimetrik 3/2 izgara -- footer'in esit kolonlarindan bilincli
          olarak farkli, boylece iki bolum birbirine benzemiyor.
        */}
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-5">
          {/* Rezervasyon vurgu karti: telefon burada, tek ve net cagri. */}
          <div className="lg:col-span-3 bg-green-800 text-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 flex flex-col">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              {t.contact.reserveTitle}
            </h3>
            <p className="text-sm sm:text-base text-green-100 leading-relaxed mb-6 sm:mb-8">
              {t.contact.reserveText}
            </p>

            <div className="mt-auto">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-green-300 mb-1.5">
                {t.contact.phone}
              </p>
              {/* break-words: dar ekranlarda numara tasmasin */}
              <a
                href={telHref}
                className={`inline-block py-1 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight break-words hover:text-green-200 rounded ${focusRing} focus-visible:outline-white transition-colors duration-200`}
              >
                {site.phone.display}
              </a>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                {/* Mobilde tam genislik: bas parmakla kolay hedef */}
                <a
                  href={telHref}
                  className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-green-900 hover:bg-green-100 px-6 sm:px-7 py-3.5 rounded-full text-base sm:text-lg font-semibold shadow-lg ${focusRing} focus-visible:outline-white transition-colors duration-200`}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {t.contact.callNow}
                </a>

                {/*
                  Kibris saatine gore canli hesaplanir.
                  self-center: mobilde tam genislige yayilirsa butonun
                  ikizi gibi gorunuyor; bu bir durum rozeti, eylem degil.
                */}
                <span
                  aria-live="polite"
                  className={`self-center sm:self-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold ${
                    status.open
                      ? 'bg-green-700 text-green-50'
                      : 'bg-green-900 text-green-300'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      status.open ? 'bg-green-300' : 'bg-green-600'
                    }`}
                  />
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {status.open ? t.location.openNow : t.location.closedNow}
                </span>
              </div>
            </div>
          </div>

          {/* Diger iletisim bilgileri: e-posta, telefon, adres ve sosyal. */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 flex flex-col">
            {/* -mx-1: satir zemini kart kenarina dogru bir tik genisler. */}
            <ul className="-mx-1 space-y-1">
              {/* Telefon bilincli olarak yok: yan karttaki buyuk numara ayni
                  bilgiyi zaten veriyor, burada tekrari gurultu yaratiyordu. */}
              <li>
                <a
                  href={mailHref}
                  className={`group ${infoRow} hover:bg-green-50 ${focusRing} focus-visible:outline-green-700 transition-colors duration-200`}
                >
                  <span className={infoIcon}>
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className={infoLabel}>{t.contact.email}</span>
                    {/* break-all: uzun e-posta dar ekranda karti tasirmasin */}
                    <span
                      className={`${infoValue} break-all group-hover:text-green-900`}
                    >
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>

              {/* Adres duz bilgi olarak duruyor; yol tarifi Konum bolumunde. */}
              <li className={infoRow}>
                <span className={infoIcon}>
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className={infoLabel}>{t.contact.address}</span>
                  <address className={`${infoValue} not-italic`}>
                    {formattedAddress}
                  </address>
                </span>
              </li>
            </ul>

            {/* Ayirici: iki icerik ayni kartta ama gorsel olarak ayri kaliyor */}
            <hr className="my-4 sm:my-5 border-t border-green-100" />

            {/* mt-auto: genis ekranda kart uzadiginda sosyal blok alta yaslanir */}
            <div className="mt-auto">
              <h3 className="font-semibold text-green-900 mb-3 sm:mb-4 text-center">
                {t.contact.followUs}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-900 px-4 py-3 rounded-full text-sm sm:text-base font-medium ${focusRing} focus-visible:outline-green-700 transition-colors duration-200`}
                >
                  <Instagram className="w-5 h-5 shrink-0 text-green-700" aria-hidden="true" />
                  {t.contact.instagram}
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-900 px-4 py-3 rounded-full text-sm sm:text-base font-medium ${focusRing} focus-visible:outline-green-700 transition-colors duration-200`}
                >
                  <Facebook className="w-5 h-5 shrink-0 text-green-700" aria-hidden="true" />
                  {t.contact.facebook}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
