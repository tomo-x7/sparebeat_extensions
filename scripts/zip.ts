import { join, relative } from "node:path";
import { chdir, cwd } from "node:process";
import { zip } from "zip-a-folder";
import { ROOT_DIR } from "./const.js";

const old_cwd = cwd();
chdir(ROOT_DIR);
process.addListener("exit", () => {
	chdir(old_cwd);
});

function p(...path: string[]) {
	return relative(ROOT_DIR, join(ROOT_DIR, ...path));
}

const srcs = [
	p("extension", "**"),
	p("scripts", "**"),
	p("readme.md"),
	p("package.json"),
	p("pnpm-*"),
	p("LICENSE"),
].join(", ");

zip(srcs, join(ROOT_DIR, "src.zip"));
