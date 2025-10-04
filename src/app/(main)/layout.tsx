import Footer from "~/components/layout/Footer";
import Navbar from "~/components/layout/Navbar";
import WhatsAppButton from "~/components/WhatsAppButton";
import { getContactInfo } from "~/sanity/utils/getContactInfo";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  // Fetch contact info for WhatsApp button
  const contactInfo = await getContactInfo();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton
        whatsappNumber={contactInfo?.whatsappNumber}
        whatsappMessage={contactInfo?.whatsappMessage}
      />
    </div>
  );
};

export default MainLayout;
