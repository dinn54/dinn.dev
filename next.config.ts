import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["dinn-lexical"],

	images: {
		remotePatterns:[{
        protocol: 'https',
        hostname: 'mowzqxruruhcvjgpzzdb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/dinn_dev/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }]

	}
};

export default nextConfig;
