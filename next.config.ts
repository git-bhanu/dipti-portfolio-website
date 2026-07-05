import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for Cloudflare Pages.
  output: 'export',
  images: {
    // The Cloudflare Pages static host has no Next image optimizer,
    // so images are served as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.tina.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  // NOTE: `rewrites()` is not supported with `output: 'export'`.
  // The TinaCMS admin is built to `public/admin/` and served directly
  // by Cloudflare Pages at `/admin` (directory index -> index.html).
};

export default nextConfig;
