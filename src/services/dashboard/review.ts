// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStudentReviews(studentId: string) {
  const res = await fetch(`/api/reviews?studentId=${studentId}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch reviews");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

export async function createReview(payload: {
  tutorId: string;
  studentId: string;
  bookingId: string;
  rating: number;
  comment: string;
}) {
  const res = await fetch(`/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Create failed");

  return json;
}

export async function updateReview(
  reviewId: string,
  payload: { rating: number; comment: string }
) {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Update failed");

  return json;
}

export async function deleteReview(reviewId: string) {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Delete failed");

  return json;
}
