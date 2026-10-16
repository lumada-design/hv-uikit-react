import { spawnSync } from "node:child_process";
import path from "node:path";

export const EVALS = path.resolve(import.meta.dirname, "..");
export const REPO = path.resolve(EVALS, "..");
export const TEMPLATE = path.join(EVALS, "template");
export const SCENARIOS = path.join(EVALS, "scenarios");
export const MOCKS = path.join(EVALS, "mocks");
export const CACHE = path.join(EVALS, ".cache");
export const TARBALLS = path.join(CACHE, "tarballs");
export const BASE = path.join(CACHE, "base");
/** Raw results of every run, one folder per run. Not committed. */
export const RESULTS = path.join(EVALS, "results");
/** Generated report. Committed. */
export const REPORTS = path.join(EVALS, "reports");

/** Run a command; returns stdout. Throws with its output when it fails, unless allowFail. */
export function sh(
  cmd: string,
  args: string[],
  opts: {
    cwd: string;
    quiet?: boolean;
    allowFail?: boolean;
    env?: NodeJS.ProcessEnv;
    input?: string;
    timeoutMs?: number;
  },
): string {
  const res = spawnSync(cmd, args, {
    cwd: opts.cwd,
    encoding: "utf8",
    env: opts.env ?? process.env,
    input: opts.input,
    timeout: opts.timeoutMs,
    maxBuffer: 256 * 1024 * 1024,
  });
  if (res.status !== 0 && !opts.allowFail) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed (${res.status ?? res.signal}) in ${opts.cwd}\n${res.stdout}\n${res.stderr}`,
    );
  }
  if (!opts.quiet && res.stderr) process.stderr.write(res.stderr);
  return res.stdout;
}
