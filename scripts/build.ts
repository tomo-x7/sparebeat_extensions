import { resolve } from "node:path";
import { type BuildOptions, build as esbuild } from "esbuild";
import { globSync } from "glob";
import { InlineConfig,build as vitebuild } from "vite";
import { ACTIONS_DIR, CHROME_OUT, CHROME_OUT_DIR, CONTENTS_DIR } from "./const.js";
import { rmdirSync, rmSync } from "node:fs";

const actionHTML = Object.fromEntries(
	globSync(resolve(ACTIONS_DIR, "*.html")).map((file) => {
		const name = file.split("/").at(-1).split(".")[0];
		return [name, file];
	}),
);

const esBuildBase = {
	entryPoints:[resolve(CONTENTS_DIR,"editor","index.ts"),resolve(CONTENTS_DIR,"embed","index.ts")],bundle:true,
} satisfies BuildOptions;
const viteBase = (outDir:string)=>({
	appType: "mpa",
	root: ACTIONS_DIR,
	build: { rollupOptions: { input: actionHTML },outDir,emptyOutDir:true },
} satisfies InlineConfig);

export async function prodChrome() {
	rmSync(CHROME_OUT_DIR,{force:true,recursive:true})
	esbuild({ ...esBuildBase,outdir:CHROME_OUT_DIR });
	vitebuild({...viteBase(CHROME_OUT.ACTIONS),})
}

export async function prodFirefox() {}

export async function devChrome() {}
export async function devFirefox() {}
