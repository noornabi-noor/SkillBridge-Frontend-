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
import Footer from "@/components/shared/Footer";

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
    {
      label: "Home",
      key: "home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: "Overview",
      key: "overview",
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
    {
      label: "Browse Tutors",
      key: "browseTutors",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    {
      label: "My Bookings",
      key: "myBookings",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    },
    {
      label: "My Review",
      key: "review",
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
    },
    {
      label: "My Profile",
      key: "profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Student Dashboard
          </h2>

          <button
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Menu */}
        <ul className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <li
                key={item.key}
                onClick={() => {
                  if (item.href) {
                    router.push(item.href);
                  } else {
                    setActiveTab(item.key as ActiveTab);
                  }
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${
                  isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Area */}
      <div className="md:ml-64 md:pl-4 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && <StudentOverview studentId={user.id} />}
          {activeTab === "browseTutors" && <BrowseTutors />}
          {activeTab === "myBookings" && (
            <StudentBookings studentId={user.id} />
          )}
          {activeTab === "review" && <StudentReviews studentId={user.id} />}
          {activeTab === "profile" && <StudentProfile studentId={user.id} />}
        </main>
        {/* Footer pushed down */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
