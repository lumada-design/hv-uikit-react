/**
 * Builds the agent-facing data for @pentaho/uikit-react-core:
 *
 *   dist/agents/metadata.json  components (docgen props + contracts) and design rules
 *   dist/agents/guide.md       the always-loaded guide, generated from the same data
 *
 * Runs after `vite build` (which empties dist/). Fails the build when a contract
 * does not type-check against its component, names a variant or prop the
 * component does not publish, or references a rule, component or part that
 * does not exist, and when a rule is malformed.
 * See docs/adr/0001-design-rules-and-metadata.md.
 *
 *   node scripts/build-agents.ts [--check]   (--check validates without writing)
 *
 * Runs TypeScript directly, so it needs Node >= 22.18 (type stripping).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { withCustomConfig, type PropItem } from "react-docgen-typescript";
import ts from "typescript";
import { parse as parseYaml } from "yaml";

import type { HvContract } from "../src/types/contract.ts";
import {
  renderGuide,
  type AgentsMetadata,
  type ComponentEntry,
  type PropEntry,
  type RuleEntry,
} from "./agents-format.ts";

const coreDir = path.resolve(import.meta.dirname, "..");
const repoRoot = path.resolve(coreDir, "../..");
const srcDir = path.join(coreDir, "src");
const rulesDir = path.join(coreDir, "rules");
const outDir = path.join(coreDir, "dist", "agents");
const checkOnly = process.argv.includes("--check");

/** Repo-relative or package-relative path with forward slashes, so output is identical on every OS. */
const posix = (from: string, to: string) =>
  path.relative(from, to).split(path.sep).join("/");

const errors: string[] = [];
const fail = (where: string, message: string) =>
  errors.push(`${posix(repoRoot, where)}: ${message}`);

type AnyContract = HvContract<Record<string, unknown>>;

// --- 1. find contracts ---------------------------------------------------------

const contractFiles = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(srcDir, d.name, `${d.name}.contract.ts`))
  .filter((f) => fs.existsSync(f));

// --- 2. type-check contracts and read core's exports ---------------------------

function typeCheck(): Set<string> {
  const configPath = path.join(repoRoot, "tsconfig.json");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    repoRoot,
    { noEmit: true, composite: false, incremental: false },
  );
  const indexFile = path.join(srcDir, "index.ts");
  const program = ts.createProgram({
    rootNames: [indexFile, ...contractFiles],
    options: parsed.options,
  });

  for (const file of contractFiles) {
    const sf = program.getSourceFile(file);
    if (!sf) continue;
    for (const d of program.getSemanticDiagnostics(sf)) {
      const { line } = sf.getLineAndCharacterOfPosition(d.start ?? 0);
      const text = ts.flattenDiagnosticMessageText(d.messageText, "\n  ");
      fail(file, `line ${line + 1}: ${text}`);
    }
  }

  const checker = program.getTypeChecker();
  const indexSymbol = checker.getSymbolAtLocation(
    program.getSourceFile(indexFile)!,
  );
  const exported = new Set<string>();
  if (indexSymbol) {
    for (const s of checker.getExportsOfModule(indexSymbol))
      exported.add(s.name);
  }
  return exported;
}

// --- 3. docgen props -----------------------------------------------------------

// Same parser options as the docs site (apps/docs/src/utils/component.ts).
const docgenParser = withCustomConfig(
  path.join(repoRoot, "tsconfig.build.json"),
  {
    shouldExtractLiteralValuesFromEnum: true,
    savePropValueAsString: true,
    shouldRemoveUndefinedFromOptional: true,
  },
);

const declaredIn = (prop: PropItem) =>
  (prop.parent?.fileName ?? prop.declarations?.[0]?.fileName ?? "").replace(
    /\\/g,
    "/",
  );

/**
 * The props a component publishes: everything declared in UI Kit source, so
 * props inherited from other core components count (HvCheckBox from
 * HvBaseCheckBox), and nothing from node_modules (React's HTML attributes,
 * MUI's Dialog or Modal props). docgen reports core paths as "core/src/…".
 */
