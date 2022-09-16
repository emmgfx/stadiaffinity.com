const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7, // In seconds, one week
    domains: ["via.placeholder.com", "nddyfchsgrewkdbjnwcz.supabase.in"],
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.stadiahoy.com" },
    ],
  },
  webpack(config) {
    // Add SVGR:
    // https://react-svgr.com/docs/next/

    // Check what's different with the files under the icons folder:
    // https://react-svgr.com/docs/options/#icon

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, "public/images/icons")],
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      exclude: [path.resolve(__dirname, "public/images/icons")],
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
