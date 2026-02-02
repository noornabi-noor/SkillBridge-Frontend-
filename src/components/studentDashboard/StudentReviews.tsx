"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  tutorId: string;
  tutor?: {
    id: string;
    user?: {
      name: string;
    };
  };
  studentId: string;
  booking?: {
    id: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface Booking {
  id: string;
  tutorId: string;
  tutor?: {
    id: string;
    user?: {
      name: string;
    };
  };
  studentId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

interface Props {
  studentId: string;
}

export default function StudentReviews({ studentId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [studentId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const reviewsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?studentId=${studentId}`,
        { credentials: "include" },
      );
      const reviewsData = await reviewsRes.json();
      setReviews(Array.isArray(reviewsData.data) ? reviewsData.data : []);

      const bookingsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        { credentials: "include" },
      );
      const bookingsData = await bookingsRes.json();
      const studentBookings: Booking[] = Array.isArray(bookingsData.data)
        ? bookingsData.data.filter((b: Booking) => b.studentId === studentId)
        : [];
      setBookings(studentBookings);
    } catch (err) {
      console.error(err);
      setReviews([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReview = async () => {
    if (!selectedBookingId && !editingReviewId) return alert("Please select a tutor/booking");

    try {
      const selectedBooking = bookings.find((b) => b.id === selectedBookingId);
      const url = editingReviewId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${editingReviewId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`;

      const method = editingReviewId ? "PATCH" : "POST";

      const body: any = editingReviewId
        ? { rating, comment }
        : {
            rating,
            comment,
            tutorId: selectedBooking?.tutorId,
            studentId,
            bookingId: selectedBooking?.id,
          };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");

      alert(editingReviewId ? "Review updated ✅" : "Review created ✅");

      setEditingReviewId(null);
      setSelectedBookingId(null);
      setRating(5);
      setComment("");

      fetchData();
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReviewId(review.id);
    setSelectedBookingId(review.booking?.id || null);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete review");

      alert("Review deleted ✅");
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert("Delete failed ❌: " + err.message);
    }
  };

  if (loading)
    return <p className="text-gray-500 dark:text-gray-300">Loading reviews...</p>;

  const completedBookings = bookings.filter(
    (b) =>
      b.status === "COMPLETED" &&
      !reviews.find((r) => r.booking?.id === b.id),
  );

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        My Reviews
      </h2>

      {/* Leave Review */}
      {completedBookings.length > 0 && !editingReviewId && (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded shadow transition-colors duration-300">
          <h3 className="font-semibold mb-2">Leave a Review</h3>
          <label className="block mb-1">Select Tutor</label>
          <select
            value={selectedBookingId || ""}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">-- Select Tutor --</option>
            {completedBookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.tutor?.user?.name || "Unknown Tutor"}
              </option>
            ))}
          </select>

          {selectedBookingId && (
            <>
              <label className="block mb-1">Rating (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                step={1} // ✅ Disallow fractions
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <label className="block mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <button
                onClick={handleSaveReview}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Submit Review
              </button>
            </>
          )}
        </div>
      )}

      {/* Edit Review */}
      {editingReviewId && (
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded shadow transition-colors duration-300">
          <h3 className="font-semibold mb-2">Edit Review</h3>
          <label className="block mb-1">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            step={1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <label className="block mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-2 py-1 w-full rounded mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveReview}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Update Review
            </button>
            <button
              onClick={() => {
                setEditingReviewId(null);
                setSelectedBookingId(null);
                setRating(5);
                setComment("");
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Reviews */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded shadow transition-colors duration-300">
        <h3 className="font-semibold mb-2">Previously Given Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="border p-3 rounded flex justify-between items-start dark:border-gray-600"
              >
                <div>
                  <p>
                    <strong>{r.tutor?.user?.name || "Unknown Tutor"}</strong> — Rating: {r.rating}
                  </p>
                  <p>{r.comment}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(r)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
