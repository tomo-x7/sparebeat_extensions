import { chdir, cwd, exit } from "node:process";
import { intro, select } from "@clack/prompts";
import { match } from "ts-pattern";
import { buildPackage } from "./build.js";
import { CHROME, FIREFOX, ROOT_DIR } from "./const.js";
import { release } from "./release.js";
import { checkCancel, genSrcZip } from "./util.js";

const old_cwd = cwd();
chdir(ROOT_DIR);
process.addListener("exit", () => {
	chdir(old_cwd);
});

intro("Build & Packaging Utility");
const mode = await select({
	message: "Choose an action",
	options: [
		{ value: "build", label: "Build package" },
		{ value: "src", label: "Create source ZIP" },
		{ value: "release", label: "Release and build everything" },
	],
});
checkCancel(mode);
if (mode === "release") {
	await release();
	exit(0);
}
if (mode === "src") {
	await genSrcZip();
	exit(0);
}

const target = await select({
	message: "Choose target platform",
	options: [
		{ value: "chrome", label: "Chrome" },
		{ value: "firefox", label: "Firefox" },
	],
});
checkCancel(target);

await match([mode, target])
	.with(["build", "chrome"], () => buildPackage(CHROME))
	.with(["build", "firefox"], () => buildPackage(FIREFOX))
	.exhaustive();
