/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fdapi.thefurnituredepots.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devapi.myfurnituremecca.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ashleyfurniture.scene7.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.crescentcare.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
