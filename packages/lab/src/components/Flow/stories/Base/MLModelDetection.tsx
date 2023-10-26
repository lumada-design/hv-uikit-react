import { HvDaFlowNode } from "@hitachivantara/uikit-react-lab";

export const MLModelDetection = (props) => {
  return (
    <HvDaFlowNode description="Anomaly detection description" {...props} />
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
