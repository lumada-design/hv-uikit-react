import { Suspense, useEffect, useMemo, useState } from "react";
import { Edge, ReactFlowInstance, Node } from "reactflow";
import {
  HvButton,
  HvGlobalActions,
  HvLoading,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Add, Fail } from "@hitachivantara/uikit-react-icons";
import {
  HvDashboardProps,
  HvFlow,
  HvFlowControls,
  HvFlowEmpty,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

import {
  DASHBOARDS_STORAGE_KEY,
  LAYOUT_COLS,
  buildLayout,
  createDataset,
  useDatasets,
} from "~/lib/utils/dashboard";

import classes from "./styles";
import { baseNodeTypes, edges, nodeGroups, nodes } from "./config";

/** Initial Layout */
const layout = [
  { w: 4, h: 1, x: 0, y: 0, i: "4" },
  { w: 4, h: 1, x: 4, y: 0, i: "6" },
  { w: 4, h: 1, x: 8, y: 0, i: "ffe4f454c94" },
  { w: 6, h: 3, x: 0, y: 1, i: "e4f454c9469" },
  { w: 6, h: 3, x: 7, y: 1, i: "fe4f454c946" },
  { w: 12, h: 4, x: 0, y: 4, i: "7" },
] satisfies HvDashboardProps["layout"];

const Content = () => {
  const { data } = useDatasets();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [open, setOpen] = useState(false);

  const persistDashboards = (
    nds: Node[],
    egs: Edge[],
    ly?: HvDashboardProps["layout"]
  ) => {
    const value = localStorage.getItem(DASHBOARDS_STORAGE_KEY);
    const specs: DashboardsStorage = value ? JSON.parse(value) : undefined;

    const dashboards = nds.reduce<DashboardsStorage>((acc, cur) => {
      if (cur.type === "dashboard") {
        const vizNodes = egs
          .filter((edge) => edge.target === cur.id)
          .reduce<DashboardSpecs["items"]>((accN, curEdg) => {
            const vizNode = nds.find((node) => node.id === curEdg.source);
            const datasetNodeId = egs.find(
              (edge) => edge.target === vizNode?.id
            )?.source;
            const datasetNode = nds.find((node) => node.id === datasetNodeId);

            if (vizNode) {
              accN.push({
                ...vizNode,
                data: {
                  ...vizNode.data,
                  endpoint: datasetNode?.data.endpoint,
                },
              });
            }
            return accN;
          }, []);

        const curLayout = specs?.[cur.id]?.layout;

        acc[cur.id] = {
          items: vizNodes,
          layout: ly ?? buildLayout(vizNodes, curLayout),
          cols: LAYOUT_COLS,
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
