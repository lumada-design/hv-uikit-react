/**
 * Check engine. Checks live one per file under `checks/rules/`, at the path of
 * the rule they enforce (`rules/destructive/confirm.ts` → "destructive/confirm",
 * `rules/HvButton/variant.ts` → "HvButton/variant"), and are discovered at run
 * time. The engine refuses to run unless checks and the installed metadata
 * agree: every checked rule has a check, and every check enforces a checked rule.
 * Adding a checked rule therefore needs only its metadata entry and its check file.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { globSync } from "glob";

import { getRule } from "../core/lookup.js";
import type { AgentsMetadata } from "../core/types.js";
import { FileContext } from "./context.js";
import type { Check } from "./define.js";

export interface Violation {
  file: string;
  line: number;
  column: number;
  rule: string;
  detail: string;
  fix: string;
}

export interface CheckReport {
  package: string;
  version: string;
  files: number;
  violations: Violation[];
  /** Per rule: what the code chose, compliant or not (one entry per occurrence). */
  choices: Record<string, string[]>;
  /** Per checked rule: number of violations (0 included, so every rule appears). */
  counts: Record<string, number>;
}

const rulesDir = fileURLToPath(new URL("./rules/", import.meta.url));

/** Every rule the installed metadata marks as checked: design rules and component rules. */
export function checkedRules(m: AgentsMetadata): string[] {
  return [
    ...Object.values(m.rules)
      .filter((r) => r.enforcement === "checked")
      .map((r) => r.id),
    ...Object.values(m.components).flatMap((c) =>
      c.antiPatterns
        .filter((a) => a.enforcement === "checked")
        .map((a) => a.id),
    ),
  ].toSorted();
}

export async function loadChecks(dir = rulesDir): Promise<Check[]> {
  const files = globSync("**/*.{js,ts}", {
    cwd: dir,
    posix: true,
    ignore: ["**/*.d.ts"],
  }).toSorted();
  const modules = await Promise.all(
    files.map(
      async (file) =>
        [
          file,
          (await import(pathToFileURL(path.join(dir, file)).href)) as {
            default?: Check;
          },
        ] as const,
    ),
  );
  const checks: Check[] = [];
  for (const [file, mod] of modules) {
    const check = mod.default;
    const expected = file.replace(/\.(js|ts)$/, "");
    if (!check?.rule || typeof check.run !== "function") {
      throw new Error(
        `checks/rules/${file} must default-export defineCheck({ rule, run })`,
      );
    }
    if (check.rule !== expected) {
      throw new Error(
        `checks/rules/${file} declares rule "${check.rule}"; its path says "${expected}"`,
      );
    }
    checks.push(check);
  }
  return checks;
}

/** Problems that make the check set and the installed rules disagree. Empty when they match. */
export function parityProblems(checks: Check[], m: AgentsMetadata): string[] {
  const checked = new Set(checkedRules(m));
  const have = new Set(checks.map((c) => c.rule));
  return [
    ...[...checked]
      .filter((r) => !have.has(r))
      .map((r) => `rule "${r}" is checked but has no check`),
    ...[...have]
      .filter((r) => !checked.has(r))
      .map((r) =>
        getRule(m, r).ok
          ? `check "${r}" enforces a rule that is not marked checked in ${m.package}@${m.version}`
          : `check "${r}" has no rule in ${m.package}@${m.version}`,
      ),
  ];
}

function fixFor(m: AgentsMetadata, rule: string): string {
  const r = getRule(m, rule);
  if (!r.ok) return "";
  return r.value.kind === "design"
    ? (r.value.rule.fix ?? r.value.rule.title)
    : r.value.rule.instead;
}

export const DEFAULT_PATTERNS = ["src/**/*.{tsx,jsx,ts,js}"];
const IGNORE = [
  "**/node_modules/**",
  "**/dist/**",
  "**/*.d.ts",
  "**/*.test.*",
  "**/*.stories.*",
];

export function runChecks(
  checks: Check[],
  m: AgentsMetadata,
  patterns: string[] = DEFAULT_PATTERNS,
  cwd = process.cwd(),
): CheckReport {
  const files = [
    ...new Set(
      patterns.flatMap((p) =>
        globSync(p, { cwd, nodir: true, ignore: IGNORE, posix: true }),
      ),
    ),
  ].toSorted();
  const violations: Violation[] = [];
  const choices: Record<string, string[]> = {};
  const counts = Object.fromEntries(checks.map((c) => [c.rule, 0]));

  for (const file of files) {
    const ctx = new FileContext(
      file,
      fs.readFileSync(path.resolve(cwd, file), "utf8"),
      m,
    );
    for (const check of checks) {
      const { findings, choices: made } = check.run(ctx);
      if (made.length) (choices[check.rule] ??= []).push(...made);
      for (const f of findings) {
        const { line, column } = ctx.at(f.node);
        violations.push({
          file,
          line,
          column,
          rule: check.rule,
          detail: f.detail,
          fix: f.fix ?? fixFor(m, check.rule),
        });
        counts[check.rule]++;
      }
    }
  }
  violations.sort(
    (a, b) =>
      a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column,
  );
  return {
    package: m.package,
    version: m.version,
    files: files.length,
    violations,
    choices,
    counts,
  };
}

export function formatText(report: CheckReport): string {
  if (report.violations.length === 0) {
    return `✓ ${report.files} file(s) pass ${Object.keys(report.counts).length} checks (${report.package}@${report.version})\n`;
  }
  const lines = report.violations.map(
    (v) => `${v.file}:${v.line} ${v.rule}: ${v.detail}\n  fix: ${v.fix}`,
  );
  return `${lines.join("\n")}\n\n${report.violations.length} violation(s) in ${report.files} file(s). Details: npx uikit-tools rule <id>\n`;
}
