"use client";

import { ModeToggle } from "../theme/modeToggle";

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onToggleSidebar?: () => void; // added
}

export default function Navbar({ user, onLogout, onToggleSidebar }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Left */}
      <div className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Welcome, <span className="font-bold">{user.name}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        {/* Mobile sidebar toggle */}
        {onToggleSidebar && (
          <button
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-800"
            onClick={onToggleSidebar}
          >
            ☰
          </button>
        )}

        <button
          onClick={onLogout}
          className="bg-red-500 text-white dark:bg-red-600 px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
