import { HvFlowNode } from "../Node/Node";

export const Dashboard = (props) => {
  return (
    <HvFlowNode
      title="Dashboard"
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
