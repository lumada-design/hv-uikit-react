import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvFocusStrategies =
  | "listbox"
  | "menu"
  | "card"
  | "grid"

export interface HvFocusProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey> {
  /**
   * The reference to the root element to hold all Focus' context.
   */
  rootRef: React.RefObject<HTMLInputElement>;
  /**
   * Extra configuration for the child element.
   */
  configuration: Object;
  /**
   * Whether the focus is selected.
   */
  selected: boolean,
  /**
   * Whether the focus is disabled.
   */
  disabled: boolean,
  /**
   * Child node to set the focus.
   */
  children: HTMLElement
  /**
   * Focus and navigation strategy to be used.
   */
  strategy: HvFocusStrategies,
  /**
   * Show focus when click element.
   */
  focusOnClick: boolean,
  /**
   * Show focus when click element.
   */
  focusDisabled: boolean,
  /**
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: boolean,
  /**
   * Uses an absolute positioned div as a focus.
   */
  useFalseFocus: boolean,
  /**
   * Narrows the results of the focusable elements to only this class
   */
  filterClass: String,
  /**
   * How much the navigation will skip when using the arrows.
   */
  navigationJump: Number
}

export type ClassKey =
  | "root"
  | "selected"
  | "disabled"
  | "focusDisabled"
  | "focusGridDisabled"
  | "focused"
  | "externalReference"
  | "falseFocus"

export default function HvFocus(props: HvFocusProps): JSX.Element | null;
