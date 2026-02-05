"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth/auth";

export default function AdminProfile() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getCurrentUser();
        if (!profile || profile.role !== "ADMIN") {
          throw new Error("Not authorized");
        }

        setUser(profile);
        setForm({
          name: profile.name || "",
          email: profile.email || "",
          image: profile.image || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);


  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Profile</h2>

      <div className="mb-6">
        <img
          src={user.image || "/avatar.png"}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full object-cover border dark:border-gray-700 mb-4"
        />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p>
          <strong>Joined:</strong>{" "}
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
}
