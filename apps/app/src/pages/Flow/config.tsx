import { useMemo } from "react";
import { Node } from "@xyflow/react";
import {
  Cards,
  LineChartAlt,
  Storage,
} from "@hitachivantara/uikit-react-icons";
import { HvFlowNodeGroups, HvFlowProps } from "@hitachivantara/uikit-react-lab";

import { BarChart } from "./Nodes/BarChart";
import { Dashboard } from "./Nodes/Dashboard";
import { Dataset } from "./Nodes/Dataset";
import { DonutChart } from "./Nodes/DonutChart";
import { Kpi } from "./Nodes/Kpi";
import { LineChart } from "./Nodes/LineChart";
import { Table } from "./Nodes/Table";
import { NodeData, NodeGroup } from "./types";
import { useDatasets } from "./utils";

/** Node groups */
export const useNodeGroups = () => {
  const { data: datasets } = useDatasets();

  return useMemo<HvFlowNodeGroups>(
    () => ({
      dataset: {
        label: "Dataset",
        color: "cat3_80",
        description: "Find here all the available datasets.",
        icon: <Storage />,
        items: datasets.map((ds) => ({
          nodeType: "dataset",
          label: ds.label,
          data: {
            endpoint: ds.url,
            columns: ds.columns.map((column) => ({
              id: column,
              label: column,
            })),
          },
        })),
      },
      visualization: {
        label: "Visualization",
        color: "cat1_80",
        description: "Find here all the available visualizations.",
        icon: <LineChartAlt />,
        items: [
          {
            nodeType: "lineChart",
            label: "Line Chart",
            data: {
              title: "",
              measure: undefined,
              groupBy: undefined,
              splitBy: undefined,
            },
          },
          {
            nodeType: "barChart",
            label: "Bar Chart",
            data: {
              title: "",
              measure: undefined,
              groupBy: undefined,
              splitBy: undefined,
            },
          },
          {
            nodeType: "donutChart",
            label: "Donut Chart",
            data: {
              title: "",
              measure: undefined,
              groupBy: undefined,
            },
          },
          {
            nodeType: "kpi",
            label: "KPI",
            data: {
              title: "",
              unit: "",
              measure: undefined,
              aggregation: undefined,
            },
          },
          {
            nodeType: "table",
            label: "Table",
            data: {
              title: "",
              columns: undefined,
              measure: "EMEA",
            },
          },
        ],
      },
      dashboard: {
        label: "Dashboard",
        color: "cat2_80",
        description: "Find here all the available dashboards.",
        icon: <Cards />,
        items: [{ nodeType: "dashboard", label: "Dashboard" }],
      },
    }),
    [datasets],
  );
};

/** Node types */
export const nodeTypes = {
  dashboard: Dashboard,
  dataset: Dataset,
  lineChart: LineChart,
  barChart: BarChart,
  kpi: Kpi,
  donutChart: DonutChart,
  table: Table,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof nodeTypes;

export type AppNode = Node<NodeData, NodeType>;

/** Initial Flow */
export const nodes = [
  {
    id: "6",
    position: { x: -183, y: 191 },
    data: {
      nodeLabel: "KPI",
      title: "Number of customers",
      unit: "",
      measure: "Customer",
      aggregation: "distinct",
    },
    type: "kpi" as const,
  },
  {
    id: "4",
    position: { x: 144, y: -446 },
    data: {
      nodeLabel: "KPI",
      title: "Number of products",
      unit: "",
      measure: "Product",
      aggregation: "distinct",
    },
    type: "kpi" as const,
  },
  {
    id: "e5ffe4f454c",
    position: { x: 727, y: 210 },
    data: {
      nodeLabel: "Dashboard",
    },
    type: "dashboard" as const,
  },
  {
    id: "5ffe4f454c9",
    position: { x: -702, y: 173 },
    data: {
      nodeLabel: "Steelwheels 1",
      endpoint: "steelwheels1",
      columns: [
        "Territory",
        "Country",
        "State Province",
        "City",
        "Type",
        "Line",
        "Vendor",
        "Product",
        "Years",
        "Quarters",
        "Months",
        "Credit Limit",
        "Customer",
        "Quantity",
        "Sales",
      ],
    },
    type: "dataset" as const,
  },
  {
    id: "ffe4f454c94",
    position: { x: -183, y: -448 },
    data: {
      nodeLabel: "KPI",
      title: "Total of sales",
      unit: "$",
      measure: "Sales",
      aggregation: "sum",
    },
    type: "kpi" as const,
  },
  {
    id: "fe4f454c946",
    position: { x: -183, y: 786 },
    data: {
      nodeLabel: "Bar Chart",
      title: "Sales per territory over the years",
      measure: ["Quantity"],
      groupBy: ["Territory"],
      splitBy: ["Years"],
    },
    type: "barChart" as const,
  },
  {
    id: "e4f454c9469",
    position: { x: 182, y: 191 },
    data: {
      nodeLabel: "Line Chart",
      title: "Sales per country over the years",
      measure: ["Sales"],
      groupBy: ["Country"],
      splitBy: ["Years"],
    },
    type: "lineChart" as const,
  },
  {
    id: "7",
    position: { x: 182, y: 786 },
    data: {
      nodeLabel: "Table",
      title: "Sales per territory",
      measure: "EMEA",
    },
    type: "table" as const,
  },
] satisfies AppNode[];

/** Initial edges */
export const edges = [
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "ffe4f454c94",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-ffe4f454c940",
  },
  {
    source: "ffe4f454c94",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-ffe4f454c940-e5ffe4f454c0",
  },
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "4",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-40",
  },
  {
    source: "4",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-40-e5ffe4f454c0",
  },
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "6",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-60_1",
  },
  {
    source: "6",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-60-e5ffe4f454c0",
  },
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "e4f454c9469",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-e4f454c94690",
  },
  {
    source: "e4f454c9469",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-e4f454c94690-e5ffe4f454c0",
  },
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "fe4f454c946",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-fe4f454c9460",
  },
  {
    source: "fe4f454c946",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-fe4f454c9460-e5ffe4f454c0",
  },
  {
    source: "5ffe4f454c9",
    sourceHandle: "0",
    target: "7",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-60_2",
  },
  {
    source: "7",
    sourceHandle: "0",
    target: "e5ffe4f454c",
    targetHandle: "0",
    id: "reactflow__edge-5ffe4f454c90-70",
  },
] satisfies HvFlowProps<NodeGroup, AppNode>["edges"];
