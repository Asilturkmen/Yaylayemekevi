import { Fragment } from 'react';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import { site, formattedAddress } from '../config/site';
import { t } from '../i18n';
import { formatTime, nowInCyprus } from '../lib/hours';
import { useOpenStatus } from '../hooks/useOpenStatus';

/**
 * Isletmenin Google Maps kimligi (CID). Maps kisa linkindeki yer kimliginden
 * cozuldu; anahtar gerektirmeyen gomme haritada isletmeyi adiyla gosterir.
 */
const MAPS_CID = '3366818001322830153';
const MAP_EMBED = `https://www.google.com/maps?cid=${MAPS_CID}&hl=${t.code}&z=16&output=embed`;

/** Ekranda Pazartesi'den Pazar'a sirala (site.hours dizisi Pazar ile baslar). */
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const Location = () => {
  const status = useOpenStatus();
  // status dakikada bir yenilendigi icin bu deger gece yarisinda kendiliginden guncellenir.
  const todayIndex = nowInCyprus().day;

  return (
    <section
      id="location"
      aria-labelledby="location-baslik"
      className="py-16 sm:py-20 bg-green-50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="location-baslik" className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            {t.location.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Adres */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-green-900 mb-2">{t.location.addressTitle}</h3>
                  <p className="text-gray-700">{formattedAddress}</p>
                  <a
                    href={site.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    <Navigation className="w-4 h-4" />
                    {t.location.directions}
                  </a>
                </div>
              </div>
            </div>

            {/* Calisma saatleri */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full shrink-0">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
                    <h3 className="font-semibold text-green-900">{t.location.hoursTitle}</h3>
                    {/* Kibris saatine gore canli hesaplanir, dakikada bir yenilenir. */}
                    <span
                      aria-live="polite"
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        status.open
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-2 h-2 rounded-full ${
                          status.open ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      {status.open
                        ? `${t.location.openNow} · ${t.location.closesAt} ${status.closesAt}`
                        : status.opensAt
                          ? `${t.location.closedNow} · ${t.location.opensAt} ${
                              status.opensToday
                                ? t.location.today
                                : t.weekdays[status.opensDayIndex]
                            } ${status.opensAt}`
                          : t.location.closedNow}
                    </span>
                  </div>

                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-gray-700">
                    {DISPLAY_ORDER.map((index) => {
                      const day = site.hours[index];
                      const isToday = index === todayIndex;
                      return (
                        <Fragment key={index}>
                          <dt
                            className={`text-green-900 ${
                              isToday ? 'font-bold' : 'font-medium'
                            }`}
                          >
                            {t.weekdays[index]}
                            {isToday && (
                              <>
                                {/* Bosluk bilincli: ekran okuyucu "Cumartesibugun" diye birlestirmesin. */}{' '}
                                <span className="text-xs font-normal text-green-700">
                                  {t.location.todayTag}
                                </span>
                              </>
                            )}
                          </dt>
                          <dd className={isToday ? 'font-semibold' : undefined}>
                            {day.closed
                              ? t.location.closed
                              : `${day.opens} - ${formatTime(day.closes)}`}
                          </dd>
                        </Fragment>
                      );
                    })}
                  </dl>

                  <p className="mt-4 text-sm italic text-gray-600">
                    {t.location.reservationHint}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-80 sm:h-96 lg:h-[30rem] rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${site.name} ${t.location.mapTitle}`}
              />
            </div>
            <a
              href={site.maps.place}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 rounded"
            >
              {t.location.openInMaps}
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
