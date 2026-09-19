import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { site, telHref } from '../config/site';
import { NAV_ITEMS } from '../config/navigation';
import { t, currentLanguage, LANGUAGES } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

const MOBILE_MENU_ID = 'mobil-menu';

/** Capa linkleri dilin kok yoluna gore uretilir: /en/#about gibi. */
const langRoot = LANGUAGES.find((l) => l.code === currentLanguage)?.path ?? '/';
const anchor = (id: string) => `${langRoot}#${id}`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menu acikken Escape ile kapanabilsin.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded';

  return (
    <nav
      aria-label={t.nav.mainMenu}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          <a
            href={anchor('hero')}
            className={`flex-shrink-0 text-lg sm:text-2xl font-bold transition-colors duration-300 ${focusRing} ${
              isScrolled
                ? 'text-green-900 focus-visible:outline-green-700'
                : 'text-white focus-visible:outline-white'
            }`}
          >
            {site.name}
          </a>

          {/* Masaustu menu */}
          <ul className="hidden md:flex items-baseline gap-5 lg:gap-7">
            {NAV_ITEMS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={anchor(id)}
                  className={`px-1 py-2 text-sm font-medium transition-colors duration-300 ${focusRing} ${
                    isScrolled
                      ? 'text-gray-700 hover:text-green-700 focus-visible:outline-green-700'
                      : 'text-white hover:text-green-300 focus-visible:outline-white'
                  }`}
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher onLight={isScrolled} />

            <a
              href={telHref}
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${focusRing} ${
                isScrolled
                  ? 'bg-green-700 hover:bg-green-800 text-white focus-visible:outline-green-700'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm focus-visible:outline-white'
              }`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">{t.nav.reserve}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              className={`md:hidden p-2 transition-colors duration-300 ${focusRing} ${
                isScrolled
                  ? 'text-gray-700 hover:text-green-700 focus-visible:outline-green-700'
                  : 'text-white hover:text-green-300 focus-visible:outline-white'
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobil menu */}
        <div id={MOBILE_MENU_ID} hidden={!isOpen} className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 mb-2 shadow-lg">
            {NAV_ITEMS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={anchor(id)}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 focus-visible:outline-green-700 w-full transition-colors duration-200 ${focusRing}`}
                >
                  {t.nav[key]}
                </a>
              </li>
            ))}
            <li>
              <a
                href={telHref}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 bg-green-700 hover:bg-green-800 text-white focus-visible:outline-green-700 transition-colors duration-200 ${focusRing}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">{t.nav.reserve}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
