/**
 * Prepare the base install every run starts from:
 *
 *  1. build the UI Kit packages from this checkout and `npm pack` them, so runs
 *     use exactly this version of the UI Kit, its metadata and its tools;
 *  2. install the template once into the work area (outside the repo), with the UI Kit packages from
 *     those tarballs and third-party packages at the exact versions pinned in
 *     evals/template/package.json;
 *  3. check the template is clean: types, build and `uikit-tools check`.
 *
 * Runs then copy the template sources and the base node_modules.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  BASE,
  CACHE,
  MODELS,
  REPO,
  RESULTS,
  REVIEW_MODEL,
  sh,
  TARBALLS,
  TEMPLATE,
} from "./paths.ts";

/** UI Kit packages the template installs from this checkout, in build order. */
const PACKAGES = [
  ["config", "@pentaho/uikit-config"],
  ["styles", "@pentaho/uikit-styles"],
  ["utils", "@pentaho/uikit-react-utils"],
  ["shared", "@pentaho/uikit-react-shared"],
  ["icons", "@pentaho/uikit-react-icons"],
  ["uno-preset", "@pentaho/uikit-uno-preset"],
  ["core", "@pentaho/uikit-react-core"],
  ["tools", "@pentaho/uikit-tools"],
] as const;

export interface Manifest {
  builtAt: string;
  commit: string;
  /** Agent host version: results are only comparable on the same one. */
  claude: string;
  models: Record<string, string>;
  reviewer: string;
  node: string;
  packages: Record<string, { version: string; tarball: string }>;
}

export function prepare({ rebuild = true } = {}): Manifest {
  fs.mkdirSync(TARBALLS, { recursive: true });

  if (rebuild) {
    for (const [dir] of PACKAGES) {
      const pkg = JSON.parse(
        fs.readFileSync(
          path.join(REPO, "packages", dir, "package.json"),
          "utf8",
        ),
      );
      if (pkg.scripts?.build) {
        console.info(`prepare: building ${pkg.name}`);
        sh("npm", ["run", "build", "-w", `packages/${dir}`], {
          cwd: REPO,
          quiet: true,
        });
      }
    }
  }

  for (const f of fs.readdirSync(TARBALLS)) fs.rmSync(path.join(TARBALLS, f));
  const packages: Manifest["packages"] = {};
  for (const [dir, name] of PACKAGES) {
    const out = sh(
      "npm",
      [
        "pack",
        "-w",
        `packages/${dir}`,
        "--pack-destination",
        TARBALLS,
        "--json",
      ],
      {
        cwd: REPO,
        quiet: true,
      },
    );
    const [{ filename, version }] = JSON.parse(out.slice(out.indexOf("[")));
    packages[name] = { version, tarball: path.join(TARBALLS, filename) };
  }

  // Base install: the template's package.json with UI Kit packages pointing at the tarballs.
  fs.rmSync(BASE, { recursive: true, force: true });
  fs.cpSync(TEMPLATE, BASE, { recursive: true });
  const pkgFile = path.join(BASE, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
  const local = (name: string) => `file:${packages[name].tarball}`;
  for (const field of ["dependencies", "devDependencies"]) {
    for (const name of Object.keys(pkg[field] ?? {})) {
      if (packages[name]) pkg[field][name] = local(name);
    }
  }
  // Transitive UI Kit dependencies come from this checkout too.
  pkg.overrides = Object.fromEntries(
    Object.keys(packages).map((name) => [name, local(name)]),
  );
  fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`);

  console.info("prepare: installing the template");
  sh("npm", ["install", "--no-audit", "--no-fund", "--ignore-scripts"], {
    cwd: BASE,
    quiet: true,
  });

  console.info("prepare: checking the template is clean");
  sh("npx", ["tsc", "-p", "tsconfig.json", "--noEmit"], {
    cwd: BASE,
    quiet: true,
  });
  sh("npx", ["vite", "build", "--logLevel", "error"], {
    cwd: BASE,
    quiet: true,
  });
  fs.rmSync(path.join(BASE, "dist"), { recursive: true, force: true });
  const report = JSON.parse(
    sh("npx", ["--no-install", "uikit-tools", "check", "--json"], {
      cwd: BASE,
      quiet: true,
      allowFail: true,
    }),
  );
  if (report.violations.length) {
    throw new Error(
      `The template itself has ${report.violations.length} check violation(s):\n${JSON.stringify(report.violations, null, 2)}`,
    );
  }

  const manifest: Manifest = {
    builtAt: new Date().toISOString(),
    commit: execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: REPO,
      encoding: "utf8",
    }).trim(),
    claude: sh("claude", ["--version"], { cwd: CACHE, quiet: true }).trim(),
    models: MODELS,
    reviewer: REVIEW_MODEL,
    node: process.version,
    packages,
  };
  for (const dir of [CACHE, RESULTS]) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
  }
  console.info(
    `prepare: base ready at ${BASE} (UI Kit from ${manifest.commit}, ${manifest.claude})`,
  );
  return manifest;
}
