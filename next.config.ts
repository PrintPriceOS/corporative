import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
