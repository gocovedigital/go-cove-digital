/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const harborUrl = process.env.HARBOR_URL ?? 'https://harbor.cove-digital.workers.dev'
    return [
      {
        source: '/media/:path*',
        destination: `${harborUrl}/media/:path*`,
      },
    ]
  },
}
export default nextConfig
