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
};

const withMDX = createMDX({
  // options here
})

export default withMDX(nextConfig)
