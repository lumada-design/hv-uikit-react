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
import fs from "node:fs";
import path from "node:path";

import { runAgent, type AgentResult } from "./agent.ts";
import {
  build,
  closeBrowser,
  createApp,
  screenshots,
  typecheck,
  type Screen,
} from "./app.ts";
import { CACHE, RESULTS, SCENARIOS, sh, TEMPLATE } from "./paths.ts";
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
  startedAt: string;
  agent: AgentResult;
  gate: {
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

/** Files under src that differ from the template: what the agent wrote or changed. */
function changedFiles(dir: string, scenario: Scenario): string[] {
  const out: string[] = [];
  const walk = (rel: string) => {
    for (const e of fs.readdirSync(path.join(dir, rel), {
      withFileTypes: true,
    })) {
      const r = path.join(rel, e.name);
      if (e.isDirectory()) walk(r);
      else {
        const original = [
          path.join(TEMPLATE, r),
          scenario.files
            ? path.join(SCENARIOS, scenario.id, scenario.files, r)
            : "",
        ].find((f) => f && fs.existsSync(f));
        if (
          !original ||
          fs.readFileSync(original, "utf8") !==
            fs.readFileSync(path.join(dir, r), "utf8")
        )
          out.push(r);
      }
    }
  };
  walk("src");
  return out.sort();
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

  const dir = path.join(CACHE, "runs", id);
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

  const agent = runAgent({
    dir,
    prompt: promptFor(scenario),
    model: spec.model,
    mcpConfig,
    outFile: path.join(resDir, "agent.json"),
  });

  // --- scoring: after the agent, invisible to it ---------------------------------
  const gateFile = path.join(dir, ".uikit-check", "gate.json");
  const gateState = fs.existsSync(gateFile)
    ? JSON.parse(fs.readFileSync(gateFile, "utf8"))
    : undefined;
  if (gateState) fs.copyFileSync(gateFile, path.join(resDir, "gate.json"));

  sh(
    "npx",
    [
      "--no-install",
      "uikit-tools",
      "check",
      "--report",
      path.join(resDir, "check.json"),
    ],
    { cwd: dir, quiet: true, allowFail: true },
  );
  const report = fs.existsSync(path.join(resDir, "check.json"))
    ? JSON.parse(fs.readFileSync(path.join(resDir, "check.json"), "utf8"))
    : { violations: [], counts: {}, choices: {} };

  const types = typecheck(dir);
  fs.writeFileSync(path.join(resDir, "typecheck.txt"), types.output);
  const built = build(dir);
  const screenshotErrors = built.ok
    ? await screenshots(dir, scenario.screens, path.join(resDir, "screens"))
    : { build: built.output.slice(0, 500) };
  await closeBrowser();

  const changed = changedFiles(dir, scenario);
  for (const f of changed) {
    fs.mkdirSync(path.dirname(path.join(resDir, f)), { recursive: true });
    fs.copyFileSync(path.join(dir, f), path.join(resDir, f));
  }

  const result: RunResult = {
    ...spec,
    id,
    startedAt,
    agent,
    gate: {
      rounds: gateState?.rounds?.length ?? 0,
      passed: gateState ? (gateState.passed ?? null) : null,
      remaining: gateState?.remaining ?? null,
      perRound: (gateState?.rounds ?? []).map(
        (r: { rules: Record<string, number> }) => r.rules,
      ),
    },
    check: {
      total: report.violations.length,
      counts: report.counts,
      choices: report.choices,
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
