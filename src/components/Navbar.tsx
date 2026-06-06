import React, { memo, useEffect, useState } from 'react';
import { Phone, CalendarDays, Menu, X } from 'lucide-react';
import { navLinks } from '../data/siteData';

export const Navbar = memo(() => {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 8);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    const header = document.querySelector('header');
    const offset = header ? header.clientHeight : 80;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset + 8;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    // backdrop-blur reduced: xl (24px) → md (12px) on sticky, lg (16px) → sm (8px) default
    <header className={`fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/10 bg-[#050214]/80 transition-shadow duration-200 ${isSticky ? 'backdrop-blur-md shadow-lg' : 'backdrop-blur-sm'}`}>
      <div className="w-full h-full px-4 md:px-12">
        <div className="flex items-center h-full gap-6">
          {/* Left: Logos */}
          <div className="flex items-center gap-4">
            <a href="#home" onClick={(e) => scrollToAnchor(e, '#home')} className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] transition-transform duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/Glow-savitri-logo.webp" alt="Savitri" className="w-full h-full object-cover scale-[1.2]" loading="eager" width="64" height="64" />
                </div>
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] transition-transform duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/SDH-logo.webp" alt="SDH" className="w-full h-full object-cover" loading="eager" width="64" height="64" />
                </div>
              </div>
              <div className="hidden sm:block ml-2 transition-opacity group-hover:opacity-80">
                <p className="font-display text-lg font-bold tracking-wide text-white">Savitri</p>
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/55">Luxury Healthcare</p>
              </div>
            </a>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm text-white/80">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={(e) => scrollToAnchor(e, item.href)} className="px-2 transition hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-controls="mobile-menu-panel"
              onClick={() => setOpen((s) => !s)}
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-50 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#050214] border border-white/12 shadow-lg shadow-[rgba(0,0,0,0.6)] text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            <a href="tel:9956967000" className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/90 transition hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214] sm:flex">
              <Phone size={15} className="text-gold" />
              9956967000
            </a>

            <a href="#appointment" onClick={(e) => scrollToAnchor(e, '#appointment')} className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-luxe px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition hover:scale-[1.02] hover:shadow-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]">
              <CalendarDays size={15} />
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div id="mobile-menu-panel" className={`md:hidden fixed inset-0 z-[9998] transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <button type="button" aria-label="Close menu overlay" onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />

        {/* Right-side sliding panel */}
        <aside className={`fixed top-0 right-0 z-[9999] h-screen w-[88%] max-w-xs bg-[#050214] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col p-6 text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="relative w-16 h-16 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/Glow-savitri-logo.webp" alt="Savitri" className="w-full h-full object-cover scale-[1.2]" width="64" height="64" />
                </div>
                <div className="relative w-16 h-16 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/SDH-logo.webp" alt="SDH" className="w-full h-full object-cover" width="64" height="64" />
                </div>
              </div>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]">
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={(e) => scrollToAnchor(e, item.href)} className="py-3 px-2 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]">
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6">
              <a href="tel:9956967000" className="flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-medium text-white hover:bg-gold/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]">
                <Phone size={16} />
                9956967000
              </a>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
});
