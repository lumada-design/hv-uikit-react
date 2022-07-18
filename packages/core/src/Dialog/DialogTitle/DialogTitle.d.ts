import React from "react";
import { DialogTitleProps, StandardProps } from "@mui/material";

export type HvDialogTitleClassKey = "root" | "messageContainer" | "textWithIcon" | "icon";

export interface HvDialogTitleProps extends StandardProps<DialogTitleProps, HvDialogTitleClassKey> {
  /**
   * Variant of the Dialog.
   */
  variant?: "success" | "warning" | "error" | "info" | "default";
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon?: boolean;
  /**
   * Custom icon to replace the variant default.
   */
  customIcon?: React.ReactNode;
}

export default function HvDialogTitle(props: HvDialogTitleProps): JSX.Element | null;
