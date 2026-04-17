import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { formatCurrency, cn } from '../lib/utils';

interface ServiceGridProps {
  selectedIds: string[];
  onToggleService: (id: string) => void;
  onProceed: () => void;
}

export default function ServiceGrid({ selectedIds, onToggleService, onProceed }: ServiceGridProps) {
  const totalPrice = useMemo(() => {
    return SERVICES
      .filter(s => selectedIds.includes(s.id))
      .reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedIds]);

  const selectedData = SERVICES.filter(s => selectedIds.includes(s.id));

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
              Curated Offerings
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-brand-navy leading-tight">
              Select Your <br /><span className="italic">Transformation.</span>
            </h2>
          </div>
          <div className="bg-brand-beige p-6 border-l-4 border-brand-navy max-w-sm">
            <p className="text-sm text-brand-brown/80 font-medium italic">
              "Invest in yourself. Every service is architected to yield a professional ROI in confidence and presence."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => {
            const isSelected = selectedIds.includes(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onToggleService(service.id)}
                className={cn(
                  "group relative cursor-pointer border transition-all duration-500 overflow-hidden bg-brand-beige/30",
                  isSelected ? "border-brand-navy shadow-2xl scale-[1.02]" : "border-brand-brown/10 hover:border-brand-brown/30"
                )}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        isSelected ? "scale-110" : "group-hover:scale-110"
                    )}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors" />
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-brand-navy text-white p-2 rounded-full shadow-lg">
                      <Check size={16} />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                     <span className="text-[10px] uppercase tracking-widest font-bold bg-white/90 text-brand-navy px-2 py-1">
                        {service.category}
                     </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg text-brand-navy mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-brown/70 mb-4 line-clamp-2 font-medium">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-brand-navy">
                      {formatCurrency(service.price)}
                    </span>
                    <button className={cn(
                        "text-[10px] uppercase tracking-widest font-bold transition-all",
                        isSelected ? "text-brand-navy" : "text-brand-brown opacity-50 group-hover:opacity-100"
                    )}>
                      {isSelected ? 'Remove' : 'Select Service'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Cart / Summary */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40"
            >
              <div className="bg-brand-navy text-white p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-brand-gold border-b-4">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <ShoppingBag size={28} className="text-brand-gold" />
                    <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-navy w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center">
                      {selectedIds.length}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl italic leading-none mb-1">Items Selected</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {selectedData.map(s => s.title).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">Total Investment</span>
                    <span className="text-2xl font-bold font-sans">{formatCurrency(totalPrice)}</span>
                  </div>
                  <button 
                    onClick={() => onProceed()}
                    className="bg-brand-gold text-brand-navy px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white transition-all flex items-center gap-2"
                  >
                    Proceed to Boutique Checkout
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
