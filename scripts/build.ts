import { globSync } from "node:fs";
import { type BuildOptions, context } from "esbuild";
import { build, type InlineConfig } from "vite";
import { ACTIONS_DIR, actionsOutDir, CHROME_OUT_DIR } from "./const.js";

const actionHTML = Object.fromEntries(
	globSync(`${ACTIONS_DIR}/*.html`).map((file) => {
		const name=file.split("/").at(-1).split(".")[0];
		return [name, file];
	}),
);
console.log(actionHTML);
const esBuildBase = {} satisfies BuildOptions;


const viteBase = {
	appType: "mpa",root:ACTIONS_DIR,
	build: { rollupOptions: { input: actionHTML },outDir:actionsOutDir(CHROME_OUT_DIR) },
} satisfies InlineConfig;

build(viteBase)

export function buildChrome() {
	context(esBuildBase);
}

export function buildFirefox() {}
