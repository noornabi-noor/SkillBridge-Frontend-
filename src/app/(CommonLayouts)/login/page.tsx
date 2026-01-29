"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { login } from "@/services/auth/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login({ email, password });
      router.push("/dashboard"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      {error && <p className="text-red-500">{error}</p>}

      <Button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
