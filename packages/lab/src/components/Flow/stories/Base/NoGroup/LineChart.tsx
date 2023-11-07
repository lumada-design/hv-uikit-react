import { HvFlowNode } from "@hitachivantara/uikit-react-lab";

export const LineChart = (props) => {
  return (
    <HvFlowNode
      description="LineChart description"
      nodeDefaults={{
        title: "Line Chart",
        subTitle: "Visualization",
        color: "cat12_80",
      }}
      {...props}
    />
  );
};

LineChart.meta = {
  label: "LineChart",
  inputs: [
    {
      label: "Data",
      isMandatory: true,
      accepts: ["prediction", "detection"],
    },
  ],
};
