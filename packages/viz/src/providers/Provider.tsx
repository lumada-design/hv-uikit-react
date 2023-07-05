import { useTheme } from "@hitachivantara/uikit-react-core";
import { registerThemes } from "@viz/utils";
import { createContext, useMemo } from "react";

export interface HvVizContextValue {
  /**
   * Current theme
   */
  theme?: string;
}

export const HvVizContext = createContext<HvVizContextValue>({
  theme: undefined,
});

export interface HvVizProviderProps {
  /**
   * Component tree.
   */
  children?: React.ReactNode;
}

/**
 * Enables theming capabilities for visualizations.
 *
 * Without this provider the visualizations will not comply to the UI Kit themes.
 *
 * This provider should always be used in combination with the `HvProvider` from
 * the core package since the former uses the themes provided by the latter.
 *
 * `HvVizProvider` should always be used after `HvProvider` like so to work properly:
 *
 * ```
 * <HvProvider>
 *    <HvVizProvider>
 *        (...)
 *    </HvVizProvider>
 * </HvProvider>
 * ```
 */
export const HvVizProvider = ({ children }: HvVizProviderProps) => {
  const { activeTheme, colorModes, selectedMode, selectedTheme } = useTheme();

  const value = useMemo<HvVizContextValue>(() => {
    registerThemes(selectedTheme, colorModes, activeTheme);

    return {
      theme: `${selectedTheme}-${selectedMode}`,
    };
  }, [selectedMode, selectedTheme, colorModes, activeTheme]);

  return (
    <HvVizContext.Provider value={value}>{children}</HvVizContext.Provider>
  );
};
