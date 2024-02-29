import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards, DataSource } from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowNode,
  HvFlowNodeProps,
  HvFlowNodeFC,
  HvFlowProps,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { restrictToSample } from "../Base";

type NodeGroup = keyof typeof nodeGroups;

/** Create a generic node programmatically */
const createNode = (nodeProps: Partial<HvFlowNodeProps>) => {
  const Asset: HvFlowNodeFC<NodeGroup> = (props) => (
    <HvFlowNode {...nodeProps} {...props} />
  );
  return Asset;
};

// Classes
const classes = {
  root: css({
    height: "100vh",
    [`& .HvFlowSidebarGroup-itemsContainer`]: {
      maxHeight: 300,
      overflow: "scroll",
    },
  }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

const numberOfAssets = 40;
const options = [
  { id: "way-side", label: "Way Side" },
  { id: "track", label: "Track" },
  { id: "segment", label: "Segment" },
  { id: "light-cycle", label: "Light Cycle" },
  { id: "zone", label: "Zone" },
];

const nodeTypes = {
  asset: createNode({
    expanded: true,
    params: [{ id: "asset", label: "Asset", type: "select", options }],
    group: "assets",
  }),
} satisfies HvFlowProps["nodeTypes"];

const nodeGroups = {
  assets: {
    label: "Assets",
    color: "cat3_80",
    description:
      "Find here all the available assets. Scroll to see all the options.",
    icon: <DataSource />,
    items: Array.from({ length: numberOfAssets }).map((_, index) => ({
      type: "asset",
      label: `Asset ${index + 1}`,
    })),
  },
} satisfies HvFlowProps["nodeGroups"];

export const Dynamic = () => {
  const { rootId } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
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
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          nodes={[]}
          edges={[]}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultViewport={{
            zoom: 0.7,
            x: 0,
            y: 0,
          }}
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
