// // session.ts
// export async function getSession() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
//     {
//       credentials: "include",
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) return null;
//   return res.json();
// }




// export async function getSession() {
//   const cookieStore = await cookies();
  
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
//     {
//       headers: {
//         "Cookie": cookieStore.toString(),
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) return null;
//   return res.json();
// }




"use server"; 

import { cookies } from "next/headers"; 
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(
      `${API_URL}/api/auth/session`,
      {
        headers: {
          "Cookie": cookieString,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Auth Session Error:", error);
    return null;
  }
}