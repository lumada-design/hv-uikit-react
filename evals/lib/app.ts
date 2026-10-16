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

/** Fresh app in `dir`: template sources and config, base node_modules hard-linked, base package.json. */
export function createApp(dir: string, extraFiles?: string) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(TEMPLATE)) {
    if (entry === "node_modules" || entry === "package.json") continue;
    fs.cpSync(path.join(TEMPLATE, entry), path.join(dir, entry), {
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
    ["-al", path.join(BASE, "node_modules"), path.join(dir, "node_modules")],
    { cwd: dir },
  );
  if (extraFiles && fs.existsSync(extraFiles))
    fs.cpSync(extraFiles, dir, { recursive: true });
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
  const server = spawn(
    "npx",
    ["vite", "preview", "--port", String(port), "--strictPort"],
    { cwd: dir, stdio: "ignore" },
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
    server.kill();
  }
  return errors;
}
