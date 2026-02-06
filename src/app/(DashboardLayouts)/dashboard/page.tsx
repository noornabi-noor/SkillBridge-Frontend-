// app/(DashboardLayouts)/dashboard/page.tsx
import { getCurrentUser } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin/AdminDashboard";
import StudentDashboard from "./student/StudentDashboard";
import TutorDashboard from "./tutor/TutorDashboard";


export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  switch (user.role?.toUpperCase()) {
    case "TUTOR":
      return <TutorDashboard />;
    case "STUDENT":
      return <StudentDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      redirect("/login"); 
  }
}