#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { Command } from "commander";

import { init } from "./commands/init.js";
import { printLookup } from "./commands/lookup.js";
import { mcp } from "./commands/mcp.js";
import { validate } from "./commands/validate.js";

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  version: string;
};

const program = new Command("uikit-tools")
  .description("HV UI Kit tools for apps and their coding agents")
  .version(version);

program
  .command("init [targetDir]")
  .description(
    "Generate agent instructions in the target directory (default: current directory)",
  )
  .option(
    "--harness <type>",
    "Target harness: 'claude' or 'copilot' (default: copilot)",
    "copilot",
  )
  .action(init);

program
  .command("validate <paths...>")
  .description("Validate code against HV UI Kit contracts")
  .option("--fix", "Attempt to auto-fix violations (not implemented yet)")
  .action(validate);

program
  .command("components")
  .description("List the UI Kit components")
  .option("--limit <number>", "most components to list (default: all)")
  .option("--offset <number>", "components to skip", "0")
  .action((options: { limit?: string; offset: string }) =>
    printLookup({
      kind: "components",
      limit: options.limit === undefined ? undefined : Number(options.limit),
      offset: Number(options.offset),
    }),
  );

program
  .command("info <component>")
  .description("A component's import, props and design guidance")
  .action((name: string) => printLookup({ kind: "component", name }));

program
  .command("rules")
  .description("List the UI Kit design rules")
  .action(() => printLookup({ kind: "rules" }));

program
  .command("rule <id>")
  .description(
    "A design rule as written, by id (tokens/colors) or a whole rule file (tokens)",
  )
  .action((id: string) => printLookup({ kind: "rule", id }));

program
  .command("mcp")
  .description("Start the hv-uikit MCP server on stdio")
  .action(() => mcp(version));

await program.parseAsync();
