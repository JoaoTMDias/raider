/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co", "lastfm.freetls.fastly.net"],
  },
};

module.exports = nextConfig;
