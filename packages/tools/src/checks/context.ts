/**
 * What a check sees: one source file parsed with the TypeScript compiler, plus
 * helpers for the JSX in it. File-scoped on purpose: checks look at one file at
 * a time and do not resolve imports.
 */
import ts from "typescript";

import type { AgentsMetadata } from "../core/types.js";

export interface JsxAttr {
  name: string;
  node: ts.JsxAttribute;
  /** The value expression, or the string literal for `name="…"`. Undefined for bare `name`. */
  value?: ts.Expression;
  /** Static value when it is a literal: `"x"`, `{"x"}`, `{true}`, `{2}`, or `true` for a bare prop. */
  literal?: string | number | boolean;
}

export interface JsxEl {
  tag: string;
  /** The opening (or self-closing) element. */
  opening: ts.JsxOpeningElement | ts.JsxSelfClosingElement;
  /** The whole element, including children when it has them. */
  element: ts.JsxElement | ts.JsxSelfClosingElement;
  attrs: Map<string, JsxAttr>;
}

export interface Position {
  line: number;
  column: number;
}

export class FileContext {
  /** Path as reported, relative to where the check runs. */
  readonly file: string;
  readonly source: string;
  readonly metadata: AgentsMetadata;
  readonly sf: ts.SourceFile;
  readonly elements: JsxEl[] = [];

  constructor(file: string, source: string, metadata: AgentsMetadata) {
    this.file = file;
    this.source = source;
    this.metadata = metadata;
    this.sf = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      /\.[jt]sx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const visit = (node: ts.Node) => {
      if (ts.isJsxElement(node)) {
        this.elements.push(toEl(node.openingElement, node));
      } else if (ts.isJsxSelfClosingElement(node)) {
        this.elements.push(toEl(node, node));
      }
      ts.forEachChild(node, visit);
    };
    visit(this.sf);
  }

  at(node: ts.Node): Position {
    const { line, character } = this.sf.getLineAndCharacterOfPosition(
      node.getStart(this.sf),
    );
    return { line: line + 1, column: character + 1 };
  }

  /** All descendants of `node` (depth-first), including `node`. */
  *walk(node: ts.Node = this.sf): Generator<ts.Node> {
    yield node;
    for (const child of node.getChildren(this.sf)) yield* this.walk(child);
  }

  /** Elements with one of the given tags. */
  byTag(...tags: string[]): JsxEl[] {
    return this.elements.filter((e) => tags.includes(e.tag));
  }

  /** The element whose `element` node is `node`, if any. */
  elementOf(node: ts.Node): JsxEl | undefined {
    return this.elements.find((e) => e.element === node);
  }

  /** Nearest enclosing JSX elements of `node`, innermost first. */
  ancestors(node: ts.Node): JsxEl[] {
    const out: JsxEl[] = [];
    for (let n = node.parent; n; n = n.parent) {
      const el = this.elementOf(n);
      if (el) out.push(el);
    }
    return out;
  }

  /** Whether `node` sits inside an element with one of the tags. */
  isInside(node: ts.Node, ...tags: string[]): boolean {
    return this.ancestors(node).some((a) => tags.includes(a.tag));
  }

  /**
   * Visible text of an element: JSX text and string literals among its
   * children, plus label/title props. Translation keys (`t("assets.delete.cancel")`)
   * stand for their text: by default every segment ("assets delete cancel"),
   * with `keys: "last"` only the last one ("cancel"), which is what a button says.
   */
  textOf(el: JsxEl, { keys = "all" }: { keys?: "all" | "last" } = {}): string {
    const keyText = (t: string) =>
      /^[\w-]+(\.[\w-]+)+$/.test(t)
        ? keys === "last"
          ? t.split(".").at(-1)!
          : t.split(".").join(" ")
        : t;
    const parts: string[] = [];
    for (const name of ["label", "title", "aria-label"]) {
      const attr = el.attrs.get(name);
      if (typeof attr?.literal === "string") parts.push(attr.literal);
      else if (attr?.value)
        parts.push(...this.stringsIn(attr.value).map(keyText));
    }
    if (ts.isJsxElement(el.element)) {
      for (const n of this.walk(el.element)) {
        if (ts.isJsxText(n)) parts.push(n.text);
        else if (
          (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) &&
          (ts.isJsxExpression(n.parent) ||
            // t("Delete"), i18n.t("…"): translated labels
            (ts.isCallExpression(n.parent) &&
              n.parent.arguments[0] === n &&
              /(^|\.)t$/.test(n.parent.expression.getText(this.sf))))
        )
          parts.push(keyText(n.text));
      }
    }
    return parts.join(" ").replace(/\s+/g, " ").trim();
  }

  /** String literals inside an expression (e.g. `title={t("Delete")}`). */
  stringsIn(node: ts.Node): string[] {
    return [...this.walk(node)]
      .filter(
        (n) => ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n),
      )
      .map((n) => (n as ts.StringLiteral).text);
  }

  /** Element children (ignoring whitespace text and expressions). */
  childElements(el: JsxEl): JsxEl[] {
    if (!ts.isJsxElement(el.element)) return [];
    return el.element.children
      .map((c) => this.elementOf(c))
      .filter((c): c is JsxEl => c !== undefined);
  }

  /** The name a function node is known by in this file, if any. */
  functionName(fn: ts.Node): string | undefined {
    if ((ts.isFunctionDeclaration(fn) || ts.isMethodDeclaration(fn)) && fn.name)
      return fn.name.getText(this.sf);
    if (ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) {
      const p = fn.parent;
      if (ts.isVariableDeclaration(p) && ts.isIdentifier(p.name))
        return p.name.text;
      if (ts.isPropertyAssignment(p)) return p.name.getText(this.sf);
      // useCallback(() => …, [])
      if (
        ts.isCallExpression(p) &&
        ts.isVariableDeclaration(p.parent) &&
        ts.isIdentifier(p.parent.name)
      )
        return p.parent.name.text;
    }
    return undefined;
  }
}

/** Enclosing function-like nodes of `node`, innermost first. */
export function enclosingFunctions(node: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isFunctionLike(n)) out.push(n);
  }
  return out;
}

const literalOf = (expr: ts.Expression | undefined) => {
  if (!expr) return true;
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr))
    return expr.text;
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isNumericLiteral(expr)) return Number(expr.text);
  return undefined;
};

function toEl(
  opening: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
  element: ts.JsxElement | ts.JsxSelfClosingElement,
): JsxEl {
  const attrs = new Map<string, JsxAttr>();
  for (const prop of opening.attributes.properties) {
    if (!ts.isJsxAttribute(prop)) continue;
    const name = prop.name.getText();
    const init = prop.initializer;
    const value = !init
      ? undefined
      : ts.isJsxExpression(init)
        ? init.expression
        : (init as ts.Expression);
    attrs.set(name, { name, node: prop, value, literal: literalOf(value) });
  }
  return { tag: opening.tagName.getText(), opening, element, attrs };
}
