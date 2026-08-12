import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // Allow public preview tunnels to load the Next.js dev client
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "eltechies.loca.lt",
    "eltechies-share.loca.lt",
  ],
};

export default nextConfig;
