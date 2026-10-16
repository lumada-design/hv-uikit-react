import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

import {
  loadMetadata,
  query,
  type OutputFormat,
  type Query,
} from "../core/index.js";

const formatArg = {
  format: {
    type: "string",
    enum: ["text", "json"],
    description: "text (Markdown, default) or json",
  },
} as const;

export const TOOLS: Tool[] = [
  {
    name: "get_component",
    description:
      "Look up a UI Kit component in the installed version: props, what each variant means, state props, component rules, applicable design rules and accessibility. Call before using a component.",
    inputSchema: {
      type: "object",
      properties: {
        component: {
          type: "string",
          description: "Component name, e.g. HvTable",
        },
        ...formatArg,
      },
      required: ["component"],
    },
  },
  {
    name: "get_rule",
    description:
      "Look up a rule by id: a design rule (e.g. destructive/confirm) or a component rule (e.g. HvButton/variant). Returns the rule, rationale and do/don't examples.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Rule id, e.g. tokens/color" },
        ...formatArg,
      },
      required: ["id"],
    },
  },
  {
    name: "list_components",
    description:
      "List the UI Kit components that have guidance, with their purpose.",
    inputSchema: { type: "object", properties: { ...formatArg } },
  },
  {
    name: "list_rules",
    description:
      "List the design rules with their ids, titles and enforcement.",
    inputSchema: { type: "object", properties: { ...formatArg } },
  },
];

function toQuery(name: string, args: Record<string, unknown>): Query | string {
  const text = (key: string) =>
    typeof args[key] === "string" ? (args[key] as string).trim() : "";
  switch (name) {
    case "get_component":
      return text("component")
        ? { kind: "component", name: text("component") }
        : "component is required";
    case "get_rule":
      return text("id") ? { kind: "rule", id: text("id") } : "id is required";
    case "list_components":
      return { kind: "component" };
    case "list_rules":
      return { kind: "rule" };
    default:
      return `Unknown tool: ${name}`;
  }
}

/** Build the server for the project at `cwd`. Exposed for tests. */
export function createServer(cwd = process.cwd()): Server {
  const { metadata } = loadMetadata(cwd);
  const server = new Server(
    { name: "hv-uikit", version: metadata.version },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const args = (request.params.arguments ?? {}) as Record<string, unknown>;
    const q = toQuery(request.params.name, args);
    if (typeof q === "string") {
      return { content: [{ type: "text", text: q }], isError: true };
    }
    const format: OutputFormat = args.format === "json" ? "json" : "text";
    const { text, isError } = query(q, { format, cwd });
    return { content: [{ type: "text", text }], isError };
  });

  return server;
}

/** `uikit-tools mcp`: serve lookups over stdio for the project in the current directory. */
export async function mcp(
  transport: Transport = new StdioServerTransport(),
): Promise<void> {
  const server = createServer();
  await server.connect(transport);
  const { metadata } = loadMetadata();
  process.stderr.write(
    `[hv-uikit] MCP server for ${metadata.package}@${metadata.version}: ${Object.keys(metadata.components).length} components, ${Object.keys(metadata.rules).length} rules\n`,
  );
}
