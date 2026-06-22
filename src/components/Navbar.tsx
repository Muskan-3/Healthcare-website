import React, { memo, useCallback, useEffect, useState } from 'react';
import { Phone, CalendarDays, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const scrollToAnchor = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-28 border-b border-white/10 bg-[#050214]/80 transition-shadow duration-200 ${isSticky ? 'backdrop-blur-md shadow-lg' : 'backdrop-blur-sm'}`}>
      <div className="w-full h-full px-4 md:px-12 relative z-50">
        <div className="flex items-center h-full gap-6">
          {/* Left: Logos */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Glow Savitri logo → scrolls to Skin & Aesthetic Treatments section */}
              <a
                href="#skin-treatments"
                onClick={(e) => scrollToAnchor(e, '#skin-treatments')}
                className="group"
                aria-label="Go to Skin & Aesthetic Treatments section"
              >
                <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] transition-transform duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/Glow-savitri-logo.webp" alt="Savitri" className="w-full h-full object-cover scale-[1.2]" loading="eager" width="72" height="72" />
                </div>
              </a>

              {/* SDH logo + text → scrolls to Dental Services section */}
              <a
                href="#dental-services"
                onClick={(e) => scrollToAnchor(e, '#dental-services')}
                className="flex items-center gap-3 group"
                aria-label="Go to Dental Services section"
              >
                <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] transition-transform duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/SDH-logo.webp" alt="SDH" className="w-full h-full object-cover" loading="eager" width="72" height="72" />
                </div>
                <div className="hidden sm:block ml-2.5 transition-opacity group-hover:opacity-80">
                  <p className="font-display text-[15px] leading-[1.2] font-bold tracking-wide text-white">Savitri Dental Hospital</p>
                  <p className="font-display text-[15px] leading-[1.2] font-bold tracking-wide text-white">& Maxillofacial Centre</p>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-white/50 mt-1">Luxury Healthcare</p>
                </div>
              </a>
            </div>
          </div>


          {/* Center: Nav (Desktop) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm text-white/80">
            {navLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToAnchor(e, item.href)}
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-2 transition hover:text-gold cursor-pointer"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <motion.a
              href="tel:9956967000"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/90 transition hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214] sm:flex"
            >
              <Phone size={15} className="text-gold" />
              9956967000
            </motion.a>

            <motion.a
              href="#appointment"
              onClick={(e) => scrollToAnchor(e, '#appointment')}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-luxe px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 hover:shadow-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]"
            >
              <CalendarDays size={15} />
              Book Appointment
            </motion.a>

            {/* Mobile hamburger button */}
            <motion.button
              type="button"
              aria-label="Toggle menu"
              aria-controls="mobile-menu-panel"
              onClick={() => setOpen((s) => !s)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="md:hidden relative z-[10000] inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#050214] border border-white/12 shadow-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          // Entire full screen container acts as a close trigger if tapped anywhere
          <div 
            id="mobile-menu-panel" 
            className="md:hidden fixed inset-0 z-[999]"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop layer visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm w-full h-full cursor-pointer"
            />

            {/* Right-side sliding panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[1000] h-screen w-[85%] max-w-xs bg-[#050214] border-l border-white/10 shadow-2xl pt-32 px-6 pb-6 text-white cursor-default"
              // Prevents immediate closing only when clicking directly on the structural background card space
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col justify-between">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToAnchor(e, item.href)}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.03 }}
                      className="py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 cursor-pointer"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Bottom Call Action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="w-full pb-4"
                >
                  <a 
                    href="tel:9956967000" 
                    className="flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-3.5 text-sm font-medium text-white hover:bg-gold/20 transition-all cursor-pointer"
                  >
                    <Phone size={16} className="text-gold" />
                    9956967000
                  </a>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navbar.displayName = 'Navbar';