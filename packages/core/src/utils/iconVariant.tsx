import { HvColorAny } from "@hitachivantara/uikit-styles";

import { Caution, Fail, Info, Success } from "../icons";

export const iconVariant = (
  variant: "success" | "warning" | "error" | "info" | "default",
  color?: HvColorAny,
) => {
  switch (variant) {
    case "success":
      return <Success color={color} />;
    case "warning":
      return <Caution color={color} />;
    case "error":
      return <Fail color={color} />;
    case "info":
      return <Info color={color} />;
    default:
      return null;
  }
};
