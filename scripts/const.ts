import { resolve } from "node:path";

const hereDir = import.meta.dirname;
export const ROOT_DIR = resolve(hereDir, "../");
export const EXTENSIONS_DIR = resolve(ROOT_DIR, "extension");
export const SRC_DIR = resolve(EXTENSIONS_DIR, "src");

export const ACTIONS_DIR = resolve(SRC_DIR, "actions");
export const CONTENTS_DIR = resolve(SRC_DIR, "contents");
export const BACKGROUNDS_DIR = resolve(SRC_DIR, "backgrounds");

export const CHROME_OUT_DIR = resolve(ROOT_DIR, "dist-chrome");
export const FIREFOX_OUT_DIR = resolve(ROOT_DIR, "dist-firefox");

type OutDirs = { ACTIONS: string; CONTENTS: string; BACKGROUND: string };
export const CHROME_OUT = {
	ACTIONS: resolve(CHROME_OUT_DIR, "actions"),
	CONTENTS: resolve(CHROME_OUT_DIR, "contents"),
	BACKGROUND: resolve(CHROME_OUT_DIR, "backgrounds"),
} satisfies OutDirs;
export const FIREFOX_OUT = {
	ACTIONS: resolve(FIREFOX_OUT_DIR, "actions"),
	CONTENTS: resolve(FIREFOX_OUT_DIR, "contents"),
	BACKGROUND: resolve(FIREFOX_OUT_DIR, "backgrounds"),
} satisfies OutDirs;
