"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            About <span className="text-blue-600">SkillBridge</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            SkillBridge is more than a learning platform — it’s a bridge between
            ambition and achievement.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {[
            {
              title: "Our Mission",
              text: "To connect learners with the right mentors and help them master real-world skills through personalized, accessible, and practical education.",
            },
            {
              title: "Our Vision",
              text: "A world where anyone, anywhere, can learn from experts, grow confidently, and build a successful future.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why SkillBridge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why SkillBridge?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Tutors",
                desc: "Learn directly from experienced professionals across industries.",
              },
              {
                title: "Personalized Learning",
                desc: "Tailored lessons based on your goals, pace, and skill level.",
              },
              {
                title: "Flexible Scheduling",
                desc: "Learn anytime, anywhere — on your own schedule.",
              },
              {
                title: "Career-Focused",
                desc: "Skills that matter in the real world, not just theory.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to build your future?
          </h3>
          <p className="mb-8 text-white/90">
            Join SkillBridge today and start learning from the best.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
