import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvDropdown,
  HvDropdownProps,
  HvGlobalActions,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  DataSource,
  LineChartAlt,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowProps,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";
import { Node, ReactFlowInstance } from "reactflow";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

// The code for these components and values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/CustomDrop
import { Precipitation } from "./Precipitation";
import { data } from "./data";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { restrictToSample } from "../Base";

// Node groups
export type NodeGroups = "sources" | "visualizations";

export const nodeGroups = {
  sources: {
    label: "Data Source",
    color: "cat3_80",
    description: "Find here all the available data sources.",
    icon: <DataSource />,
  },
  visualizations: {
    label: "Visualization",
    color: "cat1_80",
    description: "Find here all the available visualizations.",
    icon: <LineChartAlt />,
  },
} satisfies HvFlowProps<NodeGroups>["nodeGroups"];

// Node types
export const nodeTypes = {
  precipitation: Precipitation,
  lineChart: LineChart,
  barChart: BarChart,
} satisfies HvFlowProps["nodeTypes"];

export type NodeType = keyof typeof nodeTypes;

// Flow
const nodes = [] satisfies HvFlowProps<NodeGroups, NodeType>["nodes"];
const edges = [] satisfies HvFlowProps<NodeGroups, NodeType>["edges"];

// Classes
const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

export const CustomDrop = () => {
  const { rootId } = useTheme();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const [open, setOpen] = useState(false);
  const [precipitationConfig, setPrecipitationConfig] = useState<Node>();

  const options = useMemo(
    () =>
      Object.keys(data).map((key) => {
        return { label: key };
      }),
    []
  );

  const handleCloseConfig = () => {
    setPrecipitationConfig(undefined);
  };

  const handleChangeConfig: HvDropdownProps["onChange"] = (value) => {
    if (value && !Array.isArray(value) && precipitationConfig) {
      setPrecipitationConfig({
        ...precipitationConfig,
        data: {
          ...precipitationConfig.data,
          country: value.label,
        },
      });
    }
  };

  const handleApplyConfig = () => {
    if (precipitationConfig) {
      reactFlowInstance?.setNodes((nds) => nds.concat(precipitationConfig));

      setPrecipitationConfig(undefined);
    }
  };

  const handleDrop: HvFlowProps["onDndDrop"] = (event, node) => {
    if (node.type === "precipitation") {
      setPrecipitationConfig(node);
    } else {
      reactFlowInstance?.setNodes((nds) => nds.concat(node));
    }
  };

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
            />
          }
          onInit={setReactFlowInstance}
          onDndDrop={handleDrop}
        >
          <HvFlowControls />
        </HvFlow>
      </div>
      <HvDialog open={!!precipitationConfig} onClose={handleCloseConfig}>
        <HvDialogTitle variant="info">Configure the node</HvDialogTitle>
        <HvDialogContent>
          <HvDropdown
            label="Select the country"
            values={options}
            onChange={handleChangeConfig}
          />
        </HvDialogContent>
        <HvDialogActions>
          <HvButton
            disabled={!precipitationConfig?.data.country}
            variant="primary"
            onClick={handleApplyConfig}
          >
            Apply
          </HvButton>
          <HvButton variant="secondarySubtle" onClick={handleCloseConfig}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};
