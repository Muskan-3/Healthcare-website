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
        title="Advanced Aesthetic Care, Tailored to You"
        description="Discover personalized skin and aesthetic treatments designed to enhance your natural beauty with expert care and proven techniques."
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
        className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {skinTreatments.map((treatment) => (
          <TreatmentCard key={treatment.name} {...treatment} />
        ))}
      </motion.div>
    </section>
  );
});