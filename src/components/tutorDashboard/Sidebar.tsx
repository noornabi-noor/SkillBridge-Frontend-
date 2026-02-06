"use client";

import { useRouter } from "next/navigation";

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
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const tabs: {
    label: string;
    key: TabKey | "home";
    href?: string;
  }[] = [
    { label: "Home", key: "home", href: "/" },
    { label: "Overview", key: "overview" },
    { label: "My Profile", key: "profile" },
    { label: "Availability", key: "availability" },
    { label: "Bookings", key: "bookings" },
    { label: "Reviews", key: "reviews" },
    { label: "Upcoming Sessions", key: "upcoming" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Tutor Dashboard
      </h2>

      <ul className="space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <li
              key={tab.key}
              className={`
                cursor-pointer rounded-lg p-3 font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }
              `}
              onClick={() => {
                if (tab.key === "home" && tab.href) {
                  router.push(tab.href);
                } else {
                  setActiveTab(tab.key as TabKey);
                }
              }}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
