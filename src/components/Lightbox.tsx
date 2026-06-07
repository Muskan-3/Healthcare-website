import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LightboxProps = {
  open: boolean;
  title?: string;
  image?: string;
  onClose: () => void;
};

export const Lightbox = ({ open, title, image, onClose }: LightboxProps) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0D0524] shadow-2xl shadow-black/60"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" aria-label="Close image preview" onClick={onClose} className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 p-2 text-white transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0524]">
              <X size={18} />
            </button>
            {image && <img src={image} alt={title ?? 'Gallery item'} className="max-h-[80vh] w-full object-cover" />}
            {title && <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">{title}</div>}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};