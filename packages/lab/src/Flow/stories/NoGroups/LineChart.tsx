import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const LineChart: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="Line Chart"
      description="LineChart description"
      subtitle="Visualization"
      color="cat12_80"
      inputs={[
        {
          label: "Data",
          isMandatory: true,
          accepts: ["prediction", "detection"],
        },
      ]}
      {...props}
    />
  );
};
