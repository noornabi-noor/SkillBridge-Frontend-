"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth/auth";
import LoadingPage from "@/app/loading";

export default function AdminProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getCurrentUser();
        if (!profile || profile.role !== "ADMIN") {
          throw new Error("Not authorized");
        }

        setUser(profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Admin Profile
        </h2>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <img
            src={user.image || "/avatar.png"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {user.name || "N/A"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <span
              className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full
              bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-medium">Name</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Role</span>
            <span>{user.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
