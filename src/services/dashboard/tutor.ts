"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load upcoming bookings");

  return (await res.json()).data;
}

export async function getTutorAvailability(tutorProfileId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${API_URL}/api/availability/tutor/${tutorProfileId}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load tutor availability");
  }

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

  const [bookings, upcomingBookings, reviews, availability] = tutorProfileId
    ? await Promise.all([
        getTutorBookings(tutorProfileId),
        getTutorUpcomingBookings(tutorProfileId),
        getTutorReviews(tutorProfileId),
         getTutorAvailability(tutorProfileId),
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
    availability,
    totalBookings,
    totalReviews,
    averageRating,
    upcomingSessions: upcomingBookings.length,
    upcomingSessionsList: upcomingBookings,
  };
}