import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import LazyImage from '../components/LazyImage';

export const ClinicTourSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Clinic Tour"
        title="Inside Savitri Luxury Healthcare"
        description="Step inside a thoughtfully designed environment where comfort, sophistication, and advanced care come together."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="glass overflow-hidden rounded-[30px]"
        >
          <div className="h-[420px] w-full">
            <LazyImage src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80" alt="Clinic interior" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-[30px] p-8"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-gold/80">Experience</p>
          <h3 className="mt-4 font-display text-4xl font-semibold text-white">Designed to feel calm, expensive, and reassuring</h3>
          <p className="mt-5 text-sm leading-8 text-white/70">
            Lighting, layout, and surfaces all reinforce the same brand promise: premium care without visual clutter.
          </p>
        </motion.div>
      </div>
    </section>
  );
});