import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-navy mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 border-r border-t border-brand-brown" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
            Victory Ezeji Presents
          </span>
          <h1 className="text-6xl lg:text-8xl font-serif text-brand-navy leading-[0.9] mb-6">
            Style as <br />
            <span className="italic">Strategy.</span>
          </h1>
          <p className="text-brand-brown/80 text-lg max-w-md mb-8 leading-relaxed font-medium">
            Moving beyond fashion as a look, and positioning it as 
            <strong className="text-brand-navy"> Wardrobe Architecture</strong>. 
            For executive women who command the room.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#services"
              className="bg-brand-navy text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-brown transition-all flex items-center gap-2 group shadow-xl"
            >
              Examine Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about"
              className="border border-brand-brown text-brand-brown px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-brown hover:text-white transition-all"
            >
              Our Story
            </a>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative"
        >
          <div className="aspect-[4/5] bg-brand-navy overflow-hidden shadow-2xl skew-y-2 relative">
             <img 
               src="images/img4.png" 
               alt="Personal Stylist victory"
               className="w-full h-full object-cover -skew-y-2 scale-110"
               referrerPolicy="no-referrer"
             />
             <div className="absolute bottom-6 -left-6 bg-brand-gold text-white p-6 shadow-lg -skew-y-2">
                <span className="block font-serif text-3xl italic">"Command the room"</span>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mt-2 block">
                  The Victory Philosophy
                </span>
             </div>
          </div>
          
          <div className="absolute -top-6 -right-6 w-32 h-32 border border-brand-brown/20 hidden lg:block" />
        </motion.div>
      </div>

      {/* Corporate Pillars Marquee-like section below */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-navy text-white/50 py-4 overflow-hidden border-t border-white/10">
        <div className="flex justify-around whitespace-nowrap px-4 opacity-50 font-sans text-[10px] uppercase tracking-[0.3em]">
          <span>Wardrobe Architecture</span>
          <span className="hidden sm:inline">•</span>
          <span>ROI of Style</span>
          <span className="hidden sm:inline">•</span>
          <span>Executive Presence</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Style Alignment</span>
        </div>
      </div>
    </section>
  );
}
