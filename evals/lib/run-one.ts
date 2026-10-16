/**
 * One run: scenario × setup × model × repetition, from a clean app.
 *
 *   1. fresh app from the template (+ scenario files and mocks);
 *   2. apply the setup (guide, MCP, skill, gate);
 *   3. run the agent on the ticket;
 *   4. score, after the agent is done and without it seeing anything:
 *      `uikit-tools check --report`, type check, build, screenshots;
 *   5. keep the agent's code, the scores and the screenshots under results/.
 */
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { runAgent, type AgentResult } from "./agent.ts";
import {
  build,
  changedSince,
  closeBrowser,
  commitStart,
  createApp,
  screenshots,
  typecheck,
  type Screen,
} from "./app.ts";
import { MODELS, RESULTS, RUNS, SCENARIOS, sh } from "./paths.ts";
import { applySetup, SETUPS } from "./setups.ts";

export interface Scenario {
  id: string;
  title: string;
  source: string;
  prompt: string;
  mocks?: string[];
  files?: string;
  screens: Screen[];
  rules: string[];
  notes?: string;
}

export interface RunSpec {
  scenario: string;
  setup: string;
  model: string;
  rep: number;
}

export interface RunResult extends RunSpec {
  id: string;
  /** The run's folder name (random), for matching logs. */
  dir: string;
  startedAt: string;
  agent: AgentResult;
  /** Why the run does not count, if it does not. Invalid runs are reported, not averaged. */
  invalid: string[];
  gate: {
    /** Gate hook ran but failed (error, timeout): the setup did not get its gate. */
    error: string | null;
    rounds: number;
    passed: boolean | null;
    remaining: number | null;
    perRound: Record<string, number>[];
  };
  check: {
    total: number;
    counts: Record<string, number>;
    choices: Record<string, string[]>;
  };
  typecheck: { ok: boolean; errors: number };
  build: { ok: boolean };
  screenshotErrors: Record<string, string>;
  changedFiles: string[];
}

export const runId = (s: RunSpec) =>
  `${s.scenario}__${s.setup}__${s.model}__r${s.rep}`;

export const loadScenario = (id: string): Scenario =>
  JSON.parse(
    fs.readFileSync(path.join(SCENARIOS, id, "scenario.json"), "utf8"),
  );

export function promptFor(scenario: Scenario): string {
  return [
    "You are working on the React app in the current folder (TypeScript, Vite).",
    "Implement the ticket below. When you are done, the app must type-check (`npx tsc -p tsconfig.json --noEmit`).",
    "",
    scenario.prompt,
  ].join("\n");
}

export async function runOne(
  spec: RunSpec,
  { force = false } = {},
): Promise<RunResult | undefined> {
  const id = runId(spec);
  const resDir = path.join(RESULTS, id);
  if (!force && fs.existsSync(path.join(resDir, "result.json")))
    return undefined;
  const scenario = loadScenario(spec.scenario);
  const setup = SETUPS[spec.setup];
  if (!setup) throw new Error(`unknown setup ${spec.setup}`);

  // Random folder name: nothing the agent sees names the scenario, setup or model.
  const dir = path.join(RUNS, randomBytes(6).toString("hex"));
  fs.rmSync(resDir, { recursive: true, force: true });
  fs.mkdirSync(resDir, { recursive: true });
  const startedAt = new Date().toISOString();

  createApp(
    dir,
    scenario.files
      ? path.join(SCENARIOS, scenario.id, scenario.files)
      : undefined,
  );
  for (const mock of scenario.mocks ?? [])
    fs.copyFileSync(
      path.join(SCENARIOS, scenario.id, mock),
      path.join(dir, mock),
    );
  const { mcpConfig } = applySetup(dir, setup);
  commitStart(dir);

  const agent = runAgent({
    dir,
    prompt: promptFor(scenario),
    model: MODELS[spec.model] ?? spec.model,
    mcpConfig,
    outFile: path.join(resDir, "agent.jsonl"),
  });

  // --- scoring: after the agent, invisible to it ---------------------------------
  const gateFile = path.join(dir, ".uikit-check", "gate.json");
  const gateState = fs.existsSync(gateFile)
    ? JSON.parse(fs.readFileSync(gateFile, "utf8"))
    : undefined;
  if (gateState) fs.copyFileSync(gateFile, path.join(resDir, "gate.json"));

  // What the agent changed, before scoring adds anything (dist/ and .uikit-check/ are ignored).
  const changed = changedSince(dir);

  const checkFile = path.join(resDir, "check.json");
  const checkOut = sh(
    "npx",
    ["--no-install", "uikit-tools", "check", "--report", checkFile],
    { cwd: dir, quiet: true, allowFail: true },
  );
  const report = fs.existsSync(checkFile)
    ? JSON.parse(fs.readFileSync(checkFile, "utf8"))
    : undefined;
  if (!report) fs.writeFileSync(path.join(resDir, "check-error.txt"), checkOut);

  const types = typecheck(dir);
  fs.writeFileSync(path.join(resDir, "typecheck.txt"), types.output);
  const built = build(dir);
  const screenshotErrors = built.ok
    ? await screenshots(dir, scenario.screens, path.join(resDir, "screens"))
    : { build: built.output.slice(0, 500) };
  await closeBrowser();

  for (const f of changed) {
    fs.mkdirSync(path.dirname(path.join(resDir, f)), { recursive: true });
    fs.copyFileSync(path.join(dir, f), path.join(resDir, f));
  }

  // A gate setup whose hook never wrote its state, or wrote an error, did not get its gate.
  const gateError = !setup.gate
    ? null
    : !gateState
      ? "no gate state (the Stop hook did not run)"
      : (gateState.error ?? null);
  const invalid: string[] = [];
  if (agent.timedOut) invalid.push("agent timed out");
  else if (!agent.ok) invalid.push("agent failed");
  if (!report) invalid.push("check did not produce a report");
  if (!changed.some((f) => /^src\/.*\.[jt]sx$/.test(f)))
    invalid.push("no UI file changed");
  if (gateError) invalid.push(`gate: ${gateError}`);

  const result: RunResult = {
    ...spec,
    id,
    dir: path.basename(dir),
    startedAt,
    invalid,
    agent,
    gate: {
      error: gateError,
      rounds: gateState?.rounds?.length ?? 0,
      passed: gateState ? (gateState.passed ?? null) : null,
      remaining: gateState?.remaining ?? null,
      perRound: (gateState?.rounds ?? []).map(
        (r: { rules: Record<string, number> }) => r.rules,
      ),
    },
    check: {
      total: report?.violations.length ?? 0,
      counts: report?.counts ?? {},
      // Only what the agent wrote: template files make the same choice in every run.
      choices: Object.fromEntries(
        Object.entries(report?.fileChoices ?? {})
          .filter(([file]) => changed.includes(file))
          .flatMap(([, byRule]) =>
            Object.entries(byRule as Record<string, string[]>),
          )
          .reduce((acc, [rule, cs]) => {
            acc.set(rule, [...(acc.get(rule) ?? []), ...cs]);
            return acc;
          }, new Map<string, string[]>()),
      ),
    },
    typecheck: { ok: types.ok, errors: types.errors },
    build: { ok: built.ok },
    screenshotErrors,
    changedFiles: changed,
  };
  fs.writeFileSync(
    path.join(resDir, "result.json"),
    `${JSON.stringify(result, null, 2)}\n`,
  );
  fs.rmSync(dir, { recursive: true, force: true });
  return result;
}
