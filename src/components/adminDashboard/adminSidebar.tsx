"use client";

interface AdminSidebarProps {
  activeTab: "overview" | "users" | "bookings" | "categories" | "reviews";
  setActiveTab: (tab: "overview" | "users" | "bookings" | "categories" | "reviews") => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const tabs = [
    { label: "Overview", key: "overview" },
    { label: "Users", key: "users" },
    { label: "Bookings", key: "bookings" },
    { label: "Categories", key: "categories" },
    { label: "Reviews", key: "reviews" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg transition-colors duration-300 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Admin Dashboard
      </h2>

      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`
              cursor-pointer rounded-lg p-3 font-medium
              transition-colors duration-200
              text-gray-700 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-gray-800
              ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : ""
              }
            `}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
