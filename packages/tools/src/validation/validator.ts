/**
 * Runs the checks over JSX and reports failures by rule id, with the rule text
 * taken from the installed metadata so people see what the lookups show.
 */
import fs from "node:fs";
import path from "node:path";

import { getRule } from "../core/lookup.js";
import type { AgentsMetadata } from "../core/types.js";
import { checkedComponents, checksFor, type Props } from "./rules.js";

export interface Violation {
  file: string;
  line: number;
  column: number;
  component: string;
  ruleId: string;
  severity: "error" | "warn" | "info";
  detail: string;
  /** The rule's text from the metadata: title and statement, or don't/instead. */
  ruleText: string;
}

/** Read a balanced `{…}` starting at `i` (which must be `{`); returns the inner text and the index after it. */
function readBraces(src: string, i: number): [string, number] {
  let depth = 0;
  let quote: string | undefined;
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (quote) {
      if (ch === "\\") j++;
      else if (ch === quote) quote = undefined;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}" && --depth === 0) {
      return [src.slice(i + 1, j), j + 1];
    }
  }
  return [src.slice(i + 1), src.length];
}

/** Turn a `{expression}` value into a literal when it is one, else a dynamic marker. */
function literalValue(expr: string): unknown {
  const e = expr.trim();
  if (e === "true") return true;
  if (e === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(e)) return Number(e);
  if (/^(["'`])[^"'`]*\1$/.test(e)) return e.slice(1, -1);
  if (e.startsWith("{") && e.endsWith("}")) {
    // An object literal, e.g. style={{ color: "#f00" }}: keep its string fields.
    const fields: Record<string, string> = {};
    for (const pair of e.matchAll(/(\w+)\s*:\s*["']([^"']*)["']/g))
      fields[pair[1]] = pair[2];
    return fields;
  }
  return "__DYNAMIC__";
}

/**
 * Read the attributes of an opening tag, from just after the tag name to its
 * closing `>`, skipping `>` inside `{…}` and strings (e.g. `onClick={() => x}`).
 * Lexical, not a full parser; an AST-based engine is the follow-up for checks.
 */
function readTag(
  src: string,
  start: number,
): { props: Props; end: number; selfClosing: boolean } {
  const props: Props = {};
  let i = start;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
    } else if (ch === ">") {
      return { props, end: i + 1, selfClosing: false };
    } else if (ch === "/" && src[i + 1] === ">") {
      return { props, end: i + 2, selfClosing: true };
    } else if (ch === "{") {
      i = readBraces(src, i)[1]; // spread props: {...rest}
    } else {
      const name = src.slice(i).match(/^[\w:.-]+/)?.[0];
      if (!name) {
        i++;
        continue;
      }
      i += name.length;
      if (src[i] !== "=") {
        props[name] = true;
        continue;
      }
      i++;
      if (src[i] === '"' || src[i] === "'") {
        const close = src.indexOf(src[i], i + 1);
        props[name] = src.slice(i + 1, close === -1 ? undefined : close);
        i = close === -1 ? src.length : close + 1;
      } else if (src[i] === "{") {
        const [expr, next] = readBraces(src, i);
        props[name] = literalValue(expr);
        i = next;
      }
    }
  }
  return { props, end: src.length, selfClosing: true };
}

function findInstances(content: string, components: string[]) {
  const instances: {
    line: number;
    column: number;
    component: string;
    props: Props;
  }[] = [];
  const opening = new RegExp(`<(${components.join("|")})(?=[\\s/>])`, "g");
  for (const match of content.matchAll(opening)) {
    const component = match[1];
    const { props, end, selfClosing } = readTag(
      content,
      match.index + match[0].length,
    );
    if (!selfClosing) {
      // Plain-text children only, e.g. initials or an emoji.
      const text = content
        .slice(end)
        .match(new RegExp(`^([^<{]*)</${component}>`));
      if (text) props.children = text[1];
    }
    const before = content.slice(0, match.index);
    instances.push({
      line: before.split("\n").length,
      column: match.index - before.lastIndexOf("\n"),
      component,
      props,
    });
  }
  return instances;
}

export function ruleText(m: AgentsMetadata, ruleId: string): string {
  const found = getRule(m, ruleId);
  if (!found.ok) return `(rule ${ruleId} is not in ${m.package}@${m.version})`;
  if (found.value.kind === "component") {
    return `Don't: ${found.value.rule.dont} Instead: ${found.value.rule.instead}`;
  }
  const first = found.value.rule.rule
    .replace(/\s+/g, " ")
    .split(/(?<=\.)\s/)[0];
  return `${found.value.rule.title}. ${first}`;
}

export function validateFile(filePath: string, m: AgentsMetadata): Violation[] {
  const content = fs.readFileSync(filePath, "utf8");
  const violations: Violation[] = [];

  for (const instance of findInstances(content, checkedComponents())) {
    for (const check of checksFor(instance.component)) {
      const result = check.check(instance.props, m);
      if (result.pass) continue;
      violations.push({
        file: filePath,
        line: instance.line,
        column: instance.column,
        component: instance.component,
        ruleId: check.ruleId,
        severity: check.severity,
        detail: result.detail ?? "",
        ruleText: ruleText(m, check.ruleId),
      });
    }
  }
  return violations;
}

export function validateFiles(
  filePaths: string[],
  m: AgentsMetadata,
): Violation[] {
  return filePaths.flatMap((f) => validateFile(path.resolve(f), m));
}

export function formatViolations(
  violations: Violation[],
  cwd = process.cwd(),
): string {
  if (violations.length === 0) return "✓ No violations found\n";

  const sorted = violations.toSorted(
    (a, b) =>
      a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column,
  );
  let out = "";
  for (const v of sorted) {
    out += `${path.relative(cwd, v.file)}:${v.line}:${v.column}  ${v.severity}  ${v.ruleId}  ${v.detail}\n`;
    out += `  ${v.ruleText}\n`;
    out += `  → npx uikit-tools rule ${v.ruleId}\n\n`;
  }
  const count = (e: Violation["severity"]) =>
    violations.filter((v) => v.severity === e).length;
  out += `${count("error")} errors, ${count("warn")} warnings, ${count("info")} info\n`;
  return out;
}

export const getExitCode = (violations: Violation[]) =>
  violations.some((v) => v.severity === "error") ? 1 : 0;
