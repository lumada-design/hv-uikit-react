import { HvFlowNode } from "../Node/Node";

export const BoomArm = (props) => {
  return (
    <HvFlowNode
      title="Boom Arm"
      description="Boom Arm description"
      expanded
      params={[
        {
          id: "apiKey",
          label: "API Key",
          type: "text",
        },
        {
          id: "threshold",
          label: "Threshold",
          type: "select",
          options: ["0", "0.5", "1"],
        },
      ]}
      {...props}
    />
  );
};

BoomArm.meta = {
  label: "Boom Arm",
  groupId: "asset", // HvFlowNode should have typing for the groupId,
  inputs: [],
  outputs: [
    {
      label: "Config",
      isMandatory: true,
      provides: ["config"],
    },
  ],
};
