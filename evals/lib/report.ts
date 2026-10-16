/**
 * Build evals/reports from the raw results: a compact runs.json (one record per
 * run, enough to recompute every number) and report.md.
 */
import fs from "node:fs";
import path from "node:path";

import { REPORTS, RESULTS } from "./paths.ts";
import type { Review } from "./review.ts";
import type { RunResult } from "./run-one.ts";
import { SETUPS } from "./setups.ts";

export interface RunRecord {
  id: string;
  scenario: string;
  setup: string;
  model: string;
  rep: number;
  /** Why the run does not count (empty: valid). Invalid runs are listed, not averaged. */
  invalid: string[];
  agentOk: boolean;
  costUsd: number;
  turns: number;
  durationS: number;
  violations: number;
  byRule: Record<string, number>;
  /** Per rule: the run's decision, the sorted set of choices it made. */
  decisions: Record<string, string>;
  gateRounds: number;
  gatePassed: boolean | null;
  typecheck: boolean;
  build: boolean;
  review: Review["scores"] | null;
  reviewer: string | null;
  /** The agent's own use of the UI Kit's tools. */
  uikit: {
    cli: Record<string, number>;
    mcp: number;
    skill: number;
    guideReads: number;
  } | null;
}

const MAIN_SETUPS = ["baseline", "context", "checks", "both"];
const DELIVERIES = [
  ["context", "Guide only"],
  ["guide-mcp", "Guide + MCP"],
  ["guide-skill", "Guide + skill"],
] as const;
/** Rules whose choices are compared for consistency (the others are token presence). */
const DECISION_RULES = [
  "destructive/confirm",
  "date/format",
  "layout/page",
  "HvTable/section",
];

export function loadRecords(): RunRecord[] {
  if (!fs.existsSync(RESULTS)) return [];
  return fs
    .readdirSync(RESULTS)
    .filter((id) => fs.existsSync(path.join(RESULTS, id, "result.json")))
    .map((id) => {
      const r: RunResult = JSON.parse(
        fs.readFileSync(path.join(RESULTS, id, "result.json"), "utf8"),
      );
      const reviewFile = path.join(RESULTS, id, "review.json");
      const review: Review | null = fs.existsSync(reviewFile)
        ? JSON.parse(fs.readFileSync(reviewFile, "utf8"))
        : null;
      return {
        id,
        scenario: r.scenario,
        setup: r.setup,
        model: r.model,
        rep: r.rep,
        invalid: r.invalid ?? [],
        agentOk: r.agent.ok,
        costUsd: r.agent.costUsd,
        turns: r.agent.turns,
        durationS: Math.round(r.agent.durationMs / 1000),
        violations: r.check.total,
        byRule: r.check.counts,
        decisions: Object.fromEntries(
          Object.entries(r.check.choices ?? {})
            .filter(([rule]) => DECISION_RULES.includes(rule))
            .map(([rule, cs]) => [
              rule,
              [...new Set(cs)].toSorted().join(" + "),
            ]),
        ),
        gateRounds: r.gate.rounds,
        gatePassed: r.gate.passed,
        typecheck: r.typecheck.ok,
        build: r.build.ok,
        review: review?.scores ?? null,
        reviewer: review?.reviewer ?? null,
        uikit: r.agent.uikit ?? null,
      };
    })
    .toSorted((a, b) => a.id.localeCompare(b.id));
}

const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : Number.NaN;
const fmt = (x: number, d = 1) => (Number.isNaN(x) ? "–" : x.toFixed(d));
const pct = (x: number) => (Number.isNaN(x) ? "–" : `${Math.round(x * 100)}%`);

/**
 * Consistency of a rule's choices: within each scenario, the share of runs that
 * made the most common decision; averaged over scenarios (weighted by runs).
 */
function consistency(
  records: RunRecord[],
  rule: string,
): { value: number; n: number } {
  const byScenario = new Map<string, string[]>();
  for (const r of records) {
    const d = r.decisions[rule];
    if (d)
      byScenario.set(r.scenario, [...(byScenario.get(r.scenario) ?? []), d]);
  }
  let agree = 0;
  let n = 0;
  for (const ds of byScenario.values()) {
    if (ds.length < 2) continue;
    const counts = new Map<string, number>();
    for (const d of ds) counts.set(d, (counts.get(d) ?? 0) + 1);
    agree += Math.max(...counts.values());
    n += ds.length;
  }
  return { value: n ? agree / n : Number.NaN, n };
}

