"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;


export async function getSingleTutor(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/tutors/${id}`, {credentials: "include", cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch tutor with id: ${id}`, await res.text());
      return null; 
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getSingleTutor error:", error);
    return null;
  }
}

// Tutor Profile with fallback
export async function getTutorProfile(tutorId: string, userProfile: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/tutors/by-user/${tutorId}`, {
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
  } catch (error) {
    console.error("getTutorProfile error:", error);
    return null;
  }
}

export async function getTutorBookings(tutorProfileId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const res = await fetch(`${API_URL}/api/v1/bookings/tutor/${tutorProfileId}`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load tutor bookings status:", res.status);
      return [];
    }

    return (await res.json()).data;
  } catch (error) {
    console.error("getTutorBookings error:", error);
    return [];
  }
}


// Tutor Reviews (uses reviewRouter GET /)
export async function getTutorReviews(tutorId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/reviews`, {
      // fetch all reviews
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Reviews error:", res.status);
      return [];
    }

    const allReviews = (await res.json()).data;

    // Filter reviews by tutorId
    return Array.isArray(allReviews) ? allReviews.filter((r: any) => r.tutorId === tutorId) : [];
  } catch (error) {
    console.error("getTutorReviews error:", error);
    return [];
  }
}

export async function getTutorUpcomingBookings(tutorProfileId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const res = await fetch(`${API_URL}/api/v1/bookings/tutor/${tutorProfileId}/upcoming`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load upcoming bookings status:", res.status);
      return [];
    }

    return (await res.json()).data;
  } catch (error) {
    console.error("getTutorUpcomingBookings error:", error);
    return [];
  }
}

export async function getTutorAvailability(tutorProfileId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(
      `${API_URL}/api/v1/availability/tutor/${tutorProfileId}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to load tutor availability status:", res.status);
      return null;
    }

    return (await res.json()).data;
  } catch (error) {
    console.error("getTutorAvailability error:", error);
    return null;
  }
}

export async function getTutorDashboardStats(userId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/tutors/dashboard/${userId}`, {
      headers: { 
        Cookie: cookieHeader, 
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load tutor dashboard stats status:", res.status);
      return null;
    }

    const dashboard = (await res.json()).data;
    console.log("DEBUG: Tutor Dashboard Data", dashboard);
    return dashboard;
  } catch (error) {
    console.error("getTutorDashboardStats error:", error);
    return null;
  }
}