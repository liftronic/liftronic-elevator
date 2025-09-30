"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "",
    message: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add your form submission logic
    console.log(formData);
    setIsSubmitted(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    onClose();
    
    // Reset form and submission state after modal is closed
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        productInterest: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="overflow-y-auto overflow-x-hidden max-h-[95vh] p-4 sm:p-6"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                  div[style*="scrollbar-width: none"]::-webkit-scrollbar {
                    display: none;
                  }
                `
              }} />
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--color-brand)] opacity-10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />

            <button
              onClick={onClose}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-50 rounded-full bg-gray-100 p-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-700 touch-manipulation"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left side - Branding */}
              <div className="hidden lg:flex lg:w-1/3 flex-col justify-center items-center bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-accent)] rounded-xl p-6 text-white">
                <div className="text-center">
                  <img 
                    src="/liftronic-white.png" 
                    alt="Liftronic" 
                    className="w-32 h-auto mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold mb-2">Liftronic Elevators</h3>
                  <p className="text-sm opacity-90 mb-4">Your trusted partner for vertical transportation solutions</p>
                  <div className="space-y-2 text-xs opacity-80">
                    <p>✓ Expert Installation</p>
                    <p>✓ 24/7 Support</p>
                    <p>✓ Quality Guaranteed</p>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="flex-1">
                <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-charcoal)]">
                  Get a Quote
                </h2>
                <p className="mb-4 sm:mb-6 text-sm text-gray-600">Fill out the form below and we'll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-20 text-[var(--color-charcoal)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-charcoal)] sm:w-[18px] sm:h-[18px]" style={{ color: 'var(--color-charcoal)' }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitted}
                      className="w-full rounded-lg border border-gray-200 bg-white/80 p-3 pl-9 sm:pl-10 backdrop-blur-sm transition-all focus:border-[var(--color-brand)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-50 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-20 text-[var(--color-charcoal)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-charcoal)] sm:w-[18px] sm:h-[18px]" style={{ color: 'var(--color-charcoal)' }}>
                        <path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 6H3v2.5l9 6 9-6V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitted}
                      className="w-full rounded-lg border border-gray-200 bg-white/80 p-3 pl-9 sm:pl-10 backdrop-blur-sm transition-all focus:border-[var(--color-brand)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-50 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-20 text-[var(--color-charcoal)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-charcoal)] sm:w-[18px] sm:h-[18px]" style={{ color: 'var(--color-charcoal)' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.75 3.03a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.38 1.98.63 3.03.75A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isSubmitted}
                      className="w-full rounded-lg border border-gray-200 bg-white/80 p-3 pl-9 sm:pl-10 backdrop-blur-sm transition-all focus:border-[var(--color-brand)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-50 text-sm sm:text-base"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="productInterest"
                    className="mb-1 block text-sm font-medium text-[var(--color-charcoal)]"
                  >
                    Product Interested In
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-20 text-[var(--color-charcoal)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-charcoal)] sm:w-[18px] sm:h-[18px]" style={{ color: 'var(--color-charcoal)' }}>
                        <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <select
                      id="productInterest"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      required
                      disabled={isSubmitted}
                      className="w-full rounded-lg border border-gray-200 bg-white/80 p-3 pl-9 sm:pl-10 pr-10 backdrop-blur-sm transition-all focus:border-[var(--color-brand)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-50 text-sm sm:text-base appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a product</option>
                      <option value="Stiltiz Homelifts">Stiltiz Homelifts</option>
                      <option value="Home Elevators">Home Elevators</option>
                      <option value="Passenger Elevator">Passenger Elevator</option>
                      <option value="Car Elevators">Car Elevators</option>
                      <option value="Goods Elevators">Goods Elevators</option>
                      <option value="Hospital Elevators">Hospital Elevators</option>
                      <option value="Escalators">Escalators</option>
                      <option value="Others">Others</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-charcoal)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-charcoal)] sm:w-[18px] sm:h-[18px]" style={{ color: 'var(--color-charcoal)' }}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-[var(--color-charcoal)]"
                >
                  Your Requirement
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitted}
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 bg-white/80 p-3 backdrop-blur-sm transition-all focus:border-[var(--color-brand)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] disabled:opacity-50 text-sm sm:text-base sm:rows-4 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
              </div>

              {isSubmitted ? (
                <div className="rounded-lg bg-[var(--color-brand)]/10 p-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand)]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <p className="text-[var(--color-brand)] font-medium">
                    Thank you! Your quote request has been submitted successfully.
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] p-3 sm:p-4 text-white shadow-lg transition-all hover:shadow-xl touch-manipulation"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white sm:w-5 sm:h-5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm sm:text-base font-medium">Submit Quote Request</span>
                  </span>
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-brand)] opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                </motion.button>
              )}
            </form>
          </div>
          </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}