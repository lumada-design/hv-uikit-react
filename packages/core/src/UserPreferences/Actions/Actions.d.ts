import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvUserPreferencesActionsProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvUserPreferencesActionsClassKey
>;

export type HvUserPreferencesActionsClassKey = "root";

export default function HvUserPreferencesActions(
  props: HvUserPreferencesActionsProps
): JSX.Element | null;
