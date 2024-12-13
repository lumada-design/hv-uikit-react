import { HvColorAny } from "@hitachivantara/uikit-styles";

import { HvIcon } from "../icons";

export const iconVariant = (
  variant: "success" | "warning" | "error" | "info" | "default",
  color?: HvColorAny,
) => {
  switch (variant) {
    case "success":
      return <HvIcon name="Success" color={color} />;
    case "warning":
      return <HvIcon name="Caution" color={color} />;
    case "error":
      return <HvIcon name="Fail" color={color} />;
    case "info":
      return <HvIcon name="Info" color={color} />;
    default:
      return null;
  }
};
