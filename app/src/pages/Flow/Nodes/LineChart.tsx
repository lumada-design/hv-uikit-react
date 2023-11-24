import { useMemo } from "react";
import { useEdges, useNodes } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
  HvFlowNodeFC,
} from "@hitachivantara/uikit-react-lab";

import { NodeData, NodeGroup } from "../types";

export const LineChart: HvFlowNodeFC = (props) => {
  const { id } = props;

  const nodes = useNodes<NodeData>();
  const edges = useEdges();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const datasetNodeId = edges.find((e) => e.target === id)?.source;
    const datasetNode = nodes.find((n) => n.id === datasetNodeId);
    const columns = datasetNode?.data.columns;

    return columns
      ? [
          { label: "Title", id: "title", type: "text" },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Group by",
            id: "groupBy",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Split by",
            id: "splitBy",
            type: "select",
            options: columns,
            multiple: true,
          },
        ]
      : undefined;
  }, [edges, id, nodes]);

  return (
    <HvFlowNode
      params={params}
      description="Line Chart"
      expanded
      inputs={[
        {
          label: "Dataset",
          isMandatory: true,
          accepts: ["dataset"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Visualization",
          isMandatory: true,
          provides: "visualizations",
        },
      ]}
      {...props}
    />
  );
};

LineChart.meta = {
  label: "Line Chart",
  groupId: "visualization",
  data: {
    title: "",
    measure: undefined,
    groupBy: undefined,
    splitBy: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
