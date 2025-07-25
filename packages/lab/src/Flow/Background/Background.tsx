import { Background, BackgroundProps } from "@xyflow/react";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

export interface HvFlowBackgroundProps extends Omit<BackgroundProps, "color"> {
  /** Color for the background dots. Defaults to `text`. */
  color?: HvColorAny;
}

export const HvFlowBackground = ({
  color = "text",
  ...others
}: HvFlowBackgroundProps) => {
  return (
    <Background
      color={getColor(color, theme.colors.textSubtle)}
      gap={16}
      {...others}
    />
  );
};
