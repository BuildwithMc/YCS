/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import BookingFlow from './components/BookingFlow';
import Gallery from './components/Gallery';
import AboutStory from './components/AboutStory';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const toggleService = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleProceedToBooking = () => {
    setIsCheckoutOpen(true);
  };

  const closeBooking = () => {
    setIsCheckoutOpen(false);
  };

  const onBookingSuccess = () => {
    setSelectedIds([]); // Clear cart on completion
    // Modal will stay on success screen until user closes it
  };

  return (
    <div className="relative min-h-screen bg-brand-beige selection:bg-brand-navy selection:text-white overflow-x-hidden text-brand-brown">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a2a40',
            color: '#fff',
            borderRadius: '0px',
            fontFamily: 'Playfair Display, serif',
            fontSize: '14px',
          },
        }}
      />
      
      <Header 
        selectedCount={selectedIds.length} 
        onOpenCheckout={() => setIsCheckoutOpen(true)} 
      />
      
      <main>
        <Hero />
        
        <ServiceGrid 
          selectedIds={selectedIds}
          onToggleService={toggleService}
          onProceed={handleProceedToBooking} 
        />
        
        <AboutStory />
        
        <Gallery />
        
        {/* Call to Action Bar */}
        <section className="bg-brand-gold py-24 text-center overflow-hidden relative">
          <div className="absolute inset-0 z-0 opacity-20 grayscale mix-blend-multiply flex items-center justify-center">
             <img 
               src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2000&auto=format&fit=crop" 
               alt="Corporate Style" 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif text-brand-navy mb-8 italic drop-shadow-sm leading-tight">
              Ready to architect your professional visual brand?
            </h2>
            <a 
              href="https://calendly.com/youronlinecorporatestylist/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-navy text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Book 30 min discovery call
            </a>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
             <span className="text-[15vw] font-serif italic text-brand-navy whitespace-nowrap">Transformation Transformation Transformation</span>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Overlay */}
      <AnimatePresence>
        {isCheckoutOpen && selectedIds.length > 0 && (
          <BookingFlow 
            selectedIds={selectedIds} 
            onClose={closeBooking} 
            onSuccess={onBookingSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
