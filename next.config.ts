import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
  //   if (!backendUrl) {
  //     return [];
  //   }

  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${backendUrl}/api/auth/:path*`,
  //     },
  //     {
  //       source: "/api/:path*",
  //       destination: `${backendUrl}/api/:path*`,
  //     },
  //   ];
  // },

  async rewrites() {

       const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!backendUrl) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,

      },
    ];
  },
  
};

export default nextConfig;
