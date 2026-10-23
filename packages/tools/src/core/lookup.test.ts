import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";

import { printLookup } from "../commands/lookup.js";
import { callTool, MCP_TOOLS } from "../commands/mcp.js";
import { answer, lookup, LookupError } from "./lookup.js";
import type { Component, Metadata } from "./metadata.js";

const dialog: Component = {
  name: "HvDialog",
  displayName: "Dialog",
  purpose: "A Dialog prompts for a response.",
  props: [
    {
      name: "open",
      type: "boolean",
      required: false,
      description: "Current state.",
    },
  ],
  variantSemantics: [
    { name: "warning", description: "asks to review a risky step" },
  ],
  antiPatterns: [
    {
      pattern: "Do not run a destructive action directly",
      why: "no way to stop",
      correct: "Confirm it",
    },
  ],
  validationRules: [
    {
      rule: "title",
      failureMessage: "each dialog must contain HvDialogTitle",
      enforcement: "error",
    },
  ],
};
/** Twelve more components, so the list has more than one page. */
const others: Component[] = Array.from({ length: 12 }, (_, i) => ({
  name: `HvThing${String(i).padStart(2, "0")}`,
  displayName: `Thing${i}`,
  purpose: `Thing ${i}.`,
}));
const metadata: Metadata = {
  version: "7.0.0",
  generatedAt: "",
  components: [dialog, ...others],
};

describe("lookup", () => {
  it("describes a component with its guidance", () => {
    const text = lookup(metadata, { kind: "component", name: "dialog" });
    expect(text).toContain("# HvDialog");
    expect(text).toContain("- `open` (boolean): Current state.");
    expect(text).toContain('- "warning": asks to review a risky step');
    expect(text).toContain(
      "Do not run a destructive action directly: no way to stop. Instead: Confirm it.",
    );
    expect(text).toContain(
      "## Validation rules\n\n- title: each dialog must contain HvDialogTitle (error)",
    );
  });

  it("lists every component, or a page of them", () => {
    const all = lookup(metadata, { kind: "components" });
    expect(all).toContain("(@pentaho/uikit-react-core@7.0.0): 13");
    expect(all).toContain("- HvDialog (guidance): A Dialog prompts");
    expect(all).not.toContain("More:");
    const first = lookup(metadata, { kind: "components", limit: 10 });
    expect(first).toContain(": 1-10 of 13");
    expect(first).toContain("More: offset 10.");
    const last = lookup(metadata, { kind: "components", offset: 10 });
    expect(last).toContain(": 11-13 of 13");
    expect(last).not.toContain("More:");
    expect(() => lookup(metadata, { kind: "components", limit: -1 })).toThrow(
      LookupError,
    );
  });

  it("suggests close names", () => {
    expect(() =>
      lookup(metadata, { kind: "component", name: "HvDialg" }),
    ).toThrow(/Did you mean: HvDialog/);
  });
});

describe("rule lookups read the UI Kit rule files as written", () => {
  it("lists every rule section", () => {
    const text = answer({ kind: "rules" });
    expect(text).toContain("- tokens/colors: Colors.");
    expect(text).toContain("- tokens/typography: Typography.");
    expect(text).toContain("- forms: the whole file is one rule.");
    expect(text).not.toContain("/introduction");
  });

  it("prints a section or a whole file as written", () => {
    const section = answer({ kind: "rule", id: "tokens/colors" });
    expect(section).toContain("# Colors");
    expect(section).toContain("Never use raw hex, rgb, or named colors.");
    expect(answer({ kind: "rule", id: "tokens" })).toMatch(/^# Token Rules/);
  });

  it("suggests ids for an unknown rule", () => {
    expect(() => answer({ kind: "rule", id: "destructive" })).toThrow(
      /Did you mean: actions\/prevent-accidental-and-destructive-actions/,
    );
  });
});

describe("MCP", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "uikit-tools-mcp-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const metadataPath = path.join(dir, "metadata.json");
  writeFileSync(metadataPath, JSON.stringify(metadata));

  /** What the CLI prints for the same request. */
  function cli(request: Parameters<typeof printLookup>[0]) {
    const out: string[] = [];
    const spy = vi
      .spyOn(process.stdout, "write")
      .mockImplementation((chunk) => {
        out.push(String(chunk));
        return true;
      });
    printLookup(request, { metadata: metadataPath });
    spy.mockRestore();
    return out.join("").trimEnd();
  }

  it("offers one tool per lookup", () => {
    expect(MCP_TOOLS.map((t) => t.name)).toEqual([
      "list_components",
      "get_component",
      "list_rules",
      "get_rule",
    ]);
  });

  it.each([
    [
      "get_component",
      { name: "HvDialog" },
      { kind: "component", name: "HvDialog" },
    ],
    ["list_components", {}, { kind: "components" }],
    [
      "list_components",
      { limit: 5, offset: 10 },
      { kind: "components", limit: 5, offset: 10 },
    ],
    ["list_rules", {}, { kind: "rules" }],
    [
      "get_rule",
      { id: "tokens/colors" },
      { kind: "rule", id: "tokens/colors" },
    ],
  ] as const)(
    "%s %o returns exactly what the CLI prints",
    (tool, args, request) => {
      const result = callTool(tool, args, { metadataPath });
      expect(result.isError).toBeUndefined();
      expect(result.content[0].text).toBe(cli(request));
    },
  );

  it("returns errors as tool results instead of throwing", () => {
    expect(
      callTool("get_component", { name: "HvNope" }, { metadataPath }).isError,
    ).toBe(true);
    expect(callTool("nope", {}, { metadataPath }).isError).toBe(true);
    expect(
      callTool("list_components", {}, { cwd: tmpdir() }).content[0].text,
    ).toMatch(/component metadata/);
  });
});
