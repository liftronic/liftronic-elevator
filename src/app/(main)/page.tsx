import { getSocial } from "~/sanity/utils/getSocials";
import { getContactInfo } from "~/sanity/utils/getContactInfo";
import { getCompanyInfo } from "~/sanity/utils/getAboutUs";
import { client } from "~/sanity/lib/client";
import { homePageDataQuery } from "~/sanity/lib/queries";
import type { HomePageData } from "~/sanity/lib/homePageTypes";
import { getFeaturedServices } from "~/sanity/utils/getServices";
import Hero from "~/components/homepage/Hero";
import AboutUs from "~/components/homepage/AboutUs";
import ProductsInteractive from "~/components/products/ProductsInteractive";
import Services from "~/components/homepage/Services";
import ClientsMarquee from "~/components/homepage/ClientsMarquee";
import MediaPreview from "~/components/homepage/MediaPreview";
import BlogSection from "~/components/homepage/BlogSection";
import Testimonials from "~/components/homepage/Testimonials";
import ContactSection from "~/components/homepage/ContactSection";

// ISR - revalidate every 60 minutes (3600 seconds)
export const revalidate = 3600;

async function getHomePageData(): Promise<HomePageData> {
  return client.fetch(homePageDataQuery, {}, { next: { revalidate: 3600 } });
}

export default async function Home() {
  const [socials, contactInfo, companyInfo, homeData, services] =
    await Promise.all([
      getSocial(),
      getContactInfo(),
      getCompanyInfo(),
      getHomePageData(),
      getFeaturedServices().catch(() => []),
    ]);

  return (
    <main suppressHydrationWarning>
      <Hero socials={socials} contactInfo={contactInfo} />
      <AboutUs companyInfo={companyInfo} />
      <Services services={services} />
      <ProductsInteractive products={homeData.featuredProducts} />
      <ClientsMarquee clients={homeData.clients} />
      <MediaPreview mediaItems={homeData.featuredMedia} />
      <BlogSection blogs={homeData.featuredBlogs} />
      <Testimonials testimonials={homeData.testimonials} />
      <ContactSection contactInfo={contactInfo} />
    </main>
  );
}
