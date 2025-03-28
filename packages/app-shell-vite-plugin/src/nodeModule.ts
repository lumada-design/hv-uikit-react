import { createRequire } from "node:module";
import { join } from "node:path";
import { findUpSync } from "find-up-simple";

export const require = createRequire(import.meta.url);

/**
 * Resolves the module entrypoint by name and normalizes slashes to be posix/unix-like forward slashes.
 *
 * @param moduleName The name of the module to be searched for
 * @returns The module path normalized
 */
export function resolveModule(moduleName: string) {
  return require.resolve(moduleName).replace(/\\+/g, "/");
}

/** Resolves the module directory (where `package.json` is) by `moduleName` */
function resolveModuleDirectory(moduleName: string) {
  const moduleEntrypoint = resolveModule(moduleName);
  const modulePackage = findUpSync("package.json", { cwd: moduleEntrypoint });
  return modulePackage?.slice(0, modulePackage.lastIndexOf("/")) || "";
}

/**
 * This function will find out the module path using node `require.resolve` function
 * and add the suffix param after the folder with module name.
 *
 * @param moduleName "@module/name"
 * @param suffix to be added after the module path
 * @returns the /path/to/@module/name/<suffix>
 */
export function getModulePath(moduleName: string, suffix: string) {
  return join(resolveModuleDirectory(moduleName), suffix);
}
