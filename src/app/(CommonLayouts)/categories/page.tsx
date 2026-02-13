"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BookTutorButton from "@/components/modules/tutors/BookTutorButton";
import { getCurrentUser } from "@/services/auth/auth";
import { getCategories } from "@/services/tutors/tutors";


interface User {
  name: string;
  image?: string | null;
}

interface Tutor {
  id: string;
  bio?: string;
  pricePerHour?: number;
  experience?: string;
  rating?: number;
  subjects?: string[];
  user: { name: string; email: string; image?: string | null };
}

interface Category {
  id: string;
  name: string;
  tutors: {
    tutor: Tutor;
  }[];
}

export default function CategoryWiseTutors() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  const handleSeeDetails = (tutorId: string) => {
    router.push(`/tutors/${tutorId}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100">
          Browse Tutors by Category
        </h2>

        {categories.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tutors available in any category.
          </p>
        )}

        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              {category.name}
            </h3>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.tutors.map((t) => (
                <motion.div
                  key={t.tutor.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={t.tutor?.user?.image || "/avatar.png"}
                    alt={t.tutor?.user?.name || "Tutor"}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-400 dark:border-purple-500"
                  />
                  <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    {t.tutor?.user?.name || "Unknown"}
                  </h4>
                  {t.tutor.bio && (
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t.tutor.bio}
                    </p>
                  )}
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    Rate: ${t.tutor.pricePerHour || "N/A"}/hr
                  </p>
                  {t.tutor.rating && (
                    <p className="text-yellow-500 mt-2">
                      ⭐ {t.tutor.rating.toFixed(1)}
                    </p>
                  )}

                  <div className="mt-4 flex justify-between">
                    {/* Book button */}
                    <BookTutorButton tutor={t.tutor} user={user} />

                    <button
                      onClick={() => router.push(`/categories/${t.tutor.id}`)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      See Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
