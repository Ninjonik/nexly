/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'appwrite.igportals.eu',
                port: '',
                pathname: '/v1/storage/buckets/messageAttachments/files/**',
            },
        ],
    },
}

module.exports = nextConfig
