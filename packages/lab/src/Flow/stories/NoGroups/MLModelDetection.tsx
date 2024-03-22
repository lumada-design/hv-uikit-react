import { MachineLearning } from "@hitachivantara/uikit-react-icons";
import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const MLModelDetection: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      title="ML Model"
      subtitle="ML Model Detection"
      icon={<MachineLearning />}
      description="Anomaly Detection description"
      color="cat8_80"
      outputs={[
        {
          label: "Detection",
          isMandatory: true,
          provides: "detection",
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
