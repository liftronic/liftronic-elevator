import * as motion from "motion/react-client";
import FAQ from "~/components/FAQ";
import QuoteCTA from "~/components/QuoteCTA";

type FAQType = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  faqs: FAQType[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-soft">
      <div className="container mx-auto px-4">
        {/* Header section matching other sections typography */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Find answers to common questions about our elevator solutions,
            installation process, maintenance services, and more.
          </p>
        </motion.div>

        {/* FAQ Component */}
        <FAQ faqs={faqs} />

        <div className="my-6"></div>

        {/* Quote and CTA Section */}
        <QuoteCTA
          quote="Questions answered, trust built—one solution at a time."
          ctaText="Get in Touch"
          ctaHref="#contact"
        />
      </div>
    </section>
  );
}
