// import { createAuthClient } from "better-auth/client";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL!, 
// });



import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});




// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL!,
//   fetchOptions: {
//     credentials: "include",
//   },
// });
