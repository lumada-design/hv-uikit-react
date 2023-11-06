import { HvFlowNode } from "@hitachivantara/uikit-react-lab";

export const JsonInput = (props) => {
  return <HvFlowNode description="Population Datakky7" {...props} />;
};

JsonInput.meta = {
  label: "Json Input",
  groupId: "inputs",
  outputs: [
    {
      label: "Json Data",
      isMandatory: true,
      provides: "jsonData",
    },
  ],
};
