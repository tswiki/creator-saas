import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
const config: NextConfig = {
  compilerOptions: {
    moduleResolution: "node",
    esModuleInterop: true
  },
  include: ["src", "node_modules"]
};

module.exports = config;
