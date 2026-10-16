/**
 * `uikit-tools init [targetDir] --host <copilot|claude>`
 *
 * Writes a pointer to the guide shipped in the installed UI Kit, never a copy,
 * so upgrading the UI Kit updates the guide without running init again:
 *
 *   AGENTS.md            marked block pointing at the guide (all hosts)
 *   CLAUDE.md            marked block importing AGENTS.md and the guide (claude)
 *   .vscode/mcp.json     hv-uikit MCP server (copilot)
 *   .mcp.json            hv-uikit MCP server (claude)
 *
 * Re-running replaces the marked blocks and server entries; everything else in
 * those files is kept. Run it in the folder the editor or agent opens: hosts
 * read these files, and start the MCP server, from there.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { CORE_PACKAGE, loadMetadata } from "../core/load.js";

export type Host = "copilot" | "claude";
export const HOSTS: Host[] = ["copilot", "claude"];

const START = "<!-- uikit-tools:start -->";
const END = "<!-- uikit-tools:end -->";
const SERVER_NAME = "hv-uikit";
const SERVER = { command: "npx", args: ["--no-install", "uikit-tools", "mcp"] };
const GUIDE_IN_PACKAGE = `${CORE_PACKAGE}/dist/agents/guide.md`;

export interface InitResult {
  written: string[];
  /** The guide as the project sees it, e.g. node_modules/…/guide.md or ../../node_modules/…. */
  guidePointer: string;
  version: string;
  staleCopies: string[];
  /** Files init could not update, with the entry to add by hand. */
  manual: { file: string; add: string }[];
}

/**
 * The guide's path as the project sees it: the nearest `node_modules` at or
 * above `dir` that holds the UI Kit, the way Node resolves it. Lexical, never
 * the symlink target, so it stays valid across upgrades (pnpm's real paths
 * carry the version) and works when the UI Kit is hoisted to a workspace root.
 */
export function findGuidePointer(dir: string): string | undefined {
  for (let current = dir; ; current = path.dirname(current)) {
    const guide = path.join(current, "node_modules", GUIDE_IN_PACKAGE);
    if (existsSync(guide)) {
      return path.relative(dir, guide).split(path.sep).join("/");
    }
    if (path.dirname(current) === current) return undefined;
  }
}

export function agentsBlock(guidePointer: string): string {
  return [
    START,
    "## HV UI Kit",
    "",
    "UI in this project is built with the HV UI Kit. Before writing UI code, read the",
    `agent guide shipped with the installed version: \`${guidePointer}\`.`,
    "",
    "It lists the design rules and how to look up components and rules in the installed",
    `version (\`npx uikit-tools info <Component>\`, \`npx uikit-tools rule <id>\`, or the \`${SERVER_NAME}\``,
    'MCP server). Run `npx uikit-tools validate "src/**/*.tsx"` on the files you change.',
    END,
  ].join("\n");
}

export function claudeBlock(guidePointer: string): string {
  return [START, "@AGENTS.md", `@${guidePointer}`, END].join("\n");
}

/** Insert or replace the marked block, keeping the rest of the file. */
export function upsertBlock(
  existing: string | undefined,
  block: string,
): string {
  if (!existing?.trim()) return `${block}\n`;
  const start = existing.indexOf(START);
  const end = existing.indexOf(END);
  if (start !== -1 && end > start) {
    return existing.slice(0, start) + block + existing.slice(end + END.length);
  }
  return `${existing.replace(/\s*$/, "")}\n\n${block}\n`;
}

function upsertFile(file: string, block: string): string {
  const existing = existsSync(file) ? readFileSync(file, "utf8") : undefined;
  writeFileSync(file, upsertBlock(existing, block));
  return file;
}

/**
 * Add the server to the host's MCP config. A file that is not plain JSON (VS
 * Code allows comments) is left untouched and reported, rather than rewritten
 * without its comments.
 */
function writeMcpConfig(
  dir: string,
  host: Host,
): { written?: string; manual?: InitResult["manual"][number] } {
  const file =
    host === "copilot"
      ? path.join(dir, ".vscode", "mcp.json")
      : path.join(dir, ".mcp.json");
  const key = host === "copilot" ? "servers" : "mcpServers";
  const entry = host === "copilot" ? { type: "stdio", ...SERVER } : SERVER;

  let config: Record<string, unknown> = {};
  if (existsSync(file)) {
    try {
      config = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      return {
        manual: {
          file,
          add: `"${key}": { "${SERVER_NAME}": ${JSON.stringify(entry)} }`,
        },
      };
    }
  }
  config[key] = {
    ...(config[key] as Record<string, unknown>),
    [SERVER_NAME]: entry,
  };
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`);
  return { written: file };
}

export function runInit(targetDir: string, host: Host): InitResult {
  const dir = path.resolve(targetDir);
  if (!HOSTS.includes(host))
    throw new Error(`Unknown host "${host}". Use one of: ${HOSTS.join(", ")}.`);

  // Fails early, with a useful message, if the UI Kit is missing or predates the guide.
  const { metadata } = loadMetadata(dir);
  const guidePointer = findGuidePointer(dir);
  if (!guidePointer) {
    throw new Error(
      `No node_modules/${GUIDE_IN_PACKAGE} at or above ${dir}. Install the UI Kit in this project, then run init again.`,
    );
  }

  const written = [
    upsertFile(path.join(dir, "AGENTS.md"), agentsBlock(guidePointer)),
  ];
  if (host === "claude") {
    written.push(
      upsertFile(path.join(dir, "CLAUDE.md"), claudeBlock(guidePointer)),
    );
  }
  const mcp = writeMcpConfig(dir, host);
  if (mcp.written) written.push(mcp.written);

  // Copies written by the POC's init go stale on upgrade; point them out.
  const staleCopies = [
    ".github/rules/hv-uikit.md",
    ".claude/rules/hv-uikit.md",
    ".github/copilot-instructions.md",
    ".claude/instructions.md",
  ].filter(
    (f) =>
      existsSync(path.join(dir, f)) &&
      readFileSync(path.join(dir, f), "utf8").includes("HV UI Kit"),
  );

  return {
    written,
    guidePointer,
    version: metadata.version,
    staleCopies,
    manual: mcp.manual ? [mcp.manual] : [],
  };
}

export async function init(
  targetDir: string | undefined,
  options: { host?: string } = {},
): Promise<void> {
  try {
    const result = runInit(
      targetDir ?? ".",
      (options.host ?? "copilot") as Host,
    );
    const rel = (f: string) => path.relative(process.cwd(), f) || f;
    process.stdout.write(
      [
        `✓ Pointed agents at the UI Kit guide (${CORE_PACKAGE}@${result.version})`,
        ...result.written.map((f) => `  wrote ${rel(f)}`),
        `  guide: ${result.guidePointer} (updates with the UI Kit; no need to re-run init)`,
        ...result.manual.flatMap((m) => [
          "",
          `  ${rel(m.file)} is not plain JSON, so it was left as is. Add this entry by hand:`,
          `    ${m.add}`,
        ]),
        ...(result.staleCopies.length
          ? [
              "",
              "  These files look like copies from an older init and will go stale; delete them:",
              ...result.staleCopies.map((f) => `    ${f}`),
            ]
          : []),
        "",
      ].join("\n"),
    );
  } catch (error) {
    process.stderr.write(`✗ init failed: ${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}
