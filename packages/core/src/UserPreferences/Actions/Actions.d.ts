import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvUserPreferenceActionsProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvUserPreferenceActionsClassKey
>;

export type HvUserPreferenceActionsClassKey = "root";

export default function HvUserPreferencesActions(
  props: HvUserPreferenceActionsProps
): JSX.Element | null;
