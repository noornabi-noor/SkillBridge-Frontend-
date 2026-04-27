"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Steps data
const steps = [
  {
    title: "Search Tutor",
    description: "Find verified tutors by subject, category, or rating.",
    icon: (
      <svg
        className="w-12 h-12 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        suppressHydrationWarning
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    bg: "bg-blue-500",
  },
  {
    title: "Book Session",
    description: "Schedule your 1-on-1 session instantly.",
    icon: (
      <svg
        className="w-12 h-12 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        suppressHydrationWarning
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    bg: "bg-green-500",
  },
  {
    title: "Learn & Review",
    description: "Attend your session and leave a review for the tutor.",
    icon: (
      <svg
        className="w-12 h-12 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        suppressHydrationWarning
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    bg: "bg-purple-500",
  },
];

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-32 overflow-hidden dark:bg-gray-900 mt-3 rounded-3xl">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="w-[150%] h-[150%] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-gradient-x"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="w-[150%] h-[150%] bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 opacity-20 blur-3xl animate-gradient-x"
          animate={{ x: [100, -100, 100] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-50 drop-shadow-lg">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-20">
          Get started in 3 simple steps to connect with expert tutors
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center md:w-1/3"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.7 }}
            >
              {/* Floating Icon Circle */}
              <motion.div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg ${step.bg}`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {step.icon}
              </motion.div>

              {/* Card with glass effect */}
              <motion.div
                className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-500"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
              </motion.div>

              {/* Connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-[-50%] w-[100%] h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
