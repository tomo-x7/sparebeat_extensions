import { resolve } from "node:path";

const hereDir = import.meta.dirname;
export const ROOT_DIR = resolve(hereDir, "../");
export const EXTENSIONS_DIR = resolve(ROOT_DIR, "extension");
export const SRC_DIR = resolve(EXTENSIONS_DIR, "src");

export const ACTIONS_DIR = resolve(SRC_DIR, "actions");
export const CONTENTS_DIR = resolve(SRC_DIR, "contents");
export const BACKGROUNDS_DIR = resolve(SRC_DIR, "backgrounds");
export const ASSETS_DIR = resolve(SRC_DIR, "assets");
export const COMMON_MANIFEST = resolve(SRC_DIR, "manifest.common.json");

export const TSCONFIG = resolve(EXTENSIONS_DIR, "tsconfig.json");

export const COM_OUT_DIR = resolve(ROOT_DIR, "dist-com");
export const CONTENTS_COM_OUT_DIR = resolve(COM_OUT_DIR, "contents");
export const BACKGROUNDS_COM_OUT_DIR = resolve(COM_OUT_DIR, "backgrounds");
export const ACTIONS_COM_OUT_DIR = resolve(COM_OUT_DIR, "actions");

const CHROME_OUT_DIR = resolve(ROOT_DIR, "dist-chrome");
const FIREFOX_OUT_DIR = resolve(ROOT_DIR, "dist-firefox");

export interface Target {
	ACTIONS_OUT: string;
	CONTENTS_OUT: string;
	BACKGROUNDS_OUT: string;
	ASSETS_OUT: string;
	OUT_ROOT: string;
	MANIFEST: string;
	NAME:string
};
export const CHROME = {
	ACTIONS_OUT: resolve(CHROME_OUT_DIR, "actions"),
	CONTENTS_OUT: resolve(CHROME_OUT_DIR, "contents"),
	BACKGROUNDS_OUT: resolve(CHROME_OUT_DIR, "backgrounds"),
	ASSETS_OUT: resolve(CHROME_OUT_DIR, "assets"),
	OUT_ROOT: CHROME_OUT_DIR,
	MANIFEST: resolve(SRC_DIR, "manifest.chrome.json"),
	NAME:"chrome"
} satisfies Target;
export const FIREFOX = {
	ACTIONS_OUT: resolve(FIREFOX_OUT_DIR, "actions"),
	CONTENTS_OUT: resolve(FIREFOX_OUT_DIR, "contents"),
	BACKGROUNDS_OUT: resolve(FIREFOX_OUT_DIR, "backgrounds"),
	ASSETS_OUT: resolve(FIREFOX_OUT_DIR, "assets"),
	OUT_ROOT: FIREFOX_OUT_DIR,
	MANIFEST: resolve(SRC_DIR, "manifest.firefox.json"),
	NAME:"firefox"
} satisfies Target;
