import { ErrorBoundary } from "react-error-boundary";
import { css } from "@emotion/css";
import {
  HvButton,
  HvEmptyState,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Level3Bad } from "@hitachivantara/uikit-react-icons";
import { HvFlow } from "@hitachivantara/uikit-react-lab";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { nodeGroups, nodeTypes } from "../Base";

const invalidState = {
  nodes: [
    {
      id: "b1831327e65",
      // Remove the position to trigger the error
      // position: { x: 230, y: -97 },
      data: {},
      type: "Asset",
    },
    {
      id: "e654964ea39",
      position: { x: 700, y: 88 },
      data: {},
      type: "mlModelDetection",
    },
  ],
  edges: [
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

const fallbackRender = ({ error }) => {
  return (
    <HvEmptyState
      title="There was an error loading the flow"
      message={`Error: ${error.message}`}
      icon={<Level3Bad />}
      classes={{
        root: css({
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }),
      }}
    />
  );
};

export const Invalid = () => {
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
      />
      <div className={classes.flow}>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <HvFlow
            // @ts-expect-error expected error due to the invalid state we're passing
            nodes={invalidState.nodes}
            edges={invalidState.edges}
            nodeTypes={nodeTypes}
            nodeGroups={nodeGroups}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};
