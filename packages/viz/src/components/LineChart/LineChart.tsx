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
} from "@viz/types";
import { getAgFunc, getAxisType, getLegendIcon } from "@viz/utils";
import { useVizTheme } from "@viz/hooks";

import { styles } from "./LineChart.styles";
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
  field: string;
  yAxis?: string;
  hideSymbol?: boolean;
  agg?: HvChartAggregation;
};
type MeasuresField = string | FullMeasuresField;

type FullSortByField = {
  field: string;
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
  /**
   * Columns to measure on the chart.
   *
   * If no `agg` is defined, it will default to `sum`.
   */
  measures: MeasuresField | MeasuresField[];
  /** Columns to use to split the measures. */
  splitBy?: SplitByField | SplitByField[];
  /**
   * Columns to use to sort the data points.
   *
   * If no `order` is defined, it will default to `asc`.
   */
  sortBy?: SortByField | SortByField[];
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: HvChartAxis;
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: HvChartAxis | [HvChartAxis, HvChartAxis];

  /** Tooltip options. */
  tooltip?: {
    /** Whether to show the tooltip or not. Defaults to `true`. */
    show?: boolean;
    /** Formatter for the value in the tooltip. */
    valueFormatter?: (value?: string | number) => string;
  };
  /** Legend options. */
  legend?: {
    /** Whether to show the legend or not. If they are multiple series, the legend will appear by default. Otherwise, the legend will not be shown. */
    show?: boolean;
  };
  /** Formatter for the lines names used on the tooltips and legend. */
  lineNameFormatter?: (value?: string) => string;
  /** Strategy to use when there are empty cells. Defaults to `void`. */
  emptyCellMode?: HvChartEmptyCellMode;
  /** Whether the area under the lines should be filled. Defaults to `false`. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. Defaults to `0.5`. */
  areaOpacity?: number;
  /** Whether the chart is stacked. Defaults to `false`. */
  stacked?: boolean;
  /** Ranger slider options for the horizontal axis. */
  horizontalRangeSlider?: {
    /** Whether to show the ranger slider or not. Defaults to `false`. */
    show?: boolean;
  };
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLineChartClasses;
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
  lineNameFormatter,
  area = false,
  stacked = false,
  emptyCellMode = "void",
  horizontalRangeSlider,
  areaOpacity = 0.5,
  classes,
}: HvLineChartProps) => {
  const { theme } = useVizTheme();

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

  const chartSeries = useMemo<Pick<EChartsOption, "series">>(() => {
    return {
      series: chartData
        .columnNames()
        .filter((c) => c !== groupByKey)
        .map<LineSeriesOption>((c) => {
          const measureName = c.split("_")[0];
          const measuresArray = Array.isArray(measures) ? measures : [measures];
          // find the measure in measures array or return the first one
          const measure =
            measuresArray.find((m) => {
              if (typeof m === "string") {
                return m === measureName;
              }
              return m.field === measureName;
            }) ?? measuresArray[0];

          const showSymbol =
            typeof measure !== "string" ? !measure.hideSymbol : true;
          const yAxisId =
            typeof measure !== "string" ? measure.yAxis : undefined;

          return {
            id: `series~${groupByKey}~${c}`,
            name: lineNameFormatter ? lineNameFormatter(c) : c,
            encode: { x: groupByKey, y: c },
            type: "line",
            showSymbol,
            areaStyle: area ? { opacity: areaOpacity } : undefined,
            connectNulls: emptyCellMode === "connect" || false,
            stack: stacked ? "x" : undefined,
            yAxisId,
          };
        }),
    };
  }, [
    chartData,
    groupByKey,
    area,
    stacked,
    lineNameFormatter,
    emptyCellMode,
    areaOpacity,
  ]);

  const chartTooltip = useMemo<Pick<EChartsOption, "tooltip">>(() => {
    return {
      tooltip: {
        confine: false,
        show: tooltip?.show ?? true,
        trigger: "axis",
        position: (point, params, dom, rect, size) => {
          return [point[0], point[1] - size.contentSize[1]];
        },
        formatter: (params) => {
          const tooltipName = params[0].name;

          return `
          <div class="${cx(
            lineChartClasses.tooltipRoot,
            css(styles.tooltipRoot),
            classes?.tooltipRoot
          )}">
            <div class="${cx(
              lineChartClasses.tooltipTitleRoot,
              css(styles.tooltipTitleRoot),
              classes?.tooltipTitleRoot
            )}">
              <div>
                <p class="${cx(
                  lineChartClasses.tooltipTitle,
                  css(styles.tooltipTitle),
                  classes?.tooltipTitle
                )}">${tooltipName}</p>
              </div>
            </div>
            <div class="${cx(
              lineChartClasses.tooltipContentRoot,
              css(styles.tooltipContentRoot),
              classes?.tooltipContentRoot
            )}">
              ${params
                .map((s) => {
                  return `
                  <div key="${s.seriesName}" class="${cx(
                    lineChartClasses.tooltipSeriesRoot,
                    css(styles.tooltipSeriesRoot),
                    classes?.tooltipSeriesRoot
                  )}">
                    <div class="${cx(
                      lineChartClasses.tooltipSeriesNameRoot,
                      css(styles.tooltipSeriesNameRoot),
                      classes?.tooltipSeriesNameRoot
                    )}">
                      <p style="background-color: ${s.color};" class="${cx(
                    lineChartClasses.tooltipSeriesNameColor,
                    css(styles.tooltipSeriesNameColor),
                    classes?.tooltipSeriesNameColor
                  )}" />
                      <p class="${cx(
                        lineChartClasses.tooltipSeriesName,
                        css(styles.tooltipSeriesName),
                        classes?.tooltipSeriesName
                      )}">${s.seriesName}</p>
                    </div>
                    <p class="${cx(
                      lineChartClasses.tooltipSeriesValue,
                      css(styles.tooltipSeriesValue),
                      classes?.tooltipSeriesValue
                    )}">${
                    tooltip?.valueFormatter
                      ? tooltip.valueFormatter(s.value[s.encode.y[0]])
                      : s.value[s.encode.y[0]]
                  }</p>
                  </div>
                `;
                })
                .join(" ")}
            </div>
          </div>
          `;
        },
      },
    };
  }, [tooltip?.show, tooltip?.valueFormatter, classes]);

  const chartLegend = useMemo<Pick<EChartsOption, "legend">>(() => {
    return {
      legend: {
        show:
          legend?.show ??
          (Array.isArray(chartSeries.series) && chartSeries.series.length > 1),
        icon: getLegendIcon(area),
      },
    };
  }, [chartSeries, legend?.show, area]);

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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
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
      },
      {
        replaceMerge: ["xAxis", "yAxis", "series", "dataset"],
      }
    );
  }, [
    chartDataset,
    chartXAxis,
    chartYAxis,
    chartSeries,
    chartLegend,
    chartTooltip,
    chartHorizontalRangerSlider,
  ]);

  const [initialOption] = useState<EChartsOption>({
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
  });

  return (
    <ReactECharts
      ref={chartRef}
      echarts={echarts}
      option={initialOption}
      theme={theme}
    />
  );
};
