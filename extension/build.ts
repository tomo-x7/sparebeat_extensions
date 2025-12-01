import { build, context } from "esbuild";

build({});

const c = await context({});
c.watch();
