import { HvFlowNode } from "../Node/Node";

export const KPI = (props) => {
  return <HvFlowNode title="KPI" description="KPI description" {...props} />;
};

KPI.meta = {
  label: "KPI",
  groupId: "insights",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["prediction", "detection"],
    },
  ],
  outputs: [
    {
      label: "Insight",
      isMandatory: true,
      provides: ["insight"],
    },
  ],
};
