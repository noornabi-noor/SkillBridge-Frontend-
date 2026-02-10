// services/auth/authClient.ts
import { authClient } from "./auth-client";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  image?: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  const text = await res.text();
  if (!text) {
    return { success: true };
  }
  return JSON.parse(text);
}

export async function loginWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    // callbackURL: "http://localhost:3000/dashboard", 
    callbackURL: `${APP_URL}/dashboard`, 
  });
}

export async function logout() {
  const res = await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}