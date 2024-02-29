import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const Table: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="Insight"
      subtitle="Table"
      description="Table description"
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
          provides: "table",
        },
      ]}
      {...props}
    />
  );
};
