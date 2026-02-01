import { getCurrentUser } from "@/services/auth/auth";
import { redirect } from "next/navigation";


export async function requireRole(role: "STUDENT" | "TUTOR" | "ADMIN") {
  const user = await getCurrentUser();

  if (!user || user.role !== role) {
    redirect("/dashboard");
  }
}
