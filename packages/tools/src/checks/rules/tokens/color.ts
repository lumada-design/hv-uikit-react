/**
 * tokens/color: no raw colors. Flags, in color contexts only (style and CSS
 * properties, color props, CSS text, variables named like colors):
 * hex/rgb/hsl values and CSS named colors; in class names, arbitrary values
 * like `text-[#f00]` and the default palette (`bg-gray-100`, `text-red-500`),
 * which UnoCSS ships but the UI Kit theme does not use. `var(--token, #fallback)`
 * is allowed: the token is what is used. Strings like "#section" or "#add" in
 * links and ids are not color contexts.
 */
import ts from "typescript";

import { defineCheck, result, type Finding } from "../../define.js";

const RAW = /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b|\b(?:rgb|hsl)a?\(/i;
const ARBITRARY = /-\[(?:#|rgb|hsl)/i;
const COLOR_PROP =
  /^(color|background|backgroundColor|borderColor|border|fill|stroke|outline|outlineColor|border(Top|Right|Bottom|Left)Color|boxShadow)$/;
const NAMED =
  /^(white|black|red|green|blue|gray|grey|yellow|orange|purple|pink|brown|navy|teal|silver|maroon|olive|lime|aqua|fuchsia|lightgray|lightgrey|darkgray|darkgrey|whitesmoke|gainsboro)$/i;
const COLOR_NAME =
  /(colou?rs?|background|bg|fill|stroke|palette|border|shadow|theme|styles?)$/i;
const CSS_COLOR_TEXT =
  /\b(color|background(-color)?|border(-\w+)?-color|border|fill|stroke|outline|box-shadow)\s*:/i;
const PALETTE =
  /(^|\s|:)(text|bg|border|ring|fill|stroke|from|via|to|outline|divide|decoration|accent|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(-\d{2,3})?(\/\d+)?(\s|$)/;
const isTokenFallback = (t: string) => /var\(\s*--[\w-]+\s*,/.test(t);

/** Whether a string sits where a color is expected. */
const inColorContext = (
  ctx: { sf: ts.SourceFile },
  node: ts.Node,
  text: string,
) => {
  if (CSS_COLOR_TEXT.test(text)) return true;
  for (let n = node.parent; n; n = n.parent) {
    // { color: "#f00" }, or any key inside { colors: { … } } / const palette = { … }
    if (
      ts.isPropertyAssignment(n) &&
      (COLOR_PROP.test(n.name.getText(ctx.sf)) ||
        COLOR_NAME.test(n.name.getText(ctx.sf)))
    )
      return true;
    if (ts.isVariableDeclaration(n))
      return COLOR_NAME.test(n.name.getText(ctx.sf));
    if (ts.isJsxAttribute(n))
      return (
        COLOR_PROP.test(n.name.getText()) || COLOR_NAME.test(n.name.getText())
      );
    if (ts.isTaggedTemplateExpression(n)) return true; // css`…` / styled.div`…`
    if (ts.isBlock(n) || ts.isSourceFile(n)) return false;
  }
  return false;
};

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
        else if (PALETTE.test(text))
          findings.push({
            node: n,
            detail: `default palette class "${text.match(PALETTE)![0].trim()}" (not a UI Kit theme color)`,
          });
        continue;
      }
      if (!inColorContext(ctx, n, text)) continue;
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
