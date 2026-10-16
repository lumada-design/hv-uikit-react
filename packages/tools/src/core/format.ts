/**
 * Markdown renderings of lookup results. The CLI prints these and the MCP server
 * returns them, so people and agents read the same text.
 */
import type {
  ComponentInfo,
  ComponentSummary,
  LookupResult,
  RuleLookup,
  RuleSummary,
} from "./lookup.js";
import type { AgentsMetadata, PropEntry } from "./types.js";

export type OutputFormat = "text" | "json";

const header = (m: AgentsMetadata) => `<!-- ${m.package}@${m.version} -->`;

const entries = (record: Record<string, string>) => Object.entries(record);

function propLine(p: PropEntry): string {
  const flags = [
    p.required ? "required" : undefined,
    p.default !== undefined ? `default ${p.default}` : undefined,
  ]
    .filter(Boolean)
    .join(", ");
  return `- \`${p.name}\`: \`${p.type}\`${flags ? ` (${flags})` : ""}${p.description ? ` — ${p.description.replace(/\s+/g, " ")}` : ""}`;
}

export function formatComponent(m: AgentsMetadata, c: ComponentInfo): string {
  const out: string[] = [
    header(m),
    `# ${c.name}`,
    "",
    c.purpose,
    "",
    "```tsx",
    c.import,
    "```",
  ];

  if (c.partOf) {
    out.push(
      "",
      `Part of ${c.partOf.join(", ")}: props only here; usage rules are in \`info ${c.partOf[0]}\`.`,
    );
  }
  if (c.parts.length) out.push("", `**Compose with:** ${c.parts.join(", ")}`);

  if (entries(c.variants).length) {
    out.push("", "## Variants — what each means");
    for (const [k, v] of entries(c.variants)) out.push(`- \`${k}\`: ${v}`);
  }
  if (entries(c.states).length) {
    out.push("", "## States and behaviour");
    for (const [k, v] of entries(c.states)) out.push(`- \`${k}\`: ${v}`);
  }
  if (entries(c.tokens).length) {
    out.push("", "## Tokens");
    for (const [k, v] of entries(c.tokens)) out.push(`- ${k}: ${v}`);
  }
  if (c.antiPatterns.length) {
    out.push("", "## Component rules");
    for (const ap of c.antiPatterns) {
      out.push(
        `- \`${ap.id}\` — Don't: ${ap.dont} Why: ${ap.why} Instead: ${ap.instead}`,
      );
    }
  }
  if (c.ruleSummaries.length) {
    out.push("", "## Design rules that apply (look up with `rule <id>`)");
    for (const r of c.ruleSummaries)
      out.push(`- \`${r.id}\` — ${r.title} (${r.enforcement})`);
  }
  if (c.a11y) {
    out.push("", "## Accessibility");
    if (c.a11y.role) out.push(`- role: ${c.a11y.role}`);
    for (const r of c.a11y.requirements) out.push(`- ${r}`);
  }
  out.push("", "## Props");
  for (const p of c.props) out.push(propLine(p));
  return `${out.join("\n")}\n`;
}

export function formatRule(m: AgentsMetadata, r: RuleLookup): string {
  if (r.kind === "component") {
    const ap = r.rule;
    return [
      header(m),
      `# ${ap.id}`,
      "",
      `Component rule of ${r.component}. Look up the component with \`info ${r.component}\`.`,
      "",
      `**Don't:** ${ap.dont}`,
      "",
      `**Why:** ${ap.why}`,
      "",
      `**Instead:** ${ap.instead}`,
      "",
    ].join("\n");
  }
  const rule = r.rule;
  return [
    header(m),
    `# ${rule.id} — ${rule.title}`,
    "",
    `Enforcement: ${rule.enforcement} · Status: ${rule.status}${rule.components.length ? ` · Components: ${rule.components.join(", ")}` : ""}`,
    "",
    "## Rule",
    "",
    rule.rule,
    "",
    "## Rationale",
    "",
    rule.rationale,
    "",
    "## Do",
    "",
    rule.do,
    "",
    "## Don't",
    "",
    rule.dont,
    "",
  ].join("\n");
}

export function formatComponentList(
  m: AgentsMetadata,
  list: ComponentSummary[],
): string {
  return `${[header(m), "# Components with guidance", "", ...list.map((c) => `- **${c.name}** — ${c.purpose}`)].join("\n")}\n`;
}

export function formatRuleList(m: AgentsMetadata, list: RuleSummary[]): string {
  return `${[header(m), "# Design rules", "", ...list.map((r) => `- \`${r.id}\` — ${r.title} (${r.enforcement}, ${r.status})`)].join("\n")}\n`;
}

/**
 * Render any lookup result in the requested format. The single place where
 * output is produced, used by both the CLI and the MCP server.
 */
export function render<T>(
  result: LookupResult<T>,
  format: OutputFormat,
  asText: (value: T) => string,
): { text: string; isError: boolean } {
  if (!result.ok) {
    return {
      text:
        format === "json"
          ? `${JSON.stringify({ error: result.error }, null, 2)}\n`
          : `${result.error}\n`,
      isError: true,
    };
  }
  return {
    text:
      format === "json"
        ? `${JSON.stringify(result.value, null, 2)}\n`
        : asText(result.value),
    isError: false,
  };
}
