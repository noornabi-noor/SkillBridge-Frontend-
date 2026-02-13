// admin.ts

"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getAllUsersAdmin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/users`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  return (await res.json()).data;
}

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "BANNED",
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to update user status");
  }

  return (await res.json()).data;
}

export async function getAllBookingsAdmin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/bookings`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load bookings");
  }

  return (await res.json()).data;
}

export async function updateBookingStatusAdmin(
  bookingId: string,
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED",
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to update booking status");
  }

  return (await res.json()).data;
}

export async function getAllCategoriesAdmin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/categories`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  return (await res.json()).data;
}

export async function createCategoryAdmin(name: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ name }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Create category error:", err);
    throw new Error(err.message || "Failed to create category");
  }

  return (await res.json()).data;
}

export async function deleteCategoryAdmin(categoryId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Delete category error:", err);
    throw new Error(err.message || "Failed to delete category");
  }

  return (await res.json()).data;
}

export async function updateCategoryAdmin(
  categoryId: string,
  data: { name?: string; tutorIds?: string[] }
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/categories/${categoryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Update category error:", err);
    throw new Error(err.message || "Failed to update category");
  }

  return (await res.json()).data;
}

export async function getAllReviewsAdmin() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_URL}/api/reviews/admin`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Get all reviews error:", err);
    throw new Error(err.message || "Failed to load reviews");
  }

  return (await res.json()).data;
}

export async function deleteReviewAdmin(reviewId: string) {

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");


  const res = await fetch(
    `${API_URL}/api/reviews/admin/${reviewId}`,
    {
      method: "DELETE", 
      headers: {
      Cookie: cookieHeader,
    },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    console.error("Delete review error:", err);
    throw new Error(err.message || "Failed to delete review");
  }

  return (await res.json()).data;
}

export async function getAdminDashboardStats() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/admin/dashboard`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch dashboard stats");
  }

  return (await res.json()).data;
}