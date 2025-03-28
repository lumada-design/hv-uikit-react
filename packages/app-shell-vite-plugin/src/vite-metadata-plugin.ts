import fs from "node:fs";
import type { PluginOption } from "vite";

import { resolveModule } from "./nodeModule.js";

const extractVersion = (packageJsonFile: string): string => {
  const packageJson = fs.readFileSync(packageJsonFile, "utf8");
  const packageObject = JSON.parse(packageJson);
  return packageObject.version;
};

/**
 * This plugin injects metadata into the index.html file.
 * The metadata is used to help any troubleshoot activity by referencing
 * the version of the app-shell-vite-plugin and app-shell-ui packages used by the app.
 */
const injectMetadata = (): PluginOption => {
  const appShellUIVersion = extractVersion(
    resolveModule("@hitachivantara/app-shell-ui/package.json"),
  );

  const appShellVitePluginVersion = extractVersion(
    resolveModule("@hitachivantara/app-shell-vite-plugin/package.json"),
  );

  return {
    name: "vite-metadata-plugin",
    transformIndexHtml() {
      return [
        {
          tag: "meta",
          attrs: {
            name: "app-shell-ui-version",
            content: appShellUIVersion,
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "app-shell-vite-plugin-version",
            content: appShellVitePluginVersion,
          },
        },
      ];
    },
  };
};

export default injectMetadata;
