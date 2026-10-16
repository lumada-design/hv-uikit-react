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
}): AgentResult {
  const sessionId = randomUUID();
  const env = { ...process.env };
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
    "json",
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
    raw = msg.slice(msg.indexOf("{"));
  }
  fs.mkdirSync(path.dirname(opts.outFile), { recursive: true });
  fs.writeFileSync(opts.outFile, raw);
  let json: Record<string, any> = {};
  try {
    json = JSON.parse(raw.trim().split("\n").filter(Boolean).at(-1) ?? "{}");
  } catch {
    /* not JSON: timeout or crash */
  }
  const usage = json.usage ?? {};
  return {
    sessionId,
    ok: exitCode === 0 && json.is_error !== true,
    exitCode,
    timedOut,
    costUsd: Number(json.total_cost_usd ?? 0),
    durationMs: Number(json.duration_ms ?? Date.now() - started),
    turns: Number(json.num_turns ?? 0),
    model:
      Object.keys(json.modelUsage ?? {}).find(
        (m) => !m.includes("haiku") || opts.model.includes("haiku"),
      ) ?? opts.model,
    inputTokens: Number(usage.input_tokens ?? 0),
    outputTokens: Number(usage.output_tokens ?? 0),
    cacheReadTokens: Number(usage.cache_read_input_tokens ?? 0),
    cacheWriteTokens: Number(usage.cache_creation_input_tokens ?? 0),
    result: String(json.result ?? "").slice(0, 2000),
  };
}
