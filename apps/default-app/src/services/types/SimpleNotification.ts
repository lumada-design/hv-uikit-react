import { FC } from "react";
import { HvTypographyVariants } from "@hitachivantara/uikit-react-core";

export interface SimpleNotificationProps {
  message: string;
  variant?: HvTypographyVariants;
}

export type SimpleNotification = FC<SimpleNotificationProps>;
