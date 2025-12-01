import type React from "react";
import type { ReactElement } from "react";
export const style: {
	[key: string]: React.CSSProperties;
} = {
	twitter_wrapper: {
		display: "flex",
		justifyContent: "center",
		width: "1222px",
		height: "640px",
		backgroundColor: "#000",
	},

	ResultScreen_before: {
		display: "flex",
		width: "100%",
		height: "100%",
		position: "absolute",
		top: "0",
		left: "0",
		backgroundColor: "#00000080",
	},

	ResultScreen_container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},

	Track: {
		width: "100%",
		position: "absolute",
		top: "40px",
		left: "40px",
		display: "flex",
		flexDirection: "column",
	},

	Track_title: {
		display: "flex",
		marginBottom: "4px",
		color: "#fff",
		height: "40px",
		lineHeight: "40px",
		fontSize: "40px",
		fontWeight: "700",
	},

	Track_artist: {
		display: "flex",
		color: "#fff",
		height: "20px",
		lineHeight: "20px",
		fontSize: "20px",
	},
	easy: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#1abc9c",
	},
	noraml: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#f1c40f",
	},
	hard: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#c0392b",
	},
	Track_layout: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#6c757d",
	},

	Track_bind: {
		display: "flex",
		margin: "16px 16px 0 0",
		padding: "0 8px",
		color: "#fff",
		fontSize: "20px",
		backgroundColor: "#6c757d",
	},

	Score: {
		position: "absolute",
		top: "0",
		right: "0",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},

	Score_label: {
		display: "flex",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
	},

	Score_value: {
		display: "flex",
		margin: "10px 0",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "80px",
		height: "80px",
		lineHeight: "80px",
		fontWeight: "700",
	},

	Score_diff: {
		display: "flex",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
	},

	Rank: {
		position: "absolute",
		bottom: "40px",
		left: 0,
		width: "960px",
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignContent: "center",
		flexWrap: "wrap",
		flexFlow: "column wrap",
	},

	Rank_label: {
		width: "960px",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "35px",
		height: "35px",
		lineHeight: "35px",
		fontWeight: "700",
		display: "flex",
		justifyContent: "center",
	},

	Rank_value: {
		display: "flex",
		marginTop: "10px",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "80px",
		height: "80px",
		lineHeight: "80px",
		fontWeight: "700",
		justifyContent: "center",
		textAlign: "center",
	},

	Detail: {
		position: "absolute",
		bottom: "40px",
		left: "40px",
		display: "flex",
		flexDirection: "column",
	},

	Detail_table: {
		display: "flex",
		flexDirection: "column",
		color: "#fff",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "32px",
		fontWeight: "700",
		lineHeight: "42px",
	},

	Detail_table_row: {
		display: "flex",
		justifyContent: "space-between",
	},

	Detail_table_row_label: {
		display: "flex",
		paddingRight: "1rem",
	},
	Detail_table_row_value: {
		display: "flex",
	},

	Average: {
		display: "flex",
		position: "relative",
		margin: "1rem 0",
		width: "200px",
		height: "96px",
	},

	Average_before: {
		display: "flex",
		position: "absolute",
		top: "0",
		left: "0",
		width: "20px",
		height: "100%",
		background: "linear-gradient(#ceceff, white, #ffcece)",
	},

	Average_inner: {
		display: "flex",

		position: "absolute",
		top: "50%",
		left: "0",
		width: "8px",
		height: "16px",
		transform: "translateY(-50%)",
	},

	Average_after: {
		display: "flex",

		position: "absolute",
		top: "50%",
		left: "0",
		width: "20px",
		height: "2px",
		backgroundColor: "#00000080",
		transform: "translateY(-50%)",
	},

	Publish: {
		position: "absolute",
		top: "40px",
		right: "40px",
		width: "240px",
		height: "96px",
		color: "#000",
		fontSize: "22px",
		lineHeight: "96px",
		fontWeight: "700",
		textAlign: "center",
		background: "#fff",
		borderRadius: "12px",
		opacity: ".8",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	Escape: {
		position: "absolute",
		bottom: "40px",
		right: "40px",
		width: "240px",
		height: "96px",
		color: "#000",
		fontFamily: "Nova Mono, sans-serif",
		fontSize: "40px",
		lineHeight: "96px",
		fontWeight: "700",
		textAlign: "center",
		background: "#fff",
		borderRadius: "12px",
		opacity: ".8",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	credit: {
		position: "absolute",
		bottom: "0px",
		right: "0px",
		color: "#ffffff",
	},
};
export const elem = (
	Option: ReactElement,
	{
		title = "music name",
		artist = "artist name",
		score = 0,
		diff = 0,
		rank = "Z",
		just = 0,
		rush = 0,
		cool = 0,
		miss = 0,
		average = 0,
		chain = 0,
		attack = 0,
		backcolor1 = "1f96e7cc",
		backcolor2 = "486ae7cc",
		src = "copy",
	}: {
		diff: "none" | number;
		average: number;
		[key: string]: string | number | undefined;
	},
) => {
	const Average_value: React.CSSProperties = {
		display: "flex",
		bottom: `${average + 50}%`,
		position: "absolute",
		left: "20px",
		paddingLeft: "16px",
		width: "auto",
		height: "24px",
		color: "#fff",
		fontFamily: "NovaMono, sans-serif",
		fontSize: "24px",
		lineHeight: "24px",
		transform: "translateY(50%)",
	};
	const ResultScreen: React.CSSProperties = {
		display: "flex",
		backgroundImage: `linear-gradient(#${backcolor1}, #${backcolor2}), url('https://beta.sparebeat.com/assets/images/polygon.png')`,
		position: "relative",
		width: "960px",
		height: "640px",
		zIndex: "2",
		overflow: "hidden",
		backgroundColor: "#414141",
		fontFamily: "Nova Mono, sans-serif",
	};

	let diffelem: React.ReactElement;
	if (diff === "none") {
		diffelem = <div style={style.Score_diff}> </div>;
	} else {
		const diffs: string = (diff < 0 ? "-" : "+") + Math.abs(diff).toString().padStart(6, "0");
		diffelem = <div style={style.Score_diff}>[ {diffs} ]</div>;
	}

	const main = (
		// biome-ignore lint/correctness/useUniqueElementIds: for style
		<div id="rerere" style={ResultScreen}>
			<div style={style.ResultScreen_before} />
			<div style={style.ResultScreen_container}>
				<div style={style.Track}>
					<div style={style.Track_title}>{title}</div>
					<div style={style.Track_artist}>{artist}</div>
					<div style={{ display: "flex" }}>{Option}</div>
				</div>
				<div style={style.Score}>
					<div style={style.Score_label}>Score</div>
					<div style={style.Score_value}>{score}</div>
					{diffelem}
				</div>
				<div style={style.Rank}>
					<div style={style.Rank_label}>Rank</div>
					<div style={style.Rank_value}>{rank}</div>
				</div>
				<div style={style.Detail}>
					<div style={style.Detail_table}>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>JUST:</div>
							<div style={style.Detail_table_row_value}>{just}</div>
						</div>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>RUSH:</div>
							<div style={style.Detail_table_row_value}>{rush}</div>
						</div>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>COOL:</div>
							<div style={style.Detail_table_row_value}>{cool}</div>
						</div>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>MISS:</div>
							<div style={style.Detail_table_row_value}>{miss}</div>
						</div>
					</div>
					<div style={style.Average}>
						<div style={style.Average_before} />
						<div style={Average_value}>
							<svg style={style.Average_inner} width="8" height="16" xmlns="http://www.w3.org/2000/svg">
								<path d="m8,0l-8,8l8,8" fill="#FF0000" />
							</svg>
							<div style={{ display: "flex" }}>
								{(average === 0 ? "±" : average < 0 ? "" : "+") + average.toFixed(3)}ms
							</div>
						</div>
						<div style={style.Average_after} />
					</div>
					<div style={style.Detail_table}>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>CHAIN:</div>
							<div style={style.Detail_table_row_value}>{chain}</div>
						</div>
						<div style={style.Detail_table_row}>
							<div style={style.Detail_table_row_label}>ATTACK:</div>
							<div style={style.Detail_table_row_value}>{attack}%</div>
						</div>
					</div>
				</div>
				<div style={style.Publish}>タイムラインに投稿</div>
				<div style={style.Escape}>Escape</div>
			</div>
			<div style={style.credit}>made by sparebeat_extensions</div>
		</div>
	);
	if (src === "twitter" || src === "line" || src === "facebook" || src === "bluesky") {
		return <div style={style.twitter_wrapper}>{main}</div>;
	}
	return main;
};
