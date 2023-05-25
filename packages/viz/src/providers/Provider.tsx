import { HvTheme, useTheme } from "@hitachivantara/uikit-react-core";
import * as echarts from "echarts/core";
import { createContext, useEffect, useState } from "react";

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

  const [theme, setTheme] = useState<string | undefined>();

  const registerThemes = (
    themeName: string,
    modes: string[],
    themeStructure?: HvTheme
  ) => {
    modes.forEach((mode) => {
      const baseText = {
        color: themeStructure?.colors.modes[mode].secondary,
        fontWeight: themeStructure?.fontWeights.normal,
        fontSize: themeStructure?.fontSizes.sm,
        fontFamily: themeStructure?.fontFamily.body,
      };

      const customAxis = {
        nameTextStyle: {
          ...baseText,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: themeStructure?.colors.modes[mode].atmo3,
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: themeStructure?.colors.modes[mode].atmo3,
          },
        },
        axisLabel: {
          color: themeStructure?.colors.modes[mode].secondary_80,
          fontWeight: themeStructure?.fontWeights.normal,
          fontSize: themeStructure?.fontSizes.sm,
          fontFamily: themeStructure?.fontFamily.body,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: themeStructure?.colors.modes[mode].atmo3,
          },
        },
      };

      echarts.registerTheme(`${themeName}-${mode}`, {
        color: [
          themeStructure?.colors.modes[mode].cat1,
          themeStructure?.colors.modes[mode].cat2,
          themeStructure?.colors.modes[mode].cat3,
          themeStructure?.colors.modes[mode].cat4,
          themeStructure?.colors.modes[mode].cat5,
          themeStructure?.colors.modes[mode].cat6,
        ],
        legend: {
          icon: "path://M0,0L16,0L16,2L0,2Z",
          textStyle: {
            ...baseText,
          },
        },
        tooltip: {
          borderWidth: 0,
          padding: 0,
          textStyle: {
            ...baseText,
          },
          axisPointer: {
            lineStyle: {
              color: themeStructure?.colors.modes[mode].secondary,
              width: 1,
            },
          },
        },
        categoryAxis: {
          ...customAxis,
        },
        valueAxis: {
          ...customAxis,
        },
        logAxis: {
          ...customAxis,
        },
        timeAxis: {
          ...customAxis,
        },
        line: {
          lineStyle: {
            width: 2,
          },
          symbol: "none",
        },
      });
    });
  };

  useEffect(() => {
    registerThemes(selectedTheme, colorModes, activeTheme);
  }, [selectedTheme]);

  useEffect(() => {
    setTheme(`${selectedTheme}-${selectedMode}`);
  }, [selectedMode, selectedTheme]);

  return (
    <HvVizContext.Provider value={{ theme }}>{children}</HvVizContext.Provider>
  );
};
