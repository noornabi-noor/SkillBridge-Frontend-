// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   async rewrites() {
//     return [
//       {
//         source: "/api/auth/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
//       },
//     ];
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    // Prevent invalid rewrite during build
    if (!backendUrl) {
      return [];
    }

    return [
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
