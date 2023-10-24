import { HvFlowNode } from "@hitachivantara/uikit-react-lab";

export const LineChart = (props) => {
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
