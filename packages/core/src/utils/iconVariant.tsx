import { HvColorAny } from "@hitachivantara/uikit-styles";

import { HvIcon } from "../icons";

const variantIconMap = {
  success: "Success",
  warning: "Caution",
  error: "Fail",
  info: "Info",
} as const;

export const iconVariant = (
  variant: "success" | "warning" | "error" | "info" | "default",
  color?: HvColorAny,
) => {
  if (variant === "default") return null;

  return <HvIcon name={variantIconMap[variant]} color={color} />;
};
