import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { navLinks } from '../data/siteData';

export const Footer = () => {
  return (
    <footer id="contact" className="relative z-10 bg-[#030012] border-t border-white/6 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-y-10 md:gap-x-8 lg:gap-x-16 md:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="space-y-4 px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/Glow-savitri-logo.webp" alt="Savitri" className="w-full h-full object-cover scale-[1.2]" />
                </div>
                <div className="relative w-14 h-14 rounded-full shadow-[0_0_15px_rgba(245,197,66,0.3)] overflow-hidden flex items-center justify-center bg-[#050214]">
                  <img src="/SDH-logo.webp" alt="SDH" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70">Savitri Dental Hospital &amp; Maxillofacial Centre — premium dental, surgical and aesthetic care with a focus on clinical excellence and patient comfort.</p>
            <div className="flex items-center gap-3 mt-3">
              <a href="tel:9956967000" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-gold">
                <Phone size={16} /> 9956967000
              </a>
              <a href="mailto:drreemashukla10@gmail.com" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                <Mail size={16} /> drreemashukla10@gmail.com
              </a>
            </div>
          </div>

        <div className="pl-12 pr-4 lg:pl-24 lg:pr-6">
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

          <div className="px-4 lg:px-6">
            <h4 className="font-semibold text-white">Clinic Details</h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>66A/2C, Ward No 25, Stanley Road, Prayagraj 211002</p>
              <p>Mon - Sat: 9:00 AM — 6:00 PM</p>
              <p>Phone: <a href="tel:9956967000" className="hover:text-white">9956967000</a></p>
              <p>Email: <a href="mailto:drreemashukla10@gmail.com" className="hover:text-white">drreemashukla10@gmail.com</a></p>
            </div>
          </div>

          <div className="px-4 lg:px-6">
            <h4 className="font-semibold text-white">Join Our Newsletter</h4>
            <p className="mt-3 text-sm text-white/70">Receive updates on new treatments and special offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input type="email" placeholder="Email address" className="flex-1 rounded-lg bg-[#0b0720] border border-white/6 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none" />
              <button className="rounded-lg bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-4 py-2 text-sm font-semibold text-black">Subscribe</button>
            </form>

            <div className="mt-6 flex items-center gap-5">
              <a href="https://wa.me/919956967000" target="_blank" rel="noreferrer" className="relative w-12 h-12 md:w-14 md:h-14 rounded-full transition-transform duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover rounded-full" />
              </a>
              <a href="https://www.instagram.com/drreemashukla/" target="_blank" rel="noreferrer" className="relative w-12 h-12 md:w-14 md:h-14 rounded-full transition-transform duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                <img src="/instagram.png" alt="Instagram" className="w-full h-full object-cover rounded-full" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 bg-[#02000a]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Savitri Dental Hospital &amp; Maxillofacial Centre. All rights reserved.</p>
          <p className="text-sm text-white/60">Designed with care • Privacy &amp; Terms</p>
        </div>
      </div>
    </footer>
  );
};