// "use client";

// import { ModeToggle } from "../theme/modeToggle";

// interface NavbarProps {
//   user: any;
//   onLogout: () => void;
// }

// export default function Navbar({ user, onLogout }: NavbarProps) {
//   return (
//     <nav className="flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-800 shadow-md rounded-md transition-colors duration-300">
//       {/* Left: Greeting */}
//       <div className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
//         Welcome, <span className="font-bold">{user.name}</span>
//       </div>

//       {/* Right: Actions */}
//       <div className="flex items-center space-x-3">
//         {/* Theme Toggle */}
//         <ModeToggle />

//         {/* Logout Button */}
//         <button
//           onClick={onLogout}
//           className="bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-500 px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors duration-200"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }




"use client";

import { ModeToggle } from "../theme/modeToggle";

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav
      className="
        sticky top-0 z-50
        flex items-center justify-between
        p-4 mb-6
        bg-white dark:bg-gray-800
        shadow-md rounded-md
        transition-colors duration-300
      "
    >
      {/* Left */}
      <div className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Welcome, <span className="font-bold">{user.name}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        <button
          onClick={onLogout}
          className="
            bg-red-500 text-white
            dark:bg-red-600 dark:hover:bg-red-500
            px-4 py-2 rounded-md
            shadow hover:bg-red-600
            transition-colors
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
