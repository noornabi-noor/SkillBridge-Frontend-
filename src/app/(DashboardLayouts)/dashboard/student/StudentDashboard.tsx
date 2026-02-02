"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth/auth";
import { logout } from "@/services/auth/authClient";
import BrowseTutors from "@/components/studentDashboard/BrowseTutors";
import StudentBookings from "@/components/studentDashboard/StudentBookings";
import StudentOverview from "@/components/studentDashboard/StudentOverview";
import StudentProfile from "@/components/studentDashboard/StudentProfile";
import StudentReviews from "@/components/studentDashboard/StudentReviews";
import Navbar from "@/components/tutorDashboard/Navbar";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "overview" | "browseTutors" | "myBookings" | "review" | "profile"
  >("overview");

  // Fetch current student user
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow p-4 transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Student Dashboard
        </h2>
        <ul className="space-y-2">
          {[
            { label: "Overview", key: "overview" },
            { label: "Browse Tutors", key: "browseTutors" },
            { label: "My Bookings", key: "myBookings" },
            { label: "My Review", key: "review" },
            { label: "My Profile", key: "profile" },
          ].map((tab) => (
            <li
              key={tab.key}
              className={`p-2 rounded cursor-pointer text-gray-800 dark:text-gray-100 transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="mt-6">
          {activeTab === "overview" && <StudentOverview studentId={user.id} />}
          {activeTab === "browseTutors" && <BrowseTutors />}
          {activeTab === "myBookings" && <StudentBookings studentId={user.id} />}
          {activeTab === "review" && <StudentReviews studentId={user.id} />}
          {activeTab === "profile" && <StudentProfile studentId={user.id} />}
        </div>
      </div>
    </div>
  );
}
