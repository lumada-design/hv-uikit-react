import { css } from "@emotion/css";
import { HvButton, HvGlobalActions } from "@hitachivantara/uikit-react-core";
import {
  Add,
  Backwards,
  LineChart as LineChartIcon,
  Heart,
  Transformation,
  Delete,
  Duplicate,
} from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { useState } from "react";
import { HvFlowSidebar } from "../../Sidebar";
import { HvFlow, HvFlowProps } from "../../Flow";
import { HvFlowControls } from "../../Controls";
import { JsonInput } from "./JsonInput";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { Filter } from "./Filter";
import { HvFlowDefaultActions } from "../../types";

const defaultActions: HvFlowDefaultActions[] = [
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
];

export const Visualizations = () => {
  const [open, setOpen] = useState(false);

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
      label: "Inputs",
      color: "cat3_80",
      description: "This is my description for inputs.",
      icon: <Heart />,
    },
    transformations: {
      label: "Transformations",
      color: "cat5_80",
      description: "This is my description for transformations.",
      icon: <Transformation />,
    },
    visualizations: {
      label: "Visualizations",
      color: "cat1_80",
      description: "This is my description for visualizations.",
      icon: <LineChartIcon />,
    },
  } satisfies HvFlowProps<any, NodeType, NodeGroups>["nodeGroups"];

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
        jsonData: [
          // { country: "usa", year: "2020", population: 336000000 },
          // { country: "usa", year: "2021", population: 337000000 },
          // { country: "usa", year: "2022", population: 338000000 },
          // { country: "usa", year: "2023", population: 340000000 },
          // { country: "japan", year: "2020", population: 126000000 },
          // { country: "japan", year: "2021", population: 125000000 },
          // { country: "japan", year: "2022", population: 125000000 },
          // { country: "japan", year: "2023", population: 124000000 },
        ],
      },
    },
    {
      id: "barChartFiltered",
      type: "barChart",
      position: { x: 980, y: 600 },
      data: {},
    },
  ] satisfies HvFlowProps<any, NodeType, NodeGroups>["nodes"];

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
  ] satisfies HvFlowProps<any, NodeType, NodeGroups>["edges"];

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
          // Keeping track of flow updates
          onFlowChange={(nds, eds) =>
            console.log("Flow updated: ", { nodes: nds, edges: eds })
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
