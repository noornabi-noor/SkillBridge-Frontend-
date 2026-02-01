"use client";

import { useState } from "react";
import { getTutorDashboardStats } from "@/services/dashboard/tutor";

interface TutorProfileProps {
  stats: any;
  setStats: (stats: any) => void;
  user: any;
}

export default function TutorProfile({ stats, setStats, user }: TutorProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    bio: stats.profile?.bio || "",
    experience: stats.profile?.experience?.toString() || "",
    rate: stats.profile?.pricePerHour || 0,
    categories:
      stats.profile?.categories
        ?.map((c: any) => c.category?.name)
        .filter(Boolean)
        .join(",") || "",
  });

  const handleSave = async () => {
    try {
      const method = stats?.profile ? "PATCH" : "POST";

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors`, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bio: formData.bio,
          experience: Number(formData.experience),
          pricePerHour: Number(formData.rate),
          categories: formData.categories
            .split(",")
            .map((c: string) => c.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const updatedStats = await getTutorDashboardStats(user.id, user);
      setStats(updatedStats);
      setIsEditing(false);
      alert("Profile saved ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile ❌");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
      {!stats.profile ? (
        <>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            You are not a tutor yet
          </h2>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Become a Tutor
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            My Tutor Profile
          </h2>
          {!isEditing && (
            <div className="space-y-2 text-gray-800 dark:text-gray-200">
              <p><strong>Bio:</strong> {stats.profile.bio}</p>
              <p><strong>Experience:</strong> {stats.profile.experience} years</p>
              <p><strong>Rate:</strong> ${stats.profile.pricePerHour}/hr</p>
              <p>
                <strong>Categories:</strong>{" "}
                {stats.profile.categories
                  ?.map((c: any) => c.category?.name)
                  .filter(Boolean)
                  .join(", ")}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 mt-4"
              >
                Update Your Profile
              </button>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div className="mt-4 space-y-3">
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Rate ($/hr)"
            type="number"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })}
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Categories (comma separated)"
            value={formData.categories}
            onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
