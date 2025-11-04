import NextTopLoader from "nextjs-toploader";
import Footer from "~/components/layout/Footer";
import Navbar from "~/components/layout/Navbar";
import WhatsAppButton from "~/components/WhatsAppButton";
import RequestQuoteButton from "~/components/RequestQuoteButton";
import ContactModalAutoOpen from "~/components/ContactModalAutoOpen";
import { getContactInfo } from "~/sanity/utils/getContactInfo";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  // Fetch contact info for WhatsApp button
  const contactInfo = await getContactInfo();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-charcoal focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <NextTopLoader
        color="#2ae394"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2ae394,0 0 5px #2ae394"
      />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton
        whatsappNumber={contactInfo?.whatsappNumber}
        whatsappMessage={contactInfo?.whatsappMessage}
      />
      <RequestQuoteButton />
      <ContactModalAutoOpen />
    </div>
  );
};

export default MainLayout;
