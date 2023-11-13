import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const LineChart = (props: NodeProps) => {
  return <HvFlowNode description="LineChart description" {...props} />;
};

LineChart.meta = {
  label: "LineChart",
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
