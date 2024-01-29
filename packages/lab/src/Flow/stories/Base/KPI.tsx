import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

export const KPI: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="KPI description"
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

KPI.meta = {
  label: "KPI",
  groupId: "insights",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
