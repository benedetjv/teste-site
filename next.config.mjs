import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/blog/text-neck-dor-pescoco-celular',
        destination: '/blog/text-neck-dor-cervical-celular-tratamento',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Revalidable, fresh HTML for the landing pages (Never serve stale cached HTML)
        source: '/(lp-campinas-convenios|ortopedista-campinas)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        // Versioned static JS/CSS chunks are immutable
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // options here
})

export default withMDX(nextConfig)
