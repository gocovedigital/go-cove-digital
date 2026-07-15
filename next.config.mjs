/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${process.env.HARBOR_URL}/media/:path*`,
      },
    ]
  },
}
export default nextConfig
