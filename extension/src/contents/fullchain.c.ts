// fullchainとrate

import { genRate } from "./rate";
import { polling } from "./util";

type trackdata = {
	title: string;
	artist: string;
	url: string;
	bpm: number;
	levelEasy: number;
	levelNormal: number;
	levelHard: number;
	id: string;
};
type playstatus = {
	difficulty: 1 | 2 | 3;
	bestScore: number;
	isComplete: boolean;
	isPerfect: boolean;
	createdAt: string;
	updatedAt: string;
	track: trackdata;
};
export type track = {
	track: trackdata;
	playStatuses: playstatus[];
};

export type apires = { tracks: track[] };

const CHECKED = "sparebeat-extension-fcchecked";

function debounce(f: () => unknown, ms: number) {
	let to: number | undefined;
	return () => {
		if (to) clearTimeout(to);
		to = setTimeout(f, ms);
	};
}

const sortDiff = (a: { difficulty: number }, b: { difficulty: number }) => b.difficulty - a.difficulty;
async function fullchain(data: apires["tracks"]) {
	await polling(() => _fullchain(data));
}
async function _fullchain(data: apires["tracks"]) {
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

async function handleMove() {
	if (location.pathname === "/") {
		// トップページ
		// チェック済みの場合
		if (document.querySelector(`.${CHECKED}`) != null) return;
		// 未ロード
		if (document.querySelector(".music-list-item") == null) return;
		// ロード完了時はたぶんヘッダは存在するぽい
		const headers = Array.from(document.getElementsByClassName("music-list-header-title"));
		headers.find((el) => el.textContent === "Music List")?.classList.add(CHECKED);

		try {
			await fetch("/api/tracks/home")
				.then((res) => res.json() as Promise<apires>)
				.then((data) => {
					fullchain(data.tracks);
					genRate(data.tracks);
				});
			await fetch("/api/tracks/recently?page=1")
				.then((res) => res.json() as Promise<apires>)
				.then((data) => {
					fullchain(data.tracks);
				});
		} catch (e) {
			console.error(e);
			headers.find((el) => el.textContent === "Music List")?.classList.remove(CHECKED);
		}
	} else if (location.pathname === "/tracks") {
		// クリエイターページ
		// 曲リストがない場合スキップ
		const headers = Array.from(document.getElementsByClassName("music-list-header-title"));
		const TracksHeader = headers.find((el) => el.textContent === "Tracks");
		if (TracksHeader == null) return;
		// チェック済みの場合
		if (document.querySelector(`.${CHECKED}`) != null) return;
		TracksHeader.classList.add(CHECKED);

		try {
			const page = new URLSearchParams(location.search).get("page") ?? "1";
			await fetch(`/api/tracks/recently?page=${page}`)
				.then((res) => res.json() as Promise<apires>)
				.then((data) => {
					fullchain(data.tracks);
				});
		} catch (e) {
			console.error(e);
			TracksHeader.classList.remove(CHECKED);
		}
	}
}

const observer = new MutationObserver(debounce(handleMove, 500));
observer.observe(document.body, { childList: true, subtree: true });
handleMove();

/**
 * memo
 * Trendingは監視しないから監視対象は各ページ最大1つ
 */
