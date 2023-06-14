import { useEffect, useMemo, useRef, useState } from "react";
import { css, cx } from "@emotion/css";

import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  AriaComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import type {
  EChartsOption,
  LineSeriesOption,
  YAXisComponentOption,
} from "echarts";

import ReactECharts from "echarts-for-react";

import { from, internal, not, table, desc } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";

import {
  HvChartAggregation,
  HvChartOrder,
  HvChartAxis,
  HvChartEmptyCellMode,
  HvChartSampling,
  HvChartTooltipType,
} from "@viz/types";
import { getAgFunc, getAxisType, getLegendIcon } from "@viz/utils";
import { useVizTheme } from "@viz/hooks";

import { multipleStyles, singleStyles } from "./LineChart.styles";
import lineChartClasses, { HvLineChartClasses } from "./lineChartClasses";

// Register chart components
echarts.use([
  LineChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  AriaComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
]);

type GroupByField = string;
type SplitByField = string;

type FullMeasuresField = {
  /** Column name. */
  field: string;
  /** Sampling function to use. */
  sampling?: HvChartSampling;
  /** Id of the yAxis. */
  yAxis?: string;
  /** Whether to hide the symbol for data points. Defaults to `false`. */
  hideSymbol?: boolean;
  /** Aggregation function to use. If no `agg` is defined, it will default to `sum`. */
  agg?: HvChartAggregation;
  /** Whether the area under the lines should be filled. If not specified, it defaults to the global `area` prop. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. If not specified, it defaults to the global `areaOpacity` prop. */
  areaOpacity?: number;
  /**
   * Stack name to use when the measure should be stacked.
   *
   * Measures stacked together have the same name.
   *
   * If not specified, it defaults to the global `stacked` prop.
   */
  stack?: string;
  /** Strategy to use when there are empty cells. If not specified, it defaults to the global `emptyCellMode` prop. */
  emptyCellMode?: HvChartEmptyCellMode;
  /** Formatter for the value in the tooltip. If not specified, it defaults to the one defined in the global `tooltip` prop. */
  valueFormatter?: (value?: string | number) => string;
};

type MeasuresField = string | FullMeasuresField;

type FullSortByField = {
  /** Column name. */
  field: string;
  /** Order function to use. If no `order` is defined, it will default to `asc`. */
  order?: HvChartOrder;
};
type SortByField = string | FullSortByField;

export interface HvLineChartProps {
  /** Chart data. */
  data:
    | Map<string | number, (string | number)[]>
    | Record<string | number, (string | number)[]>
    | Record<string | number, string | number>[]
    | ColumnTable;
  /** Columns to use to group the data. */
  groupBy: GroupByField | GroupByField[];
  /**  Columns to measure on the chart. */
  measures: MeasuresField | MeasuresField[];
  /** Columns to use to split the measures. */
  splitBy?: SplitByField | SplitByField[];
  /** Columns to use to sort the data points. */
  sortBy?: SortByField | SortByField[];
  /**
   * Options for the xAxis, i.e. the horizontal axis.
   *
   * The default `type` for this axis is `categorical`.
   * */
  xAxis?: HvChartAxis;
  /**
   * Options for the yAxis, i.e. the vertical axis.
   *
   * The default `type` for this axis is `continuous`.
   * */
  yAxis?: HvChartAxis | [HvChartAxis, HvChartAxis];
  /** Tooltip options. */
  tooltip?: {
    /** Whether to show the tooltip or not. Defaults to `true`. */
    show?: boolean;
    /** Formatter for the value in the tooltip. */
    valueFormatter?: (value?: string | number) => string;
    /** Tooltip type: single line or multiple lines modes. The single line mode should only be used when there's one series. Defaults to `multiple`. */
    type?: HvChartTooltipType;
  };
  /** Legend options. */
  legend?: {
    /** Whether to show the legend or not. The legend will appear by default for multiple series. Otherwise, the legend will not be shown. */
    show?: boolean;
  };
  /** Formatter for the series names used on the tooltips and legend. */
  seriesNameFormatter?: (value?: string) => string;
  /** Strategy to use when there are empty cells. Defaults to `void`. */
  emptyCellMode?: HvChartEmptyCellMode;
  /** Whether the area under the lines should be filled. Defaults to `false`. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. Defaults to `0.5`. */
  areaOpacity?: number;
  /** Stack name to use when all the series should be stacked together. If not provided, the series are not stacked. */
  stack?: string;
  /** Ranger slider options for the horizontal axis. */
  horizontalRangeSlider?: {
    /** Whether to show the ranger slider or not. Defaults to `false`. */
    show?: boolean;
  };
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLineChartClasses;
  /** Grid options. */
  grid?: {
    /** Distance between the grid and the top of the container. */
    top?: string | number;
    /** Distance between the grid and the right side of the container. */
    right?: string | number;
    /** Distance between the grid and the left side of the container. */
    left?: string | number;
    /** Distance between the grid and the bottom of the container. */
    bottom?: string | number;
  };
}

