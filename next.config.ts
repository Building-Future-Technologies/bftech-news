/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rwatfetgcjlppsawzatz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  allowedDevOrigins: ['172.20.10.3'], // si ya lo tenías de antes
};

module.exports = nextConfig;