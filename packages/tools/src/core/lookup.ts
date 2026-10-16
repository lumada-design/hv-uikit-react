/**
 * Lookups shared by the CLI and the MCP server. Both call these functions and
 * render the result the same way, so they always return the same answer.
 */
import type {
  AgentsMetadata,
  AntiPatternEntry,
  ComponentEntry,
  RuleEntry,
} from "./types.js";

export type LookupResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export interface ComponentSummary {
  name: string;
  purpose: string;
}

export interface RuleSummary {
  id: string;
  title: string;
  enforcement: RuleEntry["enforcement"];
  status: RuleEntry["status"];
}

/** A design rule, or a component rule (an anti-pattern addressed as `HvButton/variant`). */
export type RuleLookup =
  | { kind: "design"; rule: RuleEntry }
  | { kind: "component"; component: string; rule: AntiPatternEntry };

export interface ComponentInfo extends ComponentEntry {
  /** Title and enforcement of each applicable design rule, for convenience. */
  ruleSummaries: RuleSummary[];
}

const summarizeRule = (r: RuleEntry): RuleSummary => ({
  id: r.id,
  title: r.title,
  enforcement: r.enforcement,
  status: r.status,
});

/** Case-insensitive, and accepts names with or without the `Hv` prefix. */
function findComponent(
  m: AgentsMetadata,
  name: string,
): ComponentEntry | undefined {
  const wanted = name.trim().toLowerCase().replace(/^hv/, "");
  return Object.values(m.components).find(
    (c) => c.name.toLowerCase().replace(/^hv/, "") === wanted,
  );
}

function suggest(candidates: string[], query: string): string[] {
  const q = query.toLowerCase();
  return candidates
    .filter((c) => {
      const l = c.toLowerCase();
      return l.includes(q) || q.includes(l.replace(/^hv/, ""));
    })
    .slice(0, 5);
}

export function listComponents(m: AgentsMetadata): ComponentSummary[] {
  return Object.values(m.components)
    .filter((c) => !c.partOf)
    .map(({ name, purpose }) => ({
      name,
      purpose,
    }));
}

export function listRules(m: AgentsMetadata): RuleSummary[] {
  return Object.values(m.rules).map(summarizeRule);
}

export function getComponent(
  m: AgentsMetadata,
  name: string,
): LookupResult<ComponentInfo> {
  const c = findComponent(m, name);
  if (!c) {
    const hints = suggest(Object.keys(m.components), name);
    return {
      ok: false,
      error:
        `No guidance for "${name}" in ${m.package}@${m.version}.` +
        (hints.length ? ` Did you mean ${hints.join(", ")}?` : "") +
        ` Components with guidance: ${Object.keys(m.components).join(", ")}.` +
        " Other components are described by their TypeScript types.",
    };
  }
  const ruleSummaries = c.rules
    .map((id) => m.rules[id])
    .filter((r): r is RuleEntry => r !== undefined)
    .map(summarizeRule);
  return { ok: true, value: { ...c, ruleSummaries } };
}

export function getRule(
  m: AgentsMetadata,
  id: string,
): LookupResult<RuleLookup> {
  const key = id.trim();
  if (m.rules[key])
    return { ok: true, value: { kind: "design", rule: m.rules[key] } };

  const slash = key.indexOf("/");
  if (slash > 0) {
    const component = findComponent(m, key.slice(0, slash));
    const rule = component?.antiPatterns.find(
      (ap) =>
        ap.id.toLowerCase() ===
        `${component.name}/${key.slice(slash + 1)}`.toLowerCase(),
    );
    if (component && rule)
      return {
        ok: true,
        value: { kind: "component", component: component.name, rule },
      };
  }

  const all = [
    ...Object.keys(m.rules),
    ...Object.values(m.components).flatMap((c) =>
      c.antiPatterns.map((ap) => ap.id),
    ),
  ];
  const hints = suggest(all, key);
  return {
    ok: false,
    error:
      `No rule "${id}" in ${m.package}@${m.version}.` +
      (hints.length ? ` Did you mean ${hints.join(", ")}?` : "") +
      ` Design rules: ${Object.keys(m.rules).join(", ")}.`,
  };
}
