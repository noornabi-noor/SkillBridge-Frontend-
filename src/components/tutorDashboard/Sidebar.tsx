// components/tutorDashboard/Sidebar.tsx
"use client";

interface SidebarProps {
  activeTab: "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming";
  setActiveTab: (tab: "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { label: "Overview", key: "overview" },
    { label: "My Profile", key: "profile" },
    { label: "Availability", key: "availability" },
    { label: "Bookings", key: "bookings" },
    { label: "Reviews", key: "reviews" },
    { label: "Upcoming Sessions", key: "upcoming" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg transition-colors duration-300 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Tutor Dashboard
      </h2>

      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={`
              cursor-pointer rounded-lg p-3 font-medium text-gray-700 dark:text-gray-300
              transition-colors duration-200
              hover:bg-gray-200 dark:hover:bg-gray-800
              ${activeTab === tab.key ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white" : ""}
            `}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
