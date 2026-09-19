import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { t } from './i18n';

function App() {
  return (
    <div className="min-h-screen">
      {/*
        Klavye kullanicilari icin atlama linki: Tab'a ilk basista gorunur,
        navbardaki tum menu ogelerini atlayip dogrudan icerige gecirir.
      */}
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-green-700 focus:px-5 focus:py-3 focus:text-white focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        {t.nav.skipToContent}
      </a>

      <Navbar />

      {/* Bolum id ve aria-labelledby tanimlari bilesenlerin kendi <section> etiketlerinde. */}
      <main id="icerik">
        <Hero />
        <About />
        <Gallery />
        <Location />
        <Reviews />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
