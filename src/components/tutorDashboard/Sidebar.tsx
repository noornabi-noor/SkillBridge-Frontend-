// interface SidebarProps {
//   activeTab: "overview" | "profile" | "availability" | "bookings" | "reviews";
//   setActiveTab: (tab: "overview" | "profile" | "availability" | "bookings" | "reviews") => void;
// }

// export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
//   return (
//     <aside className="w-64 bg-white shadow p-4">
//       <h2 className="text-xl font-bold mb-4">Tutor Dashboard</h2>

//       <ul className="space-y-2">
//         <li
//           className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${
//             activeTab === "overview" ? "bg-gray-200" : ""
//           }`}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </li>
//         <li
//           className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${
//             activeTab === "profile" ? "bg-gray-200" : ""
//           }`}
//           onClick={() => setActiveTab("profile")}
//         >
//           My Profile
//         </li>
//         <li
//           className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${
//             activeTab === "availability" ? "bg-gray-200" : ""
//           }`}
//           onClick={() => setActiveTab("availability")}
//         >
//           Availability
//         </li>
//         <li
//           className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${
//             activeTab === "bookings" ? "bg-gray-200" : ""
//           }`}
//           onClick={() => setActiveTab("bookings")}
//         >
//           Bookings
//         </li>
//         <li
//           className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${
//             activeTab === "reviews" ? "bg-gray-200" : ""
//           }`}
//           onClick={() => setActiveTab("reviews")}
//         >
//           Reviews
//         </li>
//       </ul>
//     </aside>
//   );
// }



interface SidebarProps {
  activeTab: "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming";
  setActiveTab: (tab: "overview" | "profile" | "availability" | "bookings" | "reviews" | "upcoming") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-4">Tutor Dashboard</h2>

      <ul className="space-y-2">
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "overview" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </li>
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "profile" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </li>
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "availability" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("availability")}
        >
          Availability
        </li>
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "bookings" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </li>
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "reviews" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </li>
        <li
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer ${activeTab === "upcoming" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Sessions
        </li>
      </ul>
    </aside>
  );
}
