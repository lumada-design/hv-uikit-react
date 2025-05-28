import * as echarts from "echarts/core";
import type { HvTheme } from "@hitachivantara/uikit-react-utils";

export const registerTheme = (
  themeName: string,
  mode: string,
  themeStructure?: HvTheme,
) => {
  const colors = themeStructure?.colors.modes[mode];
  // if theme & mode is invalid, exit (to use the default theme)
  if (!colors) return;

  const baseText = {
    color: colors?.secondary,
    fontWeight: themeStructure?.fontWeights.normal,
    fontSize: themeStructure?.fontSizes.sm,
    fontFamily: themeStructure?.fontFamily.body,
  };

  const customAxis = {
    nameTextStyle: {
      ...baseText,
      color: colors?.secondary_80,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors?.atmo3,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: colors?.atmo3,
      },
    },
    axisLabel: {
      color: colors?.secondary_80,
      fontWeight: themeStructure?.fontWeights.normal,
      fontSize: themeStructure?.fontSizes.sm,
      fontFamily: themeStructure?.fontFamily.body,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: colors?.atmo3,
      },
    },
  };

  echarts.registerTheme(themeName, {
    color: [
      colors?.cat1,
      colors?.cat2,
      colors?.cat3,
      colors?.cat4,
      colors?.cat5,
      colors?.cat6,
      colors?.cat7,
      colors?.cat8,
      colors?.cat9,
      colors?.cat10,
      colors?.cat11,
      colors?.cat12,
    ],
    legend: {
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
          color: colors?.secondary,
          width: 1,
        },
      },
    },
    dataZoom: {
      textStyle: { ...baseText },
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
    },
    visualMap: {
      textStyle: {
        ...baseText,
      },
    },
    heatmap: {
      label: {
        fontWeight: baseText.fontWeight,
        fontSize: baseText.fontSize,
        fontFamily: baseText.fontFamily,
      },
      itemStyle: {
        borderColor: colors?.atmo3,
        borderWidth: 1,
      },
    },
    treemap: {
      breadcrumb: {
        itemStyle: {
          color: colors?.secondary,
          textStyle: {
            color: colors?.atmo1,
          },
        },
      },
    },
  });
};
