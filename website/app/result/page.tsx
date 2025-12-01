import Image from "next/image";
export default function Home({ searchParams }: { searchParams: { [key: string]: string | number } }) {
	let querys = "";
	for (const key in searchParams) {
		if (key === "src") {
			querys += "src=page&";
		} else {
			querys += `${key}=${searchParams[key]}&`;
		}
	}
	return (
		<div style={{ maxWidth: "min(calc(100vh*1.2),960px)" }}>
			<p>
				<a href="https://beta.sparebeat.com" target="__blank" rel="noopener noreferrer">
					Sparebeat
				</a>
				の「{searchParams.title}/{searchParams.artist}」(
				{searchParams.difficult}) で{searchParams.score}点(ランク
				{searchParams.rank})を獲得しました！
			</p>
			<Image
				layout="responsive"
				sizes="(max-width:calc(100vh*1.2)) 960px, 640px"
				width={960}
				height={640}
				src={`https://sparebeatter.vercel.app/api/img?${querys}`}
				alt="result"
			/>
			<div>
				made by <a href="/">sparebeat_extensions</a>
				<br />
				ダウンロードは
				<a href="/" target="__blank" rel="noopener noreferrer">
					こちら
				</a>
				から
			</div>
		</div>
	);
}
export const dynamic = "force-dynamic";
export async function generateMetadata({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let querys = "";
	for (const key in searchParams) {
		querys += `${key}=${searchParams[key]}&`;
	}
	console.log(querys);
	return {
		metadataBase: new URL("https://sparebeatter.vercel.app/result"),
		title: "sparebeat_extensions",
		description: "sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
		openGraph: {
			title: "sparebeat_extensions",
			description:
				"sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
			siteName: "sparebeat_extensions",
			type: "website",
			images: { url: `https://sparebeatter.vercel.app/api/img?${querys}` },
		},
		icons: {
			icon: "/favicon.ico",
		},
		twitter: {
			card: "summary_large_image",
			title: "sparebeat_extensions",
			description:
				"sparebeatのリザルトをツイート、Map Editorのキーコンフィグの変更などの便利機能詰め合わせ拡張機能",
			site: "@tomo_x_79",
			images: [`https://sparebeatter.vercel.app/api/img?${querys}`],
		},
	};
}
