import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Linkedin, MessageCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface HeaderProps {
  selectedCount: number;
  onOpenCheckout: () => void;
}

export default function Header({ selectedCount, onOpenCheckout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Apply Free', href: '/apply' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-brand-beige/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tighter text-brand-navy">
            Victory Ezeji
          </span>
          <div className="h-6 w-px bg-brand-brown/20 hidden sm:block" />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-brown hidden sm:block">
            Your Corporate Stylist
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-sans text-xs uppercase tracking-widest text-brand-brown hover:text-brand-navy transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-6 border-l border-brand-brown/10 pl-6">
            <button 
              onClick={onOpenCheckout}
              className="relative p-2 text-brand-navy hover:text-brand-gold transition-colors"
            >
              <ShoppingBag size={22} />
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-navy text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {selectedCount}
                </span>
              )}
            </button>
            <a 
              href="https://calendly.com/youronlinecorporatestylist/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-navy text-white px-5 py-2 text-xs uppercase tracking-widest font-bold hover:bg-brand-brown transition-all"
            >
              Free Call
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCheckout}
            className="relative p-2 text-brand-navy"
          >
            <ShoppingBag size={22} />
            {selectedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </button>
          <button 
            className="text-brand-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-beige border-t border-brand-brown/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl text-brand-navy hover:italic"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-brand-brown/10">
                <Instagram size={20} className="text-brand-brown" />
                <Linkedin size={20} className="text-brand-brown" />
                <MessageCircle size={20} className="text-brand-brown" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
