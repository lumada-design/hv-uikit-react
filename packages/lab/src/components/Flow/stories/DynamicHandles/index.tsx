import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Node, ReactFlowInstance } from "reactflow";
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
import { Add, DataSource } from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowProps,
  HvFlowSidebar,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";

// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base
import { restrictToSample } from "../Base";
// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/CustomNode
import { Asset, NodeData, types } from "./Asset";

// Classes
const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

// Node groups
export const nodeGroups = {
  assets: {
    label: "Asset",
    color: "cat3_80",
    description: "Find here all the available assets.",
    icon: <DataSource />,
  },
} satisfies HvFlowProps["nodeGroups"];

// Node types
export const nodeTypes = {
  asset: Asset,
} satisfies HvFlowProps["nodeTypes"];

// Flow
const nodes: HvFlowProps["nodes"] = [
  {
    id: "22b4a205d16",
    position: { x: 539, y: 146 },
    data: {
      type: "Type 1",
      inputs: [
        {
          label: "Data",
          isMandatory: true,
          accepts: ["data1", "data2", "data3"],
          maxConnections: 1,
        },
      ],
      outputs: [],
    },
    type: "asset",
  },
  {
    id: "2b4a205d16b",
    position: { x: 117, y: 147 },
    data: {
      type: "Type 2",
      outputs: [{ label: "Data 3", provides: "data3" }],
      inputs: [],
    },
    type: "asset",
  },
];
const edges: HvFlowProps["edges"] = [
  {
    source: "2b4a205d16b",
    sourceHandle: "0",
    target: "22b4a205d16",
    targetHandle: "0",
    id: "reactflow__edge-2b4a205d16b0-22b4a205d160",
  },
];

export const DynamicHandles = () => {
  const { rootId } = useTheme();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const [open, setOpen] = useState(false);
  const [nodeConfig, setNodeConfig] = useState<Node<NodeData>>();

  const options = useMemo(
    () =>
      Object.keys(types).map((key) => {
        return { id: key, label: key };
      }),
    []
  );

  const handleCloseConfig = () => {
    setNodeConfig(undefined);
  };

  const handleChangeConfig: HvDropdownProps["onChange"] = (value) => {
    if (
      value &&
      !Array.isArray(value) &&
      nodeConfig &&
      typeof value.label === "string"
    ) {
      setNodeConfig({
        ...nodeConfig,
        data: {
          ...nodeConfig.data,
          type: value.label,
        },
      });
    }
  };

  const handleApplyConfig = () => {
    if (nodeConfig?.data.type) {
      // Add node to flow and set inputs and outputs
      const ndConfig = {
        ...nodeConfig,
        data: {
          ...nodeConfig.data,
          ...types[nodeConfig.data.type],
        },
      };
      reactFlowInstance?.setNodes((nds) => nds.concat(ndConfig));

      setNodeConfig(undefined);
    }
  };

  const handleDrop: HvFlowProps["onDndDrop"] = (event, node) => {
    if (node.type === "asset") {
      setNodeConfig(node);
    } else {
      reactFlowInstance?.setNodes((nds) => nds.concat(node));
    }
  };

  return (
    <div className={classes.root}>
      <HvGlobalActions
        className={classes.globalActions}
        position="relative"
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
      <HvDialog open={!!nodeConfig} onClose={handleCloseConfig}>
        <HvDialogTitle variant="info">Configure the node</HvDialogTitle>
        <HvDialogContent>
          <HvDropdown
            label="Select the type"
            values={options}
            onChange={handleChangeConfig}
          />
        </HvDialogContent>
        <HvDialogActions>
          <HvButton
            disabled={!nodeConfig?.data.type}
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
