import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage, { type ImageName } from './ResponsiveImage';
import { t, fill } from '../i18n';

/**
 * Galeri slaytlari. Alt metinleri ceviriden okunur.
 * slide1, hakkimizda ile birebir ayni dosya oldugu icin cikarildi.
 */
const SLIDES = ['slide2', 'slide3', 'slide4', 'slide5', 'slide6'] as const;

const images: { name: ImageName; alt: string }[] = SLIDES.map((name) => ({
  name,
  alt: t.gallery.alts[name],
}));

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const step = (delta: number) =>
    setCurrentImage((prev) => (prev + delta + images.length) % images.length);

  /**
   * Ok tuslariyla gezinme. Galeri icindeki herhangi bir butona odak varken
   * calisir; Home/End ilk ve son fotografa atlar.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => step(-1),
      ArrowRight: () => step(1),
      Home: () => setCurrentImage(0),
      End: () => setCurrentImage(images.length - 1),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const current = images[currentImage];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-baslik"
      className="py-16 sm:py-20 bg-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="gallery-baslik" className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            {t.gallery.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        <div
          role="group"
          aria-roledescription={t.gallery.roleDescription}
          aria-label={t.gallery.groupLabel}
          onKeyDown={handleKeyDown}
          className="relative"
        >
          {/* Slayt degisimini ekran okuyucuya duyurur; gorsel olarak gizli. */}
          <p aria-live="polite" className="sr-only">
            {fill(t.gallery.photoStatus, {
              n: currentImage + 1,
              total: images.length,
              alt: current.alt,
            })}
          </p>

          {/* Main Image */}
          <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl mb-4">
            <ResponsiveImage
              key={current.name}
              name={current.name}
              alt={current.alt}
              sizes="(min-width: 1152px) 1088px, calc(100vw - 2rem)"
              priority
              className="w-full h-full object-cover"
            />

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.gallery.previous}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 p-2 rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-green-900" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.gallery.next}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 p-2 rounded-full shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-green-900" aria-hidden="true" />
            </button>

            {/* Sayac gorsel amacli; icerigi yukaridaki canli bolge duyuruyor. */}
            <div
              aria-hidden="true"
              className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
            >
              {currentImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2 sm:py-4">
            {images.map((image, index) => (
              <button
                key={image.name}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={fill(t.gallery.thumbLabel, { n: index + 1, alt: image.alt })}
                aria-current={currentImage === index ? 'true' : undefined}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 transition-all duration-200 ${
                  currentImage === index
                    ? 'border-green-600 shadow-lg'
                    : 'border-gray-200 hover:border-green-400'
                }`}
              >
                <ResponsiveImage
                  name={image.name}
                  alt=""
                  sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
