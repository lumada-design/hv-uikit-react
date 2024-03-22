import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const Table: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Table description"
      group="insights"
      groupItem="table"
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
