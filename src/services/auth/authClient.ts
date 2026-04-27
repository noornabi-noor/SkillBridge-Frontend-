// services/auth/authClient.ts
import { authClient } from "./auth-client";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function login(data: { email: string; password: string }) {
  const { data: session, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message || "Login failed");
  }

  return session;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  image?: string;
}) {
  console.log("Attempting registration for:", data.email);
  
  const result = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
    image: data.image,
    // @ts-ignore
    role: data.role,
    // @ts-ignore
    phone: data.phone, // Now enabled as backend schema is updated
  });

  if (result.error) {
    console.error("Full Registration Error:", JSON.stringify(result.error, null, 2));
    throw new Error(result.error.message || "Registration failed. Check console for details.");
  }

  return result.data;
}

export async function loginWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "https://skillbridge-frontend-liard.vercel.app/"
  });
}

export async function logout() {
  const res = await fetch(`/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
}