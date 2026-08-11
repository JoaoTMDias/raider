/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
      },
      {
        protocol: 'https',
        hostname: 'lastfm-img.freetls.fastly.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
      },
    ],
  },
};

module.exports = nextConfig;
