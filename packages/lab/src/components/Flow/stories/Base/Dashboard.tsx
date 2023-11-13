import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const Dashboard = (props: NodeProps) => {
  return (
    <HvFlowNode
      description="Dashboard description"
      expanded
      params={[
        {
          id: "dashboardType",
          label: "Dashboard",
          type: "select",
          options: ["Time Series", "KPI", "Table"],
        },
      ]}
      {...props}
    />
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
  inputs: [
    {
      label: "Insights",
      isMandatory: true,
      accepts: ["insight"],
    },
  ],
  outputs: [],
};
