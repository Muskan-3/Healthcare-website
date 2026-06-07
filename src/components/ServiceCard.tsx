import { memo } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ServiceCard = memo(({ title, description, icon: Icon }: ServiceCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      className="group rounded-[20px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] p-4 sm:p-6 shadow-xl shadow-black/30 hover:border-[#F5C542]/20 transition-colors duration-300"
    >
      <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-[#F5C542]/25 bg-[#F5C542]/10 text-[#F5C542] group-hover:bg-[#F5C542]/18 transition-colors duration-300">
        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
    </motion.article>
  );
});