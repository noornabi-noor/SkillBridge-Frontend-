"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/page-container";

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

  const headingTextColor = theme === "dark" ? "text-white" : "text-gray-900";
  const descriptionTextColor =
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const badgeBg =
    theme === "dark"
      ? "bg-indigo-800 text-indigo-200"
      : "bg-indigo-100 text-indigo-700";

  return (
    <section
      className={`relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      }`}
    >
      {/* 🔒 SAME CONTAINER AS NAVBAR */}
      <PageContainer className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span
              className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${badgeBg}`}
            >
              🚀 Learn Smarter. Teach Better.
            </span>

            <h1
              className={`text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight ${headingTextColor}`}
            >
              Find the Perfect Tutor. <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Learn Without Limits.
              </span>
            </h1>

            <p className={`text-lg max-w-xl ${descriptionTextColor}`}>
              SkillBridge connects students with verified expert tutors across
              multiple subjects. Learn at your pace, anytime, anywhere.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="px-8">
                Find Tutors
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Become a Tutor
              </Button>
            </div>

            <p className={`text-sm pt-4 ${descriptionTextColor}`}>
              ⭐ Trusted by 10,000+ students & 1,500+ tutors worldwide
            </p>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div
              className={`absolute -inset-4 rounded-3xl blur-3xl opacity-20 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700"
                  : "bg-gradient-to-r from-indigo-400 to-purple-400"
              }`}
            />

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Online tutoring"
              className="relative rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
