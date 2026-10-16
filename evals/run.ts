/**
 * Evaluation runner for UI Kit rules, context and checks.
 *
 *   node evals/run.ts prepare                 build + pack the UI Kit, install the template
 *   node evals/run.ts mocks                   render the design mocks to PNGs
 *   node evals/run.ts run [options]           run scenarios × setups × models × N
 *   node evals/run.ts report                  rebuild the report from raw results
 *   node evals/run.ts all                     prepare, run the full plan, report
 *
 * See evals/README.md.
 */
import { renderMocks } from "./lib/mocks.ts";
import { prepare } from "./lib/prepare.ts";

const [command = "help", ...rest] = process.argv.slice(2);

if (command === "prepare") {
  prepare({ rebuild: !rest.includes("--no-build") });
} else if (command === "mocks") {
  await renderMocks();
} else {
  console.info("usage: node evals/run.ts <prepare|run|report|all>");
}
