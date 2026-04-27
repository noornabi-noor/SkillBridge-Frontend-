"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Tutors",
    description: "Learn from trusted and expert tutors verified by SkillBridge.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        suppressHydrationWarning
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions anytime that fits your schedule, hassle-free.",
    icon: (
      <svg
        className="w-12 h-12 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3"
        />
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
      </svg>
    ),
  },
  {
    title: "Student Reviews",
    description: "Read genuine feedback from other learners to make informed choices.",
    icon: (
      <svg
        className="w-12 h-12 text-purple-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.02h7.392c.969 0 1.371 1.24.588 1.81l-5.982 4.357 2.286 7.019c.3.921-.755 1.688-1.54 1.118l-5.983-4.357-5.983 4.357c-.784.57-1.838-.197-1.539-1.118l2.285-7.019-5.983-4.357c-.783-.57-.38-1.81.588-1.81h7.392l2.286-7.02z"
        />
      </svg>
    ),
  },
  {
    title: "Secure Platform",
    description: "Your data and payments are safe with industry-standard security.",
    icon: (
      <svg
        className="w-12 h-12 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0-3.866-3.582-7-8-7v14c4.418 0 8-3.134 8-7z"
        />
      </svg>
    ),
  },
];

export default function WhySkillBridge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="mt-3 rounded-3xl py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Why SkillBridge?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-12 text-lg">
          SkillBridge gives you the best learning experience with expert tutors and flexible sessions.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
