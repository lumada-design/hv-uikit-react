import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

export const MLModelPrediction: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="Anomaly Prediction description"
      inputs={[
        {
          label: "Sensor Data",
          isMandatory: true,
          accepts: ["sensorData"],
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

MLModelPrediction.meta = {
  label: "ML Model Prediction",
  groupId: "models",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
