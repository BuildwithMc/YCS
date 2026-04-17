import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../constants';
import { cn } from '../lib/utils';

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section id="gallery" className="py-24 bg-brand-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
            The Gallery
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-brand-navy leading-tight">
            Curated <br /><span className="italic">Inspirations.</span>
          </h2>
        </div>

        {/* Desktop Grid with specific layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[800px] mb-24 h-auto">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-8 relative overflow-hidden group cursor-pointer aspect-video md:aspect-auto"
            onClick={() => setSelectedItem(GALLERY_ITEMS[0])}
          >
            <img 
              src={GALLERY_ITEMS[0].image} 
              alt={GALLERY_ITEMS[0].title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="text-white" size={48} />
            </div>
          </motion.div>
          
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
             <motion.div 
               whileHover={{ scale: 0.98 }}
               className="relative overflow-hidden group cursor-pointer"
               onClick={() => setSelectedItem(GALLERY_ITEMS[1])}
             >
               <img 
                 src={GALLERY_ITEMS[1].image} 
                 alt={GALLERY_ITEMS[1].title}
                 className="w-full h-full object-cover contrast-125"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Maximize2 className="text-white" size={32} />
               </div>
             </motion.div>
             <motion.div 
               whileHover={{ scale: 0.98 }}
               className="relative overflow-hidden group cursor-pointer"
               onClick={() => setSelectedItem(GALLERY_ITEMS[2])}
             >
               <img 
                 src={GALLERY_ITEMS[2].image} 
                 alt={GALLERY_ITEMS[3].title}
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Maximize2 className="text-white" size={32} />
               </div>
             </motion.div>
          </div>
        </div>

        {/* Moving Carousel (Auto-play logic or simple smooth scroll) */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide px-4">
             {GALLERY_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-72 flex-shrink-0 group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/6] overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-serif text-xl text-brand-navy group-hover:italic">{item.title}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-brand-brown opacity-60 mt-2 font-bold">Recommended Style</p>
                </motion.div>
             ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Detail Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setSelectedItem(null)}
               className="absolute inset-0 bg-brand-navy/95 backdrop-blur-xl" 
            />
            
            <motion.div
              layoutId={`gallery-${selectedItem.id}`}
              className="relative bg-brand-beige w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-10 p-2 text-brand-navy hover:bg-brand-brown/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 overflow-hidden h-full">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-12 flex flex-col justify-center bg-brand-beige">
                 <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">The Selection</span>
                 <h3 className="text-5xl font-serif text-brand-navy mb-6 italic">{selectedItem.title}</h3>
                 <p className="text-brand-brown text-lg leading-relaxed mb-8 font-medium">
                   {selectedItem.description}
                 </p>
                 
                 <div className="space-y-4 mb-12">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-navy/60 border-b border-brand-navy/10 pb-2">Recommended Components</h4>
                   <ul className="grid grid-cols-2 gap-3">
                     {selectedItem.outfit.map(item => (
                       <li key={item} className="flex items-center gap-2 text-sm text-brand-brown font-medium">
                         <div className="w-1 h-1 bg-brand-gold rounded-full" />
                         {item}
                       </li>
                     ))}
                   </ul>
                 </div>

                 <button 
                   onClick={() => setSelectedItem(null)}
                   className="mt-auto border-2 border-brand-navy text-brand-navy px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all w-fit"
                 >
                   Explore These Pieces
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
