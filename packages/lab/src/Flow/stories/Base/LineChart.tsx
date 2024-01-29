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
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "lineChart",
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
