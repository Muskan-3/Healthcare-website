import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Activity,
  Scissors,
  ShieldPlus,
  GitBranchPlus,
  HeartHandshake,
  Cross,
  ShieldCheck,
  HeartPulse,
  FileHeart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { dentalServices } from '../data/siteData';

// Exact icon mapping per service name — matches the order in siteData.ts
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'Dental Implants':           Activity,        // implant / precision care
  'Root Canal Treatment':      Activity,        // treatment precision
  'Smile Designing':           Sparkles,        // cosmetic glow
  'Tooth Extraction':          Scissors,        // surgical removal
  'Wisdom Tooth Surgery':      ShieldPlus,      // protective surgery
  'Braces & Aligners':         GitBranchPlus,   // alignment / branching
  'Full Mouth Rehabilitation': HeartHandshake,  // holistic care
  'Maxillofacial Surgery':     Cross,           // surgical cross
  'Jaw Correction Surgery':    ShieldCheck,     // corrective + safe
  'Facial Trauma Treatment':   HeartPulse,      // emergency care
  'Oral Cancer Screening':     FileHeart,       // medical review
  'TMJ Treatment':             Activity,        // joint activity
};

export const ServicesSection = memo(() => {
  return (
    <section id="dental-services" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Precision Dental and Facial Care"
        description="From preventive dentistry to advanced surgical procedures, we provide personalized treatments tailored to your needs in a comfortable and modern environment."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-[32px] p-8"
        >
          <p className="text-xs uppercase tracking-[0.55em] text-gold/80">Core Offerings</p>
          <h3 className="mt-4 font-display text-4xl font-semibold text-white">
            Specialized Treatments for Every Need
          </h3>
          <p className="mt-4 text-sm leading-8 text-white/70">
            Explore our range of cosmetic, restorative, and surgical services designed to support your oral health, confidence, and overall well-being.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              }
            }
          }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {dentalServices.map((service) => (
            <ServiceCard
              key={service}
              title={service}
              description="High-trust treatment planning, premium patient comfort, and results-focused care delivery."
              icon={SERVICE_ICONS[service] ?? Activity}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});