"use client";

import { useEffect, useState } from "react";
import { getAllReviewsAdmin, deleteReviewAdmin } from "@/services/dashboard/admin";

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const allReviews = await getAllReviewsAdmin();
        setReviews(allReviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    try {
      await deleteReviewAdmin(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="space-y-2">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-center justify-between p-3 border rounded dark:border-gray-800">
          <div>
            <p><strong>Student:</strong> {review.student?.name}</p>
            <p><strong>Tutor:</strong> {review.tutor?.user?.name}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment || "-"}</p>
          </div>
          <button
            onClick={() => handleDelete(review.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
