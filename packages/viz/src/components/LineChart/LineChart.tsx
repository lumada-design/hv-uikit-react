import { useVizTheme } from "@viz/hooks";
import ReactECharts from "echarts-for-react/lib/core";
import { LineChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  MarkLineComponent,
  TooltipComponent,
  AriaComponent,
  LegendComponent,
  DataZoomSliderComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HvChartAggregation,
  HvChartOrder,
  HvChartAxisType,
  HvChartEmptyCellMode,
} from "@viz/types";
import { useTheme } from "@hitachivantara/uikit-react-core";
import { getAgFunc, getAxisType, getLegendIcon } from "@viz/utils";
import { from, table, internal, desc, not } from "arquero";
import ColumnTable from "arquero/dist/types/table/column-table";

// Register chart components
echarts.use([
  LineChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  MarkLineComponent,
  AriaComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
]);

type GroupByField = string;
type SplitByField = string;

type FullMeasuresField = {
  field: string;
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
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: {
    /** Type: continuous, categorical, or time data. Defaults to `categorical`. */
    type?: HvChartAxisType;
    /** Formatter for the labels on the horizontal axis. */
    labelFormatter?:
      | ((value?: string | number, index?: number) => string)
      | string;
    /** Rotation of the labels on the horizontal axis. Defaults to `0`. */
    labelRotation?: number;
    /** Name used on the horizontal axis. */
    name?: string;
    /**
     * Maximum value on the horizontal axis.
     * If no value is provided, the chart will automatically set a max value in order for all values to be equally distributed.
     * Set this property to `max` to use the maximum data value.
     */
    maxValue?:
      | string
      | number
      | "max"
      | ((obj: {
          max: string | number;
          min: string | number;
        }) => string | number);
    /**
     * Minimum value on the horizontal axis.
     * If no value is provided, the chart will automatically set a min value in order for all values to be equally distributed.
     * Set this property to `min` to use the maximum data value.
     */
    minValue?:
      | string
      | number
      | "min"
      | ((obj: {
          max: string | number;
          min: string | number;
        }) => string | number);
  };
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: {
    /** Type: continuous, categorical, or time data. Defaults to `continuous`. */
    type?: HvChartAxisType;
    /** Formatter for the labels on the vertical axis. */
    labelFormatter?:
      | ((value?: string | number, index?: number) => string)
      | string;
    /** Rotation of the labels on the vertical axis. Defaults to `0`. */
    labelRotation?: number;
    /** Name used on the vertical axis. */
    name?: string;
    /** Maximum value on the vertical axis. Set this property to `max` to use the maximum data value. */
    maxValue?:
      | string
      | number
      | "max"
      | ((obj: {
          max: string | number;
          min: string | number;
        }) => string | number);
    /** Minimum value on the vertical axis. Set this property to `min` to use the maximum data value. */
    minValue?:
      | string
      | number
      | "min"
      | ((obj: {
          max: string | number;
          min: string | number;
        }) => string | number);
  };

  // Visual Roles
  groupBy: GroupByField | GroupByField[];
  splitBy?: SplitByField | SplitByField[];
  measures: MeasuresField | MeasuresField[];
  sortBy?: SortByField | SortByField[];

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
}: HvLineChartProps) => {
  const { activeTheme, selectedMode, selectedTheme } = useTheme();
  const { theme } = useVizTheme();

  const chartRef = useRef<ReactECharts>(null);
  const isMounted = useRef<boolean>(false);

  const groupByKey = Array.isArray(groupBy) ? groupBy.join("_") : groupBy;

  const chartData = useMemo(() => {
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

  chartData.print();

  const chartDataset = useMemo(() => {
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

  const chartXAxis = useMemo(() => {
    return {
      xAxis: {
        type: getAxisType(xAxis?.type) ?? "category",
        scale: true,
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
    chartData,
  ]);

  const chartYAxis = useMemo(() => {
    return {
      yAxis: {
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
  }, [
    yAxis?.labelFormatter,
    yAxis?.labelRotation,
    yAxis?.name,
    yAxis?.type,
    yAxis?.maxValue,
    yAxis?.minValue,
  ]);

  const chartSeries = useMemo(() => {
    return {
      series: chartData
        .columnNames()
        .filter((c) => c !== groupByKey)
        .map((c) => {
          return {
            id: `series~${groupByKey}~${c}`,
            name: lineNameFormatter ? lineNameFormatter(c) : c,
            encode: { x: groupByKey, y: c },
            type: "line",
            areaStyle: area ? { opacity: areaOpacity } : undefined,
            connectNulls: emptyCellMode === "connect" || false,
            stack: stacked ? "x" : undefined,
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

  const chartTooltip = useMemo(() => {
    return {
      tooltip: {
        confine: false,
        appendToBody: true,
        show: tooltip?.show ?? true,
        trigger: "axis",
        position: (point, params, dom, rect, size) => {
          return [point[0], point[1] - size.contentSize[1]];
        },
        formatter: (params) => {
          const tooltipName = params[0].name;

          return `
            <div style="width: fit-content; box-shadow: ${
              activeTheme?.colors.modes[selectedMode].shadow
            }; background-color: ${
            activeTheme?.colors.modes[selectedMode].atmo1
          }">
              <div style="padding: 15px ${
                activeTheme?.space.sm
              }; border-bottom: 3px solid ${
            activeTheme?.colors.modes[selectedMode].atmo2
          }">
                <div>
                  <p style="font-family: ${
                    activeTheme?.fontFamily.body
                  }; font-weight: ${
            activeTheme?.fontWeights.semibold
          }; font-size: ${activeTheme?.fontSizes.sm}; color: ${
            activeTheme?.colors.modes[selectedMode].secondary
          };">${tooltipName}</p>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; padding: ${
                activeTheme?.space.sm
              };">
                ${params
                  .map((s, i) => {
                    return `
                    <div key="${
                      s.seriesName
                    }" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding-bottom: ${
                      i === params.length - 1 ? 0 : activeTheme?.space.sm
                    };">
                        
                    <div style="display: flex; flex-direction: row; align-items: center; margin-right: ${
                      activeTheme?.space.sm
                    };">
                          <p style="width: 10px; height: 10px; background-color: ${
                            s.color
                          }; margin-right: 5px"/>
                          <p style="font-family: ${
                            activeTheme?.fontFamily.body
                          }; font-weight: ${
                      activeTheme?.fontWeights.semibold
                    }; font-size: ${activeTheme?.fontSizes.sm}; color: ${
                      activeTheme?.colors.modes[selectedMode].secondary
                    };">${s.seriesName}</p>
                        </div>
                        
                        <p style="font-family: ${
                          activeTheme?.fontFamily.body
                        }; font-size: ${activeTheme?.fontSizes.sm}; color: ${
                      activeTheme?.colors.modes[selectedMode].secondary
                    };">${
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
  }, [
    tooltip?.show,
    tooltip?.valueFormatter,
    selectedMode,
    selectedTheme,
    activeTheme,
  ]);

  const chartLegend = useMemo(() => {
    return {
      legend: {
        show: legend?.show ?? chartSeries.series.length > 1,
        icon: getLegendIcon(area),
      },
    };
  }, [chartSeries, legend?.show, area]);

  const chartHorizontalRangerSlider = useMemo(() => {
    return {
      dataZoom: {
        show: horizontalRangeSlider?.show ?? false,
        type: "slider",
        orient: "horizontal",
      },
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
        ...chartHorizontalRangerSlider,
      },
      {
        replaceMerge: ["xAxis", "yAxis", "series"],
      }
    );
  }, [
    chartDataset,
    chartXAxis,
    chartYAxis,
    chartSeries,
    chartLegend,
    chartHorizontalRangerSlider,
  ]);

  const [initialOption] = useState({
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
      option={{
        ...initialOption,
        ...chartTooltip,
      }}
      theme={theme}
    />
  );
};