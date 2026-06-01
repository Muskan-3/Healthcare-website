import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { galleryItems } from '../data/siteData';
import { Lightbox } from '../components/Lightbox';
import LazyImage from '../components/LazyImage';

export const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Before After Gallery"
        title="A premium masonry gallery with hover zoom and lightbox"
        description="This section keeps the cinematic, high-gloss language while organizing portfolio imagery into a refined editorial grid."
      />

      <div className="mt-14 columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
        {galleryItems.map((item, index) => (
          <motion.button
            key={item.title}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveIndex(index)}
            className="group relative block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/35"
          >
            <div className="h-auto w-full">
              <LazyImage src={item.image} alt={item.title} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050214]/90 via-[#050214]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Portfolio</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{item.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={activeIndex !== null}
        title={activeIndex !== null ? galleryItems[activeIndex].title : undefined}
        image={activeIndex !== null ? galleryItems[activeIndex].image : undefined}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
};