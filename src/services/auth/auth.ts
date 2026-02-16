"use server";
import { cookies } from "next/headers";

import { authClient } from "./auth-client";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}/api/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader, 
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data;
}



// export async function loginWithGoogle() {
//   await authClient.signIn.social({
//     provider: "google",
//     // callbackURL: "http://localhost:3000/dashboard", 
//     callbackURL: `${APP_URL}/dashboard`, 
//   });
// }