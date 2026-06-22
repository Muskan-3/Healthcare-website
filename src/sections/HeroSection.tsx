import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BackgroundOrbs } from '../components/BackgroundOrbs';
import Particles from '../components/Particles';
import { heroFeatures, quickStats } from '../data/siteData';
import doctorImg from '../Doctor-image.jpeg';

// useParallax (mouse-tracking) and GSAP hero animator removed for performance.
// Particles canvas kept as-is per user request.

export const HeroSection = memo(() => {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 bg-[#04010D]">
      {/* Static gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#04010D_0%,#050214_46%,#08031B_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,61,255,0.2),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(192,132,252,0.17),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(168,85,247,0.14),transparent_34%)]" />

      {/* Static starfield — no animation */}
      <div className="hero-starfield pointer-events-none absolute inset-0 opacity-60" />

      {/* Static energy wave overlay */}
      <div className="hero-energy-wave pointer-events-none absolute inset-0" />

      <BackgroundOrbs />
      <Particles count={48} />

      <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[55%_45%] lg:px-8 lg:py-20">
        {/* Left — text content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 max-w-2xl"
        >
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.65em] text-[#FFD86B] sm:text-[13px]">Trusted excellence in healthcare</p>
          <h1 className="hero-title neon-text font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-[5.8rem] font-semibold leading-tight md:leading-[0.95] text-white">
            Savitri Dental
            <br />
            Hospital <span className="text-white/90">&amp;</span>
            <br />
            <span className="bg-gradient-to-b from-[#FFD86B] via-[#F5C542] to-[#F5C542] bg-clip-text text-transparent">Maxillofacial</span>
            <br />
            <span className="bg-gradient-to-b from-[#FFD86B] via-[#F5C542] to-[#F5C542] bg-clip-text text-transparent">Centre</span>
          </h1>
         <p className="mt-6 text-base font-medium text-white/84 sm:text-lg hidden md:block">
  <span className="block">
    By Dr. Reema Shukla - BDS, MCFA, MCIT, MIAACD, D.Ortho
  </span>

  <span className="block text-[#F5C542] mt-1">
    Certified Implantologist | Aesthetician | Trichologist | PMU Artist (Sweden)
  </span>
</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-lg">
            Advanced Dental Care • Maxillofacial Surgery • Premium Skin Treatments
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="btn-shimmer btn-glow hidden md:inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-7 py-4 text-sm font-semibold text-[#04010D]"
              onClick={() => (location.href = '#appointment')}
            >
              Book a Consultation
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white transition hover:border-[#F5C542] hover:text-[#FFD86B]"
              onClick={() => (location.href = '#dental-services')}
            >
              Explore Treatments
            </motion.button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {heroFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className="badge-float card-hover-glow glass rounded-2xl p-4 transition hover:border-[#F5C542]/40"
                style={{ animationDelay: `${i * -1.6}s` }}
              >
                <div className="text-lg font-semibold text-white">{feature.title}</div>
                <div className="mt-1 text-sm text-white/60">{feature.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/75">
            {quickStats.map((stat, i) => (
              <div
                key={stat.label}
                className="badge-float glass rounded-full px-4 py-3"
                style={{ animationDelay: `${i * -2.1}s` }}
              >
                <span className="mr-2 font-semibold text-[#F5C542]">{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — doctor image blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[720px] flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="hero-blob-figure w-full max-w-[520px] h-auto" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" aria-hidden>
              <defs>
                <clipPath id="doctorClip">
                  <path d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" />
                </clipPath>
              </defs>

              <image href={doctorImg} x="0" y="0" width="800" height="800" clipPath="url(#doctorClip)" preserveAspectRatio="xMidYMid slice" />

              {/* Static rim — no animation */}
              <path className="blob-rim" d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" fill="none" stroke="#8B3DFF" strokeWidth="4" strokeLinejoin="round" />
              <path className="blob-gold" d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" fill="none" stroke="#F5C542" strokeWidth="6" opacity="0.16" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="hidden md:block absolute right-0 bottom-6 translate-x-6">
            <div className="px-6 py-3 rounded-full bg-[rgba(4,1,13,0.64)] border border-[rgba(255,216,107,0.36)] shadow-[0_12px_40px_rgba(4,1,13,0.6)]">
              <p className="font-luxury text-2xl italic text-[#FFD86B]">Dr. Reema Shukla</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.55em] text-white/80">Director</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050214] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5C542]/45 to-transparent" />
    </section>
  );
});