#!/usr/bin/env node

const [, , filterPackage, phase = "DEVELOPMENT"] = process.argv;
const outputPackages = "code-editor,core,icons,lab,shared,styles,uno-preset,viz"
  .split(",")
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
