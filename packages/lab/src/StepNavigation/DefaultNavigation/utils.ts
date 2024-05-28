import { theme } from "@hitachivantara/uikit-styles";

import type { HvStepProps } from "./Step";

export const getColor = (state: HvStepProps["state"]) =>
  ({
    Pending: theme.colors.warning,
    Failed: theme.colors.error,
    Completed: theme.colors.success,
    Current: theme.colors.text,
    Disabled: theme.colors.textDisabled,
    Enabled: theme.colors.text,
  })[state];

export const getSemantic = (state: HvStepProps["state"]) =>
  ({
    Pending: "warning",
    Failed: "negative",
    Completed: "positive",
    Current: "text",
    Disabled: "textDisabled",
    Enabled: "text",
  })[state];

const EXTRA_SMALL = { container: 32, avatar: 24 };
const SMALL = { container: 40, avatar: 32 };
const MEDIUM = { container: 48, avatar: 40 };
const LARGE = { container: 60, avatar: 52 };
const EXTRA_LARGE = { container: 96, avatar: 88 };

export const stepSizes = {
  xs: EXTRA_SMALL,
  sm: SMALL,
  md: MEDIUM,
  lg: LARGE,
  xl: EXTRA_LARGE,
};
