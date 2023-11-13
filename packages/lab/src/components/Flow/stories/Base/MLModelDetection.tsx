import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const MLModelDetection = (props: NodeProps) => {
  return <HvFlowNode description="Anomaly detection description" {...props} />;
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
