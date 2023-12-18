import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

import type { NodeGroups } from ".";

export const MLModelDetection: HvFlowNodeFC<NodeGroups> = (props) => {
  return (
    <HvFlowNode
      description="Anomaly detection description"
      inputs={[
        {
          label: "Sensor Data",
          isMandatory: true,
          accepts: ["sensorData"],
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

MLModelDetection.meta = {
  label: "ML Model Detection",
  groupId: "models",
};
