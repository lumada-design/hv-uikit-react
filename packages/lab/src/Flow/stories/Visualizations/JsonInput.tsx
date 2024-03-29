import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";
import { data } from "./data";

export const JsonInput: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="Population Datakky7"
      outputs={[
        {
          label: "Json Data",
          isMandatory: true,
          provides: "jsonData",
        },
      ]}
      {...props}
    />
  );
};

JsonInput.meta = {
  label: "Json Input",
  groupId: "inputs",
  data: {
    jsonData: data,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
