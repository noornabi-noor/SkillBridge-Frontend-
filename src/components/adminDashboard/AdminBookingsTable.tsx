"use client";

import { useMemo, useState } from "react";
import { updateBookingStatusAdmin } from "@/services/dashboard/admin";

type Booking = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  tutor: {
    user: {
      name: string;
      email: string;
    };
  };
  student: {
    name: string;
    email: string;
  };
};

export default function AdminBookingsTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState<"ALL" | Booking["status"]>("ALL");

  const filteredBookings = useMemo(() => {
    if (filter === "ALL") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const handleStatusChange = async (
    bookingId: string,
    status: Booking["status"],
  ) => {
    const updated = await updateBookingStatusAdmin(bookingId, status);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? updated : b)),
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
        <h2 className="font-semibold dark:text-white">
          All Bookings
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border px-3 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Tutor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b dark:border-gray-800"
              >
                <td className="p-3">
                  <p className="font-medium dark:text-white">
                    {b.student.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {b.student.email}
                  </p>
                </td>

                <td className="p-3">
                  <p className="font-medium dark:text-white">
                    {b.tutor.user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {b.tutor.user.email}
                  </p>
                </td>

                <td className="p-3 text-center">
                  {new Date(b.date).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  {b.startTime} - {b.endTime}
                </td>

                <td className="p-3 text-center">
                  {b.status}
                </td>

                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleStatusChange(
                        b.id,
                        e.target.value as Booking["status"],
                      )
                    }
                    className="border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
