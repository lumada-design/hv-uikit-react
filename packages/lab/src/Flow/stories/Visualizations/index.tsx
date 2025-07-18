import { useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { css } from "@emotion/css";
import { Node } from "@xyflow/react";
import {
  HvButton,
  HvGlobalActions,
  HvIconButton,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  DataSource,
  LineChartAlt,
  Operation,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlow,
  HvFlowControls,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { restrictToSample } from "../Base";
// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Visualizations
import { BarChart } from "./BarChart";
import { data } from "./data";
import { Filter } from "./Filter";
import { JsonInput } from "./JsonInput";
import { LineChart } from "./LineChart";

// Data interfaces
interface BaseNodeData extends Record<string, unknown> {
  nodeLabel?: string;
}

interface JsonInputData extends BaseNodeData {
  jsonData?: any[];
}

interface FilterData extends BaseNodeData {
  jsonData?: any[];
}

interface ChartData extends BaseNodeData {}

// Node types
type JsonInputNode = Node<JsonInputData, "jsonInput">;
type FilterNode = Node<FilterData, "filter">;
type LineChartNode = Node<ChartData, "lineChart">;
type BarChartNode = Node<ChartData, "barChart">;

type FlowNode = JsonInputNode | FilterNode | LineChartNode | BarChartNode;

// Note types
const nodeTypes = {
  jsonInput: JsonInput,
  filter: Filter,
  lineChart: LineChart,
  barChart: BarChart,
} satisfies HvFlowProps["nodeTypes"];

// Node groups
const nodeGroups = {
  inputs: {
    label: "Input",
    color: "cat3_80",
    description: "Find here all the available inputs.",
    icon: <DataSource />,
    items: [
      {
        nodeType: "jsonInput",
        label: "JSON Input",
        data: { jsonData: data },
      },
    ],
  },
  transformations: {
    label: "Transformation",
    color: "cat5_80",
    description: "Find here all the available transformations.",
    icon: <Operation />,
    items: [
      {
        nodeType: "filter",
        label: "Filter",
      },
    ],
  },
  visualizations: {
    label: "Visualization",
    color: "cat1_80",
    description: "Find here all the available visualizations.",
    icon: <LineChartAlt />,
    items: [
      { nodeType: "lineChart", label: "Line Chart" },
      { nodeType: "barChart", label: "Bar Chart" },
    ],
  },
} satisfies HvFlowProps["nodeGroups"];

export type NodeGroup = keyof typeof nodeGroups;

// Flow
const nodes: FlowNode[] = [
  {
    id: "jsonInput",
    type: "jsonInput",
    position: {
      x: 20,
      y: 500,
    },
    data: {
      jsonData: data,
      nodeLabel: "JSON Input",
    },
  } as JsonInputNode,
  {
    id: "lineChart",
    type: "lineChart",
    position: { x: 380, y: 20 },
    data: { nodeLabel: "Line Chart" },
  } as LineChartNode,
  {
    id: "barChart",
    type: "barChart",
    position: { x: 980, y: 20 },
    data: { nodeLabel: "Bar Chart" },
  } as BarChartNode,
  {
    id: "filter",
    type: "filter",
    position: { x: 630, y: 600 },
    data: {
      jsonData: [],
      nodeLabel: "Filter",
    },
  } as FilterNode,
  {
    id: "barChartFiltered",
    type: "barChart",
    position: { x: 980, y: 600 },
    data: { nodeLabel: "Bar Chart" },
  } as BarChartNode,
];

const edges = [
  {
    id: "jsonInput-lineChart",
    source: "jsonInput",
    sourceHandle: "0",
    target: "lineChart",
    targetHandle: "0",
  },
  {
    id: "jsonInput-barChart",
    source: "jsonInput",
    sourceHandle: "0",
    target: "barChart",
    targetHandle: "0",
  },
  {
    id: "jsonInput-filter",
    source: "jsonInput",
    sourceHandle: "0",
    target: "filter",
    targetHandle: "0",
  },
  {
    id: "filter-barChartFiltered",
    source: "filter",
    sourceHandle: "0",
    target: "barChartFiltered",
    targetHandle: "0",
  },
] satisfies HvFlowProps["edges"];

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

export const Visualizations = () => {
  const { rootId } = useTheme();

  const [open, setOpen] = useState(false);

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
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultViewport={{
            zoom: 0.7,
            x: 0,
            y: 0,
          }}
          defaultEdgeOptions={{ animated: true }}
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
