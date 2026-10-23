#!/usr/bin/env node
/* eslint-disable no-console -- command-line script */
/**
 * End-to-end check in an app outside the repo:
 *
 * 1. The CLI and the MCP server return the same lookup result.
 * 2. AGENTS.md points to the UI Kit rules in the installed uikit-tools, and upgrades
 *    reach agents without re-running init.
 * 3. `check` runs in the app and reports file, line, rule id and fix.
 *
 * Needs built packages: `npm run build -w packages/core && npm run build -w packages/tools`.
 * Usage: node packages/tools/scripts/e2e-outside-repo.mjs [--keep]
 */
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const repo = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const work = mkdtempSync(path.join(tmpdir(), "uikit-tools-e2e-"));
const packs = path.join(work, "packs");
const app = path.join(work, "app");
const keep = process.argv.includes("--keep");

const run = (cmd, args, cwd, options = {}) =>
  execFileSync(cmd, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
const tool = (args, options) => {
  try {
    return {
      code: 0,
      out: run("npx", ["--no-install", "uikit-tools", ...args], app, options),
    };
  } catch (error) {
    return { code: error.status, out: error.stdout, err: error.stderr };
  }
};

let failures = 0;
function assert(ok, message) {
  console.log(`${ok ? "✓" : "✗"} ${message}`);
  if (!ok) failures += 1;
}

function pack(workspace, destination) {
  mkdirSync(destination, { recursive: true });
  const out = run(
    "npm",
    ["pack", "-w", workspace, "--pack-destination", destination, "--json"],
    repo,
  );
  return path.join(destination, JSON.parse(out)[0].filename);
}

/** A tarball as a later release would ship it: new version, with `change` applied to its files. */
function upgraded(tgz, name, change) {
  const dir = path.join(work, `${name}-next`);
  mkdirSync(dir, { recursive: true });
  run("tar", ["-xzf", tgz, "-C", dir]);
  const pkgDir = path.join(dir, "package");
  const pkgFile = path.join(pkgDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgFile, "utf8"));
  pkg.version = `${pkg.version}-e2e.1`;
  writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
  change(pkgDir, pkg.version);
  const out = run("npm", ["pack", "--pack-destination", dir, "--json"], pkgDir);
  return {
    tgz: path.join(dir, JSON.parse(out)[0].filename),
    version: pkg.version,
  };
}

/** The tool names the app's MCP server offers. */
async function mcpToolNames() {
  const transport = new StdioClientTransport({
    command: "sh",
    args: ["-c", `cd "${app}" && exec npx --no-install uikit-tools mcp`],
    stderr: "ignore",
  });
  const client = new Client(
    { name: "e2e", version: "0" },
    { capabilities: {} },
  );
  await client.connect(transport);
  try {
    return (await client.listTools()).tools.map((t) => t.name);
  } finally {
    await client.close();
  }
}

async function mcpCall(name, args) {
  const transport = new StdioClientTransport({
    command: "sh",
    args: ["-c", `cd "${app}" && exec npx --no-install uikit-tools mcp`],
    stderr: "ignore",
  });
  const client = new Client(
    { name: "e2e", version: "0" },
    { capabilities: {} },
  );
  await client.connect(transport);
  try {
    const result = await client.callTool({ name, arguments: args });
    return result.content.map((c) => c.text).join("\n");
  } finally {
    await client.close();
  }
}

