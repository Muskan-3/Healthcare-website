import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { faqs } from '../data/siteData';

const faqCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const FAQSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06 },
          },
        }}
        className="mt-14 grid gap-5 lg:grid-cols-3"
      >
        {faqs.map((faq) => (
          <motion.article
            key={faq.question}
            variants={faqCardVariants}
            whileHover="hover"
            whileTap="tap"
            className="glass rounded-[28px] p-7 cursor-default hover:border-gold/20 transition-colors duration-300"
          >
            <h3 className="font-semibold text-white">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-white/68">{faq.answer}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
});