"use client";

import { useEffect, useMemo, useState } from "react";
import {
  updateBookingStatusAdmin,
  getAllBookingsAdmin,
} from "@/services/dashboard/admin";
import { toast } from "sonner";
import LoadingPage from "@/app/loading";

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

const statusColor = {
  PENDING:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function AdminBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | Booking["status"]>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookingsAdmin();
        setBookings(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load bookings");
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
    status: Booking["status"],
  ) => {
    try {
      setUpdatingId(bookingId);
      const updated = await updateBookingStatusAdmin(bookingId, status);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: updated.status } : b,
        ),
      );
      toast.success("Booking updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-4 border-b dark:border-gray-800">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Bookings
        </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-2 rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            text-gray-800 dark:text-gray-100"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* ================= MOBILE CARDS ONLY ================= */}
      <div className="block md:hidden lg:hidden divide-y dark:divide-gray-800">
        {filteredBookings.length === 0 && (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400">
            No bookings found
          </p>
        )}
        {filteredBookings.map((b) => (
          <div
            key={b.id}
            className="p-4 space-y-2 border-b last:border-none dark:border-gray-800"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {b.student?.name ?? "N/A"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {b.student?.email ?? "N/A"}
              </p>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tutor: {b.tutor?.user?.name ?? "N/A"}
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{new Date(b.date).toLocaleDateString()}</span>
              <span>
                {b.startTime} - {b.endTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${statusColor[b.status]}`}
              >
                {b.status}
              </span>
              <select
                value={b.status}
                disabled={updatingId === b.id}
                onChange={(e) =>
                  handleStatusChange(b.id, e.target.value as Booking["status"])
                }
                className="px-2 py-1 rounded border text-sm
                  bg-white dark:bg-gray-800
                  border-gray-300 dark:border-gray-700
                  text-gray-800 dark:text-gray-100"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE FOR TABLET & PC ONLY ================= */}
      <div className="hidden md:block overflow-x-auto">
        {filteredBookings.length === 0 ? (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400">
            No bookings found
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Tutor</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Time</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-b dark:border-gray-800">
                  <td className="p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {b.student?.name ?? "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {b.student?.email ?? "N/A"}
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {b.tutor?.user?.name ?? "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {b.tutor?.user?.email ?? "N/A"}
                    </p>
                  </td>
                  <td className="p-3 text-center text-gray-800 dark:text-gray-100">
                    {new Date(b.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center text-gray-800 dark:text-gray-100">
                    {b.startTime} - {b.endTime}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusColor[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) =>
                        handleStatusChange(
                          b.id,
                          e.target.value as Booking["status"],
                        )
                      }
                      className="px-2 py-1 rounded border
                        bg-white dark:bg-gray-800
                        border-gray-300 dark:border-gray-700
                        text-gray-800 dark:text-gray-100"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
