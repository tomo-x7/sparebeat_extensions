import { intro, select } from "@clack/prompts";
import { checkCancel } from "./util.js";
import { exit } from "node:process";

// カレントディレクトリチェック
try {
	const {
		default: { name },
	} = await import("./package.json");
	if (name !== "sparebeat_extensions") throw new Error();
} catch {
	console.error("execute at project root.");
	exit(1);
}

intro("build and packaging utility");
const target = await select({
	message: "select target",
	options: [
		{ value: "chrome", label: "chrome" },
		{ value: "firefox", label: "firefox" },
		{ value: "both", label: "both chrome and firefox" },
	],
});
checkCancel(target);
