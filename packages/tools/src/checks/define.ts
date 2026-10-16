import type ts from "typescript";

import type { FileContext } from "./context.js";

export interface Finding {
  node: ts.Node;
  /** What is wrong here, e.g. `delete dialog uses variant="warning"`. */
  detail: string;
  /** A fix specific to this instance; the rule's own fix is shown when omitted. */
  fix?: string;
}

export interface CheckResult {
  findings: Finding[];
  /**
   * What the code chose for this rule, compliant or not, e.g.
   * "HvDialog (plain)" or "no confirmation". Used to measure consistency.
   */
  choices: string[];
}

export interface Check {
  /** The rule this check enforces: a design rule id or `<Component>/<id>`. */
  rule: string;
  run(ctx: FileContext): CheckResult;
}

/** Declare a check. One file per rule under `checks/rules/`, default export. */
export const defineCheck = (check: Check): Check => check;

export const result = (
  findings: Finding[] = [],
  choices: string[] = [],
): CheckResult => ({ findings, choices });
