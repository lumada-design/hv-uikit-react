/**
 * `uikit-tools check [patterns...]` — enforce every rule marked "checked" in
 * the installed UI Kit metadata over a consumer app (default: src).
 *
 *   (default)        print violations (file:line rule: detail + fix); exit 1 if any
 *   --json           print the full report as JSON
 *   --report <file>  write the JSON report to a file and exit 0: for scoring a
 *                    finished run without the agent seeing it
 *   --gate           for an agent host's stop hook: on violations, print them to
 *                    stderr and exit 2 so the agent keeps working; after
 *                    --max-rounds rounds (default 3) or when clean, exit 0.
 *                    Rounds are counted in --state (default .uikit-check/gate.json).
 *
 * Exits 3 when the checks and the installed rules disagree (a checked rule
 * without a check, or a check without a checked rule).
 */
import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_PATTERNS,
  formatText,
  loadChecks,
  parityProblems,
  runChecks,
  type CheckReport,
} from "../checks/engine.js";
import { loadMetadata } from "../core/load.js";

export interface CheckOptions {
  json?: boolean;
  report?: string;
  gate?: boolean;
  maxRounds?: string;
  state?: string;
}

export interface GateState {
  maxRounds: number;
  rounds: {
    round: number;
    violations: number;
    rules: Record<string, number>;
  }[];
  passed?: boolean;
  /** Violations left when the gate let the agent stop. */
  remaining?: number;
  /** Set when the check could not run (rules/check mismatch, crash): the gate let the agent stop unchecked. */
  error?: string;
}

/** Record in the gate state that the check could not run, so a scorer can tell. */
function recordGateError(stateFile: string, error: string) {
  const state: GateState = fs.existsSync(stateFile)
    ? JSON.parse(fs.readFileSync(stateFile, "utf8"))
    : { maxRounds: 0, rounds: [] };
  state.error = error;
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(
    stateFile,
    `${JSON.stringify(state, null, 2)}
`,
  );
}

function gateMessage(report: CheckReport, round: number, max: number): string {
  return [
    `uikit-tools check: ${report.violations.length} violation(s) of UI Kit rules (correction round ${round} of ${max}).`,
    "Fix them, then finish. Look up a rule with `npx uikit-tools rule <id>`.",
    "",
    formatText(report).trimEnd(),
  ].join("\n");
}

export function runGate(
  report: CheckReport,
  stateFile: string,
  maxRounds: number,
): { exitCode: number; message?: string; state: GateState } {
  const state: GateState = fs.existsSync(stateFile)
    ? JSON.parse(fs.readFileSync(stateFile, "utf8"))
    : { maxRounds, rounds: [] };
  const done = state.rounds.length;
  let exitCode = 0;
  let message: string | undefined;
  if (report.violations.length === 0) {
    state.passed = true;
    state.remaining = 0;
  } else if (done < maxRounds) {
    const round = done + 1;
    const rules: Record<string, number> = {};
    for (const v of report.violations) rules[v.rule] = (rules[v.rule] ?? 0) + 1;
    state.rounds.push({ round, violations: report.violations.length, rules });
    message = gateMessage(report, round, maxRounds);
    exitCode = 2;
  } else {
    state.passed = false;
    state.remaining = report.violations.length;
  }
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, `${JSON.stringify(state, null, 2)}\n`);
  return { exitCode, message, state };
}

export async function check(
  patterns: string[],
  options: CheckOptions = {},
): Promise<void> {
  const stateFile = options.state ?? ".uikit-check/gate.json";
  const fail = (message: string) => {
    process.stderr.write(message);
    if (options.gate) recordGateError(stateFile, message.trim());
    process.exitCode = 3;
  };
  try {
    const { metadata } = loadMetadata();
    const checks = await loadChecks();
    const problems = parityProblems(checks, metadata);
    if (problems.length) {
      fail(
        `uikit-tools check: checks and rules disagree:\n${problems.map((p) => `  ${p}`).join("\n")}\n`,
      );
      return;
    }
    const report = runChecks(
      checks,
      metadata,
      patterns.length ? patterns : DEFAULT_PATTERNS,
    );

    if (options.report) {
      fs.mkdirSync(path.dirname(path.resolve(options.report)), {
        recursive: true,
      });
      fs.writeFileSync(options.report, `${JSON.stringify(report, null, 2)}\n`);
      return;
    }
    if (options.gate) {
      const max = Number(options.maxRounds ?? 3);
      const { exitCode, message } = runGate(report, stateFile, max);
      if (message) process.stderr.write(`${message}\n`);
      process.exitCode = exitCode;
      return;
    }
    process.stdout.write(
      options.json
        ? `${JSON.stringify(report, null, 2)}\n`
        : formatText(report),
    );
    process.exitCode = report.violations.length ? 1 : 0;
  } catch (error) {
    fail(`uikit-tools check: ${(error as Error).message}\n`);
  }
}
