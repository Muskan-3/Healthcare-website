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
  Microscope,
  Leaf,
  MonitorSmartphone,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { dentalServices } from '../data/siteData';

/* ── Icon map ───────────────────────────────────────────────────────────── */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'Dental Implants':           Activity,
  'Root Canal Treatment':      Activity,
  'Smile Designing':           Sparkles,
  'Tooth Extraction':          Scissors,
  'Wisdom Tooth Surgery':      ShieldPlus,
  'Braces & Aligners':         GitBranchPlus,
  'Full Mouth Rehabilitation': HeartHandshake,
  'Maxillofacial Surgery':     Cross,
  'Jaw Correction Surgery':    ShieldCheck,
  'Facial Trauma Treatment':   HeartPulse,
  'Oral Cancer Screening':     FileHeart,
  'TMJ Treatment':             Activity,
};

/* ── Highlight points ───────────────────────────────────────────────────── */
const HIGHLIGHTS: { icon: LucideIcon; text: string }[] = [
  { icon: Microscope,        text: 'Advanced Surgical Expertise' },
  { icon: Leaf,              text: 'Personalized Treatment Plans' },
  { icon: MonitorSmartphone, text: 'Modern Technology & Equipment' },
  { icon: BadgeCheck,        text: 'Comfort-First Patient Care' },
];

/* ── Framer Motion variants ─────────────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
export const ServicesSection = memo(() => {
  return (
    <section id="dental-services" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Precision Dental and Facial Care"
        description="From preventive dentistry to advanced surgical procedures, we provide personalized treatments tailored to your needs in a comfortable and modern environment."
      />

      {/* ── Main layout: sticky panel + scrollable grid ── */}
      <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start">

        {/* ── LEFT — sticky info panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28 lg:w-[340px] xl:w-[380px] flex-shrink-0"
        >
          <div className="relative overflow-hidden glass rounded-[32px] border border-white/10
                          shadow-[0_8px_48px_rgba(76,29,149,0.20),0_0_0_1px_rgba(245,197,66,0.08)]
                          p-8 sm:p-10">

            {/* Decorative gold tooth silhouette — ultra low opacity */}
            <svg
              aria-hidden="true"
              viewBox="0 0 160 200"
              className="pointer-events-none absolute -bottom-4 -right-4 w-40 opacity-[0.04] text-gold"
              fill="currentColor"
            >
              <path d="M80 10 C40 10 15 35 15 65 C15 82 22 96 28 114 C36 138 38 170 50 185
                       C55 192 62 195 68 190 C72 187 74 180 76 170 C78 158 79 145 80 145
                       C81 145 82 158 84 170 C86 180 88 187 92 190 C98 195 105 192 110 185
                       C122 170 124 138 132 114 C138 96 145 82 145 65 C145 35 120 10 80 10Z" />
            </svg>

            {/* Shimmer sweep */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.05) 50%, transparent 65%)',
                animation: 'shimmer 6s ease-in-out infinite',
              }}
            />

            <div className="relative z-10">
              {/* Eyebrow */}
              <p className="text-xs uppercase tracking-[0.5em] text-gold/80">Core Offerings</p>

              {/* Title */}
              <h3 className="mt-4 font-display text-3xl font-semibold text-white leading-tight">
                Specialized Treatments for Every Need
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-white/65">
                Explore our range of cosmetic, restorative, and surgical services designed to support your oral health, confidence, and overall well-being.
              </p>

              {/* Gold divider */}
              <div
                className="mt-7 mb-6 h-px w-16 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(245,197,66,0.7), transparent)' }}
              />

              {/* Highlight points */}
              <ul className="space-y-3.5">
                {HIGHLIGHTS.map(({ icon: HIcon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl
                                     border border-gold/25 bg-gold/10 text-gold">
                      <HIcon size={14} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="text-sm text-white/75">{text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                onClick={() => (location.href = '#appointment')}
                className="btn-shimmer btn-glow mt-8 inline-flex w-full items-center justify-center gap-2
                           rounded-full bg-gradient-to-r from-[#F5C542] to-[#FFD86B]
                           px-6 py-3.5 text-sm font-semibold text-[#04010D]
                           transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
              >
                Book a Consultation
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — service cards grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
          className="flex-1 grid gap-5 sm:grid-cols-2"
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