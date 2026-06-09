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

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            className="glass rounded-[30px] p-7"
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
      </div>
    </section>
  );
});