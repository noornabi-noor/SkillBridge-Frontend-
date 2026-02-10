"use client";
import { updateBookingStatus } from "@/services/dashboard/booking";
import { useState } from "react";

export default function Bookings({ stats }: { stats: any }) {
  const [bookings, setBookings] = useState(stats.bookings || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // const handleStatusChange = async (
  //   bookingId: string,
  //   status: "CONFIRMED" | "CANCELLED" | "COMPLETED",
  // ) => {
  //   try {
  //     setLoadingId(bookingId);

  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({ status }),
  //       },
  //     );

  //     if (!res.ok) throw new Error("Failed to update booking");

  //     // Update booking status locally
  //     setBookings((prev: any[]) =>
  //       prev.map((b) =>
  //         b.id === bookingId ? { ...b, status } : b,
  //       ),
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     alert("Action failed ❌");
  //   } finally {
  //     setLoadingId(null);
  //   }
  // };

  const handleStatusChange = async (
    bookingId: string,
    status: "CONFIRMED" | "CANCELLED" | "COMPLETED",
  ) => {
    try {
      setLoadingId(bookingId);

      await updateBookingStatus(bookingId, status);

      // update local state
      setBookings((prev: any[]) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b)),
      );
    } catch (err) {
      console.error(err);
      alert("Action failed ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b: any) => (
            <li key={b.id} className="p-3 rounded bg-gray-100 dark:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{b.student?.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(b.date).toLocaleDateString()} | {b.startTime}
                  </p>
                  <p className="text-sm mt-1">
                    Status: <b>{b.status}</b>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  {b.status === "PENDING" && (
                    <>
                      <button
                        disabled={loadingId === b.id}
                        onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                        className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                      >
                        Confirm
                      </button>

                      <button
                        disabled={loadingId === b.id}
                        onClick={() => handleStatusChange(b.id, "CANCELLED")}
                        className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {b.status === "CONFIRMED" && (
                    <button
                      disabled={loadingId === b.id}
                      onClick={() => handleStatusChange(b.id, "COMPLETED")}
                      className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
