import { HvTheme } from "@hitachivantara/uikit-react-core";
import * as echarts from "echarts/core";

export const registerThemes = (
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
        themeStructure?.colors.modes[mode].cat7,
        themeStructure?.colors.modes[mode].cat8,
        themeStructure?.colors.modes[mode].cat9,
        themeStructure?.colors.modes[mode].cat10,
        themeStructure?.colors.modes[mode].cat11,
        themeStructure?.colors.modes[mode].cat12,
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
            color: themeStructure?.colors.modes[mode].secondary,
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
    });
  });
};
