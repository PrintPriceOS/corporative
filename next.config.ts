import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  async redirects() {
    return [
      {
        source: '/developers/ai-agent',
        destination: '/ai-agent',
        permanent: true,
      },
      {
        source: '/developers/ai-agents',
        destination: '/ai-agent',
        permanent: true,
      },
      {
        source: '/ai-agents',
        destination: '/ai-agent',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
