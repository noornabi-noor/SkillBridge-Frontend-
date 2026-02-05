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

      setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
      toast.success("User status set successfully!");

      if (selectedUser?.id === user.id) {
        setSelectedUser(updatedUser);
      }
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
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Users</h2>

        <input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded border dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
        />
      </div>

      {/* FILTERS (COLLAPSIBLE STYLE) */}
      <div className="flex gap-4 mb-5">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 rounded border dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="TUTOR">Tutor</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded border dark:border-gray-700
            bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
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
                className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="py-3 font-medium text-gray-800 dark:text-white">
                  {user.name}
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>               

                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : user.role === "TUTOR"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : user.role === "STUDENT"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-3">
                  {user.status === "BANNED" ? (
                    <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      BANNED
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      ACTIVE
                    </span>
                  )}
                </td>
                <td className="py-3 text-right space-x-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-1 rounded text-xs font-semibold bg-gray-200 dark:bg-gray-700 dark:text-white"
                  >
                    View
                  </button>

                  <button
                    disabled={loadingId === user.id}
                    onClick={() => handleToggleStatus(user)}
                    className={`px-4 py-1.5 rounded text-xs font-semibold text-white transition ${
                      user.status === "ACTIVE"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    } disabled:opacity-50`}
                  >
                    {loadingId === user.id
                      ? "..."
                      : user.status === "ACTIVE"
                        ? "Ban"
                        : "Unban"}
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* USER DETAIL CARD */}
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
