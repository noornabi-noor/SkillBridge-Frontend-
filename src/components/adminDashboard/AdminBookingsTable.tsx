"use client";

import { useEffect, useMemo, useState } from "react";
import { updateBookingStatusAdmin, getAllBookingsAdmin } from "@/services/dashboard/admin";
import { toast } from "sonner";

type Booking = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  tutor?: {
    user?: {
      name?: string;
      email?: string;
    };
  };
  student?: {
    name?: string;
    email?: string;
  };
};

export default function AdminBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | Booking["status"]>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ✅ FETCH ON MOUNT
  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        const data = await getAllBookingsAdmin();
        setBookings(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (filter === "ALL") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const handleStatusChange = async (
    bookingId: string,
    status: Booking["status"]
  ) => {
    try {
      setUpdatingId(bookingId);
      const updated = await updateBookingStatusAdmin(bookingId, status);

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: updated.status } : b
        )
      );

      toast.success(`Booking updated to ${updated.status}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
        <h2 className="font-semibold dark:text-white">All Bookings</h2>

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
              <tr key={b.id} className="border-b dark:border-gray-800">
                <td className="p-3">
                  <p className="font-medium dark:text-white">
                    {b.student?.name ?? "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {b.student?.email ?? "N/A"}
                  </p>
                </td>

                <td className="p-3">
                  <p className="font-medium dark:text-white">
                    {b.tutor?.user?.name ?? "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {b.tutor?.user?.email ?? "N/A"}
                  </p>
                </td>

                <td className="p-3 text-center">
                  {new Date(b.date).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  {b.startTime} - {b.endTime}
                </td>

                <td className="p-3 text-center">{b.status}</td>

                <td className="p-3">
                  <select
                    value={b.status}
                    disabled={updatingId === b.id}
                    onChange={(e) =>
                      handleStatusChange(
                        b.id,
                        e.target.value as Booking["status"]
                      )
                    }
                    className="border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50"
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
                <td colSpan={6} className="p-6 text-center text-gray-500">
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
