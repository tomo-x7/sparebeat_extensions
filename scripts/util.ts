import { exit } from "node:process";
import { isCancel } from "@clack/prompts";

export function checkCancel<T>(v: symbol | T): asserts v is T {
	if (isCancel(v)) exit(0);
}

export function minifyJson(json: string) {
	return JSON.stringify(JSON.parse(json));
}

export async function genSrcZip() {}
