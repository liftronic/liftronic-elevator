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
    <section id="contact" className="py-20 scroll-mt-24 bg-white text-charcoal">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-charcoal">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-charcoal/80">
            Have a project in mind? We&apos;d love to hear from you.
          </p>
          <div className="mt-8 h-80 rounded-2xl overflow-hidden shadow-lg">
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

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-soft p-8 shadow-elevate text-charcoal"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-charcoal/80">Name</label>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-lg bg-white p-3 border border-gray-300 focus:ring-2 focus:ring-brand text-charcoal"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-charcoal/80">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 w-full rounded-lg bg-white p-3 border border-gray-300 focus:ring-2 focus:ring-brand text-charcoal"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-charcoal/80">Phone</label>
              <input
                {...register("phone")}
                className="mt-1 w-full rounded-lg bg-white p-3 border border-gray-300 focus:ring-2 focus:ring-brand text-charcoal"
                placeholder="+91 90000 00000"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-charcoal/80">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="mt-1 w-full rounded-lg bg-white p-3 border border-gray-300 focus:ring-2 focus:ring-brand text-charcoal"
                placeholder="Tell us about your requirement"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <motion.button
              className="btn bg-accent text-charcoal font-bold px-8 py-3 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </motion.button>

            {isSubmitSuccessful && (
                <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-charcoal/90 font-medium"
              >
                Thanks! We&apos;ll be in touch.
              </motion.span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
