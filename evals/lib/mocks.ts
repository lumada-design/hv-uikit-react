/**
 * Render the design mocks (evals/mocks/<scenario>.tsx) to PNGs in the
 * scenario folders, using the same template and UI Kit as the runs. The mock
 * sources stay out of run workspaces: agents only see the PNGs.
 */
import fs from "node:fs";
import path from "node:path";

import { build, closeBrowser, createApp, screenshots } from "./app.ts";
import { CACHE, MOCKS, SCENARIOS } from "./paths.ts";

export async function renderMocks() {
  const dir = path.join(CACHE, "mocks-app");
  createApp(dir);
  const ids = fs
    .readdirSync(MOCKS)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, ""));
  const routes = ids
    .map(
      (id) =>
        `  { path: "/mock/${id}", lazy: () => import("./pages/mock-${id}") },`,
    )
    .join("\n");
  for (const id of ids)
    fs.copyFileSync(
      path.join(MOCKS, `${id}.tsx`),
      path.join(dir, "src", "pages", `mock-${id}.tsx`),
    );
  const routesFile = path.join(dir, "src", "routes.tsx");
  // Mock routes stay out of the header navigation, so a mock shows no other scenario.
  fs.writeFileSync(
    routesFile,
    fs
      .readFileSync(routesFile, "utf8")
      .replace("  // APP ROUTES", `${routes}\n  // APP ROUTES`)
      .replace(
        /export const navigationData = [\s\S]*$/,
        "export const navigationData: NavigationData[] = [];\n",
      ),
  );

  const built = build(dir);
  if (!built.ok) throw new Error(`mocks failed to build:\n${built.output}`);
  for (const id of ids) {
    const scenario = JSON.parse(
      fs.readFileSync(path.join(SCENARIOS, id, "scenario.json"), "utf8"),
    );
    const screens = (scenario.mocks as string[]).map((file) => ({
      path: `/mock/${id}${file.includes("delete") ? "?dialog=1" : ""}`,
      name: file.replace(/\.png$/, ""),
    }));
    const errors = await screenshots(dir, screens, path.join(SCENARIOS, id));
    if (Object.keys(errors).length)
      throw new Error(`mock ${id}: ${JSON.stringify(errors)}`);
    console.info(`mocks: ${id} → ${scenario.mocks.join(", ")}`);
  }
  await closeBrowser();
}
