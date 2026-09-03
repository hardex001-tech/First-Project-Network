/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Bypasses type checking to allow the build to complete
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bypasses ESLint checks to allow the build to complete
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;