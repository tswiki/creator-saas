/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import type { WebpackConfigContext } from 'next/dist/server/config-shared'

const nextConfig: NextConfig = {
  webpack: (config: any, { buildId, dev, isServer, defaultLoaders, webpack }: WebpackConfigContext) => {
    // Handle fallback configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    
    return config
  }
}

export default nextConfig