import { useMemo } from "react";
import { useEdges, useNodes } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
  HvFlowNodeFC,
} from "@hitachivantara/uikit-react-lab";

import { NodeData, NodeGroup } from "../types";

export const Kpi: HvFlowNodeFC = (props) => {
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
          { label: "Unit", id: "unit", type: "text" },
          {
            label: "Aggregation",
            id: "aggregation",
            type: "select",
            options: ["sum", "distinct"],
          },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
          },
        ]
      : undefined;
  }, [edges, id, nodes]);

  return (
    <HvFlowNode
      params={params}
      description="KPI"
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

Kpi.meta = {
  label: "KPI",
  groupId: "visualization",

  data: {
    title: "",
    unit: "",
    measure: undefined,
    aggregation: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;