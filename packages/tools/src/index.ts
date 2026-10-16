export * from "./core/index.js";
export { init, runInit, type Host } from "./commands/init.js";
export { info, rule } from "./commands/lookup.js";
export { createServer, mcp, TOOLS } from "./commands/mcp.js";
export { check, runGate, type GateState } from "./commands/check.js";
export {
  checkedRules,
  formatText,
  loadChecks,
  parityProblems,
  runChecks,
  type CheckReport,
  type Violation,
} from "./checks/engine.js";
export { FileContext } from "./checks/context.js";
export { defineCheck, type Check, type Finding } from "./checks/define.js";
