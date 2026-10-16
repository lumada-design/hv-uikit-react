/** HvAvatar/variant: variant must be a value HvAvatar publishes in the installed version. */
import { defineCheck, result, type Finding } from "../../define.js";

export default defineCheck({
  rule: "HvAvatar/variant",
  run(ctx) {
    const allowed =
      ctx.metadata.components.HvAvatar?.props.find((p) => p.name === "variant")
        ?.values ?? [];
    const findings: Finding[] = [];
    for (const el of ctx.byTag("HvAvatar")) {
      const v = el.attrs.get("variant")?.literal;
      if (typeof v === "string" && allowed.length && !allowed.includes(v)) {
        findings.push({
          node: el.attrs.get("variant")!.node,
          detail: `variant "${v}" is not an HvAvatar variant`,
          fix: `Use one of: ${allowed.join(", ")}.`,
        });
      }
    }
    return result(findings);
  },
});
