import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  return res.json();
}

export async function loginWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000/", 
  });
}

export async function logout() {
  await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });
}
