import { loader } from "@monaco-editor/react";

// Use monaco-editor types for development/build time type checking
declare global {
  // eslint-disable-next-line no-var
  var MonacoEnvironment: import("monaco-editor").Environment | undefined;
}

let isConfigured = false;
let initPromise: Promise<void> | null = null;

/**
 * Configure Monaco Editor for offline support with bundled workers (Vite).
 * Safe for SSR and idempotent (repeated calls are no-ops unless force=true).
 */
export const configureMonacoOffline = async (options?: {
  force?: boolean;
}): Promise<void> => {
  // Skip if already configured or in-flight (unless forced)
  if (!options?.force && (isConfigured || initPromise)) {
    return initPromise ?? Promise.resolve();
  }

  // SSR guard
  if (typeof window === "undefined") return;

  initPromise = (async () => {
    try {
      // Import Monaco ESM (handles both default and named exports)
      const monacoNs = await import("monaco-editor");
      const monaco = monacoNs.default ?? monacoNs;
      loader.config({ monaco });

      // Load Vite workers (browser-only)
      if (typeof self !== "undefined") {
        const [editorWorker, jsonWorker, cssWorker, htmlWorker, tsWorker] =
          await Promise.all([
            import("monaco-editor/esm/vs/editor/editor.worker?worker"),
            import("monaco-editor/esm/vs/language/json/json.worker?worker"),
            import("monaco-editor/esm/vs/language/css/css.worker?worker"),
            import("monaco-editor/esm/vs/language/html/html.worker?worker"),
            import("monaco-editor/esm/vs/language/typescript/ts.worker?worker"),
          ]);

        globalThis.MonacoEnvironment = {
          getWorker(_, label) {
            switch (label) {
              case "json":
                return new jsonWorker.default();
              case "css":
                return new cssWorker.default();
              case "html":
                return new htmlWorker.default();
              case "typescript":
              case "javascript":
                return new tsWorker.default();
              default:
                return new editorWorker.default();
            }
          },
        };
      }

      await loader.init();
      isConfigured = true;
    } catch (error) {
      console.warn("Monaco offline setup failed, falling back to CDN:", error);
      // Optional: Configure CDN fallback here
      // loader.config({ paths: { vs: '/monaco/vs' } });
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
};

/**
 * Apply custom @monaco-editor/react loader configuration.
 */
export const configureMonaco = (
  config: Parameters<typeof loader.config>[0],
): void => {
  loader.config(config);
};
