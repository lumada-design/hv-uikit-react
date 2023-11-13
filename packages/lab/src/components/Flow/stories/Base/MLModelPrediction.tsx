import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const MLModelPrediction = (props: NodeProps) => {
  return <HvFlowNode description="Anomaly Prediction description" {...props} />;
};

MLModelPrediction.meta = {
  label: "ML Model Prediction",
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
      label: "Prediction",
      isMandatory: true,
      provides: "prediction",
    },
  ],
};
