import { HvFlowNode } from "@hitachivantara/uikit-react-lab";

export const KPI = (props) => {
  return <HvFlowNode description="KPI description" {...props} />;
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
      provides: "insight",
    },
  ],
};
