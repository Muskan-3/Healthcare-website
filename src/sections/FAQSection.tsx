import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { faqs } from '../data/siteData';

export const FAQSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions answered with clarity and calm"
        description="This section keeps the interface premium while making the practical booking journey simple."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {faqs.map((faq, index) => (
          <motion.article
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="glass rounded-[28px] p-7"
          >
            <h3 className="font-semibold text-white">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-white/68">{faq.answer}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
});