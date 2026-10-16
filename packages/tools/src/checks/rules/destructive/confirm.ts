/**
 * destructive/confirm: a destructive call (delete/remove/destroy/discard API,
 * or fetch with method DELETE) must only run from inside a plain HvDialog —
 * directly, or through functions that the dialog calls. The confirmation dialog
 * must not use a status variant, and its destructive button must be negativeGhost.
 */
import ts from "typescript";

import { enclosingFunctions, type FileContext } from "../../context.js";
import { defineCheck, result, type Finding } from "../../define.js";

const DESTRUCTIVE_NAME = /^(delete|remove|destroy|discard|purge)([A-Z_]\w*)?$/;
const API_OBJECT = /api|client|service|repo|axios|http|server|db/i;
const DESTRUCTIVE_TEXT = /\b(delete|remove|discard|destroy)\b/i;

/** The call is a destructive API call, not e.g. Map#delete or a state update. */
function isDestructiveCall(ctx: FileContext, call: ts.CallExpression) {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) {
    return DESTRUCTIVE_NAME.test(callee.text) && callee.text.length > 6;
  }
  if (ts.isPropertyAccessExpression(callee)) {
    const name = callee.name.text;
    const object = callee.expression.getText(ctx.sf);
    if (/^(delete|remove|destroy)$/.test(name)) return API_OBJECT.test(object);
    return DESTRUCTIVE_NAME.test(name) && name.length > 6;
  }
  // fetch(url, { method: "DELETE" })
  if (callee.getText(ctx.sf) === "fetch") {
    return call.arguments.some((a) =>
      /method\s*:\s*["']DELETE["']/i.test(a.getText(ctx.sf)),
    );
  }
  return false;
}

const isNativeConfirm = (ctx: FileContext, call: ts.CallExpression) =>
  /^(window\.)?confirm$/.test(call.expression.getText(ctx.sf));

export default defineCheck({
  rule: "destructive/confirm",
  run(ctx) {
    const findings: Finding[] = [];
    const choices: string[] = [];
    const dialogs = ctx.byTag("HvDialog");

    // Names referenced inside any dialog, closed over calls between functions.
    const functions = new Map<string, ts.Node>();
    for (const n of ctx.walk()) {
      if (ts.isFunctionLike(n)) {
        const name = ctx.functionName(n);
        if (name) functions.set(name, n);
      }
    }
    const confirmed = new Set<string>();
    for (const d of dialogs) {
      for (const n of ctx.walk(d.element)) {
        if (ts.isIdentifier(n) && functions.has(n.text)) confirmed.add(n.text);
      }
    }
    // A Set visits entries added during iteration, so this reaches every
    // function called (directly or not) from a dialog.
    for (const name of confirmed) {
      for (const n of ctx.walk(functions.get(name)!)) {
        if (ts.isIdentifier(n) && functions.has(n.text)) confirmed.add(n.text);
      }
    }

    for (const n of ctx.walk()) {
      if (!ts.isCallExpression(n) || !isDestructiveCall(ctx, n)) continue;
      const enclosing = enclosingFunctions(n);
      if (enclosing.length === 0) continue; // module-level, not a UI flow
      const call = n.expression.getText(ctx.sf);
      const usesNative = enclosing.some((fn) =>
        [...ctx.walk(fn)].some(
          (c) => ts.isCallExpression(c) && isNativeConfirm(ctx, c),
        ),
      );
      const inDialog =
        ctx.isInside(n, "HvDialog") ||
        enclosing.some((fn) => {
          const name = ctx.functionName(fn);
          return name !== undefined && confirmed.has(name);
        });
      if (inDialog) {
        choices.push("HvDialog");
      } else if (usesNative) {
        choices.push("window.confirm");
        findings.push({
          node: n,
          detail: `${call}() is confirmed with window.confirm, not an HvDialog`,
        });
      } else {
        choices.push("no confirmation");
        findings.push({
          node: n,
          detail: `${call}() runs without a confirmation dialog`,
        });
      }
    }

    for (const d of dialogs) {
      if (!DESTRUCTIVE_TEXT.test(ctx.textOf(d))) continue;
      const variant = d.attrs.get("variant")?.literal;
      if (typeof variant === "string") {
        choices.push(`dialog variant: ${variant}`);
        findings.push({
          node: d.opening,
          detail: `delete dialog uses variant="${variant}"`,
          fix: "Remove the variant: a confirmation is a decision, not a status. Use a plain HvDialog.",
        });
      } else {
        choices.push("dialog variant: none");
      }
      for (const b of ctx.byTag("HvButton")) {
        if (!ctx.isInside(b.element, "HvDialogActions")) continue;
        if (!ctx.ancestors(b.element).some((a) => a === d)) continue;
        if (!DESTRUCTIVE_TEXT.test(ctx.textOf(b))) continue;
        const bv = b.attrs.get("variant")?.literal ?? "primary";
        choices.push(`confirm button: ${bv}`);
        if (bv !== "negativeGhost") {
          findings.push({
            node: b.opening,
            detail: `destructive confirm button uses variant="${bv}"`,
            fix: 'Use variant="negativeGhost" for the destructive confirm button.',
          });
        }
      }
    }
    return result(findings, choices);
  },
});
