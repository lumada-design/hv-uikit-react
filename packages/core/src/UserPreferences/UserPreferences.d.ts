import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvUserPreferencesClassKey =
  | "root"
  | "fixed"
  | "relative"
  | "absolute"
  | "static"
  | "container"
  | "contentContainer"
  | "userInfo";

export interface HvUserPreferencesProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvUserPreferencesClassKey> {
  /**
   * Defines if the user preferences is shown.
   */
  isOpen?: boolean;
  /**
   * Position of the component.
   */
  position?: "static" | "relative" | "fixed" | "absolute";
  /**
   * Children component.
   */
  children: React.ReactNode;
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback?: () => void;
  /**
   * Defines if the content pane should close when losing focus / clicking outside.
   */
  closeOnExit?: boolean;
  /**
   * User information.
   */
  userInfo?: {
    label1: string;
    label2: string;
  };
}

export default function HvUserPreferences(props: HvUserPreferencesProps): JSX.Element | null;
