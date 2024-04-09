#!/usr/bin/env node
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const [, , filterPackage, phase = "DEVELOPMENT"] = process.argv;
const outputPackages = readdirSync(resolve(__dirname, "../../packages"))
  .filter((p) => p !== filterPackage)
  .map((p) => `/workdir/packages/${p}`)
  .join(",");

const args = `
--detect.npm.dependency.types.excluded=DEV
--detect.excluded.detector.types=LERNA
--detect.project.version.phase=${phase}
--detect.detector.search.continue=true
--detect.project.version.update=true
--detect.detector.search.depth=1
--detect.excluded.directories=${outputPackages}
`;

console.log(args.replace(/\n/g, " ").trim());
