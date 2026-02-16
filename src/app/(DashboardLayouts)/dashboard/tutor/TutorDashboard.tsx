"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth/authClient";
import { getTutorDashboardStats } from "@/services/dashboard/tutor";
import { getCurrentUser } from "@/services/auth/auth";

import Sidebar from "@/components/tutorDashboard/Sidebar";
import Navbar from "@/components/tutorDashboard/Navbar";
import Footer from "@/components/shared/Footer";
import OverviewCards from "@/components/tutorDashboard/OverviewCards";
import TutorProfile from "@/components/tutorDashboard/TutorProfile";
import TutorAvailability from "@/components/tutorDashboard/TutorAvailability";
import Bookings from "@/components/tutorDashboard/Bookings";
import Reviews from "@/components/tutorDashboard/Reviews";
import UpcomingSessions from "@/components/tutorDashboard/UpcomingSessions";

type TabKey =
  | "overview"
  | "profile"
  | "availability"
  | "bookings"
  | "reviews"
  | "upcoming";

export default function TutorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile toggle

  // Persist activeTab in localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab") as TabKey | null;
    if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Fetch user and stats
  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }
        setUser(currentUser);

        const dashboard = await getTutorDashboardStats(currentUser.id);
        setStats(dashboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main content */}
      {/* <div className="flex-1 flex flex-col md:ml-64"> */}
      <div className="md:ml-64 md:pl-4 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <div className="flex flex-col min-h-[calc(100vh-80px)] p-6">
          <div className="flex-1">
            {activeTab === "overview" && <OverviewCards stats={stats} />}
            {activeTab === "profile" && (
              <TutorProfile stats={stats} setStats={setStats} />
            )}
            {activeTab === "availability" && (
              <TutorAvailability stats={stats} setActiveTab={setActiveTab} />
            )}
            {activeTab === "bookings" && <Bookings stats={stats} />}
            {activeTab === "reviews" && <Reviews stats={stats} />}
            {activeTab === "upcoming" && <UpcomingSessions stats={stats} />}
          </div>

          {/* Footer pushed down */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
