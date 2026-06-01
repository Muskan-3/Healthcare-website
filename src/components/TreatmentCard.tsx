import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

type TreatmentCardProps = {
  name: string;
  image: string;
  benefits: string[];
  price: string;
};

export const TreatmentCard = ({ name, image, benefits, price }: TreatmentCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/35 backdrop-blur-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <LazyImage src={image} alt={name} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050214] via-[#050214]/12 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/30 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {price}
        </span>
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
        <a
          href="#appointment"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-gold transition hover:border-gold hover:bg-gold hover:text-black"
        >
          Book Consultation
        </a>
      </div>
    </motion.article>
  );
};