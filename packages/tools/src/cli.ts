#!/usr/bin/env node
import { createRequire } from "node:module";
import { program } from "commander";

import { init } from "./commands/init.js";
import { info, rule } from "./commands/lookup.js";
import { mcp } from "./commands/mcp.js";
import { validate } from "./commands/validate.js";

const { version } = createRequire(import.meta.url)("../package.json") as {
  version: string;
};

program
  .name("uikit-tools")
  .description(
    "HV UI Kit tools: look up components and rules, validate code, set up agents",
  )
  .version(version);

program
  .command("info [component]")
  .description(
    "Props, variant meanings, states and rules of a component (lists components when omitted)",
  )
  .option("--json", "Output JSON")
  .action(info);

program
  .command("rule [id]")
  .description(
    "A design rule (e.g. tokens/color) or component rule (e.g. HvButton/variant); lists rules when omitted",
  )
  .option("--json", "Output JSON")
  .action(rule);

program
  .command("validate <paths...>")
  .description(
    "Check code against the rules of the installed UI Kit; failures are reported by rule id",
  )
  .option("--json", "Output JSON")
  .action(validate);

program
  .command("init [targetDir]")
  .description(
    "Point agents at the UI Kit guide (AGENTS.md) and register the MCP server for a host",
  )
  .option("--host <host>", "copilot or claude", "copilot")
  .action(init);

program
  .command("mcp")
  .description(
    "Serve lookups over MCP on stdio for the project in the current directory",
  )
  .action(() =>
    mcp().catch((error: Error) => {
      process.stderr.write(`[hv-uikit] ${error.message}\n`);
      process.exitCode = 1;
    }),
  );

program.parse();
