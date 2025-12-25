import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { type BuildOptions, build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import { glob, globSync } from "glob";
import { build as vitebuild } from "vite";
import { zip } from "zip-a-folder";
import packageJson from "../package.json" with { type: "json" };
import {
	ACTIONS_COM_OUT_DIR,
	ACTIONS_DIR,
	ASSETS_DIR,
	BACKGROUNDS_COM_OUT_DIR,
	BACKGROUNDS_DIR,
	CHROME,
	COM_OUT_DIR,
	COMMON_MANIFEST,
	CONTENTS_COM_OUT_DIR,
	CONTENTS_DIR,
	FIREFOX,
	ROOT_DIR,
	type Target,
	TSCONFIG,
} from "./const.js";

const actionHTML = Object.fromEntries(
	globSync(resolve(ACTIONS_DIR, "*.html")).map((file) => {
		const name = file.split("/").at(-1).split(".")[0];
		return [name, file];
	}),
);

let commonBuildPromise: Promise<void> | undefined;
function buildCommon() {
	if (commonBuildPromise) return commonBuildPromise;
	commonBuildPromise = _buildCommon();
	return commonBuildPromise;
}
async function _buildCommon() {
	await mkdir(COM_OUT_DIR, { recursive: true });
	const vitePromise = vitebuild({
		appType: "mpa",
		root: ACTIONS_DIR,
		build: {
			rollupOptions: { input: actionHTML },
			outDir: ACTIONS_COM_OUT_DIR,
			emptyOutDir: true,
			modulePreload: false,
			minify: false,
			cssMinify: false,
		},
		base: "/actions/",
	});
	const esbuildBase = {
		bundle: true,
		minify: false,
		tsconfig: TSCONFIG,
	} satisfies BuildOptions;
	const contents = glob(resolve(CONTENTS_DIR, "*.c.{ts,tsx}")).then((files) =>
		build({
			...esbuildBase,
			entryPoints: files,
			outdir: CONTENTS_COM_OUT_DIR,
			plugins: [solidPlugin()],
		}),
	);
	const backgrounds = glob(resolve(BACKGROUNDS_DIR, "*.bg.ts")).then((files) =>
		build({ ...esbuildBase, entryPoints: files, outdir: BACKGROUNDS_COM_OUT_DIR }),
	);
	await Promise.all([vitePromise, contents, backgrounds]);
}
// アセットとかmanifestとか
async function buildOthers(target: Target) {
	const assetsPromise = cp(ASSETS_DIR, target.ASSETS_OUT, { recursive: true });
	// manifest
	const comManifestP = readFile(COMMON_MANIFEST, "utf-8").then(JSON.parse);
	const manifestP = readFile(target.MANIFEST, "utf-8").then(JSON.parse);
	const manifest = Object.assign(...(await Promise.all([comManifestP, manifestP])));
	manifest.version = packageJson.version;
	const manifestPromise = writeFile(resolve(target.OUT_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2));
	await Promise.all([manifestPromise, assetsPromise]);
}

async function buildPackage(target: Target) {
	await buildCommon();
	await mkdir(target.OUT_ROOT, { recursive: true });
	await cp(COM_OUT_DIR, target.OUT_ROOT, { recursive: true });
	await buildOthers(target);
	zip(target.OUT_ROOT, resolve(ROOT_DIR, `${target.NAME}-${packageJson.version.replaceAll(".", "_")}.zip`));
}

const doChrome = process.argv.includes("--chrome");
const doFirefox = process.argv.includes("--firefox");

if (!doChrome && !doFirefox) {
	console.log("No target specified. Use --chrome and/or --firefox.");
	process.exit(1);
}
// 非同期を並行処理、不具合が出たらawaitする🦆
if (doChrome) {
	buildPackage(CHROME);
}
if (doFirefox) {
	buildPackage(FIREFOX);
}
