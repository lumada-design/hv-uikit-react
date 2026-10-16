/**
 * Run the agent: headless Claude Code in the run folder, hermetic (project
 * settings only, no user memory or MCP servers beyond the run's own), with
 * its JSON result (cost, turns, usage) recorded.
 */
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { sh } from "./paths.ts";

/** Parent-session variables a child run must not inherit (session id, extra dirs, memory). */
const STRIP_ENV = [
  "CLAUDE_CODE_SESSION_ID",
  "CLAUDE_ADDITIONAL_DIRECTORIES",
  "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD",
  "CLAUDE_CODE_POST_TURN_MEMORY",
  "CLAUDE_CODE_POST_TURN_MEMORY_CONFIG",
  "CLAUDE_CODE_CHILD_SESSION",
  "CCR_SKILL_OVERRIDES",
];

/** Tools no setup gets: web access, sub-agents, publishing and asking a person. */
const DISALLOWED = [
  "WebSearch",
  "WebFetch",
  "Agent",
  "Task",
  "AskUserQuestion",
  "Artifact",
  "ArtifactComments",
  "ArtifactData",
  "DesignSync",
  "SendUserMessage",
  "SendUserFile",
  "PushNotification",
];

export interface AgentResult {
  sessionId: string;
  ok: boolean;
  exitCode: number;
  timedOut: boolean;
  costUsd: number;
  durationMs: number;
  turns: number;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  result: string;
  /** Tool calls by name, from the transcript (MCP tools keep their full mcp__ name). */
  tools: Record<string, number>;
  /** How the agent used the UI Kit's own tools. */
  uikit: {
    /** `uikit-tools …` commands the agent ran itself (lookups, check), by subcommand. */
    cli: Record<string, number>;
    /** Calls to the UI Kit MCP server's tools. */
    mcp: number;
    /** Skill invocations. */
    skill: number;
    /** Reads of the installed guide or metadata (…/uikit-react-core/dist/agents/…). */
    guideReads: number;
    /** Tool calls that touched the work area's base install (where the gate's tools live): should be 0. */
    baseReads: number;
  };
}

/** Count tool use in a stream-json transcript. */
function toolUsage(lines: Record<string, any>[]) {
  const tools: Record<string, number> = {};
  const uikit = {
    cli: {} as Record<string, number>,
    mcp: 0,
    skill: 0,
    guideReads: 0,
    baseReads: 0,
  };
  for (const line of lines) {
    if (line.type !== "assistant") continue;
    for (const block of line.message?.content ?? []) {
      if (block.type !== "tool_use") continue;
      const name = String(block.name);
      tools[name] = (tools[name] ?? 0) + 1;
      const input = block.input ?? {};
      if (/^mcp__.*uikit/i.test(name)) uikit.mcp++;
      if (name === "Skill") uikit.skill++;
      const text = JSON.stringify(input);
      if (/agents\/(guide\.md|metadata\.json)|dist\/agents\b/.test(text))
        uikit.guideReads++;
      if (/uikit-evals\/base\b/.test(text)) uikit.baseReads++;
      if (name === "Bash") {
        for (const m of String(input.command ?? "").matchAll(
          /uikit-tools\s+([a-z-]+)/g,
        ))
          uikit.cli[m[1]] = (uikit.cli[m[1]] ?? 0) + 1;
      }
    }
  }
  return { tools, uikit };
}

export function runAgent(opts: {
  dir: string;
  prompt: string;
  model: string;
  mcpConfig?: string;
  outFile: string;
  timeoutMs?: number;
  /** Extra tools to withhold, e.g. everything but Read for the reviewer. */
  disallow?: string[];
  /** Extra environment for the agent and its hooks. */
  env?: Record<string, string>;
}): AgentResult {
  const sessionId = randomUUID();
  const env = { ...process.env, ...opts.env };
  for (const k of STRIP_ENV) delete env[k];
  const args = [
    "-p",
    opts.prompt,
    "--model",
    opts.model,
    "--session-id",
    sessionId,
    "--setting-sources",
    "project",
    "--permission-mode",
    "bypassPermissions",
    "--strict-mcp-config",
    ...(opts.mcpConfig ? ["--mcp-config", opts.mcpConfig] : []),
    "--disallowedTools",
    ...DISALLOWED,
    ...(opts.disallow ?? []),
    "--output-format",
    "stream-json",
    "--verbose",
  ];
  const started = Date.now();
  let raw = "";
  let exitCode = 0;
  let timedOut = false;
  try {
    raw = sh("claude", args, {
      cwd: opts.dir,
      quiet: true,
      env,
      timeoutMs: opts.timeoutMs ?? 25 * 60_000,
    });
  } catch (error) {
    const msg = String((error as Error).message);
    timedOut = /SIGTERM|ETIMEDOUT/.test(msg);
    exitCode = 1;
    // sh() puts stdout after the first line of its message; keep the JSON lines
    raw = msg;
  }
  fs.mkdirSync(path.dirname(opts.outFile), { recursive: true });
  fs.writeFileSync(opts.outFile, raw);
  // stream-json: one event per line; the last `result` event has cost, turns and usage.
  const lines: Record<string, any>[] = [];
  for (const l of raw.split("\n")) {
    if (!l.startsWith("{")) continue;
    try {
      lines.push(JSON.parse(l));
    } catch {
      /* partial line from a killed process */
    }
  }
  const json = lines.findLast((l) => l.type === "result") ?? {};
  if (!lines.some((l) => l.type === "result")) exitCode ||= 1;
  const usage = json.usage ?? {};
  return {
    sessionId,
    ok: exitCode === 0 && json.is_error !== true,
    exitCode,
    timedOut,
    costUsd: Number(json.total_cost_usd ?? 0),
    durationMs: Number(json.duration_ms ?? Date.now() - started),
    turns: Number(json.num_turns ?? 0),
    // modelUsage also lists the host's own small-model calls; record the one asked for if it ran.
    model:
      Object.keys(json.modelUsage ?? {}).find((m) =>
        m.startsWith(opts.model),
      ) ?? `${opts.model} (not in modelUsage)`,
    inputTokens: Number(usage.input_tokens ?? 0),
    outputTokens: Number(usage.output_tokens ?? 0),
    cacheReadTokens: Number(usage.cache_read_input_tokens ?? 0),
    cacheWriteTokens: Number(usage.cache_creation_input_tokens ?? 0),
    result: String(json.result ?? "").slice(0, 2000),
    ...toolUsage(lines),
  };
}
