import {
  HvBarChart,
  HvDonutChart,
  HvLineChart,
} from "@hitachivantara/uikit-react-viz";

import { useData } from "../../utils";
import { ChartContainer } from "./ChartContainer";
import { Kpi } from "./Kpi";

export type DashboardContentType =
  | "line-chart"
  | "bar-chart"
  | "donut-chart"
  | "kpi";

interface RendererProps {
  type: DashboardContentType;
  endpoint?: string;
  title?: string;
  unit?: string;
  aggregation?: string;
  measure?: string | string[];
  groupBy?: string | string[];
  splitBy?: string | string[];
}

export const Renderer = ({
  type,
  measure,
  groupBy,
  title,
  unit,
  aggregation,
  endpoint,
  splitBy,
}: RendererProps) => {
  const { data, loading } = useData(endpoint);

  if (type === "line-chart") {
    return (
      <ChartContainer title={title} loading={loading}>
        {measure && groupBy && data && (
          <HvLineChart
            data={data}
            measures={measure}
            groupBy={groupBy}
            splitBy={splitBy}
          />
        )}
      </ChartContainer>
    );
  }

  if (type === "bar-chart") {
    return (
      <ChartContainer title={title} loading={loading}>
        {measure && groupBy && data && (
          <HvBarChart
            data={data}
            measures={measure}
            groupBy={groupBy}
            splitBy={splitBy}
          />
        )}
      </ChartContainer>
    );
  }

  if (type === "donut-chart") {
    return (
      <ChartContainer title={title} loading={loading}>
        {measure && groupBy && data && (
          <HvDonutChart
            data={data}
            measure={measure as string}
            groupBy={groupBy}
          />
        )}
      </ChartContainer>
    );
  }

  if (type === "kpi") {
    return (
      <Kpi
        loading={loading}
        title={title}
        measure={measure as string}
        data={data}
        unit={unit}
        aggregation={aggregation}
      />
    );
  }

  return null;
};
