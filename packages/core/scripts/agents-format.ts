/**
 * Shape of dist/agents/metadata.json (schemaVersion 1) and the guide renderer.
 * @pentaho/uikit-tools reads the same shape; bump schemaVersion on breaking changes.
 */

export interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  /** Literal values, when the type is a union of literals. */
  values?: string[];
}

export interface AntiPatternEntry {
  /** Full id, e.g. "HvButton/variant". */
  id: string;
  dont: string;
  why: string;
  instead: string;
}

export interface ComponentEntry {
  name: string;
  import: string;
  /** Set for parts: the components whose contracts name it. Parts carry props only. */
  partOf?: string[];
  purpose: string;
  parts: string[];
  /** Design rule ids that apply. */
  rules: string[];
  variants: Record<string, string>;
  states: Record<string, string>;
  tokens: Record<string, string>;
  antiPatterns: AntiPatternEntry[];
  a11y?: { role?: string; requirements: string[] };
  props: PropEntry[];
  source: string;
}

export interface RuleEntry {
  id: string;
  title: string;
  components: string[];
  enforcement: "checked" | "context";
  status: "example" | "approved";
  rule: string;
  rationale: string;
  do: string;
  dont: string;
  source: string;
}

export interface AgentsMetadata {
  schemaVersion: 1;
  package: string;
  version: string;
  components: Record<string, ComponentEntry>;
  rules: Record<string, RuleEntry>;
}

/**
 * The always-loaded guide: rule ids and titles, components and purposes, and how
 * to look up the rest. It deliberately holds no rule text and no props.
 */
export function renderGuide(m: AgentsMetadata): string {
  const rules = Object.values(m.rules);
  const components = Object.values(m.components).filter((c) => !c.partOf);

  return `# HV UI Kit — agent guide

> Generated for ${m.package}@${m.version}. Do not edit or copy this file: it is
> part of the installed package and updates when the UI Kit is upgraded.

Build all UI with UI Kit components from \`${m.package}\`. This guide says what
exists and which rules apply. It does not hold props or rule text — look them up
in the installed version before writing code. Do not guess props or variants.

## Look things up

| Need | CLI | MCP tool |
| --- | --- | --- |
| A component's props, variant meanings, states, anti-patterns and rules | \`npx uikit-tools info <Component>\` | \`get_component\` |
| A rule's text, rationale and do/don't examples | \`npx uikit-tools rule <id>\` | \`get_rule\` |
| All components with guidance | \`npx uikit-tools info\` | \`list_components\` |
| All rules | \`npx uikit-tools rule\` | \`list_rules\` |
| Check code against the rules | \`npx uikit-tools validate "src/**/*.tsx"\` | — |

Check failures name a rule id; run \`rule <id>\` to see what it requires.

## Rules

\`checked\` rules are meant to be enforced by checks; \`context\` rules are guidance.
Checks cover only part of the \`checked\` rules today, so a clean \`validate\` is not
proof of compliance: follow every rule you looked up.
Component rules use \`<Component>/<id>\` (e.g. \`HvButton/variant\`), are listed by
\`info\`, and are guidance unless a check reports them.

| Id | Rule | Enforcement |
| --- | --- | --- |
${rules.map((r) => `| \`${r.id}\` | ${r.title} | ${r.enforcement} |`).join("\n")}

## Components with guidance

${components.map((c) => `- **${c.name}** — ${c.purpose}${c.parts.length ? ` Parts: ${c.parts.join(", ")}.` : ""}`).join("\n")}

Parts listed above (e.g. table and dialog parts) can be looked up with \`info\` for their props.
Other components exported by \`${m.package}\` are described by their TypeScript types.
`;
}
