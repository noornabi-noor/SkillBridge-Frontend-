"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

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
  const [open, setOpen] = useState(false);

  const tabs: {
    label: string;
    key: AdminTabKey | "home";
    href?: string;
    icon: React.ReactNode;
  }[] = [
    {
      label: "Home",
      key: "home",
      href: "/",
      icon: <HomeIcon className="h-3 w-3" />,
    },
    {
      label: "Overview",
      key: "overview",
      icon: <ChartBarIcon className="h-3 w-3" />,
    },
    {
      label: "Users",
      key: "users",
      icon: <UserCircleIcon className="h-3 w-3" />,
    },
    {
      label: "Bookings",
      key: "bookings",
      icon: <ClipboardDocumentListIcon className="h-3 w-3" />,
    },
    {
      label: "Categories",
      key: "categories",
      icon: <CalendarDaysIcon className="h-3 w-3" />,
    },
    {
      label: "Reviews",
      key: "reviews",
      icon: <ChatBubbleLeftRightIcon className="h-3 w-3" />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <UserCircleIcon className="h-3 w-3" />,
    },
  ];

  return (
    <aside
      className={`
    fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-950 shadow-lg z-50
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h2>

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
                else setActiveTab(tab.key as AdminTabKey);
                setOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
            ${
              isActive
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
