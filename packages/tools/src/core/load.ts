import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { SUPPORTED_SCHEMA_VERSION, type AgentsMetadata } from "./types.js";

export const CORE_PACKAGE = "@pentaho/uikit-react-core";

export interface LoadedMetadata {
  metadata: AgentsMetadata;
  /** Directory of the installed core package. */
  packageDir: string;
  /** Absolute path of the guide shipped with that package. */
  guidePath: string;
}

/**
 * Locate `@pentaho/uikit-react-core` as installed for the project at `cwd`, the
 * same way the project's own imports resolve it. Never a path relative to this
 * file: the tools must describe the version the project uses.
 */
export function resolveCorePackageDir(cwd = process.cwd()): string {
  const require = createRequire(path.join(path.resolve(cwd), "noop.js"));
  try {
    return path.dirname(require.resolve(`${CORE_PACKAGE}/package.json`));
  } catch (error) {
    throw new Error(
      `${CORE_PACKAGE} is not installed for ${path.resolve(cwd)}. Install it, then run this again.`,
      { cause: error },
    );
  }
}

/** Keyed by package dir; reloaded when metadata.json changes (e.g. the UI Kit was upgraded). */
const cache = new Map<string, { mtimeMs: number; loaded: LoadedMetadata }>();

export function loadMetadata(cwd = process.cwd()): LoadedMetadata {
  const packageDir = resolveCorePackageDir(cwd);
  const file = path.join(packageDir, "dist", "agents", "metadata.json");
  const mtimeMs = existsSync(file) ? statSync(file).mtimeMs : -1;
  const cached = cache.get(packageDir);
  if (cached && cached.mtimeMs === mtimeMs) return cached.loaded;

  if (mtimeMs === -1) {
    const { version } = JSON.parse(
      readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    throw new Error(
      `${CORE_PACKAGE}@${version} does not ship agent metadata (${path.relative(cwd, file)} is missing). ` +
        "Upgrade the UI Kit, or build it with `npm run build -w packages/core` when working in the UI Kit repo.",
    );
  }

  const metadata = JSON.parse(readFileSync(file, "utf8")) as AgentsMetadata;
  if (metadata.schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
    throw new Error(
      `Agent metadata schemaVersion ${metadata.schemaVersion} is not supported by this version of @pentaho/uikit-tools (expects ${SUPPORTED_SCHEMA_VERSION}). Upgrade @pentaho/uikit-tools.`,
    );
  }

  const loaded = {
    metadata,
    packageDir,
    guidePath: path.join(packageDir, "dist", "agents", "guide.md"),
  };
  cache.set(packageDir, { mtimeMs, loaded });
  return loaded;
}
