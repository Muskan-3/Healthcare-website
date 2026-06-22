import { memo } from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

type TreatmentCardProps = {
  name: string;
  image: string;
  imagePosition?: string;
  benefits: string[];
  price: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
  hover: {
    y: -6,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  tap: {
    y: -2,
    transition: { duration: 0.1 },
  },
};

export const TreatmentCard = memo(({ name, image, imagePosition, benefits, price }: TreatmentCardProps) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group overflow-hidden rounded-[20px] sm:rounded-[30px]
                 bg-[#07041a] cursor-pointer
                 shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.45)]
                 transition-all duration-500 ease-out
                 hover:shadow-[0_0_0_1px_rgba(245,197,66,0.28),0_8px_40px_rgba(139,61,255,0.20),0_0_18px_rgba(245,197,66,0.08)]"
    >
      {/* Image area — no overflow-hidden here; article clips for us */}
      <div className="relative h-56 sm:h-72 lg:h-80">
        <LazyImage src={image} alt={name} className="h-full w-full" imgClassName="transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{ objectPosition: imagePosition ?? '50% 48%' }} />
        {/* Gradient bleeds 8px below the image div to erase any 1px compositor gap */}
        <div className="absolute inset-x-0 bottom-[-2px] top-0 bg-gradient-to-t from-[#07041a] via-[#07041a]/15 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-white">{name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {benefits.map((benefit) => (
            <span key={benefit} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
              {benefit}
            </span>
          ))}
        </div>
        <motion.a
          href="#appointment"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-gold transition hover:border-gold hover:bg-gold hover:text-black"
        >
          Book Consultation
        </motion.a>
      </div>
    </motion.article>
  );
});