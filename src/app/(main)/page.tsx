import { getSocial } from "~/sanity/utils/getSocials";
import Hero from "~/components/Hero";
import AboutUs from "~/components/aboutus/AboutUs";
import ProductsInteractive from "~/components/products/ProductsInteractive";
import Services from "~/components/services/Services";
import ClientsMarquee from "~/components/ClientsMarquee";
import MediaPreview from "~/components/MediaPreview";
import BlogSection from "~/components/BlogSection";
import Testimonials from "~/components/Testimonials";
import ContactSection from "~/components/ContactSection";

export default async function Home() {
  const socials = await getSocial();
  return (
    <main suppressHydrationWarning>
      <Hero socials={socials} />
      <AboutUs />
      <Services />
      <ProductsInteractive />
      <ClientsMarquee />
      <MediaPreview />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
