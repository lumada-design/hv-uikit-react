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
  measure?: string;
  groupBy?: string;
  title?: string;
  unit?: string;
  aggregation?: string;
}

export const Renderer = ({
  type,
  measure,
  groupBy,
  title,
  unit,
  aggregation,
  endpoint = "",
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
            grid={{
              top: 10,
              right: 10,
              bottom: 20,
            }}
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
            grid={{
              top: 10,
              right: 10,
              bottom: 20,
            }}
          />
        )}
      </ChartContainer>
    );
  }

  if (type === "donut-chart") {
    return (
      <ChartContainer title={title} loading={loading}>
        {measure && groupBy && data && (
          <HvDonutChart data={data} measure={measure} groupBy={groupBy} />
        )}
      </ChartContainer>
    );
  }

  if (type === "kpi") {
    return (
      <Kpi
        loading={loading}
        title={title}
        measure={measure}
        data={data}
        unit={unit}
        aggregation={aggregation}
      />
    );
  }

  return null;
};
