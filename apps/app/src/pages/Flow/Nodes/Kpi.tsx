import { useMemo } from "react";
import { Node } from "@xyflow/react";
import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeProps,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData } from "../types";

export const Kpi: HvFlowNodeFC = (props) => {
  const inputNodes = useFlowInputNodes<Node<NodeData>>();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const columns = inputNodes[0]?.data.columns;

    return columns
      ? [
          { label: "Title", id: "title", type: "text" },
          { label: "Unit", id: "unit", type: "text" },
          {
            label: "Aggregation",
            id: "aggregation",
            type: "select",
            options: [
              {
                id: "sum",
                label: "Sum",
              },
              { id: "distinct", label: "Distinct" },
            ],
          },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
          },
        ]
      : undefined;
  }, [inputNodes]);

  return (
    <HvFlowNode
      description="KPI"
      groupId="visualization"
      params={params}
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
