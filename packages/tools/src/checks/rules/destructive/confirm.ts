/**
 * destructive/confirm. File-scoped, so it judges only what it can see:
 *
 * - A destructive call (a delete/remove/destroy/discard API, a mutation hook's
 *   `mutate`/`trigger` on a delete mutation, or fetch with method DELETE) is a
 *   violation when an event handler in this file reaches it outside a
 *   confirmation: a handler on any element other than an HvDialog's contents
 *   or a `*Dialog` / `*Confirm*` / `*Modal` component (custom confirmation
 *   components in other files count as confirmations).
 * - Calls no handler in this file reaches (hooks, helpers used elsewhere) are
 *   not judged here.
 * - A confirmation HvDialog must not use a status variant (on the dialog or
 *   its title), and its destructive button must be negativeGhost.
 */
import ts from "typescript";

import { enclosingFunctions, type JsxEl } from "../../context.js";
import { defineCheck, result, type Finding } from "../../define.js";

const DESTRUCTIVE_NAME = /^(delete|remove|destroy|discard|purge)([A-Z_]\w*)?$/;
const API_OBJECT = /api|client|service|repo|axios|http|server|db/i;
const NOT_API_OBJECT =
  /params|map|set|list|storage|cache|headers|classList|selection|rows/i;
const DELETE_MUTATION = /delete|remove|destroy|discard|purge/i;
const DESTRUCTIVE_TEXT = /\b(delete|remove|discard|destroy)\b/i;
const CONFIRM_TAG = /(Dialog|Confirm|Confirmation|Modal|Prompt)/;

export default defineCheck({
  rule: "destructive/confirm",
  run(ctx) {
    if (ctx.elements.length === 0) return result(); // no UI in this file

    // Local functions by name: their bodies are judged, their names are not API calls.
    const functions = new Map<string, ts.Node>();
    for (const n of ctx.walk()) {
      // only functions with a body here (a `declare function` is an import in disguise)
      if (ts.isFunctionLike(n) && "body" in n && n.body) {
        const name = ctx.functionName(n);
        if (name) functions.set(name, n);
      }
    }

    // const del = useDeleteAsset(); const { mutate } = useMutation(deleteAsset)
    const initializers = new Map<string, string>();
    const bound = (name: ts.BindingName): string[] =>
      ts.isIdentifier(name)
        ? [name.text]
        : name.elements.flatMap((e) =>
            ts.isBindingElement(e) ? bound(e.name) : [],
          );
    for (const n of ctx.walk()) {
      if (!ts.isVariableDeclaration(n) || !n.initializer) continue;
      const init = n.initializer.getText(ctx.sf);
      for (const name of bound(n.name)) initializers.set(name, init);
    }
    const fromDeleteHook = (name: string) =>
      DELETE_MUTATION.test(initializers.get(name) ?? "");

    const isDestructiveCall = (call: ts.CallExpression) => {
      const callee = call.expression;
      if (ts.isIdentifier(callee)) {
        if (/^(mutate|mutateAsync|trigger)$/.test(callee.text))
          return fromDeleteHook(callee.text);
        return (
          DESTRUCTIVE_NAME.test(callee.text) && !functions.has(callee.text)
        );
      }
      if (ts.isPropertyAccessExpression(callee)) {
        const name = callee.name.text;
        const object = callee.expression.getText(ctx.sf);
        if (/^(mutate|mutateAsync|trigger)$/.test(name))
          return DELETE_MUTATION.test(object) || fromDeleteHook(object);
        if (/^(delete|remove|destroy)$/.test(name))
          return API_OBJECT.test(object) && !NOT_API_OBJECT.test(object);
        return (
          DESTRUCTIVE_NAME.test(name) &&
          name.length > 6 &&
          !NOT_API_OBJECT.test(object)
        );
      }
      if (callee.getText(ctx.sf) === "fetch") {
        return call.arguments.some((a) =>
          /method\s*:\s*["']DELETE["']/i.test(a.getText(ctx.sf)),
        );
      }
      return false;
    };

    // Handler roots: functions referenced by, or written inline in, JSX attributes.
    const isConfirmContext = (el: JsxEl) =>
      el.tag === "HvDialog" ||
      (CONFIRM_TAG.test(el.tag) && /^[A-Z]/.test(el.tag)) ||
      ctx.ancestors(el.element).some((a) => a.tag === "HvDialog");
    const direct = new Set<ts.Node>();
    const confirmed = new Set<ts.Node>();
    for (const el of ctx.elements) {
      const into = isConfirmContext(el) ? confirmed : direct;
      for (const attr of el.attrs.values()) {
        if (!attr.value) continue;
        for (const n of ctx.walk(attr.value)) {
          if (ts.isIdentifier(n) && functions.has(n.text))
            into.add(functions.get(n.text)!);
          if (ts.isArrowFunction(n) || ts.isFunctionExpression(n)) into.add(n);
        }
      }
    }
    // Close over local calls: a handler that calls `remove()` also reaches remove's body.
    for (const set of [direct, confirmed]) {
      for (const fn of set) {
        for (const n of ctx.walk(fn)) {
          if (ts.isIdentifier(n) && functions.has(n.text))
            set.add(functions.get(n.text)!);
        }
      }
    }

    const findings: Finding[] = [];
    const choices: string[] = [];
    for (const n of ctx.walk()) {
      if (!ts.isCallExpression(n) || !isDestructiveCall(n)) continue;
      const enclosing = enclosingFunctions(n);
      const fromDirect = enclosing.some((fn) => direct.has(fn));
      const fromConfirm = enclosing.some((fn) => confirmed.has(fn));
      if (!fromDirect && !fromConfirm) continue; // not reached from UI in this file
      const call = n.expression.getText(ctx.sf);
      if (!fromDirect) {
        choices.push("HvDialog");
        continue;
      }
      const native = enclosing.some((fn) =>
        [...ctx.walk(fn)].some(
          (c) =>
            ts.isCallExpression(c) &&
            /^(window\.)?confirm$/.test(c.expression.getText(ctx.sf)),
        ),
      );
      choices.push(native ? "window.confirm" : "no confirmation");
      findings.push({
        node: n,
        detail: native
          ? `${call}() is confirmed with window.confirm, not an HvDialog`
          : `${call}() runs from a handler without a confirmation dialog`,
      });
    }

    for (const d of ctx.byTag("HvDialog")) {
      if (!DESTRUCTIVE_TEXT.test(ctx.textOf(d))) continue;
      const titles = ctx
        .byTag("HvDialogTitle")
        .filter((t) => ctx.ancestors(t.element).includes(d));
      const status = [d, ...titles]
        .map((e) => e.attrs.get("variant")?.literal)
        .find((v) => typeof v === "string");
      choices.push(`dialog variant: ${status ?? "none"}`);
      if (typeof status === "string") {
        findings.push({
          node: d.opening,
          detail: `delete dialog uses variant="${status}"`,
          fix: "Remove the status variant from the dialog and its title: a confirmation is a decision, not a status.",
        });
      }
      for (const b of ctx.byTag("HvButton")) {
        if (
          !ctx.ancestors(b.element).includes(d) ||
          !ctx.isInside(b.element, "HvDialogActions")
        )
          continue;
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
