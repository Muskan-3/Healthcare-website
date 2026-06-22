import { memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.082893244073!2d81.84491!3d25.43464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb3ae4a71f05%3A0x5a15fbc38a35bacd!2sSavitri%20Dental%20Hospital%20%26%20Maxillofacial%20Clinic%20(Dr.%20Reema%20Shukla)%20Best%20Dental%20Hospital%20in%20Prayagraj%2C%20Dentist%20Doctor%20Prayagraj!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

const MAPS_LINK = 'https://maps.app.goo.gl/sh8dfPEu6iCv81kW7';

export const MapSection = memo(() => {
  return (
    <section
      id="find-us"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Location"
        title="Visit Our Clinic"
        description="Find us easily in the heart of Prayagraj. We're conveniently located near Mahboob Ali Inter College, Annpurna Vihar."
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mt-14"
      >
        {/* Card wrapper — matches the glass / gold-border design language */}
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/10
                      shadow-[0_8px_48px_rgba(76,29,149,0.20),0_0_0_1px_rgba(245,197,66,0.08)]"
          style={{ background: 'rgba(5,2,20,0.75)' }}
        >
          {/* Gold shimmer sweep overlay (matches ServicesSection panel) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.04) 50%, transparent 65%)',
              animation: 'shimmer 6s ease-in-out infinite',
            }}
          />

          {/* Address strip */}
          <div className="relative z-20 flex items-start gap-3 px-6 pt-6 pb-5 border-b border-white/8">
            <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-[#F5C542]/30 bg-[#F5C542]/10 text-[#F5C542]">
              <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white leading-snug">
                Savitri Dental Hospital &amp; Maxillofacial Clinic
              </p>
              <p className="mt-0.5 text-xs text-white/55 leading-relaxed">
                Ward No-25, 66A/2C, Stanley Rd, near Mahboob Ali Inter College,
                Annpurna Vihar, Prayagraj, Uttar Pradesh 211002
              </p>
            </div>
          </div>

          {/* Responsive iframe */}
          <div className="relative w-full" style={{ paddingBottom: '42%', minHeight: '280px' }}>
            <iframe
              title="Savitri Dental Hospital on Google Maps"
              src={MAPS_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* CTA strip */}
          <div className="relative z-20 flex items-center justify-center px-6 py-5 border-t border-white/8">
            <motion.a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5C542] to-[#FFD86B]
                         px-6 py-3 text-sm font-semibold text-[#04010D]
                         shadow-lg shadow-[#F5C542]/20 hover:shadow-[#F5C542]/30
                         transition-shadow duration-300 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-[#F5C542]/70
                         focus-visible:ring-offset-2 focus-visible:ring-offset-[#050214]"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Open in Google Maps
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

MapSection.displayName = 'MapSection';
