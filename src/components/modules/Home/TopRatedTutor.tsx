"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTopRatedTutor } from "@/services/dashboard/tutor";

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  rating: number;
  totalReviews: number;
  user: { name: string; image?: string | null };
}

export default function TopRatedTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  useEffect(() => {
    async function fetchTutors() {
      try {
        const data = await getTopRatedTutor();
        setTutors(data || []);
      } catch (err) {
        console.error("Failed to fetch top tutors:", err);
      }
    }
    fetchTutors();
  }, []);

  return (
    <section className="mt-3 rounded-3xl py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Top Rated Tutors
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
          Meet our highest rated tutors, trusted by students like you.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={tutor.user.image || "/avatar.png"}
                  alt={tutor.user.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-400 dark:border-purple-500"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {tutor.user.name}
                </h3>
                {tutor.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    {tutor.bio}
                  </p>
                )}
                <p className="text-yellow-400 font-semibold mb-1">
                  ⭐ {tutor.rating.toFixed(1)} ({tutor.totalReviews} reviews)
                </p>
                {tutor.pricePerHour && (
                  <p className="text-gray-700 dark:text-gray-200 font-medium">
                    ${tutor.pricePerHour}/hr
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
