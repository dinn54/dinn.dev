import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	images: {
		remotePatterns:[{
        protocol: 'https',
        hostname: 'mowzqxruruhcvjgpzzdb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/dinn_dev/**',
        search: '',
      
		}]
	}
};

export default nextConfig;
