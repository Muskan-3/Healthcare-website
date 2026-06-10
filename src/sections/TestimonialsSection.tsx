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

      {/* Google Reviews CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <motion.a
          href="https://www.google.com/maps/place//data=!4m3!3m2!1s0x3985354cb81dc397:0xccb692318b115cde!12e1?source=g.page.m._&laa=merchant-review-solicitation"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold tracking-wide text-gold backdrop-blur-sm transition-all duration-300 hover:border-gold/80 hover:bg-gold/[0.08] hover:shadow-[0_0_24px_rgba(245,197,66,0.18)]"
        >
          {/* Google "G" icon */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.2-5.5l-6.5-5.5C29.8 34.9 27 36 24 36c-5.2 0-9.5-3.1-11.3-7.5l-6.6 5.1C9.5 39.4 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 6l6.5 5.5C42.6 36.1 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"/>
          </svg>
          View Google Reviews
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
});