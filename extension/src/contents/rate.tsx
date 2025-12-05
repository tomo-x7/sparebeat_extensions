import { render } from "solid-js/web";
import { check } from "./contentScripts";
import type { apires } from "./type";

const keys: { 1: "levelEasy"; 2: "levelNormal"; 3: "levelHard" } = { 1: "levelEasy", 2: "levelNormal", 3: "levelHard" };
type rates = ({ rate: number; id: string; difficulty: 1 | 2 | 3; title: string } | { rate: number; id?: undefined })[];
const diffs = { 1: "【E】", 2: "【N】", 3: "【H】" };
export async function genRate(data: apires["tracks"]) {
	const rawRates: rates = data.flatMap<rates[0]>((v) =>
		v.playStatuses.map((status) => {
			const {
				difficulty,
				track: { id },
			} = status;
			const level = status.track[keys[status.difficulty]];
			if (status.bestScore > 950000) {
				return {
					rate: (status.bestScore - 950000) / 10000 + 2.5 + level,
					id,
					difficulty,
					title: status.track.title,
				};
			} else {
				return { rate: (status.bestScore - 900000) / 20000 + level, id, difficulty, title: status.track.title };
			}
		}),
	);
	while (rawRates.length < 20) {
		rawRates.push({ rate: 0 });
	}
	const rates = rawRates.toSorted((a, b) => b.rate - a.rate);
	check(() => setRate(rates));
}
function RateListElem({ v }: { v: rates[0] }) {
	if (!v.id) return;
	return (
		<>
			<div>
				<a href={`https://beta.sparebeat.com/play/${v.id}`}>{v.title + diffs[v.difficulty]}</a>
			</div>
			<div>{v.rate.toFixed(4)}</div>
		</>
	);
}
function RateList({ rates }: { rates: rates }) {
	const open = (ev: MouseEvent) => {
		ev.stopPropagation();
		document.body.classList.add("sparebeat_extensions_rate_view_open");
	};
	const close = (ev: MouseEvent) => {
		ev.stopPropagation();
		document.body.classList.remove("sparebeat_extensions_rate_view_open");
	};
	const subRate = rates
		.slice(0, 20)
		.filter((v) => v.id != null)
		.map((v) => <RateListElem v={v} />);
	const nextRate = rates
		.slice(20, 30)
		.filter((v) => v != null)
		.map((v) => <RateListElem v={v} />);
	return (
		<>
			<button type="button" on:click={open}>
				レート対象曲を表示
			</button>
			<div on:click={close} class="sparebeat_extensions_rate_view">
				<div on:click={(ev) => ev.stopPropagation()}>
					<h3>レート対象曲</h3>
					<div class="sparebeat_extensions_rate_list">{subRate}</div>
					<h3>レート候補曲</h3>
					<div class="sparebeat_extensions_rate_list">{nextRate}</div>
				</div>
			</div>
		</>
	);
}
function Rate({ rate }: { rate: number }) {
	const open = (ev: MouseEvent) => {
		ev.stopPropagation();
		document.body.classList.add("sparebeat_extensions_rate_view_open");
	};
	return (
		<div class="sparebeat_extensions_rate" on:click={open}>
			rate:{rate.toFixed(2)}
		</div>
	);
}
function setRate(rates: rates) {
	const header = document.getElementsByClassName("music-list-header")[0] as HTMLLIElement;
	if (rates[0].id == null) return;
	if (!header || document.getElementById(rates[0].id) == null) throw new Error();
	document.getElementsByClassName("sparebeat_extensions_rate")[0]?.remove();
	document.getElementsByClassName("sparebeat_extensions_rate_button")[0]?.remove();

	const rate = rates.slice(0, 20).reduce((a, b) => a + b.rate, 0) / 20;

	header.style.display = "flex";
	header.style.justifyContent = "space-between";
	render(() => <Rate rate={rate} />, header);

	const rateViewParent = document.createElement("div");
	rateViewParent.classList.add("sparebeat_extensions_rate_button");
	document.querySelector<HTMLDivElement>(".main>ul")!.after(rateViewParent);
	render(() => <RateList rates={rates} />, rateViewParent);
}
