/** HvButton/icon-name: an icon-only HvButton (the `icon` prop, or only an icon/emoji inside) needs aria-label or title. */
import ts from "typescript";

import { defineCheck, result, type Finding } from "../../define.js";

export default defineCheck({
  rule: "HvButton/icon-name",
  run(ctx) {
    const findings: Finding[] = [];
    for (const el of ctx.byTag("HvButton")) {
      if (
        el.attrs.has("aria-label") ||
        el.attrs.has("aria-labelledby") ||
        el.attrs.has("title")
      )
        continue;
      const text = ctx
        .textOf(el)
        .replace(/\p{Extended_Pictographic}/gu, "")
        .trim();
      const onlyIconChild =
        ts.isJsxElement(el.element) &&
        !text &&
        el.element.children.some(
          (c) =>
            ts.isJsxElement(c) ||
            ts.isJsxSelfClosingElement(c) ||
            (ts.isJsxText(c) && /\p{Extended_Pictographic}/u.test(c.text)),
        );
      if (el.attrs.get("icon")?.literal === true || onlyIconChild) {
        findings.push({
          node: el.opening,
          detail: "icon-only HvButton has no aria-label",
        });
      }
    }
    return result(findings);
  },
});
