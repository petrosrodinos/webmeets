/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  // output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL,
  },
  compilerOptions: {
    baseUrl: 'src/app',
    paths: {
      '@/components/*': ['components/*'],
    },
  },
};

module.exports = nextConfig;
