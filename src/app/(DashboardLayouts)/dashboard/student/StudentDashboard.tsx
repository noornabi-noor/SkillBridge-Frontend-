// app/(DashboardLayouts)/dashboard/student/StudentDashboard.tsx
// import { getCurrentUser } from "@/services/auth/auth";

// export default async function StudentDashboard() {
//   const user = await getCurrentUser();

//   return (
//     <div>
//       <h1 className="text-3xl font-bold">Student Dashboard</h1>
//       <p>{user?.name}</p>
//       <p>{user?.email}</p>
//     </div>
//   );
// }


"use client";

import { logout } from "@/services/auth/authClient";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();          // destroy session
      router.push("/");        // go home
      router.refresh();        // clear cached session
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      <button
        onClick={handleLogout}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}
