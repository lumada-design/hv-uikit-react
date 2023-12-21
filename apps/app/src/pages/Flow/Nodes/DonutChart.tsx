import { useMemo } from "react";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData, NodeGroup } from "../types";

export const DonutChart: HvFlowNodeFC = (props) => {
  const { id } = props;

  const inputNodes = useFlowInputNodes<NodeData>(id);

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
  }, [inputNodes]);

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
