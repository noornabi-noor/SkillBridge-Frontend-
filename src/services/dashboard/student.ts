// services/dashboard/student.ts
"use server";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function getStudentBookings() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/bookings`, {
    headers: {
      Cookie: cookieHeader,
      // Origin: APP_URL,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch student bookings");
  }

  const json = await res.json();
  return Array.isArray(json.data) ? json.data : []; 
}