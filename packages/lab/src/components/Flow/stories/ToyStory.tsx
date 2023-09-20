import { HvFlowNode } from "../Node/Node";

export const ToyStory = (props) => {
  return (
    <HvFlowNode
      title="Toy Story"
      description="Toy Story description"
      {...props}
    />
  );
};

ToyStory.meta = {
  label: "Toy Story",
  groupId: "digitalTwin", // HvFlowNode should have typing for the groupId
  inputs: [
    {
      label: "Config",
      isMandatory: true,
      accepts: ["config"],
    },
  ],
  outputs: [
    {
      label: "Data",
      isMandatory: true,
      provides: ["data"],
    },
  ],
};
