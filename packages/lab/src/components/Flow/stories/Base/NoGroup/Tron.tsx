import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const Tron: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Tron asset description"
      expanded
      maxVisibleActions={1}
      params={[
        {
          id: "asset",
          label: "Asset",
          type: "select",
          options: ["Way Side", "Cars"],
        },
      ]}
      nodeDefaults={{
        title: "Tron",
        subTitle: "Asset",
        color: "cat11_80",
      }}
      {...props}
    />
  );
};

Tron.meta = {
  label: "Tron",
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
