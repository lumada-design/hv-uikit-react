/**
 * Setups (what the agent gets) and how each is applied to a fresh run folder.
 * Everything else (template, scenario, model, prompt, tools) is identical.
 */
import fs from "node:fs";
import path from "node:path";

import { BASE, sh } from "./paths.ts";

export interface Setup {
  id: string;
  label: string;
  /** Guide: AGENTS.md + CLAUDE.md pointing at the installed guide (`uikit-tools init --host claude`). */
  guide: boolean;
  /** MCP server registered with the host (otherwise lookups are the CLI the guide names). */
  mcp: boolean;
  /** The build-list-page skill installed in .claude/skills. */
  skill: boolean;
  /** Gate: `uikit-tools check --gate` as a Stop hook, up to 3 correction rounds. */
  gate: boolean;
  /**
   * The UI Kit's agent files are installed (guide and metadata in core,
   * @pentaho/uikit-tools). Only the baseline goes without: every other setup
   * is something a team would install, and the gate needs the tools.
   */
  agentFiles: boolean;
}

export const SETUPS: Record<string, Setup> = {
  baseline: {
    id: "baseline",
    label: "Baseline",
    guide: false,
    mcp: false,
    skill: false,
    gate: false,
    agentFiles: false,
  },
  context: {
    id: "context",
    label: "Context only (guide + lookups)",
    guide: true,
    mcp: false,
    skill: false,
    gate: false,
    agentFiles: true,
  },
  checks: {
    id: "checks",
    label: "Checks only (gate)",
    guide: false,
    mcp: false,
    skill: false,
    gate: true,
    agentFiles: true,
  },
  both: {
    id: "both",
    label: "Both (guide + lookups + gate)",
    guide: true,
    mcp: false,
    skill: false,
    gate: true,
    agentFiles: true,
  },
  // Deliveries, compared on the CRUD scenario. "Guide only" is the context setup.
  "guide-mcp": {
    id: "guide-mcp",
    label: "Guide + MCP",
    guide: true,
    mcp: true,
    skill: false,
    gate: false,
    agentFiles: true,
  },
  "guide-skill": {
    id: "guide-skill",
    label: "Guide + skill",
    guide: true,
    mcp: false,
    skill: true,
    gate: false,
    agentFiles: true,
  },
};

export const MAX_GATE_ROUNDS = 3;

const TOOLS = "@pentaho/uikit-tools";
/** What the UI Kit ships for agents: the guide and metadata in core, and the tools package. */
const AGENT_FILES = [
  "node_modules/@pentaho/uikit-react-core/dist/agents",
  `node_modules/${TOOLS}`,
  "node_modules/.bin/uikit-tools",
];

/**
 * Baseline gets the UI Kit as it was before it shipped agent context: no
 * guide or metadata in core, no tools package (nor its entry in package.json,
 * so `npx` has nothing to find). Otherwise agents find the guide in
 * node_modules on their own and the baseline is not one.
 */
function stripAgentFiles(dir: string) {
  for (const f of AGENT_FILES)
    fs.rmSync(path.join(dir, f), { recursive: true, force: true });
  const pkgFile = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
  for (const field of ["dependencies", "devDependencies", "overrides"])
    delete pkg[field]?.[TOOLS];
  fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`);
  const lockFile = path.join(dir, "package-lock.json");
  const lock = JSON.parse(fs.readFileSync(lockFile, "utf8"));
  delete lock.packages?.[`node_modules/${TOOLS}`];
  for (const field of ["dependencies", "devDependencies"])
    delete lock.packages?.[""]?.[field]?.[TOOLS];
  fs.writeFileSync(lockFile, `${JSON.stringify(lock, null, 2)}\n`);
}

/** Put the agent files back after the agent is done, so the run can be scored like every other. */
export function restoreAgentFiles(dir: string) {
  for (const f of AGENT_FILES) {
    if (fs.existsSync(path.join(dir, f))) continue;
    sh("cp", ["-a", path.join(BASE, f), path.join(dir, f)], { cwd: dir });
  }
}

export function applySetup(dir: string, setup: Setup): { mcpConfig?: string } {
  const claudeDir = path.join(dir, ".claude");
  fs.mkdirSync(claudeDir, { recursive: true });
  const settings: Record<string, unknown> = {};

  if (setup.guide) {
    sh("npx", ["--no-install", "uikit-tools", "init", "--host", "claude"], {
      cwd: dir,
      quiet: true,
    });
  }
  // init writes .mcp.json for Claude; it only counts when the run passes it (MCP delivery).
  const mcpFile = path.join(dir, ".mcp.json");
  let mcpConfig: string | undefined;
  if (setup.mcp) {
    if (!fs.existsSync(mcpFile))
      throw new Error("MCP setup needs the guide (init writes .mcp.json)");
    mcpConfig = mcpFile;
  } else {
    fs.rmSync(mcpFile, { force: true });
  }

  if (!setup.agentFiles) stripAgentFiles(dir);

  if (setup.skill) {
    const from = path.join(
      dir,
      "node_modules",
      "@pentaho",
      "uikit-tools",
      "skills",
      "build-list-page",
    );
    fs.cpSync(from, path.join(claudeDir, "skills", "build-list-page"), {
      recursive: true,
    });
  }

  if (setup.gate) {
    settings.hooks = {
      Stop: [
        {
          hooks: [
            {
              type: "command",
              command: `npx --no-install uikit-tools check --gate --max-rounds ${MAX_GATE_ROUNDS} --state .uikit-check/gate.json`,
              timeout: 120,
            },
          ],
        },
      ],
    };
  }
  fs.writeFileSync(
    path.join(claudeDir, "settings.json"),
    `${JSON.stringify(settings, null, 2)}\n`,
  );
  return { mcpConfig };
}
