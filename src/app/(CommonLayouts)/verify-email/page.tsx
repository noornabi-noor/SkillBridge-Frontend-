"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/services/auth/auth-client";
import LoadingPage from "@/app/loading";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      authClient.verifyEmail({ query: { token } })
        .then(() => {
          setStatus("success");
          // Delay redirect so user sees the message first
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000); // wait 3 seconds before redirect
        })
        .catch(() => {
          setStatus("error");
          setTimeout(() => {
            router.push("/login?error=verification_failed");
          }, 3000);
        });
    }
  }, [router]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "success") {
    return (
      <p className="text-green-600 text-center">
        ✅ Your email has been verified successfully! Redirecting to dashboard...
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-red-600 text-center">
        ❌ Verification failed. Redirecting to login...
      </p>
    );
  }

  return null;
}