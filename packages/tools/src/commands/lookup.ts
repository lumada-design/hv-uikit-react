import { query, type OutputFormat, type Query } from "../core/index.js";

interface LookupOptions {
  json?: boolean;
}

function run(q: Query, options: LookupOptions = {}): void {
  const format: OutputFormat = options.json ? "json" : "text";
  try {
    const { text, isError } = query(q, { format });
    (isError ? process.stderr : process.stdout).write(text);
    if (isError) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}

/** `uikit-tools info [component]` */
export function info(name: string | undefined, options?: LookupOptions): void {
  run({ kind: "component", name }, options);
}

/** `uikit-tools rule [id]` */
export function rule(id: string | undefined, options?: LookupOptions): void {
  run({ kind: "rule", id }, options);
}
