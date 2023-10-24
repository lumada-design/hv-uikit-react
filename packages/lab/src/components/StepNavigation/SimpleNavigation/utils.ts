import { theme } from "@hitachivantara/uikit-styles";

import { HvStepProps } from "../DefaultNavigation";

export const dotSizes = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
};

export const getColor = (state: HvStepProps["state"]) =>
  state === "Disabled" ? theme.colors.secondary_60 : theme.colors.secondary;
