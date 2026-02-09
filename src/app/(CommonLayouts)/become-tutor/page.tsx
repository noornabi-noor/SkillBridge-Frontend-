"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BecomeTutorPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    bio: "",
    experience: "",
    pricePerHour: "",
    categories: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // VERY IMPORTANT
        body: JSON.stringify({
          bio: form.bio,
          experience: Number(form.experience),
          pricePerHour: Number(form.pricePerHour),
          categories: form.categories
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to become tutor");
      }

      // Role changed → refresh session
      router.refresh();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Become a Tutor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="bio"
          placeholder="Short bio about yourself"
          value={form.bio}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="experience"
          placeholder="Years of experience"
          value={form.experience}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="pricePerHour"
          placeholder="Price per hour"
          value={form.pricePerHour}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="categories"
          placeholder="Categories (comma separated)"
          value={form.categories}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Become a Tutor"}
        </button>
      </form>
    </div>
  );
}
