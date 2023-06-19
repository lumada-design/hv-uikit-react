import { useEffect, useMemo, useRef, useState } from "react";

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
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import type { YAXisComponentOption } from "echarts/types/dist/echarts";

import ReactECharts from "echarts-for-react/lib/core";
import type { EChartsOption } from "echarts-for-react/lib/types";

import { from, internal, not, table, desc } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";

import { ExtractNames, Arrayable } from "@hitachivantara/uikit-react-core";

import {
  HvChartAggregation,
  HvChartOrder,
  HvChartAxis,
  HvChartEmptyCellMode,
  HvChartSampling,
  HvChartTooltip,
  HvChartTooltipParams,
  HvChartGrid,
} from "@viz/types";
import { getAgFunc, getAxisType, getLegendIcon } from "@viz/utils";
import { useVizTheme } from "@viz/hooks";
import { useClasses } from "./BaseChart.styles";

// Register chart components
echarts.use([
  BarChart,
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

export type HvBaseChartClasses = Partial<ExtractNames<typeof useClasses>>;

type GroupByField = string;
type SplitByField = string;

type FullSortByField = {
  /** Column name. */
  field: string;
  /** Order function to use. If no `order` is defined, it will default to `asc`. */
  order?: HvChartOrder;
};
type SortByField = string | FullSortByField;

interface BaseFullMeasuresField {
  /** Column name. */
  field: string;
  /** Sampling function to use. */
  sampling?: HvChartSampling;
  /** Id of the yAxis. */
  yAxis?: string;
  /** Aggregation function to use. If no `agg` is defined, it will default to `sum`. */
  agg?: HvChartAggregation;
  /**
   * Stack name to use when the measure should be stacked.
   *
   * Measures stacked together have the same name.
   *
   * If not specified, it defaults to the global `stacked` prop.
   */
  stack?: string;
  /** Strategy to use when there are empty cells. If not specified, it defaults to the global `emptyCellMode` prop. */
  valueFormatter?: (value?: string | number) => string;
}

interface LineFullMeasuresField extends BaseFullMeasuresField {
  /** Whether to hide the symbol for data points. Defaults to `false`. */
  hideSymbol?: boolean;
  /** Whether the area under the lines should be filled. If not specified, it defaults to the global `area` prop. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. If not specified, it defaults to the global `areaOpacity` prop. */
  areaOpacity?: number;
  /** Strategy to use when there are empty cells. If not specified, it defaults to the global `emptyCellMode` prop. */
  emptyCellMode?: HvChartEmptyCellMode;
}

type LineMeasuresField = string | LineFullMeasuresField;

type BarMeasuresField = string | BaseFullMeasuresField;

/** Line and bar chart common props  */
export interface HvBaseChartCommonProps {
  /** Chart data. */
  data:
    | Map<string | number, (string | number)[]>
    | Record<string | number, (string | number)[]>
    | Record<string | number, string | number>[]
    | ColumnTable;
  /** Columns to use to group the data. */
  groupBy: Arrayable<GroupByField>;
  /** Columns to use to split the measures. */
  splitBy?: Arrayable<SplitByField>;
  /** Columns to use to sort the data points. */
  sortBy?: Arrayable<SortByField>;
  /** Options for the xAxis, i.e. the horizontal axis. */
  xAxis?: HvChartAxis;
  /** Options for the yAxis, i.e. the vertical axis. */
  yAxis?: HvChartAxis | [HvChartAxis, HvChartAxis];
  /** Tooltip options. */
  tooltip?: HvChartTooltip;
  /** Legend options. */
  legend?: {
    /** Whether to show the legend or not. The legend will appear by default for multiple series. Otherwise, the legend will not be shown. */
    show?: boolean;
  };
  /** Formatter for the series names used on the tooltips and legend. */
  seriesNameFormatter?: (value?: string) => string;
  /** Stack name to use when all the series should be stacked together. If not provided, the series are not stacked. */
  stack?: string;
  /** Ranger slider options for the horizontal axis. */
  horizontalRangeSlider?: {
    /** Whether to show the ranger slider or not. Defaults to `false`. */
    show?: boolean;
  };
  /** Grid options. */
  grid?: HvChartGrid;
}

/** Line chart props only */
export interface HvBaseChartLineProps {
  /**  Columns to measure on the chart. */
  measures: Arrayable<LineMeasuresField>;
  /** Strategy to use when there are empty cells. Defaults to `void`. */
  emptyCellMode?: HvChartEmptyCellMode;
  /** Whether the area under the lines should be filled. Defaults to `false`. */
  area?: boolean;
  /** Sets opacity of the filled area if `area` is true. Defaults to `0.5`. */
  areaOpacity?: number;
}

/** Bar chart props only */
export interface HvBaseChartBarProps {
  /**  Columns to measure on the chart. */
  measures: Arrayable<BarMeasuresField>;
  /** Whether the bar chart should be horizontal. Defaults to `false`. */
  horizontal?: boolean;
}

/** Base chart only props  */
interface HvBaseChartOnlyProps {
  /** Chart type. */
  type: "line" | "bar";
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBaseChartClasses;
}

export interface HvBaseChartProps
  extends HvBaseChartCommonProps,
    Omit<HvBaseChartLineProps, "measures">,
    Omit<HvBaseChartBarProps, "measures">,
    HvBaseChartOnlyProps {
  /**  Columns to measure on the chart. */
  measures: Arrayable<string | (BaseFullMeasuresField & LineFullMeasuresField)>;
}

/** Echarts doesn't seem to have the type for the tooltip params */
interface EChartsTooltipParams {
  seriesName: string;
  value: (string | number)[];
  encode: { [key: string]: number[] };
  color: string;
  dimensionNames: string[];
}

/**
 * Base chart for the line and bar chart.
 */
export const HvBaseChart = ({
  type,
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
  classes: classesProp = {},
  grid,
  horizontal = false,
}: HvBaseChartProps) => {
  const { theme } = useVizTheme();
  const { classes } = useClasses(classesProp);

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
        id: xAxis?.id,
        type: getAxisType(xAxis?.type) ?? (horizontal ? "value" : "category"),
        name: xAxis?.name,
        scale: !(type === "bar"),
        axisLabel: {
          rotate: xAxis?.labelRotation ?? 0,
          formatter: xAxis?.labelFormatter,
        },
        max: xAxis?.maxValue === "max" ? "dataMax" : xAxis?.maxValue,
        min: xAxis?.minValue === "min" ? "dataMin" : xAxis?.minValue,
      },
    };
  }, [xAxis, type, horizontal]);

  const chartYAxis = useMemo<Pick<EChartsOption, "yAxis">>(() => {
    if (!yAxis || !Array.isArray(yAxis)) {
      return {
        yAxis: {
          id: yAxis?.id,
          type: getAxisType(yAxis?.type) ?? (horizontal ? "category" : "value"),
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
  }, [yAxis, horizontal]);

  const getMeasure = (name: string, msr: HvBaseChartProps["measures"]) => {
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
        .map<LineSeriesOption | BarSeriesOption>((c) => {
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
            encode: horizontal
              ? {
                  x: c,
                  y: groupByKey,
                }
              : {
                  x: groupByKey,
                  y: c,
                },
            type,
            showSymbol,
            sampling,
            areaStyle: isArea ? { opacity: aOpacity } : undefined,
            connectNulls,
            stack: stackName,
            yAxisId,
            barMaxWidth: 90,
            barMinWidth: 3,
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
    type,
    horizontal,
  ]);

  const renderTooltip = (
    params: EChartsTooltipParams[],
    single: boolean,
    msr: HvBaseChartProps["measures"],
    reverse: boolean,
    cls?: typeof classes,
    valueFormatter?: (value?: string | number) => string,
    titleFormatter?: (value?: string | number) => string
  ) => {
    const title = reverse
      ? params[0].value[params[0].encode.y[0]]
      : params[0].value[params[0].encode.x[0]];
    const formattedTitle = titleFormatter ? titleFormatter(title) : title;

    if (single) {
      const measure = getMeasure(
        reverse
          ? params[0].dimensionNames[params[0].encode.x[0]]
          : params[0].dimensionNames[params[0].encode.y[0]],
        msr
      );
      const value = reverse
        ? params[0].value[params[0].encode.x[0]]
        : params[0].value[params[0].encode.y[0]];
      const formattedValue =
        typeof measure !== "string" && measure.valueFormatter
          ? measure.valueFormatter(value)
          : valueFormatter
          ? valueFormatter(value)
          : value;

      return `
        <div class="${cls?.singleTooltipRoot}">
          <p class="${cls?.singleTooltipTitle}">${formattedTitle}</p>
          <p class="${cls?.singleTooltipValue}">${formattedValue}</p>
        </div>
        `;
    }

    return `
    <div class="${cls?.multipleTooltipRoot}">
      <div class="${cls?.multipleTooltipTitleContainer}">
        <div>
          <p class="${cls?.multipleTooltipTitle}">${formattedTitle}</p>
        </div>
      </div>
      <div class="${cls?.multipleTooltipValuesContainer}">
        ${params
          .map((s) => {
            const measure = getMeasure(
              reverse
                ? s.dimensionNames[s.encode.x[0]]
                : s.dimensionNames[s.encode.y[0]],
              msr
            );
            const value = reverse
              ? s.value[s.encode.x[0]]
              : s.value[s.encode.y[0]];
            const formattedValue =
              typeof measure !== "string" && measure.valueFormatter
                ? measure.valueFormatter(value)
                : valueFormatter
                ? valueFormatter(value)
                : value;

            return `
            <div key="${s.seriesName}" class="${cls?.multipleTooltipSeriesContainer}">
              <div class="${cls?.multipleTooltipSeriesNameContainer}">
                <p style="background-color: ${s.color};" class="${cls?.multipleTooltipSeriesColor}" />
                <p class="${cls?.multipleTooltipSeriesName}">${s.seriesName}</p>
              </div>
              <p class="${cls?.multipleTooltipSeriesValue}">${formattedValue}</p>
            </div>
          `;
          })
          .join(" ")}
      </div>
    </div>
    `;
  };

  const renderCustomTooltip = (
    params: EChartsTooltipParams[],
    reverse: boolean,
    customTooltip: Required<HvChartTooltip["component"]>
  ) => {
    if (typeof customTooltip === "function") {
      const values: HvChartTooltipParams = {
        title: reverse
          ? params[0].value[params[0].encode.y[0]]
          : params[0].value[params[0].encode.x[0]],
        series: params.map((p) => {
          return {
            color: p.color,
            name: p.seriesName,
            value: reverse ? p.value[p.encode.x[0]] : p.value[p.encode.y[0]],
          };
        }),
      };

      return customTooltip(values);
    }

    return customTooltip;
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
          tooltip?.component
            ? renderCustomTooltip(params, horizontal, tooltip.component)
            : renderTooltip(
                params,
                tooltip?.type === "single",
                measures,
                horizontal,
                classes,
                tooltip?.valueFormatter,
                tooltip?.titleFormatter
              ),
      },
    };
  }, [tooltip, classes, measures, horizontal]);

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
                  icon: getLegendIcon(
                    (s as any).areaStyle != null || s.type === "bar"
                  ),
                };
              })
            : undefined,
      },
    };
  }, [chartSeries, legend]);

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
  }, [horizontalRangeSlider]);

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
  }, [grid]);

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
