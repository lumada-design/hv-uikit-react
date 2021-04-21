import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvGlobalActionsClassKey =
  | "root"
  | "global"
  | "wrapper"
  | "content"
  | "globalSectionArea"
  | "backButton"
  | "name"
  | "actions"
  | "positionFixed"
  | "positionSticky";

export interface HvGlobalActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvGlobalActionsClassKey, "title"> {
  /**
   * Action Buttons passed into the Component.
   */
  children?: React.ReactNode;
  /**
   * Denotes if this is a global or section component.
   */
  variant?: string;
  /**
   * Text to display in the component.
   */
  title?: React.ReactNode;
  /**
   * Allows the user to pass in a fully customized button.
   */
  backButton?: React.ReactNode;
  /**
  /**
   * Action to be executed by the Back button in the Global Actions.
   */
  backButtonAction?: (value: string) => void;
  /**
   * Aria label to be applied to the back navigation button.
   */
  backButtonArialLabel?: string;
  /**
   * Custom icon to be applied to Backwards button.
   */
  backwardsIcon?: React.ReactNode;
  /**
   * Heading Level to apply to Title Area.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Position of the Global Actions
   */
  position?: "sticky" | "fixed";
}

export default function HvGlobalActions(props: HvGlobalActionsProps): JSX.Element | null;
