import { useState } from "react";

import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  Delete,
  Duplicate,
  Favorite,
  Group,
  Heart,
  LineChartAlt,
} from "@hitachivantara/uikit-react-icons";

import { Meta, StoryObj } from "@storybook/react";

import { css } from "@emotion/css";

import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import { MarkerType } from "reactflow";
import { HvFlow, HvFlowProps } from "../Flow";
import { HvFlowBackground } from "../Background";
import { HvFlowControls } from "../Controls";
import { HvFlowMinimap } from "../Minimap";
import { HvFlowSidebar } from "../Sidebar";
import { Tron } from "./Tron";
import { MLModelPrediction } from "./MLModelPrediction";
import { MLModelDetection } from "./MLModelDetection";
import { KPI } from "./KPI";
import { LineChart } from "./LineChart";
import { Table } from "./Table";
import { Dashboard } from "./Dashboard";

const defaultActions = [
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState = {
  nodes: [
    {
      width: 250,
      height: 287,
      id: "b1831327e65",
      position: { x: 230.5967160116935, y: -97.14041347943862 },
      data: {},
      type: "tron",
      positionAbsolute: { x: 230.5967160116935, y: -97.14041347943862 },
      selected: false,
      dragging: false,
    },
    {
      width: 250,
      height: 344,
      id: "1831327e654",
      position: { x: 1790.932393945947, y: -76.26621521352459 },
      data: { dashboardType: "Time Series" },
      type: "dashboard",
      selected: true,
      positionAbsolute: { x: 1790.932393945947, y: -76.26621521352459 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "831327e6549",
      position: { x: 1157.0707002906995, y: -568.6650660564602 },
      data: {},
      type: "kpi",
      selected: false,
      positionAbsolute: { x: 1157.0707002906995, y: -568.6650660564602 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "31327e65496",
      position: { x: 1162.4773542051269, y: 39.698031531068864 },
      data: {},
      type: "kpi",
      selected: false,
      positionAbsolute: { x: 1162.4773542051269, y: 39.698031531068864 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "1327e654964",
      position: { x: 1165.3409624998887, y: -263.00419193314747 },
      data: {},
      type: "kpi",
      selected: false,
      positionAbsolute: { x: 1165.3409624998887, y: -263.00419193314747 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "327e654964e",
      position: { x: 1166.4303617693265, y: 336.30245348985204 },
      data: {},
      type: "lineChart",
      selected: false,
      positionAbsolute: { x: 1166.4303617693265, y: 336.30245348985204 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "27e654964ea",
      position: { x: 1171.7932914949638, y: 634.845421781169 },
      data: {},
      type: "table",
      selected: false,
      positionAbsolute: { x: 1171.7932914949638, y: 634.845421781169 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "7e654964ea3",
      position: { x: 699.1400753100402, y: -276.0663081100252 },
      data: {},
      type: "mlModelPrediction",
      selected: false,
      positionAbsolute: { x: 699.1400753100402, y: -276.0663081100252 },
      dragging: false,
    },
    {
      width: 250,
      height: 279,
      id: "e654964ea39",
      position: { x: 712.277606829035, y: 88.64323412853832 },
      data: {},
      type: "mlModelDetection",
      selected: false,
      positionAbsolute: { x: 712.277606829035, y: 88.64323412853832 },
      dragging: false,
    },
  ],
  edges: [
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "831327e6549",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-831327e65490-1831327e6540",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "31327e65496",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-31327e654960-1831327e6540",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "1327e654964",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-1327e6549640-1831327e6540",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "327e654964e",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-327e654964e0-1831327e6540",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "27e654964ea",
      sourceHandle: "0",
      target: "1831327e654",
      targetHandle: "0",
      id: "reactflow__edge-27e654964ea0-1831327e6540",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "7e654964ea3",
      sourceHandle: "0",
      target: "831327e6549",
      targetHandle: "0",
      id: "reactflow__edge-7e654964ea30-831327e65490",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "e654964ea39",
      sourceHandle: "0",
      target: "27e654964ea",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-27e654964ea0",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "e654964ea39",
      sourceHandle: "0",
      target: "327e654964e",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-327e654964e0",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "e654964ea39",
      sourceHandle: "0",
      target: "31327e65496",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-31327e654960",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "e654964ea39",
      sourceHandle: "0",
      target: "1327e654964",
      targetHandle: "0",
      id: "reactflow__edge-e654964ea390-1327e6549640",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "b1831327e65",
      sourceHandle: "0",
      target: "7e654964ea3",
      targetHandle: "0",
      id: "reactflow__edge-b1831327e650-7e654964ea30",
    },
    {
      markerEnd: { type: MarkerType.ArrowClosed, height: 20, width: 20 },
      source: "b1831327e65",
      sourceHandle: "1",
      target: "e654964ea39",
      targetHandle: "0",
      id: "reactflow__edge-b1831327e651-e654964ea390",
    },
  ],
  viewport: { x: 50, y: 300, zoom: 0.53 },
};

const meta: Meta<typeof HvFlow> = {
  title: "Lab/Flow",
  component: HvFlow,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: {
    HvFlowBackground,
    HvFlowControls,
    HvFlowMinimap,
    HvFlowSidebar,
  } as unknown,
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(
          screen.getByRole("button", {
            name: "Add Node",
          })
        );

        return waitFor(() => screen.getByText("Search node..."));
      },
    },
  },
};
export default meta;

// Node groups
type NodeGroups = "assets" | "models" | "insights" | "dashboard";

const nodeGroups = {
  assets: {
    label: "Assets",
    color: "cat3_80",
    description: "This is my description for assets.",
    icon: <Heart />,
  },
  models: {
    label: "ML Model",
    color: "cat1_80",
    description: "This is my description for digital twin.",
    icon: <Favorite />,
  },
  insights: {
    label: "Insights",
    color: "cat6_80",
    description: "This is my description for insights.",
    icon: <Group />,
  },
  dashboard: {
    label: "Dashboard",
    color: "cat2_80",
    description: "This is my description for dashboard.",
    icon: <LineChartAlt />,
  },
} satisfies HvFlowProps<any, NodeType, NodeGroups>["nodeGroups"];

const nodeTypes = {
  tron: Tron,
  mlModelPrediction: MLModelPrediction,
  mlModelDetection: MLModelDetection,
  kpi: KPI,
  lineChart: LineChart,
  table: Table,
  dashboard: Dashboard,
} satisfies HvFlowProps["nodeTypes"];

type NodeType = keyof typeof nodeTypes;

// Flow
const nodes = [] satisfies HvFlowProps<any, NodeType, NodeGroups>["nodes"];

const edges = [] satisfies HvFlowProps<any, NodeType, NodeGroups>["edges"];

export const Main: StoryObj<HvFlowProps> = {
  render: () => {
    const [open, setOpen] = useState(false);

    const styles = {
      root: { height: "100vh" },
      globalActions: { paddingBottom: theme.space.md },
      flow: {
        height: "calc(100% - 90px)",
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvGlobalActions
          className={css(styles.globalActions)}
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
        </HvGlobalActions>
        <div className={css(styles.flow)}>
          <HvFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodeGroups={nodeGroups}
            defaultActions={defaultActions}
            sidebar={
              <HvFlowSidebar
                title="Add Node"
                description="Please choose within the options below"
                open={open}
                onClose={() => setOpen(false)}
              />
            }
            // Keeping track of flow updates
            onFlowChange={(nds, eds) =>
              console.log("Flow updated: ", { nodes: nds, edges: eds })
            }
          >
            {/* <HvFlowBackground /> */}
            <HvFlowControls />
            {/* <HvFlowMinimap /> */}
          </HvFlow>
        </div>
      </div>
    );
  },
};

export const InitialState: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story: "A Fow with an initial state",
      },
    },
    eyes: { include: false },
  },

  render: () => {
    const [open, setOpen] = useState(false);

    const styles = {
      root: { height: "100vh" },
      globalActions: { paddingBottom: theme.space.md },
      flow: {
        height: "calc(100% - 90px)",
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvGlobalActions
          className={css(styles.globalActions)}
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
        </HvGlobalActions>
        <div className={css(styles.flow)}>
          <HvFlow
            nodes={initialState.nodes}
            edges={initialState.edges}
            nodeTypes={nodeTypes}
            nodeGroups={nodeGroups}
            defaultViewport={initialState.viewport}
            sidebar={
              <HvFlowSidebar
                title="Add Node"
                description="Please choose within the options below"
                open={open}
                onClose={() => setOpen(false)}
              />
            }
            // Keeping track of flow updates
            onFlowChange={(nds, eds) =>
              console.log("Flow updated: ", { nodes: nds, edges: eds })
            }
          >
            {/* <HvFlowBackground /> */}
            <HvFlowControls />
            {/* <HvFlowMinimap /> */}
          </HvFlow>
        </div>
      </div>
    );
  },
};
