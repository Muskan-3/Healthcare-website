import React, { memo } from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { navLinks } from '../data/siteData';


// Shared column entrance variant — stagger driven by parent
const colVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

export const Footer = memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 bg-[#030012] border-t border-white/8 text-white">
      {/* Top divider accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F5C542]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        {/* Three-column stagger container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16"
        >

          {/* ── Column 1 : Brand ── */}
          <motion.div variants={colVariants} className="flex flex-col gap-5">
            {/* Logos */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full shadow-[0_0_18px_rgba(245,197,66,0.35)] overflow-hidden flex-shrink-0 bg-[#050214]">
                <img
                  src="/Glow-savitri-logo.webp"
                  alt="Glow Savitri"
                  className="w-full h-full object-cover scale-[1.2]"
                  width={56} height={56}
                  loading="lazy" decoding="async"
                />
              </div>
              <div className="relative w-14 h-14 rounded-full shadow-[0_0_18px_rgba(245,197,66,0.25)] overflow-hidden flex-shrink-0 bg-[#050214]">
                <img
                  src="/SDH-logo.webp"
                  alt="SDH"
                  className="w-full h-full object-cover"
                  width={56} height={56}
                  loading="lazy" decoding="async"
                />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm leading-relaxed text-white/65 max-w-xs">
              Savitri Dental Hospital &amp; Maxillofacial Centre — where clinical excellence meets luxury patient care.
            </p>

            {/* Social icons — spring hover + tap */}
            <div className="flex items-center gap-4 pt-1">
              <motion.a
                href="https://wa.me/919956967000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-11 h-11 rounded-full overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70"
              >
                <img
                  src="/whatsapp.png"
                  alt="WhatsApp"
                  className="w-full h-full object-cover"
                  width={44} height={44}
                  loading="lazy" decoding="async"
                />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/drreemashukla/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-11 h-11 rounded-full overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="w-full h-full object-cover"
                  width={44} height={44}
                  loading="lazy" decoding="async"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* ── Column 2 : Quick Links ── */}
          <motion.div variants={colVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F5C542] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {/* Subtle x-slide on hover via group + translate utility */}
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                  >
                    <span className="block w-1 h-1 rounded-full bg-[#F5C542]/50 group-hover:bg-[#F5C542] transition-colors duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 3 : Contact & Hours ── */}
          <motion.div variants={colVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F5C542] mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#F5C542]/70" />
                <span>66A/2C, Ward No 25, Stanley Road,<br />Prayagraj — 211002</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="flex-shrink-0 text-[#F5C542]/70" />
                <span>Mon – Sat &nbsp;·&nbsp; 9:00 AM — 6:00 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="flex-shrink-0 text-[#F5C542]/70" />
                <a
                  href="tel:9956967000"
                  className="hover:text-white transition-colors duration-200"
                >
                  +91 99569 67000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="flex-shrink-0 text-[#F5C542]/70" />
                <a
                  href="mailto:dentalsavitri@gmail.com"
                  className="hover:text-white transition-colors duration-200 break-all"
                >
                  dentalsavitri@gmail.com
                </a>
              </li>
            </ul>

            {/* Book appointment CTA — spring hover + tap */}
            <motion.a
              href="#appointment"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-5 py-2.5 text-sm font-semibold text-black hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(245,197,66,0.25)]"
            >
              Book an Appointment
              <ExternalLink size={14} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8 bg-[#02000a]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-xs text-white/45">
            © {year} Savitri Dental Hospital &amp; Maxillofacial Centre. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            Crafted with care for clinical excellence.
          </p>
        </div>
      </div>
    </footer>
  );
});

