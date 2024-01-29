import {
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeTypeMeta,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

export const MLModelDetection: HvFlowNodeFC<NodeGroup> = (props) => {
  return (
    <HvFlowNode
      description="Anomaly detection description"
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

MLModelDetection.meta = {
  label: "ML Model Detection",
  groupId: "models",
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
