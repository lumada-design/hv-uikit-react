import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export interface VariantSemantics {
  name: string;
  semanticMeaning?: string;
  description: string;
}

export interface StateRule {
  name: string;
  description: string;
  rules: string[];
}

export interface TokenConstraint {
  category: string;
  notes: string;
  allowedValues?: string[];
}

export interface AntiPattern {
  pattern: string;
  why: string;
  correct: string;
}

export interface A11yRequirement {
  role?: string;
  requirements: string[];
}

/**
 * Universal guidance authored in templates/rules/*.md, separate from the
 * component-level ValidationRule records produced by contract extraction.
 * Markdown examples use a fenced diff block: + lines map to do, - lines to dont.
 */
export interface GlobalRuleBase {
  /** Stable, unique category/name identifier, e.g. "destructive/confirm". */
  id: `${string}/${string}`;
  /** A specific, actionable requirement. */
  rule: string;
  /** Why the requirement matters to users or maintainers. */
  rationale: string;
  /** Relevant component names; an empty list means component-independent. */
  components: string[];
  /** At least one compliant code snippet or concrete scenario. */
  do: [string, ...string[]];
  /** At least one noncompliant code snippet or concrete scenario. */
  dont: [string, ...string[]];
}

/**
 * "checked" rules are review/checker requirements with an actionable fix;
 * this label does not imply the current CLI implements the check.
 * "context-only" rules require product context and are advisory, not failures.
 * Fixes are remediation instructions, not a promise of automatic code edits.
 * See templates/rules/workflow.md for the Markdown authoring format.
 */
export type GlobalRule = GlobalRuleBase &
  (
    | { enforcement: "checked"; fix: string }
    | { enforcement: "context-only"; fix?: never }
  );

export interface ValidationRule {
  rule: string;
  failureMessage: string;
  enforcement: "error" | "warn" | "info";
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ComponentContract {
  name: string;
  displayName: string;
  purpose: string;
  props?: ComponentProp[];
  variantSemantics?: VariantSemantics[];
  stateRules?: StateRule[];
  tokenConstraints?: TokenConstraint[];
  antiPatterns?: AntiPattern[];
  a11y?: A11yRequirement;
  validationRules?: ValidationRule[];
}

export interface ComponentMetadata {
  version: string;
  generatedAt: string;
  components: ComponentContract[];
  /** Components skipped during extraction because they have no purpose tag. */
  missingPurpose?: string[];
}

/**
 * Load component metadata from the installed @pentaho/uikit-react-core package.
 * Resolves the metadata JSON file from node_modules.
 */
export function loadMetadata(): ComponentMetadata {
  try {
    // When installed via npm, try to load from node_modules
    const nodeModulesPath = join(
      fileURLToPath(import.meta.url),
      "../../../../node_modules/@pentaho/uikit-react-core/dist/component-metadata.json",
    );

    try {
      const content = readFileSync(nodeModulesPath, "utf-8");
      return JSON.parse(content);
    } catch {
      // Fallback for development: try to load from workspace
      const devPath = join(
        fileURLToPath(import.meta.url),
        "../../../../core/dist/component-metadata.json",
      );
      const content = readFileSync(devPath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    throw new Error(
      `Failed to load component metadata. Ensure @pentaho/uikit-react-core is installed with component-metadata.json in dist/. Error: ${error}`,
      { cause: error },
    );
  }
}

/**
 * Find a component by name in the metadata.
 */
export function findComponent(
  metadata: ComponentMetadata,
  name: string,
): ComponentContract | undefined {
  return metadata.components.find(
    (c) => c.name === name || c.displayName === name,
  );
}
