import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { answer, type LookupRequest } from "../core/lookup.js";
import { CORE, loadMetadata, type LoadOptions } from "../core/metadata.js";

type Args = Record<string, unknown>;

interface McpTool {
  name: string;
  description: string;
  inputSchema: z.ZodRawShape;
  request(args: Args): LookupRequest;
}

/** MCP tools; each returns exactly what its CLI command prints. */
export const MCP_TOOLS: McpTool[] = [
  {
    name: "list_components",
    description:
      "List the UI Kit components with a one-line description; marks the ones with design guidance. Same output as `uikit-tools components`.",
    inputSchema: {
      limit: z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Most components to return (default: all)"),
      offset: z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("Components to skip (default 0)"),
    },
    request: (args: Args): LookupRequest => ({
      kind: "components",
      limit: args.limit as number | undefined,
      offset: args.offset as number | undefined,
    }),
  },
  {
    name: "get_component",
    description:
      "A UI Kit component's import, props and design guidance: variants, states, tokens, don'ts, accessibility and validation rules. Same output as `uikit-tools info <component>`.",
    inputSchema: {
      name: z.string().describe("Component name, e.g. HvDialog"),
    },
    request: (args: Args): LookupRequest => ({
      kind: "component",
      name: String(args.name ?? ""),
    }),
  },
  {
    name: "list_rules",
    description:
      "List the UI Kit design rules by id. Same output as `uikit-tools rules`.",
    inputSchema: {},
    request: (): LookupRequest => ({ kind: "rules" }),
  },
  {
    name: "get_rule",
    description:
      "A UI Kit design rule as written, by id (e.g. tokens/colors) or a whole rule file (e.g. tokens). Same output as `uikit-tools rule <id>`.",
    inputSchema: {
      id: z
        .string()
        .describe("Rule id, e.g. tokens/colors, or a file, e.g. actions"),
    },
    request: (args: Args): LookupRequest => ({
      kind: "rule",
      id: String(args.id ?? ""),
    }),
  },
];

/** Answer one MCP tool call; exported so tests can compare it with the CLI. */
export function callTool(
  name: string,
  args: Args = {},
  options: LoadOptions = {},
) {
  const tool = MCP_TOOLS.find((t) => t.name === name);
  try {
    if (!tool) throw new Error(`Unknown tool: ${name}`);
    return {
      content: [
        { type: "text" as const, text: answer(tool.request(args), options) },
      ],
    };
  } catch (error) {
    const text = error instanceof Error ? error.message : String(error);
    return { content: [{ type: "text" as const, text }], isError: true };
  }
}

/**
 * Start the stdio MCP server. Data is read per call from the project the agent runs in,
 * so a missing UI Kit is reported to the agent as a tool error instead of a crash.
 */
export async function mcp(version: string) {
  const server = new McpServer({ name: "hv-uikit", version });
  for (const tool of MCP_TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: true, openWorldHint: false },
      },
      async (args: Args) => callTool(tool.name, args),
    );
  }

  await server.connect(new StdioServerTransport());
  try {
    const { metadata } = loadMetadata();
    process.stderr.write(
      `hv-uikit MCP server: ${CORE}@${metadata.version}, ${metadata.components.length} components\n`,
    );
  } catch (error) {
    process.stderr.write(
      `hv-uikit MCP server: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
}
