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

import { agentsBlock, runInit, upsertBlock } from "./commands/init.js";
import { createServer } from "./commands/mcp.js";
import {
  getComponent,
  getRule,
  listComponents,
  loadMetadata,
  query,
} from "./core/index.js";
import { validateFile, validateFiles } from "./validation/validator.js";

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

describe("validate", () => {
  it("reports the POC fixture's violations by rule id with the rule text", () => {
    const { metadata } = loadMetadata(consumer);
    const violations = validateFiles(
      [path.join(toolsDir, "test-fixtures/validation-violations.tsx")],
      metadata,
    );
    const ids = new Set(violations.map((v) => v.ruleId));
    expect([...ids].toSorted()).toEqual([
      "HvAvatar/alt",
      "HvAvatar/group-background",
      "HvAvatar/image-and-initials",
      "HvAvatar/variant",
      "HvButton/icon-name",
      "HvButton/selected-toggle",
      "HvButton/variant",
      "tokens/color",
    ]);
    const color = violations.find((v) => v.ruleId === "tokens/color")!;
    expect(color.ruleText).toContain(metadata.rules["tokens/color"].title);
  });

  it("reads whole tags across lines, arrow functions and spreads", () => {
    const { metadata } = loadMetadata(consumer);
    const file = path.join(consumer, "Tags.tsx");
    fs.writeFileSync(
      file,
      [
        "<HvButton onClick={() => remove(id)} icon>x</HvButton>",
        "<HvButton",
        "  onClick={() => { if (a > b) go(); }}",
        '  style={{ color: "#f00" }}',
        "  {...rest}",
        ">Save</HvButton>",
        "<HvButtonBase icon />",
      ].join("\n"),
    );
    const found = validateFile(file, metadata).map(
      (v) => `${v.line} ${v.ruleId}`,
    );
    expect(found).toEqual(["1 HvButton/icon-name", "2 tokens/color"]);
  });
});
