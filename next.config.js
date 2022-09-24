/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'development' ? false : true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
