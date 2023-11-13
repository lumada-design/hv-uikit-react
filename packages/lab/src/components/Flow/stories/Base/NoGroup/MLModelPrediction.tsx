import { HvFlowNode } from "@hitachivantara/uikit-react-lab";
import { NodeProps } from "reactflow";

export const MLModelPrediction = (props: NodeProps) => {
  return (
    <HvFlowNode
      description="Anomaly Prediction description"
      nodeDefaults={{
        title: "ML Model Prediction",
        subTitle: "ML Model Prediction",
        color: "cat10_80",
      }}
      {...props}
    />
  );
};

MLModelPrediction.meta = {
  label: "ML Model Prediction",
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
