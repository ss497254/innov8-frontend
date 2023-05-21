const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const csp = [
  "frame-ancestors 'none';",
  process.env.NEXT_PUBLIC_IS_PLATFORM === "true"
    ? "upgrade-insecure-requests;"
    : "",
]
  .filter(Boolean)
  .join(" ");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  transpilePackages: ["common"],
  async redirects() {
    return [
      {
        source: "/sign-up",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "/register",
        permanent: false,
      },
      {
        source: "/signin",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/sign-in",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/log-in",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*?)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "no-sniff",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/img/:slug*",
        headers: [{ key: "cache-control", value: "max-age=2592000" }],
      },
      {
        source: "/fonts/:slug*",
        headers: [{ key: "cache-control", value: "max-age=2592000" }],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
