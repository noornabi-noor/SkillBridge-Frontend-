import Footer from "@/components/shared/Footer";
import { Navbar1 } from "@/components/shared/navbar1";
import { ThemeProvider } from "@/provider/theme-provider";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar1 />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default commonLayout;
