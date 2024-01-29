import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import { data } from "./data";
import type { NodeGroup } from ".";

export const Precipitation: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="Precipitation data"
      expanded
      params={[
        {
          id: "country",
          label: "Country",
          type: "select",
          options: Object.keys(data).map((key) => ({
            id: key,
            label: key,
          })),
        },
      ]}
      outputs={[
        {
          label: "Data",
          isMandatory: true,
          provides: "data",
        },
      ]}
      {...props}
    />
  );
};

Precipitation.meta = {
  label: "Precipitation",
  groupId: "sources",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
