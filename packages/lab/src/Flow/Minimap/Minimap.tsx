import {
  GetMiniMapNodeAttribute,
  MiniMap,
  MiniMapProps,
  Node,
} from "@xyflow/react";
import { ExtractNames } from "@hitachivantara/uikit-react-core";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { staticClasses, useClasses } from "./Minimap.styles";

export { staticClasses as flowMinimapClasses };

export type HvFlowMinimapClasses = ExtractNames<typeof useClasses>;

export interface HvFlowMinimapProps<NodeType extends Node = Node>
  extends Omit<
    MiniMapProps<NodeType>,
    "nodeColor" | "nodeStrokeColor" | "maskColor" | "maskStrokeColor"
  > {
  /** Node color. Defaults to `atmo4`. */
  nodeColor?: HvColorAny | GetMiniMapNodeAttribute<NodeType>;
  /** Node stroke color. Defaults to `atmo4`. */
  nodeStrokeColor?: HvColorAny | GetMiniMapNodeAttribute<NodeType>;
  /** Mask color. Defaults to `atmo3`. */
  maskColor?: HvColorAny;
  /** Mask stroke color. Defaults to `atmo3`. */
  maskStrokeColor?: HvColorAny;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowMinimapClasses;
}

export const HvFlowMinimap = ({
  nodeColor = "atmo4",
  maskColor = "atmo3",
  maskStrokeColor = "atmo3",
  nodeStrokeColor = "atmo4",
  classes: classesProp,
  className,
  ...others
}: HvFlowMinimapProps) => {
  const { classes, cx } = useClasses(classesProp);

  return (
    <MiniMap
      className={cx(classes.root, className)}
      nodeColor={
        typeof nodeColor === "string" ? getColor(nodeColor, "atmo4") : nodeColor
      }
      nodeStrokeColor={
        typeof nodeStrokeColor === "string"
          ? getColor(nodeStrokeColor, "atmo4")
          : nodeStrokeColor
      }
      maskColor={getColor(maskColor, "atmo3")}
      maskStrokeColor={getColor(maskStrokeColor, "atmo3")}
      {...others}
    />
  );
};
