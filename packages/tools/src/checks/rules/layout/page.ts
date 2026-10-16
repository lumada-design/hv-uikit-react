/**
 * layout/page: in a page file (under a `pages/` folder, or exporting a
 * `…Page` component), the page's main return is a stack padded with spacing
 * tokens whose first element is HvGlobalActions, with its padding intact.
 */
import ts from "typescript";

import type { FileContext, JsxEl } from "../../context.js";
import { defineCheck, result, type Finding } from "../../define.js";

const TOKEN_PADDING = /(^|\s)p[xytrbl]?-(xxs|xs|sm|md|lg|xl)(\s|$)/;

/**
 * A page is a route module: it exports a `…Page` component, or sits under a
 * `pages/` folder and exports a route component (`Component`, the react-router
 * lazy convention, or a default export). Other components in `pages/`, such as
 * a page's dialogs, are not pages.
 */
const isPageFile = (ctx: FileContext) =>
  /export\s+(default\s+)?(function|const)\s+\w*Page\b/.test(ctx.source) ||
  // under pages/, only the route module itself: pages/x/index.tsx or pages/XPage.tsx
  (/(^|\/)pages\/(.+\/)?(index|\w*Page)\.[jt]sx?$/.test(ctx.file) &&
    /export\s+(default\b|(function|const)\s+Component\b|\{[^}]*\bComponent\b)/.test(
      ctx.source,
    ));

/** The JSX of the last return of the exported page component (or of the file's last top-level component). */
function mainReturn(ctx: FileContext): ts.Node | undefined {
  let last: ts.Node | undefined;
  for (const stmt of ctx.sf.statements) {
    const fns: ts.Node[] = [];
    if (ts.isFunctionDeclaration(stmt)) fns.push(stmt);
    if (ts.isVariableStatement(stmt)) {
      for (const d of stmt.declarationList.declarations) {
        if (
          d.initializer &&
          (ts.isArrowFunction(d.initializer) ||
            ts.isFunctionExpression(d.initializer))
        )
          fns.push(d.initializer);
      }
    }
    for (const fn of fns) {
      const name = ctx.functionName(fn) ?? "";
      if (!/^[A-Z]/.test(name)) continue;
      const exported =
        /export/.test(stmt.getText(ctx.sf).slice(0, 20)) ||
        new RegExp(`export\\s+default\\s+${name}\\b`).test(ctx.source);
      // last return statement directly in this component (not nested callbacks)
      let ret: ts.Node | undefined;
      const visit = (n: ts.Node) => {
        if (n !== fn && ts.isFunctionLike(n)) return;
        if (ts.isReturnStatement(n) && n.expression) ret = n.expression;
        ts.forEachChild(n, visit);
      };
      visit(fn);
      if (ts.isArrowFunction(fn) && !ts.isBlock(fn.body)) ret = fn.body;
      if (ret && (exported || !last)) last = ret;
    }
  }
  let node = last;
  while (node && ts.isParenthesizedExpression(node)) node = node.expression;
  return node;
}

export default defineCheck({
  rule: "layout/page",
  run(ctx) {
    if (!isPageFile(ctx)) return result();
    const root = mainReturn(ctx);
    if (
      !root ||
      !(
        ts.isJsxElement(root) ||
        ts.isJsxFragment(root) ||
        ts.isJsxSelfClosingElement(root)
      )
    )
      return result();
    const findings: Finding[] = [];
    const headers = ctx
      .byTag("HvGlobalActions")
      .filter((h) => h.attrs.get("variant")?.literal !== "section");

    if (headers.length === 0) {
      return result(
        [{ node: root, detail: "page has no HvGlobalActions header" }],
        ["no HvGlobalActions"],
      );
    }

    // The padded stack: the root element, or the single element inside a root fragment.
    let stack: JsxEl | undefined = ctx.elementOf(root);
    if (ts.isJsxFragment(root)) {
      const kids = root.children
        .map((c) => ctx.elementOf(c))
        .filter((c): c is JsxEl => !!c);
      stack = kids.length === 1 ? kids[0] : undefined;
      if (!stack) {
        findings.push({
          node: root,
          detail:
            "page is a fragment with no padded container around its content",
        });
      }
    }
    const header = headers[0];
    const choices: string[] = [];

    if (stack) {
      // className="p-md" or className={cx("p-md", …)}
      const clsAttr = stack.attrs.get("className");
      const cls =
        typeof clsAttr?.literal === "string"
          ? clsAttr.literal
          : clsAttr?.value
            ? ctx.stringsIn(clsAttr.value).join(" ")
            : "";
      const padded = TOKEN_PADDING.test(cls);
      if (!padded) {
        findings.push({
          node: stack.opening,
          detail: "page container has no token padding (e.g. p-md)",
        });
      }
      const first = ctx.childElements(stack)[0];
      const headerFirst =
        first === header ||
        (first &&
          ctx.ancestors(header.element).includes(first) &&
          ctx.childElements(first)[0] === header);
      if (!headerFirst) {
        findings.push({
          node: header.opening,
          detail: "HvGlobalActions is not the first element of the page",
        });
      }
      choices.push(
        padded && headerFirst
          ? "HvGlobalActions first, token padding"
          : padded
            ? "HvGlobalActions not first"
            : "HvGlobalActions, no page padding",
      );
    } else {
      choices.push("HvGlobalActions, no page container");
    }

    const classes = header.attrs.get("classes")?.value?.getText(ctx.sf) ?? "";
    const style = header.attrs.get("style")?.value?.getText(ctx.sf) ?? "";
    if (/p[xytrbl]?-0\b|padding\s*:\s*0\b/.test(classes + style)) {
      findings.push({
        node: header.opening,
        detail: "HvGlobalActions padding is removed",
      });
    }
    return result(findings, choices);
  },
});