const isPublished = (prop: PropItem) => {
  const file = declaredIn(prop);
  return !file.includes("node_modules/") && file.includes("core/src/");
};

/** Map of exported `Hv*` component name → the .tsx file that declares it. */
function indexComponentFiles(): Map<string, string> {
  const index = new Map<string, string>();
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name !== "stories") walk(p);
      } else if (
        /^[A-Z]\w*\.tsx$/.test(e.name) &&
        !/\.(stories|test)\.tsx$/.test(e.name)
      ) {
        for (const m of fs
          .readFileSync(p, "utf8")
          .matchAll(/^export const (Hv\w+)\b/gm)) {
          if (!index.has(m[1])) index.set(m[1], p);
        }
      }
    }
  };
  walk(srcDir);
  return index;
}

const unquote = (v: string) => v.replace(/^["'](.*)["']$/, "$1");

function toPropEntry(prop: PropItem): PropEntry {
  const values =
    prop.type.name === "enum" && Array.isArray(prop.type.value)
      ? (prop.type.value as { value: string }[]).map((v) => unquote(v.value))
      : undefined;
  return {
    name: prop.name,
    type: values
      ? values.map((v) => JSON.stringify(v)).join(" | ")
      : (prop.type.raw ?? prop.type.name),
    required: prop.required,
    ...(prop.defaultValue?.value !== undefined && {
      default: String(prop.defaultValue.value),
    }),
    ...(prop.description && { description: prop.description }),
    ...(values && { values }),
  };
}

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

// --- 4. rules --------------------------------------------------------------------

const RULE_SECTIONS = ["Rule", "Rationale", "Do", "Don't"] as const;

/** Split Markdown into `## ` sections, ignoring headings inside code fences. */
function splitSections(markdown: string): Record<string, string> {
  const sections: Record<string, string[]> = {};
  let current: string[] | undefined;
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const heading = !inFence && line.match(/^## (.+)$/);
    if (heading) {
      current = sections[heading[1].trim()] = [];
    } else {
      current?.push(line);
    }
  }
  return Object.fromEntries(
    Object.entries(sections).map(([k, v]) => [k, v.join("\n").trim()]),
  );
}

function readRules(): RuleEntry[] {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) files.push(p);
    }
  };
  if (fs.existsSync(rulesDir)) walk(rulesDir);

  const rules: RuleEntry[] = [];
  for (const file of files.toSorted()) {
    const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      fail(file, "missing YAML frontmatter");
      continue;
    }
    const front = parseYaml(match[1]) as Record<string, unknown>;
    const expectedId = posix(rulesDir, file).replace(/\.md$/, "");
    const sections = splitSections(match[2]);

    const missing = [
      ...["id", "title", "components", "enforcement", "status"].filter(
        (k) => front[k] === undefined,
      ),
      ...RULE_SECTIONS.filter((h) => !sections[h]).map((h) => `## ${h}`),
    ];
    if (missing.length) fail(file, `missing ${missing.join(", ")}`);
    if (front.id !== expectedId)
      fail(file, `id "${front.id}" must match its path "${expectedId}"`);
    if (!["checked", "context"].includes(front.enforcement as string))
      fail(
        file,
        `enforcement must be "checked" or "context", got "${front.enforcement}"`,
      );
    if (!["example", "approved"].includes(front.status as string))
      fail(
        file,
        `status must be "example" or "approved", got "${front.status}"`,
      );
    if (!Array.isArray(front.components))
      fail(file, "components must be a list");
    if (front.enforcement === "checked" && !front.fix)
      fail(
        file,
        'a "checked" rule needs a one-line `fix` (what to change), shown by checks',
      );

    rules.push({
      id: expectedId,
      title: String(front.title ?? ""),
      components: Array.isArray(front.components)
        ? (front.components as string[])
        : [],
      enforcement: front.enforcement as RuleEntry["enforcement"],
      status: front.status as RuleEntry["status"],
      ...(front.fix ? { fix: String(front.fix) } : {}),
      rule: sections.Rule ?? "",
      rationale: sections.Rationale ?? "",
      do: sections.Do ?? "",
      dont: sections["Don't"] ?? "",
      source: posix(coreDir, file),
    });
  }
  return rules;
}

