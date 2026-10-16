/**
 * Runs against the metadata built into packages/core/dist/agents
 * (`npm run build:agents -w packages/core` first) and the built CLI
 * (`npm test` builds it first). The consumer project used by
 * these tests is a temp dir with the core package linked into node_modules, so
 * resolution goes through node_modules exactly as in a real consumer.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  checkedRules,
  loadChecks,
  parityProblems,
  runChecks,
} from "./checks/engine.js";
import { runGate } from "./commands/check.js";
import { agentsBlock, runInit, upsertBlock } from "./commands/init.js";
import { createServer } from "./commands/mcp.js";
import {
  getComponent,
  getRule,
  listComponents,
  loadMetadata,
  query,
} from "./core/index.js";

const GUIDE_PATH =
  "node_modules/@pentaho/uikit-react-core/dist/agents/guide.md";

const toolsDir = path.resolve(import.meta.dirname, "..");
const coreDir = path.resolve(toolsDir, "../core");
const cli = path.join(toolsDir, "dist", "cli.js");

let consumer: string;

beforeAll(() => {
  if (!fs.existsSync(path.join(coreDir, "dist/agents/metadata.json"))) {
    throw new Error(
      "Run `npm run build:agents -w packages/core` before these tests.",
    );
  }
  consumer = fs.mkdtempSync(path.join(os.tmpdir(), "uikit-consumer-"));
  fs.writeFileSync(
    path.join(consumer, "package.json"),
    '{ "name": "consumer", "private": true }',
  );
  const scope = path.join(consumer, "node_modules", "@pentaho");
  fs.mkdirSync(scope, { recursive: true });
  fs.symlinkSync(coreDir, path.join(scope, "uikit-react-core"), "dir");
});

afterAll(() => fs.rmSync(consumer, { recursive: true, force: true }));

describe("lookups", () => {
  it("loads the metadata of the core package installed for the project", () => {
    const { metadata, packageDir } = loadMetadata(consumer);
    expect(fs.realpathSync(packageDir)).toBe(fs.realpathSync(coreDir));
    expect(metadata.schemaVersion).toBe(1);
  });

  it("finds components case-insensitively and with or without the Hv prefix", () => {
    const { metadata } = loadMetadata(consumer);
    for (const name of ["HvButton", "hvbutton", "Button"]) {
      const r = getComponent(metadata, name);
      expect(r.ok && r.value.name).toBe("HvButton");
    }
  });

  it("returns props, variant meanings and rule summaries for a component", () => {
    const { metadata } = loadMetadata(consumer);
    const r = getComponent(metadata, "HvDialog");
    if (!r.ok) throw new Error(r.error);
    expect(r.value.props.map((p) => p.name)).toContain("open");
    expect(Object.keys(r.value.variants)).toEqual([
      "success",
      "error",
      "warning",
    ]);
    expect(r.value.ruleSummaries.map((s) => s.id)).toContain(
      "destructive/confirm",
    );
  });

  it("resolves design rules and component rules by id", () => {
    const { metadata } = loadMetadata(consumer);
    const design = getRule(metadata, "tokens/color");
    expect(design.ok && design.value.kind).toBe("design");
    const component = getRule(metadata, "HvButton/variant");
    expect(component.ok && component.value.kind).toBe("component");
  });

  it("suggests close matches when a lookup misses", () => {
    const { metadata } = loadMetadata(consumer);
    const r = getRule(metadata, "tokens");
    expect(!r.ok && r.error).toMatch(/Did you mean .*tokens\/color/);
  });

  it("answers for parts named by a contract, with props only", () => {
    const { metadata } = loadMetadata(consumer);
    const r = getComponent(metadata, "HvTableSection");
    if (!r.ok) throw new Error(r.error);
    expect(r.value.partOf).toContain("HvTable");
    expect(r.value.props.map((p) => p.name)).toContain("actions");
    expect(listComponents(metadata).map((c) => c.name)).not.toContain(
      "HvTableSection",
    );
  });
});

describe("rules and metadata", () => {
  it("gives every rule the required fields and an enforcement", () => {
    const { metadata } = loadMetadata(consumer);
    const rules = Object.values(metadata.rules);
    expect(rules).toHaveLength(8);
    for (const r of rules) {
      for (const field of [
        "id",
        "title",
        "rule",
        "rationale",
        "do",
        "dont",
      ] as const) {
        expect(r[field], `${r.id}.${field}`).toBeTruthy();
      }
      expect(["checked", "context"]).toContain(r.enforcement);
    }
  });

  it("covers the ten story components with props and rules", () => {
    const { metadata } = loadMetadata(consumer);
    const ten = [
      "HvButton",
      "HvDialog",
      "HvTable",
      "HvPagination",
      "HvLoading",
      "HvEmptyState",
      "HvDatePicker",
      "HvTag",
      "HvGlobalActions",
      "HvCard",
    ];
    for (const name of ten) {
      const c = metadata.components[name];
      expect(c, name).toBeDefined();
      expect(c.props.length, `${name} props`).toBeGreaterThan(0);
      expect(c.rules.length, `${name} rules`).toBeGreaterThan(0);
    }
  });
});

describe("CLI and MCP return the same result", () => {
  const cases = [
    {
      tool: "get_component",
      args: { component: "HvTable" },
      cli: ["info", "HvTable"],
    },
    {
      tool: "get_rule",
      args: { id: "date/format" },
      cli: ["rule", "date/format"],
    },
    {
      tool: "get_rule",
      args: { id: "HvAvatar/alt" },
      cli: ["rule", "HvAvatar/alt"],
    },
    { tool: "list_components", args: {}, cli: ["info"] },
    { tool: "list_rules", args: {}, cli: ["rule"] },
  ];

  let client: Client;
  beforeAll(async () => {
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();
    await createServer(consumer).connect(serverTransport);
    client = new Client({ name: "test", version: "0" }, { capabilities: {} });
    await client.connect(clientTransport);
  });

  for (const c of cases) {
    for (const format of ["text", "json"] as const) {
      it(`${c.cli.join(" ")} (${format})`, async () => {
        const viaCli = execFileSync(
          "node",
          [cli, ...c.cli, ...(format === "json" ? ["--json"] : [])],
          {
            cwd: consumer,
            encoding: "utf8",
          },
        );
        const viaMcp = await client.callTool({
          name: c.tool,
          arguments: { ...c.args, format },
        });
        const text = (viaMcp.content as { type: string; text: string }[])[0]
          .text;
        expect(text).toBe(viaCli);
      });
    }
  }

  it("reports a missing component as an error in both", async () => {
    const viaMcp = await client.callTool({
      name: "get_component",
      arguments: { component: "HvNope" },
    });
    expect(viaMcp.isError).toBe(true);
    expect(
      query({ kind: "component", name: "HvNope" }, { cwd: consumer }).isError,
    ).toBe(true);
  });
});

describe("init", () => {
  it("writes only a pointer to the installed guide plus the MCP config", () => {
    const result = runInit(consumer, "claude");
    const agents = fs.readFileSync(path.join(consumer, "AGENTS.md"), "utf8");
    expect(agents).toContain(GUIDE_PATH);
    expect(agents).not.toContain("## Rules"); // no copy of the guide
    expect(fs.readFileSync(path.join(consumer, "CLAUDE.md"), "utf8")).toContain(
      `@${GUIDE_PATH}`,
    );
    const mcp = JSON.parse(
      fs.readFileSync(path.join(consumer, ".mcp.json"), "utf8"),
    );
    expect(mcp.mcpServers["hv-uikit"].args).toEqual([
      "--no-install",
      "uikit-tools",
      "mcp",
    ]);
    expect(fs.existsSync(path.join(consumer, GUIDE_PATH))).toBe(true);
    expect(result.written).toHaveLength(3);
  });

  it("registers the server for Copilot in .vscode/mcp.json", () => {
    runInit(consumer, "copilot");
    const mcp = JSON.parse(
      fs.readFileSync(path.join(consumer, ".vscode/mcp.json"), "utf8"),
    );
    expect(mcp.servers["hv-uikit"].type).toBe("stdio");
  });

  it("replaces its own block and keeps the rest of AGENTS.md", () => {
    const mine = "# My project\n\nOur own rules.\n";
    const once = upsertBlock(mine, agentsBlock(GUIDE_PATH));
    const twice = upsertBlock(once, agentsBlock(GUIDE_PATH));
    expect(twice).toBe(once);
    expect(twice.startsWith(mine.trimEnd())).toBe(true);
  });

  it("points at the hoisted UI Kit from a workspace package", () => {
    const pkg = path.join(consumer, "packages", "app");
    fs.mkdirSync(pkg, { recursive: true });
    const result = runInit(pkg, "copilot");
    expect(result.guidePointer).toBe(`../../${GUIDE_PATH}`);
    expect(fs.readFileSync(path.join(pkg, "AGENTS.md"), "utf8")).toContain(
      `../../${GUIDE_PATH}`,
    );
  });

  it("leaves an MCP config with comments untouched and reports the entry to add", () => {
    const pkg = path.join(consumer, "packages", "commented");
    fs.mkdirSync(path.join(pkg, ".vscode"), { recursive: true });
    const file = path.join(pkg, ".vscode", "mcp.json");
    const original = '{\n  // our servers\n  "servers": {}\n}\n';
    fs.writeFileSync(file, original);
    const result = runInit(pkg, "copilot");
    expect(fs.readFileSync(file, "utf8")).toBe(original);
    expect(result.manual[0].add).toContain('"hv-uikit"');
  });
});

describe("check", () => {
  const app = path.join(toolsDir, "test-fixtures", "app");

  it("has a check for every checked rule and no check without one", async () => {
    const { metadata } = loadMetadata(consumer);
    const checks = await loadChecks();
    expect(parityProblems(checks, metadata)).toEqual([]);
    expect(checks.map((c) => c.rule).toSorted()).toEqual(
      checkedRules(metadata),
    );
    expect(checkedRules(metadata)).toEqual(
      expect.arrayContaining([
        "components/prefer",
        "date/format",
        "destructive/confirm",
        "layout/page",
        "tokens/color",
        "tokens/space",
      ]),
    );
  });

  it("reports every checked rule on the off-system fixture, by file, line, rule and fix", async () => {
    const { metadata } = loadMetadata(consumer);
    const report = runChecks(
      await loadChecks(),
      metadata,
      ["src/pages/OffSystem.tsx"],
      app,
    );
    const found = report.violations.map((v) => `${v.line} ${v.rule}`);
    expect(found).toEqual([
      "18 date/format",
      "21 destructive/confirm",
      "23 layout/page",
      "23 tokens/space",
      "23 tokens/color",
      "24 components/prefer",
      "24 components/prefer",
      "25 HvButton/variant",
      "26 HvButton/icon-name",
      "26 destructive/confirm",
      "29 components/prefer",
      "30 HvAvatar/alt",
      "31 HvAvatar/variant",
      "32 components/prefer",
      "33 components/prefer",
      "34 date/format",
      "35 HvTable/section",
      "39 destructive/confirm",
      "43 destructive/confirm",
      "46 tokens/color",
      "46 tokens/space",
    ]);
    expect(Object.values(report.counts).every((n) => n > 0)).toBe(true);
    const warning = report.violations.find((v) => v.line === 39)!;
    expect(warning.file).toBe("src/pages/OffSystem.tsx");
    expect(warning.detail).toBe('delete dialog uses variant="warning"');
    const space = report.violations.find((v) => v.rule === "tokens/space")!;
    expect(space.fix).toBe(metadata.rules["tokens/space"].fix);
  });

  it("passes the on-system page from the 7487 run", async () => {
    const { metadata } = loadMetadata(consumer);
    const report = runChecks(
      await loadChecks(),
      metadata,
      ["src/pages/OnSystem.tsx"],
      app,
    );
    expect(report.violations).toEqual([]);
    expect(report.choices["destructive/confirm"]).toContain("HvDialog");
  });

  it("gate: returns violations for up to 3 rounds, then lets the agent stop", async () => {
    const { metadata } = loadMetadata(consumer);
    const report = runChecks(
      await loadChecks(),
      metadata,
      ["src/pages/OffSystem.tsx"],
      app,
    );
    const state = path.join(consumer, "gate.json");
    const codes = [1, 2, 3, 4].map(() => runGate(report, state, 3).exitCode);
    expect(codes).toEqual([2, 2, 2, 0]);
    const final = JSON.parse(fs.readFileSync(state, "utf8"));
    expect(final.rounds).toHaveLength(3);
    expect(final.passed).toBe(false);
    const clean = runChecks(
      await loadChecks(),
      metadata,
      ["src/pages/OnSystem.tsx"],
      app,
    );
    const fresh = path.join(consumer, "gate-clean.json");
    expect(runGate(clean, fresh, 3).exitCode).toBe(0);
    expect(JSON.parse(fs.readFileSync(fresh, "utf8")).passed).toBe(true);
  });

  it("adds a checked rule with only its metadata entry and its check file", async () => {
    const { metadata } = loadMetadata(consumer);
    const withRule = structuredClone(metadata);
    withRule.rules["copy/no-lorem"] = {
      ...metadata.rules["tokens/color"],
      id: "copy/no-lorem",
      title: "No placeholder copy",
      fix: "Write real copy.",
    };
    // A copy of the checks plus one new file: nothing else changes.
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "checks-"));
    fs.cpSync(path.join(toolsDir, "src", "checks"), root, { recursive: true });
    const dir = path.join(root, "rules");
    fs.mkdirSync(path.join(dir, "copy"));
    fs.writeFileSync(
      path.join(dir, "copy", "no-lorem.ts"),
      `import ts from "typescript";
export default {
  rule: "copy/no-lorem",
  run(ctx: any) {
    const findings = [...ctx.walk()]
      .filter((n: any) => ts.isJsxText(n) && /lorem/i.test(n.text))
      .map((node: any) => ({ node, detail: "placeholder copy" }));
    return { findings, choices: [] };
  },
};
`,
    );
    const target = path.join(consumer, "lorem");
    fs.mkdirSync(path.join(target, "src"), { recursive: true });
    fs.writeFileSync(
      path.join(target, "src", "A.tsx"),
      "export const A = () => <p>Lorem ipsum</p>;\n",
    );

    const checks = await loadChecks(dir);
    expect(parityProblems(checks, metadata)).toEqual([
      'check "copy/no-lorem" has no rule in @pentaho/uikit-react-core@7.0.0',
    ]);
    expect(parityProblems(checks, withRule)).toEqual([]);
    const report = runChecks(checks, withRule, undefined, target);
    expect(report.violations.map((v) => `${v.rule} ${v.fix}`)).toContain(
      "copy/no-lorem Write real copy.",
    );
  });
});
