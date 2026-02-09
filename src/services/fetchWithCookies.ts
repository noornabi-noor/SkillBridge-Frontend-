"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function fetchWithCookies(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const headers = { ...options.headers, Cookie: cookieHeader, Origin: APP_URL };

  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  return res;
}
