/** HvAvatar/alt: an HvAvatar with src (or srcSet) needs alt. */
import { defineCheck, result, type Finding } from "../../define.js";

export default defineCheck({
  rule: "HvAvatar/alt",
  run(ctx) {
    const findings: Finding[] = [];
    for (const el of ctx.byTag("HvAvatar")) {
      if (
        (el.attrs.has("src") || el.attrs.has("srcSet")) &&
        !el.attrs.has("alt")
      ) {
        findings.push({
          node: el.opening,
          detail: "HvAvatar has src but no alt",
        });
      }
    }
    return result(findings);
  },
});
