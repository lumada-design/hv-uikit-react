import { useState } from "react";

import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  Favorite,
  Heart,
  Home,
} from "@hitachivantara/uikit-react-icons";

import { Meta, StoryObj } from "@storybook/react";

import { css } from "@emotion/css";

import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import { HvFlow, HvFlowProps } from "../Flow";
import { HvFlowBackground } from "../Background";
import { HvFlowControls } from "../Controls";
import { HvFlowMinimap } from "../Minimap";
import { HvFlowSidebar } from "../Sidebar";
import { BoomArm } from "./BoomArm";
import { ToyStory } from "./ToyStory";
import { Insights } from "./Insights";

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
type NodeGroups = "asset" | "digitalTwin" | "outputs";

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
  outputs: {
    label: "Outputs",
    color: "cat6_80",
    description: "This is my description for outputs.",
    icon: <Home />,
  },
} satisfies HvFlowProps<any, NodeType, NodeGroups>["nodeGroups"];

const nodeTypes = {
  boomArm: BoomArm,
  toyStory: ToyStory,
  insights: Insights,
} satisfies HvFlowProps["nodeTypes"];

type NodeType = keyof typeof nodeTypes;

// Flow
const nodes = [
  {
    id: "1",
    position: { x: 20, y: 44 },
    data: {
      Threshold: "0.5",
      "API Key": "my-initial-key",
    },
    type: "boomArm",
  },
  {
    id: "2",
    position: { x: 360, y: 70 },
    data: {},
    type: "toyStory",
  },
  {
    id: "3",
    position: { x: 680, y: 100 },
    data: {},
    type: "insights",
  },
] satisfies HvFlowProps<any, NodeType, NodeGroups>["nodes"];

const edges = [
  {
    id: "e1-2",
    source: "1",
    sourceHandle: "0",
    target: "2",
    targetHandle: "0",
  },
  {
    id: "e2-3",
    source: "2",
    sourceHandle: "0",
    target: "3",
    targetHandle: "0",
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
            {/* <HvFlowMinimap /> */}
          </HvFlow>
        </div>
      </div>
    );
  },
};
