import { useState } from "react";

import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  Connect,
  Deploy,
  Favorite,
  Heart,
  Home,
} from "@hitachivantara/uikit-react-icons";

import { Meta, StoryObj } from "@storybook/react";

import { css } from "@emotion/css";

import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import { HvFlowNode } from "./FlowNode";

import { HvFlow, HvFlowProps } from "../Flow";
import { HvFlowBackground } from "../Background";
import { HvFlowControls } from "../Controls";
import { HvFlowMinimap } from "../Minimap";
import { HvFlowSidebar } from "../Sidebar";
import { HvFlowNodeComponentType } from "../types";

const meta: Meta<typeof HvFlow> = {
  title: "Lab/Flow",
  component: HvFlow,
  subcomponents: {
    HvFlowBackground,
    HvFlowControls,
    HvFlowMinimap,
    HvFlowSidebar,
  },
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
type NodeGroups =
  | "asset"
  | "digitalTwin"
  | "simulator"
  | "ml-models"
  | "outputs";
const nodeGroups = {
  asset: {
    label: "Assets",
    color: "cat3_80",
    description: "This is my description for assets.",
    icon: <Heart />,
  },
  digitalTwin: {
    label: "Digital Twin",
    color: "cat2_80",
    description: "This is my description for digital twin.",
    icon: <Favorite />,
  },
  simulator: {
    label: "Simulator",
    color: "cat4_80",
    description: "This is my description for simulator.",
    icon: <Deploy />,
  },
  "ml-models": {
    label: "ML Models",
    color: "cat5_80",
    description: "This is my description for ML models.",
    icon: <Connect />,
  },
  outputs: {
    label: "Outputs",
    color: "cat6_80",
    description: "This is my description for outputs.",
    icon: <Home />,
  },
} satisfies HvFlowProps<any, NodeType, NodeGroups>["nodeGroups"];

// Node types (Should use HvFlowNode when available)
const BoomArm: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="Asset"
    description="Boom Arm"
    color={theme.colors.cat3_40}
    {...props}
  />
);
BoomArm.meta = {
  label: "Boom Arm",
  groupId: "asset", // HvFlowNode should have typing for the groupId
};
const ToyStory: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="Digital Twin"
    description="Toy Story"
    color={theme.colors.cat2_40}
    {...props}
  />
);
ToyStory.meta = {
  label: "Toy Story",
  groupId: "digitalTwin", // HvFlowNode should have typing for the groupId
};
const SpaceMountain: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="Asset"
    description="Space Mountain"
    color={theme.colors.cat3_40}
    {...props}
  />
);
SpaceMountain.meta = {
  label: "Space Mountain",
  groupId: "asset", // HvFlowNode should have typing for the groupId
};
const MagicMountain: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="ML Models"
    description="Magic Mountain"
    color={theme.colors.cat5_40}
    {...props}
  />
);
MagicMountain.meta = {
  label: "Magic Mountain",
  groupId: "ml-models", // HvFlowNode should have typing for the groupId
};
const Hollywood: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="Simulator"
    description="Hollywood Tower of Terror"
    color={theme.colors.cat4_40}
    {...props}
  />
);
Hollywood.meta = {
  label: "Hollywood Tower of Terror",
  groupId: "simulator", // HvFlowNode should have typing for the groupId
};
const Insights: HvFlowNodeComponentType<NodeGroups> = (props) => (
  <HvFlowNode
    title="Outputs"
    description="Insights Dashboard"
    color={theme.colors.cat6_40}
    {...props}
  />
);
Insights.meta = {
  label: "Insights Dashboard",
  groupId: "outputs", // HvFlowNode should have typing for the groupId
};
const nodeTypes = {
  boomArm: BoomArm,
  toyStory: ToyStory,
  spaceMountain: SpaceMountain,
  magicMountain: MagicMountain,
  hollywood: Hollywood,
  insights: Insights,
} satisfies HvFlowProps["nodeTypes"];
type NodeType = keyof typeof nodeTypes;

// Flow
const nodes = [
  {
    id: "1",
    position: { x: 41, y: 70 },
    data: {},
    type: "boomArm",
  },
  {
    id: "2",
    position: { x: 535, y: 44 },
    data: {},
    type: "toyStory",
  },
] satisfies HvFlowProps<any, NodeType, NodeGroups>["nodes"];
const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
] satisfies HvFlowProps<any, NodeType, NodeGroups>["edges"];

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
            <HvFlowBackground />
            <HvFlowControls />
            <HvFlowMinimap />
          </HvFlow>
        </div>
      </div>
    );
  },
};
