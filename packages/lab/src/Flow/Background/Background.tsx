import { Background, BackgroundProps } from "reactflow";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

export interface HvFlowBackgroundProps extends Omit<BackgroundProps, "color"> {
  /** Color for the background dots. Defaults to `secondary`. */
  color?: HvColorAny;
}

export const HvFlowBackground = ({
  color = "text",
  ...others
}: HvFlowBackgroundProps) => {
  return (
    <Background
      color={getColor(color, "secondarySubtle")}
      gap={16}
      {...others}
    />
  );
};
