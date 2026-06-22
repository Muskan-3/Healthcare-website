import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Drill,
  Activity,
  Scissors,
  ShieldPlus,
  HeartPulse,
  FileHeart,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { maxillofacialItems } from '../data/siteData';

// Map each service (by index) to a Lucide icon component
const SERVICE_ICONS = [
  Drill,       // Wisdom tooth impaction surgery
  ShieldPlus,  // Jaw asymmetry correction
  FileHeart,   // Oral pathology evaluation
  HeartPulse,  // Facial fracture management
  Activity,    // TMJ joint care
  Scissors,    // Oral oncology screening
];

export const MaxillofacialSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Maxillofacial Services"
        title="Expert Surgical Care with Precision and Compassion"
        description="Comprehensive maxillofacial treatments delivered by experienced specialists using advanced techniques and personalized care."
      />

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
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {maxillofacialItems.map((item, index) => {
          const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
          return (
            <motion.div
              key={item}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 100, damping: 18 },
                },
                hover: {
                  y: -8,
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 380, damping: 22 },
                },
                tap: {
                  scale: 0.97,
                  transition: { duration: 0.1 },
                },
              }}
              whileHover="hover"
              whileTap="tap"
              className="card-hover-glow glass rounded-[28px] p-6 group hover:border-[#F5C542]/25 transition-colors duration-300 cursor-pointer"
            >
              {/* Icon — floats + glows continuously */}
              <div className="icon-float icon-glow-pulse mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F5C542]/30 bg-[#F5C542]/10 text-[#F5C542] group-hover:bg-[#F5C542]/20 transition-colors duration-300">
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </div>

              <h3 className="font-display text-xl font-semibold text-white leading-snug">
                {item}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/65">
                Advanced diagnostics, careful planning, and a patient-first surgical journey.
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
});