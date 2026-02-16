"use client";

import { useRouter } from "next/navigation";
import {
  HomeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

type TabKey =
  | "overview"
  | "profile"
  | "availability"
  | "bookings"
  | "reviews"
  | "upcoming";

interface SidebarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, open, setOpen }: SidebarProps) {
  const router = useRouter();

  const tabs = [
    { label: "Home", key: "home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
    { label: "Overview", key: "overview", icon: <ChartBarIcon className="h-5 w-5" /> },
    { label: "My Profile", key: "profile", icon: <UserCircleIcon className="h-5 w-5" /> },
    { label: "Availability", key: "availability", icon: <CalendarDaysIcon className="h-5 w-5" /> },
    { label: "Bookings", key: "bookings", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
    { label: "Reviews", key: "reviews", icon: <ChatBubbleLeftRightIcon className="h-5 w-5" /> },
    { label: "Upcoming Sessions", key: "upcoming", icon: <ClockIcon className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-950 shadow-lg z-50
          transform md:translate-x-0 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tutor Dashboard</h2>

          {/* Close button on mobile */}
          <button
            className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Tabs */}
        <ul className="px-4 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <li
                key={tab.key}
                onClick={() => {
                  if (tab.key === "home" && tab.href) router.push(tab.href);
                  else setActiveTab(tab.key as TabKey);
                  setOpen(false); // close sidebar on mobile
                }}
                className={`
                  flex items-center gap-3 cursor-pointer rounded-lg p-3 font-medium transition-colors
                  ${isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }
                `}
              >
                {tab.icon}
                <span className="text-sm">{tab.label}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}


