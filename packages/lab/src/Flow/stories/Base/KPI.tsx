import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const KPI: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="Insight"
      subtitle="KPI"
      description="KPI description"
      group="insights"
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
