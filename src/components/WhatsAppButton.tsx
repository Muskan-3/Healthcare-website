import { motion } from 'framer-motion';

// Floating WhatsApp chat button pinned to the bottom-right corner on all screen sizes
export const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919956967000"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.94 }}
    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/70"
    style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
  >
    <img
      src="/whatsapp.png"
      alt="WhatsApp"
      className="w-full h-full object-cover"
      width={64} height={64}
      decoding="async"
    />
  </motion.a>
);
