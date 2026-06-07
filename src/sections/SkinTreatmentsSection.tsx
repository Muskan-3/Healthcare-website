import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { TreatmentCard } from '../components/TreatmentCard';
import { skinTreatments } from '../data/siteData';

export const SkinTreatmentsSection = memo(() => {
  return (
    <section id="skin-treatments" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Skin & Aesthetic Treatments"
        title="Premium facial care with a luxury spa-grade presentation"
        description="Each treatment card includes a hero image, benefit tags, a premium price badge, hover motion, and a direct booking CTA."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {skinTreatments.map((treatment) => (
          <TreatmentCard key={treatment.name} {...treatment} />
        ))}
      </motion.div>
    </section>
  );
});