/**
 * tokens/color: no raw colors. Flags hex/rgb/hsl values in any string outside
 * utility class names (arbitrary values like `text-[#f00]` are flagged), and
 * CSS named colors in color-like style properties. `var(--token, #fallback)` is
 * allowed: the token is what is used.
 */
import ts from "typescript";

import { defineCheck, result, type Finding } from "../../define.js";

const RAW = /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b|\b(?:rgb|hsl)a?\(/i;
const ARBITRARY = /-\[(?:#|rgb|hsl)/i;
const COLOR_PROP =
  /^(color|background|backgroundColor|borderColor|border|fill|stroke|outline|outlineColor|border(Top|Right|Bottom|Left)Color|boxShadow)$/;
const NAMED =
  /^(white|black|red|green|blue|gray|grey|yellow|orange|purple|pink|brown|navy|teal|silver|maroon|olive|lime|aqua|fuchsia|lightgray|lightgrey|darkgray|darkgrey|whitesmoke|gainsboro)$/i;
const isTokenFallback = (t: string) => /var\(\s*--[\w-]+\s*,/.test(t);

const inClassName = (node: ts.Node) => {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isJsxAttribute(n))
      return /^(className|class)$/.test(n.name.getText());
    if (ts.isPropertyAssignment(n) || ts.isVariableDeclaration(n)) return false;
  }
  return false;
};

export default defineCheck({
  rule: "tokens/color",
  run(ctx) {
    const findings: Finding[] = [];
    for (const n of ctx.walk()) {
      if (ts.isImportDeclaration(n.parent ?? n)) continue;
      const isText =
        ts.isStringLiteral(n) ||
        ts.isNoSubstitutionTemplateLiteral(n) ||
        ts.isTemplateHead(n) ||
        ts.isTemplateMiddle(n) ||
        ts.isTemplateTail(n);
      if (!isText) continue;
      const text = (n as ts.LiteralLikeNode).text;
      if (inClassName(n)) {
        if (ARBITRARY.test(text))
          findings.push({
            node: n,
            detail: `arbitrary color class in "${text.slice(0, 50)}"`,
          });
        continue;
      }
      if (RAW.test(text) && !isTokenFallback(text)) {
        findings.push({ node: n, detail: `raw color "${text.slice(0, 40)}"` });
        continue;
      }
      const p = n.parent;
      if (
        ts.isPropertyAssignment(p) &&
        p.initializer === n &&
        COLOR_PROP.test(p.name.getText(ctx.sf)) &&
        NAMED.test(text.trim())
      ) {
        findings.push({
          node: n,
          detail: `named color "${text}" in ${p.name.getText(ctx.sf)}`,
        });
      }
    }
    return result(findings, findings.length ? ["raw values"] : ["tokens"]);
  },
});
