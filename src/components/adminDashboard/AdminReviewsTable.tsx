"use client";

import { useEffect, useState } from "react";
import {
  getAllReviewsAdmin,
  deleteReviewAdmin,
} from "@/services/dashboard/admin";
import { toast } from "sonner";
import LoadingPage from "@/app/loading";

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

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
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Review deleted successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete review");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No reviews found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => {
        const isExpanded = expanded === review.id;

        return (
          <div
            key={review.id}
            className="flex flex-col justify-between
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Review
              </span>
              <span
                className="px-2 py-1 text-xs font-medium rounded-full
                bg-yellow-100 text-yellow-700
                dark:bg-yellow-900 dark:text-yellow-300"
              >
                ⭐ {review.rating}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Student:</span>{" "}
                {review.student?.name ?? "N/A"}
              </p>

              <p>
                <span className="font-medium">Tutor:</span>{" "}
                {review.tutor?.user?.name ?? "N/A"}
              </p>

              <p
                className={`${isExpanded ? "" : "line-clamp-3"} transition-all`}
              >
                <span className="font-medium">Comment:</span>{" "}
                {review.comment || "-"}
              </p>

              {review.comment && review.comment.length > 120 && (
                <button
                  onClick={() => setExpanded(isExpanded ? null : review.id)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDelete(review.id)}
                className="text-sm text-red-600 dark:text-red-400
                hover:underline hover:text-red-700 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
