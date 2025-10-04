import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/chloriiin.github.io/' : '',
  basePath: isProd ? '/chloriiin.github.io' : '',
};

export default nextConfig;
