import { HvFlowNode } from "../../Node/Node";

export const JsonInput = (props) => {
  return (
    <HvFlowNode title="Tron" description="Population Datakky7" {...props} />
  );
};

JsonInput.meta = {
  label: "Json Input",
  groupId: "inputs",
  outputs: [
    {
      label: "Json Data",
      isMandatory: true,
      provides: ["jsonData"],
    },
  ],
};
