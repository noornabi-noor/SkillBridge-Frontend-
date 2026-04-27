import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use relative path on client to use Next.js proxy, full URL on server
  baseURL: typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_API_URL!,
});

export async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  image?: string;
}) {
  const response = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
    image: data.image,
    // @ts-ignore - Assuming these custom fields are handled by your backend schema
    phone: data.phone,
    role: data.role,
  });

  if (response.error) {
    console.error("Better-Auth Error:", response.error);
    throw new Error(response.error.message || "Registration failed");
  }

  return response.data;
}




// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL!,
//   fetchOptions: {
//     credentials: "include",
//   },
// });
