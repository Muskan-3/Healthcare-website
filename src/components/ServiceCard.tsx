import { memo } from 'react';
import { motion } from 'framer-motion';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export const ServiceCard = memo(({ title, description, icon }: ServiceCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      className="group rounded-[20px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] p-4 sm:p-6 shadow-xl shadow-black/30"
    >
      <div className="mb-6 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/20 to-transparent text-2xl sm:text-3xl">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
    </motion.article>
  );
});