/**
 * date/format: dates are formatted for display in the user's locale. Flags
 * date-like values rendered as they come (ISO strings), toISOString/toString in
 * JSX, hand-cut or hand-built dates, HvTable date columns without a Cell
 * formatter, and strings passed to HvDatePicker.
 */
import ts from "typescript";

import type { FileContext } from "../../context.js";
import { defineCheck, result, type Finding } from "../../define.js";

const DATE_NAME = /(^date$|Date$|At$|^timestamp$|Timestamp$|^time$|Time$)/;

const lastName = (e: ts.Expression): string | undefined => {
  if (ts.isIdentifier(e)) return e.text;
  if (ts.isPropertyAccessExpression(e)) return e.name.text;
  if (
    ts.isElementAccessExpression(e) &&
    ts.isStringLiteral(e.argumentExpression)
  )
    return e.argumentExpression.text;
  if (ts.isNonNullExpression(e) || ts.isParenthesizedExpression(e))
    return lastName(e.expression);
  return undefined;
};

const isDateLike = (ctx: FileContext, e: ts.Expression) => {
  const name = lastName(e);
  return name !== undefined && DATE_NAME.test(name);
};

/** The expression is shown to the user: a JSX child, or a text prop of an element. */
const isRendered = (node: ts.Node) => {
  const p = node.parent;
  if (!ts.isJsxExpression(p)) return false;
  if (ts.isJsxElement(p.parent) || ts.isJsxFragment(p.parent)) return true;
  return (
    ts.isJsxAttribute(p.parent) &&
    /^(label|title|description|subheader|value|children|message|caption)$/.test(
      p.parent.name.getText(),
    )
  );
};

export default defineCheck({
  rule: "date/format",
  run(ctx) {
    const findings: Finding[] = [];
    const choices = new Set<string>();
    const src = ctx.source;
    if (/Intl\.DateTimeFormat/.test(src)) choices.add("Intl.DateTimeFormat");
    if (/\.toLocale(Date|Time)?String\(/.test(src))
      choices.add("toLocale*String");
    if (/from ["'](dayjs|date-fns|moment|luxon)/.test(src))
      choices.add("date library");

    for (const n of ctx.walk()) {
      // {event.createdAt} rendered as is
      if (
        (ts.isIdentifier(n) || ts.isPropertyAccessExpression(n)) &&
        isRendered(n) &&
        isDateLike(ctx, n)
      ) {
        choices.add("raw value");
        findings.push({
          node: n,
          detail: `${n.getText(ctx.sf)} is rendered without formatting`,
        });
      }
      if (
        ts.isCallExpression(n) &&
        ts.isPropertyAccessExpression(n.expression)
      ) {
        const method = n.expression.name.text;
        const target = n.expression.expression;
        // toISOString()/toString()/toUTCString() shown to the user
        if (
          /^(toISOString|toUTCString|toJSON)$/.test(method) &&
          isRendered(n)
        ) {
          choices.add("raw value");
          findings.push({
            node: n,
            detail: `${method}() output is shown to the user`,
          });
        }
        if (
          method === "toString" &&
          isRendered(n) &&
          (isDateLike(ctx, target) || /new Date/.test(target.getText(ctx.sf)))
        ) {
          choices.add("raw value");
          findings.push({
            node: n,
            detail: "Date#toString() output is shown to the user",
          });
        }
        // createdAt.slice(0, 10), updatedAt.split("T")
        if (
          /^(slice|substring|substr|split)$/.test(method) &&
          isDateLike(ctx, target)
        ) {
          choices.add("hand-cut ISO");
          findings.push({
            node: n,
            detail: `${target.getText(ctx.sf)}.${method}(…) cuts the ISO string by hand`,
          });
        }
      }
      // `${d.getDate()}/${d.getMonth() + 1}/…`
      if (
        ts.isTemplateExpression(n) &&
        /get(Date|Month|FullYear)\(\)/.test(n.getText(ctx.sf))
      ) {
        choices.add("hand-built");
        findings.push({
          node: n,
          detail:
            "date string is built by hand from getDate/getMonth/getFullYear",
        });
      }
      // HvTable column: { accessor: "createdAt" } with no Cell formatter
      if (ts.isObjectLiteralExpression(n)) {
        const props = new Map(
          n.properties
            .filter(ts.isPropertyAssignment)
            .map((p) => [p.name.getText(ctx.sf), p.initializer] as const),
        );
        const accessor = props.get("accessor");
        const hasCell = n.properties.some(
          (p) => p.name?.getText(ctx.sf) === "Cell",
        );
        if (
          accessor &&
          ts.isStringLiteral(accessor) &&
          DATE_NAME.test(accessor.text.split(".").pop()!) &&
          !hasCell
        ) {
          choices.add("raw value");
          findings.push({
            node: n,
            detail: `table column "${accessor.text}" shows the raw value (no Cell formatter)`,
          });
        }
      }
    }

    for (const el of ctx.byTag("HvDatePicker")) {
      const value = el.attrs.get("value");
      if (typeof value?.literal === "string") {
        findings.push({
          node: value.node,
          detail: "HvDatePicker value is a string, not a Date",
          fix: "Pass a Date: value={new Date(iso)}.",
        });
      }
    }
    return result(findings, [...choices]);
  },
});
