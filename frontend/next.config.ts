import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Allow all Cloudinary images
            },
            {
                protocol: "https",
                hostname: "assets.dub.co",
                pathname: "/**", // Allow all Cloudinary images
            },
        ],
    },
};

export default nextConfig;
