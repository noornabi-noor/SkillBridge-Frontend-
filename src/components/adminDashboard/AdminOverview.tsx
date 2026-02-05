"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "@/services/dashboard/admin";

export default function AdminOverview() {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalStudents: number;
    totalTutors: number;
    totalBookings: number;
    newUsers: any[];
  } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getAdminDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    }
    fetchStats();
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-sm text-gray-500">Total Tutors</p>
          <p className="text-xl font-bold">{stats.totalTutors}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-xl font-bold">{stats.totalBookings}</p>
        </div>
      </div>

      {/* New Users */}
      <div className="mt-6 bg-white dark:bg-gray-900 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">New Users (Last 3 Days)</h3>
        {stats.newUsers.length === 0 ? (
          <p>No new users in the last 3 days.</p>
        ) : (
          <ul className="space-y-1">
            {stats.newUsers.map((user) => (
              <li key={user.id} className="flex justify-between border-b py-1">
                <span>{user.name}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
