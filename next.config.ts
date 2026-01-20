/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for Docker optimization
  output: "standalone",
  serverExternalPackages: ['sharp'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
