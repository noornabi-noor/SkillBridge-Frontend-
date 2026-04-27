"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/tutorDashboard/Navbar";
import AdminUsersTable from "@/components/adminDashboard/AdminUsersTable";
import {
  getAllBookingsAdmin,
  getAllCategoriesAdmin,
  getAllUsersAdmin,
} from "@/services/dashboard/admin";
import { getCurrentUser } from "@/services/auth/auth";
import { logout } from "@/services/auth/authClient";
import AdminSidebar from "@/components/adminDashboard/adminSidebar";
import AdminBookingsTable from "@/components/adminDashboard/AdminBookingsTable";
import AdminCategoriesTable from "@/components/adminDashboard/AdminCategoriesTable";
import AdminReviewsTable from "@/components/adminDashboard/AdminReviewsTable";
import AdminPaymentsTable from "@/components/adminDashboard/AdminPaymentsTable";
import AdminOverview from "@/components/adminDashboard/AdminOverview";
import AdminProfile from "@/components/adminDashboard/AdminProfile";
import Footer from "@/components/shared/Footer";
import LoadingPage from "@/app/loading";

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [profile, setProfile] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "bookings" | "categories" | "reviews" | "payments" | "profile"
  >("overview");

  // Persist active tab (same as tutor)
  useEffect(() => {
    const saved = localStorage.getItem("adminActiveTab") as
      | "overview"
      | "users"
      | "bookings"
      | "categories"
      | "reviews"
      | "payments"
      | "profile"
      | null;
    if (saved) setActiveTab(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        setUser(currentUser);

        const allUsers = await getAllUsersAdmin();
        setUsers(allUsers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab !== "bookings") return;

    async function fetchBookings() {
      try {
        const allBookings = await getAllBookingsAdmin();
        setBookings(allBookings);
      } catch (err) {
        console.error(err);
      }
    }

    fetchBookings();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "categories") return;

    async function fetchCategories() {
      try {
        const allCategories = await getAllCategoriesAdmin();
        setCategories(allCategories);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Area */}
      <div className="md:ml-64 md:pl-4 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => {}}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "users" && <AdminUsersTable initialUsers={users} />}
          {activeTab === "bookings" && <AdminBookingsTable />}
          {activeTab === "categories" && <AdminCategoriesTable />}
          {activeTab === "reviews" && <AdminReviewsTable />}
          {activeTab === "payments" && <AdminPaymentsTable />}
          {activeTab === "profile" && <AdminProfile />}
        </main>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
