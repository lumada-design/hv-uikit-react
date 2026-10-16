/** HvButton/variant: variant must be a value HvButton publishes in the installed version. */
import { defineCheck, result, type Finding } from "../../define.js";

export default defineCheck({
  rule: "HvButton/variant",
  run(ctx) {
    const allowed =
      ctx.metadata.components.HvButton?.props.find((p) => p.name === "variant")
        ?.values ?? [];
    const findings: Finding[] = [];
    const choices: string[] = [];
    for (const el of ctx.byTag("HvButton")) {
      const v = el.attrs.get("variant")?.literal;
      if (typeof v !== "string") continue;
      choices.push(v);
      if (allowed.length && !allowed.includes(v)) {
        findings.push({
          node: el.attrs.get("variant")!.node,
          detail: `variant "${v}" is not an HvButton variant`,
          fix: `Use one of: ${allowed.join(", ")}.`,
        });
      }
    }
    return result(findings, choices);
  },
});
