import { useMemo } from "react";
import { useEdges, useNodes } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
  HvFlowNodeFC,
} from "@hitachivantara/uikit-react-lab";

export const DonutChart: HvFlowNodeFC = (props) => {
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
          },
          {
            label: "Group by",
            id: "groupBy",
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
      description="Donut Chart"
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

DonutChart.meta = {
  label: "Donut Chart",
  groupId: "visualization",
  data: {
    title: "",
    measure: undefined,
    groupBy: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
