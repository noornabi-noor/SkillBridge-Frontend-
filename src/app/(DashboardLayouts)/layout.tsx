// app/(DashboardLayouts)/dashboard/layout.tsx
import ToastProvider from "@/components/providers/ToastProvider";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/provider/theme-provider";
import { getCurrentUser } from "@/services/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login"); 

  return <div className="dashboard-layout">
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            {children}
            {/* <Footer/> */}
          </ThemeProvider>
  </div>;
}