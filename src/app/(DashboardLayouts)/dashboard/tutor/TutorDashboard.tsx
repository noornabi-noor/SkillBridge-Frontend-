"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth/authClient";
import { getTutorDashboardStats } from "@/services/dashboard/tutor";
import { getCurrentUser } from "@/services/auth/auth";

import TutorAvailability from "@/components/tutorDashboard/TutorAvailability";
import Sidebar from "@/components/tutorDashboard/Sidebar";
import Navbar from "@/components/tutorDashboard/Navbar";
import OverviewCards from "@/components/tutorDashboard/OverviewCards";
import TutorProfile from "@/components/tutorDashboard/TutorProfile";
import Reviews from "@/components/tutorDashboard/Reviews";
import Bookings from "@/components/tutorDashboard/Bookings";
import UpcomingSessions from "@/components/tutorDashboard/UpcomingSessions";

export default function TutorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming"
  >("overview");

  // --- Persist activeTab in localStorage ---
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab") as
      | "overview"
      | "profile"
      | "availability"
      | "bookings"
      | "reviews"
      | "upcoming"
      | null;

    if (savedTab) setActiveTab(savedTab);
  }, []);

  // --- Save activeTab to localStorage whenever it changes ---
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6 overflow-auto">
        <Navbar user={user} onLogout={handleLogout} />

        {activeTab === "overview" && <OverviewCards stats={stats} />}
        {activeTab === "profile" && (
          <TutorProfile stats={stats} setStats={setStats} />
        )}
        {activeTab === "availability" && (
          // <TutorAvailability tutorId={stats.profile.id} />
          <TutorAvailability />
        )}
        {activeTab === "bookings" && <Bookings stats={stats} />}
        {activeTab === "reviews" && <Reviews stats={stats} />}
        {activeTab === "upcoming" && <UpcomingSessions stats={stats} />}
      </div>
    </div>
  );
}
