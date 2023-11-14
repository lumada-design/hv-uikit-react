import { Suspense, useEffect, useMemo, useState } from "react";
import { ReactFlowInstance } from "reactflow";
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

// Flow
const nodes = [] satisfies HvFlowProps["nodes"];
const edges = [] satisfies HvFlowProps["edges"];

const Content = () => {
  const { data } = useDatasets();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      // Unmount and remove dashboards from local storage
      localStorage.removeItem(DASHBOARDS_STORAGE_KEY);
    };
  }, []);

  const handleFlowChange: HvFlowProps["onFlowChange"] = (nds, egs) => {
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
          layout: buildLayout(vizNodes, curLayout),
          layoutCols: LAYOUT_COLS,
        };
      }
      return acc;
    }, {});

    // Save dashboards in local storage
    localStorage.setItem(DASHBOARDS_STORAGE_KEY, JSON.stringify(dashboards));
  };

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
          onFlowChange={handleFlowChange}
          onInit={setReactFlowInstance}
          onEdgesChange={handleEdgesChange}
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
