/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'export',
  webpack(config, options) {
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/pdf",
            publicPath: "/_next/static/pdf",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
