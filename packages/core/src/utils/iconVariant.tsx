import {
  Caution,
  Fail,
  IconBaseProps,
  Info,
  Success,
} from "@hitachivantara/uikit-react-icons";

import type { HvCalloutVariant } from "./Callout";

export const iconVariant = (
  variant: HvCalloutVariant,
  color?: IconBaseProps["color"],
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
