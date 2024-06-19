import { useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  HvIconButton,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  Fail,
  Leaf,
  Teapot,
  Water,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowControls,
  HvFlowEmpty,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

import { restrictToSample } from "../Base";
import { LayoutsProvider } from "../Base/LayoutsContext";
// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/BaseHook
import { CustomEdge } from "./IconEdge";
import { Node } from "./Node";

// Initial state
const initialState = {
  nodes: [
    {
      width: 250,
      height: 365,
      id: "1caf2381eaf",
      position: { x: 194, y: -160 },
      data: { nodeLabel: "Custom Label" },
      type: "leaves",
    },
    {
      width: 250,
      height: 274,
      id: "caf2381eaf3",
      position: { x: 637, y: -367 },
      data: { nodeLabel: "Custom Label" },
      type: "teapot",
    },
  ],
  edges: [
    {
      source: "1caf2381eaf",
      sourceHandle: "0",
      target: "caf2381eaf3",
      targetHandle: "0",
      id: "reactflow__edge-1caf2381eaf0-caf2381eaf30",
      type: "iconEdge",
    },
  ],
  viewport: { x: 150, y: 300, zoom: 0.6 },
};

const LeavesNode = (props) => (
  <Node
    groupId="leaves"
    {...props}
    outputs={[{ label: "outputs", provides: "leaves" }]}
    inputs={[]}
  />
);

const WaterNode = (props) => (
  <Node
    groupId="water"
    {...props}
    outputs={[{ label: "outputs", provides: "water" }]}
    inputs={[]}
  />
);

const TeapotNode = (props) => (
  <Node
    groupId="teapot"
    {...props}
    inputs={[{ label: "inputs", accepts: ["leaves", "water"] }]}
    outputs={[{ label: "outputs", provides: "tea" }]}
  />
);

const nodeGroups = {
  leaves: {
    label: "Tea Leaves",
    color: "cat3",
    icon: <Leaf />,
    items: [{ nodeType: "leaves", label: "Green Tea" }],
  },
  teapot: {
    label: "Teapot",
    color: "cat2_40",
    icon: <Teapot />,
    items: [{ nodeType: "teapot", label: "Teapot" }],
  },
  water: {
    label: "Water",
    color: "cat1",
    icon: <Water />,
    items: [{ nodeType: "water", label: "Water" }],
  },
} satisfies HvFlowProps["nodeGroups"];

export type NodeGroup = keyof typeof nodeGroups;

export const nodeTypes: HvFlowProps["nodeTypes"] = {
  leaves: LeavesNode,
  teapot: TeapotNode,
  water: WaterNode,
} satisfies HvFlowProps["nodeTypes"];

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

export const Flow = () => {
  const { rootId } = useTheme();

  const [open, setOpen] = useState(false);

  const CustomAction = (
    <div className={css({ display: "flex", flexDirection: "row" })}>
      <HvTypography
        link
        component="a"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Add nodes
      </HvTypography>
      <HvTypography>&nbsp;to start building your flow.</HvTypography>
    </div>
  );

  return (
    <div className={classes.root}>
      <HvGlobalActions
        className={classes.globalActions}
        position="relative"
        backButton={
          <HvIconButton title="Back">
            <Backwards />
          </HvIconButton>
        }
        title="New Flow"
      >
        <HvButton
          variant="primary"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Node
        </HvButton>
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          nodes={initialState.nodes}
          edges={initialState.edges}
          edgeTypes={{ iconEdge: CustomEdge }}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultViewport={initialState.viewport}
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
          // Keeping track of flow updates
          onFlowChange={(nds, eds) =>
            console.log("Flow updated: ", { nodes: nds, edges: eds })
          }
        >
          <HvFlowControls />
          <HvFlowEmpty
            title="Empty Flow"
            action={CustomAction}
            icon={<Fail />}
          />
        </HvFlow>
      </div>
    </div>
  );
};

export const BaseHook = () => (
  <LayoutsProvider>
    <Flow />
  </LayoutsProvider>
);
