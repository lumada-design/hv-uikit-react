import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const LineChart: HvFlowNodeFC<NodeGroups> = (props) => {
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
