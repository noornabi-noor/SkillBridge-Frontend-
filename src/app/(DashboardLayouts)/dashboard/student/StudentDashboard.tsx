"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth/auth";
import { logout } from "@/services/auth/authClient";

import BrowseTutors from "@/components/studentDashboard/BrowseTutors";
import StudentBookings from "@/components/studentDashboard/StudentBookings";
import StudentOverview from "@/components/studentDashboard/StudentOverview";
import StudentProfile from "@/components/studentDashboard/StudentProfile";
import StudentReviews from "@/components/studentDashboard/StudentReviews";
import Navbar from "@/components/tutorDashboard/Navbar";

import {
  HomeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    icon: React.ReactNode;
  }[] = [
    { label: "Home", key: "home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
    { label: "Overview", key: "overview", icon: <ChartBarIcon className="h-5 w-5" /> },
    { label: "Browse Tutors", key: "browseTutors", icon: <UserCircleIcon className="h-5 w-5" /> },
    { label: "My Bookings", key: "myBookings", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
    { label: "My Review", key: "review", icon: <ChatBubbleLeftRightIcon className="h-5 w-5" /> },
    { label: "My Profile", key: "profile", icon: <UserCircleIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 shadow p-4 md:p-6 rounded-r-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden md:block">
            Student Dashboard
          </h2>
          <button
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`grid grid-cols-1 gap-2 ${
            sidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <li
                key={item.key}
                title={item.label}
                onClick={() => {
                  if (item.href) {
                    router.push(item.href);
                  } else {
                    setActiveTab(item.key as ActiveTab);
                  }
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                {item.icon}
                <span className="hidden md:block text-sm">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
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
