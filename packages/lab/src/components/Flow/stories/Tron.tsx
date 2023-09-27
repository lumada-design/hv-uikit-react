import { HvFlowNode } from "../Node/Node";

export const Tron = (props) => {
  return (
    <HvFlowNode title="Tron" description="Tron asset description" {...props} />
  );
};

Tron.meta = {
  label: "Tron",
  groupId: "assets",
  outputs: [
    {
      label: "Sensor Group 1",
      isMandatory: true,
      provides: ["sensorData"],
    },
    {
      label: "Sensor Group 2",
      isMandatory: true,
      provides: ["sensorData"],
    },
  ],
};
