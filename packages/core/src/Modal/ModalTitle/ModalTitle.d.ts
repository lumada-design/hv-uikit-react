import React from "react";
import { DialogTitleProps, StandardProps } from "@material-ui/core";

export interface HvModalTitleProps extends StandardProps<DialogTitleProps, HvModalTitleClassKey> {
  /**
   * Variant of the modal.
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

export type HvModalTitleClassKey = "root" | "messageContainer" | "textWithIcon" | "icon";

export default function HvModalTitle(props: HvModalTitleProps): JSX.Element | null;
