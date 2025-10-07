let isConfigured = false;

/**
 * Configure Monaco Editor for offline support
 * - Uses dynamic imports to avoid bundling Monaco when not needed
 * - Graceful fallback to CDN in non-Vite environments
 */
export const configureMonacoOffline = async (
  options: { force?: boolean } = {},
) => {
  if (isConfigured && !options.force) return;

  try {
    const [{ loader }, monaco] = await Promise.all([
      import("@monaco-editor/react"),
      import("monaco-editor"),
    ]);

    loader.config({ monaco: monaco.default || monaco });

    // Configure workers for Vite environments
    try {
      const [editorWorker, jsonWorker, cssWorker, htmlWorker, tsWorker] =
        await Promise.all([
          import("monaco-editor/esm/vs/editor/editor.worker?worker"),
          import("monaco-editor/esm/vs/language/json/json.worker?worker"),
          import("monaco-editor/esm/vs/language/css/css.worker?worker"),
          import("monaco-editor/esm/vs/language/html/html.worker?worker"),
          import("monaco-editor/esm/vs/language/typescript/ts.worker?worker"),
        ]);

      if (typeof self !== "undefined") {
        self.MonacoEnvironment = {
          getWorker(_, label) {
            if (label === "json") return new (jsonWorker as any).default();
            if (label === "css") return new (cssWorker as any).default();
            if (label === "html") return new (htmlWorker as any).default();
            if (label === "typescript" || label === "javascript") {
              return new (tsWorker as any).default();
            }
            return new (editorWorker as any).default();
          },
        };
      }
    } catch {
      // Worker imports failed - expected in non-Vite environments
    }

    isConfigured = true;
  } catch {
    // Monaco import failed - fall back to CDN
  }
};
