import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

import { data } from "./data";

export const Precipitation = (props: NodeProps) => {
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
      {...props}
    />
  );
};

Precipitation.meta = {
  label: "Precipitation",
  groupId: "sources",
  outputs: [
    {
      label: "Data",
      isMandatory: true,
      provides: "data",
    },
  ],
};
