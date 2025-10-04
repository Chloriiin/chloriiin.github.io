const repoName = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY?.trim() ?? '';
const basePath = repoName ? `/${repoName}` : '';
const assetPrefix = repoName ? `${basePath}/` : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath,
  assetPrefix,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
