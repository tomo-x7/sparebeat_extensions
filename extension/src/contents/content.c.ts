import { genRate } from "./rate";
import { scorecheck } from "./scorecheck";
import type { apires } from "./type";
import { polling } from "./util";

const gei = (id: string) => document.getElementById(id);
const gec = (classname: string, num = 0) =>
	document.getElementsByClassName(classname)[num]?.innerHTML?.replace(/\s/g, "");
const rgb2hex = (inputrgba: string | undefined) => {
	if (!inputrgba) return;
	const rgba = inputrgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
	return rgba && rgba.length === 5
		? `${`0${Number.parseInt(rgba[1], 10).toString(16)}`.slice(-2)}${`0${Number.parseInt(rgba[2], 10).toString(16)}`.slice(-2)}${`0${Number.parseInt(rgba[3], 10).toString(16)}`.slice(-2)}${`0${(255 * Number.parseFloat(rgba[4])).toString(16)}`.slice(-2)}`
		: "";
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.message) {
		case "screenshot": {
			const elem = gei("rerere");
			if (elem) {
				const tracktitle = document.getElementsByClassName("Track_title")[0].innerHTML;
				const trackartist = document.getElementsByClassName("Track_artist")[0].innerHTML;
				const difficulty = gec("Track_difficulty");
				const score = gec("Score_value");
				const rank = gec("Rank_value");
				const message = `Sparebeatの「${tracktitle}/${trackartist}」(${difficulty}) で${score}点(ランク${rank})を獲得しました！`;
				const options =
					(gec("Track_layout") ? `&${gec("Track_layout")}=` : "") +
					(gec("Track_bind") ? `&${gec("Track_bind")}=` : "");
				const baseURL = "https://sparebeatter.vercel.app/result";
				if (!elem) throw new Error();
				const bgi = elem.style.backgroundImage;
				const querys = `?title=${encodeURIComponent(tracktitle)}&artist=${encodeURIComponent(trackartist)}&difficult=${difficulty.toLowerCase()}${options.toLowerCase()}&score=${score}&diff=${gec("Score_diff") ?? "none".replace(/[[\]]/g, "")}&rank=${gec("Rank_value")}&just=${gec("Detail_table_row_value", 0)}&rush=${gec("Detail_table_row_value", 1)}&cool=${gec("Detail_table_row_value", 2)}&miss=${gec("Detail_table_row_value", 3)}&average=${gec("Average_value").replace(/ms/g, "")}&chain=${gec("Detail_table_row_value", 4)}&attack=${gec("Detail_table_row_value", 5).replace(/%/g, "")}&backcolor1=${rgb2hex(bgi.match(/rgba\((.*?)\)/g)?.[0])}&backcolor2=${rgb2hex(bgi.match(/rgba\((.*?)\)/g)?.[1])}&src=${request.src}`;
				const img: Blob | undefined = undefined;
				// if (request.src === "copyphoto") {
				// 	img = await (await GET(baseURL + querys)).blob();
				// }

				sendResponse({
					message: message,
					url: baseURL + querys,
					img,
				});
			} else {
				sendResponse({ message: "noresult" });
			}
			return true;
		}
		case "toppage":
			toppage().then(sendResponse);
			return true;
		case "creators":
			creators().then(sendResponse);
			return true;
		case "scorecheck":
			scorecheck().then((data) => sendResponse(data));
			return true;
		default:
			break;
	}
});
async function toppage() {
	try {
		await fetch("/api/tracks/home")
			.then((res) => res.json() as Promise<apires>)
			.then((data) => {
				polling(() => fullchain(data.tracks));
				genRate(data.tracks);
			});
		await fetch("/api/tracks/recently?page=1")
			.then((res) => res.json() as Promise<apires>)
			.then((data) => {
				polling(() => fullchain(data.tracks));
			});
	} catch {}
}
async function creators() {
	try {
		const page = new URLSearchParams(location.search).get("page") ?? "1";
		await fetch(`/api/tracks/recently?page=${page}`)
			.then((res) => res.json() as Promise<apires>)
			.then((data) => {
				polling(() => fullchain(data.tracks));
			});
	} catch {}
}
const sortDiff = (a: { difficulty: number }, b: { difficulty: number }) => b.difficulty - a.difficulty;
async function fullchain(data: apires["tracks"]) {
	for (const track of data) {
		if (track.playStatuses.sort(sortDiff)[0]?.isComplete) {
			const thistrackelem = document.getElementById(track.track.id);
			if (!thistrackelem) {
				throw new Error();
			}
			thistrackelem
				.getElementsByClassName("music-list-item-score")[0]
				.classList.add("sparebeat_extensions_fullchain");
		}
	}
}
