import { Phone, Mail, MapPin, Instagram, Facebook, Navigation } from 'lucide-react';
import { site, formattedAddress, telHref, mailHref } from '../config/site';
import { t, fill, currentLanguage, LANGUAGES } from '../i18n';
import { NAV_ITEMS } from '../config/navigation';
import { formatTime } from '../lib/hours';
import { useOpenStatus } from '../hooks/useOpenStatus';

/** Capa linkleri bu dilin kok yolunu kullanir. */
const langRoot = LANGUAGES.find((l) => l.code === currentLanguage)?.path ?? '/';

/** Ayni saatlere sahip ardisik gunleri "Salı - Pazar" gibi tek satirda toplar. */
const summarizeHours = () => {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { label: string; value: string }[] = [];

  for (const index of order) {
    const day = site.hours[index];
    const value = day.closed ? t.location.closed : `${day.opens} - ${formatTime(day.closes)}`;
    const previous = rows[rows.length - 1];

    if (previous && previous.value === value) {
      // Araligi genislet: "Salı" -> "Salı - Çarşamba"
      previous.label = `${previous.label.split(' - ')[0]} - ${t.weekdays[index]}`;
    } else {
      rows.push({ label: t.weekdays[index], value });
    }
  }

  return rows;
};

const Footer = () => {
  const status = useOpenStatus();
  const hourRows = summarizeHours();

  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div className="lg:col-span-1">
            <p className="text-xl font-bold text-white">{site.name}</p>
            <p className="mt-2 text-sm text-green-300">{t.hero.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-green-200">
              {fill(t.footer.brandText, { year: site.foundingYear })}
            </p>
            <span
              aria-live="polite"
              className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                status.open ? 'bg-green-800 text-green-100' : 'bg-green-900 text-green-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full ${
                  status.open ? 'bg-green-400' : 'bg-green-600'
                }`}
              />
              {status.open ? t.location.openNow : t.location.closedNow}
            </span>
          </div>

          {/* Bolumler */}
          <nav aria-label={t.nav.footerMenu}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.pages}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS.map(({ id, key }) => (
                <li key={id}>
                  <a
                    href={`${langRoot}#${id}`}
                    className="text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded transition-colors duration-200"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Iletisim */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.contact}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                <span className="text-green-200">{formattedAddress}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                <a
                  href={telHref}
                  className="text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded transition-colors duration-200"
                >
                  {site.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                <a
                  href={mailHref}
                  className="text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded break-all transition-colors duration-200"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Navigation className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 rounded transition-colors duration-200"
                >
                  {t.footer.directions}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} ${t.footer.instagramLabel}`}
                className="bg-green-900 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 p-2.5 rounded-full transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} ${t.footer.facebookLabel}`}
                className="bg-green-900 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 p-2.5 rounded-full transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Saatler */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.hours}
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              {hourRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-green-300">{label}</dt>
                  <dd className="text-green-100 whitespace-nowrap">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-green-300">
              {t.footer.reservationHint}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-green-900 pt-6 text-center text-xs text-green-400">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
