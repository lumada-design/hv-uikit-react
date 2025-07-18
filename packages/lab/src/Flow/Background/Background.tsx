import { Background, BackgroundProps } from "@xyflow/react";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

export interface HvFlowBackgroundProps extends Omit<BackgroundProps, "color"> {
  /** Color for the background dots. Defaults to `secondary`. */
  color?: HvColorAny;
}

export const HvFlowBackground = ({
  color = "secondary",
  ...others
}: HvFlowBackgroundProps) => {
  return (
    <Background
      color={getColor(color, theme.colors.secondary_80)}
      gap={16}
      {...others}
    />
  );
};
