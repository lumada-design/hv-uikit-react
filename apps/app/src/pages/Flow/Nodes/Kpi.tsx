import { useMemo } from "react";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
  HvFlowNodeFC,
  useFlowInputNodes,
} from "@hitachivantara/uikit-react-lab";

import { NodeData, NodeGroup } from "../types";

export const Kpi: HvFlowNodeFC = (props) => {
  const { id } = props;

  const inputNodes = useFlowInputNodes<NodeData>(id);

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
