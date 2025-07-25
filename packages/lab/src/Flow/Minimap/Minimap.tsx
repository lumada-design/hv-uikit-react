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

export interface HvFlowMinimapProps<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<
    MiniMapProps<Node<NodeData>>,
    "nodeColor" | "nodeStrokeColor" | "maskColor" | "maskStrokeColor"
  > {
  /** Node color. Defaults to `atmo4`. */
  nodeColor?: HvColorAny | GetMiniMapNodeAttribute<Node<NodeData>>;
  /** Node stroke color. Defaults to `atmo4`. */
  nodeStrokeColor?: HvColorAny | GetMiniMapNodeAttribute<Node<NodeData>>;
  /** Mask color. Defaults to `atmo3`. */
  maskColor?: HvColorAny;
  /** Mask stroke color. */
  maskStrokeColor?: HvColorAny;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowMinimapClasses;
}

export const HvFlowMinimap = ({
  nodeColor = "border",
  maskColor = "borderSubtle",
  maskStrokeColor = "borderSubtle",
  nodeStrokeColor = "border",
  classes: classesProp,
  className,
  ...others
}: HvFlowMinimapProps) => {
  const { classes, cx } = useClasses(classesProp);

  return (
    <MiniMap
      className={cx(classes.root, className)}
      nodeColor={
        typeof nodeColor === "string"
          ? getColor(nodeColor, "border")
          : nodeColor
      }
      nodeStrokeColor={
        typeof nodeStrokeColor === "string"
          ? getColor(nodeStrokeColor, "border")
          : nodeStrokeColor
      }
      maskColor={getColor(maskColor, "borderSubtle")}
      maskStrokeColor={getColor(maskStrokeColor, "borderSubtle")}
      {...others}
    />
  );
};
