import { createRequire } from "node:module";

export const require = createRequire(import.meta.url);

/**
 * Resolves the module name and normalizes slashes to be posix/unix-like forward slashes.
 *
 * @param moduleName The name of the module to be searched for
 * @returns The module path normalized
 */
export function resolveModule(moduleName: string) {
  const module = require.resolve(moduleName);
  return module.replace(/\\+/g, "/");
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
  const moduleNameWithSlashes = `/${moduleName}/`;
  const module = resolveModule(moduleName);
  const modulePosition = module.lastIndexOf(moduleNameWithSlashes);
  return `${module.slice(
    0,
    modulePosition + moduleNameWithSlashes.length,
  )}${suffix}`;
}
