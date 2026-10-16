/**
 * Setups (what the agent gets) and how each is applied to a fresh run folder.
 * Everything else (template, scenario, model, prompt, tools) is identical.
 */
import fs from "node:fs";
import path from "node:path";

import { sh } from "./paths.ts";

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
}

export const SETUPS: Record<string, Setup> = {
  baseline: {
    id: "baseline",
    label: "Baseline",
    guide: false,
    mcp: false,
    skill: false,
    gate: false,
  },
  context: {
    id: "context",
    label: "Context only (guide + lookups)",
    guide: true,
    mcp: false,
    skill: false,
    gate: false,
  },
  checks: {
    id: "checks",
    label: "Checks only (gate)",
    guide: false,
    mcp: false,
    skill: false,
    gate: true,
  },
  both: {
    id: "both",
    label: "Both (guide + lookups + gate)",
    guide: true,
    mcp: false,
    skill: false,
    gate: true,
  },
  // Deliveries, compared on the CRUD scenario. "Guide only" is the context setup.
  "guide-mcp": {
    id: "guide-mcp",
    label: "Guide + MCP",
    guide: true,
    mcp: true,
    skill: false,
    gate: false,
  },
  "guide-skill": {
    id: "guide-skill",
    label: "Guide + skill",
    guide: true,
    mcp: false,
    skill: true,
    gate: false,
  },
};

export const MAX_GATE_ROUNDS = 3;

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
