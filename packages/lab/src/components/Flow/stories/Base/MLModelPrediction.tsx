import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const MLModelPrediction: HvFlowNodeFC<NodeGroups> = (props) => {
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
