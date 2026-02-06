"use client";

import { useRouter } from "next/navigation";

type AdminTabKey =
  | "overview"
  | "users"
  | "bookings"
  | "categories"
  | "reviews"
  | "profile";

interface AdminSidebarProps {
  activeTab: AdminTabKey;
  setActiveTab: (tab: AdminTabKey) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const router = useRouter();

  const tabs: {
    label: string;
    key: AdminTabKey | "home";
    href?: string;
  }[] = [
    { label: "Home", key: "home", href: "/" },
    { label: "Overview", key: "overview" },
    { label: "Users", key: "users" },
    { label: "Bookings", key: "bookings" },
    { label: "Categories", key: "categories" },
    { label: "Reviews", key: "reviews" },
    { label: "Profile", key: "profile" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h2>

      <ul className="space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <li
              key={tab.key}
              onClick={() => {
                if (tab.key === "home" && tab.href) {
                  router.push(tab.href);
                } else {
                  setActiveTab(tab.key as AdminTabKey);
                }
              }}
              className={`
                cursor-pointer rounded-lg p-3 font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }
              `}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
