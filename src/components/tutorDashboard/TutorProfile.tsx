"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { getTutorDashboardStats } from "@/services/dashboard/tutor";
import { updateUserProfile, upsertTutorProfile } from "@/services/tutors/tutors";
import { useState } from "react";

interface TutorProfileProps {
  stats: any;
  setStats: (stats: any) => void;
}

export default function TutorProfile({ stats, setStats }: TutorProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form data from stats.user and stats.profile
  const [formData, setFormData] = useState({
    name: stats.user?.name || "",
    email: stats.user?.email || "",
    phone: stats.user?.phone || "",
    image: stats.user?.image || "",
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
    if (!stats?.user?.id) {
      alert("User data not loaded yet ❌");
      return;
    }

    try {
      // 1️⃣ Update user
      await updateUserProfile(stats.user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
      });

      // 2️⃣ Update tutor profile (if any data exists)
      const hasTutorData =
        formData.bio ||
        formData.experience ||
        formData.rate ||
        formData.categories;

      if (hasTutorData) {
        await upsertTutorProfile({
          bio: formData.bio,
          experience: Number(formData.experience) || 0,
          pricePerHour: Number(formData.rate) || 0,
          categories: formData.categories
            .split(",")
            .map((c: string) => c.trim())
            .filter(Boolean),
        });
      }

      // 3️⃣ Refresh dashboard
      const updatedStats = await getTutorDashboardStats(stats.user.id);
      setStats(updatedStats);

      setIsEditing(false);
      alert("Profile updated successfully ✅");
    } catch (error: any) {
      if (error.message === "UNAUTHORIZED") {
        alert("Unauthorized ❌: Please login again");
        return;
      }

      console.error("Profile save error:", error);
      alert("Failed to save profile ❌: " + error.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        My Profile
      </h2>

      {!isEditing ? (
        <div className="space-y-2 text-gray-800 dark:text-gray-200">
          {/* Profile Image */}
          <img
            src={
              stats.user?.image?.startsWith("http")
                ? stats.user.image
                : "/avatar.png"
            }
            alt={stats.user?.name || "User"}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <p>
            <strong>Name:</strong> {stats.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {stats.user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {stats.user?.phone || "Not set"}
          </p>

          {/* Tutor-specific info */}
          {stats.profile && (
            <>
              <p>
                <strong>Bio:</strong> {stats.profile.bio}
              </p>
              <p>
                <strong>Experience:</strong> {stats.profile.experience} years
              </p>
              <p>
                <strong>Rate:</strong> ${stats.profile.pricePerHour}/hr
              </p>
              <p>
                <strong>Categories:</strong>{" "}
                {stats.profile.categories
                  ?.map((c: any) => c.category?.name)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </>
          )}

          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 mt-4"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Main user info */}
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {/* Image URL input */}
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Profile Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />

          {/* Tutor-specific info */}
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Rate ($/hr)"
            type="number"
            value={formData.rate}
            onChange={(e) =>
              setFormData({ ...formData, rate: Number(e.target.value) })
            }
          />
          <input
            className="border dark:border-gray-600 px-2 py-1 w-full rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Categories (comma separated)"
            value={formData.categories}
            onChange={(e) =>
              setFormData({ ...formData, categories: e.target.value })
            }
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
