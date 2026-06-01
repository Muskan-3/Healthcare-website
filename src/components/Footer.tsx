import React from 'react';
import { Phone, Mail, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import { navLinks } from '../data/siteData';
import glowLogo from '../../src/Glow savitri logo.svg';
import sdhLogo from '../../src/SDH logo.svg';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-[#030012] border-t border-white/6 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={glowLogo} alt="Savitri" className="h-10 w-auto" />
              <img src={sdhLogo} alt="SDH" className="h-8 w-auto" />
            </div>
            <p className="max-w-xs text-sm text-white/70">Savitri Dental Hospital &amp; Maxillofacial Centre — premium dental, surgical and aesthetic care with a focus on clinical excellence and patient comfort.</p>
            <div className="flex items-center gap-3 mt-3">
              <a href="tel:9956967000" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-gold">
                <Phone size={16} /> 9956967000
              </a>
              <a href="mailto:drreemashukla10@gmail.com" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                <Mail size={16} /> drreemashukla10@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Clinic Details</h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>66A/2C, Ward No 25, Stanley Road, Prayagraj 211002</p>
              <p>Mon - Sat: 9:00 AM — 6:00 PM</p>
              <p>Phone: <a href="tel:9956967000" className="hover:text-white">9956967000</a></p>
              <p>Email: <a href="mailto:drreemashukla10@gmail.com" className="hover:text-white">drreemashukla10@gmail.com</a></p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Join Our Newsletter</h4>
            <p className="mt-3 text-sm text-white/70">Receive updates on new treatments and special offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input type="email" placeholder="Email address" className="flex-1 rounded-lg bg-[#0b0720] border border-white/6 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none" />
              <button className="rounded-lg bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-4 py-2 text-sm font-semibold text-black">Subscribe</button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="text-white/80 hover:text-white"><Twitter size={18} /></a>
              <a href="#" className="text-white/80 hover:text-white"><Instagram size={18} /></a>
              <a href="#" className="text-white/80 hover:text-white"><Facebook size={18} /></a>
              <a href="#" className="text-white/80 hover:text-white"><Linkedin size={18} /></a>
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