import { memo } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

export const ServiceCard = memo(({ title, description, icon: Icon }: ServiceCardProps) => {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group card-hover-glow rounded-[20px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] p-4 sm:p-6 shadow-xl shadow-black/30 cursor-pointer transition-colors duration-300 hover:border-[#F5C542]/25"
    >
      {/* Icon — floats continuously, glows on a slow pulse */}
      <div className="icon-float icon-glow-pulse mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-[#F5C542]/30 bg-[#F5C542]/10 text-[#F5C542] group-hover:bg-[#F5C542]/20 transition-colors duration-300">
        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
    </motion.article>
  );
});
