// admin.ts

"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getAllUsersAdmin() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/users`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load users status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllUsersAdmin error:", error);
    return [];
  }
}

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "BANNED",
) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/users/${userId}/status`, {
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
  } catch (error: any) {
    console.error("updateUserStatus error:", error);
    throw error;
  }
}

export async function getAllBookingsAdmin() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/bookings`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load bookings status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllBookingsAdmin error:", error);
    return [];
  }
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

  const res = await fetch(`${API_URL}/api/v1/bookings/${bookingId}`, {
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
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/categories`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load categories status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllCategoriesAdmin error:", error);
    return [];
  }
}

export async function createCategoryAdmin(name: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/v1/categories`, {
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

  const res = await fetch(`${API_URL}/api/v1/categories/${categoryId}`, {
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

  const res = await fetch(`${API_URL}/api/v1/categories/${categoryId}`, {
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

  const res = await fetch(`${API_URL}/api/v1/reviews/admin`, {
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
    `${API_URL}/api/v1/reviews/admin/${reviewId}`,
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
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/admin/dashboard`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch dashboard stats status:", res.status);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAdminDashboardStats error:", error);
    return null;
  }
}

export async function getAllPaymentsAdmin() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/payments`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load payments status:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getAllPaymentsAdmin error:", error);
    return [];
  }
}