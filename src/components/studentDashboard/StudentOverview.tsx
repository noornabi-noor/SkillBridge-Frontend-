"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  studentId: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

interface Props {
  studentId: string;
}

export default function StudentOverview({ studentId }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [studentId]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        { credentials: "include" },
      );
      const data = await res.json();

      const allBookings: Booking[] = Array.isArray(data.data)
        ? data.data
        : [];

      const studentBookings = allBookings.filter(
        (b) => b.studentId === studentId,
      );

      setBookings(studentBookings);
    } catch (err) {
      console.error(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading overview...</p>;

  const today = new Date();

  const totalSessions = bookings.length;
  const pendingSessions = bookings.filter(
    (b) => b.status === "PENDING",
  ).length;
  const completedSessions = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;
  const upcomingSessions = bookings.filter(
    (b) =>
      new Date(b.date) >= today &&
      b.status !== "CANCELLED",
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Upcoming */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Upcoming Bookings</p>
        <h2 className="text-2xl font-bold">{upcomingSessions}</h2>
      </div>

      {/* Total */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Total Sessions</p>
        <h2 className="text-2xl font-bold">{totalSessions}</h2>
      </div>

      {/* Pending */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Pending</p>
        <h2 className="text-2xl font-bold text-yellow-500">
          {pendingSessions}
        </h2>
      </div>

      {/* Completed */}
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Completed</p>
        <h2 className="text-2xl font-bold text-green-600">
          {completedSessions}
        </h2>
      </div>
    </div>
  );
}
