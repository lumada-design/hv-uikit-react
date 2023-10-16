import { HvFlowNode } from "../Node/Node";

export const LineChart = (props) => {
  return (
    <HvFlowNode
      title="LineChart"
      description="LineChart description"
      {...props}
    />
  );
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
