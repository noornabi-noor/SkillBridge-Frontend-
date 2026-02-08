"use client";

import { useState } from "react";
import { updateUserStatus } from "@/services/dashboard/admin";
import UserDetails from "./UserDetails";
import { toast } from "sonner";

export default function AdminUsersTable({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [users, setUsers] = useState(
    initialUsers.filter((u) => u.role !== "ADMIN"),
  );

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleToggleStatus = async (user: any) => {
    try {
      setLoadingId(user.id);
      const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";
      const updatedUser = await updateUserStatus(user.id, newStatus);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u)),
      );

      if (selectedUser?.id === user.id) setSelectedUser(updatedUser);

      toast.success("User status updated");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const roleOk = roleFilter === "ALL" || u.role === roleFilter;
    const statusOk = statusFilter === "ALL" || u.status === statusFilter;
    const searchOk =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    return roleOk && statusOk && searchOk;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Users
        </h2>

        <input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded border
            bg-gray-50 text-sm
            dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 rounded border text-sm
            bg-gray-50
            dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="TUTOR">Tutor</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded border text-sm
            bg-gray-50
            dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="space-y-4 md:hidden lg:hidden">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4
              bg-gray-50 dark:bg-gray-800
              dark:border-gray-700"
          >
            <div className="space-y-1">
              <p className="font-semibold text-gray-800 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {user.role}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  user.status === "ACTIVE"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedUser(user)}
                className="flex-1 px-3 py-2 rounded text-sm
                  bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                View
              </button>

              <button
                disabled={loadingId === user.id}
                onClick={() => handleToggleStatus(user)}
                className={`flex-1 px-3 py-2 rounded text-sm text-white ${
                  user.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {user.status === "ACTIVE" ? "Ban" : "Unban"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE (TABLET + PC) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-gray-800 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="py-3 text-left">Name</th>
              <th className="py-3 text-left">Email</th>
              <th className="py-3 text-left">Role</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-gray-800
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="py-3 font-medium text-gray-800 dark:text-white">
                  {user.name}
                </td>
                <td className="py-3 text-gray-500">{user.email}</td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">{user.status}</td>
                <td className="py-3 text-right space-x-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-1 rounded text-xs
                      bg-gray-200 dark:bg-gray-700 dark:text-white"
                  >
                    View
                  </button>
                  <button
                    disabled={loadingId === user.id}
                    onClick={() => handleToggleStatus(user)}
                    className={`px-3 py-1 rounded text-xs text-white ${
                      user.status === "ACTIVE"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.status === "ACTIVE" ? "Ban" : "Unban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
