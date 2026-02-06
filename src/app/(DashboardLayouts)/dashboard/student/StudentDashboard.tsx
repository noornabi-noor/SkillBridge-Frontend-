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

type ActiveTab =
  | "overview"
  | "browseTutors"
  | "myBookings"
  | "review"
  | "profile";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Fetch logged-in user
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
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  const menuItems: {
    label: string;
    key: ActiveTab | "home";
    href?: string;
  }[] = [
    { label: "Home", key: "home", href: "/" },
    { label: "Overview", key: "overview" },
    { label: "Browse Tutors", key: "browseTutors" },
    { label: "My Bookings", key: "myBookings" },
    { label: "My Review", key: "review" },
    { label: "My Profile", key: "profile" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Student Dashboard
        </h2>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                if (item.href) {
                  router.push(item.href);
                } else {
                  setActiveTab(item.key as ActiveTab);
                }
              }}
              className={`p-2 rounded cursor-pointer transition-colors
                ${
                  activeTab === item.key
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                text-gray-800 dark:text-gray-100
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="mt-6">
          {activeTab === "overview" && (
            <StudentOverview studentId={user.id} />
          )}
          {activeTab === "browseTutors" && <BrowseTutors />}
          {activeTab === "myBookings" && (
            <StudentBookings studentId={user.id} />
          )}
          {activeTab === "review" && (
            <StudentReviews studentId={user.id} />
          )}
          {activeTab === "profile" && (
            <StudentProfile studentId={user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
