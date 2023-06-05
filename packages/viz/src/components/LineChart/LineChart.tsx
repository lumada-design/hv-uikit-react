import { useVizTheme } from "@viz/hooks";
import ReactECharts from "echarts-for-react/lib/core";
import { LineChart } from "echarts/charts";
import {
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
  HvChartAxisType,
  HvChartEmptyCellMode,
} from "@viz/types";
import { useTheme } from "@hitachivantara/uikit-react-core";
import { getAgFunc, getAxisType, getLegendIcon } from "@viz/utils";
import { from, table, internal } from "arquero";
import ColumnTable from "arquero/dist/types/table/column-table";

// Register chart components
echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  MarkLineComponent,
  AriaComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
]);

export interface HvLineChartProps {
  /**
   * Data can have the following formats:
   * - Columns format: an object with a set of key-value pairs where the keys are the column names and the values are arrays of identical length containing the rows values.
   * - Rows format: an array containing a set of objects where each object represent a row.
   * - Arquero table format: table creating using arquero utilities.
   */
  data:
    | Map<string | number, (string | number)[]> // columns
    | Record<string | number, (string | number)[]> // columns
    | Record<string | number, string | number>[] // rows
    | ColumnTable; // arquero table
  /** Options for the xAxis, the horizontal axis. */
  xAxis: {
    /** Column to use for the horizontal axis. The data will be grouped based on this column. */
    fields: string;
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
  };
  /** Options for the measures, the vertical axis. */
  measures: {
    /** Columns to use as measures. These are the columns to measure on the vertical axis. */
    fields: string | string[];
    /**
     * Aggregation functions to use for the columns to measure.
     *
     * Each column needs its own aggregation function.
     * If no value is provided, `sum` will be used by default.
     * If only one function is provided (example: `aggregation="count"`), it will be used for all columns.
     * If an array is provided, the functions must be listed in the same order as the measures' `fields` and, if a value is missing, `sum` will be used by default.
     */
    aggregation?: HvChartAggregation | HvChartAggregation[];
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
    /**
     * Maximum value on the vertical axis.
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
     * Minimum value on the vertical axis.
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
  /** Columns to use to group the measures. */
  series?: string | string[];
  /** Tooltip options. */
  tooltip?: {
    /** Whether to show the tooltip or not. Defaults to `true`. */
    show?: boolean;
    /** Formatter for the value in the tooltip. */
    valueFormatter?: (value?: string | number) => string;
  };
  /** Legend options. */
  legend?: {
    /**
     * Whether to show the legend or not.
     *
     * If they are multiple series, the legend will appear by default. Otherwise, the legend will not be shown.
     */
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
  series,
  xAxis,
  measures,
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

  const chartData = useMemo(() => {
    let tableData: ColumnTable;
    if (data instanceof internal.ColumnTable) {
      tableData = data;
    } else if (Array.isArray(data)) {
      tableData = from(data);
    } else {
      tableData = table(data);
    }

    const measuresFields = Array.isArray(measures.fields)
      ? measures.fields
      : [measures.fields];

    const agFunction = Array.isArray(measures.aggregation)
      ? measures.aggregation
      : measuresFields.map(() => measures.aggregation as HvChartAggregation);

    const aggregations = measuresFields.reduce(
      (acc, field, i) => ({
        ...acc,
        [field]: getAgFunc(agFunction[i] ?? "sum", field),
      }),
      {}
    );

    if (series) {
      return tableData.groupby(xAxis.fields).pivot(series, aggregations);
    }

    return tableData.groupby(xAxis.fields).rollup(aggregations);
  }, [data, series, xAxis.fields, measures.aggregation, measures.fields]);

  const chartXAxis = useMemo(() => {
    return {
      xAxis: {
        type: getAxisType(xAxis.type) ?? "category",
        name: xAxis.name,
        data: chartData?.array(xAxis.fields),
        axisLabel: {
          rotate: xAxis.labelRotation ?? 0,
          formatter: xAxis.labelFormatter,
        },
      },
    };
  }, [
    xAxis.labelFormatter,
    xAxis.labelRotation,
    xAxis.name,
    xAxis.type,
    xAxis.fields,
    chartData,
  ]);

  const chartYAxis = useMemo(() => {
    return {
      yAxis: {
        type: getAxisType(measures.type) ?? "value",
        name: measures.name,
        axisLabel: {
          rotate: measures.labelRotation ?? 0,
          formatter: measures.labelFormatter,
        },
        max: measures.maxValue === "max" ? "dataMax" : measures.maxValue,
        min: measures.minValue === "min" ? "dataMin" : measures.minValue,
      },
    };
  }, [
    measures.labelFormatter,
    measures.labelRotation,
    measures.name,
    measures.type,
    measures.maxValue,
    measures.minValue,
  ]);

  const chartSeries = useMemo(() => {
    return {
      series:
        chartData
          ?.columnNames()
          .filter((c) => c !== xAxis.fields)
          .map((c) => {
            return {
              name: lineNameFormatter ? lineNameFormatter(c) : c,
              data: chartData.array(c),
              type: "line",
              areaStyle: area ? { opacity: areaOpacity } : undefined,
              connectNulls: emptyCellMode === "connect" || false,
              stack: stacked ? "x" : undefined,
            };
          }) || [],
    };
  }, [
    chartData,
    xAxis.fields,
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
                        ? tooltip.valueFormatter(s.value)
                        : s.value
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
