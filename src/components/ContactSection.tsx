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
    <section id="contact" className="py-20 scroll-mt-24 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Let’s Talk</h2>
          <p className="mt-3 opacity-80">
            Quick response, engineered solutions, dependable support.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>• Site assessment and consultation</li>
            <li>• Compliance-first safety approach</li>
            <li>• Post-installation training and support</li>
          </ul>
          <div className="mt-8 h-48 rounded-xl border border-black/10 overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=Mumbai,Maharashtra,India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-black/10 p-6 bg-soft"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Name</label>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white p-3"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white p-3"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm">Phone</label>
              <input
                {...register("phone")}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white p-3"
                placeholder="+91 90000 00000"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white p-3"
                placeholder="Tell us about your requirement"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              disabled={isSubmitting}
              className="btn-primary rounded-full px-5 py-3 font-medium disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {isSubmitSuccessful && (
              <span className="text-sm text-green-600">
                Thanks! We’ll be in touch.
              </span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
