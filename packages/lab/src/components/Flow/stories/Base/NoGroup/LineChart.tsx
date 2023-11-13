import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const LineChart = (props: NodeProps) => {
  return (
    <HvFlowNode
      description="LineChart description"
      nodeDefaults={{
        title: "Line Chart",
        subTitle: "Visualization",
        color: "cat12_80",
      }}
      {...props}
    />
  );
};

LineChart.meta = {
  label: "LineChart",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["prediction", "detection"],
    },
  ],
};
