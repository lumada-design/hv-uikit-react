import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvFocusStrategies = "listbox" | "menu" | "card" | "grid";

export type HvFocusClassKey =
  | "root"
  | "selected"
  | "disabled"
  | "focusDisabled"
  | "focusGridDisabled"
  | "focused"
  | "externalReference"
  | "falseFocus"
  | "focus";

export interface HvFocusProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFocusClassKey> {
  /**
   * The reference to the root element to hold all Focus' context.
   */
  rootRef: React.Ref<HTMLInputElement>;
  /**
   * Extra configuration for the child element.
   */
  configuration: Record<string, any>;
  /**
   * Whether the focus is selected.
   */
  selected: boolean;
  /**
   * Whether the focus is disabled.
   */
  disabled: boolean;
  /**
   * Indicates that the disabled class should be applied.
   */
  disabledClass: boolean;
  /**
   * Child node to set the focus.
   */
  children: React.ReactNode;
  /**
   * Focus and navigation strategy to be used.
   */
  strategy: HvFocusStrategies;
  /**
   * Show focus when click element.
   */
  focusOnClick: boolean;
  /**
   * Show focus when click element.
   */
  focusDisabled: boolean;
  /**
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: boolean;
  /**
   * Uses an absolute positioned div as a focus.
   */
  useFalseFocus: boolean;
  /**
   * Narrows the results of the focusable elements to only this class
   */
  filterClass: string;
  /**
   * How much the navigation will skip when using the arrows.
   */
  navigationJump: number;
}

export default function HvFocus(props: HvFocusProps): JSX.Element | null;
