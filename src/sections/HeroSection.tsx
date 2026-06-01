import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BackgroundOrbs } from '../components/BackgroundOrbs';
import Particles from '../components/Particles';
import useParallax from '../hooks/useParallax';
import MagneticButton from '../components/MagneticButton';
import { useEffect, useRef } from 'react';
import initHeroAnimations from '../animations/hero';
import { heroFeatures, quickStats } from '../data/siteData';
import doctorImg from '../Doctor-image.jpeg';
import sdhLogo from '../SDH logo.svg';
import glowLogo from '../Glow savitri logo.svg';

export const HeroSection = () => {
  const HeroAnimator = () => {
    const ref = useRef<HTMLElement | null>(null);
    useEffect(() => {
      const cleanup = initHeroAnimations(ref.current);
      return () => cleanup && cleanup();
    }, []);
    return <div ref={ref} />;
  };

  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 bg-[#04010D]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#04010D_0%,#050214_46%,#08031B_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,61,255,0.2),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(192,132,252,0.17),transparent_30%),radial-gradient(circle_at_52%_78%,rgba(168,85,247,0.14),transparent_34%)]" />
      <div className="hero-starfield pointer-events-none absolute inset-0 opacity-60" />
      <div className="hero-energy-wave pointer-events-none absolute inset-0" />
      <div className="hero-light-streaks pointer-events-none absolute inset-0" />
      <BackgroundOrbs />
      <Particles count={48} />
      <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[55%_45%] lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-2xl"
        >
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.65em] text-[#FFD86B] sm:text-[13px]">Trusted excellence in healthcare</p>
          <h1 className="hero-title neon-text font-luxury text-[4.6rem] sm:text-[5.2rem] lg:text-[5.8rem] font-semibold leading-[0.92] text-white">
            Savitri Dental
            <br />
            Hospital <span className="text-white/90">&amp;</span>
            <br />
            <span className="bg-gradient-to-b from-[#FFD86B] via-[#F5C542] to-[#F5C542] bg-clip-text text-transparent">Maxillofacial</span>
            <br />
            <span className="bg-gradient-to-b from-[#FFD86B] via-[#F5C542] to-[#F5C542] bg-clip-text text-transparent">Centre</span>
          </h1>
          <p className="mt-6 text-base font-medium text-white/84 sm:text-lg">
            By Dr. Reema Shukla <span className="text-[#F5C542]">- Director</span>
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-lg">
            Advanced Dental Care • Maxillofacial Surgery • Premium Skin Treatments
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-7 py-4 text-sm font-semibold text-[#04010D] shadow-xl shadow-[rgba(245,197,66,0.24)] transition hover:scale-[1.02]" onClick={() => (location.href = '#appointment')}>
              Book a Consultation
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white transition hover:border-[#F5C542] hover:text-[#FFD86B]" onClick={() => (location.href = '#dental-services')}>
              Explore Treatments
            </MagneticButton>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {heroFeatures.map((feature) => (
              <div key={feature.title} className="glass rounded-2xl p-4 transition hover:border-[#F5C542]/40 hover:shadow-glow">
                <div className="text-lg font-semibold text-white">{feature.title}</div>
                <div className="mt-1 text-sm text-white/60">{feature.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/75">
            {quickStats.map((stat) => (
              <div key={stat.label} className="glass rounded-full px-4 py-3">
                <span className="mr-2 font-semibold text-[#F5C542]">{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          ref={useParallax()}
          initial={{ opacity: 0, scale: 0.98, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[720px] flex items-center justify-center"
        >
          {/* initialize GSAP animations scoped to this hero */}
          <HeroAnimator />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="hero-blob-figure w-full max-w-[520px] h-auto" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" aria-hidden>
              <defs>
                <clipPath id="doctorClip">
                  <path d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" />
                </clipPath>
                <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="18" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <image href={doctorImg} x="0" y="0" width="800" height="800" clipPath="url(#doctorClip)" preserveAspectRatio="xMidYMid slice" />

              <path className="blob-inner-glow" d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" fill="none" stroke="#8B3DFF" strokeWidth="18" filter="url(#glowFilter)" opacity="0.55" />
              <path className="blob-rim" d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" fill="none" stroke="#8B3DFF" strokeWidth="4" strokeLinejoin="round" />
              <path className="blob-gold" d="M390 40C460 40 610 70 700 170C780 260 780 410 700 520C620 630 500 690 390 720C300 745 190 720 120 650C40 570 20 420 80 300C140 180 260 60 390 40Z" fill="none" stroke="#F5C542" strokeWidth="6" opacity="0.16" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="absolute right-0 bottom-6 translate-x-6">
            <div className="px-6 py-3 rounded-full bg-[rgba(4,1,13,0.64)] border border-[rgba(255,216,107,0.36)] shadow-[0_12px_40px_rgba(4,1,13,0.6)]">
              <p className="font-luxury text-2xl italic text-[#FFD86B]">Dr. Reema Shukla</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.55em] text-white/80">Director</p>
            </div>
          </div>
        </motion.div>

        
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050214] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5C542]/45 to-transparent" />
      <div className="absolute left-0 right-0 top-[30%] h-px bg-gradient-to-r from-transparent via-white/14 to-transparent animate-wave" />
    </section>
  );
};