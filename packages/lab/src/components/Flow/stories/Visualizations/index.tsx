import { useState } from "react";

import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  LineChartAlt,
  Operation,
  DataSource,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowProps,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";

// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Visualizations
import { BarChart } from "./BarChart";
import { Filter } from "./Filter";
import { JsonInput } from "./JsonInput";
import { LineChart } from "./LineChart";
// The code for these values are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Base/index.tsx
import { defaultActions } from "../Base";

// Note types
const nodeTypes = {
  jsonInput: JsonInput,
  filter: Filter,
  lineChart: LineChart,
  barChart: BarChart,
} satisfies HvFlowProps["nodeTypes"];

type NodeType = keyof typeof nodeTypes;

// Node groups
type NodeGroups = "inputs" | "transformations" | "visualizations";

const nodeGroups = {
  inputs: {
    label: "Input",
    color: "cat3_80",
    description: "Find here all the available inputs.",
    icon: <DataSource />,
  },
  transformations: {
    label: "Transformation",
    color: "cat5_80",
    description: "Find here all the available transformations.",
    icon: <Operation />,
  },
  visualizations: {
    label: "Visualization",
    color: "cat1_80",
    description: "Find here all the available visualizations.",
    icon: <LineChartAlt />,
  },
} satisfies HvFlowProps<NodeGroups>["nodeGroups"];

// Flow
const nodes = [
  {
    id: "jsonInput",
    type: "jsonInput",
    position: {
      x: 20,
      y: 500,
    },
    data: {
      jsonData: [
        { country: "portugal", year: "2020", population: 10030000 },
        { country: "portugal", year: "2021", population: 10030000 },
        { country: "portugal", year: "2022", population: 10030000 },
        { country: "portugal", year: "2023", population: 10020000 },
        { country: "usa", year: "2020", population: 336000000 },
        { country: "usa", year: "2021", population: 337000000 },
        { country: "usa", year: "2022", population: 338000000 },
        { country: "usa", year: "2023", population: 340000000 },
        { country: "japan", year: "2020", population: 126000000 },
        { country: "japan", year: "2021", population: 125000000 },
        { country: "japan", year: "2022", population: 125000000 },
        { country: "japan", year: "2023", population: 124000000 },
      ],
    },
  },
  {
    id: "lineChart",
    type: "lineChart",
    position: { x: 380, y: 20 },
    data: {},
  },
  {
    id: "barChart",
    type: "barChart",
    position: { x: 980, y: 20 },
    data: {},
  },
  {
    id: "filter",
    type: "filter",
    position: { x: 630, y: 600 },
    data: {
      jsonData: [],
    },
  },
  {
    id: "barChartFiltered",
    type: "barChart",
    position: { x: 980, y: 600 },
    data: {},
  },
] satisfies HvFlowProps<NodeGroups, NodeType>["nodes"];

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
] satisfies HvFlowProps<NodeGroups, NodeType>["edges"];

// Classes
export const classes = {
  root: css({ height: "100vh" }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

export const Visualizations = () => {
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
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultActions={defaultActions}
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
            />
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
