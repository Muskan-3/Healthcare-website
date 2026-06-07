import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';

const REVIEW_URL = 'https://g.page/r/Cd5cEYsxkrbMEAE/review';

export const GoogleReviewSection = () => {
  return (
    <section
      id="google-review"
      aria-label="Leave a Google Review"
      className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-md px-8 py-10 sm:px-12 sm:py-14 text-center shadow-[0_8px_40px_rgba(139,61,255,0.15),0_0_0_1px_rgba(245,197,66,0.08)]"
      >
        {/* Subtle glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#F5C542]/10 blur-3xl"
        />

        {/* Google "G" icon — inline SVG so no external dependency */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
          <svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
            <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.5 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-3.2-11.3-7.8L6 33.3C9.4 39.6 16.2 44 24 44z"/>
            <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.8l6.2 5.2C40.9 36.2 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"/>
          </svg>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4" aria-label="5 star rating">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={22} className="text-[#F5C542]" fill="#F5C542" />
          ))}
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
          Loved Your Experience?
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65 max-w-md mx-auto">
          Your feedback helps other patients discover trusted dental and facial aesthetic care.
        </p>

        {/* Trusted line */}
        <p className="mt-3 text-xs text-white/40 tracking-wide">
          Trusted by our patients for quality dental and facial aesthetic treatments.
        </p>

        {/* CTA Button */}
        <a
          id="google-review-cta"
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#FFD86B] px-7 py-3 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(245,197,66,0.35)] hover:brightness-110 hover:shadow-[0_4px_28px_rgba(245,197,66,0.5)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70"
        >
          Leave a Google Review
          <ExternalLink size={15} />
        </a>
      </motion.div>
    </section>
  );
};
