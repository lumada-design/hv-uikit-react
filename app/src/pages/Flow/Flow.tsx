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
import { DashboardNode, Dashboards, NodeGroup } from "./types";
import { BarChart, Dashboard, DonutChart, Total, LineChart } from "./Nodes";
import { createDataset, useDatasets } from "./utils";

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
  total: Total,
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
      localStorage.removeItem("dashboards");
    };
  }, []);

  const handleFlowChange: HvFlowProps["onFlowChange"] = (nds, egs) => {
    const dashboards = nds.reduce((acc: Dashboards, cur) => {
      if (cur.type === "dashboard") {
        acc[cur.id] = egs
          .filter((edge) => edge.target === cur.id)
          .reduce((accN: DashboardNode[], curEdg) => {
            const vizNode = nds.find((node) => node.id === curEdg.source);
            const datasetNodeId = egs.find(
              (edge) => edge.target === vizNode?.id
            )?.source;
            const datasetNode = nds.find((node) => node.id === datasetNodeId);

            if (vizNode && datasetNode) {
              accN.push({
                endpoint: datasetNode.data.endpoint,
                node: vizNode,
              });
            }

            return accN;
          }, []);
      }
      return acc;
    }, {});

    // Save dashboards in local storage
    localStorage.setItem("dashboards", JSON.stringify(dashboards));
  };

  const nodeTypes = useMemo(() => {
    const nt: HvFlowProps["nodeTypes"] = { ...baseNodeTypes };

    if (data) {
      const values = Object.values(data);

      for (let i = 0; i < values.length; i++) {
        const key = `dataset${values[i].id}`;

        const Dataset = createDataset({
          label: values[i].label,
          description: values[i].label,
          data: { endpoint: values[i].url, columns: values[i].columns },
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
