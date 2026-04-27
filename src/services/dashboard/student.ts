// services/dashboard/student.ts
"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function getStudentBookings() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_URL}/api/v1/bookings`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch student bookings status:", res.status);
      return [];
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : []; 
  } catch (error) {
    console.error("getStudentBookings error:", error);
    return [];
  }
}

export async function getSingleTutor(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/tutors/${id}`, {
      credentials: "include",
      cache: "no-store",
    });
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