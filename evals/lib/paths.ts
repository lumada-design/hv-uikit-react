import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

export const EVALS = path.resolve(import.meta.dirname, "..");
export const REPO = path.resolve(EVALS, "..");
export const TEMPLATE = path.join(EVALS, "template");
export const SCENARIOS = path.join(EVALS, "scenarios");
export const MOCKS = path.join(EVALS, "mocks");
/**
 * Working area for installs, runs and reviews: outside the repo, so an agent
 * can never walk up into this checkout (its CLAUDE.md, AGENTS.md, rules or
 * other runs), and no path it sees names the repo. Override with UIKIT_EVALS_WORK.
 */
export const CACHE =
  process.env.UIKIT_EVALS_WORK ?? path.join(os.tmpdir(), "uikit-evals");
export const TARBALLS = path.join(CACHE, "tarballs");
export const BASE = path.join(CACHE, "base");
/** One folder per run (random name) and per review, deleted when done. */
export const RUNS = path.join(CACHE, "runs");
export const REVIEWS = path.join(CACHE, "reviews");

/** Models under test (label → pinned model ID) and the reviewer. */
export const MODELS: Record<string, string> = {
  sonnet: "claude-sonnet-5-5",
  haiku: "claude-haiku-5-5",
};
export const REVIEW_MODEL = "claude-opus-5-5";
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
