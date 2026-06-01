import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { maxillofacialItems } from '../data/siteData';

export const MaxillofacialSection = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Maxillofacial Services"
        title="Surgical expertise, presented with the same premium visual hierarchy"
        description="A darker, more surgical tone contrasts the gold accents while keeping the same luxury atmosphere consistent across the site."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {maxillofacialItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className="glass rounded-[28px] p-6"
          >
            <div className="mb-4 h-12 w-12 rounded-2xl border border-gold/20 bg-gold/10" />
            <h3 className="font-display text-2xl font-semibold text-white">{item}</h3>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Advanced diagnostics, careful planning, and a patient-first surgical journey.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};