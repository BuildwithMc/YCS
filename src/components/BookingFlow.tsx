import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, CreditCard, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import toast from 'react-hot-toast';

import { usePaystackPayment } from 'react-paystack';

interface BookingFlowProps {
  selectedIds: string[];
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'contact' | 'schedule' | 'payment' | 'success';

export default function BookingFlow({ selectedIds, onClose, onSuccess }: BookingFlowProps) {
  const [step, setStep] = useState<Step>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Virtual',
    date: '',
    time: '',
  });

  const selectedServices = SERVICES.filter(s => selectedIds.includes(s.id));
  const total = selectedServices.reduce((acc, s) => acc + s.price, 0);

  const handleNext = () => {
    if (step === 'contact') setStep('schedule');
    else if (step === 'schedule') setStep('payment');
  };

  const handleBack = () => {
    if (step === 'schedule') setStep('contact');
    else if (step === 'payment') setStep('schedule');
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: total * 100, // Amount is in the country's lowest currency. e.g Kobo, so multiply by 100
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const handlePay = () => {
    initializePayment({
      onSuccess: async (reference) => {
        const loadingToast = toast.loading('Verifying and saving booking...');
        try {
          const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api/order' : '/api/order';
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderDetails: { 
                ...formData, 
                total,
                services: selectedServices.map(s => s.title)
              },
              reference,
            }),
          });
          
          toast.dismiss(loadingToast);
          
          if (response.ok) {
            toast.success('Payment Verified Securely & Order Placed!');
            setStep('success');
            onSuccess();
          } else {
            toast.error('Payment succeeded but saving failed. Contact support.');
          }
        } catch (error) {
          toast.dismiss(loadingToast);
          toast.error('Network Error while saving order details');
        }
      },
      onClose: () => {
        toast.error('Payment checkout closed');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-brand-beige w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        {/* Sidebar Summary */}
        <div className="bg-brand-navy text-white p-8 md:w-80 flex-shrink-0">
          <button 
            onClick={onClose}
            className="mb-8 p-2 hover:bg-white/10 transition-colors md:hidden"
          >
            <X size={20} />
          </button>
          
          <h3 className="font-serif text-2xl italic mb-6">Your Boutique Selection</h3>
          <div className="space-y-4 mb-8">
            {selectedServices.map(s => (
              <div key={s.id} className="border-b border-white/10 pb-4">
                <p className="text-xs font-bold leading-tight mb-1">{s.title}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest">{formatCurrency(s.price)}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-brand-gold">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-1">Grand Total</span>
            <span className="text-3xl font-bold font-sans text-brand-gold">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-grow p-8 md:p-12 overflow-y-auto bg-brand-beige relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-brand-brown/10 transition-colors hidden md:block"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {step === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-serif text-brand-navy mb-2">Contact Information</h2>
                  <p className="text-xs text-brand-brown/60 uppercase tracking-widest font-bold">Step 1 of 3</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-brown/20 py-3 focus:border-brand-navy outline-none transition-all font-serif italic text-lg"
                      placeholder="Victory Ezeji"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-brown/20 py-3 focus:border-brand-navy outline-none transition-all font-serif italic text-lg"
                      placeholder="victory@corporate.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown mb-2">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-brown/20 py-3 focus:border-brand-navy outline-none transition-all font-serif italic text-lg"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  className="w-full bg-brand-navy text-white py-4 font-bold uppercase tracking-widest text-xs mt-8 hover:bg-brand-brown transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Continue to Selection
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-serif text-brand-navy mb-2">Session Logistics</h2>
                  <p className="text-xs text-brand-brown/60 uppercase tracking-widest font-bold">Step 2 of 3</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => setFormData({...formData, sessionType: 'Virtual'})}
                     className={cn(
                       "p-6 border flex flex-col items-center gap-3 transition-all",
                       formData.sessionType === 'Virtual' ? "border-brand-navy bg-brand-navy text-white" : "border-brand-brown/20 text-brand-brown hover:border-brand-brown"
                     )}
                   >
                     <MapPin size={24} />
                     <span className="text-[10px] uppercase tracking-widest font-bold">Virtual</span>
                   </button>
                   <button 
                     onClick={() => setFormData({...formData, sessionType: 'In-Studio'})}
                     className={cn(
                       "p-6 border flex flex-col items-center gap-3 transition-all",
                       formData.sessionType === 'In-Studio' ? "border-brand-navy bg-brand-navy text-white" : "border-brand-brown/20 text-brand-brown hover:border-brand-brown"
                     )}
                   >
                     <Calendar size={24} />
                     <span className="text-[10px] uppercase tracking-widest font-bold">In-Studio</span>
                   </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-brown/20 py-3 focus:border-brand-navy outline-none transition-all font-sans text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-brown mb-2">Preferred Time</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-transparent border-b border-brand-brown/20 py-3 focus:border-brand-navy outline-none transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={handleBack} className="flex-1 border border-brand-brown py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-brown hover:text-white transition-all">Back</button>
                  <button onClick={handleNext} className="flex-[2] bg-brand-navy text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-brown transition-all">Review & Pay</button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-serif text-brand-navy mb-2">Final Confirmation</h2>
                  <p className="text-xs text-brand-brown/60 uppercase tracking-widest font-bold">Step 3 of 3</p>
                </div>

                <div className="bg-white/50 p-6 space-y-4 border border-brand-brown/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-brand-brown/60 font-medium">Session Guest</span>
                    <span className="font-bold text-brand-navy">{formData.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-brand-brown/60 font-medium">Logistics</span>
                    <span className="font-bold text-brand-navy">{formData.sessionType} • {formData.date} at {formData.time}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <button 
                    onClick={handlePay}
                    className="w-full bg-[#09A5DB] text-white py-5 font-bold uppercase tracking-widest text-xs hover:bg-[#0784af] transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <CreditCard size={18} />
                    Secure Paystack Checkout
                  </button>
                  <button onClick={handleBack} className="text-[10px] uppercase tracking-widest font-bold text-brand-brown/50 hover:text-brand-brown transition-all text-center">Review Details Again</button>
                </div>

                <p className="text-[9px] text-center text-brand-brown/40 uppercase tracking-widest leading-relaxed">
                  Upon payment, our team will sync your booking with Victory's Master Architecture Schedule. You will receive a formal confirmation via email.
                </p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-xl">
                    <CheckCircle2 size={40} />
                  </div>
                </div>
                <h2 className="text-4xl font-serif text-brand-navy">Style Architecture <br /><span className="italic">Initiated.</span></h2>
                <p className="text-brand-brown/70 leading-relaxed max-w-sm mx-auto font-medium">
                  Thank you, {formData.name}. Victory and our team are preparing for your transformation. Check your email for next steps.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-brand-navy text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-brown transition-all"
                >
                  Return to Boutique
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
