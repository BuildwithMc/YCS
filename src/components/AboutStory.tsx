import { motion } from 'motion/react';

export default function AboutStory() {
  return (
    <section id="about" className="py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-brand-gold opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-brown opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] overflow-hidden shadow-2xl relative z-10 p-4 border border-white/10"
          >
            <img 
              src="images/img3.png" 
              alt="Victory Ezeji Portrait"
              className="w-full h-full object-cover transition-all duration-700 shadow-inner"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-gold/20 -z-0 blur-2xl" />
        </div>

        <div className="space-y-8 order-1 md:order-2">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
              Founder & Master Architect
            </span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              Meet <br /><span className="italic">Victory Ezeji.</span>
            </h2>
          </div>

          <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light">
            <p>
              Victory Ezeji is not just a stylist; she is a 
              <strong className="text-white"> Brand Image Consultant </strong> 
              who understands that for the modern executive, style is a strategic lever.
            </p>
            <p>
              With a background as a Project Manager and Advisor to professional leaders, she brings a structured, architectural approach to personal branding. Her mission? To remove the "clothing stress" from your life so you can focus entirely on your work.
            </p>
            <p>
              Through 1-on-1 coaching, wardrobe audits, and her signature programs, she helps women turn their closets into instruments of authority, credibility, and influence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <span className="text-3xl font-serif italic text-brand-gold block">100+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Executives Transformed</span>
            </div>
            <div>
              <span className="text-3xl font-serif italic text-brand-gold block">1:1</span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Personalized System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
