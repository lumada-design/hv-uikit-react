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
    color: colors?.text,
    fontWeight: themeStructure?.fontWeights.normal,
    fontSize: themeStructure?.fontSizes.sm,
    fontFamily: themeStructure?.fontFamily.body,
  };

  const customAxis = {
    nameTextStyle: {
      ...baseText,
      color: colors?.textSubtle,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: colors?.borderSubtle,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: colors?.borderSubtle,
      },
    },
    axisLabel: {
      color: colors?.textSubtle,
      fontWeight: themeStructure?.fontWeights.normal,
      fontSize: themeStructure?.fontSizes.sm,
      fontFamily: themeStructure?.fontFamily.body,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: colors?.borderSubtle,
      },
    },
  };

  echarts.registerTheme(themeName, {
    color: [
      colors?.viz1,
      colors?.viz2,
      colors?.viz3,
      colors?.viz4,
      colors?.viz5,
      colors?.viz6,
      colors?.viz7,
      colors?.viz8,
      colors?.viz9,
      colors?.viz10,
      colors?.viz11,
      colors?.viz12,
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
          color: colors?.text,
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
        borderColor: colors?.borderSubtle,
        borderWidth: 1,
      },
    },
    treemap: {
      breadcrumb: {
        itemStyle: {
          color: colors?.text,
          textStyle: {
            color: colors?.bgContainer,
          },
        },
      },
    },
  });
};
