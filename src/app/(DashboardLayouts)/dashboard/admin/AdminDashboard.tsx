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
import AdminOverview from "@/components/adminDashboard/AdminOverview";
import AdminProfile from "@/components/adminDashboard/AdminProfile";

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
    "overview" | "users" | "bookings" | "categories" | "reviews" | "profile"
  >("overview");

  // Persist active tab (same as tutor)
  useEffect(() => {
    const saved = localStorage.getItem("adminActiveTab") as
      | "overview"
      | "users"
      | "bookings"
      | "categories"
      | "reviews"
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar */}
        <div className="px-6 pt-4">
          <Navbar user={user} onLogout={handleLogout} />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === "overview" && <AdminOverview />}

          {activeTab === "users" && <AdminUsersTable initialUsers={users} />}

          {activeTab === "bookings" && <AdminBookingsTable />}

          {activeTab === "categories" && <AdminCategoriesTable />}

          {activeTab === "reviews" && <AdminReviewsTable />}

          {activeTab === "profile" && <AdminProfile />}
        </div>
      </div>
    </div>
  );
}
