import { defineConfig } from "vitest/config";

// Node-only package: keep it out of the repo's DOM/storybook test projects.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    testTimeout: 30000,
  },
});
