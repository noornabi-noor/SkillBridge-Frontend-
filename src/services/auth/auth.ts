// services/auth/auth.ts

"use server"; // MUST be first line
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();

  const cookieHeader = allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}