"use server";
import { cookies } from "next/headers";

export async function fetchWithCookies(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const headers = { ...options.headers, Cookie: cookieHeader, Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" };

  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  return res;
}
