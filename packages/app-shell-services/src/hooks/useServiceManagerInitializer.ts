import useServiceManager from "./useServiceManager";

/**
 * Initializer hook for the service manager intended for internal use
 * by app-shell-ui to pre-initialize the service manager and avoid
 * first-use loading penalties when calling the main hooks.
 */
export function useServiceManagerInitializer(): void {
  useServiceManager();
}
