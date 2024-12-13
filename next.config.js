/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ]
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '10mb' 
      }
    }
  }
  
  module.exports = nextConfig