import { HvFlowNode } from "../Node/Node";

export const MLModelDetection = (props) => {
  return (
    <HvFlowNode
      title="Anomaly detection"
      description="Anomaly detection description"
      {...props}
    />
  );
};

MLModelDetection.meta = {
  label: "ML Model Detection",
  groupId: "models",
  inputs: [
    {
      label: "Sensor Data",
      isMandatory: true,
      accepts: ["sensorData"],
    },
  ],
  outputs: [
    {
      label: "Detection",
      isMandatory: true,
      provides: "detection",
    },
  ],
};
