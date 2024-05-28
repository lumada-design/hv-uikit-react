import { GetMiniMapNodeAttribute, MiniMap, MiniMapProps } from "reactflow";
import { ExtractNames } from "@hitachivantara/uikit-react-core";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { staticClasses, useClasses } from "./Minimap.styles";

export { staticClasses as flowMinimapClasses };

export type HvFlowMinimapClasses = ExtractNames<typeof useClasses>;

export interface HvFlowMinimapProps<NodeData = any>
  extends Omit<
    MiniMapProps<NodeData>,
    "nodeColor" | "nodeStrokeColor" | "maskColor" | "maskStrokeColor"
  > {
  /** Node color. @default `divider`. */
  nodeColor?: HvColorAny | GetMiniMapNodeAttribute<NodeData>;
  /** Node stroke color. @default `divider`. */
  nodeStrokeColor?: HvColorAny | GetMiniMapNodeAttribute<NodeData>;
  /** Mask color. @default `dividerSubtle`. */
  maskColor?: HvColorAny;
  /** Mask stroke color. @default `dividerSubtle`. */
  maskStrokeColor?: HvColorAny;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowMinimapClasses;
}

export const HvFlowMinimap = ({
  nodeColor = "divider",
  maskColor = "dividerSubtle",
  maskStrokeColor = "dividerSubtle",
  nodeStrokeColor = "divider",
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
          ? getColor(nodeColor, "divider")
          : nodeColor
      }
      nodeStrokeColor={
        typeof nodeStrokeColor === "string"
          ? getColor(nodeStrokeColor, "divider")
          : nodeStrokeColor
      }
      maskColor={getColor(maskColor, "dividerSubtle")}
      maskStrokeColor={getColor(maskStrokeColor, "dividerSubtle")}
      {...others}
    />
  );
};
