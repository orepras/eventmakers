/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-d1d0d678e97647bfac795be90ef4b1bd.r2.dev',
        pathname: '/devscale-batch8/**',
      },
    ],
  },
};

export default nextConfig;
