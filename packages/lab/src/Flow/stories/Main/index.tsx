import { useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards, Fail } from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowControls,
  HvFlowEmpty,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import {
  NodeGroup,
  nodeGroups,
  NodeType,
  nodeTypes,
  restrictToSample,
} from "../Base";
import { LayoutsProvider } from "../Base/LayoutsContext";

// Flow
const nodes: HvFlowProps<NodeGroup, NodeType>["nodes"] = [];
const edges: HvFlowProps<NodeGroup, NodeType>["edges"] = [];

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
              // Needed to fix storybook
              dragOverlayProps={{
                modifiers: [
                  restrictToWindowEdges,
                  (args) => restrictToSample(rootId || "", args),
                ],
              }}
              defaultGroupProps={{
                label: "All",
                color: "cat11_80",
                description:
                  "This is for all the nodes that don't have groupId",
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

export const Main = () => (
  <LayoutsProvider>
    <Flow />
  </LayoutsProvider>
);
