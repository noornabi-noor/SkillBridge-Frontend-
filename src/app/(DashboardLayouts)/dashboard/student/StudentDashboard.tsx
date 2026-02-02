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

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Active tab for sidebar navigation
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "overview" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "browseTutors" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("browseTutors")}
          >
            Browse Tutors
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "myBookings" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("myBookings")}
          >
            My Bookings
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "review" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("review")}
          >
            My Review
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "profile" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.name || "Student"}
        </h1>
        {activeTab === "overview" && <StudentOverview studentId={user.id} />}
        {activeTab === "browseTutors" && <BrowseTutors />}
        {activeTab === "myBookings" && user && (
          <StudentBookings studentId={user.id} />
        )}
        {activeTab === "review" && user?.id && <StudentReviews studentId={user.id} />}
        {activeTab === "profile" && <StudentProfile studentId={user.id} />}
        
      </div>
    </div>
  );
}
