"use client";

import { useEffect, useState } from "react";

interface Tutor {
  id: string;
  name?: string;
  user?: {
    id: string;
    name?: string;
    image?: string | null;
  };
}

interface Booking {
  id: string;
  tutor?: Tutor;
  studentId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

interface Props {
  studentId: string;
}

export default function StudentBookings({ studentId }: Props) {
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

  // ✅ NEW: cancel booking
  const handleCancelBooking = async (bookingId: string) => {
    const ok = confirm("Are you sure you want to cancel this booking?");
    if (!ok) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "CANCELLED" }),
        },
      );

      if (!res.ok) throw new Error("Cancel failed");

      // Refresh bookings
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking ❌");
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <strong>
                  {b.tutor?.user?.name ||
                    b.tutor?.name ||
                    "Unknown Tutor"}
                </strong>
                <div className="text-gray-500 text-sm">
                  {new Date(b.date).toLocaleDateString()} at {b.startTime}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Status badge */}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    b.status === "PENDING"
                      ? "bg-yellow-500"
                      : b.status === "CONFIRMED"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {b.status}
                </span>

                {/* Cancel button (only if PENDING) */}
                {b.status === "PENDING" && (
                  <button
                    onClick={() => handleCancelBooking(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
