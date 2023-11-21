import useSWR from "swr";
import { loadArrow } from "arquero";
import {
  HvBarChart,
  HvDonutChart,
  HvLineChart,
} from "@hitachivantara/uikit-react-viz";

import { NodeData } from "../../types";
import { datasets } from "../../utils";

import { ChartContainer } from "./ChartContainer";
import { Kpi } from "./Kpi";
import { Table } from "./Table";

const useData = (endpointId?: string) => {
  const url = datasets.find((ds) => ds.id === endpointId)?.url || null;

  // @ts-ignore
  return useSWR(url, loadArrow);
};

interface RendererProps {
  data: NodeData;
}

const LineChartRenderer: React.FC<RendererProps> = (props) => {
  const { data: nodeData = {} } = props;
  const { measure, groupBy, title, splitBy, endpoint } = nodeData;
  const { data, isLoading } = useData(endpoint);

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
};

const BarChartRenderer: React.FC<RendererProps> = (props) => {
  const { data: nodeData = {} } = props;
  const { measure, groupBy, title, splitBy, endpoint } = nodeData;
  const { data, isLoading } = useData(endpoint);

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
};

const DonutChartRenderer: React.FC<RendererProps> = (props) => {
  const { data: nodeData = {} } = props;
  const { measure, groupBy, title, endpoint } = nodeData;
  const { data, isLoading } = useData(endpoint);

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
};

const KpiRenderer: React.FC<RendererProps> = (props) => {
  const { data: nodeData = {} } = props;
  const { aggregation, unit, measure, title, endpoint } = nodeData;
  const { data, isLoading } = useData(endpoint);

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
};

const TableRenderer: React.FC<RendererProps> = (props) => {
  const { data: nodeData = {} } = props;
  const { measure, title = "", endpoint } = nodeData;
  const { data, isLoading } = useData(endpoint);

  return (
    <Table
      loading={isLoading}
      title={title}
      data={data}
      measure={measure as string}
    />
  );
};

/** Common renderers to be used in Dashboard and Flow preview */
export const renderers = {
  barChart: BarChartRenderer,
  donutChart: DonutChartRenderer,
  lineChart: LineChartRenderer,
  kpi: KpiRenderer,
  table: TableRenderer,
} satisfies Record<string, React.FC<RendererProps> | undefined>;
