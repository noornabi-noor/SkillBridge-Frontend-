// "use client";

// import { motion } from "framer-motion";

// const socialLinks = [
//   {
//     name: "GitHub",
//     url: "https://github.com/noornabi-noor/SkillBridge-Frontend-.git",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M12 2C6.477 2 2 6.484 2 12.018c0 4.424 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.946 0-1.092.39-1.987 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.701 1.028 1.596 1.028 2.688 0 3.843-2.339 4.69-4.566 4.939.359.309.678.919.678 1.852 0 1.337-.012 2.417-.012 2.743 0 .268.18.58.688.481A10.02 10.02 0 0022 12.018C22 6.484 17.523 2 12 2z" />
//       </svg>
//     ),
//   },
//   {
//     name: "LinkedIn",
//     url: "https://www.linkedin.com/in/md-noornabi-bb41442b3/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.792-1.75-1.767 0-.975.784-1.765 1.75-1.765s1.75.79 1.75 1.765c0 .975-.783 1.767-1.75 1.767zm13.5 11.268h-3v-5.604c0-3.368-4-3.111-4 0v5.604h-3v-10h3v1.528c1.396-2.586 7-2.777 7 2.476v5.996z" />
//       </svg>
//     ),
//   },
//   {
//   name: "Facebook",
//   url: "https://www.facebook.com/md.noornabi.noor.2024",
//   icon: (
//     <svg
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="w-6 h-6"
//     >
//       <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
//     </svg>
//   ),
// },
// ];

// export default function Footer() {
//   return (
//     <footer className="mt-3 relative bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden">
//       {/* Background glow */}
//       <motion.div
//         className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
//         transition={{ duration: 14, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
//         animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
//         transition={{ duration: 16, repeat: Infinity }}
//       />

//       <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 z-10">
//         {/* Brand */}
//         <div>
//           <h3 className="text-2xl font-extrabold mb-4">SkillBridge 🎓</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//             Connecting learners with expert tutors worldwide. Learn smarter,
//             grow faster, and achieve more.
//           </p>
//         </div>

//         {/* Explore */}
//         <div>
//           <h4 className="font-semibold mb-4">Explore</h4>
//           <ul className="space-y-2 text-sm">
//             {["Home", "Find Tutors", "Categories", "About"].map(
//               (item) => (
//                 <li
//                   key={item}
//                   className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
//                 >
//                   {item}
//                 </li>
//               ),
//             )}
//           </ul>
//         </div>

//         {/* Social */}
//         <div>
//           <h4 className="font-semibold mb-4">Connect</h4>
//           <div className="flex gap-4">
//             {socialLinks.map((social) => (
//               <a
//                 key={social.name}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-full shadow hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 transition"
//               >
//                 {social.icon}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom */}
//       <div className="relative border-t border-gray-300 dark:border-gray-700 py-6 text-center text-sm z-10">
//         © {new Date().getFullYear()} SkillBridge. All rights reserved.
//       </div>
//     </footer>
//   );
// }




"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/noornabi-noor/SkillBridge-Frontend-.git",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.018c0 4.424 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.344-3.369-1.344-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.946 0-1.092.39-1.987 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.701 1.028 1.596 1.028 2.688 0 3.843-2.339 4.69-4.566 4.939.359.309.678.919.678 1.852 0 1.337-.012 2.417-.012 2.743 0 .268.18.58.688.481A10.02 10.02 0 0022 12.018C22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/md-noornabi-bb41442b3/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.792-1.75-1.767 0-.975.784-1.765 1.75-1.765s1.75.79 1.75 1.765c0 .975-.783 1.767-1.75 1.767zm13.5 11.268h-3v-5.604c0-3.368-4-3.111-4 0v5.604h-3v-10h3v1.528c1.396-2.586 7-2.777 7 2.476v5.996z" />
      </svg>
    ),
  },
  {
  name: "Facebook",
  url: "https://www.facebook.com/md.noornabi.noor.2024",
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
    </svg>
  ),
},
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Find Tutors", href: "/find-tutors" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative mt-6 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 overflow-hidden">
      
      {/* Animated background glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-14 z-10">
        
        {/* 1️⃣ Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold">SkillBridge 🎓</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
            Connecting learners with expert tutors worldwide. Learn smarter,
            grow faster, and achieve more.
          </p>
        </div>

        {/* 2️⃣ Navigation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Social */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Connect</h4>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-3 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-md hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-300 dark:border-gray-700 py-6 text-center text-sm z-10">
        © {new Date().getFullYear()} SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}
