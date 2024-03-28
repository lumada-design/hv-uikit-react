import { Background, BackgroundProps } from "reactflow";
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
    <Background color={getColor(color, theme.colors.secondary)} {...others} />
  );
};
