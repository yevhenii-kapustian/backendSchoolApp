import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://inpuimyesmbtdwtekejz.supabase.co/storage/v1/object/public/images/**')],
  },
};

export default nextConfig;
