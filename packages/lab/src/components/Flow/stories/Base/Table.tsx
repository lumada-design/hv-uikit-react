import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const Table = (props: NodeProps) => {
  return <HvFlowNode description="Table description" {...props} />;
};

Table.meta = {
  label: "Table",
  groupId: "insights",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["prediction", "detection"],
    },
  ],
  outputs: [
    {
      label: "Insight",
      isMandatory: true,
      provides: "insight",
    },
  ],
};
