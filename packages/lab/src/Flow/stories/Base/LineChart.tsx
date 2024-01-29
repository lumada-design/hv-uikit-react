import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

export const LineChart: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="LineChart description"
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["prediction", "detection"],
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "insight",
        },
      ]}
      {...props}
    />
  );
};

LineChart.meta = {
  label: "LineChart",
  groupId: "insights",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
