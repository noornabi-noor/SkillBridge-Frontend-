"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect personal information such as name, email, and profile details when you register.",
  },
  {
    title: "How We Use Data",
    content:
      "Your data helps us provide services, manage bookings, improve experience, and ensure security.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell your data. Information is shared only when necessary for platform functionality.",
  },
  {
    title: "Security Measures",
    content:
      "We implement reasonable security measures, but no system can guarantee full protection.",
  },
  {
    title: "Your Rights",
    content:
      "You can update or delete your account information anytime from your profile settings.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500/10 via-teal-500/10 to-cyan-500/10 dark:from-green-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/20 p-8 md:p-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
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
              className="border-l-4 border-emerald-500 pl-6"
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
