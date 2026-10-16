/**
 * Evaluation runner for UI Kit rules, context and checks. See evals/README.md.
 *
 *   node evals/run.ts all                      prepare, render mocks, run the plan, review, report
 *   node evals/run.ts prepare [--no-build]     build + pack the UI Kit, install the template
 *   node evals/run.ts mocks                    render the design mocks to PNGs
 *   node evals/run.ts run [filters]            run the plan (skips runs that already have results)
 *   node evals/run.ts review                   blind review of runs that have none yet
 *   node evals/run.ts report                   rebuild evals/reports from results
 *   node evals/run.ts one <scenario> <setup> <model> <rep> [--force]
 *
 * Filters for run: --scenarios a,b  --setups x,y  --models sonnet,haiku
 *                  --runs 3  --concurrency 6  --force
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { renderMocks } from "./lib/mocks.ts";
import { EVALS, RESULTS } from "./lib/paths.ts";
import { prepare } from "./lib/prepare.ts";
import { writeReport } from "./lib/report.ts";
import { reviewRun } from "./lib/review.ts";
import { runId, runOne, type RunResult, type RunSpec } from "./lib/run-one.ts";

/** The full plan: every scenario × the four setups × models × 3, plus deliveries on the CRUD scenario. */
export const PLAN = {
  scenarios: [
    "s1-crud",
    "s2-cardview",
    "s3-landing",
    "p1-catalog",
    "p2-glossary-term",
    "p3-connections",
  ],
  setups: ["baseline", "context", "checks", "both"],
  models: ["sonnet", "haiku"],
  runs: 3,
  deliveries: { scenario: "s1-crud", setups: ["guide-mcp", "guide-skill"] },
};

const [command = "help", ...rest] = process.argv.slice(2);
const flag = (name: string) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? undefined : rest[i + 1];
};
const list = (name: string, fallback: string[]) =>
  flag(name)?.split(",") ?? fallback;

function planSpecs(): RunSpec[] {
  const scenarios = list("scenarios", PLAN.scenarios);
  const setups = list("setups", [...PLAN.setups, ...PLAN.deliveries.setups]);
  const models = list("models", PLAN.models);
  const runs = Number(flag("runs") ?? PLAN.runs);
  const specs: RunSpec[] = [];
  for (const scenario of scenarios)
    for (const setup of setups) {
      // Delivery setups only run on the delivery scenario.
      if (
        PLAN.deliveries.setups.includes(setup) &&
        scenario !== PLAN.deliveries.scenario
      )
        continue;
      for (const model of models)
        for (let rep = 1; rep <= runs; rep++)
          specs.push({ scenario, setup, model, rep });
    }
  return specs;
}

/** Run specs in parallel child processes (each run is synchronous inside). */
async function runPool(specs: RunSpec[], concurrency: number, force: boolean) {
  const todo = specs.filter(
    (s) => force || !fs.existsSync(path.join(RESULTS, runId(s), "result.json")),
  );
  console.info(
    `run: ${todo.length} of ${specs.length} runs to do, ${concurrency} at a time`,
  );
  let next = 0;
  let done = 0;
  const started = Date.now();
  const worker = async () => {
    while (next < todo.length) {
      const spec = todo[next++];
      await new Promise<void>((resolve) => {
        const args = [
          path.join(EVALS, "run.ts"),
          "one",
          spec.scenario,
          spec.setup,
          spec.model,
          String(spec.rep),
          ...(force ? ["--force"] : []),
        ];
        const child = spawn(process.execPath, args, {
          stdio: ["ignore", "pipe", "pipe"],
        });
        let out = "";
        child.stdout.on("data", (d) => (out += d));
        child.stderr.on("data", (d) => (out += d));
        child.on("close", (code) => {
          done++;
          const mins = ((Date.now() - started) / 60000).toFixed(1);
          console.info(
            `[${done}/${todo.length} ${mins}m] ${code === 0 ? out.trim().split("\n").at(-1) : `${runId(spec)} FAILED: ${out.slice(-400)}`}`,
          );
          resolve();
        });
      });
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, todo.length) }, worker),
  );
}

async function reviewAll(concurrency: number) {
  const ids = fs.existsSync(RESULTS)
    ? fs.readdirSync(RESULTS).filter(
        (id) =>
          fs.existsSync(path.join(RESULTS, id, "result.json")) &&
          !fs.existsSync(path.join(RESULTS, id, "review.json")) &&
          // invalid runs are not averaged, so not reviewed either
          JSON.parse(
            fs.readFileSync(path.join(RESULTS, id, "result.json"), "utf8"),
          ).invalid?.length === 0,
      )
    : [];
  console.info(`review: ${ids.length} runs to review`);
  let next = 0;
  const worker = async () => {
    while (next < ids.length) {
      const id = ids[next++];
      await new Promise<void>((resolve) => {
        const child = spawn(
          process.execPath,
          [path.join(EVALS, "run.ts"), "review-one", id],
          { stdio: "inherit" },
        );
        child.on("close", () => resolve());
      });
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, ids.length) }, worker),
  );
}

const concurrency = Number(flag("concurrency") ?? 6);
const force = rest.includes("--force");

switch (command) {
  case "prepare":
    prepare({ rebuild: !rest.includes("--no-build") });
    break;
  case "mocks":
    await renderMocks();
    break;
  case "one": {
    const [scenario, setup, model, rep] = rest;
    const result = await runOne(
      { scenario, setup, model, rep: Number(rep) },
      { force },
    );
    console.info(
      result
        ? `${result.id}: ${result.invalid.length ? `INVALID (${result.invalid.join("; ")}), ` : ""}${result.check.total} violation(s), ${result.gate.rounds} gate round(s), $${result.agent.costUsd.toFixed(3)}, ${result.agent.turns} turns`
        : `${runId({ scenario, setup, model, rep: Number(rep) })}: skipped (has results)`,
    );
    break;
  }
  case "run":
    await runPool(planSpecs(), concurrency, force);
    break;
  case "review-one": {
    const result: RunResult = JSON.parse(
      fs.readFileSync(path.join(RESULTS, rest[0], "result.json"), "utf8"),
    );
    const review = reviewRun(result);
    console.info(
      `review ${rest[0]}: ${review ? JSON.stringify(review.scores) : "no screens or no verdict"}`,
    );
    break;
  }
  case "review":
    await reviewAll(concurrency);
    break;
  case "report": {
    const { records, file } = writeReport();
    console.info(
      `report: ${records} runs → ${path.relative(process.cwd(), file)}`,
    );
    break;
  }
  case "all":
    prepare({ rebuild: true });
    await renderMocks();
    await runPool(planSpecs(), concurrency, force);
    await reviewAll(concurrency);
    console.info(`report: ${writeReport().file}`);
    break;
  default:
    console.info(
      "usage: node evals/run.ts <all|prepare|mocks|run|review|report|one>",
    );
}
