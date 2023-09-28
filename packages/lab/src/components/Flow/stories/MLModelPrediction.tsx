import { HvFlowNode } from "../Node/Node";

export const MLModelPrediction = (props) => {
  return (
    <HvFlowNode
      title="Anomaly Prediction"
      description="Anomaly Prediction description"
      {...props}
    />
  );
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
      provides: ["prediction"],
    },
  ],
};
