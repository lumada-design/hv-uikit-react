import fs from "node:fs";
import type { Plugin, PluginOption } from "vite";
import { vi } from "vitest";

import injectMetadata from "../vite-metadata-plugin";

describe("test vite-metadata plugin", () => {
  it.skip("it returns the injectMetadata information", () => {
    const fsTmp = fs.existsSync;
    fs.existsSync = vi.fn().mockImplementation((file: string) => {
      return file.match("/dummyPath/dummyRootProject/app-shell.config.json");
    });

    const readFileSyncTmp = fs.readFileSync;
    fs.readFileSync = vi.fn().mockImplementation((file: string) => {
      const version = (packageFile: string) => {
        if (
          packageFile.indexOf("/client/packages/app-shell-ui/package.json") >= 0
        ) {
          return "appShellUIDummyVersion";
        }
        if (
          packageFile.indexOf(
            "/client/packages/app-shell-vite-plugin/package.json",
          ) >= 0
        ) {
          return "appShellVitePluginDummyVersion";
        }
        return "dummyVersion";
      };
      return JSON.stringify({ version: version(file) });
    });

    const metadata: PluginOption = injectMetadata();
    const { transformIndexHtml } = metadata as Plugin;
    // @ts-expect-error This is a function and is callable
    expect(transformIndexHtml()).toMatchObject([
      {
        attrs: {
          content: "appShellUIDummyVersion",
          name: "app-shell-ui-version",
        },
        tag: "meta",
      },
      {
        attrs: {
          content: "appShellVitePluginDummyVersion",
          name: "app-shell-vite-plugin-version",
        },
        tag: "meta",
      },
    ]);

    // Restore the original fs.existsSync
    fs.existsSync = fsTmp;
    // Restore the original fs.existsSync
    fs.readFileSync = readFileSyncTmp;
  });
});
