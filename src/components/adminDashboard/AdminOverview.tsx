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

  if (!stats) {
    return (
      <div className="flex justify-center py-10 text-gray-500 dark:text-gray-400">
        Loading stats...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: stats.totalUsers },
          { label: "Total Students", value: stats.totalStudents },
          { label: "Total Tutors", value: stats.totalTutors },
          { label: "Total Bookings", value: stats.totalBookings },
        ].map((item) => (
          <div
            key={item.label}
            className="
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-xl p-6
              shadow-sm hover:shadow-md transition-shadow
              min-h-[110px]
              flex flex-col justify-center space-y-2
            "
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </p>

            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* New Users */}
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          rounded-xl p-6
          shadow-sm
        "
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          New Users (Last 3 Days)
        </h3>

        {stats.newUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No new users in the last 3 days.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {stats.newUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
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
