import { HvRadius, HvSize } from "@hitachivantara/uikit-styles";

// "contained" has no suffix
type TypeSuffix = "" | "Subtle" | "Ghost";

export type HvButtonVariant =
  | "ghost"
  | `primary${TypeSuffix}`
  | `secondary${TypeSuffix}`
  | `positive${TypeSuffix}`
  | `negative${TypeSuffix}`
  | `warning${TypeSuffix}`
  | "semantic";

/** @deprecated use `HvSize` */
export type HvButtonSize = HvSize;

/** @deprecated use `HvRadius` */
export type HvButtonRadius = HvRadius;
