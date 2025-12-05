import type { apires } from "./type";

type track = {
	title: string;
	id: string;
	level: [number, number, number];
	score: [null | number, null | number, null | number];
	isComplete: [boolean, boolean, boolean];
};

const parseTrack = ({
	track: { title, id, levelEasy, levelNormal, levelHard },
	playStatuses,
}: apires["tracks"][0]): track => {
	const track: track = {
		title,
		id,
		level: [levelEasy, levelNormal, levelHard],
		isComplete: [false, false, false],
		score: [null, null, null],
	};
	for (const { difficulty, isComplete, bestScore } of playStatuses) {
		track.isComplete[difficulty - 1] = isComplete;
		track.score[difficulty - 1] = bestScore;
	}
	return track;
};

export async function scorecheck() {
	try {
		const maindata: { name: string; displayname: string; home_data: track[]; recently_data: track[] } = {
			name: "",
			displayname: "",
			home_data: [],
			recently_data: [],
		};

		const accountdata = await fetch("/api/account").then((res) => res.ok && res.json());
		if (!accountdata) return window.alert("アカウントにログインしてからやってね");
		maindata.name = accountdata.user.name;
		maindata.displayname = accountdata.user.displayName;

		await fetch("/api/tracks/home").then(async (res) => {
			const data = (await res.json()) as apires;
			maindata.home_data = data.tracks.map(parseTrack);
		});

		let i = 1;
		while (true) {
			const res = await fetch(`/api/tracks/recently?page=${i}`);
			const rawdata = (await res.json()) as apires;
			if (rawdata.tracks.length === 0) break;
			const data = rawdata.tracks.map(parseTrack);
			maindata.recently_data.push(...data);
			i++;
		}
		return maindata;
	} catch (e) {
		console.error(e);
		window.alert("エラー");
	}
}
