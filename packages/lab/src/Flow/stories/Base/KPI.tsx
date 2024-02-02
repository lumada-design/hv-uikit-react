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
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "kpi",
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
