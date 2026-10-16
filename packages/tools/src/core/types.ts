/**
 * Shape of `@pentaho/uikit-react-core/agents/metadata.json`, schemaVersion 1.
 * Mirrors packages/core/scripts/agents-format.ts; the loader rejects other versions.
 */

export interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  values?: string[];
}

export interface AntiPatternEntry {
  /** Full id, e.g. "HvButton/variant". */
  id: string;
  dont: string;
  why: string;
  instead: string;
  enforcement: "checked" | "context";
}

export interface ComponentEntry {
  name: string;
  import: string;
  /** Set for parts: the components whose contracts name it. Parts carry props only. */
  partOf?: string[];
  purpose: string;
  parts: string[];
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
  /** One line: what to change. Required when enforcement is "checked"; shown by checks. */
  fix?: string;
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

export const SUPPORTED_SCHEMA_VERSION = 1;
