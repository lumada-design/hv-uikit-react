import { Suspense, useEffect, useMemo, useState } from "react";
import { Edge, ReactFlowInstance, Node } from "reactflow";
import {
  HvButton,
  HvGlobalActions,
  HvLoading,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Cards,
  Fail,
  LineChartAlt,
  Storage,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowControls,
  HvFlowEmpty,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

import classes from "./styles";
import {
  DASHBOARDS_STORAGE_KEY,
  DashboardSpecs,
  DashboardsStorage,
  LAYOUT_COLS,
  NodeGroup,
} from "./types";
import { BarChart, Dashboard, DonutChart, Kpi, LineChart } from "./Nodes";
import { buildLayout, createDataset, useDatasets } from "./utils";
import { DashboardProps } from "./Dashboard";

// Node groups
const nodeGroups = {
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

// Node types
const baseNodeTypes = {
  dashboard: Dashboard,
  lineChart: LineChart,
  barChart: BarChart,
  kpi: Kpi,
  donutChart: DonutChart,
} satisfies HvFlowProps["nodeTypes"];

// Initial Flow
const nodes = [
  {
    id: "6",
    position: { x: -183.21149999999977, y: 191.35275000000001 },
    data: {
      title: "Number of customers",
      unit: "",
      measure: ["Customer"],
      aggregation: ["distinct"],
    },
    type: "kpi",
  },
  {
    id: "4",
    position: { x: 144.78850000000023, y: -446.6472500000001 },
    data: {
      title: "Number of products",
      unit: "",
      measure: ["Product"],
      aggregation: ["distinct"],
    },
    type: "kpi",
  },
  {
    id: "e5ffe4f454c",
    position: { x: 727.37559375, y: 210.74056249999978 },
    data: {},
    type: "dashboard",
  },
  {
    id: "5ffe4f454c9",
    position: { x: -702.928, y: 173.7365000000001 },
    data: {
      endpoint: "/steelwheels",
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
    type: "datasetsteelwheels",
  },
  {
    id: "ffe4f454c94",
    position: { x: -183.21149999999977, y: -448.6472500000001 },
    data: {
      title: "Total of sales",
      unit: "$",
      measure: ["Sales"],
      aggregation: ["sum"],
    },
    type: "kpi",
  },
  {
    id: "fe4f454c946",
    position: { x: 4.7733747459412825, y: 786.979108359152 },
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
    position: { x: 182.2801875, y: 191.44487500000002 },
    data: {
      title: "Sales per country over the years",
      measure: ["Sales"],
      groupBy: ["Country"],
      splitBy: ["Years"],
    },
    type: "lineChart",
  },
] satisfies HvFlowProps["nodes"];
const edges = [
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
    id: "reactflow__edge-5ffe4f454c90-60",
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
] satisfies HvFlowProps["edges"];

// Initial Layout
const layout = [
  {
    w: 4,
    h: 1,
    x: 0,
    y: 0,
    i: "4",
  },
  {
    w: 4,
    h: 1,
    x: 4,
    y: 0,
    i: "6",
  },
  {
    w: 4,
    h: 1,
    x: 8,
    y: 0,
    i: "ffe4f454c94",
  },
  {
    w: 12,
    h: 3,
    x: 0,
    y: 1,
    i: "e4f454c9469",
  },
  {
    w: 12,
    h: 3,
    x: 0,
    y: 4,
    i: "fe4f454c946",
  },
] satisfies DashboardProps["layout"];

const Content = () => {
  const { data } = useDatasets();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [open, setOpen] = useState(false);

  const persistDashboards = (
    nds: Node[],
    egs: Edge[],
    ly?: DashboardProps["layout"]
  ) => {
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;

    const dashboards = nds.reduce((acc: DashboardsStorage, cur) => {
      if (cur.type === "dashboard") {
        const vizNodes = egs
          .filter((edge) => edge.target === cur.id)
          .reduce((accN: NonNullable<DashboardSpecs["nodes"]>, curEdg) => {
            const vizNode = nds.find((node) => node.id === curEdg.source);
            const datasetNodeId = egs.find(
              (edge) => edge.target === vizNode?.id
            )?.source;
            const datasetNode = nds.find((node) => node.id === datasetNodeId);

            if (vizNode) {
              accN.push({
                endpoint: datasetNode?.data.endpoint,
                node: vizNode,
              });
            }
            return accN;
          }, []);

        const curLayout = specs?.[cur.id]?.layout;

        acc[cur.id] = {
          nodes: vizNodes,
          layout: ly ?? buildLayout(vizNodes, curLayout),
          layoutCols: LAYOUT_COLS,
        };
      }
      return acc;
    }, {});

    // Save dashboards in local storage
    localStorage.setItem(DASHBOARDS_STORAGE_KEY, JSON.stringify(dashboards));
  };

  useEffect(() => {
    persistDashboards(nodes, edges, layout);

    return () => {
      // Unmount and remove dashboards from local storage
      localStorage.removeItem(DASHBOARDS_STORAGE_KEY);
    };
  }, []);

  const nodeTypes = useMemo(() => {
    const nt: HvFlowProps["nodeTypes"] = { ...baseNodeTypes };

    if (data) {
      for (let i = 0; i < data.length; i++) {
        const key = `dataset${data[i].id}`;

        const Dataset = createDataset({
          label: data[i].label,
          description: data[i].label,
          data: { endpoint: data[i].url, columns: data[i].columns },
        });

        nt[key] = Dataset;
      }
    }

    return nt;
  }, [data]);

  const handleEdgesChange: HvFlowProps["onEdgesChange"] = (changes) => {
    if (changes[0].type === "remove") {
      const removedEdged = reactFlowInstance?.getEdge(changes[0].id);
      const sourceNode = reactFlowInstance?.getNode(removedEdged?.source || "");

      if (sourceNode?.type?.includes("dataset")) {
        const targetNode = reactFlowInstance?.getNode(
          removedEdged?.target || ""
        );

        // Reset chart node
        if (targetNode) {
          reactFlowInstance?.setNodes((nds) => {
            const newNodes = nds.map((node) => {
              if (node.id === targetNode.id) {
                node.data = {
                  title: "",
                  unit: "",
                  aggregation: undefined,
                  measure: undefined,
                  groupBy: undefined,
                  splitBy: undefined,
                };
              }
              return node;
            });
            return newNodes;
          });
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <HvGlobalActions position="relative" title="Dashboard Flow">
        <HvButton
          variant="primary"
          startIcon={<Add role="none" />}
          onClick={() => setOpen(true)}
        >
          Add Node
        </HvButton>
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          sidebar={
            <HvFlowSidebar
              title="Add Node"
              description="Please choose within the options below"
              open={open}
              onClose={() => setOpen(false)}
            />
          }
          onFlowChange={persistDashboards}
          onInit={setReactFlowInstance}
          onEdgesChange={handleEdgesChange}
          fitView
        >
          <HvFlowControls />
          <HvFlowEmpty
            title="Empty Flow"
            action={
              <div className={classes.emptyFlow}>
                <HvTypography
                  link
                  component="a"
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  Add nodes
                </HvTypography>
                <HvTypography>&nbsp;to start building your flow.</HvTypography>
              </div>
            }
            icon={<Fail />}
          />
        </HvFlow>
      </div>
    </div>
  );
};

const Flow = () => (
  <Suspense fallback={<HvLoading />}>
    <Content />
  </Suspense>
);

export default Flow;
