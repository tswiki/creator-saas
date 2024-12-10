
import type { NextConfig } from "next";
import type { WebpackConfigContext } from 'next/dist/server/config-shared'

const nextConfig: NextConfig = {
  webpack: (config: any, { buildId, dev, isServer, defaultLoaders, webpack }: WebpackConfigContext) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
  // Compiler options
  experimental: {
    // transpilePackages is no longer a valid experimental option
  }
}

export default nextConfig