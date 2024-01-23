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
          options: [
            { id: "option1", label: "Option 1" },
            { id: "option2", label: "Option 2" },
          ],
        },
      ]}
      nodeDefaults={{
        title: "My Asset",
        subTitle: "Asset",
        color: "cat11_80",
      }}
      outputs={[
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
      ]}
      {...props}
    />
  );
};

Asset.meta = {
  label: "My Asset",
};
