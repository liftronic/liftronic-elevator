import { getSocial } from "~/sanity/utils/getSocials";
import { client } from "~/sanity/lib/client";
import { homePageDataQuery } from "~/sanity/lib/queries";
import type { HomePageData } from "~/sanity/lib/homePageTypes";
import Hero from "~/components/Hero";
import AboutUs from "~/components/aboutus/AboutUs";
import ProductsInteractive from "~/components/products/ProductsInteractive";
import Services from "~/components/services/Services";
import ClientsMarquee from "~/components/ClientsMarquee";
import MediaPreview from "~/components/MediaPreview";
import BlogSection from "~/components/BlogSection";
import Testimonials from "~/components/Testimonials";
import ContactSection from "~/components/ContactSection";

// ISR - revalidate every 60 minutes (3600 seconds)
export const revalidate = 3600;

async function getHomePageData(): Promise<HomePageData> {
  return client.fetch(homePageDataQuery, {}, { next: { revalidate: 3600 } });
}

export default async function Home() {
  const [socials, homeData] = await Promise.all([
    getSocial(),
    getHomePageData(),
  ]);

  return (
    <main suppressHydrationWarning>
      <Hero socials={socials} />
      <AboutUs />
      <Services />
      <ProductsInteractive products={homeData.featuredProducts} />
      <ClientsMarquee clients={homeData.clients} />
      <MediaPreview mediaItems={homeData.featuredMedia} />
      <BlogSection blogs={homeData.featuredBlogs} />
      <Testimonials testimonials={homeData.testimonials} />
      <ContactSection />
    </main>
  );
}
