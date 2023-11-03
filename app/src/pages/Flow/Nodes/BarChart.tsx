import { NodeProps, useStore } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
} from "@hitachivantara/uikit-react-lab";

import { NodeGroup } from "../types";

export const BarChart = (props: NodeProps) => {
  const { id } = props;

  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const datasetNodeId = edges.find((e) => e.target === id)?.source;
  const datasetNode = nodes.find((n) => n.id === datasetNodeId);
  const columns = datasetNode?.data.columns;

  const params: HvFlowNodeProps["params"] = columns
    ? [
        { label: "Title", id: "title", type: "text" },
        {
          label: "Measure",
          id: "measure",
          type: "select",
          options: columns,
        },
        {
          label: "Group by",
          id: "groupBy",
          type: "select",
          options: columns,
        },
      ]
    : undefined;

  return (
    <HvFlowNode params={params} description="Bar Chart" expanded {...props} />
  );
};

BarChart.meta = {
  label: "Bar Chart",
  groupId: "visualization",
  inputs: [
    {
      label: "Dataset",
      isMandatory: true,
      accepts: ["dataset"],
      maxConnections: 1,
    },
  ],
  outputs: [
    {
      label: "Visualization",
      isMandatory: true,
      provides: "visualizations",
    },
  ],
  data: {
    title: "",
    measure: undefined,
    groupBy: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
