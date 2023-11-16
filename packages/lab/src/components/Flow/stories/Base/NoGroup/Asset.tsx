import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const Asset: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Asset description"
      expanded
      maxVisibleActions={1}
      params={[
        {
          id: "asset",
          label: "Asset option",
          type: "select",
          options: ["Option 1", "Option 2"],
        },
      ]}
      nodeDefaults={{
        title: "My Asset",
        subTitle: "Asset",
        color: "cat11_80",
      }}
      {...props}
    />
  );
};

Asset.meta = {
  label: "My Asset",
  outputs: [
    {
      label: "Sensor Group 1",
      isMandatory: true,
      provides: "sensorData",
    },
    {
      label: "Sensor Group 2",
      isMandatory: true,
      provides: "sensorData",
    },
  ],
};
