/**
 * `uikit-tools validate <paths...>`: check code against the rules of the
 * installed UI Kit. Failures are reported by rule id with the rule's text.
 */
import { globSync } from "glob";

import { loadMetadata } from "../core/load.js";
import {
  formatViolations,
  getExitCode,
  validateFiles,
} from "../validation/validator.js";

export async function validate(
  patterns: string[],
  options: { json?: boolean } = {},
): Promise<void> {
  try {
    const files = patterns.flatMap((p) =>
      globSync(p, { cwd: process.cwd(), nodir: true }),
    );
    if (files.length === 0) {
      process.stderr.write(`No files matching ${patterns.join(", ")}\n`);
      process.exitCode = 1;
      return;
    }

    const { metadata } = loadMetadata();
    const violations = validateFiles(files, metadata);
    process.stdout.write(
      options.json
        ? `${JSON.stringify(violations, null, 2)}\n`
        : formatViolations(violations),
    );
    process.exitCode = getExitCode(violations);
  } catch (error) {
    process.stderr.write(`Validation error: ${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}
