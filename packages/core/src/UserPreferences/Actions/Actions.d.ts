import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvUserPreferencesActionsClassKey = "root";

export type HvUserPreferencesActionsProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvUserPreferencesActionsClassKey
>;

export default function HvUserPreferencesActions(
  props: HvUserPreferencesActionsProps
): JSX.Element | null;
