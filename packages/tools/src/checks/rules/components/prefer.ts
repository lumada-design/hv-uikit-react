/**
 * components/prefer: UI Kit components instead of plain HTML, look-alikes or
 * emoji. Flags native elements that have a UI Kit equivalent, elements styled
 * as cards, tags or pills, and emoji in rendered text.
 */
import ts from "typescript";

import { defineCheck, result, type Finding } from "../../define.js";

const NATIVE: Record<string, string> = {
  button: "HvButton",
  input: "HvInput (or HvCheckBox, HvRadio)",
  select: "HvSelect",
  textarea: "HvTextArea",
  table: "HvTable",
  thead: "HvTableHead",
  tbody: "HvTableBody",
  tr: "HvTableRow",
  th: "HvTableHeader",
  td: "HvTableCell",
  dialog: "HvDialog",
  progress: "HvProgressBar",
  h1: "HvTypography",
  h2: "HvTypography",
  h3: "HvTypography",
  h4: "HvTypography",
  h5: "HvTypography",
  h6: "HvTypography",
};
const LOOK_ALIKE: [RegExp, string][] = [
  [/(^|[\s_-])(card|tile)([\s_-]|$)/i, "HvCard"],
  [
    /(^|[\s_-])(tag|chip|pill|badge|label-status|status-pill)([\s_-]|$)/i,
    "HvTag",
  ],
];
const EMOJI = /\p{Extended_Pictographic}/u;
const NOT_EMOJI = /^[©®™‼⁉↔-↙↩↪⌚⌛⏏]+$/u;

export default defineCheck({
  rule: "components/prefer",
  run(ctx) {
    const findings: Finding[] = [];
    const choices = new Set<string>();
    for (const el of ctx.elements) {
      if (NATIVE[el.tag]) {
        choices.add(`native <${el.tag}>`);
        findings.push({
          node: el.opening,
          detail: `<${el.tag}> where ${NATIVE[el.tag]} exists`,
          fix: `Use ${NATIVE[el.tag]}.`,
        });
        continue;
      }
      if (
        el.tag === "div" ||
        el.tag === "span" ||
        el.tag === "section" ||
        el.tag === "article"
      ) {
        const cls = el.attrs.get("className")?.literal;
        const style = el.attrs.get("style")?.value?.getText(ctx.sf) ?? "";
        for (const [re, component] of LOOK_ALIKE) {
          if (typeof cls === "string" && re.test(cls)) {
            choices.add(`look-alike ${component}`);
            findings.push({
              node: el.opening,
              detail: `<${el.tag} className="${cls.slice(0, 40)}"> looks like a ${component}`,
              fix: `Use ${component}.`,
            });
          }
        }
        if (/boxShadow/.test(style) && /borderRadius/.test(style)) {
          choices.add("look-alike HvCard");
          findings.push({
            node: el.opening,
            detail: `<${el.tag}> styled with a shadow and radius looks like a card`,
            fix: "Use HvCard.",
          });
        }
      }
      if (/^Hv(Card|Tag|StatusIcon)$/.test(el.tag)) choices.add(el.tag);
    }
    for (const n of ctx.walk()) {
      const rendered =
        ts.isJsxText(n) ||
        ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) &&
          (ts.isJsxExpression(n.parent) || ts.isJsxAttribute(n.parent)));
      if (!rendered) continue;
      const text = (n as ts.JsxText | ts.StringLiteral).text;
      const chars = [...text].filter(
        (c) => EMOJI.test(c) && !NOT_EMOJI.test(c),
      );
      if (chars.length) {
        choices.add("emoji");
        findings.push({
          node: n,
          detail: `emoji ${chars.slice(0, 3).join("")} used in the UI`,
          fix: "Use an icon from @pentaho/uikit-react-icons.",
        });
      }
    }
    return result(findings, [...choices]);
  },
});
