import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

export const Table: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="Table description"
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

Table.meta = {
  label: "Table",
  groupId: "insights",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
