/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true,
  },
  images: { 
    
    domains: [
      'k.kakaocdn.net',
      'res.cloudinary.com'
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    CLOUD_PRESET_NAME: process.env.CLOUD_PRESET_NAME
  }
}

module.exports = nextConfig
