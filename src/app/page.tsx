import Hero from "~/components/Hero";
import AboutUs from "~/components/AboutUs";
import ProductsInteractive from "~/components/ProductsInteractive";
import Services from "~/components/Services";
import ClientsMarquee from "~/components/ClientsMarquee";
import BlogSection from "~/components/BlogSection";
import Testimonials from "~/components/Testimonials";
import ContactSection from "~/components/ContactSection";

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <Hero />
      <AboutUs />
      <Services />
      <ProductsInteractive />
      <ClientsMarquee />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
