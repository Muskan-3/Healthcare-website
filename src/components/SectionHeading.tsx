import { memo } from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

// Refined heading entrance: staggered elements using spring animations for organic reveal.
export const SectionHeading = memo(({ eyebrow, title, description }: SectionHeadingProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          }
        }
      }}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } }
        }}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-gold/80"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 14 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } }
        }}
        className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } }
          }}
          className="mt-4 text-sm leading-7 text-white/70 sm:text-base"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
});