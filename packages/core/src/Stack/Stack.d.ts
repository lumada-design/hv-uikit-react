import { StandardProps, DividerProps } from "@mui/material";
import React from "react";
import { HvThemeSpacing } from "../theme";

export type HvStackClassKey = "root";

export type StackDirection = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export interface HvStackProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvStackClassKey> {
  /**
   * Children of the stack component.
   */
  children: React.ReactNode;
  /**
   * The direction of the stack.
   * Can be either a string or an object that states the direction for each breakpoint.
   */
  direction?: string | StackDirection;
  /**
   * Indicates that the form element is disabled.
   */
  spacing?: HvThemeSpacing;
  /**
   * The divider component to be used between the stack elements.
   * - If `true` the Material-UI Divider component will be used.
   * - If a React node is passed then the custom divider will be used.
   */
  divider?: boolean | React.ReactNode;
  /**
   * The properties to pass on to the Material-UI component.
   */
  dividerProps: DividerProps;
  /**
   * Sets whether or not there should be arrow navigation between the stack elements
   */
  withNavigation: boolean;
}

export default function HvStack(props: HvStackProps): JSX.Element | null;
