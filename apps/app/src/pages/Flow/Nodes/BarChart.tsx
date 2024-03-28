import { useMemo } from "react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeProps,
  HvFlowNodeTypeMeta,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData, NodeGroup } from "../types";

export const BarChart: HvFlowNodeFC<NodeGroup> = (props) => {
  const inputNodes = useFlowInputNodes<NodeData>();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const columns = inputNodes[0]?.data.columns;

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
  }, [inputNodes]);

  return (
    <HvFlowNode
      params={params}
      description="Bar Chart"
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

BarChart.meta = {
  label: "Bar Chart",
  groupId: "visualization",
  data: {
    title: "",
    measure: undefined,
    groupBy: undefined,
    splitBy: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
