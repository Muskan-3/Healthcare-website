import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { testimonials } from '../data/siteData';

export const TestimonialsSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Patients Say"
        description="Real experiences from patients who trusted us with their dental, aesthetic, and healthcare needs."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
            }
          }
        }}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {testimonials.map((item) => (
          <motion.article
            key={item.name}
            variants={{
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
            }}
            whileHover="hover"
            whileTap="tap"
            className="glass rounded-[30px] p-7 cursor-pointer hover:border-gold/20 transition-colors duration-300"
          >
            <div className="flex gap-1 text-gold">
              {Array.from({ length: item.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="mt-5 text-sm leading-8 text-white/72">“{item.quote}”</p>
            <div className="mt-6">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sm text-white/55">{item.role}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
});