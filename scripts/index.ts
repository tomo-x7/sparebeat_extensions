import { chdir, cwd, exit } from "node:process";
import { intro, select } from "@clack/prompts";
import { match } from "ts-pattern";
import { devChrome, prodChrome } from "./build.js";
import { ROOT_DIR } from "./const.js";
import { release } from "./release.js";
import { checkCancel, genSrcZip } from "./util.js";

const old_cwd = cwd();
chdir(ROOT_DIR);
process.addListener("exit", () => {
	chdir(old_cwd);
});

console.log(cwd());
intro("build and packaging utility");
const mode = await select({
	message: "",
	options: [
		{ value: "prod", label: "generate production package" },
		{ value: "dev", label: "generate for debug" },
		{ value: "src", label: "generate source code zip" },
		{ value: "release", label: "release and build all" },
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
	message: "select target",
	options: [{ value: "chrome" }, { value: "firefox" }],
});
checkCancel(target);

await match([mode, target])
	.with(["prod", "chrome"], () => prodChrome())
	.with(["dev", "chrome"], () => devChrome())
	.with(["prod", "firefox"], () => prodChrome())
	.with(["dev", "firefox"], () => devChrome())
	.exhaustive();
