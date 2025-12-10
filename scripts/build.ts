import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { type BuildOptions, build } from "esbuild";
import { glob, globSync } from "glob";
import { build as vitebuild } from "vite";
import { ACTIONS_DIR, BACKGROUNDS_DIR, COMMON_MANIFEST, CONTENTS_DIR, ASSETS_DIR, type Target, TSCONFIG } from "./const.js";

const actionHTML = Object.fromEntries(
	globSync(resolve(ACTIONS_DIR, "*.html")).map((file) => {
		const name = file.split("/").at(-1).split(".")[0];
		return [name, file];
	}),
);

async function esbuild(target: Target) {
	const base = {
		bundle: true,
		minify: false,
		tsconfig: TSCONFIG,
	} satisfies BuildOptions;
	const contents = glob(resolve(CONTENTS_DIR, "*.c.{ts,tsx}")).then((files) =>
		build({ ...base, entryPoints: files, outdir: target.CONTENTS_OUT }),
	);
	const backgrounds = glob(resolve(BACKGROUNDS_DIR, "*.bg.ts")).then((files) =>
		build({ ...base, entryPoints: files, outdir: target.BACKGROUNDS_OUT }),
	);
	await Promise.all([contents, backgrounds]);
}
async function vite(outDir: string) {
	await vitebuild({
		appType: "mpa",
		root: ACTIONS_DIR,
		build: {
			rollupOptions: { input: actionHTML },
			target: [],
			outDir,
			emptyOutDir: true,
			modulePreload: false,
			minify: false,
			cssMinify: false,
		},
	});
}
// アセットとかmanifestとか
async function buildOthers(target: Target) {
	const assetsPromise = cp(ASSETS_DIR, target.ASSETS_OUT, { recursive: true });
	// manifest
	const comManifestP= readFile(COMMON_MANIFEST,"utf-8").then(JSON.parse)
	const manifestP= readFile(target.MANIFEST,"utf-8").then(JSON.parse)
	const manifest=Object.assign(...await Promise.all([comManifestP,manifestP]))
	manifest.version=""
	const manifestPromise=writeFile(resolve(target.OUT_ROOT,"manifest.json"),JSON.stringify(manifest,null,2))
	await Promise.all([manifestPromise, assetsPromise]);
}

export async function buildPackage(target: Target) {
	await mkdir(target.OUT_ROOT, { recursive: true });
	const vitePromise = vite(target.ACTIONS_OUT);
	const esbuildPromise = esbuild(target);
	const assetsPromise = buildOthers(target);
	await Promise.all([vitePromise, esbuildPromise, assetsPromise]);
}
