/**
 * Shared core of @pentaho/uikit-tools: loads the metadata of the installed UI Kit
 * and answers lookups. The CLI and the MCP server are thin wrappers over `query`.
 */
import {
  formatComponent,
  formatComponentList,
  formatRule,
  formatRuleList,
  render,
  type OutputFormat,
} from "./format.js";
import { loadMetadata } from "./load.js";
import { getComponent, getRule, listComponents, listRules } from "./lookup.js";

export * from "./types.js";
export * from "./lookup.js";
export * from "./format.js";
export * from "./load.js";

export type Query =
  | { kind: "component"; name?: string }
  | { kind: "rule"; id?: string };

/** Run a lookup against the UI Kit installed for `cwd` and render it. */
export function query(
  q: Query,
  options: { format?: OutputFormat; cwd?: string } = {},
): { text: string; isError: boolean } {
  const format = options.format ?? "text";
  const { metadata: m } = loadMetadata(options.cwd);

  if (q.kind === "component") {
    if (!q.name) {
      return render({ ok: true, value: listComponents(m) }, format, (v) =>
        formatComponentList(m, v),
      );
    }
    return render(getComponent(m, q.name), format, (v) =>
      formatComponent(m, v),
    );
  }
  if (!q.id) {
    return render({ ok: true, value: listRules(m) }, format, (v) =>
      formatRuleList(m, v),
    );
  }
  return render(getRule(m, q.id), format, (v) => formatRule(m, v));
}
