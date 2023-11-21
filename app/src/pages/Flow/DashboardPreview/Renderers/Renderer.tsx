import useSWR from "swr";
import { loadArrow } from "arquero";
import {
  HvBarChart,
  HvDonutChart,
  HvLineChart,
} from "@hitachivantara/uikit-react-viz";
import {
  HvDashboardItem,
  HvDashboardProps,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "../../types";
import { datasets } from "../../utils";
import { NodeTypes } from "../../Flow";

import { ChartContainer } from "./ChartContainer";
import { Kpi } from "./Kpi";
import { Table } from "./Table";

const useData = (endpointId?: string) => {
  const url = datasets.find((ds) => ds.id === endpointId)?.url || null;

  // @ts-ignore
  return useSWR(url, loadArrow);
};

interface RendererProps extends HvDashboardItem<NodeTypes> {
  data: NodeData;
}

const Renderer = (props: RendererProps) => {
  const {
    type,
    data: {
      endpoint,
      measure,
      groupBy,
      splitBy,
      aggregation,
      unit,
      title = "",
    },
  } = props;
  const { data, isLoading } = useData(endpoint);

  if (type === "lineChart") {
    return (
      <ChartContainer title={title} loading={isLoading}>
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

  if (type === "barChart") {
    return (
      <ChartContainer title={title} loading={isLoading}>
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

  if (type === "donutChart") {
    return (
      <ChartContainer title={title} loading={isLoading}>
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
        loading={isLoading}
        title={title}
        measure={measure as string}
        data={data}
        unit={unit}
        aggregation={aggregation}
      />
    );
  }

  if (type === "table") {
    return (
      <Table
        loading={isLoading}
        title={title}
        data={data}
        measure={measure as string}
      />
    );
  }

  return null;
};

/** Common renderers to be used in Dashboard and Flow preview */
export const renderItem: HvDashboardProps<NodeTypes>["renderItem"] = (item) => {
  return <Renderer {...(item as RendererProps)} />;
};
