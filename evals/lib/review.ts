/**
 * Blind review (0–2) of what checks cannot score: the context-only rules and
 * the visual layout. The reviewer is a separate headless model that sees only
 * the run's screenshots, the agent's code and the ticket, in a folder with a
 * random name. It never sees the setup, the model or the check results.
 */
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { runAgent } from "./agent.ts";
import { CACHE, RESULTS, SCENARIOS } from "./paths.ts";
import { loadScenario, type RunResult } from "./run-one.ts";

export const REVIEW_MODEL = "sonnet";

export interface Review {
  reviewer: string;
  scores: {
    data_states: number | null;
    status_color: number | null;
    visual_layout: number | null;
  };
  notes: string;
  costUsd: number;
}

const RUBRIC = `You review one UI change built with the HV UI Kit (a React design system).
In this folder: ticket.md (what was asked), screens/*.png (screenshots of the result), code/ (the files the developer wrote or changed), and possibly mock*.png (the design they were given).

Score each item 0, 1 or 2, or null when it does not apply. Judge only what you can see in the screenshots and code.

data_states — does every view that loads data handle loading, empty and error states?
  0 = only the loaded state; 1 = some of the three, or handled crudely (blank areas, raw error text); 2 = loading, empty and error all handled, with a way forward (retry, create) where it makes sense.
status_color — are statuses (open/closed, certified/draft, connected/failed…) shown with semantic colors and a text label?
  0 = plain text only, or arbitrary colors; 1 = colored but inconsistent, categorical colors for status, or color without a label; 2 = semantic colors (positive / warning / negative / neutral) with labels, consistently. null if no status is shown.
visual_layout — is the page clean and consistent with a design system?
  0 = broken, unstyled, overlapping or empty; 1 = usable but with inconsistent spacing, alignment, hierarchy or a cramped/misaligned header; 2 = clean, aligned, consistent spacing and hierarchy (and close to the mock, if one was given, without copying obvious mistakes).

Use the Read tool to look at the files. Then answer with ONLY a JSON object on one line, no prose before or after:
{"data_states": 0|1|2|null, "status_color": 0|1|2|null, "visual_layout": 0|1|2|null, "notes": "<one or two sentences>"}`;

export function reviewRun(result: RunResult): Review | undefined {
  const resDir = path.join(RESULTS, result.id);
  const out = path.join(resDir, "review.json");
  if (fs.existsSync(out)) return JSON.parse(fs.readFileSync(out, "utf8"));
  const screens = path.join(resDir, "screens");
  if (!fs.existsSync(screens) || fs.readdirSync(screens).length === 0)
    return undefined;

  const dir = path.join(CACHE, "reviews", randomUUID().slice(0, 8));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(path.join(dir, "code"), { recursive: true });
  const scenario = loadScenario(result.scenario);
  fs.writeFileSync(path.join(dir, "ticket.md"), scenario.prompt);
  fs.cpSync(screens, path.join(dir, "screens"), { recursive: true });
  for (const mock of scenario.mocks ?? []) {
    fs.copyFileSync(
      path.join(SCENARIOS, scenario.id, mock),
      path.join(dir, mock),
    );
  }
  for (const f of result.changedFiles) {
    if (!/\.(tsx?|jsx?|css)$/.test(f)) continue;
    const target = path.join(dir, "code", f.replace(/^src\//, ""));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(resDir, f), target);
  }

  const agent = runAgent({
    dir,
    prompt: RUBRIC,
    model: REVIEW_MODEL,
    outFile: path.join(dir, "reviewer.json"),
    timeoutMs: 10 * 60_000,
    disallow: ["Bash", "Write", "Edit", "NotebookEdit", "Skill"],
  });
  const match = agent.result.match(/\{[^{}]*"visual_layout"[^{}]*\}/);
  fs.rmSync(dir, { recursive: true, force: true });
  if (!match) return undefined;
  const parsed = JSON.parse(match[0]);
  const score = (v: unknown) => (v === 0 || v === 1 || v === 2 ? v : null);
  const review: Review = {
    reviewer: agent.model,
    scores: {
      data_states: score(parsed.data_states),
      status_color: score(parsed.status_color),
      visual_layout: score(parsed.visual_layout),
    },
    notes: String(parsed.notes ?? ""),
    costUsd: agent.costUsd,
  };
  fs.writeFileSync(out, `${JSON.stringify(review, null, 2)}\n`);
  return review;
}