try {
  console.log(`Working in ${work}`);
  const coreTgz = pack("packages/core", packs);
  const toolsTgz = pack("packages/tools", packs);

  mkdirSync(path.join(app, "src/pages/Assets"), { recursive: true });
  writeFileSync(
    path.join(app, "package.json"),
    JSON.stringify({ name: "e2e-app", private: true, type: "module" }),
  );
  // --legacy-peer-deps: lookups and checks don't need React or MUI installed
  run(
    "npm",
    [
      "install",
      "--no-audit",
      "--no-fund",
      "--legacy-peer-deps",
      coreTgz,
      toolsTgz,
    ],
    app,
  );

  // 1. CLI and MCP return the same result
  for (const [cli, mcp, args] of [
    [["info", "HvDialog"], "get_component", { name: "HvDialog" }],
    [["components"], "list_components", {}],
    [
      ["components", "--limit", "5", "--offset", "10"],
      "list_components",
      { limit: 5, offset: 10 },
    ],
    [["rules"], "list_rules", {}],
    [["rule", "tokens/colors"], "get_rule", { id: "tokens/colors" }],
  ]) {
    const fromCli = tool(cli).out.trim();
    const fromMcp = (await mcpCall(mcp, args)).trim();
    assert(
      fromCli.length > 0 && fromCli === fromMcp,
      `uikit-tools ${cli.join(" ")} = MCP ${mcp} (${fromCli.length} chars)`,
    );
  }

  // The docs page names exactly the commands and MCP tools that exist
  const page = readFileSync(
    path.join(repo, "apps/docs/src/content/docs/working-with-ai.mdx"),
    "utf8",
  );
  const rows = page
    .split("\n")
    .filter((line) => /^\| .*`uikit-tools /.test(line));
  const documented = new Set(
    rows.map((line) => line.match(/`uikit-tools (\w+)/)[1]),
  );
  const documentedTools = new Set(
    rows.flatMap((line) => {
      const cell = line.split("|").at(-2).trim();
      return cell.startsWith("`") ? [cell.replaceAll("`", "")] : [];
    }),
  );
  const help = tool(["--help"]).out;
  const commands = new Set(
    [...help.matchAll(/^ {2}(\w+)(?: |\[|<)/gm)]
      .map((m) => m[1])
      .filter((c) => c !== "help"),
  );
  const tools = new Set(await mcpToolNames());
  const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
  assert(
    same(documented, commands),
    `the docs page lists the CLI commands: ${[...commands].join(", ")}`,
  );
  assert(
    same(documentedTools, tools),
    `the docs page lists the MCP tools: ${[...tools].join(", ")}`,
  );

  // 2. init points at the installed rules; upgrades reach agents with no re-init
  const init = tool(["init"]);
  assert(init.code === 0, "init succeeds outside the repo");
  const agentsMd = readFileSync(path.join(app, "AGENTS.md"), "utf8");
  const ruleRefs = [...agentsMd.matchAll(/^@(.+\.md)$/gm)].map((m) => m[1]);
  const rulesDir = "node_modules/@pentaho/uikit-tools/templates/rules";
  assert(
    ruleRefs.length === 7 &&
      ruleRefs.every((ref) => ref.startsWith(`${rulesDir}/`)),
    `AGENTS.md points at the ${ruleRefs.length} rule files in ${rulesDir}`,
  );
  assert(
    ruleRefs.every(
      (ref) =>
        readFileSync(path.join(app, ref), "utf8") ===
        readFileSync(
          path.join(repo, "packages/tools/templates/rules", path.basename(ref)),
          "utf8",
        ),
    ),
    "the rule files are the UI Kit rules as written",
  );
  assert(
    readFileSync(path.join(app, "CLAUDE.md"), "utf8").includes("@AGENTS.md"),
    "CLAUDE.md imports AGENTS.md",
  );

  const nextTools = upgraded(toolsTgz, "tools", (dir) => {
    const tokens = path.join(dir, "templates/rules/tokens.md");
    writeFileSync(
      tokens,
      `${readFileSync(tokens, "utf8")}\n<!-- e2e: upgraded rules -->\n`,
    );
  });
  const nextCore = upgraded(coreTgz, "core", (dir, version) => {
    const meta = path.join(dir, "dist/component-metadata.json");
    writeFileSync(
      meta,
      JSON.stringify({ ...JSON.parse(readFileSync(meta, "utf8")), version }),
    );
  });
  run(
    "npm",
    [
      "install",
      "--no-audit",
      "--no-fund",
      "--legacy-peer-deps",
      nextTools.tgz,
      nextCore.tgz,
    ],
    app,
  );
  assert(
    readFileSync(path.join(app, "AGENTS.md"), "utf8") === agentsMd,
    "AGENTS.md unchanged by the upgrades",
  );
  assert(
    readFileSync(path.join(app, rulesDir, "tokens.md"), "utf8").includes(
      "e2e: upgraded rules",
    ),
    `the rules AGENTS.md points at are the upgraded ones (${nextTools.version})`,
  );
  assert(
    tool(["components"]).out.includes(nextCore.version),
    `lookups read the upgraded UI Kit ${nextCore.version}`,
  );

  // 3. check reports file, line, rule and fix
  writeFileSync(
    path.join(app, "src/pages/Assets/index.tsx"),
    [
      'import { HvButton } from "@pentaho/uikit-react-core";',
      "declare function deleteAsset(id: string): void;",
      "export function Component() {",
      "  return (",
      '    <div style={{ padding: 13, color: "#E53935" }}>',
      "      <h1>Assets</h1>",
      "      <button>Refresh</button>",
      '      <HvButton onClick={() => deleteAsset("a")}>Delete</HvButton>',
      "    </div>",
      "  );",
      "}",
    ].join("\n"),
  );
  const check = tool(["check", "src/**/*.tsx", "--format", "json"]);
  const report = JSON.parse(check.out);
  const rules = [...new Set(report.violations.map((v) => v.rule))].toSorted();
  assert(
    check.code === 1,
    `check exits 1 with ${report.violations.length} violations`,
  );
  assert(
    JSON.stringify(rules) ===
      JSON.stringify([
        "actions/prevent-accidental-and-destructive-actions",
        "anti-patterns/prefer-ui-kit-components",
        "tokens/colors",
        "tokens/spacing",
      ]),
    `check finds ${rules.join(", ")}`,
  );
  assert(
    report.violations.every((v) => v.file && v.line > 0 && v.rule && v.fix),
    "every violation has file, line, rule and fix",
  );
} catch (error) {
  failures += 1;
  console.error(error.stderr ?? error);
} finally {
  if (!keep) rmSync(work, { recursive: true, force: true });
}

console.log(
  failures === 0
    ? "\nAll end-to-end checks passed."
    : `\n${failures} end-to-end check(s) failed.`,
);
process.exit(failures === 0 ? 0 : 1);
