/**
 * tokens/space: no raw spacing. Flags pixel/rem values (or bare non-zero
 * numbers) for margin, padding and gap in style objects, the same in CSS
 * strings, arbitrary spacing classes like `p-[24px]`, and numeric spacing
 * props on layout components.
 */
import ts from "typescript";

import { defineCheck, result, type Finding } from "../../define.js";

const SPACE_PROP =
  /^(margin|padding)(Top|Right|Bottom|Left|Inline|Block|X|Y)?$|^(gap|rowGap|columnGap)$/;
const RAW_LENGTH = /^-?\d*\.?\d+(px|rem|em)$/;
const CSS_TEXT =
  /\b(margin|padding|gap|row-gap|column-gap)(-(top|right|bottom|left))?\s*:\s*[^;'"`]*\b\d+(px|rem|em)\b/;
const ARBITRARY =
  /(^|\s)-?(m|p|gap|space)[xytrbl]?(-[xy])?-\[\d*\.?\d+(px|rem|em)\]/;

const inClassName = (node: ts.Node) => {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isJsxAttribute(n))
      return /^(className|class)$/.test(n.name.getText());
    if (ts.isPropertyAssignment(n) || ts.isVariableDeclaration(n)) return false;
  }
  return false;
};

export default defineCheck({
  rule: "tokens/space",
  run(ctx) {
    const findings: Finding[] = [];
    for (const n of ctx.walk()) {
      if (
        ts.isPropertyAssignment(n) &&
        SPACE_PROP.test(n.name.getText(ctx.sf))
      ) {
        const v = n.initializer;
        const raw =
          (ts.isNumericLiteral(v) && Number(v.text) !== 0) ||
          ((ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v)) &&
            v.text
              .split(/\s+/)
              .some(
                (part) =>
                  RAW_LENGTH.test(part) && !/^0(px|rem|em)?$/.test(part),
              ));
        if (raw)
          findings.push({
            node: n,
            detail: `${n.name.getText(ctx.sf)}: ${v.getText(ctx.sf)} is a raw spacing value`,
          });
        continue;
      }
      if (
        ts.isStringLiteral(n) ||
        ts.isNoSubstitutionTemplateLiteral(n) ||
        ts.isTemplateHead(n) ||
        ts.isTemplateMiddle(n) ||
        ts.isTemplateTail(n)
      ) {
        const text = (n as ts.LiteralLikeNode).text;
        if (inClassName(n)) {
          if (ARBITRARY.test(text))
            findings.push({
              node: n,
              detail: `arbitrary spacing class in "${text.slice(0, 50)}"`,
            });
        } else if (CSS_TEXT.test(text)) {
          findings.push({
            node: n,
            detail: `raw spacing in CSS "${text.trim().slice(0, 50)}"`,
          });
        }
      }
    }
    for (const el of ctx.elements) {
      for (const name of ["spacing", "rowSpacing", "columnSpacing"]) {
        const v = el.attrs.get(name)?.literal;
        if (typeof v === "number" && v !== 0) {
          findings.push({
            node: el.attrs.get(name)!.node,
            detail: `${el.tag} ${name}={${v}} is not a spacing token`,
            fix: `Use a token, e.g. ${name}="sm".`,
          });
        }
      }
    }
    return result(findings, findings.length ? ["raw values"] : ["tokens"]);
  },
});
