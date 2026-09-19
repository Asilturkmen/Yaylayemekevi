import { Phone } from 'lucide-react';
import { site, telHref } from '../config/site';
import { t } from '../i18n';
import ResponsiveImage from './ResponsiveImage';

const Hero = () => {
  return (
    // 100svh: mobil tarayicilarda adres cubugu gizlenirken olusan ziplama olmaz.
    <section
      id="hero"
      aria-labelledby="hero-baslik"
      className="relative min-h-[100svh] flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <ResponsiveImage
          name="herosection"
          alt={t.hero.imageAlt}
          sizes="100vw"
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-24">
        <h1 id="hero-baslik" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {site.name}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-white mb-8 font-medium drop-shadow-md">
          {t.hero.tagline}
        </p>
        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          {t.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a
            href={telHref}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">{t.nav.reserve}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
