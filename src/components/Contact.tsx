import { Phone, MapPin, Instagram, Facebook, Mail, type LucideIcon } from 'lucide-react';
import { site, telHref, mailHref } from '../config/site';
import { t } from '../i18n';

type ContactCard = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  /** Harici linkler yeni sekmede acilir. */
  external?: boolean;
};

/** Iletisim kartlari; veriler src/config/site.ts icinden gelir. */
const CARDS: ContactCard[] = [
  {
    icon: Phone,
    title: t.contact.phone,
    body: site.phone.display,
    href: telHref,
  },
  {
    icon: Mail,
    title: t.contact.email,
    body: site.email,
    href: mailHref,
  },
  {
    icon: Facebook,
    title: t.contact.facebook,
    body: '@yaylayemekevi',
    href: site.social.facebook,
    external: true,
  },
  {
    icon: Instagram,
    title: t.contact.instagram,
    body: '@yaylayemekevi',
    href: site.social.instagram,
    external: true,
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-baslik"
      className="py-16 sm:py-20 bg-green-900 text-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="contact-baslik" className="text-3xl sm:text-4xl font-bold mb-6">{t.contact.title}</h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-8"></div>
          <p className="text-xl text-green-100">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {CARDS.map(({ icon: Icon, title, body, href, external }) => (
            <div key={title} className="text-center">
              <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-green-100" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-green-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 rounded break-words transition-colors duration-200"
              >
                {body}
              </a>
            </div>
          ))}

          {/* Adres bir link degil, o yuzden dongu disinda. */}
          <div className="col-span-2 lg:col-span-4 text-center">
            <div className="bg-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-100" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.contact.address}</h3>
            <p className="text-green-200">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-green-800 p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t.contact.reserveTitle}</h3>
            <p className="text-green-100 mb-6">
              {t.contact.reserveText}
            </p>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t.contact.callNow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
