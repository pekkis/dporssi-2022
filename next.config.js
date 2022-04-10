/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },

  async redirects() {
    return [
      {
        source: "/valeuutiset",
        destination: "/valeuutiset/sivu/1",
        permanent: true,
      },
      {
        source: "/diktaattorit",
        destination: "/diktaattorit/sivu/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
