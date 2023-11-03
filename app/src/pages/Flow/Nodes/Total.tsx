import { NodeProps, useStore } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
} from "@hitachivantara/uikit-react-lab";

import { NodeGroup } from "../types";

export const Total = (props: NodeProps) => {
  const { id } = props;

  const nodes = useStore((state) => state.getNodes());
  const edges = useStore((state) => state.edges);
  const datasetNodeId = edges.find((e) => e.target === id)?.source;
  const datasetNode = nodes.find((n) => n.id === datasetNodeId);
  const columns = datasetNode?.data.columns;

  const params: HvFlowNodeProps<any>["params"] = columns
    ? [
        { label: "Title", id: "title", type: "text" },
        { label: "Unit", id: "unit", type: "text" },
        {
          label: "Measure",
          id: "measure",
          type: "select",
          options: columns,
        },
      ]
    : undefined;

  return <HvFlowNode params={params} description="Total" expanded {...props} />;
};

Total.meta = {
  label: "Total",
  groupId: "visualization",
  inputs: [{ label: "Dataset", isMandatory: true, accepts: ["dataset"] }],
  outputs: [
    {
      label: "Visualization",
      isMandatory: true,
      provides: "visualizations",
    },
  ],
  data: {
    title: "",
    unit: "",
    measure: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
