import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
