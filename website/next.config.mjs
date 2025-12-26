/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sparebeatter.vercel.app",
				port: "",
				pathname: "/api/img**",
			},
		],
	},
	headers: [
		{
			source: "/*path",
			headers: [
				{ key: "Access-Control-Allow-Origin", value: "*" },
				{ key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,POST,PUT,DELETE" },
				{ key: "Access-Control-Allow-Headers", value: "Content-Type" },
			],
		},
	],
};

export default nextConfig;
