import * as React from "react";
import { StandardProps } from "@mui/material";

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
   * User can pass in a fully customized button or false for when the back button should not be rendered.
   */
  backButton?: React.ReactNode | boolean;
  /**
   * @deprecated This prop should not be used. Use backButton to pass in a component
   */
  backButtonAction?: (value: string) => void;
  /**
   * @deprecated This prop should not be used. Use backButton to pass in a component
   */
  backButtonArialLabel?: string;
  /**
   * @deprecated This prop should not be used. Use backButton to pass in a component
   */
  backwardsIcon?: React.ReactNode;
  /**
   * Heading Level to apply to Title Area.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Position of the Global Actions.
   * Defaults to `sticky` when it is a global title and `relative` when it's a section title.
   */
  position?: "sticky" | "fixed" | "relative";
}

export default function HvGlobalActions(props: HvGlobalActionsProps): JSX.Element | null;
