import { motion } from 'framer-motion';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/20 to-transparent text-3xl shadow-glow transition group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
    </motion.article>
  );
};