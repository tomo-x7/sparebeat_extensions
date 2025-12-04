import { resolve } from "node:path";

const hereDir = import.meta.dirname;
export const ROOT_DIR = resolve(hereDir, "../");
export const EXTENSIONS_DIR = resolve(ROOT_DIR, "extension");

export const ACTIONS_DIR = resolve(EXTENSIONS_DIR, "actions");
export const CONTENTS_DIR = resolve(EXTENSIONS_DIR, "contents");
export const BACKGROUNDS_DIR = resolve(EXTENSIONS_DIR, "backgrounds");

export const CHROME_OUT_DIR = resolve(ROOT_DIR, "dist-chrome");
export const FIREFOX_OUT_DIR = resolve(ROOT_DIR, "dist-firefox");

export const actionsOutDir = (base: string) => resolve(base, "actions");
