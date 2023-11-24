import {
  Cards,
  LineChartAlt,
  Storage,
} from "@hitachivantara/uikit-react-icons";
import { HvFlowProps } from "@hitachivantara/uikit-react-lab";

import { NodeGroup } from "./types";
import {
  BarChart,
  Dashboard,
  DonutChart,
  Kpi,
  LineChart,
  Table,
} from "./Nodes";

/** Node groups */
export const nodeGroups = {
  dataset: {
    label: "Dataset",
    color: "cat3_80",
    description: "Find here all the available datasets.",
    icon: <Storage />,
  },
  visualization: {
    label: "Visualization",
    color: "cat1_80",
    description: "Find here all the available visualizations.",
    icon: <LineChartAlt />,
  },
  dashboard: {
    label: "Dashboard",
    color: "cat2_80",
    description: "Find here all the available dashboards.",
    icon: <Cards />,
  },
} satisfies HvFlowProps<NodeGroup>["nodeGroups"];

/** Node types */
export const baseNodeTypes = {
  dashboard: Dashboard,
  lineChart: LineChart,
  barChart: BarChart,
  kpi: Kpi,
  donutChart: DonutChart,
  table: Table,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof baseNodeTypes;

/** Initial Flow */
export const nodes = [
  {
    id: "6",
    position: { x: -183, y: 191 },
    data: {
      title: "Number of customers",
      unit: "",
      measure: "Customer",
      aggregation: "distinct",
    },
    type: "kpi",
  },
  {
    id: "4",
    position: { x: 144, y: -446 },
    data: {
      title: "Number of products",
      unit: "",
      measure: "Product",
      aggregation: "distinct",
    },
    type: "kpi",
  },
  {
    id: "e5ffe4f454c",
    position: { x: 727, y: 210 },
    data: {},
    type: "dashboard",
  },
  {
    id: "5ffe4f454c9",
    position: { x: -702, y: 173 },
    data: {
      endpoint: "steelwheels",
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
    type: "datasetsteelwheels" as any,
  },
  {
    id: "ffe4f454c94",
    position: { x: -183, y: -448 },
    data: {
      title: "Total of sales",
      unit: "$",
      measure: "Sales",
      aggregation: "sum",
    },
    type: "kpi",
  },
  {
    id: "fe4f454c946",
    position: { x: -183, y: 786 },
    data: {
      title: "Sales per territory over the years",
      measure: ["Quantity"],
      groupBy: ["Territory"],
      splitBy: ["Years"],
    },
    type: "barChart",
  },
  {
    id: "e4f454c9469",
    position: { x: 182, y: 191 },
    data: {
      title: "Sales per country over the years",
      measure: ["Sales"],
      groupBy: ["Country"],
      splitBy: ["Years"],
    },
    type: "lineChart",
  },
  {
    id: "7",
    position: { x: 182, y: 786 },
    data: {
      title: "Sales per territory",
      measure: "EMEA",
    },
    type: "table",
  },
] satisfies HvFlowProps<NodeGroup, NodeType>["nodes"];

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
] satisfies HvFlowProps<NodeGroup, NodeType>["edges"];
