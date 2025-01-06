import { css } from "@emotion/css";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";
import {
  HvDropDownMenu,
  HvDropDownMenuProps,
} from "@hitachivantara/uikit-react-core";
import { useFlowInstance } from "@hitachivantara/uikit-react-lab";

import { FlowStatus, flowStatusesSpecs } from "./utils";

const classes = {
  dropdownMenu: css({
    "& svg .color0": {
      fill: "var(--color-0)",
    },
  }),
};

export type StatusEdgeData =
  | undefined
  | {
      status?: FlowStatus;
    };

export const StatusEdge = (props: EdgeProps<StatusEdgeData>) => {
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
              className={classes.dropdownMenu}
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
