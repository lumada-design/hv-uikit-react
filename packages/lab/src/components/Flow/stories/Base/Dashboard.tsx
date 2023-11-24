import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const Dashboard: HvFlowNodeFC<NodeGroups> = (props) => {
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
      inputs={[
        {
          label: "Insights",
          isMandatory: true,
          accepts: ["insight"],
        },
      ]}
      {...props}
    />
  );
};

Dashboard.meta = {
  label: "Dashboard",
  groupId: "dashboard",
};
