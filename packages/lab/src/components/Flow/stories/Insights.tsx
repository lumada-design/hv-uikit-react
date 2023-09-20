import { HvFlowNode } from "../Node/Node";

export const Insights = (props) => {
  return (
    <HvFlowNode
      title="Insights Dashboard"
      description="Insights Dashboard Description"
      {...props}
    />
  );
};

Insights.meta = {
  label: "Insights Dashboard",
  groupId: "outputs", // HvFlowNode should have typing for the groupId,
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["data"],
    },
  ],
  outputs: [],
};
