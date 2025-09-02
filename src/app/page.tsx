import Hero from "~/components/Hero";
import AboutUs from "~/components/AboutUs";
import ProductsInteractive from "~/components/ProductsInteractive";
import Services from "~/components/Services";
import ClientsMarquee from "~/components/ClientsMarquee";
import BlogSection from "~/components/BlogSection";
import Testimonials from "~/components/Testimonials";
import ContactSection from "~/components/ContactSection";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ProductsInteractive />
      <Services />
      <ClientsMarquee />
      <BlogSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
