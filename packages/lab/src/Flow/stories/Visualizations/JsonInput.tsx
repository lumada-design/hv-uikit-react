import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import { data } from "./data";

export const JsonInput: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="Input"
      subtitle="Json Input"
      description="Population Datakky7"
      group="transformation"
      outputs={[
        {
          label: "Json Data",
          isMandatory: true,
          provides: "jsonData",
        },
      ]}
      {...props}
      data={{
        jsonData: data,
      }}
    />
  );
};
