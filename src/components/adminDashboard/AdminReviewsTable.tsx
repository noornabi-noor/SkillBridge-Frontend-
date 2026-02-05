"use client";

import { useEffect, useState } from "react";
import { getAllReviewsAdmin, deleteReviewAdmin } from "@/services/dashboard/admin";
import { toast } from "sonner";

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const allReviews = await getAllReviewsAdmin();
        setReviews(allReviews);
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load reviews");
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
      toast.success("Review deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete review");
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="space-y-2">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-center justify-between p-3 border rounded dark:border-gray-800">
          <div>
            <p><strong>Student:</strong> {review.student?.name ?? "N/A"}</p>
            <p><strong>Tutor:</strong> {review.tutor?.user?.name ?? "N/A"}</p>
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