function reviewMean(records: RunRecord[], key: keyof Review["scores"]) {
  const xs = records
    .map((r) => r.review?.[key])
    .filter((x): x is number => typeof x === "number");
  return { value: mean(xs), n: xs.length };
}

function cellRows(
  records: RunRecord[],
  setups: readonly string[],
  label: (s: string) => string,
  rules: string[],
) {
  const models = [...new Set(records.map((r) => r.model))].toSorted();
  const rows: string[][] = [];
  for (const setup of setups) {
    for (const model of models) {
      const all = records.filter((r) => r.setup === setup && r.model === model);
      if (!all.length) continue;
      const rs = all.filter((r) => r.invalid.length === 0);
      const gated = SETUPS[setup]?.gate;
      const gate = rs.filter((r) => r.gatePassed !== null);
      const ds = reviewMean(rs, "data_states");
      const sc = reviewMean(rs, "status_color");
      const vl = reviewMean(rs, "visual_layout");
      rows.push([
        label(setup),
        model,
        String(rs.length),
        String(all.length - rs.length),
        fmt(mean(rs.map((r) => r.violations))),
        ...rules.map((rule) => fmt(mean(rs.map((r) => r.byRule[rule] ?? 0)))),
        gated ? fmt(mean(rs.map((r) => r.gateRounds))) : "n/a",
        gated
          ? `${pct(mean(gate.map((r) => (r.gatePassed ? 1 : 0))))} (${gate.length})`
          : "n/a",
        `$${fmt(mean(rs.map((r) => r.costUsd)), 2)}`,
        fmt(mean(rs.map((r) => r.turns)), 0),
        `${fmt(ds.value)} (${ds.n})`,
        `${fmt(sc.value)} (${sc.n})`,
        `${fmt(vl.value)} (${vl.n})`,
        pct(mean(rs.map((r) => (r.typecheck ? 1 : 0)))),
        usage(rs),
      ]);
    }
  }
  return rows;
}

/** Average per run of the agent's own UI Kit tool use: CLI lookups, MCP calls, skill uses, checks run. */
function usage(rs: RunRecord[]): string {
  const u = rs.map((r) => r.uikit).filter((x) => x !== null);
  if (!u.length) return "–";
  const cli = (x: (typeof u)[number]) =>
    Object.entries(x.cli)
      .filter(([cmd]) => cmd !== "check" && cmd !== "init")
      .reduce((a, [, n]) => a + n, 0);
  return [
    `cli ${fmt(mean(u.map(cli)))}`,
    `mcp ${fmt(mean(u.map((x) => x.mcp)))}`,
    `skill ${fmt(mean(u.map((x) => x.skill)))}`,
    `self-check ${fmt(mean(u.map((x) => x.cli.check ?? 0)))}`,
  ].join(", ");
}

