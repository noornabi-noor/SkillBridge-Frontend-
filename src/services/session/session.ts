export async function getSession() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) return null;
  return res.json();
}
