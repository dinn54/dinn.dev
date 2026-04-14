import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["dinn-lexical"],

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mowzqxruruhcvjgpzzdb.supabase.co",
				pathname: "/storage/v1/object/public/dinn_dev/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/dph9p8eyi/image/upload/**",
			},
		],
	},
};

export default nextConfig;
