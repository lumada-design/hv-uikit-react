import { HvDaFlowNode } from "@hitachivantara/uikit-react-lab";

import { data } from "./data";

export const Precipitation = (props) => {
  return (
    <HvDaFlowNode
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
