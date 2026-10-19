import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white pt-24 pb-12 border-t border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Newsletter Section */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-serif text-brand-navy mb-6 italic">The Stylist's <br />Dispatch.</h3>
            <p className="text-brand-brown/70 text-sm mb-8 max-w-sm">
              Receive weekly strategies on corporate presence, wardrobe architecture, and visual authority directly to your inbox.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-grow bg-brand-beige/50 border-b border-brand-navy/20 py-3 px-1 focus:border-brand-navy outline-none font-serif italic"
              />
              <button className="bg-brand-navy text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-brand-navy transition-all">
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-navy mb-6">Directory</h4>
              <nav className="flex flex-col gap-4">
                <a href="/apply" className="text-sm font-medium text-brand-gold hover:text-brand-navy transition-colors">Free Styling Campaign</a>
                <a href="#services" className="text-sm font-medium text-brand-brown hover:text-brand-gold transition-colors">Services</a>
                <a href="#gallery" className="text-sm font-medium text-brand-brown hover:text-brand-gold transition-colors">The Gallery</a>
                <a href="#about" className="text-sm font-medium text-brand-brown hover:text-brand-gold transition-colors">About Victory</a>
                <a href="https://calendly.com/youronlinecorporatestylist/30min" target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-brown hover:text-brand-gold transition-colors flex items-center gap-1">
                  Book Call <ArrowUpRight size={12} />
                </a>
              </nav>
            </div>
          </div>

          {/* Identity & Community */}
          <div className="lg:col-span-4 bg-brand-navy text-white p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-serif text-2xl mb-6">Join The CEO <br /><span className="italic">Community.</span></h3>
              <p className="text-white/60 text-sm mb-8">
                Connect with dozens of ambitious professional women redefining corporate power-dressing.
              </p>
              <a 
                href="https://t.me/theceopowerdressingcommunity#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-white transition-all group"
              >
                Enter Community Hub
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute -right-20 -bottom-20 w-64 h-64 border border-white/5 rounded-full pointer-events-none" 
            />
          </div>
        </div>

        {/* Contact Info & Legal */}
        <div className="border-t border-brand-brown/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <span className="font-serif text-2xl font-bold tracking-tighter text-brand-navy">Victory Ezeji</span>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-brand-brown/10 rounded-full hover:bg-brand-navy hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 border border-brand-brown/10 rounded-full hover:bg-brand-navy hover:text-white transition-all">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 border border-brand-brown/10 rounded-full hover:bg-brand-navy hover:text-white transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-10 text-[10px] uppercase tracking-widest font-bold text-brand-brown/50">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-brand-gold" />
               +234 Styling Inquiry
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-brand-gold" />
               victory@yourcorporatestylist.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-gold" />
               Lagos • London • Worldwide
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] text-brand-brown/30 font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Victory Ezeji. All Rights Reserved. Designed for Professional Authority.
        </div>
      </div>
    </footer>
  );
}
