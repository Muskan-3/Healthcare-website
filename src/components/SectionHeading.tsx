import { memo } from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

// Removed filter:blur() from animation — CSS filters on scroll trigger GPU repaints.
export const SectionHeading = memo(({ eyebrow, title, description }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-gold/80">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">{description}</p>
    </motion.div>
  );
});