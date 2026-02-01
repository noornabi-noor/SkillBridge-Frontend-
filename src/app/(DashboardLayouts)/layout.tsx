// app/(DashboardLayouts)/dashboard/layout.tsx

import { getCurrentUser } from "@/services/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect("/login"); // only allow logged-in users

  return <div className="dashboard-layout">{children}</div>;
}

