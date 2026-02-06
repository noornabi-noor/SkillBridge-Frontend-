"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Student • Programming",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "SkillBridge completely changed the way I learn. Booking tutors is effortless!",
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    role: "Student • Mathematics",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Amazing tutors and smooth experience. The UI feels premium and modern.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Student • English",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "I improved my speaking skills within weeks. Highly recommended platform.",
    rating: 4,
  },
  {
    name: "Imran Hossain",
    role: "Student • Physics",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Flexible scheduling and expert tutors. SkillBridge is a game changer.",
    rating: 5,
  },
  {
    name: "Raisa Ahmed",
    role: "Student • Design",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    review:
      "Beautiful UI and great tutors. Learning feels fun and easy now.",
    rating: 5,
  },
  {
    name: "Mahmudul Islam",
    role: "Student • Programming",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    review:
      "Instant booking and real experts. Exactly what I needed.",
    rating: 4,
  },
  {
    name: "Sadia Noor",
    role: "Student • Math",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    review:
      "Very smooth experience from booking to learning. Love it!",
    rating: 5,
  },
];

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 ${
      filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="mt-3 rounded-3xl relative py-28 overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
          Loved by Students
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-14">
          Real experiences from learners using SkillBridge
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 dark:border-gray-700"
          >
            <img
              src={current.image}
              alt={current.name}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-md mb-4"
            />

            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
              “{current.review}”
            </p>

            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i < current.rating} />
              ))}
            </div>

            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {current.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {current.role}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
