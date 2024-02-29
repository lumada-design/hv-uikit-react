import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const MLModelPrediction: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="ML Model Prediction"
      subtitle="ML Model Prediction"
      description="Anomaly Prediction description"
      color="cat10_80"
      outputs={[
        {
          label: "Prediction",
          isMandatory: true,
          provides: "prediction",
        },
      ]}
      inputs={[
        {
          label: "Sensor Data",
          isMandatory: true,
          accepts: ["sensorData"],
        },
      ]}
      {...props}
    />
  );
};
