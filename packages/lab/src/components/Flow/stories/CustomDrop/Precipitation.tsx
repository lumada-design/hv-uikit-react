import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import { data } from "./data";
import type { NodeGroups } from ".";

export const Precipitation: HvFlowNodeFC<NodeGroups> = (props) => {
  return (
    <HvFlowNode
      description="Precipitation data"
      expanded
      params={[
        {
          id: "country",
          label: "Country",
          type: "select",
          options: Object.keys(data),
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
};
