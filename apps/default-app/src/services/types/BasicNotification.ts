import { FC } from "react";
import { HvTypographyVariants } from "@hitachivantara/uikit-react-core";

export interface NotificationComponentProps {
  message: string;
  variant?: HvTypographyVariants;
}

export type BasicNotification = FC<NotificationComponentProps>;
