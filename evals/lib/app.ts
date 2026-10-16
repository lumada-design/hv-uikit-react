/**
 * A run's app: a fresh copy of the template (sources and config) on top of the
 * base install, plus building it and taking screenshots of its screens.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { chromium, type Browser } from "playwright-core";

import { BASE, sh, TEMPLATE } from "./paths.ts";

/**
 * Fresh app in `dir`: template sources and config, a private copy of the base
 * node_modules (not hard links: an agent that edits or reinstalls a package must
 * not change the base other runs use), base package.json, and a git repo
 * (`commitStart` commits the starting state), so the folder is a project root
 * of its own and the agent's changes are its diff.
 */
export function createApp(dir: string, extraFiles?: string) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(TEMPLATE)) {
    if (entry === "node_modules" || entry === "package.json") continue;
    // Stored as _oxlintrc.json (like the CLI does) so the repo's lint ignores it.
    const target = entry === "_oxlintrc.json" ? ".oxlintrc.json" : entry;
    fs.cpSync(path.join(TEMPLATE, entry), path.join(dir, target), {
      recursive: true,
    });
  }
  // The base package.json points at this checkout's tarballs, so `npm` keeps working in the run.
  fs.copyFileSync(
    path.join(BASE, "package.json"),
    path.join(dir, "package.json"),
  );
  fs.copyFileSync(
    path.join(BASE, "package-lock.json"),
    path.join(dir, "package-lock.json"),
  );
  sh(
    "cp",
    ["-a", path.join(BASE, "node_modules"), path.join(dir, "node_modules")],
    { cwd: dir },
  );
  if (extraFiles && fs.existsSync(extraFiles))
    fs.cpSync(extraFiles, dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, ".gitignore"),
    "node_modules/\ndist/\n.uikit-check/\n",
  );
  git(dir, "init", "-q", "-b", "main");
}

const git = (dir: string, ...args: string[]) =>
  sh("git", args, {
    cwd: dir,
    quiet: true,
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "eval",
      GIT_AUTHOR_EMAIL: "eval@example.invalid",
      GIT_COMMITTER_NAME: "eval",
      GIT_COMMITTER_EMAIL: "eval@example.invalid",
    },
  });

/** Commit the starting state (template, scenario files, mocks, setup): what the agent changes is the diff. */
export function commitStart(dir: string) {
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", "start");
}

/** Files the agent added or changed since the starting commit. */
export function changedSince(dir: string): string[] {
  const out = sh("git", ["status", "--porcelain", "-uall", "--no-renames"], {
    cwd: dir,
    quiet: true,
  });
  return out
    .split("\n")
    .filter(Boolean)
    .filter((l) => !l.startsWith(" D") && !l.startsWith("D "))
    .map((l) => l.slice(3).trim())
    .toSorted();
}

export function typecheck(dir: string): {
  ok: boolean;
  errors: number;
  output: string;
} {
  const out = sh(
    "npx",
    ["tsc", "-p", "tsconfig.json", "--noEmit", "--pretty", "false"],
    { cwd: dir, quiet: true, allowFail: true },
  );
  const errors = (out.match(/error TS\d+/g) ?? []).length;
  return { ok: errors === 0, errors, output: out.slice(0, 4000) };
}

export function build(dir: string): { ok: boolean; output: string } {
  try {
    sh("npx", ["vite", "build", "--logLevel", "error"], {
      cwd: dir,
      quiet: true,
      timeoutMs: 300_000,
    });
    return { ok: true, output: "" };
  } catch (error) {
    return {
      ok: false,
      output: String((error as Error).message).slice(0, 4000),
    };
  }
}

const freePort = () =>
  new Promise<number>((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const { port } = srv.address() as net.AddressInfo;
      srv.close(() => resolve(port));
    });
  });

export interface Screen {
  /** Route to open, e.g. "/assets". */
  path: string;
  /** Optional: click the first button or link with this text, then capture. */
  click?: string;
  /** File name for the capture. */
  name: string;
}

const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
let browser: Browser | undefined;
const getBrowser = async () =>
  (browser ??= await chromium.launch(
    fs.existsSync(CHROME) ? { executablePath: CHROME } : {},
  ));
export const closeBrowser = async () => {
  await browser?.close();
  browser = undefined;
};

/** Serve the built app (dist) and capture each screen. Returns per-screen errors. */
export async function screenshots(
  dir: string,
  screens: Screen[],
  outDir: string,
): Promise<Record<string, string>> {
  fs.mkdirSync(outDir, { recursive: true });
  const port = await freePort();
  // vite itself (not npx, which leaves the server behind when killed), in its own process group.
  const server = spawn(
    path.join(dir, "node_modules", ".bin", "vite"),
    ["preview", "--port", String(port), "--strictPort"],
    { cwd: dir, stdio: "ignore", detached: true },
  );
  const errors: Record<string, string> = {};
  try {
    const base = `http://localhost:${port}`;
    for (let i = 0; i < 50; i++) {
      try {
        await fetch(base);
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 200));
      }
    }
    const b = await getBrowser();
    for (const screen of screens) {
      const page = await b.newPage({ viewport: { width: 1280, height: 900 } });
      const consoleErrors: string[] = [];
      page.on("pageerror", (e) => consoleErrors.push(e.message));
      try {
        await page.goto(base + screen.path, {
          waitUntil: "networkidle",
          timeout: 20_000,
        });
        await page.waitForTimeout(1200); // mock API delay + transitions
        if (screen.click) {
          const target = page
            .getByRole("button", { name: screen.click })
            .or(page.getByRole("link", { name: screen.click }))
            .first();
          await target.click({ timeout: 5000 });
          await page.waitForTimeout(1200);
        }
        await page.screenshot({
          path: path.join(outDir, `${screen.name}.png`),
          fullPage: true,
        });
        if (consoleErrors.length)
          errors[screen.name] = consoleErrors.join("; ").slice(0, 500);
      } catch (error) {
        errors[screen.name] = String((error as Error).message).split("\n")[0];
        await page
          .screenshot({
            path: path.join(outDir, `${screen.name}.png`),
            fullPage: true,
          })
          .catch(() => {});
      } finally {
        await page.close();
      }
    }
  } finally {
    try {
      process.kill(-server.pid!, "SIGTERM");
    } catch {
      server.kill();
    }
  }
  return errors;
}
