import { Phone, MapPin, Instagram, Facebook, Navigation, Clock } from 'lucide-react';
import { site, telHref, formattedAddress } from '../config/site';
import { t } from '../i18n';
import { useOpenStatus } from '../hooks/useOpenStatus';

/**
 * Iletisim bolumu.
 *
 * Tasarim notu: bu bolum eskiden koyu yesil zeminliydi ve hemen altindaki
 * footer da koyu oldugu icin ikisi tek bir footer gibi okunuyordu. Artik
 * sitenin geri kalaniyla ayni acik kart dilini kullaniyor (green-50 zemin +
 * beyaz kartlar, About ve Location ile ayni). Koyu yesil yalnizca tek bir
 * vurgu kartinda kaliyor; bu hem bolumu footer'dan ayiriyor hem de
 * rezervasyon cagrisini one cikariyor.
 *
 * Yerlesim mobile-first: taban stiller telefon icindir (tek kolon, kucuk
 * punto, dar bosluk), genis ekran duzenlemeleri sm: ve lg: ile eklenir.
 */
const Contact = () => {
  const status = useOpenStatus();

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

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
          Mobilde tek kolon: once rezervasyon karti, sonra adres, sonra sosyal.
          lg: asimetrik 3/2 izgara -- footer'in esit 4 kolonundan bilincli
          olarak farkli, boylece iki bolum birbirine benzemiyor.
        */}
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-5">
          {/* Rezervasyon vurgu karti */}
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

                {/* Kibris saatine gore canli hesaplanir. */}
                <span
                  aria-live="polite"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold ${
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

          {/* Adres + sosyal medya tek kartta */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full shrink-0">
                <MapPin className="w-6 h-6 text-green-700" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-green-900 mb-1">
                  {t.contact.address}
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {formattedAddress}
                </p>
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 sm:mt-4 inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-800 px-4 py-3 rounded-full text-sm sm:text-base font-medium ${focusRing} focus-visible:outline-green-700 transition-colors duration-200`}
                >
                  <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {t.location.directions}
                </a>
              </div>
            </div>

            {/* Ayirici: iki icerik ayni kartta ama gorsel olarak ayri kaliyor */}
            <hr className="my-5 sm:my-6 border-t border-green-100" />

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
