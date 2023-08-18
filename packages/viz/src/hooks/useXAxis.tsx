import { useMemo } from "react";

import type { EChartsOption } from "echarts-for-react/lib/types";

import { useTheme } from "@hitachivantara/uikit-react-core";

import { getAxisType } from "@viz/utils";
import { HvChartXAxis } from "@viz/types/common";

interface HvXAxisHookProps extends HvChartXAxis {
  scale?: boolean;
  data?: string[];
}

export const useXAxis = ({
  id,
  type = "categorical",
  labelFormatter,
  labelRotation,
  name,
  maxValue,
  minValue,
  scale = false,
  data,
  position,
  nameProps,
}: HvXAxisHookProps) => {
  const { activeTheme, selectedMode } = useTheme();

  const option = useMemo<Pick<EChartsOption, "xAxis">>(() => {
    const nameStyleKeys = nameProps
      ? Object.keys(nameProps).filter((key) => key !== "location")
      : undefined;
    const nameStyle =
      nameProps && nameStyleKeys
        ? nameStyleKeys.reduce((acc, curr) => {
            return {
              ...acc,
              [curr]:
                curr === "color"
                  ? activeTheme?.colors.modes[selectedMode][
                      nameProps[curr] as string
                    ] || nameProps[curr]
                  : nameProps[curr],
            };
          }, {})
        : undefined;

    return {
      xAxis: {
        id,
        type: getAxisType(type),
        name,
        scale,
        axisLabel: {
          rotate: labelRotation ?? 0,
          formatter: labelFormatter,
        },
        max: maxValue === "max" ? "dataMax" : maxValue,
        min: minValue === "min" ? "dataMin" : minValue,
        ...(nameProps?.location && {
          nameLocation: nameProps.location,
        }),
        ...(nameStyle && {
          nameTextStyle: nameStyle,
        }),
        ...(data && { data }),
        ...(position && { position }),
      },
    };
  }, [
    nameProps,
    id,
    type,
    name,
    scale,
    labelRotation,
    labelFormatter,
    maxValue,
    minValue,
    data,
    position,
    activeTheme?.colors.modes,
    selectedMode,
  ]);

  return option;
};