// --- 5. contracts ----------------------------------------------------------------

async function readContracts() {
  const settled = await Promise.allSettled(
    contractFiles.map(
      async (file) =>
        (await import(pathToFileURL(file).href)) as { contract?: AnyContract },
    ),
  );
  const contracts: { file: string; dir: string; contract: AnyContract }[] = [];
  settled.forEach((result, i) => {
    const file = contractFiles[i];
    if (result.status === "rejected") {
      fail(file, `cannot be loaded: ${(result.reason as Error).message}`);
    } else if (!result.value.contract) {
      fail(file, "must export `contract`");
    } else {
      const dir = path.basename(path.dirname(file));
      contracts.push({ file, dir, contract: result.value.contract });
    }
  });
  return contracts;
}

// --- 6. assemble -----------------------------------------------------------------

async function main() {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(coreDir, "package.json"), "utf8"),
  );
  const exported = typeCheck();
  const rules = readRules();
  const ruleById = new Map(rules.map((r) => [r.id, r]));

  for (const rule of rules) {
    for (const c of rule.components) {
      if (!exported.has(c))
        fail(
          path.join(coreDir, rule.source),
          `component "${c}" is not exported by core`,
        );
    }
  }

  const contracts = await readContracts();

  // Parts named by contracts get a props-only entry, so lookups can answer for
  // them too (e.g. HvTableSection, which the table rules require).
  const contractNames = new Set(contracts.map(({ contract }) => contract.name));
  const componentFiles = indexComponentFiles();
  const partOwners = new Map<string, string[]>();
  for (const { contract } of contracts) {
    for (const part of contract.parts ?? []) {
      if (contractNames.has(part)) continue;
      partOwners.set(part, [...(partOwners.get(part) ?? []), contract.name]);
    }
  }
  const partFiles = [...partOwners.keys()]
    .map((name) => [name, componentFiles.get(name)] as const)
    .filter((e): e is readonly [string, string] => e[1] !== undefined);

  const docs = docgenParser.parse([
    ...contracts.map(({ dir }) => path.join(srcDir, dir, `${dir}.tsx`)),
    ...new Set(partFiles.map(([, file]) => file)),
  ]);

  const components: Record<string, ComponentEntry> = {};
  for (const { file, dir, contract: c } of contracts) {
    const doc = docs.find((d) => d.displayName === c.name);
    if (!doc) {
      fail(
        file,
        `docgen found no component named ${c.name} in ${dir}/${dir}.tsx`,
      );
      continue;
    }
    if (!exported.has(c.name)) fail(file, `${c.name} is not exported by core`);
    for (const part of c.parts ?? []) {
      if (!exported.has(part))
        fail(file, `part "${part}" is not exported by core`);
    }
    for (const id of c.rules ?? []) {
      if (!ruleById.has(id))
        fail(file, `rule "${id}" does not exist in packages/core/rules`);
    }

    const all = Object.values(doc.props);
    let props = c.props?.only
      ? all.filter((p) => c.props!.only!.includes(p.name))
      : all.filter(isPublished);
    if (c.props?.hide)
      props = props.filter((p) => !c.props!.hide!.includes(p.name));
    const published = new Map(props.map((p) => [p.name, p]));

    // Belt and braces next to the type check: contracts may only describe
    // what the component publishes.
    const variant = published.get("variant");
    const variantValues =
      variant?.type.name === "enum"
        ? (variant.type.value as { value: string }[]).map((v) =>
            unquote(v.value),
          )
        : undefined;
    for (const key of Object.keys(c.variants ?? {})) {
      if (!variantValues?.includes(key))
        fail(
          file,
          `variant "${key}" is not a value of ${c.name}'s variant prop (${variantValues?.join(", ") ?? "none"})`,
        );
    }
    for (const key of Object.keys(c.states ?? {})) {
      if (!published.has(key))
        fail(file, `state "${key}" is not a published prop of ${c.name}`);
    }

    const seen = new Set<string>();
    for (const ap of c.antiPatterns ?? []) {
      if (seen.has(ap.id)) fail(file, `duplicate anti-pattern id "${ap.id}"`);
      seen.add(ap.id);
    }

    components[c.name] = {
      name: c.name,
      import: `import { ${c.name} } from "${pkg.name}";`,
      purpose: (c.purpose ?? doc.description.split(/\n\s*\n/)[0])
        .replace(/\s+/g, " ")
        .trim(),
      parts: [...(c.parts ?? [])],
      rules: [...(c.rules ?? [])],
      variants: { ...(c.variants as Record<string, string>) },
      states: { ...(c.states as Record<string, string>) },
      tokens: { ...c.tokens },
      antiPatterns: (c.antiPatterns ?? []).map((ap) => ({
        ...ap,
        id: `${c.name}/${ap.id}`,
        enforcement: ap.enforcement ?? "context",
      })),
      ...(c.a11y && {
        a11y: { ...c.a11y, requirements: [...c.a11y.requirements] },
      }),
      props: props.map(toPropEntry).toSorted(byName),
      source: posix(coreDir, file),
    };
  }

  for (const [name, file] of partFiles) {
    const doc = docs.find((d) => d.displayName === name);
    if (!doc) continue; // not a component docgen understands
    const owners = partOwners.get(name)!;
    components[name] = {
      name,
      import: `import { ${name} } from "${pkg.name}";`,
      purpose:
        doc.description
          .split(/\n\s*\n/)[0]
          .replace(/\s+/g, " ")
          .trim() || `Part of ${owners.join(", ")}.`,
      partOf: owners,
      parts: [],
      rules: [],
      variants: {},
      states: {},
      tokens: {},
      antiPatterns: [],
      props: Object.values(doc.props)
        .filter(isPublished)
        .map(toPropEntry)
        .toSorted(byName),
      source: posix(coreDir, file),
    };
  }

  // The rule ↔ component link can be written on either side (a contract's
  // `rules`, a rule's `components`); publish the union on both so lookups
  // agree whichever side an author used.
  for (const c of Object.values(components)) {
    if (c.partOf) continue;
    for (const r of rules) {
      if (r.components.includes(c.name) && !c.rules.includes(r.id))
        c.rules.push(r.id);
    }
    c.rules.sort();
    for (const id of c.rules) {
      const r = ruleById.get(id);
      if (r && !r.components.includes(c.name)) r.components.push(c.name);
    }
  }

  if (errors.length) {
    console.error(`build-agents: ${errors.length} problem(s)\n`);
    for (const e of errors) console.error(`  ${e}`);
    process.exitCode = 1;
    return;
  }

  const metadata: AgentsMetadata = {
    schemaVersion: 1,
    package: pkg.name,
    version: pkg.version,
    components: Object.fromEntries(
      Object.entries(components).toSorted(([a], [b]) => a.localeCompare(b)),
    ),
    rules: Object.fromEntries(rules.map((r) => [r.id, r])),
  };

  if (!checkOnly) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, "metadata.json"),
      `${JSON.stringify(metadata, null, 2)}\n`,
    );
    fs.writeFileSync(path.join(outDir, "guide.md"), renderGuide(metadata));
  }
  console.info(
    `build-agents: ${contracts.length} components, ${partFiles.length} parts, ${rules.length} rules${checkOnly ? " (check only)" : ` → ${posix(coreDir, outDir)}`}`,
  );
}

await main();
