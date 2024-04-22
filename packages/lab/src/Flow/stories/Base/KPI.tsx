import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const KPI: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="KPI description"
      group="insights"
      groupItem="kpi"
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["prediction", "detection"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Insight",
          isMandatory: true,
          provides: "kpi",
        },
      ]}
      {...props}
    />
  );
};
