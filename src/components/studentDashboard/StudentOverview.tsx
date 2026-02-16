"use client";

import LoadingPage from "@/app/loading";
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
    return <LoadingPage />;
  }
  const today = new Date();

  const totalSessions = bookings.length;
  const pendingSessions = bookings.filter((b) => b.status === "PENDING").length;
  const completedSessions = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;
  const upcomingSessions = bookings.filter(
    (b) => new Date(b.date) >= today && b.status !== "CANCELLED",
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
        <h2 className={`${numberClasses} text-yellow-500`}>
          {pendingSessions}
        </h2>
      </div>

      <div className={cardClasses}>
        <p className={labelClasses}>Completed</p>
        <h2 className={`${numberClasses} text-green-600`}>
          {completedSessions}
        </h2>
      </div>
    </div>
  );
}