const table = (head: string[], rows: string[][]) =>
  [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");

const shortRule = (r: string) =>
  r
    .replace("components/", "")
    .replace("destructive/", "")
    .replace("tokens/", "tok/");

export function writeReport(): { records: number; file: string } {
  const records = loadRecords();
  fs.mkdirSync(REPORTS, { recursive: true });
  fs.writeFileSync(
    path.join(REPORTS, "runs.json"),
    `${JSON.stringify(records, null, 2)}\n`,
  );

  const rules = [
    ...new Set(records.flatMap((r) => Object.keys(r.byRule))),
  ].toSorted();
  const valid = records.filter((r) => r.invalid.length === 0);
  const invalidRuns = records.filter((r) => r.invalid.length > 0);
  const main = records.filter((r) => MAIN_SETUPS.includes(r.setup));
  const mainValid = valid.filter((r) => MAIN_SETUPS.includes(r.setup));
  const models = [...new Set(records.map((r) => r.model))].toSorted();
  const scenarios = [...new Set(records.map((r) => r.scenario))].toSorted();
  const head = [
    "Setup",
    "Model",
    "n",
    "Invalid",
    "Violations",
    ...rules.map(shortRule),
    "Gate rounds",
    "Gate passed",
    "Cost/run",
    "Turns",
    "Data states (n)",
    "Status color (n)",
    "Layout (n)",
    "tsc ok",
    "UI Kit tool use / run",
  ];

  const consistencyRows: string[][] = [];
  for (const setup of MAIN_SETUPS) {
    for (const model of models) {
      const rs = mainValid.filter(
        (r) => r.setup === setup && r.model === model,
      );
      if (!rs.length) continue;
      consistencyRows.push([
        SETUPS[setup].label,
        model,
        ...DECISION_RULES.map((rule) => {
          const c = consistency(rs, rule);
          return `${pct(c.value)} (${c.n})`;
        }),
      ]);
    }
  }

  const perScenario = scenarios.map((s) => [
    s,
    ...MAIN_SETUPS.flatMap((setup) =>
      models.map((model) => {
        const rs = mainValid.filter(
          (r) => r.scenario === s && r.setup === setup && r.model === model,
        );
        return rs.length
          ? `${fmt(mean(rs.map((r) => r.violations)))} (${rs.length})`
          : "–";
      }),
    ),
  ]);

  const commonDecisions = (rule: string) =>
    MAIN_SETUPS.map((setup) => {
      const counts = new Map<string, number>();
      for (const r of mainValid.filter(
        (x) => x.setup === setup && x.decisions[rule],
      ))
        counts.set(r.decisions[rule], (counts.get(r.decisions[rule]) ?? 0) + 1);
      const top = [...counts.entries()]
        .toSorted((a, b) => b[1] - a[1])
        .slice(0, 3);
      return `- **${SETUPS[setup].label}:** ${top.map(([d, n]) => `${d} ×${n}`).join("; ") || "–"}`;
    }).join("\n");

  const s1 = records.filter((r) => r.scenario === "s1-crud");
  const md = `# Evaluation report

Generated from ${records.length} runs (${valid.length} valid, ${invalidRuns.length} invalid) in \`evals/results\` by \`node evals/run.ts report\`. Raw per-run numbers: \`runs.json\`.

**n** counts valid runs only; every mean is over them. A run is **invalid** when the agent failed or timed out, the check could not report, the agent changed no UI file, or a gated setup's gate did not run or errored. Invalid runs are listed at the end, not averaged.

Scores: **violations** are \`uikit-tools check --report\` findings on the finished code (never shown to the agent), per run.
**Gate rounds** are correction rounds the gate returned (max 3); **gate passed** means the checks were clean when the agent stopped.
**Review** columns are blind 0–2 scores (reviewer: ${[...new Set(valid.map((r) => r.reviewer).filter(Boolean))].join(", ") || "–"}) with the number of reviewed runs in brackets.
Cost is the agent's own cost per run (list price), excluding the review.
**UI Kit tool use** is what the agent did by itself, from its transcript: \`uikit-tools\` lookups (cli), MCP tool calls, skill uses, and \`uikit-tools check\` runs (self-check; the gate's own runs are not counted).

## Setups × models (all scenarios)

${table(
  head,
  cellRows(main, MAIN_SETUPS, (s) => SETUPS[s].label, rules),
)}

## Consistency of rule choices

Within each scenario, the share of runs that made the most common decision for a rule, averaged over scenarios (runs with a decision in brackets).

${table(["Setup", "Model", ...DECISION_RULES], consistencyRows)}

Most common decisions per setup (all models and scenarios):

**destructive/confirm**
${commonDecisions("destructive/confirm")}

**layout/page**
${commonDecisions("layout/page")}

## Violations per scenario

${table(["Scenario", ...MAIN_SETUPS.flatMap((s) => models.map((m) => `${s} · ${m}`))], perScenario)}

## Deliveries on the CRUD scenario (s1-crud)

"Guide only" is the Context-only setup's s1-crud runs.

${table(
  head,
  cellRows(
    s1,
    DELIVERIES.map(([s]) => s),
    (s) => DELIVERIES.find(([id]) => id === s)?.[1] ?? s,
    rules,
  ),
)}

## Invalid runs

${
  invalidRuns.length
    ? table(
        ["Run", "Why"],
        invalidRuns.map((r) => [r.id, r.invalid.join("; ")]),
      )
    : "None."
}
`;
  const file = path.join(REPORTS, "report.md");
  fs.writeFileSync(file, md);
  return { records: records.length, file };
}
