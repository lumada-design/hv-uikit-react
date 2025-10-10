import { loader } from "@monaco-editor/react";
import type { Monaco } from "@monaco-editor/react";

declare global {
  // eslint-disable-next-line no-var
  var MonacoEnvironment: import("monaco-editor").Environment | undefined;
}

// Singleton state
let monacoInstance: Monaco | null = null;
let initPromise: Promise<Monaco> | null = null;

type WorkerLabel = "json" | "css" | "html" | "typescript" | "javascript";

interface WorkerModule {
  default: new () => Worker;
}

interface MonacoConfigOptions {
  /** Whether to use offline mode with Monaco Editor workers bundled (Vite-compatible only) */
  offlineMode?: boolean;
  /** Force reconfiguration even if already initialized */
  force?: boolean;
}

/**
 * Detects if the application is using Vite bundler
 */
const isViteBundler = (): boolean => {
  // Check for Vite-specific environment variables
  return (
    import.meta !== undefined &&
    import.meta.env !== undefined &&
    import.meta.env.MODE !== undefined
  );
};

/**
 * Configure Monaco Editor with optional offline mode. (Vite-compatible only)
 * When true, workers are bundled with your application.
 * When false, workers are loaded from CDN.
 * Safe for SSR and safe to call multiple times. Returns cached Monaco instance on subsequent calls.
 *
 * @param options Configuration options
 * @returns Promise resolving to Monaco instance or null
 */
export const configureMonaco = async (
  options: MonacoConfigOptions = {},
): Promise<Monaco | null> => {
  const { offlineMode = false, force = false } = options;
  // SSR guard
  if (typeof window === "undefined") return null;

  // Return cached instance
  if (!force && monacoInstance) return monacoInstance;
  if (!force && initPromise) return initPromise;

  // Determine if offline mode should be used
  const shouldUseOfflineMode = offlineMode && isViteBundler();

  initPromise = (async () => {
    try {
      let monaco: Monaco;

      if (shouldUseOfflineMode) {
        // Try bundled workers first
        try {
          // Load Monaco namespace
          const monacoNs = await import("monaco-editor");
          monaco = monacoNs.default ?? monacoNs;
          loader.config({ monaco });

          // Configure workers (browser only)
          if (typeof self !== "undefined") {
            const [editorWorker, jsonWorker, cssWorker, htmlWorker, tsWorker] =
              await Promise.all([
                import("monaco-editor/esm/vs/editor/editor.worker?worker"),
                import("monaco-editor/esm/vs/language/json/json.worker?worker"),
                import("monaco-editor/esm/vs/language/css/css.worker?worker"),
                import("monaco-editor/esm/vs/language/html/html.worker?worker"),
                import(
                  "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
                ),
              ]);

            const workerMap: Record<WorkerLabel | "default", WorkerModule> = {
              json: jsonWorker,
              css: cssWorker,
              html: htmlWorker,
              typescript: tsWorker,
              javascript: tsWorker,
              default: editorWorker,
            };

            globalThis.MonacoEnvironment = {
              getWorker: (_, label) => {
                const worker =
                  workerMap[label as WorkerLabel] ?? workerMap.default;
                return new worker.default();
              },
            };
          }
        } catch (bundlingError) {
          if (import.meta.env.DEV) {
            console.warn(
              "Monaco offline mode failed, falling back to CDN:",
              bundlingError,
            );
          }
          // Fall back to CDN mode
          monaco = await loader.init();
        }
      } else {
        // Use CDN mode directly
        monaco = await loader.init();
      }

      monacoInstance = monaco;
      return monaco;
    } catch (error) {
      console.error("Monaco initialization failed:", error);
      throw error;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
};
