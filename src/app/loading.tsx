"use client";

import { Spinner } from "@/components/ui/spinner";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Spinner className="w-16 h-16 animate-spin border-4 border-white border-t-transparent rounded-full" />
    </div>
  );
}
