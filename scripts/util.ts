import { exit } from "node:process";
import { isCancel } from "@clack/prompts";

export function checkCancel(v: unknown) {
	if (isCancel(v)) exit(0);
}
