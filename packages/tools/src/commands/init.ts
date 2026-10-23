import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { loadMetadata } from "../core/metadata.js";

export type Agent = "claude" | "copilot";
const AGENTS: Agent[] = ["claude", "copilot"];

export interface InitOptions {
  agents?: string;
}

const TOOLS = "@pentaho/uikit-tools";
/** The UI Kit rule files in `templates/rules`, in reading order. */
export const RULE_FILES = [
  "tokens.md",
  "accessibility.md",
  "forms.md",
  "layout.md",
  "actions.md",
  "anti-patterns.md",
  "workflow.md",
];
const START = "<!-- uikit-tools:start -->";
const END = "<!-- uikit-tools:end -->";
const SERVER = { command: "npx", args: ["--no-install", "uikit-tools", "mcp"] };

/** The AGENTS.md block: pointers to the rules shipped in the installed uikit-tools, never a copy. */
export function agentsBlock(rulesPath: string) {
  return [
    START,
    "## HV UI Kit",
    "",
    "This app's UI is built with HV UI Kit. Before writing or changing UI, read the UI Kit design rules. They ship with the installed `@pentaho/uikit-tools`, so they are always the version this project uses:",
    "",
    ...RULE_FILES.map((file) => `@${rulesPath}/${file}`),
    "",
    "- Look up a component before using it: `npx --no-install uikit-tools info <Component>`.",
    "- If your tool doesn't load the files above, list the rules with `npx --no-install uikit-tools rules` (MCP: `list_rules`) and read each with `rule <id>` (MCP: `get_rule`).",
    "- The `hv-uikit` MCP server answers the same lookups: `list_components`, `get_component`, `list_rules` and `get_rule`.",
    "",
    "This block is written by `uikit-tools init`. Re-run it instead of editing the block.",
    END,
  ].join("\n");
}

/** Insert or replace the block, keeping everything else in the file. */
export function upsertBlock(existing: string, block: string) {
  const start = existing.indexOf(START);
  const end = existing.indexOf(END);
  if (start !== -1 && end < start) {
    throw new Error(
      `AGENTS.md has "${START}" without a matching "${END}". Fix the block by hand and run init again.`,
    );
  }
  if (start !== -1) {
    return `${existing.slice(0, start)}${block}${existing.slice(end + END.length)}`;
  }
  const trimmed = existing.trimEnd();
  return `${trimmed}${trimmed ? "\n\n" : ""}${block}\n`;
}

function readJson(file: string): Record<string, any> {
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(
      `Cannot update ${file}: it is not valid JSON. Fix or remove it and run init again.`,
      {
        cause: error,
      },
    );
  }
}

function writeJson(file: string, value: unknown) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export interface InitResult {
  written: string[];
  /** Path from the project to the rule files, through node_modules. */
  rulesPath: string;
}

/**
 * Path from `dir` to the installed uikit-tools' rules through `node_modules/@pentaho/uikit-tools`,
 * never through the resolved real path: pnpm's real path contains the version
 * (`node_modules/.pnpm/@pentaho+uikit-tools@1.0.0/...`), which an upgrade removes.
 */
function rulesPointer(dir: string) {
  for (let base = dir; ; base = path.dirname(base)) {
    const linked = path.join(base, "node_modules", ...TOOLS.split("/"));
    if (existsSync(path.join(linked, "templates", "rules"))) {
      return path
        .relative(dir, path.join(linked, "templates", "rules"))
        .split(path.sep)
        .join("/");
    }
    if (path.dirname(base) === base) break;
  }
  throw new Error(
    `Couldn't find node_modules/${TOOLS}/templates/rules from ${dir}. Install ${TOOLS} in the project: npm i -D ${TOOLS}`,
  );
}

export function runInit(
  targetDir: string,
  options: InitOptions = {},
): InitResult {
  const dir = path.resolve(targetDir);
  const agents = (options.agents ?? AGENTS.join(","))
    .split(",")
    .map((a) => a.trim()) as Agent[];
  const unknown = agents.filter((a) => !AGENTS.includes(a));
  if (unknown.length > 0)
    throw new Error(
      `Unknown agent "${unknown.join(", ")}". Use: ${AGENTS.join(", ")}.`,
    );

  // The lookups read the installed UI Kit; fail now rather than on the agent's first lookup.
  loadMetadata({ cwd: dir });
  const rulesPath = rulesPointer(dir);

  // Read and validate everything before writing anything, so a bad file can't leave a half-done setup.
  const agentsFile = path.join(dir, "AGENTS.md");
  const current = existsSync(agentsFile)
    ? readFileSync(agentsFile, "utf8")
    : "";
  const agentsContent = upsertBlock(current, agentsBlock(rulesPath));
  const claudeMcpFile = path.join(dir, ".mcp.json");
  const copilotMcpFile = path.join(dir, ".vscode", "mcp.json");
  const claudeMcp = agents.includes("claude")
    ? readJson(claudeMcpFile)
    : undefined;
  const copilotMcp = agents.includes("copilot")
    ? readJson(copilotMcpFile)
    : undefined;
  const written: string[] = [];

  writeFileSync(agentsFile, agentsContent);
  written.push("AGENTS.md");

  if (agents.includes("claude")) {
    // Claude Code reads CLAUDE.md; importing AGENTS.md keeps one source for every agent.
    const claudeFile = path.join(dir, "CLAUDE.md");
    const claude = existsSync(claudeFile)
      ? readFileSync(claudeFile, "utf8")
      : "";
    if (!/^@AGENTS\.md\s*$/m.test(claude)) {
      writeFileSync(
        claudeFile,
        `${claude.trimEnd()}${claude.trim() ? "\n\n" : ""}@AGENTS.md\n`,
      );
      written.push("CLAUDE.md");
    }
    writeJson(claudeMcpFile, {
      ...claudeMcp,
      mcpServers: {
        ...claudeMcp?.mcpServers,
        "hv-uikit": { type: "stdio", ...SERVER },
      },
    });
    written.push(".mcp.json");
  }

  if (agents.includes("copilot")) {
    writeJson(copilotMcpFile, {
      ...copilotMcp,
      servers: {
        ...copilotMcp?.servers,
        "hv-uikit": { type: "stdio", ...SERVER },
      },
    });
    written.push(".vscode/mcp.json");
  }

  return { written, rulesPath };
}

export function init(targetDir: string | undefined, options: InitOptions) {
  try {
    const { written, rulesPath } = runInit(targetDir ?? ".", options);
    process.stdout.write(
      [
        "✓ HV UI Kit agent setup",
        ...written.map((file) => `  wrote ${file}`),
        `  rules: ${rulesPath} (from the installed uikit-tools; upgrades update them, no need to re-run init)`,
        "",
      ].join("\n"),
    );
  } catch (error) {
    process.stderr.write(
      `✗ ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exitCode = 2;
  }
}
