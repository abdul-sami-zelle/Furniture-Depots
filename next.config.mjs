/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fdapi.thefurnituredepots.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;