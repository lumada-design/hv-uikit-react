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
import { useMemo } from "react";
import {
  HvChartAggregation,
  HvChartAxisType,
  HvChartDataType,
  HvChartEmptyCellMode,
} from "@viz/types";
import { useTheme } from "@hitachivantara/uikit-react-core";
import { getAggregation, getAxisType } from "@viz/utils";
import { from, table } from "arquero";

// Register chart components
echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  DatasetComponent,
  MarkLineComponent,
  AriaComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomSliderComponent,
]);

export interface HvLineChartProps {
  /** Data options. */
  data: {
    /**
     * Data can have the following formats:
     * - Table format: a set of key-value pairs where the keys are the column names and the values are arrays of identical length containing the rows.
     * - Row format: a set of objects which can be an array of objects (where each object is a row) or a set of key-value pairs and a table with the
     * `key` and `value` columns is creating.
     */
    values:
      | Map<string | number, (string | number)[]> // Table format
      | Record<string | number, (string | number)[]> // Table format
      | Map<string | number, string | number> // Object format
      | Record<string | number, string | number>[] // Object format
      | Record<string | number, string | number>; // Object format
    /** Type of data, table or row format. Defaults to `table`. */
    type?: HvChartDataType;
  };
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
     * Aggregation functions to use for the columns you want to measure.
     *
     * Each column you want to measure needs its own aggregation function.
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
  /** Columns to use to group your measures. */
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
    showLegend?: boolean;
  };
  /** Formatter the lines names used on the tooltips and legend. */
  lineNameFormatter?: (value?: string) => string;
  /** Strategy to use when there are empty cells. Defaults to `void`. */
  emptyCellMode?: HvChartEmptyCellMode;
  /** Whether the area under the lines should be filled to have an area. Defaults to `false`. */
  area?: boolean;
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
}: HvLineChartProps) => {
  const { activeTheme, selectedMode, selectedTheme } = useTheme();
  const { theme } = useVizTheme();

  const chartData = useMemo(() => {
    const tableData =
      data.type === "row" ? from(data.values) : table(data.values);

    const agFunction: HvChartAggregation | HvChartAggregation[] =
      measures.aggregation ?? "sum";

    const aggregations =
      typeof measures.fields === "string"
        ? {
            [measures.fields]: getAggregation(
              Array.isArray(agFunction) ? agFunction[0] : agFunction,
              measures.fields
            ),
          }
        : {};

    if (Array.isArray(measures.fields)) {
      for (let i = 0; i < measures.fields.length; i++) {
        const field = measures.fields[i];
        aggregations[field] = getAggregation(
          Array.isArray(agFunction) ? agFunction[i] ?? "sum" : agFunction,
          field
        );
      }
    }

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
              areaStyle: area ? {} : undefined,
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
        show: legend?.showLegend ?? chartSeries.series.length > 1,
      },
    };
  }, [chartSeries, legend?.showLegend]);

  const chartHorizontalRangerSlider = useMemo(() => {
    return {
      dataZoom:
        horizontalRangeSlider?.show === true
          ? {
              type: "slider",
              orient: "horizontal",
            }
          : undefined,
    };
  }, [horizontalRangeSlider?.show]);

  return (
    <ReactECharts
      echarts={echarts}
      notMerge
      option={{
        aria: {
          enabled: true,
        },
        ...chartXAxis,
        ...chartYAxis,
        ...chartSeries,
        ...chartTooltip,
        ...chartLegend,
        ...chartHorizontalRangerSlider,
      }}
      theme={theme}
    />
  );
};
