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
    
    // Add CometChat externals
    config.externals = [
      ...(config.externals || []),
      "@cometchat-pro/chat",
      "@cometchat/chat-sdk-javascript"
    ];
    
    return config
  },
  // Compiler options
  experimental: {
    // transpilePackages is no longer a valid experimental option
  }
}

export default nextConfig