import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

export const LineChart: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="LineChart description"
      nodeDefaults={{
        title: "Line Chart",
        subTitle: "Visualization",
        color: "cat12_80",
      }}
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

LineChart.meta = {
  label: "LineChart",
} satisfies HvFlowNodeTypeMeta;
