/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  
  // Turbopack configuration
  turbopack: {
    // Explicitly set the workspace root to silence multiple lockfiles warning
    root: process.cwd(),
  },
};

export default nextConfig;
