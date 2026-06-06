import React, { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { Footer } from './components/Footer';

// Heavy sections are code-split and lazy loaded with individual Suspense boundaries
// for better progressive loading \u2014 earlier sections don't block later ones.
const ServicesSection = lazy(() => import('./sections/ServicesSection').then((m) => ({ default: m.ServicesSection })));
const MaxillofacialSection = lazy(() => import('./sections/MaxillofacialSection').then((m) => ({ default: m.MaxillofacialSection })));
const SkinTreatmentsSection = lazy(() => import('./sections/SkinTreatmentsSection').then((m) => ({ default: m.SkinTreatmentsSection })));
const GallerySection = lazy(() => import('./sections/GallerySection').then((m) => ({ default: m.GallerySection })));
const AchievementsSection = lazy(() => import('./sections/AchievementsSection').then((m) => ({ default: m.AchievementsSection })));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })));
const ClinicTourSection = lazy(() => import('./sections/ClinicTourSection').then((m) => ({ default: m.ClinicTourSection })));
const FAQSection = lazy(() => import('./sections/FAQSection').then((m) => ({ default: m.FAQSection })));
const AppointmentSection = lazy(() => import('./sections/AppointmentSection').then((m) => ({ default: m.AppointmentSection })));

const SectionFallback = () => (
  <div className="py-24 text-center text-white/30 text-sm">Loading...</div>
);

// AnimatePresence removed \u2014 not needed for a single-page app and adds overhead.
const App = () => {
  return (
    <div className="relative min-h-screen bg-[#04010D] text-white pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,61,255,0.2),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,197,66,0.08),_transparent_22%),linear-gradient(180deg,_#04010D_0%,_#050214_56%,_#08031B_100%)]" />
      <div className="pointer-events-none absolute inset-0 lux-grid opacity-[0.16]" />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        {/* Individual Suspense per section \u2014 each loads independently */}
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MaxillofacialSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkinTreatmentsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AchievementsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClinicTourSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AppointmentSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;