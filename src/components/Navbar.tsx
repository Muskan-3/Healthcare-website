import React, { useEffect, useState } from 'react';
import { Phone, CalendarDays } from 'lucide-react';
import { navLinks } from '../data/siteData';
import glowLogo from '../../src/Glow savitri logo.svg';
import sdhLogo from '../../src/SDH logo.svg';

export const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-[#050214]/80 transition-shadow duration-200 ${isSticky ? 'backdrop-blur-xl shadow-xl' : 'backdrop-blur-lg'}`}>
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full gap-6">
          {/* Left: Logos (grouped) */}
          <div className="flex items-center gap-4">
            <a href="#home" className="flex items-center gap-3">
              <img src={glowLogo} alt="Savitri" className="nav-logo-glow" />
              <img src={sdhLogo} alt="SDH" className="nav-logo-sdh" />
              <div className="hidden sm:block ml-2">
                <p className="font-display text-lg font-bold tracking-wide text-white">Savitri</p>
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/55">Luxury Healthcare</p>
              </div>
            </a>
          </div>

          {/* Center: Nav expands to fill available space */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm text-white/80">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="px-2 transition hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions (stay to right) */}
          <div className="flex items-center gap-3 ml-auto">
            <a
              href="tel:9956967000"
              className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/90 transition hover:border-gold/50 hover:text-gold sm:flex"
            >
              <Phone size={15} className="text-gold" />
              9956967000
            </a>
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-luxe px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition hover:scale-[1.02] hover:shadow-gold/30"
            >
              <CalendarDays size={15} />
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};