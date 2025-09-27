"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "motion/react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  message: z.string().min(10, "Tell us a bit more"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((i) => {
        const field = i.path[0] as keyof FormValues;
        setError(field, { type: "manual", message: i.message });
      });
      return;
    }
    console.log("Lead:", result.data);
    await new Promise((r) => setTimeout(r, 800));
    reset();
  };

  return (
    <section id="contact" className="py-20 scroll-mt-24 bg-white/80 border-y border-black/5 text-charcoal  relative overflow-hidden">
      {/* decorative accent blobs */}
      <div className="absolute -left-16 top-10 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-blob" />
      <div className="absolute right-[-8%] bottom-10 -z-10 h-48 w-48 rounded-full bg-accent/6 blur-2xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
          className="flex flex-col h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-black/80">
            Have a project in mind? We&apos;d love to hear from you. Drop a message and we&apos;ll get back within 24 hours.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a href="tel:+911231231233" aria-label="Call +91 1231231233" className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="text-accent font-semibold text-base">+91 1231231233</div>
              <div className="text-xs text-black/70">Phone Support</div>
            </motion.a>
            <motion.a href="mailto:contact@liftronic.com" aria-label="Email contact@liftronic.com" className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="text-accent font-semibold text-base break-words whitespace-normal max-w-full">contact@liftronic.com</div>
              <div className="text-xs text-black/70">Email us</div>
            </motion.a>
          </div>

          <div className="mt-6 flex-1 min-h-[360px] rounded-2xl overflow-hidden shadow-xl border border-accent/10">
            <iframe
              src="https://maps.google.com/maps?q=Mumbai,Maharashtra,India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-white/80 p-6 shadow-xl border border-accent/10 text-black relative overflow-visible min-w-0 h-full"
              initial={{ scale: 1 }}
            >
              {/* Card header (site theme) */}
              <div className="mb-4 flex items-start justify-between gap-4 pb-4 border-b border-accent/10">
                <div>
                  <h3 className="text-2xl font-semibold text-black">Request a Quote</h3>
                  <p className="text-sm text-black/70 mt-1">Quick response within 24 hours. Tell us what you need and we&apos;ll help.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/15">24/7 Support</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 flex-1">
                {/* Name */}
                <div className="min-w-0">
                  <label className="text-sm font-medium text-black/70">Name</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      {/* user icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <input
                      {...register("name")}
                      className="mt-0 w-full pl-10 rounded-lg bg-white p-3 border border-gray-200 focus:ring-2 focus:ring-accent transition-shadow text-black placeholder:text-neutral-400 box-border"
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="min-w-0">
                  <label className="text-sm font-medium text-black/70">Email</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      {/* mail icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 6H3v2.5l9 6 9-6V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <input
                      {...register("email")}
                      type="email"
                      className="mt-0 w-full pl-10 rounded-lg bg-white p-3 border border-gray-200 focus:ring-2 focus:ring-accent transition-shadow text-black placeholder:text-neutral-400 box-border"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-2 min-w-0">
                  <label className="text-sm font-medium text-black/70">Phone</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      {/* phone icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.75 3.03a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.38 1.98.63 3.03.75A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <input
                      {...register("phone")}
                      className="mt-0 w-full pl-10 rounded-lg bg-white p-3 border border-gray-200 focus:ring-2 focus:ring-accent transition-shadow text-black placeholder:text-neutral-400 box-border"
                      placeholder="+91 90000 00000"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2 min-w-0">
                  <label className="text-sm font-medium text-black/70">Message</label>
                  <div className="relative mt-1">
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full rounded-lg bg-white p-3 border border-gray-200 focus:ring-2 focus:ring-accent transition-shadow text-black placeholder:text-neutral-400 box-border resize-vertical"
                      placeholder="Tell us about your requirement"
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    transition={{ duration: 0.14 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </motion.button>

                  <div className="text-sm text-neutral-500">or <a href="#contact" className="text-accent font-medium">call us</a></div>
                </div>

                {/* success toast / status */}
                <div className="ml-auto">
                  {isSubmitSuccessful && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full border border-green-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M20 6L9 17L4 12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm font-medium">Thanks — we&apos;ll be in touch shortly.</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs text-neutral-500">We respect your privacy. Your details will only be used to contact you regarding your inquiry.</p>
            </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
