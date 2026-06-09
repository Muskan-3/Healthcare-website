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
    scale: 1.01,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const TreatmentCard = memo(({ name, image, imagePosition, benefits, price }: TreatmentCardProps) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group overflow-hidden rounded-[20px] sm:rounded-[30px] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/35 cursor-pointer"
    >
      <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        <LazyImage src={image} alt={name} className="h-full w-full" imgClassName="transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" style={{ objectPosition: imagePosition ?? '50% 48%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050214] via-[#050214]/12 to-transparent" />
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