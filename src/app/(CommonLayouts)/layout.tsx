import { Navbar1 } from "@/components/shared/navbar1";
import { ThemeProvider } from "@/provider/theme-provider";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar1 />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default commonLayout;
