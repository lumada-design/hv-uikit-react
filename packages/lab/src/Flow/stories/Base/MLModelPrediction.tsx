import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const MLModelPrediction: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="ML Model"
      subtitle="ML Model Prediction"
      description="Anomaly Prediction description"
      group="models"
      inputs={[
        {
          label: "Sensor Data",
          isMandatory: true,
          accepts: ["sensorData"],
          maxConnections: 1,
        },
      ]}
      outputs={[
        {
          label: "Prediction",
          isMandatory: true,
          provides: "prediction",
        },
      ]}
      {...props}
    />
  );
};
