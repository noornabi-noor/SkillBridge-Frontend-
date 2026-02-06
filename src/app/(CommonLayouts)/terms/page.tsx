"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Use of the Platform",
    content:
      "SkillBridge connects students with independent tutors. We do not guarantee learning outcomes or tutor availability.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account and all activities under it.",
  },
  {
    title: "Bookings & Payments",
    content:
      "Booking terms, cancellations, and refunds depend on tutor policies and platform rules.",
  },
  {
    title: "Prohibited Activities",
    content:
      "Users may not misuse the platform, post harmful content, or engage in fraudulent behavior.",
  },
  {
    title: "Account Termination",
    content:
      "SkillBridge reserves the right to suspend or terminate accounts violating these terms.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen px-4 py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 md:p-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-blue-500 pl-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {index + 1}. {section.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
