import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    // Simulate network request
    setTimeout(() => {
      setStatus('SUCCESS');
    }, 1500);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
          Have questions about listing your venue or need help with a booking? We're here to help you create unforgettable moments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="bg-primary rounded-2xl p-8 md:p-10 text-white shadow-xl overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-brand/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-secondary text-sm mb-1">Call Us</p>
                  <p className="text-lg font-semibold">+91 8983414932</p>
                  <p className="text-sm text-secondary">Available 24 Hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-secondary text-sm mb-1">Email Us</p>
                  <p className="text-lg font-semibold">support@gather.com</p>
                  <p className="text-sm text-secondary">We reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-secondary/30 shadow-sm">
          {status === 'SUCCESS' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-primary/60 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
              <button 
                onClick={() => setStatus('IDLE')}
                className="px-6 py-2 bg-tertiary/50 text-primary font-medium rounded-lg hover:bg-tertiary transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-3 rounded-xl border border-secondary/40 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                    placeholder="John"
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-3 rounded-xl border border-secondary/40 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                    placeholder="Doe"
                    required 
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl border border-secondary/40 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                  placeholder="john@example.com"
                  required 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">Subject</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-xl border border-secondary/40 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Venue Listing Support</option>
                  <option>Booking Assistance</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/40 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none"
                  placeholder="How can we help you today?"
                  required 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'SUBMITTING'}
                className="w-full bg-brand hover:bg-brand/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand/30 transition-all transform active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'SUBMITTING' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};