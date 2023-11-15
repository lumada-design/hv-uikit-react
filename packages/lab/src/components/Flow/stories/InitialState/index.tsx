import { useCallback, useRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogTitle,
  HvDialogContent,
  HvGlobalActions,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards } from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { nodeGroups, nodeTypes, restrictToSample } from "../Base";

const initialState = {
  nodes: [
    {
      id: "b1831327e65",
      position: { x: 230.5967160116935, y: -97.14041347943862 },
      data: {},
      type: "Asset",
    },
    {
      id: "1831327e654",
      position: { x: 1790.932393945947, y: -76.26621521352459 },
      data: { dashboardType: "Time Series" },
      type: "dashboard",
    },
    {
      id: "831327e6549",
      position: { x: 1157.0707002906995, y: -568.6650660564602 },
      data: {},
      type: "kpi",
    },
    {
      id: "31327e65496",
      position: { x: 1162.4773542051269, y: 39.698031531068864 },
      data: {},
      type: "kpi",
    },
    {
      id: "1327e654964",
      position: { x: 1165.3409624998887, y: -263.00419193314747 },
      data: {},
      type: "kpi",
    },
    {
      id: "327e654964e",
      position: { x: 1166.4303617693265, y: 336.30245348985204 },
      data: {},
      type: "lineChart",
    },
    {
      id: "27e654964ea",
      position: { x: 1171.7932914949638, y: 634.845421781169 },
      data: {},
      type: "table",
    },
    {
      id: "7e654964ea3",
      position: { x: 699.1400753100402, y: -276.0663081100252 },
      data: {},
      type: "mlModelPrediction",
    },
    {
      id: "e654964ea39",
      position: { x: 712.277606829035, y: 88.64323412853832 },
      data: {},
      type: "mlModelDetection",
    },
  ],
  edges: [
    {
      source: "831327e6549",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-831327e65490-1831327e6540",
    },
    {
      source: "31327e65496",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-31327e654960-1831327e6540",
    },
    {
      source: "1327e654964",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-1327e6549640-1831327e6540",
    },
    {
      source: "327e654964e",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-327e654964e0-1831327e6540",
    },
    {
      source: "27e654964ea",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-27e654964ea0-1831327e6540",
    },
    {
      source: "7e654964ea3",
      sourceHandle: "0",
      target: "831327e6549",
      targetHandle: "0",
      id: "reactflow__edge-7e654964ea30-831327e65490",
    },
    {
      source: "e654964ea39",
      sourceHandle: "0",
      target: "27e654964ea",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-27e654964ea0",
    },
    {
      source: "e654964ea39",
      sourceHandle: "0",
      target: "327e654964e",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-327e654964e0",
    },
    {
      source: "e654964ea39",
      sourceHandle: "0",
      target: "31327e65496",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-31327e654960",
    },
    {
      source: "e654964ea39",
      sourceHandle: "0",
      target: "1327e654964",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-1327e6549640",
    },
    {
      source: "b1831327e65",
      sourceHandle: "0",
      target: "7e654964ea3",
      targetHandle: "0",
      id: "reactflow__edge-b1831327e650-7e654964ea30",
    },
    {
      source: "b1831327e65",
      sourceHandle: "1",
      target: "e654964ea39",
      targetHandle: "0",
      id: "reactflow__edge-b1831327e651-e654964ea390",
    },
  ],
  viewport: { x: 50, y: 300, zoom: 0.53 },
};

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

export const InitialState = () => {
  const { rootId } = useTheme();

  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [details, setDetails] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const firstRender = useRef(true);

  const handleSave = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const makeDirty = (nds, eds) => {
    if (firstRender.current) return;
    setDirty(true);
    setDetails({ nodes: nds, edges: eds });
  };

  const onInit = () => {
    firstRender.current = false;
  };

  return (
    <div className={classes.root}>
      <HvDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <HvDialogTitle>Flow Details</HvDialogTitle>
        <HvDialogContent>
          <HvTypography>{JSON.stringify(details)}</HvTypography>
        </HvDialogContent>
      </HvDialog>
      <HvGlobalActions
        className={classes.globalActions}
        position="relative"
        backButton={
          <HvButton aria-label="Back" icon>
            <Backwards role="none" />
          </HvButton>
        }
        title="New Flow"
      >
        <HvButton
          variant="primary"
          startIcon={<Add role="none" />}
          onClick={() => setOpen(true)}
        >
          Add Node
        </HvButton>
        <HvButton
          variant="primarySubtle"
          disabled={!dirty}
          onClick={handleSave}
        >
          Save
        </HvButton>
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          nodes={initialState.nodes}
          edges={initialState.edges}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultViewport={initialState.viewport}
          onFlowChange={makeDirty}
          onInit={onInit}
          sidebar={
            <HvFlowSidebar
              title="Add Node"
              description="Please choose within the options below"
              open={open}
              onClose={() => setOpen(false)}
              // Needed to fix storybook
              dragOverlayProps={{
                modifiers: [
                  restrictToWindowEdges,
                  (args) => restrictToSample(rootId || "", args),
                ],
              }}
            />
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
