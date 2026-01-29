"use client";

import { register } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const form = e.target;

    await register({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    });

    router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Create account</button>
    </form>
  );
}
