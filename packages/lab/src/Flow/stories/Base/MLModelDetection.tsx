import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const MLModelDetection: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="ML Model"
      subtitle="ML Model Detection"
      description="Anomaly Detection description"
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
          label: "Detection",
          isMandatory: true,
          provides: "detection",
        },
      ]}
      {...props}
    />
  );
};
