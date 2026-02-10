// services/dashboard/tutor.ts

"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

// Tutor Profile with fallback
export async function getTutorProfile(tutorId: string, userProfile: any) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/tutors/by-user/${tutorId}`, {
    headers: {
      Cookie: cookieHeader,
      Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.warn("Tutor profile not found, using user profile fallback");
    // fallback to user profile
    return {
      name: userProfile.name,
      email: userProfile.email,
      bio: "",
      experience: "",
      rate: null,
      categories: [],
      id: tutorId,
    };
  }

  return (await res.json()).data;
}

export async function getTutorBookings(tutorProfileId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_URL}/api/bookings/tutor/${tutorProfileId}`, {
    headers: {
      Cookie: cookieHeader,
      Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load tutor bookings");

  return (await res.json()).data;
}


// Tutor Reviews (uses reviewRouter GET /)
export async function getTutorReviews(tutorId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/reviews`, {
    // fetch all reviews
    headers: {
      Cookie: cookieHeader,
      Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Reviews error:", res.status);
    throw new Error("Failed to load reviews");
  }

  const allReviews = (await res.json()).data;

  // Filter reviews by tutorId
  return allReviews.filter((r: any) => r.tutorId === tutorId);
}

export async function getTutorUpcomingBookings(tutorProfileId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_URL}/api/bookings/tutor/${tutorProfileId}/upcoming`, {
    headers: {
      Cookie: cookieHeader,
      Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load upcoming bookings");

  return (await res.json()).data;
}

export async function getTutorDashboardStats(userId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/tutors/dashboard/${userId}`, {
    headers: { 
      Cookie: cookieHeader, 
      Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load tutor dashboard stats");
  }

  const dashboard = (await res.json()).data;

  const user = dashboard.user;       
  const profile = dashboard.profile;

  // ✅ Use tutorProfile.id for fetching bookings/reviews
  const tutorProfileId = profile?.id;

  const [bookings, upcomingBookings, reviews] = tutorProfileId
    ? await Promise.all([
        getTutorBookings(tutorProfileId),
        getTutorUpcomingBookings(tutorProfileId),
        getTutorReviews(tutorProfileId),
      ])
    : [[], [], []];

  const totalBookings = bookings.length;
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : Number(
          reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
          totalReviews
        ).toFixed(1);

  return {
    user,
    profile,
    bookings,
    reviews,
    totalBookings,
    totalReviews,
    averageRating,
    upcomingSessions: upcomingBookings.length,
    upcomingSessionsList: upcomingBookings,
  };
}

export async function getTopRatedTutor() {
  const res = await fetch(`${API_URL}/api/tutors/top-tutor`, {
    cache: "no-store",
    credentials: "include",
  });

  if(!res.ok){
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return json.data;
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/api/categories`, {
    cache: "no-store",
    credentials: "include", // include cookies for auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.json();

  // Return only categories with at least one tutor
  return json.data.filter((c: any) => c.tutors && c.tutors.length > 0);
}

export type BecomeTutorPayload = {
  bio: string;
  experience: number;
  pricePerHour: number;
  categories: string[];
};

export async function becomeTutor(payload: BecomeTutorPayload) {
  const res = await fetch(`${API_URL}/api/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // send cookies
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to become tutor");
  }

  return data;
}

export async function getTutors() {
  const res = await fetch(`${API_URL}/api/tutors`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  const json = await res.json();

  return Array.isArray(json.data) ? json.data : [];
}

interface UpdateUserPayload {
  name: string;
  email: string;
  phone?: string;
  image?: string;
}

interface UpdateTutorPayload {
  bio?: string;
  experience?: number;
  pricePerHour?: number;
  categories?: string[];
}

export async function updateUserProfile(
  userId: string,
  payload: UpdateUserPayload,
) {
  const res = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to update user profile");
  }

  return res.json();
}

export async function upsertTutorProfile(
  payload: UpdateTutorPayload,
) {
  const res = await fetch(`${API_URL}/api/tutors`, {
    method: "PATCH", // backend already handles create/update
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error("Failed to update tutor profile");
  }

  return res.json();
}
