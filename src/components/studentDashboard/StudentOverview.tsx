// "use client";

// import { getAllBookings } from "@/services/dashboard/student";
// import { useEffect, useState } from "react";

// interface Booking {
//   id: string;
//   studentId: string;
//   date: string;
//   status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
// }

// interface Props {
//   studentId: string;
// }

// export default function StudentOverview({ studentId }: Props) {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookings();
//   }, [studentId]);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
//         credentials: "include",
//       });
//       const data = await res.json();

//       const allBookings: Booking[] = Array.isArray(data.data) ? data.data : [];
//       const studentBookings = allBookings.filter((b) => b.studentId === studentId);

//       setBookings(studentBookings);
//     } catch (err) {
//       console.error(err);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-gray-500 dark:text-gray-300">Loading overview...</p>
//     );

//   const today = new Date();

//   const totalSessions = bookings.length;
//   const pendingSessions = bookings.filter((b) => b.status === "PENDING").length;
//   const completedSessions = bookings.filter(
//     (b) => b.status === "COMPLETED",
//   ).length;
//   const upcomingSessions = bookings.filter(
//     (b) => new Date(b.date) >= today && b.status !== "CANCELLED",
//   ).length;

//   const cardClasses =
//     "p-4 rounded shadow transition-colors duration-300 bg-white dark:bg-gray-800";

//   const labelClasses = "text-sm text-gray-500 dark:text-gray-300";
//   const numberClasses = "text-2xl font-bold";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//       {/* Upcoming */}
//       <div className={cardClasses}>
//         <p className={labelClasses}>Upcoming Bookings</p>
//         <h2 className={numberClasses}>{upcomingSessions}</h2>
//       </div>

//       {/* Total */}
//       <div className={cardClasses}>
//         <p className={labelClasses}>Total Sessions</p>
//         <h2 className={numberClasses}>{totalSessions}</h2>
//       </div>

//       {/* Pending */}
//       <div className={cardClasses}>
//         <p className={labelClasses}>Pending</p>
//         <h2 className={`${numberClasses} text-yellow-500`}>
//           {pendingSessions}
//         </h2>
//       </div>

//       {/* Completed */}
//       <div className={cardClasses}>
//         <p className={labelClasses}>Completed</p>
//         <h2 className={`${numberClasses} text-green-600`}>
//           {completedSessions}
//         </h2>
//       </div>
//     </div>
//   );
// }


"use client";

import { Booking, getBookingsByStudent } from "@/services/dashboard/booking";
import { useEffect, useState } from "react";

interface Props {
  studentId: string;
}

export default function StudentOverview({ studentId }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const studentBookings = await getBookingsByStudent(studentId);
      setBookings(studentBookings);
      setLoading(false);
    };

    fetchBookings();
  }, [studentId]);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-300">Loading overview...</p>;
  }

  const today = new Date();

  const totalSessions = bookings.length;
  const pendingSessions = bookings.filter((b) => b.status === "PENDING").length;
  const completedSessions = bookings.filter((b) => b.status === "COMPLETED").length;
  const upcomingSessions = bookings.filter(
    (b) => new Date(b.date) >= today && b.status !== "CANCELLED"
  ).length;

  const cardClasses =
    "p-4 rounded shadow transition-colors duration-300 bg-white dark:bg-gray-800";
  const labelClasses = "text-sm text-gray-500 dark:text-gray-300";
  const numberClasses = "text-2xl font-bold";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className={cardClasses}>
        <p className={labelClasses}>Upcoming Bookings</p>
        <h2 className={numberClasses}>{upcomingSessions}</h2>
      </div>

      <div className={cardClasses}>
        <p className={labelClasses}>Total Sessions</p>
        <h2 className={numberClasses}>{totalSessions}</h2>
      </div>

      <div className={cardClasses}>
        <p className={labelClasses}>Pending</p>
        <h2 className={`${numberClasses} text-yellow-500`}>{pendingSessions}</h2>
      </div>

      <div className={cardClasses}>
        <p className={labelClasses}>Completed</p>
        <h2 className={`${numberClasses} text-green-600`}>{completedSessions}</h2>
      </div>
    </div>
  );
}