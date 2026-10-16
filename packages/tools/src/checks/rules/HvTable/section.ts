/** HvTable/section: an HvTable is rendered inside an HvTableSection (in the same file). */
import { defineCheck, result, type Finding } from "../../define.js";

export default defineCheck({
  rule: "HvTable/section",
  run(ctx) {
    const findings: Finding[] = [];
    const choices: string[] = [];
    for (const el of ctx.byTag("HvTable")) {
      const inSection = ctx.isInside(el.element, "HvTableSection");
      choices.push(inSection ? "HvTableSection" : "no section");
      if (!inSection)
        findings.push({
          node: el.opening,
          detail: "HvTable is not inside an HvTableSection",
        });
    }
    return result(findings, choices);
  },
});
