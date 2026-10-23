import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { loadRules } from "./rules.js";

const coreSrc = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../core/src",
);

/** Every `rule <id>` cited in a JSDoc line of the core components. */
function citedRuleIds() {
  const cited: { file: string; id: string }[] = [];
  for (const file of readdirSync(coreSrc, { recursive: true })) {
    if (typeof file !== "string" || !file.endsWith(".tsx")) continue;
    const text = readFileSync(path.join(coreSrc, file), "utf8");
    for (const line of text.split("\n")) {
      if (!line.trimStart().startsWith("*")) continue;
      for (const m of line.matchAll(/\brule ([a-z-]+\/[a-z0-9-]+)/g))
        cited.push({ file, id: m[1] });
    }
  }
  return cited;
}

describe("component guidance cites rules by id", () => {
  it("every cited rule id exists in the rule files", () => {
    const ids = new Set(
      loadRules().flatMap((f) => [f.id, ...f.sections.map((s) => s.id)]),
    );
    const cited = citedRuleIds();
    expect(cited.length).toBeGreaterThan(0);
    expect(cited.filter((c) => !ids.has(c.id))).toEqual([]);
  });
});
