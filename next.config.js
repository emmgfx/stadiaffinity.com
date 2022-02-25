module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "nddyfchsgrewkdbjnwcz.supabase.in",
      "googleusercontent.com",
    ],
  },
  webpack(config) {
    // Add SVGR:
    // https://react-svgr.com/docs/next/
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
