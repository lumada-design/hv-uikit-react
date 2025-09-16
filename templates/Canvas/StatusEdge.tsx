import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import {
  HvDropDownMenu,
  HvDropDownMenuProps,
} from "@hitachivantara/uikit-react-core";
import { useFlowInstance } from "@hitachivantara/uikit-react-lab";

import { FlowStatus, flowStatusesSpecs } from "./utils";

export type StatusEdgeData = {
  status?: FlowStatus;
};

export const StatusEdge = (props: EdgeProps<Edge<StatusEdgeData>>) => {
  const {
    id,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    data,
  } = props;

  const instance = useFlowInstance();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const status = data?.status ? flowStatusesSpecs[data.status] : undefined;

  const handleClick: HvDropDownMenuProps["onClick"] = (event, value) => {
    if (value.id === "remove") {
      instance.setEdges((edges) => edges.filter((edge) => edge.id !== id));
    }
  };

  return (
    <>
      <BaseEdge {...props} path={edgePath} />
      {status && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan nowheel" // ReactFlow specific classes to prevent drag on icon
          >
            <HvDropDownMenu
              icon={status.icon}
              dataList={[{ id: "remove", label: "Remove connection" }]}
              onClick={handleClick}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
