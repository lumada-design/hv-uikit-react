import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const KPI: HvFlowNodeFC<NodeGroups> = (props) => {
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
};
