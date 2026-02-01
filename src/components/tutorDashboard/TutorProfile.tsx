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

  // Save or update tutor profile
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

      if (!res.ok) {
        const text = await res.text();
        console.error("Save profile error:", text);
        throw new Error("Failed to save profile");
      }

      // Refresh dashboard stats after saving
      const updatedStats = await getTutorDashboardStats(user.id, user);
      setStats(updatedStats);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  if (!stats.profile) {
    return (
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">You are not a tutor yet</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Become a Tutor
        </button>

        {isEditing && (
          <div className="mt-4 space-y-2">
            <input
              className="border px-2 py-1 w-full rounded"
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <input
              className="border px-2 py-1 w-full rounded"
              placeholder="Experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
            <input
              className="border px-2 py-1 w-full rounded"
              placeholder="Rate ($/hr)"
              type="number"
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: Number(e.target.value) })
              }
            />
            <input
              className="border px-2 py-1 w-full rounded"
              placeholder="Categories (comma separated)"
              value={formData.categories}
              onChange={(e) =>
                setFormData({ ...formData, categories: e.target.value })
              }
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">My Tutor Profile</h2>
      <p>
        <strong>Bio:</strong> {stats.profile.bio}
      </p>
      <p>
        <strong>Experience:</strong> {stats.profile.experience}
      </p>
      <p>
        <strong>Rate:</strong> ${stats.profile.pricePerHour || 0}/hr
      </p>
      <p>
        <strong>Categories:</strong>{" "}
        {stats.profile.categories
          ?.map((c: any) => c.category?.name)
          .filter(Boolean)
          .join(", ")}
      </p>

      <button
        onClick={() => setIsEditing(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-4"
      >
        Update Your Profile
      </button>

      {isEditing && (
        <div className="mt-4 space-y-2">
          <input
            className="border px-2 py-1 w-full rounded"
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <input
            className="border px-2 py-1 w-full rounded"
            placeholder="Experience"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
          <input
            className="border px-2 py-1 w-full rounded"
            placeholder="Rate ($/hr)"
            type="number"
            value={formData.rate}
            onChange={(e) =>
              setFormData({ ...formData, rate: Number(e.target.value) })
            }
          />
          <input
            className="border px-2 py-1 w-full rounded"
            placeholder="Categories (comma separated)"
            value={formData.categories}
            onChange={(e) =>
              setFormData({ ...formData, categories: e.target.value })
            }
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
