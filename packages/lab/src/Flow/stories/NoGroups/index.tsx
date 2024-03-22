import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards } from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowControls,
  HvFlowProps,
} from "@hitachivantara/uikit-react-lab";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { restrictToSample } from "../Base";
// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/NoGroups
import { Asset } from "./Asset";
import { LineChart } from "./LineChart";
import { MLModel } from "./MLModel";

// Classes
export const classes = {
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

export const nodeGroups = {
  assets: {
    label: "Asset",
    items: {
      asset: { type: "asset", label: "Asset" },
    },
  },
  models: {
    label: "Models",
    items: {
      prediction: {
        type: "model",
        label: "Model Prediction",
        data: { type: "prediction" },
      },
      detection: {
        type: "model",
        label: "Model Detection",
        data: { type: "detection" },
      },
    },
  },
  insights: {
    label: "Insights",
    items: { lineChart: { type: "lineChart", label: "Line Chart" } },
  },
} satisfies HvFlowProps["nodeGroups"];

const nodeTypes = {
  asset: Asset,
  model: MLModel,
  lineChart: LineChart,
} satisfies HvFlowProps["nodeTypes"];

export const NoGroups = () => {
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
          nodeGroups={nodeGroups}
          nodeTypes={nodeTypes}
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
              flatten
            />
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