/**
 * A line chart or line plot or line graph is a type of chart which displays information as a series of data points
 * connected by straight line segments. It is a basic type of chart common in many fields.
 */
export const HvLineChart = ({
  data,
  groupBy,
  splitBy,
  measures,
  sortBy,
  xAxis,
  yAxis,
  legend,
  tooltip,
  seriesNameFormatter,
  area = false,
  stack,
  emptyCellMode = "void",
  horizontalRangeSlider,
  areaOpacity = 0.5,
  classes,
  grid,
}: HvLineChartProps) => {
  const { theme } = useVizTheme();

  const currentTheme = useRef<string | undefined>(theme);
  const chartRef = useRef<ReactECharts>(null);
  const isMounted = useRef<boolean>(false);

  const groupByKey = Array.isArray(groupBy) ? groupBy.join("_") : groupBy;

  const chartData = useMemo<ColumnTable>(() => {
    let tableData: ColumnTable;
    if (data instanceof internal.ColumnTable) {
      tableData = data;
    } else if (Array.isArray(data)) {
      tableData = from(data);
    } else {
      tableData = table(data);
    }

    const groupByFields = groupBy
      ? Array.isArray(groupBy)
        ? groupBy
        : [groupBy]
      : [];

    const splitByFields = Array.isArray(splitBy)
      ? splitBy
      : splitBy != null
      ? [splitBy]
      : [];

    const measuresFields: { [key: string]: string } =
      measures == null
        ? {}
        : typeof measures === "string"
        ? { [measures]: getAgFunc("sum", measures) }
        : Array.isArray(measures)
        ? measures.reduce<{ [key: string]: string }>((acc, value) => {
            let field: string;
            let agFunction: HvChartAggregation;
            if (typeof value === "string") {
              field = value;
              agFunction = "sum";
            } else {
              field = value.field;
              agFunction = value.agg ?? "sum";
            }

            return {
              ...acc,
              [field]: getAgFunc(agFunction, field),
            };
          }, {})
        : {
            [measures.field]: getAgFunc(measures.agg ?? "sum", measures.field),
          };

    const sortByFields: { [key: string]: HvChartOrder } =
      sortBy == null
        ? {}
        : typeof sortBy === "string"
        ? { [sortBy]: "asc" }
        : Array.isArray(sortBy)
        ? sortBy.reduce<{ [key: string]: HvChartOrder }>((acc, value) => {
            let field: string;
            let orderFunction: HvChartOrder;
            if (typeof value === "string") {
              field = value;
              orderFunction = "asc";
            } else {
              field = value.field;
              orderFunction = value.order ?? "asc";
            }

            return {
              ...acc,
              [field]: orderFunction,
            };
          }, {})
        : { [sortBy.field]: sortBy.order ?? "asc" };

    const allFields = [
      ...groupByFields,
      ...splitByFields,
      ...Object.keys(measuresFields),
    ];

    // remove unneeded fields
    tableData = tableData.select(...allFields);

    // group by groupBy fields
    if (groupByFields.length > 0) {
      tableData = tableData.groupby(groupByFields);
    }

    if (splitByFields.length > 0) {
      // pivot by splitBy fields
      tableData = tableData.pivot(splitByFields, measuresFields);
    } else {
      // if there is no splitBy fields, just aggregate measures fields
      tableData = tableData.rollup(measuresFields);
    }

    // if grouped by multiple fields, create a new joint field
    // as the line chart doesn't implement hierarchical axis label grouping
    if (groupByFields.length > 1) {
      const expression = `d => ${groupByFields
        .map((field) => `d.${field}`)
        .join(" + '_' + ")}`;

      tableData = tableData.derive(
        { [groupByKey]: expression },
        { after: groupByFields[groupByFields.length - 1] }
      );
    }

    // sort by sortBy fields
    if (Object.keys(sortByFields).length > 0) {
      tableData = tableData.orderby(
        ...Object.keys(sortByFields)
          // only sort by fields that are in the table, ignore the rest
          .filter((key) => allFields.includes(key))
          .map((key) => (sortByFields[key] === "desc" ? desc(key) : key))
      );
    }

    // if a derived field was created, remove the original fields
    if (groupByFields.length > 1) {
      tableData = tableData.select(not(...groupByFields));
    }

    return tableData;
  }, [data, groupBy, groupByKey, splitBy, measures, sortBy]);

  const chartDataset = useMemo<Pick<EChartsOption, "dataset">>(() => {
    return {
      dataset: {
        source: chartData.columnNames().reduce(
          (acc, c) => ({
            ...acc,
            [c]: chartData.array(c),
          }),
          {}
        ),
      },
    };
  }, [chartData]);

  const chartXAxis = useMemo<Pick<EChartsOption, "xAxis">>(() => {
    return {
      xAxis: {
        type: getAxisType(xAxis?.type) ?? "category",
        name: xAxis?.name,
        scale: true,
        axisLabel: {
          rotate: xAxis?.labelRotation ?? 0,
          formatter: xAxis?.labelFormatter,
        },
        max: xAxis?.maxValue === "max" ? "dataMax" : xAxis?.maxValue,
        min: xAxis?.minValue === "min" ? "dataMin" : xAxis?.minValue,
      },
    };
  }, [
    xAxis?.labelFormatter,
    xAxis?.labelRotation,
    xAxis?.name,
    xAxis?.type,
    xAxis?.maxValue,
    xAxis?.minValue,
  ]);

  const chartYAxis = useMemo<Pick<EChartsOption, "yAxis">>(() => {
    if (!yAxis || !Array.isArray(yAxis)) {
      return {
        yAxis: {
          id: yAxis?.id,
          type: getAxisType(yAxis?.type) ?? "value",
          name: yAxis?.name,
          axisLabel: {
            rotate: yAxis?.labelRotation ?? 0,
            formatter: yAxis?.labelFormatter,
          },
          max: yAxis?.maxValue === "max" ? "dataMax" : yAxis?.maxValue,
          min: yAxis?.minValue === "min" ? "dataMin" : yAxis?.minValue,
        },
      };
    }

    return {
      yAxis: yAxis.map<YAXisComponentOption>((axis) => ({
        id: axis?.id,
        type: getAxisType(axis?.type) ?? "value",
        name: axis?.name,
        axisLabel: {
          rotate: axis?.labelRotation ?? 0,
          formatter: axis?.labelFormatter,
        },
        max: axis?.maxValue === "max" ? "dataMax" : axis?.maxValue,
        min: axis?.minValue === "min" ? "dataMin" : axis?.minValue,
      })),
    };
  }, [yAxis]);

  const getMeasure = (name: string, msr: MeasuresField | MeasuresField[]) => {
    const measureName = name.split("_")[0];
    const measuresArray = Array.isArray(msr) ? msr : [msr];
    // find the measure in measures array or return the first one
    return (
      measuresArray.find((m) => {
        if (typeof m === "string") {
          return m === measureName;
        }
        return m.field === measureName;
      }) ?? measuresArray[0]
    );
  };

  const chartSeries = useMemo<Pick<EChartsOption, "series">>(() => {
    return {
      series: chartData
        .columnNames()
        .filter((c) => c !== groupByKey)
        .map<LineSeriesOption>((c) => {
          const measure = getMeasure(c, measures);

          const showSymbol =
            typeof measure !== "string" ? !measure.hideSymbol : true;
          const sampling =
            typeof measure !== "string" ? measure.sampling : undefined;
          const yAxisId =
            typeof measure !== "string" ? measure.yAxis : undefined;
          const isArea =
            typeof measure !== "string" ? measure.area ?? area : area;
          const aOpacity =
            typeof measure !== "string"
              ? measure.areaOpacity ?? areaOpacity
              : areaOpacity;
          const stackName =
            typeof measure !== "string"
              ? measure.stack ?? stack ?? undefined
              : stack ?? undefined;
          const connectNulls =
            typeof measure !== "string" && measure.emptyCellMode
              ? measure.emptyCellMode === "connect"
              : emptyCellMode === "connect";

          return {
            id: `series~${groupByKey}~${c}`,
            name: seriesNameFormatter ? seriesNameFormatter(c) : c,
            encode: { x: groupByKey, y: c },
            type: "line",
            showSymbol,
            sampling,
            areaStyle: isArea ? { opacity: aOpacity } : undefined,
            connectNulls,
            stack: stackName,
            yAxisId,
          };
        }),
    };
  }, [
    chartData,
    groupByKey,
    area,
    stack,
    seriesNameFormatter,
    emptyCellMode,
    areaOpacity,
    measures,
  ]);

  const renderTooltip = (
    params: {
      seriesName: string;
      value: (string | number)[];
      encode: { [key: string]: number[] };
      color: string;
      dimensionNames: string[];
    }[],
    single: boolean,
    msr: MeasuresField | MeasuresField[],
    customClasses?: HvLineChartClasses,
    formatter?: (value?: string | number) => string
  ) => {
    const tooltipName = params[0].value[params[0].encode.x[0]];

    if (single) {
      const measure = getMeasure(
        params[0].dimensionNames[params[0].encode.y[0]],
        msr
      );
      const value = params[0].value[params[0].encode.y[0]];
      const formattedValue =
        typeof measure !== "string" && measure.valueFormatter
          ? measure.valueFormatter(value)
          : formatter
          ? formatter(value)
          : value;

      return `
        <div class="${cx(
          lineChartClasses?.tooltipRoot,
          css(singleStyles.tooltipRoot),
          customClasses?.tooltipRoot
        )}">
          <p class="${cx(
            lineChartClasses?.tooltipSeriesName,
            css(singleStyles.tooltipSeriesName),
            customClasses?.tooltipSeriesName
          )}">${tooltipName}</p>
          <p class="${cx(
            lineChartClasses?.tooltipSeriesValue,
            css(singleStyles.tooltipSeriesValue),
            customClasses?.tooltipSeriesValue
          )}">${formattedValue}</p>
        </div>
        `;
    }

    return `
    <div class="${cx(
      lineChartClasses?.tooltipRoot,
      css(multipleStyles.tooltipRoot),
      customClasses?.tooltipRoot
    )}">
      <div class="${cx(
        lineChartClasses?.tooltipTitleContainer,
        css(multipleStyles.tooltipTitleContainer),
        customClasses?.tooltipTitleContainer
      )}">
        <div>
          <p class="${cx(
            lineChartClasses?.tooltipTitle,
            css(multipleStyles.tooltipTitle),
            customClasses?.tooltipTitle
          )}">${tooltipName}</p>
        </div>
      </div>
      <div class="${cx(
        lineChartClasses?.tooltipValuesContainer,
        css(multipleStyles.tooltipValuesContainer),
        customClasses?.tooltipValuesContainer
      )}">
        ${params
          .map((s) => {
            const measure = getMeasure(s.dimensionNames[s.encode.y[0]], msr);
            const value = s.value[s.encode.y[0]];
            const formattedValue =
              typeof measure !== "string" && measure.valueFormatter
                ? measure.valueFormatter(value)
                : formatter
                ? formatter(value)
                : value;

            return `
            <div key="${s.seriesName}" class="${cx(
              lineChartClasses?.tooltipSeriesContainer,
              css(multipleStyles.tooltipSeriesContainer),
              customClasses?.tooltipSeriesContainer
            )}">
              <div class="${cx(
                lineChartClasses?.tooltipSeriesNameContainer,
                css(multipleStyles.tooltipSeriesNameContainer),
                classes?.tooltipSeriesNameContainer
              )}">
                <p style="background-color: ${s.color};" class="${cx(
              lineChartClasses?.tooltipSeriesColor,
              css(multipleStyles.tooltipSeriesColor),
              customClasses?.tooltipSeriesColor
            )}" />
                <p class="${cx(
                  lineChartClasses?.tooltipSeriesName,
                  css(multipleStyles.tooltipSeriesName),
                  customClasses?.tooltipSeriesName
                )}">${s.seriesName}</p>
              </div>
              <p class="${cx(
                lineChartClasses?.tooltipSeriesValue,
                css(multipleStyles.tooltipSeriesValue),
                customClasses?.tooltipSeriesValue
              )}">${formattedValue}</p>
            </div>
          `;
          })
          .join(" ")}
      </div>
    </div>
    `;
  };

  const chartTooltip = useMemo<Pick<EChartsOption, "tooltip">>(() => {
    return {
      tooltip: {
        confine: false,
        show: tooltip?.show ?? true,
        trigger: "axis",
        position: (point, params, dom, rect, size) => {
          return [point[0], point[1] - size.contentSize[1]];
        },
        formatter: (params) =>
          renderTooltip(
            params,
            tooltip?.type === "single",
            measures,
            classes,
            tooltip?.valueFormatter
          ),
      },
    };
  }, [
    tooltip?.show,
    tooltip?.valueFormatter,
    tooltip?.type,
    classes,
    measures,
  ]);

  const chartLegend = useMemo<Pick<EChartsOption, "legend">>(() => {
    return {
      legend: {
        show:
          legend?.show ??
          (Array.isArray(chartSeries.series) && chartSeries.series.length > 1),
        itemGap: 20,
        data:
          legend?.show !== false && Array.isArray(chartSeries.series)
            ? chartSeries.series.map((s) => {
                return {
                  name: s.name as string,
                  icon: getLegendIcon((s as any).areaStyle != null),
                };
              })
            : undefined,
      },
    };
  }, [chartSeries, legend?.show]);

  const chartHorizontalRangerSlider = useMemo<
    Pick<EChartsOption, "dataZoom">
  >(() => {
    return {
      dataZoom: [
        {
          show: horizontalRangeSlider?.show ?? false,
          type: "slider",
          orient: "horizontal",
        },
        {
          show: horizontalRangeSlider?.show ?? false,
          type: "inside",
          orient: "horizontal",
          zoomOnMouseWheel: "shift",
          moveOnMouseWheel: true,
        },
      ],
    };
  }, [horizontalRangeSlider?.show]);

  const chartGrid = useMemo(() => {
    return {
      // if no value is defined we shouldn't pass anything because echarts doesn't behave well otherwise
      grid: {
        ...(grid?.top != null && {
          top: grid.top,
        }),
        ...(grid?.bottom != null && {
          bottom: grid.bottom,
        }),
        ...(grid?.left != null && {
          left: grid.left,
        }),
        ...(grid?.right != null && {
          right: grid.right,
        }),
      },
    };
  }, [grid?.bottom, grid?.left, grid?.right, grid?.top]);

  const [initialOption, setInitialOption] = useState<EChartsOption>({
    aria: {
      enabled: true,
    },
    animation: false,
    ...chartDataset,
    ...chartXAxis,
    ...chartYAxis,
    ...chartSeries,
    ...chartTooltip,
    ...chartLegend,
    ...chartHorizontalRangerSlider,
    ...chartGrid,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // when the theme changes echarts destroys the chart and mounts it again
    // thus we need to reset the initial option
    if (theme !== currentTheme.current) {
      setInitialOption({
        aria: {
          enabled: true,
        },
        animation: false,
        ...chartDataset,
        ...chartXAxis,
        ...chartYAxis,
        ...chartSeries,
        ...chartTooltip,
        ...chartLegend,
        ...chartHorizontalRangerSlider,
        ...chartGrid,
      });
      currentTheme.current = theme;
      return;
    }

    chartRef.current?.getEchartsInstance().setOption(
      {
        ...chartDataset,
        ...chartXAxis,
        ...chartYAxis,
        ...chartSeries,
        ...chartLegend,
        ...chartTooltip,
        ...chartHorizontalRangerSlider,
        ...chartGrid,
      },
      {
        replaceMerge: ["xAxis", "yAxis", "series", "dataset"],
      }
    );
  }, [
    theme,
    chartDataset,
    chartXAxis,
    chartYAxis,
    chartSeries,
    chartLegend,
    chartTooltip,
    chartHorizontalRangerSlider,
    chartGrid,
  ]);

  return (
    <ReactECharts
      ref={chartRef}
      echarts={echarts}
      option={initialOption}
      theme={theme}
      notMerge
    />
  );
};
