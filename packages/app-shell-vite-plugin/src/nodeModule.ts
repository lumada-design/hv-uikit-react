import { createRequire } from "node:module";
import { dirname, join } from "node:path";

export const require = createRequire(import.meta.url);

/**
 * Resolves the module entrypoint by name and normalizes slashes to be posix/unix-like forward slashes.
 *
 * @param moduleName The name of the module to be searched for
 * @param suffix to be added after the module path
 * @returns The module path normalized
 */
export function resolveModule(moduleName: string, suffix?: string) {
  const entrypoint = require.resolve(moduleName);
  return suffix ? join(dirname(entrypoint), suffix) : entrypoint;
}
